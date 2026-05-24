# Real Event Batch 3 Adjudication 007

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

- adjudicationId: REAL-EVENT-BATCH3-ADJUDICATION-007
- sourceExtractionId: A4R76-B3-007
- originalRealEventId: N200BK
- shortLabel: N200BK A109E rooftop impact in IMC
- adjudicationMode: AI_AUTHOR
- adjudicationConfidence: MEDIUM
- sourceQuality: HIGH
- sourceEnrichmentNeeded: no

## factualBasis
- A109E impacted a building roof in New York in weather/visibility constraints.
- Flight behavior was abnormal/unstable before rooftop impact.
- Extraction does not fully detail ATC, instrument use, or decision chronology.

## safeOperationEscapePointCandidate
Candidate escape point is the weather/visibility decision point before constrained urban flight became unstable in IMC.

## unsafeState
Unstable controlled-flight profile in constrained urban IMC environment.

## unsafeActOrCondition
Decision-continuation and control/monitoring boundary under marginal weather.

## directActor
Pilot in command; broader operational pressures not resolved in extraction.

## P_axis_questionPath
- Was relevant information available? yes; evidence: weather/visibility and urban constraints; impact: supports monitoring/attention draft.
- Was sensory access impaired? yes; evidence: IMC/degraded visibility; impact: P-F considered but not isolated.
- Was attention/monitoring degraded? yes candidate; evidence: unstable/erratic trajectory before rooftop impact; impact: supports P-G draft.
- Was time pressure dominant? unclear; evidence: no explicit time-pressure chain; impact: P-D not selected.
- Path result: P-G.

## O_axis_questionPath
- Was the operational goal compatible with safe operation? yes/unclear; evidence: no explicit deviation or efficiency objective in extraction; impact: O-A draft only.
- Is there evidence of conscious rule deviation? unclear/no; evidence: IMC context alone is not enough; impact: O-C rejected.
- Is this non-violation inadequate objective? unclear; evidence: no explicit gain/efficiency evidence; impact: O-D not selected.
- Path result: O-A.

## A_axis_questionPath
- Was a specific action selected or executed? unclear; evidence: erratic control outcome but not input sequence; impact: A unresolved.
- Was action appropriate to situation? unclear; evidence: no control-input trace; impact: no A-F.
- Was there feedback/checking failure after own action? unclear; evidence: no feedback chain; impact: no A-C.
- Was physical/ergonomic ability impaired? unclear; evidence: none in extraction; impact: A-D not supported.
- Path result: UNRESOLVED.

## P_axis_reasoning
Weather/urban constraints plus unstable trajectory support monitoring/attention draft, while action mechanics remain open.

## O_axis_reasoning
No explicit objective deviation is available in the extraction.

## A_axis_reasoning
Control instability is an outcome, not enough by itself to classify action failure.

## proposedPCode or UNRESOLVED
P-G

## proposedOCode or UNRESOLVED
O-A

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
- P: degraded monitoring/attention in IMC candidate.
- O: no intent/deviation evidence.
- A: no input/action mechanism.

## evidenceRefsByAxis
- P: IMC/visibility constraints and rooftop impact sequence.
- O: lack of rule/efficiency evidence.
- A: missing detailed control trace.

## uncertaintyByAxis
- P: MEDIUM
- O: MEDIUM
- A: HIGH

## rejectedAlternatives
- `O-D` rejected without explicit operational-gain objective.
- `A-F` rejected because erratic flight alone is not action-selection proof.
- `P-F` remains possible but not selected over monitoring draft.

## evidenceCategoryHints
- URBAN_IMC_CONSTRAINTS
- TRAJECTORY_STABILITY
- PILOT_DECISION_CHAIN
- MONITORING_FEEDBACK

## maturityStatus
HOLD_UNRESOLVED

## adjudicationQuestionsForAuthor
- Is there enough weather/clearance evidence to revisit O-axis beyond O-A?
- What control/automation trace is needed before A-axis can move?

## downstreamLocks
- proposedCode is draft only and not `releasedCode`.
- no `selectedCode=CLASSIFIED`.
- no finalConclusion/HFACS/Risk/ERC/recommendations.
- no fixture/baseline/downstream.

## nextStepRecommendation
Carry forward as IMC decision/control boundary case; keep A unresolved.
