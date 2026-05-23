# CRC-ADVERSARIAL-DRAFT-002 — A-A vs A-C Boundary Draft

Status: MATERIALIZED_DRAFT
consensusStatus: NOT_CONSENSUS_VALIDATED
NOT_FOR_FREEZE: true
reviewStatus: REVIEW_REQUIRED
Phase: A4+R-53

## caseId
CRC-ADVERSARIAL-DRAFT-002

## sourceType
ADVERSARIAL

## fronteira coberta
ADV-2-004 — distinção entre `A-A` (sem falha de ação específica) e `A-C` (falha de feedback/verificação pós-ação própria).

## factualSummary
Cenário sintético: operador executa ação procedural prevista, porém há ambiguidade sobre se a verificação do resultado da própria ação foi efetivamente realizada. Parte do registro sugere execução correta; outra parte sugere ausência de confirmação explícita do efeito da ação.

## unsafeState
Possível persistência de condição operacional não detectada imediatamente após ação executada, com dúvida sobre etapa de verificação pós-ação.

## unsafeActCondition
Fronteira adversarial intencional entre:
- ausência de falha de ação específica (`A-A`), e
- falha de feedback/verificação pós-ação própria (`A-C`).

## directActor
Operador único em papel funcional (sem identificação pessoal).

## proposed P/O/A (pré-consenso)
| Axis | Proposta preliminar |
|------|----------------------|
| P    | P-G (hipótese preliminar sujeita a revisão) |
| O    | O-A |
| A    | A-C (hipótese preliminar adversarial) |

## expectedBehavior
- A distinção `A-A` vs `A-C` deve ser tratada explicitamente.
- `A-A` só se sustenta se não houver evidência de falha de verificação pós-ação.
- `A-C` só se sustenta se houver evidência de ação executada + verificação ausente/deficiente.
- Nenhuma promoção automática para consenso nesta fase.

## preliminaryRationale
- **P**: existe hipótese de gap de monitoramento, mas com incerteza residual.
- **O**: não há evidência de objetivo desviante dominante.
- **A**: núcleo do caso é testar a regra canônica da decisão autoral A-A/A-C.

## evidenceRefs
- [E-001] Registro sintético de execução do passo procedural.
- [E-002] Registro sintético sem confirmação explícita do resultado pós-ação.
- [E-003] Nota de ambiguidade construída para teste de fronteira canônica.

## acceptedUncertainty
- Ambiguidade intencional sobre qualidade da verificação pós-ação.
- Potencial divergência esperada entre revisores nesse eixo.

## rejectedAlternatives
| Axis | Rejected Code | Rationale for Rejection |
|------|---------------|--------------------------|
| A    | A-A | Rejeitado provisoriamente quando há indício de ausência de verificação pós-ação. |
| A    | A-B | Não há evidência de omissão de execução da ação principal. |
| O    | O-C | Não há evidência de intenção consciente de violação. |

## expectedLocks
- `downstreamLocked = true`
- `finalConclusionLocked = true`
- `hfacsLocked = true`
- `riskLocked = true`
- `recommendationsLocked = true`
- `selectedCodesRemainUnresolved = true`
- `causalCoreOnly = true`

## evidenceCategoryHints (opcional)
- `PROCEDURAL_MONITORING`
- `FEEDBACK_VERIFICATION`
- `TIME_PRESSURE`

## reviewerNotes
- Draft adversarial para discussão técnica da fronteira A-A/A-C.
- Não usar como consenso.
- Não usar como evidência de freeze.

## consensusStatus
NOT_CONSENSUS_VALIDATED
