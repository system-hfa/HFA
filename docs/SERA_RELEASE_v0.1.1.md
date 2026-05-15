# SERA v0.1.1 — Release Notes

**Commit de referência:** `0775dc2`
**Commit do patch crítico:** `4367228`
**Data do smoke definitivo:** 2026-05-15
**Status:** Aprovada — baseline oficial promovido.

---

## 1. Baseline Oficial

| Item | Valor |
|---|---|
| Arquivo | `tests/reports/baseline/sera-baseline-v0.1.1-smoke.json` |
| Relatório fonte | `tests/reports/run-1778861714570.json` |
| Provedor / Modelo | DeepSeek / deepseek-reasoner |
| Comando | `SERA_N_RUNS=3 npx tsx tests/sera/run.ts --compact` |

---

## 2. Resultado do Smoke Definitivo

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

## 3. Patch Crítico — Step 4 Objective (commit `4367228`)

**Problema:** O LLM classificava situações excepcionais como O-C sem evidência textual de desvio consciente de regra, procedimento ou expectativa operacional conhecida.

**Correção:** Gate pós-LLM em `runStep4` (`frontend/src/lib/sera/all-steps.ts`) que exige evidência explícita de desvio consciente antes de aceitar O-C no caminho LLM. Quando a evidência é insuficiente, o pipeline retorna O-A conservador.

**Regra metodológica preservada:**
- O-C = desvio consciente, pontual e não rotineiro de regra/procedimento/expectativa operacional conhecida.
- O-C não exige proteção humana — proteção humana é um exemplo possível de motivação, não um requisito.
- Situação excepcional sozinha, sem desvio consciente explícito, não basta para O-C.

**Escopo não alterado pelo patch:** O-B, O-D, fixtures, baseline v0.1, runner, pipeline_adapter, schema.

---

## 4. Smoke Anterior vs. Definitivo

| Métrica | Near-pass (pré-fix) | Definitivo (pós-fix) |
|---|---|---|
| PASS | 157 | 162 |
| PARTIAL | 5 | 0 |
| FAIL | 0 | 0 |
| pass_rate | 96.9% | 100% |
| determinism_rate | 96.9% | 100% |

Fixtures corrigidas: TEST-P-D-001, TEST-P-F-001, TEST-P-H-001, TEST-T2-W2-001.
TEST-O-B-001: passou 3/3 sem oscilação P-A/P-G.
O-C, O-B e O-D: sem regressão detectada.

---

## 5. Fontes de Verdade

| Artefato | Caminho |
|---|---|
| Motor (Step 4 com patch) | `frontend/src/lib/sera/all-steps.ts` |
| Regras de objetivo | `frontend/src/lib/sera/rules/objective/` |
| Baseline oficial v0.1.1 | `tests/reports/baseline/sera-baseline-v0.1.1-smoke.json` |
| Relatório fonte do smoke | `tests/reports/run-1778861714570.json` |
| Script de promoção | `scripts/promote-sera-v0.1.1-baseline.sh` |
| Runner | `tests/sera/run.ts` |
| Comparador | `tests/sera/compare-baseline.ts` |

---

## 6. Status

v0.1.1 aprovada como baseline oficial de regressão para o corpus atual de 54 fixtures.

Qualquer alteração em motor, regras, fixtures, runner ou baseline exige novo ciclo de validação completo antes de promover novo baseline.
