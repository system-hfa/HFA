# SERA Escape-Point Enforcement Pure Module — A4R191-B v0.2.0

## Scope of this phase
A4R191-B delivers a **pure, deterministic, candidate-only** enforcement module for the safe-operation
escape point, built on the A4R191-A type contract. It is **not wired** into the productive traversal,
adapters, engine, UI, API, or DB. No P/O/A closure, no `selectedCode`, `releasedCode`,
`finalConclusion`, HFACS, Risk/ERC, ARMS, or recommendations are produced. Wiring into
`canonical-traversal` (with passive compatibility) is deferred to A4R191-C/D.

`F-01 HIGH` is **not yet resolved at the integrated-runtime level** — this phase only adds the pure
module that a later phase can call.

## Methodological basis (Hendy / Daumas, distilled in `docs/SERA_SAFE_OPERATION_ESCAPE_POINT_v0.1.md`)
- The escape point is the **earliest** moment of departure from safe operation while operational
  control was still possible — an observable unsafe **act/omission** (or unsafe condition) that marks
  the rupture of the safe-operation barrier.
- It is an **agent–act/omission–moment anchor**, single per analysis.
- P/O/A must be analyzed **at that moment, for that same agent** — never on later consequences,
  recovery, impact, outcome, or another agent's operational response.
- Active failure vs. preconditions are kept distinct; the MDC is the ideal timeline source but is not
  available to automatic runtime, so enforcement here is deterministic and ref-based, not timeline-derived.

## Module
`frontend/src/lib/sera-vnext/escape-point-enforcement.ts` —
`enforceEscapePointScope(input): EscapePointEnforcementResult`. Pure, no side effects, no I/O.

### Input (`EscapePointEnforcementInput`)
`scope`, `axis`, `enforcementMode?` (`PASSIVE_COMPAT` default | `ENFORCE`), `axisAgentRef?`,
`axisEvidenceRefs?`, `axisMomentRef?`, `proposedCode?` (`CanonicalSeraLeafCode | null`),
`analysisContext?`, `siblingEscapePointRefs?`.

### Statuses (`EscapePointEnforcementStatus`)
`ESCAPE_POINT_ENFORCED_OK`, `ESCAPE_POINT_PASSIVE_NOT_ENFORCED`,
`ESCAPE_POINT_BLOCKED_SCOPE_ABSENT`, `ESCAPE_POINT_BLOCKED_SCOPE_INVALID`,
`ESCAPE_POINT_BLOCKED_AGENT_MIGRATION`, `ESCAPE_POINT_BLOCKED_POST_EVENT_ANALYSIS`,
`ESCAPE_POINT_BLOCKED_CONSEQUENCE_AS_BASIS`, `ESCAPE_POINT_BLOCKED_FORBIDDEN_CODE_FOR_AGENT`,
`ESCAPE_POINT_BLOCKED_DIFFUSE_REQUIRES_SPLIT`, `ESCAPE_POINT_BLOCKED_MULTIPLE_POINTS`.

### Blocking issues
`EP-B01_AGENT_MIGRATION`, `EP-B02_POST_EVENT_ANALYSIS`, `EP-B03_CONSEQUENCE_AS_BASIS`,
`EP-B04_FORBIDDEN_CODE_FOR_AGENT`, `EP-B05_DIFFUSE_REQUIRES_SPLIT`, `EP-B06_MULTIPLE_POINTS`,
`EP-B07_SCOPE_INVALID`, `EP-B08_SCOPE_ABSENT`.

### Warnings
`EP-W01_PROGRESSIVE_ZONE_EARLIEST_CONTROLLABLE_REF_REQUIRED`,
`EP-W02_UNKNOWN_AGENT_CONSERVATIVE_REVIEW`, `EP-W03_AXIS_EVIDENCE_BOUNDARY_WEAK`,
`EP-W04_SECONDARY_ANALYSIS_REQUIRED_FOR_OTHER_AGENT_RESPONSE`,
`EP-W05_PASSIVE_NOT_ENFORCED_COMPAT_MODE`.

## Enforcement rules
1. **Scope absent** — `ENFORCE`: `EP-B08` block; `PASSIVE_COMPAT`: `ESCAPE_POINT_PASSIVE_NOT_ENFORCED`
   with `EP-W05`. Never `ENFORCED_OK`; locks stay candidate-only.
2. **Explicitly passive scope** (`status === 'PASSIVE_NOT_ENFORCED'` or
   `enforcementMode === 'PASSIVE_CANDIDATE_ONLY'`) **or** non-enforcing caller — always
   `ESCAPE_POINT_PASSIVE_NOT_ENFORCED` + `EP-W05`. Never blocks, never `OK`. This is the A4R190
   compatibility path that keeps future traversal unbroken.
3. **Legacy scope without anchor** in `ENFORCE` (active status) — `EP-B07_SCOPE_INVALID`.
4. **Multiple points** (`siblingEscapePointRefs` non-empty) — `EP-B06`.
5. **DISCRETE** — requires `agentId`, `unsafeActOrOmission.statement`,
   `operationalMoment.description` (the field the spec calls "statement"), and boundary evidence
   (scope- or anchor-level). Missing → `EP-B07`. Then agent/moment/consequence/code checks below.
6. **PROGRESSIVE_ZONE** — requires `zoneBoundary.earliestControllableRef` **and**
   `latestControllableRef`. Complete → enforce using `earliestControllableRef` as the moment anchor,
   with `EP-W01`. Incomplete → `EP-B07`.
7. **DIFFUSE** — `EP-B05`; `nextRequiredAction` instructs decomposition into discrete points and a
   secondary analysis where needed.
8. **Agent migration** — `axisAgentRef` present and ≠ `anchor.agentId` → `EP-B01`.
9. **Post-event** — `axisMomentRef` after the anchor moment (numeric sequence compare, or post-event
   time markers) → `EP-B02`.
10. **Consequence as basis** — `axisEvidenceRefs` contain consequence/recovery/outcome markers →
    `EP-B03`.
11. **Forbidden code** — `agentKind ∈ {maintenance_or_org, design_mgmt}` and `proposedCode === 'A-D'`
    → `EP-B04`, **unless** explicit physical/ergonomic limitation evidence of that agent is present.
12. **O-E / non-canonical proposed code** — `O-E` remains `NON_EXISTENT_IN_SERA_PT_V1`; any
    non-canonical `proposedCode` blocks with `EP-B07` and a diagnostic. O-E is never an active code.

## Candidate-only locks (every output)
`selectedCodeAllowed=false`, `releasedCodeAllowed=false`, `poaClosureAllowed=false`,
`classificationAllowed=false`, `downstreamAllowed=false`, `finalConclusionAllowed=false`,
`notFinalClassification=true`. The result carries **no** `selectedCode`, `releasedCode`,
`finalConclusion`, HFACS, Risk/ERC, ARMS, or recommendations fields, and status is never `CLASSIFIED`.

## Type-contract change
`SeraVNextEscapePointAgentKind` was extended additively with `maintenance_or_org` and `design_mgmt`
(indispensable for `EP-B04`). No existing member removed; A4R191-A test unaffected.

## Non-goals (A4R191-B)
No traversal/adapter/engine wiring; no productive integration; no migration; no fixture/baseline/
source-corpus/supabase change; no canonical-tree or canonical-question change; no new SERA questions.
