# REAL-EVENT-BATCH3-EXTRACTION-001

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

- extractionId: A4R76-B3-001
- batchId: A4R76_BATCH_3
- sourceCandidateId: A4R75-B3-001
- originalRealEventId: REAL-EVENT-0014/0030
- sourceDocument: /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-6.txt
- sourceLocator: lines 38680-38828 ("A.1.2 – BHS S-76 em 22/7/2004 – Campo de Roncador")
- shortLabel: BHS S-76 Roncador post-takeoff ditching
- aircraftOperation: Sikorsky S-76, offshore transport between platforms in Bacia de Campos
- eventType: post-takeoff loss of height and ditching/sea impact
- sourceType: TXT_CONVERTED_FROM_PDF + INDEX_CORROBORATION
- extractionConfidence: LOW
- anchorQuality: MEDIUM

## factualSummary
Available text indicates an offshore S-76 departed FPSO in Roncador and, shortly after takeoff, experienced an abnormal condition with reported loss of height, attempted water landing, and tail-rotor explosion before sea impact. Occupants survived and fatalities are both immediate and post-rescue in reported accounts.

## eventSequence
1. Helicopter departed FPSO in Roncador bound for P-31 (Albacora).
2. Survivors reported loss of height soon after departure.
3. Pilot transmitted operational problem and intent to land on water.
4. Tail rotor was reported as exploding before impact.
5. Aircraft impacted sea at low altitude estimate and sank rapidly.
6. Rescue recovered survivors; casualty count was updated over subsequent search period.

## unsafeStateCandidate
Candidate unsafe state is low-altitude post-takeoff degradation with reduced controllability over water and limited recovery margin.

## unsafeActConditionCandidate
Candidate unresolved at extraction stage: technical condition in tail rotor/control system versus crew response timing under offshore emergency.

## directActorCandidate
Flight crew and aircraft system interaction; direct human actor assignment remains unresolved in this extraction stage.

## evidenceFragments
- "havia saído ... campo de Roncador ... seguia para ... P-31 ... caiu no mar"
- "após decolar, passou a perder altura"
- "o piloto ... tentaria pousar na água"
- "o rotor da cauda ... explodiu"

## uncertaintyNotes
- Source appears to be secondary/news-style compilation in converted text, not full primary accident report.
- Technical chain preceding tail-rotor event is not parameterized.
- Timeline precision and role split (PF/PM/crew actions) are incomplete.

## excludedInformation
- No import of external probable-cause statements.
- No import of recommendations/safety actions as classification evidence.
- No conversion of casualty severity into causal attribution.

## possibleEvidenceCategoryHints
- OFFSHORE_DEPARTURE_PROFILE
- LOW_ALTITUDE_CONTROL_MARGIN
- SYSTEM_FAILURE_INDICATION
- EMERGENCY_CREW_RESPONSE

## adjudicationQuestions
- What primary source confirms sequence and technical initiating condition?
- Is there verified maintenance/inspection context for the tail-rotor event?
- What specific control/recovery inputs were performed between anomaly and impact?

- sourceEnrichmentNeeded: yes
- nextStepRecommendation: Keep in Batch 3 with enrichment-first posture; carry to A4+R-77 with explicit unresolved technical-vs-response split.
