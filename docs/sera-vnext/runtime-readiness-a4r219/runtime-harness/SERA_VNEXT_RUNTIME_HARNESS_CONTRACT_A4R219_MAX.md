# SERA vNext Runtime Harness Contract A4R219-MAX

Status: `CONTRACT_DEFINED`

## Public API

```ts
export type SeraVNextRuntimeHarnessResult = {
  mode: "READ_ONLY_HARNESS";
  baselineId: string;
  fixtureCount: number;
  expectedOutputCount: number;
  productIntegrated: false;
  runtimeIntegrated: false;
  downstreamAllowed: false;
  selectedCode: null;
  releasedCode: null;
  finalConclusion: null;
  classifiedOutput: false;
  readyPromotion: false;
  warnings: string[];
};

export function runSeraVNextRuntimeReadOnlyHarness(): SeraVNextRuntimeHarnessResult;
```

## Invariants

- Mode is `READ_ONLY_HARNESS`.
- Baseline id is `SERA_VNEXT_BASELINE_V0`.
- Fixture count is `7`.
- Expected output count is `7`.
- Product integration is false.
- Runtime integration is false.
- Downstream output is false.
- Causal output fields remain null.
- Classification and promotion booleans remain false.
