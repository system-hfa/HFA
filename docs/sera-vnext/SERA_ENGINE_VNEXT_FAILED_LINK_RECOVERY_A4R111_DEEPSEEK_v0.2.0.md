# SERA Engine vNext — Failed Link Recovery A4R111 (DeepSeek) v0.2.0

**Date:** 2026-05-24
**Scope:** A4R111 batch (46 candidates) + NEW50 batch (50 candidates) = 96 candidates total
**Tool/Model:** Hermes com DeepSeek — multi-agent search + download pipeline

---

## 1. Executive Summary

| Metric | Count |
|--------|-------|
| Total failure records analyzed | 39 (across both batches) |
| Cross-batch duplicates (same case in both batches) | 6 |
| **Unique failure cases** | **33** |
| Recovered with official PDF | 9 |
| Recovered with official HTML page | 1 |
| Recovered from secondary source (downloaded) | 2 |
| **Total unique cases downloaded** | **12** |
| Downloaded → TXT extracted successfully | 10 |
| Downloaded → TXT extraction failed (scanned PDF) | 2 |
| ATSB cases unreachable (network issue) | 8 |
| Official source URL confirmed — download failed at attempt time | 4 |
| Secondary source only — no official URL available | 7 |
| Not found — no source at all | 2 |
| SOURCE_RECHECK_REQUIRED (needs further verification) | 8 |

---

## 2. Recovered Cases

### 2.1 Official PDF — Downloaded + TXT Extracted (7)

| # | Candidate | Case | Agency | Size |
|---|-----------|------|--------|------|
| 1 | A4R111-8 | Air Canada A320 Halifax (A15H0002) | TSB Canada | 1.5 MB |
| 2 | A4R111-9 | First Air 6560 Resolute Bay (A11H0002) | TSB Canada | 8.6 MB |
| 3 | A4R111-12 | Ornge S-76A Moosonee (A13H0001) | TSB Canada | 1.9 MB |
| 4 | A4R111-27 | AS350 B2 Griffith Island (A21C0038) | TSB Canada | 2.9 MB |
| 5 | A4R111-34 | Cougar S-92A (A09A0016) | TSB Canada | 9.1 MB |
| 6 | A4R111-42 | Bell 212 Bowen Island (A21P0018) | TSB Canada | 1.7 MB |
| 7 | NEW50-24 | Bell 206B Fort McMurray (A13W0070) | TSB Canada | 540 KB |

**Root cause:** TSB Canada site migration — old `/eng/enquetes-investigations/` path replaced by `/sites/default/files/rapports-reports/aviation/{CASE_ID}/eng/` for PDF files.

### 2.2 Official PDF — Downloaded, TXT Failed (Scanned Images) (2)

| # | Candidate | Case | Agency | Size |
|---|-----------|------|--------|------|
| 1 | A4R111-38 | Eastern 401 L-1011 (NTSB AAR-73-14) | NTSB USA | 3.5 MB |
| 2 | A4R111-40 | Delta 191 L-1011 (NTSB AAR-86-05) | NTSB USA | 9.5 MB |

**Root cause:** Original FAA-hosted URL 404'd (Eastern 401); previous download was Wikimedia HTML page, not PDF (Delta 191). Correct NTSB archive URLs found. Both PDFs are scanned images (CCITTFaxDecode), requiring OCR for text extraction.

### 2.3 Official HTML Page — Downloaded + TXT Extracted (1)

| # | Candidate | Case | Agency |
|---|-----------|------|--------|
| 1 | NEW50-22 | Super Puma G-REDL North Sea 2009 (AAIB 2/2011) | AAIB UK |

**Root cause:** AAIB UK URL format changed — added `aerospatiale-` prefix to manufacturer name in gov.uk path.

### 2.4 Secondary Source — Downloaded + TXT Extracted (2)

| # | Candidate | Case | Source | Notes |
|---|-----------|------|--------|-------|
| 1 | NEW50-7 | Gol 1907 mid-air collision | ASN mirror | Original CENIPA site offline. Archived CENIPA original at web.archive.org |
| 2 | NEW50-35 | UPS 6 B747 fire Dubai | UK CAA mirror | Original GCAA UAE URL 404'd. CAA hosts identical official GCAA report |

