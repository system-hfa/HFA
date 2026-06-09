# SERA vNext — Final Remediation Decision

- **Date**: 2026-06-09
- **Model**: DeepSeek V4 Pro (maximum effort)
- **Branch**: `main`
- **Audit basis**: Opus independent closure verification at `114b5fc`
- **Closure record**: `docs/sera-vnext/opus-closure-verification-114b5fc/SERA_VNEXT_OPUS_FINAL_VERDICT.md`

## Decision

**SERA_VNEXT_READY_FOR_CONTROLLED_HUMAN_PILOT_WITH_LIMITATIONS**

The system is technically safe for a tightly controlled human pilot via the admin vNext path (`/admin/sera-vnext/analyses`).

## Rationale

### Why GO
1. Every unsafe failure mode is structurally prevented: final output locked, human review mandatory, engine conservative.
2. 0 incorrect critical codes across all validation suites.
3. All 22 canonical leaves reachable (positive + negative tests).
4. Determinism = 1.0 across re-runs.
5. Guardrails computed from runtime traces (9/9) and visible in dedicated UI panel.
6. Final outputs blocked on all cases (selectedCode=null, releasedCode=null, finalConclusion=null).
7. No O-E in tree, no code-first path, post-escape quarantined.
8. Methodology preserved: escape point, P/O/A taxonomy, actor boundary, preconditions locked.

### Why WITH_LIMITATIONS
1. Naturalistic recall is low — engine abstains heavily on narratives that do not use its concept lexicon.
2. Portuguese real-world recall below 70% target on independent naturalistic corpus.
3. Violation awareness (O-B/O-C) under-detected on natural language expressions.
4. Common user flow cannot render vNext output — pilot restricted to admin path.
5. Validation proves determinism and lexical consistency, not real-narrative accuracy.
6. Risk Profile scores/heuristics are unvalidated and correctly labelled as such.

## What This Is NOT
- NOT internal beta ready
- NOT production ready
- NOT scientifically validated
- NOT human validated
- NOT an "AI classifies" / diagnostic tool

## What This IS
- A deterministic implementation of a documented method (SERA)
- A candidate-only engine that assists human reviewers
- Safe by construction: conservative, locked, provenance-complete
- Ready for controlled pilot use with reviewer-in-the-loop

## Mandatory Pilot Constraints
1. Route: `/admin/sera-vnext/analyses` only (not common user flow)
2. Flag: `SERA_VNEXT_CANONICAL_ANALYZE_ENABLED` OFF for common users
3. Reviewers must be briefed on abstention-as-default, low PT recall, heuristic scores
4. No operational decisions based solely on engine output
5. UNRESOLVED ≠ absence of factor
6. Language failures and abstention reasons must be recorded

## Post-Pilot Audit
Opus will be used again after the pilot to verify: real-world recall data, reviewer feedback, guardrail effectiveness, and whether any limitation can be promoted to resolved.
