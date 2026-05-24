# CRC-ADVERSARIAL-DRAFT-001 — O-E Non-Existent Boundary Draft

Status: MATERIALIZED_DRAFT
consensusStatus: NOT_CONSENSUS_VALIDATED
NOT_FOR_FREEZE: true
reviewStatus: REVIEW_REQUIRED
Phase: A4+R-52

## caseId
CRC-ADVERSARIAL-DRAFT-001

## sourceType
ADVERSARIAL

## fronteira coberta
ADV-2-013 — `O-E = NON_EXISTENT_IN_SERA_PT_V1` e não pode ser usado como código objetivo ativo.

## factualSummary
Cenário sintético controlado para estressar a fronteira do eixo Objective. Um revisor humano registra narrativa com contexto operacional ambíguo e tenta propor `O-E` como atalho de classificação para "objetivo indefinido". O caso simula situação de revisão em que há pressão para fechar classificação, mas sem evidência semântica de `O-A/O-B/O-C/O-D` suficiente.

## unsafeState
Estado inseguro operacional descrito de forma genérica: continuação de operação em contexto degradado com incerteza sobre framing de intenção e awareness de regra.

## unsafeActCondition
Ato/condição sob análise: tentativa de mapear incerteza de objetivo para `O-E` ativo em vez de manter unresolved/review-required.

## directActor
Revisor operacional único (papel funcional), sem dados pessoais.

## proposed P/O/A (pré-consenso)
| Axis | Proposta preliminar |
|------|----------------------|
| P    | P-A (sem falha perceptiva específica dominante nesta síntese) |
| O    | O-E (proposta adversarial proposital para teste de bloqueio) |
| A    | A-A (sem falha de ação específica dominante nesta síntese) |

## expected behavior
- `O-E` deve ser tratado como `NON_EXISTENT_IN_SERA_PT_V1`.
- Não deve existir promoção para candidato objetivo ativo a partir de `O-E`.
- Caso deve permanecer em trilha de revisão/limitação, não em consenso.

## rationale preliminar
- **P**: não há evidência sintética suficiente de mecanismo perceptivo específico; postura conservadora.
- **O**: a proposta de `O-E` é intencionalmente adversarial para validar bloqueio de código inexistente na taxonomia ativa.
- **A**: não há mecanismo sintético explícito de falha de ação dominante neste draft.

## evidenceRefs
- [E-001] Taxonomia canônica define `O-E = NON_EXISTENT_IN_SERA_PT_V1`.
- [E-002] Contrato adversarial ADV-2-013 exige bloqueio de `O-E` ativo.
- [E-003] Guia de consenso requer coerência com taxonomia canônica e decisão autoral.

## acceptedUncertainty
- Não há decisão consensual de P/O/A neste draft.
- A narrativa sintética não pretende representar verdade causal real.
- O caso ainda não foi submetido a 2+ revisores independentes.

## rejectedAlternatives
| Axis | Rejected Code | Rationale for Rejection |
|------|---------------|--------------------------|
| O    | O-E ativo | Rejeitado por regra canônica: `O-E = NON_EXISTENT_IN_SERA_PT_V1`. |
| O    | O-C | Ausência de evidência robusta de intent/rule-awareness neste draft. |
| O    | O-D | Ausência de evidência robusta de tradeoff de eficiência formalizado. |

## expectedLocks
- `downstreamLocked = true`
- `finalConclusionLocked = true`
- `hfacsLocked = true`
- `riskLocked = true`
- `recommendationsLocked = true`
- `selectedCodesRemainUnresolved = true`
- `causalCoreOnly = true`

## evidenceCategoryHints (opcional)
- `INTENT_AWARENESS`
- `RULE_NORM_CONTEXT`
- `UNKNOWN_OR_UNCATEGORIZED`

## reviewerNotes
- Draft materializado apenas para preparação de revisão.
- Não usar como verdade causal.
- Não usar como caso inter-rater concluído.
- Não usar para candidate freeze.

## consensusStatus
NOT_CONSENSUS_VALIDATED
