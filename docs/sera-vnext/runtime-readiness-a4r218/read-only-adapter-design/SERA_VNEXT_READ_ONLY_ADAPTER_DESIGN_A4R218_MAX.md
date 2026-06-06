# SERA vNext Read-Only Adapter Design A4R218-MAX

Status: `READY_FOR_SEPARATE_RUNTIME_READ_ONLY_INTEGRATION_AUTHORIZATION`

## Scope

A4R218 creates a test-side read-only adapter at `tests/sera-vnext/runtime-adapter/sera-vnext-baseline-readonly-adapter.ts`.

The adapter reads:

- `tests/sera-vnext/baselines/sera-vnext-baseline-v0.json`
- `tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json`
- `tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json`

## Runtime Boundary

The adapter does not import product SERA runtime code, API routes, UI routes, Supabase code, risk-layer code, or legacy fixtures. It exposes only a summary of the official vNext baseline state.

## Output Boundary

The adapter returns counts, fixture identifiers, and warning locks only. It does not produce selected codes, released codes, final conclusions, classification output, promotion readiness, downstream output, or product integration.
