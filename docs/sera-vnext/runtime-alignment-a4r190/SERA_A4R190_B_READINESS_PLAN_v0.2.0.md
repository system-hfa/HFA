# SERA A4R190-B Readiness Plan v0.2.0

## Readiness Objective
Transition from passive canonical runtime model to controlled runtime integration, without violating methodological locks.

## Preconditions for A4R190-B
1. Keep A4R185 row lock as immutable source for runtime traversal references.
2. Keep A4R99 exact question text usage in render path only; never reconstruct wording.
3. Maintain O-E prohibition in all proposal/selection paths.
4. Preserve separation between causal baseline and risk-layer work.

## Recommended Integration Steps
1. Wire canonical allowlist helper into human proposal validation path for `proposedCode`.
2. Remove/replace residual `O-E` acceptance paths in human-decision runtime logic.
3. Introduce nodeId + branchCondition traversal contract checks behind feature flag.
4. Add branch-coverage trial for P-D branch in flow renderer/runtime representations.
5. Add strict tests asserting traversal decisions are independent of locale text fields.

## Safety Gates Before Promotion
1. Run targeted vNext tests only (no global smoke unless explicitly requested).
2. Run methodology scans for forbidden terms/patterns and O-E misuse.
3. Confirm no changes in protected baseline or fixture areas.
4. Require human review before any production enablement.

## Opus Need Before A4R190-B
Current recommendation: not required before starting A4R190-B implementation.

Rationale:
- A4R190-A is structural/passive and already anchored to A4R99/A4R185 locks.
- Main unresolved risk is engineering integration correctness (runtime wiring), better handled with targeted deterministic tests first.
- Optional Opus re-audit can be requested after first A4R190-B integration draft if an independent narrative check is needed.

## Execution Status Update (A4R190-B)
Status: executed with controlled/minimum enforcement.

Implemented in this phase:
1. Canonical allowlist assertion wired into active human proposal validation path.
2. Residual `O-E` active acceptance removed from objective intent runtime checks.
3. Causal assurance code-token guard aligned to canonical active allowlist exports.
4. Targeted enforcement trial added for `O-E`/unknown-code rejection and canonical acceptance.

Intentionally not implemented in this phase:
1. Canonical traversal engine by `nodeId`.
2. Escape-point gate enforcement.
3. Runtime bilingual canonical question delivery.

## Supersession Note
The temporary A4R190-B compatibility wording for O-E as reserved/not-active was superseded by A4R190-C.

Current semantic lock:
1. `O-E = NON_EXISTENT_IN_SERA_PT_V1`
2. O-E does not exist in SERA-PT v1 and cannot be used as objective code.
