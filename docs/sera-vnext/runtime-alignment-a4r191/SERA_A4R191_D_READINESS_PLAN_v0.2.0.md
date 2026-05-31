# SERA A4R191-D Readiness Plan — Active Enforcement & Adapter Propagation v0.2.0

## Where A4R191-C leaves us
A4R191-C wired `enforceEscapePointScope` into `canonical-traversal.ts` as a single seam,
candidate-only, **passive by default**. In `ENFORCE` mode the traversal already returns
`AXIS_TRAVERSAL_BLOCKED` on blocking verdicts. But:
- The enforcement input (`enforcementMode`, `axisAgentRef`, `axisMomentRef`, `axisEvidenceRefs`,
  `proposedCode`) is **not propagated by `canonical-traversal-adapter.ts`** — the adapter calls
  `runCanonicalAxisTraversal` with explicit fields and never supplies these, so the productive
  pipeline always runs `PASSIVE_COMPAT`. Wiring exists in the function, but no productive caller
  can yet turn it on.
- `author-node-intake-adapter.ts` is unchanged, so the author-node intake flow performs **no real
  enforcement wiring** — it is still A4R190-identical.
- No multi-scope structure, no `EP-B06` topology handling beyond the single-anchor comparison.
- **F-01 HIGH is NOT closed at the integrated-runtime level.**

## Goal of A4R191-D
Gated, explicit go-live of active enforcement across the integrated runtime, and propagation of the
escape-point scope/anchor inputs through the adapter surface so the productive pipeline can actually
request `ENFORCE`. Close F-01 HIGH at the integrated-runtime level.

## Scope of A4R191-D (proposed)
1. **Adapter propagation.** Thread `approvedEscapePointScope` + the five enforcement input fields
   through `canonical-traversal-adapter.ts` into `runCanonicalAxisTraversal`, and through
   `author-node-intake-adapter.ts` for the author intake path, preserving candidate-only locks.
2. **Explicit ENFORCE go-live.** A single, auditable decision point that flips the productive
   default from `PASSIVE_COMPAT` to `ENFORCE` (feature-gated, reversible), with blocking verdicts
   that alter traversal output.
3. **Multi-scope / EP-B06.** Full structure for multiple/sibling escape points and the diffuse
   topology (`siblingEscapePointRefs`, `EP-B06`) beyond the current single-anchor comparison.
4. **F-01 HIGH closure.** Document the integrated-runtime resolution once both adapter paths
   enforce and the go-live decision is recorded.

## Hard invariants carried into D (unchanged from A/B/C)
- Escape point = earliest departure from safe operation; single agent–act/omission–moment anchor.
- P/O/A analyzed at that moment, for that same agent; no agent migration without explicit
  secondary analysis; no post-event consequence/recovery/outcome as basis.
- A-D forbidden for `maintenance_or_org` / `design_mgmt` without explicit physical/ergonomic
  limitation evidence (`EP-B04`).
- Never invent SERA questions; canonical tree only; `O-E` stays `NON_EXISTENT_IN_SERA_PT_V1`;
  "SERA" only. No `P-1`/`O-1`/`A-1` as active methodology.

## Explicit non-goals for A4R191-D (carry forward unless decided otherwise)
- No new SERA questions / canonical-tree change.
- No premature opening of `selectedCode`/`releasedCode`/`finalConclusion` or HFACS/Risk/ERC/ARMS/
  recommendations beyond what the go-live decision explicitly authorizes.
- No source-corpus / fixtures / baseline change without a separate, explicit decision.

## Entry criteria for A4R191-D
- A4R191-C merged/available: canonical-traversal wiring present, 26/26 tests green, `tsc` clean.
- Decision recorded to enable `ENFORCE` in the productive pipeline.

## Exit criteria for A4R191-D
- Adapter(s) propagate scope + enforcement inputs; productive pipeline can run `ENFORCE`.
- Author-node-intake path performs real enforcement wiring.
- Multi-scope / `EP-B06` handled.
- F-01 HIGH documented as **closed at the integrated-runtime level**.
- All tests green; `tsc --noEmit` exit 0; forbidden-content scans clean.

## Risks / watch-items for D
- **Baseline movement on go-live.** Active enforcement will, by design, change outputs for blocked
  scopes — fixtures/baseline updates must be deliberate and reviewed, not silent.
- **Lock leakage when downstream opens.** Any authorized opening of closure/codes must still gate
  every other `*Allowed` field; assert at the adapter boundary.
- **Adapter fan-out.** Multiple `runCanonicalAxisTraversal` call sites in the adapter must all
  receive the same scope/input wiring to avoid mixed passive/enforce states within one analysis.
