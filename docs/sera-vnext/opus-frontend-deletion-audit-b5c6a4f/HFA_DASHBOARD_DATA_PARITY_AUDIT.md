# HFA/SERA — Dashboard Data Parity Audit

The dashboard, events list, risk profile and admin overview each draw from **different source universes**. This report documents the divergences. No arbitrary tolerance is accepted.

## Source-of-truth per surface

| Surface | Endpoint | Universe | Notes |
|---|---|---|---|
| Dashboard (`/dashboard`) | `/api/risk-profile` | legacy events **+** vNext analyses (unified, compatible rows) | counts `total_events`, `included_events`, `excluded_events`, `modal_erc_level` |
| Risk Profile (`/risk-profile`) | `/api/risk-profile` | same as dashboard | identical computation (`getRiskProfileSummaryForTenant`) |
| Events list (`/events`) | `/api/events` | legacy events **only** | vNext analyses never appear here |
| Admin overview (`/admin`) | `/api/admin/stats` | legacy `analyses` table count only | excludes vNext entirely |
| Executive report (`/reports/executive`) | none (DEMO) | fictitious | not real data at all |

## Parity matrix

| metric | dashboard | events | risk_profile | database (canonical) | expected_relation | difference | verdict |
|---|---|---|---|---|---|---|---|
| Total events/sources | `total_events` = legacy events + compatible vNext | count of legacy events rows | `total_events` (= dashboard) | `count(events) + count(sera_vnext_analyses with P/O/A or preconditions, not deleted)` | dashboard = risk_profile ≥ events | **events under-counts by #vNext** | DIVERGENT (by design, unlabeled) |
| Considered in profile | `included_events` (completed, not excluded) | n/a (no such metric) | `included_events` | completed legacy + `HUMAN_REVIEW_COMPLETED_NON_FINAL` vNext, minus exclusions | dashboard = risk_profile | match | CONSISTENT |
| Excluded | `excluded_events` | badge per-row only | `excluded_events` | active `risk_profile_exclusions` matching a live source | dashboard = risk_profile | match | CONSISTENT |
| Analyses count | (not shown) | n/a | `total_analyses` = included_events | — | — | — | CONSISTENT internally |
| Admin total_analyses | n/a | n/a | n/a | `/api/admin/stats` counts legacy `analyses` only | should include vNext for platform totals | **excludes vNext** | DIVERGENT (F-009) |
| ERC predominante | `modal_erc_level` | per-row ARMS-ERC badge (client computed) | `modal_erc_level` | derived from included sources | events badge uses a *different* client formula than profile | possible per-row label mismatch | MINOR DIVERGENCE |
| Executive metrics | n/a | n/a | n/a | DEMO constants | should mirror risk_profile | **entirely fictitious** | DIVERGENT (F-006) |

## Detailed divergences

### D-1 — Events list excludes vNext (MEDIUM, F-008)
`/api/events` queries `events` only. Dashboard's "Universo canônico" includes compatible `sera_vnext_analyses`. With any vNext analysis present, **Dashboard total > Events list total**, with no label explaining the gap. Two honest fixes: (a) surface vNext analyses in the events experience, or (b) relabel dashboard counts to clarify the two scopes.

### D-2 — Per-event ERC badge formula differs from profile (MINOR)
`events/page.tsx` and `events/[id]/page.tsx` compute an ARMS-ERC badge with local tables (`ARMS_SEV_ROW`, `ARMS_ERC`, `barrierLevel`). The risk profile uses `computeHfaErcCategoryFromCodes`/`describeHfaErcCategory` in `lib/risk-profile/erc`. These are **two independent implementations**; they can label the same analysis differently. Single source of truth needed.

### D-3 — Admin stats ignore vNext (LOW, F-009)
`/api/admin/stats` `total_analyses` = `count(analyses)`. Platform-level reporting under-counts by the entire vNext corpus.

### D-4 — Executive report is demo-only (HIGH, F-006)
`/reports/executive` renders from `lib/demo/hfa-demo-data`. Numbers shown (analyses, candidates, open actions, trend) are fictitious and unrelated to the tenant. This is the single largest parity break.

## Verdict
**DASHBOARD_READINESS = PASS_WITH_WARNINGS.** The dashboard itself is wired to real unified data and is internally consistent with the Risk Profile page. The parity failures are (1) the events list / dashboard universe mismatch, (2) admin stats omitting vNext, (3) the executive report being demo-only, and (4) duplicated ERC math. None corrupt the dashboard's own figures, but all will confuse operators comparing screens.
