# SERA Engine vNext Opus Corpus Candidate Selection A4R118 v0.2.0

Status: OPUS_CORPUS_CANDIDATE_SELECTION
Phase: A4+R-118
DOCS_ONLY
CORPUS_PREPARATION_ONLY
NO_SERA_CLASSIFICATION
NO_RELEASE
NO_DOWNSTREAM

## Scope
Selection of candidates from the TXT corpus for Opus external audit. Maximum 20 candidates across categories. Opus will recommend which deserve full-axis trace — it will NOT classify SERA definitively.

## Selection Rules
- Avoid duplicating events already well-analyzed in A4R115, except for comparison.
- Prefer candidates NOT in A4R115 to maximize new discovery value.
- Balance across aircraft types (airliner, regional, helicopter, cargo).
- Balance across agencies and decades.
- Recovered corpus candidates must come from previously PARKED entries.

## Candidates Already in A4R115 (EXCLUDED from this pack, except for comparison)
| eventId | A4R115 status | exclusion reason |
|---|---|---|
| UPS-1354 | READY_FOR_AUTHOR_REVIEW | Already well-traced; structural reference exists |
| COLGAN-3407 | READY_FOR_AUTHOR_REVIEW | Already well-traced |
| US-AIRWAYS-1549 | READY_FOR_AUTHOR_REVIEW | Included for nominal comparison only |
| AMERICAN-1420 | REQUIRES_SUBSTANTIVE_PATCH | Included for overclassification audit only |
| ASIANA-214 | HOLD_OVERCLASSIFICATION_RISK | Excluded; too similar to other CFIT picks |
| AMERICAN-965 | HOLD_OVERCLASSIFICATION_RISK | Excluded; too similar to other CFIT picks |

---

## Category 1: Full-Axis Strong Candidates (max 5)

### FA-01 | SWISSAIR-111
| field | value |
|---|---|
| eventId | SWISSAIR-111 |
| source TXT | a4r111-full-pool-txt/11__2003__TSB-Canada__MD-11__Air-Transportation-Safety-Investigation-Repor.txt |
| why selected | Not in A4R115. Large official TSB report (1MB). Very strong A-signal (563 hits). Strong multi-axis (P/O/A=52/219/563). MD-11 widebody fire/smoke event. |
| strongest axis | A |
| weakest axis | P |
| expected Opus question | Is this event suitable for a full-axis trace, and does the in-flight fire/smoke context create unique P/O/A branch challenges? |
| overclassification risk | MEDIUM — A-axis strong but P-axis may be limited by smoke/incapacitation evidence gaps |
| competes with A4R115? | No |

### FA-02 | USAIR-427
| field | value |
|---|---|
| eventId | USAIR-427 |
| source TXT | a4r111-new50-pool-txt/NEW50-2__1999__NTSB-USA__Boeing-737-300__USAir-Flight-427-Loss-of-Control-Boeing-73.txt |
| why selected | Not in A4R115. Highest source hits in corpus (978). Very strong A-signal (582). Rudder hardover/PCU failure with crew response. B737 classic. |
| strongest axis | A |
| weakest axis | P |
| expected Opus question | Is this event suitable for full-axis trace given the technical-dominant (PCU) component — or should it be held as HELD_TECHNICAL_DOMINANT? |
| overclassification risk | HIGH — risk of classifying technical failure as crew failure. Opus must assess HELD_TECHNICAL_DOMINANT. |
| competes with A4R115? | No |

### FA-03 | HELIOS-522
| field | value |
|---|---|
| eventId | HELIOS-522 |
| source TXT | a4r111-new50-pool-txt/NEW50-3__2006__AAIASB-Greece__Boeing-737-31S__Accident-Report-11-2006-Helios-Airways-Flig.txt |
| why selected | Not in A4R115. Unique hypoxia event. Strong P-signal (210). Pressurization/cabin-altitude failure leading to crew incapacitation. |
| strongest axis | P |
| weakest axis | O |
| expected Opus question | Is P-B (sensory failure from hypoxia) appropriate, and does O-axis collapse when crew is incapacitated? |
| overclassification risk | MEDIUM — P-axis path well-supported but O-axis may need UNRESOLVED |
| competes with A4R115? | No |

