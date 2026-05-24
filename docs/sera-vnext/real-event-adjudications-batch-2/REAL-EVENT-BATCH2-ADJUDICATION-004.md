# Real Event Batch 2 Adjudication 004

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

- adjudicationId: REAL-EVENT-BATCH2-ADJUDICATION-004
- sourceExtractionId: A4R72-B2-004
- originalRealEventId: REAL-EVENT-0013
- shortLabel: Aeroleo autorotation to water with source identity mismatch
- adjudicationMode: AI_AUTHOR
- adjudicationConfidence: LOW
- sourceQuality: LOW
- sourceEnrichmentNeeded: yes

## factualBasis
- Trecho extraído aponta perda de pressão de óleo de transmissão e autorrotação para água.
- Há mismatch crítico entre candidato (S-76) e anchor textual (Bell 412/PT-HUV).
- Identidade de fonte não reconciliada para o caseId alvo.

## safeOperationEscapePointCandidate
Não adjudicável com robustez nesta rodada devido mismatch de identidade de fonte.

## unsafeState
UNRESOLVED por inconsistência de identidade documental.

## unsafeActOrCondition
UNRESOLVED em nível metodológico: cadeia técnica plausível existe, mas não está confirmada para o caso alvo canônico.

## directActor
UNRESOLVED.

## P_axis_reasoning
Sem base segura para eixo P enquanto identidade do caso permanecer ambígua.

## O_axis_reasoning
Sem base segura para inferir objetivo no caso canônico alvo.

## A_axis_reasoning
Sem base segura para eixo A; qualquer fechamento seria inferência não ancorada.

## proposedPCode or UNRESOLVED
UNRESOLVED

## proposedOCode or UNRESOLVED
UNRESOLVED

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
- P/O/A bloqueados por mismatch de identidade de fonte/candidato.

## evidenceRefsByAxis
- Registro textual atual: transmissão/autorrotação para água, porém em aeronave identificada como Bell 412 no fragmento usado.

## uncertaintyByAxis
- P: HIGH
- O: HIGH
- A: HIGH

## rejectedAlternatives
- Rejeitada adjudicação forte com códigos ativos enquanto persistir mismatch de identidade.
- Rejeitado fallback `O-A` automático sem reconciliação factual.

## evidenceCategoryHints
- SOURCE_IDENTITY_MISMATCH
- TECHNICAL_FAILURE_CHAIN
- OFFSHORE_EMERGENCY

## maturityStatus
TRIAGE_ONLY

## adjudicationQuestionsForAuthor
- Qual é a fonte primária canônica para `REAL-EVENT-0013` no corpus atual?
- Confirmar se caso deve permanecer no Batch 2 ou ser reindexado após reconciliação.

## downstreamLocks
- proposedCode permanece inexistente nesta rodada (todos eixos UNRESOLVED).
- sem `releasedCode`.
- sem `selectedCode=CLASSIFIED`.
- sem finalConclusion/HFACS/Risk/ERC/recommendations.
- sem fixture/baseline/downstream.

## nextStepRecommendation
Manter `TRIAGE_ONLY` até reconciliação de identidade documental e re-extração controlada da fonte correta.
