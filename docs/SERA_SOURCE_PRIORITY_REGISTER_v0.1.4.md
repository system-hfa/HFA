# SERA Source Priority Register v0.1.4

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-1 - Source Register + Real Report Harvest Preparation  
Scope: source governance for HFA/SERA methodology, real-event harvest, HFACS comparison, SMS/risk layer separation  
Non-scope: engine changes, fixture creation, baseline promotion, risk-layer redesign implementation

---

## 1. Purpose

This document defines how each source family in the HFA/SERA project may be used.
The goal is to prevent methodological contamination while allowing the project to extract value from:

- Hendy/SERA methodological material;
- Daumas applied SERA/offshore work;
- HFACS and DoD HFACS taxonomies;
- real accident and incident reports;
- SMS / SGSO / safety management material;
- ARMS / ERC / operational risk assessment material;
- technical articles and secondary aviation safety analyses.

This register exists because the HFA/SERA project now uses multiple types of sources that are not methodologically equivalent.
A real accident report may be a strong factual source, but it is not automatically a SERA methodological source.
A HFACS analysis may be useful as a comparative taxonomy, but it must not automatically determine SERA P/O/A.
A risk assessment method may support the future HFA Risk Layer, but it must not retroactively redefine the causal baseline.

---

## 2. Current methodological baseline

The current frozen baseline is:

- Baseline: `sera-causal-baseline-v0.1.4`
- Tag: `sera-causal-v0.1.4`
- Scope: causal classification only
- Included: P/O/A + preconditions
- Excluded: risk layer, ERC redesign, ARMS redesign, traditional risk matrix redesign

The causal chain protected by this register is:

```text
event narrative
-> safe operation escape point
-> unsafe act / unsafe condition
-> direct actor
-> perception / objective / action statements
-> P/O/A classification
-> preconditions
-> decision_trace
-> limitations
-> recommendations
-> human review
```

The HFA Risk Layer is separate and future-facing:

```text
erc_level
traditional risk matrix
ARMS / ERC methodology
Hendy risk management framing
organizational risk profile
safety assurance
dashboard risk aggregation
```

---

## 3. Source classification levels

Each source must be classified before it is used.

### 3.1 SOURCE_PRIMARY_HENDY

Use for:

- SERA causal logic;
- active failure structure;
- preconditions logic;
- information-processing model;
- original limits of the method;
- methodological definitions.

May influence:

- P/O/A logic;
- preconditions;
- decision_trace;
- question_trace;
- methodology documentation.

Must not be overridden by:

- HFACS labels;
- accident report conclusions;
- operator recommendations;
- later risk matrix material.

---

### 3.2 SOURCE_DAUMAS_OPERATIONALIZATION

Use for:

- applied SERA workflow;
- offshore aviation context;
- interview-to-analysis workflow;
- MDC-related operationalization;
- practical adaptation of Hendy/SERA;
- domain-specific refinements.

May influence:

- evidence intake;
- factual extraction protocol;
- event analysis workflow;
- preconditions trace;
- product-facing methodology explanation.

Requires explicit note when:

- adapting beyond Hendy;
- adding computational heuristics;
- converting field practice into software behavior.

---

### 3.3 SOURCE_HFACS_COMPARATIVE

Use for:

- comparison with SERA;
- terminology for human factors;
- organizing preconditions, supervision and organizational context;
- enriching evidence tags;
- external taxonomy mapping.

May influence:

- HFACS/SERA crosswalk;
- explanatory documentation;
- preconditions vocabulary;
- organizational-context extraction;
- safety investigation reports.

Must not automatically determine:

- P-code;
- O-code;
- A-code;
- expected fixture result;
- causal baseline behavior.

HFACS categories are external labels. They are not SERA classifications.

---

### 3.4 SOURCE_DOD_HFACS_TAXONOMY

Use for:

- structured taxonomy of Acts, Preconditions, Supervision and Organizational Influences;
- nanocode vocabulary;
- evidence prompts for investigators;
- detailed human-factors coding comparison.

