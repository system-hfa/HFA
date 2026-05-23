# SERA / HFACS Crosswalk v0.1.4
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-2 — HFACS/SERA Crosswalk  
Scope: controlled methodological bridge between HFACS/DoD HFACS and SERA  
Non-scope: engine changes, automatic P/O/A mapping, fixture creation, baseline promotion, risk-layer redesign
---
## 1. Purpose
This document defines a controlled crosswalk between HFACS / DoD HFACS and SERA.
The purpose is not to convert HFACS categories into SERA codes automatically.
The purpose is to use HFACS as:
- a comparative taxonomy;
- a vocabulary source for human factors;
- a structured way to identify preconditions, supervision and organizational context;
- a reporting bridge for users familiar with HFACS;
- a source of prompts for evidence extraction.
SERA remains the causal classification method for the HFA/SERA project.
---
## 2. Core rule
HFACS may suggest questions.
HFACS must not answer SERA P/O/A automatically.
A HFACS label such as:
```text
Decision Error
Skill-Based Error
Perceptual Error
Routine Violation
Exceptional Violation
Inadequate Supervision
Organizational Process

does not directly determine:

P-code
O-code
A-code
fixture expected value
baseline result
```

SERA must reconstruct the causal flow from factual evidence.

⸻

3. Why the distinction matters

HFACS is primarily a descriptive and classificatory taxonomy of human factors across multiple levels:

Acts
Preconditions
Supervision
Organizational Influences

SERA asks a different operational question:

How did the operation depart from safe functioning through the actor's perception, objective and action in context?

Therefore, HFACS and SERA overlap, but they are not equivalent.

HFACS can help locate relevant human-factors material.

SERA must still determine the active failure logic.

⸻

4. SERA causal reconstruction questions

Before assigning any SERA code, the analyst or system must reconstruct:

1. What was the intended safe operation?
2. Where was the safe operation escape point?
3. Was there an unsafe act, unsafe condition, or both?
4. Who was the direct actor?
5. What information was available to the actor at the relevant time?
6. What did the actor appear to perceive?
7. What goal or objective was the actor pursuing?
8. What action was selected or executed?
9. What preconditions shaped the actor's perception, objective or action?
10. What evidence is missing or ambiguous?

HFACS may help with question 9.

HFACS must not replace questions 1–8.

⸻

5. High-level crosswalk

HFACS level	Useful SERA relationship	Allowed use	Forbidden use
Acts	May point to unsafe act type	prompt SERA active failure analysis	direct P/O/A mapping
Preconditions	Strongly relevant to SERA preconditions	enrich preconditions_trace	force causal code
Supervision	Contextual/latent factor	enrich organizational context	classify direct actor
Organizational Influences	Contextual/latent factor	support risk profile and recommendations	decide P/O/A
Violations	May suggest objective/intention questions	trigger O-code evidence review	automatic O-C/O-D/O-E
Perceptual errors	May suggest P-axis questions	trigger perception evidence review	automatic P-code
Skill-based errors	May suggest A-axis questions	trigger action execution review	automatic A-code
Decision errors	May suggest objective/action questions	trigger objective/action review	automatic O/A code

⸻

6. HFACS Acts vs SERA active failure

HFACS Acts are closest to SERA active failures.

However, they still require SERA reconstruction.

6.1 HFACS Skill-Based Errors

Possible SERA questions:

Was the action routine or highly practiced?
Was the intended action appropriate but execution failed?
Was there an inadvertent operation?
Was there a checklist omission?
Was there overcontrol or undercontrol?
Was there breakdown in scan?

Possible SERA relevance:

A-axis likely relevant

Forbidden shortcut:

Skill-Based Error = A-code

Why forbidden:

A skill-based error may still be downstream of perception failure, wrong objective, task saturation, inadequate briefing, or ambiguous automation state.

⸻

6.2 HFACS Judgment and Decision-Making Errors

Possible SERA questions:

Was the selected plan inadequate?
Was risk assessed incorrectly during operation?
Was the task misprioritized?
Was necessary action delayed or rushed?
Was a warning ignored?
Was the decision time-constrained?

Possible SERA relevance:

Objective axis may be relevant.
Action axis may be relevant.
Preconditions may be relevant.

Forbidden shortcut:

Decision Error = O-code
Decision Error = A-code

Why forbidden:

A decision error can arise from misperception, faulty objective, wrong action selection, inadequate information, social pressure, or organizational preconditions.

