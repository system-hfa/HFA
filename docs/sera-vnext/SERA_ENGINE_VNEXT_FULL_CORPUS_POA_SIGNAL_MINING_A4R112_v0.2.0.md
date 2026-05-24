# SERA Engine vNext Full Corpus P/O/A Signal Mining A4R112 v0.2.0

Status: FULL_CORPUS_POA_SIGNAL_MINING  
Phase: A4+R-112  
DOCS_ONLY  
CORPUS_MINING_AND_SELECTION_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Mining scope
- Total candidates scanned from unified manifests: `96`.
- Candidates with usable TXT for mining: `57`.
- Method: keyword family counting across Perception (P), Objective (O), Action (A), and source-strength evidence families (CVR/FDR/ATC/etc).
- Output is screening signal only and does not assign final SERA codes.

## Axis signal overview
| metric | value |
|---|---:|
| usableCandidates | 57 |
| candidatesWithPsignals(>0) | 43 |
| candidatesWithOsignals(>0) | 44 |
| candidatesWithAsignals(>0) | 49 |
| candidatesWithStrongSourceSignals(>0) | 47 |

### Top P-signal candidates
- UC-005 (5): P hits=243, sourceStrength=HIGH, families=warning, monitoring, taws.
- UC-051 (NEW50-3): P hits=210, sourceStrength=HIGH, families=warning, monitoring, failed to notice.
- UC-001 (1): P hits=198, sourceStrength=HIGH, families=monitoring, warning, situational awareness.
- UC-003 (3): P hits=195, sourceStrength=HIGH, families=egpws, warning, taws.
- UC-002 (2): P hits=150, sourceStrength=HIGH, families=warning, monitoring, egpws.
- UC-023 (23): P hits=124, sourceStrength=HIGH, families=warning, monitoring, situational awareness.
- UC-015 (15): P hits=101, sourceStrength=HIGH, families=warning, monitoring, ambiguous.
- UC-018 (18): P hits=92, sourceStrength=HIGH, families=monitoring, warning.
- UC-071 (NEW50-23): P hits=92, sourceStrength=HIGH, families=monitoring, warning.
- UC-049 (NEW50-1): P hits=73, sourceStrength=HIGH, families=disorientation, monitoring, warning.

### Top O-signal candidates
- UC-005 (5): O hits=340, sourceStrength=HIGH, families=procedure, intent, deviation.
- UC-001 (1): O hits=334, sourceStrength=HIGH, families=procedure, deviation, planned.
- UC-050 (NEW50-2): O hits=270, sourceStrength=HIGH, families=procedure, intent, go-around.
- UC-032 (32): O hits=259, sourceStrength=HIGH, families=procedure, sop, deviation.
- UC-003 (3): O hits=238, sourceStrength=HIGH, families=procedure, minimum descent altitude, go-around.
- UC-004 (4): O hits=237, sourceStrength=HIGH, families=procedure, deviation, go-around.
- UC-002 (2): O hits=222, sourceStrength=HIGH, families=go-around, procedure, sop.
- UC-011 (11): O hits=219, sourceStrength=HIGH, families=procedure, sop, intent.
- UC-052 (NEW50-4): O hits=219, sourceStrength=HIGH, families=procedure, sop, intent.
- UC-051 (NEW50-3): O hits=213, sourceStrength=HIGH, families=procedure, sop, planned.

### Top A-signal candidates
- UC-018 (18): A hits=771, sourceStrength=HIGH, families=gear, response, applied.
- UC-071 (NEW50-23): A hits=771, sourceStrength=HIGH, families=gear, response, applied.
- UC-050 (NEW50-2): A hits=582, sourceStrength=HIGH, families=response, applied, flap.
- UC-011 (11): A hits=563, sourceStrength=HIGH, families=checklist, selected, reset.
- UC-052 (NEW50-4): A hits=563, sourceStrength=HIGH, families=checklist, selected, reset.
- UC-001 (1): A hits=473, sourceStrength=HIGH, families=response, flap, checklist.
- UC-004 (4): A hits=464, sourceStrength=HIGH, families=response, gear, checklist.
- UC-002 (2): A hits=450, sourceStrength=HIGH, families=response, selected, flap.
- UC-015 (15): A hits=443, sourceStrength=HIGH, families=gear, checklist, applied.
- UC-039 (39): A hits=403, sourceStrength=HIGH, families=checklist, flap, response.

