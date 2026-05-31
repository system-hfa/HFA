# REAL EVENT REENTRY — Comair 5191 LEX — A4R193-B v0.2.0

## Status

- phase: `A4R193-B`
- mode: `CANDIDATE_ONLY`
- eventId: `REAL-EVENT-COMAIR-5191-LEX-2006-REENTRY-001`
- status: `READY_FOR_CANDIDATE_ONLY_TRIAL`
- final-classification: `NOT_ALLOWED_IN_THIS_PHASE`

## Internal sources found

1. `docs/sera-vnext/real-event-structured-extraction-a4r180/extractions/A4R180-EXTRACTION-0002.md`
2. `docs/sera-vnext/real-event-author-adjudication-a4r181/SERA_REAL_EVENT_AUTHOR_ADJUDICATION_MATRIX_A4R181_v0.2.0.csv` (A4R181-ADJ-0002)
3. `docs/sera-vnext/real-event-author-decision-intake-a4r182/SERA_REAL_EVENT_AUTHOR_DECISION_MATRIX_A4R182_v0.2.0.csv` (A4R182-DEC-0002)
4. `docs/sera-vnext/author-node-decision-intake-a4r187/node-decision-packets/A4R187-NODE-DECISION-PACKET-0002-COMAIR-5191.md`

## Proposed escapePointScope (candidate-only)

```yaml
scopeId: scope-comair-5191-reentry-001
scopeStatement: Wrong-runway lineup action on runway 26 instead of runway 22 during the final runway-identity verification zone.
status: APPROVED_NOT_ENFORCED
```

### agentId

- `crew-integrated-comair-5191-runway-verification`

### agentKind

- `crew_collective`

### unsafeActOrOmission

```yaml
kind: mixed_act_and_omission
statement: Turned and aligned on runway 26 and continued toward takeoff commitment without completing a reliable runway-identity verification.
```

### operationalMoment

```yaml
description: Runway-entry and lineup window after hold-short crossing and before irreversible takeoff commitment.
sequenceRef: seq:4
```

### pointTopology

- `progressive`

### boundaryEvidenceRefs

- `COMAIR-A4R180-F1`
- `COMAIR-A4R180-F2`
- `COMAIR-A4R180-F3`
- `A4R181-ADJ-0002-ZONE_RUNWAY_VERIFICATION_LINEUP_TO_POWER`

## Metadata P/O/A (candidate-only)

### Perception axis

```yaml
axisAgentRef: crew-integrated-comair-5191-runway-verification
axisMomentRef: seq:4
axisEvidenceRefs:
  - COMAIR-A4R180-F1
  - COMAIR-A4R180-F3
proposedCode: null
limitations:
  - Perception branch remains open; no final P-code in this phase.
```

### Objective axis

```yaml
axisAgentRef: crew-integrated-comair-5191-runway-verification
axisMomentRef: seq:4
axisEvidenceRefs:
  - COMAIR-A4R180-F2
  - A4R182-DEC-0002
proposedCode: O-E
limitations:
  - O-axis code remains non-existent by design and must not activate any objective release.
```

### Action axis

```yaml
axisAgentRef: crew-integrated-comair-5191-runway-verification
axisMomentRef: seq:4
axisEvidenceRefs:
  - COMAIR-A4R180-F3
  - A4R181-ADJ-0002
proposedCode: null
limitations:
  - Action judgment remains candidate-only and unresolved.
```

## Limitations and uncertainties

1. Internal extraction keeps a zone between hold-short, lineup, and power application.
2. Possible ATC contextual contribution is not reclassified as primary actor in this phase.
3. No final axis closure is allowed.

## Agent migration and boundary risks

- agent migration risk: crew anchor can drift to ATC omission narrative
- post-event analysis risk: overrun sequence can contaminate earlier anchor choice
- consequence-as-basis risk: crash outcome must remain consequence only

## Explicit non-final declarations

- No final P/O/A classification is produced.
- No `selectedCode`, `releasedCode`, `CLASSIFIED`, `finalConclusion`, HFACS, Risk/ERC, ARMS/ERC, or recommendations output is allowed.
- This event is not promoted to fixture, baseline, or automatic reference case.
