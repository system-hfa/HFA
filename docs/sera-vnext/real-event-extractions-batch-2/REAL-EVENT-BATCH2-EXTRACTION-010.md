# REAL-EVENT-BATCH2-EXTRACTION-010

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

- extractionId: A4R72-B2-010
- batchId: A4R72_BATCH_2
- sourceCandidateId: PDF24-TXT-CAND-007
- originalRealEventId: REAL-EVENT-0011
- sourceDocument: /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-2.txt
- sourceLocator: lines 356-430 (N860AL taxi pothole and MLG collapse narrative)
- shortLabel: N860AL S-76C+ taxi pothole strike and landing gear collapse
- aircraftOperation: Sikorsky S-76C+, offshore support departure taxi phase
- eventType: ground movement infrastructure hazard with gear collapse
- sourceType: TXT_CONVERTED_FROM_PDF
- extractionConfidence: HIGH
- anchorQuality: HIGH

## factualSummary
The extracted text reports N860AL taxiing for departure at low speed when it struck a pothole on degraded paving. Right main landing gear collapsed and structural damage occurred; all onboard escaped uninjured.

## eventSequence
1. Helicopter was taxiing for departure with copilot taxiing and pilot monitoring.
2. Crew observed a surface bump/pothole and attempted to stop.
3. Helicopter struck pothole with right main landing gear.
4. Right MLG collapsed; substantial structural damage followed.
5. Occupants were uninjured.

## unsafeStateCandidate
Candidate unsafe state is compromised ground-movement safety due to degraded surface hazard leading to gear-collapse event.

## unsafeActConditionCandidate
Candidate is unresolved between infrastructure condition dominance and local taxi-path/handling decisions.

## directActorCandidate
Taxiing flight crew with potential infrastructure hazard contribution beyond direct crew control.

## evidenceFragments
- "taxi speed was less than 5 knots".
- "struck the pothole with the right main landing gear, which collapsed".
- Surface described as non-maintained/degraded concrete sections.

## uncertaintyNotes
- Exact airport/operator hazard awareness history is not fully extracted.
- Whether route selection alternatives existed is unclear in current text.
- Balance between condition-dominant hazard and immediate action decision remains unresolved.

## excludedInformation
- No import of probable-cause statement as final classification output.
- No recommendations imported.
- No forced human-failure narrative for degraded-infrastructure event.

## possibleEvidenceCategoryHints
- GROUND_INFRASTRUCTURE_HAZARD
- TAXI_PATH_DECISION
- LOW_SPEED_IMPACT
- OPERATOR_AERODROME_INTERFACE

## adjudicationQuestions
- Was degraded pavement known/briefed before taxi?
- Were safer routing alternatives operationally feasible at that moment?
- Should case be treated as condition-dominant with limited active-failure evidence?

- sourceEnrichmentNeeded: yes
- nextStepRecommendation: Carry to A4+R-73 with enrichment on aerodrome hazard management history and route-selection constraints.
