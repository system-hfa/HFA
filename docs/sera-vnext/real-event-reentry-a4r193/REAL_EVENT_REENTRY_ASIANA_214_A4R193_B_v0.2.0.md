# REAL EVENT REENTRY — Asiana 214 SFO — A4R193-B v0.2.0

## Status

- phase: `A4R193-B`
- mode: `CANDIDATE_ONLY`
- eventId: `REAL-EVENT-ASIANA214-SFO2013-REENTRY-001`
- status: `READY_FOR_CANDIDATE_ONLY_TRIAL`
- final-classification: `NOT_ALLOWED_IN_THIS_PHASE`

## Internal sources found

1. `docs/sera-vnext/real-event-structured-extraction-a4r180/extractions/A4R180-EXTRACTION-0001.md`
2. `docs/sera-vnext/real-event-author-adjudication-a4r181/SERA_REAL_EVENT_AUTHOR_ADJUDICATION_MATRIX_A4R181_v0.2.0.csv` (A4R181-ADJ-0001)
3. `docs/sera-vnext/real-event-author-decision-intake-a4r182/SERA_REAL_EVENT_AUTHOR_DECISION_MATRIX_A4R182_v0.2.0.csv` (A4R182-DEC-0001)
4. `A4R187-NODE-DECISION-PACKET-0001` (Asiana packet in A4R187 node-decision intake set)

## Proposed escapePointScope (candidate-only)

```yaml
scopeId: scope-asiana-214-reentry-001
scopeStatement: Transition to A/T HOLD with early unstable-profile divergence not perceived in time by the integrated flight crew.
status: APPROVED_NOT_ENFORCED
```

### agentId

- `crew-integrated-asiana-214-approach`

### agentKind

- `crew_collective`

### unsafeActOrOmission

```yaml
kind: mixed_act_and_omission
statement: Continued unstable visual approach after the A/T HOLD transition without timely go-around at the stabilized-approach control gate.
```

### operationalMoment

```yaml
description: Stabilized-approach control gate before 500 ft AFE and before the late low-energy recognition below 200 ft.
sequenceRef: seq:4
```

### pointTopology

- `progressive`

### boundaryEvidenceRefs

- `ASIANA-A4R180-F1`
- `ASIANA-A4R180-F2`
- `ASIANA-A4R180-F3`
- `A4R181-ADJ-0001-ZONE_STABILIZED_APPROACH_GATE`

## Metadata P/O/A (candidate-only)

### Perception axis

```yaml
axisAgentRef: crew-integrated-asiana-214-approach
axisMomentRef: seq:4
axisEvidenceRefs:
  - ASIANA-A4R180-F1
  - ASIANA-A4R180-F2
proposedCode: null
limitations:
  - Candidate-only metadata; no final P-code release in A4R193-B.
```

### Objective axis

```yaml
axisAgentRef: crew-integrated-asiana-214-approach
axisMomentRef: seq:4
axisEvidenceRefs:
  - ASIANA-A4R180-F2
  - A4R181-ADJ-0001
proposedCode: null
limitations:
  - Objective hypothesis remains non-final and unresolved by design.
```

### Action axis

```yaml
axisAgentRef: crew-integrated-asiana-214-approach
axisMomentRef: seq:4
axisEvidenceRefs:
  - ASIANA-A4R180-F3
  - A4R182-DEC-0001
proposedCode: null
limitations:
  - Action axis remains candidate-only with no axis closure.
```

## Limitations and uncertainties

1. Escape point is represented as a control zone, not a single closed instant.
2. PF/PM/observer role split remains outside this phase and is not adjudicated here.
3. Outcome impact is explicitly excluded from causal basis anchoring.

## Agent migration and boundary risks

- agent migration risk: crew-integrated anchor may drift to individual PF/PM without explicit secondary split
- post-event analysis risk: low-energy recognition below 200 ft can be misused as primary anchor
- consequence-as-basis risk: seawall impact must remain consequence only

## Explicit non-final declarations

- No final P/O/A classification is produced.
- No `selectedCode`, `releasedCode`, `CLASSIFIED`, `finalConclusion`, HFACS, Risk/ERC, ARMS/ERC, or recommendations output is allowed.
- This event is not promoted to fixture, baseline, or automatic reference case.
