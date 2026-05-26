# Official Source Targets A4R154 v0.2.0

Status: OFFICIAL_SOURCE_TARGETS_RECORDED
Phase: A4R154

| itemId | eventName | authority | officialPageUrl | officialPdfUrl | currentLocalStatus | sourceTargetStatus | shouldDownloadLater | extractionRisk | notes |
|---|---|---|---|---|---|---|---|---|---|
| A4R154-T01 | G-WNSB-SUMBURGH AAIB AAR 1/2016 | AAIB (UK) | https://www.gov.uk/aaib-reports/aircraft-accident-report-aar-1-2016-g-wnsb-23-august-2013 | https://assets.publishing.service.gov.uk/media/56e7eaeaed915d0379000023/AAR_1-2016_G-WNSB.pdf | HTML scrape treated as full text | OFFICIAL_TARGET_CONFIRMED | YES | LOW | Must replace scrape-based full-text claim with actual report extraction. |
| A4R154-T02 | BS211-Q400 | CAAN (Nepal) / Bangladesh authorities | N/A | N/A | mapped to wrong local Colgan file | OFFICIAL_TARGET_NOT_FOUND | YES | HIGH | Alias/event authority unclear in local layers; requires manual authority resolution before ingestion. |
| A4R154-T03 | N8DX / REAL-EVENT-0016 (Cessna 500) | NTSB (USA) | https://www.ntsb.gov/investigations/Pages/ERA17FA135.aspx | https://data.ntsb.gov/Docket?ProjectID=94910 | local lane contaminated by journalism file in pdf24_merged.txt | OFFICIAL_TARGET_CONFIRMED_OCR_REQUIRED | YES | MEDIUM | Primary authority page + docket confirmed; requires curated extraction strategy from docket artifacts. |
| A4R154-T04 | Delta Air Lines 191 (AAR-86/05) | NTSB (USA) | https://www.ntsb.gov/investigations/Pages/DCA85AA031.aspx | https://www.ntsb.gov/investigations/AccidentReports/Reports/AAR8605.pdf | OCR-poor / divergent local texts | OFFICIAL_TARGET_CONFIRMED_OCR_REQUIRED | YES | HIGH | Official source confirmed; extraction quality remains blocker. |
| A4R154-T05 | QF32 (AO-2010-089) | ATSB (Australia) | https://www.atsb.gov.au/media/news-items/2013/in-flight-uncontained-engine-failure-airbus-a380 | https://www.faa.gov/sites/faa.gov/files/QantasA380_Accident_Report.pdf | no local TXT extracted | ALIAS_RISK_REQUIRES_REVIEW | YES | MEDIUM | ATSB release + official report PDF available; keep alias/source-version check before use. |
| A4R154-T06 | QF72 (AO-2008-070) | ATSB (Australia) | https://www.atsb.gov.au/investigations/ao-2008-070 | https://www.atsb.gov.au/sites/default/files/media/748444/ao2008070_ifr_2.pdf | no local TXT extracted | OFFICIAL_TARGET_CONFIRMED_OCR_REQUIRED | YES | MEDIUM | Final report path appears valid; still requires controlled extraction and report-version confirmation. |
| A4R154-T07 | AF66 (F-HPJE) | BEA (France) | https://bea.aero/en/investigation-reports/notified-events/detail/accident-to-the-airbus-a380-861-registered-f-hpje-and-operated-by-air-france-on-30-09-2017-en-route-over-greenland-investigation-delegated-to-bea-by-the-authorities-of-denmark | https://bea.aero/fileadmin/uploads/tx_elyextendttnews/F-HPJE_TECHNICAL_REPORT_12.pdf | no local TXT extracted | OFFICIAL_TARGET_CONFIRMED | YES | LOW | Official target confirmed; extraction pending. |
| A4R154-T08 | TUROY EC225 (LN-OJF) | NSIA/AIBN (Norway) | https://www.aibn.no/Aviation/Published-reports/2018-04 | https://www.aibn.no/Aviation/Aviation/Published-reports/2018-04?attach=1&pid=SHT-Report-ReportFile | OCR/recovery still weak for robust control use | OFFICIAL_TARGET_CONFIRMED_OCR_REQUIRED | YES | MEDIUM | Official report confirmed; OCR-quality recovery still needed. |

## Constraints

- Secondary sources can be used only as bridge notes and not as final authority.
- No downloaded PDFs/HTML/TXT are versioned in A4R154.
