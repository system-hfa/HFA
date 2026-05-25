# SERA Engine vNext Recovered Corpus Integration A4R116 v0.2.0

Status: RECOVERED_CORPUS_INTEGRATION_QA
Phase: A4+R-116
DOCS_ONLY
CORPUS_INTEGRATION_ONLY
NO_TRACE_CREATION
NO_RELEASE
NO_DOWNSTREAM

## Scope
A4R116 integrates the DeepSeek recovered-link metadata and usable extracted TXT files into the active source corpus without changing A4R115 trace codes, without closing P/O/A, and without preparing an author-review bundle.

Canonical controls used for this phase:
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`

## DeepSeek recovery totals
| metric | count | A4R116 disposition |
|---|---:|---|
| Total failure records analyzed | 39 | recorded as recovery input |
| Unique failure cases | 33 | recorded as recovery denominator |
| Recovered with official PDF | 9 | metadata accepted; binaries local-only |
| Recovered with official HTML page | 1 | metadata accepted; HTML local-only |
| Recovered from secondary source and downloaded | 2 | metadata accepted with source caveat |
| Total unique cases downloaded | 12 | PDF/HTML local-only |
| Downloaded to TXT extracted successfully | 10 | versionable active corpus supplement |
| Downloaded but TXT extraction failed or scanned | 2 | deferred OCR/local-only |
| ATSB cases unreachable from current network | 8 | deferred network retry |
| Official source URL confirmed but download failed | 4 | deferred source recheck or retry |
| Secondary source only with no working official URL | 7 | deferred source-governance review |
| Not found | 2 | deferred source-data verification |
| SOURCE_RECHECK_REQUIRED | 8 | deferred source recheck |

## Files created by DeepSeek
| path | A4R116 versioning disposition | rationale |
|---|---|---|
| `docs/sera-vnext/SERA_ENGINE_VNEXT_FAILED_LINK_RECOVERY_A4R111_DEEPSEEK_v0.2.0.md` | version | recovery audit/governance metadata |
| `docs/sera-vnext/source-corpus/report-url-manifest/A4R111_FAILED_LINK_RECOVERY_DEEPSEEK.csv` | version | recovery manifest and source-status evidence |
| `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool/` | local-only | PDF/HTML report binaries remain local-only under A4R113 policy |
| `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/` | version content-bearing TXT only | extracted text is reproducible mining corpus; scanned placeholders have no usable text |

## Usable recovered TXT files incorporated
| candidateId | title | source type | localTxtFile | content disposition |
|---|---|---|---|---|
| A4R111-8 | TSB A15H0002 Air Canada A320 Halifax undershoot | OFFICIAL_PDF | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/8__2017__TSB-Canada__Airbus-A320-211__TSB-A15H0002-Air-Canada-A320-Halifax.txt` | ACTIVE_CORPUS_SUPPLEMENT |
| A4R111-9 | TSB A11H0002 First Air 6560 Resolute Bay CFIT | OFFICIAL_PDF | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/9__2014__TSB-Canada__Boeing-737-210C__TSB-A11H0002-First-Air-6560-Resolute-Bay.txt` | ACTIVE_CORPUS_SUPPLEMENT |
| A4R111-12 | TSB A13H0001 Ornge Sikorsky S-76A Moosonee | OFFICIAL_PDF | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/12__2016__TSB-Canada__Sikorsky-S-76A__TSB-A13H0001-Ornge-S-76A-Moosonee.txt` | ACTIVE_CORPUS_SUPPLEMENT |
| A4R111-27 | TSB A21C0038 AS350 B2 Griffith Island | OFFICIAL_PDF | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/27__2024__TSB-Canada__Airbus-AS350-B2__TSB-A21C0038-AS350-Griffith-Island.txt` | ACTIVE_CORPUS_SUPPLEMENT |
| A4R111-34 | TSB A09A0016 Cougar S-92A | OFFICIAL_PDF | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/34__2011__TSB-Canada__Sikorsky-S-92A__TSB-A09A0016-Cougar-S-92A.txt` | ACTIVE_CORPUS_SUPPLEMENT |
| A4R111-42 | TSB A21P0018 Bell 212 Bowen Island | OFFICIAL_PDF | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/42__2022__TSB-Canada__Bell-212__TSB-A21P0018-Collision-Terrain-Bowen-Island.txt` | ACTIVE_CORPUS_SUPPLEMENT |
| NEW50-22 | AAIB AAR 2/2011 Super Puma G-REDL North Sea | OFFICIAL_HTML | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/NEW50-22__2011__AAIB-UK__Eurocopter-AS332-L2-Super-Puma__G-REDL-AAIB-2-2011.txt` | ACTIVE_CORPUS_SUPPLEMENT, low-density HTML text |
| NEW50-24 | TSB A13W0070 Bell 206B Fort McMurray | OFFICIAL_PDF | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/NEW50-24__2015__TSB-Canada__Bell-206B__TSB-A13W0070-Bell-206B-Fort-McMurray.txt` | ACTIVE_CORPUS_SUPPLEMENT |
| NEW50-35 | UPS Airlines Flight 6 Dubai cargo fire | OFFICIAL_PDF_MIRROR | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/NEW50-35__2013__GCAA-UAE__Boeing-747-44AF__UPS6-CAA-UK-mirror.txt` | ACTIVE_CORPUS_SUPPLEMENT, mirror caveat retained |
| NEW50-7 | Gol 1907 mid-air collision | SECONDARY_SOURCE_ONLY | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/NEW50-7__2008__CENIPA-Brazil__Boeing-737-8EH__Gol-1907-ASN-mirror.txt` | ACTIVE_CORPUS_SUPPLEMENT with source recheck caveat |

## Scanned or empty recovered TXT files not incorporated
| candidateId | title | localTxtFile | reason |
|---|---|---|---|
| A4R111-38 / NEW50-13 | Eastern Air Lines Flight 401 | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/38__1973__NTSB-USA__Lockheed-L-1011-1__NTSB-AAR-73-14-Eastern-401.txt` | form-feed only; no usable extracted text; OCR_REQUIRED |
| A4R111-40 / NEW50-11 | Delta Air Lines Flight 191 | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/40__1986__NTSB-USA__Lockheed-L-1011-385-1__NTSB-AAR-86-05-Delta-191.txt` | form-feed only; no usable extracted text; OCR_REQUIRED |

A4R116 does not version these scanned placeholder TXTs because the DeepSeek recovery report and CSV already preserve the OCR-required marker. The files may remain local-only until OCR text exists.

## Corpus supplement decision
Decision: `ACTIVE_CORPUS_SUPPLEMENT` for DeepSeek metadata, CSV, and the 10 content-bearing TXT files.

Limits:
- The supplement changes source availability, not methodology.
- A4R115 trace drafts are not edited for classification, not promoted, and not closed.
- Recovered PDF/HTML files remain local-only.
- OCR/network/source-recheck cases remain deferred.

## Quarantine controls
- Factual evidence, original report analysis/conclusions, and SERA candidate hypotheses remain separate.
- Report probable-cause text, findings, safety recommendation text, and external labels are not converted into SERA P/O/A expected values.
- No new source slice or trace draft is created in A4R116.

## Phase controls confirmed
- No release created.
- No downstream opened.
- No final causation artifact created.
- No HF taxonomy, risk layer, ARMS, ERC, or safety recommendation artifact created.
- No fixture, baseline, migration, UI/API/DB, runtime, or TypeScript file changed.
