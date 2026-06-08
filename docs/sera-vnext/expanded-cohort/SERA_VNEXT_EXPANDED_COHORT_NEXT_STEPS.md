# SERA vNext Expanded Reviewer Cohort - Next Steps

## Required Before Retrying PASS Gate

1. Add at least two more authorized enterprise reviewers.
2. Keep participant records sanitized as `REVIEWER-02`, `REVIEWER-03`, and optionally `REVIEWER-04` or `REVIEWER-05`.
3. Re-run the same 25-case matrix or a successor matrix with at least 20 cases.
4. Capture actual human review time separately from automation runtime.
5. Add a UI-layer utility metric to distinguish reviewer-output usefulness from raw engine `proposedCode` presence.

## Product Follow-Up

| Item | Action |
| --- | --- |
| API-level P/O/A metric | Replace raw `proposedCode` usefulness with reviewer-output usefulness for cohort scoring |
| Preconditions metric | Score reviewer-output cards and absence explanations, not only raw engine precondition count |
| Escape point metric | Keep insufficient-evidence cases visible as useful if the reviewer-output layer explains the boundary clearly |
| Human timing | Measure actual reviewer session duration |

## Validation To Preserve

- Engine 39-case validation
- Product Beta DB/RLS real checks
- Product Beta real API/UI checks
- Controlled pilot API/UI checks
- Reviewer-output contract/API/UI checks
- Reviewer utility rerun checks
- Expanded cohort runner, metrics, security, and integrity checks

## Human Reviewer Pilot

A controlled pilot plan has been prepared for recruiting and onboarding additional reviewers. See:

```
docs/sera-vnext/human-reviewer-pilot/SERA_VNEXT_HUMAN_REVIEWER_PILOT_PLAN.md
```

The pilot plan includes recruitment criteria, case matrix templates, reviewer instructions, and advancement criteria. Status: `HUMAN_REVIEWER_PILOT_READY_TO_START`.

## Recommended Next Status

```text
RETRY_EXPANDED_COHORT_AFTER_REVIEWER_RECRUITMENT
```
