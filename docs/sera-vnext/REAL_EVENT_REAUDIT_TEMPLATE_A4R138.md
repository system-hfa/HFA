# Real Event Reaudit Template A4R138

Status: TEMPLATE_RECORDED
Phase: A4+R-138
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Usage

This template must be used for every real-event P/O/A reaudit under the A4R137 "P/O/A at escape point" rule and the A4R138 protocol. Copy this template for each event and fill all applicable fields.

---

## Event Identification

- **eventId:**
- **eventName:**
- **sourceFiles:**
- **priorStatus (A4R135 Control Board):**
- **priorP (pre-A4R137):**
- **priorO (pre-A4R137):**
- **priorA (pre-A4R137):**
- **resetStatus (A4R137):**

## Pre-Escape Context

- **operationalConditions:**
- **automationModes:**
- **technicalSource:**
- **operationalIntention:**
- **taskContext:**
- **sourceLimitations:**

## Escape Point Moment

- **escapePointWhenStatement:**
- **unsafeActOrCondition:**
- **controlledVariable:**
- **safeLimitOrExpectedState:**
- **evidenceAnchor:**
- **timelinePosition:**
- **whyFirstDeparture:**
- **preventabilityTest:**
- **directActor:**
- **technicalFailureAlternative:**
- **sourceConfidence:** [ HIGH | MEDIUM | LOW ]
- **escapePointStatus:** [ DEFINED | UNRESOLVED | SOURCE_PARTIAL | TECHNICAL_FAILURE_NOT_EXCLUDED | DIRECT_ACTOR_UNCLEAR | CONDITION_DOMINANT | MULTI_ACTOR_NOT_DECOMPOSED | POST_ESCAPE_ONLY | WARNING_AS_CONSEQUENCE_ONLY | PROGRESSIVE_ESCAPE_ZONE_SOURCE_PARTIAL ]
- **escapePointTemporalType:** [ DISCRETE_ESCAPE_POINT | PROGRESSIVE_ESCAPE_ZONE | FIRST_OBSERVABLE_UNSAFE_MARKER_ONLY | CRITICAL_POINT_ONLY | POST_ESCAPE_ONLY ]
- **progressiveEscapeZoneStartCandidate:**
- **progressiveEscapeZoneEndCandidate:**
- **firstObservableUnsafeMarker:**
- **inferredEarlierDeparturePossible:** [ TRUE | FALSE ]
- **criticalPointMarker:**
- **accidentOutcomeMarker:**
- **sourceCanIdentifyFirstDeparture:** [ YES | NO | PARTIAL ]
- **poaAnalysisAnchor:** [ DISCRETE_ESCAPE_POINT | EARLIEST_DOCUMENTED_ZONE_START | FIRST_OBSERVABLE_UNSAFE_MARKER | UNAVAILABLE_BLOCK_POA ]
- **postEscapeActionsExcludedFromPoa:** [ YES | NO ]
- **postEscapeActionsExcludedFromPoaDescription:**
- **progressiveEscapeLimitations:**

## Post-Escape Consequences

- **trajectoryDegradation:**
- **warningsAlerts:**
- **lossOfControl:**
- **impactCollision:**
- **lateRecovery:**
- **finalOutcome:**
- **consequenceOnlyNote:** Confirm that none of the above is used as primary basis for P/O/A.

## P Axis — Perception at Escape Point

- **pAtEscapePointQuestion:** What did the operator/crew perceive or believe at the moment of the escape point?
- **pAtEscapePointEvidence:**
- **pInformationAvailable:** [ YES | PARTIAL | NO ]
- **pInformationQuality:** [ CORRECT | AMBIGUOUS | DEGRADED | CONFLICTING | ABSENT ]
- **pHumanVsTechnical:** [ HUMAN_PERCEPTION | TECHNICAL_FAILURE | CANNOT_DISTINGUISH ]
- **pCodeDraft:**
- **pConfidence:** [ HIGH | MEDIUM | LOW ]
- **pUnresolvedReason:** (fill only if UNRESOLVED)

