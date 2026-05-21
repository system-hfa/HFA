# SERA Trace Experimental — Perception Question Trace
## v0.1.4-A3-d5d2-perception-experimental

**Data:** 2026-05-21
**Fase:** SERA v0.1.4-A3-d5d2-perception-experimental
**Tipo:** Subtrace experimental observacional — eixo Perception isolado via snapshot

---

## 1. Objetivo

Adicionar um subtrace experimental do eixo Perception em:

```
raw_llm_output.trace_experimental.perception_question_trace
```

O subtrace é estritamente observacional, não influencia classificação P/O/A/ERC, e valida a arquitetura de isolamento introduzida na fase anterior (A3-isolation-implementation).

---

## 2. Por que começa só por Perception

- As fases A3-d3 e A3-d5d foram rejeitadas por regressão no anchor `A0-DAUMAS-E02-A`.
- A arquitetura de isolamento (snapshot pós-classificação, helper puro, subcampo separado) foi desenhada para eliminar o risco de acoplamento.
- Perception é o eixo mais diretamente derivável a partir de `perception_code` e `step3_final.nos_percorridos`, sem necessidade de nova chamada LLM.
- O subtrace por Perception valida o padrão de isolamento antes de expandir para Objective, Action, Preconditions e ERC.

---

## 3. Onde o subtrace foi armazenado

```
raw_llm_output.trace_experimental.perception_question_trace: SeraQuestionTraceItem[]
```

Não altera:
- `raw_llm_output.question_trace` — permanece com somente Step 1/2.
- `raw_llm_output.trace_isolation` — permanece inalterado.
- Campos P/O/A/ERC, gates, prompts, fixtures, baseline, schema, UI.

---

## 4. Question IDs preenchidos

| question_id | step | descrição |
|---|---|---|
| `P_SENSORY_INFORMATION_AVAILABLE` | perception | Informações sensoriais fisicamente disponíveis? |
| `P_INFORMATION_ATTENDED` | perception | Operador prestou atenção às informações? |
| `P_INFORMATION_INTERPRETED` | perception | Operador interpretou corretamente? |
| `P_CONFLICTING_INFORMATION_INTEGRATED` | perception | Informações conflitantes integradas? |
| `P_KNOWLEDGE_SUFFICIENT` | perception | Conhecimento técnico suficiente? |
| `P_TIME_ATTENTION_ADEQUATE` | perception | Tempo e recursos atencionais adequados? |

Não preenchidos nesta fase: Objective, Action, Preconditions, ERC.

---

## 5. Como as respostas são derivadas do snapshot

O helper `buildExperimentalPerceptionQuestionTrace(snapshot)` recebe `SeraFinalClassificationSnapshot` e deriva as respostas a partir de:

### 5.1 Fonte primária: `snapshot.perception_code`

O código final de percepção é o principal driver de resposta por question_id:

| perception_code | P_SENSORY_AVAILABLE | P_ATTENDED | P_INTERPRETED | P_CONFLICTING | P_KNOWLEDGE | P_TIME |
|---|---|---|---|---|---|---|
| P-A | yes | insufficient_evidence | insufficient_evidence | not_applicable | insufficient_evidence | insufficient_evidence |
| P-B | no | insufficient_evidence | not_applicable | not_applicable | insufficient_evidence | insufficient_evidence |
| P-C | yes | yes | no | not_applicable | no | insufficient_evidence |
| P-D | yes | no | partial | not_applicable | insufficient_evidence | no |
| P-E | yes | yes | no | not_applicable | partial | no |
| P-F | partial | yes | no | not_applicable | partial | insufficient_evidence |
| P-G | yes | no | insufficient_evidence | not_applicable | yes | insufficient_evidence |
| P-H | yes | partial | no | no | insufficient_evidence | insufficient_evidence |

### 5.2 Fonte secundária: `snapshot.step3_final.nos_percorridos`

