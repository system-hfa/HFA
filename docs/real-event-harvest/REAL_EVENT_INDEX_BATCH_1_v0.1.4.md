# Real Event Index — Batch 1 v0.1.4
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-5 — Real Event Index Harvest — Batch 1  
Scope: initial index of real events for future HFA/SERA factual harvest  
Non-scope: fixture creation, expected P/O/A assignment, SERA hypothesis approval, engine changes, baseline promotion, risk-layer redesign
---
## 1. Purpose
This document records the first batch of real accident/incident events selected from the HFA project source corpora for future SERA validation work.
This is an index only.
It does not create fixtures.
It does not assign expected P/O/A values.
It does not approve candidates.
It does not import HFACS labels, probable causes, findings or recommendations as SERA outputs.
The intended flow is:
```text
source report
→ neutral factual harvest
→ real-event index entry
→ SERA hypothesis draft
→ human review
→ possible candidate later
```

---

## 2. Batch 1 selection principle

Batch 1 prioritizes events that are useful for testing and strengthening HFA/SERA across:

* helicopter offshore operations;
* DVE / degraded visual environment;
* night approach / black-hole approach;
* helideck operations;
* automation or avionics confusion;
* checklist/procedure omission;
* crew coordination / multi-actor issues;
* warning response;
* preconditions and organizational context;
* future risk-layer relevance.

The purpose is not numerical representativeness yet.

The purpose is to create a strong first triage set.

---

## 3. Status values used

All events in this batch remain:

INDEXED_ONLY

No event is approved as candidate or fixture.

---

## 4. Batch 1 event index

