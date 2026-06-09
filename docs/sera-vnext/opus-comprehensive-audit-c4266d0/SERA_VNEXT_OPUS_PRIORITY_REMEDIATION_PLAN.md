# SERA vNext — Priority Remediation Plan (c4266d0)

Four packages, not microphases. Each lists objective, findings covered, likely files, validations, risks, completion criteria, dependencies, and whether an author decision is required.

---

## PACKAGE 1 — Critical methodology & communication corrections
**Objective:** stop the system from *claiming* more than it does and from mis-attributing violations; make capability honest before any human sees output.

- **Findings:** F-04 (O over-attribution), F-05 (PT classification), F-12 (copy), F-24 (validation claim), F-06 (vacuous guardrails).
- **Likely files:** `canonical-tree/evaluate-node.ts`; `app/(dashboard)/risk-profile/page.tsx` (~1680); `app/page.tsx` (260, 984); `engine-v0/steps/10-assurance.ts`; methodology docs / `STATE.md`.
- **Work:**
  1. Reword "A IA classifica os fatores humanos" → assistive/candidate framing; remove/qualify "Metodologia validada" and the "validado através de…" paragraph.
  2. Require explicit awareness/conscious-deviation evidence before O-B/O-C; otherwise UNRESOLVED.
  3. Add Portuguese lexical patterns (or language-agnostic extraction) to axis decisions; OR gate PT inputs with an explicit "classification limited" notice until done.
  4. Compute the guardrail flags (or delete them and dependent assertions).
- **Validations:** re-run `engine-validation-v01` (expect changes; update expected deliberately and document); add PT behavioral cases; add an O-without-awareness negative case that must NOT yield O-B.
- **Risks:** changing decision logic shifts the 39-case outputs and forces honest expected updates; do not re-fit expected to new output silently.
- **Completion criteria:** no public "validated" claim; PT input produces a meaningful candidate or an explicit limitation; O-B requires awareness evidence; guardrails are computed or gone.
- **Dependencies:** none. **Author decision required:** YES (methodology wording for violation rule; validation language).

---

## PACKAGE 2 — Product / data / frontend correctness
**Objective:** make the user-facing data path coherent and tenant-safe end to end.

- **Findings:** F-07 (legacy vs vNext live path), F-08 (methodology mixing), F-09 (aggregate claims), F-10 (ERC heuristic), F-13 (3 endpoints), F-14 (error leak), F-23 (un-audited endpoint), credits/copy mismatch (3 vs 10).
- **Likely files:** `lib/risk-profile/server.ts`, `erc.ts`; `app/api/risk-profile/*`, `app/api/org/intelligence/*`, `app/api/analyses/risk-profile/*`; `app/(dashboard)/dashboard/page.tsx`; `app/api/analyze/route.ts`; credits/bootstrap.
- **Work:**
  1. Decide the canonical user engine (legacy `/api/analyze` vs vNext) and align its non-final posture/copy.
  2. Tag sources with methodology version; separate or document legacy/vNext pooling.
  3. Temper score/pattern/trend/ERC: document or replace the score formula; add thresholds; foreground `data_confidence`; relabel ERC as heuristic or validate the ARMS mapping.
  4. Consolidate to one audited risk endpoint; retire `/api/analyses/risk-profile`; route dashboard through it.
  5. Return generic 500 + request_id from risk endpoints; reconcile credits copy (3 vs 10).
- **Validations:** parity test that dashboard and risk-profile numbers match; tenant-isolation test; error-shape test (no raw message).
- **Risks:** changing the canonical engine is a product decision with UX impact.
- **Completion criteria:** one risk endpoint, audited; no raw error leak; aggregate labels match method; legacy/vNext provenance explicit.
- **Dependencies:** Package 1 wording. **Author decision required:** YES (canonical engine; score methodology).

---

## PACKAGE 3 — Test & documentation simplification
**Objective:** make pass-counts mean something and make state discoverable.

- **Findings:** F-11 (static-guard dominance), F-22 (soft-skip), F-15 (dead code), F-16 (synthesized metadata), F-25 (docs sprawl), versioned generated reports.
- **Likely files:** `tests/sera-vnext/*`, `engine-validation-v01/reports/*`, `lib/sera-vnext/engine.ts` + `steps/`, `canonical-tree/sera-pt-v1.ts`, `docs/sera-vnext/*`.
- **Work:**
  1. Split test reporting into behavioral / static-guard / doc-existence; retire superseded A4R freeze trials; hard-fail security E2E on setup failure.
  2. Remove dead `engine.ts` pipeline (keep reused legacy steps).
  3. Source or relabel tree metadata.
  4. Collapse docs to the living-state set; archive the rest; stop versioning generated reports.
- **Validations:** behavioral test count reported separately; CI green; docs index resolves.
- **Risks:** removing dead code may break old trials that import it — update/retire them together.
- **Completion criteria:** headline coverage reflects behavioral tests; one engine; `STATE.md` is authoritative.
- **Dependencies:** Package 1/2 land first to avoid churn. **Author decision required:** NO (engineering hygiene), except doc-archive scope.

---

## PACKAGE 4 — Pilot & release readiness
**Objective:** safely run a controlled human pilot and gate production.

- **Findings:** F-26 (deploy/env unverified), flag-pair risk, F-19/F-20 (DB defense-in-depth), rate limiting, magic-link.
- **Likely files:** `supabase/migrations/*` (new defense-in-depth migration — author-approved), flag docs/runbook, CI guards.
- **Work:**
  1. Verify deployed commit, applied migrations, live flag values; confirm no service-role key in client bundle.
  2. Document/enforce flag pairs; add server-rendered guard.
  3. (Defense-in-depth, optional) add admin role to exclusion RLS; pin `search_path` on beta helpers; add rate limiting on create/analyze; confirm magic-link expiry/single-use.
  4. Run a short Playwright/manual UI pass (hydration, console, responsive, a11y) before pilot.
- **Validations:** pilot checklist green; cross-tenant negative test hard-fails on bypass; load/error tests.
- **Risks:** new migrations must not alter existing data; author approval required for any DB change.
- **Completion criteria:** controlled pilot runbook complete; production stays gated until Packages 1–2 done.
- **Dependencies:** Packages 1–2. **Author decision required:** YES (any migration/deploy/flag change).

---

## Sequencing
Package 1 → Package 2 → Package 3 (hygiene, can overlap) → Package 4 (gating). Production remains NOT_READY until Packages 1 and 2 are complete; no scientific-validation claim until an empirical study exists.