May influence:

- crosswalk documentation;
- preconditions_trace;
- organizational context tags;
- safety report metadata;
- training and CRM vocabulary.

Must not automatically determine:

- SERA active failure code;
- SERA causal code;
- fixture expected values.

DoD HFACS is especially useful for vocabulary, but it remains a comparative taxonomy.

---

### 3.5 SOURCE_REAL_REPORT_FACTUAL

Use for:

- event chronology;
- aircraft type;
- phase of operation;
- operational context;
- weather and environmental conditions;
- recorded flight data;
- crew actions;
- crew communications when available;
- barriers present or absent;
- SOP context;
- factual system state;
- factual organizational context.

Must not automatically use:

- probable cause;
- findings as to cause;
- HFACS classification;
- investigative judgement;
- recommendations;
- blame-like language;
- conclusions from another methodology.

Real reports are factual source material, not automatic SERA annotations.

---

### 3.6 SOURCE_SMS_SGSO

Use for:

- safety management framework;
- hazards and consequences;
- defences;
- safety assurance;
- safety reporting;
- safety culture;
- organizational risk management;
- safety performance indicators;
- corrective action management.

May influence:

- product design;
- risk profile;
- recommendations;
- management dashboard;
- future A5 Risk Layer;
- organizational maturity analysis.

Must not redefine:

- P/O/A causal baseline;
- Hendy/SERA active failure logic.

---

### 3.7 SOURCE_ARMS_RISK_LAYER

Use for:

- operational risk assessment;
- event risk classification;
- barrier effectiveness;
- recovery potential;
- escalation control;
- ERC-style reasoning;
- future A5 risk layer redesign.

May influence:

- erc_level redesign;
- operational risk matrix;
- action prioritization;
- risk dashboards;
- safety review tools.

Must not influence:

- causal baseline P/O/A;
- fixture expected P/O/A;
- preconditions causal identification.

ARMS belongs to risk evaluation, not causal classification.

---

### 3.8 SOURCE_AUXILIARY_ARTICLE

Use for:

- background;
- industry commentary;
- secondary interpretation;
- examples of risk management discussion;
- operational lessons.

Must not be used as:

- primary factual evidence when an official report exists;
- primary methodological authority;
- fixture expected source;
- definitive causal source.

Auxiliary articles may help identify themes, but must be cross-checked against primary reports whenever possible.

---

### 3.9 SOURCE_TECHNICAL_STANDARD_OR_REGULATION

Use for:

- regulatory context;
- design assurance context;
- certification risk vocabulary;
- system safety terms;
- aviation safety compliance.

May influence:

- risk-layer documentation;
- product disclaimers;
- safety management integration;
- requirements traceability.

Must not directly determine:

- human causal classification;
- P/O/A output;
- SERA methodological logic.

---

## 4. Source usage matrix

| Source family | Factual extraction | P/O/A logic | Preconditions | HFACS crosswalk | Risk layer | Product/SMS |
| --- | --- | --- | --- | --- | --- | --- |
| Hendy/SERA | Medium | High | High | Medium | Medium | Medium |
| Daumas/SERA offshore | High | Medium/High | High | Medium | Medium | High |
| HFACS | Low/Medium | No automatic use | Medium/High | High | Low | Medium |
| DoD HFACS | Low/Medium | No automatic use | High | High | Low | Medium |
| Real accident reports | High | Hypothesis only | Hypothesis only | Context only | Context only | Medium |
| ICAO/SMS/SGSO | Medium | No | Medium | Low | High | High |
| ARMS/ERC | Low | No | Low | Low | High | High |
| Technical standards | Medium | No | Low/Medium | Low | Medium/High | Medium |
| Articles/commentary | Low/Medium | No | Low/Medium | Low | Low/Medium | Medium |

---

## 5. Protected methodological rules

### Rule 1 - P/O/A is not HFACS

