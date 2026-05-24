# REAL-EVENT-BATCH3-EXTRACTION-002

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

- extractionId: A4R76-B3-002
- batchId: A4R76_BATCH_3
- sourceCandidateId: A4R75-B3-002
- originalRealEventId: N56RD
- sourceDocument: /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-2.txt
- sourceLocator: lines 1431-1508 (N56RD history and approach/ditch sequence)
- shortLabel: N56RD S-76B Gulf forced ditching
- aircraftOperation: Sikorsky S-76B, offshore transport to drilling rig
- eventType: forced ditching during approach after reported engine-power loss
- sourceType: TXT_CONVERTED_FROM_PDF
- extractionConfidence: HIGH
- anchorQuality: HIGH

## factualSummary
Textual evidence describes a visual approach to an offshore landing platform where a reported loss of engine power occurred during flare/short-final geometry. Pilot maneuvering to avoid platform contact was followed by low-speed/high-descent profile and water impact.

## eventSequence
1. Aircraft approached drilling rig landing platform in Gulf of Mexico.
2. Approach profile decelerated toward platform with low-altitude flare geometry.
3. Reported engine power loss occurred near pad.
4. Pilot maneuvered to avoid collision with platform structure.
5. Helicopter entered high descent/low airspeed condition.
6. Crew performed flare/collective response before water impact and ditching.

## unsafeStateCandidate
Candidate unsafe state is low-energy short-final trajectory with insufficient margin to complete landing or stable go-around after power anomaly.

## unsafeActConditionCandidate
Candidate mixed condition/response interaction: propulsion anomaly plus high-workload decision/action sequence at very low altitude.

## directActorCandidate
Flight crew in active control response to power-loss condition; detailed PF/PM split unresolved in this extraction.

## evidenceFragments
- "visual approach ... landing platform"
- "loss of engine power ... unsure which engine"
- "going to hit the platform ... banked ... to avoid contact"
- "high rate of descent with low airspeed ... water impact"

## uncertaintyNotes
- Which engine and exact degradation profile are not fully resolved in extracted text.
- Engine anomaly precursors and maintenance chain depth need consolidation in adjudication.
- Role split between control and monitoring tasks remains limited.

## excludedInformation
- No import of final probable-cause wording from external conclusions.
- No import of recommendations as causal evidence.
- No direct mapping to P/O/A in extraction phase.

## possibleEvidenceCategoryHints
- APPROACH_ENERGY_MANAGEMENT
- POWERPLANT_ANOMALY_SIGNAL
- OFFSHORE_PLATFORM_GEOMETRY
- CREW_RECOVERY_ACTION

## adjudicationQuestions
- What confirmed technical mechanism preceded power loss?
- Was go-around window operationally viable at anomaly onset?
- What explicit monitoring/callout evidence exists for both crew positions?

- sourceEnrichmentNeeded: no
- nextStepRecommendation: Carry to A4+R-77 adjudication with decision-chain and action-feedback boundary emphasis.
