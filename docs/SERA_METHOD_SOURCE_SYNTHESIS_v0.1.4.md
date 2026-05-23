# SERA Method Source Synthesis v0.1.4

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-1 — Methodological Source Synthesis  
Scope: conversion of source documents into HFA/SERA methodological artifacts  
Non-scope: engine changes, fixture creation, baseline changes, risk-layer implementation, automatic SERA classification from HFACS or accident reports

---

## 1. Purpose

This document defines how the HFA/SERA project converts source material into a controlled internal methodological framework.

The source documents include:

- Hendy/SERA material;
- Daumas applied SERA/offshore material;
- HFACS and DoD HFACS taxonomies;
- real accident and incident reports;
- ICAO, ANAC, SMS and SGSO material;
- ARMS/ERC and operational risk assessment material;
- auxiliary aviation safety articles and case summaries.

The final system must not depend on repeatedly reading raw PDFs or reports during normal analysis.

The intended transformation is:

```text
raw source documents
→ critical reading
→ methodological extraction
→ HFA/SERA internal artifacts
→ controlled implementation
→ validation
```

The raw documents remain useful for auditability and future review, but the operational system should rely on the derived HFA/SERA framework.

---

## 2. Current protected baseline

The current protected baseline is the causal baseline:

sera-causal-baseline-v0.1.4

Its scope is:

P/O/A + preconditions

Its non-scope is:

erc_level
traditional risk matrix
ARMS/ERC redesign
risk profile aggregation
organizational risk dashboard

The protected causal sequence is:

event narrative
→ safe operation escape point
→ unsafe act / unsafe condition
→ direct actor
→ perception / objective / action statements
→ P/O/A classification
→ preconditions
→ decision_trace
→ limitations
→ recommendations
→ human review

The HFA Risk Layer must remain separate until a dedicated A5 phase.

---

## 3. Core principle

The source documents do not become the methodology directly.

They are used to create derived artifacts.

For example:

Hendy/SERA
→ causal logic, active failure reasoning, preconditions structure
Daumas/offshore SERA
→ operationalization, evidence intake, offshore/MDC adaptation
HFACS / DoD HFACS
→ comparative taxonomy, vocabulary, precondition and organizational context mapping
Real reports
→ factual event material, evidence patterns, edge cases, ambiguity patterns
ICAO / ANAC / SMS / SGSO
→ safety management, defences, safety assurance, corrective action logic
ARMS / ERC / OGP
→ future risk layer, barrier/recovery/escalation reasoning
Auxiliary articles
→ context only, never primary expected values

---

## 4. What becomes internal HFA/SERA framework

The useful output of the source reading should become internal project artifacts such as:

docs/SERA_SOURCE_PRIORITY_REGISTER_v0.1.4.md
docs/SERA_METHOD_SOURCE_SYNTHESIS_v0.1.4.md
docs/SERA_HFACS_CROSSWALK_v0.1.4.md
docs/SERA_REAL_REPORT_EXTRACTION_PROTOCOL_v0.1.4.md
docs/SERA_EVIDENCE_PATTERNS_FROM_REAL_REPORTS_v0.1.4.md
docs/SERA_PRECONDITIONS_EVIDENCE_CATALOG_v0.1.4.md
docs/SERA_HFACS_TO_PRECONDITIONS_MAPPING_v0.1.4.md
tests/sera/real-event-index-template.md

These artifacts are the controlled methodological layer.

Raw PDFs are source evidence. They are not runtime dependencies.

---

## 5. Source family synthesis

### 5.1 Hendy/SERA

Hendy/SERA is the primary source family for causal reasoning.

It may support:

* active failure structure;
* unsafe act / unsafe condition framing;
* direct actor analysis;
* perception/objective/action reasoning;
* preconditions;
* limitations of classification;
* decision trace logic;
* methodological boundaries.

Hendy/SERA should be treated as the highest-priority source for causal logic.

If later taxonomies conflict with Hendy/SERA in the causal layer, the conflict must be documented rather than silently merged.

---

### 5.2 Daumas applied SERA / offshore / MDC

Daumas material should be treated as applied operationalization.

It may support:

* adaptation of SERA to offshore aviation;
* event interview intake;
* real-world evidence structuring;
* operational language for analysts;
* relationship between incident narratives and SERA analysis;
* refinement of how preconditions are identified in practice;
* practical use of SERA in a professional investigation context.

Daumas material may extend or operationalize Hendy, but any adaptation beyond Hendy must be explicitly marked.

Recommended source status labels:

