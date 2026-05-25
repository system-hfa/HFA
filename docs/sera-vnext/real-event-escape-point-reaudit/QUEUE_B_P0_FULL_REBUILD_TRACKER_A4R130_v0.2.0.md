# Queue B P0 Full Rebuild Tracker A4R130 v0.2.0

Status: QUEUE_B_P0_FULL_REBUILD_TRACKER_RECORDED
Phase: A4+R-130
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM
scope: REBUILT_POA_DRAFT_NOT_RELEASED

## Reading Rules
- This tracker covers only A4R129 `QUEUE_B_POA_REVIEW` P0 events whose `nextAction` was `FULL_REBUILD_WITH_ESCAPE_POINT_GATE`.
- `AMERICAN-965` and `COMAIR-5191` are excluded because A4R129 assigned `SOURCE_ENRICHMENT`.
- `classificationPermission=MAY_PROCEED_TO_POA_DRAFT` authorizes only a draft review row in this document.
- No row creates `releasedCode`, `selectedCode CLASSIFIED`, final classification, fixture, baseline, training, reference authority or downstream.

## Full Rebuild Tracker
| eventId | sourceFiles | previousA4R127Queue | previousA4R129Decision | escapePointStatus | escapePointWhenStatement | unsafeActOrCondition | controlledVariable | safeLimitOrExpectedState | evidenceAnchor | preventabilityTest | directActor | classificationPermission | priorProposedP | priorProposedO | priorProposedA | rebuiltDraftP | rebuiltDraftO | rebuiltDraftA | pAxisStatus | oAxisStatus | aAxisStatus | rebuildDecision | remainingRestrictions | nextAction |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| REAL-EVENT-0003 | A4R72-B2-001; A4R73 adjudication 001; A4R100 P-G canonical trace | QUEUE_B_POA_REVIEW | REMAINS_IN_QUARANTINE_ESCAPE_POINT_NOT_READY / FULL_REBUILD_WITH_ESCAPE_POINT_GATE | DEFINED | Quando a aproximacao noturna prosseguiu para um estado de baixa velocidade, alta razao de descida e decaimento de rotor em baixa altura, colocou o perfil de energia e separacao vertical fora do perfil seguro de aproximacao. | Aproximacao noturna em baixa altura entrou em estado de baixa energia, alta razao de descida e decaimento de rotor antes da recuperacao. | perfil de energia; razao de descida; velocidade; separacao vertical | perfil seguro de aproximacao noturna com energia, rotor e margem vertical monitoraveis | extraction eventSequence 3-5; adjudication factualBasis; A4R100 EV-002 to EV-004 | PASS | flight crew; PF/PM split unresolved | MAY_PROCEED_TO_POA_DRAFT | P-G | O-A | UNRESOLVED | P-G | O-A | UNRESOLVED | RETAIN_PRIOR_DRAFT | RETAIN_PRIOR_DRAFT | UNRESOLVED | REBUILT_POA_DRAFT_NOT_RELEASED_AUTHOR_REVIEW_REQUIRED | NOT_FOR_RELEASE; NOT_FOR_REFERENCE_CASE; NOT_FOR_CONSENSUS; NOT_FOR_TRAINING; NOT_FOR_DOWNSTREAM | AUTHOR_REVIEW_REQUIRED_FOR_ACTION_AXIS |
| REAL-EVENT-0016 | A4R72-B2-006; A4R73 adjudication 006; A4R104 canonical draft | QUEUE_B_POA_REVIEW | REMAINS_IN_QUARANTINE_ESCAPE_POINT_NOT_READY / FULL_REBUILD_WITH_ESCAPE_POINT_GATE | DEFINED | Quando a aeronave prosseguiu em descida instavel com desvios de altitude e dificuldade de controle direcional reportada, colocou a trajetoria e o estado de controle fora do perfil IFR controlado esperado. | Trajetoria de descida tornou-se instavel com desvios de altitude, dificuldade de controle direcional reportada e alertas TAWS antes do impacto. | trajetoria IFR; altitude; estado de controle; estabilidade de descida | perfil IFR controlado com altitude e trajetoria estaveis | extraction eventSequence 1-5; adjudication factualBasis; A4R104 EV-002 to EV-005 | PASS | single pilot | MAY_PROCEED_TO_POA_DRAFT | P-C | O-A | UNRESOLVED | P-C | O-A | UNRESOLVED | RETAIN_PRIOR_DRAFT | RETAIN_PRIOR_DRAFT | UNRESOLVED | REBUILT_POA_DRAFT_NOT_RELEASED_AUTHOR_REVIEW_REQUIRED | NOT_FOR_RELEASE; NOT_FOR_REFERENCE_CASE; NOT_FOR_CONSENSUS; NOT_FOR_TRAINING; NOT_FOR_DOWNSTREAM | AUTHOR_REVIEW_REQUIRED_FOR_ACTION_AXIS |
| BS211-Q400 | A4R76-B3-013; A4R77 adjudication 013; A4R104 canonical draft | QUEUE_B_POA_REVIEW | REMAINS_IN_QUARANTINE_ESCAPE_POINT_NOT_READY / FULL_REBUILD_WITH_ESCAPE_POINT_GATE | DEFINED | Quando a aeronave prosseguiu fora da trajetoria/downwind atribuida e em aproximacao instavel, colocou a estabilidade da aproximacao e o alinhamento de pista fora do estado seguro de reentrada estabilizada. | Aproximacao permaneceu instavel com conflito de trajetoria/alinhamento de pista apos contexto de sequenciamento ATC. | estabilidade da aproximacao; alinhamento de pista; cumprimento de sequenciamento | reentrada estabilizada, cumprimento de downwind/orbit ou aproximacao descontinuada | extraction eventSequence 2-5; adjudication factualBasis; A4R104 EV-002 to EV-007 | PASS | flight crew; ATC interface contextual | MAY_PROCEED_TO_POA_DRAFT | P-H | O-C | A-F | P-H | O-C | A-F | RETAIN_PRIOR_DRAFT | RETAIN_PRIOR_DRAFT | RETAIN_PRIOR_DRAFT | REBUILT_POA_DRAFT_NOT_RELEASED_AUTHOR_REVIEW_REQUIRED | NOT_FOR_RELEASE; NOT_FOR_REFERENCE_CASE; NOT_FOR_CONSENSUS; NOT_FOR_TRAINING; NOT_FOR_DOWNSTREAM | AUTHOR_REVIEW_REQUIRED_BEFORE_ANY_REFERENCE_USE |
| A4R87-EXT-002 | EXT-BATCH1 extraction 002; EXT-BATCH1 adjudication 002; EXT-002 A4R104 canonical draft | QUEUE_B_POA_REVIEW | REMAINS_IN_QUARANTINE_ESCAPE_POINT_NOT_READY / FULL_REBUILD_WITH_ESCAPE_POINT_GATE | DEFINED | Quando o voo noturno sobre agua desceu em perfil degradado com multiplos alertas EGPWS ativos, colocou a margem de separacao vertical sobre a agua fora do estado seguro de voo monitorado. | Perfil noturno sobre agua degradou para estado de descida/clearance com alertas EGPWS repetidos antes do impacto. | separacao vertical sobre agua; altitude path; perfil de voo monitorado | perfil noturno monitorado mantendo separacao segura e recuperacao tempestiva de alertas EGPWS | extraction factualTimeline and alertWarningChronology; adjudication unsafeStateCandidate; A4R104 EV-001 to EV-007 | PASS | flight crew | MAY_PROCEED_TO_POA_DRAFT | P-G | UNRESOLVED | UNRESOLVED | P-G | UNRESOLVED | UNRESOLVED | RETAIN_PRIOR_DRAFT | UNRESOLVED | UNRESOLVED | REBUILT_POA_DRAFT_NOT_RELEASED_AUTHOR_REVIEW_REQUIRED | NOT_FOR_RELEASE; NOT_FOR_REFERENCE_CASE; NOT_FOR_CONSENSUS; NOT_FOR_TRAINING; NOT_FOR_DOWNSTREAM | AUTHOR_REVIEW_REQUIRED_PLUS_WARNING_CHRONOLOGY_SLICE |
| ASIANA-214 | A4R106 source slice; A4R115 source slice; A4R106/A4R115 trace drafts | QUEUE_B_POA_REVIEW | REMAINS_IN_QUARANTINE_ESCAPE_POINT_NOT_READY / FULL_REBUILD_WITH_ESCAPE_POINT_GATE | DEFINED | Quando a aproximacao visual continuou no portao de estabilizacao de 500 ft com PAPI, velocidade e razao de descida indicando perfil nao estabilizado, colocou a energia e trajetoria da aeronave fora do perfil seguro de aproximacao. | Visual approach continued through the 500 ft stabilization gate with PAPI, airspeed, idle thrust and descent-rate cues indicating an unstabilized profile. | energy state; airspeed; glidepath; descent profile | stabilized visual approach profile at or before the 500 ft gate | A4R106 ASIANA-SRC-EV-001/003; A4R115 AS214-E4 to E6; A4R106/A4R115 trace drafts | PASS | flight crew | MAY_PROCEED_TO_POA_DRAFT | P-F/P-G contested | O-D | A-F/A-E review | P-G | O-D | A-F | REVISE_DRAFT | RETAIN_PRIOR_DRAFT | REVISE_DRAFT | REBUILT_POA_DRAFT_NOT_RELEASED_AUTHOR_REVIEW_REQUIRED | NOT_FOR_RELEASE; NOT_FOR_REFERENCE_CASE; NOT_FOR_CONSENSUS; NOT_FOR_TRAINING; NOT_FOR_DOWNSTREAM | AUTHOR_REVIEW_REQUIRED_FOR_P_AND_A_BOUNDARIES |

