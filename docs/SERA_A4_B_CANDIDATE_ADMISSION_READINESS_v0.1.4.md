# SERA v0.1.4-A4-b - Candidate Admission Readiness

## 1. Objetivo da fase

Preparar a admissao controlada de candidates metodologicos elegiveis para baseline admission testing, sem alteracoes de motor e sem execucao pesada dentro do Codex.

Esta fase prepara artefatos e comandos para execucao manual de `N_RUNS=3` no terminal do usuario.

## 2. Relacao com o contrato metodologico

Esta fase aplica `docs/SERA_METHOD_CONTRACT_v0.1.4.md`, especialmente:

- `PARTIAL` nunca e `PASS` para baseline;
- `FAIL/ERROR=0` e release guard minimo, nao baseline gate;
- baseline exige `PASS=100%`, `PARTIAL=0`, `FAIL=0`, `ERROR=0`, determinismo `100%`;
- ERC continua bloqueado para calibracao dedicada (A4-c);
- `erc_question_trace` permanece bloqueado.

## 3. Candidates elegiveis para admissao (A4-b)

Fonte de execucao: `tests/sera/methodology-admission-fixtures.txt`.

| Candidate | Admission status |
|---|---|
| A0-AUTO-001 | ELIGIBLE |
| A0-AUTO-003 | ELIGIBLE |
| A0-AUTO-004-ADJ | ELIGIBLE |
| A0-CHK-003 | ELIGIBLE |
| A0-DAUMAS-E01-B | ELIGIBLE |
| A0-DAUMAS-E02-A | ELIGIBLE |
| A0-VIS-003 | ELIGIBLE |
| A0-VIS-004-ADJ | ELIGIBLE |
| A0-VIS-005 | ELIGIBLE |

## 4. Excluidos da admissao nesta fase

| Candidate | Status | Motivo |
|---|---|---|
| A0-CHK-001 | EXCLUDED | ERC review (2 vs 3). |
| A0-DAUMAS-E02-B | EXCLUDED | ERC review (2 vs 3). |
| A0-FUEL-002 | EXCLUDED | ERC review (2 vs 3). |
| A0-CHK-002-ADJ | EXCLUDED | Exploratorio por ambiguidade P/A. |
| A0-CONFIG-001 | EXCLUDED | Exploratorio. |
| A0-CONFIG-002 | EXCLUDED | Exploratorio. |
| A0-SEP-002 | EXCLUDED | Exploratorio. |
| A0-SEP-005 | EXCLUDED | Exploratorio. |

## 5. Criterios de decisao A4-b

### 5.1 ADMISSION_PASS

Candidate pode ser considerado `ADMISSION_PASS` somente se, no conjunto de admissao:

- `summary.pass = total_runs`;
- `summary.partial = 0`;
- `summary.fail = 0`;
- `summary.error = 0`;
- `summary.determinism_rate = 1`.

Interpretacao: qualquer `PARTIAL` invalida `ADMISSION_PASS`.

### 5.2 ADMISSION_HOLD

Classificar como `ADMISSION_HOLD` se:

- houver qualquer `PARTIAL`; ou
- houver determinismo < `100%`; ou
- houver mismatch de POA em candidate elegivel.

### 5.3 ERC_REVIEW

Classificar como `ERC_REVIEW` se:

- POA estiver correto, mas `erc_level` divergir; ou
- houver padrao recorrente de divergencia `2 vs 3`.

Regra: `ERC_REVIEW` nao promove baseline nesta fase.

### 5.4 EXPLORATORY

Classificar como `EXPLORATORY` se:

- candidate estiver fora da lista de admissao;
- caso estiver metodologicamente ambiguo por contrato;
- ou houver recomendacao formal de exclusao de gate na fase A4.

## 6. Comando manual recomendado (terminal do usuario)

O script atual suporta lista customizada via `SERA_FIXTURE_LIST`.

Comando de execucao manual para rodada de admissao `N_RUNS=3`:

```bash
SERA_FIXTURE_LIST=tests/sera/methodology-admission-fixtures.txt \
SERA_N_RUNS=3 \
SERA_ALLOW_MULTI_RUN=1 \
scripts/run-sera-methodology-candidates.sh --run
```

Comando de guardrail no report gerado:

```bash
node scripts/assert-sera-report-clean.js tests/reports/candidates/<REPORT_FILE>.json
```

Observacao: o guardrail valida apenas `FAIL/ERROR`; baseline admission exige tambem `PARTIAL=0` e determinismo `100%`.

