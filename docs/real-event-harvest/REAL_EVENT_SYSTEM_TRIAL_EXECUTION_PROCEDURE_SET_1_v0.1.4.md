# Real Event System Trial Execution Procedure — Set 1 v0.1.4
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-20 — Trial Execution Procedure and Evidence Capture  
Scope: operational procedure for executing first real-event HFA/SERA system trial and capturing evidence  
Non-scope: fixture creation, expected P/O/A assignment, candidate JSON creation, baseline promotion, engine changes, risk-layer redesign
---
## 1. Purpose
This document defines how to execute the first real-event HFA/SERA system trial.
The procedure exists to ensure that real-event validation is audit-friendly and methodologically defensible.
This document does not run the system.
This document does not create fixtures.
This document does not assign expected P/O/A.
This document does not alter SERA.
This document blocks A5 Risk Layer until trial outputs are captured and scored.
---
## 2. Trial inputs
Use only the neutral narratives from:
```text
docs/real-event-harvest/REAL_EVENT_SYSTEM_TRIAL_INPUTS_SET_1_v0.1.4.md
```
Trial set:

Trial ID    Event ID    Purpose
TRIAL-SET1-001    REAL-EVENT-0001    DVE / low-energy / monitoring / degraded warning barrier
TRIAL-SET1-002    REAL-EVENT-0002    ambiguous warning / go-around / planning / obstacle case
TRIAL-SET1-003    REAL-EVENT-0003    night approach energy/control P-A boundary
TRIAL-SET1-004    REAL-EVENT-0006    unsafe-condition-dominant automation/trim abnormal case
TRIAL-SET1-005    REAL-EVENT-0021    automation/mode-awareness P-A boundary

---
## 3. Execution modes

### 3.1 Manual controlled mode

Use this when UI flow is not yet automated.

Procedure:

1. Open HFA/SERA locally or in staging.
2. Create a new analysis/event.
3. Paste one neutral narrative exactly as written.
4. Run analysis.
5. Wait for completion.
6. Copy the full output.
7. Save the output into the results template.
8. Repeat for each trial.

Manual mode is acceptable only if every output is copied verbatim or summarized with traceable screenshots/notes.

### 3.2 Playwright-assisted mode

Use this when the UI flow is stable.

Allowed use:

record login/navigation/input/submit/copy-output flow
use generated locators as starting point
preserve screenshots or text artifacts
do not change production data unless test/staging is confirmed

Recommended command pattern:

npx playwright codegen http://localhost:3000

If using codegen, generated files must not be committed in this phase unless explicitly authorized.

### 3.3 API-assisted mode

Use only if the analysis API endpoint and auth flow are already known and safe.

Do not probe production APIs.

Do not write to production unless explicitly authorized.

Do not bypass tenant/auth logic.

---
## 4. Required evidence per trial

For each trial, capture:

trial_id
event_id
input narrative exact text
execution mode
execution date/time
environment: local / staging / production
model/provider if visible
analysis id if available
raw output
screenshot path if available
safe operation escape point produced
unsafe act produced
unsafe condition produced
direct actor produced
perception statement produced
objective statement produced
action statement produced
P/O/A output
preconditions produced
limitations produced
recommendations produced
notes about missing or malformed fields

---
## 5. Output capture location

Primary capture file:

docs/real-event-harvest/REAL_EVENT_SYSTEM_TRIAL_RESULTS_SET_1_v0.1.4.md

Do not overwrite neutral input narratives.

Do not edit factual harvest documents to fit system output.

If screenshots or raw output files are created, place them under a future explicitly approved evidence folder, for example:

docs/real-event-harvest/evidence/set-1/

Do not create this folder unless evidence files are actually being saved and commit scope is approved.

---
## 6. Scoring procedure

Score each trial using:

docs/real-event-harvest/REAL_EVENT_SERA_METHOD_ASSURANCE_PROTOCOL_v0.1.4.md

Scoring dimensions:

factual_grounding
safe_operation_escape_point
unsafe_act_condition_separation
direct_actor
poa_statements
poa_rationale
preconditions
limitations
recommendations
anti_shortcut_behavior

Score values:

Score    Meaning
0    Not addressed
1    Addressed but weak, generic or partially unsupported
2    Addressed with adequate factual support
3    Strong, precise and methodologically traceable

---
## 7. Minimum success criteria

The first trial set is acceptable only if:

at least 4/5 outputs are SYSTEM_ANALYSIS_ACCEPTABLE or SYSTEM_ANALYSIS_PARTIAL without unsafe shortcut
0/5 import report conclusions as expected values
0/5 force human error in unsafe-condition-dominant event
0/5 omit safe operation escape point entirely
0/5 ignore limitations

---
## 8. Stop rules

Stop the trial and do not proceed to JSON candidates if:

* the system output omits safe operation escape point repeatedly;
* unsafe act and unsafe condition are collapsed repeatedly;
* P/O/A is selected without statements;
* the system forces human error in REAL-EVENT-0006;
* the system ignores limitations;
* recommendations are generic and disconnected from the causal chain;
* output format prevents audit;
* provider/model failure contaminates the run.

---
## 9. Trial execution order

Recommended order:

1. TRIAL-SET1-001 / REAL-EVENT-0001
2. TRIAL-SET1-003 / REAL-EVENT-0003
3. TRIAL-SET1-005 / REAL-EVENT-0021
4. TRIAL-SET1-002 / REAL-EVENT-0002
5. TRIAL-SET1-004 / REAL-EVENT-0006

Rationale:

Start with two strong P/A boundary cases,
then automation P/A boundary,
then ambiguous adversarial case,
then unsafe-condition-dominant refusal case.

---
## 10. Human reviewer instructions

For each output, the reviewer must ask:

Did the system reconstruct the event, or merely label it?
Did it identify a safe operation escape point?
Did it separate unsafe act from unsafe condition?
Did it identify the direct actor without overreach?
Did it produce perception/objective/action statements?
Did P/O/A follow from the statements?
Did it list limitations?
Did recommendations follow the causal chain?
Did it avoid shortcuts?

If the answer is no, record the failure mode.

Do not fix the motor during this phase.

Do not edit the input narrative to make the system succeed unless the narrative is factually unclear.

---
## 11. Result categories

Use one verdict per trial:

SYSTEM_ANALYSIS_ACCEPTABLE
SYSTEM_ANALYSIS_PARTIAL
SYSTEM_ANALYSIS_UNSAFE_SHORTCUT
SYSTEM_ANALYSIS_OVERCONFIDENT
SYSTEM_ANALYSIS_FORCES_HUMAN_ERROR
SYSTEM_ANALYSIS_REQUIRES_ENGINE_REVIEW
SOURCE_INSUFFICIENT_FOR_TRIAL

---
## 12. Next phase

After execution and capture:

A4+R-21 — Score First Real Event System Trial Outputs

Deliverable:

docs/real-event-harvest/REAL_EVENT_SYSTEM_TRIAL_SCORECARD_SET_1_v0.1.4.md

Only after scoring should any decision be made about:

candidate JSON readiness
engine review
prompt review
additional source extraction
A5 Risk Layer readiness

---
## 13. Final status

This procedure defines how to execute and capture trial outputs.

It does not create expected values.

It does not create JSON fixtures.

It does not alter SERA.

It does not alter the causal baseline.

A5 Risk Layer remains blocked until system trial outputs are captured and scored.
