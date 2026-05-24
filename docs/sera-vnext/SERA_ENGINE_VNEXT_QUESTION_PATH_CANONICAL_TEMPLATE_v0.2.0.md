# SERA Engine vNext QuestionPath Canonical Template v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-79 — QuestionPath Template and Backfill Plan  
DOCS_ONLY  
NO_RELEASED_CODE  
NO_DOWNSTREAM  
NO_FIXTURE  
NO_BASELINE

## Objective
Define a canonical template for documenting the question/answer path that supports each draft `proposedCode` or `UNRESOLVED` result on the P/O/A axes.

`questionPath` is a traceability layer for AI/Author adjudication. It records the methodological questions asked, the factual evidence available, the uncertainty retained, and the reason a draft code was proposed or an axis remained unresolved.

## Principles
- `questionPath` is traceability, not a release gate.
- `questionPath` does not create a code.
- `questionPath` does not alter an existing `proposedCode`.
- `questionPath` documents why an axis was proposed or kept `UNRESOLVED`.
- `questionPath` must register evidence and uncertainty.
- No-failure is not a fallback for unknown evidence.
- `O-E` does not exist in SERA-PT v1.0.

## Common item structure
Each question item must use the following fields:

| field | required content |
|---|---|
| `questionId` | Stable identifier for the canonical question. |
| `questionText` | Human-readable question applied to the axis. |
| `answer` | `YES`, `NO`, `UNCLEAR`, or `NOT_APPLICABLE`. |
| `evidenceRefs` | Factual references or extraction/adjudication anchors used for the answer. |
| `uncertainty` | Residual uncertainty affecting the answer. |
| `impactOnPath` | How the answer affects code selection or `UNRESOLVED` status. |

Recommended Markdown representation:

```text
- questionId: <ID>
  questionText: <canonical question>
  answer: YES | NO | UNCLEAR | NOT_APPLICABLE
  evidenceRefs:
    - <factual anchor, not report conclusion as expected value>
  uncertainty: <LOW | MEDIUM | HIGH or short text>
  impactOnPath: <why this supports/rejects a path result>
```

## P_axis_questionPath template

### Canonical questions
```text
P_axis_questionPath:
  - questionId: P_INFO_AVAILABLE
    questionText: Was relevant operational information available to the actor before the unsafe state escaped?
    answer: YES | NO | UNCLEAR | NOT_APPLICABLE
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: ""

  - questionId: P_SENSORY_ACCESS_IMPAIRED
    questionText: Was access to the relevant signal impaired by sensory, environmental, or display/cue limitations?
    answer: YES | NO | UNCLEAR | NOT_APPLICABLE
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: ""

  - questionId: P_KNOWLEDGE_PERCEPTION_IMPAIRED
    questionText: Was the signal available but interpreted incorrectly because of perceptual knowledge or mode/state understanding?
    answer: YES | NO | UNCLEAR | NOT_APPLICABLE
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: ""

  - questionId: P_ATTENTION_MONITORING_DEGRADED
    questionText: Was relevant information available but not monitored, checked, or integrated in time?
    answer: YES | NO | UNCLEAR | NOT_APPLICABLE
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: ""

  - questionId: P_TIME_PRESSURE_DOMINANT
    questionText: Was excessive time pressure dominant in the perceptual failure mechanism?
    answer: YES | NO | UNCLEAR | NOT_APPLICABLE
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: ""

  - questionId: P_COMMUNICATION_INFORMATION_PROBLEM
    questionText: Was the perceptual problem primarily caused by incomplete, ambiguous, incorrect, delayed, or missing information transmission?
    answer: YES | NO | UNCLEAR | NOT_APPLICABLE
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: ""

  - questionId: P_PATH_RESULT
    questionText: Which Perception path result is supported by the above answers?
    answer: P-A | P-B | P-C | P-D | P-E | P-F | P-G | P-H | UNRESOLVED
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: "Final P-axis draft result or unresolved rationale."
```

### P path result options
- `P-A`
- `P-B`
- `P-C`
- `P-D`
- `P-E`
- `P-F`
- `P-G`
- `P-H`
- `UNRESOLVED`

## O_axis_questionPath template

