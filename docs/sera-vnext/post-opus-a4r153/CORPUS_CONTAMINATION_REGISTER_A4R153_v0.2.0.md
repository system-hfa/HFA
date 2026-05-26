# Corpus Contamination Register A4R153 v0.2.0

Status: CORPUS_CONTAMINATION_RECORDED
Phase: A4R153

| filePath | currentStatusBeforeA4R153 | opusFinding | correctedStatusOverlay | reason | allowedFutureUse | prohibitedUse | requiredAction |
|---|---|---|---|---|---|---|---|
| docs/sera-vnext/source-corpus/txt-events/pdf24_merged-5.txt | INTEGRATED_AS_TXT_FULL_TEXT | ICAO Doc 9859 / SMM non-event material | OUT_OF_SCOPE_REFERENCE_MATERIAL | Reference manual, not single-event evidence | method/reference context only | event evidence / P/O/A input | quarantine overlay; keep file in place |
| docs/sera-vnext/source-corpus/txt-events/pdf24_merged-6.txt | INTEGRATED_AS_TXT_FULL_TEXT | academic dissertation, non-event corpus | OUT_OF_SCOPE_REFERENCE_MATERIAL | academic mixed content, not official event report | context only | event evidence / P/O/A input | quarantine overlay; keep file in place |
| docs/sera-vnext/source-corpus/txt-events/pdf24_merged-7.txt | INTEGRATED_AS_TXT_FULL_TEXT | DoD HFACS guide, non-event corpus | OUT_OF_SCOPE_REFERENCE_MATERIAL | taxonomy guide, not event report | taxonomy context only | event evidence / P/O/A input | quarantine overlay; keep file in place |
| docs/sera-vnext/source-corpus/txt-events/pdf24_merged-8.txt | INTEGRATED_AS_TXT_FULL_TEXT | offshore engineering paper, non-aviation-event | OUT_OF_SCOPE_REFERENCE_MATERIAL | non-official engineering paper | background only | event evidence / P/O/A input | quarantine overlay; keep file in place |
| docs/sera-vnext/source-corpus/txt-events/pdf24_merged-2.txt | INTEGRATED_AS_TXT_FULL_TEXT | B&CA article (Kobe/Calabasas), journalism | JOURNALISM_NOT_REPORT | journalism is not official investigation report | context hints only | official-evidence lane / deep review | quarantine overlay; keep file in place |
| docs/sera-vnext/source-corpus/txt-events/pdf24_merged.txt | INTEGRATED_AS_TXT_FULL_TEXT | B&CA article (N8DX), journalism | JOURNALISM_NOT_REPORT | journalism is not official investigation report | context hints only | official-evidence lane / deep review | quarantine overlay; keep file in place |
| docs/sera-vnext/source-corpus/txt-events/pdf24_merged-3.txt | INTEGRATED_AS_TXT_FULL_TEXT | AAIB bulletin multi-event index | BULLETIN_INDEX_MULTI_EVENT | multi-event bulletin is not single-event report | indexing aid only | single-event evidence / deep review | quarantine overlay; keep file in place |
| EXT-A4R149-004 / NEW50-21 G-WNSB-SUMBURGH | OPUS_CORE_PACKET / TXT_FULL_TEXT | GOV.UK page scrape treated as full text AAR | HTML_STATUS_ONLY / SOURCE_PENDING | page-level scrape is not full AAR text body | source critique lane only | deep-review evidence lane | recover full AAR text before upgrade |
| TXT-040 / TXT-062 / NEW50-11 Delta 191 cluster | NEGATIVE_CONTROL_USABLE | extraction failure / near-empty text in cluster | OCR_REQUIRED / SOURCE_RECOVERY_PENDING | OCR/readability insufficient and layer divergence | source recovery planning only | negative control use in deep review | OCR and integrity reconciliation first |
| TXT-029 BS211-Q400 path | LOCAL_TXT_PRESENT_AND_GOOD | path points to Colgan 3407 file | CROSS_EVENT_MISATTRIBUTION | wrong event-to-file mapping | integrity audit evidence only | any analytical use as BS211 source | recover valid BS211 source and remap |

## Rule

A4R153 cria overlay de status. Não move nem deleta arquivos nesta fase.
