# SERA Engine vNext TXT Corpus P/O/A Signal Screening A4R118 v0.2.0

Status: TXT_CORPUS_POA_SIGNAL_SCREENING
Phase: A4+R-118
DOCS_ONLY
CORPUS_PREPARATION_ONLY
NO_SERA_CLASSIFICATION
NO_RELEASE
NO_DOWNSTREAM

## Scope
Signal screening of all content-bearing TXTs for P, O, A axis signals and source strength, to inform Opus candidate selection (Task 3).

## Methodology
Each candidate screened for factual signal presence without closing SERA codes:
- **P signals**: failed-to-notice, did-not-notice, did-not-recognize, failed-to-monitor, visual-reference, warning, EGPWS, GPWS, TAWS, airspeed, altitude, mode-awareness, FMA, ambiguous, disorientation, incapacitation, hypoxia
- **O signals**: continued-approach, go-around, unstable-approach, SOP, procedure, deviation, non-compliance, decision-altitude, minimum-descent-altitude, continued-below, accepted, planned, decided, expedite, risk
- **A signals**: checklist, callout, mode-selection, selected, armed, disconnected, control-input, wrong-runway, flap, gear, spoiler, speedbrake, thrust, response, stick-shaker, GPWS-response, executed, omitted
- **Source signals**: CVR, FDR, DFDR, QAR, cockpit-voice, flight-data, transcript, parameter, recorded

## Signal strength legend
- **HIGH**: Multiple direct signal hits across the axis, well-documented in source
- **MEDIUM**: Some signal hits, partially documented, inferable from context
- **LOW**: Few or weak signal hits, mostly inferable
- **NONE**: No meaningful signal found for that axis

## Source strength legend
- **HIGH**: Official investigation report, CVR/FDR data available, strong documentation
- **MEDIUM**: Official report but limited documentation or CVR/FDR gaps
- **LOW**: HTML extract, secondary source, summary-only, or very short text
- **INSUFFICIENT**: Form-feed only, empty, or unextractable

---

## Full-Pool Signal Screening

### UC-001 | Colgan Air 3407 | 1__2010__NTSB-USA__DHC-8-402-Q400
| metric | value |
|---|---|
| P_signalStrength | HIGH |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-monitor, airspeed, altitude, mode-awareness, warning, stick-shaker |
| O_signals | continued-approach, SOP, procedure, deviation, risk |
| A_signals | checklist, callout, mode-selection, control-input, flap, gear, thrust, response, stick-shaker |
| source_signals | CVR, FDR, flight-data, transcript, recorded, parameter |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | A4R115 traced; strong multi-axis; P-G/O-A/A-F in review. Already well-analyzed but useful for Opus calibration comparison. |

### UC-002 | Asiana 214 | 2__2014__NTSB-USA__Boeing-777-200ER
| metric | value |
|---|---|
| P_signalStrength | HIGH |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-monitor, visual-reference, airspeed, altitude, mode-awareness, FMA, ambiguous |
| O_signals | continued-approach, go-around, unstable-approach, SOP, procedure, deviation, decision-altitude |
| A_signals | checklist, callout, mode-selection, selected, flap, gear, thrust, response, executed |
| source_signals | CVR, FDR, flight-data, transcript, recorded, parameter |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | In A4R115 with HOLD_OVERCLASSIFICATION_RISK. Strong P-D/P-F boundary candidate. |

### UC-003 | UPS 1354 | 3__2014__NTSB-USA__Airbus-A300-600F
| metric | value |
|---|---|
| P_signalStrength | HIGH |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, did-not-notice, altitude, warning, EGPWS, mode-awareness, visual-reference |
| O_signals | continued-approach, unstable-approach, SOP, procedure, deviation, decision-altitude, continued-below |
| A_signals | checklist, callout, mode-selection, selected, flap, gear, thrust, response, GPWS-response, executed, omitted |
| source_signals | CVR, FDR, DFDR, flight-data, transcript, parameter, recorded |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | A4R115 traced and READY_FOR_AUTHOR_REVIEW. Best non-precision approach full-axis reference. |

