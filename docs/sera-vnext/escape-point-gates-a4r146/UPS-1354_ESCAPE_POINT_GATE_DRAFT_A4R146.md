# UPS-1354 Escape Point Gate Draft A4R146

Status: PRE_GATE_DRAFT_ONLY
P/O/A status: NOT_CLASSIFIED
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## 1. eventIdOrLabel
UPS-1354

## 2. sourceFilesUsed
- `docs/sera-vnext/source-corpus/official-reports/a4r105-curated-txt/UPS-1354-NTSB-AAR1402.txt`
- `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/3__2014__NTSB-USA__Airbus-A300-600F__Crash-During-Nighttime-Nonprecision-Approach.txt`
- `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/NEW50-35__2013__GCAA-UAE__Boeing-747-44AF__UPS6-CAA-UK-mirror.txt`
- `docs/sera-vnext/lane-a-source-slices-a4r144/UPS-1354_SOURCE_SLICE_A4R144.md`
- `docs/sera-vnext/gate-readiness-a4r145/UPS-1354_GATE_READINESS_A4R145.md`

## 3. sourceQuality
HIGH

## 4. operationSafeState
Nonprecision approach flown with valid vertical path control and altitude margin discipline until minimum constraints.

## 5. controlledVariable
Vertical path/altitude margin control during final approach segment.

## 6. safeLimitOrExpectedBoundary
Descent profile should remain within valid path guidance and above minimum descent constraints until visual/authorized continuation conditions.

## 7. unsafeActOrConditionCandidate
Approach shifted to vertical-speed descent without valid profile-path protection and continued into below-minima risk trajectory.

## 8. firstObservableUnsafeMarkerCandidates
- Mode transition from profile-intended path to vertical-speed descent with unresolved vertical path validity.
- Continuation of descent after stabilized criteria and minima guard erosion.

## 9. escapePointTemporalType
DISCRETE_ESCAPE_POINT

## 10. candidateWhenStatement
Quando a aproximacao passou para descida em vertical-speed sem protecao vertical valida e a trajetoria vertical continuou alem da margem minima esperada.

## 11. whenStatementQuality
CLEAN

## 12. criticalPointRisk
MEDIUM

## 13. warningAsEscapePointRisk
MEDIUM

## 14. accidentOutcomeContaminationRisk
HIGH

## 15. postEscapeActionContaminationRisk
MEDIUM

## 16. competingTechnicalEnvironmentalEvidence
Weather and approach-environment constraints are relevant but do not establish hard technical-dominant onset in available local source.

## 17. hfEvidenceNearEscapePoint
Mode-state handling, cross-monitoring, and crew shared-understanding degradation are documented near the candidate first departure segment.

## 18. unresolvedGateQuestions
- Exact first departure marker between mode transition and later below-minima continuation.
- Explicit boundary between pre-escape anchor and warning/impact consequence sequence.

## 19. gateDraftStatus
ESCAPE_POINT_GATE_DRAFT_READY_WITH_CAUTION

## 20. futureReauditEligibility
CONDITIONAL

## 21. explicitLock
NO_POA_CLASSIFIED / NO_RELEASED_CODE / NO_DOWNSTREAM
