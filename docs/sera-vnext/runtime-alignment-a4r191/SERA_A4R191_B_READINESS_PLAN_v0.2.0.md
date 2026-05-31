# SERA A4R191-B Readiness Plan v0.2.0

## Context
A4R191-A delivered the escape-point **type contract** and a pure normalization function, but
**enforcement remains passive/candidate-only**. A4R191-B is the first phase allowed to *consume* the
normalized result — still without opening any final P/O/A output.

## What A4R191-A leaves ready for B
- Expressive `ApprovedEscapePointScope` with optional `escapePointAnchor` (agent / act-or-omission /
  operational moment / topology / zone boundary).
- Pure `normalizeApprovedEscapePointScope(...)` producing `SeraVNextEscapePointStatusMappingResult`
  with `anchorReadiness`, `readyForFutureEnforcement`, and non-blocking diagnostic issues.
- Reconciled status vocabulary (`DEFINED/APPROVED/PASSIVE_NOT_ENFORCED`).

## A4R191-B objective (proposed)
Wire the normalizer into the **runtime context trace** (read-only), so traversal *reports* anchor
readiness and diagnostics, **still without blocking** any node or emitting any code. This is the
"observe before enforce" step.

## Entry criteria for A4R191-B
1. A4R191-A merged on `main` and independently reviewed.
2. Agreement on which producer becomes the single source of the normalized status
   (candidate: have `canonical-traversal` and `author-node-intake` call the normalizer instead of
   their hard-coded `PASSIVE_NOT_ENFORCED` literal).
3. Confirmed test fixtures for each topology (discrete / progressive / diffuse) and for legacy/absent.

## A4R191-B scope (proposed, still passive)
- Allowed: read-only consumption of `normalizeApprovedEscapePointScope` inside the runtime context
  trace; surfacing `anchorReadiness` + diagnostics in trace output; dedicated tests.
- Forbidden: blocking traversal, productive gate, `selectedCode`, `releasedCode`, `CLASSIFIED`,
  `finalConclusion`, downstream, migrations, canonical-tree/question changes.

## Phased path to real enforcement (B → E)
- **B** — Observe: normalizer wired read-only into trace; no behavior change.
- **C** — Calibrate: define deterministic failure semantics for non-ready scopes (still dry-run).
- **D** — Gate (guarded): block only when an explicit enforcement flag is set; default stays passive.
- **E** — Enforce: escape-point compliance becomes a hard precondition for the P/O/A candidate
  anchor, with independent review before any productive wiring.

## Risks to watch
- Two independent `PASSIVE_NOT_ENFORCED` literals (traversal + intake) must be unified before any
  gate, or status drift becomes possible.
- Progressive/diffuse handling must not silently coerce to discrete during future enforcement.
- Enforcement must remain anchored to the escape-point **moment**, never to later consequences.

## Recommended model for A4R191-B
Opus (high effort) — first consumption of the contract by runtime trace carries methodological risk
(agent–act–moment fidelity) that benefits from the stronger model. Sonnet is acceptable only for
mechanical follow-ups after the design is fixed.