## O Axis — Objective at Escape Point

- **oAtEscapePointQuestion:** What was the operator/crew objective at the moment of the escape point?
- **oAtEscapePointEvidence:**
- **oObjectiveCompatibleWithSafeOperation:** [ YES | NO | CANNOT_DETERMINE ]
- **oUnsafeObjectivePresentAtEscapePoint:** [ YES | NO | INFERRED_FROM_POST_ESCAPE ]
- **oIfObjectiveWasSafe:** If the objective at escape point was to land/fly/recover safely, O tends to O-A. State explicitly.
- **oCodeDraft:**
- **oConfidence:** [ HIGH | MEDIUM | LOW ]
- **oUnresolvedReason:** (fill only if UNRESOLVED)

## A Axis — Action at Escape Point

- **aAtEscapePointQuestion:** What action was being executed/attempted at the moment of the escape point?
- **aAtEscapePointEvidence:**
- **aActionCausedEscapePoint:** [ YES | NO | CANNOT_DETERMINE ]
- **aAlternativeActionAvailable:** [ YES | NO | CANNOT_DETERMINE ]
- **aMechanism:** [ SELECTION | EXECUTION | KNOWLEDGE | FEEDBACK | COORDINATION | NOT_ISOLABLE ]
- **aCodeDraft:**
- **aConfidence:** [ HIGH | MEDIUM | LOW ]
- **aUnresolvedReason:** (fill only if UNRESOLVED)

## Blocks

Check each block. If any block applies, P/O/A cannot proceed.

- **BLOCK_POA_ESCAPE_POINT_UNRESOLVED:** [ YES | NO ]
- **BLOCK_POA_SOURCE_PARTIAL:** [ YES | NO ]
- **BLOCK_POA_TECHNICAL_FAILURE_NOT_EXCLUDED:** [ YES | NO ]
- **BLOCK_POA_POST_ESCAPE_EVIDENCE_ONLY:** [ YES | NO ]
- **BLOCK_POA_DIRECT_ACTOR_UNCLEAR:** [ YES | NO ]
- **BLOCK_POA_WARNING_AS_ESCAPE_POINT:** [ YES | NO ]
- **BLOCK_POA_OBJECTIVE_INFERRED_FROM_OUTCOME:** [ YES | NO ]
- **BLOCK_POA_ACTION_INFERRED_FROM_OUTCOME:** [ YES | NO ]
- **BLOCK_POA_PROGRESSIVE_ESCAPE_START_NOT_DOCUMENTED:** [ YES | NO ]
- **BLOCK_POA_CRITICAL_POINT_CONFUSED_WITH_ESCAPE_POINT:** [ YES | NO ]
- **BLOCK_POA_POST_ESCAPE_CORRECTIVE_ACTION_ONLY:** [ YES | NO ]

**blockedReasons:** (summary if any block is YES)

## Reaudit Decision

- **reAuditDecision:** [ REAUDITED_AT_ESCAPE_POINT_DRAFT | PARTIAL_REAUDIT_AT_ESCAPE_POINT | PARTIAL_REAUDIT_PROGRESSIVE_ESCAPE | UNRESOLVED_AT_ESCAPE_POINT | NEEDS_SOURCE_ENRICHMENT | NEEDS_PROGRESSIVE_ESCAPE_SOURCE_ENRICHMENT | NEEDS_FULL_REBUILD | PARKED | TECHNICAL_FAILURE_DOMINANT | CONDITION_DOMINANT ]
- **allowedUse:** [ NONE | DRAFT_REVIEW_ONLY | SPECIFIC_AXES_ONLY ]
- **restrictions:**
- **nextAction:**

## Controls

- NO_RELEASED_CODE
- NO_DOWNSTREAM
- No finalConclusion
- No HFACS
- No Risk/ERC
- No ARMS/ERC
- No recommendations
