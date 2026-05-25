# SERA Engine vNext Opus External Audit Intake A4R117 v0.2.0

Status: OPUS_EXTERNAL_AUDIT_INTAKE
Phase: A4+R-117
DOCS_ONLY
OPUS_AUDIT_INTAKE_AND_PATCH_ONLY
NO_AUTHOR_REVIEW
NO_RELEASE
NO_DOWNSTREAM

## Source and scope
- source: Opus external methodological audit
- scope: A4R115 full-axis trace drafts and A4R116 QA artifacts
- canonical baseline used for intake checks:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`

## Event summary table
| eventId | Opus verdict | A4R117 intake decision |
|---|---|---|
| UPS-1354 | KEEP_FOR_AUTHOR_REVIEW with mandatory double-counting warning | accepted; patch required before bundle construction |
| AMERICAN-1420 | REQUIRE_PATCH_BEFORE_REVIEW, substantive not minor | accepted; removed from ready-bundle set until substantive patch/retrace |
| ASIANA-214 | HOLD_OVERCLASSIFICATION_RISK | accepted; stays outside bundle |
| COLGAN-3407 | KEEP_FOR_AUTHOR_REVIEW with A-F/A-E boundary live | accepted |
| US-AIRWAYS-1549 | KEEP_FOR_AUTHOR_REVIEW nominal candidate with non-dominant caveat | accepted |
| AMERICAN-965 | HOLD_OVERCLASSIFICATION_RISK | accepted; stays outside bundle |
| HELIOS-522 | held/boundary decision correct | accepted |
| USAIR-427 | held/boundary decision correct | accepted |
| TUROY EC225 | held/boundary decision correct | accepted |
| KOREAN-801 | held/boundary decision correct | accepted |

## Accepted points
- Canonical structure passes for all six A4R115 traces.
- No invented question, no missing canonical node, no non-canonical flow claim.
- SERA terminology lock respected.
- Quarantine discipline documented.
- Recovered corpus does not alter A4R115 trace decisions.
- Held/boundary decisions remain correct.

## Partially accepted points
- A4R116 marked AMERICAN-1420 as minor patch. A4R117 upgrades this to substantive patch based on overclassification risk in P/O/A branch framing.

## Not applicable
- none.

## Governance decisions accepted literally
- AMERICAN-1420 is not a minor fix; it is a substantive patch.
- UPS-1354 needs mandatory double-counting warning.
- COLGAN-3407 and US-AIRWAYS-1549 remain strong.
- ASIANA-214 and AMERICAN-965 remain outside bundle scope.
- Held/boundary cases remain correct.
- Recovered corpus does not alter A4R115.

## Governance outcome for A4R117
Apply Opus-driven patching before any author-review bundle assembly.

A4R117 does not:
- create an author-review bundle,
- record any author decision,
- approve any reference case,
- create release artifacts,
- open downstream,
- create finalConclusion/HF taxonomy/Risk/ERC/ARMS/recommendations artifacts.
