# Real Event Batch 2 Adjudication 008

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

- adjudicationId: REAL-EVENT-BATCH2-ADJUDICATION-008
- sourceExtractionId: A4R72-B2-008
- originalRealEventId: REAL-EVENT-0008
- shortLabel: PK-FUP S-76C+ in-flight control failure
- adjudicationMode: AI_AUTHOR
- adjudicationConfidence: MEDIUM
- sourceQuality: HIGH
- sourceEnrichmentNeeded: no

## factualBasis
- Durante descida, surgiram atitudes não comandadas e perda de resposta de controle.
- Evidência de separação pushrod/rod-end com deterioração de rosca/torque.
- Tripulação tentou recuperação, com impacto subsequente.

## safeOperationEscapePointCandidate
Escape point candidato: início de atitude não comandada com perda de resposta normal de controle após degradação do linkage.

## unsafeState
Divergência atitudinal não comandada com perda de controlabilidade normal.

## unsafeActOrCondition
Unsafe condition técnico-mecânica dominante (linkage de servo), com resposta de tripulação em plano mitigatório/downstream.

## directActor
UNRESOLVED para evento iniciador; tripulação atua como resposta ao evento técnico.

## P_axis_reasoning
Sem evidência de mecanismo perceptivo iniciador dominante.

## O_axis_reasoning
Objetivo operacional nominal (cumprir missão), sem indício de desvio intencional.

## A_axis_reasoning
Sem base para atribuir falha humana ativa iniciadora; mecanismo dominante é técnico.

## proposedPCode or UNRESOLVED
UNRESOLVED

## proposedOCode or UNRESOLVED
O-A

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
- P/A: mantidos abertos por predominância técnica e ausência de prova de mecanismo humano iniciador.
- O: objetivo nominal sem evidência de desvio.

## evidenceRefsByAxis
- P/A: atitude não comandada + achados de separação/deterioração de linkage.
- O: contexto de missão sem intenção desviante descrita.

## uncertaintyByAxis
- P: HIGH
- O: LOW
- A: HIGH

## rejectedAlternatives
- Rejeitada imputação automática de erro humano em caso condition-dominant.
- Rejeitado `A-A` por regra de não usar no-failure como fallback para desconhecido.

## evidenceCategoryHints
- SERVO_LINKAGE_INTEGRITY
- CONTROL_RESPONSE_FAILURE
- DESCENT_PHASE_TRANSITION

## maturityStatus
HOLD_UNRESOLVED

## adjudicationQuestionsForAuthor
- Confirmar manutenção de leitura condition-dominant com `P/A=UNRESOLVED`.
- Há necessidade de enrichment adicional apesar da boa qualidade de fonte para reduzir ator direto?

## downstreamLocks
- proposedCode é draft e não `releasedCode`.
- sem `selectedCode=CLASSIFIED`.
- sem finalConclusion/HFACS/Risk/ERC/recommendations.
- sem fixture/baseline/downstream.

## nextStepRecommendation
Levar para A4+R-74 como benchmark de caso técnico dominante sem forçar classificação humana ativa.
