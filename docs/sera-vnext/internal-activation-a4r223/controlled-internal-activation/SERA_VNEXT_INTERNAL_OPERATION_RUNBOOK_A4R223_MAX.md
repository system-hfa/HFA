# SERA vNext Internal Operation Runbook A4R223-MAX

## Activation

1. Confirm branch and approved commit; require a clean tracked worktree.
2. Run typecheck, build, lint, required trials, and the vNext sweep.
3. Set the three flags only in the controlled local/staging process.
4. Authenticate with an approved enterprise administrator.
5. Confirm endpoint 200 and the official 7/7/3/1/3 summary.
6. Confirm the panel states read-only diagnostics and all runtime locks are false.
7. Confirm request/available logs contain request ID and sanitized context.
8. Record operator, environment, commit, start time, and planned end time.

## Incident

1. Turn the internal pilot flag off.
2. Collect the request ID and sanitized logs.
3. Do not edit baseline or fixtures.
4. Do not repair or mutate data automatically.
5. Open a technical investigation before reactivation.
