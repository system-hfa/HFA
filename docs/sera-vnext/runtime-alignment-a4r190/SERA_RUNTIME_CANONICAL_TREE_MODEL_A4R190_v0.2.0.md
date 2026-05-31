# SERA Runtime Canonical Tree Model — A4R190-A v0.2.0

## Objective
Define a passive runtime model that mirrors the canonical SERA tree asset (A4R99), using the audited node inventory lock (A4R185), without changing legacy runtime behavior.

## Scope
- Included:
  - `frontend/src/lib/sera-vnext/canonical-tree.ts`
  - passive types in `frontend/src/lib/sera-vnext/types.ts`
  - passive invariant test in `tests/sera-vnext/canonical-tree-trial-001.ts`
- Excluded:
  - legacy pipeline/runtime behavior
  - production traversal enforcement
  - baseline fixtures, reports, migrations, and UI changes

## Canonical Runtime Representation
- Source of truth for row set: `docs/sera-vnext/real-tree-lock-a4r185/SERA_REAL_TREE_NODE_INVENTORY_A4R185_v0.2.0.csv`
- Runtime data table: `SERA_CANONICAL_TREE_NODES`
- Model version: `SERA_CANONICAL_TREE_MODEL_VERSION = A4R190-A_v0.2.0`
- Required node payload per row:
  - `nodeInventoryId`
  - `nodeId`
  - `axis`
  - `exactQuestionTextPt`
  - `exactQuestionTextEn`
  - `branchCondition`
  - `nextNodeHint`
  - transition metadata (`transitionKind`, `nextNodeId`, `leafCode`)
  - status metadata (`canonicalStatus`, `usableForAxisDecision`, `issueFlag`)

## Audit-Locked Invariants
- Total rows: `34`
- Axis distribution:
  - `P = 13`
  - `O = 7`
  - `A = 14`
- Invariant helper:
  - `assertCanonicalTreeInventoryInvariants()`

## Display vs Logic Separation
- Traversal-related fields are represented by `nodeId`, `branchCondition`, `transitionKind`, `nextNodeId`, `leafCode`.
- PT/EN fields are display-only text fields:
  - `exactQuestionTextPt`
  - `exactQuestionTextEn`
- Access helper:
  - `getCanonicalQuestionText(node, locale)` is render-only.

## Phase Status
- This phase establishes passive model foundations only.
- No productive axis-classification behavior was changed in this phase.
