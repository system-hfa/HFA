# QUESTIONPATH-BACKFILL-REAL-EVENT-005

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

- backfillId: QUESTIONPATH-BACKFILL-REAL-EVENT-005
- sourceAdjudicationId: REAL-EVENT-TRIAGE-005
- sourceExtractionId: REAL-EVENT-EXTRACTION-005
- originalRealEventId: REAL-EVENT-0028
- shortLabel: HL9661 tail rotor strike (source partial)
- sourceBatch: BATCH_INITIAL_5
- existingP: UNRESOLVED
- existingO: UNRESOLVED
- existingA: UNRESOLVED
- existingMaturityStatus: TRIAGE_ONLY
- backfillMode: DOCUMENTAL_QUESTIONPATH_ONLY
- backfillConfidence: LOW
- backfillConflictStatus: NO_CONFLICT

## P_axis_questionPath
- questionId: P_INFO_AVAILABLE
  questionText: Was relevant operational information available to the actor before the unsafe state escaped?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for P
    - source is partial/index-level and lacks primary chronology or actor decomposition
  uncertainty: HIGH
  impactOnPath: Records uncertainty without changing the existing result.

- questionId: P_SENSORY_ACCESS_IMPAIRED
  questionText: Was access to the relevant signal impaired by sensory, environmental, or display/cue limitations?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for P
    - source is partial/index-level and lacks primary chronology or actor decomposition
  uncertainty: HIGH
  impactOnPath: Records uncertainty without changing the existing result.

- questionId: P_KNOWLEDGE_PERCEPTION_IMPAIRED
  questionText: Was the signal available but interpreted incorrectly because of perceptual knowledge or mode/state understanding?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for P
    - source is partial/index-level and lacks primary chronology or actor decomposition
  uncertainty: HIGH
  impactOnPath: Records uncertainty without changing the existing result.

- questionId: P_ATTENTION_MONITORING_DEGRADED
  questionText: Was relevant information available but not monitored, checked, or integrated in time?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for P
    - source is partial/index-level and lacks primary chronology or actor decomposition
  uncertainty: HIGH
  impactOnPath: Records uncertainty without changing the existing result.

- questionId: P_TIME_PRESSURE_DOMINANT
  questionText: Was excessive time pressure dominant in the perceptual failure mechanism?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for P
    - source is partial/index-level and lacks primary chronology or actor decomposition
  uncertainty: HIGH
  impactOnPath: Records uncertainty without changing the existing result.

- questionId: P_COMMUNICATION_INFORMATION_PROBLEM
  questionText: Was the perceptual problem primarily caused by incomplete, ambiguous, incorrect, delayed, or missing information transmission?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for P
    - source is partial/index-level and lacks primary chronology or actor decomposition
  uncertainty: HIGH
  impactOnPath: Records uncertainty without changing the existing result.

- questionId: P_PATH_RESULT
  questionText: Which Perception path result is supported by the above answers?
  answer: UNRESOLVED
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for P
    - source is partial/index-level and lacks primary chronology or actor decomposition
  uncertainty: HIGH
  impactOnPath: Preserves existing P-axis result: UNRESOLVED. No release or code change.

## O_axis_questionPath
- questionId: O_GOAL_COMPATIBLE_WITH_SAFE_OPERATION
  questionText: Was the observable goal compatible with safe operation, absent positive evidence of an unsafe objective?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for O
    - source is partial/index-level and lacks primary chronology or actor decomposition
  uncertainty: HIGH
  impactOnPath: Records uncertainty without changing the existing result.

- questionId: O_CONSCIOUS_RULE_DEVIATION_EVIDENCE
  questionText: Is there evidence of conscious deviation from a known rule, procedure, clearance, or operational constraint?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for O
    - source is partial/index-level and lacks primary chronology or actor decomposition
  uncertainty: HIGH
  impactOnPath: Records uncertainty without changing the existing result.

- questionId: O_ROUTINE_DEVIATION_EVIDENCE
  questionText: Is there evidence that the deviation was routine, normalized, repeated, or culturally tolerated?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for O
    - source is partial/index-level and lacks primary chronology or actor decomposition
  uncertainty: HIGH
  impactOnPath: Records uncertainty without changing the existing result.

- questionId: O_EXCEPTIONAL_DEVIATION_EVIDENCE
  questionText: Is there evidence that the deviation was exceptional or circumstantial rather than routine?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for O
    - source is partial/index-level and lacks primary chronology or actor decomposition
  uncertainty: HIGH
  impactOnPath: Records uncertainty without changing the existing result.

