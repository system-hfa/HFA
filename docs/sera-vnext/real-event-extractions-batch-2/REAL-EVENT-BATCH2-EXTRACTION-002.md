# REAL-EVENT-BATCH2-EXTRACTION-002

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

- extractionId: A4R72-B2-002
- batchId: A4R72_BATCH_2
- sourceCandidateId: PDF24-TXT-CAND-002
- originalRealEventId: REAL-EVENT-0005
- sourceDocument: /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-3.txt
- sourceLocator: lines 112053-112121 (Synopsis/History of Flight, PK-TVY, Soehanah helipad)
- shortLabel: PK-TVY S-76++ Soehanah helideck tumble near touchdown
- aircraftOperation: Sikorsky S-76++, offshore helideck passenger charter
- eventType: helideck touchdown upset / tumble
- sourceType: TXT_CONVERTED_FROM_PDF
- extractionConfidence: MEDIUM
- anchorQuality: HIGH

## factualSummary
The text reports an offshore charter helicopter flight from Matak to Soehanah rig helipad. The flight was uneventful until approach. Just prior to touchdown, the helicopter tumbled to the right and stopped displaced from helideck center, with severe aircraft damage and no injuries.

## eventSequence
1. PK-TVY departed Matak on scheduled offshore charter sectors.
2. No system abnormality was reported prior to approach.
3. During approach/landing at Soehanah, control roles changed and PF/PM handover occurred during flight.
4. At about 1316 LT, just before touchdown, helicopter tumbled to the right.
5. Helicopter stopped about 12 meters from D-value center; helideck net damage and severe aircraft damage were recorded.

## unsafeStateCandidate
Candidate unsafe state is a near-ground instability during final touchdown phase on helideck, resulting in rapid lateral upset/tumble.

## unsafeActConditionCandidate
Candidate remains unresolved between control-input management, helideck/wind interaction, and coordination factors during final approach and touchdown.

## directActorCandidate
Flight crew with unresolved PF/PM control chronology around final seconds.

## evidenceFragments
- "At 1316 LT, just prior to touchdown ... helicopter tumbled to the right".
- "flight was uneventful" before approach.
- PF/PM role notes appear with in-text handover references.
- "no one injured" and "helicopter experienced severe damage".

## uncertaintyNotes
- The text contains internal ambiguity on PF/PM assignment timing between synopsis and history section.
- Wind, deck-motion, and exact control input sequence are not fully resolved in extracted fragment.
- No direct FDR/CVR parameter sequence included in this draft.

## excludedInformation
- No import of KNKT recommendations/safety actions into causal judgement.
- No conversion of report-level analysis into final classification.
- No inferred blame from outcome severity.

## possibleEvidenceCategoryHints
- HELIDECK_FINAL_PHASE
- CREW_COORDINATION
- CONTROL_TRANSFER
- WIND_SURFACE_INTERACTION

## adjudicationQuestions
- What is the authoritative PF/PM split at final 30 seconds?
- Were there deck-condition or wind vectors exceeding procedural margins?
- Was the upset initiated before or at touchdown contact?

- sourceEnrichmentNeeded: yes
- nextStepRecommendation: Carry to A4+R-73 with mandatory PF/PM timeline reconciliation and environmental condition enrichment.
