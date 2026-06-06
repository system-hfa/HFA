# SERA vNext A4R224 Evidence Correction Notice

Date: 2026-06-06
Phase: A4R224 evidence correction
Status: AUTHORITATIVE

## Purpose

This notice corrects the A4R224 evidence wording without reopening methodology, fixtures, baseline, or the structural runtime activation work.

## What Was Actually Proved

1. A real enterprise tenant record was found in the database.
2. A real admin user record was found in the database under an enterprise tenant.
3. The status handler returned HTTP 200 when executed with dependency-injected admin context derived from that verified record.
4. The status payload remained read-only, non-classifying, and non-mutating.
5. Structural tenant gating, rollback behavior, observability, and integrity checks remained valid.

Authoritative evidence labels:

- `REAL_DATABASE_ENTERPRISE_ADMIN_RECORD_VERIFIED`
- `DEPENDENCY_INJECTED_ADMIN_CONTEXT_HANDLER_VERIFIED`

## What Was Not Proved

The following were not verified in A4R224 and must not be claimed:

- `REAL_SUPABASE_SESSION_NOT_VERIFIED`
- `REAL_REQUIRE_ADMIN_HTTP_FLOW_NOT_VERIFIED`
- `REAL_AUTHENTICATED_BROWSER_NOT_VERIFIED`

Specifically, A4R224 did not prove:

1. a real Supabase login session;
2. a real JWT accepted end-to-end by `requireAdmin(req)`;
3. a real cookie-backed browser session;
4. a browser-rendered authenticated page using persistent auth state.

## Why Dependency Injection Is Not a Real Session

Dependency injection bypasses the normal HTTP authentication path. It proves the handler contract under supplied admin context, but it does not prove token issuance, token transport, token validation, session bootstrap, cookie state, or browser authentication.

## Why Service-Role Lookup Is Not Login

A service-role query proves that the target records exist in the database. It does not prove that the identified user authenticated, received a session, presented a valid token, or successfully crossed the production `requireAdmin(req)` boundary.

## What Remains Valid After This Correction

This correction does not invalidate:

1. vNext official fixtures;
2. vNext baseline v0;
3. read-only runtime behavior;
4. internal structural endpoint behavior;
5. tenant isolation structural checks;
6. rollback and integrity checks;
7. non-classifying product boundary enforcement.

## Scope Boundary

This is a documentary and evidence-label correction only. It does not reopen causal methodology, P/O/A logic, preconditions, fixture content, baseline content, or the Product Alpha authorization decision.
