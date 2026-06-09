# SERA vNext — Opus Independent Closure Verification — Executive Summary

- **Model**: Claude Opus 4.8 (maximum effort)
- **Mode**: Independent, read-only audit. No code/doc/DB/flag/deploy/commit changes.
- **Repository**: `/Users/filipedaumas/SAAS/HFA`
- **Branch**: `main`
- **HEAD**: `114b5fc8c1118961738ca1b7fa13cee9558d9906` (matches expected `114b5fc`)
- **origin/main**: `114b5fc8c1118961738ca1b7fa13cee9558d9906` (in sync)
- **Worktree**: clean tracked tree except 7 regenerated report files (timestamps) + a cohort CSV; audit reports created untracked.
- **Commit audited**: `fix(sera-vnext): complete technical closure for independent audit`
- **Commits since `c4266d0`**: `e19f919`, `6cec0c2`, `b9681f2`, `548aa96`, `4c24b28`, `114b5fc` (6)

## Final verdict

**CLOSURE_PARTIALLY_VERIFIED_PILOT_WITH_LIMITATIONS**

The engine v02 corrections are **real in code** and exceed what the team's own closure matrix records. The system is **technically safe for a tightly controlled human pilot via the admin vNext path**, but is **not** ready for the common user flow, for Portuguese production value claims, or for any "AI classifies" / scientific-validation framing.

## Headline findings

1. **The designated closure record is stale.** `final-technical-closure/SERA_VNEXT_OPUS_FINDINGS_CLOSURE_MATRIX.md` (the stated single source of truth) describes the **pre-v02** code for F-03, F-04, F-05, and F-21 — it understates work that was actually completed. The `engine-v02/` docs are accurate to the code on those points but **overstate** Portuguese capability. Neither document alone is a reliable closure record. (Governance finding NF-07.)

2. **Engine is conservative and sound, with low real-world recall.** On 12 independent, naturalistic, pre-registered cases (hash `11cd41ce…`): **0 incorrect codes**, **6/6 correct abstentions**, **3 correct codes**, **3 incorrect abstentions**. Final output was blocked on all 12. The engine never emitted a wrong code, but abstains on naturally-worded narratives that do not contain its concept lexicon.

3. **Reachability is genuinely fixed.** The real engine reaches all 22 active leaves (`run-reachability.ts` exercises `runSeraVNextEngineV0`, 22/22 positive + 22/22 negative). The closure matrix's "8/22 unreachable" is obsolete.

4. **Violation over-attribution is fixed — but now under-attributes.** O-B/O-C require known-rule + explicit awareness + conscious deviation, plus an `awarenessMissingForViolation` guardrail. My continuation-without-awareness case correctly did **not** emit O-B. But two cases with explicit awareness prose abstained — the gate is now hard to trip on natural language.

5. **Guardrails are computed (real), but the UI surface is thin.** All 9 guardrails compute from runtime traces. They appear in the admin vNext UI **only as text "warnings"** (`GUARDRAIL_VIOLATED_*`); there is no dedicated guardrail panel and **no guardrail display in the common analyze flow**. The "Guardrail UI pending" finding remains substantially active.

6. **Validation remains lexicon-aligned.** v02 validation (103 cases) and reachability use narratives authored to match the engine's own concept regexes. PASS proves determinism, bilingual lexical matching, and internal consistency — **not** real-narrative accuracy. F-01/F-02/F-24 persist in substance.

## Readiness snapshot

| Dimension | Status |
|---|---|
| Methodology representation | PASS_WITH_WARNINGS |
| Engine technical validation | PASS_WITH_WARNINGS |
| Portuguese language support | NOT_READY (for value claims) |
| Leaf reachability | PASS |
| Violation awareness | PASS_WITH_WARNINGS (over→under attribution) |
| Guardrail enforcement (engine) | PASS |
| Guardrail UI | NOT_READY |
| Test suite reliability | PASS_WITH_WARNINGS |
| Product Beta (admin) | PASS_WITH_WARNINGS |
| Canonical user flow | NOT_READY |
| Database / RLS | PASS_WITH_WARNINGS |
| Audit trail | PASS_WITH_WARNINGS |
| Risk Profile | PASS_WITH_WARNINGS |
| Company dashboard | PASS_WITH_WARNINGS |
| Frontend | PASS_WITH_WARNINGS |
| Controlled human pilot | PASS_WITH_WARNINGS (admin path only) |
| Internal Beta | NOT_READY |
| Production | NOT_READY |
| Scientific validation | NOT_READY (correctly not claimed) |

## Mandatory corrections before pilot

- **MC-1** Reconcile the closure matrix with actual v02 code (it is materially wrong on F-03/F-04/F-05/F-21). A pilot driven by a false readiness record is a process risk.
- **MC-2** Surface guardrail violations explicitly in the admin review UI (dedicated panel, not buried in a warnings list) so reviewers see what the engine flagged.
- **MC-3** Brief reviewers that the engine **abstains far more than it codes** on real narratives, especially Portuguese, and that abstention is the expected/safe default, not an error.
- **MC-4** Confirm migrations (esp. `20260608210000_sera_vnext_provenance_columns.sql`) are applied in the pilot environment — the canonical route's insert depends on them.

See `SERA_VNEXT_OPUS_PILOT_GO_NO_GO.md` and `SERA_VNEXT_OPUS_FINAL_VERDICT.md`.
