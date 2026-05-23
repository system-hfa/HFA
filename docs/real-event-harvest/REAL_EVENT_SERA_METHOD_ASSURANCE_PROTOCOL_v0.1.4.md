# Real Event SERA Method Assurance Protocol v0.1.4
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-16 — Real Event Methodology Assurance Protocol  
Scope: validation protocol to verify whether real event analyses follow the SERA causal methodology  
Non-scope: fixture creation, expected P/O/A assignment, candidate JSON creation, baseline promotion, engine changes, risk-layer redesign
---
## 1. Purpose
This document defines how HFA/SERA real-event analyses must be validated before any risk-layer work begins.
The goal is to verify that the system can analyze real events according to the full SERA causal workflow, not merely assign P/O/A labels.
This protocol is required before:
- creating JSON candidates from real events;
- using real events as causal validation evidence;
- using real events in A5 Risk Layer design;
- trusting dashboards or risk-profile outputs derived from real events.
This document does not create fixtures.
This document does not assign expected P/O/A.
This document does not alter the SERA engine.
---
## 2. Protected SERA causal workflow
Every real-event analysis must be checked against this workflow:
```text
factual event narrative
→ safe operation escape point
→ unsafe act / unsafe condition
→ direct actor
→ perception / objective / action statements
→ P/O/A causal hypothesis
→ preconditions
→ limitations / unanswered questions
→ recommendations
→ human review
```
A result is not methodologically valid merely because it outputs P/O/A.
A result is valid only if the reasoning chain is traceable and evidence-supported.

---
## 3. Core validation principle

Real reports are factual sources.

They are not SERA answer keys.

Allowed:

report facts
→ SERA causal reconstruction

Forbidden:

report probable cause
→ SERA expected value

Forbidden:

HFACS label
→ SERA P/O/A code

Forbidden:

event severity
→ SERA classification

Forbidden:

technical failure
→ human active failure automatically

---
## 4. Assurance levels

Level    Meaning    Use
ASSURANCE_0_INDEXED    Event is only indexed.    No analysis validation.
ASSURANCE_1_FACTUAL_HARVEST    Facts extracted and conclusions quarantined.    Good for corpus building.
ASSURANCE_2_DEEP_EXTRACTION    Chronology, escape point and candidate SERA statements drafted.    Ready for review decision.
ASSURANCE_3_REVIEW_DECISION    Human-review-style decision exists.    May become Markdown candidate draft.
ASSURANCE_4_CANDIDATE_DRAFT_MD    Markdown candidate exists.    Ready for system analysis trial.
ASSURANCE_5_SYSTEM_ANALYSIS_TRIAL    HFA/SERA engine/UI/API analysis run and compared with candidate draft.    Evidence of system performance.
ASSURANCE_6_JSON_CANDIDATE_READY    Human approves conversion to JSON candidate.    Candidate-only validation allowed.
ASSURANCE_7_VALIDATED_REAL_EVENT_CANDIDATE    Candidate passes controlled runs and review.    May enter validation pack.

Current target is ASSURANCE_5, not risk layer.

---
## 5. Required validation checks for each system analysis

Each event analyzed by HFA/SERA must be scored across the following gates.

### 5.1 Factual grounding gate

Check    PASS condition    Failure mode
Uses event facts    Analysis references factual sequence, not report conclusions.    Imports probable cause or recommendation.
Preserves uncertainty    Missing data are acknowledged.    Invents actor intent or perception.
Avoids outcome bias    Classification not justified by severity alone.    Uses crash/near miss as classification proof.

### 5.2 Safe operation escape point gate

Check    PASS condition    Failure mode
Escape point identified    Operational deviation from safe functioning is explicit.    Vague "accident occurred" wording.
Escape point timing    Timing is neither too early nor too late.    Uses root cause or final outcome as escape point.
Recoverability    Escape point relates to loss of safe margin or controlled process.    Merely repeats damage or injury.

### 5.3 Unsafe act / unsafe condition gate

Check    PASS condition    Failure mode
Unsafe act stated    Observable action/non-action is identified if evidence supports it.    Overstates action when evidence is only condition.
Unsafe condition stated    Technical/environmental/organizational condition is preserved separately.    Collapses everything into crew error.
Dominance recognized    Unsafe-condition-dominant cases are allowed.    Forces P/O/A when no active failure is supported.

### 5.4 Direct actor gate

Check    PASS condition    Failure mode
Direct actor identified    PF/PM/pilot/crew/maintenance/system actor is specific when evidence supports it.    Generic "crew" when PF/PM is known.
Multi-actor preserved    Multi-actor ambiguity is explicitly marked.    Collapses flight crew, mission crew and organization into one actor.
Actor not invented    No actor attribution without evidence.    Assigns maintenance/operator/pilot role without factual support.

### 5.5 P/O/A statement gate

