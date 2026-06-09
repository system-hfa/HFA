# SERA vNext — Database, RLS, Tenant Isolation & Security Audit (c4266d0)

Scope: `supabase/migrations/*` (15 migrations) with focus on `sera_vnext_product_beta`, `risk_profile_exclusions`, `rls_policies`, `create_audit_log`.

Note: this audit is static (migration files). The live staging schema was **not** connected (no authorization/network access) → drift between migration history and live schema is **NOT_ASSESSED** (F-26).

## Tenant identity & helpers

- `get_tenant_id()` (`rls_policies.sql`): `SECURITY DEFINER`, `set search_path = public`, reads `request.jwt.claims ->> 'tenant_id'`. Correct.
- `sera_vnext_beta_jwt_tenant_id()/_role()/_can_use()` (`sera_vnext_product_beta.sql`): `SQL STABLE`, **SECURITY INVOKER** (default). `_can_use(t)` ⇔ `t = jwt_tenant_id() AND jwt_role()='admin'`. **F-20 (LOW):** no explicit `set search_path` (low risk for INVOKER functions).
- Claim path inconsistency: beta helpers read `app_metadata.tenant_id` then top-level `tenant_id`; `get_tenant_id()` reads only top-level. Both resolve in practice; worth aligning.

## Product Beta tables (sera_vnext_analyses / _revisions / _reviews / _events)

Strong, defense-in-depth design:
- **RLS enabled** on all four tables; policies use `sera_vnext_beta_can_use(tenant_id)` (tenant + admin) for select/insert/update; select also requires `deleted_at is null`.
- **Grants** are `select, insert(, update)` only — **no DELETE grant** on any table ⇒ rows cannot be hard-deleted by the app role. Archive is soft (`deleted_at`).
- **Append-only** triggers `prevent_sera_vnext_append_only_update/delete` on `_revisions` and `_events`.
- **Final-output locks** as CHECK constraints (see Product report): non-final output, no-final-status, version lock (`engine_version='0.1.0'`, `methodology='SERA_PT_V1_FROZEN'`, baseline/fixture pinned), JSON array typing.
- **Audit hygiene:** `sera_vnext_events_no_narrative_payload` forbids `narrative/raw_input/eventText` in payload/metadata.
- **Idempotency:** unique `(tenant_id, client_request_id)`.
- FKs: `tenant_id → tenants ON DELETE CASCADE`; `created_by → users ON DELETE RESTRICT`; reviewer/actor FKs to users.

**Service-role usage:** the product repository defaults to `getSupabaseAdmin()` (service role), which **bypasses RLS**. Isolation then depends entirely on explicit `.eq('tenant_id', tenantId)` filters — present on every read/update. CHECK constraints and triggers still apply under service role, so the locks hold. This is acceptable but means *one missing tenant filter would leak cross-tenant* — none missing at this HEAD.

## risk_profile_exclusions

- Soft-exclusion ledger: `(tenant_id, source_type, source_id, excluded_by/at, reason, restored_by/at)`. **Never deletes the underlying event/analysis.**
- Unique partial index `(tenant_id, source_type, source_id) WHERE restored_at IS NULL` ⇒ at most one *active* exclusion per source (prevents duplicate-active under concurrency).
- RLS enabled; select/insert/update gated by `tenant_id = get_tenant_id()`. Update without explicit WITH CHECK ⇒ Postgres applies the USING expression to new rows too, so `tenant_id` cannot be repointed to another tenant.
- **F-19 (LOW):** policies check **only tenant** (no admin role) and `source_id` has **no FK / no DB-level source-existence check**. Mitigated at the API layer: `requireAdmin` + a source-universe membership check (see Risk Profile report). Defense-in-depth would add the admin role to the DB policy.

## Other migrations

- `create_audit_log.sql`: `audit_log_service_role_only` policy — writes via service role only (the app uses `writeAuditLog` server-side). Reasonable.
- `sera_document_sources.sql`: writes via service role in API routes (documented in comment).
- No migration disables/forces-off RLS, grants to `anon`, or exposes the service role to the client.

## Tenant-isolation / IDOR review (DB + repo)

- All Product Beta and Risk Profile reads/updates are tenant-scoped by explicit `.eq('tenant_id', …)` using the authenticated tenant.
- Cross-tenant exclusion is blocked twice: DB RLS (`tenant_id = get_tenant_id()`) and API source-universe validation (a `source_id` outside the caller's own universe → 404).
- `getAnalysis`/list/revisions/reviews/events all filter by tenant — no object reference escapes the tenant boundary at this HEAD.

**Stop-rules checked:** RLS enabled (not disabled); no secret exposure in migrations; no cross-tenant bypass found; exclusion does not delete evidence. **None triggered.**

## DB/RLS security verdict

**DATABASE_RLS_READINESS = PASS_WITH_WARNINGS.** Product Beta schema is a strong, lock-enforcing, append-only, tenant-isolated design. Residual items are minor and defense-in-depth: exclusion policies are tenant-only at the DB (role enforced at API), `source_id` has no FK (validated at API), beta helper functions lack an explicit `search_path`, and live-schema drift was not verifiable here.
