# QUESTIONPATH-BACKFILL-REAL-EVENT-002

Status:
- QUESTIONPATH_BACKFILL_DRAFT
- DOCS_ONLY
- NOT_FIXTURE
- NOT_BASELINE
- NOT_CONSENSUS_VALIDATED
- NOT_FOR_DOWNSTREAM
- NO_PROPOSED_CODE_CHANGE
- NO_UNRESOLVED_REDUCTION
- NO_RELEASED_CODE
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_RECOMMENDATIONS

- backfillId: QUESTIONPATH-BACKFILL-REAL-EVENT-002
- sourceAdjudicationId: REAL-EVENT-ADJUDICATION-002
- sourceExtractionId: REAL-EVENT-EXTRACTION-002
- originalRealEventId: REAL-EVENT-0002
- shortLabel: Peasmarsh discontinued night approach near trees
- sourceBatch: BATCH_INITIAL_5
- existingP: UNRESOLVED
- existingO: O-A
- existingA: UNRESOLVED
- existingMaturityStatus: HOLD_UNRESOLVED
- backfillMode: DOCUMENTAL_QUESTIONPATH_ONLY
- backfillConfidence: MEDIUM
- backfillConflictStatus: NO_CONFLICT

## P_axis_questionPath
- questionId: P_INFO_AVAILABLE
  questionText: Was relevant operational information available to the actor before the unsafe state escaped?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for P
    - warning perception, go-around routing, and escape path remain entangled
  uncertainty: MEDIUM/HIGH
  impactOnPath: Records uncertainty without changing the existing result.

- questionId: P_SENSORY_ACCESS_IMPAIRED
  questionText: Was access to the relevant signal impaired by sensory, environmental, or display/cue limitations?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for P
    - warning perception, go-around routing, and escape path remain entangled
  uncertainty: MEDIUM/HIGH
  impactOnPath: Records uncertainty without changing the existing result.

- questionId: P_KNOWLEDGE_PERCEPTION_IMPAIRED
  questionText: Was the signal available but interpreted incorrectly because of perceptual knowledge or mode/state understanding?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for P
    - warning perception, go-around routing, and escape path remain entangled
  uncertainty: MEDIUM/HIGH
  impactOnPath: Records uncertainty without changing the existing result.

- questionId: P_ATTENTION_MONITORING_DEGRADED
  questionText: Was relevant information available but not monitored, checked, or integrated in time?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for P
    - warning perception, go-around routing, and escape path remain entangled
  uncertainty: MEDIUM/HIGH
  impactOnPath: Records uncertainty without changing the existing result.

- questionId: P_TIME_PRESSURE_DOMINANT
  questionText: Was excessive time pressure dominant in the perceptual failure mechanism?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for P
    - warning perception, go-around routing, and escape path remain entangled
  uncertainty: MEDIUM/HIGH
  impactOnPath: Records uncertainty without changing the existing result.

- questionId: P_COMMUNICATION_INFORMATION_PROBLEM
  questionText: Was the perceptual problem primarily caused by incomplete, ambiguous, incorrect, delayed, or missing information transmission?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for P
    - warning perception, go-around routing, and escape path remain entangled
  uncertainty: MEDIUM/HIGH
  impactOnPath: Records uncertainty without changing the existing result.

- questionId: P_PATH_RESULT
  questionText: Which Perception path result is supported by the above answers?
  answer: UNRESOLVED
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for P
    - warning perception, go-around routing, and escape path remain entangled
  uncertainty: MEDIUM/HIGH
  impactOnPath: Preserves existing P-axis result: UNRESOLVED. No release or code change.

## O_axis_questionPath
- questionId: O_GOAL_COMPATIBLE_WITH_SAFE_OPERATION
  questionText: Was the observable goal compatible with safe operation, absent positive evidence of an unsafe objective?
  answer: YES
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for O
    - no positive evidence of intentional deviation or efficiency objective
  uncertainty: MEDIUM/HIGH
  impactOnPath: Supports existing O-A draft.

- questionId: O_CONSCIOUS_RULE_DEVIATION_EVIDENCE
  questionText: Is there evidence of conscious deviation from a known rule, procedure, clearance, or operational constraint?
  answer: NO
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for O
    - no positive evidence of intentional deviation or efficiency objective
  uncertainty: LOW/MEDIUM
  impactOnPath: Rejects this branch for the current draft.

- questionId: O_ROUTINE_DEVIATION_EVIDENCE
  questionText: Is there evidence that the deviation was routine, normalized, repeated, or culturally tolerated?
  answer: NO
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for O
    - no positive evidence of intentional deviation or efficiency objective
  uncertainty: LOW/MEDIUM
  impactOnPath: Rejects this branch for the current draft.

- questionId: O_EXCEPTIONAL_DEVIATION_EVIDENCE
  questionText: Is there evidence that the deviation was exceptional or circumstantial rather than routine?
  answer: NO
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for O
    - no positive evidence of intentional deviation or efficiency objective
  uncertainty: LOW/MEDIUM
  impactOnPath: Rejects this branch for the current draft.

