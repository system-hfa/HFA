# SERA Engine vNext Rebuild REAL-EVENT-0003 Canonical Trace Plan A4R96 v0.2.0

Status: REBUILD_PLAN_CONDITIONAL

## Current State
- A4+R-95 superseded.
- REAL-EVENT-0003 P-G release remains effective.
- Canonical O/P/A tree is confirmed in repository sources (Hendy + Daumas Annex A flows).
- Rebuild is enabled under exact-question discipline.

## Required Inputs
- canonical SERA/CERA O/P/A tree sources (`SERA.pdf`, `hendy-sera-2003.txt`, `daumas-sera-offshore.txt`);
- exact path to the maintained P-G boundary in canonical questioning;
- exact question texts and selected answers (`exactQuestionTextPT` + `exactQuestionTextENAnchor`);
- source facts/evidence;
- author decision A4+R-92;
- O/A boundaries using canonical tree or explicit not assessed.
- Daumas maintained code mapping (`O-A..O-D`, `P-A..P-H`, `A-A..A-J`) aligned to Hendy branch semantics.

## Next-Phase Options (A4+R-97)
A) If canonical tree remains complete:
- **A4+R-97 — Rebuild REAL-EVENT-0003 Reference Trace Using Canonical SERA/CERA Tree**

B) If canonical tree becomes incomplete during rebuild:
- **A4+R-97 — Recover Missing Canonical Tree Assets**

C) If canonical tree becomes unavailable:
- **A4+R-97 — Manual Canonical Tree Reconstruction from official SERA source documents (author validation required before use)**

## Contingency Flags During Execution
- `REAL_TREE_MISSING` only if an exact canonical question required by the path cannot be sourced during trace assembly.
- `CANONICAL_TREE_PATH_GAP` only if path disambiguation cannot be justified with source evidence.
- If no contingency is triggered, canonical rebuild proceeds.

REFERENCE_CASE_REBUILD_BLOCKED=false
reason=CANONICAL_TREE_CONFIRMED_FOR_POA
