# SERA A4R191-E — Escape-Point Topology and Post-Event Guards v0.2.0

## Purpose
A4R191-E hardens the candidate-only escape-point enforcement layer for deterministic topology, post-event, consequence-basis, and A-D misuse guards.

This phase remains inside `escape-point-enforcement.ts`. It does not integrate UI, API, database, legacy runtime, engine orchestration, product release, or official fixtures/baselines.

## Topology Guards
The enforcement module recognizes three escape-point topologies:

- `discrete`: requires a complete anchor with agent, agent kind, unsafe act/omission statement, operational moment, and boundary evidence.
- `progressive`: requires `zoneBoundary.earliestControllableRef` and `zoneBoundary.latestControllableRef`; enforcement uses the earliest controllable reference as the anchor moment and emits `EP-W01`.
- `diffuse`: blocks with `EP-B05_DIFFUSE_REQUIRES_SPLIT`; diffuse points must be decomposed before active enforcement.

Multiple sibling escape points block with `EP-B06_MULTIPLE_POINTS`.

## Anti-Post-Event Guards
The module blocks P/O/A analysis when:

- the axis moment is after the escape-point moment (`EP-B02_POST_EVENT_ANALYSIS`);
- the axis evidence uses consequence, recovery, outcome, impact, or post-barrier material as the analysis basis (`EP-B03_CONSEQUENCE_AS_BASIS`);
- the axis agent differs from the escape-point agent (`EP-B01_AGENT_MIGRATION`).

## A-D Guard Hardening
For `maintenance_or_org` and `design_mgmt` escape-point agents, `A-D` remains blocked with `EP-B04_FORBIDDEN_CODE_FOR_AGENT` unless the evidence explicitly supports a physical, motor, or ergonomic limitation of that same agent.

A4R191-E tightens this exception so generic physical limitation evidence about another actor does not unblock A-D for a maintenance, organizational, or design-management escape-point agent.

## Candidate-Only Locks
All enforcement results remain candidate-only:

- no selected code is emitted;
- no released code is emitted;
- no final conclusion is emitted;
- no downstream product output is opened;
- P/O/A closure remains locked.

`O-E` remains `NON_EXISTENT_IN_SERA_PT_V1` and is accepted only in negative tests/diagnostics as a blocked non-canonical proposed code.