- As justificativas dos nós percorridos no Step 3 são concatenadas como `evidence`.
- Texto normalizado (`normalizeText`) é usado para detectar sinais de conflito (`conflito`, `divergencia`, `ambigua`, `contraditoria`, `briefing confuso`) e pressão temporal (`pressao temporal`, `tempo insuficiente`, `sobrecarga atencional`, `alta demanda`, `multiplos estimulos`).
- Se `nodeText` estiver presente, é usado como `evidence`; caso contrário, `perception_code=${code}` serve de fallback.

### 5.3 Fonte terciária: `snapshot.step3_final.falhas_descartadas`

- Texto de `falhas_descartadas` é parseado com regex `/P-[A-H]/g` para extrair `discarded_codes`.
- Códigos extraídos são filtrados pelo Set `PERCEPTION_CODES`.

---

## 6. Regras anti-invenção

- Nenhuma resposta `yes` sem evidência extraída do snapshot.
- Se não há sinal suficiente: `answer = insufficient_evidence` ou `not_applicable`.
- Nenhuma chamada LLM é feita neste helper.
- `evidence` nunca é inventada: só usa texto de `nos_percorridos` ou o código final.
- `discarded_codes` nunca são inventados: só extraídos de `falhas_descartadas`.
- A limitação `evidence_may_reflect_engine_path_not_independent_fact` é declarada em todos os itens.

---

## 7. Relação com trace_isolation

- O helper `buildExperimentalPerceptionQuestionTrace` é chamado APÓS `snapshotBeforeTrace` e ANTES de `snapshotAfterTrace`.
- `snapshotAfterTrace` é construído das mesmas entradas que `snapshotBeforeTrace`, confirmando invariância.
- `compareFinalClassificationSnapshot(before, after)` confirma que `stable_after_trace_build = true` e `changed_fields = []`.
- O helper não mutou step3/step4/step5/step6_7 — invariância estrutural garantida.

---

## 8. O que não foi alterado

- `raw_llm_output.question_trace` — permanece somente com Step 1/2.
- Classificação P/O/A/ERC.
- Gates e prompts classificatórios.
- `all-steps.ts`.
- Fixtures/candidates/baseline.
- Schema/migrations.
- UI/produto.
- `types.ts` — não foi alterado (todos os tipos necessários já existiam).

---

## 9. Validação

### Typecheck
- `npx tsc --noEmit` — passou sem erros.

### Candidate-only N_RUNS=1
- Report: `methodology-gate-run-1779401911.json`
- PASS 6 | PARTIAL 7 | FAIL 0 | ERROR 0
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

## 10. Limitações

Todos os itens do subtrace carregam as seguintes limitações:

- `trace_experimental_only`
- `perception_axis_only`
- `derived_from_final_snapshot`
- `derived_from_nos_percorridos`
- `does_not_affect_classification`
- `no_new_llm_call`
- `evidence_may_reflect_engine_path_not_independent_fact`
- `not_a_full_hendy_ladder_yet`

Outras limitações estruturais:
- Derivação baseada em `perception_code` final — não avalia cada pergunta de forma independente do relato.
- `evidence` reflete o caminho do motor (nós percorridos), não necessariamente fato externo independente.
- `discarded_codes` só extraídos se presentes em `falhas_descartadas` como padrão `P-[A-H]`.
- Esta fase não preenche Objective, Action, Preconditions nem ERC.

---

## 11. Próxima fase recomendada

- **A3-d5d2-objective**: Aplicar o mesmo padrão para Objective (`question_trace.trace_experimental.objective_question_trace`) usando `snapshot.objective_code` e `snapshot.step4_final.nos_percorridos`.
- **A3-d5d2-action**: Idem para Action.
- Só após Perception + Objective + Action validados separadamente: considerar merge incremental em `question_trace` principal (fase A3-d5e ou posterior).
- **Não retentar merge imediato**: aguardar validação de pelo menos 2 fases experimentais estáveis.
