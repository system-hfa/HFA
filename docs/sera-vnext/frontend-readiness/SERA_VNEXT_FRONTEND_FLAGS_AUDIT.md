# SERA vNext Frontend Flags Audit

## Audit summary

All observed boolean helpers default to `false` unless the environment variable equals the literal string `true`.

Relevant helpers:

- `frontend/src/lib/sera-vnext-product/constants.ts`
- `frontend/src/lib/sera-vnext-runtime/feature-flags.ts`

## Flag matrix

| Flag | Surface | Code default | Observed use | Readiness result |
| --- | --- | --- | --- | --- |
| `SERA_VNEXT_PRODUCT_BETA_ENABLED` | backend Product Beta API | false | required by `isSeraVNextProductBetaEnabled()` | PASS |
| `NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED` | admin Product Beta UI | false | gates `/admin/sera-vnext/analyses*` pages and new admin nav item | PASS |
| `SERA_VNEXT_READONLY_ENABLED` | runtime readonly surface | false | present in runtime helper/tests; not required for beta analyses flow | PASS |
| `SERA_VNEXT_INTERNAL_PILOT_ENABLED` | runtime internal pilot surface | false | present in runtime helper/tests; not required for beta analyses flow | PASS |
| `SERA_VNEXT_CANDIDATE_ONLY_ENABLED` | runtime candidate-only service | false | present in runtime helper/tests; separate from Product Beta UI | PASS |
| `NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED` | diagnostics UI | false | gates `/admin/sera-vnext` runtime page | PASS |

## Environment observations

Observed in local `frontend/.env.local` during validation:

- `NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED=true`
- `SERA_VNEXT_PRODUCT_BETA_ENABLED=true`

Observed in `frontend/.env.example`:

- `NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED=false`

No dedicated frontend readiness flag was found for:

- `SERA_VNEXT_REVIEWER_OUTPUT_ENABLED`
- `SERA_VNEXT_CONTROLLED_PILOT`

Current behavior instead relies on the Product Beta/backend flow and the existing reviewer-output payload.

## Off-state behavior

Validated behavior:

- Product Beta API returns `404 Not found` when backend beta flag is off.
- Product Beta UI hides the page content behind the disabled-state message when the public UI flag is off.
- Admin navigation now exposes the beta route only when the public UI flag is on.

## Public exposure assessment

- public root and login routes remain unrelated to Product Beta;
- Product Beta is nested under `/admin`;
- data access still requires bearer auth, tenant resolution, enterprise-plan approval, and admin role;
- accidental public opening through flag drift was not observed in this validation set.
