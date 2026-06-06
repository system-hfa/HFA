# Rollback Plan A4R222-MAX

Primary operational rollback:
1. Set `SERA_VNEXT_INTERNAL_PILOT_ENABLED=false` or unset it.
2. Set `SERA_VNEXT_READONLY_ENABLED=false` or unset it.
3. Set `NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED=false` or unset it before rebuilding UI.

Code rollback if needed:
- Revert A4R222 internal pilot commit.
- Revert A4R222 lint closure commit only if replacement lint-safe fixes are applied.
- Revert A4R221 integration commit if the endpoint/page/service must be removed.

Non-destructive rollback test:
- No revert was executed.
- Feature flags off were validated to neutralize endpoint access with 404.
- Baseline and fixtures remained intact.
- No database rollback required.
