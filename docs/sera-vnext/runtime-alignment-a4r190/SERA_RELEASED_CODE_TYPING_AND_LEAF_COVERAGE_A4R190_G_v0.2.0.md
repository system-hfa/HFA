# SERA ReleasedCode Typing and Leaf Coverage — A4R190-G v0.2.0

## Objective
Address independent audit finding M-001 by narrowing active `releasedCode` typing at release boundaries, and expand deterministic canonical traversal leaf coverage while keeping traversal strictly candidate-only.

## M-001 Status
- `HumanValidatedAxisClassification.releasedCode` was narrowed from `string | null` to `CanonicalSeraReleasedCode | null`.
- `ReleasedCodeSemanticConsistencyResult.releasedCode` was narrowed to the same canonical type.
- Canonical aliases were added in `types.ts`:
  - `CanonicalSeraProposedCode`
  - `CanonicalSeraReleasedCode`
  - `CanonicalSeraCandidateLeafCode`

## Runtime Guard Confirmation
Compile-time narrowing is not used as sole protection.
Runtime validation remains active:
- `human-decision.ts` validates proposals via `assertCanonicalSeraLeafCode(axis, proposedCode)`.
- `code-release.ts` now re-validates canonical code before emitting released code; invalid values are blocked with explicit releaseBlockingIssues.

## O-E Blocking Model
- Compile-time: `releasedCode` active boundaries no longer accept `O-E` through canonical type.
- Runtime: `assertCanonicalSeraLeafCode` blocks `O-E` with `NON_EXISTENT_IN_SERA_PT_V1` message.
- Method status remains: O-E is non-existent and not active in SERA_PT_CANONICAL_v1.0.

## Traversal Leaf Coverage Expanded
New deterministic coverage trial added for candidate-only traversal over additional canonical paths:
- Perception: `P-A`, `P-D`, `P-E`, `P-G`, `P-H`
- Objective: `O-A`, `O-B`, `O-C`, `O-D`
- Action: `A-A`, `A-C`, `A-D`, `A-F`, `A-J`

For all covered paths:
- status is `LEAF_REACHED_NOT_CLASSIFIED`
- leaf appears only as `leafCandidate.candidateOnlyLeafCode`
- `classificationAllowed=false`
- `notFinalClassification=true`
- `selectedCodeAllowed=false`
- `releasedCodeAllowed=false`
- no `selectedCode`
- no `releasedCode` in traversal output
- no `CLASSIFIED`

## Candidate-Only Boundary Preserved
No productive integration was introduced:
- no UI integration
- no API release behavior
- no legacy pipeline integration
- no final P/O/A closure
- no downstream unlock

## Remaining Limits
- Traversal still runs as passive deterministic runtime artifact.
- Escape-point scope trace remains passive (`PASSIVE_NOT_ENFORCED`).
- No promotion to final classification behavior in this phase.
