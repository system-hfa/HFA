# SERA Real Event Index Template v0.1.4

Status: TEMPLATE_ONLY  
Phase: A4+R-4 — Real Event Index Template  
Scope: index structure for future real-event harvest  
Non-scope: fixture creation, expected values, engine changes, baseline promotion, risk-layer redesign

---

## 1. Purpose

This file defines the template for indexing real accident and incident events before they are converted into any SERA candidate material.

The real-event index is not a fixture set.

The real-event index is not a baseline.

The real-event index is not an expected-value source.

It is a controlled inventory of potentially useful real events extracted from source reports.

---

## 2. Core rules

Real events may be indexed only as source material until reviewed.

Do not create JSON fixtures directly from this index.

Do not assign expected P/O/A values directly from source reports.

Do not copy HFACS labels, probable causes, findings or recommendations into expected values.

Allowed flow:

```text
source report
→ neutral factual harvest
→ real-event index entry
→ SERA hypothesis draft
→ human review
→ possible candidate later
```

Forbidden flow:

```text
source report conclusion
→ expected SERA value
```

Also forbidden:

```text
HFACS label
→ P/O/A code
```

---

## 3. Event suitability categories

Use one or more of the following categories:

GOOD_BASELINE_CANDIDATE
VALIDATION_EXPANSION
ADVERSARIAL_CASE
INSUFFICIENT_EVIDENCE_CASE
MULTI_ACTOR_CASE
PRECONDITIONS_CATALOG_SOURCE
RISK_LAYER_FUTURE_SOURCE
REFERENCE_ONLY

Definitions:

* GOOD_BASELINE_CANDIDATE: facts are clear, direct actor is clear, ambiguity is low, but expected values still require human review.
* VALIDATION_EXPANSION: useful for wider testing, but not yet baseline-quality.
* ADVERSARIAL_CASE: useful because it challenges common misclassification.
* INSUFFICIENT_EVIDENCE_CASE: useful to test conservative handling of uncertainty.
* MULTI_ACTOR_CASE: useful for future multi-actor SERA handling.
* PRECONDITIONS_CATALOG_SOURCE: useful mainly for preconditions/evidence patterns.
* RISK_LAYER_FUTURE_SOURCE: useful mainly for later A5 Risk Layer.
* REFERENCE_ONLY: useful context but not suitable as candidate material now.

---

## 4. Source type categories

Use one primary source type:

OFFICIAL_REPORT
BULLETIN_SUMMARY
INVESTIGATION_EXCERPT
HFACS_ANALYZED_CASE
SECONDARY_ARTICLE
TRAINING_CASE
ACADEMIC_CASE
UNKNOWN_SOURCE_TYPE

Prefer OFFICIAL_REPORT when possible.

Secondary articles must not override official reports.

---

## 5. Confidence scale

Use one of:

HIGH
MEDIUM
LOW
INSUFFICIENT

Guidance:

* HIGH: chronology, actor, unsafe act/condition and evidence are clear.
* MEDIUM: event is usable but requires some inference.
* LOW: event has useful context but significant uncertainty.
* INSUFFICIENT: not enough factual material for SERA hypothesis.

---

## 6. Status values

Use one of:

INDEXED_ONLY
FACTUAL_HARVEST_PENDING
FACTUAL_HARVEST_DRAFTED
SERA_HYPOTHESIS_PENDING
SERA_HYPOTHESIS_DRAFTED
HUMAN_REVIEW_REQUIRED
REJECTED_FOR_FIXTURE_USE
APPROVED_FOR_CANDIDATE_DRAFT
REFERENCE_ONLY

No item should be marked as approved for fixture use in this template.

---

## 7. Minimal index table

Use this table for the first-pass index.

ID    Source file    Page/range    Event title    Aircraft/system    Operation type    Phase    Event theme    Source type    Suitability    Confidence    Status    Notes
REAL-EVENT-0001    TBD    TBD    TBD    TBD    TBD    TBD    TBD    TBD    TBD    TBD    INDEXED_ONLY    TBD
REAL-EVENT-0002    TBD    TBD    TBD    TBD    TBD    TBD    TBD    TBD    TBD    TBD    INDEXED_ONLY    TBD
REAL-EVENT-0003    TBD    TBD    TBD    TBD    TBD    TBD    TBD    TBD    TBD    TBD    INDEXED_ONLY    TBD

---

## 8. Expanded event entry template

Use this block when a table row needs more detail.

ID:
Source file:
Source page/range:
Report authority/source:
Source type:
Event title:
Aircraft/system:
Operator/context:
Date/time:
Location:
Operation type:
Phase of operation:
Event theme:
Suitability category:
Confidence:
Status:
Neutral factual summary:
Why this event is useful for HFA/SERA:
Potential SERA issue:
Potential preconditions:
Potential HFACS comparison tags:
Risk-layer future relevance:
Known ambiguity:
Do not use directly:
Reviewer notes:

---

## 9. Event theme vocabulary

Suggested event themes:

DVE_APPROACH
BLACK_HOLE_APPROACH
NIGHT_PRIVATE_SITE_APPROACH
OFFSHORE_HELIDECK_APPROACH
UNSTABLE_APPROACH
LOW_ENERGY_STATE
LOSS_OF_CONTROL
CFIT_NEAR_MISS
AUTOMATION_MODE_CONFUSION
CHECKLIST_OMISSION
WARNING_RESPONSE
EGPWS_TAWS_ALERT
CREW_COORDINATION_BREAKDOWN
AUTHORITY_GRADIENT
PLAN_CONTINUATION
RISK_ASSESSMENT_NOT_UPDATED
INADEQUATE_BRIEFING
INSUFFICIENT_VISUAL_REFERENCE
SPATIAL_DISORIENTATION
TECHNOLOGICAL_INTERFACE
TRAINING_PROFICIENCY
SUPERVISION_OVERSIGHT
ORGANIZATIONAL_PROCESS
SMS_ASSURANCE_GAP

Add new terms conservatively.

---

## 10. Potential HFACS comparison tags

HFACS-derived tags may be used as non-decisional metadata.

Examples:

hfacs.act.skill_based
hfacs.act.decision
hfacs.act.perceptual
hfacs.act.violation
hfacs.precondition.environmental
hfacs.precondition.technological
hfacs.precondition.cognitive
hfacs.precondition.perceptual
hfacs.precondition.crew_coordination
hfacs.supervision.inadequate
hfacs.supervision.planned_inappropriate
hfacs.supervision.failure_to_correct
hfacs.organization.resource_management
hfacs.organization.climate
hfacs.organization.process

These tags must not determine SERA P/O/A.

---

## 11. Fields that must remain separate

Always keep these separate:

factual evidence
original report conclusion
HFACS/source classification
SERA candidate hypothesis
human-reviewed expected value
risk-layer interpretation

Never merge these into a single unqualified statement.

---

## 12. Review gate before candidate creation

Before any indexed event becomes a candidate, require:

1. Factual harvest completed.
2. Original report conclusions quarantined.
3. Direct actor identified or uncertainty documented.
4. Unsafe act/condition separated.
5. SERA hypothesis drafted.
6. Alternative interpretations documented.
7. Confidence assigned.
8. Human review completed.
9. Explicit approval to create candidate.

---

## 13. Non-scope reminder

This file does not create:

fixtures
candidate JSONs
baseline expected values
engine rules
risk-layer rules

It only defines the future index structure.

---

## 14. Status

This file is a template.

It is safe to commit as documentation/test-support material if reviewed.

It must not be treated as an active validation suite.
