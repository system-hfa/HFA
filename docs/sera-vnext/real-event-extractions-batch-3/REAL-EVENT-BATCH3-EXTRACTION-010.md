# REAL-EVENT-BATCH3-EXTRACTION-010

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

- extractionId: A4R76-B3-010
- batchId: A4R76_BATCH_3
- sourceCandidateId: A4R75-B3-010
- originalRealEventId: N127LN
- sourceDocument: /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt
- sourceLocator: lines 2031-2227 (N127LN LOC-I narrative)
- shortLabel: N127LN AS350B2 fatigue-associated LOC-I
- aircraftOperation: AS350B2, HEMS/air ambulance night mission
- eventType: loss of control in flight with fatigue-governance context
- sourceType: TXT_CONVERTED_FROM_PDF
- extractionConfidence: HIGH
- anchorQuality: HIGH

## factualSummary
Converted text identifies N127LN as a night air-ambulance LOC-I accident and includes context linked to fatigue, duty-cycle and operational readiness concerns.

## eventSequence
1. Air ambulance mission proceeded in night operational context.
2. Aircraft entered flight segment with elevated workload conditions.
3. Loss-of-control sequence developed before recovery was achieved.
4. Aircraft was destroyed after impact.
5. Extracted narrative references fatigue/duty-cycle governance factors.

## unsafeStateCandidate
Candidate unsafe state is unstable in-flight control regime under potentially degraded human performance/readiness conditions.

## unsafeActConditionCandidate
Candidate includes operational fatigue/context condition interacting with action/monitoring capability.

## directActorCandidate
Flight crew in mission execution context; organizational scheduling/load factors may be contributory context but not adjudicated here.

## evidenceFragments
- "AS350B2 N127LN ... LOC-I accident"
- "air ambulance" mission context
- fatigue/duty-cycle references in surrounding narrative

## uncertaintyNotes
- Need explicit timeline linking duty/readiness factors to flight-control phase.
- Role of organizational controls versus immediate cockpit mechanisms remains open.
- Limited extraction of detailed callout/action chain.

## excludedInformation
- No import of final probable-cause language.
- No recommendation import.
- No precondition formalization in extraction phase.

## possibleEvidenceCategoryHints
- FATIGUE_READINESS_CONTEXT
- IN_FLIGHT_CONTROL_STABILITY
- NIGHT_HEMS_WORKLOAD
- MONITORING_ACTION_CHAIN

## adjudicationQuestions
- What verified fatigue evidence is operationally attributable to event window?
- Which in-cockpit cues signaled impending instability before LOC?
- How to bound organizational versus immediate operational mechanisms?

- sourceEnrichmentNeeded: no
- nextStepRecommendation: Carry to A4+R-77 as objective-diversity and action-feedback candidate.
