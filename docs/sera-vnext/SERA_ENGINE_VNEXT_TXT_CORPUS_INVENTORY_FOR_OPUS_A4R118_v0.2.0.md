# SERA Engine vNext TXT Corpus Inventory for Opus A4R118 v0.2.0

Status: TXT_CORPUS_INVENTORY
Phase: A4+R-118
DOCS_ONLY
CORPUS_PREPARATION_ONLY
NO_RELEASE
NO_DOWNSTREAM
NO_SERA_CLASSIFICATION

## Scope
Full inventory of TXT files available across three source folders for Opus candidate discovery.

## Summary

| metric | count |
|---|---|
| Total TXT files found | 71 |
| Full-pool TXT (a4r111-full-pool-txt/) | 33 |
| New50-pool TXT (a4r111-new50-pool-txt/) | 26 |
| Recovered-pool TXT (a4r111-recovered-pool-txt/) | 12 |
| Content-bearing TXT (useful for mining) | 66 |
| Empty/scanned/form-feed only TXT | 4 |
| Already in A4R112 matrix (tracked) | 71 |
| Eligible for Opus candidate mining | 42 |

## Empty / scanned / form-feed only TXT

| # | file path | size | reason excluded |
|---|---|---|---|
| 1 | a4r111-full-pool-txt/37__1982__NTSB-USA__Boeing-737-222__Aircraft-Accident-Report-AAR-82-08-Air-Flor.txt | 142B | form-feed only (142 bytes of \f) |
| 2 | a4r111-new50-pool-txt/NEW50-12__1982__NTSB-USA__Boeing-737-222__Air-Florida-Flight-90-Boeing-737-222-Washi.txt | 142B | form-feed only (142 bytes of \f) |
| 3 | a4r111-recovered-pool-txt/38__1973__NTSB-USA__Lockheed-L-1011-1__NTSB-AAR-73-14-Eastern-401.txt | 50B | form-feed only (50 bytes of \f) |
| 4 | a4r111-recovered-pool-txt/40__1986__NTSB-USA__Lockheed-L-1011-385-1__NTSB-AAR-86-05-Delta-191.txt | 167B | form-feed only (167 bytes, no extractable text) |

## Full-pool TXT inventory (a4r111-full-pool-txt/)

