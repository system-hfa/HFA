# SERA Engine vNext Priority Source-Slice Trace Batch A4R119 v0.2.0

Status: PRIORITY_BATCH_EXECUTED
Phase: A4+R-119
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM

## Candidates evaluated
- UNITED-173
- ATLAS-3591
- EASTERN-401
- UNITED-232

## Source-validation outcomes
| eventId | sourceDecision | notes |
|---|---|---|
| UNITED-173 | TRACE_DRAFT_ALLOWED | Official NTSB TXT usable with OCR caveats. |
| ATLAS-3591 | TRACE_DRAFT_ALLOWED | Official NTSB TXT strong (CVR/FDR rich). |
| EASTERN-401 | HOLD_OCR_REQUIRED | Official recovered TXT unusable; full-pool artifact is secondary-like. |
| UNITED-232 | TRACE_DRAFT_ALLOWED | Official NTSB TXT strong (CVR/FDR/system timeline rich). |

## Source slices created (A4R119)
- `docs/sera-vnext/official-report-source-slices/a4r119/SOURCE-SLICE-UNITED-173-A4R119.md`
- `docs/sera-vnext/official-report-source-slices/a4r119/SOURCE-SLICE-ATLAS-3591-A4R119.md`
- `docs/sera-vnext/official-report-source-slices/a4r119/SOURCE-SLICE-UNITED-232-A4R119.md`

## Full-axis trace drafts created (A4R119)
- `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-UNITED-173-FULL-AXIS-CANONICAL-DRAFT-A4R119.md`
- `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-ATLAS-3591-FULL-AXIS-CANONICAL-DRAFT-A4R119.md`
- `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-UNITED-232-FULL-AXIS-CANONICAL-DRAFT-A4R119.md`

## Held in this batch
- EASTERN-401: held with `HOLD_OCR_REQUIRED`; no A4R119 trace draft created.

## Comparison with stable A4R117 set
Current stable set from A4R117 remains unchanged:
- UPS-1354
- COLGAN-3407
- US-AIRWAYS-1549

A4R119 adds new draft candidates for future review lanes but does not alter A4R117 stability governance.

## Coverage impact (P/O/A)
- P coverage improved with a modern disorientation-heavy case (ATLAS-3591) and a classical fuel-fixation case (UNITED-173).
- O coverage improved with a stronger O-D candidate lane (UNITED-173) and a conservative nominal emergency-objective lane (UNITED-232).
- A coverage improved with adversarial nominal-under-catastrophic-outcome candidate (UNITED-232) plus high-workload multi-actor action boundary (ATLAS-3591).

## Future review direction (not this phase)
- likely future review-lane candidates after QA refinement: UNITED-173 and UNITED-232.
- likely future boundary-refinement candidate: ATLAS-3591.
- prerequisite for EASTERN-401: OCR/official-text recovery before any trace attempt.

No author decision is recorded in A4R119.
