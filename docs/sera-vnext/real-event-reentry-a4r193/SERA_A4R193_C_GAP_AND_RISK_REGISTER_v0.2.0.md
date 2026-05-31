# SERA A4R193-C Gap and Risk Register v0.2.0

## Scope

Register focused on consolidated real-event re-entry package (A4R193-A/B) under candidate-only locks.

## Residual and gap items

### RR-001 — Lexical multi-agent residual

- status: `OPEN`
- source: A4R191-H residual register
- impact: ambiguous ownership links can still induce agent migration in weakly structured narratives
- action: keep candidate-only locks and prioritize structured agent-bound evidence before product path

### RR-003 — MDC/interview intake absent

- status: `PARTIALLY_MITIGATED`
- source: A4R191-H residual register
- impact: scope and axis metadata still depend on externally curated inputs
- action: define structured MDC/interview intake as prerequisite before any product readiness claim

### USAir 427 technical-dominant hold

- status: `HOLD_ACTIVE`
- classification: `REAL_EVENT_MORE_SOURCE_REQUIRED`
- impact: overclassification risk if human P/O/A is forced on technical-dominant evidence
- action: perform dedicated technical-versus-operator source enrichment before re-entry release

### PF/PM/FE granularity gap

- status: `OPEN`
- classification: `REAL_EVENT_ADDITIONAL_CANDIDATE_NEEDED`
- impact: current `crew_collective` anchors do not always isolate individual actor accountability
- action: add real events with stronger individual cockpit role traceability

### Event-source sufficiency gap

- status: `OPEN`
- classification: `REAL_EVENT_MORE_SOURCE_REQUIRED`
- impact: at least one event remains blocked (`SOURCE_INSUFFICIENT_FOR_REENTRY`)
- action: source enrichment queue before broadening synthetic usage

### Synthetic gap candidates (later)

- status: `DEFERRED`
- classification: `SYNTHETIC_CANDIDATE_NEEDED_LATER`
- impact: some edge combinations (time pressure + lexical ambiguity + multi-actor migration) remain under-covered
- action: prepare synthetic design pack only after real-source enrichment pass

### Product opening gate

- status: `BLOCKED`
- classification: `NOT_READY_FOR_PRODUCT`
- impact: no authorization for UI/API integration and no final outputs
- action: keep candidate-only closure and re-evaluate only after gap closure evidence

## Consolidated decision

- no product opening in A4R193-C
- no synthetic generation in A4R193-C
- next phase should prioritize real-event enrichment and candidate expansion, with synthetic design limited to planning only
