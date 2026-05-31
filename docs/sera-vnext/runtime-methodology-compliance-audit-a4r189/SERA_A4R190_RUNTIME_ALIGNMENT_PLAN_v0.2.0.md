# SERA A4R190 Runtime Alignment Plan v0.2.0

Scope: planning only. No implementation in this file.

## Phase A4R190-A — runtime data model for canonical tree
Objective:
- Introduce canonical runtime model bound to A4R99.

Deliverables:
- Canonical node schema in runtime layer with fields:
  - `canonicalTreeSource`
  - `nodeId`
  - `exactQuestionTextPT`
  - `exactQuestionTextENAnchor`
  - `branchCondition`
  - `nextNode/leaf`
- Loader/validator that fails on malformed canonical tree data.

Acceptance:
- Runtime can parse canonical tree asset with structural validation.
- Missing required node/field produces deterministic hard-fail.

## Phase A4R190-B — traversal engine skeleton
Objective:
- Replace local heuristic question flow with canonical node traversal.

Deliverables:
- Traversal executor that walks node-by-node using canonical conditions.
- Trace output with exact step records: node, answer, evidence ref, next node.
- Hard-fail statuses:
  - `REAL_TREE_MISSING`
  - `CANONICAL_NODE_MISSING`
  - `BLOCKED_BY_MISSING_CANONICAL_TREE`

Acceptance:
- A test case can replay deterministic canonical path without local reconstructed prompts.

## Phase A4R190-C — bilingual node text rendering
Objective:
- Separate methodology logic from language rendering.

Deliverables:
- Locale rendering layer (`pt-BR`, `en`) sourced from canonical node text only.
- Same traversal path regardless of selected language.

Acceptance:
- PT/EN parity tests produce same `nodeId` path and same final codes for same evidence.

## Phase A4R190-D — escape point gate
Objective:
- Enforce causal anchor at safe operation escape point.

Deliverables:
- Runtime fields:
  - `escapePointScope`
  - `approvedEscapePointScope`
- Guardrail that blocks post-escape consequence migration into causal root.

Acceptance:
- Negative-control tests fail when cause attribution uses post-escape consequence.

## Phase A4R190-E — downstream locks
Objective:
- Preserve and unify downstream locks under canonical traversal states.

Deliverables:
- Unified lock policy forbidding pre-release output of:
  - `finalConclusion`
  - `HFACS`
  - `Risk/ERC`
  - `ARMS/ERC`
  - `recommendations` (when causal gate is unresolved)

Acceptance:
- Automated tests assert lock behavior for all unresolved and blocked states.

## Phase A4R190-F — executable tests
Objective:
- Convert methodology compliance into executable evidence.

Deliverables:
- Compliance suites:
  - canonical traversal correctness
  - nodeId presence/integrity
  - exact canonical text lock
  - PT/EN parity
  - escape-point gate
  - downstream lock invariants
  - insufficient evidence blocking
  - negative controls

Acceptance:
- Tests fail on any non-canonical traversal fallback or invented question.

## Phase A4R190-G — candidate fixtures from real tree
Objective:
- Align candidate fixture drafting with canonical traversal evidence.

Deliverables:
- Candidate templates requiring canonical trace fields.
- No candidate accepted without explicit canonical node trace.

Acceptance:
- Candidate validation rejects fixtures missing canonical trace proof.

## Sequencing and gate policy
Suggested order:
1. A4R190-A
2. A4R190-B
3. A4R190-C
4. A4R190-D
5. A4R190-E
6. A4R190-F
7. A4R190-G

Mandatory gates:
- No baseline/fixture promotion from A4R190 outputs without explicit human authorization.
- No risk-layer integration in these phases unless separately authorized.

## Out of scope
- UI redesign.
- API contract expansion beyond canonical-trace support.
- DB schema changes unless explicitly approved in later phase.
