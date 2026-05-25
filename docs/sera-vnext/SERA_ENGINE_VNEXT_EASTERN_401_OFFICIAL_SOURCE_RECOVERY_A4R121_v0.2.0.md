# SERA Engine vNext Eastern-401 Official Source Recovery A4R121 v0.2.0

Status: SOURCE_RECOVERY_COMPLETED
Phase: A4+R-121
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM

## Objective
Reprocess EASTERN-401 from `HOLD_OCR_REQUIRED` using official FAA-hosted NTSB report PDF extraction and re-evaluate readiness for source slice and draft trace work.

## Official source recovery
- official source URL:
  - `https://www.faa.gov/sites/faa.gov/files/2022-11/AAR73-14%20(Eastern%20Flight%20401%20accident%20report).pdf`
- downloaded local PDF:
  - `tmp/a4r121-eastern401/eastern401_faa_aar73-14.pdf`
- SHA-256:
  - `755ba5bb52d54018d9708dfc4b6d7815b57922a8ca47fa0b300db429faf44da5`
- extraction method:
  - `pdftotext -raw`
- recovered local TXT (content-bearing):
  - `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/38__1973__NTSB-USA__Lockheed-L-1011-1__NTSB-AAR-73-14-Eastern-401.txt`

## Source sufficiency re-evaluation
- previous state (A4R119): `HOLD_OCR_REQUIRED`.
- current state (A4R121): `TRACE_DRAFT_ALLOWED_WITH_LIMITATIONS`.
- rationale:
  - official report text is now locally available in content-bearing form;
  - critical factual sequence (gear-light issue, 2,000-ft segment, unmonitored descent cues, impact timeline) is extractable;
  - source remains legacy-scan/noisy, so legibility caveat must remain explicit.

## Governance outcome
- EASTERN-401 exits hard hold for this cycle and enters controlled draft lane with source-quality warning.
- no author decision is recorded.
- no release or downstream action is created.
