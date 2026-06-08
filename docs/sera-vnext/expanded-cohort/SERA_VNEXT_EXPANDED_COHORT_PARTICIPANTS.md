# SERA vNext Expanded Reviewer Cohort — Participants

## Cohort Status

```
EXPANDED_COHORT_BLOCKED_SINGLE_REVIEWER_ONLY
```

## Available Participants

| participant_id      | role_type            | authorized_scope  | tenant_scope | can_create_analysis | can_review | can_export | limitations                   |
| ------------------- | -------------------- | ----------------- | ------------ | ------------------- | ---------- | ---------- | ----------------------------- |
| REVIEWER-01         | enterprise_admin     | sera_vnext_beta   | enterprise   | YES                 | YES        | YES        | SINGLE_AUTHORIZED_REVIEWER    |
| REVIEWER-BLOCKED-01 | negative_control     | none              | trial        | NO (403)            | NO (403)   | NO (403)   | BLOCKED_TRIAL_PLAN            |

## Infrastructure Assessment

- Total auth users found: 3
- Admin users found: 2
- Distinct admin tenants: 2
- Enterprise plan tenants: 1 (tenant prefix: 3a68c15d****)
- Trial plan tenants: 1 (tenant prefix: 9a52a850****)
- `sera_vnext_enabled` flag: not explicitly set (enterprise plan grants access by plan check)

## Cohort Limitation

The minimum required cohort size for PASS status is 3 distinct authorized reviewers.

Only **1 authorized reviewer** is available (REVIEWER-01, enterprise admin).

REVIEWER-BLOCKED-01 serves as a security negative control probe only — it is denied all access and cannot be counted as a reviewer.

This cohort is therefore classified as:

```
EXPANDED_COHORT_BLOCKED_SINGLE_REVIEWER_ONLY
```

## Mitigating Evidence

- REVIEWER-01 is the same participant class as PILOT-ADMIN-01 from the controlled admin pilot
- The previous controlled pilot validated 10 cases with PILOT-ADMIN-01 (PASS_WITH_LIMITATIONS)
- The reviewer utility remediation pass achieved 10/10 on all utility metrics
- The expanded cohort execution with 25 cases supplements but does not replace a multi-reviewer cohort
- Access control for REVIEWER-BLOCKED-01 is confirmed functional (403 on all routes)

## Sanitization Notes

- No real email addresses recorded here
- No auth tokens, cookies, or JWT segments
- Participant IDs are synthetic identifiers only
- Tenant prefixes shown are partial (8 chars of UUID) — not sufficient to reconstruct full IDs
