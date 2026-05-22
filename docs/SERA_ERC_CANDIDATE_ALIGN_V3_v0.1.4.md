# SERA v0.1.4-A3-erc-candidate-align-v3

## 1. Propósito

Alinhar `expected.erc_level` somente nos candidates metodológicos com divergência ERC-only estável, após estabilização dos anchors `A0-DAUMAS-E02-A` e `A0-AUTO-003`.

## 2. Contexto

A fase anterior estabilizou `A0-AUTO-003` no eixo Objective e preservou `A0-DAUMAS-E02-A`. A auditoria pré-ajuste desta fase usou o report `tests/reports/candidates/methodology-gate-run-1779480293.json`, com `N_RUNS=3`, `PASS 19 / PARTIAL 20 / FAIL 0 / ERROR 0` e `determinism_rate 84.6%`.

## 3. Critério de elegibilidade

Um candidate só foi considerado elegível se:

- `expected.erc_level` atual era `2`;
- P/O/A actual era igual ao expected em `3/3`;
- ERC actual era `3` em `3/3`;
- a divergência era exclusivamente ERC;
- não era `A0-CHK-002-ADJ`;
- não era `A0-VIS-003`;
- não exigia alteração de código/motor.

## 4. Candidates promovidos

Foram ajustados de `expected.erc_level: 2` para `3`:

| Candidate | Expected anterior | Actual pré-ajuste | Decisão |
|---|---:|---|---|
| `A0-AUTO-004-ADJ` | 2 | 3/3 em ERC=3 com P/O/A estável | Promover para 3 |
| `A0-CHK-003` | 2 | 3/3 em ERC=3 com P/O/A estável | Promover para 3 |
| `A0-VIS-004-ADJ` | 2 | 3/3 em ERC=3 com P/O/A estável | Promover para 3 |
| `A0-VIS-005` | 2 | 3/3 em ERC=3 com P/O/A estável | Promover para 3 |

## 5. Candidates não promovidos

| Candidate | Motivo |
|---|---|
| `A0-CHK-001` | ERC não ficou 3/3 no report pré-ajuste |
| `A0-FUEL-002` | P/O/A oscilou no global (`A-C/A-A`) |
| `A0-VIS-003` | já passou com ERC 2 |
| `A0-AUTO-003` | anchor estabilizado e já passou com ERC 2 |
| `A0-DAUMAS-E02-A` | anchor estabilizado e já passou com ERC 2 |
| `A0-CHK-002-ADJ` | exploratório/conhecido; não deve ser alterado nesta fase |

## 6. Alterações aplicadas

Alteração restrita aos quatro JSONs elegíveis em `tests/sera/fixtures-candidates/methodology-gate/`.

Nenhum código, motor, prompt, gate, fixture oficial, baseline, schema, UI, Risk Profile ou trace experimental foi alterado.

## 7. Validações

Preencher com os reports pós-ajuste:

- JSON validation: executada antes dos testes.
- Candidate-only `N_RUNS=1`: `tests/reports/candidates/methodology-gate-run-1779484493.json` — `{'total_runs': 13, 'pass': 9, 'partial': 4, 'fail': 0, 'error': 0, 'pass_rate': 0.6923076923076923, 'determinism_rate': 1}`.
- Candidate-only `N_RUNS=3`: `tests/reports/candidates/methodology-gate-run-1779486844.json` — `{'total_runs': 39, 'pass': 29, 'partial': 10, 'fail': 0, 'error': 0, 'pass_rate': 0.7435897435897436, 'determinism_rate': 0.9230769230769231}`.

## 8. Resultado operacional

Resultado esperado se as validações pós-ajuste mantiverem `FAIL=0` e `ERROR=0`: `ALIGNMENT_PROMOTED`.

## 9. Riscos remanescentes

- `A0-FUEL-002` permanece como risco de estabilidade P/O/A em corrida global.
- `A0-CHK-001` permanece com ERC não estabilizado em 3/3.
- `A0-CHK-002-ADJ` permanece exploratório.
- O helper `erc_question_trace` ainda não deve ser retentado até a conclusão desta validação.

## 10. Próxima fase recomendada

Se as validações pós-ajuste passarem, retomar `A3-d5d2-erc-implementation-retry`, mantendo `erc_question_trace` estritamente observacional e sem recalcular `erc_level`.
