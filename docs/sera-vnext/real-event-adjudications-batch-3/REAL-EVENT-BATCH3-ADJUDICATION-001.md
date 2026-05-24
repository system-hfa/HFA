# Real Event Batch 3 Adjudication 001

Status:
- AI_AUTHOR_ADJUDICATION_DRAFT
- BATCH_3
- NOT_FIXTURE
- NOT_BASELINE
- NOT_CONSENSUS_VALIDATED
- NOT_FOR_DOWNSTREAM
- NO_RELEASED_CODE
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_RECOMMENDATIONS

- adjudicationId: REAL-EVENT-BATCH3-ADJUDICATION-001
- sourceExtractionId: A4R76-B3-001
- originalRealEventId: REAL-EVENT-0014/0030
- shortLabel: BHS S-76 Roncador post-takeoff ditching
- adjudicationMode: AI_AUTHOR
- adjudicationConfidence: LOW
- sourceQuality: LOW/PARTIAL
- sourceEnrichmentNeeded: yes

## factualBasis
- Offshore S-76 departed FPSO Roncador toward P-31 and lost height shortly after takeoff.
- Pilot reported a problem and intent to land on water.
- Text reports tail-rotor explosion before low-altitude sea impact and rapid sinking.
- Source is secondary/partial and lacks primary technical chain.

## safeOperationEscapePointCandidate
Candidate escape point is the early post-takeoff abnormality recognition window before loss of height and water-impact trajectory became unrecoverable.

## unsafeState
Low-altitude post-takeoff degradation over water with reduced controllability and limited ditching margin.

## unsafeActOrCondition
Condition/response split remains unresolved because the technical chain and crew response details are source-limited.

## directActor
UNRESOLVED; flight crew and aircraft technical condition are both present, but the current source does not support direct actor assignment.

## P_axis_questionPath
- Was relevant information available? unclear; evidence: pilot reported a problem, but cockpit cues are not described; impact: P remains unresolved.
- Was sensory access impaired? unclear; evidence: no direct sensory/environmental limitation chain; impact: no P-B/P-F draft.
- Was attention/monitoring degraded? unclear; evidence: loss of height is reported but not linked to monitoring failure; impact: no P-G draft.
- Was time pressure dominant? yes in emergency phase, but late; evidence: low-height ditching context; impact: insufficient for P-D.
- Path result: UNRESOLVED.

## O_axis_questionPath
- Was the operational goal compatible with safe operation? unclear; evidence: normal platform-to-platform transport, but abnormal event source is partial; impact: cannot robustly select O-A.
- Is there evidence of conscious rule deviation? no; evidence: no rule-deviation text; impact: O-B/O-C not supported.
- Is this non-violation inadequate objective? unclear; evidence: no efficiency/mission-continuation decision chain; impact: O-D not supported.
- Path result: UNRESOLVED.

## A_axis_questionPath
- Was a specific action selected or executed? yes, attempted water landing; evidence: pilot said he would land on water; impact: action exists but may be emergency response.
- Was the action implemented as intended? unclear; evidence: aircraft sank rapidly after impact; impact: not enough for action-code closure.
- Was there feedback/checking failure after own action? unclear; evidence: no feedback loop detail; impact: A-C not supported.
- Was physical/ergonomic ability impaired? unclear; evidence: no such detail; impact: A-D not supported.
- Path result: UNRESOLVED.

## P_axis_reasoning
The source reports an abnormal state but does not isolate perception, monitoring, communication, or time-pressure mechanism.

## O_axis_reasoning
No objective-axis draft is robust because source partiality prevents distinguishing nominal operation from decision-level deviation.

## A_axis_reasoning
Attempted ditching is present but appears as emergency response; no specific action failure mechanism is separable.

## proposedPCode or UNRESOLVED
UNRESOLVED

## proposedOCode or UNRESOLVED
UNRESOLVED

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
- P: insufficient cue/monitoring evidence.
- O: no supported intent/deviation chain.
- A: no robust action failure mechanism.

## evidenceRefsByAxis
- P: post-takeoff loss of height and pilot problem call.
- O: normal offshore transport route, source partial.
- A: attempted water landing, tail-rotor event, rapid sinking.

## uncertaintyByAxis
- P: HIGH
- O: HIGH
- A: HIGH

## rejectedAlternatives
- `P-G` rejected because loss of height is not direct evidence of monitoring failure.
- `O-A` rejected as automatic fallback while source remains partial.
- `A-A` rejected because no-failure is not fallback for unknown.

## evidenceCategoryHints
- OFFSHORE_DEPARTURE_PROFILE
- LOW_ALTITUDE_CONTROL_MARGIN
- SYSTEM_FAILURE_INDICATION
- EMERGENCY_CREW_RESPONSE

## maturityStatus
EVIDENCE_ENRICHMENT_REQUIRED

## adjudicationQuestionsForAuthor
- Should this remain enrichment-first until primary accident report or CENIPA/DAC material is located?
- Can any verified technical chain isolate tail-rotor failure versus crew response?

## downstreamLocks
- proposedCode is draft only and not `releasedCode`.
- no `selectedCode=CLASSIFIED`.
- no finalConclusion/HFACS/Risk/ERC/recommendations.
- no fixture/baseline/downstream.

## nextStepRecommendation
Enrich primary source before any stronger P/O/A adjudication.
