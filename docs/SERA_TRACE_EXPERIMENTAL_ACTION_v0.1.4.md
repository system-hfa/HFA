# SERA Trace Experimental — Action Question Trace
## v0.1.4-A3-d5d2-action-experimental

**Data:** 2026-05-21
**Fase:** SERA v0.1.4-A3-d5d2-action-experimental
**Tipo:** Subtrace experimental observacional — eixo Action isolado via snapshot

---

## 1. Objetivo

Adicionar um subtrace experimental do eixo Action em:

```
raw_llm_output.trace_experimental.action_question_trace
```

O subtrace é estritamente observacional, não influencia classificação P/O/A/ERC, e estende a arquitetura de isolamento já validada nas fases Perception e Objective.

---

## 2. Por que Action vem depois de Perception e Objective

- As fases A3-d5d2-perception-experimental e A3-d5d2-objective-experimental validaram a arquitetura de isolamento sem regressão em nenhum anchor forte.
- Action é o terceiro eixo avaliado no pipeline SERA (Step 5), derivável a partir de `action_code` e `step5_final.nos_percorridos`, sem necessidade de nova chamada LLM.
- O subtrace por Action completa os três eixos principais (Perception, Objective, Action) antes de considerar Preconditions e ERC.
- Os subtraces de Perception e Objective são preservados integralmente.

---

## 3. Onde o subtrace foi armazenado

```
raw_llm_output.trace_experimental.action_question_trace: SeraQuestionTraceItem[]
```

Não altera:
- `raw_llm_output.question_trace` — permanece com somente Step 1/2.
- `raw_llm_output.trace_isolation` — permanece inalterado.
- `raw_llm_output.trace_experimental.perception_question_trace` — preservado da fase anterior.
- `raw_llm_output.trace_experimental.objective_question_trace` — preservado da fase anterior.
- Campos P/O/A/ERC, gates, prompts, fixtures, baseline, schema, UI.

---

## 4. Question IDs preenchidos

| question_id | step | descrição |
|---|---|---|
| `A_ACTION_EXECUTED_AS_INTENDED` | action | Ação executada conforme a intenção, sem falha de implementação? |
| `A_ACTION_MATCHED_PERCEIVED_SITUATION` | action | Ação era coerente com a situação percebida pelo operador? |
| `A_PHYSICAL_PROCEDURAL_STEP_OMITTED` | action | Passo físico ou procedimental foi omitido de forma independente? |
| `A_WRONG_ACTION_OR_SELECTION` | action | Houve ação errada, seleção equivocada, modo ou input incorreto? |
| `A_FEEDBACK_CHECK_REQUIRED` | action | A situação exigia verificação, callout, checklist ou monitoramento? |
| `A_FEEDBACK_CHECK_PERFORMED` | action | A verificação ou callout requerido foi realizado adequadamente? |
| `A_TIME_PRESSURE_IMPAIRED_EXECUTION` | action | Pressão temporal ou carga de trabalho prejudicou a execução? |

Não preenchidos nesta fase: Perception (preservado da fase anterior), Objective (preservado), Preconditions, ERC.

---

## 5. Como as respostas são derivadas do snapshot

O helper `buildExperimentalActionQuestionTrace(snapshot)` recebe `SeraFinalClassificationSnapshot` e deriva as respostas a partir de:

### 5.1 Fonte primária: `snapshot.action_code`

O código final de ação é o principal driver de resposta por question_id:

| action_code | A_EXECUTED_AS_INTENDED | A_MATCHED_PERCEPTION | A_STEP_OMITTED | A_WRONG_SELECTION | A_CHECK_REQUIRED | A_CHECK_PERFORMED | A_TIME_PRESSURE |
|---|---|---|---|---|---|---|---|
| A-A | yes | yes | no | no | not_applicable* | not_applicable* | insufficient_evidence |
| A-B | no | partial | yes | no | partial | insufficient_evidence | insufficient_evidence |
| A-C | no | partial | insufficient_evidence | insufficient_evidence | yes | no | insufficient_evidence |
| A-D | no | insufficient_evidence | insufficient_evidence | yes | not_applicable* | not_applicable* | insufficient_evidence |
| A-E | no | insufficient_evidence | insufficient_evidence | insufficient_evidence | not_applicable* | not_applicable* | insufficient_evidence |
| A-F | no | no | no | yes | not_applicable* | not_applicable* | insufficient_evidence |
| A-G | no | partial | insufficient_evidence | insufficient_evidence | yes | no | insufficient_evidence |
| A-H | no | no | insufficient_evidence | insufficient_evidence | not_applicable* | not_applicable* | yes |
| A-I | insufficient_evidence | insufficient_evidence | insufficient_evidence | insufficient_evidence | not_applicable* | not_applicable* | insufficient_evidence |
| A-J | no | partial | insufficient_evidence | insufficient_evidence | not_applicable* | not_applicable* | insufficient_evidence |

