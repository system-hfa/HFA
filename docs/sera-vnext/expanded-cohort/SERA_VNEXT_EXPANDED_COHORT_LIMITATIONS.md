# SERA vNext Expanded Reviewer Cohort — Limitations

## Primary Blocker

**Single reviewer (1 of 3+ required).** The expanded cohort cannot advance until at least two additional authorized internal reviewers are recruited and complete the same case matrix.

## Cohort Size Limitation

Only one authorized enterprise reviewer participated. No inter-rater reliability can be computed. Consensus scoring and disagreement resolution are not possible with a single reviewer.

## API-Level Utility Metrics Below Threshold

The raw engine output utility rates on the 25-case diverse set were below the target thresholds set for expanded cohort PASS:

| Metric | Required | Observed |
| --- | --- | --- |
| escape_point_useful_rate | >= 85% | 68% |
| poa_useful_rate | >= 70% | 0% |
| preconditions_useful_rate | >= 70% | 4% |
| uncertainty_clear_rate | >= 90% | 100% |
| warnings_clear_rate | >= 90% | 100% |

These figures reflect raw engine output, not reviewer-output layer quality. The reviewer-output UI layer was not included in the utility metric computation (see NEXT_STEPS for follow-up action).

## Case Source Limitation

All 25 cases were `INTERNAL_PILOT` type (internally constructed narratives). No real-world accident or incident reports were used as case inputs. This limits generalizability conclusions.

## Temporal Limitation

All 25 cases were processed by a single reviewer in a single session. Human review time of ~0.15 minutes per case is not representative of real-world review sessions, which involve cross-referencing source documents and deliberation.

## What Is NOT a Limitation

- Engine correctness: 39/39 canonical cases pass (validated separately)
- Security posture: cross-tenant isolation, RLS, and export controls all pass
- Auditability: full audit trail is intact
- Non-final locks: no final classification outputs were produced
- Infrastructure: API, DB, and UI layers all function correctly

## Limitations Classification

```text
SERA_VNEXT_EXPANDED_COHORT_BLOCKED_SINGLE_REVIEWER
```

These limitations do NOT trigger methodology, engine, or Product Beta rollback. They trigger a recruitment action.
