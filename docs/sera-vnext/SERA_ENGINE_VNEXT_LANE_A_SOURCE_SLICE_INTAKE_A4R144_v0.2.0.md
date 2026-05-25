# SERA Engine vNext Lane A Source-Slice Intake A4R144 v0.2.0

Status: LANE_A_SOURCE_SLICE_INTAKE_RECORDED
Phase: A4R144
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## objective

Create a source-slice intake pack for selected Lane A candidates from A4R143, to support planning for future escape-point reaudits without classifying P/O/A.

## relationship to A4R143

- A4R143 defines A4R142 as intake-only.
- A4R144 operationalizes that rule for Lane A by preparing event-level factual slices.
- A4R144 does not create P/O/A authority and does not execute reaudit.

## event list in scope

1. ASIANA-214
2. COMAIR-5191
3. AMERICAN-965
4. AMERICAN-1420
5. KOREAN-801
6. UPS-1354
7. UNITED-173

## method

1. Read A4R137/A4R138/A4R140 and A4R143 overlays.
2. Build local file inventory from the official 89 TXT corpus.
3. Run event-specific searches and select local report files.
4. Extract short factual slices for:
   - pre-escape context,
   - possible escape-point marker/zone,
   - human-factor signal,
   - competing technical/environmental signal,
   - source limits and contamination risks.
5. Assign intake-only output status per event.

## summary table

| event | localSourceFound | sourceQuality | candidateStrength | escapePointEvidence | progressiveEscapeRisk | technicalDominantRisk | postEscapeContaminationRisk | outputStatus | recommendedLane | recommendedNextAction |
|---|---|---|---|---|---|---|---|---|---|---|
| ASIANA-214 | YES | HIGH | HIGH | HIGH | POSSIBLE | POSSIBLE | POSSIBLE | SOURCE_SLICE_READY_WITH_CAUTION | LANE_A_SOLID_HF_POSITIVE | Build 500ft-to-touchdown pre-impact escape-point slice before any axis work |
| COMAIR-5191 | YES | HIGH | HIGH | HIGH | NO | NO | NO | SOURCE_SLICE_READY_FOR_REAUDIT_PLANNING | LANE_A_SOLID_HF_POSITIVE | Prepare escape-point gate around runway misidentification and takeoff initiation |
| AMERICAN-965 | YES | MEDIUM | MEDIUM | MEDIUM | POSSIBLE | NO | POSSIBLE | NEEDS_SOURCE_RECOVERY_BEFORE_REAUDIT | LANE_B_SOURCE_RECOVERY_HIGH_VALUE | Recover cleaner local official text slice before pilot selection |
| AMERICAN-1420 | YES | HIGH | MEDIUM | MEDIUM | POSSIBLE | POSSIBLE | POSSIBLE | SOURCE_SLICE_READY_WITH_CAUTION | LANE_A_SOLID_HF_POSITIVE | Isolate pre-overrun escape anchor during adverse-weather approach continuation |
| KOREAN-801 | YES | HIGH | MEDIUM | MEDIUM | POSSIBLE | POSSIBLE | POSSIBLE | HOLD_BOUNDARY_COMPLEX | LANE_D_SYSTEMIC_TECH_BOUNDARY | Separate frontline crew chain from systemic/ATC-warning-system factors |
| UPS-1354 | YES | HIGH | HIGH | HIGH | NO | POSSIBLE | POSSIBLE | SOURCE_SLICE_READY_FOR_REAUDIT_PLANNING | LANE_A_SOLID_HF_POSITIVE | Prepare escape-point gate around mode/state transition and descent continuation below minima |
| UNITED-173 | YES | MEDIUM | HIGH | HIGH | NO | NO | POSSIBLE | SOURCE_SLICE_READY_FOR_REAUDIT_PLANNING | LANE_A_SOLID_HF_POSITIVE | Prepare escape-point gate around prolonged holding and fuel-state management breakdown |

## per-event source-slice assessment

Detailed per-event intake files:

- [ASIANA-214 source slice](/Users/filipedaumas/SAAS/HFA/docs/sera-vnext/lane-a-source-slices-a4r144/ASIANA-214_SOURCE_SLICE_A4R144.md)
- [COMAIR-5191 source slice](/Users/filipedaumas/SAAS/HFA/docs/sera-vnext/lane-a-source-slices-a4r144/COMAIR-5191_SOURCE_SLICE_A4R144.md)
- [AMERICAN-965 source slice](/Users/filipedaumas/SAAS/HFA/docs/sera-vnext/lane-a-source-slices-a4r144/AMERICAN-965_SOURCE_SLICE_A4R144.md)
- [AMERICAN-1420 source slice](/Users/filipedaumas/SAAS/HFA/docs/sera-vnext/lane-a-source-slices-a4r144/AMERICAN-1420_SOURCE_SLICE_A4R144.md)
- [KOREAN-801 source slice](/Users/filipedaumas/SAAS/HFA/docs/sera-vnext/lane-a-source-slices-a4r144/KOREAN-801_SOURCE_SLICE_A4R144.md)
- [UPS-1354 source slice](/Users/filipedaumas/SAAS/HFA/docs/sera-vnext/lane-a-source-slices-a4r144/UPS-1354_SOURCE_SLICE_A4R144.md)
- [UNITED-173 source slice](/Users/filipedaumas/SAAS/HFA/docs/sera-vnext/lane-a-source-slices-a4r144/UNITED-173_SOURCE_SLICE_A4R144.md)

## ranking for future reaudits (intake-only)

Priority planning order for next pilot-candidate preparation:

1. COMAIR-5191
2. UPS-1354
3. UNITED-173
4. ASIANA-214 (with caution and explicit anchor discipline)
5. AMERICAN-1420 (with caution and weather/continuation boundary handling)
6. KOREAN-801 (boundary-complex hold before pilot use)
7. AMERICAN-965 (source recovery before pilot consideration)

## exclusions and deferred events

- COLGAN-3407 / BS211-Q400 deferred (existing gate/rebuild dependencies).
- HELIOS-522 deferred to later batch due complexity and source-depth handling needs.
- EASTERN-401 deferred for later progressive/distractor boundary handling.
- REAL-EVENT-0016 out of scope for this phase (Lane E conditional active pilot).

## locks preserved

- no P/O/A classified
- no releasedCode
- no selectedCode CLASSIFIED
- no downstream
- no finalConclusion
- no HFACS
- no Risk/ERC
- no ARMS/ERC
- no recommendations
- no code
- no fixtures
- no baseline
- no corpus modification