ID    Event title    Source file / corpus    Page/range    Aircraft/system    Operation type    Phase    Event theme    Source type    Suitability    Confidence    Status    Notes
REAL-EVENT-0001    S-92A CHO Thebaud — inadvertent descent during offshore approach    SK 92 report / project source    TBD    Sikorsky S-92A    Offshore helicopter transport    Offshore approach    DVE_APPROACH; LOW_ENERGY_STATE; WARNING_RESPONSE; OFFSHORE_HELIDECK_APPROACH    OFFICIAL_REPORT    GOOD_BASELINE_CANDIDATE; VALIDATION_EXPANSION    HIGH    INDEXED_ONLY    Strong event for factual harvest; good for safe-operation escape point and barriers.
REAL-EVENT-0002    S-76C++ G-WIWI Peasmarsh — discontinued night approach and near tree impact    SK 76 C++ Go Around Mishap / pdf24_merged-3.pdf    TBD    Sikorsky S-76C++    Public transport / private landing site    Night approach / go-around    NIGHT_PRIVATE_SITE_APPROACH; INSUFFICIENT_VISUAL_REFERENCE; EGPWS_TAWS_ALERT; PLAN_CONTINUATION    OFFICIAL_REPORT    GOOD_BASELINE_CANDIDATE; ADVERSARIAL_CASE    HIGH    INDEXED_ONLY    Very strong case for separating environmental preconditions from P/O/A.
REAL-EVENT-0003    S-76C+ Tofino — loss of control during night approach / near CFIT    SK 76 Tofino report / project source    TBD    Sikorsky S-76C+    Helicopter transport    Night approach    BLACK_HOLE_APPROACH; CFIT_NEAR_MISS; LOSS_OF_CONTROL; INSUFFICIENT_VISUAL_REFERENCE    OFFICIAL_REPORT    GOOD_BASELINE_CANDIDATE    HIGH    INDEXED_ONLY    Strong comparison case with Peasmarsh and Thebaud.
REAL-EVENT-0004    S-76C+ EC-JES Vigo — SAR night training descent to 22 ft    pdf24_merged-3.pdf    TBD    Sikorsky S-76C+    SAR training    Night approach / low-height operation    DVE_APPROACH; WARNING_RESPONSE; LOW_ALTITUDE; CREW_COORDINATION_BREAKDOWN    OFFICIAL_REPORT / BULLETIN_SUMMARY    GOOD_BASELINE_CANDIDATE; VALIDATION_EXPANSION    HIGH    INDEXED_ONLY    Strong low-altitude approach case; likely useful for warning/monitoring analysis.
REAL-EVENT-0005    S-76++ PK-TVY Soehanah rig — tumble right near touchdown    pdf24_merged-3.pdf    TBD    Sikorsky S-76++    Offshore helideck transport    Helideck landing / touchdown    OFFSHORE_HELIDECK_APPROACH; LOSS_OF_CONTROL; CREW_COORDINATION_BREAKDOWN; MULTI_ACTOR    OFFICIAL_REPORT / BULLETIN_SUMMARY    VALIDATION_EXPANSION; MULTI_ACTOR_CASE    MEDIUM    INDEXED_ONLY    Requires careful actor separation and control-handover review.
REAL-EVENT-0006    S-76C++ 5N-BQJ Bristow Nigeria — ditching after compass/DAFCS/trim fail issues    pdf24_merged.pdf / pdf24_merged-2.pdf    TBD    Sikorsky S-76C++    Offshore helicopter transport    En route after offshore departure    AUTOMATION_MODE_CONFUSION; CHECKLIST_OMISSION; TECHNOLOGICAL_INTERFACE; DITCHING    INVESTIGATION_EXCERPT / SECONDARY_ARTICLE    GOOD_BASELINE_CANDIDATE; ADVERSARIAL_CASE    HIGH    INDEXED_ONLY    Strong automation/checklist case; must separate article commentary from factual report content.
REAL-EVENT-0007    S-76C+ 5N-BGD Lagos lagoon — control pushrod separation    pdf24_merged-3.pdf / pdf24_merged-2.pdf    TBD    Sikorsky S-76C+    Offshore / transport    En route / approach unknown    MECHANICAL_FAILURE; MAINTENANCE; LOSS_OF_CONTROL; BARRIER_DESIGN    OFFICIAL_REPORT / SECONDARY_ARTICLE    PRECONDITIONS_CATALOG_SOURCE; RISK_LAYER_FUTURE_SOURCE    HIGH    INDEXED_ONLY    More useful for system/preconditions/risk layer than P/O/A baseline.
REAL-EVENT-0008    S-76C+ PK-FUP Heavylift Indonesia — servo pushrod / rod-end separation    pdf24_merged-2.pdf    TBD    Sikorsky S-76C+    Helicopter operation    In flight    MECHANICAL_FAILURE; MAINTENANCE; BARRIER_DESIGN; LOSS_OF_CONTROL    INVESTIGATION_EXCERPT / SECONDARY_ARTICLE    PRECONDITIONS_CATALOG_SOURCE; VALIDATION_EXPANSION    HIGH    INDEXED_ONLY    Useful for unsafe condition and maintenance/system barrier patterns.
REAL-EVENT-0009    S-76C++ N748P PHI — fatal bird strike / windshield penetration    pdf24_merged-2.pdf    TBD    Sikorsky S-76C++    Offshore helicopter transport    En route / cruise    BIRD_STRIKE; EMERGENCY_RESPONSE; CERTIFICATION; CREW_WORKLOAD    INVESTIGATION_EXCERPT / SECONDARY_ARTICLE    RISK_LAYER_FUTURE_SOURCE; PRECONDITIONS_CATALOG_SOURCE    HIGH    INDEXED_ONLY    Strong risk/barrier/certification event; P/O/A may not be primary use.
REAL-EVENT-0010    S-76C++ N798P PHI — rollover on Vioska Knoll 956-A helideck    pdf24_merged.pdf    TBD    Sikorsky S-76C++    Offshore helideck transport    Helideck landing / reposition    OFFSHORE_HELIDECK_APPROACH; HELIDECK_ROLLOVER; WIND; GROUND_TAXI_REPOSITION    INVESTIGATION_EXCERPT / SECONDARY_ARTICLE    VALIDATION_EXPANSION    HIGH    INDEXED_ONLY    Useful helideck handling case; factual harvest required before SERA hypothesis.
REAL-EVENT-0011    S-76C+ N860AL Bristow US — landing gear collapse after pothole strike    pdf24_merged.pdf    TBD    Sikorsky S-76C+    Offshore support / airport ground movement    Taxi    GROUND_TAXI; INFRASTRUCTURE_HAZARD; LANDING_GEAR_COLLAPSE    SECONDARY_ARTICLE    PRECONDITIONS_CATALOG_SOURCE; REFERENCE_ONLY    MEDIUM    INDEXED_ONLY    Likely more useful for hazards/barriers than SERA active failure.
REAL-EVENT-0012    S-76C+ HL9661 Heli Korea — tail rotor strike on fuel bowser    pdf24_merged-2.pdf    TBD    Sikorsky S-76C+    Firefighting / utility helicopter    Landing / ground proximity    LANDING_SITE_LAYOUT; GROUND_COORDINATION; TAIL_ROTOR_STRIKE; MULTI_ACTOR    SECONDARY_ARTICLE / INVESTIGATION_EXCERPT    VALIDATION_EXPANSION; MULTI_ACTOR_CASE    MEDIUM    INDEXED_ONLY    Needs factual harvest to distinguish pilot action, ground setup and coordination.
REAL-EVENT-0013    Aeróleo Táxi Aéreo S-76 — autorotation to water en route to P-32    pdf24_merged-5.pdf / pdf24_merged-6.pdf    TBD    Sikorsky S-76    Offshore helicopter transport    En route to offshore platform    TRANSMISSION_OIL_PRESSURE; AUTOROTATION; DITCHING; EMERGENCY_RESPONSE    INVESTIGATION_EXCERPT / SECONDARY_ARTICLE    PRECONDITIONS_CATALOG_SOURCE; RISK_LAYER_FUTURE_SOURCE    MEDIUM    INDEXED_ONLY    More likely risk/barrier/emergency handling pattern than baseline causal candidate.
REAL-EVENT-0014    BHS S-76 Roncador 2004 — post-takeoff loss of height / ditching report    pdf24_merged-5.pdf / pdf24_merged-6.pdf    TBD    Sikorsky S-76    Offshore helicopter transport    Post-takeoff    DITCHING; LOW_HEIGHT; OFFSHORE_PLATFORM_DEPARTURE; INSUFFICIENT_DETAIL    SECONDARY_ARTICLE / UNKNOWN_SOURCE_TYPE    REFERENCE_ONLY; FUTURE_REVIEW    LOW    INDEXED_ONLY    Needs source-quality review before any factual harvest.
REAL-EVENT-0015    S-76B PH-KHB — offshore/platform approach accident material    pdf24_merged-3.pdf    TBD    Sikorsky S-76B    Offshore helicopter transport    Offshore/platform approach    OFFSHORE_HELIDECK_APPROACH; VISIBILITY_LIMITATION; APPROACH_CONTROL    INVESTIGATION_EXCERPT / BULLETIN_SUMMARY    VALIDATION_EXPANSION    MEDIUM    INDEXED_ONLY    Promising but requires stronger source/page extraction.
REAL-EVENT-0016    Cessna 500 N8DX — Garmin/autopilot confusion and loss of control    pdf24_merged.pdf    TBD    Cessna 500 Citation    Private IFR flight    Descent / approach    AUTOMATION_MODE_CONFUSION; AVIONICS_INTERFACE; LOSS_OF_CONTROL; SINGLE_PILOT_WORKLOAD    SECONDARY_ARTICLE / INVESTIGATION_EXCERPT    ADVERSARIAL_CASE; VALIDATION_EXPANSION    HIGH    INDEXED_ONLY    Strong automation-cognition case; useful beyond helicopter domain.
REAL-EVENT-0017    Airbus A320-214 G-EZWM — AAIB correspondence investigation    pdf24_merged-3.pdf    TBD    Airbus A320-214    Commercial air transport    TBD    COMMERCIAL_AIR_TRANSPORT; FUTURE_TRIAGE    BULLETIN_SUMMARY    INDEX_ONLY; FUTURE_TRIAGE    LOW    INDEXED_ONLY    Listed in AAIB bulletin; details pending before usefulness can be assessed.
REAL-EVENT-0018    Boeing 737-8AS EI-EFB — AAIB correspondence investigation    pdf24_merged-3.pdf    TBD    Boeing 737-8AS    Commercial air transport    TBD    COMMERCIAL_AIR_TRANSPORT; FUTURE_TRIAGE    BULLETIN_SUMMARY    INDEX_ONLY; FUTURE_TRIAGE    LOW    INDEXED_ONLY    Listed in AAIB bulletin; details pending before usefulness can be assessed.
REAL-EVENT-0019    Percival P66 Pembroke C Mk1 G-BNPH — AAIB correspondence investigation    pdf24_merged-3.pdf    TBD    Percival P66 Pembroke C Mk1    General / historic aircraft operation    TBD    FUTURE_TRIAGE; AIRCRAFT_ACCIDENT    BULLETIN_SUMMARY    INDEX_ONLY; FUTURE_TRIAGE    LOW    INDEXED_ONLY    Listed in AAIB bulletin; details pending before usefulness can be assessed.
REAL-EVENT-0020    Cessna P210N N210SH — AAIB correspondence investigation    pdf24_merged-3.pdf    TBD    Cessna P210N    General aviation    TBD    GENERAL_AVIATION; FUTURE_TRIAGE    BULLETIN_SUMMARY    INDEX_ONLY; FUTURE_TRIAGE    LOW    INDEXED_ONLY    Listed in AAIB bulletin; details pending before usefulness can be assessed.