---

## 3. Not Recovered — ATSB Network Unreachable (8)

All ATSB (Australian Transport Safety Bureau) URLs time out or return HTTP/2 stream errors from the current environment. This affects 8 unique cases across both batches:

| # | Candidate | Case | Confirmed ATSB URL |
|---|-----------|------|--------------------|
| 1 | A4R111-16 | Qantas 72 A330 (AO-2008-070) | `/publications/investigation_reports/2008/aair/ao-2008-070` |
| 2 | A4R111-17 | ATR 72 VH-FVZ Canberra (AO-2017-111) | `/publications/investigation_reports/2017/aair/ao-2017-111` |
| 3 | A4R111-25 | Lockhart River Metro 23 (200501977) | `/publications/investigation_reports/2005/aair/aair200501977` |
| 4 | A4R111-35 | Pel-Air Norfolk Island (AO-2009-072) | `/publications/investigation_reports/2009/aair/ao-2009-072` |
| 5 | A4R111-41 | Qantas 32 A380 (AO-2010-089) | `/publications/investigation_reports/2010/aair/ao-2010-089` |
| 6 | NEW50-25 | Bell UH-1H VH-UVC (AO-2019-050) | `/sites/default/files/media/5779863/ao-2019-050-final.pdf` |
| 7 | NEW50-26 | AW139 VH-EXK Longford (AO-2024-045) | `/sites/default/files/2025-05/AO-2024-045-Final.pdf` |
| 8 | NEW50-27 | AW139 VFR into IMC Sydney (AB-2024-051) | Occurrence brief web page (not a full report) |

**Recommendation:** Retry from a different network environment (VPN, AWS/ap-southeast-2 region, or local Australian IP). ATSB URLs are confirmed valid via web search.

---

## 4. Not Recovered — Official URL Confirmed, Download Failed (4)

| # | Candidate | Case | Agency | Issue |
|---|-----------|------|--------|-------|
| 1 | A4R111-20 | TSB Unstable Approaches backgrounder | TSB Canada | News release exists but backgrounder sub-pages return 404. Individual reports recovered separately |
| 2 | NEW50-5 | Spanair JK5022 MD-82 Madrid | CIAIAC Spain | English PDF URL confirmed (`fomento.gob.es/recursos_mfom/...`) but server returned 503. Retry needed |
| 3 | NEW50-10 | Turkish 1951 B737 Poldercrash | Dutch Safety Board | DSB site restructured. Investigation page found but direct PDF link returns 404. Manual navigation needed |
| 4 | NEW50-34 | Air France A320 Habsheim 1988 | BEA France | BEA docspa URL (`/docspa/1988/f-kc880626/pdf/f-kc880626.pdf`) confirmed by search but returned 404 at download. Path may have changed |

---

## 5. Secondary Source Only — No Working Official URL (7)

| # | Candidate | Case | Best Available Source | Notes |
|---|-----------|------|-----------------------|-------|
| 1 | A4R111-45 | USAir 1549 A320 Hudson (NRC) | NRC case study (ML11228A218.pdf) | Safety culture case study, not investigation report. NRC site timed out |
| 2 | NEW50-8 | Lion Air JT610 B737 MAX 8 | regulations.gov FAA docket | KNKT website unreachable. FAA hosts complete copy. SOURCE_RECHECK_REQUIRED |
| 3 | NEW50-9 | Ethiopian 302 B737 MAX 8 | Skybrary mirror (29019.pdf) | EAIB official website not serving report. SOURCE_RECHECK_REQUIRED |
| 4 | NEW50-17 | Gimli Glider B767 C-GAUN | None found | Pre-TSB Aviation Safety Board Canada report. No live government source. SOURCE_RECHECK_REQUIRED |
| 5 | NEW50-33 | ATR 72 EP-ATS Shiraz/Yasouj 2018 | None found | Iran AAIB report not publicly accessible. BEA page exists but no PDF hosted. SOURCE_RECHECK_REQUIRED |
| 6 | NEW50-36 | Asiana Cargo 991 B747 Jeju | FAA English translation | ARAIB Korean website not English-accessible. FAA hosts translation. SOURCE_RECHECK_REQUIRED |
| 7 | NEW50-39 | DHL A300 Baghdad missile strike 2003 | None found | No official investigation report exists publicly. ISASI 2004 paper is best source. SOURCE_RECHECK_REQUIRED |

