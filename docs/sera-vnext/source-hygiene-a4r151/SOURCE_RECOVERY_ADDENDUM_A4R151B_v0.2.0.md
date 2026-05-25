# Source Recovery Addendum A4R151b v0.2.0

Status: SOURCE_RECOVERY_ADDENDUM_RECORDED
Phase: A4R151b
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## objective

Incorporate Perplexity/web source-recovery findings for high-priority pending events and update Opus source-readiness lanes without opening P/O/A, release, or downstream.

## source note

Source discovery basis: Perplexity/web response provided by user in this phase.

These links are candidate official sources for source readiness only. They are not corpus ingestion and do not create methodological authority.

## event update table (8 events)

| eventId | priorA4R151Status | Perplexity sourceStatus | officialPageUrl | officialPdfUrl | docketUrl | extractionRisk | aliasRisk | updatedSourceStatus | opusPacketImpact | nextAction |
|---|---|---|---|---|---|---|---|---|---|---|
| EXT-A4R149-015 (AIR-FRANCE-AF66) | OFFICIAL_SOURCE_NOT_FOUND | OFFICIAL_PDF_READY | https://bea.aero/en/investigation-reports/notified-events/detail/accident-to-the-airbus-a380-861-registered-f-hpje-and-operated-by-air-france-on-30-09-2017-en-route-over-greenland-investigation-delegated-to-bea-by-the-authorities-of-denmark | https://bea.aero/fileadmin/uploads/tx_elyextendttnews/F-HPJE_TECHNICAL_REPORT_12.pdf | N/A | LOW | LOW | OFFICIAL_PDF_READY_PERPLEXITY_CONFIRMED | Move to OPUS_READY_NEGATIVE_CONTROLS priority lane | Keep technical-negative-control treatment; keep quarantine of conclusions. |
| EXT-A4R149-010 (AIR-FRANCE-F-GRHT) | OFFICIAL_SOURCE_NOT_FOUND | OFFICIAL_PDF_READY | https://bea.aero/en/investigation-reports/notified-events/detail/incident-to-the-airbus-a319-registered-f-grht-operated-by-air-france-on-12-03-2014-at-paris-charles-de-gaulle-95/ | https://bea.aero/uploads/tx_elydbrapports/BEA2015-0125.en-LR.pdf | N/A | LOW | LOW | OFFICIAL_PDF_READY_ALIAS_RESOLVED | Move to OPUS_READY_CORE deep-review priority | Preserve note: F-GRHT resolved, not F-GZCJ. |
| EXT-A4R149-021 (EASTERN-401) | OFFICIAL_PDF_OCR_POOR | OFFICIAL_PDF_CONFIRMED_OCR_RISK | N/A | https://www.faa.gov/sites/faa.gov/files/Eastern%20401%20ntsb%20report.pdf | N/A | HIGH | LOW | OFFICIAL_PDF_CONFIRMED_OCR_REQUIRED | Remain OPUS_SOURCE_RECOVERY_PENDING | OCR/re-extraction required before strong extraction use. |
| EXT-A4R149-014 (QANTAS-QF72) | OFFICIAL_SOURCE_FOUND_DOWNLOAD_FAILED | OFFICIAL_SOURCE_NEEDS_CONFIRMATION | N/A | https://www.atsb.gov.au/sites/default/files/media/748444/ao2008070_ifr_2.pdf | N/A | MEDIUM | LOW | OFFICIAL_SOURCE_NEEDS_MANUAL_CONFIRMATION | Remain OPUS_SOURCE_RECOVERY_PENDING | Confirm this is final complete AO-2008-070 version. |
| EXT-A4R149-011 (QANTAS-QF32) | OFFICIAL_HTML_GOOD (FAA page) | OFFICIAL_PDF_READY | N/A | https://www.faa.gov/sites/faa.gov/files/QantasA380_Accident_Report.pdf | N/A | LOW-MEDIUM | LOW | OFFICIAL_PDF_READY_PERPLEXITY_CONFIRMED | Move to OPUS_READY_NEGATIVE_CONTROLS priority lane | Keep technical-onset negative-control role. |
| EXT-A4R149-005 (COUGAR-A11H0001) | OFFICIAL_HTML_GOOD | OFFICIAL_HTML_READY | https://www.tsb.gc.ca/eng/rapports-reports/aviation/2011/a11h0001/a11h0001.html | N/A | N/A | LOW-MEDIUM | LOW | OFFICIAL_HTML_READY | Move to OPUS_READY_CORE deep-review priority (external-only HTML) | Keep explicit NO local TXT mapping in A4R150. |
| EXT-A4R149-008 (CHO-A19A0055) | OFFICIAL_HTML_GOOD | OFFICIAL_HTML_READY | https://www.tsb.gc.ca/eng/rapports-reports/aviation/2019/a19a0055/a19a0055.html | N/A | N/A | LOW-MEDIUM | LOW | OFFICIAL_HTML_READY | Move to OPUS_READY_CORE deep-review priority (external-only HTML) | Keep rotorcraft/offshore mixed lane context. |
| TXT-040 + TXT-062 (DELTA-191 cluster) | OFFICIAL_PDF_OCR_POOR | OFFICIAL_PDF_READY | N/A | https://www.ntsb.gov/investigations/AccidentReports/Reports/AAR8605.pdf | N/A | MEDIUM-HIGH | LOW | OFFICIAL_PDF_READY_OCR_REQUIRED | Remain OPUS_SOURCE_RECOVERY_PENDING (negative-control pending) | Keep negative-control role; require robust OCR first. |

## conclusion

- None of the 8 events remains without a locatable official source candidate.
- Eastern 401 and Delta 191 still require OCR hardening.
- QF72 still requires manual confirmation of final-report completeness.
- A11H0001 and A19A0055 are ready as official HTML sources.
- F-GRHT alias confusion is resolved.
