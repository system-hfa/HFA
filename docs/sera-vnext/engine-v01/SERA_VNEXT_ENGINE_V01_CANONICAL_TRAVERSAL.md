# SERA vNext Engine v0.1 Canonical Traversal

Date: 2026-06-07

## Files

- `frontend/src/lib/sera-vnext/canonical-tree/evaluate-node.ts`
- `frontend/src/lib/sera-vnext/canonical-tree/run-evidence-traversal.ts`
- `frontend/src/lib/sera-vnext/engine-v0/steps/08-canonical-traversal.ts`

## Architecture

The traversal is `EVIDENCE_FIRST_CANONICAL_TRAVERSAL`:

1. gather factual evidence;
2. classify temporal and actor scope;
3. start at the canonical axis root;
4. evaluate the exact canonical node question;
5. select a branch only when admissible evidence supports the answer;
6. stop as `PARTIAL` or `INSUFFICIENT_EVIDENCE` if the node cannot be answered;
7. emit a code only when a leaf is reached.

## Canonical Source

Node questions are read from the canonical tree asset. The runtime trace records:

- node id;
- exact PT question text;
- exact EN anchor;
- selected answer;
- next node or terminal leaf;
- supporting and counter evidence;
- prohibited-inference checks;
- confidence;
- rationale.

## Removed V0 Pattern

V0 selected codes first and reconstructed paths. v0.1 removed the engine dependency on leaf-path reconstruction. `assertCanonicalSeraLeafCode` remains only to validate a terminal leaf after traversal reaches it.
