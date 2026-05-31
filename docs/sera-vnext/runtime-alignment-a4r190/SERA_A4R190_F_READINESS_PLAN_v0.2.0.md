# SERA A4R190-F Readiness Plan v0.2.0

## Objective
Prepare next controlled step after A4R190-E with deterministic adapter outputs still constrained to candidate-only mode.

## Entry Criteria
1. A4R190-E adapter trial passing.
2. Full `tests/sera-vnext/*.ts` suite passing.
3. Frontend typecheck passing.
4. No protected-path tracked modifications.

## Proposed Scope for A4R190-F
1. Add intake normalization utilities for A4R187/A4R188 row ingestion.
2. Add richer deterministic audit traces for adapter decisions.
3. Add stricter extension-intake diagnostics per axis.
4. Keep all candidate-only locks unchanged.

## Must-Not for A4R190-F
1. No productive legacy pipeline replacement.
2. No final closure output.
3. No release of selected/released code fields.
4. No downstream operational package emission.

## Exit Criteria
1. Adapter remains deterministic and lock-safe.
2. Extended diagnostics improve explainability without changing methodology.
3. All targeted and suite validations remain green.
