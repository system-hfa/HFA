# SERA Engine vNext A4R115 Full-Axis Trace Method QA A4R116 v0.2.0

Status: A4R115_TRACE_METHOD_QA
Phase: A4+R-116
DOCS_ONLY
INDEPENDENT_QA_ONLY
NO_TRACE_CREATION
NO_RELEASE
NO_DOWNSTREAM

## Scope
A4R116 audits the six A4R115 full-axis trace drafts against A4R99 canonical-tree and checklist requirements. This QA does not modify axis codes, does not close P/O/A, and does not create an author-review bundle.

## Canonical table check
A script-level check compared each A4R115 trace-table `nodeId`, `exactQuestionTextPT`, and `exactQuestionTextENAnchor` against the A4R99 asset. Result: `PASS`, zero canonical text mismatches found.

## Trace QA matrix
| eventId | trace file | source slice file | canonicalAssetUsed | allAxesPresent | P path canonical | O path canonical | A path canonical | evidenceSupportsP | evidenceSupportsO | evidenceSupportsA | probableCauseQuarantined | externalFindingsQuarantined | overclassificationRisk | recoveredCorpusImpact | recommendedQAStatus | rationale |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| UPS-1354 | `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-UPS-1354-FULL-AXIS-CANONICAL-DRAFT-A4R115.md` | `docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-UPS-1354-A4R115.md` | yes | yes | pass | pass | pass | partial | yes | partial | yes | yes | MEDIUM | NONE | READY_FOR_AUTHOR_REVIEW | Canonical path is structurally valid. Evidence supports a reviewable P-F/O-D/A-F draft, but P-F versus P-G and A-F versus A-G remain live boundaries and `UPS-E5` reuse requires explicit anti-double-counting rationale per axis. |
| AMERICAN-1420 | `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-AMERICAN-1420-FULL-AXIS-CANONICAL-DRAFT-A4R115.md` | `docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-AMERICAN-1420-A4R115.md` | yes | yes | pass | pass | pass | partial | partial | partial | yes | yes | HIGH | NONE | REQUIRE_SUBSTANTIVE_PATCH_BEFORE_REVIEW | Trace is canonical, but Opus/A4R117 intake treats current P-D, O-C, and A-C framing as substantive overclassification risk. Case is not review-bundle ready until rework/retrace. |
| ASIANA-214 | `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-ASIANA-214-FULL-AXIS-CANONICAL-DRAFT-A4R115.md` | `docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-ASIANA-214-A4R115.md` | yes | yes | pass | pass | pass | partial | partial | partial | yes | yes | HIGH | NONE | HOLD_OVERCLASSIFICATION_RISK | REVIEW_REQUIRED is justified. P-F versus P-G and A-F versus A-E remain method-sensitive; the trace should not enter the approval bundle without deeper source-slice or author-specific branch decision. |
| COLGAN-3407 | `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-COLGAN-3407-FULL-AXIS-CANONICAL-DRAFT-A4R115.md` | `docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-COLGAN-3407-A4R115.md` | yes | yes | pass | pass | pass | yes | yes | partial | yes | yes | MEDIUM | NONE | READY_FOR_AUTHOR_REVIEW | P-G and O-A are well bounded. A-F remains review-required against A-E, but the trace is suitable for author review if the A-axis uncertainty is explicit. |
| US-AIRWAYS-1549 | `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-US-AIRWAYS-1549-FULL-AXIS-CANONICAL-DRAFT-A4R115.md` | `docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-US-AIRWAYS-1549-A4R115.md` | yes | yes | pass | pass | pass | yes | yes | yes | yes | yes | LOW | NONE | READY_FOR_AUTHOR_REVIEW | Strongest nominal/no-failure calibration draft in the batch. Main QA caution is to avoid treating successful outcome as proof; the trace already states this limit. |
| AMERICAN-965 | `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-AMERICAN-965-FULL-AXIS-CANONICAL-DRAFT-A4R115.md` | `docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-AMERICAN-965-A4R115.md` | yes | yes | pass | pass | pass | partial | partial | partial | yes | yes | HIGH | NONE | HOLD_OVERCLASSIFICATION_RISK | REVIEW_REQUIRED is appropriate. FMS/fix ambiguity, continued descent, and speedbrake escape-response evidence are real but not enough for review-bundle promotion in this phase. |

## Cross-trace QA findings
- All six traces contain P/O/A sections and use canonical A4R99 node text.
- No canonical node is missing in the trace tables reviewed.
- All six traces quarantine external investigation conclusions from SERA answer selection.
- Highest methodological risk: objective-axis overclassification from continuation decisions, especially AMERICAN-1420 and ASIANA-214.
- Highest action-axis branch risk: A-F versus A-E or A-G boundaries in UPS-1354, COLGAN-3407, ASIANA-214, and AMERICAN-965.
- Recovered corpus creates no direct A4R115 trace challenge.

## A4R116 QA posture (partially superseded by A4R117 Opus intake)
A4R116 baseline remains valid for canonical-structure checks.
A4R117 supersedes bundle-readiness interpretation for AMERICAN-1420:
- ready for author review: `UPS-1354`, `COLGAN-3407`, `US-AIRWAYS-1549`;
- substantive patch required before review: `AMERICAN-1420`;
- outside bundle: `ASIANA-214`, `AMERICAN-965`.
