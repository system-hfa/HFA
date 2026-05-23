# SERA Engine vNext Code Release Gate v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-44 — Code Release Gate

## Purpose
Introduce the first explicit gate that converts accepted manual-review inputs into an auditable causal-core release package, while keeping all downstream layers locked.

## Relation to A4+R-43
A4+R-43 proved:
- manual decision packages can be validated;
- accepted-for-next-gate decisions are possible on ready axes;
- invalid and downstream-violating inputs are blocked;
- base `selectedCode` remains unresolved.

A4+R-44 adds a dedicated `CodeReleaseGateResult` builder that consumes manual input + gate contracts and emits release decisions per axis.

## proposedCode vs selectedCode vs releasedCode
- `proposedCode`: reviewer candidate code inside `HumanDecisionInputSet`.
- `selectedCode`: base `poaClassification` field; remains `UNRESOLVED` in this phase.
- `releasedCode`: appears only in `CodeReleaseGateResult.axisReleases` when release conditions pass.

No automatic promotion from `proposedCode` to base `selectedCode` is performed.

## Release Source Rule
All released axis candidates must have:
- `source = HUMAN_REVIEW`.

No release path from automatic classification is allowed.

## Code Release Gate Contract
`CodeReleaseGateResult` provides:
- `inputId`;
- `gateStatus`: `RELEASE_READY_FOR_CAUSAL_CORE` | `PARTIAL_RELEASE` | `RELEASE_BLOCKED`;
- `axisReleases` (`HumanValidatedAxisClassification[]`);
- `globalBlockingIssues`;
- `outputLocks`;
- `downstreamStillLocked`;
- `finalConclusionStillLocked`;
- `causalCoreOnly`.

Axis release occurs only when:
- validation is `VALID_FOR_RELEASE_GATE`;
- `acceptedForNextGate=true`;
- axis contract is `READY_FOR_HUMAN_DECISION`;
- required proposal fields exist;
- waiver policy is coherent;
- no downstream request is present.

## Scenarios Tested
`tests/sera-vnext/code-release-gate-trial-001.ts`:
- Scenario A: Trial 001 full valid package (P/O/A released by human review).
- Scenario B: not-ready axis release attempt (blocked).
- Scenario C: downstream request attempt (global release blocked).
- Scenario D: mixed case (Trial 002 perception released, objective/action blocked -> partial release).

## Trial 001 Result
- Gate status: `RELEASE_READY_FOR_CAUSAL_CORE`.
- Axis releases: `RELEASED_BY_HUMAN_REVIEW` for P/O/A.
- `releasedCode` present only in gate package.
- Base `selectedCode` remains `UNRESOLVED`.

## Trial Set 1 Partial Result
- Mixed readiness can produce `PARTIAL_RELEASE`.
- Ready axis may release while not-ready axes stay blocked.
- Trial 004 posture remains blocked for release attempts.

## Output Locks
Even with release-ready gate package:
- downstream remains locked;
- final conclusion remains locked;
- no HFACS;
- no Risk/ERC;
- no ARMS/ERC.

## Confirmations
- no final conclusion output;
- no HFACS output;
- no Risk/ERC output;
- no ARMS/ERC output;
- no UI/DB/API integration;
- no legacy import;
- no automatic classification promotion.

## Next Steps
A4+R-45 — Semantic Consistency Guard for Released Codes:
- verify semantic consistency between releasedCode, evidence, and uncertainty contracts before broader release integration.