---

## 6. Not Found (2)

| # | Candidate | Case | Reason |
|---|-----------|------|--------|
| 1 | A4R111-26 | Air India Express B737 Mangalore 2010 | DGCA India domain offline. Report known to exist but no working official URL |
| 2 | NEW50-32 | AS350 B3e F-GMPC Mont Blanc 2013 | Registration F-GMPC not found in any aviation database. Likely incorrect registration in source data |

---

## 7. Cross-Batch Duplicates (6)

These NEW50 cases are identical to A4R111 cases already tracked:

| NEW50 ID | A4R111 ID | Case | Resolution |
|----------|-----------|------|------------|
| NEW50-11 | A4R111-40 | Delta 191 | NTSB PDF downloaded, scanned — OCR needed |
| NEW50-13 | A4R111-38 | Eastern 401 | NTSB PDF downloaded, scanned — OCR needed |
| NEW50-16 | A4R111-41 | Qantas 32 | ATSB unreachable |
| NEW50-19 | A4R111-34 | Cougar S-92A | TSB PDF recovered + TXT extracted |
| NEW50-20 | A4R111-35 | Pel-Air Norfolk Island | ATSB unreachable |
| NEW50-28 | A4R111-27 | AS350 Griffith Island | TSB PDF recovered + TXT extracted |

---

## 8. Recovery Rate

```
Unique failures: 33
  ├── Recovered + TXT:  10 (30.3%)  ← fully resolved
  ├── Recovered, no TXT: 2 (6.1%)   ← OCR needed
  ├── ATSB unreachable:  8 (24.2%)  ← network-dependent retry
  ├── URL found, DL fail: 4 (12.1%) ← transient/retry
  ├── Secondary only:    7 (21.2%)  ← SOURCE_RECHECK_REQUIRED
  └── Not found:         2 (6.1%)   ← verify source data
```

**Effective recovery (TXT usable in corpus):** 10/33 = 30.3%
**Recovery including scanned PDFs:** 12/33 = 36.4%
**Potentially recoverable with retry (ATSB + URL-found):** 12/33 = 36.4% additional
**Unrecoverable without new sources:** 9/33 = 27.3%

---

## 9. Created Files

### Recovery directories

```
docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool/
├── 8__2017__TSB-Canada__Airbus-A320-211__TSB-A15H0002-Air-Canada-A320-Halifax.pdf
├── 9__2014__TSB-Canada__Boeing-737-210C__TSB-A11H0002-First-Air-6560-Resolute-Bay.pdf
├── 12__2016__TSB-Canada__Sikorsky-S-76A__TSB-A13H0001-Ornge-S-76A-Moosonee.pdf
├── 27__2024__TSB-Canada__Airbus-AS350-B2__TSB-A21C0038-AS350-Griffith-Island.pdf
├── 34__2011__TSB-Canada__Sikorsky-S-92A__TSB-A09A0016-Cougar-S-92A.pdf
├── 38__1973__NTSB-USA__Lockheed-L-1011-1__NTSB-AAR-73-14-Eastern-401.pdf
├── 40__1986__NTSB-USA__Lockheed-L-1011-385-1__NTSB-AAR-86-05-Delta-191.pdf
├── 42__2022__TSB-Canada__Bell-212__TSB-A21P0018-Collision-Terrain-Bowen-Island.pdf
├── NEW50-7__2008__CENIPA-Brazil__Boeing-737-8EH__Gol-1907-ASN-mirror.pdf
├── NEW50-22__2011__AAIB-UK__Eurocopter-AS332-L2-Super-Puma__G-REDL-AAIB-2-2011.html
├── NEW50-24__2015__TSB-Canada__Bell-206B__TSB-A13W0070-Bell-206B-Fort-McMurray.pdf
└── NEW50-35__2013__GCAA-UAE__Boeing-747-44AF__UPS6-CAA-UK-mirror.pdf
```

