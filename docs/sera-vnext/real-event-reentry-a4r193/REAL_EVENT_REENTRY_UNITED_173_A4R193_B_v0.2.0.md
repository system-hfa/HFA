# REAL EVENT REENTRY — United 173 PDX — A4R193-B v0.2.0

## Status

- phase: `A4R193-B`
- mode: `CANDIDATE_ONLY`
- eventId: `REAL-EVENT-UNITED-173-PDX-1978-REENTRY-001`
- status: `READY_FOR_CANDIDATE_ONLY_TRIAL`
- final-classification: `NOT_ALLOWED_IN_THIS_PHASE`

## Internal sources found

1. `docs/sera-vnext/real-event-structured-extraction-a4r180/extractions/A4R180-EXTRACTION-0017.md`
2. `docs/sera-vnext/real-event-author-adjudication-a4r181/SERA_REAL_EVENT_AUTHOR_ADJUDICATION_MATRIX_A4R181_v0.2.0.csv` (A4R181-ADJ-0017)
3. `docs/sera-vnext/real-event-author-decision-intake-a4r182/SERA_REAL_EVENT_AUTHOR_DECISION_MATRIX_A4R182_v0.2.0.csv` (A4R182-DEC-0005)
4. `docs/sera-vnext/author-node-decision-intake-a4r187/node-decision-packets/A4R187-NODE-DECISION-PACKET-0017-UNITED-173.md`

## Proposed escapePointScope (candidate-only)

```yaml
scopeId: scope-united-173-reentry-001
scopeStatement: Continuation of troubleshooting objective after fuel-critical advisories already required immediate transition to landing.
status: APPROVED_NOT_ENFORCED
```

### agentId

- `crew-integrated-united-173-fuel-window`

### agentKind

- `crew_collective`

### unsafeActOrOmission

```yaml
kind: mixed_act_and_omission
statement: Maintained troubleshooting priority in a fuel-critical holding window and delayed transition to immediate landing execution.
```

### operationalMoment

```yaml
description: Fuel-critical holding window in which advisories and remaining-time cues indicated immediate landing priority.
sequenceRef: seq:6
```

### pointTopology

- `progressive`

### boundaryEvidenceRefs

- `UNITED-173-A4R180-F1`
- `UNITED-173-A4R180-F2`
- `UNITED-173-A4R180-F3`
- `UNITED-173-A4R180-F4`
- `A4R181-ADJ-0017-ZONE_HOLDING_FUEL_CRITICAL_WINDOW`

## Metadata P/O/A (candidate-only)

### Perception axis

```yaml
axisAgentRef: crew-integrated-united-173-fuel-window
axisMomentRef: seq:6
axisEvidenceRefs:
  - UNITED-173-A4R180-F1
  - UNITED-173-A4R180-F2
proposedCode: null
limitations:
  - Perception versus action boundary remains unresolved and non-final.
```

### Objective axis

```yaml
axisAgentRef: crew-integrated-united-173-fuel-window
axisMomentRef: seq:6
axisEvidenceRefs:
  - UNITED-173-A4R180-F3
  - A4R182-DEC-0005
proposedCode: null
limitations:
  - Persistent troubleshooting objective is documented as candidate-only framing.
```

### Action axis

```yaml
axisAgentRef: crew-integrated-united-173-fuel-window
axisMomentRef: seq:6
axisEvidenceRefs:
  - UNITED-173-A4R180-F4
  - A4R181-ADJ-0017
proposedCode: null
limitations:
  - No final A-axis closure or release is allowed.
```

## Limitations and uncertainties

1. OCR noise and timeline granularity constraints are already documented in extraction sources.
2. Captain, FO, and FE role split remains a potential secondary analysis and is not closed here.
3. Fuel-exhaustion impact is excluded as causal basis evidence.

## Agent migration and boundary risks

- agent migration risk: captain decision anchor can migrate to FO/FE evidence statements without explicit split protocol
- post-event analysis risk: post-exhaustion sequence can bias earlier causal anchor
- consequence-as-basis risk: impact/crash cannot be used as primary escape-point evidence

## Explicit non-final declarations

- No final P/O/A classification is produced.
- No `selectedCode`, `releasedCode`, `CLASSIFIED`, `finalConclusion`, HFACS, Risk/ERC, ARMS/ERC, or recommendations output is allowed.
- This event is not promoted to fixture, baseline, or automatic reference case.
