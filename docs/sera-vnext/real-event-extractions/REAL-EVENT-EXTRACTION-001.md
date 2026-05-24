# Real Event Structured Extraction 001

Status:
- STRUCTURED_EXTRACTION_DRAFT
- NOT_CLASSIFIED
- NOT_FIXTURE
- NOT_BASELINE
- NOT_CONSENSUS_VALIDATED
- NOT_FOR_DOWNSTREAM

- extractionId: REAL-EVENT-EXTRACTION-001
- sourceDocument: `docs/real-event-harvest/REAL_EVENT_DEEP_EXTRACTION_0001_0002_v0.1.4.md`
- sourceLocator: `PART A — REAL-EVENT-0001`, sections 3–11
- originalCandidateId: REAL-EVENT-0001
- shortLabel: S-92A Thebaud offshore low-energy descent
- sourceType: OFFICIAL_REPORT (TSB A19A0055) via curated extraction document
- extractionConfidence: HIGH

## factualSummary
Durante voo IFR para instalação offshore (Thebaud), após duas aproximações por instrumento malsucedidas por baixa visibilidade/nuvens baixas, a tripulação adquiriu contato visual e iniciou aproximação visual. Em seguida, a aeronave entrou em estado de alta razão de descida e baixa velocidade, com torque máximo reportado de 146%, e a descida foi contida a aproximadamente 13 pés da água. Houve depois segunda descida inadvertida na saída manual, corrigida em tempo, sem feridos.

## eventSequence
1. Decolagem IFR de Halifax para instalação offshore.
2. Duas tentativas de aproximação por instrumento sem sucesso.
3. Contato visual com a plataforma durante arremetida.
4. Decisão de realizar aproximação visual.
5. Desenvolvimento de estado de baixa energia (baixa velocidade + alta razão de descida).
6. Overtorque reportado durante a recuperação.
7. Recuperação a muito baixa altura sobre a água.
8. Segunda descida inadvertida na saída subsequente e correção.
9. Retorno a Halifax.

## unsafeStateCandidate
Estado de voo com baixa energia (low airspeed + high rate of descent) em aproximação visual offshore, com margem vertical reduzida.

## unsafeActConditionCandidate
Candidato preliminar (não conclusivo): continuidade/gestão da aproximação visual enquanto o perfil degradava para estado de baixa energia antes da correção.

## directActorCandidate
Tripulação de voo (PF/PM ainda não separados nesta fase).

## evidenceFragments
- "Two instrument approaches were attempted ... unsuccessful because of low clouds and poor visibility."
- "After acquiring visual contact, the crew elected to carry out a visual approach."
- "Shortly after commencing the visual approach ... high rate of descent; low airspeed."
- "engines were overtorqued and reached a maximum torque value of 146%."
- "descent ... arrested at approximately 13 feet above the water."
- "EGPWS did not alert ... gear-down, below-50-KIAS condition" (barreira degradada).

## uncertaintyNotes
- Mecanismo dominante ainda ambíguo entre percepção/monitoramento, execução de controle e barreira de alerta.
- PF/PM e temporalidade exata dos callouts não estão decompostos neste pacote.
- Não há nesta fase reconstrução completa de instrumentos/entradas de controle por timestamp.

## excludedInformation
- Conclusões finais/prováveis causas do TSB.
- Recomendações e juízos investigativos.
- Qualquer classificação antiga (incluindo rótulos externos) tratada como gabarito.
- Qualquer mapeamento direto para P/O/A, HFACS, Risk/ERC.

## possibleEvidenceCategoryHints
- SENSORY_LIMITATION
- PERCEPTUAL_AMBIGUITY
- FEEDBACK_VERIFICATION
- RULE_NORM_CONTEXT
- UNKNOWN_OR_UNCATEGORIZED

## adjudicationQuestions
- A não detecção do estado de baixa energia foi primariamente perceptiva ou de monitoramento/procedimento?
- O ponto de escape seguro deve ser ancorado na transição para visual ou no instante de degradação energética detectável?
- Qual o peso metodológico da lacuna de alerta (EGPWS) como condição vs conduta?

## nextStepRecommendation
Levar para A4+R-63 com foco em adjudicação AI/Author da fronteira percepção vs ação sob DVE offshore, mantendo quarentena explícita das conclusões investigativas originais.
