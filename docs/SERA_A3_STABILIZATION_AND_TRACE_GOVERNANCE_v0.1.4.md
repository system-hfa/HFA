# SERA v0.1.4-A3 — Stabilization and Trace Governance

## 1. Propósito
Consolidar a governança pós-trace-contract para reduzir promoção indevida de mudanças: triagem residual de candidates ERC, política de erro transiente LLM, guardrail de validação/commit e decisão formal sobre nova tentativa de ERC trace.

## 2. Escopo da fase
Escopo executado nesta fase:
- leitura e consolidação documental/metodológica;
- auditoria de reports existentes em `tests/reports/candidates/`;
- confirmação de estado do trace contract no código ativo;
- criação de guardrail para bloquear promoção com `FAIL>0` ou `ERROR>0`.

Fora de escopo (não alterado):
- motor classificatório SERA;
- `frontend/src/lib/sera/all-steps.ts`;
- `frontend/src/lib/sera/pipeline.ts`;
- prompts/gates;
- candidates JSON;
- baseline/fixtures oficiais/schema/UI/Risk Profile.

## 3. Estado inicial
- Repositório: `/Users/filipedaumas/SAAS/HFA`
- Branch: `main`
- HEAD inicial: `aa51e843ca3e00b7618abd7e3c46f157da838d7f`
- `HEAD == origin/main`: sim
- Tracked modified no início: não

## 4. Estado confirmado do trace contract
Checagem em `frontend/src/lib/sera/pipeline.ts` confirmou:
- `raw_llm_output.question_trace` permanece ativo via `buildStep1Step2QuestionTrace(...)`;
- `raw_llm_output.trace_experimental` contém apenas:
  - `perception_question_trace`
  - `objective_question_trace`
  - `action_question_trace`
  - `preconditions_question_trace`
- `raw_llm_output.trace_isolation` permanece observacional;
- `decision_trace` e `preconditions_trace` permanecem como trilhas auxiliares.

## 5. Confirmação sobre `erc_question_trace`
- Não há `erc_question_trace` ativo em `frontend/src/lib/sera/pipeline.ts` no estado atual.
- O ERC experimental trace continua rejeitado/revertido no código ativo.

## 6. Reports analisados
Foram analisados reports históricos `methodology-gate-run-*.json`, com foco recente no intervalo:
- `1779461829`, `1779468641`, `1779472121`, `1779480293`, `1779486844`, `1779491597`.

Também foram usadas estatísticas agregadas de 34 reports disponíveis para os 4 remanescentes:
- `A0-CHK-001`
- `A0-FUEL-002`
- `A0-VIS-003`
- `A0-CHK-002-ADJ`

## 7. Triagem residual ERC
Achados consolidados:
- `A0-CHK-001`: P/O/A estável (`P-G/O-A/A-A`) com ERC predominantemente `3` e ocorrência rara de `2`.
- `A0-FUEL-002`: predominância de `P-G/O-A/A-A/3`, porém com eventos de `ERC=2` e ocorrência histórica de `A-C/2` (instabilidade não só de ERC).
- `A0-VIS-003`: P/O/A estável (`P-G/O-A/A-A`) com oscilação histórica de ERC entre `2` e `3`, mas maioria em `2`.
- `A0-CHK-002-ADJ`: instabilidade estrutural de P/O/A (A-A/A-B/A-H) e ERC majoritariamente `3`; permanece caso exploratório conhecido.

## 8. Tabela de decisão dos remanescentes
| Fixture | Expected atual | Comportamento histórico (resumo) | Decisão nesta fase | Status |
|---|---|---|---|---|
| `A0-CHK-001` | `P-G/O-A/A-A/2` | P/O/A estável; ERC majoritariamente `3` com ocorrência rara de `2` | `KEEP_AS_IS_NOW` + elegível para revisão futura | `CONDITIONALLY_ELIGIBLE_ERC_REVIEW` |
| `A0-FUEL-002` | `P-G/O-A/A-A/2` | ERC oscilante (`2/3`) e histórico pontual de A-C | `KEEP_AS_IS` | `BLOCKED_BY_POA_AND_ERC_VARIANCE` |
| `A0-VIS-003` | `P-G/O-A/A-A/2` | P/O/A estável; ERC oscila (`2/3`) com maioria em `2` | `KEEP_AS_IS` | `BLOCKED_BY_ERC_VARIANCE` |
| `A0-CHK-002-ADJ` | `P-D/O-A/A-H/2` (exploratório) | Forte instabilidade de P/O/A e ERC | `KEEP_EXPLORATORY` | `EXPLORATORY_KNOWN` |