### FA-04 | ATLAS-3591
| field | value |
|---|---|
| eventId | ATLAS-3591 |
| source TXT | a4r111-new50-pool-txt/NEW50-1__2020__NTSB-USA__Boeing-767-375BCF__Atlas-Air-Flight-3591-Rapid-Descent-and-Cra.txt |
| why selected | Not in A4R115. Recent cargo event (2020). Go-around with spatial disorientation leading to in-flight breakup. Strong P-signal from disorientation. |
| strongest axis | P |
| weakest axis | O |
| expected Opus question | Is the go-around-disorientation sequence a P-D/P-F boundary case, and does O-axis show objective failure or routine intent? |
| overclassification risk | MEDIUM — spatial disorientation is well-documented but O-axis intent is routine |
| competes with A4R115? | No |

### FA-05 | CROSSAIR-3597
| field | value |
|---|---|
| eventId | CROSSAIR-3597 |
| source TXT | a4r111-new50-pool-txt/NEW50-4__2002__SUST-Switzerland__Avro-RJ100__Crossair-Flight-3597-Avro-RJ100-HB-IXM-CFI.txt |
| why selected | Not in A4R115. CFIT in IMC during non-precision approach. Very strong O/A signals (219/563). Excellent O-continuation material. |
| strongest axis | A |
| weakest axis | P |
| expected Opus question | Does O-axis continuation-below-minima constitute O-C or O-B? Is A-axis correctly placed at A-F vs A-G? |
| overclassification risk | HIGH — O-C vs O-B boundary is live; continuation below MDA is well-documented but violation/routine split is sensitive |
| competes with A4R115? | Similar to UPS-1354 CFIT but different aircraft/region/approach type; useful for comparison |

---

## Category 2: O-Axis Strong Candidates (max 3)

### O-01 | EXECUFLIGHT-1526
| field | value |
|---|---|
| eventId | EXECUFLIGHT-1526 |
| source TXT | a4r111-full-pool-txt/32__2016__NTSB-USA__Hawker-HS-125-700A__Crash-During-Nonprecision-Instrument-Approach.txt |
| why selected | Strongest O-signal in corpus (259). Charter non-precision approach CFIT. SOP deviation, continued below MDA, crew non-compliance well-documented. |
| strongest axis | O |
| weakest axis | P |
| expected Opus question | Is this the strongest O-axis reference candidate in the corpus for non-precision CFIT continuation? |
| overclassification risk | LOW — O-signal is clear and well-documented |
| competes with A4R115? | Comparable to UPS-1354 O-axis but different operator type (charter vs cargo) |

### O-02 | PINNACLE-3701
| field | value |
|---|---|
| eventId | PINNACLE-3701 |
| source TXT | a4r111-full-pool-txt/33__2007__NTSB-USA__CRJ-200__Crash-of-Pinnacle-Airlines-Flight-3701-CRJ-20.txt |
| why selected | High-altitude stall from non-compliance joyride. Strong O-deviation material (194 hits). Unique objective deviation profile. |
| strongest axis | O |
| weakest axis | P |
| expected Opus question | Is O-C (exceptional violation) the correct classification for intentional altitude deviation, or is O-B (routine) more appropriate given crew culture? |
| overclassification risk | MEDIUM — O-C vs O-B boundary sensitive to crew-intent evidence |
| competes with A4R115? | No |

### O-03 | UNITED-173
| field | value |
|---|---|
| eventId | UNITED-173 |
| source TXT | a4r111-full-pool-txt/21__1979__NTSB-USA__McDonnell-Douglas-DC-8-61__Aircraft-Accident-Report-AAR-79-07-United-A.txt |
| why selected | Classic fuel exhaustion from crew fixation on landing gear. Strong O/A (28/117). Foundational CRM case. 1979 report with CVR data. |
| strongest axis | O |
| weakest axis | P |
| expected Opus question | Does O-axis show O-D (non-violation intent failure) from gear-fixation, and is A-axis A-F or A-D? |
| overclassification risk | LOW — well-documented intent failure, clear O-D path |
| competes with A4R115? | No — different era, aircraft, and failure pattern |