HFACS labels must not be converted automatically into SERA P/O/A.

Example:

```text
HFACS: Decision Error
```

This does not automatically mean:

```text
SERA: O-code or A-code
```

The SERA analysis must reconstruct:

- What was the safe operation?
- Where did the operation escape?
- What unsafe act or condition occurred?
- Who was the direct actor?
- What did the actor perceive?
- What objective was being pursued?
- What action was selected or executed?

---

### Rule 2 - Real reports are factual sources, not expected-value sources

A real accident report may provide excellent factual material.

However, the report's own findings, conclusions or recommendations must not become SERA expected values without review.

Use:

- recorded data
- sequence of events
- weather
- crew actions
- SOP context
- barriers
- instrument indications
- communications

Do not automatically use:

- probable cause
- findings as to cause
- contributing factors
- recommendations
- HFACS labels
- investigator judgement
- operator blame

---

### Rule 3 - Risk layer is separate from causal baseline

The causal baseline includes:

- P/O/A + preconditions

The future risk layer may include:

- erc_level
- ARMS
- traditional risk matrix
- barrier effectiveness
- severity
- recovery potential
- escalation risk
- organizational risk profile

Risk methods must not modify causal classification.

---

### Rule 4 - PARTIAL is not PASS

Any report, runner output or validation result marked PARTIAL must not be treated as PASS.

PARTIAL may be useful diagnostically, but cannot promote a baseline or justify methodological closure.

---

### Rule 5 - Noisy provider runs are not methodological evidence

Any LLM validation report contaminated by timeout, termination, empty actual output, or provider instability must be marked:

```text
NOISY_PROVIDER_RUN
```

Such runs must not be used to support methodology changes or baseline promotion.

---

### Rule 6 - Candidates are instruments, not methodology

Fixtures and candidates test the methodology.

They do not define it.

A classification should not be changed merely to satisfy a candidate unless the change answers a valid SERA methodological question.

---

## 6. Recommended file grouping

Project sources should be treated conceptually as:

```text
01_methodology_primary/
  Hendy SERA
  Daumas SERA offshore / MDC
02_hfacs_taxonomies/
  HFACS
  DoD HFACS
  Wiegmann-Shappell material
03_real_event_corpora/
  AAIB bulletins
  TSB reports
  NTSB reports
  AIB reports
  offshore helicopter events
  automation / LOC-I / CFIT / DVE / CRM cases
04_sms_sgso_risk_management/
  ICAO SMM
  ANAC SGSO
  FAA risk orders
  safety reporting and investigation material
05_arms_risk_layer/
  ARMS
  ERC
  OGP risk assessment
  offshore risk-level trends
06_auxiliary_articles/
  industry commentary
  aviation safety articles
  secondary analyses
```

The files do not need to be physically renamed immediately, but every derived document should reference the source family classification.

---

## 7. Recommended next documents

This register should be followed by:

- `docs/SERA_HFACS_CROSSWALK_v0.1.4.md`
- `docs/SERA_REAL_REPORT_EXTRACTION_PROTOCOL_v0.1.4.md`
- `tests/sera/real-event-index-template.md`

These documents should be created before any large-scale real-event candidate extraction.

---

## 8. DeepSeek/Codex instructions for this phase

If this document is created in the repository, the implementation phase must obey:

- Do not alter SERA engine.
- Do not alter fixtures.
- Do not alter baseline.
- Do not create JSON candidates.
- Do not create migrations.
- Do not alter frontend behavior.
- Do not alter risk-layer code.
- Do not run global smoke.
- Do not use `git add .`.
- Create only the requested markdown documentation.
- Show `git status --short` and `git diff --stat` at the end.

---

## 9. Current status

This document is a governance draft for source use.

It does not freeze the HFACS/SERA crosswalk.

It does not approve real-event candidates.

It does not start A5 Risk Layer.

It only defines how sources may be used safely before the next extraction phases.
