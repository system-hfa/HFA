# SERA vNext Human Applied SERA Audit - A4R204-BIG

Phase: A4R204-BIG
Status: HUMAN_APPLIED_REFERENCE_AUDIT_COMPLETE_NON_FINAL

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

## 1. Audit Question

Can the human-applied SERA report strengthen vNext synthetic P1 design while preserving the protected causal baseline and avoiding finalization?

Answer: yes, as a HUMAN_APPLIED_SERA_REFERENCE only.

## 2. Escape-Point Audit

| Audit item | Result |
|---|---|
| Human escape point preserved | `Momento em que o piloto decide acionar o crank.` |
| Methodological status | acceptable as human-applied reference input |
| Shift to team reduction | blocked |
| Shift to loss of cross-supervision | blocked |
| Shift to pilot exposure to infrequent maintenance task | blocked |
| Downstream ignition / rotor movement as cause | blocked |
| Final vNext escape point | not approved |

The human text "Momento em que o piloto decide acionar o crank" remains the correct human-applied escape point for this reference. The later lever movement is the sharper latest controllable reference / critical unsafe act for audit decomposition, not a reason to invalidate the human escape point.

## 3. Earliest / Latest / Consequence Separation

| vNext audit field | Non-final value | Why it matters |
|---|---|---|
| earliest_controllable_ref | decision / start of crank by pilot | keeps control before consequence |
| latest_controllable_ref | lever moved from STOP / incompatible command | defines the sharpest control boundary |
| first_departure_from_safe_operation | start / execution of crank by pilot in this context | preserves the human point of loss |
| critical_unsafe_act | moving lever out of STOP | separates act from later outcome |
| consequence_quarantine | brief ignition and limited blade movement | prevents consequence-as-cause |

No row approves a final escape point or final P/O/A.

## 4. Human Classification Treatment

The report records O-A, P-A, and A-A with slip / deslize predominance.

Treatment in this phase:

- O-A: human recorded classification, not vNext final.
- P-A: human recorded classification, not vNext final.
- A-A: human recorded classification, not vNext final.
- Slip / deslize: report analysis input only.

Control label:

`HUMAN_CLASSIFICATION_RECORDED_AS_INPUT_ONLY`

## 5. Precondition Boundary

The following stay as preconditions:

- reduced maintenance team;
- degraded team composition;
- loss of cross-supervision;
- operational adaptation;
- pilot exposure to an infrequent maintenance task.

Control label:

`TEAM_REDUCTION_PRECONDITION_NOT_ESCAPE_POINT`

These are important explanatory factors but not the direct operator, not the escape point, and not a replacement for the cockpit act.

## 6. GAP-004 Value

The human-applied case strongly supports GAP-004 because the most visible outcome signals are downstream: brief ignition, limited blade movement, and possible exposure to people/equipment. The audit requires those signals to remain consequence context, not cause selectors.

## 7. GAP-002 Value

The human-applied case is useful for GAP-002 readiness because it separates:

- direct operator: pilot in cockpit;
- support actors: maintenance auxiliary, inspector, maintenance organization;
- preconditions: team reduction and lost cross-supervision.

This actor separation is value input only. GAP-002 is not materialized in A4R204-BIG.

## 8. Non-Promotion Result

The audit produces no final causal output. It preserves NOT_BASELINE, NOT_FIXTURE, NOT_PRODUCT, NOT_READY, NO_SELECTED_CODE, NO_RELEASED_CODE, NO_FINAL_CONCLUSION, NO_CLASSIFIED_OUTPUT, and NO_DOWNSTREAM.
