# Synthetic Pilot GAP-001 Provenance Reconciliation A4R194-J v0.2.0

Date: 2026-06-01
Phase: A4R194-J
Status: CONTROLLED_PROVENANCE_RECONCILIATION_ONLY

Fonte operacional de desenho: Daumas (methodology/reference-only, sem reentry automatico).

## 1. Purpose

This document reconciles `RISK-008 - GAP-001 provenance inconsistency` before any
controlled materialization draft content is recorded.

The inconsistency is a provenance-of-design divergence, not a narrative divergence. It
does not authorize use of any real event as synthetic narrative source, empirical
substitute, fixture, baseline, released case, or product input.

## 2. RISK-008 finding

`RISK-008` identified that:

- A4R195-A records GAP-001 `real_event_basis` as `Asiana_214_Comair_5191_and_related_boundary_cases`.
- A4R194-E records `realEventBasis` as Thebaud, Peasmarsh, Vigo, Colgan 3407.

This is reconciled by separating design-provenance categories:

1. `primary_gap_basis`
2. `boundary_case_basis`
3. `contextual_calibration_basis`
4. `not_narrative_source`

## 3. Canonical provenance for A4R194-J

The canonical provenance for A4R194-J is:

- `primary_gap_basis`: Thebaud, Peasmarsh, Vigo, Colgan 3407.
- `boundary_case_basis`: Asiana 214, Comair 5191, American 965.
- `contextual_calibration_basis`: A4R193-P/Q synthetic gap audit, A4R194-A/I, A4R195-A/C.
- `not_narrative_source`: all real events listed above.

## 4. Category definitions

### primary_gap_basis

Real-event gap basis used only to justify the existence of the PF/PM separation gap and
the warning/callout boundary trap. It may inform the methodological need for a synthetic
pilot but may not supply story content.

### boundary_case_basis

Boundary examples used only to calibrate agent migration, consequence-as-cause, and
progressive/late-anchor risks. These examples do not become synthetic facts.

### contextual_calibration_basis

Prior SERA documents used to calibrate scope, locks, review posture, and governance
language. They do not authorize product, fixture, baseline, classification, or downstream
outputs.

### not_narrative_source

Every real event named in the provenance categories is explicitly excluded as a narrative
source for the synthetic pilot. No operational sequence, factual chain, named occurrence,
crew action, warning, recovery attempt, impact, or outcome from those events may be copied
into the synthetic draft as event story.

## 5. Explicit exclusions

- Real events may not appear as the narrative of the synthetic pilot.
- Real events are methodology/gap basis only.
- Real events are not narrative sources.
- Real events are not empirical evidence for a synthetic conclusion.
- Daumas is methodology/reference-only and not synthetic narrative provenance.
- Daumas does not create automatic reentry.
- The A4R194-J draft remains synthetic-only and controlled.

## 6. Resolution

`RISK-008` is reconciled for A4R194-J by using the canonical provenance above. The
reconciliation does not close RR-001 or RR-003, does not create fixture/baseline/product
permission, and does not open final or downstream outputs.
