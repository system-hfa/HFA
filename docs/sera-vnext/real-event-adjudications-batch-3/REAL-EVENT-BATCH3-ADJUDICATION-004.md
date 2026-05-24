# Real Event Batch 3 Adjudication 004

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

- adjudicationId: REAL-EVENT-BATCH3-ADJUDICATION-004
- sourceExtractionId: A4R76-B3-004
- originalRealEventId: G-BHYB
- shortLabel: G-BHYB S-76A Fulmar night sea-contact event
- adjudicationMode: AI_AUTHOR
- adjudicationConfidence: MEDIUM
- sourceQuality: HIGH
- sourceEnrichmentNeeded: no

## factualBasis
- Night offshore shuttle approach in degraded visual environment.
- Trajectory degraded toward sea-contact exposure during approach.
- Source is strong enough for perception draft but not for PF/PM action closure.

## safeOperationEscapePointCandidate
Candidate escape point is the final approach segment when degraded visual cues and descent/trajectory should have triggered correction or discontinuation.

## unsafeState
Unstable night approach profile with insufficient margin above sea surface.

## unsafeActOrCondition
Perception/monitoring limitation in hostile visual environment, with action mechanism unresolved.

## directActor
Flight crew; PF/PM role split remains partial.

## P_axis_questionPath
- Was relevant information available? yes; evidence: approach path and altitude cues should have been monitorable; impact: P-axis draft supported.
- Was sensory access impaired? yes; evidence: night offshore visual environment; impact: P-F considered.
- Was attention/monitoring degraded? yes candidate; evidence: sea-contact trajectory developed without timely correction; impact: P-G considered.
- Was time pressure dominant? no/unclear; evidence: no explicit high-demand temporal overload; impact: P-D not selected.
- Path result: P-F.

## O_axis_questionPath
- Was the operational goal compatible with safe operation? yes; evidence: offshore shuttle approach/p landing intent; impact: supports O-A.
- Is there evidence of conscious rule deviation? no; evidence: no explicit procedural breach; impact: O-B/O-C rejected.
- Is this non-violation inadequate objective? no/unclear; evidence: no efficiency gain chain; impact: O-D not selected.
- Path result: O-A.

## A_axis_questionPath
- Was a specific action selected or executed? unclear; evidence: final control/correction sequence not decomposed; impact: A unresolved.
- Was the action appropriate to the situation? unclear; evidence: no detailed input trace; impact: no A-F.
- Was there feedback/checking failure after own action? unclear; evidence: no own-action feedback chain; impact: A-C not supported.
- Was time pressure dominant? unclear; evidence: not documented; impact: no A-I/A-J.
- Path result: UNRESOLVED.

## P_axis_reasoning
Night/offshore visual degradation and sea-contact profile support a perceptual distortion/cue limitation draft rather than action closure.

## O_axis_reasoning
The observable objective remains a nominal approach/landing.

## A_axis_reasoning
Action failure is plausible but not isolated from perception and PF/PM ambiguity.

## proposedPCode or UNRESOLVED
P-F

## proposedOCode or UNRESOLVED
O-A

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
- P: visual cue distortion/limitation is central.
- O: no objective deviation evidence.
- A: insufficient specific action evidence.

## evidenceRefsByAxis
- P: night offshore approach and sea-contact exposure.
- O: shuttle approach operation.
- A: missing PF/PM timing and control inputs.

## uncertaintyByAxis
- P: MEDIUM
- O: LOW
- A: HIGH

## rejectedAlternatives
- `P-G` remains plausible but less specific than visual distortion/cue limitation in current read.
- `O-D` rejected without explicit efficiency objective.
- `A-A` rejected as no-failure fallback.

## evidenceCategoryHints
- NIGHT_OFFSHORE_VISUAL_ENVIRONMENT
- APPROACH_PATH_CONTROL
- CREW_MONITORING_CHAIN
- GO_AROUND_DECISION_WINDOW

## maturityStatus
AUTHOR_REVIEW_READY

## adjudicationQuestionsForAuthor
- Confirm `P-F` versus `P-G` as preferred draft for night sea-contact profile.
- What PF/PM evidence would be sufficient to revisit A-axis?

## downstreamLocks
- proposedCode is draft only and not `releasedCode`.
- no `selectedCode=CLASSIFIED`.
- no finalConclusion/HFACS/Risk/ERC/recommendations.
- no fixture/baseline/downstream.

## nextStepRecommendation
Carry to A4+R-78 as high-value night offshore perception/action boundary case.
