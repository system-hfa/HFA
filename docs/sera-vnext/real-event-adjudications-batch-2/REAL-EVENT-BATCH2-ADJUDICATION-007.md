# Real Event Batch 2 Adjudication 007

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

- adjudicationId: REAL-EVENT-BATCH2-ADJUDICATION-007
- sourceExtractionId: A4R72-B2-007
- originalRealEventId: REAL-EVENT-0007
- shortLabel: 5N-BGD S-76C+ pushrod separation lagoon crash
- adjudicationMode: AI_AUTHOR
- adjudicationConfidence: LOW
- sourceQuality: HIGH
- sourceEnrichmentNeeded: yes

## factualBasis
- Evidência de separação pushrod/rod-end e jam nut solto.
- Perda de controlabilidade em voo e impacto na lagoa.
- Cadeia de manutenção/inspeção ainda incompleta no pacote desta fase.

## safeOperationEscapePointCandidate
Escape point candidato: separação da ligação de controle com degradação abrupta de autoridade de comando em voo.

## unsafeState
Perda/degradação de controlabilidade por falha de integridade mecânica em linkage de controle.

## unsafeActOrCondition
Predominância de unsafe condition técnico-mecânica; sem evidência robusta para atribuir falha humana ativa específica.

## directActor
UNRESOLVED (ator direto humano não demonstrado para evento iniciador).

## P_axis_reasoning
Sem base robusta para eixo perceptivo como iniciador dominante.

## O_axis_reasoning
Objetivo operacional aparente nominal, sem evidência de desvio intencional.

## A_axis_reasoning
Sem mecanismo de ação humana iniciadora robustamente demonstrado; resposta da tripulação é downstream da falha técnica.

## proposedPCode or UNRESOLVED
UNRESOLVED

## proposedOCode or UNRESOLVED
O-A

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
- P/A: bloqueados por condição técnica dominante sem cadeia humana discriminada.
- O: sem sinal de desvio de objetivo.

## evidenceRefsByAxis
- P/A: fragmentos de separação mecânica e perda de controle.
- O: perfil de missão nominal sem evidência de objetivo desviante.

## uncertaintyByAxis
- P: HIGH
- O: LOW
- A: HIGH

## rejectedAlternatives
- Rejeitada conversão automática de evento técnico em falha humana ativa.
- Rejeitado `A-A` como fallback por lacuna de evidência (regra no-failure não é fallback para desconhecido).

## evidenceCategoryHints
- FLIGHT_CONTROL_MECHANICAL_INTEGRITY
- MAINTENANCE_TRACEABILITY
- FAILURE_DETECTION_BARRIER

## maturityStatus
EVIDENCE_ENRICHMENT_REQUIRED

## adjudicationQuestionsForAuthor
- Há evidência adicional de cadeia de manutenção/inspeção que permita reduzir UNRESOLVED?
- Confirmar manutenção de leitura condition-dominant sem ator direto humano nesta rodada.

## downstreamLocks
- proposedCode é draft e não `releasedCode`.
- sem `selectedCode=CLASSIFIED`.
- sem finalConclusion/HFACS/Risk/ERC/recommendations.
- sem fixture/baseline/downstream.

## nextStepRecommendation
Priorizar enrichment de maintenance-chain antes de qualquer tentativa de fechamento de P/A.
