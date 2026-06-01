# Synthetic Pilot GAP-001 Controlled Materialization Draft A4R194-J v0.2.0

Date: 2026-06-01
Phase: A4R194-J

## 0. Status

- CONTROLLED_MATERIALIZATION_DRAFT
- NOT_A_FIXTURE
- NOT_BASELINE
- NOT_PRODUCT
- NOT_CLASSIFIED
- NOT_REAL_EVENT
- SYNTHETIC_ONLY

Fonte operacional de desenho: Daumas (methodology/reference-only, sem reentry automatico).

This document is the only permitted A4R194-J controlled materialization draft artifact.
It is documentary and non-operational. It does not create a fixture, baseline, product
path, released case, final classification, or downstream report basis.

## 1. Identifiers

- `syntheticPilotId`: SYN-PILOT-GAP001-PFPM-DRAFT-001
- `controlledMaterializationId`: SYN-PILOT-GAP001-PFPM-CONTROLLED-DRAFT-001
- `syntheticType`: TYPE-07_WARNING_TRAP
- `learningGap`: GAP-001_PF_PM_SEPARATION
- `boundaryDecision`: PF_PRIMARY_WITH_PM_CONSEQUENCE_BOUNDARY

## 2. Boundary and exclusions

Explicit exclusions:

- no PM_PRIMARY_MONITORING_FAILURE
- no crew collective fallback
- no consequence-as-cause
- no warning-as-anchor
- no real-event narrative
- no Daumas reentry

Boundary decision:

- PF is the primary actor for the synthetic escape-point candidate.
- PM is retained as monitoring/callout obligation within the same macro gate and
  consequence boundary.
- A PM-primary monitoring failure requires a separate future draft with a new scope and
  separate audit.
- Crew collective is context only and cannot replace PF or PM.

## 3. Agents

| Role | Agent ID | Status |
|---|---|---|
| PF | synthetic-pf-001 | primary synthetic escape-point candidate actor |
| PM | synthetic-pm-001 | monitoring/callout obligation actor, not earlier than PF anchor |
| crew collective | context only | not fallback and not replacement actor |

## 4. Operational sequence

- `seq:synthetic:pf:03` = first controllable synthetic escape-point candidate.
- `seq:synthetic:pm:03` = same macro gate / PM monitoring obligation, not earlier than
  PF anchor.
- If future work needs finer ordering, a separate future phase must define it. A4R194-J
  does not refine or alter the sequence.

## 5. Minimal synthetic scenario skeleton

This is a field skeleton only, not a complete operational narrative.

| Field | Controlled placeholder |
|---|---|
| synthetic context | Synthetic-only operational context placeholder; no named real event and no copied event chain. |
| PF action/omission placeholder | Observable first-departure placeholder bound to `synthetic-pf-001` and `seq:synthetic:pf:03`; no P/O/A conclusion. |
| PM monitoring/callout obligation placeholder | Monitoring/callout obligation placeholder bound to `synthetic-pm-001` and `seq:synthetic:pm:03`; not an earlier anchor. |
| boundary evidence placeholders | `SYN-GAP001-J-EV-PF-001`, `SYN-GAP001-J-EV-PM-001`, `SYN-GAP001-J-EV-BOUNDARY-001`; all synthetic placeholders. |
| consequence boundary placeholder | Consequence zone remains post-anchor and cannot be used as cause or classification basis. |

This skeleton cannot contain:

- named real events inside the scenario content;
- a final operational narrative;
- final P/O/A output;
- selected, released, or final output values.

## 6. P/O/A classification lock

`poaClassification`:

- `status`: NOT_CLASSIFIED
- `selectedCode`: null
- `releasedCode`: null
- `finalConclusion`: null

## 7. Locks

| Lock | Value |
|---|---|
| fixtureAllowed | false |
| baselineAllowed | false |
| productAllowed | false |
| classificationAllowed | false |
| selectedCodeAllowed | false |
| releasedCodeAllowed | false |
| finalConclusionAllowed | false |
| downstreamAllowed | false |

## 8. Downstream

| Downstream layer | Status |
|---|---|
| HFACS | blocked |
| Risk/ERC | blocked |
| ARMS/ERC | blocked |
| recommendations | blocked |

## 9. Provenance reference

A4R194-J uses the canonical provenance defined in
`SYNTHETIC_PILOT_GAP001_PROVENANCE_RECONCILIATION_A4R194_J_v0.2.0.md`.

Real events are not narrative sources. They are methodology/gap and boundary calibration
references only. Daumas remains methodology/reference-only.

## 10. Next status

- requires A4R194-K independent audit
- no promotion before audit
- A4R194-K was not initiated by this phase