### UC-004 | American 1420 | 4__2001__NTSB-USA__MD-82
| metric | value |
|---|---|
| P_signalStrength | MEDIUM |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-monitor, visual-reference, warning, airspeed, altitude, disorientation |
| O_signals | continued-approach, SOP, procedure, deviation, expedite, risk, decided |
| A_signals | checklist, spoiler, speedbrake, thrust, response, gear, flap, executed, omitted |
| source_signals | CVR, FDR, flight-data, transcript, recorded |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | A4R115 traced; REQUIRES_SUBSTANTIVE_PATCH. O-C overclassification risk. Boundary between violation types. |

### UC-005 | Korean Air 801 | 5__2000__NTSB-USA__Boeing-747-300
| metric | value |
|---|---|
| P_signalStrength | HIGH |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, did-not-recognize, visual-reference, warning, GPWS, altitude, mode-awareness |
| O_signals | continued-approach, SOP, procedure, deviation, non-compliance, decision-altitude, minimum-descent-altitude, continued-below |
| A_signals | checklist, callout, mode-selection, selected, flap, gear, thrust, response, GPWS-response, omitted |
| source_signals | CVR, FDR, flight-data, transcript, recorded |
| likelyUse | BOUNDARY_CANDIDATE |
| notes | A4R112 boundary candidate. HIGH O-overclassification risk. Strong for O-B vs O-C boundary analysis. |

### UC-006 | Comair 5191 | 6__2007__NTSB-USA__CRJ-100
| metric | value |
|---|---|
| P_signalStrength | HIGH |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, did-not-recognize, visual-reference, ambiguous, disorientation |
| O_signals | SOP, procedure, deviation, planned, decided |
| A_signals | checklist, callout, wrong-runway, flap, thrust, executed |
| source_signals | CVR, FDR, flight-data, transcript |
| likelyUse | P_CANDIDATE |
| notes | Scoped as P_REFERENCE_CANDIDATE_ONLY per A4R111 governance. Wrong-runway takeoff. |

### UC-011 | Swissair 111 | 11__2003__TSB-Canada__MD-11
| metric | value |
|---|---|
| P_signalStrength | HIGH |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, warning, airspeed, altitude, disorientation |
| O_signals | SOP, procedure, deviation, decided, risk |
| A_signals | checklist, callout, mode-selection, selected, thrust, response, executed, omitted |
| source_signals | CVR, FDR, flight-data, transcript, recorded, parameter |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | Large TXT (1MB). Very strong A-count (563). Not in A4R115. Fresh full-axis candidate. |

### UC-015 | North Sea EC225 Ditchings | 15__2014__AAIB-UK__Eurocopter-EC225-LP
| metric | value |
|---|---|
| P_signalStrength | HIGH |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, warning, airspeed, altitude, disorientation |
| O_signals | SOP, procedure, decided, risk, planned |
| A_signals | checklist, callout, control-input, thrust, response, executed |
| source_signals | CVR, FDR, flight-data, recorded, parameter |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | Rotorcraft offshore. Not in A4R115. Strong A-count (443). Unique event type. |

### UC-018 | Turøy LN-OJF | 18__2018__AIBN-Norway__Airbus-EC225-LP
| metric | value |
|---|---|
| P_signalStrength | HIGH |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, warning, airspeed, altitude, disorientation |
| O_signals | SOP, procedure, decided, risk |
| A_signals | checklist, callout, mode-selection, control-input, thrust, response, executed, omitted |
| source_signals | CVR, FDR, flight-data, recorded, parameter |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | Highest A-count in corpus (771). Rotorcraft. Duplicate of UC-071/NEW50-23. Use one only. |

### UC-021 | United 173 | 21__1979__NTSB-USA__McDonnell-Douglas-DC-8-61
| metric | value |
|---|---|
| P_signalStrength | MEDIUM |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | MEDIUM |
| P_signals | failed-to-monitor, warning, airspeed, altitude |
| O_signals | continued-approach, SOP, procedure, deviation, decided, risk |
| A_signals | checklist, callout, gear, thrust, response, omitted |
| source_signals | CVR, flight-data, transcript, recorded |
| likelyUse | O_CANDIDATE |
| notes | 1979 report. Fuel exhaustion classic. Strong O-dominant. P weaker. |

