# SERA Engine vNext Canonical SERA Tree Source Inventory A4R96 v0.2.0

Status: CANONICAL_TREE_SOURCE_INVENTORY  
Phase: A4+R-96  
DOCS_ONLY  
CORRECTION_ONLY

## Objective
Inventory all repository sources that could serve as canonical SERA/CERA tree inputs for reference-trace construction.

## Source Inventory
| sourceFile | sourceType | containsExactQuestions | containsDecisionNodes | containsBranchingLogic | containsLeavesOrConclusions | containsPAxis | containsOAxis | containsAAxis | containsPreconditions | reliabilityForReferenceTrace | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `backend/app/sera/documents/SERA.pdf` | official method document (Hendy report PDF) | yes | partial | partial | yes | yes | yes | yes | yes | HIGH | Primary canonical source artifact in repo. Contains Step 2/3/4/5 question text and flowchart-like sections, but not a repo-native machine-readable node graph with stable node IDs. |
| `docs/reference/hendy-sera-2003.txt` | text extraction/transcription of Hendy report | yes | partial | partial | yes | yes | yes | yes | yes | HIGH | Includes exact canonical wording such as "What was the operator...", "What did the operator...", and "How was the operator..." plus step-level logic; still lacks explicit normalized node-ID contract. |
| `docs/reference/daumas-sera-offshore.txt` | translated/adapted operational text with Annex A flow | yes | partial | partial | yes | yes | yes | yes | yes | MEDIUM | Contains translated/adapted question wording and flow descriptions; useful secondary source but includes adaptation layer and therefore cannot override Hendy canonical wording when conflicts exist. |
| `docs/SERA_STEP1_STEP2_EXPLICIT_DESIGN_v0.1.4.md` | implementation-design document | partial | no | partial | no | partial | partial | partial | no | LOW | Design artifact describing explicit trace strategy; not canonical tree source. |
| `docs/SERA_STEP1_STEP2_EXPLICIT_STATEMENTS_v0.1.4.md` | observational trace method note | partial | no | partial | no | partial | partial | partial | no | LOW | Defines extraction heuristics for statements, not canonical question tree. |
| `docs/SERA_QUESTION_TRACE_STEP1_STEP2_v0.1.4.md` | question-trace implementation note | partial | partial | partial | no | partial | partial | partial | no | LOW | Contains synthetic Step1/2 question IDs for traceability; does not encode full canonical SERA/CERA tree for P/O/A ladders. |
| `frontend/src/lib/sera/rules/` | runtime rule corpus (JSON + selectors) | no | partial | partial | yes | yes | yes | yes | partial | LOW | Encodes code-level evidence matching and exclusions for implementation; not a canonical question tree and not authoritative for exact question wording. |
| `docs/sera-vnext/SERA_ENGINE_VNEXT_REFERENCE_CASE_CALIBRATION_TRACE_TEMPLATE_A4R94_v0.2.0.md` | reference-case template | no | no | partial | no | yes | yes | yes | partial | LOW | Uses generic placeholders (P1/P2/O1/A1), not canonical tree questions. |
| `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-A4R95.md` | historical reference trace artifact | no | no | partial | partial | yes | yes | yes | partial | LOW | Contains reconstructed/generic question flow; superseded and invalid for canonical reference use. |

## Conclusion
- canonicalTreeStatus: FOUND_PARTIAL
- primaryCanonicalSource: `backend/app/sera/documents/SERA.pdf` + `docs/reference/hendy-sera-2003.txt`
- secondarySources:
  - `docs/reference/daumas-sera-offshore.txt`
  - `docs/SERA_STEP1_STEP2_EXPLICIT_DESIGN_v0.1.4.md`
  - `docs/SERA_STEP1_STEP2_EXPLICIT_STATEMENTS_v0.1.4.md`
  - `docs/SERA_QUESTION_TRACE_STEP1_STEP2_v0.1.4.md`
  - `frontend/src/lib/sera/rules/`
- blockers:
  - No single repository-native canonical tree file with normalized parent/child node graph and stable node IDs for all P/O/A branches.
  - Canonical questions exist in source documents, but exact node-by-node reconstruction contract is incomplete in current vNext documentation set.
  - Existing reference trace artifacts used noncanonical placeholders and must not be reused.

REFERENCE_CASE_REBUILD_BLOCKED=true
reason=CANONICAL_TREE_INCOMPLETE_OR_MISSING
