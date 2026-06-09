# SERA vNext — Security Recheck

Method: static review at HEAD `114b5fc`. No data-mutating or cross-tenant live tests were run (read-only mandate; would touch real data).

| Control | Verdict | Evidence |
|---|---|---|
| AuthN | PASS | `requireBearerUser` on `/api/analyze` and vNext routes; Bearer token required |
| Admin gate | PASS | `requireAdmin` on exclusions + vNext admin routes |
| Tenant scoping | PASS | every Supabase query filters `tenant_id`; `events`/`analyses` lookups `.eq('tenant_id', user.tenantId)` |
| userId spoofing | PASS | `/api/analyze` rejects `body.userId !== user.userId` (403) |
| Cross-tenant / IDOR | PASS (static) | tenant filter on object reads; vNext repo scoped by tenant; **not live-tested** |
| RLS enabled | PASS | exclusions table RLS (tenant); product beta migration RLS |
| RLS depth (role/source FK) | PARTIAL (F-19) | exclusions RLS checks tenant only; admin enforced at API; no DB role gate / source FK |
| JWT helper search_path (F-20) | ACCEPTED | SECURITY INVOKER, not DEFINER |
| Risk endpoint error leakage (F-14) | PASS | generic `RISK_PROFILE_ERROR` / `INTELLIGENCE_ERROR` + request_id; details server-side |
| `/api/analyze` error leakage | **FAIL (NF-04)** | 500 paths return `err.message` to client (lines ~160, ~304); internal messages can leak |
| Secrets / PII in logs | PASS | audit metadata strips narrative/token/secret/stack; `sanitizeObject` forbidden keys |
| Append-only audit | PARTIAL | domain events insert-only; `audit_log` best-effort (can drop) |
| Feature-flag gating | PASS | canonical route default off; explicit env to enable |
| Service role usage | PASS | `assertServiceRoleEnv`; admin client server-side only |

## New security finding

**NF-04 (MEDIUM): `/api/analyze` leaks internal error messages.** On failure the route returns `err instanceof Error ? err.message : 'Falha…'`, exposing internal/DB error text to the client — the same class of issue F-14 fixed for risk endpoints, still present on the primary analyze route. Recommend generic 500 + request_id, log details server-side.

## F-22 retest (test-side security)

`risk-profile-security-trial-001.ts` retains soft-skip `try/catch` that can render cross-tenant negative assertions vacuous. The cross-tenant guard itself appears enforced in code, but the **test** does not fail loudly when the blocked session cannot be created — so the guard is not reliably proven by that test. Unresolved.

## Verdict

Security: **PASS_WITH_WARNINGS.** Core auth/tenant/RLS controls are in place and risk endpoints are sanitized. Open items: `/api/analyze` error leakage (NF-04), exclusion RLS depth (F-19), best-effort audit completeness, and the soft-skip security test (F-22). Cross-tenant isolation verified statically only — recommend a live negative test in the pilot environment.
