# SERA vNext Human Pilot Rollback Runbook

## Immediate rollback triggers

- Unauthorized access to pilot analyses.
- Final output leak.
- Export exposes sensitive narrative text unexpectedly.
- Reviewer cannot submit or retrieve reviews.
- Audit trail is missing or inconsistent.
- Tenant isolation fails.

## Actions

1. Disable the UI flag.
2. Disable the API flag.
3. Block pilot users if access scope is uncertain.
4. Archive pilot cases instead of deleting them.
5. Preserve audit records.
6. Preserve exported evidence for internal investigation.
7. Do not erase data without explicit human decision.
8. Do not remove migrations without a migration rollback plan.
9. Revert the preparation commit only if the preparation artifacts themselves caused the blocker.

## Data handling

Keep all rollback artifacts internal. Do not copy credentials, auth state, database URLs, or personal data into docs or issue comments.

