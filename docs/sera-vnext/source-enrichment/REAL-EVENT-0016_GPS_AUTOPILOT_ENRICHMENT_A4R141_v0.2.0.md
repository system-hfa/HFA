# REAL-EVENT-0016 GPS/Autopilot Source Enrichment A4R141 v0.2.0

Status:
- SOURCE_ENRICHMENT_RECORDED
- REAL-EVENT-0016_ONLY
- NOT_CLASSIFIED
- NO_P_O_A_CLASSIFICATION
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## objective

Provide focused local source enrichment for REAL-EVENT-0016 to support Pilot 2 entry under A4R138/A4R140, specifically distinguishing technical failure vs pilot interpretation/automation mode-state vs monitoring/integration explanations at the escape-point timeframe.

## scope

- Local sources only.
- No new external collection.
- No P/O/A classification or reauditing.
- No release/downstream/final outputs.

## source files searched

1. `docs/sera-vnext/source-corpus/txt-events/pdf24_merged.txt`
2. `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-006.md`
3. `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-006.md`
4. `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0016-CANONICAL-DRAFT-A4R104.md`
5. `docs/sera-vnext/author-review-packets-a4r131/AUTHOR-REVIEW-REAL-EVENT-0016-A4R131.md`
6. `docs/sera-vnext/real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-BATCH2-006.md`
7. `docs/sera-vnext/SERA_ENGINE_VNEXT_REAL_EVENT_POA_REAUDIT_RESET_REGISTER_A4R137_v0.2.0.md`
8. `docs/sera-vnext/SERA_ENGINE_VNEXT_METHODOLOGY_CONTROL_BOARD_A4R135_v0.2.0.md`
9. `docs/sera-vnext/SERA_ENGINE_VNEXT_POA_AT_ESCAPE_POINT_METHOD_RESET_A4R137_v0.2.0.md`
10. `docs/sera-vnext/SERA_ENGINE_VNEXT_REAL_EVENT_REAUDIT_PROTOCOL_A4R138_v0.2.0.md`
11. `docs/sera-vnext/SERA_ENGINE_VNEXT_PROGRESSIVE_ESCAPE_POINT_GUIDANCE_A4R140_v0.2.0.md`
12. `docs/sera-vnext/SERA_ENGINE_VNEXT_REAL_EVENT_REAUDIT_PILOT_PLAN_A4R138_v0.2.0.md`
13. `docs/sera-vnext/SERA_ENGINE_VNEXT_CANDIDATE_FREEZE_READINESS_v0.2.0.md`

## search terms used

- Identification: `REAL-EVENT-0016`, `N8DX`, `Cessna 500`, `C500`, `Citation`, `automation confusion`, `LOC`, `loss of control`
- GPS/autopilot: `GPS`, `Garmin`, `autopilot`, `auto pilot`, `AP`, `flight director`, `mode`, `mode-state`, `nav mode`, `heading mode`, `altitude mode`, `approach mode`, `lateral mode`, `vertical mode`, `coupling`, `coupled`, `disconnect`, `disconnected`, `disengage`, `failure`, `malfunction`, `anomaly`, `technical failure`
- Pilot interpretation: `difficulty`, `unable`, `could not`, `confused`, `interpreted`, `mode awareness`, `automation`, `steering`, `control`, `directional control`, `report`, `pilot reported`
- Warnings/consequence: `TAWS`, `warning`, `alert`, `impact`, `descent`, `unstable`, `altitude deviation`

## evidence fragments found

1. Pilot reported GPS difficulty while route amendment was being entered in Garmin (`pdf24_merged.txt`, lines 49-51).
2. Pilot reported steering problem and inability to steer well (`pdf24_merged.txt`, lines 62, 71).
3. Pilot reported temporary return of autopilot stability (`pdf24_merged.txt`, line 74).
4. Pilot again reported Garmin tuning/access difficulty (`pdf24_merged.txt`, line 81).
5. Autopilot disconnect tones were recorded in flight chronology (`pdf24_merged.txt`, lines 59, 104-105).
6. TAWS sink-rate and pull-up warnings were recorded in final segment (`pdf24_merged.txt`, lines 105-112).
7. Major autopilot components were examined postaccident and no autopilot failure evidence was found (`pdf24_merged.txt`, lines 134-137).
8. Mechanic reported no maintenance issues on autopilot/gyros/Garmin/flight controls before accident (`pdf24_merged.txt`, lines 295-297).
9. Instructor/friend described pilot as confused with Garmin operation and flight-plan amendment handling (`pdf24_merged.txt`, lines 222-225).
10. Instructor/friend described high autopilot dependence and trim misunderstanding causing airplane/autopilot fighting (`pdf24_merged.txt`, lines 227-232).
11. Local extraction A4R72-B2-006 preserves same facts and explicitly records no confirmed preimpact autopilot hardware failure.
12. Local adjudication A4R73-006 records interpretation/mode-awareness boundary and unresolved action chain.
13. Local trace A4R104 preserves uncertainty: mode-state chronology and action chain remain coarse.

