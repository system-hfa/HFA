# UPS-1354 Source Slice A4R144

Status: SOURCE_SLICE_INTAKE_ONLY
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM
P/O/A status: NOT_CLASSIFIED

## source files searched/found

- `docs/sera-vnext/source-corpus/official-reports/a4r105-curated-txt/UPS-1354-NTSB-AAR1402.txt`
- `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/3__2014__NTSB-USA__Airbus-A300-600F__Crash-During-Nighttime-Nonprecision-Approach.txt`
- `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/NEW50-35__2013__GCAA-UAE__Boeing-747-44AF__UPS6-CAA-UK-mirror.txt` (context mirror)

## short source-slices (factual)

- Source documents localizer nonprecision approach with profile-path setup and later mode/state mismatch after FMC sequencing issue (curated lines ~607-623, ~635-648).
- Source records continuation below approach minima and stabilized-approach criteria breach without timely go-around (lines ~660-667).
- Source includes documented fatigue-management context and crew shared-understanding issues for approach type (lines ~738-754, ~714-720).

## possible escape point evidence

- Candidate anchor: transition from intended profile approach to vertical-speed descent with continued descent below minima and absent correction.
- Escape evidence confidence for planning: HIGH.

## HF candidate evidence

- Strong evidence of mode-state handling, crew coordination/briefing quality, and monitoring/callout performance.
- Fatigue-risk management context is explicitly documented.

## competing technical/environmental evidence

- Approach availability constraints and ceiling conditions are relevant context.
- No dominant hard system failure is established in this intake slice as onset driver.

## source limitations

- Need strict separation between pre-impact descent-decision chain and terrain-impact consequences.
- Mirror sources should remain secondary to curated/full official report text.

## output assessment

| field | value |
|---|---|
| eventIdOrLabel | UPS-1354 |
| localSourceFound | YES |
| sourceFiles | 3 |
| sourceQuality | HIGH |
| candidateStrength | HIGH |
| escapePointEvidence | HIGH |
| progressiveEscapeRisk | NO |
| technicalDominantRisk | POSSIBLE |
| postEscapeContaminationRisk | POSSIBLE |
| outputStatus | SOURCE_SLICE_READY_FOR_REAUDIT_PLANNING |
| recommendedLane | LANE_A_SOLID_HF_POSITIVE |
| recommendedNextAction | Prepare escape-point gate around descent-mode transition and below-minima continuation segment |
| notPoaStatus | NO_POA_CLASSIFIED |

