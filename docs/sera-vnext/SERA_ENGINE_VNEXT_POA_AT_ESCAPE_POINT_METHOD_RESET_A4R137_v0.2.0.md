# SERA Engine vNext P/O/A at Escape Point Method Reset A4R137 v0.2.0

Status: METHOD_RESET_RECORDED
Phase: A4+R-137
methodology: SERA
authorDecisionStatus: NO_NEW_AUTHOR_DECISION — PRIOR AUTHOR APPROVALS SUSPENDED FOR POA REFERENCE
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Objective

Register a critical methodological correction: P/O/A analysis must occur at the moment of the escape point from safe operation, not from events after the escape point.

All real-event P/O/A is suspended as current reference until reaudited under this rule.

## Methodological Correction

### P/O/A AT ESCAPE POINT RULE

After defining the escape point from safe operation, P/O/A analysis must be limited to the state of perception, objective, and action of the operator/crew at the moment of the escape point.

Events after the escape point are consequence, trajectory, or outcome. They may be used to understand the temporal sequence, but they cannot be the primary basis for classifying P/O/A.

The correct question is NOT:

> "What failures occurred after the trajectory was already degraded?"

The correct question IS:

> "At the moment the operation left the safe state, why did that escape point happen?"

### Per-Axis Rule

- **P (Perception):** What did the operator perceive/believe at the moment of the escape point?
- **O (Objective):** What was the objective at the moment of the escape point?
- **A (Action):** What action was being executed/attempted at the moment of the escape point?

### When Evidence Only Explains What Happened After

If evidence only explains what happened after the escape point, the axis must be:

- `UNRESOLVED`
- Or the event must go to `SOURCE_ENRICHMENT`, `FULL_REBUILD_WITH_ESCAPE_POINT_GATE`, or `PARKED`.

## Impact on Real Events

### Suspended as Current Reference

All P/O/A from the following phases is suspended for reference use until explicitly reaudited under the "P/O/A at escape point" rule:

- A4R129 — Queue B P0 POA Review diagnostic
- A4R130 — Queue B P0 Full Rebuild drafts
- A4R131 — Author review packets
- A4R132 — Opus independent review (P/O/A approval interpretations only)
- A4R133 — Author decision for REAL-EVENT-0003 (P/O/A approval only)
- A4R136 — Author decision forms for REAL-EVENT-0016 and ASIANA-214
- Any real-event P/O/A not explicitly tied to the escape-point moment

### Preserved as Useful (Not Conclusive)

The following remain valid as factual material:

- Factual extractions (A4R62, A4R72, A4R76, A4R88)
- Source enrichment documents (A4R67, A4R132 autopilot)
- Event timelines and evidence anchors
- Candidate escape points and "Quando..." statements
- Gate patch documents (A4R134)
- Quarantine registers and control board history (A4R135)
- Methodological rules and locks

## Priority Events Reset Status

### REAL-EVENT-0003

- Factual enrichment about autopilot disconnect remains valid.
- Evidence of manual disconnect by PF at 0239:01 remains useful.
- AUTHOR_APPROVED_DRAFT_PARTIAL P-G/O-A/A-UNRESOLVED is **suspended** as P/O/A approval until reaudit "at escape point."
- New status: `POA_APPROVAL_SUSPENDED_PENDING_AT_ESCAPE_POINT_REAUDIT`
- Must not be used as P-G or O-A example until reaudited.

### REAL-EVENT-0016

- Do not decide P-C vs P-G yet.
- First need source enrichment: was GPS/autopilot a real technical failure or a pilot interpretation problem at the escape-point moment?
- New status: `NEEDS_SOURCE_ENRICHMENT_FOR_ESCAPE_POINT_POA`

### ASIANA-214

- Objective must be evaluated at the escape-point moment.
- If the objective at that moment was to land safely, O tends to O-A, not O-D by continuation/outcome.
- P/O/A must be suspended until reaudited at the escape-point moment.
- New status: `POA_REAUDIT_REQUIRED_AT_ESCAPE_POINT`

### BS211-Q400

- Continues with problematic gate/escape point and high-risk P/O/A.
- New status: `FULL_REBUILD_REQUIRED_AT_ESCAPE_POINT`

### A4R87-EXT-002

- Continues requiring escape-point patch and P/O/A analysis at the escape-point moment, not by later EGPWS alerts.
- New status: `ESCAPE_POINT_AND_POA_REAUDIT_REQUIRED`

### AMERICAN-965

- Remains `NEEDS_SOURCE_ENRICHMENT`.

### COMAIR-5191

- Remains `NEEDS_SOURCE_ENRICHMENT`.

## Global Impact on 52 A4R126 Events

All prior real-event P/O/A from the 52 events tracked in A4R126 is reset to:

`POA_AT_ESCAPE_POINT_REAUDIT_REQUIRED`

Unless explicitly reaudited later under the A4R137+ rule.

Exceptions (preserved as when-statement only, not P/O/A):
- UPS-1354, COLGAN-3407, UNITED-173: "Quando..." statements from A4R128 remain valid as escape-point definitions. Their P/O/A drafts are still suspended.

## Implications for Reaudit

Future phases must:

1. Confirm the escape-point "Quando..." statement is valid.
2. Isolate P/O/A analysis to the escape-point moment only.
3. Mark any axis where evidence is post-escape-point only as UNRESOLVED.
4. Do not use post-escape events as proxy for P/O/A at the escape point.

## Locks Preserved

- NO_NEW_AUTHOR_DECISION in this phase.
- NO_RELEASED_CODE.
- NO_DOWNSTREAM.
- No documents deleted.
- No documents moved.
- No source enrichment.
- No P/O/A reclassification.
- No processing of new events.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.
- No runtime, UI, API, DB, migration, fixture, baseline, or code changes.

## Metrics

| metric | value |
|---|---:|
| methodResetCreatedCount | 1 |
| poaAtEscapePointRuleRegisteredCount | 1 |
| realEventPOAReferenceSuspendedCount | 52 |
| priorityEventsResetCount | 7 |
| authorApprovedDraftsSuspendedCount | 1 (REAL-EVENT-0003) |
| documentsDeletedCount | 0 |
| documentsMovedCount | 0 |
| releasedCodeCreatedCount | 0 |
| selectedCodeClassifiedCount | 0 |
| downstreamOpenedCount | 0 |
| poaReclassifiedCount | 0 |
| sourceEnrichmentPerformedCount | 0 |

## Next Steps

1. Reaudit REAL-EVENT-0003 P/O/A at escape point (autopilot disconnect context already enriched).
2. Source enrichment for REAL-EVENT-0016: GPS/autopilot failure vs interpretation at escape point.
3. Reaudit ASIANA-214 O-axis at the escape-point moment.
4. Full rebuild for BS211-Q400 with gate plus at-escape-point P/O/A.
5. Escape point patch plus at-escape-point P/O/A reaudit for A4R87-EXT-002.
6. Source enrichment for AMERICAN-965 and COMAIR-5191.
7. Reaudit remaining 52 events under the at-escape-point rule as capacity allows.
