# Real Event Batch 3 Adjudication 005

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

- adjudicationId: REAL-EVENT-BATCH3-ADJUDICATION-005
- sourceExtractionId: A4R76-B3-005
- originalRealEventId: HL9294
- shortLabel: HL9294 S-76C++ Gangnam low-viz CFIT sequence
- adjudicationMode: AI_AUTHOR
- adjudicationConfidence: MEDIUM
- sourceQuality: HIGH
- sourceEnrichmentNeeded: no

## factualBasis
- S-76C++ operated in low-visibility urban conditions and continued into obstacle conflict.
- Radar/FDR excerpts indicate low-altitude trajectory and impact sequence.
- Selection material highlights go/no-go and pressure/CRM relevance, but detailed intent evidence remains draft-level.

## safeOperationEscapePointCandidate
Candidate escape point is the low-visibility decision gate before continuing into obstacle-conflict envelope.

## unsafeState
Continued low-visibility approach/route profile into terrain/obstacle conflict.

## unsafeActOrCondition
Decision-continuation and monitoring/coordination challenge in degraded visibility.

## directActor
Flight crew and operational decision chain; broader pressure context requires author review.

## P_axis_questionPath
- Was relevant information available? yes; evidence: weather/visibility and trajectory cues; impact: perception/monitoring draft supported.
- Was sensory access impaired? yes; evidence: low visibility; impact: P-F considered but not selected as dominant.
- Was attention/monitoring degraded? yes candidate; evidence: continued low-altitude conflict profile; impact: supports P-G.
- Was time pressure dominant? unclear; evidence: pressure context mentioned but not dominant in extraction; impact: P-D not selected.
- Path result: P-G.

## O_axis_questionPath
- Was the operational goal compatible with safe operation? partially/unclear; evidence: continuation despite degraded visibility and go/no-go context; impact: O-A not sufficient as sole explanation.
- Is there evidence of conscious rule deviation? unclear; evidence: no explicit rule-awareness quote in extraction; impact: O-C not selected.
- Is this non-violation inadequate objective? yes candidate; evidence: continued mission/approach under adverse conditions without explicit violation proof; impact: supports O-D draft.
- Path result: O-D.

## A_axis_questionPath
- Was a specific action selected or executed? yes/unclear; evidence: continued flight path, but specific cockpit actions not decomposed; impact: A remains unresolved.
- Was the action appropriate to the situation? unclear; evidence: no PF/PM input timeline; impact: no A-F.
- Was there feedback/checking failure after own action? unclear; evidence: no own-action feedback loop; impact: no A-C.
- Was time pressure dominant? unclear; evidence: pressure context insufficiently bounded; impact: no A-I/A-J.
- Path result: UNRESOLVED.

## P_axis_reasoning
The available trajectory and low-visibility profile support monitoring/verification degradation as draft.

## O_axis_reasoning
The case is a controlled draft candidate for objective diversity: continuation under degraded conditions supports O-D more than O-C because conscious rule deviation is not fully evidenced.

## A_axis_reasoning
Specific action failure cannot be isolated from decision/coordination and visibility constraints.

## proposedPCode or UNRESOLVED
P-G

## proposedOCode or UNRESOLVED
O-D

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
- P: flight path/visibility monitoring concern.
- O: continuation under degraded conditions suggests less-conservative operational objective.
- A: no specific action or feedback failure isolated.

## evidenceRefsByAxis
- P: radar/FDR low-altitude trajectory and obstacle conflict.
- O: go/no-go and continuation context from selection/extraction set.
- A: missing PF/PM input and correction chronology.

## uncertaintyByAxis
- P: MEDIUM
- O: MEDIUM
- A: HIGH

## rejectedAlternatives
- `O-C` rejected without clear conscious rule-deviation evidence.
- `P-F` plausible but less directly anchored than monitoring/verification in this draft.
- `A-F` rejected without specific cockpit-selection trace.

## evidenceCategoryHints
- LOW_VISIBILITY_APPROACH
- DECISION_CONTINUATION_CHAIN
- CREW_COORDINATION
- ALTITUDE_PATH_MONITORING

## maturityStatus
AUTHOR_REVIEW_READY

## adjudicationQuestionsForAuthor
- Confirm whether `O-D` is acceptable as draft or should remain O unresolved pending stronger intent evidence.
- What CRM evidence is required before considering A-axis closure?

## downstreamLocks
- proposedCode is draft only and not `releasedCode`.
- no `selectedCode=CLASSIFIED`.
- no finalConclusion/HFACS/Risk/ERC/recommendations.
- no fixture/baseline/downstream.

## nextStepRecommendation
Carry to A4+R-78 as objective-diversity candidate with explicit O-D uncertainty.
