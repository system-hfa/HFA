# SERA Engine vNext QuestionPath Coverage Matrix A4R79 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-79 — QuestionPath Template and Backfill Plan

## Objective
Map `questionPath` coverage across the 30 real-event adjudication drafts and identify the first 15 cases requiring documentary backfill.

## Coverage matrix
| case | sourceBatch | P | O | A | questionPathPresent | questionPathFormat | backfillNeeded | backfillPriority | conflictRisk | nextStep |
|---|---|---|---|---|---|---|---|---|---|---|
| REAL-EVENT-0001 | BATCH_INITIAL_5 | P-G | O-A | UNRESOLVED | no | not standardized | yes | P1 | MEDIUM | Backfill P/O/A questionPath; preserve P-G/O-A/A unresolved. |
| REAL-EVENT-0002 | BATCH_INITIAL_5 | UNRESOLVED | O-A | UNRESOLVED | no | not standardized | yes | P1 | MEDIUM | Backfill warning/go-around uncertainty; preserve P/A unresolved. |
| REAL-EVENT-0004 | BATCH_INITIAL_5 | UNRESOLVED | O-A | UNRESOLVED | no | not standardized | yes | P1 | MEDIUM | Backfill mission/low-height uncertainty without inferring action. |
| REAL-EVENT-0006 | BATCH_INITIAL_5 | UNRESOLVED | O-A | UNRESOLVED | no | not standardized | yes | P1 | HIGH | Backfill technical-dominant guardrail and preserve hold. |
| REAL-EVENT-0028 | BATCH_INITIAL_5 | UNRESOLVED | UNRESOLVED | UNRESOLVED | no | not standardized | yes | P2 | HIGH | Backfill triage-only source limits; likely mostly `UNCLEAR`. |
| REAL-EVENT-0003 | BATCH_2_10 | P-G | O-A | UNRESOLVED | no | not standardized | yes | P1 | MEDIUM | Backfill perception/action boundary. |
| REAL-EVENT-0005 | BATCH_2_10 | UNRESOLVED | O-A | UNRESOLVED | no | not standardized | yes | P2 | MEDIUM | Backfill PF/PM and helideck-dynamics gaps. |
| REAL-EVENT-0010 | BATCH_2_10 | UNRESOLVED | O-A | UNRESOLVED | no | not standardized | yes | P2 | LOW | Backfill conservative condition/action hold. |
| REAL-EVENT-0013 | BATCH_2_10 | UNRESOLVED | UNRESOLVED | UNRESOLVED | no | not standardized | yes | P2 | HIGH | Backfill source identity mismatch guardrail. |
| REAL-EVENT-0015 | BATCH_2_10 | P-G | O-A | UNRESOLVED | no | not standardized | yes | P1 | MEDIUM | Backfill dark-night P/A traceability. |
| REAL-EVENT-0016 | BATCH_2_10 | P-C | O-A | UNRESOLVED | no | not standardized | yes | P1 | MEDIUM | Backfill automation P-C vs P-G reasoning. |
| REAL-EVENT-0007 | BATCH_2_10 | UNRESOLVED | O-A | UNRESOLVED | no | not standardized | yes | P2 | MEDIUM | Backfill maintenance-chain uncertainty. |
| REAL-EVENT-0008 | BATCH_2_10 | UNRESOLVED | O-A | UNRESOLVED | no | not standardized | yes | P2 | LOW | Backfill condition-dominant negative control. |
| REAL-EVENT-0009 | BATCH_2_10 | UNRESOLVED | O-A | UNRESOLVED | no | not standardized | yes | P2 | MEDIUM | Backfill external barrier/bird-strike response-window limits. |
| REAL-EVENT-0011 | BATCH_2_10 | UNRESOLVED | O-A | UNRESOLVED | no | not standardized | yes | P2 | MEDIUM | Backfill infrastructure/hazard-awareness limits. |
| REAL-EVENT-0014/0030 | BATCH_3_15 | UNRESOLVED | UNRESOLVED | UNRESOLVED | yes | Batch 3 narrative questionPath | no | N/A | MEDIUM | No A4+R-79 backfill; retain Batch 3 reference. |
| N56RD | BATCH_3_15 | UNRESOLVED | O-A | UNRESOLVED | yes | Batch 3 narrative questionPath | no | N/A | LOW | No A4+R-79 backfill. |
| D-HHNH | BATCH_3_15 | P-G | O-A | UNRESOLVED | yes | Batch 3 narrative questionPath | no | N/A | MEDIUM | Use as P-G/O-A/A-unresolved format reference. |
| G-BHYB | BATCH_3_15 | P-F | O-A | UNRESOLVED | yes | Batch 3 narrative questionPath | no | N/A | MEDIUM | Use as night/offshore P-axis reference. |
| HL9294 | BATCH_3_15 | P-G | O-D | UNRESOLVED | yes | Batch 3 narrative questionPath | no | N/A | MEDIUM | Use as O-D objective-diversity reference. |
| PR-CHI | BATCH_3_15 | P-H | O-A | UNRESOLVED | yes | Batch 3 narrative questionPath | no | N/A | MEDIUM | Use as communication/information path reference. |
| N200BK | BATCH_3_15 | P-G | O-A | UNRESOLVED | yes | Batch 3 narrative questionPath | no | N/A | MEDIUM | No A4+R-79 backfill. |
| N109W | BATCH_3_15 | P-G | O-D | UNRESOLVED | yes | Batch 3 narrative questionPath | no | N/A | MEDIUM | Use as O-D continuation-objective reference. |
| N11NM | BATCH_3_15 | P-C | O-A | UNRESOLVED | yes | Batch 3 narrative questionPath | no | N/A | MEDIUM | Use as automation P-C format reference. |
| N127LN | BATCH_3_15 | UNRESOLVED | O-A | UNRESOLVED | yes | Batch 3 narrative questionPath | no | N/A | LOW | No A4+R-79 backfill. |
| N120HH | BATCH_3_15 | UNRESOLVED | O-A | UNRESOLVED | yes | Batch 3 narrative questionPath | no | N/A | LOW | No A4+R-79 backfill. |
| N525TA | BATCH_3_15 | UNRESOLVED | O-A | UNRESOLVED | yes | Batch 3 narrative questionPath | no | N/A | LOW | No A4+R-79 backfill. |
| BS211-Q400 | BATCH_3_15 | P-H | O-C | A-F | yes | Batch 3 narrative questionPath | no | N/A | MEDIUM | Use as O-C/A-F objective-action diversity reference. |
| REAL-EVENT-0032 | BATCH_3_15 | UNRESOLVED | UNRESOLVED | UNRESOLVED | yes | Batch 3 narrative questionPath | no | N/A | HIGH | No A4+R-79 backfill; retain triage source limits. |
| REAL-EVENT-0033 | BATCH_3_15 | UNRESOLVED | UNRESOLVED | UNRESOLVED | yes | Batch 3 narrative questionPath | no | N/A | HIGH | No A4+R-79 backfill; retain triage source limits. |

