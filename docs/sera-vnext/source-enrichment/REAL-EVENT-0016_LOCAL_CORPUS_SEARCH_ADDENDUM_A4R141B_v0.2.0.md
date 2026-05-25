# REAL-EVENT-0016 Local Corpus Search Addendum A4R141-b v0.2.0

Status:
- SUPPLEMENTAL_LOCAL_CORPUS_SEARCH_RECORDED
- REAL-EVENT-0016_ONLY
- NO_P_O_A_CLASSIFICATION
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## objective

Execute a supplemental local-corpus search across the 89 TXT files in the specified source-corpus directories to validate, revise, or downgrade the A4R141 enrichment conclusion for REAL-EVENT-0016.

## reason for addendum

A4R141 was focused on directly related artifacts. A4R141-b expands search coverage to the full local TXT corpus scope requested, to verify whether stronger or contradictory evidence exists about GPS/autopilot technical failure versus pilot interpretation/mode-state at the escape-point timeframe.

## current A4R141 conclusion

- directAnswerToCentralQuestion: `B. Pilot interpretation / mode-state understanding likely`
- readyForPilot2: `CONDITIONAL`
- sourceConfidence: `MEDIUM`

## local corpus inventory

Directory counts:
- `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt`: 33
- `docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool-txt`: 26
- `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt`: 12
- `docs/sera-vnext/source-corpus/official-reports/a4r105-curated-txt`: 10
- `docs/sera-vnext/source-corpus/txt-events`: 7
- `docs/sera-vnext/source-corpus/official-reports/a4r105-curated`: 1

Totals:
- `totalLocalFilesConsidered`: 89
- `sourceCorpusTxtFilesConsidered`: 89

List file used:
- `/tmp/a4r141b_txt_files.txt`

## selected search directories

1. `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/`
2. `docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool-txt/`
3. `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/`
4. `docs/sera-vnext/source-corpus/official-reports/a4r105-curated-txt/`
5. `docs/sera-vnext/source-corpus/txt-events/`
6. `docs/sera-vnext/source-corpus/official-reports/a4r105-curated/`

## excluded directories and reasons

- Directories outside the six requested corpus locations were excluded to preserve A4R141-b scope.
- Non-TXT files were excluded by rule (`-name "*.txt"` only).
- No external download/search was performed.

## search terms used

- Identification: `REAL-EVENT-0016`, `N8DX`, `Cessna 500`, `C500`, `Citation 500`, `Citation`, `automation confusion`, `loss of control`, `LOC`
- GPS/autopilot: `GPS`, `Garmin`, `autopilot`, `auto pilot`, `flight director`, `mode`, `mode-state`, `nav mode`, `heading mode`, `altitude mode`, `approach mode`, `lateral mode`, `vertical mode`, `coupling`, `coupled`, `disconnect`, `disconnected`, `disengage`, `failure`, `malfunction`, `anomaly`, `technical failure`
- Interpretation/usage: `difficulty`, `unable`, `could not`, `confused`, `interpreted`, `mode awareness`, `automation`, `steering`, `directional control`, `pilot reported`, `report.*difficulty`, `control problem`
- Warning/consequence context only: `TAWS`, `warning`, `alert`, `impact`, `descent`, `unstable`, `altitude deviation`

## candidate files matched

- Broad candidate match (`rg -l` with combined terms): `69` files.
- Prioritized candidate subset reviewed in detail (event-proximity filtering): `7` files.
- Strict event-ID match (`N8DX`): `1` file.

Prioritized reviewed files:
1. `docs/sera-vnext/source-corpus/txt-events/pdf24_merged.txt`
2. `docs/sera-vnext/source-corpus/txt-events/pdf24_merged-7.txt`
3. `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/46__2021__TSB-Canada__Light-helicopter-or-small-aircraft-see-report-for-exact-type__Air-transportation-safety-investigation-repor.txt`
4. `docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool-txt/NEW50-37__2021__TSB-Canada__Small-aircraft-helicopter-ver-TSB-para-tipo-exato__Air-transportation-safety-investigation-repor.txt`
5. `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/32__2016__NTSB-USA__Hawker-HS-125-700A__Crash-During-Nonprecision-Instrument-Approach.txt`
6. `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/39__2010__NTSB-USA__Airbus-A320-214__Aircraft-Accident-Report-AAR-10-03-US-Airwa.txt`
7. `docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool-txt/NEW50-15__2010__NTSB-USA__Airbus-A320-214__US-Airways-Flight-1549-A320-214-Ditching-Hu.txt`

Observation:
- Of these 7, only `pdf24_merged.txt` contained direct REAL-EVENT-0016/N8DX-specific evidence.
- Other files were false positives from generic terms (`Citation`, `mode`, `autopilot`, `failure`, `sink rate`).

## source quality ranking

1. **Highest event-specific evidence found in this search scope**  
   `docs/sera-vnext/source-corpus/txt-events/pdf24_merged.txt` (local TXT event packet with explicit N8DX chronology and investigation excerpts).
