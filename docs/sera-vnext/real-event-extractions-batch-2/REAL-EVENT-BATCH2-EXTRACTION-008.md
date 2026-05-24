# REAL-EVENT-BATCH2-EXTRACTION-008

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

- extractionId: A4R72-B2-008
- batchId: A4R72_BATCH_2
- sourceCandidateId: PDF24-TXT-CAND-004
- originalRealEventId: REAL-EVENT-0008
- sourceDocument: /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-2.txt
- sourceLocator: lines 2044-2205 (PK-FUP event narrative and control linkage findings)
- shortLabel: PK-FUP S-76C+ in-flight control failure from pushrod/rod-end separation
- aircraftOperation: Sikorsky S-76C+, daylight pipeline inspection flight
- eventType: in-flight uncommanded attitude and crash after control linkage separation
- sourceType: TXT_CONVERTED_FROM_PDF
- extractionConfidence: HIGH
- anchorQuality: HIGH

## factualSummary
The extracted material reports PK-FUP on a daylight pipeline inspection mission. During descent, helicopter entered uncommanded roll/pitch excursions, control response was insufficient, and crash followed. Reported findings indicate forward main rotor servo pushrod/rod-end separation associated with progressive thread wear/torque loss.

## eventSequence
1. Flight departed for pipeline inspection profile after refuel/mission setup.
2. Autopilot was engaged in cruise; descent initiated toward lower altitude.
3. Near descent segment, helicopter entered uncommanded attitude changes (roll and pitch oscillations).
4. Crew attempted recovery; control response remained inadequate.
5. Helicopter impacted terrain/swamp and came to rest inverted.
6. Postevent technical findings describe pushrod/rod-end separation and thread deterioration.

## unsafeStateCandidate
Candidate unsafe state is uncommanded attitude divergence with loss of normal flight-control response.

## unsafeActConditionCandidate
Condition-dominant candidate: control linkage degradation/separation; human action as initiating event is not established in this extract.

## directActorCandidate
No clear flight-crew initiating actor for the technical separation; crew role appears primarily response/mitigation.

## evidenceFragments
- "helicopter attitude became un-commanded" during descent.
- Control inputs were recorded but did not restore expected response.
- "rod end ... separated" and thread/jam-nut deterioration findings.
- Crash occurred after short abnormal-attitude window.

## uncertaintyNotes
- Exact transition from gradual wear to final separation point remains partially inferred.
- Maintenance provenance and inspection compliance need consolidated source chain.
- Mixed use of article text and report excerpts requires careful quarantine in adjudication phase.

## excludedInformation
- No import of final report conclusions as classification output.
- No recommendations imported.
- No forced conversion into human active-failure narrative.

## possibleEvidenceCategoryHints
- SERVO_LINKAGE_INTEGRITY
- DESCENT_PHASE_TRANSITION
- CONTROL_RESPONSE_FAILURE
- MAINTENANCE_INSPECTION_CHAIN

## adjudicationQuestions
- What objective indicators were available to crew before full uncommanded divergence?
- Is there evidence of detectable preflight warning in linkage condition?
- Should actor assignment remain unresolved due to technical-dominant initiation?

- sourceEnrichmentNeeded: no
- nextStepRecommendation: Carry to A4+R-73 as condition-dominant extraction with strict non-forced actor assignment.
