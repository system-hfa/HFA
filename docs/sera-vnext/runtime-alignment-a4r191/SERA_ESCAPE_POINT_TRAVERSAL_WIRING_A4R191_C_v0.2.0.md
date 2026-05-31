# SERA A4R191-C — Escape-Point Enforcement Wiring into Canonical Traversal v0.2.0

## Purpose
A4R191-C performs the **first controlled wiring** of the pure module
`escape-point-enforcement.ts` (`enforceEscapePointScope`) into the productive traversal
`frontend/src/lib/sera-vnext/canonical-traversal.ts`. The wiring is **candidate-only** and
defaults to **passive compatibility**, so A4R190 behavior is bit-identical unless an explicit
`ENFORCE` mode is requested. No UI/API/DB integration, no P/O/A closure, no downstream opening.

## What changed (single tracked source file)
`frontend/src/lib/sera-vnext/canonical-traversal.ts` only (+149 / −16). No other tracked file
was modified. A new untracked test was added (see below).

### 1. Imports (additive)
`enforceEscapePointScope` plus the enforcement types
(`EscapePointEnforcementMode`, `EscapePointEnforcementResult`, `EscapePointEnforcementStatus`,
`EscapePointEnforcementBlockingIssueCode`, `EscapePointEnforcementWarningCode`) and
`SeraVNextEscapePointAnchorReadiness`.

### 2. Trace contract evolved from a hardcoded literal to a real result
Before A4R191-C the runtime context trace carried a fixed literal
`enforcementStatus: 'PASSIVE_NOT_ENFORCED'`. That literal is **replaced** by a real enforcement
result mapped into the trace:

```ts
export type CanonicalTraversalEnforcementTraceStatus =
  | 'PASSIVE_NOT_ENFORCED'            // only when no enforcement was computed (enforcement === null)
  | EscapePointEnforcementStatus       // real status returned by enforceEscapePointScope

export interface CanonicalTraversalRuntimeContextTrace {
  approvedEscapePointScopeStatus: ApprovedEscapePointScope['status'] | null
  approvedEscapePointScopeId: string | null
  enforcementStatus: CanonicalTraversalEnforcementTraceStatus
  enforcementMode: EscapePointEnforcementMode
  enforcementBlockingIssues: EscapePointEnforcementBlockingIssueCode[]
  enforcementWarnings: EscapePointEnforcementWarningCode[]
  anchorReadiness: SeraVNextEscapePointAnchorReadiness | null
}
```

`baseStepOutput` now receives `enforcement: EscapePointEnforcementResult | null` and maps it:
`enforcementStatus = enforcement ? enforcement.status : 'PASSIVE_NOT_ENFORCED'`,
`enforcementMode = enforcement ? enforcement.enforcementMode : 'PASSIVE_COMPAT'`,
blocking issues / warnings copied (spread), `anchorReadiness` forwarded. The hardcoded passive
status now survives **only** as the null fallback; every real path emits the module's actual verdict.

### 3. Additive enforcement input on both traversal entry points
```ts
export interface CanonicalTraversalEscapePointEnforcementInput {
  enforcementMode?: EscapePointEnforcementMode   // default PASSIVE_COMPAT in the module
  axisAgentRef?: string | null
  axisMomentRef?: string | null
  axisEvidenceRefs?: string[]
  proposedCode?: CanonicalSeraLeafCode | null
}
```
`CanonicalTraversalAdvanceInput` and `CanonicalAxisTraversalRunInput` both `extend` it, so all
fields are optional and backward-compatible. Existing callers (including
`canonical-traversal-adapter.ts`) compile and behave unchanged.

### 4. Single integration seam
`runTraversalEnforcement(...)` is the only seam; it maps traversal state →
`enforceEscapePointScope` input and returns the result. It is called once at the top of
`advanceCanonicalTraversal` and once at the top of `runCanonicalAxisTraversal`. The
`advanceCanonicalTraversal` call inside `runCanonicalAxisTraversal` forwards the **five input
fields** (not the result object), so each entry point computes its own verdict.