## Per-candidate mining table (usable TXT only)
| unifiedCandidateId | candidateId | title | P_hits | O_hits | A_hits | sourceHits | evidenceDensity | sourceStrength | keySignalsParaphrase |
|---|---|---|---:|---:|---:|---:|---|---|---|
| UC-001 | 1 | Loss of Control on Approach, Colgan Air/Continental Connection Flight 3407 (NTSB/AAR-10/01 | 198 | 334 | 473 | 267 | HIGH | HIGH | P:monitoring, warning, situational awareness; O:procedure, deviation, planned; A:response, flap, checklist; SRC:mode, fdr, cvr, parameter |
| UC-002 | 2 | Descent Below Visual Glidepath and Impact With Seawall, Asiana Airlines Flight 214 (NTSB/A | 150 | 222 | 450 | 409 | HIGH | HIGH | P:warning, monitoring, egpws; O:go-around, procedure, sop; A:response, selected, flap; SRC:mode, fdr, parameter, cvr |
| UC-003 | 3 | Crash During Nighttime Nonprecision Approach, UPS Flight 1354 (NTSB/AAR-14/02) | 195 | 238 | 257 | 215 | HIGH | HIGH | P:egpws, warning, taws; O:procedure, minimum descent altitude, go-around; A:callout, response, checklist; SRC:mode, cvr, transcript, fdr |
| UC-004 | 4 | Runway Overrun During Landing, American Airlines Flight 1420 (NTSB/AAR-01/02) | 33 | 237 | 464 | 248 | HIGH | HIGH | P:warning, monitoring, situational awareness; O:procedure, deviation, go-around; A:response, gear, checklist; SRC:cvr, fdr, mode, parameter |
| UC-005 | 5 | Controlled Flight Into Terrain, Korean Air Flight 801 (NTSB/AAR-00/01) | 243 | 340 | 330 | 302 | HIGH | HIGH | P:warning, monitoring, taws; O:procedure, intent, deviation; A:response, checklist, callout; SRC:fdr, cvr, mode, parameter |
| UC-006 | 6 | Attempted Takeoff From Wrong Runway, Comair Flight 5191 (NTSB/AAR-07/05) | 70 | 137 | 172 | 163 | HIGH | HIGH | P:monitoring, situational awareness, did not notice; O:procedure, deviation, planned; A:checklist, response, configuration; SRC:fdr, cvr, mode, transcript |
| UC-007 | 7 | Final Report – Accident to Airbus A330-203 F-GZCP Air France Flight 447 | 1 | 3 | 4 | 0 | LOW | LOW | P:warning; O:procedure, deviation; A:configuration, response, control input; SRC:none |
| UC-010 | 10 | Runway Overrun and Fire, Air France Flight 358 Toronto (TSB A05H0002) | 0 | 0 | 0 | 0 | LOW | LOW | P:none; O:none; A:none; SRC:none |
| UC-011 | 11 | Air Transportation Safety Investigation Report A98H0003 – Swissair Flight 111 | 52 | 219 | 563 | 529 | HIGH | HIGH | P:warning, monitoring, ambiguous; O:procedure, sop, intent; A:checklist, selected, reset; SRC:mode, fdr, cvr, parameter |
| UC-013 | 13 | Aircraft Accident Report 4/1990 – Boeing 737-400 G-OBME Kegworth | 0 | 0 | 0 | 0 | LOW | LOW | P:none; O:none; A:none; SRC:none |
| UC-014 | 14 | Aircraft Accident Report AAR 3/2015 – Eurocopter EC135 T2+ G-SPAO Glasgow | 0 | 0 | 0 | 0 | LOW | LOW | P:none; O:none; A:none; SRC:none |
| UC-015 | 15 | Aircraft Accident Report AAR 2/2014 – EC225 LP Super Puma G-REDW & G-CHCN North Sea Ditchi | 101 | 111 | 443 | 118 | HIGH | HIGH | P:warning, monitoring, ambiguous; O:procedure, deviation, planned; A:gear, checklist, applied; SRC:mode, fdr, flight data, parameter |
| UC-018 | 18 | Airbus Helicopters EC225 LP LN-OJF Turøy Norway Accident Report | 92 | 72 | 771 | 137 | HIGH | HIGH | P:monitoring, warning; O:procedure, deviation, intent; A:gear, response, applied; SRC:mode, fdr, flight data, cvr |
| UC-019 | 19 | Aviation Investigation Final Report WPR18MA087 – EC130 Grand Canyon Air Tour | 0 | 3 | 13 | 10 | LOW | MEDIUM | P:none; O:procedure, planned; A:response, applied, gear; SRC:mode, recorded data, parameter |
| UC-021 | 21 | Aircraft Accident Report AAR-79-07 – United Airlines Flight 173 Portland | 11 | 28 | 117 | 25 | MEDIUM | MEDIUM | P:monitoring, warning; O:procedure, intent, planned; A:gear, flap, reset; SRC:cvr, mode, cockpit voice, fdr |
| UC-022 | 22 | Aircraft Accident Report AAR-90-06 – United Airlines Flight 232 Sioux City | 12 | 70 | 92 | 46 | MEDIUM | HIGH | P:monitoring, warning, visual cues; O:procedure, sop, go-around; A:gear, response, flap; SRC:mode, fdr, parameter, cvr |
| UC-023 | 23 | Aircraft Accident Report AAR-96-01 – Simmons/American Eagle Flight 4184 Roselawn | 124 | 103 | 225 | 413 | HIGH | HIGH | P:warning, monitoring, situational awareness; O:procedure, contrary to, intent; A:flap, configuration, applied; SRC:fdr, dfdr, cvr, mode |
| UC-024 | 24 | Controlled Flight Into Terrain – American Airlines Flight 965 Cali | 26 | 46 | 39 | 70 | MEDIUM | HIGH | P:situational awareness, warning, monitoring; O:procedure, planned, deviation; A:selected, response, pressed; SRC:cvr, fdr, mode, parameter |
| UC-028 | 28 | Aircraft Accident Report 7/2008 – Aerospatiale SA365N G-BLUN Morecambe Bay | 1 | 0 | 1 | 2 | LOW | LOW | P:visual cues; O:none; A:response; SRC:flight data |
| UC-029 | 29 | Aircraft Accident Report 1/2005 – Sikorsky S-76A+ G-BJVX North Sea | 2 | 0 | 1 | 2 | LOW | LOW | P:warning, monitoring; O:none; A:applied; SRC:flight data |
| UC-030 | 30 | AAIB Bulletin – Sikorsky S-76C G-JCBJ Heavy Landing During Training at Cranfield | 0 | 0 | 4 | 4 | LOW | LOW | P:none; O:none; A:response; SRC:cvr, fdr, flight data, cockpit voice |
| UC-031 | 31 | Aircraft Accident Report AAR-06/01 – Corporate Airlines Flight 5966 Kirksville | 61 | 97 | 140 | 199 | HIGH | HIGH | P:visual cues, warning, egpws; O:procedure, minimum descent altitude, deviation; A:response, callout, flap; SRC:cvr, fdr, mode, transcript |
| UC-032 | 32 | Crash During Nonprecision Instrument Approach, Execuflight Flight 1526 Akron (NTSB/AAR-16/ | 30 | 259 | 279 | 221 | HIGH | HIGH | P:monitoring, situational awareness, failed to notice; O:procedure, sop, deviation; A:flap, checklist, configuration; SRC:cvr, cockpit voice, transcript, radar data |
| UC-033 | 33 | Crash of Pinnacle Airlines Flight 3701 CRJ-200 Jefferson City (NTSB/AAR-07/01) | 33 | 194 | 158 | 285 | HIGH | HIGH | P:warning, monitoring, situational awareness; O:procedure, intent, deviation; A:checklist, response, control input; SRC:fdr, cvr, mode, parameter |
| UC-036 | 36 | Aircraft Accident Report AAR-91/08 – Runway Collision of USAir Flight 1493 and SkyWest Fli | 18 | 109 | 104 | 66 | MEDIUM | HIGH | P:situational awareness, monitoring, misidentified; O:procedure, intent, planned; A:gear, flap, response; SRC:cvr, mode, transcript, flight data |
| UC-037 | 37 | Aircraft Accident Report AAR-82/08 – Air Florida Flight 90, Boeing 737-222, Washington Nat | 0 | 0 | 0 | 0 | LOW | LOW | P:none; O:none; A:none; SRC:none |
| UC-039 | 39 | Aircraft Accident Report AAR-10/03 – US Airways Flight 1549 Ditching on the Hudson River | 58 | 133 | 403 | 153 | HIGH | HIGH | P:warning, monitoring, egpws; O:procedure, planned, intent; A:checklist, flap, response; SRC:mode, cvr, fdr, parameter |
| UC-043 | 43 | Air Transportation Safety Investigation Report A21P0018 – Official PDF (data artefact) | 9 | 23 | 41 | 21 | LOW | MEDIUM | P:warning, situational awareness, visual cues; O:procedure, sop, planned; A:flap, gear, response; SRC:mode, flight data, parameter, cockpit voice |
| UC-044 | 44 | Eastern Air Lines Flight 401 – NTSB PDF Artefact (data source) | 4 | 3 | 16 | 11 | LOW | MEDIUM | P:warning, failed to notice, situational awareness; O:deviation, intent, decided; A:gear, selected, response; SRC:mode, cvr, transcript |
| UC-046 | 46 | Air transportation safety investigation report A20Q0015 – Canada (helicopter/GA occurrence | 26 | 25 | 17 | 14 | LOW | MEDIUM | P:visual cues, warning, situational awareness; O:procedure, planned, intent; A:gear, response, pilot flying; SRC:mode, flight data, fdr, cvr |
| UC-047 | 47 | Air Florida Flight 90 – NTSB AAR-82/08 PDF artefact (data source) | 40 | 125 | 160 | 114 | HIGH | HIGH | P:warning, monitoring; O:procedure, intent, planned; A:flap, response, checklist; SRC:cvr, fdr, mode, parameter |
| UC-048 | 48 | USAir Flight 1493 Runway Collision – NTSB AAR-91/08 mirror PDF | 8 | 123 | 84 | 67 | MEDIUM | HIGH | P:monitoring, situational awareness, warning; O:procedure, intent, planned; A:gear, response, flap; SRC:mode, cvr, transcript, fdr |
| UC-049 | NEW50-1 | Atlas Air Flight 3591 – Rapid Descent and Crash into Water, Boeing 767-375BCF, near Anahua | 73 | 199 | 177 | 280 | HIGH | HIGH | P:disorientation, monitoring, warning; O:go-around, procedure, intent; A:response, control input, applied; SRC:mode, fdr, cvr, parameter |
| UC-050 | NEW50-2 | USAir Flight 427 – Loss of Control, Boeing 737-300, near Aliquippa PA (NTSB AAR-99/01) | 63 | 270 | 582 | 978 | HIGH | HIGH | P:warning, disorientation, visual cues; O:procedure, intent, go-around; A:response, applied, flap; SRC:fdr, cvr, mode, parameter |
| UC-051 | NEW50-3 | Accident Report 11/2006 – Helios Airways Flight 522, Boeing 737-31S, Grammatiko, Greece | 210 | 213 | 241 | 204 | HIGH | HIGH | P:warning, monitoring, failed to notice; O:procedure, sop, planned; A:checklist, response, configuration; SRC:mode, cvr, fdr, flight data |
| UC-052 | NEW50-4 | Crossair Flight 3597 – Avro RJ100 HB-IXM, CFIT near Zurich (Swiss BFU/SUST) | 52 | 219 | 563 | 529 | HIGH | HIGH | P:warning, monitoring, ambiguous; O:procedure, sop, intent; A:checklist, selected, reset; SRC:mode, fdr, cvr, parameter |
| UC-054 | NEW50-6 | TAM Airlines Flight 3054 – Airbus A320-233 PR-MBK, São Paulo Congonhas 2007 (CENIPA) | 54 | 196 | 73 | 124 | HIGH | HIGH | P:monitoring, warning, situational awareness; O:procedure, intent, sop; A:gear, configuration, selected; SRC:fdr, parameter, mode, cvr |
| UC-060 | NEW50-12 | Air Florida Flight 90 – Boeing 737-222, Washington National 1982 (NTSB AAR-82/08) | 0 | 0 | 0 | 0 | LOW | LOW | P:none; O:none; A:none; SRC:none |
| UC-062 | NEW50-14 | USAir Flight 1493 – Runway Collision with SkyWest 5569, LAX 1991 (NTSB AAR-91/08) | 18 | 109 | 104 | 66 | MEDIUM | HIGH | P:situational awareness, monitoring, misidentified; O:procedure, intent, planned; A:gear, flap, response; SRC:cvr, mode, transcript, flight data |
| UC-063 | NEW50-15 | US Airways Flight 1549 – A320-214 Ditching Hudson River 2009 (NTSB AAR-10/03) | 58 | 133 | 403 | 153 | HIGH | HIGH | P:warning, monitoring, egpws; O:procedure, planned, intent; A:checklist, flap, response; SRC:mode, cvr, fdr, parameter |
| UC-066 | NEW50-18 | Air Inter Flight 148 – Airbus A320-111 F-GGED Mont Sainte-Odile 1992 (BEA/AAIU France) | 0 | 3 | 5 | 0 | LOW | LOW | P:none; O:intent; A:response, gear; SRC:none |
| UC-069 | NEW50-21 | Eurocopter AS332 L2 Super Puma G-WNSB – Sumburgh offshore approach 2013 (AAIB AAR 1/2016) | 5 | 9 | 3 | 3 | LOW | LOW | P:monitoring, ambiguous; O:sop, procedure, minimum descent altitude; A:pilot flying, control input, applied; SRC:mode, flight data |
| UC-071 | NEW50-23 | Airbus Helicopters EC225 LP LN-OJF – Turøy Norway 2016 (AIBN Report 2018) | 92 | 72 | 771 | 137 | HIGH | HIGH | P:monitoring, warning; O:procedure, deviation, intent; A:gear, response, applied; SRC:mode, fdr, flight data, cvr |
| UC-077 | NEW50-29 | Sikorsky S-76A+ offshore CFIT – Gulf of Mexico 2004 (NTSB SEA04MA167) | 0 | 0 | 4 | 4 | LOW | LOW | P:none; O:none; A:gear; SRC:mode |
| UC-078 | NEW50-30 | Eurocopter EC130 B4 Grand Canyon air tour 2018 (NTSB WPR18MA087) | 0 | 3 | 13 | 10 | LOW | MEDIUM | P:none; O:procedure, planned; A:response, applied, gear; SRC:mode, recorded data, parameter |
| UC-079 | NEW50-31 | Helicopter EMS S-76B – Night CFIT during EMS mission (NTSB accident report, e.g. NTSB AAR- | 0 | 0 | 3 | 4 | LOW | LOW | P:none; O:none; A:control input, gear; SRC:mode |
| UC-085 | NEW50-37 | Air transportation safety investigation report A20Q0015 – CFIT in GA/Commercial ops (TSB C | 26 | 25 | 17 | 14 | LOW | MEDIUM | P:visual cues, warning, situational awareness; O:procedure, planned, intent; A:gear, response, pilot flying; SRC:mode, flight data, fdr, cvr |
| UC-086 | NEW50-38 | Learjet 35A N47BA – CFIT near Aberdeen SD 1999 (NTSB, depressurization/crew incapacitation | 10 | 60 | 244 | 135 | HIGH | HIGH | P:warning, monitoring; O:go-around, procedure, sop; A:gear, response, control input; SRC:fdr, mode, flight data, cvr |
| UC-088 | NEW50-41 | Sikorsky S-61N G-BEON – British Airways Helicopters Flight 5918, near St Mary’s, Isles of | 0 | 0 | 0 | 0 | LOW | LOW | P:none; O:none; A:none; SRC:none |
| UC-089 | NEW50-42 | Sikorsky S-61N G-BEWL – Brent Spar, East Shetland Basin 1990 (AAIB Report 2/1991) | 0 | 0 | 0 | 0 | LOW | LOW | P:none; O:none; A:none; SRC:none |
| UC-090 | NEW50-43 | Sikorsky S-61N G-ASNL – offshore accident 11 March 1983 (AAIB Report) | 0 | 0 | 0 | 0 | LOW | LOW | P:none; O:none; A:none; SRC:none |
| UC-091 | NEW50-44 | Helikopter Service Flight 451 – Eurocopter AS332 L1 Super Puma LN-OPG, Norwegian Sea 1997 | 6 | 22 | 31 | 6 | LOW | LOW | P:warning; O:deviation, procedure, planned; A:gear, selected, configuration; SRC:flight data, parameter, mode |
| UC-092 | NEW50-46 | RL 2020:06e – Helicopter emergency medical services accident (SHK Sweden) | 9 | 4 | 10 | 16 | LOW | MEDIUM | P:warning, monitoring; O:procedure; A:gear, selected, armed; SRC:parameter, mode, flight data |
| UC-093 | NEW50-47 | RL 2022:06e – Helicopter accident Sweden (SHK Sweden) | 1 | 25 | 3 | 3 | LOW | LOW | P:situational awareness; O:procedure, sop, intent; A:gear, pressed, armed; SRC:mode |
| UC-094 | NEW50-48 | SHK 2023:10e – Helicopter accident at Enköping/Långtora Airfield 2023 (SHK Sweden) | 2 | 9 | 23 | 14 | LOW | MEDIUM | P:warning; O:go-around, planned, procedure; A:gear, response, control input; SRC:flight data, mode, parameter, cockpit voice |
| UC-095 | NEW50-49 | SHK 2025:18e – Helicopter accident Sweden (automation/IMC focus) | 3 | 1 | 11 | 8 | LOW | LOW | P:warning; O:procedure; A:gear, response, control input; SRC:mode, recorded data |
| UC-096 | NEW50-50 | Accident with a helicopter at Enköping/Långtora Airport – SHK Sweden technical report | 3 | 1 | 11 | 8 | LOW | LOW | P:warning; O:procedure; A:gear, response, control input; SRC:mode, recorded data |