---

## Category 3: A-Axis Strong Candidates (max 3)

### A-01 | UNITED-232
| field | value |
|---|---|
| eventId | UNITED-232 |
| source TXT | a4r111-full-pool-txt/22__1990__NTSB-USA__DC-10-10__Aircraft-Accident-Report-AAR-90-06-United-A.txt |
| why selected | Sioux City DC-10 total hydraulic failure. Crew managed crippled aircraft using differential thrust. Unique A-axis action-selection under extreme constraints. |
| strongest axis | A |
| weakest axis | P |
| expected Opus question | Is A-A (no failure in action selection) correct given the crew's innovative differential-thrust control, or does the crash outcome override nominal A? |
| overclassification risk | MEDIUM — risk of outcome bias overriding appropriate A-A given constraints |
| competes with A4R115? | No |

### A-02 | EASTERN-401
| field | value |
|---|---|
| eventId | EASTERN-401 |
| source TXT | a4r111-full-pool-txt/44__1973__NTSB-USA__Lockheed-L-1011-1__Eastern-Air-Lines-Flight-401-NTSB-PDF-Artef.txt |
| why selected | Classic autopilot/mode-awareness accident. Crew fixated on gear light while autopilot disconnected unnoticed. Foundational A-axis material. |
| strongest axis | A |
| weakest axis | O |
| expected Opus question | Is A-C (slip/lapse/mode error) appropriate for the unnoticed autopilot disconnect, or is this A-B (feedback failure)? |
| overclassification risk | LOW — well-documented mode error, clear A-C path |
| competes with A4R115? | No |

### A-03 | SHK-EMS-2020
| field | value |
|---|---|
| eventId | SHK-EMS-2020 |
| source TXT | a4r111-new50-pool-txt/NEW50-46__2020__SHK-Sweden__EC135-H145-class-EMS-helicopter__RL-2020-06e-Helicopter-emergency-medical-se.txt |
| why selected | Swedish EMS helicopter accident. A-focus with checklist/callout/response signals. Non-NTSB source diversity. Modern helicopter. |
| strongest axis | A |
| weakest axis | P |
| expected Opus question | Does this non-anglosphere helicopter report provide useful A-axis calibration, or is source strength too weak for reference use? |
| overclassification risk | MEDIUM/HIGH — source is MEDIUM; A-signal may not sustain full trace |
| competes with A4R115? | No — different region, aircraft type, and event |

---

## Category 4: Nominal/No-Failure Candidates (max 3)

### N-01 | US-AIRWAYS-1549 (comparison)
| field | value |
|---|---|
| eventId | US-AIRWAYS-1549 |
| source TXT | a4r111-full-pool-txt/39__2010__NTSB-USA__Airbus-A320-214__Aircraft-Accident-Report-AAR-10-03-US-Airwa.txt |
| why selected | A4R115's strongest nominal/no-failure calibration draft. Included for Opus to compare against new candidates. Not a new discovery. |
| strongest axis | O |
| weakest axis | P |
| expected Opus question | Does this remain the best nominal SERA calibration case, or do new candidates provide better no-failure baselines? |
| overclassification risk | LOW |
| competes with A4R115? | Is an A4R115 case — included for comparison only |

### N-02 | SHK-UTILITY-2023
| field | value |
|---|---|
| eventId | SHK-UTILITY-2023 |
| source TXT | a4r111-new50-pool-txt/NEW50-48__2023__SHK-Sweden__Light-utility-helicopter__SHK-2023-10e-Helicopter-accident-at-Enköpin.txt |
| why selected | Swedish light utility helicopter. NOMINAL_O_A candidate per A4R112. Training/utility context where crew failure may not be the primary factor. |
| strongest axis | O |
| weakest axis | P |
| expected Opus question | Can this serve as a nominal O/A reference for non-airline operations, or is source/documentation too weak? |
| overclassification risk | MEDIUM — risk of over-reading nominal path from limited evidence |
| competes with A4R115? | No |