DAUMAS_OPERATIONALIZATION
DAUMAS_APPLIED_IMPROVEMENT
HFA_ADAPTATION_REQUIRES_NOTE

---

### 5.3 HFACS

HFACS is useful as a comparative human factors taxonomy.

It may support:

* vocabulary for unsafe acts;
* vocabulary for preconditions;
* supervision and organizational categories;
* external comparability;
* product reporting for users already familiar with HFACS;
* crosswalk documentation.

HFACS must not automatically determine SERA P/O/A.

A HFACS category such as:

Decision Error
Skill-Based Error
Perceptual Error
Routine Violation
Exceptional Violation
Inadequate Supervision
Organizational Process

may suggest a question to ask, but it does not answer the SERA classification by itself.

The SERA analysis must reconstruct:

What was the safe operation?
Where did safe operation escape?
What unsafe act or condition occurred?
Who was the direct actor?
What did the actor perceive?
What objective was being pursued?
What action was selected/executed?
What preconditions shaped the behavior?

---

### 5.4 DoD HFACS

DoD HFACS provides a detailed taxonomy that is especially useful for evidence vocabulary.

It may support:

* nanocode-like evidence tags;
* detailed preconditions taxonomy;
* cognitive factors;
* perceptual factors;
* personnel factors;
* supervision factors;
* organizational influences;
* investigation prompts.

DoD HFACS should be used to enrich:

preconditions_trace
organizational_context
supervision_context
evidence prompts
training material

It must not be used as a direct source of SERA expected values.

---

### 5.5 Real accident and incident reports

Real reports are source material for factual extraction.

They may support:

* chronology;
* phase of operation;
* aircraft state;
* crew actions;
* communications;
* weather;
* visibility;
* operational environment;
* automation mode/state;
* SOP context;
* barrier presence or absence;
* safety system response;
* recorded data;
* factual organizational context.

They must not automatically supply:

* SERA expected classifications;
* P/O/A outputs;
* fixture expected values;
* recommendations;
* causation imported from another methodology.

A real report's probable cause, findings or recommendations can be retained as external context, but they must be separated from the neutral factual harvest.

---

### 5.6 ICAO / ANAC / SMS / SGSO

ICAO, ANAC, SMS and SGSO sources support the safety management layer.

They may support:

* hazard identification;
* defences;
* safety assurance;
* reporting culture;
* corrective action management;
* change management;
* safety performance indicators;
* safety risk management;
* organizational risk profile.

They should mainly feed:

risk profile
recommendation quality
corrective action design
dashboard interpretation
organization-level insights
future A5 Risk Layer

They should not redefine the P/O/A causal baseline.

---

### 5.7 ARMS / ERC / OGP / Operational Risk Assessment

ARMS/ERC/OGP materials are reserved primarily for risk reasoning.

They may support:

* operational event risk;
* severity;
* recovery potential;
* barrier effectiveness;
* escalation potential;
* risk tolerability;
* risk prioritization;
* future risk-layer redesign.

They must not determine:

P-code
O-code
A-code
preconditions existence
causal baseline correctness

ARMS belongs to A5 or later unless explicitly scoped otherwise.

---

### 5.8 Auxiliary articles and commentary

Auxiliary articles may help identify:

* industry lessons;
* recurring themes;
* examples of SMS weakness;
* operational concerns;
* possible candidate events to locate in primary reports.

They must not be treated as primary factual or methodological sources when official reports exist.

Use them as pointers, not foundations.

---

## 6. Derived methodological products

The expected long-term arcabouço metodológico should include at least the following products.

### 6.1 HFACS/SERA crosswalk

Purpose:

Explain how HFACS categories can inform, but not determine, SERA analysis.

Output:

docs/SERA_HFACS_CROSSWALK_v0.1.4.md

Expected content:

* HFACS Acts vs SERA active failure logic;
* HFACS Preconditions vs SERA preconditions;
* Supervision and Organizational Influences as contextual evidence;
* non-conversion rules;
* examples of safe and unsafe crosswalk use.

---

### 6.2 Real report extraction protocol

Purpose:

Extract neutral factual material without importing old conclusions.

Output:

docs/SERA_REAL_REPORT_EXTRACTION_PROTOCOL_v0.1.4.md

Expected content:

* factual harvest template;
* discard list;
* bias risk list;
* SERA hypothesis template;
* confidence scale;
* insufficient evidence criteria;
* multi-actor handling.

---

### 6.3 Evidence pattern catalog

Purpose:

Convert recurring report evidence into reusable HFA/SERA evidence patterns.

Output:

docs/SERA_EVIDENCE_PATTERNS_FROM_REAL_REPORTS_v0.1.4.md

