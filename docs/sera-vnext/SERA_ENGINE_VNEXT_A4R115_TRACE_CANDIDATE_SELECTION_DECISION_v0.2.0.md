# SERA Engine vNext A4R115 Trace Candidate Selection Decision v0.2.0

Status: TRACE_CANDIDATE_SELECTION_DECISION  
Phase: A4+R-115  
DOCS_ONLY  
TRACE_CANDIDATE_BUILD_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Event disposition

### TRACE_DRAFT_BUILD_NOW
- `UC-003` UPS-1354
- `UC-004` AMERICAN-1420
- `UC-002` ASIANA-214
- `UC-001` COLGAN-3407
- `UC-039` US AIRWAYS 1549
- `UC-024` AMERICAN-965

Rationale:
- Stronger local factual density and clearer P/O/A windows than other expanded candidates.
- Sufficient source slices for full-axis draft attempt, with explicit uncertainty retained.

### HELD_SOURCE_INSUFFICIENT
- `UC-051` HELIOS-522

Rationale:
- Source slice supports partial framing but remains insufficient for robust O/A closure quality in this batch.

### HELD_OVERCLASSIFICATION_RISK
- `UC-050` USAIR-427

Rationale:
- Strong control-system and technical-causation dominance; unsafe human branch risk is too high without deeper boundary work.

### BOUNDARY_ONLY
- `UC-005` KOREAN-801
- `UC-018` TUROY EC225

Rationale:
- Useful for boundary/adversarial calibration in A4R115, but not promoted to full-reference closure in this phase.

### NOMINAL_REFERENCE_CANDIDATE
- `UC-039` US AIRWAYS 1549

Rationale:
- Useful nominal/no-failure O/A path candidate while preserving explicit uncertainty and no release.

### FALLBACK_FOR_LATER
- `UC-051` HELIOS-522
- `UC-050` USAIR-427
- `UC-018` TUROY EC225
- `UC-005` KOREAN-801 boundary package

Rationale:
- Candidate set remains useful for later focused source-slice and boundary review cycles.

## Build count control
- Source-sliced events in A4R115: 10
- Full-axis trace drafts built now: 6
- Constraint check: between 3 and 7 full drafts -> PASS

## Scope guardrail
This decision is selection-only and draft-only. It does not create release, downstream, or final P/O/A closure.
