# SERA vNext Guarded Read-Only Integration A4R221-MAX

Status: GUARDED_READONLY_RUNTIME_INTEGRATION_COMPLETE

A4R221 adds the first guarded application integration for the official SERA vNext baseline v0. The integration is read-only, disabled by default, and limited to an internal admin diagnostic surface.

Implemented scope:
- Build blocker closure for the executive report Server Component.
- Server-side feature flag `SERA_VNEXT_READONLY_ENABLED`, default false.
- Optional internal UI flag `NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED`, default false.
- Runtime service returning a sanitized availability summary only.
- Admin endpoint `/api/admin/sera-vnext/status` protected by existing `requireAdmin(req)`.
- Admin diagnostic page `/admin/sera-vnext`, gated from navigation by the public diagnostics flag.
- Fail-closed validation for baseline lock inconsistencies.

Explicit non-scope:
- No P/O/A logic change.
- No SERA tree change.
- No classification execution.
- No product analysis flow integration.
- No database write or migration.
- No legacy baseline or fixture change.
