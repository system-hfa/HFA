#!/usr/bin/env bash
set -euo pipefail

# SERA Smoke Fast — v0.1.2
# Gate rápido para PR/ciclos curtos.
# NÃO substitui smoke global de release (54+ fixtures × 3 runs).
#
# Uso:
#   bash scripts/run-sera-smoke-fast.sh
#   SERA_N_RUNS=3 bash scripts/run-sera-smoke-fast.sh
#   FIXTURES_FILE=tests/sera/custom.txt bash scripts/run-sera-smoke-fast.sh
#
# Vars de ambiente:
#   SERA_N_RUNS      Runs por fixture (default: 1)
#   FIXTURES_FILE    Arquivo de lista de fixtures (default: tests/sera/smoke-fast-fixtures.txt)

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

FIXTURES_FILE="${FIXTURES_FILE:-tests/sera/smoke-fast-fixtures.txt}"
N_RUNS="${SERA_N_RUNS:-1}"
TSX="$REPO_ROOT/frontend/node_modules/.bin/tsx"
RUNNER="tests/sera/run.ts"
LOG_FILE="/tmp/sera-smoke-fast-last.log"

if [ ! -f "$FIXTURES_FILE" ]; then
  echo "ERRO: arquivo de fixtures não encontrado: $FIXTURES_FILE"
  exit 1
fi

if [ ! -f "$TSX" ]; then
  echo "ERRO: tsx não encontrado em $TSX"
  echo "Certifique-se de que as dependências do frontend estão instaladas: cd frontend && npm install"
  exit 1
fi

if [ ! -f "$RUNNER" ]; then
  echo "ERRO: runner não encontrado: $RUNNER"
  exit 1
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  SERA Smoke Fast — n-runs=${N_RUNS}"
echo "  Fixtures: ${FIXTURES_FILE}"
echo "  ⚠  smoke-fast NÃO substitui smoke global de release."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

pass=0
fail=0
errors=()

while IFS= read -r line; do
  # Ignorar linhas vazias e comentários
  [[ -z "$line" || "$line" == \#* ]] && continue

  fixture_id="$line"
  printf "  %-44s " "$fixture_id"

  if "$TSX" "$RUNNER" \
       --filter "$fixture_id" \
       --n-runs "$N_RUNS" \
       --compact \
       > "$LOG_FILE" 2>&1; then
    echo "✓ PASS"
    pass=$((pass + 1))
  else
    echo "✗ FAIL"
    fail=$((fail + 1))
    errors+=("$fixture_id")
    echo ""
    echo "  ── output ───────────────────────────────────────"
    cat "$LOG_FILE"
    echo "  ── fim output ───────────────────────────────────"
    echo ""
  fi

done < "$FIXTURES_FILE"

total=$((pass + fail))
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Smoke Fast: ${pass}/${total} PASS  |  n-runs=${N_RUNS}"

if [ "${fail}" -gt 0 ]; then
  echo ""
  echo "  FAIL:"
  for err in "${errors[@]}"; do
    echo "    - ${err}"
  done
  echo ""
  echo "  Smoke fast REPROVADO."
  echo "  Analisar FÁILs antes de qualquer alteração. Smoke fast NÃO autoriza release."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  exit 1
else
  echo ""
  echo "  Smoke fast APROVADO."
  echo "  Para release: smoke global obrigatório (bash scripts/run-sera-v0.1.1-smoke.sh)."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  exit 0
fi
