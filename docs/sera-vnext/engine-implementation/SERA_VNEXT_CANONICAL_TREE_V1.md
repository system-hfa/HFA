# SERA vNext Canonical Tree V1

Status: `CANONICAL_TREE_ASSET_CONNECTED`

Implementation files:

- `frontend/src/lib/sera-vnext/canonical-tree/types.ts`
- `frontend/src/lib/sera-vnext/canonical-tree/sera-pt-v1.ts`
- `frontend/src/lib/sera-vnext/canonical-tree/validate-tree.ts`
- `frontend/src/lib/sera-vnext/canonical-tree/traverse-tree.ts`
- `frontend/src/lib/sera-vnext/canonical-tree/index.ts`

Source:

- Built from the existing canonical inventory in `frontend/src/lib/sera-vnext/canonical-tree.ts`.
- The new tree asset groups the existing exact question rows into executable nodes.
- The engine uses exact question text from the existing canonical inventory rather than invented questions.

Tree metrics from validation:

- Nodes: 15
- Terminal leaves: 22
- Leaf set: `A-A`, `A-B`, `A-C`, `A-D`, `A-E`, `A-F`, `A-G`, `A-H`, `A-I`, `A-J`, `O-A`, `O-B`, `O-C`, `O-D`, `P-A`, `P-B`, `P-C`, `P-D`, `P-E`, `P-F`, `P-G`, `P-H`
- `O-E`: absent

Validator checks:

- question source exists
- branch map exists
- terminal leaf code is canonical
- no `O-E`
- no orphan target
- root nodes exist for `P`, `O`, and `A`
- no cycles from roots

Traversal behavior:

- Returns candidate-only paths.
- Does not emit `selectedCode` or `releasedCode`.
- Allows unresolved axis status when evidence is insufficient.
