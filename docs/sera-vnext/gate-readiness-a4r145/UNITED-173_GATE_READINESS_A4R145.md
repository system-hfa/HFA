# UNITED-173 Gate Readiness A4R145

Status: PRE_GATE_INTAKE_ONLY
P/O/A status: NOT_CLASSIFIED
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## source files

- `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/21__1979__NTSB-USA__McDonnell-Douglas-DC-8-61__Aircraft-Accident-Report-AAR-79-07-United-A.txt`

## sourceQuality

MEDIUM

## candidate escape point evidence

- Local source documents prolonged holding with landing-gear abnormality management.
- Repeated fuel-state advisories and delayed transition to immediate approach are documented before multi-engine flameout sequence.

## candidate temporal type

- `escapePointTemporalType`: DISCRETE_ESCAPE_POINT (with progressive-like drift risk).
- `firstObservableUnsafeMarker` candidate: continuation of holding/problem-solving after fuel advisories crossed critical threshold.
- `criticalPointRisk`: MEDIUM (engine flameout onset can be misused as first departure).
- `accidentOutcomeContaminationRisk`: MEDIUM.

## candidateWhenStatement (draft only, pre-gate)

"Quando a permanencia em espera continuou apos alertas criticos de combustivel sem transicao imediata para estrategia de pouso."

## HF candidate evidence near escape point

- Monitoring and prioritization breakdown between landing-gear troubleshooting and fuel-state management.
- Crew communication/advisory handling issues are documented.

## competing technical/environmental evidence

- Landing-gear abnormal indication is a technical stressor in context.
- Available local source does not support technical-dominant first departure in the selected pre-gate anchor.

## gate readiness status

`PRE_GATE_READY_WITH_CAUTION`

## what must be decided before future reaudit

1. exact threshold for first departure before first engine flameout sequence;
2. strict split between pre-escape holding decisions and post-escape engine-loss cascade;
3. timeline hardening due OCR/noise in local text.

## nextAction

Prepare escape-point gate with explicit pre-flameout anchor and contamination guard in future phase.