| # | file | candidate/event | agency | year | aircraft | source confidence | A4R112 status | eligible for Opus? | notes |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 1__2010__NTSB-USA__DHC-8-402-Q400__Loss-of-Control-on-Approach-Colgan-Air-Conti.txt | Colgan Air 3407 | NTSB | 2010 | DHC-8-402 Q400 | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | Already in A4R115; strong multi-axis candidate |
| 2 | 2__2014__NTSB-USA__Boeing-777-200ER__Descent-Below-Visual-Glidepath-and-Impact-Wit.txt | Asiana 214 | NTSB | 2014 | B777-200ER | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | In A4R115; overclassification risk flagged |
| 3 | 3__2014__NTSB-USA__Airbus-A300-600F__Crash-During-Nighttime-Nonprecision-Approach.txt | UPS 1354 | NTSB | 2014 | A300-600F | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | In A4R115; ready for author review |
| 4 | 4__2001__NTSB-USA__MD-82__Runway-Overrun-During-Landing-American-Airli.txt | American 1420 | NTSB | 2001 | MD-82 | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | In A4R115; substantive patch required |
| 5 | 5__2000__NTSB-USA__Boeing-747-300__Controlled-Flight-Into-Terrain-Korean-Air-Fl.txt | Korean Air 801 | NTSB | 2000 | B747-300 | HIGH | BOUNDARY_CANDIDATE | yes | Boundary candidate; O overclassification risk |
| 6 | 6__2007__NTSB-USA__CRJ-100__Attempted-Takeoff-From-Wrong-Runway-Comair-F.txt | Comair 5191 | NTSB | 2007 | CRJ-100 | HIGH | P_REFERENCE_CANDIDATE_ONLY | limited | Scoped as P-only per A4R111 governance |
| 7 | 7__2012__BEA-France__Airbus-A330-203__Final-Report-Accident-to-Airbus-A330-203-F.txt | AF447 | BEA | 2012 | A330-203 | LOW | SOURCE_SLICE_REQUIRED | no | Very short TXT (2.6KB); summary-only |
| 8 | 10__2007__TSB-Canada__Airbus-A340-313__Runway-Overrun-and-Fire-Air-France-Flight-35.txt | AF358 | TSB | 2007 | A340-313 | LOW | SOURCE_SLICE_REQUIRED | no | Minimal TXT (457B); HTML extract only |
| 9 | 11__2003__TSB-Canada__MD-11__Air-Transportation-Safety-Investigation-Repor.txt | Swissair 111 | TSB | 2003 | MD-11 | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | Strong multi-axis; large TXT (1MB) |
| 10 | 13__1990__AAIB-UK__Boeing-737-400__Aircraft-Accident-Report-4-1990-Boeing-737.txt | Kegworth | AAIB | 1990 | B737-400 | LOW | SOURCE_SLICE_REQUIRED | no | Small TXT (2.5KB); HTML extract only |
| 11 | 14__2015__AAIB-UK__Eurocopter-EC135-T2__Aircraft-Accident-Report-AAR-3-2015-Eurocop.txt | Glasgow EC135 | AAIB | 2015 | EC135-T2 | LOW | SOURCE_SLICE_REQUIRED | no | Small TXT (3.8KB); HTML extract only |
| 12 | 15__2014__AAIB-UK__Eurocopter-EC225-LP__Aircraft-Accident-Report-AAR-2-2014-EC225-L.txt | North Sea EC225 ditchings | AAIB | 2014 | EC225-LP | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | Rotorcraft full-axis candidate |
| 13 | 18__2018__AIBN-Norway__Airbus-EC225-LP__Airbus-Helicopters-EC225-LP-LN-OJF-Turøy-Norw.txt | Turøy LN-OJF | AIBN | 2018 | EC225-LP | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | Highest A-count (771); rotorcraft |
| 14 | 19__2021__NTSB-USA__Eurocopter-EC130__Aviation-Investigation-Final-Report-WPR18MA08.txt | Grand Canyon EC130 | NTSB | 2021 | EC130 | MEDIUM | A_REFERENCE_CANDIDATE | limited | A-axis only; weak P/O |
| 15 | 21__1979__NTSB-USA__McDonnell-Douglas-DC-8-61__Aircraft-Accident-Report-AAR-79-07-United-A.txt | United 173 | NTSB | 1979 | DC-8-61 | MEDIUM | FULL_P_O_A_TRACE_CANDIDATE | yes | Fuel exhaustion; O/A dominant |
| 16 | 22__1990__NTSB-USA__DC-10-10__Aircraft-Accident-Report-AAR-90-06-United-A.txt | United 232 | NTSB | 1990 | DC-10-10 | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | Sioux City; emergency response |
| 17 | 23__1996__NTSB-USA__ATR-72-212__Aircraft-Accident-Report-AAR-96-01-Simmons.txt | Simmons 4184 | NTSB | 1996 | ATR-72-212 | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | Icing; strong P and A |
| 18 | 24__1996__Aeronautica-Civil-Colombia__Boeing-757-223__Controlled-Flight-Into-Terrain-American-Air.txt | American 965 | Aeronautica Civil | 1996 | B757-223 | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | CFIT; in A4R115, on hold |
| 19 | 28__2008__AAIB-UK__Aerospatiale-SA365N-Dauphin__Aircraft-Accident-Report-7-2008-Aerospatial.txt | Morecambe Bay Dauphin | AAIB | 2008 | SA365N | LOW | SOURCE_SLICE_REQUIRED | no | Small TXT (6.1KB); sparse |
| 20 | 29__2005__AAIB-UK__Sikorsky-S-76A__Aircraft-Accident-Report-1-2005-Sikorsky-S.txt | North Sea S-76A | AAIB | 2005 | S-76A | LOW | SOURCE_SLICE_REQUIRED | no | Small TXT (6.5KB); sparse |
| 21 | 30__2004__AAIB-UK__Sikorsky-S-76C__AAIB-Bulletin-Sikorsky-S-76C-G-JCBJ-Heavy-L.txt | Cranfield S-76C | AAIB | 2004 | S-76C | LOW | SOURCE_SLICE_REQUIRED | no | Small TXT (4.4KB); training event |
| 22 | 31__2006__NTSB-USA__BAe-Jetstream-3201__Aircraft-Accident-Report-AAR-06-01-Corporat.txt | Corporate 5966 | NTSB | 2006 | Jetstream 3201 | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | Regional; strong P/O/A |
| 23 | 32__2016__NTSB-USA__Hawker-HS-125-700A__Crash-During-Nonprecision-Instrument-Approach.txt | Execuflight 1526 | NTSB | 2016 | HS-125-700A | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | Strong O-signal (259); non-precision |
| 24 | 33__2007__NTSB-USA__CRJ-200__Crash-of-Pinnacle-Airlines-Flight-3701-CRJ-20.txt | Pinnacle 3701 | NTSB | 2007 | CRJ-200 | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | High-altitude; strong O signal |
| 25 | 36__1991__NTSB-USA__Boeing-737-300-Fairchild-Metroliner-SA-227-AC__Aircraft-Accident-Report-AAR-91-08-Runway-C.txt | USAir 1493 | NTSB | 1991 | B737-300 | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | Runway collision; strong O/A |
| 26 | 37__1982__NTSB-USA__Boeing-737-222__Aircraft-Accident-Report-AAR-82-08-Air-Flor.txt | Air Florida 90 | NTSB | 1982 | B737-222 | LOW | SOURCE_SLICE_REQUIRED | no | FORM FEED ONLY; 142B |
| 27 | 39__2010__NTSB-USA__Airbus-A320-214__Aircraft-Accident-Report-AAR-10-03-US-Airwa.txt | US Airways 1549 | NTSB | 2010 | A320-214 | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | In A4R115; best nominal candidate |
| 28 | 40__1986__NTSB-USA__Lockheed-L-1011-385-1-TriStar__Aircraft-Accident-Report-AAR-86-05-Delta-Ai.txt | Delta 191 | NTSB | 1986 | L-1011 | INSUFFICIENT | PARKED | no | Small TXT (23KB); sparse/microslice |
| 29 | 43__2022__TSB-Canada__Same-as-A21P0018__Air-Transportation-Safety-Investigation-Repor.txt | Bell 212 Bowen Island | TSB | 2022 | Bell 212 | MEDIUM | FULL_P_O_A_TRACE_CANDIDATE | yes | Helicopter; matches UC-042 |
| 30 | 44__1973__NTSB-USA__Lockheed-L-1011-1__Eastern-Air-Lines-Flight-401-NTSB-PDF-Artef.txt | Eastern 401 | NTSB | 1973 | L-1011-1 | MEDIUM | A_REFERENCE_CANDIDATE | limited | A-axis focus; 27KB artefact |
| 31 | 46__2021__TSB-Canada__Light-helicopter-or-small-aircraft-see-report-for-exact-type__Air-transportation-safety-investigation-repor.txt | TSB light helicopter | TSB | 2021 | light helicopter | MEDIUM | FULL_P_O_A_TRACE_CANDIDATE | yes | Matches NEW50-37 content |
| 32 | 47__1982__NTSB-USA__Boeing-737-222__Air-Florida-Flight-90-NTSB-AAR-82-08-PDF-ar.txt | Air Florida 90 (artefact) | NTSB | 1982 | B737-222 | HIGH | SOURCE_SLICE_REQUIRED | limited | Secondary source; 378KB artefact variant |
| 33 | 48__1991__NTSB-USA__B737-300-SA-227-AC__USAir-Flight-1493-Runway-Collision-NTSB-AAR.txt | USAir 1493 (mirror) | NTSB | 1991 | B737-300 | HIGH | SOURCE_SLICE_REQUIRED | limited | Secondary source; 446KB mirror variant |

