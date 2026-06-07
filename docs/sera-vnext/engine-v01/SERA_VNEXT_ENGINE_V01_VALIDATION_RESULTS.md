# SERA vNext Engine v0.1 Validation Results

Date: 2026-06-07

## Summary

- Total cases: 39
- Official: 7
- Human-applied references: 2
- Generalization: 10
- Adversarial: 20
- Pass: 39
- Noncritical: 0
- Critical: 0
- Fail: 0
- Error: 0
- Determinism: 100 percent structural and semantic equivalence across the v0.1 suite
- Product Alpha parity: PASS
- Final decision: `SERA_VNEXT_ENGINE_V01_VALIDATED`
- Product Beta gate: `PRODUCT_BETA_FOUNDATION_ALLOWED`

## Reports

- `tests/sera-vnext/engine-validation-v01/reports/engine-v01-report.json`
- `tests/sera-vnext/engine-validation-v01/reports/engine-v01-report.md`
- `tests/sera-vnext/engine-validation-v01/reports/engine-v01-divergences.csv`
- `tests/sera-vnext/engine-validation-v01/reports/engine-v01-determinism.csv`
- `tests/sera-vnext/engine-validation-v01/reports/engine-v01-source-depth.csv`
- `tests/sera-vnext/engine-validation-v01/reports/engine-v01-critical-findings.csv`

## Commands

- `npx tsx tests/sera-vnext/engine-validation-v01/run-all.ts`
- `npm --prefix frontend exec -- tsc --noEmit`

Additional build/lint/sweep validation is recorded in the final phase report.
