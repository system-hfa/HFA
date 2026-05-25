# SERA Engine vNext A4R115 Cross-Case Consistency Review v0.2.0

Status: CROSS_CASE_CONSISTENCY_REVIEW  
Phase: A4+R-115  
DOCS_ONLY  
TRACE_CANDIDATE_BUILD_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Consistency checks applied
- Same canonical source enforced: A4R99 tree asset.
- Same validation baseline enforced: A4R99 checklist.
- P/O/A sections required in every built full-axis trace.
- Probable cause, contributing factors, and recommendations quarantined from answer selection.
- Boundary events not promoted to full-reference closure without sufficient evidence.

## Event-by-event consistency posture
| eventId | consistency result | forcing risk | note |
|---|---|---|---|
| UPS-1354 | CONSISTENT_WITH_LIMITATIONS | medium | P and A boundaries explicit; no forced closure where ambiguity remains |
| AMERICAN-1420 | CONSISTENT_WITH_REVIEW_REQUIRED | medium | O/P uncertainty preserved without artificial closure |
| ASIANA-214 | CONSISTENT_WITH_REVIEW_REQUIRED | high | complex P/O/A boundaries preserved as review-required |
| COLGAN-3407 | CONSISTENT_WITH_LIMITATIONS | medium | P and O usable; A boundary explicitly unresolved |
| US AIRWAYS 1549 | CONSISTENT_WITH_LIMITATIONS | low | nominal/no-failure calibration path documented cleanly |
| AMERICAN-965 | CONSISTENT_WITH_REVIEW_REQUIRED | high | complex navigation/action boundaries kept unresolved |
| HELIOS-522 | HELD_CONSISTENT | medium | partial source slice prevented forced trace |
| USAIR-427 | HELD_CONSISTENT | high | system-dominant event held to avoid human overclassification |
| TUROY EC225 | BOUNDARY_CONSISTENT | medium | boundary-only treatment preserved |
| KOREAN-801 | BOUNDARY_CONSISTENT | medium | not re-promoted as full reference in this batch |

## P vs O vs A boundary integrity
- P-approved legacy cases (`COMAIR-5191`, `KOREAN-801`) remain scoped as P-only/boundary and were not used to claim full-axis completeness.
- A4R115 full traces preserve axis separation by requiring axis-specific evidence mapping.
- Repeated factual elements were flagged with explicit uncertainty where they could be overcounted across axes.

## Batch usefulness threshold
- Full-axis useful traces created: 6
- Full-axis traces with `PASS_WITH_LIMITATIONS` or `REVIEW_REQUIRED`: 6
- Threshold for preparing one author review bundle (>=3 useful full-axis traces): PASS

## Recommendation
Prepare one consolidated author review bundle for UPS-1354, AMERICAN-1420, COLGAN-3407, and US AIRWAYS 1549. Keep ASIANA-214 and AMERICAN-965 in review-required track and keep HELIOS-522/USAIR-427/TUROY/KOREAN in held or boundary queues.
