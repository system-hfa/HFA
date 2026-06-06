# SERA vNext Read-Only Adapter Contract A4R218-MAX

Status: `CONTRACT_DEFINED`

## Public API

```ts
export type SeraVNextReadOnlyBaselineSummary = {
  baselineId: string;
  namespace: "sera-vnext";
  status: string;
  fixtureCount: number;
  expectedOutputCount: number;
  runtimeIntegrationAllowed: false;
  productEligibleNow: false;
  downstreamAllowed: false;
  positiveFixtures: string[];
  syntheticFixtures: string[];
  controlFixtures: string[];
  warnings: string[];
};

export function loadSeraVNextBaselineReadOnlySummary(): SeraVNextReadOnlyBaselineSummary;
```

## Required Invariants

- Namespace is `sera-vnext`.
- Baseline id is `SERA_VNEXT_BASELINE_V0`.
- Fixture count is `7`.
- Expected output count is `7`.
- Positive fixture count is `3`.
- Synthetic fixture count is `1`.
- Control fixture count is `3`.
- Runtime integration is false.
- Product eligibility is false.
- Downstream is false.

## Required Warnings

- Asiana/UPS boundary warning is preserved.
- GAP-004 synthetic-only warning is preserved.
- GAP-004 blending lock is preserved.
- Control-only warning is preserved.
