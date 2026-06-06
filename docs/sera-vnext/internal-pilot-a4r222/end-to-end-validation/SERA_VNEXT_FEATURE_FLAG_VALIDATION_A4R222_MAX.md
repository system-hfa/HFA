# Feature Flag Validation A4R222-MAX

Flags:
- `SERA_VNEXT_READONLY_ENABLED`: server-side read-only runtime gate.
- `SERA_VNEXT_INTERNAL_PILOT_ENABLED`: server-side internal pilot gate.
- `NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED`: public UI diagnostic display gate.

Canonical parsing:
- `undefined`: false.
- empty string: false.
- `false`: false.
- `FALSE`: false.
- `0`: false.
- `true`: true.
- `TRUE`: true.
- `1`: false.
- invalid values: false.

Endpoint requirement:
- Server read-only flag must be true.
- Server internal pilot flag must be true.
- Public diagnostics flag alone does not enable server access.
- Auth and admin/tenant authorization are still required when server flags are true.

Validated by:
- `tests/sera-vnext/auth-feature-flags-a4r222max-trial-001.ts`
