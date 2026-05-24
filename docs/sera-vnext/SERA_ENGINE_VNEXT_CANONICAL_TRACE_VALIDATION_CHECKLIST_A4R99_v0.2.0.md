# SERA Engine vNext Canonical Trace Validation Checklist A4R99 v0.2.0

Status: CANONICAL_TRACE_VALIDATION_CHECKLIST  
Phase: A4+R-99  
DOCS_ONLY  
CANONICAL_VALIDATION

Use this checklist before approving any reference trace or front-end calibration artifact.

## Mandatory Checks
| checkId | validationItem | passCriteria | failAction |
|---|---|---|---|
| CV-01 | Uses A4R99 canonical tree asset | Trace references `SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md` | BLOCK |
| CV-02 | Uses `exactQuestionTextPT` | Every decision step contains exact PT text from canonical asset | BLOCK |
| CV-03 | Uses `exactQuestionTextENAnchor` | Every decision step contains EN anchor text from canonical asset | BLOCK |
| CV-04 | Uses `canonicalTreeSource` and `nodeId` | Every step declares source and node ID | BLOCK |
| CV-05 | Answer option exists in asset | `answerOptionSelected` matches one listed option for that node | BLOCK |
| CV-06 | Next node/leaf exists in asset | `nextNodeId` or `leafCode` resolves in canonical asset | BLOCK |
| CV-07 | Evidence per answer | Each step has `evidenceRef` linked to factual evidence | BLOCK |
| CV-08 | Quarantine section present | External probable cause/HFACS/recommendations are quarantined | BLOCK |
| CV-09 | No invented questions | No reconstructed/generic/free-translation question text | BLOCK |
| CV-10 | No generic placeholders | No `P1/P2/O1/A1` style flow placeholders | BLOCK |
| CV-11 | Terminology lock respected | Uses `SERA` only (no hybrid slash naming labels) | BLOCK |
| CV-12 | O-E guardrail respected | `O-E` appears only as `NON_EXISTENT_IN_SERA_PT_V1` guardrail | BLOCK |
| CV-13 | Missing-node handling | Missing node marked `CANONICAL_NODE_MISSING` and trace stops | BLOCK |
| CV-14 | Missing-tree handling | Missing canonical question/tree marked `REAL_TREE_MISSING` and trace stops | BLOCK |

## Validation Outcome
- `PASS_READY_FOR_REFERENCE_USE` only if all checks pass.
- Any failed mandatory check results in `INVALID_FOR_REFERENCE_USE`.
