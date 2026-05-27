# P/O/A Pilot Uncertainty and Holds A4R165 v0.2.0

Status: DRAFT_UNCERTAINTY_REGISTER
Phase: A4R165

## UNRESOLVED Axis Register

| eventId | axis | unresolvedReason | guardrailLink | requiredNextCheck |
|---|---|---|---|---|
| COLGAN-3407 | Perception | Cue availability is factual but direct at-gate cognitive-state closure is not sufficiently constrained without post-gate leakage. | POST_ESCAPE_EVIDENCE_LEAKAGE; INSUFFICIENT_EVIDENCE_SHOULD_REMAIN_UNRESOLVED | Author review focused on pre-shaker interval anchors only |
| HELIOS-522 | Perception | Interval-case evidence does not safely close recognition state before capability boundary. | POST_ESCAPE_EVIDENCE_LEAKAGE; AXIS_OVERCLASSIFICATION | Focused interval review with capability-boundary guard |
| HELIOS-522 | Objective | Objective attribution becomes unstable under interval degradation/capability uncertainty. | INSUFFICIENT_EVIDENCE_SHOULD_REMAIN_UNRESOLVED; ORGANIZATIONAL_CONTEXT_AS_LINE_OBJECTIVE | Confirm line-level objective evidence inside admissible window |

## HOLD Register

| eventId | holdType | reason | unblockCondition |
|---|---|---|---|
| HELIOS-522 | METHODOLOGICAL_HOLD_INTERVAL_CAPABILITY_BOUNDARY | Interval onset and capability boundary are factually rich but not axis-closure safe for full P/O/A draft closure. | Focused author confirmation on interval-boundary handling with no post-gate inference |

## Negative Control Check

- US-AIRWAYS-1549 remained technical/environmental at onset.
- No forced human-origin axis was introduced.

## Scope Safety Check

- Draft mode preserved.
- No release scope opened.
- No downstream opened.
