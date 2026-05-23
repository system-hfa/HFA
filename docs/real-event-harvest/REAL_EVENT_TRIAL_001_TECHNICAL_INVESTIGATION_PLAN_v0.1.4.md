# Real Event Trial 001 — Technical Investigation Plan v0.1.4
Status: INVESTIGATION_PLAN  
Phase: A4+R-22 — Technical Investigation Plan for Trial 001 Failure  
Scope: technical investigation plan for methodological failure observed in first real-event system trial  
Non-scope: engine correction, fixture creation, expected P/O/A assignment, candidate JSON creation, baseline promotion, risk-layer redesign
---
## 1. Purpose
This document defines a safe technical investigation plan for the first real-event system trial failure.
Trial:
```text
TRIAL-SET1-001
REAL-EVENT-0001 — S-92A Thebaud
```
The previous phase recorded the trial result as:
```text
SYSTEM_ANALYSIS_UNSAFE_SHORTCUT
SYSTEM_ANALYSIS_REQUIRES_ENGINE_REVIEW
```
This document does not fix the engine.
This document does not alter the SERA causal baseline.
This document does not authorize JSON candidates.
This document does not authorize A5 Risk Layer.

---
## 2. Failure summary

Observed failure modes:

ID    Failure    Severity
F-001    P-A described as perception failure in final conclusion    BLOCKING
F-002    O-A described as inadequate objective in final conclusion    BLOCKING
F-003    A-D selected without evidence of physical/motor/ergonomic limitation    BLOCKING
F-004    Final narrative contradicts selected SERA codes    BLOCKING
F-005    Preconditions list differs from conclusion text    MAJOR
F-006    HFACS mapping contaminated by unsupported A-D    MAJOR
F-007    Escape point too decision-centered and unsafe operational state under-specified    MAJOR

---
## 3. Investigation questions

The technical investigation must answer:

Q1: Where was A-D selected?
Q2: Which evidence string triggered A-D?
Q3: Did "warning system", "equipment" or "engine torque" trigger physical/equipment inability incorrectly?
Q4: Are A-D anti-gates missing for aircraft-system/barrier cases?
Q5: Is the final conclusion generated from selected codes or from loose narrative inference?
Q6: Why did conclusion text reinterpret P-A/O-A as failures?
Q7: Why did conclusion mention W3 when the identified preconditions were P1, W1, W2, O2, O4?
Q8: Does HFACS mapping verify code-evidence consistency before rendering?
Q9: Should HFACS be suppressed when the causal analysis fails assurance?
Q10: Should ERC/risk display be suppressed or caveated when causal analysis has blocking contradictions?

---
## 4. Files likely involved

The investigation may inspect, but must not modify in this phase:

frontend/src/lib/sera/all-steps.ts
frontend/src/lib/sera/pipeline.ts
frontend/src/lib/sera/types.ts
frontend/src/lib/sera/hfacs.ts or equivalent mapping file if present
frontend/src/app/(dashboard)/events/[id]/page.tsx
frontend/src/app/api/analyze/route.ts

If file names differ, document the actual file names found.

---
## 5. Read-only investigation tasks

### 5.1 Locate A-D selection logic

Search for:

A-D
Inabilidade
physical
ergonomic
equipment
EPI
força
alcance
limitação

Determine:

which function selects A-D
which regex/heuristic/LLM output supports A-D
which anti-gates exist
whether equipment/barrier wording can falsely trigger A-D

### 5.2 Locate final conclusion generation

Search for conclusion generation code.

Determine:

whether final conclusion uses code labels correctly
whether P-A/O-A are treated as failure codes generically
whether conclusion template says "falhas ativas identificadas foram" for all codes including A codes
whether code descriptions are mapped correctly
whether conclusion is LLM-generated or template-generated

### 5.3 Locate preconditions rendering

Determine:

where deterministic preconditions are stored
where conclusion reads preconditions
why W3 can be mentioned without being listed
whether conclusion uses independent LLM inference instead of normalized preconditions_trace

### 5.4 Locate HFACS mapping

Determine:

