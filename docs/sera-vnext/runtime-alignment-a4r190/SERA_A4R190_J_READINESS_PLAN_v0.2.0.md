# SERA A4R190-J Readiness Plan v0.2.0

## Objective
Execute an independent Sonnet re-audit of A4R190-A through A4R190-I before any productive integration decision.

## Entry Criteria
1. All `tests/sera-vnext/*.ts` passing.
2. `cd frontend && npx tsc --noEmit` passing.
3. Candidate-only locks verified in traversal and intake outputs.
4. Protected scope unchanged.

## Audit Scope for A4R190-J
1. Re-verify canonical tree/runtime alignment from A4R190-A to I.
2. Re-verify candidate-only lock invariants and forbidden-output absence.
3. Re-verify O-E non-existence handling and cross-axis rejection.
4. Re-verify A4R187 pending-intake treatment and mock-decision separation.
5. Re-verify documentation traceability and phase boundaries.

## Must-Not
1. No productive integration in legacy pipeline.
2. No UI/API coupling.
3. No selected/released/final classification output.
4. No downstream unlock (`HFACS`, `Risk/ERC`, `ARMS/ERC`, `recommendations`, `finalConclusion`).

## Reviewer Guidance
- Sonnet is mandatory for A4R190-J re-audit.
- Opus is optional and only required if semantic methodology disagreement appears in Sonnet findings.
