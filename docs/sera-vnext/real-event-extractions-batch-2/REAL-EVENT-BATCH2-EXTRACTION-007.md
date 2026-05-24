# REAL-EVENT-BATCH2-EXTRACTION-007

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

- extractionId: A4R72-B2-007
- batchId: A4R72_BATCH_2
- sourceCandidateId: PDF24-TXT-CAND-003
- originalRealEventId: REAL-EVENT-0007
- sourceDocument: /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-3.txt
- sourceLocator: lines 94392-94420 (5N-BGD chronology) and lines 94380-94440 context
- shortLabel: 5N-BGD S-76C+ pushrod separation and lagoon crash
- aircraftOperation: Sikorsky S-76C+, domestic charter/offshore-linked transport
- eventType: in-flight control-linkage separation with loss of control
- sourceType: TXT_CONVERTED_FROM_PDF
- extractionConfidence: HIGH
- anchorQuality: HIGH

## factualSummary
The extracted text reports 5N-BGD crash in Lagos lagoon with fatal casualties. Investigation text states push rod tube separation from rod end bearing, with loose jam nut and resulting control system compromise.

## eventSequence
1. Flight departed offshore-linked origin toward Lagos destination.
2. In flight, control-linkage integrity was compromised (push rod/rod end separation reported).
3. Aircraft lost controllability and crashed into lagoon area.
4. Fatalities occurred; helicopter was destroyed.

## unsafeStateCandidate
Candidate unsafe state is control authority degradation/loss caused by flight-control linkage separation during flight.

## unsafeActConditionCandidate
Condition-dominant candidate: mechanical integrity failure in control linkage path; active human act not established in current extract.

## directActorCandidate
No clear direct actor for initiating in-flight separation in extracted fragment.

## evidenceFragments
- "push rod tube separated from rod end bearing".
- "jam nut was loose and was not seating against the push rod".
- Crash location and fatality outcomes documented.

## uncertaintyNotes
- Maintenance history and inspection execution chain are not fully extracted here.
- Exact timeline from first control anomaly to impact is limited in this fragment.
- Human-response sequence after onset is not detailed enough for actor granularity.

## excludedInformation
- No import of final contributory-factor wording as classification.
- No recommendation import.
- No forced human-error assignment in condition-dominant event.

## possibleEvidenceCategoryHints
- FLIGHT_CONTROL_MECHANICAL_INTEGRITY
- MAINTENANCE_TRACEABILITY
- FAILURE_DETECTION_BARRIER
- EMERGENCY_RESPONSE_WINDOW

## adjudicationQuestions
- Was there detectable precursor evidence before complete separation?
- Which maintenance/inspection controls were applicable and documented?
- Can direct actor be assigned, or should event remain condition-dominant with unresolved actor?

- sourceEnrichmentNeeded: yes
- nextStepRecommendation: Carry to A4+R-73 as condition-dominant case with focused maintenance-chain enrichment.
