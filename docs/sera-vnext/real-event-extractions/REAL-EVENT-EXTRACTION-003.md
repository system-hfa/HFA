# Real Event Structured Extraction 003

Status:
- STRUCTURED_EXTRACTION_DRAFT
- NOT_CLASSIFIED
- NOT_FIXTURE
- NOT_BASELINE
- NOT_CONSENSUS_VALIDATED
- NOT_FOR_DOWNSTREAM

- extractionId: REAL-EVENT-EXTRACTION-003
- sourceDocument: `docs/real-event-harvest/REAL_EVENT_DEEP_EXTRACTION_0003_0004_0006_v0.1.4.md`
- sourceLocator: `PART B — REAL-EVENT-0004`, sections 15–25
- originalCandidateId: REAL-EVENT-0004
- shortLabel: EC-JES Vigo SAR training low-height descent
- sourceType: OFFICIAL_REPORT / notification-level summary via curated extraction document
- extractionConfidence: MEDIUM

## factualSummary
Em contexto de SAR/treinamento para validação de operador de guincho na área de Vigo, durante fase de posicionamento/aproximação, ocorreu descida inadvertida até aproximadamente 50 pés sobre o mar. O material cita ausência de alerta sonoro no evento e não reporta lesões ou dano na síntese disponível.

## eventSequence
1. Operação SAR/treinamento planejada.
2. Posicionamento da aeronave para exercício de guincho.
3. Durante o posicionamento, inicia-se descida inadvertida.
4. A aeronave atinge aproximadamente 50 ft sobre o mar.
5. Registro de ausência de aviso sonoro no episódio.
6. Recuperação sem lesões/dano reportados na síntese.

## unsafeStateCandidate
Desvio de perfil vertical para altura muito baixa durante posicionamento de missão SAR sobre água.

## unsafeActConditionCandidate
Candidato preliminar (não conclusivo): controle/monitoramento vertical insuficiente durante tarefa de posicionamento com alta carga operacional.

## directActorCandidate
Tripulação de voo, com possível interação de tripulação de missão (papéis ainda não segregados).

## evidenceFragments
- "positioning for a training and validation exercise of a winch operator"
- "aircraft inadvertently descended"
- "helicopter reached approximately 50 ft above sea level"
- "descent occurred without a sound/aural warning"

## uncertaintyNotes
- Fonte de detalhe parcial: mecanismo exato da descida (comando, automação, percepção, monitoração) não está fechado.
- Papéis PF/PM e participação da tripulação de missão não estão decompostos.
- Sem paginação primária detalhada nesta fase.

## excludedInformation
- Conclusões/causas/recomendações finais de investigação.
- Qualquer inferência automática de falha perceptiva por resultado de baixa altura.
- Qualquer classificação P/O/A, HFACS, Risk/ERC ou recommendation.

## possibleEvidenceCategoryHints
- COMMUNICATION_INFORMATION
- PROCEDURAL_MONITORING
- FEEDBACK_VERIFICATION
- TIME_PRESSURE
- UNKNOWN_OR_UNCATEGORIZED

## adjudicationQuestions
- A ausência de alerta sonoro deve ser tratada como condição sistêmica dominante ou como agravante secundário?
- O evento é predominantemente de monitoramento vertical, de percepção de altura sobre água, ou de coordenação missão-voo?
- Há evidência suficiente para separar ator direto entre PF/PM e operador de missão?

## nextStepRecommendation
Levar para A4+R-63 com anotação explícita de ambiguidade multi-ator e necessidade de decisão AI/Author sobre fronteira monitoramento/comunicação sem classificação automática.
