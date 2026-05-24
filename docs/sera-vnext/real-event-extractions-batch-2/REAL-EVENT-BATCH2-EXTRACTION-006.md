# REAL-EVENT-BATCH2-EXTRACTION-006

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

- extractionId: A4R72-B2-006
- batchId: A4R72_BATCH_2
- sourceCandidateId: PDF24-TXT-CAND-011
- originalRealEventId: REAL-EVENT-0016
- sourceDocument: /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt
- sourceLocator: lines 1-180 (N8DX chronology with Garmin/autopilot and TAWS alerts)
- shortLabel: N8DX Cessna 500 automation confusion and loss-of-control sequence
- aircraftOperation: Cessna 500 private IFR single-pilot flight
- eventType: automation/interface confusion with terminal loss of control
- sourceType: TXT_CONVERTED_FROM_PDF
- extractionConfidence: HIGH
- anchorQuality: HIGH

## factualSummary
The extracted text describes a single-pilot IFR flight where pilot communications indicate ongoing Garmin/autopilot difficulties, steering control concerns, and unstable descent behavior. TAWS warnings (sink rate/pull up) were recorded before impact, with no preimpact autopilot hardware failure identified in available narrative.

## eventSequence
1. Pilot received routing amendment and attempted Garmin entry in flight.
2. Pilot reported GPS/steering issues and difficulty controlling flight path.
3. Altitude deviations and controller low-altitude warnings occurred.
4. Pilot reported partial autopilot stability recovery but continued control difficulties.
5. Final segment included TAWS "sink rate" and "pull up" alerts.
6. Aircraft impacted terrain; accident was fatal.

## unsafeStateCandidate
Candidate unsafe state is loss of stable, controlled descent/approach profile under escalating automation-management and manual-control difficulties.

## unsafeActConditionCandidate
Candidate remains unresolved between pilot interaction/action sequence and possible cognitive/perception overload related to automation interface complexity.

## directActorCandidate
Single pilot.

## evidenceFragments
- Pilot statements: "difficulty with my GPS" and "very little steering".
- Recorded autopilot disconnect tone events.
- TAWS warnings immediately before impact.
- Postaccident narrative indicates no confirmed autopilot hardware failure in examined components.

## uncertaintyNotes
- Exact autopilot mode states and pilot mode awareness sequence remain incomplete in text-only extract.
- Source contains mixed narrative and interpretation layers requiring quarantine in adjudication.
- Potential confound between manual flying proficiency and interface management is unresolved.

## excludedInformation
- No import of probable-cause statement or recommendation language.
- No conversion of narrative judgement into P/O/A coding.
- No extrapolation from outcome severity.

## possibleEvidenceCategoryHints
- AUTOMATION_MODE_AWARENESS
- SINGLE_PILOT_WORKLOAD
- ATC_COMMUNICATION_CHAIN
- TAWS_ALERT_TIMING

## adjudicationQuestions
- Which automation transitions were pilot-driven versus system-driven in final minutes?
- Did perceived steering limitation reflect trim/mode state, handling, or mixed factors?
- How should TAWS alert timing be weighed without overfitting to postevent outcome?

- sourceEnrichmentNeeded: no
- nextStepRecommendation: Carry to A4+R-73 adjudication as a high-value automation/perception boundary case.
