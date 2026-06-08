# SERA vNext Frontend Route Map

## Classification legend

- `public`
- `authenticated`
- `admin`
- `enterprise admin`
- `tenant scoped`
- `product beta`
- `legacy/dashboard`
- `unknown`
- `not found`

## Route inventory

| Route | Source | Classification | Gate / flag | Current result |
| --- | --- | --- | --- | --- |
| `/` | `frontend/src/app/page.tsx` | public | none | present |
| `/login` | `frontend/src/app/(auth)/login/page.tsx` | public | none | present |
| `/dashboard` | `frontend/src/app/(dashboard)/dashboard/page.tsx` | authenticated, tenant scoped, legacy/dashboard | authenticated session | present and validated |
| `/admin` | `frontend/src/app/(dashboard)/admin/page.tsx` | admin | authenticated admin UX; effective data enforcement via server APIs | present |
| `/admin/sera-vnext` | `frontend/src/app/(dashboard)/admin/sera-vnext/page.tsx` | admin | `NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED` | present |
| `/admin/sera-vnext/analyses` | `frontend/src/app/(dashboard)/admin/sera-vnext/analyses/page.tsx` | enterprise admin, tenant scoped, product beta | `NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED` + backend beta enabled | present and validated |
| `/admin/sera-vnext/analyses/new` | `frontend/src/app/(dashboard)/admin/sera-vnext/analyses/new/page.tsx` | enterprise admin, tenant scoped, product beta | same as above | present and validated |
| `/admin/sera-vnext/analyses/[id]` | `frontend/src/app/(dashboard)/admin/sera-vnext/analyses/[id]/page.tsx` | enterprise admin, tenant scoped, product beta | same as above | present and validated |
| `/admin/sera-vnext/analyses/[id]/review` | `frontend/src/app/(dashboard)/admin/sera-vnext/analyses/[id]/review/page.tsx` | enterprise admin, tenant scoped, product beta | same as above | present and validated |
| `/empresas` | no route found | not found | n/a | `COMPANY_DASHBOARD_ROUTE_NOT_FOUND` not applicable because `/dashboard` is the active company route |
| `/company` | no route found | not found | n/a | not present |
| `/settings` | no route found | not found | n/a | nearest routes are `/settings/ai` and `/admin/settings` |
| `/actions` | `frontend/src/app/(dashboard)/actions/page.tsx` | authenticated, tenant scoped | authenticated session | present |
| `/events` | `frontend/src/app/(dashboard)/events/page.tsx` | authenticated, tenant scoped | authenticated session | present |
| `/reports` | no route index found | not found | n/a | nearest routes are `/reports/executive` and `/reports/event/[id]` |

## Product Beta API surface tied to the UI flow

| API route | Purpose | Gate |
| --- | --- | --- |
| `/api/admin/sera-vnext/analyses` | create / list analyses | backend beta enabled + enterprise admin + tenant context |
| `/api/admin/sera-vnext/analyses/[id]` | detail | same |
| `/api/admin/sera-vnext/analyses/[id]/reviews` | submit human review | same |
| `/api/admin/sera-vnext/analyses/[id]/reanalyze` | create new revision | same |
| `/api/admin/sera-vnext/analyses/[id]/archive` | archive | same |
| `/api/admin/sera-vnext/analyses/[id]/restore` | restore | same |
| `/api/admin/sera-vnext/analyses/[id]/export` | export internal JSON | same |
| `/api/admin/sera-vnext/status` | runtime diagnostics | diagnostics route family |

## Middleware note

`frontend/src/middleware.ts` matches `/admin/:path*`, parses auth cookies, and resolves role metadata, but it currently returns `NextResponse.next()` in all observed branches.

Operational consequence:

- route-level preemption is weak;
- effective access control is enforced by the API handlers, `requireBearerUser`, `requireAdmin`, tenant resolution, and enterprise-plan checks;
- this is acceptable for the controlled pilot, but it remains a hardening backlog item.