### UC-022 | United 232 | 22__1990__NTSB-USA__DC-10-10
| metric | value |
|---|---|
| P_signalStrength | MEDIUM |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, warning, ambiguous |
| O_signals | SOP, procedure, decided, risk, planned |
| A_signals | checklist, callout, control-input, thrust, response, executed |
| source_signals | CVR, FDR, flight-data, transcript, recorded |
| likelyUse | A_CANDIDATE |
| notes | Sioux City emergency. Strong A-axis for crew resource/response under crippled aircraft. |

### UC-023 | Simmons 4184 | 23__1996__NTSB-USA__ATR-72-212
| metric | value |
|---|---|
| P_signalStrength | HIGH |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, disorientation, warning, airspeed, altitude |
| O_signals | SOP, procedure, deviation, decided, risk |
| A_signals | checklist, callout, control-input, flap, thrust, response, executed |
| source_signals | CVR, FDR, flight-data, transcript, recorded, parameter |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | Icing event. Not in A4R115. Strong P (124) candidate for environmental perception failure. |

### UC-024 | American 965 | 24__1996__Aeronautica-Civil-Colombia__Boeing-757-223
| metric | value |
|---|---|
| P_signalStrength | MEDIUM |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, disorientation, warning, GPWS, altitude, mode-awareness, ambiguous |
| O_signals | continued-approach, SOP, procedure, deviation, decided, expedite |
| A_signals | checklist, callout, mode-selection, selected, speedbrake, thrust, response, GPWS-response, executed, omitted |
| source_signals | CVR, FDR, flight-data, transcript, recorded |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | In A4R115; HOLD_OVERCLASSIFICATION_RISK. FMS/ambiguity perception material. |

### UC-031 | Corporate 5966 | 31__2006__NTSB-USA__BAe-Jetstream-3201
| metric | value |
|---|---|
| P_signalStrength | HIGH |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-monitor, airspeed, altitude, warning, disorientation |
| O_signals | SOP, procedure, deviation, decided, risk |
| A_signals | checklist, callout, mode-selection, control-input, flap, gear, thrust, response |
| source_signals | CVR, FDR, flight-data, transcript, recorded |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | Regional turboprop. Not in A4R115. Good mid-size full-axis candidate. |

### UC-032 | Execuflight 1526 | 32__2016__NTSB-USA__Hawker-HS-125-700A
| metric | value |
|---|---|
| P_signalStrength | MEDIUM |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, altitude, warning |
| O_signals | continued-approach, unstable-approach, SOP, procedure, deviation, non-compliance, decision-altitude, minimum-descent-altitude, continued-below, risk |
| A_signals | checklist, callout, flap, gear, thrust, response, executed, omitted |
| source_signals | CVR, FDR, flight-data, transcript, recorded |
| likelyUse | O_CANDIDATE |
| notes | Strongest O-signal for non-precision approach continuation. P weaker. Strong O reference. |

### UC-033 | Pinnacle 3701 | 33__2007__NTSB-USA__CRJ-200
| metric | value |
|---|---|
| P_signalStrength | MEDIUM |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, airspeed, altitude, warning, disorientation |
| O_signals | SOP, procedure, deviation, non-compliance, decided, expedite, risk |
| A_signals | checklist, callout, mode-selection, control-input, thrust, response, executed |
| source_signals | CVR, FDR, flight-data, transcript, recorded |
| likelyUse | O_CANDIDATE |
| notes | High-altitude stall. Strong O-deviation material. P weaker. |

### UC-036 | USAir 1493 | 36__1991__NTSB-USA__Boeing-737-300
| metric | value |
|---|---|
| P_signalStrength | MEDIUM |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, visual-reference, ambiguous |
| O_signals | SOP, procedure, deviation, decided |
| A_signals | checklist, callout, control-input, flap, gear, thrust, executed, omitted |
| source_signals | CVR, FDR, flight-data, transcript, recorded |
| likelyUse | O_CANDIDATE |
| notes | Runway collision. O/A dominant. P weaker. Duplicate events in new50 pool. |

### UC-039 | US Airways 1549 | 39__2010__NTSB-USA__Airbus-A320-214
| metric | value |
|---|---|
| P_signalStrength | HIGH |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, warning, airspeed, altitude, visual-reference |
| O_signals | decided, planned, risk, procedure |
| A_signals | checklist, callout, mode-selection, selected, flap, thrust, response, executed |
| source_signals | CVR, FDR, flight-data, transcript, recorded, parameter |
| likelyUse | NOMINAL_CANDIDATE |
| notes | In A4R115; best nominal/no-failure calibration. Already well-traced. |

