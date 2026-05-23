# Reference Cases Review Tracker v0.2.0

Status: DRAFT_TRACKER
Phase: A4+R-53

## Objetivo
Controlar o andamento da revisão independente dos drafts de reference cases e registrar estado de divergência sem promoção para consenso nesta fase.

## Tabela de controle
| caseId | status | reviewerA | reviewerB | divergenceStatus | consensusCandidate | notes |
|---|---|---|---|---|---|---|
| CRC-ADVERSARIAL-DRAFT-001 | MATERIALIZED_DRAFT | pending | pending | not_assessed | no | NOT_CONSENSUS_VALIDATED |
| CRC-NOMINAL-DRAFT-001 | MATERIALIZED_DRAFT | pending | pending | not_assessed | no | NOT_CONSENSUS_VALIDATED |
| CRC-NEGATIVE-CONTROL-DRAFT-001 | MATERIALIZED_DRAFT | pending | pending | not_assessed | no | NOT_CONSENSUS_VALIDATED |
| CRC-ADVERSARIAL-DRAFT-002 | MATERIALIZED_DRAFT | pending | pending | not_assessed | no | NOT_CONSENSUS_VALIDATED |

## Regras do tracker
- Todos os casos iniciam como `pending` para reviewerA/reviewerB.
- `consensusCandidate` permanece `no` nesta fase.
- Nenhuma linha pode ser marcada como `CONSENSUS_VALIDATED` neste ciclo A4+R-53.
