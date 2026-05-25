# SERA Engine vNext Priority Candidate Source Validation A4R119 v0.2.0

Status: SOURCE_VALIDATION
Phase: A4+R-119
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM

## Validation results

### UNITED-173
- sourceFile: `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/21__1979__NTSB-USA__McDonnell-Douglas-DC-8-61__Aircraft-Accident-Report-AAR-79-07-United-A.txt`
- sourceType: OFFICIAL_REPORT_LOCAL_TXT (NTSB)
- sourceConfidence: MEDIUM
- textUsable: yes
- official/source caveat: official source is present, but OCR quality is degraded in portions of the file.
- CVR/FDR/recorded-data availability: yes (CVR and FDR references and timeline content present).
- sufficient for source slice: yes
- sufficient for trace draft: yes
- sourceDecision: TRACE_DRAFT_ALLOWED

### ATLAS-3591
- sourceFile: `docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool-txt/NEW50-1__2020__NTSB-USA__Boeing-767-375BCF__Atlas-Air-Flight-3591-Rapid-Descent-and-Cra.txt`
- sourceType: OFFICIAL_REPORT_LOCAL_TXT (NTSB)
- sourceConfidence: HIGH
- textUsable: yes
- official/source caveat: official text is complete and high quality; caution remains for not importing probable-cause language as SERA answer key.
- CVR/FDR/recorded-data availability: yes (explicit CVR/FDR sections and timeline).
- sufficient for source slice: yes
- sufficient for trace draft: yes
- sourceDecision: TRACE_DRAFT_ALLOWED

### EASTERN-401
- sourceFile:
  - `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/44__1973__NTSB-USA__Lockheed-L-1011-1__Eastern-Air-Lines-Flight-401-NTSB-PDF-Artef.txt`
  - `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/38__1973__NTSB-USA__Lockheed-L-1011-1__NTSB-AAR-73-14-Eastern-401.txt`
- sourceType: MIXED (secondary-like artifact + empty recovered OCR placeholder)
- sourceConfidence: LOW
- textUsable: no (for official recovered TXT)
- official/source caveat: the full-pool text is an artifact-style secondary narrative; the recovered official TXT is form-feed-only and unusable.
- CVR/FDR/recorded-data availability: partial/indirect only in secondary artifact; not validated from usable official recovered TXT.
- sufficient for source slice: no
- sufficient for trace draft: no
- sourceDecision: HOLD_OCR_REQUIRED

### UNITED-232
- sourceFile: `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/22__1990__NTSB-USA__DC-10-10__Aircraft-Accident-Report-AAR-90-06-United-A.txt`
- sourceType: OFFICIAL_REPORT_LOCAL_TXT (NTSB)
- sourceConfidence: HIGH
- textUsable: yes
- official/source caveat: official source is strong; maintain quarantine for probable cause/findings/recommendations.
- CVR/FDR/recorded-data availability: yes (CVR/FDR and extensive system/timeline data).
- sufficient for source slice: yes
- sufficient for trace draft: yes
- sourceDecision: TRACE_DRAFT_ALLOWED

## Cross-candidate validation notes
- EASTERN-401 is explicitly held due to OCR/source weakness and does not enter A4R119 trace drafting.
- USAIR-427 remains outside this batch as technical-dominant anchor and is not re-opened as human-failure trace in A4R119.
