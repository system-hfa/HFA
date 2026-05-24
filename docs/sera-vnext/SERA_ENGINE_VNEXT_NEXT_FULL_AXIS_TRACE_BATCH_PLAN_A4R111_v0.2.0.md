# SERA Engine vNext Next Full-Axis Trace Batch Plan A4R111 v0.2.0

Status: NEXT_FULL_AXIS_TRACE_BATCH_PLAN  
Phase: A4+R-111  
DOCS_ONLY  
FULL_AXIS_REBALANCING_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Batch objective
Build the next canonical draft batch with explicit P/O/A documentation for every selected event, including nominal-or-unresolved handling when a failure path is not supportable.

## selectedBatchCandidates (A4R112 target)
| selectedBatchCandidate | primaryAxisValue | secondaryAxisValue | expectedPStatus | expectedOStatus | expectedAStatus | whySelected | sourceFilesNeeded | sourceSliceNeeded | nextPhaseRecommendation |
|---|---|---|---|---|---|---|---|---|---|
| UPS-1354 | O + A | P | DOCUMENTABLE_WITH_LIMITATIONS | DOCUMENTABLE_WITH_LIMITATIONS | DOCUMENTABLE_WITH_LIMITATIONS | data-rich nonprecision approach with strong decision and execution timeline | `UPS-1354-NTSB-AAR1402.pdf`, `UPS-1354-NTSB-AAR1402.txt` | yes (focused O/A slice) | include in first full-axis build wave |
| AMERICAN-1420 | O + A | P | DOCUMENTABLE_WITH_LIMITATIONS | DOCUMENTABLE_WITH_LIMITATIONS | DOCUMENTABLE_WITH_LIMITATIONS | strong continuation/decision and landing-execution chain under adverse context | `AMERICAN-1420-NTSB-AAR0102.pdf`, `AMERICAN-1420-NTSB-AAR0102.txt` | yes (decision/action gate slicing) | include in first full-axis build wave |
| ASIANA-214 | A + P | O | DOCUMENTABLE_WITH_LIMITATIONS | SOURCE_SLICE_REQUIRED | DOCUMENTABLE_WITH_LIMITATIONS | high-quality automation and action chronology; O branch needs sharper intent-risk split | `ASIANA-214-NTSB-AAR1401.pdf`, `ASIANA-214-NTSB-AAR1401.txt`, existing A4R106 slice | yes (objective branch refinement) | include with explicit review gate on O branch |
| AIR-CANADA-624 | A + O | P | DOCUMENTABLE_WITH_LIMITATIONS | DOCUMENTABLE_OR_NOMINAL_PATH_POSSIBLE | DOCUMENTABLE_WITH_LIMITATIONS | good candidate for balanced axes and possible nominal branch calibration | `AIR-CANADA-624-TSB-A15H0002.pdf`, `AIR-CANADA-624-TSB-A15H0002.txt` | yes (nominal-path evidence slicing) | include to calibrate non-failure handling discipline |

## Batch composition rule
- Do not run a P-only batch.
- Every selected event must produce documented P/O/A axis sections.
- If any axis cannot be closed canonically, register `UNRESOLVED` or `SOURCE_SLICE_REQUIRED`.

## Fallback rule
If one selected event fails readiness during source slicing, fallback candidate order:
1. AMERICAN-965
2. FIRST-AIR-6560
3. KEGWORTH-GOBME

## nextPhaseRecommendation
- Execute A4R112 as a full-axis trace-draft batch for the four selected candidates above.
- Keep COMAIR-5191 and KOREAN-801 as P-only internal references unless dedicated O/A source-slice expansion is run later.

## A4R112 supersession note
- This A4R111 plan is superseded for execution sequencing by:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_NEXT_FULL_AXIS_TRACE_BATCH_PLAN_A4R112_v0.2.0.md`
- Reason: A4R112 expanded selection from a shortlist-only view to full combined-corpus mining across both A4R111 lots.
- Governance continuity retained:
  - COMAIR-5191 and KOREAN-801 remain P-only internal drafts;
  - no automatic O/A closure.
