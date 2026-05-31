# SERA Escape-Point Scope Runtime Model — A4R190-A v0.2.0

## Objective
Represent `approvedEscapePointScope` in the vNext runtime input model as a structured field, without productive enforcement in this phase.

## Added Passive Types
- `ApprovedEscapePointScope`
  - `scopeId: string`
  - `scopeStatement: string`
  - `boundaryEvidenceRefs: string[]`
  - `rationale: string`
  - `status: 'DEFINED_NOT_ENFORCED' | 'APPROVED_NOT_ENFORCED'`
- `SeraVNextCanonicalRuntimeContext`
  - `approvedEscapePointScope: ApprovedEscapePointScope`
- `SeraVNextInput`
  - optional field: `canonicalRuntimeContext?: SeraVNextCanonicalRuntimeContext`

## Operational Meaning in A4R190-A
- Presence in type/model: implemented.
- Productive traversal guard or hard gate: not implemented in this phase.
- Legacy behavior impact: none.

## Rationale
This supports future runtime traversal phases that must be explicitly constrained by approved safe-operation escape-point boundaries, while keeping A4R190-A strictly passive.