## Excluded Source Enrichment Rows
| eventId | A4R129 nextAction | A4R130 treatment |
|---|---|---|
| AMERICAN-965 | SOURCE_ENRICHMENT | EXCLUDED_FROM_A4R130 |
| COMAIR-5191 | SOURCE_ENRICHMENT | EXCLUDED_FROM_A4R130 |

## Metrics
| metric | value |
|---|---:|
| totalQueueBP0FullRebuildEligible | 5 |
| excludedForSourceEnrichment | 2 |
| escapePointDefinedCount | 5 |
| escapePointBlockedCount | 0 |
| whenStatementValidCount | 5 |
| whenStatementInvalidCount | 0 |
| classificationPermissionGrantedCount | 5 |
| classificationPermissionBlockedCount | 0 |
| poaRebuiltDraftCount | 5 |
| pAxisRetained | 4 |
| pAxisRevised | 1 |
| pAxisUnresolved | 0 |
| pAxisBlocked | 0 |
| oAxisRetained | 4 |
| oAxisRevised | 0 |
| oAxisUnresolved | 1 |
| oAxisBlocked | 0 |
| aAxisRetained | 1 |
| aAxisRevised | 1 |
| aAxisUnresolved | 3 |
| aAxisBlocked | 0 |
| requiresAuthorReviewCount | 5 |
| remainsInQuarantineCount | 5 |
| releasedCodeCreatedCount | 0 |
| selectedCodeClassifiedCount | 0 |
| downstreamOpenedCount | 0 |
