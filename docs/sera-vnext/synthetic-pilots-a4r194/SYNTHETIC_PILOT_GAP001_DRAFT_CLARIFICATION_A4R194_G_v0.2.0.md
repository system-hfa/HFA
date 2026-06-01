# Synthetic Pilot GAP-001 Draft Clarification A4R194-G v0.2.0

Status:
- DRAFT_CLARIFICATION_COMPLETE
- NO_MATERIALIZATION
- PRODUCT_BLOCKED

## Objective

Close the A4R194-F medium finding by clarifying the PF/PM boundary of the A4R194-E
draft without creating a synthetic case instance, fixture, baseline, product path, or
final P/O/A output.

## Source finding

A4R194-F found that the current `TYPE-07_WARNING_TRAP` draft is acceptable for blocking
warning-as-anchor, but it did not explicitly state that the current pilot is PF-primary
and does not test PM-primary monitoring failure.

## Boundary decision

`PF_PRIMARY_WITH_PM_CONSEQUENCE_BOUNDARY`

The current draft tests the PF as the primary synthetic escape-point actor. The PM is
kept as a monitoring/callout actor inside the consequence/barrier zone. The PM warning or
callout remains a trap to reject as an automatic escape-point anchor.

## PM-primary future variant

`PM_PRIMARY_MONITORING_FAILURE` is not tested by A4R194-E/G. Any PM-primary variant
requires a new `syntheticPilotId`, new `scopeId`, new sequence model, and a separate
audit before any materialization decision.

## Temporal clarification

- `seq:synthetic:pf:03` is the first controllable synthetic escape-point candidate.
- `seq:synthetic:pm:03` is the same macro gate PM monitoring obligation and is not
  earlier than the PF anchor.
- Future granular ordering may use refs such as `seq:synthetic:pf:03a` and
  `seq:synthetic:pm:03b`, but this phase does not create those granular refs.

## Locks preserved

- selectedCode remains null.
- releasedCode remains null.
- finalConclusion remains null.
- No fixture.
- No baseline.
- No product/UI/API.
- No HFACS.
- No Risk/ERC.
- No ARMS/ERC.
- No recommendations output.

## Final status

`DRAFT_CLARIFICATION_COMPLETE`
