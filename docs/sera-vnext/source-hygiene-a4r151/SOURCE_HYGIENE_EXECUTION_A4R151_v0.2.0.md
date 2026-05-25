# Source Hygiene Execution A4R151 v0.2.0

Status: SOURCE_HYGIENE_EXECUTION_RECORDED
Phase: A4R151
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## objective

Prepare an official-source-hygiene packet for Opus readiness without opening P/O/A, reaudits, release, or downstream.

## scope

- Priority source-hygiene execution on MUST_RECOVER_BEFORE_OPUS, post-Opus small-batch targets, negative controls, and rotorcraft/offshore high-value events.
- Official-link confirmation/replacement using authority domains and controlled `curl` checks.
- Temporary downloads only under `tmp/a4r151-source-hygiene/`.

## execution summary

- priorityEventsCheckedCount: 18
- officialPrimarySourceConfirmedCount: 15
- officialPdfDownloadedToTmpCount: 6
- officialHtmlOnlyCount: 9
- localTxtMatchedCorrectEventCount: 12
- localTxtWrongEventCount: 0
- aliasMismatchCorrectedCount: 1
- sourceQualityGoodCount: 12
- sourceQualityUsableWithCautionCount: 0
- sourceQualityOcrPoorCount: 3
- sourceStillMissingCount: 3
- opusReadyCoreCount: 6
- opusReadyNegativeControlCount: 3
- opusSourceRecoveryPendingCount: 9
- opusExcludeForNowCount: 0

## key findings

- ATSB endpoints were not reachable from this environment for QF32/QF72 direct ATSB retrieval (`curl` timeout).
- FAA-hosted copy for Eastern 401 was reachable but text extraction quality is OCR-poor.
- BEA event-specific URLs for AF66 and F-GRHT were not confirmed in this run and remain in source recovery.
- A4R150a alias-path repair remained stable (COUGAR-A11H0001 separated from A09A0016).

## locks preserved

- No P/O/A classification.
- No reaudits.
- No selectedCode CLASSIFIED or releasedCode.
- No downstream.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.
- No corpus TXT edits and no report binaries versioned.
