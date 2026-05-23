# CRC-NEGATIVE-CONTROL-SKELETON-001 — Negative Control Case Skeleton

Status: DRAFT_CASE_SKELETON
consensusStatus: NOT_CONSENSUS_VALIDATED
NOT_FOR_FREEZE: true
Phase: A4+R-50

## caseId
CRC-NEGATIVE-CONTROL-SKELETON-001

## sourceType
NEGATIVE_CONTROL

## factualSummary
[PLACEHOLDER] Descrever cenário onde NÃO há fator humano relevante ou onde o código esperado é de ausência de falha (ex.: P-A, O-A, A-A). Exemplo: evento com falha puramente mecânica sem contribuição humana identificável. Preencher quando o caso for materializado.

## unsafeState
[PLACEHOLDER]

## unsafeActCondition
[PLACEHOLDER] Deve ser um cenário onde se espera que não haja ato/condição insegura de origem humana, ou onde o código de ausência de falha (A-A) é a classificação correta.

## directActor
[PLACEHOLDER]

## proposed P/O/A (antes de consenso)
| Axis | Avaliador 1 | Avaliador 2 |
|------|-------------|-------------|
| P    | [PLACEHOLDER] | [PLACEHOLDER] |
| O    | [PLACEHOLDER] | [PLACEHOLDER] |
| A    | [PLACEHOLDER] | [PLACEHOLDER] |

## released P/O/A por consenso
| Axis | Code | Confidence |
|------|------|------------|
| P    | [PLACEHOLDER] | [PLACEHOLDER] |
| O    | [PLACEHOLDER] | [PLACEHOLDER] |
| A    | [PLACEHOLDER] | [PLACEHOLDER] |

## rationale por eixo
- **P**: [PLACEHOLDER]
- **O**: [PLACEHOLDER]
- **A**: [PLACEHOLDER] Deve justificar por que A-A (sem falha de ação específica) é a classificação correta, ou por que nenhum código de falha se aplica.

## evidenceRefs
- [E-001] [PLACEHOLDER]

## acceptedUncertainty
[PLACEHOLDER]

## rejectedAlternatives
| Axis | Rejected Code | Rationale for Rejection |
|------|--------------|------------------------|
| P    | [PLACEHOLDER] | [PLACEHOLDER] |
| O    | [PLACEHOLDER] | [PLACEHOLDER] |
| A    | [PLACEHOLDER] | [PLACEHOLDER] |

## expectedLocks
- `downstreamLocked = true`
- `finalConclusionLocked = true`
- `hfacsLocked = true`
- `riskLocked = true`
- `recommendationsLocked = true`
- `selectedCodesRemainUnresolved`
- `causalCoreOnly = true`

## evidenceCategoryHints (opcional, design-only)
[PLACEHOLDER]

## reviewerNotes
Este é um skeleton de negative control. O objetivo é testar que o sistema NÃO classifica incorretamente um evento sem fator humano relevante ou com ausência de falha. A materialização requer um cenário bem definido onde o expected behavior é `A-A`, `P-A`, `O-A`, ou `INSUFFICIENT_EVIDENCE`.

## Limitação
Este arquivo é um placeholder. Não usar para qualquer finalidade metodológica até que seja materializado e validado por consenso.
