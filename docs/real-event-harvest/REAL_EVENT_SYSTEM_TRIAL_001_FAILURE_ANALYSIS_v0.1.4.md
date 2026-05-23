# Real Event System Trial 001 — Methodological Failure Analysis v0.1.4
Status: FAILURE_REVIEW  
Phase: A4+R-21 — Trial 001 Methodological Failure Analysis  
Scope: formal analysis of the first real-event HFA/SERA system trial failure  
Non-scope: engine correction, fixture creation, expected P/O/A assignment, candidate JSON creation, baseline promotion, risk-layer redesign
---
## 1. Purpose
This document records the methodological failure observed in the first real-event HFA/SERA system trial.
Trial:
```text
TRIAL-SET1-001
REAL-EVENT-0001 — S-92A Thebaud
```
The purpose is to prevent progression to additional trials, JSON candidates or A5 Risk Layer before this failure mode is understood.
This document does not alter the SERA engine.
This document does not create fixtures.
This document does not assign expected P/O/A.
This document does not promote baseline.

---
## 2. Trial status

Trial    Event    Status    Decision
TRIAL-SET1-001    REAL-EVENT-0001 — Thebaud    FAILED    SYSTEM_ANALYSIS_UNSAFE_SHORTCUT / SYSTEM_ANALYSIS_REQUIRES_ENGINE_REVIEW
TRIAL-SET1-002    REAL-EVENT-0002 — Peasmarsh    NOT_RUN    Blocked until Trial 001 failure is understood
TRIAL-SET1-003    REAL-EVENT-0003 — Tofino    NOT_RUN    Blocked until Trial 001 failure is understood
TRIAL-SET1-004    REAL-EVENT-0006 — 5N-BQJ    NOT_RUN    Blocked until Trial 001 failure is understood
TRIAL-SET1-005    REAL-EVENT-0021 — N8DX    NOT_RUN    Blocked until Trial 001 failure is understood

---
## 3. Input narrative used

The input was the neutral narrative for TRIAL-SET1-001 from:

docs/real-event-harvest/REAL_EVENT_SYSTEM_TRIAL_INPUTS_SET_1_v0.1.4.md

The narrative described:

* Sikorsky S-92A offshore transport to Thebaud Central Facility;
* two unsuccessful instrument approaches due to low cloud and poor visibility;
* visual contact obtained during second missed approach;
* visual approach initiated;
* high rate of descent and low airspeed developed;
* recovery at very low height above water;
* warning system did not alert in relevant configuration/envelope;
* PF/PM split, callouts, timing of recognition and exact control inputs not fully established.

---
## 4. Summary of actual system output

The system produced:

Perception: P-A — Nenhuma Falha de Percepção
Objective: O-A — Nenhuma Falha de Objetivo
Action: A-D — Inabilidade para a Resposta
ERC: 1 / Aceitável

The system also produced:

* safe operation escape point framed mainly as the crew choosing a visual approach in adverse weather;
* unsafe act framed as proceeding with visual approach after two missed instrument approaches;
* deterministic gate for A-D based on physical/ergonomic inability;
* conclusion text describing "percepção inadequada da situação (P-A)";
* conclusion text describing "objetivo inadequado ao prosseguir visualmente (O-A)";
* conclusion text describing "seleção do procedimento errado (A-D)";
* preconditions listed as P1, W1, W2, O2, O4;
* conclusion text naming W3 as the main precondition;
* HFACS mapping from A-D to skill-based error / physical or mental limitation.

---
## 5. Methodological failure findings

### 5.1 P-A semantic contradiction

The system output identified:

P-A — Nenhuma Falha de Percepção

But the conclusion text stated:

percepção inadequada da situação (P-A)

This is a semantic contradiction.

P-A cannot be described as a perception failure.

Failure category:

CODE_SEMANTICS_CONTRADICTION

Severity:

BLOCKING

---
### 5.2 O-A semantic contradiction

The system output identified:

O-A — Nenhuma Falha de Objetivo

But the conclusion text stated:

objetivo inadequado ao prosseguir visualmente (O-A)

This is a semantic contradiction.

O-A cannot be described as an inadequate objective.

Failure category:

CODE_SEMANTICS_CONTRADICTION

Severity:

BLOCKING

---
### 5.3 A-D unsupported by evidence

The system output identified:

A-D — Inabilidade para a Resposta

The gate rationale stated:

limitação física, motora, ergonômica, EPI, força, alcance ou equipamento impediu a execução

