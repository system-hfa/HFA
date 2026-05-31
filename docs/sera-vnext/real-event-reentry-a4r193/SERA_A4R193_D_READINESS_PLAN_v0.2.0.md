# SERA A4R193-D Readiness Plan v0.2.0

## Phase nature

A4R193-D is a decision phase only. It is not an automatic implementation phase.

## Decision options

1. Option 1 — Add 2 to 3 additional real events
- objective: expand coverage for PF/PM granularity, communication/information failures, and objective-intent cases
- condition: maintain candidate-only locks

2. Option 2 — Source enrichment for HOLD events
- objective: reduce `SOURCE_INSUFFICIENT_FOR_REENTRY` cases, especially USAir 427 technical-dominant hold
- condition: no forced human-code closure without new source support

3. Option 3 — Prepare synthetic gap design pack (without creating synthetic events)
- objective: specify future synthetic candidates for unresolved edge combinations
- condition: design-only, no synthetic data execution

## Conservative recommendation

Recommended sequence for A4R193-D:

1. execute Option 2 first (source enrichment for HOLD and weak-source boundaries)
2. execute Option 1 next (2 to 3 additional real events)
3. execute Option 3 only as planning artifact after updated real-event metrics

## Hard boundaries

- no product/UI/API integration
- no final classification release
- no fixture/baseline promotion
- no synthetic event creation in this phase

## Exit criteria

1. documented decision among options with rationale
2. updated priority queue for real-source enrichment and candidate acquisition
3. explicit confirmation that product path remains blocked pending evidence closure
