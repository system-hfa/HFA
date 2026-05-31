# SERA O-E NON_EXISTENT Normalization — A4R190-C v0.2.0

## Motivation
After A4R190-A (passive canonical model) and A4R190-B (minimum enforcement), residual semantics still referenced O-E as reserved/not-active in parts of runtime, tests, and documentation.

Canonical decision for this phase:
- `O-E = NON_EXISTENT_IN_SERA_PT_V1`
- O-E does not exist in SERA-PT v1.
- O-E cannot be used as objective code.

## Scope Applied
Runtime vNext:
- `frontend/src/lib/sera-vnext/types.ts`
- `frontend/src/lib/sera-vnext/code-traceability.ts`
- `frontend/src/lib/sera-vnext/preconditions.ts`

Trials:
- updated O-E negative-control expectations in `tests/sera-vnext/*trial-001.ts` where needed.
- added `tests/sera-vnext/oe-nonexistent-normalization-trial-001.ts`.

Docs:
- updated A4R190 notes to mark old reserved wording as historical/superseded.
- added A4R190-C log.

## Semantic Normalization Rules Enforced
1. O-E is rejected as `NON_EXISTENT_IN_SERA_PT_V1`.
2. O-E is never accepted as canonical active leaf code.
3. O-E negative injections remain valid only as blocked/negative-control paths.
4. Runtime traceability status for O-E is normalized to `NON_EXISTENT_CODE`.
5. Runtime messages use non-existent wording, not reserved wording.

## Negative Blocking vs Active Acceptance
- Negative blocking:
  - test/runtime may inject O-E intentionally to verify gate blocking behavior.
  - expected outcome is blocked/non-existent semantics.
- Active acceptance:
  - O-E must never be accepted as a valid objective code in human proposal, release, traceability, precondition, or coverage flow.

## Remaining Limitations
1. Traversal engine by canonical `nodeId` is not implemented in this phase.
2. Escape-point enforcement remains passive/not enforced.
3. Runtime PT/EN canonical question delivery is not yet applied.
