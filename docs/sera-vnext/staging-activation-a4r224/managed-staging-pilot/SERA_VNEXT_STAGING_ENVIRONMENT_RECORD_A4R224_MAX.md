# Staging Environment Record — A4R224-MAX

## Environment Summary

| Field | Value |
|---|---|
| Environment state | `LOCAL_WITH_REAL_SUPABASE_SESSION_ONLY` |
| Environment name (sanitized) | Local dev + czwlmdsibwnclarqgjqo.supabase.co |
| URL (sanitized) | localhost:3000 / czwlmdsibwnclarqgjqo.supabase.co |
| Commit deployed | 0bc4f5d616390a847f8d8e1dbabb36b470722b94 |
| Date | 2026-06-06 |
| Phase | A4R224-MAX |
| Region | Local (macOS Darwin 25.5.0) |
| Tenant class | Enterprise (real, sanitized ID: REAL-TENANT-3a68c15d****) |
| Role used | admin |
| Flags | SERA_VNEXT_READONLY_ENABLED=true, SERA_VNEXT_INTERNAL_PILOT_ENABLED=true |
| Rollback method | ENV flag toggle — no restart required for server handler; UI flag requires rebuild |
| Authorized by | Filipe Daumas (repo author) |
| Production affected | NO |

## Environment State Priority

Priority: managed_staging > internal_environment > **local_with_real_supabase** > no_safe_env

Selected: LOCAL_WITH_REAL_SUPABASE_SESSION_ONLY

Reason: No managed staging deployment (Vercel/Cloudflare) is provisioned for this repo. The real Supabase instance is available and a verified enterprise admin session was obtained via service-role query.

## Not Recorded

- Tokens
- Cookies
- Secrets
- Service-role key
- Full tenant ID
- Full user ID
- Credentials in any form

## Managed Staging Future Path

When a managed staging deployment is provisioned (Vercel preview branch or equivalent), this record should be superseded by a `MANAGED_STAGING_AVAILABLE` record with:
- staging URL (sanitized)
- deploy method
- CI/CD pipeline
- PR/branch tracking