```
docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/
├── 8__2017__TSB-Canada__Airbus-A320-211__TSB-A15H0002-Air-Canada-A320-Halifax.txt       (236 KB)
├── 9__2014__TSB-Canada__Boeing-737-210C__TSB-A11H0002-First-Air-6560-Resolute-Bay.txt   (538 KB)
├── 12__2016__TSB-Canada__Sikorsky-S-76A__TSB-A13H0001-Ornge-S-76A-Moosonee.txt          (584 KB)
├── 27__2024__TSB-Canada__Airbus-AS350-B2__TSB-A21C0038-AS350-Griffith-Island.txt        (403 KB)
├── 34__2011__TSB-Canada__Sikorsky-S-92A__TSB-A09A0016-Cougar-S-92A.txt                  (509 KB)
├── 38__1973__NTSB-USA__Lockheed-L-1011-1__NTSB-AAR-73-14-Eastern-401.txt                (50 B — scanned PDF)
├── 40__1986__NTSB-USA__Lockheed-L-1011-385-1__NTSB-AAR-86-05-Delta-191.txt              (167 B — scanned PDF)
├── 42__2022__TSB-Canada__Bell-212__TSB-A21P0018-Collision-Terrain-Bowen-Island.txt      (99 KB)
├── NEW50-7__2008__CENIPA-Brazil__Boeing-737-8EH__Gol-1907-ASN-mirror.txt                (787 KB)
├── NEW50-22__2011__AAIB-UK__Eurocopter-AS332-L2-Super-Puma__G-REDL-AAIB-2-2011.txt      (7 KB)
├── NEW50-24__2015__TSB-Canada__Bell-206B__TSB-A13W0070-Bell-206B-Fort-McMurray.txt      (19 KB)
└── NEW50-35__2013__GCAA-UAE__Boeing-747-44AF__UPS6-CAA-UK-mirror.txt                    (782 KB)
```

### Recovery tracking CSV

```
docs/sera-vnext/source-corpus/report-url-manifest/A4R111_FAILED_LINK_RECOVERY_DEEPSEEK.csv
```

---

## 10. Recommendations

1. **ATSB retry:** Attempt all 8 ATSB downloads from a different network (VPN, AWS Sydney region, or Australian residential IP). URLs are confirmed valid.

2. **OCR for NTSB scanned PDFs:** Eastern 401 (AAR-73-14) and Delta 191 (AAR-86-05) need OCR processing. Both are NTSB formal reports with high SERA relevance.

3. **Retry transient failures:** Spanair JK5022 (CIAIAC 503), Turkish 1951 (DSB), and Habsheim (BEA) — URLs confirmed but server issues at attempt time. Retry with 24h delay.

4. **Verify source data for NOT_FOUND:**
   - Air India Express Mangalore (A4R111-26): Confirm DGCA India report exists and search with Hindi/regional terms
   - AS350 F-GMPC Mont Blanc (NEW50-32): Verify aircraft registration — likely typo in source CSV

5. **Evaluate SECONDARY_SOURCE_ONLY cases for corpus inclusion:**
   - Lion Air JT610 and Ethiopian 302: regulations.gov and Skybrary mirrors available but need decision on whether secondary sources are acceptable for MAX cases
   - Gimli Glider: Pre-TSB era report — may need archival research through Library and Archives Canada
   - DHL Baghdad: No official report exists — ISASI paper is the only technical account. Consider excluding from P/O/A analysis or using as boundary reference

6. **TSB backgrounder (A4R111-20):** Individual reports (A11H0002, A11H0001) already recovered. The backgrounder cluster document is supplementary — evaluate if needed for SERA analysis.
