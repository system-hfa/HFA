# Activation Environment Record A4R223-MAX

- Environment: local development only
- Host: localhost
- Port: 3324
- Date: 2026-06-06
- Initial commit: `1eededf4e45ad27f4029025251d65853c5beac88`
- Branch: `main`
- Flags: `SERA_VNEXT_READONLY_ENABLED=true`, `SERA_VNEXT_INTERNAL_PILOT_ENABLED=true`, `NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED=true`
- Flag mechanism: process environment for the local Next.js process; no `.env` file changed
- Authorized equivalent actor: sanitized admin role, sanitized enterprise tenant, synthetic non-secret test identity
- Real browser actor: no session; correctly redirected to `/login`
- Production changed: no
- Staging changed: no
