# SERA vNext Product Beta Pilot Results

Status: `SERA_VNEXT_PRODUCT_BETA_INTERNAL_READY_FOR_CONTROLLED_ADMIN_PILOT`

Real database validation: COMPLETE — 2026-06-07
Migration applied: `20260607135727_sera_vnext_product_beta.sql`
DB real: PASS 16/16
RLS real: PASS 5/5
Engine v0.1: PASS 39/39

Pilot mode: static/structural simulation complete.
Real API/UI pilot: PENDING — requires running Next.js server with SERA_VNEXT_PRODUCT_BETA_ENABLED=true and named admin user.

Pilot coverage:

- clean anchor
- automation boundary
- procedural boundary
- technical-dominant
- consequence-as-cause
- evidence insufficient
- no-failure
- PF/PM ambiguity

Expected workflow outcomes:

- creation persisted
- revision 1 persisted
- review submitted
- more evidence state reachable
- return for reanalysis reachable
- reanalysis creates revision 2
- archive and restore work
- export produces non-final internal payload
- audit events are emitted

Pilot trial: `tests/sera-vnext/product-beta-pilot-trial-001.ts`.
