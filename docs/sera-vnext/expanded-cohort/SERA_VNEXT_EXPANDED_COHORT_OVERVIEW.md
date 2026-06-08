# SERA vNext Expanded Reviewer Cohort - Overview

## Scope

This package records the attempted expanded reviewer cohort for SERA vNext Product Beta on 2026-06-07.
The objective was to validate a 3 to 5 reviewer cohort over 20 to 30 controlled cases.

## Final Cohort Status

```text
SERA_VNEXT_EXPANDED_COHORT_BLOCKED_SINGLE_REVIEWER
```

The execution reached 25 cases, but only one authorized enterprise reviewer was available. The blocked reviewer probe was valid for security testing only and was not counted as a reviewer.

## Execution Summary

| Metric | Value |
| --- | --- |
| Cases executed | 25 |
| Authorized reviewers | 1 |
| Blocked access probes | 1 |
| Analyses created | 25 |
| Reviews submitted | 25 |
| Reanalyses | 7 |
| Exports | 7 |
| Archive/restore cycles | 2 |
| Audit events | 150 |
| API errors | 0 |
| UI errors | 0 |
| Security blockers | 0 |
| Critical method bugs | 0 |

## Interpretation

Infrastructure, security, auditability, and non-final locks remained valid. The expanded cohort cannot be declared PASS because the minimum cohort size was not met and because the API-level utility thresholds were below target on the diverse 25-case set.

This is a controlled block, not a rollback of Product Beta. The correct next gate is to recruit at least two additional authorized internal reviewers and repeat the same package.

## Boundaries Preserved

- Methodology unchanged
- Engine unchanged
- Canonical tree unchanged
- Fixtures and baselines unchanged
- Product Alpha unchanged
- Migration/RLS unchanged
- Reviewer-output architecture unchanged
- Final outputs remain blocked
