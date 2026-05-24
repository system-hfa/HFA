# Real Event Batch 2 Adjudication 006

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

- adjudicationId: REAL-EVENT-BATCH2-ADJUDICATION-006
- sourceExtractionId: A4R72-B2-006
- originalRealEventId: REAL-EVENT-0016
- shortLabel: N8DX Cessna 500 automation confusion and LOC
- adjudicationMode: AI_AUTHOR
- adjudicationConfidence: MEDIUM
- sourceQuality: HIGH
- sourceEnrichmentNeeded: no

## factualBasis
- Cenário single-pilot IFR com dificuldades reportadas no uso Garmin/autopilot.
- Desvios de altitude, dificuldade de steering e alertas TAWS no segmento final.
- Narrativa de pós-evento sem anomalia técnica pré-impacto confirmada no autopilot.

## safeOperationEscapePointCandidate
Escape point candidato: transição de descida controlada para trajetória instável com perda de controle sob carga cognitiva de automação/interface.

## unsafeState
Perda de estabilidade de trajetória e controle em descida/aproximação com alta carga de gerenciamento de automação.

## unsafeActOrCondition
Fronteira entre interpretação/monitoramento de modo (percepção cognitiva) e gestão de ação de controle sob carga single-pilot.

## directActor
Piloto único.

## P_axis_reasoning
Evidência favorece erro de interpretação/monitoramento de estado de automação e situação de voo, com componente cognitivo relevante.

## O_axis_reasoning
Objetivo observado permaneceu concluir chegada com segurança; sem evidência de intenção desviante.

## A_axis_reasoning
Sem separação robusta entre ação inadequada de controle e consequência de percepção degradada de modo/estado.

## proposedPCode or UNRESOLVED
P-C

## proposedOCode or UNRESOLVED
O-A

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
- P: presença de dificuldade explícita de interpretação/uso da automação.
- O: ausência de evidência de objetivo de violação/eficiência.
- A: mecanismo de ação permanece não isolado com robustez suficiente.

## evidenceRefsByAxis
- P: relatos de dificuldade com GPS/steering e dependência de autopilot.
- O: continuidade de objetivo de aproximação/aterrissagem.
- A: dados textuais não fecham o mecanismo de execução final.

## uncertaintyByAxis
- P: MEDIUM
- O: LOW
- A: HIGH

## rejectedAlternatives
- `P-G` rejeitado como primário nesta rodada; a evidência pesa mais para interpretação cognitiva (`P-C`) do que simples não monitoramento.
- `A-F`/`A-I` rejeitados por ausência de prova inequívoca de seleção de ação específica sob critérios canônicos.

## evidenceCategoryHints
- AUTOMATION_MODE_AWARENESS
- SINGLE_PILOT_WORKLOAD
- TAWS_ALERT_TIMING
- MANUAL_CONTROL_RECOVERY

## maturityStatus
AUTHOR_REVIEW_READY

## adjudicationQuestionsForAuthor
- Confirmar preferência `P-C` vs `P-G` para este caso de automação.
- Confirmar manutenção de `A=UNRESOLVED` na ausência de cadeia de ação mecanística fechada.

## downstreamLocks
- proposedCode é draft e não `releasedCode`.
- sem `selectedCode=CLASSIFIED`.
- sem finalConclusion/HFACS/Risk/ERC/recommendations.
- sem fixture/baseline/downstream.

## nextStepRecommendation
Consolidar em A4+R-74 como caso de referência de fronteira automação/percepção em operação single-pilot.
