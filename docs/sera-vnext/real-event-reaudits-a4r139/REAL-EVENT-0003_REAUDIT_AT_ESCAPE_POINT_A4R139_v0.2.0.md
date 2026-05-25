# REAL-EVENT-0003 Reaudit at Escape Point A4R139 v0.2.0

Status: REAUDITED_AT_ESCAPE_POINT_DRAFT
Phase: A4+R-139
methodology: SERA
eventId: REAL-EVENT-0003
authorDecisionStatus: NO_NEW_AUTHOR_DECISION — PRIOR A4R133 APPROVAL SUSPENDED FOR POA (A4R137)
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Event Identification

- **eventId:** REAL-EVENT-0003
- **eventName:** S-76C+ Tofino night approach near-CFIT
- **sourceFiles:**
  - TSB A15P0217 (source-corpus/txt-events/pdf24_merged-3.txt)
  - REAL-EVENT-BATCH2-EXTRACTION-001 (A4R72-B2-001)
  - REAL-EVENT-BATCH2-ADJUDICATION-001
  - Autopilot Disconnect Enrichment A4R132
  - Author Decision REAL-EVENT-0003 A4R133
- **priorStatus (A4R135 Control Board):** AUTHOR_APPROVED_DRAFT_PARTIAL
- **priorP (pre-A4R137):** P-G
- **priorO (pre-A4R137):** O-A
- **priorA (pre-A4R137):** UNRESOLVED
- **resetStatus (A4R137):** POA_APPROVAL_SUSPENDED_PENDING_AT_ESCAPE_POINT_REAUDIT

## Pre-Escape Context

- **operationalConditions:** Night VFR medevac flight, Sikorsky S-76C+, approach toward temporarily lit landing area at Tofino/Long Beach. NVFR conditions with reduced visual cue environment.
- **automationModes:** Autopilot engaged during approach segment. Coupled flight was available but SOP limited coupled flight below 1000 ft.
- **technicalSource:** No indication of system-related malfunction during the flight (TSB). Helicopter certified, equipped, and maintained per approved procedures.
- **operationalIntention:** Visual approach to Runway 29 / temporarily lit landing area. Transition from coupled to manual/visual flight at 600 ft ASL per SOP requirement to decouple before final approach checks or sooner.
- **taskContext:** Final approach phase. PF disengaged autopilot at 0239:01. SOP: no coupled flight in visual circuit, decouple before final approach checks or sooner. SOP did not define a minimum airspeed for NVFR approach. VMINI = 60 KIAS for IMC was a known reference.
- **sourceLimitations:** The TSB report describes the event chronology but does not provide a direct quote of PF subjective rationale for the disconnect. The exact moment of first departure from safe manual/visual approach is not pinpointed to a single specific act or parameter value. The degradation is described as a process (deceleration → low speed → high pitch → large control inputs → hazardous profile), not a single discrete event.

## Escape Point Moment

- **escapePointWhenStatement:** "Quando, apos a desconexao manual do autopilot pelo PF, a velocidade indicada e a atitude de cabrar se desviaram progressivamente do perfil de aproximacao visual estabilizada, o perfil de energia da aproximacao saiu do envelope de operacao segura."
- **unsafeActOrCondition:** Progressive deviation of airspeed (decreasing below safe approach speed) and pitch attitude (increasing beyond safe approach attitude) during manual/visual approach segment, without timely correction.
- **controlledVariable:** Approach energy profile (airspeed, descent rate, pitch attitude, rotor speed).
- **safeLimitOrExpectedState:** Stabilized visual approach profile with adequate airspeed (above rotor-speed-decay threshold), controlled descent rate, and safe pitch attitude compatible with night visual conditions.
- **evidenceAnchor:** TSB A15P0217: after autopilot disconnect at 0239:01, helicopter decelerated while maintaining constant altitude; approximately 10 seconds after disconnect, speed decreased below 60 KIAS and pitch attitude increased beyond 14 degrees nose-up. PF commented landing zone was closer than expected and made large control inputs to adjust descent angle and speed, resulting in a hazardous approach profile.
- **timelinePosition:** Between 0239:01 (manual autopilot disconnect) and 0239:11+ (speed < 60 KIAS, pitch > 14°), during final visual approach at approximately 600 ft ASL descending.
- **whyFirstDeparture:** The autopilot disconnect at 0239:01 was contextual/normal (SOP-compliant manual transition). The first departure from safe operation occurred AFTER the disconnect, when the manual/visual approach profile began to deviate (deceleration without correction) and progressively degraded into low speed and excessive pitch. The disconnect is pre-escape context, not the escape point itself.
- **preventabilityTest:** The progressive deviation was preventable by timely monitoring and correction of airspeed and pitch during the manual/visual segment. The source indicates the PF recognized the landing zone was closer than expected and made large control inputs, but these were corrective actions after the deviation had already developed.
- **directActor:** PF (Pilot Flying) — manual control after autopilot disconnect.
- **technicalFailureAlternative:** RULED OUT — TSB found no indication of system-related malfunction. Autopilot disconnect was manual/voluntary, not automatic or system-driven.
- **sourceConfidence:** MEDIUM
- **escapePointStatus:** SOURCE_PARTIAL

