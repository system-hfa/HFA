# REAL-EVENT-BATCH3-EXTRACTION-008

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

- extractionId: A4R76-B3-008
- batchId: A4R76_BATCH_3
- sourceCandidateId: A4R75-B3-008
- originalRealEventId: N109W
- sourceDocument: /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt
- sourceLocator: lines 835-924 (N109W narrative and path references)
- shortLabel: N109W A109A II mountain CFIT after VFR continuation
- aircraftOperation: Agusta A109A II, mountain transfer flight
- eventType: controlled flight into terrain after deteriorating weather exposure
- sourceType: TXT_CONVERTED_FROM_PDF
- extractionConfidence: HIGH
- anchorQuality: HIGH

## factualSummary
Textual anchor describes N109W as a mountain CFIT event after VFR flight progression in deteriorating weather, with terrain conflict during route segment and fatal outcome.

## eventSequence
1. N109W operated under VFR context in mountainous region.
2. Weather conditions deteriorated along route segment.
3. Flight path continued in constrained terrain/visibility environment.
4. Aircraft impacted terrain (CFIT profile).
5. Wreckage/path references were documented in extracted text.

## unsafeStateCandidate
Candidate unsafe state is continued VFR flight in degrading mountain-weather environment with insufficient terrain/clearance margin.

## unsafeActConditionCandidate
Candidate includes decision continuation under deteriorating conditions and potential navigation/cue integration limitations.

## directActorCandidate
Pilot/crew decision and flight-path management; full multi-actor decomposition unresolved in extraction stage.

## evidenceFragments
- "N109W was destroyed in a Controlled Flight Into ..."
- VFR flight-plan context references
- route/path and wreckage references in mountainous area

## uncertaintyNotes
- Precise sequence of decision alternatives (divert/return/climb) is not fully extracted.
- Equipment use (e.g., GPS mapping context) appears but is not fully decomposed.
- Crew communication chain needs deeper source slicing for adjudication.

## excludedInformation
- No import of final-cause statements.
- No recommendation import.
- No causal coding in extraction phase.

## possibleEvidenceCategoryHints
- WEATHER_TERRAIN_MARGIN
- DECISION_CONTINUATION
- NAVIGATION_CUE_USE
- FLIGHT_PATH_CLEARANCE

## adjudicationQuestions
- What explicit decision points existed after weather deterioration signs?
- Which cues indicated terrain-threat escalation before impact?
- How should objective-intent evidence be bounded without overfit?

- sourceEnrichmentNeeded: no
- nextStepRecommendation: Carry to A4+R-77 as objective-diversity and procedural-deviation candidate.
