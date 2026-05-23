# CRC-NEGATIVE-CONTROL-DRAFT-001 — Insufficient Evidence Control Draft

Status: MATERIALIZED_DRAFT
consensusStatus: NOT_CONSENSUS_VALIDATED
NOT_FOR_FREEZE: true
reviewStatus: REVIEW_REQUIRED
Phase: A4+R-53

## caseId
CRC-NEGATIVE-CONTROL-DRAFT-001

## sourceType
NEGATIVE_CONTROL

## fronteira coberta
Controle negativo com evidência insuficiente para classificar P/O/A: deve permanecer `UNRESOLVED / INSUFFICIENT_EVIDENCE`.

## factualSummary
Cenário sintético mínimo: “a aeronave desviou momentaneamente da altitude prevista e retornou em seguida”. Não há informação confiável sobre cues disponíveis, framing de objetivo, intenção, awareness de regra, distribuição de tarefas, nem sequência de ação verificável.

## unsafeState
Estado inseguro potencialmente transitório sem base factual suficiente para caracterização causal robusta.

## unsafeActCondition
Indeterminado por insuficiência de dados; não é possível distinguir ato inseguro dominante de condição insegura dominante.

## directActor
Não determinado com evidência suficiente.

## proposed P/O/A (pré-consenso)
| Axis | Proposta preliminar |
|------|----------------------|
| P    | INSUFFICIENT_EVIDENCE |
| O    | INSUFFICIENT_EVIDENCE |
| A    | INSUFFICIENT_EVIDENCE |

## expectedBehavior
- Caso deve permanecer `UNRESOLVED` sem liberação de código ativo por eixo.
- Ausência de evidência não pode ser convertida em hipótese classificatória forte.
- Locks downstream devem permanecer íntegros.

## preliminaryRationale
- **P**: ausência de dados sobre percepção/cues/monitoramento inviabiliza classificação.
- **O**: ausência de dados de intenção e awareness inviabiliza classificação de objetivo.
- **A**: ausência de dados de sequência de ação e verificação inviabiliza classificação de ação.

## evidenceRefs
- [E-001] Registro textual curto sem cadeia factual completa.
- [E-002] Ausência de evidências trianguladas sobre percepção, objetivo e ação.
- [E-003] Falta de identificação inequívoca de ator direto e contexto decisório.

## acceptedUncertainty
- Incerteza estrutural alta em todos os eixos.
- O caso foi construído para testar contenção metodológica sob baixa informação.

## rejectedAlternatives
| Axis | Rejected Code | Rationale for Rejection |
|------|---------------|--------------------------|
| P    | P-C | Não há dados suficientes para afirmar falha de interpretação. |
| O    | O-D | Não há dados de objetivo de eficiência/tradeoff consciente. |
| A    | A-A | Não há dados suficientes para afirmar no-failure com segurança. |

## expectedLocks
- `downstreamLocked = true`
- `finalConclusionLocked = true`
- `hfacsLocked = true`
- `riskLocked = true`
- `recommendationsLocked = true`
- `selectedCodesRemainUnresolved = true`
- `causalCoreOnly = true`

## evidenceCategoryHints (opcional)
- `UNKNOWN_OR_UNCATEGORIZED`

## reviewerNotes
- Draft de controle negativo para evitar over-classification.
- Não usar como consenso.
- Não usar para freeze.

## consensusStatus
NOT_CONSENSUS_VALIDATED
