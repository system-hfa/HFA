# SERA Trace Experimental — Objective Question Trace
## v0.1.4-A3-d5d2-objective-experimental

**Data:** 2026-05-21
**Fase:** SERA v0.1.4-A3-d5d2-objective-experimental
**Tipo:** Subtrace experimental observacional — eixo Objective isolado via snapshot

---

## 1. Objetivo

Adicionar um subtrace experimental do eixo Objective em:

```
raw_llm_output.trace_experimental.objective_question_trace
```

O subtrace é estritamente observacional, não influencia classificação P/O/A/ERC, e estende a arquitetura de isolamento introduzida na fase anterior (A3-d5d2-perception-experimental).

---

## 2. Por que Objective após Perception

- A fase A3-d5d2-perception-experimental validou a arquitetura de isolamento (snapshot pós-classificação, helper puro, subcampo separado) sem regressão em ancora forte A0-DAUMAS-E02-A.
- Objective é o segundo eixo mais derivável a partir de `objective_code` e `step4_final.nos_percorridos`, sem necessidade de nova chamada LLM.
- O subtrace por Objective estende o padrão validado antes de expandir para Action, Preconditions e ERC.
- A fase A3-d5d2-perception e esta fase foram executadas na mesma sessão; o subtrace de Perception é preservado integralmente.

---

## 3. Onde o subtrace foi armazenado

```
raw_llm_output.trace_experimental.objective_question_trace: SeraQuestionTraceItem[]
```

Não altera:
- `raw_llm_output.question_trace` — permanece com somente Step 1/2.
- `raw_llm_output.trace_isolation` — permanece inalterado.
- `raw_llm_output.trace_experimental.perception_question_trace` — preservado da fase anterior.
- Campos P/O/A/ERC, gates, prompts, fixtures, baseline, schema, UI.

---

## 4. Question IDs preenchidos

| question_id | step | descrição |
|---|---|---|
| `O_GOAL_IDENTIFIABLE` | objective | Objetivo operacional identificável a partir do relato? |
| `O_GOAL_COMPATIBLE_WITH_SAFE_OPERATION` | objective | Objetivo era compatível com operação segura? |
| `O_RULE_LIMIT_PROCEDURE_AWARENESS` | objective | Operador demonstrava consciência da regra/limite/procedimento relevante? |
| `O_CONSCIOUS_DEVIATION_EVIDENCE` | objective | Evidência de desvio consciente da regra para atingir outro objetivo? |
| `O_GOAL_CONSTRAINED_BY_OPERATIONAL_CONTEXT` | objective | Objetivo foi constrangido por pressão operacional/contexto organizacional? |

Não preenchidos nesta fase: Action, Preconditions, ERC.

---

## 5. Como as respostas são derivadas do snapshot

O helper `buildExperimentalObjectiveQuestionTrace(snapshot)` recebe `SeraFinalClassificationSnapshot` e deriva as respostas a partir de:

### 5.1 Fonte primária: `snapshot.objective_code`

O código final de objetivo é o principal driver de resposta por question_id:

| objective_code | O_GOAL_IDENTIFIABLE | O_GOAL_COMPATIBLE | O_RULE_AWARENESS | O_CONSCIOUS_DEVIATION | O_GOAL_CONSTRAINED |
|---|---|---|---|---|---|
| O-A | yes | yes | partial | no | insufficient_evidence |
| O-B | yes | yes | yes | no | insufficient_evidence |
| O-C | yes | no | no | yes | insufficient_evidence |
| O-D | yes | yes | partial | no | yes |

### 5.2 Fonte secundária: `snapshot.step4_final.nos_percorridos`

- As justificativas dos nós percorridos no Step 4 são concatenadas como `evidence`.
- Texto normalizado (`normalizeText`) é usado para detectar sinais de pressão operacional (`pressao operacional`, `pressao organizacional`, `restricao de tempo`, `carga de trabalho`, `contexto operacional`, `restricao organizacional`).
- Se `nodeText` estiver presente, é usado como `evidence`; caso contrário, `objective_code=${code}` serve de fallback.

### 5.3 Fonte terciária: `snapshot.step4_final.falhas_descartadas`