**escapePointStatus justification:**

The escape point is SOURCE_PARTIAL because:
1. The exact discrete observable moment of first departure from safe manual/visual approach is not precisely documented in the source.
2. The degradation is described as a progressive process (deceleration → speed < 60 KIAS at 0.3 NM → large control inputs → hazardous profile) rather than a single discrete event.
3. The safe limit for a night visual approach (minimum safe speed, maximum safe descent rate) is not explicitly defined in the source — SOP did not define a minimum airspeed for NVFR approach.
4. The source provides adequate evidence to characterize the pre-escape context (manual disconnect, SOP compliance) and post-escape consequences (low speed, high descent, rotor decay, near-CFIT), but the exact transition point is a zone, not a moment.
5. This does NOT mean the escape point is invalid — it means the available source does not allow a single discrete observable act/condition to be isolated with HIGH confidence.

## Post-Escape Consequences

- **trajectoryDegradation:** Speed decreased below 60 KIAS (~VMINI); pitch attitude exceeded 14° nose-up; high descent rate developed.
- **warningsAlerts:** No TAWS/EGPWS warning detailed in available source extraction for the escape-point moment.
- **lossOfControl:** Rotor speed decay; directional control degraded; flight path became hazardous.
- **impactCollision:** No impact — crew recovered at extremely low height.
- **lateRecovery:** Crew recovered at very low height; near-CFIT exposure.
- **finalOutcome:** Near-CFIT; no injuries; aircraft recovered.
- **consequenceOnlyNote:** The above consequences are confirmed as POST-ESCAPE and are NOT used as primary basis for P/O/A classification. P/O/A analysis below is limited to the escape-point moment zone as defined above.

## P Axis — Perception at Escape Point

- **pAtEscapePointQuestion:** At the moment the manual/visual approach profile began to deviate from safe parameters (airspeed decreasing, pitch increasing), what did the PF/crew perceive or believe?
- **pAtEscapePointEvidence:** The source indicates the PF recognized the landing zone was closer than expected (PF commented on this) and subsequently made large control inputs to adjust descent angle and speed. However, the source does not specify exactly what the PF perceived at the FIRST moment of deviation — we know what the PF perceived AFTER the deviation had progressed (closer-than-expected landing zone). The exact perception state at the first moment of airspeed/pitch departure is not directly documented.
- **pInformationAvailable:** PARTIAL
- **pInformationQuality:** The source does not provide sufficient detail about what flight-state cues (airspeed indicator, pitch attitude, visual references) were specifically registered vs. missed by the PF at the first moment of deviation. The information was likely available (instruments functioning, no malfunction), but the source does not document whether it was effectively monitored at that exact moment.
- **pHumanVsTechnical:** HUMAN_PERCEPTION — technical failure is ruled out (TSB: no system malfunction). The issue was human monitoring/interpretation of the manual/visual approach profile.
- **pCodeDraft:** UNRESOLVED
- **pConfidence:** LOW
- **pUnresolvedReason:** The source describes the PF's recognition AFTER the deviation had progressed (closer-than-expected landing zone, large control inputs). It does not provide sufficient evidence about what the PF perceived or believed at the exact first moment the approach profile began to deviate from safe parameters. Without evidence anchoring perception at the escape-point moment, P cannot be classified as P-G, P-C, or any specific P code. The prior P-G classification was based on general monitoring failure inference from the outcome (hazardous profile), not from perception evidence at the escape-point moment.

## O Axis — Objective at Escape Point

- **oAtEscapePointQuestion:** At the moment the manual/visual approach profile began to deviate from safe parameters, what was the PF/crew's objective?
- **oAtEscapePointEvidence:** The crew was conducting a visual approach to land at Tofino/Long Beach. The autopilot was disconnected manually per SOP for the transition to visual/manual final approach. There is no evidence in the source of any objective other than completing the approach and landing safely. The PF's subsequent corrective actions (lowering collective, adjusting descent angle) are consistent with an objective to land safely, not with an intentional unsafe objective.
- **oObjectiveCompatibleWithSafeOperation:** YES
- **oUnsafeObjectivePresentAtEscapePoint:** NO
- **oIfObjectiveWasSafe:** At the escape-point moment, the objective was to complete the visual approach and land safely. There is no evidence that the crew adopted an unsafe objective at any point. O tends to O-A.
- **oCodeDraft:** O-A
- **oConfidence:** HIGH
- **oUnresolvedReason:** (not applicable — O-A is well-supported)

## A Axis — Action at Escape Point

