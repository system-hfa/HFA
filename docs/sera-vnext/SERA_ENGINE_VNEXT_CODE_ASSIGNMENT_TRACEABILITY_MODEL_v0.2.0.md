# SERA Engine vNext Code Assignment Traceability Model v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-47 — Code Assignment Traceability Model

## Objetivo
Adicionar uma camada leve e auditável de rastreabilidade para códigos liberados por revisão humana, sem recalcular classificação, sem alterar `selectedCode`, e sem abrir downstream.

## Relação com A4+R-45d e A4+R-46
- A4+R-45d fixou a decisão canônica: `A-A` = sem falha de ação específica; `A-C` = falha de feedback pós-ação própria.
- A4+R-46 passou a derivar preconditions candidatas de `releasedCode` já guardado semanticamente.
- A4+R-47 adiciona metadados estruturais ao `releasedCode`, preservando os gates já existentes.

## O que foi incorporado do backlog Opus
Incorporado nesta fase:
- `hendyCategory`;
- `isNoFailure` derivado;
- `timePressureExcessive` conceitual (campo opcional por código);
- `derivationPath` mínimo;
- wrapper de traceability por eixo liberado.

## O que NÃO foi incorporado nesta fase
- `evidenceRefs` categorizadas;
- UI/API/DB schema;
- LLM adicional;
- MDC;
- entrevista estruturada;
- HFACS;
- Risk/ERC;
- recommendations;
- finalConclusion;
- múltiplos unsafe acts no data model.

## Contrato de Traceability
`buildReleasedCodeTraceability(...)` retorna `ReleasedCodeTraceabilityResult` com:
- `inputId`;
- `traces: SeraVNextCodeTraceability[]`;
- `globalBlockingIssues`;
- locks explícitos (`downstreamLocked`, `finalConclusionLocked`, `hfacsLocked`, `riskLocked`, `recommendationsLocked`);
- `selectedCodesRemainUnresolved`;
- `causalCoreOnly`.

Cada `SeraVNextCodeTraceability` contém:
- `axis`, `code`;
- `hendyCategory`;
- `isNoFailure`;
- `timePressureExcessive` (`true | false | null`);
- `derivationPath` mínimo;
- `evidenceRefs`, `rationaleRefs` (reaproveitados do release humano, sem categorização nova);
- `source=HUMAN_REVIEW`;
- `taxonomyVersion=SERA_PT_CANONICAL_v1.0`;
- `authorDecisionVersion=SERA_PT_AUTHOR_DECISION_AA_CANONICALIZATION_v1.0`;
- `traceabilityVersion=v0.2.0`;
- `status` (`TRACEABLE | NON_EXISTENT_IN_SERA_PT_V1 | BLOCKED`);
- `warnings`, `blockingIssues`.

## Mapeamento Hendy adotado
- no-failure (`P-A`, `O-A`, `A-A`) -> `hendyCategory = null`
- `O-B/O-C/O-D` -> Hendy #1 Intent Failure
- `P-D/P-G` -> Hendy #2 Attention Failure
- `P-B` -> Hendy #3 Sensory Failure
- `P-C` -> Hendy #4 Knowledge (Perception)
- `P-F` -> Hendy #5 Perception Failure
- `P-H` -> Hendy #6 Communication/Information
- `P-E/A-H` -> Hendy #7 Time Management
- `A-E` -> Hendy #8 Knowledge (Decision)
- `A-D` -> Hendy #9 Ability to Respond
- `A-F/A-I` -> Hendy #10 Action Selection
- `A-B` -> Hendy #11 (mantido como mapeamento conservador sem reabrir A-A/A-C)
- `A-C/A-G/A-J` -> Hendy #12 Feedback Failure

## isNoFailure
`isNoFailure=true` somente para `P-A`, `O-A`, `A-A`.

Implicação canônica:
- `A-A` permanece ausência de falha de ação específica;
- não há reinterpretação de `A-C` como no-failure.

## timePressureExcessive conceitual
Mapeamento explícito nesta fase:
- `P-D` -> `true`
- `P-G` -> `false`
- `A-F` -> `false`
- `A-G` -> `false`
- `A-H` -> `true`
- `A-I` -> `true`
- `A-J` -> `true`
- demais códigos -> `null`

## derivationPath mínimo
O caminho mínimo de derivação registra:
1. eixo liberado por revisão humana;
2. código canônico confirmado;
3. avaliação no-failure (`YES/NO`);
4. mapeamento Hendy;
5. valor de `timePressureExcessive` quando aplicável;
6. verificação de código `NON_EXISTENT_IN_SERA_PT_V1` quando `O-E` surge como guardrail.

## O-E NON_EXISTENT_IN_SERA_PT_V1
`O-E` gera trace com `status=NON_EXISTENT_IN_SERA_PT_V1` e warning explícito; não é tratado como código objetivo ativo.

## Locks downstream
O traceability model mantém os locks:
- sem `CLASSIFIED` automático;
- sem `finalConclusion`;
- sem `HFACS`;
- sem `Risk/ERC`;
- sem `ARMS/ERC`;
- sem `recommendations`;
- sem alteração de `selectedCode`.

## Cenários testados
`tests/sera-vnext/code-traceability-trial-001.ts` cobre:
- cenário A: pacote válido com P/O/A liberados;
- cenário B: `A-A` como no-failure (`isNoFailure=true`, `hendyCategory=null`);
- cenário C: `O-E = NON_EXISTENT_IN_SERA_PT_V1`;
- cenário D: pares temporais (`P-D/P-G`, `A-F/A-G`, `A-H/A-I/A-J`);
- cenário E: `selectedCode` base permanece `UNRESOLVED` e sem `CLASSIFIED`;
- cenário F: locks downstream preservados.

## Limitações
- Não implementa evidência categorizada.
- Não introduz novo schema persistente.
- Não recalcula classificação.
- Não altera release gate nem semantic guard.

## Próxima fase recomendada
A4+R-48 — Preconditions Traceability Refinement (expansão controlada de rastreabilidade de derivação de preconditions, ainda sem downstream final).

## A4+R-48 Update
- O traceability model passou a ser consumível opcionalmente pela derivação de preconditions candidatas.
- Não houve mudança de decisão de release/classificação.
- Evidence categories permanecem design-only e não obrigatórias no runtime desta fase.
