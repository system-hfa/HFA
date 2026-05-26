# SERA Engine vNext Gate Prep Only A4R159 v0.2.0

Status: GATE_PREP_ONLY_CREATED
Phase: A4R159
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Objective

Prepare escape-point gate candidates ("Quando...") for the A4R158-authorized small batch only, without any P/O/A classification.

## Why A4R159 Is Permitted After A4R158

A4R158 normalized source/path authority and created logical quarantine, allowing a constrained gate-prep pass for COMAIR-5191, COLGAN-3407, EXECUFLIGHT-1526, HELIOS-522, and US-AIRWAYS-1549.

## Method

- Only A4R158-authorized local paths were used.
- Evidence extraction was local-only in `tmp/a4r159-gate-prep/out/GATE_EVIDENCE_NOTES_A4R159.csv`.
- No corpus file mutation, no P/O/A, no release scope.

## Events Worked

- COMAIR-5191
- COLGAN-3407
- EXECUFLIGHT-1526
- HELIOS-522
- US-AIRWAYS-1549 (negative control)

## Candidate "Quando..." Summary

- COMAIR-5191: alignment/takeoff initiation on wrong runway before impact chain.
- COLGAN-3407: progressive loss of defensible energy margin before stick-shaker marker.
- EXECUFLIGHT-1526: unstable vertical-profile recovery threshold before MDA violation/impact.
- HELIOS-522: pressurization-anomaly continuation interval in climb before incapacitation chain.
- US-AIRWAYS-1549: technical-environmental dual-thrust-loss onset after bird ingestion.

## Main Cautions

- Progressive-threshold cases require interval-based phrasing (not false precision).
- Do not substitute warnings or outcomes as first escape point.
- Do not convert probable-cause text into SERA gate output.
- Keep A4R158 duplicate/alias cautions active where applicable.

## Negative Control Behavior

US-AIRWAYS-1549 gate candidate stayed technical-environmental at onset and did not force human-factor origin labeling.

## Author Review Requirement Before P/O/A

All candidates remain advisory gate drafts and require explicit author review before any future P/O/A phase.

## Next Phase Decision

See `docs/sera-vnext/gate-prep-a4r159/A4R160_NEXT_PHASE_DECISION_A4R159_v0.2.0.md`.

## Locks

- NO_P_O_A
- NO_RELEASED_CODE
- NO_DOWNSTREAM
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_RECOMMENDATIONS

## Metrics

- gatePrepOnlyCreatedCount: 1
- gatePrepEventFilesCreatedCount: 5
- gatePrepMatrixCreatedCount: 1
- eventsPreparedCount: 5
- gateCandidateReadyCount: 1
- gateCandidateReadyWithCautionCount: 4
- gateCandidateNotReadyCount: 0
- negativeControlGatePreparedCount: 1
- rejectedAlternativeCount: 20
- authorReviewRequiredCount: 5
- futurePOAOpenedCount: 0
- poaClassifiedCount: 0
- releasedCodeCreatedCount: 0
- downstreamOpenedCount: 0
- finalConclusionCreatedCount: 0
- hfacsCreatedCount: 0
- riskErcCreatedCount: 0
- recommendationsCreatedCount: 0
- corpusFilesModifiedCount: 0
- corpusFilesMovedCount: 0
- corpusFilesDeletedCount: 0
- codeFixtureBaselineChangedCount: 0