- **aAtEscapePointQuestion:** At the moment the manual/visual approach profile began to deviate from safe parameters, what action was being executed/attempted by the PF/crew?
- **aAtEscapePointEvidence:** After manual autopilot disconnect, the PF was hand-flying the visual approach. The source indicates the helicopter decelerated while maintaining constant altitude, then speed decreased below 60 KIAS with pitch exceeding 14°. The PF subsequently recognized the landing zone was closer than expected and made large control inputs. However, the source does not provide a detailed step-by-step account of PF control inputs, PM monitoring/callouts, or specific action mechanism at the first moment of deviation. The PF/PM interaction chain is not decomposed in the available source.
- **aActionCausedEscapePoint:** CANNOT_DETERMINE
- **aAlternativeActionAvailable:** CANNOT_DETERMINE — the source does not specify what alternative action was available and known at the exact first moment of deviation versus what became apparent later.
- **aMechanism:** NOT_ISOLABLE — the PF/PM chain, the timing of monitoring vs. correction, and the specific action mechanism (selection, execution, feedback, coordination) are not closed in the available source.
- **aCodeDraft:** UNRESOLVED
- **aConfidence:** LOW
- **aUnresolvedReason:** The PF/PM interaction, the specific control inputs at the first moment of deviation (versus later corrective inputs), callouts, and action mechanism are not sufficiently decomposed in the available source. The prior A = UNRESOLVED from A4R133 remains correct, and the source limitations that prevented A-axis closure before A4R137 persist under the at-escape-point rule. The large control inputs described in the source are corrective actions after the deviation developed, not the action at the escape-point moment.

## Blocks

- **BLOCK_POA_ESCAPE_POINT_UNRESOLVED:** NO — escape point is defined as SOURCE_PARTIAL (not UNRESOLVED). The escape zone is characterized; the limitation is precision, not absence.
- **BLOCK_POA_SOURCE_PARTIAL:** YES — source evidence does not allow a single discrete observable moment to be isolated with HIGH confidence. The degradation is a progressive process. This affects P and A classification (see below).
- **BLOCK_POA_TECHNICAL_FAILURE_NOT_EXCLUDED:** NO — technical failure is ruled out by TSB.
- **BLOCK_POA_POST_ESCAPE_EVIDENCE_ONLY:** NO — pre-escape context is documented (manual disconnect, SOP, operational conditions).
- **BLOCK_POA_DIRECT_ACTOR_UNCLEAR:** NO — PF is identified as direct actor after manual disconnect.
- **BLOCK_POA_WARNING_AS_ESCAPE_POINT:** NO — escape point is not based on warning/alerts.
- **BLOCK_POA_OBJECTIVE_INFERRED_FROM_OUTCOME:** NO — O-A is based on evidence of objective at escape point, not inferred from the near-CFIT outcome.
- **BLOCK_POA_ACTION_INFERRED_FROM_OUTCOME:** YES — the prior A-axis draft and the TSB analysis describe actions (large control inputs) that occurred after the deviation developed. The action at the escape-point moment (first moment of deviation) is not directly documented. Without this, A cannot be classified.

**blockedReasons:**

1. BLOCK_POA_SOURCE_PARTIAL: The escape point is a progressive zone, not a single discrete observable moment. P classification requires knowing what was perceived at a specific moment; the source shows perception after deviation had progressed, not at first departure.
2. BLOCK_POA_ACTION_INFERRED_FROM_OUTCOME: Actions documented in the source (large control inputs, lowering collective) are corrective responses after the deviation, not actions at the escape-point moment. A cannot be classified from post-escape actions.

O-axis is NOT blocked: the objective (land safely) is independently evidenced at the escape-point moment and does not depend on post-escape consequence for classification.

## Reaudit Decision

- **reAuditDecision:** PARTIAL_REAUDIT_AT_ESCAPE_POINT
- **allowedUse:** O-A only — P and A remain UNRESOLVED
- **restrictions:**
  - O-A is reaudited at escape point with HIGH confidence.
  - P and A remain UNRESOLVED due to source partiality at the escape-point moment.
  - NOT a full P/O/A reference.
  - NO_RELEASED_CODE.
  - NO_DOWNSTREAM.
  - Prior A4R133 P-G approval is NOT reinstated — P was classified from general monitoring failure inference, not from perception evidence at the escape-point moment.
  - PF/PM chain decomposition remains needed for A-axis.
- **nextAction:**
  1. O-A is validated at the escape point and can be used as draft O-A reference (only on O-axis, with SOURCE_PARTIAL caveat on escape point precision).
  2. P-axis needs source enrichment targeting PF perception at the exact first moment of approach deviation — or accept UNRESOLVED as final for this event.
  3. A-axis needs PF/PM chain decomposition before reclassification is possible.
  4. Escape point precision could be improved with additional source data (CVR/FDR parameter trace if available) to pinpoint the first discrete departure moment.

## Controls

- NO_RELEASED_CODE
- NO_DOWNSTREAM
- No finalConclusion
- No HFACS
- No Risk/ERC
- No ARMS/ERC
- No recommendations
