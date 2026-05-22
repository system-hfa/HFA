# SERA v0.1.4-A3-d5d2-erc-implementation-retry — rejeição pós-validação

## 1. Resultado

`PATCH_REJECTED_AFTER_N_RUNS_3`

A implementação experimental de `raw_llm_output.trace_experimental.erc_question_trace` foi revertida porque a validação `N_RUNS=3` apresentou `FAIL=1` e `ERROR=1`.

## 2. Commit revertido

Commit revertido:

- `06d7ecfbf39c07e0a5f1c0e69076c4c7720fb8f8`
- Mensagem: `feat(sera): add isolated ERC experimental trace`

## 3. O que a tentativa implementava

A tentativa adicionava em `frontend/src/lib/sera/pipeline.ts`:

- helper `buildExperimentalErcQuestionTrace(snapshot)`;
- campo `raw_llm_output.trace_experimental.erc_question_trace`;
- 7 question IDs ERC experimentais;
- uso de snapshot final/read-only;
- sem nova chamada LLM;
- sem intenção de recalcular `erc_level`.

## 4. Validações executadas

### Typecheck

`npx tsc --noEmit`: PASS.

### Candidate-only N_RUNS=1

Resultado informado:

- `PASS 10 / PARTIAL 3 / FAIL 0 / ERROR 0`
- `determinism_rate 100%`
- anchors principais preservados.

### Candidate-only N_RUNS=3

Report:

- `tests/reports/candidates/methodology-gate-run-1779491597.json`

Resultado:

- `PASS 27 / PARTIAL 11 / FAIL 1 / ERROR 1`
- `pass_rate 69.2%`
- `determinism_rate 84.6%`

Motivo do bloqueio:

- `FAIL=1`
- `ERROR=1`
- critério da fase exigia `FAIL=0` e `ERROR=0`.

## 5. Observação sobre o erro

O erro reportado incluiu falha de parse JSON em etapa LLM:

- `Falha ao parsear JSON na Etapa 4 - Nó 1: Unexpected end of JSON input`

Mesmo que isso possa ser transiente, a regra da fase não permitia promover patch com `FAIL` ou `ERROR`.

## 6. Decisão

A tentativa foi revertida integralmente.

Estado final pretendido:

- sem `erc_question_trace` ativo;
- sem alteração em `pipeline.ts`;
- sem alteração em `types.ts`;
- sem alteração em `all-steps.ts`;
- sem alteração em candidates;
- sem alteração em baseline;
- sem alteração em Risk Profile/UI/schema.

## 7. Próxima fase recomendada

Antes de retentar o ERC trace:

1. Criar validação específica que separe erro transiente LLM de regressão do patch.
2. Rodar `N_RUNS=3` duas vezes ou usar gate que aceite apenas erro transiente documentado sem alteração de P/O/A/ERC.
3. Implementar proteção no script de commit para nunca continuar após `FAIL/ERROR`.
4. Só retentar `erc_question_trace` depois de confirmar `FAIL=0` e `ERROR=0`.
