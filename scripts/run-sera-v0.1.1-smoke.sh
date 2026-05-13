#!/usr/bin/env bash
set -euo pipefail

# SERA v0.1.1 — Smoke global candidate
# Executa todas as fixtures com 3 runs, compara contra baseline v0.1.
# Não promove a baseline automaticamente.

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

echo "=== SERA v0.1.1 Smoke Global ==="

# ── Working tree check ──────────────────────────────────────────────
if ! git diff --quiet --exit-code; then
  echo "ERRO: working tree contém alterações não commitadas. Abortando."
  git status --short
  exit 1
fi

if [ -n "$(git ls-files --others --exclude-standard)" ]; then
  echo "ERRO: working tree contém arquivos não rastreados. Abortando."
  git status --short
  exit 1
fi

echo "Working tree limpa. Continuando."

# ── Limpeza de artefatos temporários ─────────────────────────────────
echo "Limpando artefatos temporários..."
rm -f tests/reports/run-*.json
rm -f tests/reports/taxonomy-coverage.json
find tests -name .DS_Store -type f -delete 2>/dev/null || true
echo "Limpeza concluída."

# ── Smoke global ─────────────────────────────────────────────────────
echo ""
echo "Executando smoke global (54 fixtures × 3 runs)..."
SERA_N_RUNS=3 npx tsx tests/sera/run.ts --compact

# ── Identificar último relatório ─────────────────────────────────────
LATEST_RUN=$(ls -t tests/reports/run-*.json 2>/dev/null | head -1)

if [ -z "$LATEST_RUN" ]; then
  echo "ERRO: nenhum relatório encontrado em tests/reports/run-*.json"
  exit 1
fi

echo ""
echo "Relatório gerado: $LATEST_RUN"

# ── Comparação contra baseline v0.1 ─────────────────────────────────
echo ""
echo "Comparando contra baseline v0.1..."
npx tsx tests/sera/compare-baseline.ts \
  --baseline tests/reports/baseline/sera-baseline-v0.1-smoke.json \
  --current "$LATEST_RUN"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Smoke v0.1.1 concluído."
echo "Relatório: $LATEST_RUN"
echo ""
echo "Próximo passo: revisar o output acima e, se aprovado:"
echo "  bash scripts/promote-sera-v0.1.1-baseline.sh $LATEST_RUN"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