- questionId: O_NON_VIOLATION_INADEQUATE_OBJECTIVE
  questionText: Is there evidence of a less conservative efficiency/economy objective without explicit rule violation?
  answer: NO
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for O
    - no positive evidence of intentional deviation or efficiency objective
  uncertainty: LOW/MEDIUM
  impactOnPath: Rejects this branch for the current draft.

- questionId: O_PATH_RESULT
  questionText: Which Objective path result is supported by the above answers?
  answer: O-A
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for O
    - no positive evidence of intentional deviation or efficiency objective
  uncertainty: MEDIUM/HIGH
  impactOnPath: Preserves existing O-axis result: O-A. No release or code change.

## A_axis_questionPath
- questionId: A_SPECIFIC_ACTION_SELECTED_OR_EXECUTED
  questionText: Was a specific human action, omission, input, instruction, or selected path identified?
  answer: YES
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for A
    - Warning perception, go-around routing, and escape trajectory mechanisms remain entangled
  uncertainty: MEDIUM/HIGH
  impactOnPath: Does not provide enough evidence to reduce A=UNRESOLVED.

- questionId: A_ACTION_IMPLEMENTED_AS_INTENDED
  questionText: Was the selected action implemented as intended, or is there evidence of omission/lapse/slip during execution?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for A
    - Warning perception, go-around routing, and escape trajectory mechanisms remain entangled
  uncertainty: MEDIUM/HIGH
  impactOnPath: Does not provide enough evidence to reduce A=UNRESOLVED.

- questionId: A_ACTION_APPROPRIATE_TO_SITUATION
  questionText: Was the selected or executed action appropriate to the situation and known alternatives?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for A
    - Warning perception, go-around routing, and escape trajectory mechanisms remain entangled
  uncertainty: MEDIUM/HIGH
  impactOnPath: Does not provide enough evidence to reduce A=UNRESOLVED.

- questionId: A_OWN_ACTION_FEEDBACK_CHECK_FAILED
  questionText: Is there evidence that the actor failed to verify feedback/results after their own action?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for A
    - Warning perception, go-around routing, and escape trajectory mechanisms remain entangled
  uncertainty: MEDIUM/HIGH
  impactOnPath: Does not provide enough evidence to reduce A=UNRESOLVED.

- questionId: A_PHYSICAL_ERGONOMIC_ABILITY_IMPAIRED
  questionText: Was correct execution impaired by physical, motor, ergonomic, or capability limits?
  answer: NO
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for A
    - Warning perception, go-around routing, and escape trajectory mechanisms remain entangled
  uncertainty: LOW/MEDIUM
  impactOnPath: Does not provide enough evidence to reduce A=UNRESOLVED.

- questionId: A_KNOWLEDGE_DECISION_LIMITATION
  questionText: Is there evidence that the action failure came from lack of operational knowledge or skill?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for A
    - Warning perception, go-around routing, and escape trajectory mechanisms remain entangled
  uncertainty: MEDIUM/HIGH
  impactOnPath: Does not provide enough evidence to reduce A=UNRESOLVED.

- questionId: A_ACTION_SELECTION_FAILURE
  questionText: Is there evidence that the actor selected the wrong option among known alternatives?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for A
    - Warning perception, go-around routing, and escape trajectory mechanisms remain entangled
  uncertainty: MEDIUM/HIGH
  impactOnPath: Does not provide enough evidence to reduce A=UNRESOLVED.

- questionId: A_TIME_PRESSURE_DOMINANT
  questionText: Was excessive time pressure dominant in the action selection, execution, or feedback failure?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for A
    - Warning perception, go-around routing, and escape trajectory mechanisms remain entangled
  uncertainty: MEDIUM/HIGH
  impactOnPath: Does not provide enough evidence to reduce A=UNRESOLVED.

- questionId: A_PATH_RESULT
  questionText: Which Action path result is supported by the above answers?
  answer: UNRESOLVED
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for A
    - Warning perception, go-around routing, and escape trajectory mechanisms remain entangled
  uncertainty: MEDIUM/HIGH
  impactOnPath: Preserves existing A-axis result: UNRESOLVED. No release or code change.

## backfillNotes
- This backfill documents the question path behind existing draft P/O/A values only.
- Main uncertainty: Warning perception, go-around routing, and escape trajectory mechanisms remain entangled
- No old report conclusion, HFACS label, probable cause, or recommendation is used as a SERA expected value.
- O-E is not used as a path result; O-E = NON_EXISTENT_IN_SERA_PT_V1.

## preservedDecisions
- existingP preserved: UNRESOLVED
- existingO preserved: O-A
- existingA preserved: UNRESOLVED
- existingMaturityStatus preserved: HOLD_UNRESOLVED
- proposedCodeChanges: 0
- unresolvedReduced: 0

## downstreamLocks
- proposedCode remains draft only and is not releasedCode.
- no selectedCode=CLASSIFIED.
- no finalConclusion.
- no HFACS.
- no Risk/ERC.
- no recommendations.
- no fixture/baseline/downstream.

## nextStepRecommendation
Maintain hold and enrich warning/go-around evidence before reducing P/A uncertainty
