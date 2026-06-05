# SERA vNext Baseline V0 Contract

Date: 2026-06-05
Phase: A4R215-FINAL
Status: `VNEXT_BASELINE_V0_OFFICIAL`

The official isolated vNext baseline must contain:

- `baseline_id: SERA_VNEXT_BASELINE_V0`
- `namespace: sera-vnext`
- `legacyBaseline: false`
- `productEligibleNow: false`
- `runtimeIntegrationAllowed: false`
- `downstreamAllowed: false`
- `sourceFixtureSet: SERA_VNEXT_FIXTURE_SET_V0`
- `sourceExpectedOutputs: SERA_VNEXT_FIXTURE_SET_V0_EXPECTED_OUTPUTS`
- `baselineScope: method_validation_only`
- `fixtureCount: 7`
- `expectedOutputCount: 7`

Isolation contract:

- baseline file stays under `tests/sera-vnext/baselines/`;
- no copy into legacy baseline namespaces;
- no engine/runtime import;
- no product/API/UI import;
- no active output field unlock;
- no downstream operational behavior.
