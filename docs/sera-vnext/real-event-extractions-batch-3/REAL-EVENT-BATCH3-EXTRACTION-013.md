# REAL-EVENT-BATCH3-EXTRACTION-013

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

- extractionId: A4R76-B3-013
- batchId: A4R76_BATCH_3
- sourceCandidateId: A4R75-B3-013
- originalRealEventId: BS211-Q400
- sourceDocument: /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt
- sourceLocator: lines 1562-1898 (BS211 chronology, ATC interactions, approach instability)
- shortLabel: US-Bangla BS211 Q400 unstable approach and runway-misalignment sequence
- aircraftOperation: Bombardier Q400 scheduled commercial transport
- eventType: unstable approach continuation, ATC coordination complexity, runway alignment conflict
- sourceType: TXT_CONVERTED_FROM_PDF
- extractionConfidence: HIGH
- anchorQuality: HIGH

## factualSummary
Textual anchor provides detailed BS211 sequence with ATC exchanges, unstable approach continuation, runway alignment/trajectory conflicts, and loss of controlled landing outcome at Kathmandu.

## eventSequence
1. Scheduled BS211 flight approached Kathmandu terminal area.
2. Multiple ATC communications addressed runway/use sequencing.
3. Crew trajectory deviated from assigned pattern and remained unstable.
4. Additional warnings/clearances were issued amid traffic conflict concerns.
5. Aircraft continued into misaligned/unstable final profile and accident outcome followed.

## unsafeStateCandidate
Candidate unsafe state is prolonged unstable approach with spatial/runway alignment conflict and reduced recovery margin.

## unsafeActConditionCandidate
Candidate includes crew decision/coordination chain under communication complexity and high workload.

## directActorCandidate
Flight crew and ATC interaction interface; direct actor assignment requires adjudication-level decomposition.

## evidenceFragments
- "US-Bangla Airlines Flight BS211"
- "cleared ... Runway 2 or 20"
- "rather than join the downwind as assigned"
- repeated ATC warnings and orbit instruction context

## uncertaintyNotes
- Cockpit internal CRM and decision rationale are only partially represented in extracted text.
- Need careful separation between communication burden and intentional deviation evidence.
- Sequence is rich but should avoid importing external final conclusions.

## excludedInformation
- No import of final probable-cause statements.
- No recommendation import.
- No extraction-stage conversion to P/O/A codes.

## possibleEvidenceCategoryHints
- APPROACH_STABILITY_CRITERIA
- ATC_CREW_COMMUNICATION
- CRM_DECISION_CHAIN
- GO_AROUND_GATES

## adjudicationQuestions
- Which explicit stable-approach gates were crossed without correction?
- How did ATC communication load affect crew decision/action sequencing?
- Is there evidence of objective non-nominal continuation versus degraded execution only?

- sourceEnrichmentNeeded: no
- nextStepRecommendation: Carry to A4+R-77 as primary fixed-wing procedural/CRM diversity case.
