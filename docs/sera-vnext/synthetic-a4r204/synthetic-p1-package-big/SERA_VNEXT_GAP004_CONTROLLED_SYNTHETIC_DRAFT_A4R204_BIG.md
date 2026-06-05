# SERA vNext GAP-004 Controlled Synthetic Draft - A4R204-BIG

Phase: A4R204-BIG
Gap: GAP-004 consequence-as-cause
Status: CONTROLLED_SYNTHETIC_DRAFT_ONLY

Required locks:
- CONTROLLED_SYNTHETIC_DRAFT_ONLY
- NOT_REAL_EVENT
- NOT_FIXTURE
- NOT_BASELINE
- NOT_PRODUCT
- NOT_READY
- NO_SELECTED_CODE
- NO_RELEASED_CODE
- NO_FINAL_CONCLUSION
- NO_CLASSIFIED_OUTPUT
- NO_DOWNSTREAM

## 1. Fictional Scenario Label

`SYNTHETIC_DRY_ROTATION_MODE_TRAP`

This is a fictional design artifact. It is not a real event, not a report, not a candidate fixture, not a baseline, not product behavior, and not a final classification.

## 2. Synthetic Narrative

A generic training airframe is positioned in a closed maintenance bay for a dry systems rotation check. The task requires a cockpit operator to keep the sequence in dry-rotation mode while an external technician handles equipment setup beside the airframe.

The cockpit operator intends to support the check and begins the dry-rotation sequence. During execution, the operator moves a guarded enable control from SAFE to ENABLE even though the setup required dry mode only. A short surge, equipment movement, and a startled response from the external technician occur immediately afterward. The equipment is secured and the sequence stops before damage.

## 3. Boundary Fields For Design Only

| Field | Controlled draft value |
|---|---|
| direct fictional operator | cockpit operator |
| supporting fictional actor | external technician |
| operational context | dry systems rotation check |
| earliest controllable reference | operator begins the dry-rotation sequence in the support context |
| latest controllable reference | guarded enable control moved from SAFE to ENABLE |
| first departure from safe operation | dry-mode sequence is executed in a way that enables powered response |
| critical unsafe act for design | guarded enable control moved out of SAFE |
| consequence quarantine | short surge, equipment movement, startled technician response |

These fields are design-only. They do not approve a final escape point and do not create final P/O/A.

## 4. Consequence-As-Cause Trap

The synthetic draft intentionally includes a visible downstream distractor: short surge, equipment movement, and a startled response.

The trap is invalid if the analyst chooses the cause because the consequence looks more dramatic than the earlier operator boundary. The correct design behavior is to keep the consequence quarantined and evaluate the pre-outcome act window only in a future authorized review.

## 5. Actor-Migration Guard

The external technician is relevant context and possible monitor/support actor. The direct fictional operator at the boundary remains the cockpit operator unless a future authorized review provides explicit evidence to the contrary.

This draft does not materialize GAP-002. It only prepares the actor boundary for later design readiness.

## 6. Explicit Non-Outputs

This controlled synthetic draft creates no:

- final P/O/A;
- final escape point approval;
- fixture;
- baseline;
- product behavior;
- selected or released active output;
- final active output;
- CLASSIFIED active output;
- downstream release behavior.

The only valid status is CONTROLLED_SYNTHETIC_DRAFT_ONLY.
