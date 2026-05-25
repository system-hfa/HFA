# Queue B P0 POA Review Tracker A4R129 v0.2.0

Status: QUEUE_B_P0_POA_REVIEW_TRACKER_RECORDED
Phase: A4+R-129
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM
scope: POA_REVIEW_GATE_DIAGNOSTIC_ONLY

## Reading Rules
- This tracker covers only events with `assignedQueue=QUEUE_B_POA_REVIEW` and `priority=P0` in A4R127.
- P/O/A review is blocked when `escapePointWhenStatement=ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED`.
- Historical prior P/O/A values are listed for dependency control only.
- `reviewedDraftP/O/A=NOT_REVIEWED_ESCAPE_POINT_NOT_READY` means no draft classification was produced in A4R129.

## Review Table
| eventId | sourceFiles | previousA4R126Decision | previousA4R127Queue | priority | escapePointWhenStatement | unsafeActOrCondition | controlledVariable | safeLimitOrExpectedState | evidenceAnchor | preventabilityTest | directActor | priorProposedP | priorProposedO | priorProposedA | reviewedDraftP | reviewedDraftO | reviewedDraftA | pAxisDecision | oAxisDecision | aAxisDecision | poaReviewDecision | remainingRestrictions | nextAction |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| REAL-EVENT-0003 | A4R126 tracker; A4R127 queue; Batch 2 extraction/adjudication; A4R100 canonical rebuild; release-pilot dependencies | PARTIAL_REQUIRES_POA_REVIEW | QUEUE_B_POA_REVIEW | P0 | ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED | UNRESOLVED | approach descent/clearance | safe approach profile | Batch 2 and A4R100; late approach; first departure not expressed in mandatory format | UNCERTAIN | crew | P-G | O-A | UNRESOLVED | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | UNRESOLVED | UNRESOLVED | UNRESOLVED | REMAINS_IN_QUARANTINE_ESCAPE_POINT_NOT_READY | NOT_FOR_RELEASE; NOT_FOR_REFERENCE_CASE; NOT_FOR_CONSENSUS; NOT_FOR_TRAINING; NOT_FOR_DOWNSTREAM | FULL_REBUILD_WITH_ESCAPE_POINT_GATE |
| REAL-EVENT-0016 | A4R126 tracker; A4R127 queue; Batch 2 extraction/adjudication; A4R104 canonical draft | PARTIAL_REQUIRES_POA_REVIEW | QUEUE_B_POA_REVIEW | P0 | ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED | UNRESOLVED | mode/control state | expected automation/control state | Batch 2 and A4R104; automation/LOC sequence; first departure not fixed before P-C draft | UNCERTAIN | crew | P-C | O-A | UNRESOLVED | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | UNRESOLVED | UNRESOLVED | UNRESOLVED | REMAINS_IN_QUARANTINE_ESCAPE_POINT_NOT_READY | NOT_FOR_RELEASE; NOT_FOR_REFERENCE_CASE; NOT_FOR_CONSENSUS; NOT_FOR_TRAINING; NOT_FOR_DOWNSTREAM | FULL_REBUILD_WITH_ESCAPE_POINT_GATE |
| BS211-Q400 | A4R126 tracker; A4R127 queue; Batch 3 and A4R104 canonical draft | PARTIAL_REQUIRES_POA_REVIEW | QUEUE_B_POA_REVIEW | P0 | ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED | UNRESOLVED | approach stability/communication | safe stabilized approach state | Batch 3 and A4R104; unstable approach sequence; first departure not expressed by gate | UNCERTAIN | crew | P-H | O-C | A-F | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | UNRESOLVED | UNRESOLVED | UNRESOLVED | REMAINS_IN_QUARANTINE_ESCAPE_POINT_NOT_READY | NOT_FOR_RELEASE; NOT_FOR_REFERENCE_CASE; NOT_FOR_CONSENSUS; NOT_FOR_TRAINING; NOT_FOR_DOWNSTREAM | FULL_REBUILD_WITH_ESCAPE_POINT_GATE |
| A4R87-EXT-002 | A4R126 tracker; A4R127 queue; external extraction/adjudication; A4R104 EXT-002 trace | PARTIAL_REQUIRES_POA_REVIEW | QUEUE_B_POA_REVIEW | P0 | ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED | UNRESOLVED | warning/altitude path | safe over-water altitude state | External Batch 1 and A4R104; warning sequence; first departure not separated from warning response | UNCERTAIN | crew | P-G | UNRESOLVED | UNRESOLVED | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | UNRESOLVED | UNRESOLVED | UNRESOLVED | REMAINS_IN_QUARANTINE_ESCAPE_POINT_NOT_READY | NOT_FOR_RELEASE; NOT_FOR_REFERENCE_CASE; NOT_FOR_CONSENSUS; NOT_FOR_TRAINING; NOT_FOR_DOWNSTREAM | FULL_REBUILD_WITH_ESCAPE_POINT_GATE |
| ASIANA-214 | A4R126 tracker; A4R127 queue; A4R106/A4R115 official-source trace material | PARTIAL_REQUIRES_POA_REVIEW | QUEUE_B_POA_REVIEW | P0 | ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED | UNRESOLVED | glidepath/airspeed/automation state | safe visual approach profile | A4R106/A4R115; final approach; first departure not fixed enough before P/A boundary | UNCERTAIN | crew | P-F/P-G contested | O-D | A-F/A-E review | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | UNRESOLVED | UNRESOLVED | UNRESOLVED | REMAINS_IN_QUARANTINE_ESCAPE_POINT_NOT_READY | NOT_FOR_RELEASE; NOT_FOR_REFERENCE_CASE; NOT_FOR_CONSENSUS; NOT_FOR_TRAINING; NOT_FOR_DOWNSTREAM | FULL_REBUILD_WITH_ESCAPE_POINT_GATE |
| AMERICAN-965 | A4R126 tracker; A4R127 queue; A4R115 official-report material | PARTIAL_REQUIRES_POA_REVIEW | QUEUE_B_POA_REVIEW | P0 | ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED | UNRESOLVED | navigation/terrain clearance | safe route/terrain state | A4R115; descent/navigation sequence; first departure needs source-sliced gate | UNCERTAIN | crew | P-F/P-G review | O-D | A-I/A-C review | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | UNRESOLVED | UNRESOLVED | UNRESOLVED | REMAINS_IN_QUARANTINE_ESCAPE_POINT_NOT_READY | NOT_FOR_RELEASE; NOT_FOR_REFERENCE_CASE; NOT_FOR_CONSENSUS; NOT_FOR_TRAINING; NOT_FOR_DOWNSTREAM | SOURCE_ENRICHMENT |
| COMAIR-5191 | A4R126 tracker; A4R127 queue; A4R106/A4R109/A4R110 official-source material | PARTIAL_REQUIRES_POA_REVIEW | QUEUE_B_POA_REVIEW | P0 | ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED | UNRESOLVED | runway selection/alignment | correct runway/clearance state | A4R106/A4R110; taxi/takeoff sequence; hold-short/lineup first departure unresolved | UNCERTAIN | crew | P-G | UNRESOLVED | UNRESOLVED | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | NOT_REVIEWED_ESCAPE_POINT_NOT_READY | UNRESOLVED | UNRESOLVED | UNRESOLVED | REMAINS_IN_QUARANTINE_ESCAPE_POINT_NOT_READY | NOT_FOR_RELEASE; NOT_FOR_REFERENCE_CASE; NOT_FOR_CONSENSUS; NOT_FOR_TRAINING; NOT_FOR_DOWNSTREAM | SOURCE_ENRICHMENT |

## Metrics
| metric | value |
|---|---:|
| totalQueueBP0Eligible | 7 |
| escapePointReadyCount | 0 |
| escapePointNotReadyCount | 7 |
| whenStatementValid | 0 |
| whenStatementInvalid | 0 |
| poaReviewedCount | 0 |
| priorPOARetainedCount | 0 |
| draftPOARevisedCount | 0 |
| pAxisRetained | 0 |
| pAxisRevised | 0 |
| pAxisUnresolved | 7 |
| oAxisRetained | 0 |
| oAxisRevised | 0 |
| oAxisUnresolved | 7 |
| aAxisRetained | 0 |
| aAxisRevised | 0 |
| aAxisUnresolved | 7 |
| requiresAuthorReviewCount | 0 |
| requiresFullRebuildCount | 5 |
| remainsInQuarantineCount | 7 |
| releasedCodeCreatedCount | 0 |
| selectedCodeClassifiedCount | 0 |
| downstreamOpenedCount | 0 |