⸻

6.3 HFACS Perceptual Errors

Possible SERA questions:

Did the actor misperceive an object, threat, state, altitude, speed, attitude, distance, weather, cue or automation mode?
Was there visual illusion, vestibular illusion, auditory misinterpretation or spatial disorientation?
Was the actor unaware of the actual unsafe state?

Possible SERA relevance:

P-axis likely relevant.

Forbidden shortcut:

Perceptual Error = P-code

Why forbidden:

The SERA P-code still requires identifying exactly what was misperceived and whether that misperception was causal to the unsafe act/condition.

⸻

6.4 HFACS Violations

Possible SERA questions:

Was there deliberate deviation from a known rule, procedure or limit?
Was the deviation routine/widespread?
Was the deviation based on risk assessment?
Was the deviation exceptional?
Was there evidence the actor knew the rule or expected procedure?
Was the actor pursuing a protective or non-protective goal?

Possible SERA relevance:

Objective axis may be relevant.
O-C/O-D/O-E review may be triggered depending on evidence.

Forbidden shortcut:

Violation = O-C
Routine Violation = O-D
Exceptional Violation = O-C

Why forbidden:

SERA requires evidence of conscious deviation and the goal/context of that deviation. A report label alone is insufficient.

⸻

7. HFACS Preconditions vs SERA preconditions

HFACS Preconditions are highly useful for SERA, but they still require evidence.

Recommended use:

Use HFACS precondition categories as evidence prompts.
Do not use them as automatic outputs.

7.1 Environmental Factors

Relevant SERA evidence families:

weather
darkness
DVE
brownout/whiteout
restricted visibility
low contrast
black-hole approach
poor cultural lighting
glare
terrain/obstacle environment

SERA use:

preconditions_trace
factual extraction
confidence/limitation notes

Potential caution:

Environmental factors may shape perception, but they do not automatically mean P-axis failure. The actor may have perceived the hazard and still selected an unsafe objective or action.

⸻

7.2 Technological Environment

Relevant SERA evidence families:

automation mode confusion
autopilot/flight director behavior
warning-system design
instrument display ambiguity
control/switch design
EGPWS/TAWS presentation
FMS/GPS interface
sensor feedback limitations

SERA use:

preconditions_trace
technology_context
automation_evidence

Potential caution:

Automation context may support P, O or A analysis depending on whether the actor misunderstood the state, pursued an incompatible goal, or executed an incorrect action.

⸻

7.3 Cognitive Factors

Relevant SERA evidence families:

inattention
channelized attention
task saturation
confusion
distraction
negative transfer
geographic misorientation
checklist interference

SERA use:

preconditions_trace
perception_statement support
action_statement support
limitations

Potential caution:

Cognitive factors often explain why an unsafe act occurred, but they do not necessarily define the active failure code.

⸻

7.4 Perceptual Factors

Relevant SERA evidence families:

visual illusion
vestibular illusion
spatial disorientation
misread instrument
expectancy
misperception of operational conditions
temporal distortion
visual adaptation

SERA use:

P-axis evidence prompt
preconditions_trace
confidence assessment

Potential caution:

A perceptual factor must be connected to the direct actor’s unsafe act or condition.

⸻

7.5 Personnel / Crew Coordination Factors

Relevant SERA evidence families:

cross-monitoring breakdown
weak challenge-and-response
authority gradient
communication of critical information
task delegation
mission briefing
mission re-planning
miscommunication
crew/team leadership

SERA use:

preconditions_trace
multi-actor handling
recommendations

Potential caution:

Crew coordination may be a precondition for a direct actor’s unsafe act, or it may reveal multiple active failures. The analyst must decide whether the case is single-actor or multi-actor.

⸻

8. HFACS Supervision vs SERA context

HFACS Supervision is normally not the direct SERA active failure, unless the supervisor is the direct actor in the event.

Relevant evidence families:

inadequate supervision
planned inappropriate operations
failure to correct known problem
supervisory violations
crew pairing
limited recent experience
limited total experience
proficiency
formal risk assessment failure
lack of feedback
policy issues

SERA use:

preconditions_trace
organizational_context
risk_profile
recommendations

Forbidden use:

Use supervision label to override direct actor analysis.

Important distinction:

A supervisory failure may explain why an unsafe operational context existed. It does not automatically classify the pilot’s P/O/A.

⸻

