# Real Event Batch 3 Adjudication 011

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

- adjudicationId: REAL-EVENT-BATCH3-ADJUDICATION-011
- sourceExtractionId: A4R76-B3-011
- originalRealEventId: N120HH
- shortLabel: N120HH Bell 407 uncontained engine failure
- adjudicationMode: AI_AUTHOR
- adjudicationConfidence: MEDIUM
- sourceQuality: HIGH
- sourceEnrichmentNeeded: no

## factualBasis
- Bell 407 experienced oil/engine degradation and uncontained engine failure.
- Smoke/oil and component evidence are present, followed by emergency landing and fire.
- Detectability and warning usability remain unresolved.

## safeOperationEscapePointCandidate
Candidate escape point is the earliest detectable technical-degradation cue before uncontained failure and emergency landing envelope collapsed.

## unsafeState
Propulsion-system degradation leading to rapidly narrowing emergency landing and controllability envelope.

## unsafeActOrCondition
Condition-dominant technical failure with uncertain detectability and response window.

## directActor
Primary initiating mechanism appears technical/systemic; pilot response is relevant but not classified as direct unsafe act here.

## P_axis_questionPath
- Was relevant information available? unclear; evidence: smoke/oil indicators may have existed, but cockpit warning usability is unresolved; impact: P unresolved.
- Was sensory access impaired? unclear/no; evidence: no sensory barrier; impact: P-B/P-F not supported.
- Was attention/monitoring degraded? unclear; evidence: detectability not established; impact: P-G not supported.
- Was time pressure dominant? yes after failure; evidence: emergency landing context; impact: not enough for P-D.
- Path result: UNRESOLVED.

## O_axis_questionPath
- Was the operational goal compatible with safe operation? yes; evidence: routine/private flight and emergency landing response; impact: supports O-A.
- Is there evidence of conscious rule deviation? no; evidence: none in extraction; impact: O-B/O-C rejected.
- Is this non-violation inadequate objective? no/unclear; evidence: no efficiency objective; impact: O-D not selected.
- Path result: O-A.

## A_axis_questionPath
- Was a specific action selected or executed? yes; evidence: emergency response/landing attempt; impact: action exists.
- Was action inappropriate to situation? unclear; evidence: technical failure dominates; impact: A unresolved.
- Was feedback/checking failure after own action? unclear; evidence: no own-action feedback chain; impact: no A-C.
- Was time pressure dominant? yes; evidence: emergency after engine failure; impact: no A-I without wrong-selection proof.
- Path result: UNRESOLVED.

## P_axis_reasoning
Detectability is the key gap; technical severity cannot be converted into perception failure.

## O_axis_reasoning
No non-nominal objective is evidenced.

## A_axis_reasoning
Emergency response exists but cannot be judged apart from technical failure and warning window.

## proposedPCode or UNRESOLVED
UNRESOLVED

## proposedOCode or UNRESOLVED
O-A

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
- P: warning/detectability not proven.
- O: nominal objective.
- A: response window and appropriateness not established.

## evidenceRefsByAxis
- P: possible smoke/oil cues and warning uncertainty.
- O: routine flight and emergency handling context.
- A: emergency landing after technical failure.

## uncertaintyByAxis
- P: HIGH
- O: LOW
- A: HIGH

## rejectedAlternatives
- `P-G` rejected until cue availability and missed monitoring are proven.
- `A-F` rejected because technical condition dominates.
- `A-A` rejected as fallback for missing action evidence.

## evidenceCategoryHints
- POWERPLANT_DEGRADATION
- WARNING_INDICATION_CHAIN
- EMERGENCY_RESPONSE_PROFILE
- CONDITION_DOMINANT_CASE

## maturityStatus
HOLD_UNRESOLVED

## adjudicationQuestionsForAuthor
- What warning/cue evidence proves or disproves pilot detectability before failure?
- Should maintenance-chain issues be kept outside P/O/A until separately extracted?

## downstreamLocks
- proposedCode is draft only and not `releasedCode`.
- no `selectedCode=CLASSIFIED`.
- no finalConclusion/HFACS/Risk/ERC/recommendations.
- no fixture/baseline/downstream.

## nextStepRecommendation
Maintain condition-dominant hold; do not force P/A without detectability evidence.