### N-03 | EC225-NORTH-SEA
| field | value |
|---|---|
| eventId | EC225-NORTH-SEA |
| source TXT | a4r111-full-pool-txt/15__2014__AAIB-UK__Eurocopter-EC225-LP__Aircraft-Accident-Report-AAR-2-2014-EC225-L.txt |
| why selected | North Sea EC225 ditchings where main gearbox failure was technical-dominant. Crew followed procedures. Nominal/held-technical boundary. |
| strongest axis | A |
| weakest axis | P |
| expected Opus question | Should this be classified as HELD_TECHNICAL_DOMINANT rather than SERA-nominal, and what threshold separates crew-nominal from technical-dominant? |
| overclassification risk | MEDIUM — risk of conflating nominal crew action with technical-dominant event |
| competes with A4R115? | No |

---

## Category 5: Boundary/Adversarial Candidates (max 3)

### B-01 | KOREAN-AIR-801
| field | value |
|---|---|
| eventId | KOREAN-AIR-801 |
| source TXT | a4r111-full-pool-txt/5__2000__NTSB-USA__Boeing-747-300__Controlled-Flight-Into-Terrain-Korean-Air-Fl.txt |
| why selected | A4R112 BOUNDARY_CANDIDATE. Strong P/O/A (243/340/330). O-B vs O-C boundary is the critical question. Cultural/Crew Resource Management overlay. |
| strongest axis | O |
| weakest axis | A |
| expected Opus question | Is the O-axis correctly at O-B (routine violation) or O-C (exceptional violation)? Can this serve as the canonical O-B/O-C boundary case? |
| overclassification risk | HIGH — O overclassification is the explicit reason this is a boundary candidate |
| competes with A4R115? | No — not in A4R115 |

### B-02 | COUGAR-S92A
| field | value |
|---|---|
| eventId | COUGAR-S92A |
| source TXT | a4r111-recovered-pool-txt/34__2011__TSB-Canada__Sikorsky-S-92A__TSB-A09A0016-Cougar-S-92A.txt |
| why selected | Offshore helicopter main gearbox failure and ditching. Boundary adjacent to Turøy (different failure mode, similar aircraft type). |
| strongest axis | A |
| weakest axis | P |
| expected Opus question | Does this event challenge the Turøy classification boundaries, and should it be held as HELD_TECHNICAL_DOMINANT? |
| overclassification risk | MEDIUM — risk of over-reading crew action when MGB failure is technical-dominant |
| competes with A4R115? | Adjacent to Turøy theme but different event |

### B-03 | AS350-GRIFFITH
| field | value |
|---|---|
| eventId | AS350-GRIFFITH |
| source TXT | a4r111-recovered-pool-txt/27__2024__TSB-Canada__Airbus-AS350-B2__TSB-A21C0038-AS350-Griffith-Island.txt |
| why selected | Light single-engine helicopter VFR-into-terrain. Tests SERA applicability at the light-aircraft/helicopter boundary. |
| strongest axis | P |
| weakest axis | A |
| expected Opus question | Does SERA scale appropriately to light single-pilot helicopter operations, or is this a method-boundary case? |
| overclassification risk | HIGH — SERA may over-structure a single-pilot VFR helicopter event |
| competes with A4R115? | No — different scale and operation type |

---

## Category 6: Recovered Corpus Candidates (max 3)

### RC-01 | AIR-CANADA-624
| field | value |
|---|---|
| eventId | AIR-CANADA-624 |
| source TXT | a4r111-recovered-pool-txt/8__2017__TSB-Canada__Airbus-A320-211__TSB-A15H0002-Air-Canada-A320-Halifax.txt |
| why selected | Previously PARKED in A4R112. Official TSB report now recovered (509KB). Non-precision approach undershoot. Strong O/A. Airline context. |
| strongest axis | O |
| weakest axis | P |
| expected Opus question | Is this event suitable for full-axis trace, and does it compete with or complement UPS-1354 as a non-precision CFIT reference? |
| overclassification risk | MEDIUM — O-axis continuation needs careful O-B/O-C boundary assessment |
| competes with A4R115? | Complements UPS-1354 (different approach type, region, result) |

