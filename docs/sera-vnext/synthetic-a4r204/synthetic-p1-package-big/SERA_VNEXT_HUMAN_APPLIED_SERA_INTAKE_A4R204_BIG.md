# SERA vNext Human Applied SERA Intake - A4R204-BIG

Phase: A4R204-BIG
Status: HUMAN_APPLIED_SERA_INTAKE_COMPLETE_NON_FINAL
Scope: intake and audit only

Required locks:
- HUMAN_APPLIED_SERA_REFERENCE
- NOT_BASELINE
- NOT_FIXTURE
- NOT_PRODUCT
- NOT_READY
- NO_SELECTED_CODE
- NO_RELEASED_CODE
- NO_FINAL_CONCLUSION
- NO_CLASSIFIED_OUTPUT
- NO_DOWNSTREAM
- HUMAN_CLASSIFICATION_RECORDED_AS_INPUT_ONLY

## 1. Objective

Register the new user-provided human-applied SERA case as an input to A4R204-BIG and use it to strengthen the Synthetic P1 design package without converting the case into a fixture, baseline, product behavior, final P/O/A, or approved final escape point.

## 2. Inputs Read

- User prompt A4R204-BIG v2 corrected.
- User-provided DOCX copied into `docs/sera-vnext/reference-corpus-a4r204/human-applied-sera-inputs/`.
- Local DOCX text extraction stored in `tmp/a4r204big-docx-extract.txt`.
- A4R203-BIG governance closure.
- A4R203-A Daumas calibration extraction.
- A4R202-D/R2/E/F predecessor materials.
- A4R198-A and A4R197-C/D synthetic gap design materials.

No external search, no download, no Opus, no Sonnet, no subagent, and no product/runtime access were used.

## 3. Intake Classification Boundary

The human-applied report records:

- O-A as human recorded classification, not vNext final.
- P-A as human recorded classification, not vNext final.
- A-A as human recorded classification, not vNext final, with slip / deslize predominance recorded as report analysis.

This package records those values under:

`HUMAN_CLASSIFICATION_RECORDED_AS_INPUT_ONLY`

They do not become selected, released, final, active, baseline, fixture, or product outputs.

## 4. Mandatory Escape-Point Preservation

The human-applied escape point is preserved as correct for this human reference:

`Momento em que o piloto decide acionar o crank.`

The A4R204-BIG audit treats this as an acceptable human-applied boundary because it is anchored before the downstream ignition / rotor-movement consequence and before any later safety-management interpretation.

The following are explicitly preserved as preconditions only:

- reduced maintenance team;
- degraded team composition;
- loss of cross-supervision;
- pilot exposure to an infrequent maintenance task;
- operational adaptation.

Control label:

`TEAM_REDUCTION_PRECONDITION_NOT_ESCAPE_POINT`

## 5. vNext Mapping For Audit Only

| Field | Non-final audit value |
|---|---|
| earliest_controllable_ref | decision / start of crank by the pilot in the compressor-wash support context |
| latest_controllable_ref | moving the lever from STOP / command incompatible with pure crank |
| first_departure_from_safe_operation | start / execution of crank by the pilot in that specific operational context |
| critical_unsafe_act | moving the lever out of STOP |
| consequence_quarantine | brief ignition, limited blade rotation, risk to hangar / equipment / people |

This table is not a final escape-point approval and not final P/O/A.

## 6. Methodological Value

The case is valuable for A4R204-BIG because it supplies a human-applied example in which:

- the consequence is salient but must remain quarantined;
- the direct operator remains the pilot, not the support actors;
- team reduction and cross-supervision loss are important but remain preconditions;
- action capture / slip is visible without turning report classification into vNext final output.

This directly supports GAP-004 consequence-as-cause design review and provides controlled actor-boundary context for later GAP-002 readiness.

## 7. Non-Promotion Controls

This intake does not:

- create final P/O/A;
- approve a final escape point;
- create a fixture;
- create a baseline;
- create product or API behavior;
- unlock downstream output;
- materialize synthetic output as real event evidence.

Status remains:

NOT_BASELINE, NOT_FIXTURE, NOT_PRODUCT, NOT_READY, NO_SELECTED_CODE, NO_RELEASED_CODE, NO_FINAL_CONCLUSION, NO_CLASSIFIED_OUTPUT, NO_DOWNSTREAM.