The neutral input did not contain evidence of:

* physical inability;
* motor limitation;
* ergonomic limitation;
* PPE/EPI restriction;
* strength limitation;
* reach limitation;
* body/equipment access limitation preventing execution.

Therefore A-D is unsupported.

Failure category:

UNSUPPORTED_ACTION_CODE
DETERMINISTIC_GATE_FALSE_POSITIVE

Severity:

BLOCKING

---
### 5.4 Conclusion does not respect selected codes

The conclusion interpreted the codes as if they meant:

P-A = perception failure
O-A = objective failure
A-D = wrong procedure selection

But the selected codes actually mean:

P-A = no perception failure
O-A = no objective failure
A-D = physical/ergonomic inability for response

Failure category:

FINAL_NARRATIVE_CODE_MISMATCH

Severity:

BLOCKING

---
### 5.5 Preconditions inconsistency

The system listed:

P1
W1
W2
O2
O4

But the conclusion stated that the main precondition was:

W3

W3 was not listed in the identified preconditions.

Failure category:

PRECONDITION_TRACE_MISMATCH

Severity:

MAJOR

---
### 5.6 HFACS contamination

The HFACS mapping was derived from A-D.

Because A-D was unsupported, the HFACS mapping became contaminated:

A-D → skill-based error / physical or mental limitation

Failure category:

DOWNSTREAM_MAPPING_CONTAMINATION

Severity:

MAJOR

---
### 5.7 Escape point framing weakness

The system framed the escape point mainly as:

crew proceeded with visual approach after two unsuccessful instrument approaches

This may be relevant, but it is too decision-centered and under-specifies the operational unsafe state.

Preferred operational framing:

The operation left safe functioning when, after transition to visual approach, the helicopter entered a low-airspeed/high-rate-of-descent state that was not detected, alerted or corrected before very-low-height recovery.

Failure category:

ESCAPE_POINT_TOO_DECISION_CENTERED
OPERATIONAL_UNSAFE_STATE_UNDER_SPECIFIED

Severity:

MAJOR

---
## 6. Assurance score

Dimension    Score    Finding
factual_grounding    2    Main event facts were recognized.
safe_operation_escape_point    1    Present but too decision-centered and not anchored enough to unsafe state.
unsafe_act_condition_separation    1    Unsafe act partially captured; unsafe condition/barrier context not integrated correctly.
direct_actor    2    "Crew" acceptable at this level because PF/PM unknown.
poa_statements    0    No reliable P/O/A statements; codes contradict narrative.
poa_rationale    0    P-A/O-A/A-D do not follow from evidence; A-D unsupported.
preconditions    1    Preconditions listed but inconsistent with conclusion.
limitations    1    Missing data from input not sufficiently preserved.
recommendations    1    Some recommendations useful, but derived from wrong codes.
anti_shortcut_behavior    0    Unsafe shortcuts and gate false positive observed.

Aggregate:

Total score: 9 / 30
Verdict: SYSTEM_ANALYSIS_UNSAFE_SHORTCUT
Secondary verdict: SYSTEM_ANALYSIS_REQUIRES_ENGINE_REVIEW

---
## 7. Blocking implications

Do not proceed to:

* TRIAL-SET1-002;
* TRIAL-SET1-003;
* TRIAL-SET1-004;
* TRIAL-SET1-005;
* JSON candidates;
* candidate baseline;
* A5 Risk Layer.

Until this failure is addressed, real-event system assurance is not demonstrated.

---
## 8. Required technical investigation

Open a technical investigation phase focused on:

why A-D was selected
why A-D anti-gates did not reject this case
why the final conclusion reinterpreted P-A and O-A as failures
why conclusion/preconditions mention W3 when identified preconditions did not include W3
why HFACS mapping runs without checking code-evidence consistency
whether risk/ERC output should be suppressed when causal analysis fails assurance

---
## 9. Recommended next phase

Recommended next phase:

A4+R-22 — Technical Investigation Plan for Trial 001 Failure

Purpose:

Design a safe, narrow technical debugging phase before any code change.

Possible later phase, only after investigation plan:

A4+R-23 — Implement Trial 001 Guardrails

But no implementation should occur until the technical investigation identifies the exact source of the failure.

---
## 10. Final status

This document records a real system-trial failure.

It does not fix the system.

It does not create expected values.

It does not create JSON fixtures.

It does not alter SERA.

It does not alter the causal baseline.

It blocks further real-event trials and A5 Risk Layer until the failure is investigated.
