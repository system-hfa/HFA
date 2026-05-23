# CRC-NOMINAL-DRAFT-001 — Nominal No-Dominant-Failure Draft

Status: MATERIALIZED_DRAFT
consensusStatus: NOT_CONSENSUS_VALIDATED
NOT_FOR_FREEZE: true
reviewStatus: REVIEW_REQUIRED
Phase: A4+R-53

## caseId
CRC-NOMINAL-DRAFT-001

## sourceType
SYNTHETIC

## fronteira coberta
Caso nominal de ausência de falha dominante: `P-A / O-A / A-A`.

## factualSummary
Cenário sintético de operação regular com briefing completo, execução de procedimento padrão, monitoramento cruzado adequado e correções pequenas dentro do envelope operacional. Não há indícios de desvio intencional, falha de percepção específica dominante ou falha de ação dominante.

## unsafeState
Não há estado inseguro dominante sustentado por evidência; o cenário representa desempenho operacional nominal com variações menores absorvidas por barreiras normais.

## unsafeActCondition
Não há ato/condição insegura dominante identificável neste draft. A análise é deliberadamente construída para testar manutenção da classe no-failure.

## directActor
Tripulação operacional padrão (papel funcional coletivo), sem identificação pessoal.

## proposed P/O/A (pré-consenso)
| Axis | Proposta preliminar |
|------|----------------------|
| P    | P-A |
| O    | O-A |
| A    | A-A |

## expectedBehavior
- O caso deve permanecer no-failure como hipótese principal.
- Não deve haver promoção automática para `CLASSIFIED`.
- Não deve abrir downstream.

## preliminaryRationale
- **P**: não há evidência de falha sensorial, interpretativa, comunicacional ou de monitoramento dominante.
- **O**: não há evidência de objetivo desviante ou tradeoff de risco consciente.
- **A**: não há mecanismo de falha de ação dominante; preserva decisão autoral de `A-A` no-failure.

## evidenceRefs
- [E-001] Briefing operacional completo e alinhado ao procedimento.
- [E-002] Sequência de execução estável e dentro de parâmetros.
- [E-003] Monitoramento cruzado e confirmação de parâmetros sem desvios críticos.

## acceptedUncertainty
- O cenário é sintético e não representa evento real.
- A ausência de falha dominante pode ser reavaliada se novos dados contraditórios forem adicionados.

## rejectedAlternatives
| Axis | Rejected Code | Rationale for Rejection |
|------|---------------|--------------------------|
| P    | P-G | Não há evidência de falha de monitoramento dominante. |
| O    | O-C | Não há evidência de consciência de desvio ou violação pontual. |
| A    | A-C | Não há evidência de falha de feedback pós-ação própria dominante. |

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
- `RULE_NORM_CONTEXT`
- `UNKNOWN_OR_UNCATEGORIZED`

## reviewerNotes
- Draft para calibração inicial de caso nominal.
- Não usar como consenso.
- Não usar como evidência de freeze.

## consensusStatus
NOT_CONSENSUS_VALIDATED
