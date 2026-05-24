# REAL-EVENT-BATCH3-EXTRACTION-009

Status:
- STRUCTURED_EXTRACTION_DRAFT
- BATCH_3
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

- extractionId: A4R76-B3-009
- batchId: A4R76_BATCH_3
- sourceCandidateId: A4R75-B3-009
- originalRealEventId: N11NM
- sourceDocument: /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt
- sourceLocator: lines 1017-1257 (N11NM event and cockpit-data references)
- shortLabel: N11NM AW109S missed-approach LOC in night IMC
- aircraftOperation: Leonardo AW109S air ambulance (HEMS)
- eventType: missed-approach spatial-disorientation/LOC sequence
- sourceType: TXT_CONVERTED_FROM_PDF
- extractionConfidence: HIGH
- anchorQuality: HIGH

## factualSummary
Evidence indicates N11NM entered a night IMC missed-approach sequence with loss-of-control dynamics, including references to automation/energy/cockpit data context in subsequent reporting.

## eventSequence
1. HEMS AW109S operated at night in instrument-weather context.
2. Approach segment transitioned into missed-approach/go-around phase.
3. Aircraft entered unstable energy/attitude regime consistent with disorientation risk.
4. Control was not recovered before impact sequence.
5. Post-accident material includes cockpit/video and technical data references.

## unsafeStateCandidate
Candidate unsafe state is unstable missed-approach flight regime in night IMC with degraded attitude/energy awareness and shrinking recovery envelope.

## unsafeActConditionCandidate
Candidate mixed automation/mode-awareness and action-feedback management challenge during high-workload transition.

## directActorCandidate
Flight crew (control and monitoring roles to be decomposed in adjudication).

## evidenceFragments
- "AW109S N11NM ... air ambulance"
- "night" and missed-approach context references
- cockpit/video and technical trace mentions

## uncertaintyNotes
- Exact mode-selection timeline and callout chain remain partially extracted.
- Need tighter decomposition of automation state versus manual control responses.
- Single-point causal shortcuts must be avoided at adjudication.

## excludedInformation
- No final-cause import from external summaries.
- No recommendation import.
- No P/O/A coding in extraction phase.

## possibleEvidenceCategoryHints
- AUTOMATION_MODE_TRANSITION
- MISSED_APPROACH_ENERGY
- NIGHT_IMC_ATTITUDE_AWARENESS
- CREW_MONITORING_RESPONSE

## adjudicationQuestions
- What was the exact sequence of autopilot/mode state during transition?
- Which monitoring cues were available but not integrated in time?
- How to separate perception limits from action execution under workload spike?

- sourceEnrichmentNeeded: no
- nextStepRecommendation: Carry to A4+R-77 as automation/mode-awareness boundary case.