- questionId: O_NON_VIOLATION_INADEQUATE_OBJECTIVE
  questionText: Is there evidence of a less conservative efficiency/economy objective without explicit rule violation?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for O
    - source is partial/index-level and lacks primary chronology or actor decomposition
  uncertainty: HIGH
  impactOnPath: Records uncertainty without changing the existing result.

- questionId: O_PATH_RESULT
  questionText: Which Objective path result is supported by the above answers?
  answer: UNRESOLVED
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for O
    - source is partial/index-level and lacks primary chronology or actor decomposition
  uncertainty: HIGH
  impactOnPath: Preserves existing O-axis result: UNRESOLVED. No release or code change.

## A_axis_questionPath
- questionId: A_SPECIFIC_ACTION_SELECTED_OR_EXECUTED
  questionText: Was a specific human action, omission, input, instruction, or selected path identified?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for A
    - Source remains partial/index-level; primary chronology and actor decomposition are missing
  uncertainty: HIGH
  impactOnPath: Does not provide enough evidence to reduce A=UNRESOLVED.

- questionId: A_ACTION_IMPLEMENTED_AS_INTENDED
  questionText: Was the selected action implemented as intended, or is there evidence of omission/lapse/slip during execution?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for A
    - Source remains partial/index-level; primary chronology and actor decomposition are missing
  uncertainty: HIGH
  impactOnPath: Does not provide enough evidence to reduce A=UNRESOLVED.

- questionId: A_ACTION_APPROPRIATE_TO_SITUATION
  questionText: Was the selected or executed action appropriate to the situation and known alternatives?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for A
    - Source remains partial/index-level; primary chronology and actor decomposition are missing
  uncertainty: HIGH
  impactOnPath: Does not provide enough evidence to reduce A=UNRESOLVED.

- questionId: A_OWN_ACTION_FEEDBACK_CHECK_FAILED
  questionText: Is there evidence that the actor failed to verify feedback/results after their own action?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for A
    - Source remains partial/index-level; primary chronology and actor decomposition are missing
  uncertainty: HIGH
  impactOnPath: Does not provide enough evidence to reduce A=UNRESOLVED.

- questionId: A_PHYSICAL_ERGONOMIC_ABILITY_IMPAIRED
  questionText: Was correct execution impaired by physical, motor, ergonomic, or capability limits?
  answer: NO
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for A
    - Source remains partial/index-level; primary chronology and actor decomposition are missing
  uncertainty: LOW/MEDIUM
  impactOnPath: Does not provide enough evidence to reduce A=UNRESOLVED.

- questionId: A_KNOWLEDGE_DECISION_LIMITATION
  questionText: Is there evidence that the action failure came from lack of operational knowledge or skill?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for A
    - Source remains partial/index-level; primary chronology and actor decomposition are missing
  uncertainty: HIGH
  impactOnPath: Does not provide enough evidence to reduce A=UNRESOLVED.

- questionId: A_ACTION_SELECTION_FAILURE
  questionText: Is there evidence that the actor selected the wrong option among known alternatives?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for A
    - Source remains partial/index-level; primary chronology and actor decomposition are missing
  uncertainty: HIGH
  impactOnPath: Does not provide enough evidence to reduce A=UNRESOLVED.

- questionId: A_TIME_PRESSURE_DOMINANT
  questionText: Was excessive time pressure dominant in the action selection, execution, or feedback failure?
  answer: UNCLEAR
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for A
    - Source remains partial/index-level; primary chronology and actor decomposition are missing
  uncertainty: HIGH
  impactOnPath: Does not provide enough evidence to reduce A=UNRESOLVED.

- questionId: A_PATH_RESULT
  questionText: Which Action path result is supported by the above answers?
  answer: UNRESOLVED
  evidenceRefs:
    - source adjudication reasoning/evidenceRefsByAxis for A
    - Source remains partial/index-level; primary chronology and actor decomposition are missing
  uncertainty: HIGH
  impactOnPath: Preserves existing A-axis result: UNRESOLVED. No release or code change.

## backfillNotes
- This backfill documents the question path behind existing draft P/O/A values only.
- Main uncertainty: Source remains partial/index-level; primary chronology and actor decomposition are missing
- No old report conclusion, HFACS label, probable cause, or recommendation is used as a SERA expected value.
- O-E is not used as a path result; O-E = NON_EXISTENT_IN_SERA_PT_V1.

## preservedDecisions
- existingP preserved: UNRESOLVED
- existingO preserved: UNRESOLVED
- existingA preserved: UNRESOLVED
- existingMaturityStatus preserved: TRIAGE_ONLY
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
Keep triage-only until a primary source anchor and actor chronology exist
