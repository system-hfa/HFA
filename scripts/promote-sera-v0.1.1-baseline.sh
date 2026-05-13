#!/usr/bin/env bash
set -euo pipefail

# SERA v0.1.1 — Promover relatório aprovado a baseline
# Uso: bash scripts/promote-sera-v0.1.1-baseline.sh <run-file>

if [ $# -lt 1 ]; then
  echo "Uso: bash scripts/promote-sera-v0.1.1-baseline.sh <run-file>"
  echo ""
  echo "Exemplo:"
  echo "  bash scripts/promote-sera-v0.1.1-baseline.sh tests/reports/run-1234567890.json"
  exit 1
fi

RUN_FILE="$1"

# ── Validar existência do arquivo ────────────────────────────────────
if [ ! -f "$RUN_FILE" ]; then
  echo "ERRO: arquivo não encontrado: $RUN_FILE"
  exit 1
fi

echo "=== SERA v0.1.1 — Promover Baseline ==="
echo "Arquivo: $RUN_FILE"

# ── Validar métricas via node ────────────────────────────────────────
echo ""
echo "Validando métricas do relatório..."

node -e "
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('$RUN_FILE', 'utf8'));

const errors = [];

if (data.fixtures_tested !== 54) {
  errors.push('fixtures_tested = ' + data.fixtures_tested + ' (esperado 54)');
}
if (data.summary.pass !== 54) {
  errors.push('summary.pass = ' + data.summary.pass + ' (esperado 54)');
}
if (data.summary.partial !== 0) {
  errors.push('summary.partial = ' + data.summary.partial + ' (esperado 0)');
}
if (data.summary.fail !== 0) {
  errors.push('summary.fail = ' + data.summary.fail + ' (esperado 0)');
}
if (data.summary.error !== 0) {
  errors.push('summary.error = ' + data.summary.error + ' (esperado 0)');
}
if (data.summary.determinism_rate !== 1) {
  errors.push('summary.determinism_rate = ' + data.summary.determinism_rate + ' (esperado 1)');
}

if (errors.length > 0) {
  console.log('FALHA NA VALIDAÇÃO:');
  errors.forEach(function(e) { console.log('  - ' + e); });
  process.exit(1);
}

console.log('Validação OK: 54 fixtures, 54 PASS, 0 PARTIAL, 0 FAIL, 0 ERROR, det 100%');
"

# ── Copiar para baseline ─────────────────────────────────────────────
BASELINE_DIR="tests/reports/baseline"
BASELINE_FILE="$BASELINE_DIR/sera-baseline-v0.1.1-smoke.json"

# Garantir que o diretório existe
mkdir -p "$BASELINE_DIR"

if [ -f "$BASELINE_FILE" ]; then
  echo ""
  echo "ATENÇÃO: $BASELINE_FILE já existe."
  echo "Sobrescrever? (yes/no)"
  read -r CONFIRM
  if [ "$CONFIRM" != "yes" ]; then
    echo "Abortado."
    exit 1
  fi
fi

cp "$RUN_FILE" "$BASELINE_FILE"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Baseline v0.1.1 salva: $BASELINE_FILE"
echo ""
echo "Antes de commitar, revise:"
echo "  git diff --stat"
echo "  git diff tests/reports/baseline/"
echo ""
echo "Sugestão de commit:"
echo "  docs(sera): add v0.1.1 baseline report"
echo ""
echo "NÃO faça commit sem revisão humana."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