*`not_applicable` em `A_FEEDBACK_CHECK_REQUIRED/PERFORMED` apenas se não houver sinal de texto. Se houver sinal de texto, pode ser `partial`.

### 5.2 Fonte secundária: `snapshot.step5_final.nos_percorridos`

- As justificativas dos nós percorridos no Step 5 são concatenadas como `evidence`.
- Texto normalizado (`normalizeText`) é usado para detectar:
  - Sinais de verificação/checklist: `checklist`, `callout`, `crosscheck`, `conferencia`, `monitoramento`, `verificacao`, `confirmacao`, `feedback`, `checagem`
  - Sinais de pressão temporal: `pressao temporal`, `pressao de tempo`, `tempo insuficiente`, `sobrecarga`, `interrupcao`, `atrasado`, `slot`, `subestim`, `nao concluiu`
- Se `nodeText` estiver presente, é usado como `evidence`; caso contrário, `action_code=${code}` serve de fallback.

### 5.3 Fonte terciária: `snapshot.step5_final.falhas_descartadas`

- Texto de `falhas_descartadas` é parseado com regex `/A-[A-J]/g` para extrair `discarded_codes`.
- Códigos extraídos são filtrados pelo Set `ACTION_CODES`.

---

## 6. Regras anti-invenção

- Nenhuma resposta `yes` sem evidência extraída do snapshot.
- Se não há sinal suficiente: `answer = insufficient_evidence` ou `not_applicable`.
- Nenhuma chamada LLM é feita neste helper.
- `evidence` nunca é inventada: só usa texto de `nos_percorridos` ou o código final.
- `discarded_codes` nunca são inventados: só extraídos de `falhas_descartadas`.
- A limitação `evidence_may_reflect_engine_path_not_independent_fact` é declarada em todos os itens.

---

## 7. Tratamento especial: A-A e percepção-ação como adaptação HFA

A pergunta `A_ACTION_MATCHED_PERCEIVED_SITUATION` — que avalia se a ação foi coerente com a percepção do operador — usa `source: 'hfa_adaptation'` e `methodological_status: 'HFA_ADAPTATION_REQUIRES_NOTE'`.

**Motivo:** A relação entre percepção e ação no código A-A ("perception-anchored coherent action") é uma operacionalização HFA específica, não uma leitura direta da Hendy Ladder. A pergunta implica correlação cruzada entre os eixos Perception e Action que não é avaliada de forma independente neste helper. A limitação `action_perception_anchoring_is_hfa_adaptation` é declarada explicitamente no item.

---

## 8. Tratamento especial: A-G feedback/check e A-H pressão temporal como adaptações HFA

**A-G (feedback/check failure):** As perguntas `A_FEEDBACK_CHECK_REQUIRED` e `A_FEEDBACK_CHECK_PERFORMED` usam `source: 'hfa_adaptation'` e `methodological_status: 'HFA_ADAPTATION_REQUIRES_NOTE'`. O mapeamento de A-G para "verificação requerida mas não realizada" é uma adaptação operacional HFA, não uma pergunta direta da Hendy Ladder. A limitação `feedback_check_mapping_is_hfa_adaptation` é declarada em ambos os itens.

**A-H (pressão temporal):** A pergunta `A_TIME_PRESSURE_IMPAIRED_EXECUTION` usa `methodological_status: 'DAUMAS_APPLIED_IMPROVEMENT'` quando baseada em `action_code=A-H`, ou `'TECHNICAL_HEURISTIC'` quando baseada em texto de nós. A limitação `time_pressure_action_mapping_is_hfa_adaptation` é declarada.

---

## 9. Relação com trace_isolation

- O helper `buildExperimentalActionQuestionTrace` é chamado APÓS `snapshotBeforeTrace` e ANTES de `snapshotAfterTrace`, em sequência após `buildExperimentalPerceptionQuestionTrace` e `buildExperimentalObjectiveQuestionTrace`.
- Ordem de execução: `snapshotBefore` → `experimentalPerceptionTrace` → `experimentalObjectiveTrace` → `experimentalActionTrace` → `snapshotAfter` → `compare`.
- `snapshotAfterTrace` é construído das mesmas entradas que `snapshotBeforeTrace`, confirmando invariância.
- `compareFinalClassificationSnapshot(before, after)` confirma que `stable_after_trace_build = true` e `changed_fields = []`.
- O helper não mutou step3/step4/step5/step6_7 — invariância estrutural garantida.

