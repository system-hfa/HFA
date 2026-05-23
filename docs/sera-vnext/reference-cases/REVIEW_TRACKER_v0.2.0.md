# Reference Cases Review Tracker v0.2.0

Status: DRAFT_TRACKER
Phase: A4+R-53

## Objetivo
Controlar o andamento da revisão independente dos drafts de reference cases e registrar estado de divergência sem promoção para consenso nesta fase.

## Tabela de controle
| caseId | status | reviewerA | reviewerB | divergenceStatus | consensusCandidate | notes |
|---|---|---|---|---|---|---|
| CRC-ADVERSARIAL-DRAFT-001 | MATERIALIZED_DRAFT | dry_run_done | dry_run_done | minor_divergence | dry_run_candidate_only | dry run only; not formal inter-rater; not consensus validated |
| CRC-NOMINAL-DRAFT-001 | MATERIALIZED_DRAFT | dry_run_done | dry_run_done | no_divergence | dry_run_candidate_only | dry run only; not formal inter-rater; not consensus validated |
| CRC-NEGATIVE-CONTROL-DRAFT-001 | MATERIALIZED_DRAFT | dry_run_done | dry_run_done | minor_divergence | no | dry run only; not formal inter-rater; not consensus validated |
| CRC-ADVERSARIAL-DRAFT-002 | MATERIALIZED_DRAFT | dry_run_done | dry_run_done | major_divergence | no | dry run only; not formal inter-rater; not consensus validated |

## A4+R-55 — Divergence Resolution Guide

- As divergências identificadas no dry run A4+R-54 foram analisadas e endereçadas pelo guia A4+R-55: [Dry Run Divergence Resolution Guide](../SERA_ENGINE_VNEXT_DRY_RUN_DIVERGENCE_RESOLUTION_GUIDE_v0.2.0.md).
- Regras propostas para calibração de revisores reais: no-failure não é fallback para unknown; O-E reservado não vira O-A automático; A-C exige falha de verificação pós-ação própria.
- Todos os casos permanecem NOT_CONSENSUS_VALIDATED.
- Nenhum caso foi promovido para CONSENSUS_CANDIDATE formal.
- A próxima revisão real (com avaliadores independentes) deve aplicar o guia A4+R-55 antes da classificação.

## Regras do tracker
- Todos os casos iniciam como `pending` para reviewerA/reviewerB.
- `consensusCandidate` permanece `no` ou `dry_run_candidate_only` nesta fase.
- Nenhuma linha pode ser marcada como `CONSENSUS_VALIDATED` neste ciclo.
- Atualizações `dry_run_done` representam apenas simulação documental e não substituem revisão formal.
- `dry_run_candidate_only` não é consenso formal e não autoriza downstream.
