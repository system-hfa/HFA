# SERA vNext — Technical Debt & Simplification Plan (c4266d0)

No code is changed in this phase; this is a consolidation proposal.

## Dead / duplicated code

| Item | Evidence | Proposal |
|---|---|---|
| `engine.ts` (`analyzeSeraVNext`) + legacy steps 01,06,07,08,09,10,11 | Product/runtime use `runSeraVNextEngineV0`; `analyzeSeraVNext` only re-exported in `index.ts` and used by old trials (F-15) | Mark deprecated, then remove; keep only legacy steps 02–05 reused by engine-v0 (or inline them into engine-v0) |
| `/api/org/intelligence` vs `/api/risk-profile` | Both call `getRiskProfileSummaryForTenant`; org/intelligence lacks audit (F-13) | Keep one canonical endpoint; redirect/remove the other; ensure audit logging |
| `/api/analyses/risk-profile` (legacy-only) | Queries `analyses` directly; no vNext/exclusions; diverges (F-13) | Retire; repoint any client to the consolidated endpoint |
| Synthesized tree metadata | `inferEvidenceRequired/inferProhibitedInferences` (F-16) | Source from asset doc or relabel as engine-generated |
| Vacuous guardrail flags | hardcoded `false` in 10-assurance.ts (F-06) | Compute them, or remove flags + the tests that assert them |

## Tests

| Item | Evidence | Proposal |
|---|---|---|
| 176 trials dominated by static guards | ~96 readFileSync text-greps, 75 existsSync, ~16 behavioral (F-11) | Split reporting into behavioral / static-guard / doc-existence; keep one canonical guard per invariant |
| Superseded A4R freeze/readiness trials | Many point-in-time snapshots overlap | Retire superseded snapshots; keep the latest canonical gate per concern |
| Soft-skip in security E2E | try/catch around blocked-tenant session (F-22) | Hard-fail when negative-path preconditions can't be met |
| Versioned generated reports | `engine-validation-v01/reports/*` committed | Move to CI artifacts or `.gitignore`; stop versioning generated output |
| Magic-link / server-dependent trials | 20 trials need a live server + magic link | Stabilize harness; document required env; reduce retries that mask failures |

## Docs

| Item | Evidence | Proposal |
|---|---|---|
| 1,287 markdown files | `find docs/sera-vnext -name '*.md'` (F-25) | Collapse to the living-state set in the Governance report; archive A4R microphase docs under `archive/` |
| Readiness/validation overclaims spread across phase docs | Claims matrix | Centralize claims in `STATE.md` with evidence citations |

## Worktree / repo hygiene

| Item | Evidence | Proposal |
|---|---|---|
| Untracked Playwright artifacts (`.playwright-cli/`, `output/playwright/...`) | git status | Add to `.gitignore`; clean periodically |
| `tmp/`, `tsconfig.tsbuildinfo`, `supabase/.temp/*` untracked | git status | Ensure ignored; this audit's `tmp/audit-*.ts` are disposable |
| `docs/.../a4r111-recovered-pool-txt/*.txt` large source corpus | git status untracked | Decide on a corpus storage policy (LFS or external) |

## Environment drift / runtime

| Item | Evidence | Proposal |
|---|---|---|
| Server vs `NEXT_PUBLIC_` flag pairs | feature-flags.ts + constants.ts | Document required pairs; add a server-rendered guard so UI never shows a 404 surface |
| Migration history vs live schema | Not verifiable here (F-26) | Verify applied migrations and drift before pilot |

## Consolidation principle

Prefer **one** of each: one canonical engine (engine-v0), one risk endpoint, one canonical guard per invariant, one living-state doc set. The current overlap (two engines, three risk endpoints, 1,287 docs, 176 trials) is the main maintainability risk — not correctness.
