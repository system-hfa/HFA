# SERA vNext — Current Living State

> **Single source of truth for the SERA vNext pipeline status.**
> Supersedes all previous closure matrices. Updated as code changes.

## Version
- **Living state version**: 1.0.0
- **Last updated**: 2026-06-09
- **Repository**: `/Users/filipedaumas/SAAS/HFA`
- **Branch**: `main`

## Current Engine
- **Engine version**: `SERA_VNEXT_ENGINE_V02`
- **Runtime**: `runSeraVNextEngineV0` (engine-v0/run-engine.ts → delegates to v02)
- **Methodology version**: `SERA_VNEXT_V0`
- **Canonical tree**: `canonical-tree/sera-pt-v1.ts`
- **Concept language**: `engine-v02/language/concepts.ts` (bilingual PT/EN with negation-aware matching)
- **Guardrails**: `engine-v02/guardrails/compute-guardrails.ts` (9 computed guardrails)

## Active Flow
- **Admin vNext UI**: `/admin/sera-vnext/analyses` — active pilot route
- **Canonical route**: `/api/analyze` with `SERA_VNEXT_CANONICAL_ANALYZE_ENABLED` flag → `createSeraVNextAnalysis`
- **Common flow**: legacy SERA pipeline (not vNext); vNext flag should remain OFF for common users
- **Product Beta**: admin-only, feature-flagged via `NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED`

## Methodology Status
- **Escape point**: computed from factual extraction, scope-limited to pre-consequence
- **Canonical tree**: P/O/A taxonomy, 22 active leaves, all reachable
- **Post-escape**: quarantined (evidence with POST_ESCAPE temporal relation excluded from axis evidence)
- **O-E**: not in tree, not created by engine
- **Actor boundary**: enforced; actor migration triggers guardrail
- **Preconditions**: explicitly marked as non-escape-point, based on candidate codes
- **Final outputs**: blocked (selectedCode=null, releasedCode=null, finalConclusion=null, classifiedOutput=false, readyPromotion=false, downstreamAllowed=false)
- **Human review**: mandatory (`humanReviewRequired: true`)
- **Mode**: CANDIDATE_ONLY (no CLASSIFIED, no READY, no downstream)

## Technical Status

| Dimension | Status |
|---|---|
| Engine technical validation | PASS_WITH_LIMITATIONS |
| Leaf reachability | PASS (22/22 positive + 22/22 negative) |
| Determinism | PASS (1.0) |
| Guardrail enforcement (engine) | PASS (9/9 computed from runtime traces) |
| Guardrail UI | PASS_WITH_LIMITATIONS (GuardrailPanel with human-readable labels) |
| Portuguese language support | PASS_WITH_LIMITATIONS (bilingual lexicon + negation-aware, real recall low) |
| Violation awareness | PASS_WITH_WARNINGS (triad AND-gate with 3-tier detection, natural language gaps remain) |
| Test suite reliability | PASS_WITH_LIMITATIONS |
| Product Beta (admin) | PASS_WITH_LIMITATIONS |
| Canonical user flow | NOT_READY (admin path only) |
| Database / RLS | PASS_WITH_WARNINGS |
| Audit trail | PASS (critical events durable, telemetry best-effort) |
| Risk Profile endpoint | PASS (canonical endpoint, divergent endpoints delegate) |
| Error sanitization | PASS (stable error codes, no raw stack/DB leakage) |
| Security scans | NO_CRITICAL_FINDINGS |
| Common flow vNext | BLOCKED (admin-only; response includes vnextNotice for common UI) |

## Limitations
1. **Naturalistic recall is low** — engine abstains heavily on real narratives that do not contain its concept lexicon (confirmed: NF-06, v03 naturalistic corpus)
2. **Portuguese real-world recall below target** — bilingual lexicon exists but natural PT narratives often abstain
3. **Violation awareness under-detection** — the triad AND-gate is hard to trip on natural language (NF-01)
4. **Common user flow does not render vNext output** — pilot restricted to admin path (NF-03)
5. **Guardrail labels are English code-derived** — human-readable mapping exists but could be improved
6. **Risk Profile scores/heuristics are unvalidated** — labelled as "índice descritivo interno"
7. **Validation corpus shares engine lexicon** — v01/v02 validate determinism and lexical consistency, not real-narrative accuracy

## Readiness
- **Controlled human pilot (admin path)**: GO_WITH_LIMITATIONS
- **Internal beta**: NOT_READY
- **Production**: NOT_READY
- **Scientific validation**: NOT_READY (correctly not claimed)

## Normative Documents (current)
- `docs/sera-vnext/final-remediation/SERA_VNEXT_OPUS_CLOSURE_ACTION_MATRIX.md` — Opus audit action matrix
- `docs/sera-vnext/opus-closure-verification-114b5fc/` — Independent Opus closure verification
- `docs/sera-vnext/engine-v02/` — Engine v02 documentation
- `docs/sera-vnext/final-technical-closure/` — Technical closure package (partial, see action matrix)
- `tests/sera-vnext/engine-validation-v03-naturalistic/` — Independent naturalistic corpus

## Superseded Documents
- `docs/sera-vnext/final-technical-closure/SERA_VNEXT_OPUS_FINDINGS_CLOSURE_MATRIX.md` — stale vs code (marked NF-07); replaced by this living state + action matrix
- `docs/sera-vnext/opus-comprehensive-audit-c4266d0/` — initial Opus audit at `c4266d0`; superseded by `opus-closure-verification-114b5fc/`
- `docs/sera-vnext/product-unification/` — product unification phase; incorporated into current state
