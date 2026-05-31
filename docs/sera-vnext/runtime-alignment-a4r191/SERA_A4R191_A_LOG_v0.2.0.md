# SERA A4R191-A Log — Escape Point Enforcement Type Contract v0.2.0

## Phase
A4R191-A — Escape Point Enforcement **Type Contract** (preparation only; enforcement NOT activated).

## Starting state
- Branch: `main`
- HEAD: `7e4ecff853ffb7afd2510dbf2225abdfa92eebaa`
- origin/main: `7e4ecff853ffb7afd2510dbf2225abdfa92eebaa`
- HEAD == origin/main: yes

## Objective
Make the safe-operation escape point expressive enough for **future** faithful enforcement
(agent / act-or-omission / operational moment), while keeping runtime candidate-only and passive.
This phase touches the type contract and a pure normalization function only. It does not implement
the gate.

## What changed
- **`frontend/src/lib/sera-vnext/types.ts`** (modified): additive, backward-compatible evolution of
  `ApprovedEscapePointScope` (new optional `escapePointAnchor`, `enforcementMode`; `status` widened to
  include `PASSIVE_NOT_ENFORCED`). New unions/interfaces for agent kind, act/omission kind, topology,
  enforcement mode, operational moment, zone boundary, and the anchor.
- **`frontend/src/lib/sera-vnext/escape-point-scope.ts`** (new): pure
  `normalizeApprovedEscapePointScope(...)` + `isEscapePointScopeReadyForFutureEnforcement(...)`,
  plus the result/readiness/issue types.
- **`tests/sera-vnext/escape-point-scope-contract-trial-001.ts`** (new): contract trial.
- **`docs/sera-vnext/runtime-alignment-a4r191/`** (new): contract doc, this log, B readiness plan.

## Types created/changed
Created: `SeraVNextEscapePointScopeStatus`, `SeraVNextEscapePointAgentKind`,
`SeraVNextEscapePointActOrOmissionKind`, `SeraVNextEscapePointTopology`,
`SeraVNextEscapePointEnforcementMode`, `SeraVNextEscapePointUnsafeActOrOmission`,
`SeraVNextEscapePointOperationalMoment`, `SeraVNextEscapePointZoneBoundary`,
`SeraVNextEscapePointAnchor` (in `types.ts`);
`SeraVNextEscapePointEnforcementStatus`, `SeraVNextEscapePointAnchorReadiness`,
`SeraVNextEscapePointScopeIssueCode`, `SeraVNextEscapePointScopeIssueSeverity`,
`SeraVNextEscapePointScopeIssue`, `SeraVNextEscapePointStatusMappingResult`
(in `escape-point-scope.ts`).
Changed: `ApprovedEscapePointScope` (additive only).

## Function created
`normalizeApprovedEscapePointScope(scope | undefined | null) => SeraVNextEscapePointStatusMappingResult`
— pure, passive, never enforces, never blocks traversal. Helper:
`isEscapePointScopeReadyForFutureEnforcement(result)`.

## Normalized statuses reconciled
`DEFINED_NOT_ENFORCED`, `APPROVED_NOT_ENFORCED`, `PASSIVE_NOT_ENFORCED` → all map to a single
`normalizedEnforcementStatus: 'PASSIVE_NOT_ENFORCED'`, with the original preserved in `inputStatus`.

## Test cases covered (escape-point-scope-contract-trial-001)
1. Absent scope (undefined and null) does not break runtime.
2. Legacy scope without anchor accepted as passive but not enforcement-ready.
3. Complete discrete anchor normalizes correctly, enforcement-ready, no diagnostics.
4. Complete progressive anchor requires earliest+latest controllable refs; enforcement-ready.
5. Incomplete progressive (missing or partial zone boundary) yields diagnostic, does not block.
6. Diffuse anchor yields future-split diagnostic, does not block.
7. All three status vocabularies map unambiguously to passive enforcement status.
8. Invalid anchor (missing required fields) flagged; never blocks or opens downstream.
All cases assert: no `selectedCode` / `releasedCode` / `CLASSIFIED` / `finalConclusion` / downstream.

## Validation results
- `npx tsx tests/sera-vnext/escape-point-scope-contract-trial-001.ts`: OK.
- All `tests/sera-vnext/*.ts`: 24 passed, 0 failed.
- `cd frontend && npx tsc --noEmit`: exit 0.
- `git diff --check`: no whitespace errors.
- Tracked diff: only `frontend/src/lib/sera-vnext/types.ts` modified.
- Prohibited-path grep (`pipeline|all-steps|fixtures|baseline|source-corpus|supabase|migrations`):
  no tracked changes.

## Legacy runtime untouched (confirmed)
No changes to: `sera/pipeline.ts`, `sera/all-steps.ts`, `sera-vnext/engine.ts`, `sera-vnext/steps/**`,
`canonical-tree.ts`, `canonical-traversal.ts`, `canonical-traversal-adapter.ts`,
`author-node-intake-adapter.ts`, `code-release.ts`, `semantic-consistency.ts`, `preconditions.ts`.
Fixtures / baseline / source-corpus / supabase / migrations: no tracked changes.

## Remaining limitations
- No actual enforcement; runtime remains candidate-only and passive.
- `readyForFutureEnforcement` is diagnostic only; nothing consumes it as a gate yet.
- Producers (canonical-traversal, author-node-intake) still emit their own
  `PASSIVE_NOT_ENFORCED` literal independently — they are not yet wired to call the normalizer
  (deferred to A4R191-B by scope rules).
