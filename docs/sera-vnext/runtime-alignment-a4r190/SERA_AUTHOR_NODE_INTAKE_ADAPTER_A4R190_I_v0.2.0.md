# SERA Author Node Intake Adapter A4R190-I v0.2.0

## Objective
Implement a deterministic candidate-only adapter that consumes A4R187 author-node intake rows and simulates canonical traversal via A4R190 traversal runtime without productive closure.

## Relation to A4R187
- A4R187 remains intake-only in this phase.
- Real A4R187 rows with `authorDecision=PENDING_AUTHOR_DECISION` are treated as unresolved and do not produce leaf closure.
- A4R187 is not promoted to selected/released/final outputs.

## Relation to A4R190-D/E/H
- A4R190-D: canonical traversal runtime is used as the sole node/answer authority.
- A4R190-E: canonical traversal adapter is reused to simulate author decisions.
- A4R190-H: exhaustive leaf expectations remain enforced by candidate-only traversal contracts.

## Candidate-Only Confirmation
Adapter output is locked with:
- `candidateOnly=true` at leaf level when reached
- `classificationAllowed=false`
- `notFinalClassification=true`
- `selectedCodeAllowed=false`
- `releasedCodeAllowed=false`
- `poaClosureAllowed=false`
- no `selectedCode`, no `releasedCode`, no `CLASSIFIED`, no downstream fields

## Pending and Blocking Rules
- `PENDING_AUTHOR_DECISION`: returns `AUTHOR_DECISION_PENDING`, keeps traversal incomplete, returns no leaf.
- `NEEDS_MORE_EVIDENCE`: explicit traversal block status.
- `BRANCH_BLOCKED`: explicit traversal block status.
- `AXIS_TRAVERSAL_BLOCKED`: explicit traversal block status.

## Canonical Question Rule
When `exactQuestionTextPt` is provided, it must match canonical tree text exactly for the given `nodeId`. Mismatch returns explicit `CANONICAL_QUESTION_MISMATCH` blocking diagnostics.

## Validation Rules
- `nodeId` must exist in canonical tree.
- `axis` must match canonical node axis.
- accepted decision answers must be canonical answer values for the node.
- non-canonical injection (including `O-E`) is blocked.

## Mock Decision Policy in Tests
Mock author decisions used in `author-node-intake-adapter-trial-001.ts` are synthetic controls for runtime verification only. They are not real author adjudications and do not replace A4R187 pending decisions.

## Remaining Limitations
- No productive pipeline/UI/API integration.
- No author identity, approval workflow, or persistence contract.
- No automatic closure of P/O/A.
- No selected/released/final/downstream outputs.
