# SERA Engine vNext QuestionPath Backfill Execution A4R80 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-80 - QuestionPath Backfill for First 15 Events  
DOCS_ONLY  
NO_PROPOSED_CODE_CHANGE  
NO_UNRESOLVED_REDUCTION  
NO_RELEASED_CODE  
NO_DOWNSTREAM

## Objetivo
Executar backfill documental de questionPath para os 5 eventos iniciais e os 10 eventos Batch 2, elevando a cobertura comparavel de questionPath de 15/30 para 30/30 sem alterar decisoes P/O/A.

## Relacao com A4+R-79
A4+R-79 definiu o template canonico de questionPath, o plano de backfill e a matriz de cobertura. A4+R-80 executa esse plano criando anexos documentais separados para reduzir risco e preservar as adjudicacoes antigas.

## Backfills executados
| backfillId | sourceCase | existingP | existingO | existingA | questionPathAdded | backfillConfidence | conflictStatus | mainUncertainty | nextStep |
|---|---|---|---|---|---|---|---|---|---|
| QUESTIONPATH-BACKFILL-REAL-EVENT-001 | REAL-EVENT-0001 | P-G | O-A | UNRESOLVED | yes | MEDIUM | NO_CONFLICT | PF/PM decomposition and action mechanism remain insufficient for A-axis closure | Use backfilled path for comparison; retain PF/PM and callout enrichment before any action-axis decision |
| QUESTIONPATH-BACKFILL-REAL-EVENT-002 | REAL-EVENT-0002 | UNRESOLVED | O-A | UNRESOLVED | yes | MEDIUM | NO_CONFLICT | Warning perception, go-around routing, and escape trajectory mechanisms remain entangled | Maintain hold and enrich warning/go-around evidence before reducing P/A uncertainty |
| QUESTIONPATH-BACKFILL-REAL-EVENT-003 | REAL-EVENT-0004 | UNRESOLVED | O-A | UNRESOLVED | yes | MEDIUM | NO_CONFLICT | Absence of aural warning, PF/PM/mission-crew roles, and monitoring sequence remain unresolved | Maintain P/A unresolved until actor roles and vertical-monitoring chain are enriched |
| QUESTIONPATH-BACKFILL-REAL-EVENT-004 | REAL-EVENT-0006 | UNRESOLVED | O-A | UNRESOLVED | yes | LOW | NO_CONFLICT | Technical-system degradation dominates; crew understanding, checklist sequence, and selected/unavoidable ditching remain unresolved | Keep technical-dominant hold; enrich technical timeline before any P/A closure |
| QUESTIONPATH-BACKFILL-REAL-EVENT-005 | REAL-EVENT-0028 | UNRESOLVED | UNRESOLVED | UNRESOLVED | yes | LOW | NO_CONFLICT | Source remains partial/index-level; primary chronology and actor decomposition are missing | Keep triage-only until a primary source anchor and actor chronology exist |
| QUESTIONPATH-BACKFILL-BATCH2-001 | REAL-EVENT-0003 | P-G | O-A | UNRESOLVED | yes | MEDIUM | NO_CONFLICT | PF/PM and callout timeline remain insufficient for action-axis closure | Use as P/A boundary case; retain A unresolved until PF/PM/callout evidence is stronger |
| QUESTIONPATH-BACKFILL-BATCH2-002 | REAL-EVENT-0005 | UNRESOLVED | O-A | UNRESOLVED | yes | LOW | NO_CONFLICT | Final PF/PM handover and helideck dynamics are not reconciled | Enrich PF/PM and final dynamics before any P/A reduction |
| QUESTIONPATH-BACKFILL-BATCH2-003 | REAL-EVENT-0010 | UNRESOLVED | O-A | UNRESOLVED | yes | MEDIUM | NO_CONFLICT | Repositioning action is known, but input, wind, deck and dynamic limits are not sufficient for action classification | Maintain conservative hold and use as action-vs-condition boundary case |
| QUESTIONPATH-BACKFILL-BATCH2-004 | REAL-EVENT-0013 | UNRESOLVED | UNRESOLVED | UNRESOLVED | yes | LOW | NO_CONFLICT | Source identity mismatch blocks reliable P/O/A adjudication | Keep triage-only until source identity is reconciled and re-extracted |
| QUESTIONPATH-BACKFILL-BATCH2-005 | REAL-EVENT-0015 | P-G | O-A | UNRESOLVED | yes | MEDIUM | NO_CONFLICT | Callout/input sequence remains partly reconstructed and does not isolate a specific action mechanism | Use as dark-night P/A boundary case; keep A unresolved until sequence is refined |
| QUESTIONPATH-BACKFILL-BATCH2-006 | REAL-EVENT-0016 | P-C | O-A | UNRESOLVED | yes | MEDIUM | NO_CONFLICT | Action mechanism is not separable from automation mode/state perception | Use as automation perception boundary; keep A unresolved absent a closed control-action chain |
| QUESTIONPATH-BACKFILL-BATCH2-007 | REAL-EVENT-0007 | UNRESOLVED | O-A | UNRESOLVED | yes | LOW | NO_CONFLICT | Mechanical linkage failure dominates; maintenance/inspection human chain is incomplete | Enrich maintenance-chain traceability before any P/A closure |
| QUESTIONPATH-BACKFILL-BATCH2-008 | REAL-EVENT-0008 | UNRESOLVED | O-A | UNRESOLVED | yes | MEDIUM | NO_CONFLICT | Servo/linkage technical condition dominates; crew response is downstream | Retain as technical-dominant negative control against forced human attribution |
| QUESTIONPATH-BACKFILL-BATCH2-009 | REAL-EVENT-0009 | UNRESOLVED | O-A | UNRESOLVED | yes | LOW | NO_CONFLICT | External hazard and barrier breach dominate; post-impact response window is not bounded | Enrich barrier/certification and post-impact response timeline before any P/A reduction |
| QUESTIONPATH-BACKFILL-BATCH2-010 | REAL-EVENT-0011 | UNRESOLVED | O-A | UNRESOLVED | yes | LOW | NO_CONFLICT | Infrastructure hazard awareness and route alternatives are not sufficiently anchored | Enrich hazard-awareness and taxi-route constraints before any P/A closure |

## Metricas
- totalBackfillTargets=15
- backfillCompleted=15
- questionPathCoverageBefore=15/30
- questionPathCoverageAfter=30/30
- proposedCodeChanges=0
- unresolvedReduced=0
- releasedCodeCount=0
- conflictForAuthorReviewCount=0

## Licoes metodologicas
- Backfill foi mais direto nos casos com P-G/P-C e O-A ja delimitados por rationale e evidenceRefs.
- Evidencia antiga ficou mais fraca nos casos source partial, source identity mismatch, condition-dominant technical e action-vs-condition boundary.
- A comparabilidade com Batch 3 melhora porque todos os 30 casos agora possuem P/O/A questionPath, ainda que os 15 primeiros estejam em anexos separados.
- O eixo A permanece conservador: o backfill documenta por que UNRESOLVED foi preservado e nao transforma desconhecido em A-A.

## Confirmacoes
- nenhum proposedCode alterado;
- nenhum UNRESOLVED reduzido;
- nenhum releasedCode;
- nenhum downstream;
- nenhum fixture/baseline;
- nenhum codigo.
