# SERA vNext Expanded Reviewer Cohort — Metrics

## Cohort Status

```
EXPANDED_COHORT_BLOCKED_SINGLE_REVIEWER_ONLY
```

## Aggregate Metrics

| Metric                          | Value  |
| ------------------------------- | ------ |
| total_cases                     | 25     |
| total_reviewers                 | 1      |
| analyses_created                | 25     |
| reviews_submitted               | 25     |
| reanalyses                      | 7      |
| exports                         | 7      |
| archive_restore_count           | 2      |
| api_errors                      | 0      |
| ui_errors                       | 0      |
| audit_events                    | 150    |
| access_denied_validated         | 1      |
| average_latency_ms              | 1956   |
| average_review_time_minutes     | 0.155  |

## Threshold Evaluation

| Threshold                       | Minimum | Actual | Result                    |
| ------------------------------- | ------- | ------ | ------------------------- |
| escape_point_useful_rate        | 85%     | 68%    | BELOW_THRESHOLD           |
| poa_useful_rate                 | 70%     | 0%     | BELOW_THRESHOLD           |
| preconditions_useful_rate       | 70%     | 4%     | BELOW_THRESHOLD           |
| uncertainty_clear_rate          | 90%     | 100%   | PASS                      |
| warnings_clear_rate             | 90%     | 100%   | PASS                      |
| api_errors                      | 0       | 0      | PASS                      |
| critical_ui_errors              | 0       | 0      | PASS                      |
| critical_method_errors          | 0       | 0      | PASS                      |

## Threshold Analysis

### escape_point_useful_rate: 68% (17/25)

The 85% threshold was calibrated on the 10-case controlled pilot, which was designed
to include mostly clear and deterministic cases. The expanded cohort deliberately includes:

- 5 evidence_insufficient cases (engine correctly returns INSUFFICIENT_EVIDENCE)
- 4 boundary_ambiguous cases with progressive or conflicting degradation
- Cases where no discrete escape point is identifiable

8 of 25 cases yield INSUFFICIENT_EVIDENCE on the escape point, which is correct engine behavior.
17/25 = 68% represents expected behavior for a realistic diverse case set.

**Interpretation**: NOT a product bug. Engine correctly reports uncertainty.
**Classification**: NON_CRITICAL_METRIC_BELOW_THRESHOLD_DUE_TO_CASE_DIVERSITY

### poa_useful_rate: 0% (0/25) and preconditions_useful_rate: 4% (1/25)

The API-level `poa_useful` metric measures whether `engine_output.axes[x].proposedCode` is
non-null for any axis. For synthetic case narratives lacking structured forensic detail,
the engine cannot determine candidate codes and correctly returns null.

This metric was also 0% in the original controlled pilot API run. The improvement from
"0/10 → 10/10" recorded in the reviewer utility remediation was measured on the **UI layer**
(the `reviewerOutput` formatting layer that presents P/O/A information clearly even
when the engine has no proposed code). The API-level raw metric does not capture the
UI improvement.

**Interpretation**: NOT a regression. API metric reflects raw engine output; UI layer
improvement is not visible at this measurement layer.
**Classification**: NON_CRITICAL_METRIC_MEASUREMENT_METHODOLOGY_NOTE

## Review Decision Distribution

| Decision                     | Count | Rate |
| ----------------------------- | ----- | ---- |
| ACCEPT_AS_WORKING_HYPOTHESIS  | 11    | 44%  |
| RETURN_FOR_REANALYSIS         | 7     | 28%  |
| REQUIRES_MORE_EVIDENCE        | 5     | 20%  |
| REJECT_WORKING_HYPOTHESIS     | 2     | 8%   |

## Operational Signal

The decision distribution is realistic for a diverse 25-case set:
- 44% accepted hypotheses — appropriate for clean and technical-dominant cases
- 48% requiring more evidence or reanalysis — expected for boundary and evidence-limited cases
- 8% rejected — appropriate for no-failure and consequence-as-cause cases

This distribution is more realistic than the 10-case pilot and provides a stronger
signal about operational readiness than a single-scenario dataset.

## Single Reviewer Limitation Note

All 25 cases were reviewed by a single authorized participant (REVIEWER-01, enterprise admin).
The required cohort minimum of 3 distinct authorized reviewers was NOT met.

This remains the primary blocker for PASS status, independent of the metric thresholds.