- Texto de `falhas_descartadas` é parseado com regex `/O-[A-D]/g` para extrair `discarded_codes`.
- Códigos extraídos são filtrados pelo Set `OBJECTIVE_CODES`.

---

## 6. Regras anti-invenção

- Nenhuma resposta `yes` sem evidência extraída do snapshot.
- Se não há sinal suficiente: `answer = insufficient_evidence` ou `not_applicable`.
- Nenhuma chamada LLM é feita neste helper.
- `evidence` nunca é inventada: só usa texto de `nos_percorridos` ou o código final.
- `discarded_codes` nunca são inventados: só extraídos de `falhas_descartadas`.
- A limitação `evidence_may_reflect_engine_path_not_independent_fact` é declarada em todos os itens.

---

## 7. Tratamento especial: O-C e HFA_ADAPTATION_REQUIRES_NOTE

A pergunta `O_CONSCIOUS_DEVIATION_EVIDENCE` — que se refere à consciência de desvio de regra para atingir outro objetivo (escalão O-C da Hendy Ladder) — usa `source: 'HFA_ADAPTATION_REQUIRES_NOTE'` em vez de `'SOURCE_DIRECT_HENDY'`.

**Motivo:** A distinção entre O-C e O-A/O-D requer avaliação clínica aprofundada não disponível neste helper derivativo. O helper deriva a resposta mecanicamente a partir de `objective_code === 'O-C'`, mas essa derivação é uma adaptação HFA, não leitura direta da Hendy Ladder. A limitação `oc_awareness_strict_is_hfa_adaptation` é declarada explicitamente no item.

---

## 8. Relação com trace_isolation

- O helper `buildExperimentalObjectiveQuestionTrace` é chamado APÓS `snapshotBeforeTrace` e ANTES de `snapshotAfterTrace`, em sequência imediatamente após `buildExperimentalPerceptionQuestionTrace`.
- `snapshotAfterTrace` é construído das mesmas entradas que `snapshotBeforeTrace`, confirmando invariância.
- `compareFinalClassificationSnapshot(before, after)` confirma que `stable_after_trace_build = true` e `changed_fields = []`.
- O helper não mutou step3/step4/step5/step6_7 — invariância estrutural garantida.

---

## 9. O que não foi alterado

- `raw_llm_output.question_trace` — permanece somente com Step 1/2.
- `raw_llm_output.trace_experimental.perception_question_trace` — preservado da fase anterior.
- Classificação P/O/A/ERC.
- Gates e prompts classificatórios.
- `all-steps.ts`.
- Fixtures/candidates/baseline.
- Schema/migrations.
- UI/produto.
- `types.ts` — não foi alterado (todos os tipos necessários já existiam).

---

## 10. Validações

### Typecheck
- `npx tsc --noEmit` — passou sem erros.

### Candidate-only N_RUNS=1
- Report: `methodology-gate-run-1779403805.json`
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

## 11. Limitações

Todos os itens do subtrace carregam as seguintes limitações:

- `trace_experimental_only`
- `objective_axis_only`
- `derived_from_final_snapshot`
- `derived_from_nos_percorridos`
- `does_not_affect_classification`
- `no_new_llm_call`
- `evidence_may_reflect_engine_path_not_independent_fact`
- `not_a_full_hendy_ladder_yet`

Limitação adicional em `O_CONSCIOUS_DEVIATION_EVIDENCE`:
- `oc_awareness_strict_is_hfa_adaptation`

Outras limitações estruturais:
- Derivação baseada em `objective_code` final — não avalia cada pergunta de forma independente do relato.
- `evidence` reflete o caminho do motor (nós percorridos), não necessariamente fato externo independente.
- `discarded_codes` só extraídos se presentes em `falhas_descartadas` como padrão `O-[A-D]`.
- Esta fase não preenche Action, Preconditions nem ERC.

---

## 12. Próxima fase recomendada

- **A3-d5d2-action**: Aplicar o mesmo padrão para Action (`question_trace.trace_experimental.action_question_trace`) usando `snapshot.action_code` e `snapshot.step5_final.nos_percorridos`.
- Só após Perception + Objective + Action validados separadamente: considerar merge incremental em `question_trace` principal (fase A3-d5e ou posterior).
- **Não retentar merge imediato**: aguardar validação de pelo menos 2 fases experimentais estáveis.
