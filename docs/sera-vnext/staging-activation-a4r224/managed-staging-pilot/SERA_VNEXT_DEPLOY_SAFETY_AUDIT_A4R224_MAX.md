# Deploy Safety Audit — A4R224-MAX

## Flag Safety

| Rule | Status |
|---|---|
| Code default for SERA_VNEXT_READONLY_ENABLED | false (env required to activate) |
| Code default for SERA_VNEXT_INTERNAL_PILOT_ENABLED | false (env required to activate) |
| Code default for NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED | false (env required to activate) |
| No flag committed as `true` in any source file | CONFIRMED |
| No `.env` committed with secrets | CONFIRMED |
| Production env variables for SERA_VNEXT flags | NOT SET (production remains false) |

## Critical Rule

```
PRODUCTION_FLAGS_MUST_REMAIN_FALSE
```

All three SERA vNext flags must be false in any production deploy configuration until explicitly authorized. This rule applies to Vercel, Cloudflare, or any other deployment provider.

## Secrets Audit

| Secret type | In code | In git | Status |
|---|---|---|---|
| SUPABASE_SERVICE_ROLE_KEY | NO | NO | SAFE |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | NO | NO | SAFE |
| NEXTAUTH_SECRET | NO | NO | SAFE |
| Bearer tokens | NO | NO | SAFE |
| Cookies/auth state | NO | NO | SAFE |

## Preview/Staging Deployment

No managed staging deployment exists at this phase. When provisioned:
- Set SERA_VNEXT flags only in staging environment variables
- Do NOT set in production environment variables
- Document staging URL (sanitized) in environment record
- Use branch protection to prevent accidental merge of flag=true defaults

## Rollback

Server-side flags: toggle env var, no redeploy needed.  
UI flag: requires rebuild/redeploy to take effect.

## Health Check

Route returns `404` when flags are off — this is the safe default and serves as the health check indicator that the feature is disabled.

## Deploy Logs

Not applicable at this phase (no managed staging deployment).

## Branch Protection

`main` branch — single-author repo, standard commit flow.  
HEAD: 0bc4f5d616390a847f8d8e1dbabb36b470722b94

## Commit Traceability

All SERA vNext changes are tracked in `docs/sera-vnext/` and `tests/sera-vnext/` with phase-labeled files and phase-prefixed commit messages (`test(sera-vnext):`, `feat(sera-vnext):`, `fix(frontend):`).