### 5. Gating (ENFORCE only)
```ts
function enforcementBlocksTraversal(e: EscapePointEnforcementResult): boolean {
  return e.enforcementMode === 'ENFORCE' && e.blockingIssues.length > 0
}
```
When this is true, the traversal short-circuits the **success emissions only** — the LEAF-success
return, the NEXT_NODE / extension return, and the final pending return in
`runCanonicalAxisTraversal` — returning `AXIS_TRAVERSAL_BLOCKED` with a traceable
`blockingIssue: escapePointBlockingIssueText(enforcement)`
(`AXIS_TRAVERSAL_BLOCKED: escape-point enforcement blocked traversal [<status>] (<codes>): <detail>`).
Structural validation errors (INVALID_NODE / INVALID_ANSWER) are **not** gated by enforcement.

## Behavior matrix
| Scenario | Mode | Result |
| --- | --- | --- |
| No scope, default | PASSIVE_COMPAT | traversal unchanged; trace `ESCAPE_POINT_PASSIVE_NOT_ENFORCED` + `EP-W05`; `anchorReadiness=SCOPE_ABSENT` |
| Legacy scope, no anchor | PASSIVE_COMPAT | traversal unchanged; `anchorReadiness=LEGACY_NO_ANCHOR` |
| Discrete anchor, correct agent/moment | ENFORCE | traversal proceeds (LEAF/NEXT_NODE); trace `ESCAPE_POINT_ENFORCED_OK` |
| Agent migration | ENFORCE | `AXIS_TRAVERSAL_BLOCKED` + `EP-B01` |
| Post-event moment | ENFORCE | `AXIS_TRAVERSAL_BLOCKED` + `EP-B02` |
| Consequence basis | ENFORCE | `AXIS_TRAVERSAL_BLOCKED` + `EP-B03` |
| A-D for maintenance_or_org / design_mgmt w/o limitation evidence | ENFORCE | `AXIS_TRAVERSAL_BLOCKED` + `EP-B04` |
| Diffuse / unanchorable | ENFORCE | `AXIS_TRAVERSAL_BLOCKED` + `EP-B05` |
| Progressive complete (correct moment) | ENFORCE | proceeds + `EP-W01` warning |
| O-E proposedCode (invalid scope) | ENFORCE | `AXIS_TRAVERSAL_BLOCKED` + `EP-B07` (SCOPE_INVALID) |

## Candidate-only / lock guarantees (unchanged, re-asserted)
The wiring never sets any `*Allowed=true`. `selectedCodeAllowed=false`,
`releasedCodeAllowed=false`, `classificationAllowed=false`, `notFinalClassification=true` hold on
every emission, including blocked ones. No `selectedCode` / `releasedCode` / `finalConclusion`
fields are produced. No HFACS / Risk / ERC / ARMS / recommendations. `O-E` stays
`NON_EXISTENT_IN_SERA_PT_V1`. "SERA" only.

## Test
`tests/sera-vnext/escape-point-traversal-wiring-trial-001.ts` (new, untracked) — 11 cases:
passive-no-scope, passive-legacy, ENFORCE discrete OK, EP-B01..B05, progressive+EP-W01,
mixed-batch lock check, and O-E/EP-B07. Asserts candidate-only locks on every output and proves
passive mode does not change classification/codes/closure.

## Validation
- All 26 `tests/sera-vnext/*.ts` pass via `frontend/node_modules/.bin/tsx`.
- `cd frontend && npx tsc --noEmit` exit 0.
- `git diff --check` clean; only `canonical-traversal.ts` modified.
- Forbidden-content scans clean (no CERA, no `*Allowed = true`, no active output tokens, no
  `P-1`/`O-1`/`A-1` methodology).

## F-01 status after C
F-01 HIGH moves from "module exists (B)" to **"productive traversal consults and can enforce the
escape-point scope (C)"** — but only on the `canonical-traversal` entry points and only when a
caller explicitly opts into `ENFORCE`. Default-passive behavior and the author-node-intake adapter
path remain A4R190-identical. **Full integrated-runtime closure of F-01 is still pending A4R191-D.**
