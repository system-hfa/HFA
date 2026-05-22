# SERA Trace Experimental — Preconditions Question Trace
## v0.1.4-A3-d5d2-preconditions-experimental

**Data:** 2026-05-21
**Fase:** SERA v0.1.4-A3-d5d2-preconditions-experimental
**Tipo:** Subtrace experimental observacional — eixo Preconditions isolado via snapshot

---

## 1. Objetivo

Adicionar um subtrace experimental do eixo Preconditions em:

```
raw_llm_output.trace_experimental.preconditions_question_trace
```

O subtrace é estritamente observacional, não influencia classificação P/O/A/ERC, e estende a arquitetura de isolamento já validada nas fases Perception, Objective e Action.

---

## 2. Por que Preconditions vem depois dos três eixos P/O/A

- As fases A3-d5d2-perception, A3-d5d2-objective e A3-d5d2-action validaram a arquitetura de isolamento (snapshot pós-classificação, helper puro, subcampo separado) sem regressão em nenhum anchor forte.
- Preconditions depende de `precondition_codes` e `step6_7_final`, campos disponíveis no snapshot final pós-classificação sem necessidade de nova chamada LLM.
- Os subtraces de Perception, Objective e Action são preservados integralmente.
- Esta fase completa o ciclo experimental dos cinco eixos principais (P/O/A + Preconditions), deixando apenas ERC para fase futura.

---

## 3. Onde o subtrace foi armazenado

```
raw_llm_output.trace_experimental.preconditions_question_trace: SeraQuestionTraceItem[]
```

Não altera:
- `raw_llm_output.question_trace` — permanece com somente Step 1/2.
- `raw_llm_output.trace_isolation` — permanece inalterado.
- `raw_llm_output.trace_experimental.perception_question_trace` — preservado.
- `raw_llm_output.trace_experimental.objective_question_trace` — preservado.
- `raw_llm_output.trace_experimental.action_question_trace` — preservado.
- Campos P/O/A/ERC, gates, prompts, fixtures, baseline, schema, UI.

---

## 4. Question IDs preenchidos

| question_id | step | descrição |
|---|---|---|
| `PRE_ACTIVE_FAILURE_LINKED_TO_PRECONDITION` | preconditions | A falha ativa (P/O/A) está vinculada a pré-condições? |
| `PRE_PRECONDITION_SUPPORTED_BY_EVIDENCE` | preconditions | Há evidência textual no relato que suporte as pré-condições? |
| `PRE_PRECONDITION_IS_INTERVENTION_POINT` | preconditions | A pré-condição representa ponto plausível de intervenção? |

Não preenchidos nesta fase: ERC.

---

## 5. Como as respostas são derivadas do snapshot

O helper `buildExperimentalPreconditionsQuestionTrace(snapshot)` recebe `SeraFinalClassificationSnapshot` e deriva as respostas a partir de:

### 5.1 Fonte primária: `snapshot.precondition_codes`

Array de códigos de pré-condição já normalizados (ex: `['PRE_TRAINING', 'PRE_RULES']`).

- Se `precondition_codes.length > 0` → pré-condições existem.
- Se `precondition_codes.length === 0` → sem pré-condições identificadas.

### 5.2 Fonte secundária: `snapshot.step6_7_final.precondicoes`

Array de objetos de pré-condição com campos:
- `evidencia_no_relato` — texto de evidência extraído do relato.
- `codigo` — código da pré-condição.
- `sourceRuleId` — se presente, indica origem por matriz determinística.

A evidência é coletada concatenando os campos `evidencia_no_relato` não-vazios de todos os itens de `precondicoes`.

### 5.3 Lógica de derivação por question_id

| question_id | precondições presentes + evidência | precondições presentes, sem evidência | sem precondições |
|---|---|---|---|
| PRE_ACTIVE_FAILURE_LINKED_TO_PRECONDITION | partial | partial | insufficient_evidence |
| PRE_PRECONDITION_SUPPORTED_BY_EVIDENCE | partial | insufficient_evidence | insufficient_evidence |
| PRE_PRECONDITION_IS_INTERVENTION_POINT | partial | partial | unknown |

**Nota:** `partial` é o valor conservador máximo nesta fase porque o vínculo causal e o status de intervenção são derivados de matriz/heurística, não de avaliação clínica independente.

---

## 6. Regras anti-invenção

