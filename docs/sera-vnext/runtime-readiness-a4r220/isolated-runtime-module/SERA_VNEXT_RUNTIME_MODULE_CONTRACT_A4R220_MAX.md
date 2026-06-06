# SERA vNext Runtime Module Contract A4R220-MAX

Status: `CONTRACT_DEFINED`

## Public API

```ts
export function getSeraVNextRuntimeReadOnlySummary(): SeraVNextBaselineRuntimeSummary;
```

## Summary Contract

The summary mode is `READ_ONLY_RUNTIME_MODULE`. Baseline id, namespace, baseline status, fixture count, expected-output count, and warning locks are returned. Product, API, UI, runtime, downstream, causal output, classification, and promotion fields remain closed.

## Export Boundary

The module exports types, baseline loading, validation, warning collection, and read-only summary functions only.