---

## 5. Recommended first events for full factual harvest

The first full factual sheets should focus on high-confidence, methodologically rich events:

REAL-EVENT-0001 — S-92A CHO Thebaud
REAL-EVENT-0002 — S-76C++ G-WIWI Peasmarsh
REAL-EVENT-0003 — S-76C+ Tofino
REAL-EVENT-0004 — S-76C+ EC-JES Vigo
REAL-EVENT-0005 — S-76++ PK-TVY Soehanah
REAL-EVENT-0006 — S-76C++ 5N-BQJ Bristow Nigeria
REAL-EVENT-0010 — S-76C++ N798P PHI helideck rollover
REAL-EVENT-0016 — Cessna 500 N8DX automation/autopilot confusion

These events provide a useful first mix of:

perception issues
objective/continuation questions
action execution issues
environmental preconditions
automation/technology preconditions
crew coordination
warning response
offshore helideck operations
multi-actor ambiguity
adversarial classification cases

---

## 6. Restrictions

Do not use this index to create fixture JSONs.

Do not infer P/O/A directly from this index.

Do not treat the source report's conclusions as SERA expected values.

Do not treat HFACS tags as SERA outputs.

Do not promote any event to baseline without separate factual harvest, SERA hypothesis draft and human review.

---

## 7. Next step

Recommended next phase:

A4+R-6 — Real Event Factual Harvest — First 5 Events

Suggested first five:

REAL-EVENT-0001
REAL-EVENT-0002
REAL-EVENT-0003
REAL-EVENT-0004
REAL-EVENT-0006

These five should receive complete neutral factual sheets before any SERA hypothesis is used for candidates.

