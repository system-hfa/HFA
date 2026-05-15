# SERA v0.1.1 — Validação

**Data:** 2026-05-15
**Commit:** `0775dc2`

---

## 1. Smoke Definitivo

**Comando:**
```bash
SERA_N_RUNS=3 npx tsx tests/sera/run.ts --compact
```

**Relatório fonte:** `tests/reports/run-1778861714570.json`
**Baseline oficial:** `tests/reports/baseline/sera-baseline-v0.1.1-smoke.json`
**Provedor / Modelo:** DeepSeek / deepseek-reasoner

### Resultado

| Métrica | Valor |
|---|---|
| Fixtures testadas | 54 |
| Runs por fixture | 3 |
| Total de runs | 162 |
| PASS | 162 |
| PARTIAL | 0 |
| FAIL | 0 |
| ERROR | 0 |
| pass_rate | 100% |
| determinism_rate | 100% |

---

## 2. Critérios de Aprovação Atendidos

| Critério | Exigido | Obtido | Status |
|---|---|---|---|
| fixtures_tested | 54 | 54 | ✅ |
| n_runs_per_fixture | 3 | 3 | ✅ |
| total_runs | 162 | 162 | ✅ |
| pass | 162 | 162 | ✅ |
| partial | 0 | 0 | ✅ |
| fail | 0 | 0 | ✅ |
| error | 0 | 0 | ✅ |
| pass_rate | 1.0 | 1.0 | ✅ |
| determinism_rate | 1.0 | 1.0 | ✅ |

---

## 3. Comparação com Smoke Anterior

| Métrica | Near-pass (`run-1778786318335`) | Definitivo (`run-1778861714570`) | Δ |
|---|---|---|---|
| PASS | 157 | 162 | +5 |
| PARTIAL | 5 | 0 | −5 |
| FAIL | 0 | 0 | — |
| pass_rate | 96.9% | 100% | +3.1% |
| determinism_rate | 96.9% | 100% | +3.1% |

---

## 4. Fixtures Críticas

### Corrigidas pelo patch `4367228`

| Fixture | Antes | Depois |
|---|---|---|
| TEST-P-D-001 | PARTIAL | PASS 3/3 |
| TEST-P-F-001 | PARTIAL | PASS 3/3 |
| TEST-P-H-001 | PARTIAL | PASS 3/3 |
| TEST-T2-W2-001 | PARTIAL | PASS 3/3 |

### Monitoramento de regressão

| Fixture | Resultado | Observação |
|---|---|---|
| TEST-O-B-001 | PASS 3/3 | Sem oscilação P-A/P-G |
| TEST-O-C-001 | PASS 3/3 | O-C legítimo preservado |
| TEST-O-C-002 | PASS 3/3 | O-C legítimo preservado |
| TEST-GEN-OC-001 | PASS 3/3 | O-C legítimo preservado |
| TEST-GEN-OC-002 | PASS 3/3 | O-C legítimo preservado |
| TEST-GEN-OC-003 | PASS 3/3 | O-C legítimo preservado |
| TEST-O-D-001 | PASS 3/3 | Improvement v0.1→v0.1.1 mantido |

---

## 5. Observação sobre Preconditions

Scores internos de preconditions podem aparecer como PARTIAL/FAIL em runs individuais sem afetar o `overall` do runner, conforme política atual. Esse comportamento não bloqueou a aprovação da v0.1.1. A formalização dos critérios de preconditions está registrada como risco em `docs/SERA_KNOWN_RISKS_v0.1.1.md`.
