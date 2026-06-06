# SERA vNext Deactivation Runbook A4R223-MAX

1. Set `SERA_VNEXT_INTERNAL_PILOT_ENABLED=false` or unset it.
2. Confirm the endpoint returns 404.
3. Set `SERA_VNEXT_READONLY_ENABLED=false` or unset it.
4. Confirm the endpoint remains 404.
5. Set `NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED=false` or unset it.
6. Restart/rebuild the UI process so the public diagnostics flag is removed from the client bundle.
7. Confirm the panel navigation is unavailable and direct unauthorized access displays no data.
8. Record deactivation time and reason.

No database cleanup or artifact rollback is expected.
