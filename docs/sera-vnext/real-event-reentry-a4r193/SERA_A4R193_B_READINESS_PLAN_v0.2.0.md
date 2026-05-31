# SERA A4R193-B Readiness Plan v0.2.0

## Starting point after A4R193-A

- Copterline S-76C+ pilot re-entry represented under escape-point intake contract.
- Candidate-only chain validated (intake -> validation -> bridge -> adapter inputs).
- No product integration surface opened.

## A4R193-B objective

Expand real-event re-entry coverage with additional events while preserving passive/candidate-only boundaries.

## Planned scope

1. Add 2 to 4 additional real events with sufficient internal evidence for agent-act-moment representation.
2. Keep all runs candidate-only, with lock closure assertions and no downstream outputs.
3. Preserve escape-point consistency rule (same agent/act/moment across P/O/A axis metadata hypotheses).
4. Keep explicit source sufficiency gate (`READY_FOR_CANDIDATE_ONLY_TRIAL` vs `SOURCE_INSUFFICIENT_FOR_REENTRY`).

## Hard constraints

- No synthetic-event addition in A4R193-B.
- No UI/API/product integration.
- No runtime legacy changes.
- No fixture/baseline promotion.
- No selected/released/final/downstream outputs.

## Residual risk alignment

- RR-001 remains open; semantic hardening may be needed before any future integration path.
- RR-003 remains partially mitigated; MDC/interview structured intake remains required for product-grade use.

## Exit criteria

- 2 to 4 additional real-event re-entry docs and candidate-only trials created.
- Trial package passes explicit validations, full `tests/sera-vnext/*.ts`, and `cd frontend && npx tsc --noEmit`.
- Candidate-only closure remains intact in all outputs.
