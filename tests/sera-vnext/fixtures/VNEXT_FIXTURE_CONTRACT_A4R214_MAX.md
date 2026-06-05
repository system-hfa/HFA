# vNext Fixture Contract - A4R214-MAX

Date: 2026-06-05
Phase: A4R214-MAX
Status: VNEXT_OFFICIAL_FIXTURE_CONTRACT_ACTIVE

Each A4R214 fixture must contain:

- `status: VNEXT_OFFICIAL_FIXTURE`
- `fixtureNamespace: sera-vnext`
- `legacyFixture: false`
- `baselineEligibleNow: false`
- `baselineCandidateEligible: true`
- `productEligibleNow: false`
- `runtimeIntegrationAllowed: false`
- `selectedCode: null`
- `releasedCode: null`
- `finalConclusion: null`
- `classifiedOutput: false`
- `readyPromotion: false`
- `downstreamAllowed: false`
- `expectedOutputStatus: OFFICIAL_VNEXT_EXPECTED_OUTPUT_NON_FINAL`

Additional locks:

- Asiana 214 and UPS 1354 keep `BOUNDARY_WARNING_REQUIRED`.
- GAP-004 keeps `SYNTHETIC_ONLY`, `NOT_REAL_EVENT`, and `NO_SYNTHETIC_REAL_BLENDING`.
- Delta 191, USAir 427, and 5N-BQJ keep `CONTROL_ONLY` and `NOT_POSITIVE_FIXTURE`.

Isolation rule:

These files stay under `tests/sera-vnext/fixtures/` only. They must not be copied into `tests/sera/fixtures/`, imported by engine/runtime code, exposed in API/UI code, or treated as product or baseline outputs.
