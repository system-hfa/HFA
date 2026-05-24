# SERA Engine vNext Post Contamination Cleanup Rebuild Plan A4R98 v0.2.0

Status: REBUILD_PLAN_POST_CONTAMINATION_CLEANUP  
Phase: A4+R-98  
DOCS_ONLY  
GOVERNANCE_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Objective
Define mandatory next phases after canonical contamination cleanup, with a strict sequencing lock that prevents new reference-trace builds before a canonical question-tree asset pack exists.

## Mandatory Sequence
1. **A4+R-99 — Build Canonical Question Tree Asset Pack from SERA/CERA Sources**
   - Create one authoritative documentation asset with:
     - axis;
     - nodeId;
     - exactQuestionTextPT;
     - exactQuestionTextENAnchor;
     - answer options;
     - next node;
     - leaf code;
     - source page/reference.

2. **A4+R-100 — Rebuild REAL-EVENT-0003 with canonical tree only**
   - Use exact canonical question traversal.
   - No reconstructed/generic question text.

3. **A4+R-101 — Build canonical withdrawn/boundary pack only after tree asset exists**
   - Rebuild withdrawn trio pack with exact canonical node traversal.

4. **A4+R-102 — Resume event discovery/reference expansion**
   - Only after canonical rebuild artifacts pass governance checks.

## Sequence Lock Rule
Any attempt to skip A4+R-99 must be blocked:
- mark `BLOCKED_BY_MISSING_CANONICAL_TREE_ASSET_PACK`;
- stop reference-trace construction;
- do not produce front-end/reference proof artifacts.

## Operational Stop Conditions
- If exact canonical question text is missing: `REAL_TREE_MISSING`.
- If canonical node linkage is missing: `CANONICAL_NODE_MISSING`.
- In either case: stop and do not approximate.

## Guardrails
- No release creation/update in this plan.
- No proposedCode changes.
- No unresolved reduction.
- No runtime, UI/API/DB, migration, fixture, or baseline changes.
