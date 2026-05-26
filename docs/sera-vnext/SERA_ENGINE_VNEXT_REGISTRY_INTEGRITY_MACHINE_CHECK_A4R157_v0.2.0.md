# SERA Engine vNext Registry Integrity Machine Check A4R157 v0.2.0

Status: REGISTRY_INTEGRITY_MACHINE_CHECK_EXECUTED
Phase: A4R157
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Objective

Execute a local-only machine check of `eventId x localTxtPath x title/report id x registration x operator x aircraft x date x authority x source type` consistency before any gate-prep or P/O/A progression.

## Relation to Prior Phases

- A4R153: introduced contamination and path-misattribution overlays.
- A4R154: introduced registry correction overlays and source-integrity locks.
- A4R155: advanced official-source recovery lanes.
- A4R156: unblocked Delta OCR lane and Turoy source lane, while keeping BS211/QF72 constraints.
- A4R157: verifies whether current registry/path linkage is coherent enough for safe progression.

## Method

- local-only workdir: `tmp/a4r157-registry-integrity/`
- inventory generated: `tmp/a4r157-registry-integrity/local_txt_files.txt`
- temporary local-only script: `tmp/a4r157-registry-integrity/check_registry_integrity.py`
- local-only outputs:
  - `registry_integrity_results.csv`
  - `duplicate_path_map.csv`
  - `unreferenced_local_txt_files.csv`
  - `missing_or_bad_paths.csv`
  - `high_risk_misattribution_candidates.csv`

No script/output from `tmp/a4r157-registry-integrity/` was versioned.

## Files Read

- `docs/sera-vnext/SERA_ENGINE_VNEXT_SOURCE_RECOVERY_OCR_A4R156_v0.2.0.md`
- `docs/sera-vnext/source-recovery-a4r156/SOURCE_RECOVERY_OCR_EXECUTION_A4R156_v0.2.0.md`
- `docs/sera-vnext/source-recovery-a4r156/OCR_EXTRACTION_QUALITY_MATRIX_A4R156_v0.2.0.csv`
- `docs/sera-vnext/source-recovery-a4r156/SOURCE_COMPLETENESS_BLOCKER_UPDATE_A4R156_v0.2.0.csv`
- `docs/sera-vnext/source-recovery-a4r156/NEGATIVE_CONTROL_READINESS_UPDATE_A4R156_v0.2.0.md`
- `docs/sera-vnext/source-recovery-a4r156/A4R157_NEXT_PHASE_DECISION_A4R156_v0.2.0.md`
- `docs/sera-vnext/source-recovery-a4r155/SOURCE_COMPLETENESS_UPDATE_A4R155_v0.2.0.csv`
- `docs/sera-vnext/source-recovery-a4r154/SOURCE_COMPLETENESS_MATRIX_A4R154_v0.2.0.csv`
- `docs/sera-vnext/integrated-corpus-reconciliation-a4r150/INTEGRATED_RECONCILIATION_REGISTRY_A4R150_v0.2.0.csv`
- `docs/sera-vnext/integrated-corpus-reconciliation-a4r150/INTEGRATED_EVENT_SOURCE_MATRIX_A4R150_v0.2.0.md`
- `docs/sera-vnext/post-opus-a4r153/LOCAL_TXT_PATH_INTEGRITY_AUDIT_A4R153_v0.2.0.md`
- `docs/sera-vnext/post-opus-a4r153/CORPUS_CONTAMINATION_REGISTER_A4R153_v0.2.0.md`
- `docs/sera-vnext/post-opus-a4r153/SOURCE_COMPLETENESS_CORRECTION_OVERLAY_A4R153_v0.2.0.csv`
- `docs/sera-vnext/source-recovery-a4r154/INTEGRATED_REGISTRY_CORRECTION_OVERLAY_A4R154_v0.2.0.csv`
- `docs/sera-vnext/README_METHOD_STATUS_A4R135.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_METHODOLOGY_CONTROL_BOARD_A4R135_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANDIDATE_FREEZE_READINESS_v0.2.0.md`

## Main Findings

- confirmed paths: 26
- confirmed-with-caution paths: 16
- missing paths: 0 in checked local path rows (but external-only lanes remain without local path mapping)
- wrong-event-suspected: 7
- duplicate path sharing: 20 rows (10 shared physical paths)
- unreferenced local TXT files: 12
- non-event contamination files detected in unreferenced inventory: 4 (`pdf24_merged-5/6/7/8`)
- bulletin/multi-event file detected in unreferenced inventory: 1 (`pdf24_merged-3`)
- journalism-not-report flags: 2 (1 in checked rows + 1 unreferenced)
- OCR too poor to validate: 16

## Decision

Current integrity is not clean enough for broad gate-prep expansion. The dominant residual risk is duplicate/alias sharing plus unresolved registry/path normalization for selected lanes.

Preferred next step is **A4R158 Registry Correction Overlay** before any gate-prep expansion beyond tightly controlled clean subsets.

## Controls

- no P/O/A
- no gate-prep
- no corpus modification
- no code change
- no downstream

## Metrics

- registryIntegrityMachineCheckCreatedCount: 1
- temporaryScriptCreatedLocalOnlyCount: 1
- registryRowsCheckedCount: 92
- localTxtFilesInventoriedCount: 89
- localTxtPathsCheckedCount: 87
- pathConfirmedCount: 26
- pathConfirmedWithCautionCount: 16
- pathMissingCount: 0
- wrongEventSuspectedCount: 7
- duplicatePathSharedCount: 20
- unreferencedLocalTxtCount: 12
- nonEventDocumentFlaggedCount: 4
- bulletinOrMultiEventFlaggedCount: 1
- journalismNotReportFlaggedCount: 2
- ocrTooPoorToValidateCount: 16
- highRiskIssuesCreatedCount: 34
- duplicateAliasAuditCreatedCount: 1
- smallBatchReadinessCreatedCount: 1
- nextPhaseDecisionCreatedCount: 1
- gatePrepAllowedCount: 1
- gatePrepAllowedWithCautionCount: 4
- gatePrepBlockedCount: 7
- corpusFilesModifiedCount: 0
- corpusFilesMovedCount: 0
- corpusFilesDeletedCount: 0
- pdfHtmlTxtVersionedCount: 0
- poaClassifiedCount: 0
- releasedCodeCreatedCount: 0
- downstreamOpenedCount: 0
- codeFixtureBaselineChangedCount: 0
