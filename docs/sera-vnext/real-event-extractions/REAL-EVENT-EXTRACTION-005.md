# Real Event Structured Extraction 005

Status:
- STRUCTURED_EXTRACTION_DRAFT
- NOT_CLASSIFIED
- NOT_FIXTURE
- NOT_BASELINE
- NOT_CONSENSUS_VALIDATED
- NOT_FOR_DOWNSTREAM

- extractionId: REAL-EVENT-EXTRACTION-005
- sourceDocument: `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_v0.1.4.md` and `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_SOURCE_QUALITY_REVIEW_v0.1.4.md`
- sourceLocator: Batch 2 index table row `REAL-EVENT-0028`; source-quality table row `REAL-EVENT-0028`
- originalCandidateId: REAL-EVENT-0028
- shortLabel: HL9661 tail rotor strike with source-partial status
- sourceType: SECONDARY_ARTICLE / INVESTIGATION_EXCERPT (source anchor still partial)
- extractionConfidence: LOW

## factualSummary
Caso indexado como S-76C+ HL9661 com tail rotor strike em fuel bowser durante operação de firefighting/utility, fase de aproximação/pouso em proximidade de solo. O próprio índice indica necessidade de separar ação de piloto, setup em solo e coordenação. A revisão de qualidade de fonte marca este evento como `SOURCE_PARTIAL`, exigindo enriquecimento antes de aprofundamento.

## eventSequence
1. Operação utility/firefighting em helicóptero S-76C+ (conforme índice).
2. Fase de pouso/proximidade de solo.
3. Ocorrência de tail rotor strike em equipamento de solo (fuel bowser).
4. Contexto de coordenação em solo e layout do local apontado como relevante.
5. Fonte permanece parcial e sem ancoragem primária detalhada nesta fase.

## unsafeStateCandidate
Proximidade insegura entre rotor de cauda e obstáculo de solo durante operação de pouso/proximidade.

## unsafeActConditionCandidate
Candidato preliminar (não conclusivo): interação insegura entre trajetória/posicionamento da aeronave e configuração/layout/coordenação em solo.

## directActorCandidate
Indefinido em nível de detalhe fino nesta fase; provável combinação de ator de voo e contexto de solo (multi-actor possível).

## evidenceFragments
- Batch 2 index: "tail rotor strike on fuel bowser"
- Batch 2 index themes: "LANDING_SITE_LAYOUT; GROUND_COORDINATION; TAIL_ROTOR_STRIKE; MULTI_ACTOR"
- Batch 2 index note: "Needs source extraction to separate pilot action, ground setup and coordination."
- Source-quality review: `REAL-EVENT-0028 ... SOURCE_PARTIAL ... Needs official/technical source before deep extraction.`

## uncertaintyNotes
- Ausência de fonte primária consolidada nesta fase (status SOURCE_PARTIAL).
- Sem cronologia detalhada, sem papéis de atores e sem evidência temporal de comunicações/decisões.
- Caso deve ser tratado como extração inicial de baixa confiança e alta ambiguidade.

## excludedInformation
- Qualquer inferência causal forte com base apenas no índice.
- Qualquer "culpa" de ator específico sem evidência primária.
- Qualquer classificação P/O/A, HFACS, Risk/ERC, recommendation.

## possibleEvidenceCategoryHints
- COMMUNICATION_INFORMATION
- SUPERVISION_COORDINATION
- RULE_NORM_CONTEXT
- UNKNOWN_OR_UNCATEGORIZED

## adjudicationQuestions
- Vale manter no lote de adjudicação imediata, ou priorizar enriquecimento de fonte antes?
- O caso será tratado como multi-actor por padrão de coleta, ou aguardará decomposição factual mínima?
- Quais critérios mínimos de ancoragem de fonte devem liberar passagem para extração profunda?

## nextStepRecommendation
Manter como caso de ambiguidade/insuficiência para A4+R-63 apenas como "triage candidate"; idealmente executar enriquecimento de fonte antes de adjudicação causal detalhada.
