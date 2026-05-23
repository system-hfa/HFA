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

## Dry Run Divergence Rules before Formal Review

Regras derivadas do dry run A4+R-54, formalizadas no guia A4+R-55, que revisores reais devem aplicar antes da classificação independente:

1. **no-failure não é fallback para unknown**: P-A, O-A e A-A exigem evidência negativa mínima. Ausência de evidência não é automaticamente ausência de falha. Quando a evidência disponível não permite afirmar que não houve falha, marcar UNRESOLVED / INSUFFICIENT_EVIDENCE, não forçar P-A/O-A/A-A.

2. **O-E reservado não vira O-A automático**: O-E é RESERVED / NOT_ACTIVE conforme taxonomia canônica v1.0. Se O-E for proposto, deve ser bloqueado. O bloqueio de O-E não empurra automaticamente o eixo para O-A — o eixo deve ser reavaliado com base em evidência para os códigos ativos (O-A a O-D). Se não houver evidência suficiente para nenhum código ativo, marcar UNRESOLVED.

3. **A-C exige falha de verificação pós-ação própria**: A distinção A-A/A-C depende de evidência específica. A-A = ação coerente sem mecanismo de falha identificável. A-C = ação executada com ausência de verificação do resultado da própria ação. Se há evidência de ausência de verificação, preferir A-C. Se a evidência é insuficiente para determinar se houve verificação, marcar UNRESOLVED, não forçar A-A nem A-C.

Estas regras devem ser lidas e compreendidas por todos os revisores antes do início da Fase 2 (classificação independente) do protocolo inter-rater.

Referência: [Dry Run Divergence Resolution Guide](./SERA_ENGINE_VNEXT_DRY_RUN_DIVERGENCE_RESOLUTION_GUIDE_v0.2.0.md)

## Regras de execução
- Revisores devem trabalhar independentemente.
- Não discutir casos antes da classificação inicial individual.
- Não promover casos para consenso nesta fase.
- Consenso só em fase posterior com trilha formal de divergências.
- Aplicar as Dry Run Divergence Rules antes da classificação independente.
