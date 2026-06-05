# Human Applied SERA Reference Extract - A4R204-BIG

Phase: A4R204-BIG
Status: HUMAN_APPLIED_SERA_REFERENCE
Source mode: local user-provided DOCX extraction only
Methodology status: input record only

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

## 1. Source Intake

Source file provided by the author:

`/Users/filipedaumas/Downloads/2026-0001 TAX-FOR-GSO-018 Rev00 Investigação de ESO.docx`

Copied local input:

`docs/sera-vnext/reference-corpus-a4r204/human-applied-sera-inputs/HUMAN_APPLIED_SERA_2026_0001_TAX_FOR_GSO_018_REV00.docx`

Extraction support file:

`tmp/a4r204big-docx-extract.txt`

No external search, no download, no model-side source expansion, and no replacement of the user-provided report occurred in this phase.

## 2. Event Identity From The Human-Applied Report

- Event: procedimento de crank com tentativa inadvertida de acionamento de motor.
- Aircraft: PS-ARP / S-76C++.
- Event date in the report: 18/02/2026.
- Location in the report: Macae / hangar / SAO area.
- Operational context: compressor wash, crank, support to maintenance.
- Direct operator in the human-applied report: pilot in the cockpit.
- Supporting actors in the human-applied report: maintenance auxiliary, inspector, maintenance organization.
- Immediate consequence in the report: brief ignition / limited blade rotation / no stabilized start / no damage.

These factual identifiers are retained only in this human-applied reference extract. They are not copied into the controlled synthetic draft.

## 3. Required Three-Part Separation

### 3.1 Factual Evidence

The report describes a maintenance support context in which compressor wash required a crank-like operation from the cockpit while external maintenance activity was being coordinated. During execution, the pilot moved the cockpit control out of the stop condition, creating a brief ignition condition and limited rotor movement without a stabilized start and without damage.

The factual evidence also records that the originally planned maintenance team changed before the task, leaving reduced maintenance availability, less cross-supervision, and an operational adaptation in which the pilot supported a maintenance-specific task.

### 3.2 Original Report Analysis And Conclusions Quarantined

The report contains a human-applied SERA conclusion:

- O-A at the objective level.
- P-A at the perception level.
- A-A at the action level, with slip / deslize predominance.

This phase records those values as human-applied input only. The report conclusions, corrective actions, and any downstream safety-management material are quarantined from vNext final output.

### 3.3 SERA Candidate Hypothesis Recorded As Human Input

The human-applied hypothesis is useful because it keeps the human boundary near the operational act rather than at the later consequence. It is not a vNext baseline, fixture, product artifact, final P/O/A output, final escape point approval, or READY promotion.

## 4. Human SERA Intake Values

Human escape point text preserved as correct human input:

`Momento em que o piloto decide acionar o crank.`

Human unsafe-act text recorded in the report:

`Momento em que o piloto retira a manete da posicao stop.`

Human classification recorded:

- O-A: human recorded classification, not vNext final.
- P-A: human recorded classification, not vNext final.
- A-A: human recorded classification, not vNext final; slip / deslize predominance recorded as report analysis.

Control label:

`HUMAN_CLASSIFICATION_RECORDED_AS_INPUT_ONLY`

## 5. vNext Audit Mapping For This Input

This mapping is a non-final audit lens. It does not approve a final escape point and does not create final P/O/A.

- earliest_controllable_ref: decision / start of crank by the pilot in the compressor-wash support context.
- latest_controllable_ref: moving the lever from STOP / command incompatible with pure crank.
- first_departure_from_safe_operation: start / execution of crank by the pilot in that specific operational context.
- critical_unsafe_act: moving the lever out of STOP.
- consequence_quarantine: brief ignition, limited blade rotation, and risk to hangar / equipment / people.

## 6. Mandatory Escape-Point Correction

The human-applied escape point is preserved as methodologically acceptable:

`Momento em que o piloto decide acionar o crank.`

It must not be shifted to:

- degraded team composition;
- reduced maintenance team;
- lack of cross-supervision;
- pilot exposure to an infrequent maintenance task.

Those items are preconditions and context. They are not the human-applied escape point.

Control label:

`TEAM_REDUCTION_PRECONDITION_NOT_ESCAPE_POINT`

## 7. Preconditions Recorded From The Human-Applied Report

- Pilot exposure to an infrequent maintenance task.
- Originally planned maintenance team reduced before execution.
- Loss of cross-supervision and mutual verification.
- Operational adaptation in which the pilot supported a maintenance-specific task.
- Need for reporting / just-culture reinforcement, recorded only as report context and not as vNext downstream output.

The reduced team and degraded supervision explain vulnerability. They do not replace the direct operator, the unsafe act, or the escape-point window.

## 8. Non-Promotion Statement

This extract is a HUMAN_APPLIED_SERA_REFERENCE only. It is NOT_BASELINE, NOT_FIXTURE, NOT_PRODUCT, NOT_READY, NO_SELECTED_CODE, NO_RELEASED_CODE, NO_FINAL_CONCLUSION, NO_CLASSIFIED_OUTPUT, and NO_DOWNSTREAM.
