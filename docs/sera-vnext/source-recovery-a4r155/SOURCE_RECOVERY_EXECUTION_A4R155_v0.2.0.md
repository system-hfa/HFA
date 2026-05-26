# Source Recovery Execution A4R155 v0.2.0

Status: SOURCE_RECOVERY_EXECUTED
Phase: A4R155

## Objective

Execute priority official-source recovery from prevalidated targets, using local-only downloads/extractions for source-quality verification, without P/O/A, reaudit, gate-prep, corpus change, or code change.

## Source Discovery Input

This execution used the ChatGPT/web prevalidated official targets provided in A4R155 scope as recovery targets only.

## Local Workdir

- `tmp/a4r155-source-recovery/downloads/`
- `tmp/a4r155-source-recovery/extracted-txt/`
- `tmp/a4r155-source-recovery/logs/`

All downloaded/extracted files are local-only and untracked.

## Versioning Constraint

No PDFs/HTML/TXT downloaded or extracted in `tmp/a4r155-source-recovery/` were versioned.

## Item Results (8)

| itemId | eventName | authority | officialUrlConfirmed | downloadedLocalOnly | extractedTextLocalOnly | extractionStatus | sourceReadinessAfterA4R155 | deepReviewEligibilityAfterA4R155 | negativeControlEligibilityAfterA4R155 | remainingBlocker | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| A4R155-01 | G-WNSB-SUMBURGH | AAIB UK | YES | YES | YES | GOOD | SOURCE_READY_FROM_OFFICIAL_PDF | YES | NO | NONE | Full AAIB AAR PDF recovered and legible. |
| A4R155-02 | BS211 / US-Bangla 211 | Government of Nepal repository | YES | YES (repository page + secondary mirror) | YES | RESTRICTED_GOVERNMENT_REPOSITORY | SOURCE_PENDING_FOR_TEXT | NO | NO | RESTRICTED_GOVERNMENT_REPOSITORY | Official repository confirmed but direct official PDF access remains restricted; mirror treated as secondary only. |
| A4R155-03 | N8DX / REAL-EVENT-0016 | NTSB | YES | YES | YES | GOOD | SOURCE_READY_FROM_OFFICIAL_NTSB_REPORT | YES | NO | NONE | Official NTSB final report and docket recovered. |
| A4R155-04 | DELTA-191 | NTSB | YES | YES | YES | OCR_REQUIRED | SOURCE_RECOVERY_PENDING_OCR | NO | NO | OCR_REQUIRED | Extraction from official PDF is near-empty; OCR still required. |
| A4R155-05 | QF32 | ATSB (FAA-hosted final report) | YES | YES | YES | GOOD | SOURCE_READY | YES | YES | NONE | Final report extraction strong and event markers present. |
| A4R155-06 | QF72 | ATSB | YES | NO | NO | DOWNLOAD_FAILED | SOURCE_PENDING | NO | NO | DOWNLOAD_FAILED | Official ATSB final target confirmed but download failed in this environment after retries/alternate path attempts. |
| A4R155-07 | AF66 | BEA | YES | YES | YES | GOOD | SOURCE_READY | YES | YES | NONE | BEA technical report extracted with expected identifiers. |
| A4R155-08 | TUROY-EC225 / LN-OJF | NSIA/AIBN | YES | YES | YES | USABLE_WITH_CAUTION | SOURCE_USABLE_WITH_CAUTION | CAUTION | CAUTION | VALIDATION_PENDING_FOR_FINAL_ATTACHMENT_SET | Core text recovered; keep caution until attachment-set cross-check closes. |

## Controls

- no P/O/A
- no release/downstream
- no corpus modification
- no code change
