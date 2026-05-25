# COMAIR-5191 Gate Readiness A4R145

Status: PRE_GATE_INTAKE_ONLY
P/O/A status: NOT_CLASSIFIED
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## source files

- `docs/sera-vnext/source-corpus/official-reports/a4r105-curated-txt/COMAIR-5191-NTSB-AAR0705.txt`
- `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/6__2007__NTSB-USA__CRJ-100__Attempted-Takeoff-From-Wrong-Runway-Comair-F.txt`

## sourceQuality

HIGH

## candidate escape point evidence

- Runway 22 clearance context + runway 26 alignment + takeoff initiation sequence are documented in local source.
- First-departure candidate is near runway-26 hold-short crossing / wrong-runway line-up / takeoff roll initiation.

## candidate temporal type

- `escapePointTemporalType`: DISCRETE_ESCAPE_POINT (most likely).
- `firstObservableUnsafeMarker` candidate: crossing/continuing beyond runway-26 hold-short toward lineup under runway-22 operation context.
- `criticalPointRisk`: LOW (critical phase later in takeoff roll is not needed as primary anchor).
- `accidentOutcomeContaminationRisk`: LOW.

## candidateWhenStatement (draft only, pre-gate)

"Quando a aeronave cruzou o hold short e iniciou alinhamento/decolagem na pista 26 sob autorizacao operacional para pista 22."

## HF candidate evidence near escape point

- Monitoring/cross-check breakdown in taxi-to-takeoff transition.
- Attention/task management degradation in runway verification stage.
- Crew/ATC coordination context present.

## competing technical/environmental evidence

- No dominant technical malfunction at first-departure marker in available local source.
- Environmental context exists but does not dominate first departure anchor in this pre-gate intake.

## gate readiness status

`PRE_GATE_READY_FOR_ESCAPE_POINT_GATE`

## what must be decided before future reaudit

1. micro-anchor among hold-short crossing, runway line-up, and takeoff roll onset;
2. strict exclusion of post-escape roll/impact as primary axis basis;
3. explicit actor decomposition at anchor moment.

## nextAction

Build full escape-point gate package in future phase under A4R137/A4R138/A4R140, keeping this document intake-only.
