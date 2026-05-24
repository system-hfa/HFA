# Real Event Batch 2 Adjudication 010

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

- adjudicationId: REAL-EVENT-BATCH2-ADJUDICATION-010
- sourceExtractionId: A4R72-B2-010
- originalRealEventId: REAL-EVENT-0011
- shortLabel: N860AL S-76C+ taxi pothole and MLG collapse
- adjudicationMode: AI_AUTHOR
- adjudicationConfidence: LOW
- sourceQuality: HIGH
- sourceEnrichmentNeeded: yes

## factualBasis
- Taxi em baixa velocidade com impacto em pothole e colapso de MLG direita.
- Contexto de pavimento degradado e rota usual com risco de infraestrutura.
- Ausência de histórico consolidado de hazard awareness no pacote atual.

## safeOperationEscapePointCandidate
Escape point candidato: contato da aeronave com descontinuidade crítica de pavimento durante taxi, levando a colapso estrutural do trem.

## unsafeState
Comprometimento da segurança de movimento em solo por hazard de infraestrutura.

## unsafeActOrCondition
Fronteira entre condição de infraestrutura degradada e tomada local de rota/gestão de taxi pela tripulação.

## directActor
Tripulação em taxi, com contribuição potencial dominante de condição de infraestrutura.

## P_axis_reasoning
Sem evidência robusta para concluir falha perceptiva específica; houve percepção de "bump" e tentativa de parar.

## O_axis_reasoning
Objetivo operacional nominal de taxi para decolagem, sem desvio intencional.

## A_axis_reasoning
Sem base robusta para classificar falha de ação específica enquanto hazard awareness e alternativas de rota não estiverem melhor ancoradas.

## proposedPCode or UNRESOLVED
UNRESOLVED

## proposedOCode or UNRESOLVED
O-A

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
- P: percepção de irregularidade foi reportada, mas sem base para fechar mecanismo de falha perceptiva.
- O: objetivo nominal.
- A: distribuição entre condição de infraestrutura e decisão de rota não está fechada.

## evidenceRefsByAxis
- P/A: relato de visualização de bump, tentativa de parar, colisão com pothole.
- O: operação normal de taxi para decolagem.

## uncertaintyByAxis
- P: MEDIUM/HIGH
- O: LOW
- A: HIGH

## rejectedAlternatives
- Rejeitado `A-B` por falta de evidência de omissão procedural específica.
- Rejeitado fechamento forçado em falha humana sem histórico de awareness de infraestrutura.

## evidenceCategoryHints
- GROUND_INFRASTRUCTURE_HAZARD
- TAXI_PATH_DECISION
- LOW_SPEED_IMPACT

## maturityStatus
EVIDENCE_ENRICHMENT_REQUIRED

## adjudicationQuestionsForAuthor
- Havia hazard briefing/documentação prévia da área degradada?
- Confirmar manutenção de `A=UNRESOLVED` até clarificar alternatives/constraints de rota.

## downstreamLocks
- proposedCode é draft e não `releasedCode`.
- sem `selectedCode=CLASSIFIED`.
- sem finalConclusion/HFACS/Risk/ERC/recommendations.
- sem fixture/baseline/downstream.

## nextStepRecommendation
Manter enrichment de contexto operacional de aeródromo antes de qualquer fechamento de eixo P/A.
