# SERA Engine vNext Next Full-Axis Trace Batch Plan A4R112 v0.2.0

Status: NEXT_FULL_AXIS_TRACE_BATCH_PLAN  
Phase: A4+R-112  
DOCS_ONLY  
CORPUS_MINING_AND_SELECTION_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Selection decision
- Batch size: 5 events.
- Selection rebalanced with combined two-lot corpus mining and full P/O/A requirement.
- A4R111 preliminary set is partially confirmed and expanded (UPS-1354, AMERICAN-1420, ASIANA-214 kept; AIR-CANADA-624 replaced for this cycle by COLGAN-3407 and US AIRWAYS 1549 to improve full-corpus signal diversity and nominal-path calibration).

| unifiedCandidateId | primaryAxisValue | secondaryAxisValue | expectedPStatus | expectedOStatus | expectedAStatus | whySelected | sourceFileAvailable | txtFileAvailable | sourceSliceNeeded | nextPhaseRecommendation |
|---|---|---|---|---|---|---|---|---|---|---|
| UC-003 | O + A | P | DOCUMENTABLE_WITH_LIMITATIONS | DOCUMENTABLE_WITH_LIMITATIONS | DOCUMENTABLE_WITH_LIMITATIONS | nonprecision approach with strong decision and execution timeline plus robust recorded data anchors | yes | yes | yes | build full-axis canonical draft with explicit P/O/A axis sections and unresolved handling when needed |
| UC-004 | O + A | P | DOCUMENTABLE_WITH_LIMITATIONS | DOCUMENTABLE_WITH_LIMITATIONS | DOCUMENTABLE_WITH_LIMITATIONS | decision-to-continue and landing-execution chain with rich procedural and callout context | yes | yes | yes | build full-axis canonical draft with explicit P/O/A axis sections and unresolved handling when needed |
| UC-002 | A + P | O | DOCUMENTABLE_WITH_LIMITATIONS | SOURCE_SLICE_REQUIRED_OR_NOMINAL_PATH_CANDIDATE | DOCUMENTABLE_WITH_LIMITATIONS | automation/mode/callout chain remains strong and objective branch can be refined with focused slicing | yes | yes | yes | build full-axis canonical draft with explicit P/O/A axis sections and unresolved handling when needed |
| UC-001 | P + A | O | DOCUMENTABLE_WITH_LIMITATIONS | DOCUMENTABLE_WITH_LIMITATIONS | DOCUMENTABLE_WITH_LIMITATIONS | high-density monitoring and response signals with strong O-context for continuation and control decisions | yes | yes | yes | build full-axis canonical draft with explicit P/O/A axis sections and unresolved handling when needed |
| UC-039 | Nominal O/A calibration | P | DOCUMENTABLE_WITH_LIMITATIONS | SOURCE_SLICE_REQUIRED_OR_NOMINAL_PATH_CANDIDATE | NOMINAL_OR_LIMITED_FAILURE_PATH_CANDIDATE | useful candidate to test nominal/no-failure axis documentation discipline under strong recorded-data context | yes | yes | yes | build full-axis canonical draft with explicit P/O/A axis sections and unresolved handling when needed |

## Full-axis rules for next phase
- Every selected event must include P/O/A sections, even when one axis is nominal or unresolved.
- No probable-cause/contributing-factor/recommendation text as answer key.
- If canonical closure is not supportable for an axis, register `UNRESOLVED` or `SOURCE_SLICE_REQUIRED`.


## Scope guardrail
- COMAIR-5191 and KOREAN-801 remain P-only internal/boundary drafts and are not used as full-reference closures in this batch.
