# SERA A4R192-C — Escape-Point Intake Bridge v0.2.0

## Scope
A4R192-C introduces a passive/candidate-only bridge from validated structured intake into adapter input contracts already used in A4R191, without UI/API/product integration and without productive engine wiring.

## Runtime artifact

- New module: `frontend/src/lib/sera-vnext/escape-point-intake-bridge.ts`
- Main types:
  - `SeraVNextEscapePointIntakeBridgeInput`
  - `SeraVNextEscapePointIntakeBridgeOutput`
  - `SeraVNextEscapePointIntakeBridgeStatus`
  - `SeraVNextEscapePointIntakeBridgeIssue`
- Main helpers:
  - `buildTraversalAdapterInputFromEscapePointIntake(...)`
  - `buildAuthorNodeIntakeAdapterInputFromEscapePointIntake(...)`
  - `assertEscapePointIntakeBridgeLocks(...)`

## What the bridge does

For a `SeraVNextEscapePointIntake`:

- executes `validatePassiveEscapePointIntake(...)`;
- preserves `approvedEscapePointScope`/`draftEscapePointScope` path for adapter inputs;
- maps axis metadata into:
  - `axisAgentRefs`
  - `axisMomentRefs`
  - `axisEvidenceRefs`
  - `proposedCodes` (with `O-E` suppressed as non-active);
- produces both adapter-compatible payloads:
  - `CanonicalTraversalAdapterBuildInput`
  - `BuildCandidateTraversalFromAuthorNodeIntakeInput`
- keeps enforcement metadata in `PASSIVE_COMPAT` only.

## Bridge statuses

- `BRIDGE_READY_PASSIVE`
- `BRIDGE_READY_WITH_WARNINGS_PASSIVE`
- `BRIDGE_BLOCKED_BY_PASSIVE_INTAKE_ISSUES`
- `BRIDGE_BLOCKED_BY_LOCK_VIOLATION`

## Candidate-only boundary

- `selectedCodeAllowed=false`
- `releasedCodeAllowed=false`
- `classificationAllowed=false`
- `poaClosureAllowed=false`
- `downstreamAllowed=false`
- `finalConclusionAllowed=false`
- `notFinalClassification=true`

No final/downstream outputs are emitted (`selectedCode`, `releasedCode`, `CLASSIFIED`, `finalConclusion`, HFACS, Risk/ERC, ARMS/ERC, recommendations).

## Relation to RR-003 and A4R191

- RR-003: bridge makes structured intake usable by candidate-only adapters with explicit passive audit status.
- A4R191 enforcement remains unchanged; bridge only prepares adapter inputs and does not alter enforcement logic.
- `O-E` remains non-existent/non-promoting.

## Remaining limitations

- No product integration entrypoint.
- No UI/API route.
- No release/finalization path.
- Semantic residual RR-001 remains outside A4R192-C scope.