whether HFACS mapping checks causal confidence
whether HFACS mapping relies only on final action code
whether unsupported A-D can automatically produce physical limitation mapping
whether HFACS should be blocked when active failure code is unsupported

### 5.5 Locate risk/ERC rendering dependency

Determine:

whether ERC is displayed even if causal analysis fails assurance
whether the UI has a warning/caveat when P/O/A contradictions exist
whether risk layer should be hidden/suppressed until causal output passes consistency checks

---
## 6. Required diagnostics output

The investigation report must provide:

file path
function / section name
line range if available
observed logic
suspected failure mechanism
evidence from code
whether correction is likely needed
risk of changing it
recommended validation scope

---
## 7. Hypotheses to test

### H1 — A-D false positive from equipment wording

The neutral input said:

warning system did not generate an alert in the relevant configuration/envelope
engine torque increased significantly

Possible failure:

equipment / system / engine wording was interpreted as "equipment prevented execution", triggering A-D.

Expected investigation result:

If true, A-D gate needs anti-gate distinguishing aircraft system/barrier degradation from operator physical/equipment inability.

### H2 — Final conclusion treats all P/O/A codes as failures

Possible failure:

conclusion generator uses generic phrase "falhas ativas identificadas" and then describes P-A/O-A as if they were failure codes.

Expected investigation result:

If true, conclusion generator must use code-aware semantics and avoid calling P-A/O-A failures.

### H3 — Conclusion uses loose LLM inference independent of normalized codes

Possible failure:

final conclusion is generated from narrative context and not constrained by selected codes and preconditions_trace.

Expected investigation result:

If true, conclusion must be grounded in normalized final code semantics and explicit trace fields.

### H4 — Preconditions conclusion independent from deterministic trace

Possible failure:

conclusion text inferred W3 separately while normalized trace had P1/W1/W2/O2/O4.

Expected investigation result:

If true, final report must render preconditions from normalized preconditions_trace, not independent inference.

### H5 — Downstream modules lack consistency guards

Possible failure:

HFACS and ERC render even when upstream causal output has blocking contradictions.

Expected investigation result:

If true, downstream modules need consistency gate or warning state.

### H6 — Escape point defaults to decision rather than operational state

Possible failure:

The engine defaults to anchoring the escape point at a crew decision (proceeded with visual approach) rather than at the operational state where safe margin was lost (low-airspeed, high-descent-rate, no warning, very-low-height recovery).

Decision may be a causal antecedent; the escape point must be the state where safe operation was no longer maintained.

Expected investigation result:

If true, escape point logic must distinguish decision antecedent from operational unsafe state and require explicit identification of the degraded flight/operational condition.

---
## 8. Do-not-fix rules for this phase

Do not modify:

frontend/src/lib/sera/*
tests/sera/fixtures/*
tests/reports/baseline/*
frontend UI
API routes
migrations
schema

Do not run:

smoke global
candidate suite
trial 002–005
A5 Risk Layer work

Allowed only:

read files
grep/search
document findings
create this investigation plan

---
## 9. Next phase after this plan

Recommended next phase:

A4+R-23 — Trial 001 Technical Investigation Report

Deliverable:

docs/real-event-harvest/REAL_EVENT_TRIAL_001_TECHNICAL_INVESTIGATION_REPORT_v0.1.4.md

That report should be read-only and must not implement a fix.

Possible later phase:

A4+R-24 — Trial 001 Guardrail Patch

Only after the investigation report identifies the precise failure points.

---
## 10. Validation scope for any future patch

Any future patch must validate at minimum:

Trial 001 rerun
official causal baseline remains unchanged
A-D legitimate fixtures still pass
P-A/O-A semantic rendering fixed
preconditions conclusion matches trace
HFACS not rendered from unsupported code
no JSON candidates created
no A5 Risk Layer work

---
## 11. Final status

This document defines a technical investigation plan only.

It does not implement fixes.

It does not alter SERA.

It does not alter the causal baseline.

It keeps real-event trials 002–005 blocked.

It keeps A5 Risk Layer blocked.
