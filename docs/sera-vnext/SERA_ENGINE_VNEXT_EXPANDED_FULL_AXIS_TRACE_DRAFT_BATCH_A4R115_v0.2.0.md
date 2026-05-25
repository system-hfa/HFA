# SERA Engine vNext Expanded Full-Axis Trace Draft Batch A4R115 v0.2.0

Status: EXPANDED_FULL_AXIS_TRACE_DRAFT_BATCH  
Phase: A4+R-115  
DOCS_ONLY  
TRACE_CANDIDATE_BUILD_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Batch scope
- Events considered: 10
- Events source-sliced: 10
- Full-axis trace drafts built: 6
- Held/downgraded/boundary-only: 4

## Events considered
- Core: UPS-1354, AMERICAN-1420, ASIANA-214, COLGAN-3407, US AIRWAYS 1549
- Expanded: HELIOS-522, USAIR-427, TUROY EC225, AMERICAN-965, KOREAN-801 (boundary)

## Full-axis trace drafts created
- `REFERENCE-CASE-UPS-1354-FULL-AXIS-CANONICAL-DRAFT-A4R115.md`
- `REFERENCE-CASE-AMERICAN-1420-FULL-AXIS-CANONICAL-DRAFT-A4R115.md`
- `REFERENCE-CASE-ASIANA-214-FULL-AXIS-CANONICAL-DRAFT-A4R115.md`
- `REFERENCE-CASE-COLGAN-3407-FULL-AXIS-CANONICAL-DRAFT-A4R115.md`
- `REFERENCE-CASE-US-AIRWAYS-1549-FULL-AXIS-CANONICAL-DRAFT-A4R115.md`
- `REFERENCE-CASE-AMERICAN-965-FULL-AXIS-CANONICAL-DRAFT-A4R115.md`

## Trace-level summary
| eventId | validationStatus | P status/outcome | O status/outcome | A status/outcome | nextAction |
|---|---|---|---|---|---|
| UPS-1354 | PASS_WITH_LIMITATIONS | DRAFT_WITH_LIMITATIONS / P-F | DRAFT_WITH_LIMITATIONS / O-D | DRAFT_WITH_LIMITATIONS / A-F | send to review bundle with P-F vs P-G and A-F vs A-G checks |
| AMERICAN-1420 | PASS_WITH_LIMITATIONS | REVIEW_REQUIRED / P-D | REVIEW_REQUIRED / O-C | DRAFT_WITH_LIMITATIONS / A-C | send to review bundle with P/O caution |
| ASIANA-214 | REVIEW_REQUIRED | REVIEW_REQUIRED / P-F vs P-G | REVIEW_REQUIRED / O-D | REVIEW_REQUIRED / A-F vs A-E | keep review-required with deeper source slicing |
| COLGAN-3407 | PASS_WITH_LIMITATIONS | DRAFT_WITH_LIMITATIONS / P-G | DRAFT_WITH_LIMITATIONS / O-A | REVIEW_REQUIRED / A-F vs A-E | send to review bundle with A boundary note |
| US AIRWAYS 1549 | PASS_WITH_LIMITATIONS | DRAFT_WITH_LIMITATIONS / P-A | DRAFT_WITH_LIMITATIONS / O-A | DRAFT_WITH_LIMITATIONS / A-A | use as nominal/no-failure reference candidate |
| AMERICAN-965 | REVIEW_REQUIRED | REVIEW_REQUIRED / P-F vs P-G | REVIEW_REQUIRED / O-D | REVIEW_REQUIRED / A-I vs A-C | keep as review-required boundary trace |

## Held / downgraded / boundary-only
| eventId | status | reason |
|---|---|---|
| HELIOS-522 | HELD_SOURCE_INSUFFICIENT | partial source slice for full O/A confidence in this batch |
| USAIR-427 | HELD_OVERCLASSIFICATION_RISK | control-system dominated narrative with high human overreach risk |
| TUROY EC225 | BOUNDARY_ONLY | boundary utility preserved, full-axis closure deferred |
| KOREAN-801 | BOUNDARY_ONLY | retained as boundary case, not full-reference closure in this phase |

## Full-axis documentation control
- All built traces include explicit P/O/A sections.
- No axis was omitted in created full drafts.
- Where closure confidence was low, status remained `REVIEW_REQUIRED`.

## Comparison to A4R112 selection
- A4R112 proposed 5 core events; A4R115 executed those 5 plus 1 expanded full-trace candidate (`AMERICAN-965`).
- Expanded candidates were not forced into closure where evidence quality did not support it.

## Review-readiness decision
- Cases eligible for one consolidated author review bundle now: UPS-1354, AMERICAN-1420, COLGAN-3407, US AIRWAYS 1549.
- Cases to keep outside immediate approval flow: ASIANA-214, AMERICAN-965, HELIOS-522, USAIR-427, TUROY EC225, KOREAN-801 boundary.
