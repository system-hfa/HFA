# SERA vNext Human Reviewer Pilot Plan

## Status

```text
HUMAN_REVIEWER_PILOT_READY_TO_START
```

Date prepared: 2026-06-07  
Prepared by: HFA Engineering (internal, non-public)

## Objective

Recruit 2-4 additional authorized internal reviewers to satisfy the minimum cohort requirement (3+ reviewers) and re-run the expanded cohort gate. This pilot provides onboarding and structured case execution for new reviewers before the formal expanded cohort retry.

## Participants

| Reviewer ID | Role | Status | Required Action |
| --- | --- | --- | --- |
| REVIEWER-01 | enterprise_admin, authorized | Active | Continues as anchor reviewer |
| REVIEWER-02 | enterprise_admin | Pending recruitment | Onboard and authorize for sera_vnext_beta |
| REVIEWER-03 | enterprise_admin | Pending recruitment | Onboard and authorize for sera_vnext_beta |
| REVIEWER-04 | enterprise_admin | Optional | Additional reviewer for resilience |
| REVIEWER-05 | enterprise_admin | Optional | Additional reviewer for resilience |

Minimum required to unlock expanded cohort retry: REVIEWER-01 + REVIEWER-02 + REVIEWER-03 (3 total).

## Participant Eligibility Criteria

A reviewer is eligible if they:
1. Have an enterprise-plan tenant account in the HFA system
2. Have been authorized for `sera_vnext_beta` by the system admin
3. Have completed the reviewer onboarding (see INSTRUCTIONS doc)
4. Are an internal team member (no external or common-user reviewers at this stage)

## Case Matrix

### Volume

- Minimum: 20 cases per reviewer
- Target: 25 cases per reviewer (same as expanded cohort)
- Maximum: 30 cases

### Required Distribution (per reviewer session)

| Category | Minimum Cases | Description |
| --- | --- | --- |
| Clear escape point | 8 | Narratives where a well-defined escape opportunity exists |
| Ambiguous escape point | 4 | Cases where human judgment on escape validity is required |
| No escape point (more evidence needed) | 4 | Cases triggering `REQUIRES_MORE_EVIDENCE` |
| High uncertainty | 4 | Cases flagged with multiple uncertainties |
| Multi-actor or multi-crew | 4 | Cases with PF/PM or crew coordination ambiguity |
| Supplemental / edge cases | 1-5 | Sparse data, silent automation, single-pilot high workload |

### Case Input Type

- All cases: `INTERNAL_PILOT` (source type field)
- Title format: `[SERA_VNEXT_PILOT] <category> — <short description>`
- Narrative length: 100-600 words (realistic for factual aviation event descriptions)

## Pilot Execution

### Phase 1: Onboarding (per new reviewer)

1. Admin grants `sera_vnext_beta` authorization
2. Reviewer completes the INSTRUCTIONS guide end-to-end
3. Reviewer executes 3 practice cases (not counted in metrics)
4. Admin confirms access and practice case results
5. Reviewer is cleared for pilot execution

### Phase 2: Pilot Execution (per reviewer)

1. Reviewer opens the HFA admin panel: `/admin/sera-vnext/analyses`
2. Reviewer creates each case via the "Nova análise" form
3. For each case, reviewer navigates to the analysis detail page and submits a review via the "Revisar" button
4. Reviewer records observations in the result CSV template
5. Admin exports all analyses via "Export JSON"

### Phase 3: Data Collection and Metrics

After all reviewers complete execution, the admin:
1. Exports all analyses to JSON
2. Runs `npx tsx tests/sera-vnext/expanded-cohort-metrics-trial-001.ts` to compute utility metrics
3. Runs `npx tsx tests/sera-vnext/expanded-cohort-runner-trial-001.ts` for runner metrics
4. Reviews inter-rater agreement on shared cases (at least 5 cases per reviewer pair)

## Inter-Rater Reliability

At least 5 cases must be reviewed by at least 2 reviewers independently. Disagreements are recorded and discussed but do not block the cohort gate.

## Advancement Criteria

The expanded cohort retry gate (`SERA_VNEXT_EXPANDED_COHORT_PASS`) requires ALL of the following:

| Criterion | Threshold |
| --- | --- |
| Authorized reviewers | >= 3 |
| Cases per reviewer | >= 20 |
| API errors | = 0 |
| Security blockers | = 0 |
| Final output leaks | = 0 |
| escape_point_useful_rate | >= 85% |
| poa_useful_rate | >= 70% |
| preconditions_useful_rate | >= 70% |
| uncertainty_clear_rate | >= 90% |
| warnings_clear_rate | >= 90% |

If utility metrics are still below threshold after 3+ reviewers, the metric computation method is revised (see NEXT_STEPS) before another retry.

## Timeline

| Milestone | Target |
| --- | --- |
| REVIEWER-02 recruited and authorized | TBD |
| REVIEWER-03 recruited and authorized | TBD |
| Pilot onboarding complete | TBD |
| Pilot execution complete | TBD |
| Expanded cohort retry gate | TBD |

## Constraints

- No final classifications during the pilot (all outputs remain candidate-only, non-final)
- No external reviewers
- No common-user accounts
- No real-world accident report data as case input (internal pilot only)
- No bypass of the review form — all reviews must be submitted via the standard UI

## Documents

| Document | Purpose |
| --- | --- |
| SERA_VNEXT_HUMAN_REVIEWER_INSTRUCTIONS.md | Step-by-step reviewer onboarding and execution guide |
| SERA_VNEXT_HUMAN_REVIEWER_DECISION_GUIDE.md | Criteria for ACCEPT / RETURN / MORE_EVIDENCE decisions |
| SERA_VNEXT_HUMAN_REVIEWER_CASE_MATRIX_TEMPLATE.csv | Template for tracking cases before execution |
| SERA_VNEXT_HUMAN_REVIEWER_RESULT_TEMPLATE.csv | Template for recording results after execution |
| SERA_VNEXT_HUMAN_REVIEWER_PILOT_RUNBOOK.md | Admin runbook for managing the pilot |
| SERA_VNEXT_HUMAN_REVIEWER_PILOT_ROLLBACK.md | Rollback plan if pilot is blocked or fails |