### RC-02 | FIRST-AIR-6560
| field | value |
|---|---|
| eventId | FIRST-AIR-6560 |
| source TXT | a4r111-recovered-pool-txt/9__2014__TSB-Canada__Boeing-737-210C__TSB-A11H0002-First-Air-6560-Resolute-Bay.txt |
| why selected | Previously PARKED. Official TSB CFIT report (537KB). GPWS/EGPWS signals. Arctic combi-737. Unique environment and GPWS-response P/A material. |
| strongest axis | P |
| weakest axis | O |
| expected Opus question | Is P-F/P-G well-supported by the GPWS warning sequence, and is the late go-around attempt sufficient for A-axis action assessment? |
| overclassification risk | MEDIUM — GPWS response timing drives P-G vs P-F branch |
| competes with A4R115? | No — unique arctic environment |

### RC-03 | ORNGE-S76A
| field | value |
|---|---|
| eventId | ORNGE-S76A |
| source TXT | a4r111-recovered-pool-txt/12__2016__TSB-Canada__Sikorsky-S-76A__TSB-A13H0001-Ornge-S-76A-Moosonee.txt |
| why selected | Previously PARKED. Night HEMS CFIT (584KB). Rotorcraft. Unique P-material from night visual disorientation. |
| strongest axis | P |
| weakest axis | A |
| expected Opus question | Is the night HEMS disorientation a clear P-F (ambiguous information/illusory) case, and does this event help calibrate rotorcraft SERA traces? |
| overclassification risk | MEDIUM — P-F vs P-G boundary in night visual conditions |
| competes with A4R115? | No |

---

## Selection Summary

| category | max | selected | candidate ids |
|---|---|---|---|
| Full-Axis Strong | 5 | 5 | SWISSAIR-111, USAIR-427, HELIOS-522, ATLAS-3591, CROSSAIR-3597 |
| O-Axis Strong | 3 | 3 | EXECUFLIGHT-1526, PINNACLE-3701, UNITED-173 |
| A-Axis Strong | 3 | 3 | UNITED-232, EASTERN-401, SHK-EMS-2020 |
| Nominal/No-Failure | 3 | 3 | US-AIRWAYS-1549, SHK-UTILITY-2023, EC225-NORTH-SEA |
| Boundary/Adversarial | 3 | 3 | KOREAN-AIR-801, COUGAR-S92A, AS350-GRIFFITH |
| Recovered Corpus | 3 | 3 | AIR-CANADA-624, FIRST-AIR-6560, ORNGE-S76A |
| **TOTAL** | **20** | **20** | |

## Agency diversity
- NTSB (USA): 8 candidates
- TSB (Canada): 5 candidates
- AAIASB (Greece): 1 candidate
- SUST (Switzerland): 1 candidate
- AAIB (UK): 1 candidate
- AIBN (Norway): 1 candidate (via EC225)
- SHK (Sweden): 2 candidates
- CENIPA/ASN (Brazil): 0 (excluded as secondary source)

## Aircraft type diversity
- Airliner (jet): 9 (B777, A320, B737, MD-11, B747, B767, DC-8, DC-10, MD-82)
- Regional turboprop: 0 (none selected; SIMMONS-4184 was alternate)
- Cargo: 1 (Atlas 3591 B767)
- Helicopter: 5 (EC225, S-92A, AS350, EC135, S-76A)
- Business jet: 1 (Execuflight HS-125)

## Notes
- Opus is instructed to recommend trace/no-trace, not to classify SERA codes.
- All candidates flagged with overclassification risks for Opus to assess.
- A4R115 comparison limited to US-AIRWAYS-1549 (nominal baseline).
- Recovered corpus TXTs were all PARKED in A4R112; their recovery enables first-time audit.
