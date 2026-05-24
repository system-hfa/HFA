# REAL-EVENT-BATCH2-EXTRACTION-009

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

- extractionId: A4R72-B2-009
- batchId: A4R72_BATCH_2
- sourceCandidateId: PDF24-TXT-CAND-005
- originalRealEventId: REAL-EVENT-0009
- sourceDocument: /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-2.txt
- sourceLocator: lines 2538-2625 (N748P bird strike narrative and windshield penetration context)
- shortLabel: N748P S-76C++ fatal bird strike with windshield penetration
- aircraftOperation: Sikorsky S-76C++, offshore transport cruise segment
- eventType: bird strike and barrier breach leading to loss of control sequence
- sourceType: TXT_CONVERTED_FROM_PDF
- extractionConfidence: HIGH
- anchorQuality: HIGH

## factualSummary
The extracted narrative reports N748P in offshore cruise where a loud bang occurred, followed by rushing wind sounds, power reduction cues, and rotor RPM decay. The event involved bird strike and windshield penetration, followed by loss of controlled flight and fatal crash.

## eventSequence
1. Helicopter departed toward offshore destination with crew and passengers.
2. In cruise flight, loud impact occurred consistent with bird strike.
3. Windshield barrier was breached/penetrated per report narrative.
4. Rapid cockpit disruption/power and rotor RPM degradation signs followed.
5. Helicopter departed controlled flight and crashed.

## unsafeStateCandidate
Candidate unsafe state is sudden loss of safe controllability after in-flight barrier breach during cruise.

## unsafeActConditionCandidate
Condition-dominant candidate centered on bird-strike barrier breach; no clear initiating human act identified in extracted evidence.

## directActorCandidate
No clear direct actor for initiating strike/penetration event.

## evidenceFragments
- "loud bang" with rushing wind and power reduction cues.
- Report text indicates bird-strike evidence and shattered windshield sections.
- Flight departed controlled regime shortly after impact event.

## uncertaintyNotes
- Exact crew functional capability window after penetration is unclear in current extract.
- Certification envelope and strike-energy comparison are not fully extracted.
- Timing precision between impact, system degradation, and control loss needs deeper official-data alignment.

## excludedInformation
- No import of final probable-cause or recommendation text.
- No conversion of severity into human-failure conclusion.
- No assignment of P/O/A at extraction phase.

## possibleEvidenceCategoryHints
- EXTERNAL_HAZARD_BIRD_STRIKE
- BARRIER_PERFORMANCE
- CREW_CAPABILITY_AFTER_IMPACT
- EMERGENCY_RESPONSE_TIMELINE

## adjudicationQuestions
- Was the event immediately unsurvivable from a control perspective, or was response window present?
- What certification/performance boundary was exceeded at impact?
- Should case remain strictly condition-dominant with actor unresolved?

- sourceEnrichmentNeeded: yes
- nextStepRecommendation: Carry to A4+R-73 with targeted enrichment on certification envelope and post-impact controllability timeline.
