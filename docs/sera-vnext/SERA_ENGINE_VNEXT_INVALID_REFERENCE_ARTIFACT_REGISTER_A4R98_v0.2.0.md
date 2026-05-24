# SERA Engine vNext Invalid Reference Artifact Register A4R98 v0.2.0

Status: INVALID_REFERENCE_ARTIFACT_REGISTER  
Phase: A4+R-98

## Register Rule
Any artifact listed here cannot be used for:
- front-end calibration display;
- reference case;
- methodology proof;
- author approval evidence;
- release decision.

## Invalid Artifacts
| artifact | invalidReason | invalidScope | stillUsefulForAuditHistory | replacementNeeded | replacementPlan | status |
|---|---|---|---|---|---|---|
| `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-A4R95.md` | Noncanonical generic question flow (`P1..P5`, `O1..`, `A1..`) instead of exact canonical tree questions. | full artifact | yes | no (already replaced) | Replaced by `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-CANONICAL-A4R100.md` (validationStatus: `PASS_WITH_LIMITATIONS`). | SUPERSEDED / INVALID_FOR_REFERENCE_USE (REPLACED_BY_A4R100) |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_WITHDRAWN_BOUNDARY_REFERENCE_PACK_A4R96_v0.2.0.md` | Summary depends on pre-canonical boundary trace format. | full artifact | yes | no (already replaced) | Replaced by `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-WITHDRAWN-P-AXIS-BOUNDARY-CANONICAL-A4R102.md` (validationStatus: `REVIEW_REQUIRED`). | INVALID_FOR_REFERENCE_USE (REPLACED_BY_A4R102_PENDING_AUTHOR_REVIEW) |
| `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-WITHDRAWN-P-AXIS-BOUNDARY-PACK-A4R96.md` | Boundary pack lacks mandatory canonical per-node fields and exact question trace path. | full artifact | yes | no (already replaced) | Replaced by `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-WITHDRAWN-P-AXIS-BOUNDARY-CANONICAL-A4R102.md` (validationStatus: `REVIEW_REQUIRED`). | INVALID_FOR_REFERENCE_USE (REPLACED_BY_A4R102_PENDING_AUTHOR_REVIEW) |
| `docs/sera-vnext/real-event-questionpath-backfill/*.md` | Uses auxiliary/synthetic question text (`Was ...`) rather than exact canonical SERA wording. | family | yes | yes | Replace usage with canonical traces built from A4+R-99 asset pack. | NONCANONICAL_QUESTIONPATH_FAMILY |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_QUESTION_PATH_BACKFILL_EXECUTION_A4R80_v0.2.0.md` | Coverage statement is based on noncanonical backfill artifacts. | full artifact | yes | yes | Keep for history only; do not use as calibration proof. | NONCANONICAL_COVERAGE_AUDIT_ONLY |
| `docs/sera-vnext/real-event-adjudications-batch-3/REAL-EVENT-BATCH3-ADJUDICATION-*.md` | Adjudication prompts include noncanonical helper question wording. | family | yes | yes | Use as triage context only; canonical trace required before proof usage. | RESTRICTED_TRIAGE_ONLY |
| `docs/sera-vnext/external-candidates/adjudications-batch-1/EXT-BATCH1-ADJUDICATION-*.md` | Same noncanonical helper-question pattern in draft adjudication paths. | family | yes | yes | Rebuild proof traces only via canonical asset pack. | RESTRICTED_TRIAGE_ONLY |

## Notes
- This register does not delete historical artifacts.
- It defines hard usage restrictions until canonical replacements exist.
- Replacement traces must validate against:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`
