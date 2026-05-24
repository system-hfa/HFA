# REAL-EVENT-BATCH3-EXTRACTION-011

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

- extractionId: A4R76-B3-011
- batchId: A4R76_BATCH_3
- sourceCandidateId: A4R75-B3-011
- originalRealEventId: N120HH
- sourceDocument: /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt
- sourceLocator: lines 9330-9708 (N120HH failure progression and technical evidence)
- shortLabel: N120HH Bell 407 uncontained engine failure
- aircraftOperation: Bell 407 private flight
- eventType: oil-loss progression, uncontained engine failure, emergency landing outcome
- sourceType: TXT_CONVERTED_FROM_PDF
- extractionConfidence: HIGH
- anchorQuality: HIGH

## factualSummary
Text presents N120HH as Bell 407 accident sequence involving engine/oil-related degradation, smoke/oil-trail indicators, uncontained engine failure signatures, and emergency landing followed by fire.

## eventSequence
1. Flight proceeded with Bell 407 in routine segment.
2. Technical anomaly indicators emerged (oil/smoke-related signals in narrative).
3. Engine failure sequence progressed, including uncontained damage evidence.
4. Pilot executed emergency response/landing attempt.
5. Post-landing fire and destructive damage occurred.

## unsafeStateCandidate
Candidate unsafe state is propulsion-system degradation leading to rapidly narrowing controllability and emergency landing envelope.

## unsafeActConditionCandidate
Candidate condition-dominant technical failure, with human-response chain to be separately assessed without forced blame attribution.

## directActorCandidate
Primary initiating mechanism appears technical/systemic; flight crew response remains relevant but not classified in extraction stage.

## evidenceFragments
- "Bell 407 N120HH ... destroyed"
- "smoke trail" and "oil" context references
- uncontained engine damage descriptions and component findings

## uncertaintyNotes
- Early detection and warning usability by pilot remain partially unresolved.
- Maintenance/inspection chain depth needs adjudication-stage decomposition.
- Response-quality inference must avoid severity-driven overclassification.

## excludedInformation
- No adoption of final investigation conclusion as SERA output.
- No recommendation import.
- No automatic mapping from technical failure severity to human axis coding.

## possibleEvidenceCategoryHints
- POWERPLANT_DEGRADATION
- WARNING_INDICATION_CHAIN
- EMERGENCY_RESPONSE_PROFILE
- CONDITION_DOMINANT_CASE

## adjudicationQuestions
- Which cues were available with enough lead time for alternative response?
- What maintenance/context evidence is directly attributable to event mechanism?
- How to preserve technical-vs-human separation in adjudication?

- sourceEnrichmentNeeded: no
- nextStepRecommendation: Carry to A4+R-77 as condition-dominant control case.