### UC-044 | Eastern 401 | 44__1973__NTSB-USA__Lockheed-L-1011-1
| metric | value |
|---|---|
| P_signalStrength | LOW |
| O_signalStrength | LOW |
| A_signalStrength | MEDIUM |
| sourceStrength | MEDIUM |
| P_signals | failed-to-monitor, warning, altitude |
| O_signals | decided, risk |
| A_signals | checklist, callout, control-input, mode-selection, selected |
| source_signals | CVR, flight-data, transcript |
| likelyUse | A_CANDIDATE |
| notes | 27KB artefact. Classic autopilot/mode awareness A-axis material. Limited P/O. |

### UC-046 | TSB Light Helicopter 2021 | 46__2021__TSB-Canada
| metric | value |
|---|---|
| P_signalStrength | MEDIUM |
| O_signalStrength | HIGH |
| A_signalStrength | MEDIUM |
| sourceStrength | MEDIUM |
| P_signals | failed-to-notice, visual-reference, ambiguous |
| O_signals | SOP, procedure, deviation, decided, risk |
| A_signals | checklist, callout, control-input, response, executed, omitted |
| source_signals | flight-data, recorded |
| likelyUse | O_CANDIDATE |
| notes | Helicopter. O-dominant. Duplicate with NEW50-37. |

---

## New50-Pool Signal Screening

### UC-049 | Atlas Air 3591 | NEW50-1__2020__NTSB-USA__Boeing-767-375BCF
| metric | value |
|---|---|
| P_signalStrength | HIGH |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, disorientation, warning, airspeed, altitude, incapacitation |
| O_signals | SOP, procedure, deviation, decided, risk |
| A_signals | checklist, callout, control-input, thrust, response, executed, stick-shaker |
| source_signals | CVR, FDR, flight-data, transcript, recorded, parameter |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | Cargo. Go-around/spatial disorientation sequence. Not in A4R115. Strong full-axis. |

### UC-050 | USAir 427 | NEW50-2__1999__NTSB-USA__Boeing-737-300
| metric | value |
|---|---|
| P_signalStrength | HIGH |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, disorientation, warning, airspeed, altitude |
| O_signals | SOP, procedure, deviation, decided, risk |
| A_signals | checklist, callout, control-input, thrust, response, executed |
| source_signals | CVR, FDR, flight-data, transcript, recorded, parameter |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | Highest source hits in corpus (978). Strong A (582). Not in A4R115. Rudder hardover. |

### UC-051 | Helios 522 | NEW50-3__2006__AAIASB-Greece__Boeing-737-31S
| metric | value |
|---|---|
| P_signalStrength | HIGH |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, did-not-recognize, hypoxia, incapacitation, warning, altitude |
| O_signals | SOP, procedure, deviation, decided, planned |
| A_signals | checklist, callout, mode-selection, selected, response, omitted |
| source_signals | CVR, FDR, flight-data, transcript, recorded |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | Hypoxia classic. Strong P (210). Not in A4R115. Unique perception failure type. |

### UC-052 | Crossair 3597 | NEW50-4__2002__SUST-Switzerland__Avro-RJ100
| metric | value |
|---|---|
| P_signalStrength | HIGH |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, visual-reference, disorientation, altitude, warning |
| O_signals | continued-approach, unstable-approach, SOP, procedure, deviation, non-compliance, decision-altitude, minimum-descent-altitude, continued-below, risk |
| A_signals | checklist, callout, mode-selection, flap, gear, thrust, response, executed, omitted |
| source_signals | CVR, FDR, flight-data, transcript, recorded |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | CFIT in IMC. Very strong O/A (219/563). Not in A4R115. |

