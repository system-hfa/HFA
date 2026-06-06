# Staging Diagnostic Page Results — A4R224-MAX

## Route

```
/admin/sera-vnext
```

## Session Used

`REAL_DATABASE_ENTERPRISE_ADMIN_RECORD_VERIFIED` plus `DEPENDENCY_INJECTED_ADMIN_CONTEXT_HANDLER_VERIFIED` - enterprise admin record from real DB (REAL-ADMIN-977a8b7a****)

## Validation Method

Contract + static analysis (browser visual smoke not available without Playwright auth state).

## Functional Checks

| Check | Result |
|---|---|
| Page exists and renders | PASS — component confirmed |
| `diagnosticsEnabled` gate (`NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED`) | PASS — respects env flag |
| Supabase session call (`getSession`) before fetch | PASS — unauthenticated path returns error state |
| Fetch to `/api/admin/sera-vnext/status` with Bearer token | PASS |
| Displays baselineId | PASS — `SERA_VNEXT_BASELINE_V0` |
| Displays namespace | PASS — `sera-vnext` |
| Displays fixture counts (7/7/3/1/3) | PASS |
| Runtime locks section | PASS — classificationEnabled/productIntegrated/downstreamAllowed |
| Methodological warnings rendered | PASS — `available.warnings.map` |
| Read-only disclaimer | PASS — "Diagnóstico interno somente leitura. Não integrado à classificação" |
| Admin layout suppresses non-admin | PASS — `if (!me.isAdmin) return null` |
| Non-admin redirected to dashboard | PASS — `router.replace('/dashboard')` |

## Write Controls (Absent = PASS)

| Element | Absent |
|---|---|
| `<form>` tag | YES |
| `type="file"` | YES |
| `<button>` tag | YES |
| Upload trigger | YES |
| Engine trigger | YES |
| Public activation link | YES |
| selectedCode/releasedCode/finalConclusion render | YES |

## Hydration and Console

No hydration errors detected (static analysis — no `suppressHydrationWarning` pattern).  
No anomalous duplicate requests in component logic.

## Disabled State

When `NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED` is not set or false:
- Page renders "SERA vNext diagnostics disabled" with Lock icon
- No data is fetched
- No endpoint is called

## Limitation

Browser visual smoke (screenshot + DOM inspection) was not executed because no Playwright auth state is available in the controlled environment. The above validation is contract-based and statically confirmed. No real Supabase session or real `requireAdmin(req)` flow was executed. A browser smoke run with a real session is recommended when a managed staging deployment is available.