## New50-pool TXT inventory (a4r111-new50-pool-txt/)

| # | file | candidate/event | agency | year | aircraft | source confidence | A4R112 status | eligible for Opus? | notes |
|---|---|---|---|---|---|---|---|---|---|
| 1 | NEW50-1__2020__NTSB-USA__Boeing-767-375BCF__Atlas-Air-Flight-3591-Rapid-Descent-and-Cra.txt | Atlas Air 3591 | NTSB | 2020 | B767-375BCF | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | Strong multi-axis; cargo |
| 2 | NEW50-2__1999__NTSB-USA__Boeing-737-300__USAir-Flight-427-Loss-of-Control-Boeing-73.txt | USAir 427 | NTSB | 1999 | B737-300 | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | Highest source hits (978); strong A/O |
| 3 | NEW50-3__2006__AAIASB-Greece__Boeing-737-31S__Accident-Report-11-2006-Helios-Airways-Flig.txt | Helios 522 | AAIASB | 2006 | B737-31S | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | Hypoxia; strong P-signal (210) |
| 4 | NEW50-4__2002__SUST-Switzerland__Avro-RJ100__Crossair-Flight-3597-Avro-RJ100-HB-IXM-CFI.txt | Crossair 3597 | SUST | 2002 | Avro RJ100 | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | CFIT; strong O/A (219/563) |
| 5 | NEW50-6__2009__CENIPA-Brazil__Airbus-A320-233__TAM-Airlines-Flight-3054-Airbus-A320-233-PR.txt | TAM 3054 | CENIPA | 2009 | A320-233 | HIGH | SOURCE_SLICE_REQUIRED | limited | Secondary source; strong O-signal |
| 6 | NEW50-11__1986__NTSB-USA__Lockheed-L-1011-TriStar__Delta-Air-Lines-Flight-191-L-1011-DFW-Micro.txt | Delta 191 (microslice) | NTSB | 1986 | L-1011 | INSUFFICIENT | PARKED | no | 23KB microslice only |
| 7 | NEW50-12__1982__NTSB-USA__Boeing-737-222__Air-Florida-Flight-90-Boeing-737-222-Washi.txt | Air Florida 90 | NTSB | 1982 | B737-222 | LOW | SOURCE_SLICE_REQUIRED | no | FORM FEED ONLY; 142B |
| 8 | NEW50-14__1991__NTSB-USA__Boeing-737-300-Fairchild-Metroliner-SA-227-AC__USAir-Flight-1493-Runway-Collision-with-Sky.txt | USAir 1493 | NTSB | 1991 | B737-300 | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | Duplicates UC-036/UC-062 |
| 9 | NEW50-15__2010__NTSB-USA__Airbus-A320-214__US-Airways-Flight-1549-A320-214-Ditching-Hu.txt | US Airways 1549 | NTSB | 2010 | A320-214 | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | Duplicates UC-039/UC-063 |
| 10 | NEW50-18__1993__BEA-France__Airbus-A320-111__Air-Inter-Flight-148-Airbus-A320-111-F-GGED.txt | Air Inter 148 | BEA | 1993 | A320-111 | LOW | SOURCE_SLICE_REQUIRED | no | Small TXT (12KB); sparse |
| 11 | NEW50-21__2016__AAIB-UK__Eurocopter-AS332-L2-Super-Puma__Eurocopter-AS332-L2-Super-Puma-G-WNSB-Sumbu.txt | Super Puma G-WNSB | AAIB | 2016 | AS332-L2 | LOW | O_REFERENCE_CANDIDATE | limited | Small TXT (10.7KB); O-candidate only |
| 12 | NEW50-23__2018__AIBN-Norway__Airbus-EC225-LP-Super-Puma__Airbus-Helicopters-EC225-LP-LN-OJF-Turøy-No.txt | Turøy LN-OJF (duplicate) | AIBN | 2018 | EC225-LP | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | Duplicates UC-018; skip for Opus |
| 13 | NEW50-29__2006__NTSB-USA__Sikorsky-S-76A__Sikorsky-S-76A-offshore-CFIT-Gulf-of-Mexic.txt | S-76A Gulf of Mexico | NTSB | 2006 | S-76A | LOW | SOURCE_SLICE_REQUIRED | no | Small TXT (11.3KB); sparse |
| 14 | NEW50-30__2021__NTSB-USA__Eurocopter-EC130-B4__Eurocopter-EC130-B4-Grand-Canyon-air-tour-201.txt | Grand Canyon EC130 (dup) | NTSB | 2021 | EC130-B4 | MEDIUM | A_REFERENCE_CANDIDATE | limited | Duplicates UC-019; A-only |
| 15 | NEW50-31__2000__NTSB-USA__Sikorsky-S-76B__Helicopter-EMS-S-76B-Night-CFIT-during-EMS.txt | S-76B EMS | NTSB | 2000 | S-76B | LOW | SOURCE_SLICE_REQUIRED | no | Small TXT (13KB); sparse |
| 16 | NEW50-37__2021__TSB-Canada__Small-aircraft-helicopter-ver-TSB-para-tipo-exato__Air-transportation-safety-investigation-repor.txt | TSB light helicopter (dup) | TSB | 2021 | light helicopter | MEDIUM | FULL_P_O_A_TRACE_CANDIDATE | limited | Duplicates UC-046/UC-085 |
| 17 | NEW50-38__2000__NTSB-USA__Learjet-35A__Learjet-35A-N47BA-CFIT-near-Aberdeen-SD-199.txt | Learjet 35A (Payne Stewart) | NTSB | 2000 | Learjet 35A | HIGH | FULL_P_O_A_TRACE_CANDIDATE | yes | Hypoxia; strong A-signal (244) |
| 18 | NEW50-41__1984__AAIB-UK__Sikorsky-S-61N__Sikorsky-S-61N-G-BEON-British-Airways-Helic.txt | S-61N G-BEON | AAIB | 1984 | S-61N | LOW | SOURCE_SLICE_REQUIRED | no | Small TXT (4KB); no P/O/A hits |
| 19 | NEW50-42__1991__AAIB-UK__Sikorsky-S-61N__Sikorsky-S-61N-G-BEWL-Brent-Spar-East-Shet.txt | S-61N G-BEWL | AAIB | 1991 | S-61N | LOW | SOURCE_SLICE_REQUIRED | no | Small TXT (3.8KB); no P/O/A hits |
| 20 | NEW50-43__1983__AAIB-UK__Sikorsky-S-61N__Sikorsky-S-61N-G-ASNL-offshore-accident-11.txt | S-61N G-ASNL | AAIB | 1983 | S-61N | LOW | SOURCE_SLICE_REQUIRED | no | Small TXT (3.5KB); no P/O/A hits |
| 21 | NEW50-44__2001__AIBN-Norway__Eurocopter-AS332-L1-Super-Puma__Helikopter-Service-Flight-451-Eurocopter-AS.txt | Helikopter Service 451 | AIBN | 2001 | AS332-L1 | LOW | FULL_P_O_A_TRACE_CANDIDATE | yes | Offshore helicopter; O-dominant |
| 22 | NEW50-46__2020__SHK-Sweden__EC135-H145-class-EMS-helicopter__RL-2020-06e-Helicopter-emergency-medical-se.txt | EMS EC135/H145 | SHK | 2020 | EC135/H145 | MEDIUM | A_REFERENCE_CANDIDATE | limited | Swedish; medium-small (48KB) |
| 23 | NEW50-47__2022__SHK-Sweden__Light-helicopter-see-report__RL-2022-06e-Helicopter-accident-Sweden-SHK.txt | SHK light helicopter 2022 | SHK | 2022 | light helicopter | LOW | O_REFERENCE_CANDIDATE | limited | Swedish; O-dominant (25 hits) |
| 24 | NEW50-48__2023__SHK-Sweden__Light-utility-helicopter__SHK-2023-10e-Helicopter-accident-at-Enköpin.txt | SHK light utility 2023 | SHK | 2023 | light utility | MEDIUM | NOMINAL_O_A_REFERENCE_CANDIDATE | yes | Nominal candidate potential |
| 25 | NEW50-49__2025__SHK-Sweden__Helicopter-likely-EC-series__SHK-2025-18e-Helicopter-accident-Sweden-au.txt | SHK EC series 2025 | SHK | 2025 | EC series | LOW | A_REFERENCE_CANDIDATE | limited | Swedish; small TXT (47KB) |
| 26 | NEW50-50__2025__SHK-Sweden__Light-helicopter__Accident-with-a-helicopter-at-Enköping-Långto.txt | SHK light helicopter 2025 | SHK | 2025 | light helicopter | LOW | A_REFERENCE_CANDIDATE | limited | Swedish; small TXT (47KB) |

