# Real Event Index Batch 2 — Source Quality Review v0.1.4
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-13b — Batch 2 Source Quality Review  
Scope: source-quality review of Batch 2 indexed events before deep factual extraction  
Non-scope: fixture creation, expected P/O/A assignment, JSON candidate creation, baseline promotion, engine changes, risk-layer redesign
---
## 1. Purpose
This document reviews the source quality of the Batch 2 real-event index before selecting events for deep factual extraction.
The goal is to avoid deep extraction from weak placeholders or secondary-only material when official sources are available.
This document does not modify the original Batch 2 index.
This document does not create fixtures.
This document does not assign expected P/O/A.
This document does not approve JSON candidates.
All outputs remain NO_FIXTURE_JSON.
---
## 2. Source quality categories
| Category | Meaning | Allowed next step |
|---|---|---|
| SOURCE_READY_OFFICIAL | Official report or official investigation page identified | Eligible for deep factual extraction |
| SOURCE_READY_TECHNICAL_SECONDARY | Reliable technical source identified, but official report still preferred | Eligible only if official source unavailable |
| SOURCE_PARTIAL | Some source exists, but details/page/report not sufficient | Requires source enrichment |
| PLACEHOLDER_LOW_CONFIDENCE | Placeholder or vague corpus reference | Do not deepen yet |
| REPLACE_OR_RETIRE | Should be replaced by a real, source-anchored event | Do not deepen |
---
## 3. Batch 2 source quality table
| ID | Event | Current source status | Source quality decision | Recommended next step |
|---|---|---|---|---|
| REAL-EVENT-0021 | Cessna 500 N8DX — Garmin/autopilot confusion and loss of control | NTSB ERA17FA135 identified | SOURCE_READY_OFFICIAL | Deep extraction candidate. |
| REAL-EVENT-0022 | S-76C++ N798P PHI — rollover on Vioska Knoll 956-A helideck | NTSB CEN10FA079 identified | SOURCE_READY_OFFICIAL | Deep extraction candidate. |
| REAL-EVENT-0023 | S-76++ PK-TVY Soehanah rig — tumble right near touchdown | BEA notification / Indonesian AIB identified | SOURCE_PARTIAL | Deepen only if final/preliminary report is available; otherwise harvest as notification-level case. |
| REAL-EVENT-0024 | S-76C+ 5N-BGD Lagos lagoon — control pushrod separation | NSIB/AIB preliminary report identified | SOURCE_READY_OFFICIAL | Deep extraction candidate, likely unsafe-condition dominant. |
| REAL-EVENT-0025 | S-76C+ PK-FUP Heavylift Indonesia — servo pushrod / rod-end separation | Technical report references identified; official/final source should be retrieved if possible | SOURCE_READY_TECHNICAL_SECONDARY | Deepen after official report search; likely unsafe-condition dominant. |
| REAL-EVENT-0026 | S-76C++ N748P PHI — fatal bird strike / windshield penetration | FAA lessons/NTSB source identified | SOURCE_READY_OFFICIAL | Deep extraction candidate for barrier/risk-layer/preconditions. |
| REAL-EVENT-0027 | S-76C+ N860AL Bristow US — landing gear collapse after pothole strike | Source not yet confirmed in this review | SOURCE_PARTIAL | Needs source enrichment before deep extraction. |
| REAL-EVENT-0028 | S-76C+ HL9661 Heli Korea — tail rotor strike on fuel bowser | Source not yet confirmed in this review | SOURCE_PARTIAL | Needs official/technical source before deep extraction. |
| REAL-EVENT-0029 | Aeroleo Taxi Aereo S-76 — autorotation to water en route to P-32 | Project corpus source only | SOURCE_PARTIAL | Needs CENIPA/official or report source confirmation. |
| REAL-EVENT-0030 | BHS S-76 Roncador 2004 — post-takeoff loss of height / ditching report | Project corpus source only | SOURCE_PARTIAL | Needs CENIPA/official or report source confirmation. |
| REAL-EVENT-0031 | S-76B PH-KHB — offshore/platform approach accident material | Project corpus source only | SOURCE_PARTIAL | Needs official source confirmation. |
| REAL-EVENT-0032 | Airbus A320-214 G-EZWM — AAIB correspondence investigation | AAIB bulletin listing only | SOURCE_PARTIAL | Keep for future triage; not priority. |
| REAL-EVENT-0033 | Boeing 737-8AS EI-EFB — AAIB correspondence investigation | AAIB bulletin listing only | SOURCE_PARTIAL | Keep for future triage; not priority. |
| REAL-EVENT-0034 | Percival P66 Pembroke C Mk1 G-BNPH — AAIB correspondence investigation | AAIB bulletin listing only | SOURCE_PARTIAL | Keep for future triage; not priority. |
| REAL-EVENT-0035 | Cessna P210N N210SH — AAIB correspondence investigation | AAIB bulletin listing only | SOURCE_PARTIAL | Keep for future triage; not priority. |
| REAL-EVENT-0036 | A320 unstable approach / runway excursion candidate from project corpora | Placeholder only | PLACEHOLDER_LOW_CONFIDENCE | Replace before use. |
| REAL-EVENT-0037 | TAWS/EGPWS warning response event candidate from project corpora | Placeholder only | PLACEHOLDER_LOW_CONFIDENCE | Replace before use. |
| REAL-EVENT-0038 | Checklist omission event candidate from project corpora | Placeholder only | PLACEHOLDER_LOW_CONFIDENCE | Replace before use. |
| REAL-EVENT-0039 | Crew coordination / authority gradient event candidate from HFACS corpora | Placeholder only | PLACEHOLDER_LOW_CONFIDENCE | Replace before use. |
| REAL-EVENT-0040 | Insufficient-evidence event candidate for conservative refusal testing | Placeholder only | PLACEHOLDER_LOW_CONFIDENCE | Replace before use. |
---
## 4. Recommended A4+R-14 deep extraction set
The best next deep extraction set should avoid placeholders and favor source-ready events:
```text
REAL-EVENT-0021 — Cessna 500 N8DX
REAL-EVENT-0022 — S-76C++ N798P
REAL-EVENT-0024 — S-76C+ 5N-BGD
REAL-EVENT-0026 — S-76C++ N748P
REAL-EVENT-0023 — S-76++ PK-TVY only if enough report detail is available
```
Alternative if PK-TVY remains source-partial:
```text
REAL-EVENT-0025 — S-76C+ PK-FUP
```

---

## 5. Recommended replacement policy for placeholders 0036–0040

Do not deepen 0036–0040 until they are replaced by identified events with source anchors.

Replacement candidates should come from:

* official accident reports;
* TSB, NTSB, AAIB, ATSB, CENIPA, NSIB/AIB, BEA notification pages;
* project PDFs with identifiable page and report title;
* HFACS-analyzed corpora only after factual event identity is confirmed.

Replacement candidates should preserve diversity:

commercial transport approach/landing
TAWS/EGPWS warning response
checklist/procedure omission
crew coordination / authority gradient
insufficient-evidence conservative refusal case

---

## 6. Restrictions

Do not create fixture JSONs from this source review.

Do not infer P/O/A from source quality.

Do not treat official probable cause as SERA expected value.

Do not treat HFACS labels as SERA outputs.

Do not promote any event to baseline without separate factual harvest, candidate draft and human review.

---

## 7. Final status

This document is a source-quality control layer.

It does not alter the original Batch 2 index.

It does not create expected values.

It does not create JSON fixtures.

It does not alter SERA.

It does not alter the causal baseline.
