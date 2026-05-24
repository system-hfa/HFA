# REAL-EVENT-BATCH2-EXTRACTION-001

Status:
- STRUCTURED_EXTRACTION_DRAFT
- BATCH_2
- NOT_CLASSIFIED
- NOT_FIXTURE
- NOT_BASELINE
- NOT_CONSENSUS_VALIDATED
- NOT_FOR_DOWNSTREAM
- NO_PROPOSED_CODE
- NO_RELEASED_CODE
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_RECOMMENDATIONS

- extractionId: A4R72-B2-001
- batchId: A4R72_BATCH_2
- sourceCandidateId: PDF24-TXT-CAND-001
- originalRealEventId: REAL-EVENT-0003
- sourceDocument: docs/real-event-harvest/REAL_EVENT_DEEP_EXTRACTION_0003_0004_0006_v0.1.4.md
- sourceLocator: PART A (lines 62-210, especially chronology and unsafe-state description)
- shortLabel: S-76C+ Tofino night approach near-CFIT trend
- aircraftOperation: Sikorsky S-76C+, night VFR medevac / approach to temporarily lit landing area
- eventType: near-CFIT and loss-of-control trend during final approach
- sourceType: EXISTING_EXTRACT + TXT_CONVERTED_FROM_PDF corroboration
- extractionConfidence: HIGH
- anchorQuality: HIGH

## factualSummary
The available evidence describes a night approach in which the helicopter transitioned from a controlled profile to a low-speed, high-descent-rate state after autopilot disconnection, with rotor speed decay and degraded control margins. The crew recovered at very low height, avoiding impact.

## eventSequence
1. Night VFR medevac flight proceeded toward Tofino/Long Beach destination.
2. Approach was conducted toward a temporarily lit landing area.
3. Autopilot was disconnected during the approach segment.
4. Energy state degraded (low speed + high descent rate), followed by rotor speed decay.
5. Control margins became critically reduced, with near-CFIT exposure.
6. Crew recovered at very low height and later completed landing.

## unsafeStateCandidate
Candidate unsafe state is a degraded low-energy approach profile at low altitude (low airspeed, high descent rate, rotor speed decay) with near-CFIT exposure.

## unsafeActConditionCandidate
Candidate unsafe act/condition is unresolved at extraction stage: possible interaction between crew monitoring/handling and reduced visual cue environment during night approach.

## directActorCandidate
Flight crew (PF/PM split not fully resolved in this extraction).

## evidenceFragments
- "night VFR medical evacuation flight" and "temporarily lit helipad" context.
- "autopilot was disconnected during the approach".
- "low-speed and high-descent-rate state" with "rotor speed decayed".
- "recovered at extremely low height".

## uncertaintyNotes
- Exact PF/PM action timing around autopilot disconnection is not fully anchored in this extraction.
- Relative weight of perception limits versus control-input execution remains unresolved.
- EGPWS/TAWS behavior should not be overinterpreted without direct parameter trace alignment.

## excludedInformation
- No import of final causal statements from external report conclusions.
- No import of recommendations or safety actions as SERA classification evidence.
- No conversion of report analysis text into final P/O/A judgement.

## possibleEvidenceCategoryHints
- FLIGHT_PATH_ENERGY
- APPROACH_VISUAL_CUES
- CREW_MONITORING
- AUTOMATION_STATE_TRANSITION

## adjudicationQuestions
- Who was PF at each transition point, and who called/confirmed autopilot state changes?
- Which cues were available versus effectively used during low-height segment?
- Was the critical transition primarily perception, action execution, or mixed?

- sourceEnrichmentNeeded: no
- nextStepRecommendation: Carry to A4+R-73 adjudication with explicit unresolved split between perception limitations and action/monitoring execution.
