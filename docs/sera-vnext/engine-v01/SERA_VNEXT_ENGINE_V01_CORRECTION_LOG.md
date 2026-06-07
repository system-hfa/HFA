# SERA vNext Engine v0.1 Correction Log

Date: 2026-06-07

## Code Changes

- Added evidence model under `frontend/src/lib/sera-vnext/evidence/`.
- Added canonical node evaluation under `frontend/src/lib/sera-vnext/canonical-tree/evaluate-node.ts`.
- Added evidence traversal runner under `frontend/src/lib/sera-vnext/canonical-tree/run-evidence-traversal.ts`.
- Replaced code-first `step08` with evidence-first canonical traversal.
- Added exact EN question anchor to canonical node definitions and traversal answers.
- Added evidence records to factual extraction output.
- Added temporal post-escape quarantine to escape-window handling.
- Reworked preconditions to derive from factual evidence and set `basedOnCandidateCode=false`.
- Removed leaf-path reconstruction helper from canonical-tree surface.

## Validation Changes

- Added `tests/sera-vnext/engine-validation-v01/`.
- Preserved all 39 v0 validation cases.
- Added v0.1 expected-output contract with code-required/null-code semantics.
- Added critical findings, determinism, source-depth, divergence, and markdown/json reports.

## Product Alpha

Product Alpha direct service and route parity remain passing. Candidate-only locks remain unchanged.
