# Real Event Model Analysis Readiness Matrix v0.1.4
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-17 — Model Event Analysis Readiness Matrix  
Scope: readiness matrix for selecting real events for HFA/SERA system analysis trials  
Non-scope: fixture creation, expected P/O/A assignment, candidate JSON creation, baseline promotion, engine changes, risk-layer redesign
---
## 1. Purpose
This matrix selects which real events are ready for actual HFA/SERA system analysis trials.
The purpose is to verify whether the system analyzes real events according to the SERA causal workflow.
This is not a risk-layer document.
This is not a JSON candidate list.
This is not a baseline promotion document.
---
## 2. Readiness categories

Category    Meaning
READY_FOR_SYSTEM_TRIAL    Event has enough factual extraction and review to run through HFA/SERA.
READY_FOR_ADVERSARIAL_SYSTEM_TRIAL    Event is intentionally ambiguous and useful for anti-shortcut validation.
SOURCE_ENRICHMENT_REQUIRED    More source work needed before trial.
FACTUAL_HARVEST_ONLY    Event useful for corpus, not for system trial.
UNSAFE_CONDITION_DOMINANT_REFERENCE    Event should test refusal to force human active failure.
RISK_LAYER_FUTURE_ONLY    Event mainly useful after causal layer validation.

---
## 3. Current event readiness table

Event    Current artifact level    Readiness category    Why
REAL-EVENT-0001 — S-92A Thebaud    Candidate Draft MD    READY_FOR_SYSTEM_TRIAL    Strong factual chain, P-likely, DVE/low-energy/EGPWS gap.
REAL-EVENT-0002 — G-WIWI Peasmarsh    Candidate Draft MD    READY_FOR_ADVERSARIAL_SYSTEM_TRIAL    Ambiguous P/O/A, warning/go-around/planning anti-shortcut case.
REAL-EVENT-0003 — S-76C+ Tofino    Review Decision    READY_FOR_SYSTEM_TRIAL    Strong night approach energy/control case; candidate draft still pending.
REAL-EVENT-0004 — EC-JES Vigo    Review Decision    SOURCE_ENRICHMENT_REQUIRED    Full CIAIAC detail needed; multi-role warning/height case.
REAL-EVENT-0006 — 5N-BQJ    Review Decision    UNSAFE_CONDITION_DOMINANT_REFERENCE    Technical/automation abnormal case; avoid forcing P/O/A.
REAL-EVENT-0021 — Cessna 500 N8DX    Review Decision    READY_FOR_ADVERSARIAL_SYSTEM_TRIAL    Automation/mode-awareness P/A boundary; candidate draft pending.
REAL-EVENT-0022 — S-76C++ N798P    Review Decision    READY_FOR_SYSTEM_TRIAL    Helideck dynamic rollover; A-likely/P-plausible.
REAL-EVENT-0024 — S-76C+ 5N-BGD    Review Decision    UNSAFE_CONDITION_DOMINANT_REFERENCE    Control pushrod separation; maintenance/system barrier case.
REAL-EVENT-0026 — S-76C++ N748P    Review Decision    RISK_LAYER_FUTURE_ONLY    Bird strike / barrier design / certification; not direct P/O/A.

---
## 4. Recommended first system-analysis trial set

The first system trial should use five events:

REAL-EVENT-0001
REAL-EVENT-0002
REAL-EVENT-0003
REAL-EVENT-0006
REAL-EVENT-0021

Reason:

Event    Trial purpose
0001    Test DVE/low-energy P-likely without shortcut.
0002    Test ambiguous P/O/A and warning/go-around anti-shortcuts.
0003    Test night approach energy/control and P/A boundary.
0006    Test unsafe-condition-dominant refusal to force P/O/A.
0021    Test automation/mode-awareness P/A boundary.

The second system trial should use:

REAL-EVENT-0022
REAL-EVENT-0024
REAL-EVENT-0004 after source enrichment

---
## 5. Required neutral input narratives

Before running HFA/SERA system analysis, each event must have a neutral input narrative.

The narrative must include:

who / what / where / when
operational sequence
unsafe state development
available cues / barriers
known missing data

The narrative must exclude:

probable cause
findings
recommendations
HFACS labels
final P/O/A hint
review decision label
candidate axis status

---
## 6. Trial output comparison

For each event, compare system output against:

* factual harvest;
* deep extraction;
* review decision;
* candidate draft if available;
* methodology assurance protocol.

Do not require exact P/O/A match at this stage.

Require:

correct reasoning path
proper uncertainty handling
no unsafe shortcut
no forced human error
traceable recommendations

---
## 7. Minimum success criteria for the first trial set

For the first five events:

at least 4/5 must have acceptable or partial-but-safe SERA chain
0/5 may import probable cause as expected value
0/5 may force human error in unsafe-condition-dominant event
0/5 may omit safe operation escape point entirely
0/5 may ignore limitations

If those criteria are not met, do not proceed to JSON candidates.

---
## 8. Next operational phase

Next phase after this matrix:

A4+R-18 — Neutral Input Narratives for First System Trial Set

Deliverable:

docs/real-event-harvest/REAL_EVENT_SYSTEM_TRIAL_INPUTS_SET_1_v0.1.4.md

That document should create clean, neutral narratives for:

REAL-EVENT-0001
REAL-EVENT-0002
REAL-EVENT-0003
REAL-EVENT-0006
REAL-EVENT-0021

Only after A4+R-18 should the system actually analyze these events.

---
## 9. Final status

This matrix selects events for methodology validation.

It does not create expected values.

It does not create JSON fixtures.

It does not alter SERA.

It does not alter the causal baseline.

It blocks A5 Risk Layer until real-event system-analysis assurance is completed.
