# SERA vNext — Deploy & Readiness Audit (c4266d0)

## Feature flags

All flags are env-driven, default **false** (only the literal `"true"` enables) — safe defaults.

| Flag | Side | Reader |
|---|---|---|
| `SERA_VNEXT_PRODUCT_BETA_ENABLED` | server | `sera-vnext-product/constants.ts isSeraVNextProductBetaEnabled` |
| `NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED` | client (build-time) | `isSeraVNextProductBetaUiEnabled` |
| `SERA_VNEXT_CANDIDATE_ONLY_ENABLED` | server | feature-flags.ts |
| `SERA_VNEXT_INTERNAL_PILOT_ENABLED` | server | feature-flags.ts |
| `SERA_VNEXT_READONLY_ENABLED` | server | feature-flags.ts |
| `NEXT_PUBLIC_SERA_VNEXT_CANDIDATE_UI_ENABLED` | client (build-time) | feature-flags.ts |
| `NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED` | client (build-time) | feature-flags.ts |

- **Server/UI split (F-?, MEDIUM via threat model):** Product Beta is gated by a *server* flag (API → 404 when off) **and** a separate *client* UI flag. These can be set inconsistently (UI on / API off shows a surface that 404s; API on / UI off hides it). `NEXT_PUBLIC_*` flags are **build-time embedded**, so changing them requires a rebuild — a stale build can show/hide the wrong surface. Document required flag pairs and verify both before any pilot.
- API-off behaviour is safe (404 "Not found", no existence disclosure).

## Environment confirmation (NOT_ASSESSED)

This audit had **no authorization or network access** to Vercel/staging during execution. Therefore:
- Whether `c4266d0` is deployed to `systemhfa.vercel.app` — **NOT_ASSESSED**.
- Whether the corresponding migrations (`sera_vnext_product_beta`, `..._non_final_status_fix`, `risk_profile_exclusions`) are applied to the live DB — **NOT_ASSESSED** (only migration files were read; live schema/drift not inspected).
- Which flag values are live — **NOT_ASSESSED**.

`git rev-parse` confirms locally that `HEAD == origin/main == c4266d0`, so the commit is on the origin. Deploy association beyond that is not inferred.

## Separated readiness levels

| Level | Verdict | Basis |
|---|---|---|
| LOCAL_READY | **PASS** | Engine runs deterministically; 39/39 reproduced; product/DB code is coherent at HEAD |
| STAGING_READY | **PASS_WITH_LIMITATIONS** | Commit history shows product-beta DB/RLS validated on staging; not re-verified here (NOT_ASSESSED live) |
| CONTROLLED_PILOT_READY | **PASS_WITH_LIMITATIONS** | Admin-only candidate-only flow with hard locks is safe to pilot under supervision; bounded by F-05 utility |
| INTERNAL_BETA_READY | **NOT_READY** | Requires F-05 (PT) and F-12 (copy) addressed; otherwise users see "AI classifies" + mostly-UNRESOLVED results |
| PRODUCTION_READY | **NOT_READY** | Engine capability + overclaims + legacy/vNext split (F-07) + unverified deploy |
| METHODOLOGY_SCIENTIFICALLY_VALIDATED | **NOT_ASSESSED / NO** | No empirical or inter-rater validation exists (F-24) |

## Recommendations before any external exposure
1. Confirm deployed commit, applied migrations, and live flag values out-of-band.
2. Verify the service-role key is not present in any `NEXT_PUBLIC_*`/client bundle.
3. Decide flag pairs and rebuild for `NEXT_PUBLIC_*` changes.
4. Keep production gated until F-05/F-12 are resolved.
