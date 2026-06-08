# SERA vNext Human Reviewer Pilot — Rollback Plan

## Trigger Conditions

Roll back the pilot (stop execution and preserve state) if any of the following occur:

| Condition | Action |
| --- | --- |
| Final output leaked (classification visible to common users) | Immediate stop; audit RLS and export controls |
| Cross-tenant data access confirmed | Immediate stop; audit DB isolation |
| Credential or PII found in exported JSON | Immediate stop; revoke affected exports |
| API returning 5xx errors on all requests | Stop pilot; diagnose server and DB |
| Methodology or engine regression discovered | Stop pilot; open bug track; do not rerun |
| Reviewer authorization bypassed | Immediate stop; revoke access; audit logs |

## Rollback Steps

### Step 1: Pause All Reviews

Notify all reviewers to stop immediately and not submit any further cases.

### Step 2: Preserve Current State

Do NOT delete any analyses or reviews. The audit trail is evidence.

```bash
# Export all current analyses for preservation
curl -H "Authorization: Bearer <admin_token>" \
  http://127.0.0.1:3100/api/admin/sera-vnext/analyses?pageSize=100 \
  > rollback-snapshot-$(date +%Y%m%d-%H%M%S).json
```

### Step 3: Diagnose the Trigger

1. Check the server logs: `tail -f /tmp/nextjs-dev.log`
2. Check the Supabase dashboard for RLS policy violations
3. Run the security trial: `npx tsx tests/sera-vnext/expanded-cohort-security-trial-001.ts`
4. Run the integrity trial: `npx tsx tests/sera-vnext/expanded-cohort-integrity-trial-001.ts`

### Step 4: Determine Scope

- **Infra-only issue** (server error, DB slow): Fix and resume without data loss
- **Security issue** (RLS bypass, cross-tenant access): Stop pilot; fix before restart; re-run security trial
- **Methodology/engine issue**: Stop pilot; open engineering track; do not resume until resolved

### Step 5: Document

Update the pilot plan with:
- Date and time of rollback
- Trigger condition
- Cases completed before rollback
- Rollback action taken
- Resolution (if applicable)

## What is NOT a Rollback Trigger

- A reviewer submitting `REQUIRES_MORE_EVIDENCE` frequently
- Utility metrics below target (expected, does not trigger rollback)
- The expanded cohort gate failing again (expected if <3 reviewers)
- A reviewer making mistakes in review notes (coach, do not rollback)
- Slow engine response times (>30s but completing normally)

## Post-Rollback

After a rollback:
1. All data is preserved (no deletion)
2. Pilot status is updated to `PILOT_PAUSED` or `PILOT_BLOCKED`
3. Engineering tracks the fix
4. A new pilot kickoff is scheduled after the fix is validated
5. Completed cases before rollback count toward the cohort if the fix does not affect their correctness