### UC-054 | TAM 3054 | NEW50-6__2009__CENIPA-Brazil__Airbus-A320-233
| metric | value |
|---|---|
| P_signalStrength | HIGH |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH (secondary caveat) |
| P_signals | failed-to-notice, mode-awareness, airspeed, warning, ambiguous |
| O_signals | continued-approach, SOP, procedure, deviation, decided |
| A_signals | checklist, callout, mode-selection, selected, spoiler, thrust, response, executed, omitted |
| source_signals | CVR, FDR, flight-data, transcript, recorded |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | Source is SECONDARY (ASN mirror). Strong P/O/A signals but source caveat applies. |

### UC-062 | USAir 1493 (duplicate) | NEW50-14
| metric | value |
|---|---|
| Same as UC-036. Use UC-036 as primary. | |

### UC-063 | US Airways 1549 (duplicate) | NEW50-15
| metric | value |
|---|---|
| Same as UC-039. Use UC-039 as primary. | |

### UC-069 | Super Puma G-WNSB | NEW50-21__2016__AAIB-UK__Eurocopter-AS332-L2
| metric | value |
|---|---|
| P_signalStrength | LOW |
| O_signalStrength | MEDIUM |
| A_signalStrength | LOW |
| sourceStrength | LOW |
| P_signals | warning, visual-reference |
| O_signals | SOP, procedure, deviation, decided, risk |
| A_signals | checklist, callout, control-input, response |
| source_signals | flight-data, recorded |
| likelyUse | O_CANDIDATE |
| notes | Small TXT (10.7KB). O-candidate only. Low density. |

### UC-086 | Learjet 35A | NEW50-38__2000__NTSB-USA__Learjet-35A
| metric | value |
|---|---|
| P_signalStrength | MEDIUM |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | hypoxia, incapacitation, failed-to-notice, warning |
| O_signals | SOP, procedure, decided, planned |
| A_signals | checklist, callout, mode-selection, selected, response, omitted |
| source_signals | CVR, FDR, flight-data, transcript, recorded |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | Hypoxia CFIT (Payne Stewart). Not in A4R115. Unique hypoxia + no-survivor scenario. |

### UC-091 | Helikopter Service 451 | NEW50-44__2001__AIBN-Norway__Eurocopter-AS332-L1
| metric | value |
|---|---|
| P_signalStrength | LOW |
| O_signalStrength | HIGH |
| A_signalStrength | MEDIUM |
| sourceStrength | LOW |
| P_signals | visual-reference, ambiguous |
| O_signals | SOP, procedure, deviation, decided, risk |
| A_signals | checklist, callout, control-input, thrust, response, executed |
| source_signals | flight-data, recorded |
| likelyUse | O_CANDIDATE |
| notes | Offshore helicopter. O-dominant (22 hits). Low source confidence. |

### UC-092 | EMS EC135/H145 | NEW50-46__2020__SHK-Sweden__EC135-H145
| metric | value |
|---|---|
| P_signalStrength | LOW |
| O_signalStrength | LOW |
| A_signalStrength | MEDIUM |
| sourceStrength | MEDIUM |
| P_signals | visual-reference, warning |
| O_signals | decided, risk, procedure |
| A_signals | checklist, callout, control-input, thrust, response |
| source_signals | recorded |
| likelyUse | A_CANDIDATE |
| notes | Swedish report. A-focus. Small (48KB). |

### UC-093 | SHK Light Helicopter 2022 | NEW50-47__2022__SHK-Sweden
| metric | value |
|---|---|
| P_signalStrength | LOW |
| O_signalStrength | HIGH |
| A_signalStrength | LOW |
| sourceStrength | LOW |
| P_signals | visual-reference |
| O_signals | SOP, procedure, deviation, decided, risk |
| A_signals | callout, control-input, response |
| source_signals | recorded |
| likelyUse | O_CANDIDATE |
| notes | Swedish report. O-dominant (25 hits). Weak P/A and source. |

### UC-094 | SHK Light Utility 2023 | NEW50-48__2023__SHK-Sweden
| metric | value |
|---|---|
| P_signalStrength | LOW |
| O_signalStrength | MEDIUM |
| A_signalStrength | MEDIUM |
| sourceStrength | MEDIUM |
| P_signals | visual-reference, warning |
| O_signals | SOP, procedure, decided, risk |
| A_signals | checklist, callout, control-input, response, executed |
| source_signals | recorded |
| likelyUse | NOMINAL_CANDIDATE |
| notes | Swedish report. NOMINAL_O_A candidate per A4R112. Useful for no-failure calibration. |

