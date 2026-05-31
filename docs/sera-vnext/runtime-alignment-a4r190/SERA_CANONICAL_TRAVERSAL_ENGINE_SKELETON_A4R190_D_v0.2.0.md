# SERA Canonical Traversal Engine Skeleton — A4R190-D v0.2.0

## Objective
Create a deterministic canonical traversal skeleton in `sera-vnext` that consumes canonical node answers and computes structural next-node/leaf-candidate transitions without producing final classification.

## Runtime Artifact
- `frontend/src/lib/sera-vnext/canonical-traversal.ts`

## Functions Implemented
1. `getCanonicalTraversalNode(nodeId)`
- resolves canonical node descriptor from canonical tree rows.
- throws controlled `INVALID_NODE` error when nodeId is unknown.

2. `validateCanonicalTraversalAnswer(nodeId, answerValue)`
- validates that answer value is a canonical branch value for the node.
- rejects non-canonical values (`INVALID_ANSWER`).

3. `advanceCanonicalTraversal(input)`
- validates node/axis/answer.
- returns `NEXT_NODE_READY`, `TRAVERSAL_EXTENSION_REQUIRED`, `LEAF_REACHED_NOT_CLASSIFIED`, or blocking/invalid statuses.
- on leaf transition, returns leaf candidate only (`LEAF_REACHED_NOT_CLASSIFIED`), never selected/released code.

4. `runCanonicalAxisTraversal(input)`
- executes ordered node-answer sequence for one axis.
- stops on leaf, extension required, invalid input, or blocked state.
- for incomplete sequence, returns `NEXT_NODE_READY` or `TRAVERSAL_EXTENSION_REQUIRED`.

5. `assertNoFinalClassification(output)`
- hard guard that fails if final-classification locks are violated.

## Locks Preserved
- `selectedCodeAllowed=false`
- `releasedCodeAllowed=false`
- `notFinalClassification=true`
- `poaClosureAllowed=false`
- no downstream outputs

## Example Output (Leaf Candidate)
```json
{
  "axis": "P",
  "currentNodeId": "P_ASSESSMENT",
  "answerValue": "SIM",
  "status": "LEAF_REACHED_NOT_CLASSIFIED",
  "leafCandidate": {
    "axis": "P",
    "leafCode": "P-A",
    "status": "LEAF_REACHED_NOT_CLASSIFIED",
    "selectedCodeAllowed": false,
    "releasedCodeAllowed": false
  },
  "selectedCodeAllowed": false,
  "releasedCodeAllowed": false,
  "notFinalClassification": true,
  "poaClosureAllowed": false
}
```

## Why `LEAF_REACHED_NOT_CLASSIFIED` Is Not Classification
- It is a structural traversal state proving canonical branch closure only.
- It does not authorize selected/released code promotion.
- It does not close the full P/O/A process contract.

## Limitations
1. Not integrated into productive legacy pipeline.
2. No LLM execution or free-text inference.
3. No final P/O/A closure.
4. Escape-point enforcement remains passive (`approvedEscapePointScope` accepted only as context).
5. No automatic axis selection.
6. No downstream package outputs (final conclusion/HFACS/Risk/ERC/ARMS/ERC/recommendations).