## evidence not found

- No local evidence confirming a real GPS/autopilot hardware malfunction at escape-point time.
- No local evidence with complete autopilot mode-state timeline at each critical second of departure.
- No local evidence with complete control-input chain decomposition that isolates action mechanism independently from automation interpretation.
- No local primary event-specific FDR/CVR parameter table for this case in `official-reports` archive tree; enrichment relies on local `pdf24_merged.txt` narrative packet plus local SERA artifacts.

## technical failure evidence

Technical failure as dominant explanation is **not supported** in local evidence:
- no autopilot failure evidence found in examined components;
- no preaccident maintenance issue reported for autopilot/gyros/Garmin/flight controls.

## pilot interpretation/mode-state evidence

Pilot interpretation/mode-state explanation is **supported**:
- repeated pilot-reported GPS/Garmin usage difficulty;
- repeated pilot-reported steering/control difficulty during automation interaction;
- instructor/friend statements of confusion with Garmin operation and autopilot/trim understanding;
- local adjudication and trace artifacts consistently preserve this boundary as the strongest current reading.

## available-information/monitoring evidence

Available-information/not-integrated reading is **partially supported but not dominant**:
- relevant information appears to have been available in cockpit systems;
- difficulty seems to include monitoring/integration under high single-pilot workload;
- however, local evidence leans more specifically toward interpretation/automation-mode understanding issues than pure monitoring omission.

## unresolved ambiguities

1. Exact autopilot mode-state sequence at first departure moment remains unresolved.
2. Exact first-departure control input chain remains unresolved.
3. Relative weight between interpretation failure and monitoring/integration lapse is not fully separable.
4. Technical-failure exclusion is strong but not equivalent to full mechanism closure at escape-point second-by-second level.

## direct answer to central question

At the escape-point moment, local evidence supports **B. Pilot interpretation / mode-state understanding likely**.

Secondary caution: monitoring/integration issues may co-exist, but local evidence does not support technical failure as dominant and does not fully separate all mechanism layers.

## sourceConfidence

`MEDIUM`

Rationale:
- strong internal consistency across local packet;
- explicit no-failure indications;
- but no full mode-state timeline and no local primary technical dataset closure for second-by-second mechanism.

## methodological impact for A4R142

- Recommended output class for this enrichment phase: `READY_FOR_REAUDIT_INTERPRETATION_DOMINANT`.
- Pilot 2 can proceed under A4R138/A4R140 with explicit automation-boundary caution.
- A4R142 must not assume technical failure without new primary evidence.
- A4R142 must not treat TAWS/final descent as escape-point anchor.
- A4R142 must keep action mechanism open where evidence remains non-separable.

## recommendedPilot2EntryCondition

`READY_FOR_REAUDIT_INTERPRETATION_DOMINANT` with conditional entry controls below:
1. Declare `escapePointTemporalType` before any axis analysis.
2. Anchor interpretation only at escape-point window, not at critical/outcome markers.
3. Keep `technicalFailureAlternative` as not supported by current local evidence, while documenting residual uncertainty.
4. Do not convert post-escape corrective actions or TAWS sequence into primary action/perception proof.
5. If axis closure still depends on missing mode-state timeline, keep unresolved/block status per A4R138/A4R140.

## restrictions

- No P/O/A classification in this phase.
- No released code and no downstream.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.
- No corpus expansion and no external source ingestion.

## locks preserved

- NO_RELEASED_CODE.
- NO_DOWNSTREAM.
- No `selectedCode=CLASSIFIED`.
- No final conclusion artifacts.
- No fixture/baseline/runtime/UI/API/DB/migration/code changes.
