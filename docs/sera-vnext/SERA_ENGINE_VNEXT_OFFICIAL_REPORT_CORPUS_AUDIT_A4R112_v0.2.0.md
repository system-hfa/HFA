# SERA Engine vNext Official Report Corpus Audit A4R112 v0.2.0

Status: OFFICIAL_REPORT_CORPUS_AUDIT  
Phase: A4+R-112  
DOCS_ONLY  
CORPUS_MINING_AND_SELECTION_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Consolidated counts
| scope | candidates | downloaded | textExtracted | textExtractionFailedOrSkipped | downloadFailedOrBlocked |
|---|---:|---:|---:|---:|---:|
| Lote 1 (A4R111_POOL1) | 48 | 33 | 32 | 1 | 15 |
| Lote 2 (A4R111_POOL2) | 48 | 26 | 25 | 1 | 22 |
| Combinado | 96 | 59 | 57 | 2 | 37 |

## Key audit findings
- Combined pool audited: `96` deduplicated candidates across two 48-candidate manifests.
- Reports downloaded: `59`.
- TXT extracted successfully: `57`.
- Download failed/blocked: `37`.
- TXT extraction failed or skipped after download: `2`.
- Candidates usable for mining (`TXT_EXTRACTED` + local TXT present): `57`.

## Probable duplicates across lot 1 and lot 2
| duplicateGroup | candidateLot1 | candidateLot2 | titleSimilarityJaccard |
|---|---|---|---:|
| DG-01 | 38 — Aircraft Accident Report – Eastern Air Lines Flight 401, L-1011, Everglades CFIT (1972) | NEW50-13 — Eastern Air Lines Flight 401 – L-1011 CFIT Everglades 1972 (NTSB Aircraft Accident Report) | 0.92 |
| DG-02 | 27 — Air Transportation Safety Investigation Report A21C0038 – AS350 B2 C-FYDA Griffith Island | NEW50-28 — Air transportation safety investigation report A21C0038 – AS350 B2 C-FYDA Griffith Island 2021 | 0.91 |
| DG-03 | 34 — Main Gearbox Malfunction/Collision with Water, Cougar Helicopters Flight 91 Sikorsky S-92A (TSB A09A0016) | NEW50-19 — Cougar Helicopters Flight 91 – Sikorsky S-92A C-GZCH, Main Gearbox Malfunction/Collision with Water 2009 (TSB A09A0016) | 0.87 |
| DG-04 | 41 — In-flight Uncontained Engine Failure Airbus A380-842 VH-OQA Qantas Flight 32 (ATSB AO-2010-089) | NEW50-16 — Qantas Flight 32 – In-flight Uncontained Engine Failure A380 VH-OQA 2010 (ATSB AO-2010-089) | 0.83 |
| DG-05 | 35 — Fuel Planning Event, Weather-related Event and Ditching VH-NGA Norfolk Island (ATSB AO-2009-072, reopened) | NEW50-20 — Pel-Air VH-NGA – Fuel Planning, Weather-related Event and Ditching near Norfolk Island 2009 (ATSB AO-2009-072) | 0.76 |
| DG-06 | 40 — Aircraft Accident Report AAR-86/05 – Delta Air Lines Flight 191, L-1011, DFW Microburst Accident | NEW50-11 — Delta Air Lines Flight 191 – L-1011 DFW Microburst Accident 1985 (NTSB AAR-86/05) | 0.71 |
| DG-07 | 37 — Aircraft Accident Report AAR-82/08 – Air Florida Flight 90, Boeing 737-222, Washington National | NEW50-12 — Air Florida Flight 90 – Boeing 737-222, Washington National 1982 (NTSB AAR-82/08) | 0.64 |
| DG-08 | 18 — Airbus Helicopters EC225 LP LN-OJF Turøy Norway Accident Report | NEW50-23 — Airbus Helicopters EC225 LP LN-OJF – Turøy Norway 2016 (AIBN Report 2018) | 0.64 |
| DG-09 | 36 — Aircraft Accident Report AAR-91/08 – Runway Collision of USAir Flight 1493 and SkyWest Flight 5569, LAX | NEW50-14 — USAir Flight 1493 – Runway Collision with SkyWest 5569, LAX 1991 (NTSB AAR-91/08) | 0.56 |

## Candidates without ideal official source
- `SECONDARY_SOURCE`: `6` candidates (e.g., Skybrary/Commons/FSS mirrors).
- `SOURCE_RECHECK_REQUIRED`: `37` candidates (failed download, blocked access, or missing usable official file).

### Secondary-source examples
- 13 (A4R111_POOL1): https://web.archive.org/web/20120601192813/http://www.aaib.gov.uk/publications/formal_reports/4_1990_g_obme.cfm
- 40 (A4R111_POOL1): https://commons.wikimedia.org/wiki/File:Delta-Air-Lines-Flight-191-NTSB-Final-Report-AAR-86-05.pdf
- 47 (A4R111_POOL1): https://www.fss.aero/accident-reports/dvdfiles/US/1982-01-13-US.pdf
- 48 (A4R111_POOL1): https://www.fss.aero/accident-reports/dvdfiles/US/1991-02-01-US.pdf
- NEW50-6 (A4R111_POOL2): https://asn.flightsafety.org/reports/2007/20070717_A320_PR-MBK.pdf
- NEW50-11 (A4R111_POOL2): https://commons.wikimedia.org/wiki/File:Delta-Air-Lines-Flight-191-NTSB-Final-Report-AAR-86-05.pdf

### Source recheck recommendations
- Recheck candidates with 404/403/timeouts using official agency endpoints before any trace attempt.
- Keep secondary mirrors quarantined as metadata pointers, not factual evidence authority.
- Prioritize recheck for candidates with high O/A potential but currently blocked.
