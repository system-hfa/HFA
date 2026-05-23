# SERA Real Report Extraction Protocol v0.1.4

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-3 — Real Report Extraction Protocol  
Scope: neutral factual harvest from real accident/incident reports for future HFA/SERA validation  
Non-scope: fixture creation, expected-value assignment, engine changes, baseline promotion, risk-layer redesign

---

## 1. Purpose

This document defines how HFA/SERA should extract useful material from real accident and incident reports.

The purpose is to transform real reports into neutral factual material for later SERA analysis, without importing the original report's causal conclusions, HFACS labels, recommendations, or methodological assumptions as automatic SERA outputs.

Real reports are valuable because they contain:

```text
chronology
flight/operation phase
environmental conditions
crew actions
aircraft state
automation state
communications
recorded data
SOP context
barriers
organizational context
safety management context
```

However, they must not be treated as automatic SERA annotations.

---

## 2. Core principle

Use facts.

Separate conclusions.

Mark SERA annotations as hypotheses.

The allowed transformation is:

report factual content
→ neutral factual harvest
→ SERA candidate hypothesis
→ human review
→ possible candidate/index entry
→ future fixture only if approved

The forbidden transformation is:

report probable cause
→ SERA expected value

Also forbidden:

HFACS label
→ SERA P/O/A code

---

## 3. Three-layer extraction model

Every real report must be separated into three layers.

### 3.1 Layer 1 — Factual harvest

This layer contains only factual or directly evidenced information.

Examples:

aircraft type
operator
date/time
operation type
phase of operation
weather
visibility
lighting
terrain/obstacle context
automation state
altitude/speed/attitude data
crew role assignments
communications
checklist actions
SOP references
warnings/alerts
recorded flight data
maintenance state
barriers present
barriers degraded

### 3.2 Layer 2 — Original report analysis to quarantine

This layer preserves, but does not adopt, the source report's own analysis.

Examples:

probable cause
findings as to causes
contributing factors
HFACS labels
investigator judgement
recommendations
operator blame
regulatory criticism
safety action conclusions

These may be referenced for context but must not become SERA expected values.

### 3.3 Layer 3 — SERA candidate hypothesis

This layer is a new HFA/SERA interpretation.

It must always be marked as:

candidate hypothesis
review required
not fixture expected
not baseline evidence

---

## 4. Neutral factual sheet template

Each harvested event should use this template.

ID provisional:
Source file:
Source page/range:
Report authority/source:
Aircraft/system:
Operator/context:
Date/time:
Location:
Operation type:
Phase of operation:
Neutral factual summary:
Chronological sequence:
Operational environment:
Weather/visibility/lighting:
Aircraft/system state:
Automation state:
Crew roles:
Key actions observed:
Key communications:
Warnings/alerts:
SOP/procedure context:
Barriers present:
Barriers degraded or absent:
Organizational/contextual facts:
Recorded data available:
Injuries/damage/outcome:
Probable safe operation escape point:
Observable unsafe act:
Observable unsafe condition:
Direct actor candidate:
Information available to actor:
Missing or ambiguous data:
Multiple actors?:
Multiple unsafe acts/conditions?:
Original report content to quarantine:
- probable cause:
- contributing factors:
- HFACS/other classification:
- recommendations:
- judgement/conclusion language:
Potential SERA use:
- baseline candidate:
- validation candidate:
- adversarial case:
- insufficient evidence case:
- multi-actor case:
- preconditions catalog:
- risk-layer future use:
- reference only:
Confidence:
Bias risks:
Reviewer notes:

---

## 5. SERA candidate hypothesis template

Only after factual harvest should a SERA hypothesis be proposed.

SERA hypothesis status:
- DRAFT
- REVIEW_REQUIRED
- NOT_EXPECTED_VALUE
safe_operation_escape_point:
unsafe_act_statement:
unsafe_condition_statement:
direct_actor:
actor_level:
perception_statement:
goal_or_objective_statement:
action_statement:
P candidate:
O candidate:
A candidate:
preconditions candidates:
evidence supporting P:
evidence supporting O:
evidence supporting A:
evidence supporting preconditions:
limitations:
unanswered questions:
alternative interpretations:
confidence:
recommended use:

---

## 6. What counts as factual evidence

The following may usually be treated as factual evidence when clearly documented:

recorded flight data
cockpit voice transcript excerpts when included by the report
ATC communications
crew statements, marked as statements
weather observations
METAR/TAF/aftercast data
aircraft damage
maintenance records
FDR/CVR/EGPWS/TAWS data
checklist/procedure text
SOP excerpts
airport/helideck/landing site description
timeline reconstructed by investigators
photographs and diagrams

Crew recollections should be marked as recollection, not as objective fact.

Investigator interpretations should be quarantined unless they are purely factual reconstructions.

---

## 7. What must be quarantined

The following must not be used as automatic SERA outputs:

probable cause
findings as to cause
contributing factors
HFACS classification
operator safety recommendation
regulator safety recommendation
investigator judgement
blame-like wording
legal/liability language
risk ranking from another method
root cause labels

They may be stored in the quarantine section for context.

---

## 8. Bias controls

### 8.1 Hindsight bias

