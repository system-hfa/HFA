# Real Event Batch 2 Adjudication 002

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

- adjudicationId: REAL-EVENT-BATCH2-ADJUDICATION-002
- sourceExtractionId: A4R72-B2-002
- originalRealEventId: REAL-EVENT-0005
- shortLabel: PK-TVY S-76++ Soehanah helideck tumble near touchdown
- adjudicationMode: AI_AUTHOR
- adjudicationConfidence: LOW
- sourceQuality: MEDIUM
- sourceEnrichmentNeeded: yes

## factualBasis
- Voo offshore sem anormalidades reportadas até a aproximação.
- Evento de tumble à direita imediatamente antes do toque na helideck.
- Ambiguidade documental sobre PF/PM e handover no trecho final.

## safeOperationEscapePointCandidate
Escape point candidato: transição de aproximação estabilizada para instabilidade lateral/atitude imediatamente pré-touchdown na helideck.

## unsafeState
Estado de instabilidade lateral próximo ao solo/deck em fase final de pouso.

## unsafeActOrCondition
Incerteza dominante entre dinâmica de toque/wind/deck e cadeia de controle/coordenação PF/PM.

## directActor
Tripulação de voo, com ator direto indeterminado por ambiguidade de handover.

## P_axis_reasoning
Sem base robusta para discriminar falha perceptiva específica no trecho final.

## O_axis_reasoning
Objetivo aparente foi pouso operacional em helideck, sem evidência de desvio intencional.

## A_axis_reasoning
Sem timeline confiável para atribuir mecanismo de ação específico; risco alto de overclassification.

## proposedPCode or UNRESOLVED
UNRESOLVED

## proposedOCode or UNRESOLVED
O-A

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
- P: cadeia de percepção/monitoramento não separada.
- O: sem evidência de intenção de violação/eficiência desviante.
- A: ambiguidade de papéis impede fechamento de código de ação.

## evidenceRefsByAxis
- P: apenas estado final instável, sem mecanismo perceptivo discriminável.
- O: missão de transporte offshore e tentativa de touchdown nominal.
- A: inconsistência PF/PM entre blocos do relatório.

## uncertaintyByAxis
- P: HIGH
- O: LOW
- A: HIGH

## rejectedAlternatives
- `P-G` rejeitado por ausência de evidência suficiente de monitoramento específico.
- `A-F`/`A-C` rejeitados por falta de sequência de inputs e responsabilidades finais.

## evidenceCategoryHints
- HELIDECK_FINAL_PHASE
- CONTROL_TRANSFER
- CREW_COORDINATION
- WIND_SURFACE_INTERACTION

## maturityStatus
EVIDENCE_ENRICHMENT_REQUIRED

## adjudicationQuestionsForAuthor
- Qual PF/PM final é canônico para adjudicação deste caso?
- Existe evidência objetiva (FDR/CVR) para separar causa dinâmica de ação de controle?

## downstreamLocks
- proposedCode é draft e não `releasedCode`.
- sem `selectedCode=CLASSIFIED`.
- sem finalConclusion/HFACS/Risk/ERC/recommendations.
- sem fixture/baseline/downstream.

## nextStepRecommendation
Manter em trilha de enrichment para reconciliação PF/PM e dinâmica final antes de qualquer redução de UNRESOLVED.