- Nenhuma resposta `yes` — o máximo derivável sem avaliação clínica independente é `partial`.
- Se não há pré-condições: `insufficient_evidence` ou `unknown`.
- Nenhuma chamada LLM é feita neste helper.
- `evidence` nunca é inventada: só usa `evidencia_no_relato` de `step6_7_final.precondicoes` ou `precondition_codes=...` como fallback.
- `discarded_codes` é sempre `[]` — não há dados estruturados de descarte para preconditions neste snapshot.
- A limitação `evidence_may_reflect_engine_path_not_independent_fact` é declarada em todos os itens.

---

## 7. Limitação sobre matrix/heuristic vs cadeia causal Hendy completa

As pré-condições no SERA são selecionadas via `selectDeterministicPreconditions`, uma matriz determinística baseada em códigos P/O/A e sinais do relato. Isso tem duas implicações:

1. **Vínculo causal implícito:** A ligação entre a falha ativa (P/O/A) e a pré-condição é garantida pela regra de seleção, mas não demonstrada por cadeia causal explícita no relato. O `answer=partial` para `PRE_ACTIVE_FAILURE_LINKED_TO_PRECONDITION` reflete isso.

2. **Evidência indireta:** A `evidencia_no_relato` é o texto que disparou a regra de seleção da matriz — não necessariamente a evidência que um especialista usaria para justificar a pré-condição. O `answer=partial` para `PRE_PRECONDITION_SUPPORTED_BY_EVIDENCE` reflete isso.

A limitação `precondition_source_may_be_matrix_or_heuristic` e `not_full_hendy_precondition_causal_chain_yet` são declaradas em todos os itens.

---

## 8. Relação com trace_isolation

- O helper `buildExperimentalPreconditionsQuestionTrace` é chamado APÓS `snapshotBeforeTrace` e ANTES de `snapshotAfterTrace`, em sequência após os três traces P/O/A.
- Ordem: `snapshotBefore` → Perception → Objective → Action → **Preconditions** → `snapshotAfter` → `compare`.
- `compareFinalClassificationSnapshot(before, after)` confirma `stable_after_trace_build=true` e `changed_fields=[]`.
- O helper não acessa nem muta step3/step4/step5 — lê apenas `precondition_codes` e `step6_7_final`.

---

## 9. O que não foi alterado

- `raw_llm_output.question_trace` — permanece somente com Step 1/2.
- `raw_llm_output.trace_experimental.perception_question_trace` — preservado.
- `raw_llm_output.trace_experimental.objective_question_trace` — preservado.
- `raw_llm_output.trace_experimental.action_question_trace` — preservado.
- Classificação P/O/A/ERC.
- Gates e prompts classificatórios.
- `all-steps.ts`.
- Fixtures/candidates/baseline.
- Schema/migrations.
- UI/produto.
- `types.ts` — não foi alterado.

---

## 10. Limitações

Todos os itens carregam:

- `trace_experimental_only`
- `preconditions_axis_only`
- `derived_from_final_snapshot`
- `derived_from_preconditions_trace`
- `does_not_affect_classification`
- `no_new_llm_call`
- `evidence_may_reflect_engine_path_not_independent_fact`
- `precondition_source_may_be_matrix_or_heuristic`
- `not_full_hendy_precondition_causal_chain_yet`
- `active_failure_to_precondition_link_may_be_implicit`

Outras limitações estruturais:
- `answer` máximo é `partial` — nunca `yes` sem avaliação clínica independente.
- `discarded_codes=[]` — ausência de dados de descarte estruturado para preconditions.
- `produced_code` é string com códigos unidos por vírgula, não um único código classificatório.
- Casos sem pré-condições retornam `insufficient_evidence`/`unknown`, não `no`.

---

## 11. Validações

### Typecheck
- `npx tsc --noEmit` — passou sem erros.

### Candidate-only N_RUNS=1
- Ver relatório final desta fase.

### Anchors fortes verificados
Todos os 12 anchors P/O/A preservados — ver relatório final.

---

## 12. Próxima fase recomendada

- **A3-d5d2-erc**: Aplicar o mesmo padrão para ERC (`trace_experimental.erc_question_trace`) usando `snapshot.erc_level`.
- **Ou A3-d5e**: Considerar promoção incremental dos cinco eixos experimentais para `question_trace` principal, após validação de stabilidade em N_RUNS=3+ em todos os eixos.
- **Não promover agora**: aguardar estabilidade multi-run antes de qualquer merge para `question_trace` principal.
