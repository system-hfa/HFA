# SERA A4R190-G Readiness Plan v0.2.0

## Objective
Plan controlled continuation after A4R190-F hardening, still candidate-only and non-productive.

## Entry Criteria
1. Hardening trial passes.
2. Full `tests/sera-vnext/*.ts` suite passes.
3. Frontend typecheck passes.
4. Protected paths remain untouched.

## Recommended Scope
1. Evaluate safe typing tightening for `releasedCode` boundaries (M-001) with minimal regression risk.
2. Expand deterministic path coverage across all canonical leaf candidates.
3. Add adapter diagnostics for mixed-axis batches and multi-event intake packages.
4. Keep escape scope trace passive unless explicit enforcement phase is authorized.

## Must-Not
1. No productive runtime integration.
2. No UI release behavior.
3. No downstream unlock.
4. No final closure behavior.

## Opus/Sonnet Need
- Sonnet pass recommended after A4R190-G implementation.
- Opus only if methodology semantics (not just runtime mechanics) are changed.