Do not assume the actor knew the final unsafe state simply because the report reconstructs it.

Ask:

What information was available to the actor at the time?
Was the unsafe state observable?
Was it actually perceived?
Was the cue ambiguous?

### 8.2 Outcome bias

Do not let severity of outcome determine P/O/A.

A near miss and a fatal accident may share the same causal pattern, or a severe accident may have ambiguous causal evidence.

### 8.3 Methodology import bias

Do not import:

HFACS labels
NTSB/TSB/AAIB causal phrasing
operator investigation labels
risk matrix results

as SERA outputs.

### 8.4 Overfitting bias

Do not change SERA logic to match one event.

Real events generate hypotheses and edge cases. They do not automatically rewrite methodology.

### 8.5 Single-actor bias

Do not force a multi-actor event into a single direct actor if evidence shows multiple active failures.

Use multi-actor handling when needed.

---

## 9. Confidence scale

Use this conservative confidence scale.

HIGH

Use when:

sequence is clear
direct actor is clear
unsafe act/condition is clear
actor information state is supported
P/O/A hypothesis has direct evidence
major ambiguity is low

MEDIUM

Use when:

sequence is mostly clear
direct actor is likely
unsafe act/condition is identifiable
some actor mental-state inference is required
alternative P/O/A interpretations exist

LOW

Use when:

facts are incomplete
actor information state is unclear
multiple plausible active failures exist
P/O/A depends heavily on inference
report is secondary or summarized

INSUFFICIENT

Use when:

unsafe act/condition cannot be separated
direct actor cannot be identified
chronology is too thin
source is mostly commentary
facts are not enough for SERA hypothesis

---

## 10. Multi-actor handling

If multiple actors contributed to the event, do not collapse them prematurely.

Use separate candidate blocks:

Actor A:
- unsafe act/condition:
- perception:
- objective:
- action:
- preconditions:
Actor B:
- unsafe act/condition:
- perception:
- objective:
- action:
- preconditions:

Then document:

primary direct actor candidate:
secondary active failure:
organizational/systemic contributors:
interaction between actors:

Multi-actor cases are useful for validation but should not become baseline fixtures until reviewed carefully.

---

## 11. Unsafe act vs unsafe condition handling

Real reports often mix unsafe acts and unsafe conditions.

Use:

unsafe act

when the relevant event is an observable action or omission by an actor.

Use:

unsafe condition

when the relevant event is a system, operational, environmental or organizational condition that made the operation unsafe.

Use both when necessary.

Examples:

unsafe act: continuing descent below safe profile without adequate visual reference
unsafe condition: night landing site with minimal lighting and no runway lights

Do not force one category when both are present.

---

## 12. Use as future candidates

A real event may become a candidate only after:

1. factual harvest completed
2. quarantined source conclusions separated
3. SERA hypothesis drafted
4. confidence assigned
5. ambiguity documented
6. human review completed
7. expected values explicitly approved

Before that, the event may only appear in:

real-event-index.md
evidence pattern catalog
preconditions evidence catalog
methodology notes

---

## 13. Event suitability categories

Assign one or more categories:

GOOD_BASELINE_CANDIDATE
VALIDATION_EXPANSION
ADVERSARIAL_CASE
INSUFFICIENT_EVIDENCE_CASE
MULTI_ACTOR_CASE
PRECONDITIONS_CATALOG_SOURCE
RISK_LAYER_FUTURE_SOURCE
REFERENCE_ONLY

GOOD_BASELINE_CANDIDATE

Clear facts, clear direct actor, clear SERA hypothesis, low ambiguity.

VALIDATION_EXPANSION

Useful for broader testing but not yet baseline-quality.

ADVERSARIAL_CASE

Useful because it challenges common misclassification.

INSUFFICIENT_EVIDENCE_CASE

Useful to test conservative refusal or uncertainty.

MULTI_ACTOR_CASE

Useful for future multi-actor handling.

PRECONDITIONS_CATALOG_SOURCE

Useful mainly for evidence pattern extraction.

RISK_LAYER_FUTURE_SOURCE

Useful mainly for A5 Risk Layer.

REFERENCE_ONLY

Too ambiguous or too secondary for candidate use, but still useful context.

---

## 14. Output artifacts from this protocol

This protocol supports later creation of:

tests/sera/real-event-index.md
docs/SERA_EVIDENCE_PATTERNS_FROM_REAL_REPORTS_v0.1.4.md
docs/SERA_PRECONDITIONS_EVIDENCE_CATALOG_v0.1.4.md
docs/real-event-harvest/REAL-EVENT-0001.md
docs/real-event-harvest/REAL-EVENT-0002.md

No JSON fixture should be created directly from a report.

---

## 15. Restrictions

During real report harvest:

Do not change engine behavior.
Do not create fixture expected values.
Do not promote baseline.
Do not use risk-layer conclusions as causal classification.
Do not convert HFACS labels into P/O/A.
Do not discard ambiguity.
Do not hide source limitations.

---

## 16. Status

This protocol is a documentation artifact.

It does not alter SERA.

It does not approve any event as a fixture.

It does not create expected values.

It defines how real reports should be harvested safely into the HFA/SERA methodological framework.
