# SERA vNext Product Beta Runbook

Status: `SERA_VNEXT_PRODUCT_BETA_READY_WITH_LIMITATIONS`
Blocker: `REAL_MIGRATION_AND_RLS_NOT_EXECUTED`

Gate to internal pilot:
- [ ] Supabase local or staging available
- [ ] Migration `20260607135727_sera_vnext_product_beta.sql` applied
- [ ] RLS tested with real JWT claims
- [ ] API smoke against real database passed
- [ ] UI smoke against real database passed

Enable only in internal controlled environments:

```text
SERA_VNEXT_PRODUCT_BETA_ENABLED=true
NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED=true
```

Operational steps:

1. Confirm engine v0.1 validation remains 39/39 PASS.
2. Apply migration only to Supabase local, test, or authorized staging.
3. Confirm enterprise admin auth.
4. Create controlled pilot analysis.
5. Review candidate output as non-final working hypothesis.
6. Use reanalysis only after return/more-evidence states.
7. Archive instead of deleting.
8. Export only internal JSON with non-final markers.

Never enable public production access in this phase.
