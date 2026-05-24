# SERA Engine vNext Rebuild REAL-EVENT-0003 Canonical Trace Plan A4R96 v0.2.0

Status: REBUILD_PLAN_CONDITIONAL

## Current State
- A4+R-95 superseded.
- REAL-EVENT-0003 P-G release remains effective.
- Canonical O/P/A tree is confirmed in repository sources (Hendy + Daumas Annex A flows).
- Rebuild is gated by A4+R-99 canonical tree asset-pack completion.

## Required Inputs
- canonical SERA/CERA O/P/A tree sources (`SERA.pdf`, `hendy-sera-2003.txt`, `daumas-sera-offshore.txt`);
- exact path to the maintained P-G boundary in canonical questioning;
- exact question texts and selected answers (`exactQuestionTextPT` + `exactQuestionTextENAnchor`);
- source facts/evidence;
- author decision A4+R-92;
- O/A boundaries using canonical tree or explicit not assessed.
- Daumas maintained code mapping (`O-A..O-D`, `P-A..P-H`, `A-A..A-J`) aligned to Hendy branch semantics.

## Updated Sequencing Lock (A4+R-98)
1. **A4+R-99 — Build Canonical Question Tree Asset Pack from SERA/CERA Sources** (mandatory precondition).
2. **A4+R-100 — Rebuild REAL-EVENT-0003 Reference Trace Using Canonical SERA/CERA Tree**.
3. If canonical tree cannot be assembled at required node level, stop and mark:
   - `REAL_TREE_MISSING` or `CANONICAL_NODE_MISSING`
   - `BLOCKED_BY_MISSING_CANONICAL_TREE`
   - `DO_NOT_BUILD_REFERENCE_TRACE`

## Contingency Flags During Execution
- `REAL_TREE_MISSING` only if an exact canonical question required by the path cannot be sourced during trace assembly.
- `CANONICAL_TREE_PATH_GAP` only if path disambiguation cannot be justified with source evidence.
- If no contingency is triggered, canonical rebuild proceeds.

REFERENCE_CASE_REBUILD_BLOCKED=true
reason=WAITING_FOR_A4R99_CANONICAL_TREE_ASSET_PACK
