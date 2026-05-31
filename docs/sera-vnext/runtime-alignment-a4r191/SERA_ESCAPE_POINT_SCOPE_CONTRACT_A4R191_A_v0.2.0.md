# SERA Escape-Point Scope Type Contract — A4R191-A v0.2.0

## Scope of this phase
A4R191-A evolves **only the data/type contract** of the safe-operation escape point and adds
a **pure normalization/mapping function**. It does **not** implement enforcement. Runtime behavior
remains candidate-only and passive. No traversal guard, node block, productive gate, `selectedCode`,
`releasedCode`, `CLASSIFIED`, `finalConclusion`, or downstream output is introduced.

This phase resolves blocker **F-01 HIGH** at the *type-modeling* level only: it makes the escape point
expressive enough to later anchor the agent–act–moment of the P/O/A analysis. Actual enforcement remains
deferred to A4R191-B/C/D/E.

## Methodological anchor (unchanged)
The escape point is the **agent–act–moment anchor** of the P/O/A analysis. P/O/A must be analyzed
**at the moment of the escape point of the safe operation**, not from later consequences
(Hendy / Daumas). This phase only *models* that anchor; it does not apply it. The canonical A4R99 tree,
canonical question texts, and SERA question inventory are untouched.

## Type contract changes (`frontend/src/lib/sera-vnext/types.ts`)
All changes are **additive and backward-compatible**. Existing fields of `ApprovedEscapePointScope`
(`scopeId`, `scopeStatement`, `boundaryEvidenceRefs`, `rationale`, `status`) are preserved. Legacy scopes
that lack the new anchor remain valid inputs.

### New unions / aliases
- `SeraVNextEscapePointScopeStatus` — `'DEFINED_NOT_ENFORCED' | 'APPROVED_NOT_ENFORCED' | 'PASSIVE_NOT_ENFORCED'`
  (reconciles the three status vocabularies previously scattered across runtime and the intake adapter).
- `SeraVNextEscapePointAgentKind` — `specific_actor | crew_collective | multi_actor | system_or_condition_dominant | unknown`.
- `SeraVNextEscapePointActOrOmissionKind` — `unsafe_act | unsafe_omission | mixed_act_and_omission | unknown`.
- `SeraVNextEscapePointTopology` — `discrete | progressive | diffuse`.
- `SeraVNextEscapePointEnforcementMode` — `'PASSIVE_CANDIDATE_ONLY'` (the only legal mode in this phase).

### New interfaces
- `SeraVNextEscapePointUnsafeActOrOmission` — `{ kind, statement, evidenceRefs? }`.
- `SeraVNextEscapePointOperationalMoment` — `{ description, phaseRef?, sequenceRef? }`.
- `SeraVNextEscapePointZoneBoundary` — `{ earliestControllableRef, latestControllableRef, rationale? }`
  (models the progressive zone of controllability).
- `SeraVNextEscapePointAnchor` — the agent–act–moment anchor: `{ agentId, agentKind, unsafeActOrOmission,
  operationalMoment, pointTopology, zoneBoundary?, boundaryEvidenceRefs? }`.

### Evolved interface
`ApprovedEscapePointScope` gains two optional fields:
- `escapePointAnchor?: SeraVNextEscapePointAnchor`
- `enforcementMode?: SeraVNextEscapePointEnforcementMode`

The `status` field is widened to `SeraVNextEscapePointScopeStatus` (additive; no existing value removed).

## Normalization function (`frontend/src/lib/sera-vnext/escape-point-scope.ts`)
`normalizeApprovedEscapePointScope(scope: ApprovedEscapePointScope | undefined | null)` returns a
`SeraVNextEscapePointStatusMappingResult`. It is a **pure, side-effect-free** classifier. It:
- never enforces, never blocks traversal;
- always reports `normalizedEnforcementStatus: 'PASSIVE_NOT_ENFORCED'` and
  `enforcementMode: 'PASSIVE_CANDIDATE_ONLY'`;
- hard-codes the downstream guards to `false`:
  `enforcementActive`, `blocksTraversal`, `selectedCodeAllowed`, `releasedCodeAllowed`,
  `classificationAllowed`, `finalConclusionAllowed`, `downstreamAllowed`.

### Normalized anchor-readiness states (`SeraVNextEscapePointAnchorReadiness`)
| Readiness | Meaning | `readyForFutureEnforcement` |
|---|---|---|
| `SCOPE_ABSENT` | No scope provided | `false` |
| `LEGACY_NO_ANCHOR` | Scope present, no anchor (legacy) | `false` |
| `ANCHORED_DISCRETE` | Valid discrete anchor | `true` |
| `ANCHORED_PROGRESSIVE_COMPLETE` | Progressive with earliest+latest controllable refs | `true` |
| `ANCHORED_PROGRESSIVE_INCOMPLETE` | Progressive missing/partial zone boundary | `false` |
| `ANCHORED_DIFFUSE` | Diffuse — requires future split | `false` |
| `INVALID_ANCHOR` | Required anchor fields missing | `false` |

`readyForFutureEnforcement` is a **diagnostic readiness signal only** — it never triggers enforcement
in this phase.

### Diagnostic issue codes (`SeraVNextEscapePointScopeIssueCode`)
All issues carry `blocksTraversal: false` and severity `PASSIVE_INFO` or `PASSIVE_DIAGNOSTIC`:
`ESCAPE_POINT_SCOPE_ABSENT`, `ESCAPE_POINT_ANCHOR_MISSING`, `ESCAPE_POINT_AGENT_MISSING`,
`ESCAPE_POINT_ACT_OR_OMISSION_MISSING`, `ESCAPE_POINT_OPERATIONAL_MOMENT_MISSING`,
`ESCAPE_POINT_TOPOLOGY_MISSING`, `ESCAPE_POINT_PROGRESSIVE_ZONE_BOUNDARY_MISSING`,
`ESCAPE_POINT_PROGRESSIVE_ZONE_BOUNDARY_INCOMPLETE`, `ESCAPE_POINT_DIFFUSE_SPLIT_REQUIRED`,
`ESCAPE_POINT_UNKNOWN_STATUS_VOCABULARY`.

## Topology modeling note
Discrete, progressive, and diffuse points are **modeled, not applied**. The progressive zone is
represented by `zoneBoundary` (earliest/latest controllable refs); the diffuse case is recognized and
flagged for a future split. None of these change traversal in A4R191-A.

## Explicit non-goals (A4R191-A)
- No enforcement integration in traversal, engine, adapters, or pipeline.
- No node blocking, no productive gate.
- No `selectedCode` / `releasedCode` / `CLASSIFIED` / `finalConclusion` / downstream.
- No migration, no fixture/baseline/source-corpus/supabase change.
- No change to canonical tree or canonical question texts.
