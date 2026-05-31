# SERA A4R191-H Readiness Plan v0.2.0

## Starting point after A4R191-G

A4R191 candidate-only runtime now has:

- mandatory agent anchoring in ENFORCE (`EP-B09`);
- mandatory temporal anchor in ENFORCE (`EP-B10`);
- tightened own-agent evidence requirement for A-D exception in maintenance/design contexts;
- preserved passive compatibility path and candidate-only locks.

## What remains blocked

- UI/API/product integration remains blocked.
- No downstream/final outputs remain allowed.
- No release/classification gates are opened by A4R191-G.

## Proposed A4R191-H focus

1. Independent re-audit of ENFORCE semantics for false positives/false negatives in complex mixed-agent narratives.
2. Optional stricter structured evidence contract for own-agent linkage (if explicitly authorized).
3. Adapter-level conformance matrix for ENFORCE-required metadata in product-intake simulation (still candidate-only).
4. Documentation convergence of Opus findings and expected integration prerequisites.

## Entry criteria

- A4R191-G trials and full `tests/sera-vnext/*.ts` green.
- Typecheck clean.
- No protected legacy/runtime-fixture-baseline/supabase changes.

## Exit criteria for H

- Confirmed stability of EP-B09 and EP-B10 across traversal and adapter pathways.
- Confirmed A-D exception cannot pass without explicit own-agent linkage.
- Explicit integration prerequisites documented, with product boundary still locked unless separately authorized.

