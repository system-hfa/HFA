# SERA vNext — Metrics Correction (NF-08)

## Problem
The `abstention_precision` metric was mislabeled and misleading. The denominator mixed `notCode` CORRECT_ABSTENTION with `kind:abstention` numerator, yielding an artificially low 0.2143 value that did not reflect actual abstention correctness.

## Correction
The v03 naturalistic run-all.ts separates metrics properly:

```
code_expected_cases        — cases where a specific code was expected
abstention_expected_cases  — cases where abstention was expected
correct_code               — engine emitted expected code
incorrect_code             — engine emitted wrong code
correct_abstention         — engine correctly abstained
incorrect_abstention       — engine abstained but should have coded

code_precision             = correct_code / (correct_code + incorrect_code)
code_recall                = correct_code / code_expected_cases
abstention_precision       = correct_abstention / (correct_abstention + incorrect_abstention)
abstention_recall          = correct_abstention / abstention_expected_cases
```

Additional metrics separated:
- `portuguese_code_recall` / `english_code_recall` — language-specific recall
- `language_recall_gap` — absolute difference in recall rates
- `guardrail_true_positive_rate` / `guardrail_false_positive_rate`
- `violation_awareness_boundary_accuracy`, `post_escape_boundary_accuracy`, etc.

## Rule
- Negative reachability is NOT counted as incorrect abstention
- `classification_accuracy=1.0` is NOT published without sample and denominator
- Every metric has a clear denominator
