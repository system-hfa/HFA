# SERA A4R190-E Readiness Plan v0.2.0

## Objective
Prepare controlled integration adapter from canonical traversal skeleton to candidate-only runtime packaging, without enabling final classification.

## Inputs from Previous Phases
1. A4R190-A: canonical tree and canonical code model.
2. A4R190-B/C: active O-E non-existent enforcement and semantic normalization.
3. A4R190-D: deterministic traversal skeleton with `LEAF_REACHED_NOT_CLASSIFIED`.

## Planned A4R190-E Scope
1. Build integration adapter that consumes:
- A4R187 author node decisions.
- A4R188 traversal extension policy.

2. Keep runtime outputs as candidate-only:
- no selectedCode/releasedCode release.
- no downstream output package.

3. Add adapter-level trials for:
- author-decision ingestion consistency.
- extension handling by axis.
- lock preservation.

## Must-Not Rules for A4R190-E
1. No production rollout.
2. No legacy pipeline replacement.
3. No final P/O/A closure.
4. No final-free conclusion/HFACS/Risk/ERC/ARMS/ERC/recommendations.
5. No fixture/baseline promotion.

## Entry Criteria
1. A4R190-D traversal skeleton trial and vNext trial suite passing.
2. Typecheck passing.
3. No forbidden-path changes.

## Exit Criteria
1. Adapter computes deterministic candidate traversal package only.
2. All lock guards still enforced.
3. No regression on O-E non-existent semantics.
