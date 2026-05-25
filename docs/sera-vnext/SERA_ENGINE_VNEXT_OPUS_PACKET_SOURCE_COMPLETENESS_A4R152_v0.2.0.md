# SERA Engine vNext Opus Packet Source Completeness A4R152 v0.2.0

Status: OPUS_PACKET_SOURCE_COMPLETENESS_RECORDED
Phase: A4R152
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## objective

Disambiguate full-text vs metadata-only coverage for the integrated Opus audit universe so Opus does not treat source metadata as equivalent to complete report text.

## matrix artifact

- `tmp/a4r152-opus-packet/OPUS_AUDIT_PACKET_A4R152/99_MANIFEST/SOURCE_COMPLETENESS_MATRIX_A4R152.csv`

## coverage summary

- totalRows: 114
- local89Rows: 89
- external25Rows: 25
- TXT_FULL_TEXT: 102
- METADATA_ONLY: 3
- HTML_STATUS_ONLY: 2
- OCR_REQUIRED: 0
- SOURCE_PENDING: 7
- usableForDeepReview.YES: 102
- usableForDeepReview.CAUTION: 5
- usableForDeepReview.NO: 7

## rule application

- All 89 local TXT entries are marked `TXT_FULL_TEXT`.
- External candidates are marked `TXT_FULL_TEXT` only when corresponding local TXT is available in the 89 set.
- External entries without full TXT are explicitly marked as `METADATA_ONLY`, `HTML_STATUS_ONLY`, `OCR_REQUIRED`, or `SOURCE_PENDING`.
- This matrix is included for Opus to separate deep-review textual evidence from source-readiness metadata lanes.

## controls

- no P/O/A
- no release/downstream
- no corpus TXT modification
- no PDF/HTML report versioning
- no code/fixtures/baseline changes
