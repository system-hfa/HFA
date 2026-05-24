# Real Event Batch 3 Adjudication 009

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

- adjudicationId: REAL-EVENT-BATCH3-ADJUDICATION-009
- sourceExtractionId: A4R76-B3-009
- originalRealEventId: N11NM
- shortLabel: N11NM AW109S missed-approach LOC
- adjudicationMode: AI_AUTHOR
- adjudicationConfidence: MEDIUM
- sourceQuality: HIGH
- sourceEnrichmentNeeded: no

## factualBasis
- AW109S HEMS flight entered night IMC missed-approach/go-around phase.
- Sequence involved unstable energy/attitude regime and automation/mode/cockpit-data relevance.

## safeOperationEscapePointCandidate
Candidate escape point is the mode/energy transition point during missed approach when attitude and power state required immediate recognition and correction.

## unsafeState
Unstable missed-approach flight regime in night IMC with degraded attitude/energy awareness and narrowing recovery envelope.

## unsafeActOrCondition
Automation/mode awareness and action-feedback boundary during high-workload transition.

## directActor
Flight crew, with control/monitoring roles not fully decomposed.

## P_axis_questionPath
- Was relevant information available? yes; evidence: mode/airspeed/attitude/torque cues referenced; impact: perception/interpretation draft supported.
- Was sensory access impaired? yes contextually; evidence: night IMC; impact: P-F possible but not dominant.
- Was knowledge/perception impaired? yes candidate; evidence: automation/mode awareness boundary; impact: supports P-C.
- Was attention/monitoring degraded? unclear/possible; evidence: missed transition cues; impact: P-G alternative rejected in favor of mode interpretation.
- Path result: P-C.

## O_axis_questionPath
- Was the operational goal compatible with safe operation? yes; evidence: missed approach/go-around is nominal safety objective; impact: supports O-A.
- Is there evidence of conscious rule deviation? no; evidence: no procedural-violation proof; impact: O-B/O-C rejected.
- Is this non-violation inadequate objective? no/unclear; evidence: go-around objective is safety-compatible; impact: O-D not selected.
- Path result: O-A.

## A_axis_questionPath
- Was a specific action selected or executed? yes; evidence: missed-approach transition and control/mode actions; impact: A-axis candidate exists.
- Was action implemented as intended? unclear; evidence: mode/input timeline not fully extracted; impact: A unresolved.
- Was there feedback/checking failure after own action? unclear; evidence: no specific own-action feedback failure; impact: A-C not supported.
- Was time pressure dominant? yes possible; evidence: high workload transition; impact: no A-I without wrong-selection proof.
- Path result: UNRESOLVED.

## P_axis_reasoning
Automation/mode-awareness evidence supports interpretation/knowledge-perception draft, analogous to prior automation boundary handling.

## O_axis_reasoning
Missed approach/go-around is a nominal safety-compatible objective.

## A_axis_reasoning
The event may later support action coding, but the extracted material does not isolate specific mode/input/feedback failure.

## proposedPCode or UNRESOLVED
P-C

## proposedOCode or UNRESOLVED
O-A

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
- P: mode/automation interpretation boundary.
- O: safety-compatible missed approach.
- A: insufficient specific input/verification chain.

## evidenceRefsByAxis
- P: automation/mode and cockpit-data references.
- O: missed-approach context.
- A: missing exact mode-selection/control-input timeline.

## uncertaintyByAxis
- P: MEDIUM
- O: LOW
- A: HIGH

## rejectedAlternatives
- `P-G` rejected as less specific than mode-interpretation draft.
- `A-C` rejected without own-action verification failure.
- `A-F` rejected without specific wrong-selection evidence.

## evidenceCategoryHints
- AUTOMATION_MODE_TRANSITION
- MISSED_APPROACH_ENERGY
- NIGHT_IMC_ATTITUDE_AWARENESS
- CREW_MONITORING_RESPONSE

## maturityStatus
AUTHOR_REVIEW_READY

## adjudicationQuestionsForAuthor
- Confirm `P-C` versus `P-G` for automation/mode awareness.
- What exact mode/input chain is required before considering A-axis release candidate?

## downstreamLocks
- proposedCode is draft only and not `releasedCode`.
- no `selectedCode=CLASSIFIED`.
- no finalConclusion/HFACS/Risk/ERC/recommendations.
- no fixture/baseline/downstream.

## nextStepRecommendation
Carry to A4+R-78 as automation/mode-awareness reference candidate.
