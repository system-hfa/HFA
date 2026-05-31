# SERA Canonical Traversal Adapter — A4R190-E v0.2.0

## Objective
Add a candidate-only adapter that transforms author node decisions into deterministic canonical traversal simulations per axis.

## Runtime Artifact
- `frontend/src/lib/sera-vnext/canonical-traversal-adapter.ts`

## Main Contract
1. Input is author node decision rows (`nodeId`, `answerValue`, `authorDecision`, evidence refs, axis).
2. Adapter validates canonical `nodeId` and canonical branch answer values.
3. Adapter calls `runCanonicalAxisTraversal` from A4R190-D.
4. Adapter stops immediately on author blocking decisions.
5. Adapter never emits operational classification outputs.

## Returned Adapter Statuses
- `TRAVERSAL_SIMULATED_LEAF_REACHED_NOT_CLASSIFIED`
- `TRAVERSAL_BLOCKED_BY_AUTHOR_DECISION`
- `TRAVERSAL_BLOCKED_BY_INVALID_NODE`
- `TRAVERSAL_BLOCKED_BY_INVALID_ANSWER`
- `TRAVERSAL_INCOMPLETE_EXTENSION_REQUIRED`

## Locks Preserved
- `selectedCodeAllowed=false`
- `releasedCodeAllowed=false`
- `poaClosureAllowed=false`
- `final-free-conclusion-allowed=false`
- `downstreamAllowed=false`

## O-E Rule
- O-E remains non-existent in canonical active leaf space and is never returned as active leaf.

## Limitations
1. Candidate-only simulation adapter; not integrated into productive legacy pipeline.
2. No LLM execution.
3. No final P/O/A closure.
4. No auto-axis selection.
5. No downstream package emission.
