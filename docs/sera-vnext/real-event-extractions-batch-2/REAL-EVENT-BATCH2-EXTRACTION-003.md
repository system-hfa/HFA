# REAL-EVENT-BATCH2-EXTRACTION-003

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

- extractionId: A4R72-B2-003
- batchId: A4R72_BATCH_2
- sourceCandidateId: PDF24-TXT-CAND-006
- originalRealEventId: REAL-EVENT-0010
- sourceDocument: /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt
- sourceLocator: lines 330-470 (N798P NTSB narrative and rollover sequence)
- shortLabel: N798P S-76C++ helideck rollover after ground reposition
- aircraftOperation: Sikorsky S-76C++, offshore passenger transport to platform helideck
- eventType: post-landing helideck rollover during reposition/ground taxi
- sourceType: TXT_CONVERTED_FROM_PDF + EXISTING_EXTRACT corroboration
- extractionConfidence: HIGH
- anchorQuality: HIGH

## factualSummary
The extracted text describes a normal landing on offshore platform VK956 followed by rightward ground repositioning to clear stairwell access. During this maneuver, the helicopter rocked/squatted and rapidly rolled right onto its side. Occupants were not injured.

## eventSequence
1. Helicopter arrived at offshore platform with strong wind reported.
2. Initial landing was completed near center of helideck.
3. Crew initiated ground reposition to clear tail from stairwell area.
4. During rightward reposition/turn, aircraft rocked/squatted and rapidly rolled right.
5. Helicopter came to rest on side with substantial damage.

## unsafeStateCandidate
Candidate unsafe state is loss of lateral stability margin during on-deck repositioning, transitioning from stable ground contact to unrecoverable roll.

## unsafeActConditionCandidate
Candidate remains open between control-input management during reposition and contextual helideck/wind/surface interaction.

## directActorCandidate
Pilot performing reposition maneuver, with PM monitoring support.

## evidenceFragments
- "landing was normal" and "all gear on deck" before upset.
- PIC "began to reposition (ground taxi)" to clear stairwell.
- During reposition, crew felt rock/squat and rapid roll to right.
- Strong wind context and operational deck constraints documented.

## uncertaintyNotes
- Precise control input magnitudes and timing are not provided in extracted text.
- Relative contribution of wind versus technique remains unresolved.
- Deck friction/contact dynamics are inferred but not directly measured in extracted fragment.

## excludedInformation
- No import of probable-cause wording as classification output.
- No recommendations imported.
- No conversion of investigatory interpretation into final SERA judgement.

## possibleEvidenceCategoryHints
- HELIDECK_GROUND_MANEUVER
- WIND_MARGIN
- CONTROL_INPUT_SEQUENCE
- CREW_MONITORING

## adjudicationQuestions
- Was maneuver profile within published crosswind/deck limits at that moment?
- Did crew detect developing roll in time for corrective recovery?
- Was this primarily handling-limited, condition-limited, or mixed?

- sourceEnrichmentNeeded: no
- nextStepRecommendation: Carry to A4+R-73 adjudication with explicit unsafe-state transition framing and PF/PM monitoring split.
