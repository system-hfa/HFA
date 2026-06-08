# SERA Risk Profile Rollback

## Safe Rollback Unit

Rollback scope:

- frontend risk-profile/events/dashboard surfaces
- risk-profile APIs
- `risk_profile_exclusions` migration
- risk-profile docs/tests

## Rollback Strategy

1. revert the product commit;
2. stop using exclusion endpoints;
3. optionally remove `risk_profile_exclusions` only with explicit database migration rollback approval;
4. keep methodology, engine, and baseline untouched.

## Expected Rollback Impact

- Risk Profile returns to the previous disconnected behavior;
- Events quick-action badges disappear;
- dashboard summary counters revert to the old intelligence implementation.
