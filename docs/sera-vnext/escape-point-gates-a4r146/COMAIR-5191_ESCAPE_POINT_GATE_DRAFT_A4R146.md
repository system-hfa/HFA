# COMAIR-5191 Escape Point Gate Draft A4R146

Status: PRE_GATE_DRAFT_ONLY
P/O/A status: NOT_CLASSIFIED
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## 1. eventIdOrLabel
COMAIR-5191

## 2. sourceFilesUsed
- `docs/sera-vnext/source-corpus/official-reports/a4r105-curated-txt/COMAIR-5191-NTSB-AAR0705.txt`
- `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/6__2007__NTSB-USA__CRJ-100__Attempted-Takeoff-From-Wrong-Runway-Comair-F.txt`
- `docs/sera-vnext/lane-a-source-slices-a4r144/COMAIR-5191_SOURCE_SLICE_A4R144.md`
- `docs/sera-vnext/gate-readiness-a4r145/COMAIR-5191_GATE_READINESS_A4R145.md`

## 3. sourceQuality
HIGH

## 4. operationSafeState
Taxi and departure setup aligned with the runway in active operational use and matching ATC taxi/takeoff flow before takeoff roll initiation.

## 5. controlledVariable
Runway alignment and runway-specific takeoff path selection at lineup/takeoff initiation.

## 6. safeLimitOrExpectedBoundary
Aircraft must remain aligned with the expected runway path for departure clearance context before crossing into takeoff roll commitment.

## 7. unsafeActOrConditionCandidate
Aircraft transitioned into lineup/takeoff initiation on runway 26 while departure flow and cues remained tied to runway 22 context.

## 8. firstObservableUnsafeMarkerCandidates
- Crossing/continuing beyond runway-26 hold-short toward lineup under runway-22 context.
- Nosewheel/path alignment into runway 26 centerline.
- Initiation of takeoff roll on runway 26.

## 9. escapePointTemporalType
DISCRETE_ESCAPE_POINT

## 10. candidateWhenStatement
Quando a aeronave cruzou o hold short da pista 26 e prosseguiu para alinhamento/inicio de corrida em pista operacionalmente incompativel com a pista esperada para decolagem.

## 11. whenStatementQuality
NEEDS_AUTHOR_REVIEW

## 12. criticalPointRisk
LOW

## 13. warningAsEscapePointRisk
LOW

## 14. accidentOutcomeContaminationRisk
LOW

## 15. postEscapeActionContaminationRisk
LOW

## 16. competingTechnicalEnvironmentalEvidence
No dominant technical malfunction at first-departure candidate in available local source.

## 17. hfEvidenceNearEscapePoint
Runway-verification and cross-check chain degradation is documented near lineup/takeoff commitment.

## 18. unresolvedGateQuestions
- Exact micro-anchor choice between hold-short crossing, runway-centerline commitment, and thrust-application onset.
- Final wording neutrality to avoid implied violation/objective framing in the "Quando..." nucleus.

## 19. gateDraftStatus
ESCAPE_POINT_GATE_DRAFT_READY

## 20. futureReauditEligibility
ELIGIBLE_AFTER_AUTHOR_REVIEW

## 21. explicitLock
NO_POA_CLASSIFIED / NO_RELEASED_CODE / NO_DOWNSTREAM
