# SERA Real Tree Event Review Limitations Register A4R186 v0.2.0

## Scope
This register documents limitations and blocking rules for A4R186.

## Registered limitations
1. Node IDs are technical stable IDs (`TECHNICAL_STABLE_ID_NOT_ORIGINAL_SOURCE_ID`) and must remain traceable to A4R99.
2. When a branch condition cannot be resolved with available evidence, traversal must stop and record `BRANCH_CONDITION_NOT_EXPLICIT` or `AXIS_TREE_TRAVERSAL_BLOCKED`.
3. Event evidence limitations remain present per review; no node branch is forced beyond support from A4R180/A4R180B.
4. A4R184 remains quarantined for axis decision use and cannot be reused as a node-question source.
5. There is recurring risk of confusing post-consequence outcomes with the safe operation escape point.
6. There is recurring risk of splitting PF/PM despite A4R182 approval of `CREW_INTEGRATED_ACTOR_MODEL` for this phase.

## Blocking rules for A4R187
- Do not close axis outcomes without explicit author decision per real node.
- Do not convert draft traversal into released code.
- Do not produce fixture or baseline artifacts from A4R186 outputs.
- Do not bypass unresolved branches.
