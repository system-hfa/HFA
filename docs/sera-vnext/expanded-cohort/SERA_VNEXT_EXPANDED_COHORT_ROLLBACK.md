# SERA vNext Expanded Reviewer Cohort - Rollback

## Rollback Need

No code rollback is required for this blocked cohort result.

The block is caused by cohort composition, not by a Product Beta defect, methodology bug, security blocker, or database failure.

## Feature Flag Rollback

Use the existing Product Beta rollback path:

```text
SERA_VNEXT_PRODUCT_BETA_ENABLED=false
NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED=false
```

Expected behavior:

- API Product Beta routes return hidden/disabled responses.
- UI Product Beta entry points are unavailable.
- Existing pilot records remain persisted and auditable.

## Data Handling

- Do not delete pilot analyses as part of rollback.
- Use archive/restore for soft lifecycle management.
- Keep audit events append-only.
- Keep exports internal, non-final, and not operational.

## Scope Not Rolled Back

- Reviewer-output remediation remains valid.
- Product Beta persistence remains valid.
- DB/RLS migrations remain valid.
- Engine, methodology, baseline, fixtures, and Product Alpha remain unchanged.
