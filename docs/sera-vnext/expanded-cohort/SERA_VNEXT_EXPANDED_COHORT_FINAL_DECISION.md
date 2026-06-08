# SERA vNext Expanded Reviewer Cohort - Final Decision

## Decision

```text
SERA_VNEXT_EXPANDED_COHORT_BLOCKED_SINGLE_REVIEWER
```

## Decision Basis

The expanded cohort cannot be approved as PASS because the minimum reviewer count was not met.

| Criterion | Required | Observed | Result |
| --- | --- | --- | --- |
| Reviewers | 3+ | 1 | BLOCKED |
| Cases | 20+ | 25 | PASS |
| API errors | 0 | 0 | PASS |
| Critical UI errors | 0 | 0 | PASS |
| Critical method bugs | 0 | 0 | PASS |
| Security blockers | 0 | 0 | PASS |
| Final output leaks | 0 | 0 | PASS |

## Metric Gate Notes

The raw API-level utility metrics were below expanded-cohort thresholds:

| Metric | Required | Observed |
| --- | --- | --- |
| escape_point_useful_rate | >= 85% | 68% |
| poa_useful_rate | >= 70% | 0% |
| preconditions_useful_rate | >= 70% | 4% |
| uncertainty_clear_rate | >= 90% | 100% |
| warnings_clear_rate | >= 90% | 100% |

These figures are recorded as real pilot evidence. They do not trigger methodology reopening and do not override the primary blocker: only one authorized reviewer was available.

## Non-Approvals

- No public beta expansion
- No common-user rollout
- No final classification
- No downstream operational outputs
- No methodology reopening
- No engine/tree/taxonomy changes
- No Product Alpha unlock

## Approved Continuation

Continue Product Beta as controlled internal admin pilot only. Repeat this expanded cohort after adding at least two more authorized internal reviewers.
