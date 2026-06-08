# SERA vNext Human Pilot Preparation Next Steps

## Next operational action

Recruit and authorize at least 3 real internal human reviewers, then execute the activation runbook.

## Before execution

1. Confirm `main` HEAD and deployment commit.
2. Confirm controlled environment flags.
3. Confirm DB and RLS readiness from prior Product Beta validation.
4. Confirm reviewer authorization.
5. Run seed dry-run and review payloads.
6. Assign cases using the assignment plan.

## During execution

1. Reviewers complete practice cases.
2. Reviewers complete assigned cases.
3. Shared cases are reviewed independently.
4. Admin collects sanitized result rows.
5. Admin exports candidate-only records.

## After execution

1. Save real result data as `docs/sera-vnext/human-reviewer-pilot/SERA_VNEXT_HUMAN_REVIEWER_RESULT_DATA.csv`.
2. Run metrics runner.
3. Run shared agreement runner.
4. Review method, UX, and security issues.
5. Decide whether the expanded cohort retry can proceed.

