# SERA Engine vNext A4R115 Review-Required Cases Audit A4R116 v0.2.0

Status: REVIEW_REQUIRED_CASES_AUDIT
Phase: A4+R-116
DOCS_ONLY
QA_ONLY
NO_TRACE_CREATION
NO_PROMOTION
NO_RELEASE
NO_DOWNSTREAM

## Scope
This audit reviews the two A4R115 full-axis trace drafts retained outside the immediate author-review bundle: `ASIANA-214` and `AMERICAN-965`.

## Audit matrix
| eventId | current A4R115 status | REVIEW_REQUIRED appropriate? | axis to consider for SOURCE_SLICE_REQUIRED | recovered corpus impact | promotion to review bundle in A4R116? | rationale |
|---|---|---|---|---|---|---|
| ASIANA-214 | REVIEW_REQUIRED | yes | A-axis if A-E versus A-F is to be adjudicated; P-axis if P-F versus P-G cannot be resolved from existing slice | NONE | no | Automation/HOLD-mode ambiguity, available airspeed/path cues, 500 ft stabilization gate, and late go-around are all factual, but the P/A boundary is still too sensitive for approval-bundle promotion. O-D is reviewable but should not be isolated from P/A uncertainty. |
| AMERICAN-965 | REVIEW_REQUIRED | yes | P-axis and A-axis; possibly O-axis if continuation objective cannot be separated from navigation confusion | NONE | no | FMS/fix ambiguity and speedbrake non-retraction are strong factual candidates, but P-F versus P-G and A-I versus A-C require deeper source slicing. O-D also risks overclassifying a rapidly changing clearance/navigation context. |

## Case-level findings
### ASIANA-214
- Full P/O/A documentation exists.
- Canonical path text matches A4R99.
- `REVIEW_REQUIRED` should remain.
- P-axis may stay review-required rather than being downgraded immediately because both automation ambiguity and available correct cues are documented.
- A-axis should be treated as `SOURCE_SLICE_REQUIRED` if the future review tries to decide between action-selection failure and automation-knowledge failure.
- Recovered corpus does not affect this case.
- A4R116 does not promote ASIANA-214 to review-bundle eligibility.

### AMERICAN-965
- Full P/O/A documentation exists.
- Canonical path text matches A4R99.
- `REVIEW_REQUIRED` should remain.
- P-axis should be a source-slice refinement priority because navigation data ambiguity versus available correct information is unresolved.
- A-axis should be a source-slice refinement priority because speedbrake non-retraction can be interpreted as time-pressure selection or implementation lapse.
- O-axis should remain cautious and not become a clean O-D approval candidate in isolation.
- Recovered corpus does not affect this case.
- A4R116 does not promote AMERICAN-965 to review-bundle eligibility.

## A4R116 disposition
Both `ASIANA-214` and `AMERICAN-965` remain outside the author-review approval bundle. Their next valid path is focused source-slice refinement or targeted author-method review, not promotion in A4R116.
