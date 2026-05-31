# SERA Canonical Code Allowlist — A4R190-A v0.2.0

## Objective
Define a passive canonical leaf-code allowlist by axis for SERA-PT v1 runtime modeling.

## Canonical Allowlist by Axis
- Perception (`P`):
  - `P-A, P-B, P-C, P-D, P-E, P-F, P-G, P-H`
- Objective (`O`):
  - `O-A, O-B, O-C, O-D`
- Action (`A`):
  - `A-A, A-B, A-C, A-D, A-E, A-F, A-G, A-H, A-I, A-J`

## Forbidden / Non-Existent Codes
- Explicit non-existent list:
  - `O-E`
- Semantic status for `O-E`:
  - `NON_EXISTENT_IN_SERA_PT_V1`
- Runtime exports:
  - `SERA_CANONICAL_NON_EXISTENT_CODES`
  - `SERA_CANONICAL_FORBIDDEN_CODES`

## Passive Validation Helpers
- `isCanonicalSeraLeafCode(axis, code)`
  - Returns `true` only when `(axis, code)` exists in canonical allowlist.
- `assertCanonicalSeraLeafCode(axis, code)`
  - Normalizes input.
  - Throws explicit NON_EXISTENT error for `O-E`.
  - Throws allowlist violation for any out-of-scope code.

## Phase Boundary
- A4R190-A does not wire these helpers into productive decision flow.
- The goal is runtime-model readiness for future integration phases.