---

## 10. O que não foi alterado

- `raw_llm_output.question_trace` — permanece somente com Step 1/2.
- `raw_llm_output.trace_experimental.perception_question_trace` — preservado da fase A3-d5d2-perception.
- `raw_llm_output.trace_experimental.objective_question_trace` — preservado da fase A3-d5d2-objective.
- Classificação P/O/A/ERC.
- Gates e prompts classificatórios.
- `all-steps.ts`.
- Fixtures/candidates/baseline.
- Schema/migrations.
- UI/produto.
- `types.ts` — não foi alterado (todos os tipos necessários já existiam).

---

## 11. Limitações

Todos os itens do subtrace carregam as seguintes limitações:

- `trace_experimental_only`
- `action_axis_only`
- `derived_from_final_snapshot`
- `derived_from_nos_percorridos`
- `does_not_affect_classification`
- `no_new_llm_call`
- `evidence_may_reflect_engine_path_not_independent_fact`
- `not_a_full_hendy_ladder_yet`

Limitações adicionais por item:
- `A_ACTION_MATCHED_PERCEIVED_SITUATION`: `action_perception_anchoring_is_hfa_adaptation`
- `A_FEEDBACK_CHECK_REQUIRED`, `A_FEEDBACK_CHECK_PERFORMED`: `feedback_check_mapping_is_hfa_adaptation`
- `A_TIME_PRESSURE_IMPAIRED_EXECUTION`: `time_pressure_action_mapping_is_hfa_adaptation`

Outras limitações estruturais:
- Derivação baseada em `action_code` final — não avalia cada pergunta de forma independente do relato.
- `evidence` reflete o caminho do motor (nós percorridos), não necessariamente fato externo independente.
- `discarded_codes` só extraídos se presentes em `falhas_descartadas` como padrão `A-[A-J]`.
- Esta fase não preenche Preconditions nem ERC.

---

## 12. Validações

### Typecheck
- `npx tsc --noEmit` — passou sem erros.

### Candidate-only N_RUNS=1
- Report: `methodology-gate-run-1779405765.json`
- PASS 5 | PARTIAL 8 | FAIL 0 | ERROR 0
- Determinism rate: 100%

### Anchors fortes verificados

| fixture_id | expected | actual | status |
|---|---|---|---|
| A0-DAUMAS-E02-A | P-A/O-C/A-F | P-A/O-C/A-F | ✓ PRESERVADO |
| A0-AUTO-001 | P-C/O-A/A-E | P-C/O-A/A-E | ✓ PRESERVADO |
| A0-DAUMAS-E01-B | P-C/O-A/A-E | P-C/O-A/A-E | ✓ PRESERVADO |
| A0-AUTO-003 | P-D/O-A/A-H | P-D/O-A/A-H | ✓ PRESERVADO |
| A0-DAUMAS-E02-B | P-D/O-A/A-H | P-D/O-A/A-H | ✓ PRESERVADO |
| A0-AUTO-004-ADJ | P-A/O-A/A-G | P-A/O-A/A-G | ✓ PRESERVADO |
| A0-CHK-003 | P-G/O-A/A-G | P-G/O-A/A-G | ✓ PRESERVADO |
| A0-CHK-001 | P-G/O-A/A-A | P-G/O-A/A-A | ✓ PRESERVADO |
| A0-FUEL-002 | P-G/O-A/A-A | P-G/O-A/A-A | ✓ PRESERVADO |
| A0-VIS-003 | P-G/O-A/A-A | P-G/O-A/A-A | ✓ PRESERVADO |
| A0-VIS-004-ADJ | P-H/O-A/A-A | P-H/O-A/A-A | ✓ PRESERVADO |
| A0-VIS-005 | P-H/O-A/A-A | P-H/O-A/A-A | ✓ PRESERVADO |
| A0-CHK-002-ADJ | exploratório | P-A/O-A/A-A | ✓ CONHECIDO |

---

## 13. Próxima fase recomendada

- **A3-d5d2-preconditions**: Aplicar o mesmo padrão para Preconditions (`trace_experimental.preconditions_question_trace`) usando `snapshot.precondition_codes` e `snapshot.step6_7_final.precondicoes`.
- **Ou A3-d5e**: Considerar merge incremental de Perception + Objective + Action no `question_trace` principal, somente após os três eixos experimentais estarem estáveis em N_RUNS=3 ou mais.
- **Não retentar merge imediato**: aguardar validação de stabilidade multi-run antes de qualquer promoção.
