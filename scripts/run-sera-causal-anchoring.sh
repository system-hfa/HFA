#!/usr/bin/env bash
set -euo pipefail

# SERA — Causal Anchoring Gate (v0.1.3-C)
#
# Gate permanente, rápido e reutilizável que valida a ancoragem causal do ponto
# de fuga da operação segura. Roda a bateria adversarial v0.1.3-A/B + Copterline
# + regressões seletivas dos eixos sensíveis (A-D, A-G, A-B, O-B, O-C).
#
# Deve ser executado ANTES de qualquer alteração em:
#   - frontend/src/lib/sera/all-steps.ts
#   - frontend/src/lib/sera/pipeline.ts
#   - frontend/src/lib/sera/rules/objective/select.ts
#   - prompts SERA
#   - promoção de baseline
#
# NÃO substitui o smoke global de release.
#
# Uso:
#   bash scripts/run-sera-causal-anchoring.sh
#   SERA_N_RUNS=1 bash scripts/run-sera-causal-anchoring.sh
#   SERA_N_RUNS=3 bash scripts/run-sera-causal-anchoring.sh
#   SERA_FIXTURE_LIST=tests/sera/custom.txt bash scripts/run-sera-causal-anchoring.sh
#
# Variáveis de ambiente:
#   SERA_N_RUNS         Runs por fixture (default: 1)
#   SERA_FIXTURE_LIST   Arquivo da lista de fixtures
#                       (default: tests/sera/causal-anchoring-fixtures.txt)
#
# Sobre a escala ERC:
#   expected.erc_level nas fixtures usa a escala LEGACY do motor:
#   1 = crítico / risco imediato, 5 = mínimo / administrativo.
#   A UI converte para a escala HFA visual via coerceMotorErcToHfaCategory.

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

FIXTURE_LIST="${SERA_FIXTURE_LIST:-tests/sera/causal-anchoring-fixtures.txt}"
N_RUNS="${SERA_N_RUNS:-1}"
TSX="$REPO_ROOT/frontend/node_modules/.bin/tsx"
RUNNER="tests/sera/run.ts"
LOG_FILE="/tmp/sera-causal-anchoring-last.log"

if [ ! -f "$FIXTURE_LIST" ]; then
  echo "ERRO: lista de fixtures não encontrada: $FIXTURE_LIST"
  exit 1
fi

if [ ! -f "$TSX" ]; then
  echo "ERRO: tsx não encontrado em $TSX"
  echo "Instale as dependências do frontend: cd frontend && npm install"
  exit 1
fi

if [ ! -f "$RUNNER" ]; then
  echo "ERRO: runner não encontrado: $RUNNER"
  exit 1
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  SERA Causal Anchoring Gate (v0.1.3-C)"
echo "  Fixtures: ${FIXTURE_LIST}"
echo "  n-runs  : ${N_RUNS}"
echo "  ⚠  Este gate NÃO substitui o smoke global de release."
echo "  ⚠  expected.erc_level usa escala LEGACY do motor: 1=crítico, 5=mínimo."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

pass=0
not_pass=0
not_pass_ids=()
total=0

while IFS= read -r line; do
  # Ignora linhas em branco e comentários
  trimmed="$(echo "$line" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')"
  [[ -z "$trimmed" || "$trimmed" == \#* ]] && continue

  fixture_id="$trimmed"
  total=$((total + 1))
  printf "  %-44s " "$fixture_id"

  # Roda o runner com filtro exato pelo ID. O runner aborta com exit != 0
  # quando pass_rate < 0.7, mas para garantir captura de PARTIAL/FAIL/ERROR
  # com runs únicos ou múltiplos, inspecionamos o JSON do report gerado.
  runner_exit=0
  "$TSX" "$RUNNER" \
    --filter "$fixture_id" \
    --n-runs "$N_RUNS" \
    --compact \
    > "$LOG_FILE" 2>&1 || runner_exit=$?

  report_path="$(grep -E '^[[:space:]]*Relatório: ' "$LOG_FILE" | tail -n 1 | sed -E 's/^[[:space:]]*Relatório:[[:space:]]*//')"

  if [ -z "$report_path" ] || [ ! -f "$report_path" ]; then
    echo "✗ ERROR (sem relatório)"
    not_pass=$((not_pass + 1))
    not_pass_ids+=("$fixture_id (runner exit=$runner_exit, sem JSON de report)")
    echo ""
    echo "  ── output ───────────────────────────────────────"
    cat "$LOG_FILE"
    echo "  ── fim output ───────────────────────────────────"
    echo ""
    continue
  fi

  # Inspeciona o relatório: qualquer PARTIAL/FAIL/ERROR derruba o gate.
  verdict="$(node -e '
    const r = require(process.argv[1]);
    const s = r.summary || {};
    const partial = s.partial || 0;
    const fail = s.fail || 0;
    const error = s.error || 0;
    const passRate = typeof s.pass_rate === "number" ? s.pass_rate : 0;
    const detRate = typeof s.determinism_rate === "number" ? s.determinism_rate : 0;
    const total = s.total_runs || 0;
    const passes = s.pass || 0;
    if (partial === 0 && fail === 0 && error === 0 && passRate === 1) {
      console.log("PASS|" + passes + "/" + total + "|det=" + (detRate * 100).toFixed(0) + "%");
    } else {
      console.log("NOT_PASS|pass=" + passes + " partial=" + partial + " fail=" + fail + " error=" + error + " rate=" + (passRate * 100).toFixed(1) + "% det=" + (detRate * 100).toFixed(0) + "%");
    }
  ' "$report_path")"

  status="${verdict%%|*}"
  detail="${verdict#*|}"

  if [ "$status" = "PASS" ]; then
    echo "✓ PASS  ($detail)"
    pass=$((pass + 1))
  else
    echo "✗ NOT PASS  ($detail)"
    not_pass=$((not_pass + 1))
    not_pass_ids+=("$fixture_id — $detail")
    echo ""
    echo "  ── output ───────────────────────────────────────"
    cat "$LOG_FILE"
    echo "  ── fim output ───────────────────────────────────"
    echo ""
  fi

done < "$FIXTURE_LIST"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Causal Anchoring Gate: ${pass}/${total} PASS  |  n-runs=${N_RUNS}"
echo "  ⚠  Não substitui smoke global."
echo "  ⚠  expected.erc_level usa escala LEGACY do motor: 1=crítico, 5=mínimo."

if [ "$not_pass" -gt 0 ]; then
  echo ""
  echo "  Fixtures que não passaram:"
  for entry in "${not_pass_ids[@]}"; do
    echo "    - ${entry}"
  done
  echo ""
  echo "  Gate REPROVADO."
  echo "  Antes de alterar expected, verificar:"
  echo "    1. expected vs actual nos eixos P/O/A/ERC."
  echo "    2. Houve migração de agente, ato ou momento?"
  echo "    3. A falha está em fixture, LLM, prompt ou regra?"
  echo "    4. Documentar diagnóstico antes de qualquer correção."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  exit 1
fi

echo ""
echo "  Gate APROVADO. Ancoragem causal preservada."
echo "  Para release: smoke global obrigatório (bash scripts/run-sera-v0.1.1-smoke.sh)."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
exit 0
