# SERA Engine vNext Release Criteria by Axis A4R81 v0.2.0

Status: DESIGN_ONLY  
Phase: A4+R-81 — Release Criteria Design for AI/Author Proposed Codes  
DOCS_ONLY  
NO_RELEASED_CODE_CREATED  
NO_DOWNSTREAM

## Objective
Define axis-specific documentary criteria for future release review of AI/Author proposed codes. This document does not release any code and does not alter any P/O/A decision in the 30-event corpus.

## P-Axis Criteria
Future P-axis release requires positive support for a perception mechanism rather than a bad outcome alone.

Minimum criteria:
- relevant information, cue, signal, display state, environmental cue, or communication item is identified;
- availability or perceptibility of that cue is addressed;
- questionPath answers are coherent with the proposed P code;
- weather, lighting, warning, barrier, or technical condition is separated from the human perception mechanism;
- evidenceRefs support the relevant critical questionPath answers;
- uncertainty is bounded and does not conceal a missing mechanism.

Observed-code refinements:
- `P-G`: release requires available information plus degraded monitoring, checking, or integration, without dominant excessive time pressure.
- `P-D`: release would require degraded attention/monitoring with dominant excessive time pressure; no A4+R-78 corpus case currently has a P-D draft.
- `P-C`: release requires available signal or mode/state cue interpreted incorrectly because of knowledge, perceptual understanding, or automation/mode-state comprehension.
- `P-F`: release requires a sustained ambiguous, distorted, or illusory perceptual field rather than mere low visibility.
- `P-H`: release requires incomplete, ambiguous, incorrect, delayed, or missing transmitted information, with communication/information chain more specific than generic monitoring.

P-axis release blockers:
- only bad outcome is shown;
- only weather or visibility is shown without a perception mechanism;
- only a warning exists without evidence of availability, uptake, interpretation, or response;
- only severity is used as rationale;
- PF/PM ambiguity blocks attribution of monitoring or communication role;
- source partial or source identity mismatch prevents cue-chain reconstruction.

## O-Axis Criteria
Future O-axis release requires evidence about the operational goal, not just absence of a better label.

Minimum criteria:
- the observable goal or intended operation is identified;
- available evidence does not support a stronger objective-failure code;
- questionPath distinguishes compatible objective, conscious rule deviation, routine deviation, exceptional deviation, and non-violation inadequate objective;
- evidenceRefs show why the proposed O code is supported and alternatives are not;
- `O-E = NON_EXISTENT_IN_SERA_PT_V1` is excluded from active release consideration.

Observed-code refinements:
- `O-A`: release requires a compatible operational goal and no positive evidence of inadequate objective, violation, routine deviation, or exceptional conscious deviation. It must not be used as fallback for unknown objective evidence.
- `O-B`: release requires evidence of routine, normalized, repeated, or culturally tolerated deviation. No A4+R-78 corpus case currently has an O-B draft.
- `O-C`: release requires evidence of conscious, exceptional or circumstantial deviation from a known rule, procedure, clearance, or operational constraint.
- `O-D`: release requires evidence of a less conservative efficiency, economy, continuation, or operational-gain objective without explicit rule violation proof.

O-axis release blockers:
- intention or consciousness is inferred only from outcome severity;
- target code is `O-E`;
- the relevant rule, procedure, clearance, or operational constraint is not identified for O-B/O-C;
- operational pressure is present but not linked to the objective;
- O-A is being used as a default because O-B/O-C/O-D evidence is missing rather than because a compatible objective is evidenced.

## A-Axis Criteria
Future A-axis release requires a specific action mechanism. The A-axis remains the most conservative axis in the 30-event corpus.

Minimum criteria:
- a specific human action, omission, input, instruction, selected path, or action sequence is identified;
- direct actor is sufficiently clear for the action mechanism;
- action implementation and appropriateness are addressed;
- feedback, verification, or checking is documented when relevant;
- PF/PM timeline is adequate where cockpit role separation matters;
- evidenceRefs support the action mechanism rather than importing report conclusions.

Observed-code refinements:
- `A-C`: release requires evidence that the actor executed an action and failed to verify the result of that actor's own action.
- `A-D`: release requires explicit physical, motor, ergonomic, or capability impairment.
- `A-F`: release requires wrong selection among known alternatives without dominant excessive time pressure.
- `A-H`, `A-I`, and `A-J`: release requires a sustained excessive time-pressure relationship to execution, selection, or feedback/communication.

A-axis release blockers:
- technical or condition-dominant event state is being converted into action fault;
- direct actor is not clear;
- PF/PM timeline is insufficient;
- no specific action is identified;
- feedback/checking is asserted but not documented;
- `A-A` is used as fallback for unknown action evidence;
- emergency response is treated as action failure before the technical condition and response window are bounded.

## Axis Independence Rule
Future release review may consider each axis independently. However, partial axis release must preserve unresolved axes as unresolved and must not imply finalConclusion, automatic selected-code classification, HFACS, Risk/ERC, ARMS/ERC, recommendations, fixtures, baselines, or product downstream output.