## Recovered-pool TXT inventory (a4r111-recovered-pool-txt/)

| # | file | candidate/event | agency | year | aircraft | source confidence | A4R116 impact | eligible for Opus? | notes |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 8__2017__TSB-Canada__Airbus-A320-211__TSB-A15H0002-Air-Canada-A320-Halifax.txt | Air Canada 624 Halifax | TSB | 2017 | A320-211 | HIGH (official PDF) | ADD_TO_FUTURE_BATCH | yes | Previously parked; official TXT now available |
| 2 | 9__2014__TSB-Canada__Boeing-737-210C__TSB-A11H0002-First-Air-6560-Resolute-Bay.txt | First Air 6560 Resolute Bay | TSB | 2014 | B737-210C | HIGH (official PDF) | ADD_TO_FUTURE_BATCH | yes | CFIT; previously parked |
| 3 | 12__2016__TSB-Canada__Sikorsky-S-76A__TSB-A13H0001-Ornge-S-76A-Moosonee.txt | Ornge S-76A Moosonee | TSB | 2016 | S-76A | HIGH (official PDF) | ADD_TO_FUTURE_BATCH | yes | Night HEMS CFIT; rotorcraft |
| 4 | 27__2024__TSB-Canada__Airbus-AS350-B2__TSB-A21C0038-AS350-Griffith-Island.txt | AS350 Griffith Island | TSB | 2024 | AS350-B2 | HIGH (official PDF) | ADD_TO_FUTURE_BATCH | yes | Helicopter VFR/terrain |
| 5 | 34__2011__TSB-Canada__Sikorsky-S-92A__TSB-A09A0016-Cougar-S-92A.txt | Cougar S-92A | TSB | 2011 | S-92A | HIGH (official PDF) | ADD_TO_FUTURE_BATCH | yes | Offshore emergency; boundary adjacent |
| 6 | 38__1973__NTSB-USA__Lockheed-L-1011-1__NTSB-AAR-73-14-Eastern-401.txt | Eastern 401 | NTSB | 1973 | L-1011-1 | NONE | OCR_REQUIRED | no | Form-feed only (50B); needs OCR |
| 7 | 40__1986__NTSB-USA__Lockheed-L-1011-385-1__NTSB-AAR-86-05-Delta-191.txt | Delta 191 | NTSB | 1986 | L-1011-385-1 | NONE | OCR_REQUIRED | no | Form-feed only (167B); needs OCR |
| 8 | 42__2022__TSB-Canada__Bell-212__TSB-A21P0018-Collision-Terrain-Bowen-Island.txt | Bell 212 Bowen Island | TSB | 2022 | Bell 212 | HIGH (official PDF) | SOURCE_SLICE_REFINEMENT_CANDIDATE | yes | Previously mismatched metadata; now corrected |
| 9 | NEW50-22__2011__AAIB-UK__Eurocopter-AS332-L2-Super-Puma__G-REDL-AAIB-2-2011.txt | Super Puma G-REDL | AAIB | 2011 | AS332-L2 | LOW (HTML) | REVIEW_ONLY | limited | Low-density GOV.UK HTML; boundary only |
| 10 | NEW50-24__2015__TSB-Canada__Bell-206B__TSB-A13W0070-Bell-206B-Fort-McMurray.txt | Bell 206B Fort McMurray | TSB | 2015 | Bell 206B | HIGH (official PDF) | ADD_TO_FUTURE_BATCH | yes | Helicopter loss-of-control |
| 11 | NEW50-35__2013__GCAA-UAE__Boeing-747-44AF__UPS6-CAA-UK-mirror.txt | UPS6 Dubai cargo fire | GCAA | 2013 | B747-44AF | MEDIUM (mirror) | ADD_TO_FUTURE_BATCH | yes | Cargo fire; same operator as UPS-1354 |
| 12 | NEW50-7__2008__CENIPA-Brazil__Boeing-737-8EH__Gol-1907-ASN-mirror.txt | Gol 1907 | CENIPA/ASN | 2008 | B737-8EH | LOW (ASN mirror) | REVIEW_ONLY | limited | Secondary source; source recheck needed |

## Notes
- A4R112 matrix ID (UC-XXX) mapping preserved for traceability.
- A4R115 already covers 6 full-axis trace drafts: UPS-1354, AMERICAN-1420, ASIANA-214, COLGAN-3407, US-AIRWAYS-1549, AMERICAN-965.
- Files marked `eligible for Opus? yes` are candidates for Task 2 POA signal screening, not automatic Opus selection.
- DUPLICATE events between pools (Turøy, USAir 1493, US Airways 1549, TSB light helicopter, Grand Canyon) flagged to avoid double-counting in selection.
- Recovered corpus primary value: 8 content-bearing official TXTs that were previously PARKED in A4R112.
