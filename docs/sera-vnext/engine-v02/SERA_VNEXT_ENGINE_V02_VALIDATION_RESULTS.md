# SERA vNext Engine V02 Validation Results

Command:

```bash
npx tsx tests/sera-vnext/engine-validation-v02/run-all.ts
```

Result:

```json
{
  "finalDecision": "SERA_VNEXT_ENGINE_V02_PASS_WITH_LIMITATIONS",
  "cases": 103,
  "classification_accuracy": 1,
  "abstention_recall": 1,
  "guardrail_detection_rate": 1,
  "leaf_coverage": 1,
  "language_parity": {
    "pt-BR": 1,
    "en": 1
  },
  "determinism": 1,
  "critical_boundary_pass_rate": 1,
  "product_parity": 1
}
```

Limitations:
- this is technical validation, not scientific validation;
- the existing 39-case suite is retained as regression/guardrail coverage, not accuracy proof;
- abstention precision is low because generated negative leaf controls are intentionally counted as abstentions.

Report files:
- `tests/sera-vnext/engine-validation-v02/reports/engine-v02-report.json`
- `tests/sera-vnext/engine-validation-v02/reports/engine-v02-report.md`
- `tests/sera-vnext/engine-validation-v02/reports/engine-v02-results.csv`
