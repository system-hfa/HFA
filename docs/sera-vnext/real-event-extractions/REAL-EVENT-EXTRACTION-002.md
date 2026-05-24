# Real Event Structured Extraction 002

Status:
- STRUCTURED_EXTRACTION_DRAFT
- NOT_CLASSIFIED
- NOT_FIXTURE
- NOT_BASELINE
- NOT_CONSENSUS_VALIDATED
- NOT_FOR_DOWNSTREAM

- extractionId: REAL-EVENT-EXTRACTION-002
- sourceDocument: `docs/real-event-harvest/REAL_EVENT_DEEP_EXTRACTION_0001_0002_v0.1.4.md`
- sourceLocator: `PART B — REAL-EVENT-0002`, sections 15–25
- originalCandidateId: REAL-EVENT-0002
- shortLabel: G-WIWI Peasmarsh discontinued night approach near trees
- sourceType: OFFICIAL_REPORT / AAIB field investigation via curated extraction document
- extractionConfidence: HIGH

## factualSummary
Em operação noturna para local privado de pouso com visibilidade reduzida e teto baixo, a aproximação foi descontinuada. O material indica ausência de procedimento/rota de arremetida disponível ou briefada. Após a transição, a aeronave desceu em direção ao topo de árvores. Há referência de alerta EGPWS emitido, sem percepção pela tripulação, e sem danos/feridos.

## eventSequence
1. Posicionamento para operação noturna em local privado.
2. Aproximação noturna com baixa visibilidade/nuvem baixa.
3. Aproximação descontinuada.
4. Ausência de rota/procedimento de arremetida briefado/disponível.
5. Trajetória desce em direção a obstáculos (árvores).
6. Registro de alertas EGPWS não percebidos pela tripulação.
7. Evento sem danos materiais e sem lesões.

## unsafeStateCandidate
Proximidade insegura com obstáculos durante transição de aproximação descontinuada/arremetida em ambiente noturno degradado.

## unsafeActConditionCandidate
Candidato preliminar (não conclusivo): trajetória de escape/go-around executada sem proteção suficiente de separação de obstáculos.

## directActorCandidate
Tripulação de voo (PF/PM pendente de separação factual nesta fase).

## evidenceFragments
- "night approach ... reduced visibility and low cloud."
- "The approach was discontinued."
- "No go-around procedure or routing was available or briefed."
- "the helicopter descended toward the tops of trees."
- "EGPWS issued warnings ... flight crew were not aware."

## uncertaintyNotes
- Ambiguidade estrutural entre planejamento/objetivo do escape, percepção de alerta/obstáculo e execução da trajetória.
- Não há decomposição factual completa da sequência PF vs PM durante a transição.
- Mecanismo exato de não percepção dos alertas (áudio, carga, atenção, expectativa) permanece aberto.

## excludedInformation
- Safety recommendations e julgamentos AAIB.
- Qualquer interpretação causal final do relatório como verdade metodológica.
- Conversão automática de "warning not perceived" para código SERA.
- Qualquer importação de classificações legadas/HFACS.

## possibleEvidenceCategoryHints
- COMMUNICATION_INFORMATION
- INTENT_AWARENESS
- PROCEDURAL_MONITORING
- FEEDBACK_VERIFICATION
- PERCEPTUAL_AMBIGUITY

## adjudicationQuestions
- A ausência de rota briefada é dominante como condição de objetivo operacional, ou secundária a percepção/execução?
- Em termos metodológicos, o ponto de escape deve ser modelado na descontinuação ou na descida para obstáculos?
- A não percepção de EGPWS foi de comunicação/alerta, de atenção perceptiva, ou combinação?

## nextStepRecommendation
Levar para A4+R-63 como caso adversarial prioritário para separar planejamento de escape, percepção de alerta e execução de trajetória sem importar conclusões do relatório.