## 7. Resultado real - Report N_RUNS=3

Report executado manualmente:

- report path: `tests/reports/candidates/methodology-gate-run-1779497843.json`
- run_id: `run-1779496079446`
- timestamp: `2026-05-23T00:57:23.097Z`
- fixtures_tested: `9`
- n_runs_per_fixture: `3`
- total_runs: `27`
- summary.pass: `25`
- summary.partial: `2`
- summary.fail: `0`
- summary.error: `0`
- summary.pass_rate: `0.9259259259259259` (`92.59%`)
- summary.determinism_rate: `1` (`100%`)

Guardrail operacional:

- `FAIL/ERROR` check: `OK` (`scripts/assert-sera-report-clean.js` criterio operacional atendido).

## 8. Tabela final por candidate

| Candidate | Expected POA/ERC | Resultado N3 | Status final | Observacao |
|---|---|---|---|---|
| A0-AUTO-001 | P-C/O-A/A-E/2 | PASS/PASS/PASS | ADMISSION_PASS | Estavel em POA e risco layer. |
| A0-AUTO-003 | P-D/O-A/A-H/2 | PASS/PASS/PASS | ADMISSION_PASS | Estavel em POA e risco layer. |
| A0-AUTO-004-ADJ | P-A/O-A/A-G/3 | PASS/PASS/PASS | ADMISSION_PASS | Estavel em POA e risco layer. |
| A0-CHK-003 | P-G/O-A/A-G/3 | PASS/PASS/PASS | ADMISSION_PASS | Estavel em POA e risco layer. |
| A0-DAUMAS-E01-B | P-C/O-A/A-E/2 | PASS/PASS/PASS | ADMISSION_PASS | Estavel em POA e risco layer. |
| A0-DAUMAS-E02-A | P-A/O-C/A-F/2 | PASS/PASS/PASS | ADMISSION_PASS | Estavel em POA e risco layer. |
| A0-VIS-003 | P-G/O-A/A-A/2 | PARTIAL/PARTIAL/PASS | ADMISSION_HOLD / RISK_LAYER_REVIEW | POA estavel; oscilacao em `erc_level` (`3/3/2` vs expected `2`). |
| A0-VIS-004-ADJ | P-H/O-A/A-A/3 | PASS/PASS/PASS | ADMISSION_PASS | Estavel em POA e risco layer. |
| A0-VIS-005 | P-H/O-A/A-A/3 | PASS/PASS/PASS | ADMISSION_PASS | Estavel em POA e risco layer. |

## 9. Decisao consolidada A4-b

### 9.1 Admission status

- `ADMISSION_PASS` (8/9):
  - A0-AUTO-001
  - A0-AUTO-003
  - A0-AUTO-004-ADJ
  - A0-CHK-003
  - A0-DAUMAS-E01-B
  - A0-DAUMAS-E02-A
  - A0-VIS-004-ADJ
  - A0-VIS-005
- `ADMISSION_HOLD / RISK_LAYER_REVIEW` (1/9):
  - A0-VIS-003

### 9.2 Declaracoes obrigatorias da fase

- 8/9 candidates passaram na admissao completa.
- 9/9 candidates passaram no eixo causal P/O/A.
- 1/9 candidate ficou bloqueado por camada de risco (`erc_level`).
- Nao houve `FAIL`.
- Nao houve `ERROR`.
- Guardrail operacional passou (`FAIL/ERROR=0`).
- Baseline nao foi promovido nesta fase.
- Reports de execucao nao devem ser commitados.

## 10. Separacao metodologica: SERA causal vs HFA Risk Layer

Decisao metodologica desta fase:

- A classificacao causal SERA/Hendy deve ser governada primariamente por P/O/A e preconditions.
- O `erc_level` atual deve ser tratado como camada de risco legada de produto/teste (`HFA Risk Layer`), nao como eixo causal original de classificacao SERA.
- Portanto, `A0-VIS-003` nao falhou em classificacao causal; ficou em hold por camada de risco.

Diretriz para proxima fase:

- A4-c deve ser conduzida como `Risk Layer Separation and Governance` (inclui calibracao), nao apenas como ajuste de ERC numerico.

## 11. Declaracao de limite desta fase

Nesta fase A4-b result documentation:

- nao ha promocao de baseline;
- nao ha alteracao de expected;
- nao ha alteracao de ERC/risk layer;
- nao ha alteracao de motor;
- nao ha alteracao de fixtures oficiais/candidates JSON/baseline;
- nao ha commit de report.