## 9. Política de erro transiente LLM
Política formal adotada para validação metodológica:
1. **Erro técnico transiente**: parse JSON inválido, resposta vazia, timeout, erro de provedor LLM.
2. **Regressão de classificação**: alteração indevida de P/O/A/ERC em fixture forte.
3. **Divergência metodológica**: mismatch estável entre expected e comportamento do motor (sem erro técnico).
4. **Instabilidade determinística**: oscilação entre runs com mesmo input.
5. **Erro bloqueante para commit**: qualquer validação-gate com `FAIL>0` ou `ERROR>0`.

Regra mandatória:
- Qualquer run usado como gate de promoção com `summary.fail > 0` ou `summary.error > 0` bloqueia commit automático.
- Exceção somente com fase/documento dedicado e decisão humana explícita.

## 10. Guardrail de validação/commit
Guardrail criado para enforcement operacional da regra acima:
- Script: `scripts/assert-sera-report-clean.js`
- Entradas:
  - caminho do report JSON;
  - opcional: `--require-anchor FIXTURE=POA` (repetível).
- Comportamento:
  - `exit 1` se `fail>0` ou `error>0`;
  - `exit 1` se anchor obrigatório falhar;
  - `exit 0` se report limpo e anchors (quando exigidos) estiverem íntegros;
  - `exit 2` para uso inválido/report inválido.

## 11. Script criado
Arquivo novo:
- `scripts/assert-sera-report-clean.js`

Exemplos:
```bash
node scripts/assert-sera-report-clean.js tests/reports/candidates/methodology-gate-run-1779486844.json

node scripts/assert-sera-report-clean.js \
  tests/reports/candidates/methodology-gate-run-1779486844.json \
  --require-anchor A0-AUTO-001=P-C/O-A/A-E
```

## 12. Validações do script
Validação positiva:
- Report: `methodology-gate-run-1779486844.json`
- Resultado: `exit 0`.

Validação negativa:
- Report: `methodology-gate-run-1779491597.json`
- Resultado: `exit 1` por `fail=1` e `error=1`.

Validação de anchor opcional:
- Regra: `A0-AUTO-001=P-C/O-A/A-E`
- Resultado: `exit 0` no report limpo.

## 13. Decisão sobre nova tentativa de ERC trace
Decisão formal: **não retentar `erc_question_trace` nesta fase**.

Pré-condições obrigatórias para próxima tentativa:
- política de erro transiente operacionalizada (cumprida);
- guardrail de report integrado ao fluxo de validação/commit (cumprida como utilitário local);
- validação N_RUNS=1 limpa (`FAIL=0`, `ERROR=0`);
- validação N_RUNS=3 limpa (`FAIL=0`, `ERROR=0`);
- anchors obrigatórios preservados;
- comando de commit condicionado a assert de report limpo.

## 14. O que não foi alterado
- `pipeline.ts`, `all-steps.ts`, `types.ts`;
- motor classificatório SERA;
- prompts/gates;
- candidates JSON;
- fixtures oficiais/baseline/schema/UI/Risk Profile;
- runner principal.

## 15. Riscos remanescentes
- Variância residual de ERC em casos específicos (`A0-VIS-003`, `A0-FUEL-002`);
- `A0-CHK-001` com sinal forte de ERC=3, mas sem janela limpa suficiente para promoção nesta fase;
- risco operacional de bypass manual do guardrail se não houver adoção explícita no processo de release.

## 16. Próximas fases recomendadas
1. Integrar `scripts/assert-sera-report-clean.js` ao checklist formal de release/merge metodológico.
2. Executar rodada dedicada (N_RUNS=1 e N_RUNS=3) somente para revisão de expected ERC remanescente com gate obrigatório do guardrail.
3. Reavaliar `A0-CHK-001` para potencial promoção de expected ERC sob janela limpa e estável.
4. Manter `A0-CHK-002-ADJ` como exploratório até estabilização de P/O/A.

## 17. Conclusão
A fase consolida governança de estabilização sem alterar motor nem candidates, fecha a política de bloqueio por `FAIL/ERROR`, cria guardrail executável para evitar promoção indevida e mantém `erc_question_trace` bloqueado até validação metodológica limpa e estável.
