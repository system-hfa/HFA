# SERA A4R191-D — Escape-Point Adapter Wiring v0.2.0

## Purpose
A4R191-D propagates the A4R191-C escape-point enforcement inputs through the two candidate-only adapter surfaces:

- `canonical-traversal-adapter.ts`
- `author-node-intake-adapter.ts`

The canonical traversal runtime was already wired in A4R191-C. This phase does not integrate UI, API, database, engine orchestration, or product release behavior.

## Adapter Inputs
Both adapter paths can now receive the same enforcement metadata:

- `approvedEscapePointScope`
- `enforcementMode`
- per-axis agent reference
- per-axis moment reference
- per-axis evidence references
- per-axis proposed canonical leaf code

Default behavior remains passive compatibility. Active enforcement only occurs when the caller explicitly requests `ENFORCE`.

## Canonical Traversal Adapter
`buildCanonicalTraversalFromNodeDecisions` now accepts per-axis maps and forwards the relevant values into every `runCanonicalAxisTraversal` call used by the adapter, including snapshot calls used when traversal is interrupted by author decisions, invalid nodes, or invalid answers.

In passive mode, previous adapter behavior is preserved. In active mode, the adapter allows the canonical traversal layer to return traceable axis blocks such as EP-B01, EP-B02, EP-B03, or EP-B04.

## Author-Node Intake Adapter
`buildCandidateTraversalFromAuthorNodeIntake` now accepts the same scope and enforcement metadata. The adapter derives an axis-level enforcement context from the explicit per-axis maps, with optional record-level fields as a fallback when supplied by tests or future intake tooling.

The real A4R187 pending intake path remains pending. Pending author decisions do not become enforcement errors. Existing diagnostics remain explicit for:

- unknown author decision values
- canonical question mismatches
- invalid canonical nodes
- invalid canonical answers
- candidate-only lock conflicts

## Candidate-Only Boundary
A4R191-D keeps all adapter results non-final and non-releasing. It only propagates enforcement verdicts and diagnostics into candidate-only traversal outputs. No downstream product surface is opened by this phase.

## F-01 Status
F-01 is resolved inside the traversal and adapter runtime path for candidate-only calls that explicitly provide scope and enforcement metadata. It is not closed for the real product because UI/API/engine intake still does not supply this metadata.
