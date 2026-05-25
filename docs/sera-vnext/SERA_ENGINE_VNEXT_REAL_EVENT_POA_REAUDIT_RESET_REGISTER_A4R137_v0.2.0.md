# SERA Engine vNext Real Event POA Reaudit Reset Register A4R137 v0.2.0

Status: POA_REAUDIT_RESET_REGISTER_RECORDED
Phase: A4+R-137
methodology: SERA
authorDecisionStatus: NO_NEW_AUTHOR_DECISION — PRIOR APPROVALS SUSPENDED
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Objective

Register the reset status of all real-event P/O/A after the A4R137 methodological correction: P/O/A must be analyzed at the escape-point moment.

## Priority 7 Events — Reset Table

| eventId | priorStatus (A4R135) | resetStatus (A4R137) | factualMaterialStillUsable | poaUsableAsReference | reason | nextAction |
|---|---|---|---|---|---|---|
| REAL-EVENT-0003 | AUTHOR_APPROVED_DRAFT_PARTIAL | POA_APPROVAL_SUSPENDED_PENDING_AT_ESCAPE_POINT_REAUDIT | Autopilot enrichment (A4R132); A4R130 escape point; A4R133 "Quando..." with autopilot context | NO — suspended | P/O/A approved without explicit at-escape-point analysis; P-G/O-A may be correct but was not validated at the escape-point moment | Reaudit P-G/O-A at escape point: what did PF perceive/believe/execute at the moment of manual disconnect and profile degradation? |
| REAL-EVENT-0016 | ACTIVE_REVIEW | NEEDS_SOURCE_ENRICHMENT_FOR_ESCAPE_POINT_POA | Batch 2 extraction; A4R130 escape point; A4R104 trace draft | NO | Cannot decide P-C vs P-G without knowing if GPS/autopilot was a real technical failure or a pilot interpretation problem at the escape-point moment | Source enrichment for GPS/autopilot failure vs interpretation at escape point |
| BS211-Q400 | NEEDS_REBUILD | FULL_REBUILD_REQUIRED_AT_ESCAPE_POINT | Batch 3 extraction; A4R134 gate patch draft; A4R104 trace draft | NO | Gate/escape point embeds violation language (A4R134 patch not approved); P/O/A was built from post-escape trajectory, not at-escape-point state | Full rebuild: validate A4R134 gate, then build P/O/A at the escape-point moment |
| A4R87-EXT-002 | NEEDS_REBUILD | ESCAPE_POINT_AND_POA_REAUDIT_REQUIRED | External Batch 1 extraction; A4R134 escape point patch draft; A4R104 trace draft | NO | EGPWS as temporal marker removed (A4R134); but P/O/A still built from alert chronology, not pre-alert escape-point state | Validate A4R134 gate, then isolate P/O/A at the pre-EGPWS escape-point moment |
| ASIANA-214 | ACTIVE_REVIEW | POA_REAUDIT_REQUIRED_AT_ESCAPE_POINT | A4R106/A4R115 source slices; A4R130 escape point; NTSB official report | NO | O-D was based on continuation past stabilization gate (post-escape outcome), not on the objective at the escape-point moment | Reaudit O-axis at escape point; if objective was to land safely, O tends to O-A |
| AMERICAN-965 | NEEDS_SOURCE_ENRICHMENT | NEEDS_SOURCE_ENRICHMENT | A4R115 source slice; NTSB official report | NO | Source enrichment still needed before any escape-point or P/O/A work | Source enrichment |
| COMAIR-5191 | NEEDS_SOURCE_ENRICHMENT | NEEDS_SOURCE_ENRICHMENT | A4R106/A4R109/A4R110 source material; NTSB official report | NO | Source enrichment still needed before any escape-point or P/O/A work | Source enrichment |

## All 52 A4R126 Events — Global Reset

| scope | resetStatus | rule |
|---|---|---|
| All 52 events tracked in A4R126 | POA_AT_ESCAPE_POINT_REAUDIT_REQUIRED | Prior P/O/A suspended as reference. Each event must be reaudited under the at-escape-point rule before P/O/A can be used as reference, training, or calibration material. |
| QUEUE_A events (UPS-1354, COLGAN-3407, UNITED-173) | When-statement preserved; P/O/A suspended | A4R128 "Quando..." statements remain valid as escape-point definitions. Their P/O/A drafts are still suspended pending at-escape-point reaudit. |
| QUEUE_B events | P/O/A suspended; escape points preserved where defined | P/O/A from A4R129/A4R130 suspended. Defined escape points (A4R130) remain as candidate anchors. |
| QUEUE_C events | Still FULL_REBUILD_REQUIRED | Rebuild must now include at-escape-point rule. |
| QUEUE_D events | Still NEEDS_SOURCE_ENRICHMENT | Enrichment must target evidence at the escape-point moment. |
| QUEUE_E events | Still PARKED | Boundary/technical/actor issues remain. |
| QUEUE_F events | Still SUPERSEDED | No change. |

## What This Reset Does NOT Invalidate

The following remain valid and usable:

- Factual extractions (A4R62, A4R72, A4R76, A4R88)
- Source enrichment factual findings (A4R67, A4R132 autopilot)
- Event timelines and evidence anchors
- "Quando..." escape-point statements that pass the Hendy gate
- Gate patch documents (A4R134)
- Control board structure and quarantine register (A4R135)
- Methodological rules, locks, and definitions
- The canonical SERA question tree (A4R99)

## Locks Preserved

- NO_NEW_AUTHOR_DECISION.
- NO_RELEASED_CODE.
- NO_DOWNSTREAM.
- No documents deleted or moved.
- No P/O/A reclassification.
- No source enrichment.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.
- No runtime, UI, API, DB, migration, fixture, baseline, or code changes.

## Next Steps

1. Apply at-escape-point reaudit to priority events in order: REAL-EVENT-0003, ASIANA-214, REAL-EVENT-0016, BS211-Q400, A4R87-EXT-002.
2. Source enrichment for AMERICAN-965 and COMAIR-5191 targeting escape-point evidence.
3. Expand reaudit to remaining 52 events as capacity allows.
4. Each reaudited event must have its P/O/A explicitly tied to the escape-point moment.
