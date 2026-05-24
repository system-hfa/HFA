# REAL-EVENT-BATCH2-EXTRACTION-004

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

- extractionId: A4R72-B2-004
- batchId: A4R72_BATCH_2
- sourceCandidateId: PDF24-TXT-CAND-008
- originalRealEventId: REAL-EVENT-0013
- sourceDocument: /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-6.txt
- sourceLocator: lines 38624-38660 (Aeroleo entry, transmission oil pressure drop and autorotation to water)
- shortLabel: Aeroleo offshore transmission oil pressure loss and autorotation to water
- aircraftOperation: offshore air taxi flight to platform P-32 (aircraft model unresolved in candidate mapping)
- eventType: transmission-drive emergency and autorotation to water
- sourceType: TXT_CONVERTED_FROM_PDF
- extractionConfidence: LOW
- anchorQuality: MEDIUM

## factualSummary
The extracted fragment reports an offshore air taxi mission to platform P-32 where crew reported dropping then zero transmission oil pressure, followed by noise/loss of drive and successful autorotation to water. However, the text anchor identifies aircraft PT-HUV Bell 412, while candidate metadata references an S-76 event, requiring source identity reconciliation.

## eventSequence
1. Flight departed Macae toward offshore platform P-32.
2. Crew reported transmission oil pressure decrease and then zero pressure.
3. Transmission noise and loss of drive followed.
4. Crew executed autorotation to water; aircraft ended inverted floating.

## unsafeStateCandidate
Candidate unsafe state is propulsion/drive-train degradation leading to forced autorotation over water.

## unsafeActConditionCandidate
Condition-dominant candidate (technical failure chain); human-action component not determinable from current extract.

## directActorCandidate
No clear direct actor for initiating technical degradation in current extract.

## evidenceFragments
- "drop in main transmission oil pressure" followed by "zero pressure".
- "loss of drive" and "successful autorotation to the water".
- Offshore route toward platform P-32.
- Aircraft identity in fragment: "Bell 412 PT-HUV".

## uncertaintyNotes
- Candidate/source mismatch: expected S-76 case label versus Bell 412 anchor in current text.
- Official report locator for intended REAL-EVENT-0013 S-76 variant is not yet isolated.
- Technical failure mechanism depth is not available in this excerpt.

## excludedInformation
- No import of external conclusions or recommendations.
- No aircraft-type assumption override; mismatch is preserved as unresolved.
- No classification of P/O/A at extraction stage.

## possibleEvidenceCategoryHints
- TECHNICAL_FAILURE_CHAIN
- POWERTRAIN_DEGRADATION
- EMERGENCY_RESPONSE
- OFFSHORE_WATER_DITCHING

## adjudicationQuestions
- Is REAL-EVENT-0013 definitively this Aeroleo record, and if yes, which aircraft type/version is canonical?
- Is there a primary report section confirming S-76 identity, if candidate metadata is correct?
- What objective sequence of crew emergency actions is available beyond this summary?

- sourceEnrichmentNeeded: yes
- nextStepRecommendation: Keep in batch with LOW confidence and require source identity reconciliation before adjudication hardening in A4+R-73.
