# REAL-EVENT-BATCH3-EXTRACTION-006

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

- extractionId: A4R76-B3-006
- batchId: A4R76_BATCH_3
- sourceCandidateId: A4R75-B3-006
- originalRealEventId: PR-CHI
- sourceDocument: /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-2.txt
- sourceLocator: lines 3798-3943 ("Helideck Heave Ho!" PR-CHI)
- shortLabel: PR-CHI S-76C++ helideck motion mismatch event
- aircraftOperation: Sikorsky S-76C++, offshore helideck landing operation
- eventType: landing damage event with deck-motion information mismatch
- sourceType: TXT_CONVERTED_FROM_PDF
- extractionConfidence: MEDIUM
- anchorQuality: MEDIUM

## factualSummary
Text indicates PR-CHI experienced a helideck landing event where dynamic deck-motion conditions and reported information quality were central to the operational context, ending with aircraft damage and recovery operations.

## eventSequence
1. Offshore mission approached moving helideck environment.
2. Deck heave/pitch/roll context was relevant to landing feasibility.
3. Landing execution occurred under dynamic motion constraints.
4. Event evolved into damage/abnormal outcome requiring recovery/removal actions.
5. Post-event documentation references condition-reporting/mismatch concerns.

## unsafeStateCandidate
Candidate unsafe state is landing attempt in dynamic helideck envelope with potentially insufficiently bounded motion/feedback conditions.

## unsafeActConditionCandidate
Candidate unresolved interaction between environmental/helideck condition and crew decision/monitoring chain.

## directActorCandidate
Flight crew plus vessel/platform information interface; direct actor not singularly determinable at extraction stage.

## evidenceFragments
- "Helideck Heave Ho! ... PR-CHI"
- "on the helideck of drill ship"
- recurrent references to deck-condition imagery and recovery context

## uncertaintyNotes
- Exact measured motion values and decision thresholds are not fully extracted.
- Information-flow quality between vessel and crew needs enrichment.
- Distinguishing condition-dominant versus action-dominant mechanism remains open.

## excludedInformation
- No import of external final conclusion text.
- No recommendations imported.
- No assumption of human-error primacy without mechanism-level proof.

## possibleEvidenceCategoryHints
- HELIDECK_MOTION_ENVELOPE
- INFORMATION_QUALITY
- LANDING_DECISION_GATES
- CREW_FEEDBACK_VERIFICATION

## adjudicationQuestions
- What motion data were available before and during touchdown?
- Which communication/coordination steps were completed or omitted?
- Could an alternative hold/go-around decision be operationally feasible at final gate?

- sourceEnrichmentNeeded: yes
- nextStepRecommendation: Carry to A4+R-77 with enrichment focus on deck-motion data and information chain.
