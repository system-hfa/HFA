# SERA v0.1.4-A3-d5d2-erc-implementation-retry

## 1. Propósito

Implementar `raw_llm_output.trace_experimental.erc_question_trace` como subtrace experimental observacional do eixo ERC, sem recalcular risco e sem alterar `erc_level`.

## 2. Contexto

A primeira tentativa de implementação do trace ERC foi rejeitada porque aparentou alterar `erc_level`. Auditoria posterior demonstrou que a divergência era de baseline candidate, não regressão exclusiva do patch. Após estabilização de anchors e alinhamento de candidates ERC estáveis, a implementação foi retomada com isolamento estrito.

## 3. Implementação

Arquivo alterado:

- `frontend/src/lib/sera/pipeline.ts`

Implementado:

- helper puro/read-only `buildExperimentalErcQuestionTrace(snapshot)`;
- geração de `raw_llm_output.trace_experimental.erc_question_trace`;
- uso exclusivo de snapshot final e dados já disponíveis;
- sem nova chamada LLM;
- sem recálculo de risco;
- sem alteração de `erc_level`;
- sem alteração de `question_trace` principal.

## 4. Question IDs ERC

O subtrace experimental cobre:

- `ERC_EVENT_OUTCOME_SEVERITY_IDENTIFIED`
- `ERC_RECOVERY_POTENTIAL_ASSESSED`
- `ERC_BARRIER_EFFECTIVENESS_ASSESSED`
- `ERC_ESCALATION_PROXIMITY_ASSESSED`
- `ERC_OPERATIONAL_CONTEXT_CONSIDERED`
- `ERC_LEVEL_SUPPORTED_BY_EVIDENCE`
- `ERC_LEVEL_CONSISTENT_WITH_POA_AND_PRECONDITIONS`

## 5. Escopo preservado

Não foram alterados:

- `frontend/src/lib/sera/all-steps.ts`
- `frontend/src/lib/sera/types.ts`
- prompts/gates classificatórios
- candidates/fixtures
- baseline oficial
- schema/migrations
- UI/Risk Profile
- cálculo de ERC

## 6. Validações

- Typecheck: PASS.
- Candidate-only N_RUNS=1: `tests/reports/candidates/methodology-gate-run-1779488736.json` — `{'total_runs': 13, 'pass': 10, 'partial': 3, 'fail': 0, 'error': 0, 'pass_rate': 0.7692307692307693, 'determinism_rate': 1}`.
- Candidate-only N_RUNS=3: `tests/reports/candidates/methodology-gate-run-1779491597.json` — `{'total_runs': 39, 'pass': 27, 'partial': 11, 'fail': 1, 'error': 1, 'pass_rate': 0.6923076923076923, 'determinism_rate': 0.8461538461538461}`.

## 7. Anchors obrigatórios

Devem permanecer estáveis:

- `A0-AUTO-003 = P-D/O-A/A-H/2`
- `A0-DAUMAS-E02-A = P-A/O-C/A-F/2`
- `A0-AUTO-004-ADJ = P-A/O-A/A-G/3`
- `A0-CHK-003 = P-G/O-A/A-G/3`
- `A0-VIS-004-ADJ = P-H/O-A/A-A/3`
- `A0-VIS-005 = P-H/O-A/A-A/3`

## 8. Resultado operacional

`PATCH_PROMOTED`, se `N_RUNS=3` mantiver `FAIL=0`, `ERROR=0` e os anchors obrigatórios estáveis.

## 9. Próxima fase recomendada

Após promoção, seguir para `A3-trace-contract`, consolidando contrato/versionamento dos subtraces experimentais antes de qualquer merge no `question_trace` principal.
