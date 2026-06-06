# SERA vNext Staging Operation Runbook — A4R224-MAX

## Prerequisites

- Admin enterprise account with verified Supabase session
- Access to environment variables (local .env.local or staging provider panel)
- No production access required

## Activation Procedure

```bash
# 1. Verify baseline/fixture integrity before activation
npx tsx tests/sera-vnext/staging-integrity-a4r224max-trial-001.ts

# 2. Set flags (local)
SERA_VNEXT_READONLY_ENABLED=true
SERA_VNEXT_INTERNAL_PILOT_ENABLED=true
NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED=true  # rebuild required for UI

# 3. Verify endpoint
curl -H "Authorization: Bearer $ADMIN_ACCESS_TOKEN" \
  http://localhost:3000/api/admin/sera-vnext/status

# 4. Verify panel (browser)
# Navigate to /admin/sera-vnext with logged-in admin session

# 5. Confirm expected response:
# status=AVAILABLE, fixtureCount=7, classificationEnabled=false
```

## Access Control

Only users satisfying ALL of:
1. Valid Supabase JWT
2. Tenant plan = enterprise
3. User role = admin
4. Both server-side flags enabled

## Monitoring

- Server logs: `[sera-vnext-runtime] sera_vnext_runtime_status_*`
- Request IDs in each log entry
- No sensitive data in logs

## Normal Operating State

```json
{
  "status": "AVAILABLE",
  "baselineId": "SERA_VNEXT_BASELINE_V0",
  "fixtureCount": 7,
  "classificationEnabled": false,
  "productIntegrated": false,
  "downstreamAllowed": false
}
```

## Escalation Criteria

| Signal | Action |
|---|---|
| status=ERROR | Check runtime-errors.ts; verify baseline files intact |
| HTTP 503 | Baseline validation failed; run integrity test |
| Unexpected 200 for non-admin | Immediate rollback; investigate requireAdmin bypass |
| Token/secret in logs | Immediate rollback; review observability module |
| DB mutation detected | Immediate rollback; this should never occur |
