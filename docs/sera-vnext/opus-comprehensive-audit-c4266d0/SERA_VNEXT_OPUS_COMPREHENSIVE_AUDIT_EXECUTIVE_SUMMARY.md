# SERA vNext — Independent Comprehensive Opus Audit (c4266d0) — Executive Summary

- **Repository:** /Users/filipedaumas/SAAS/HFA
- **Branch:** main
- **HEAD:** c4266d0d14bc29448b5c093998d4db090787d854 (== origin/main)
- **Commit:** feat(risk-profile): consolidate real analyses with exclusions
- **Worktree (tracked):** clean — no staged or unstaged tracked changes
- **Audit type:** independent, read-only, evidence-based. No product code, migration, database, feature flag, or deploy was modified.

## One-paragraph verdict

The SERA vNext **methodological core is sound and honestly built**: the canonical question tree is a *real, sourced* encoding of the Hendy/Daumas SERA P-O-A model (not invented), the executable engine is *structurally evidence-first* (it walks the tree and lets the landing leaf decide the code — there is no code-first reconstruction), the candidate-only locks are enforced *at three layers* (engine output, application assertion, and database CHECK constraints), tenant isolation holds, RLS is enabled, and event exclusion is a soft ledger that **never deletes evidence**. **None of the hard stop-rule conditions were triggered.** However, the project's *claims* run well ahead of what the code actually does. The "39/39" result is a **boundary/contract-compliance** check, reproduced and deterministic, but it does *not* test classification accuracy: 68% of axis decisions are deliberately left UNRESOLVED, only 7 of 22 canonical codes are ever emitted, 8 codes are structurally unreachable, the expected boundaries are supersets fitted around the engine's own output, and several "guardrail" assertions are vacuous (hardcoded `false`). The P/O/A decision logic is **English-only regex** while the product runs Portuguese narratives, so real product analyses will almost always produce all-null candidate codes — which makes the user-facing copy *"A IA classifica os fatores humanos"* and the public badge *"Metodologia validada"* the most material risks: they overstate both capability and validation status. The system is **ready for a controlled, admin-supervised internal candidate-only pilot**, but **not** for unsupervised production, and **no scientific validation may be claimed**.

## Headline numbers

| Metric | Value |
|---|---|
| Total findings | 26 |
| CRITICAL | 0 |
| HIGH | 7 (F-01, F-02, F-03, F-04, F-05, F-12, F-24) |
| MEDIUM | 9 (F-08, F-09, F-10, F-11, F-13, F-14, F-18, F-22, F-25) |
| LOW | 7 (F-15, F-16, F-17, F-19, F-20, F-21, F-23) |
| INFORMATIONAL | 1 (F-26) plus F-07 (HIGH, needs author decision) |
| Canonical codes ever emitted on the 39-case corpus | 7 of 22 |
| Axis slots returning UNRESOLVED/null (39 cases × 3 axes) | 80 / 117 (68%) |
| 39-case harness | 39/39 PASS, 0 critical, 0 noncritical, 0/39 nondeterministic (reproduced) |
| 176-trial suite composition | ~16 execute the engine; 96 read source as text; 75 file-existence; 20 server/E2E |

## Separated readiness verdicts (no single rolled-up PASS)

| State | Verdict |
|---|---|
| METHODOLOGY_REPRESENTATION | PASS_WITH_WARNINGS |
| ENGINE_VALIDATION | PASS_WITH_WARNINGS |
| TEST_SUITE_RELIABILITY | PASS_WITH_WARNINGS |
| PRODUCT_BETA_READINESS | PASS_WITH_WARNINGS |
| DATABASE_RLS_READINESS | PASS_WITH_WARNINGS |
| FRONTEND_READINESS | NOT_READY (copy/claims) — PASS_WITH_WARNINGS for controlled pilot after copy fix |
| COMPANY_DASHBOARD_READINESS | PASS_WITH_WARNINGS |
| RISK_PROFILE_READINESS | PASS_WITH_WARNINGS |
| CONTROLLED_PILOT_READINESS | PASS_WITH_WARNINGS |
| INTERNAL_BETA_READINESS | NOT_READY until F-05/F-12 addressed |
| PRODUCTION_READINESS | NOT_READY |
| SCIENTIFIC_VALIDATION_STATUS | NOT_READY (no empirical/inter-rater validation) |
| Deploy (Vercel/staging) | NOT_ASSESSED |

## What is genuinely good (do not regress)

1. **Canonical tree is real and traceable** to `SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`, which cites Daumas (offshore SERA dissertation, p.105–111) and Hendy SERA 2003 (Steps 3–4). O-E is explicitly forbidden in code and doc.
2. **Engine is evidence-first**, not code-first: `runEvidenceTraversal` walks roots→nodes→leaf; the code is wherever the walk terminates. No `buildCanonicalPathForLeaf` in the decision flow.
3. **Candidate-only locks are enforced at the database**: CHECK constraints force `selectedCode/releasedCode/finalConclusion` empty and `classified/ready/downstream=false`, version locks, no-final-status regex, append-only triggers on revisions/events, no DELETE grant.
4. **Tenant isolation + admin gating** at both API (`requireAdmin`) and DB (`sera_vnext_beta_can_use`).
5. **Exclusion/restore is safe**: soft ledger, source-existence validation against the tenant's own universe, race-guarded restore, audited — no evidence is ever deleted.
6. **Determinism** of engine output reproduced (0/39 nondeterministic).

## The seven things that most need attention (HIGH)

- **F-05** Engine P/O/A logic is English-only; PT product input yields mostly UNRESOLVED.
- **F-12** "A IA classifica os fatores humanos" / "Metodologia validada" copy overstates capability and validation.
- **F-24** No scientific/empirical validation exists; do not claim it.
- **F-01 / F-02** 39/39 is boundary compliance, not accuracy; expected boundaries fitted to engine output.
- **F-03** 8 of 22 codes structurally unreachable.
- **F-04** Objective-axis violation over-attribution (continuation → O-B without awareness).
- **F-07** The live user classifier is the legacy `/api/analyze` path, not the frozen vNext engine (author decision required).

See `SERA_VNEXT_OPUS_FINAL_VERDICT.md`, `SERA_VNEXT_OPUS_PRIORITY_REMEDIATION_PLAN.md`, and the per-domain reports for detail. All findings carry verifiable file:line evidence in `SERA_VNEXT_OPUS_COMPREHENSIVE_FINDINGS_REGISTER.csv`.
