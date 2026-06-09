# SERA vNext — Frontend & Company Dashboard Audit (c4266d0)

Scope: `app/(dashboard)/*`, `app/page.tsx` (public), `components/*`, feature-flag gating. UI was reviewed statically (source). Live browser/responsive/hydration testing was **not** performed in this read-only audit.

## Surfaces

- **Public landing** `app/page.tsx`: marketing + methodology explainer.
- **Company dashboard** `app/(dashboard)/dashboard/page.tsx` ('use client'): fetches `/api/org/intelligence`, renders `OrgScoreCard`, `AiInsightPanel`, `TrialUsageCard`, P/O/A code legend (`CODE_INFO`).
- **Risk Profile** `app/(dashboard)/risk-profile/page.tsx`: full profile UI + zero-state/forming banners + PDF export + per-source exclusion.
- **Events** `app/(dashboard)/events/page.tsx`: event list + exclusion toggle (`/api/risk-profile/exclusions`).
- **Events/new** → legacy `/api/analyze` (credit-gated) classification flow.
- **Admin SERA vNext** `app/(dashboard)/admin/sera-vnext/*`: candidate + product-beta analyses/review (admin + flag gated).

## Copy / communication risks (F-12, HIGH)

1. **`risk-profile/page.tsx:1680`** — zero-state step 2: **"A IA classifica os fatores humanos"** / "Percepção, Objetivo e Ação — com justificativa metodológica". This presents the AI as a *classifier* of human factors. It is incompatible with the vNext candidate-only / non-final / human-review-required posture, and it overstates the engine's real capability (mostly UNRESOLVED on PT input, F-05). It refers to the **legacy `/api/analyze`** path, deepening the legacy/vNext confusion (F-07).
2. **`page.tsx:260`** badge **"Metodologia validada"**, and **`page.tsx:984`** "O HFA/SERA foi validado através de análises comparativas, cenários operacionais reais e avaliações de consistência classificatória." These assert validation that does not exist scientifically (F-24); "consistência classificatória" is determinism, not accuracy.
3. **`risk-profile/page.tsx:1688/1699`** — "Com 10 análises, o perfil mostra confiança da base…" and "10 análises gratuitas por empresa": an "organizational profile" framed around n=10 (F-09).

**Counter-balancing (good) copy** on the landing page frames AI as assistive: "usar IA como apoio interpretativo, não como classificador livre" (710), "A IA ajuda a ler o relato, mas a conclusão passa por regras fixas" (806-807), "Uma metodologia de investigação, não uma promessa de automação" (656). The contradiction between this assistive framing and the dashboard's "A IA classifica" is itself a consistency problem to resolve.

## Company dashboard readiness

- **Data is real and tenant-scoped** (risk-profile summary). Numbers should match the Risk Profile page (same `getRiskProfileSummaryForTenant`), but the dashboard uses the **un-audited** `/api/org/intelligence` (F-23) while the Risk Profile page uses `/api/risk-profile`.
- The dashboard **mixes legacy + vNext** sources (inherits F-08) and renders the **arbitrary org score** (F-09) and a P/O/A legend that documents codes (P-C..P-H) the engine cannot currently produce (F-03) — so the legend advertises capabilities not realized for vNext.
- Empty/forming states exist (zero-state, 1–9 "em formação" banner) and `data_confidence` is surfaced — good.
- No cross-tenant leakage path found (all reads tenant-scoped).

## Free analyses / credits / billing

- Trial defaults: `credits_balance: 3` on bootstrap (oauth bootstrap), but UI advertises "10 análises gratuitas por empresa" — **a numeric inconsistency** between provisioning (3) and copy (10) worth reconciling. `/api/analyze` blocks at `< 1` credit (402); enterprise plans bypass. Billing does not interfere with the admin-only vNext pilot (separate flag-gated path).

## Items NOT verified (read-only, no browser)
- Hydration, console errors, responsive/mobile/tablet, dark-mode, font/preload, broken links, accessibility — **NOT_ASSESSED**; recommend a short Playwright/manual pass before pilot (the repo already has Playwright trials for this).

## Frontend verdict

**FRONTEND_READINESS = NOT_READY for public/unsupervised use due to copy (F-12), PASS_WITH_WARNINGS for a controlled admin pilot** once "A IA classifica" and "Metodologia validada" are reworded and the credits/copy numbers reconciled. **COMPANY_DASHBOARD_READINESS = PASS_WITH_WARNINGS**: functional, tenant-safe, real data, but it surfaces the arbitrary score, mixes methodologies, advertises unreachable codes, and reads through the un-audited endpoint.
