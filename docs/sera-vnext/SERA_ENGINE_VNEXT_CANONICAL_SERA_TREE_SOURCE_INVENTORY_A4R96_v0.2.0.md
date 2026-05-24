# SERA Engine vNext Canonical SERA Tree Source Inventory A4R96 v0.2.0

Status: CANONICAL_TREE_SOURCE_INVENTORY  
Phase: A4+R-96  
DOCS_ONLY  
CORRECTION_ONLY

## Objective
Inventory canonical SERA/CERA tree sources for reference-trace construction using exact question wording and canonical branch logic.

## Source Inventory
| sourceFile | sourceType | containsExactQuestions | containsDecisionNodes | containsBranchingLogic | containsLeavesOrConclusions | containsPAxis | containsOAxis | containsAAxis | containsPreconditions | reliabilityForReferenceTrace | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `backend/app/sera/documents/SERA.pdf` | official method document (Hendy report PDF) | yes | yes | yes | yes | yes | yes | yes | yes | HIGH | Canonical base (Hendy) with Step 2/3/4/5 exact question wording and branch logic for objective/perception/action ladders. |
| `docs/reference/hendy-sera-2003.txt` | text extraction/transcription of Hendy report | yes | yes | yes | yes | yes | yes | yes | yes | HIGH | Canonical English wording and flow text (`What was...`, `What did...`, `How was...`) aligned to the SERA ladder structure. |
| `docs/reference/daumas-sera-offshore.txt` | translated/adapted operational text with Annex A flow | yes | yes | yes | yes | yes | yes | yes | yes | HIGH | Canonical PT operational wording and flowcharts (Figura 11/12/13) for O/P/A axes, explicitly marked as adapted from Hendy (2003). |
| `docs/SERA_STEP1_STEP2_EXPLICIT_DESIGN_v0.1.4.md` | implementation-design document | partial | no | partial | no | partial | partial | partial | no | LOW | Design artifact only; not canonical source. |
| `docs/SERA_STEP1_STEP2_EXPLICIT_STATEMENTS_v0.1.4.md` | observational trace method note | partial | no | partial | no | partial | partial | partial | no | LOW | Trace extraction heuristic, not canonical source. |
| `docs/SERA_QUESTION_TRACE_STEP1_STEP2_v0.1.4.md` | question-trace implementation note | partial | partial | partial | no | partial | partial | partial | no | LOW | Internal trace IDs; not authoritative canonical tree wording. |
| `frontend/src/lib/sera/rules/` | runtime rule corpus (JSON + selectors) | no | partial | partial | yes | yes | yes | yes | partial | LOW | Runtime operationalization; not canonical tree text source. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_REFERENCE_CASE_CALIBRATION_TRACE_TEMPLATE_A4R94_v0.2.0.md` | reference-case template | partial | partial | partial | partial | yes | yes | yes | partial | MEDIUM | Must be constrained to canonical wording by A4R96 contract; cannot introduce generic placeholders. |
| `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-A4R95.md` | historical reference trace artifact | no | no | partial | partial | yes | yes | yes | partial | LOW | Historical-only artifact; superseded for noncanonical question usage. |

## Canonical Flow Confirmation
The canonical O/P/A ladder flow is confirmed by source-aligned figures and text in repository materials:
- Objective flow: `docs/reference/daumas-sera-offshore.txt` (Figura 11, p. 105).
- Perception flow: `docs/reference/daumas-sera-offshore.txt` (Figura 12, p. 110).
- Action flow: `docs/reference/daumas-sera-offshore.txt` (Figura 13, p. 122).
- Hendy anchor text: `docs/reference/hendy-sera-2003.txt` (Step 3/4/5 and three core questions).

## Language Calibration Rule
- English canonical phrasing is anchored to Hendy Step 3/4/5 question wording.
- Portuguese operational phrasing follows Daumas adaptation text/figures.
- Daumas O/P/A code set is mandatory and preserved as active classification code contract.
- Flow application order is mandatory: run Step-2 (`GOAL`, `PERCEPTION`, `ACTION`) before axis ladders.

## Conclusion
- canonicalTreeStatus: FOUND_COMPLETE
- primaryCanonicalSource: `backend/app/sera/documents/SERA.pdf` + `docs/reference/hendy-sera-2003.txt`
- secondarySources:
  - `docs/reference/daumas-sera-offshore.txt`
  - `docs/SERA_STEP1_STEP2_EXPLICIT_DESIGN_v0.1.4.md`
  - `docs/SERA_STEP1_STEP2_EXPLICIT_STATEMENTS_v0.1.4.md`
  - `docs/SERA_QUESTION_TRACE_STEP1_STEP2_v0.1.4.md`
  - `frontend/src/lib/sera/rules/`
- blockers:
  - none for canonical O/P/A trace rebuild under exact-question discipline.

REFERENCE_CASE_REBUILD_BLOCKED=false
reason=CANONICAL_TREE_CONFIRMED_FOR_POA
