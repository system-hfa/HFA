# Opus Ready Packet Manifest A4R151 v0.2.0

Status: OPUS_READY_PACKET_RECORDED
Phase: A4R151
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

This manifest is source-hygiene output only. It does not classify P/O/A and does not include full report content.

## OPUS_READY_CORE

Count: 9

- ASIANA-214 (EXT-A4R149-002) — sourceQuality=OFFICIAL_HTML_GOOD — localTxtExists=YES — sourceUrl=https://www.ntsb.gov/investigations/Pages/DCA13MA120.aspx
- COLGAN-3407 (EXT-A4R149-001) — sourceQuality=OFFICIAL_HTML_GOOD — localTxtExists=YES — sourceUrl=https://www.ntsb.gov/investigations/Pages/DCA09MA027.aspx
- UPS-1354 (EXT-A4R149-003) — sourceQuality=OFFICIAL_PDF_TEXT_GOOD — localTxtExists=YES — sourceUrl=https://www.ntsb.gov/investigations/accidentreports/reports/aar1402.pdf
- COMAIR-5191 (EXT-A4R149-018) — sourceQuality=OFFICIAL_HTML_GOOD — localTxtExists=YES — sourceUrl=https://www.ntsb.gov/investigations/Pages/DCA06MA064.aspx
- G-WNSB-SUPER-PUMA-SUMBURGH (EXT-A4R149-004) — sourceQuality=OFFICIAL_PDF_TEXT_GOOD — localTxtExists=YES — sourceUrl=https://assets.publishing.service.gov.uk/media/56e7eaeaed915d0379000023/AAR_1-2016_G-WNSB.pdf
- ORNGE-A13H0001 (EXT-A4R149-009) — sourceQuality=OFFICIAL_HTML_GOOD — localTxtExists=YES — sourceUrl=https://www.tsb.gc.ca/eng/rapports-reports/aviation/2013/a13h0001/a13h0001.html
- AIR-FRANCE-F-GRHT (EXT-A4R149-010) — sourceQuality=OFFICIAL_PDF_READY_PERPLEXITY_CONFIRMED — localTxtExists=NO — sourceUrl=https://bea.aero/uploads/tx_elydbrapports/BEA2015-0125.en-LR.pdf
- COUGAR-A11H0001 (EXT-A4R149-005) — sourceQuality=OFFICIAL_HTML_READY — localTxtExists=NO — sourceUrl=https://www.tsb.gc.ca/eng/rapports-reports/aviation/2011/a11h0001/a11h0001.html
- CHO-A19A0055 (EXT-A4R149-008) — sourceQuality=OFFICIAL_HTML_READY — localTxtExists=NO — sourceUrl=https://www.tsb.gc.ca/eng/rapports-reports/aviation/2019/a19a0055/a19a0055.html
## OPUS_READY_NEGATIVE_CONTROLS

Count: 5

- COUGAR-A09A0016 (EXT-A4R149-012) — sourceQuality=OFFICIAL_HTML_GOOD — localTxtExists=YES — sourceUrl=https://www.tsb.gc.ca/eng/rapports-reports/aviation/2009/a09a0016/a09a0016.html
- EC225-G-REDW-G-CHCN (EXT-A4R149-013) — sourceQuality=OFFICIAL_HTML_GOOD — localTxtExists=YES — sourceUrl=https://www.gov.uk/aaib-reports/aar-2-2014-g-redw-and-g-chcn-10-may-2012
- US-AIRWAYS-1549 (TXT-025) — sourceQuality=OFFICIAL_PDF_TEXT_GOOD — localTxtExists=YES — sourceUrl=https://www.ntsb.gov/investigations/AccidentReports/Reports/AAR1003.pdf
- AIR-FRANCE-AF66 (EXT-A4R149-015) — sourceQuality=OFFICIAL_PDF_READY_PERPLEXITY_CONFIRMED — localTxtExists=NO — sourceUrl=https://bea.aero/fileadmin/uploads/tx_elyextendttnews/F-HPJE_TECHNICAL_REPORT_12.pdf
- QANTAS-QF32 (EXT-A4R149-011) — sourceQuality=OFFICIAL_PDF_READY_PERPLEXITY_CONFIRMED — localTxtExists=NO — sourceUrl=https://www.faa.gov/sites/faa.gov/files/QantasA380_Accident_Report.pdf
## OPUS_SOURCE_RECOVERY_PENDING

Count: 4

- EASTERN-401 (EXT-A4R149-021) — sourceQuality=OFFICIAL_PDF_OCR_POOR — localTxtExists=YES — sourceUrl=https://www.faa.gov/sites/faa.gov/files/Eastern%20401%20ntsb%20report.pdf
- QANTAS-QF72 (EXT-A4R149-014) — sourceQuality=OFFICIAL_SOURCE_NEEDS_MANUAL_CONFIRMATION — localTxtExists=NO — sourceUrl=https://www.atsb.gov.au/sites/default/files/media/748444/ao2008070_ifr_2.pdf
- DELTA-AIR-LINES-FLIGHT-191-L-1011-DFW-MICRO (TXT-040) — sourceQuality=OFFICIAL_PDF_OCR_POOR — localTxtExists=YES — sourceUrl=https://www.ntsb.gov/investigations/AccidentReports/Reports/AAR8605.pdf
- NTSB-AAR-86-05-DELTA-191 (TXT-062) — sourceQuality=OFFICIAL_PDF_OCR_POOR — localTxtExists=YES — sourceUrl=https://www.ntsb.gov/investigations/AccidentReports/Reports/AAR8605.pdf
## OPUS_EXCLUDE_FOR_NOW

Count: 0

## Full Opus Audit Scope Clarification

- The Opus audit scope is the integrated universe, not only the OPUS_READY subset.
- Integrated universe includes 89 local TXT files considered in A4R142/A4R150 plus 25 external candidates registered in A4R149.
- OPUS_READY_CORE and OPUS_READY_NEGATIVE_CONTROLS define deep-review priority.
- OPUS_SOURCE_RECOVERY_PENDING items may still be reviewed for metadata, source-quality critique, missed candidate detection, and prioritization, but must not be used for strong methodological conclusions.
- No P/O/A classification is allowed in the Opus audit.

## Instructions for Opus

1. Use this packet as source-readiness metadata only.
2. Keep probable cause/conclusion text quarantined from P/O/A.
3. Treat OCR-poor and missing-source items as non-ready for extraction.