2. **Official TXT files with term overlap but different events**  
   a4r111/a4r105 files above (not REAL-EVENT-0016).
3. **No additional REAL-EVENT-0016 primary official TXT identified in the 89-file scope**  
   (no second independent event-specific TXT in this corpus subset).

## new evidence found

Supplemental search found additional event-relevant fragments (same event file, not used explicitly in A4R141 list):

1. `pdf24_merged.txt` lines 168-169: no preimpact anomalies found that would preclude normal operation.
2. `pdf24_merged.txt` lines 262-265: Honeywell lists autopilot auto-disconnect technical triggers and manual disconnect paths (disconnect tone is non-diagnostic alone).
3. `pdf24_merged.txt` lines 303-307: probable-cause excerpt emphasizing inability to control without autopilot aid.
4. `pdf24_merged.txt` lines 322-325: analysis excerpt describing likely GPS operation confusion during the accident flight.

`newEvidenceFragmentsFoundCount`: 4

## evidence confirming A4R141

- Pilot-reported GPS/Garmin difficulty during rerouting.
- Pilot-reported steering/control difficulty.
- Autopilot disconnect tones present but not by themselves proof of technical failure.
- Post-impact examination found no evidence of autopilot failure.
- No preimpact anomalies precluding normal operation.
- Friend/mechanic evidence aligns with interpretation/usage and trim/autopilot handling difficulty.

## evidence contradicting A4R141, if any

- No local corpus evidence in the 89 TXT set confirmed a real GPS/autopilot hardware malfunction at escape-point timeframe.
- No additional event-specific official TXT in this scope contradicted A4R141 direction.

## technical failure evidence

- `no evidence of an autopilot failure was found` (`pdf24_merged.txt`, lines 134-137).
- `no preimpact anomalies` (`pdf24_merged.txt`, lines 168-169).
- Mechanic reported no maintenance issues in relevant systems (`pdf24_merged.txt`, lines 295-297).

`technicalFailureEvidenceCountUpdated`: 3

## pilot interpretation/mode-state evidence

- Pilot reported GPS/Garmin usage difficulty during rerouting (`pdf24_merged.txt`, lines 49-52, 80-81).
- Pilot reported steering/control problems while in IMC and subsequent descent/leveling attempts (`pdf24_merged.txt`, lines 62-63, 71-74, 84-86).
- Friend reported persistent confusion with Garmin GTN 750 and flight-plan amendment handling (`pdf24_merged.txt`, lines 222-225).
- Friend reported heavy autopilot dependence and trim misunderstanding (`pdf24_merged.txt`, lines 227-236).
- NTSB analysis excerpt indicates likely GPS operation confusion and inability to control without autopilot (`pdf24_merged.txt`, lines 303-307, 322-325).

`pilotInterpretationEvidenceCountUpdated`: 6

## available information/monitoring evidence

- ATC provided repeated routing/amendment readbacks before degradation, indicating information availability.
- Pilot declared being only “barely able” to keep wings level while requesting vectors, indicating high workload integration stress.
- Evidence supports monitoring/integration strain but not as dominant over interpretation/mode-state indications.

`monitoringIntegrationEvidenceCountUpdated`: 3

## unresolved ambiguities

1. Exact autopilot mode-state sequence at first departure moment remains unresolved.
2. Exact first-departure control-input chain remains unresolved.
3. Relative contribution split between interpretation and monitoring/integration remains partially non-separable.
4. A second independent event-specific official TXT source was not identified in the 89-file scope.

`unresolvedAmbiguityCountUpdated`: 4

## decision

`A4R141_CONFIRMED`

## updated direct answer to central question

`B. Pilot interpretation / mode-state understanding likely`

## updated sourceConfidence

`MEDIUM`

Rationale:
- conclusion reinforced by broader corpus check;
- no contradictory technical-failure confirmation found;
- event-specific evidence in this scope remains concentrated in one TXT event packet.

## updated readyForPilot2

`CONDITIONAL`

## updated recommendedPilot2EntryCondition

`READY_FOR_REAUDIT_INTERPRETATION_DOMINANT` with conditional gates:
1. Maintain escape-point anchoring under A4R138/A4R140.
2. Do not infer technical failure from disconnect tone alone.
3. Keep unresolved/block where mode-state/action chain cannot be closed at first departure moment.
4. Do not use TAWS/consequence sequence as escape-point substitute.

## methodological impact for A4R142

- A4R142 may proceed only as conditional pilot entry.
- No new local-corpus evidence supports technical-failure-dominant reading.
- P/O/A closure must remain blocked where first-departure mechanism remains non-separable.

## restrictions

- No P/O/A classification.
- No release/downstream.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.
- No corpus modification or source expansion.

## locks preserved

- NO_RELEASED_CODE
- NO_DOWNSTREAM
- No `selectedCode=CLASSIFIED`
- No final conclusion artifacts
- No code/fixture/baseline/runtime/UI/API/DB/migration changes
