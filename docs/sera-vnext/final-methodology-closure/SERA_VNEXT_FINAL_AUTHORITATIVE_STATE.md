# SERA vNext Final Authoritative State

Date: 2026-06-06
Authority: current product-stage baseline
Status: AUTHORITATIVE

## Status Registry

```text
methodologyStatus: FROZEN_FOR_CURRENT_PRODUCT_STAGE
fixtureStatus: VNEXT_OFFICIAL_FIXTURES_ACTIVE
fixtureSetStatus: SERA_VNEXT_FIXTURE_SET_V0
baselineStatus: VNEXT_BASELINE_V0_OFFICIAL
productStatus: PRODUCT_ALPHA_INTEGRATION_AUTHORIZED
scientificValidationStatus: OPTIONAL_FUTURE_BACKLOG
```

## Active Components

1. Canonical methodological baseline: event narrative -> safe operation escape point -> unsafe act / unsafe condition -> direct actor -> P/O/A statements -> P/O/A classification -> preconditions -> decision trace -> limitations -> recommendations -> human review.
2. Official vNext fixtures and expected outputs.
3. Official vNext baseline v0 and guarded regressions.
4. Read-only runtime module and internal diagnostic endpoint.
5. Internal Product Alpha candidate-only surface under explicit feature flags.

## Excluded Components

1. Automatic final classification in product runtime.
2. Runtime canonical-tree reconstruction when exact tree access is unavailable.
3. Product persistence, audit trail, and migrations in this phase.
4. Risk-layer redesign, ARMS/ERC aggregation, and dashboard expansion.
5. Public or general-user exposure.

## Known Risks

1. Product Alpha currently operates without real canonical-tree traversal in runtime and therefore must remain non-final.
2. Real authenticated browser validation was not established in A4R224.
3. Product persistence and auditability are not yet implemented.
4. Internal admin misuse remains bounded by feature flags and enterprise-admin checks, not by workflow persistence controls.

## Current Limitations

1. `REAL_TREE_MISSING` blocks question-path generation and any final code release in Product Alpha.
2. Candidate-only output is deterministic but intentionally incomplete for final causal release.
3. Product Alpha does not save, publish, or operationalize output.

## Permanent Rules

1. Do not reopen methodology by creating new readiness microphases unless a real error, taxonomic change, regression, or explicit author decision requires it.
2. Do not alter official fixtures, expected outputs, or baseline to make a candidate pass.
3. Do not invent, translate, reorder, or approximate canonical-tree questions.
4. Keep product work separate from the protected causal baseline.

## Next Product Front

1. Stabilize internal Product Alpha usage.
2. Add persistence and audit trail after Alpha evaluation.
3. Run a controlled internal pilot.
4. Expand to Beta only after operational evidence supports it.