Potential pattern families:

visual reference degradation
night/black-hole/DVE conditions
automation mode confusion
loss of energy state awareness
unstable approach continuation
go-around not briefed
checklist omission
cross-monitoring breakdown
authority gradient
task saturation
plan continuation
late recognition of unsafe state
EGPWS/TAWS response pattern
SOP absent or ambiguous
risk assessment not updated
known hazard not reported
SMS assurance gap

These are not classifications. They are evidence patterns.

---

### 6.4 Preconditions evidence catalog

Purpose:

Translate recurring evidence into precondition candidates while preserving uncertainty.

Output:

docs/SERA_PRECONDITIONS_EVIDENCE_CATALOG_v0.1.4.md

Potential categories:

environmental / visibility
technological / automation
cognitive / attention
crew coordination
planning / briefing
training / proficiency
supervision / oversight
organizational process
risk management
barrier design

---

### 6.5 Real event index

Purpose:

Track candidate real events before creating fixtures.

Output:

tests/sera/real-event-index-template.md

Important rule:

The index is not a fixture set.

It is an inventory of potentially useful events.

---

## 7. Incorporation rules

### 7.1 What may become a methodology rule

A source-derived insight may become a methodology rule only if:

1. it is supported by Hendy/SERA or clearly marked as adaptation;
2. it answers a SERA question;
3. it is not merely a HFACS label;
4. it is not merely a report conclusion;
5. it improves traceability;
6. it preserves conservative handling of ambiguity;
7. it can be explained in decision_trace or documentation.

---

### 7.2 What may become an evidence pattern

A source-derived insight may become an evidence pattern if:

1. it appears in real reports or taxonomies;
2. it helps identify facts relevant to SERA;
3. it does not force a P/O/A result;
4. it can be used as analyst guidance;
5. it can coexist with uncertainty.

---

### 7.3 What may become a fixture candidate

A real event may become a candidate only after:

1. factual extraction is complete;
2. old conclusions are separated;
3. a SERA hypothesis is proposed;
4. ambiguity is documented;
5. human review accepts the framing;
6. no expected value is copied from HFACS or report conclusion.

---

### 7.4 What may become engine behavior

No source-derived rule should become engine behavior until:

1. it is documented;
2. it is reviewed against Hendy/SERA;
3. it is classified by source status;
4. it has candidate coverage;
5. it has regression coverage;
6. it does not break causal baseline protections.

---

## 8. Bias controls

The main bias risks are:

using report probable cause as SERA expected value
using HFACS labels as P/O/A shortcuts
treating risk severity as causal classification
overfitting real reports into current engine behavior
changing methodology to pass examples
mixing A5 risk layer into A4 causal baseline
using secondary articles as primary evidence

Controls:

separate facts from conclusions
mark SERA annotation as hypothesis
preserve unknowns
require source status labels
avoid automatic conversion
review before fixtures
do not alter engine during harvest

---

## 9. Runtime dependency policy

The HFA/SERA system should not require reading raw PDFs during routine operation.

Raw documents serve as:

source archive
audit trail
future review material
evidence base for derived documentation

The system should rely on:

methodology docs
evidence catalogs
crosswalks
validated candidates
decision_trace rules
preconditions catalogs
human review workflow

This protects reproducibility and reduces dependence on long, heterogeneous documents.

---

## 10. Immediate next steps

After this document, create:

docs/SERA_HFACS_CROSSWALK_v0.1.4.md
docs/SERA_REAL_REPORT_EXTRACTION_PROTOCOL_v0.1.4.md
tests/sera/real-event-index-template.md

Then begin a controlled source harvest:

A4+R-2 — HFACS/SERA Crosswalk
A4+R-3 — Real Report Extraction Protocol
A4+R-4 — Real Event Index
A4+R-5 — Evidence Pattern Catalog

No JSON fixture should be created before factual harvest and human review.

---

## 11. DeepSeek/Codex restrictions

Any implementation phase using this document must obey:

Do not alter SERA engine.
Do not alter fixtures.
Do not alter baseline.
Do not create JSON candidates.
Do not create migrations.
Do not alter frontend behavior.
Do not alter risk-layer code.
Do not run global smoke.
Do not use git add .
Create only the requested markdown documentation unless explicitly instructed otherwise.

---

## 12. Status

This document is a synthesis draft.

It does not change methodology by itself.

It defines how raw sources should be transformed into controlled HFA/SERA artifacts.

It does not approve any real-event candidate.

It does not start A5 Risk Layer.

It does not modify the causal baseline.
