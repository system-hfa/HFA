# SERA A4R191-C Readiness Plan — Controlled Wiring of Escape-Point Enforcement v0.2.0

## Where A4R191-B leaves us
A4R191-B delivered a **pure, deterministic, candidate-only** enforcement module
(`frontend/src/lib/sera-vnext/escape-point-enforcement.ts`, `enforceEscapePointScope`) built on the
A4R191-A type contract. As of A4R191-B:
- The module is **not wired** into the productive runtime. Nothing in `canonical-traversal`,
  `canonical-traversal-adapter`, `author-node-intake-adapter`, `engine`, `steps/**`, UI, API, or DB
  calls it.
- No P/O/A closure, no `selectedCode` / `releasedCode` / `finalConclusion`, no HFACS / Risk / ERC /
  ARMS / recommendations are produced. Every output carries candidate-only locks.
- The only tracked source change was `types.ts` (+2 enum members for `EP-B04`).
- **`F-01 HIGH` is NOT yet resolved at the integrated-runtime level.** B only adds a callable module;
  the runtime still does not enforce the escape-point scope.

## Goal of A4R191-C
Perform a **controlled wiring** of `enforceEscapePointScope` into `canonical-traversal` (and only the
adapter surface strictly required) under **passive compatibility**, so the runtime can begin consulting
the enforcement verdict **without** changing any externally observable behavior, closing P/O/A, or
emitting classifications. F-01 moves from "module exists" toward "runtime consults the module", but
full enforcement (active blocking that alters traversal output) remains gated behind an explicit,
later go-live decision.

## Hard invariants carried into C (unchanged from A/B)
- Escape point = earliest departure from safe operation while control was still possible; a single
  **agent–act/omission–moment anchor** per analysis.
- P/O/A is analyzed **at that moment, for that same agent** — never on later consequence, recovery,
  outcome, impact, or another agent's operational response.
- **No agent migration** without an explicit secondary analysis.
- A-D is **forbidden** for `maintenance_or_org` / `design_mgmt` agents unless explicit
  physical/ergonomic limitation evidence of that same agent exists (`EP-B04`).
- Never invent SERA questions; use only canonical `nodeId` / `exactQuestionText`. `O-E` stays
  `NON_EXISTENT_IN_SERA_PT_V1`. Use **"SERA"** only (never "CERA").
- No `P-1` / `O-1` / `A-1` per-axis questioning as active methodology.

## Scope of A4R191-C (proposed)
1. **Passive consult, not enforce.** Wire the call in `PASSIVE_COMPAT` mode by default. The traversal
   reads the `EscapePointEnforcementResult` and records it in a trace/diagnostic channel
   (alongside the existing `enforcementStatus: 'PASSIVE_NOT_ENFORCED'` runtime context trace) **without**
   gating any node, code, or closure on it.
2. **Compatibility-preserving.** When no `escapePointAnchor` exists (legacy scopes), the consult must
   resolve to `ESCAPE_POINT_PASSIVE_NOT_ENFORCED` + `EP-W05` and leave traversal output bit-identical
   to A4R190 behavior. Existing fixtures and baseline must not move.
3. **Single integration seam.** Introduce the call at one well-defined point in `canonical-traversal`
   (or a thin adapter helper) rather than scattering checks. Keep the enforcement module pure; the
   seam only maps traversal state → `EscapePointEnforcementInput` and stores the result.
4. **Locks preserved end-to-end.** The wired path must keep `selectedCodeAllowed=false`,
   `releasedCodeAllowed=false`, `poaClosureAllowed=false`, `classificationAllowed=false`,
   `downstreamAllowed=false`, `finalConclusionAllowed=false`, `notFinalClassification=true`. Reuse the
   adapter's `withCandidateOnlyLocks` / `assertAdapterOutputLocks` so the consult cannot leak an active
   classification.
5. **Observability.** Surface the enforcement status/issues/warnings in the runtime context trace for
   later analysis, but not in any user-facing classification field.

## Explicit non-goals for A4R191-C
- **No `ENFORCE` go-live.** Active blocking that changes traversal output is deferred to A4R191-D and
  requires a separate decision.
- No UI/API surfacing of enforcement verdicts to end users.
- No DB/migration, no Supabase change, no fixture/baseline/source-corpus change.
- No P/O/A closure, no `selectedCode` / `releasedCode` / `finalConclusion`, no HFACS / Risk / ERC /
  ARMS / recommendations.
- No new SERA questions, no canonical-tree or canonical-question change.
- No agent migration logic beyond the existing anchor comparison.

## Entry criteria for A4R191-C
- A4R191-B merged/available: pure module + tests green, `tsc` clean.
- `escape-point-enforcement.ts` and `escape-point-scope.ts` are the sole enforcement sources.
- Trace channel in `canonical-traversal` confirmed as the integration point (it already exposes
  `enforcementStatus: 'PASSIVE_NOT_ENFORCED'`).

## Exit criteria for A4R191-C
- Traversal consults `enforceEscapePointScope` in `PASSIVE_COMPAT`; result recorded in trace.
- All existing `tests/sera-vnext/*.ts` pass; new wiring trial proves passive consult does not change
  classification, codes, or closure, and that legacy (no-anchor) scopes stay passive.
- `cd frontend && npx tsc --noEmit` exit 0; `git diff --check` clean.
- Fixtures, baseline, source-corpus, supabase untouched.
- Forbidden-content scans clean (no `CERA`; no `*Allowed = true`; no bare `selectedCode` /
  `releasedCode` / `finalConclusion` output; no `HFACS` / `ARMS` / `ERC` / `recommendations`;
  no `P-1` / `O-1` / `A-1` as active methodology).
- Documented status of **F-01**: "runtime consults enforcement in passive mode" — still **not** fully
  resolved (active enforcement pending A4R191-D).

## Risks / watch-items for C
- **Silent baseline drift.** Any accidental gating in passive mode would move fixtures/baseline — guard
  with a wiring trial that asserts output equality with/without the consult.
- **Field/spec mismatch carried from B.** The module reads `operationalMoment.description` (A4R191-A
  contract) where some prose says "statement"; C must map traversal state using the contract field,
  not the prose label.
- **Lock leakage at the seam.** The consult must not introduce any active-classification field; assert
  locks at the adapter boundary.
- **Over-wiring.** Resist touching `engine`, `steps/**`, `code-release`, `semantic-consistency`,
  `preconditions` beyond the single consult seam.

## Hand-off to A4R191-D (active enforcement, later)
A4R191-D — gated, explicit go-live of `ENFORCE` mode (blocking verdicts alter traversal), full
multi-scope / `EP-B06` structure, and the formal closure of **F-01 HIGH** at the integrated-runtime
level. Not in C scope.