Check    PASS condition    Failure mode
Perception statement    States what was or was not perceived, with evidence quality.    "DVE = P" shortcut.
Objective statement    States operative goal without assuming unsafe intent.    "Continued approach = O" shortcut.
Action statement    States execution/control/procedure issue if distinguishable.    "Bad outcome = A" shortcut.
Axis rationale    P/O/A hypothesis follows the statements.    Code chosen before reasoning.

### 5.6 Preconditions gate

Check    PASS condition    Failure mode
Preconditions identified    DVE, workload, automation, SOP, maintenance, barrier issues captured.    Preconditions omitted.
Preconditions not substituted for active failure    They support context, not replace causal chain.    "Weather caused it" only.
Unsafe-condition dominant allowed    Technical/system cases can remain non-P/O/A.    Human error forced.

### 5.7 Limitations gate

Check    PASS condition    Failure mode
Missing data listed    Callouts, PF/PM, FDR/CVR, intent, system state gaps stated.    Analysis sounds overconfident.
Source limits acknowledged    Preliminary/interim/secondary sources marked.    Treats partial source as final.
Review need stated    Human review remains explicit.    Promotes expected value prematurely.

### 5.8 Recommendations gate

Check    PASS condition    Failure mode
Recommendations derive from chain    Recommendations follow facts → failure mode → precondition.    Generic training recommendation.
Barrier recommendations preserved    Technical/barrier cases produce barrier recommendations.    Converts all into crew training.
Scope matches confidence    Low-confidence cases produce review/data recommendations.    Overprescribes actions.

---
## 6. Anti-shortcut library

The system analysis must explicitly avoid the following shortcuts:

Shortcut    Required handling
DVE = P automatically    Require evidence of non-perception or monitoring failure.
Night approach = P automatically    Require evidence of cue/perception issue.
Go-around issue = A automatically    Separate planning, objective, perception and flown trajectory.
Poor planning = O automatically    Decide whether planning is precondition or operative objective.
Warning not perceived = P automatically    Check whether warning was available, audible, expected and registered.
Technical failure = crew error    Allow unsafe-condition-dominant classification.
Checklist mentioned = checklist error    Require evidence of omission/misexecution.
Fatality/severity = classification proof    Severity belongs to risk layer, not causal axis.
Report finding = expected value    Use findings only as prompts for questions.
HFACS label = SERA output    HFACS may suggest questions, never answers.

---
## 7. System analysis trial requirements

For each event selected for system trial, store:

event_id
source_version
input_narrative_used
analysis_date
model/provider if applicable
raw SERA output location
safe_operation_escape_point actual
unsafe_act actual
unsafe_condition actual
direct_actor actual
P/O/A actual
preconditions actual
limitations actual
recommendations actual
method_assurance_score
reviewer verdict

The input narrative must be factual and neutral.

It must exclude:

probable cause
findings
recommendations
HFACS labels
NTSB/TSB/AAIB causal conclusion wording where avoidable

---
## 8. Scoring rubric

Each event analysis receives scores:

Score    Meaning
0    Not addressed.
1    Addressed but weak, generic or partially unsupported.
2    Addressed with adequate factual support.
3    Strong, precise and methodologically traceable.

Minimum thresholds for candidate-quality system analysis:

factual_grounding >= 2
escape_point >= 2
unsafe_act_condition >= 2
direct_actor >= 2 or explicitly insufficient
POA_statements >= 2
preconditions >= 2
limitations >= 2
recommendations >= 2
anti_shortcut_score >= 2

If a case is unsafe-condition dominant, P/O/A may be explicitly insufficient rather than forced.

---
## 9. Outcome categories

Category    Meaning
SYSTEM_ANALYSIS_ACCEPTABLE    System follows SERA chain with adequate evidence.
SYSTEM_ANALYSIS_PARTIAL    Useful but has one or more methodological weaknesses.
SYSTEM_ANALYSIS_UNSAFE_SHORTCUT    Uses shortcut or imports conclusions.
SYSTEM_ANALYSIS_OVERCONFIDENT    Fails to acknowledge uncertainty.
SYSTEM_ANALYSIS_FORCES_HUMAN_ERROR    Forces P/O/A when unsafe condition dominates.
SYSTEM_ANALYSIS_REQUIRES_ENGINE_REVIEW    Repeated pattern suggests engine/prompt issue.
SOURCE_INSUFFICIENT_FOR_TRIAL    Source/narrative inadequate.

---
## 10. Stop rules before JSON candidates

Do not create JSON candidates if:

* factual input is contaminated by report conclusions;
* safe operation escape point is not explicit;
* unsafe act and unsafe condition are collapsed;
* direct actor is invented;
* P/O/A is chosen by shortcut;
* limitations are omitted;
* unsafe-condition-dominant case is forced into human error;
* system output cannot be reviewed against evidence.

---
## 11. Final status

This protocol defines methodology assurance only.

It does not create expected values.

It does not create JSON fixtures.

It does not alter SERA.

It does not alter the causal baseline.

It blocks A5 Risk Layer until real-event causal assurance is demonstrated.
