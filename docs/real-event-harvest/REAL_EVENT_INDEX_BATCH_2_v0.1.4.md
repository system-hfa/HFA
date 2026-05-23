# Real Event Index — Batch 2 v0.1.4
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-13 — Real Event Index Harvest — Batch 2  
Scope: second index of real events for future HFA/SERA factual harvest  
Non-scope: fixture creation, expected P/O/A assignment, SERA hypothesis approval, engine changes, baseline promotion, risk-layer redesign
---
## 1. Purpose
This document records the second batch of real accident/incident events selected from the HFA project source corpora and official investigation sources for future SERA validation work.
This is an index only.
It does not create fixtures.
It does not assign expected P/O/A values.
It does not approve candidates.
It does not import report conclusions, HFACS labels, probable causes, findings or recommendations as SERA outputs.

---

## 2. Batch 2 selection principle

Batch 2 expands the corpus beyond helicopter DVE/night-approach cases.

It prioritizes:

* automation confusion;
* checklist/procedure events;
* CFIT/TAWS warning response;
* runway excursion / approach continuation;
* maintenance or unsafe-condition-dominant cases;
* crew coordination cases;
* general aviation and commercial transport events;
* cases useful for insufficient-evidence testing.

The purpose is to broaden future validation before creating any JSON candidates.

---

## 3. Status values used

All events in this batch remain:

INDEXED_ONLY
NOT_EXPECTED_VALUE
NO_FIXTURE_JSON

No event is approved as candidate or fixture.

---

## 4. Batch 2 event index

