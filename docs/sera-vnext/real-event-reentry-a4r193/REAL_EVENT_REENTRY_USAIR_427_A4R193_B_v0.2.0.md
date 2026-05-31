# REAL EVENT REENTRY — USAir 427 PIT — A4R193-B v0.2.0

## Status

- phase: `A4R193-B`
- mode: `CANDIDATE_ONLY`
- eventId: `REAL-EVENT-USAIR-427-PIT-1994-REENTRY-001`
- status: `SOURCE_INSUFFICIENT_FOR_REENTRY`
- final-classification: `NOT_ALLOWED_IN_THIS_PHASE`

## Internal sources found

1. `docs/sera-vnext/real-event-structured-extraction-a4r180/extractions/A4R180-EXTRACTION-0015.md`
2. `docs/sera-vnext/real-event-author-adjudication-a4r181/SERA_REAL_EVENT_AUTHOR_ADJUDICATION_MATRIX_A4R181_v0.2.0.csv` (A4R181-ADJ-0015)

## Escape-point re-entry decision

- decision: `SOURCE_INSUFFICIENT_FOR_REENTRY`
- reason: internal extraction marks `HELD_OVERCLASSIFICATION_RISK` with technical-dominance boundary and unresolved human actor attribution

## Proposed escapePointScope (blocked)

```yaml
scopeId: scope-usair-427-reentry-001
scopeStatement: HOLD - technical-dominance boundary requires dedicated technical-versus-operator review before human escape-point anchoring.
status: PASSIVE_NOT_ENFORCED
```

### agentId

- `hold-unresolved-technical-vs-operator-usair-427`

### agentKind

- `system_or_condition_dominant`

### unsafeActOrOmission

```yaml
kind: unknown
statement: HOLD - no defensible human unsafe act or omission can be anchored from current internal evidence without overclassification risk.
```

### operationalMoment

```yaml
description: HOLD - technical boundary unresolved; no human moment anchor approved for candidate intake.
phaseRef: hold:technical-dominance-boundary
```

### pointTopology

- `diffuse`

### boundaryEvidenceRefs

- `USAIR-427-A4R180-F1`
- `USAIR-427-A4R180-F2`
- `USAIR-427-A4R180-F3`
- `A4R181-ADJ-0015-HOLD_TECHNICAL_DOMINANCE_BOUNDARY`

## Metadata P/O/A (candidate-only HOLD)

### Perception axis

```yaml
axisAgentRef: null
axisMomentRef: null
axisEvidenceRefs:
  - USAIR-427-A4R180-F3
proposedCode: null
limitations:
  - Source explicitly marks technical-dominance HOLD.
```

### Objective axis

```yaml
axisAgentRef: null
axisMomentRef: null
axisEvidenceRefs:
  - A4R181-ADJ-0015
proposedCode: null
limitations:
  - No defensible objective attribution under current internal evidence.
```

### Action axis

```yaml
axisAgentRef: null
axisMomentRef: null
axisEvidenceRefs:
  - USAIR-427-A4R180-F2
proposedCode: null
limitations:
  - Action classification would force overclassification in this phase.
```

## Limitations and uncertainties

1. Technical system dominance is explicit in internal extraction and adjudication notes.
2. Human P/O/A anchoring is blocked pending dedicated boundary review.
3. This event remains useful as a controlled HOLD test for contract gating.

## Agent migration and boundary risks

- agent migration risk: forcing crew attribution from a technical driver
- post-event analysis risk: importing investigative conclusions instead of grounded human escape-point evidence
- consequence-as-basis risk: crash severity can bias invalid human-code assignment

## Explicit non-final declarations

- No final P/O/A classification is produced.
- No `selectedCode`, `releasedCode`, `CLASSIFIED`, `finalConclusion`, HFACS, Risk/ERC, ARMS/ERC, or recommendations output is allowed.
- This event is not promoted to fixture, baseline, or automatic reference case.
