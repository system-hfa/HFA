# SERA Trace Contract
## v0.1.4-A3-trace-contract

## 1. Propósito
Formalizar o contrato atual dos traces em `raw_llm_output`, separando o que é trilha principal, o que é experimental, o que é monitoramento de invariância e o que está rejeitado.

## 2. Escopo
Este contrato cobre exclusivamente:
- `raw_llm_output.question_trace`
- `raw_llm_output.trace_experimental`
- `raw_llm_output.trace_isolation`
- `raw_llm_output.decision_trace`
- `raw_llm_output.preconditions_trace`
- tentativas/campos rejeitados relacionados a traces experimentais.

Fora de escopo:
- alteração de classificação P/O/A/ERC
- mudança de gates/prompts/motor
- alteração de schema/UI/Risk Profile.

## 3. Estado atual do contrato
No estado ativo do código (`frontend/src/lib/sera/pipeline.ts`):
- `question_trace` existe e é preenchido apenas para Step 1/2;
- `trace_experimental` contém somente quatro subtraces aceitos (Perception, Objective, Action, Preconditions);
- `trace_isolation` está ativo e monitora invariância pós-build dos traces;
- `decision_trace` e `preconditions_trace` são gerados como trilhas de auditabilidade técnica;
- `trace_experimental.erc_question_trace` não está ativo no código.

## 4. `raw_llm_output.question_trace`
Contrato atual:
- finalidade: auditabilidade metodológica de Step 1/2;
- escopo: perguntas Step 1/2 somente;
- uso: observacional;
- restrição: não pode atuar como classificador nem alterar P/O/A/ERC.

Decisão vigente:
- permanece limitado a Step 1/2;
- sem merge de perguntas P/O/A/Preconditions no principal até nova validação formal.

## 5. `raw_llm_output.trace_experimental`
Contrato atual:
- finalidade: camada experimental de auditabilidade por eixo;
- natureza: não normativa e não classificatória;
- execução: derivada de snapshot final read-only;
- proibição: não pode alimentar gates, inferências ou recálculo de classificação.

## 6. Subtraces experimentais aceitos
Subtraces ativos no código:
- `perception_question_trace`
- `objective_question_trace`
- `action_question_trace`
- `preconditions_question_trace`

Todos com as mesmas regras-base:
- `trace_experimental_only`
- `does_not_affect_classification`
- `no_new_llm_call`
- evidência derivada do snapshot/passo final.

## 7. Subtraces rejeitados
Estado atual de rejeição:
- `trace_experimental.erc_question_trace` rejeitado e revertido no código ativo.

Documentos de rejeição relevantes:
- `docs/SERA_TRACE_EXPERIMENTAL_ERC_REJECTED_v0.1.4.md`
- `docs/SERA_TRACE_EXPERIMENTAL_ERC_IMPLEMENTATION_RETRY_REJECTED_v0.1.4.md`

Condição operacional vigente:
- ERC trace experimental permanece fora do contrato ativo.

## 8. `raw_llm_output.trace_isolation`
Contrato atual:
- finalidade: monitoramento de invariância antes/depois da construção dos traces;
- campos críticos monitorados:
  - `perception_code`
  - `objective_code`
  - `action_code`
  - `erc_level`
  - `precondition_codes`
  - `recommendations_count`
- sinais de controle:
  - `stable_after_trace_build`
  - `changed_fields`

Regra:
- `trace_isolation` observa e reporta; não classifica.

## 9. `decision_trace`
Contrato atual:
- registra caminho técnico por eixo (P/O/A);
- indica origem da decisão (`deterministic_gate`, `llm_node`, `infer_function`, `unknown`);
- papel: rastreabilidade técnica de execução.

Regra:
- não é mecanismo de classificação adicional;
- não pode ser usado para alterar código final P/O/A.

## 10. `preconditions_trace`
Contrato atual:
- registra mecanismo de origem das preconditions (`deterministic_matrix`, `llm`, `mixed`, `none`, `unknown`);
- papel: rastreabilidade da trilha de preconditions.

Regra:
- não pode alterar P/O/A/ERC;
- não substitui validação metodológica humana da cadeia causal completa.

## 11. Campos proibidos de uso classificatório
É proibido usar, para alterar classificação ou recálculo de risco:
- `raw_llm_output.question_trace`
- `raw_llm_output.trace_experimental.*`
- `raw_llm_output.trace_isolation`
- `raw_llm_output.decision_trace`
- `raw_llm_output.preconditions_trace`

Proibições explícitas:
- nenhum subtrace experimental pode alterar P/O/A/ERC;
- nenhum subtrace experimental pode recalcular `erc_level`.

## 12. Regras de invariância
Invariantes obrigatórias em fases de trace:
- P/O/A/ERC inalterados;
- gates/prompts classificatórios inalterados;
- comparação antes/depois via snapshot;
- `trace_isolation.stable_after_trace_build = true` e `changed_fields = []` como condição de estabilidade.

## 13. Regras para futuras implementações
Qualquer novo trace deve:
- ser pós-classificação;
- operar em snapshot read-only;
- ser helper puro, sem side effects;
- não chamar LLM (salvo fase explicitamente dedicada e aprovada);
- não tocar helpers de classificação;
- não expandir `question_trace` principal sem fase de promoção.

## 14. Política de promoção de experimental para principal
Promotion path obrigatório:
1. documentação da proposta e limitações;
2. validação candidate-only `N_RUNS=1`;
3. validação candidate-only `N_RUNS=3`;
4. `FAIL=0`;
5. `ERROR=0`;
6. anchors fortes preservados;
7. revisão metodológica humana;
8. decisão explícita de versionamento/contrato.

Sem cumprir todos os itens, o subtrace permanece experimental.

## 15. Tentativas rejeitadas e lições
Tentativas rejeitadas consolidadas:
- expansão direta de `question_trace` principal para eixos além de Step 1/2 (fase A3-d5d): rejeitada por risco de regressão em anchor forte;
- `trace_experimental.erc_question_trace` (implementação e retry): rejeitado por critérios de validação e/ou invariância operacional.

Lições:
- isolamento técnico não substitui gate de validação estatística;
- ERC exige trilha própria de estabilização antes de promoção;
- traces devem continuar como auditabilidade, nunca como classificador paralelo.

## 16. Riscos remanescentes
Riscos atuais:
1. `trace_experimental` ainda não é contrato público normativo.
2. evidência pode refletir caminho do motor (não fato independente).
3. preconditions ainda podem refletir matriz/heurística e não cadeia causal Hendy completa.
4. risco de leitura indevida de trace como explicação causal final.
5. variabilidade de ERC em candidates ainda demanda fase dedicada.

## 17. Próximas fases recomendadas
Próximo caminho recomendado:
1. fase específica de estabilização/normalização ERC (sem tocar P/O/A);
2. somente depois, rediscutir ERC trace experimental;
3. consolidar política de versionamento do contrato de traces antes de qualquer promoção para principal.

## 18. Conclusão
Contrato vigente em v0.1.4:
- `question_trace` principal é auditabilidade metodológica limitada a Step 1/2;
- `trace_experimental` é experimental e não normativo;
- `trace_isolation` é mecanismo de monitoramento de invariância;
- `decision_trace` e `preconditions_trace` são trilhas técnicas secundárias;
- `erc_question_trace` permanece rejeitado e fora do código ativo.
