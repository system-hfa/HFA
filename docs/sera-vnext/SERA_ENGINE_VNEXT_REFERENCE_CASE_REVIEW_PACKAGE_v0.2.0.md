# SERA Engine vNext Reference Case Review Package v0.2.0

Status: DRAFT_FOR_REVIEW
Phase: A4+R-53 — Reference Case Review Package

## Objetivo
Padronizar a revisão independente inicial de drafts de reference cases para preparar uma etapa posterior de consenso, sem promover casos para `CONSENSUS_VALIDATED` nesta fase.

## Escopo
- Revisão independente por 2+ avaliadores.
- Registro estruturado de proposta P/O/A por eixo.
- Registro de rationale, confidence, evidências e incertezas.
- Preparação para análise de divergências.

## Fora de escopo
- Promoção de casos para `CONSENSUS_VALIDATED`.
- Reunião de consenso final nesta fase.
- Execução formal do estudo inter-rater completo.
- Qualquer abertura downstream.

## Drafts disponíveis para revisão
- `CRC-ADVERSARIAL-DRAFT-001`
- `CRC-NOMINAL-DRAFT-001`
- `CRC-NEGATIVE-CONTROL-DRAFT-001`
- `CRC-ADVERSARIAL-DRAFT-002`

## Instruções para revisor
1. Ler `factualSummary` sem assumir conclusão prévia.
2. Avaliar `unsafeState` com foco em evidência disponível.
3. Avaliar `unsafeActCondition` e fronteira taxonômica do caso.
4. Propor P/O/A independentemente.
5. Registrar rationale por eixo.
6. Registrar confidence por eixo (`LOW | MEDIUM | HIGH`).
7. Registrar `evidenceRefs` usadas na decisão.
8. Registrar `acceptedUncertainty`.
9. Registrar `rejectedAlternatives` por eixo.

## Formulário/checklist de revisão
- `reviewerId` (pseudônimo)
- `caseId`
- `P code`
- `O code`
- `A code`
- `rationale P`
- `rationale O`
- `rationale A`
- `confidence P`
- `confidence O`
- `confidence A`
- `insufficient evidence P?` (`sim/não`)
- `insufficient evidence O?` (`sim/não`)
- `insufficient evidence A?` (`sim/não`)
- `evidenceRefs usadas`
- `acceptedUncertainty`
- `rejectedAlternatives`
- `dúvidas metodológicas`
- `recomendação final` (`REVIEW_READY | NEEDS_MORE_EVIDENCE | REJECT_OR_DEFER`)

## Regras de execução
- Revisores devem trabalhar independentemente.
- Não discutir casos antes da classificação inicial individual.
- Não promover casos para consenso nesta fase.
- Consenso só em fase posterior com trilha formal de divergências.
