# UPS-1354 Gate Readiness A4R145

Status: PRE_GATE_INTAKE_ONLY
P/O/A status: NOT_CLASSIFIED
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## source files

- `docs/sera-vnext/source-corpus/official-reports/a4r105-curated-txt/UPS-1354-NTSB-AAR1402.txt`
- `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/3__2014__NTSB-USA__Airbus-A300-600F__Crash-During-Nighttime-Nonprecision-Approach.txt`
- `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/NEW50-35__2013__GCAA-UAE__Boeing-747-44AF__UPS6-CAA-UK-mirror.txt` (secondary context)

## sourceQuality

HIGH

## candidate escape point evidence

- Local source documents setup for localizer nonprecision approach and later transition to vertical-speed descent mode.
- Source documents continuation below minima and stabilized-approach breach without timely correction.

## candidate temporal type

- `escapePointTemporalType`: DISCRETE_ESCAPE_POINT (with caution).
- `firstObservableUnsafeMarker` candidate: continuation of descent profile after mode-state transition removed valid vertical-path protection.
- `criticalPointRisk`: MEDIUM (descent deep below minima can be confused with first departure).
- `accidentOutcomeContaminationRisk`: MEDIUM (terrain impact phase is strongly present in narrative).

## candidateWhenStatement (draft only, pre-gate)

"Quando, na transicao para modo vertical-speed sem perfil vertical valido, a descida prosseguiu para abaixo dos minimos sem correção."

## HF candidate evidence near escape point

- Mode-state handling and shared understanding degradation.
- Monitoring/callout performance issues.
- Fatigue/context factors present near approach decision chain.

## competing technical/environmental evidence

- Weather/approach environment constraints are present.
- No hard dominant onboard system failure at first-departure anchor in available local source.

## gate readiness status

`PRE_GATE_READY_WITH_CAUTION`

## what must be decided before future reaudit

1. exact first-departure anchor before deep-below-minima consequence segment;
2. explicit exclusion of post-escape corrective attempts as A-axis anchor;
3. separation between mode-state transition and downstream impact chronology.

## nextAction

Prepare constrained escape-point gate draft with temporal guards (pre-impact only) in future phase.
