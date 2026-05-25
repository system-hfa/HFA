# SERA Engine vNext Progressive Escape Point Guidance A4R140 v0.2.0

Status: GUIDANCE_RECORDED
Phase: A4+R-140
methodology: SERA
authorDecisionStatus: NO_NEW_AUTHOR_DECISION
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Objective

Formalize methodological guidance for events where escape from safe operation is not a single discrete instant, but a progressive degradation zone. Amend A4R138 protocol usage without reauditing any event in this phase.

## Relation to A4R137, A4R138, and A4R139

- A4R137 established the rule: P/O/A must be analyzed at the escape point.
- A4R138 defined the reaudit protocol for real events.
- A4R139 (REAL-EVENT-0003 pilot) showed a recurrent pattern: escape can be progressive and only partially documentable as a first-departure instant.
- A4R140 formalizes how to apply A4R137/A4R138 when escape is progressive.

## Core Definitions

### 1) DISCRETE_ESCAPE_POINT

A single, documentable moment when operation left the safe state.

### 2) PROGRESSIVE_ESCAPE_ZONE

A time window where operation progressively departed from the safe state and source evidence does not isolate one exact first instant with high precision.

### 3) FIRST_OBSERVABLE_UNSAFE_MARKER

The first documented marker that operation was already unsafe or entering unsafe conditions. This marker is not automatically the true first departure instant.

### 4) CRITICAL_POINT

A later point where recovery became difficult, improbable, or late. Critical point is not automatically the escape point.

### 5) ACCIDENT_OUTCOME

Final event outcome. It must never be used as escape point.

## Rules for P/O/A in Progressive Escape Cases

### Rule 1 — Progressive escape does not authorize late P/O/A inference

When a case is `PROGRESSIVE_ESCAPE_ZONE`, P/O/A must be analyzed at the earliest documentable zone start, not at the most severe later point.

If the earliest documentable zone start does not support an axis, that axis remains `UNRESOLVED`.

### Rule 2 — First observable marker is not always first real departure

When only first observable marker is available, register:
- `firstObservableUnsafeMarker`
- `inferredEarlierDeparturePossible` (true/false)
- confidence
- limitation

Do not auto-upgrade this marker to a high-confidence first departure point.

### Rule 3 — SOURCE_PARTIAL is a valid result

If progressive zone exists but exact first instant cannot be precisely isolated, `SOURCE_PARTIAL` is methodologically valid.

`SOURCE_PARTIAL` indicates source limitation, not protocol failure.

### Rule 4 — Partial reaudit is valid

If only some axes are supportable at earliest zone start, use partial reaudit output.

Example from A4R139:
- P = UNRESOLVED
- O = O-A
- A = UNRESOLVED

This is valid when O is supported at zone start while P/A are not.

### Rule 5 — Post-escape corrective actions are not primary A-axis basis

Actions observed after degradation is already clear must be treated as post-escape corrective actions and excluded from primary A-axis classification anchor.

### Rule 6 — Do not infer P from later degradation recognition

If source only shows that operator recognized degradation after it progressed, do not classify P-G at the escape anchor.

### Rule 7 — Evaluate objective at escape-zone start

If objective at earliest documentable zone start is to operate/land/recover safely, O tends to O-A, even if later outcome is adverse.

Do not use continuation, critical point, or final outcome to force O-D/O-C.

## Mandatory Fields for Progressive Escape Handling

- `escapePointTemporalType`
  - `DISCRETE_ESCAPE_POINT`
  - `PROGRESSIVE_ESCAPE_ZONE`
  - `FIRST_OBSERVABLE_UNSAFE_MARKER_ONLY`
  - `CRITICAL_POINT_ONLY`
  - `POST_ESCAPE_ONLY`
- `progressiveEscapeZoneStartCandidate`
- `progressiveEscapeZoneEndCandidate`
- `firstObservableUnsafeMarker`
- `inferredEarlierDeparturePossible`
- `criticalPointMarker`
- `accidentOutcomeMarker`
- `sourceCanIdentifyFirstDeparture` (`YES` / `NO` / `PARTIAL`)
- `poaAnalysisAnchor`
  - `DISCRETE_ESCAPE_POINT`
  - `EARLIEST_DOCUMENTED_ZONE_START`
  - `FIRST_OBSERVABLE_UNSAFE_MARKER`
  - `UNAVAILABLE_BLOCK_POA`
- `postEscapeActionsExcludedFromPoa` (`YES/NO` + description)
- `progressiveEscapeLimitations`

## New Blocks and Status Formalization

### blockedReason additions

- `BLOCK_POA_PROGRESSIVE_ESCAPE_START_NOT_DOCUMENTED`
- `BLOCK_POA_CRITICAL_POINT_CONFUSED_WITH_ESCAPE_POINT`
- `BLOCK_POA_POST_ESCAPE_CORRECTIVE_ACTION_ONLY`

### status formalization/additions

- `PROGRESSIVE_ESCAPE_ZONE_SOURCE_PARTIAL`
- `PARTIAL_REAUDIT_PROGRESSIVE_ESCAPE`
- `NEEDS_PROGRESSIVE_ESCAPE_SOURCE_ENRICHMENT`

`PARTIAL_REAUDIT_AT_ESCAPE_POINT` remains valid for continuity with already-issued outputs.

## Applied Example: Impact on A4R139 (REAL-EVENT-0003)

A4R139 result remains valid and unchanged:

- `escapePointStatus = SOURCE_PARTIAL`
- `reAuditDecision = PARTIAL_REAUDIT_AT_ESCAPE_POINT`
- `P = UNRESOLVED`
- `O = O-A`
- `A = UNRESOLVED`

A4R140 interpretation:

- The case is a `PROGRESSIVE_ESCAPE_ZONE`.
- O-A is valid at earliest documentable zone/operational-intention anchor.
- P and A are blocked because evidence at zone start is insufficient.
- Prior P-G remains not reinstated.

## Implications for Next Pilots

Before any P/O/A axis in each pilot:
1. Declare temporal type (`DISCRETE_ESCAPE_POINT` vs `PROGRESSIVE_ESCAPE_ZONE`).
2. Fill progressive fields when applicable.
3. Confirm `poaAnalysisAnchor`.

Pilot-specific criteria:
- REAL-EVENT-0016: apply temporal-type declaration before technical-failure vs interpretation split.
- ASIANA-214: apply temporal-type declaration before O-axis adjudication.
- BS211-Q400: avoid critical-point/warning-as-escape-point anchoring.
- A4R87-EXT-002: avoid EGPWS/warning chronology as escape-point proxy; isolate earliest pre-warning departure evidence.

## Locks Preserved

- NO_NEW_AUTHOR_DECISION.
- NO_RELEASED_CODE.
- NO_DOWNSTREAM.
- No event reaudit executed in this phase.
- No P/O/A reclassification in this phase.
- No source enrichment in this phase.
- No documents deleted or moved.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.
- No runtime, UI, API, DB, migration, fixture, baseline, or code changes.

## Metrics

| metric | value |
|---|---:|
| progressiveGuidanceCreatedCount | 1 |
| protocolAmendedCount | 1 |
| templateAmendedCount | 1 |
| pilotPlanAmendedCount | 1 |
| methodReadmeUpdatedCount | 1 |
| eventsReauditedCount | 0 |
| poaReclassifiedCount | 0 |
| releasedCodeCreatedCount | 0 |
| selectedCodeClassifiedCount | 0 |
| downstreamOpenedCount | 0 |
| sourceEnrichmentPerformedCount | 0 |
| documentsDeletedCount | 0 |
| documentsMovedCount | 0 |

