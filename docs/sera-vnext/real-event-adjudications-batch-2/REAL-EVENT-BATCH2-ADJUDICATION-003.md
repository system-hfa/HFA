# Real Event Batch 2 Adjudication 003

Status:
- AI_AUTHOR_ADJUDICATION_DRAFT
- BATCH_2
- NOT_FIXTURE
- NOT_BASELINE
- NOT_CONSENSUS_VALIDATED
- NOT_FOR_DOWNSTREAM
- NO_RELEASED_CODE
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_RECOMMENDATIONS

- adjudicationId: REAL-EVENT-BATCH2-ADJUDICATION-003
- sourceExtractionId: A4R72-B2-003
- originalRealEventId: REAL-EVENT-0010
- shortLabel: N798P S-76C++ helideck rollover after ground reposition
- adjudicationMode: AI_AUTHOR
- adjudicationConfidence: MEDIUM
- sourceQuality: HIGH
- sourceEnrichmentNeeded: no

## factualBasis
- Pouso inicial em helideck descrito como normal.
- Reposicionamento (ground taxi/turn) para liberar escada.
- Rock/squat seguido de rollover rápido à direita.

## safeOperationEscapePointCandidate
Escape point candidato: perda de margem de estabilidade lateral durante manobra de reposicionamento em deck, após pouso inicial estável.

## unsafeState
Transição de estabilidade em solo para rolamento lateral irreversível no deck.

## unsafeActOrCondition
Caso de fronteira entre ação de reposicionamento e condição de ambiente/deck/vento; sem discriminação causal robusta para fechamento de eixo A.

## directActor
Piloto executando reposicionamento com suporte de monitoramento do outro tripulante.

## P_axis_reasoning
Não há evidência suficiente de falha perceptiva específica isolável.

## O_axis_reasoning
Objetivo operacional aparente: reposicionar aeronave para condição segura de desembarque/clearance.

## A_axis_reasoning
Existe ação direta de reposicionamento, porém sem dados de input/limites dinâmicos para classificar mecanismo específico de falha.

## proposedPCode or UNRESOLVED
UNRESOLVED

## proposedOCode or UNRESOLVED
O-A

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
- P: mecanismo perceptivo não discriminado.
- O: objetivo nominal operacional sem desvio intencional aparente.
- A: causalidade de ação versus condição dinâmica permanece aberta.

## evidenceRefsByAxis
- P: ausência de evidência fina de percepção em tempo real.
- O: reposicionamento para liberar saída da plataforma.
- A: manobra ocorreu, mas sem telemetria suficiente para mecanismo de erro de ação.

## uncertaintyByAxis
- P: HIGH
- O: LOW
- A: MEDIUM/HIGH

## rejectedAlternatives
- `P-G` rejeitado por evidência perceptiva insuficiente.
- `A-F` rejeitado por ausência de prova de seleção inadequada entre alternativas conhecidas.

## evidenceCategoryHints
- HELIDECK_GROUND_MANEUVER
- WIND_MARGIN
- CONTROL_INPUT_SEQUENCE
- CREW_MONITORING

## maturityStatus
HOLD_UNRESOLVED

## adjudicationQuestionsForAuthor
- Manter `A=UNRESOLVED` até obter dados objetivos de input/vento/limites?
- Confirmar que `O-A` é o draft mais conservador para objetivo da manobra.

## downstreamLocks
- proposedCode é draft e não `releasedCode`.
- sem `selectedCode=CLASSIFIED`.
- sem finalConclusion/HFACS/Risk/ERC/recommendations.
- sem fixture/baseline/downstream.

## nextStepRecommendation
Levar para A4+R-74 como caso de fronteira action-vs-condition em operações de helideck.
