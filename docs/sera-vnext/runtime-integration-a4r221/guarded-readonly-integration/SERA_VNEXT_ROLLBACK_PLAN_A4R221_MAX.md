# Rollback Plan A4R221-MAX

Rollback options:
1. Disable `SERA_VNEXT_READONLY_ENABLED` to close the endpoint without code rollback.
2. Disable `NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED` to remove the admin navigation/page behavior from the UI build.
3. Revert the integration commit to remove runtime service, endpoint, page, tests, docs, and env example changes.
4. Revert the build blocker commit only if a replacement Server Component-safe styling fix is applied first.

No database rollback is required because A4R221 does not create migrations or write data.