### Canonical questions
```text
O_axis_questionPath:
  - questionId: O_GOAL_COMPATIBLE_WITH_SAFE_OPERATION
    questionText: Was the observable goal compatible with safe operation, absent positive evidence of an unsafe objective?
    answer: YES | NO | UNCLEAR | NOT_APPLICABLE
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: ""

  - questionId: O_CONSCIOUS_RULE_DEVIATION_EVIDENCE
    questionText: Is there evidence of conscious deviation from a known rule, procedure, clearance, or operational constraint?
    answer: YES | NO | UNCLEAR | NOT_APPLICABLE
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: ""

  - questionId: O_ROUTINE_DEVIATION_EVIDENCE
    questionText: Is there evidence that the deviation was routine, normalized, repeated, or culturally tolerated?
    answer: YES | NO | UNCLEAR | NOT_APPLICABLE
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: ""

  - questionId: O_EXCEPTIONAL_DEVIATION_EVIDENCE
    questionText: Is there evidence that the deviation was exceptional or circumstantial rather than routine?
    answer: YES | NO | UNCLEAR | NOT_APPLICABLE
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: ""

  - questionId: O_NON_VIOLATION_INADEQUATE_OBJECTIVE
    questionText: Is there evidence of a less conservative efficiency/economy objective without explicit rule violation?
    answer: YES | NO | UNCLEAR | NOT_APPLICABLE
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: ""

  - questionId: O_PATH_RESULT
    questionText: Which Objective path result is supported by the above answers?
    answer: O-A | O-B | O-C | O-D | UNRESOLVED
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: "Final O-axis draft result or unresolved rationale."
```

### O path result options
- `O-A`
- `O-B`
- `O-C`
- `O-D`
- `UNRESOLVED`

`O-E = NON_EXISTENT_IN_SERA_PT_V1`.

Do not include `O-E` as a path result option. `O-E` may appear only as a negative/adversarial guardrail to block its use as an active code or future reserved code.

## A_axis_questionPath template

### Canonical questions
```text
A_axis_questionPath:
  - questionId: A_SPECIFIC_ACTION_SELECTED_OR_EXECUTED
    questionText: Was a specific human action, omission, input, instruction, or selected path identified?
    answer: YES | NO | UNCLEAR | NOT_APPLICABLE
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: ""

  - questionId: A_ACTION_IMPLEMENTED_AS_INTENDED
    questionText: Was the selected action implemented as intended, or is there evidence of omission/lapse/slip during execution?
    answer: YES | NO | UNCLEAR | NOT_APPLICABLE
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: ""

  - questionId: A_ACTION_APPROPRIATE_TO_SITUATION
    questionText: Was the selected or executed action appropriate to the situation and known alternatives?
    answer: YES | NO | UNCLEAR | NOT_APPLICABLE
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: ""

  - questionId: A_OWN_ACTION_FEEDBACK_CHECK_FAILED
    questionText: Is there evidence that the actor failed to verify feedback/results after their own action?
    answer: YES | NO | UNCLEAR | NOT_APPLICABLE
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: ""

  - questionId: A_PHYSICAL_ERGONOMIC_ABILITY_IMPAIRED
    questionText: Was correct execution impaired by physical, motor, ergonomic, or capability limits?
    answer: YES | NO | UNCLEAR | NOT_APPLICABLE
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: ""

  - questionId: A_KNOWLEDGE_DECISION_LIMITATION
    questionText: Is there evidence that the action failure came from lack of operational knowledge or skill?
    answer: YES | NO | UNCLEAR | NOT_APPLICABLE
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: ""

  - questionId: A_ACTION_SELECTION_FAILURE
    questionText: Is there evidence that the actor selected the wrong option among known alternatives?
    answer: YES | NO | UNCLEAR | NOT_APPLICABLE
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: ""

  - questionId: A_TIME_PRESSURE_DOMINANT
    questionText: Was excessive time pressure dominant in the action selection, execution, or feedback failure?
    answer: YES | NO | UNCLEAR | NOT_APPLICABLE
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: ""

  - questionId: A_PATH_RESULT
    questionText: Which Action path result is supported by the above answers?
    answer: A-A | A-B | A-C | A-D | A-E | A-F | A-G | A-H | A-I | A-J | UNRESOLVED
    evidenceRefs: []
    uncertainty: ""
    impactOnPath: "Final A-axis draft result or unresolved rationale."
```

### A path result options
- `A-A`
- `A-B`
- `A-C`
- `A-D`
- `A-E`
- `A-F`
- `A-G`
- `A-H`
- `A-I`
- `A-J`
- `UNRESOLVED`

Notes:
- `A-A` = no specific action failure.
- `A-C` = own-action post-action feedback/checking failure.
- `UNRESOLVED` is not equivalent to `A-A`.

## Backfill note
When performing backfill, do not invent answers. Use `UNCLEAR` when evidence does not support `YES` or `NO`.

Backfill must not alter existing draft codes in A4+R-79. If a future backfill exposes a strong inconsistency with an existing draft `proposedCode`, mark `BACKFILL_CONFLICT_FOR_AUTHOR_REVIEW` and preserve the current draft until explicit author review.