### UC-095 | SHK EC Series 2025 | NEW50-49__2025__SHK-Sweden
| metric | value |
|---|---|
| P_signalStrength | LOW |
| O_signalStrength | LOW |
| A_signalStrength | MEDIUM |
| sourceStrength | LOW |
| P_signals | warning, visual-reference |
| O_signals | decided, risk |
| A_signals | checklist, callout, control-input, response, executed |
| source_signals | recorded |
| likelyUse | A_CANDIDATE |
| notes | Very recent (2025). Swedish. Small (47KB). A-focus. |

### UC-096 | SHK Light Helicopter 2025 | NEW50-50__2025__SHK-Sweden
| metric | value |
|---|---|
| Same profile as UC-095. Light helicopter variant. Likely A_CANDIDATE. | |

---

## Recovered-Pool Signal Screening

### RC-008 | Air Canada 624 Halifax | 8__2017__TSB-Canada__Airbus-A320-211
| metric | value |
|---|---|
| P_signalStrength | MEDIUM |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, visual-reference, altitude, warning, ambiguous |
| O_signals | continued-approach, unstable-approach, SOP, procedure, deviation, non-compliance, decision-altitude, minimum-descent-altitude, continued-below |
| A_signals | checklist, callout, mode-selection, flap, gear, thrust, response, executed, omitted |
| source_signals | CVR, FDR, flight-data, transcript, recorded |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | PREVIOUSLY PARKED in A4R112. Official TSB report now recovered. Non-precision undershoot. Strong O/A. |

### RC-009 | First Air 6560 Resolute Bay | 9__2014__TSB-Canada__Boeing-737-210C
| metric | value |
|---|---|
| P_signalStrength | HIGH |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, visual-reference, disorientation, GPWS, EGPWS, altitude, warning |
| O_signals | continued-approach, unstable-approach, SOP, procedure, deviation, non-compliance, continued-below |
| A_signals | checklist, callout, mode-selection, selected, flap, gear, thrust, response, GPWS-response, executed, omitted |
| source_signals | CVR, FDR, flight-data, transcript, recorded |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | PREVIOUSLY PARKED. Official TSB CFIT report. Strong P (GPWS/EGPWS terrain). Arctic environment. |

### RC-012 | Ornge S-76A Moosonee | 12__2016__TSB-Canada__Sikorsky-S-76A
| metric | value |
|---|---|
| P_signalStrength | HIGH |
| O_signalStrength | HIGH |
| A_signalStrength | MEDIUM |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, visual-reference, disorientation, altitude, warning |
| O_signals | continued-approach, SOP, procedure, deviation, decided, risk |
| A_signals | checklist, callout, control-input, thrust, response, executed |
| source_signals | CVR, FDR, flight-data, transcript, recorded |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | PREVIOUSLY PARKED. Night HEMS CFIT. Unique rotorcraft perception material. |

### RC-027 | AS350 Griffith Island | 27__2024__TSB-Canada__Airbus-AS350-B2
| metric | value |
|---|---|
| P_signalStrength | MEDIUM |
| O_signalStrength | MEDIUM |
| A_signalStrength | MEDIUM |
| sourceStrength | HIGH |
| P_signals | visual-reference, disorientation, ambiguous, warning |
| O_signals | SOP, procedure, deviation, decided, risk |
| A_signals | checklist, callout, control-input, thrust, response |
| source_signals | recorded |
| likelyUse | BOUNDARY_CANDIDATE |
| notes | PREVIOUSLY PARKED. Helicopter VFR/terrain. Useful for light aircraft vs airliner boundary. |

### RC-034 | Cougar S-92A | 34__2011__TSB-Canada__Sikorsky-S-92A
| metric | value |
|---|---|
| P_signalStrength | MEDIUM |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | HIGH |
| P_signals | failed-to-notice, warning, altitude, airspeed |
| O_signals | SOP, procedure, deviation, decided, planned, risk |
| A_signals | checklist, callout, control-input, thrust, response, executed |
| source_signals | CVR, FDR, flight-data, transcript, recorded |
| likelyUse | BOUNDARY_CANDIDATE |
| notes | PREVIOUSLY PARKED. Offshore helicopter emergency ditching. Boundary adjacent to Turøy. |