9. HFACS Organizational Influences vs HFA/SERA

Organizational Influences are important for HFA/SERA, but usually belong to:

preconditions
organizational context
risk profile
recommendations
safety assurance
future risk layer

Relevant evidence families:

resource management
organizational climate
organizational process
training programs
procedural guidance
program oversight
operations tempo
workload
risk assessment program
informational support
financial support
personnel resources

Forbidden use:

Organizational Influences = P/O/A code

Allowed use:

Identify latent conditions.
Explain systemic contributors.
Support risk profile aggregation.
Generate organizational recommendations.

⸻

10. Direction of inference

The allowed inference direction is:

facts → SERA questions → SERA hypothesis → optional HFACS comparison

The forbidden direction is:

HFACS label → SERA code

Also forbidden:

report conclusion → SERA expected value

⸻

11. Crosswalk examples

11.1 Example: black-hole or DVE approach

HFACS may identify:

Physical Environment
Perceptual Error
Decision Error
CRM / Communication
Inadequate Supervision

SERA must still ask:

Did the actor misperceive altitude, closure, speed, attitude or visual references?
Was the goal to continue landing despite insufficient cues?
Was the action an unstable manual control input, delayed go-around, or continuation below safe profile?
Were the environmental factors preconditions rather than the active failure?

Possible result:

P-axis, O-axis or A-axis may be possible depending on factual evidence.

No automatic mapping allowed.

⸻

11.2 Example: checklist omission

HFACS may identify:

Checklist Error
Procedural Error
Checklist Interference
Task Saturation

SERA must still ask:

Was the actor aware of the required checklist item?
Was the omission inadvertent?
Was attention captured elsewhere?
Was the objective compatible with safe operation?
Was the wrong action executed despite correct perception/objective?

Possible result:

A-axis may be likely, but not automatic.

⸻

11.3 Example: violation

HFACS may identify:

Routine Violation
Exceptional Violation
Violation Based on Risk Assessment

SERA must still ask:

What rule/procedure/limit was known?
What evidence shows conscious deviation?
Was the deviation intended to protect the operation, achieve production, save time, or manage emergency?
Was the deviation normalized by organization?

Possible result:

Objective axis may be relevant.
Preconditions/organizational factors may be relevant.

No automatic O-code allowed.

⸻

11.4 Example: automation surprise

HFACS may identify:

Technological Environment
Automation
Confusion
Cognitive Task Oversaturation
Decision Error
Skill-Based Error

SERA must still ask:

Did the actor misunderstand automation mode/state?
Was the actor pursuing a safe but impossible/incompatible goal?
Was the action incorrect because of interface/control execution?
Did automation shape the context but not the active failure?

Possible result:

P, O or A may be plausible depending on evidence.

⸻

12. Suggested evidence tags

HFACS-derived tags may be used as non-decisional metadata.

Examples:

hfacs.act.skill_based
hfacs.act.decision
hfacs.act.perceptual
hfacs.act.violation
hfacs.precondition.environmental
hfacs.precondition.technological
hfacs.precondition.cognitive
hfacs.precondition.perceptual
hfacs.precondition.crew_coordination
hfacs.supervision.inadequate
hfacs.supervision.planned_inappropriate
hfacs.supervision.failure_to_correct
hfacs.organization.resource_management
hfacs.organization.climate
hfacs.organization.process

These tags must not change SERA classification unless a separate reviewed rule is implemented.

⸻

13. Recommended HFA/SERA fields

Future derived artifacts may include:

hfacs_reference_tags: []
hfacs_comparison_note: string
sera_classification_basis: string
preconditions_trace: []
organizational_context: []
source_status: HFACS_COMPARATIVE_SOURCE
limitations: []

These are documentation/reporting fields, not classification shortcuts.

⸻

14. Review requirements

Before using a HFACS-derived pattern in SERA implementation, require:

1. Identify the factual evidence.
2. Identify the SERA question answered.
3. Identify source status.
4. Confirm it does not create automatic HFACS → P/O/A conversion.
5. Confirm it preserves ambiguity.
6. Confirm it can be explained in decision_trace.
7. Validate with candidates before any engine change.

⸻

15. Status

This crosswalk is a documentation artifact.

It does not change the SERA engine.

It does not create fixtures.

It does not promote a baseline.

It does not approve any real-event expected value.

It defines safe use of HFACS/DoD HFACS in the HFA/SERA methodology.