ID    Event title    Source file / corpus    Page/range    Aircraft/system    Operation type    Phase    Event theme    Source type    Suitability    Confidence    Status    Notes
REAL-EVENT-0021    Cessna 500 N8DX — Garmin/autopilot confusion and loss of control    pdf24_merged.pdf / external official source pending    TBD    Cessna 500 Citation    Private IFR flight    Descent / approach    AUTOMATION_MODE_CONFUSION; AVIONICS_INTERFACE; LOSS_OF_CONTROL; SINGLE_PILOT_WORKLOAD    INVESTIGATION_EXCERPT / SECONDARY_ARTICLE    ADVERSARIAL_CASE; VALIDATION_EXPANSION    HIGH    INDEXED_ONLY    Strong non-helicopter automation cognition case; useful for P/A boundary.
REAL-EVENT-0022    S-76C++ N798P PHI — rollover on Vioska Knoll 956-A helideck    pdf24_merged.pdf    TBD    Sikorsky S-76C++    Offshore helideck transport    Helideck landing / reposition    OFFSHORE_HELIDECK_APPROACH; HELIDECK_ROLLOVER; WIND; GROUND_TAXI_REPOSITION    INVESTIGATION_EXCERPT / SECONDARY_ARTICLE    VALIDATION_EXPANSION; HELIDECK_CASE    HIGH    INDEXED_ONLY    Strong helideck handling/ground reposition case.
REAL-EVENT-0023    S-76++ PK-TVY Soehanah rig — tumble right near touchdown    pdf24_merged-3.pdf    TBD    Sikorsky S-76++    Offshore helideck transport    Helideck landing / touchdown    OFFSHORE_HELIDECK_APPROACH; LOSS_OF_CONTROL; CREW_COORDINATION; MULTI_ACTOR    OFFICIAL_REPORT / BULLETIN_SUMMARY    MULTI_ACTOR_CASE; VALIDATION_EXPANSION    MEDIUM    INDEXED_ONLY    Candidate for control-handover and helideck touchdown review.
REAL-EVENT-0024    S-76C+ 5N-BGD Lagos lagoon — control pushrod separation    pdf24_merged-2.pdf / pdf24_merged-3.pdf    TBD    Sikorsky S-76C+    Offshore / transport    En route / approach unknown    MECHANICAL_FAILURE; MAINTENANCE; LOSS_OF_CONTROL; BARRIER_DESIGN    OFFICIAL_REPORT / SECONDARY_ARTICLE    PRECONDITIONS_CATALOG_SOURCE; RISK_LAYER_FUTURE_SOURCE    HIGH    INDEXED_ONLY    Unsafe-condition-dominant; useful for not forcing human active failure.
REAL-EVENT-0025    S-76C+ PK-FUP Heavylift Indonesia — servo pushrod / rod-end separation    pdf24_merged-2.pdf    TBD    Sikorsky S-76C+    Helicopter operation    In flight    MECHANICAL_FAILURE; MAINTENANCE; BARRIER_DESIGN; LOSS_OF_CONTROL    INVESTIGATION_EXCERPT / SECONDARY_ARTICLE    PRECONDITIONS_CATALOG_SOURCE; VALIDATION_EXPANSION    HIGH    INDEXED_ONLY    Maintenance/system barrier event; likely unsafe-condition dominant.
REAL-EVENT-0026    S-76C++ N748P PHI — fatal bird strike / windshield penetration    pdf24_merged-2.pdf    TBD    Sikorsky S-76C++    Offshore helicopter transport    En route / cruise    BIRD_STRIKE; EMERGENCY_RESPONSE; CERTIFICATION; CREW_WORKLOAD    INVESTIGATION_EXCERPT / SECONDARY_ARTICLE    RISK_LAYER_FUTURE_SOURCE; PRECONDITIONS_CATALOG_SOURCE    HIGH    INDEXED_ONLY    Strong barrier/certification/risk-layer source; P/O/A may not be primary.
REAL-EVENT-0027    S-76C+ N860AL Bristow US — landing gear collapse after pothole strike    pdf24_merged.pdf    TBD    Sikorsky S-76C+    Offshore support / airport ground movement    Taxi    GROUND_TAXI; INFRASTRUCTURE_HAZARD; LANDING_GEAR_COLLAPSE    SECONDARY_ARTICLE    PRECONDITIONS_CATALOG_SOURCE; REFERENCE_ONLY    MEDIUM    INDEXED_ONLY    Hazard/barrier case; useful for insufficient active-failure testing.
REAL-EVENT-0028    S-76C+ HL9661 Heli Korea — tail rotor strike on fuel bowser    pdf24_merged-2.pdf    TBD    Sikorsky S-76C+    Firefighting / utility helicopter    Landing / ground proximity    LANDING_SITE_LAYOUT; GROUND_COORDINATION; TAIL_ROTOR_STRIKE; MULTI_ACTOR    SECONDARY_ARTICLE / INVESTIGATION_EXCERPT    MULTI_ACTOR_CASE; VALIDATION_EXPANSION    MEDIUM    INDEXED_ONLY    Needs source extraction to separate pilot action, ground setup and coordination.
REAL-EVENT-0029    Aeroleo Taxi Aereo S-76 — autorotation to water en route to P-32    pdf24_merged-5.pdf / pdf24_merged-6.pdf    TBD    Sikorsky S-76    Offshore helicopter transport    En route to offshore platform    TRANSMISSION_OIL_PRESSURE; AUTOROTATION; DITCHING; EMERGENCY_RESPONSE    INVESTIGATION_EXCERPT / SECONDARY_ARTICLE    PRECONDITIONS_CATALOG_SOURCE; RISK_LAYER_FUTURE_SOURCE    MEDIUM    INDEXED_ONLY    Emergency handling / system degradation source; likely not baseline P/O/A first.
REAL-EVENT-0030    BHS S-76 Roncador 2004 — post-takeoff loss of height / ditching report    pdf24_merged-5.pdf / pdf24_merged-6.pdf    TBD    Sikorsky S-76    Offshore helicopter transport    Post-takeoff    DITCHING; LOW_HEIGHT; OFFSHORE_PLATFORM_DEPARTURE; INSUFFICIENT_DETAIL    SECONDARY_ARTICLE / UNKNOWN_SOURCE_TYPE    REFERENCE_ONLY; FUTURE_REVIEW    LOW    INDEXED_ONLY    Keep for source-quality review; not candidate-ready.
REAL-EVENT-0031    S-76B PH-KHB — offshore/platform approach accident material    pdf24_merged-3.pdf    TBD    Sikorsky S-76B    Offshore helicopter transport    Offshore/platform approach    OFFSHORE_HELIDECK_APPROACH; VISIBILITY_LIMITATION; APPROACH_CONTROL    INVESTIGATION_EXCERPT / BULLETIN_SUMMARY    VALIDATION_EXPANSION    MEDIUM    INDEXED_ONLY    Promising approach case; requires source/page extraction.
REAL-EVENT-0032    Airbus A320-214 G-EZWM — AAIB correspondence investigation    pdf24_merged-3.pdf    TBD    Airbus A320-214    Commercial air transport    TBD    COMMERCIAL_AIR_TRANSPORT; FUTURE_TRIAGE    BULLETIN_SUMMARY    INDEX_ONLY; FUTURE_TRIAGE    LOW    INDEXED_ONLY    Keep for later triage if details support SERA use.
REAL-EVENT-0033    Boeing 737-8AS EI-EFB — AAIB correspondence investigation    pdf24_merged-3.pdf    TBD    Boeing 737-8AS    Commercial air transport    TBD    COMMERCIAL_AIR_TRANSPORT; FUTURE_TRIAGE    BULLETIN_SUMMARY    INDEX_ONLY; FUTURE_TRIAGE    LOW    INDEXED_ONLY    Keep for later triage if details support SERA use.
REAL-EVENT-0034    Percival P66 Pembroke C Mk1 G-BNPH — AAIB correspondence investigation    pdf24_merged-3.pdf    TBD    Percival P66 Pembroke C Mk1    General / historic aircraft operation    TBD    FUTURE_TRIAGE; AIRCRAFT_ACCIDENT    BULLETIN_SUMMARY    INDEX_ONLY; FUTURE_TRIAGE    LOW    INDEXED_ONLY    Low priority until factual detail improves.
REAL-EVENT-0035    Cessna P210N N210SH — AAIB correspondence investigation    pdf24_merged-3.pdf    TBD    Cessna P210N    General aviation    TBD    GENERAL_AVIATION; FUTURE_TRIAGE    BULLETIN_SUMMARY    INDEX_ONLY; FUTURE_TRIAGE    LOW    INDEXED_ONLY    Low priority until factual detail improves.
REAL-EVENT-0036    A320 unstable approach / runway excursion candidate from project corpora    project corpora / source pending    TBD    Airbus A320 family    Commercial air transport    Approach / landing    UNSTABLE_APPROACH; PLAN_CONTINUATION; RUNWAY_EXCURSION    UNKNOWN_SOURCE_TYPE    FUTURE_TRIAGE; VALIDATION_EXPANSION    LOW    INDEXED_ONLY    Placeholder requiring source identification before use.
REAL-EVENT-0037    TAWS/EGPWS warning response event candidate from project corpora    project corpora / source pending    TBD    TBD    TBD    Approach / descent    EGPWS_TAWS_ALERT; WARNING_RESPONSE; CFIT_NEAR_MISS    UNKNOWN_SOURCE_TYPE    FUTURE_TRIAGE; ADVERSARIAL_CASE    LOW    INDEXED_ONLY    Placeholder for warning-response pattern search.
REAL-EVENT-0038    Checklist omission event candidate from project corpora    project corpora / source pending    TBD    TBD    TBD    Preflight / approach / abnormal    CHECKLIST_OMISSION; PROCEDURE_EXECUTION; TASK_SATURATION    UNKNOWN_SOURCE_TYPE    FUTURE_TRIAGE; VALIDATION_EXPANSION    LOW    INDEXED_ONLY    Placeholder for action-axis/cognitive precondition pattern.
REAL-EVENT-0039    Crew coordination / authority gradient event candidate from HFACS corpora    HFACS corpus / source pending    TBD    TBD    TBD    TBD    CREW_COORDINATION; AUTHORITY_GRADIENT; MONITORING_BREAKDOWN    HFACS_ANALYZED_CASE / UNKNOWN_SOURCE_TYPE    FUTURE_TRIAGE; MULTI_ACTOR_CASE    LOW    INDEXED_ONLY    Use only facts; do not import HFACS classification as SERA output.
REAL-EVENT-0040    Insufficient-evidence event candidate for conservative refusal testing    project corpora / source pending    TBD    TBD    TBD    TBD    INSUFFICIENT_EVIDENCE_CASE; UNCERTAIN_ACTOR; UNCLEAR_ESCAPE_POINT    UNKNOWN_SOURCE_TYPE    INSUFFICIENT_EVIDENCE_CASE; REFERENCE_ONLY    LOW    INDEXED_ONLY    Useful to test refusal/uncertainty behavior, not candidate expected values.

---

## 5. Recommended next candidates for deeper extraction

Highest priority from Batch 2:

REAL-EVENT-0021 — Cessna 500 N8DX
REAL-EVENT-0022 — S-76C++ N798P helideck rollover
REAL-EVENT-0023 — S-76++ PK-TVY Soehanah rig
REAL-EVENT-0024 — S-76C+ 5N-BGD control pushrod separation
REAL-EVENT-0028 — S-76C+ HL9661 tail rotor strike on fuel bowser

Rationale:

These provide broader coverage of automation, helideck handling, control handover, unsafe-condition-dominant mechanical cases and multi-actor ground coordination.

---

## 6. Restrictions

Do not use this index to create fixture JSONs.

Do not infer P/O/A directly from this index.

Do not treat report conclusions as SERA expected values.

Do not treat HFACS tags as SERA outputs.

Do not promote any event to baseline without separate factual harvest, SERA hypothesis draft and human review.

---

## 7. Next step

Recommended next phase:

A4+R-14 — Deep Factual Extraction for Selected Batch 2 Events

Suggested first set:

REAL-EVENT-0021
REAL-EVENT-0022
REAL-EVENT-0023
REAL-EVENT-0024
REAL-EVENT-0028