## Metrics
- totalCases=30
- questionPathPresent=15
- questionPathMissing=15
- coverage=50%
- targetCoverageAfterBackfill=100%

## Locks
- No `releasedCode`.
- No `selectedCode=CLASSIFIED`.
- No finalConclusion, HFACS, Risk/ERC, or recommendations.
- No fixture, baseline, UI/API/DB, migration, or runtime change.


## A4+R-80 update
- coverageBefore=15/30
- coverageAfter=30/30
- proposedCodeChanges=0
- unresolvedReduced=0
- conflictForAuthorReviewCount=0

Backfill docs created:
- [QUESTIONPATH-BACKFILL-REAL-EVENT-001](./real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-REAL-EVENT-001.md) - REAL-EVENT-0001 - NO_CONFLICT
- [QUESTIONPATH-BACKFILL-REAL-EVENT-002](./real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-REAL-EVENT-002.md) - REAL-EVENT-0002 - NO_CONFLICT
- [QUESTIONPATH-BACKFILL-REAL-EVENT-003](./real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-REAL-EVENT-003.md) - REAL-EVENT-0004 - NO_CONFLICT
- [QUESTIONPATH-BACKFILL-REAL-EVENT-004](./real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-REAL-EVENT-004.md) - REAL-EVENT-0006 - NO_CONFLICT
- [QUESTIONPATH-BACKFILL-REAL-EVENT-005](./real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-REAL-EVENT-005.md) - REAL-EVENT-0028 - NO_CONFLICT
- [QUESTIONPATH-BACKFILL-BATCH2-001](./real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-BATCH2-001.md) - REAL-EVENT-0003 - NO_CONFLICT
- [QUESTIONPATH-BACKFILL-BATCH2-002](./real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-BATCH2-002.md) - REAL-EVENT-0005 - NO_CONFLICT
- [QUESTIONPATH-BACKFILL-BATCH2-003](./real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-BATCH2-003.md) - REAL-EVENT-0010 - NO_CONFLICT
- [QUESTIONPATH-BACKFILL-BATCH2-004](./real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-BATCH2-004.md) - REAL-EVENT-0013 - NO_CONFLICT
- [QUESTIONPATH-BACKFILL-BATCH2-005](./real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-BATCH2-005.md) - REAL-EVENT-0015 - NO_CONFLICT
- [QUESTIONPATH-BACKFILL-BATCH2-006](./real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-BATCH2-006.md) - REAL-EVENT-0016 - NO_CONFLICT
- [QUESTIONPATH-BACKFILL-BATCH2-007](./real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-BATCH2-007.md) - REAL-EVENT-0007 - NO_CONFLICT
- [QUESTIONPATH-BACKFILL-BATCH2-008](./real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-BATCH2-008.md) - REAL-EVENT-0008 - NO_CONFLICT
- [QUESTIONPATH-BACKFILL-BATCH2-009](./real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-BATCH2-009.md) - REAL-EVENT-0009 - NO_CONFLICT
- [QUESTIONPATH-BACKFILL-BATCH2-010](./real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-BATCH2-010.md) - REAL-EVENT-0011 - NO_CONFLICT

No backfill conflicts requiring author correction were identified. All existing P/O/A values and maturity statuses remain unchanged.