### RC-042 | Bell 212 Bowen Island | 42__2022__TSB-Canada__Bell-212
| metric | value |
|---|---|
| P_signalStrength | LOW |
| O_signalStrength | MEDIUM |
| A_signalStrength | MEDIUM |
| sourceStrength | HIGH |
| P_signals | visual-reference, ambiguous |
| O_signals | SOP, procedure, deviation, decided |
| A_signals | checklist, callout, control-input, response |
| source_signals | recorded |
| likelyUse | BOUNDARY_CANDIDATE |
| notes | PREVIOUSLY MISMATCHED. Corrected identity. Collision with terrain. Small helicopter. |

### RC-NEW50-24 | Bell 206B Fort McMurray | NEW50-24__2015__TSB-Canada__Bell-206B
| metric | value |
|---|---|
| P_signalStrength | LOW |
| O_signalStrength | MEDIUM |
| A_signalStrength | MEDIUM |
| sourceStrength | HIGH |
| P_signals | visual-reference, warning |
| O_signals | SOP, procedure, deviation, decided, risk |
| A_signals | checklist, callout, control-input, thrust, response |
| source_signals | recorded |
| likelyUse | BOUNDARY_CANDIDATE |
| notes | PREVIOUSLY PARKED. Small helicopter loss-of-control. Limited P-signal. |

### RC-NEW50-35 | UPS6 Dubai Cargo Fire | NEW50-35__2013__GCAA-UAE__Boeing-747-44AF
| metric | value |
|---|---|
| P_signalStrength | MEDIUM |
| O_signalStrength | HIGH |
| A_signalStrength | HIGH |
| sourceStrength | MEDIUM (mirror) |
| P_signals | failed-to-notice, warning, airspeed, altitude, hypoxia, incapacitation |
| O_signals | SOP, procedure, deviation, decided, risk, planned |
| A_signals | checklist, callout, control-input, thrust, response, executed, omitted |
| source_signals | CVR, FDR, flight-data, transcript, recorded |
| likelyUse | FULL_AXIS_CANDIDATE |
| notes | PREVIOUSLY PARKED. Cargo fire/smoke event. Same operator as UPS-1354 but different hazard. Large TXT (782KB). |

---

## Consolidated Screening Summary

| category | count | candidate ids |
|---|---|---|
| FULL_AXIS_CANDIDATE | 22 | UC-001, UC-002, UC-003, UC-004, UC-011, UC-015, UC-018, UC-023, UC-024, UC-031, UC-049, UC-050, UC-051, UC-052, UC-054, UC-086, RC-008, RC-009, RC-012, RC-NEW50-35, UC-039*, UC-046* |
| O_CANDIDATE | 7 | UC-021, UC-032, UC-033, UC-036, UC-069, UC-091, UC-093 |
| A_CANDIDATE | 5 | UC-022, UC-044, UC-092, UC-095, UC-096 |
| P_CANDIDATE | 1 | UC-006 |
| NOMINAL_CANDIDATE | 2 | UC-039, UC-094 |
| BOUNDARY_CANDIDATE | 4 | UC-005, RC-027, RC-034, RC-042 |
| NOT_ELIGIBLE (sparse/dup/empty) | 29 | UC-007, UC-010, UC-013, UC-014, UC-028, UC-029, UC-030, UC-037, UC-040, UC-047, UC-048, UC-060, UC-066, UC-077, UC-078, UC-079, UC-088, UC-089, UC-090, NEW50-11, NEW50-12, NEW50-18, NEW50-29, NEW50-31, NEW50-41, NEW50-42, NEW50-43, RC-038, RC-040 |

*UC-039 serves double as FULL_AXIS and NOMINAL.

## Notes
- Duplicate events across pools flagged; only one primary entry considered for Opus selection.
- Already-analyzed A4R115 cases (UPS-1354, AMERICAN-1420, ASIANA-214, COLGAN-3407, US-AIRWAYS-1549, AMERICAN-965) available for Opus comparison but are NOT new discoveries.
- Recovered corpus provides 8 new content-bearing official TXTs previously marked PARKED.
- SourceStrength=LOW cases generally excluded from Opus selection unless they serve a specific boundary/nominal purpose.
