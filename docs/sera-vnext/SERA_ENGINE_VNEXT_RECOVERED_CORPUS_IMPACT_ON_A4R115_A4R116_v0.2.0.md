# SERA Engine vNext Recovered Corpus Impact on A4R115 A4R116 v0.2.0

Status: RECOVERED_CORPUS_IMPACT_QA
Phase: A4+R-116
DOCS_ONLY
CORPUS_IMPACT_REVIEW_ONLY
NO_TRACE_CREATION
NO_RELEASE
NO_DOWNSTREAM

## Scope
This audit checks whether the 10 content-bearing recovered TXT files change A4R112 candidate status or A4R115 trace-draft QA. It does not alter A4R115 traces and does not create new source slices.

## Impact matrix
| candidateId | title | source type | localTxtFile | alreadyRepresentedInA4R112? | overlapsWithA4R115Candidate? | likelyAxisImpact | shouldChangeA4R115Now? | rationale |
|---|---|---|---|---|---|---|---|---|
| A4R111-8 / UC-008 | Air Canada A320 Halifax undershoot | OFFICIAL_PDF | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/8__2017__TSB-Canada__Airbus-A320-211__TSB-A15H0002-Air-Canada-A320-Halifax.txt` | yes | no | P/O/A | ADD_TO_FUTURE_BATCH | A4R112 parked this case due missing TXT. The recovered official TXT can support future approach/visibility/stabilization source slicing, but it does not overlap any A4R115 trace. |
| A4R111-9 / UC-009 | First Air 6560 Resolute Bay CFIT | OFFICIAL_PDF | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/9__2014__TSB-Canada__Boeing-737-210C__TSB-A11H0002-First-Air-6560-Resolute-Bay.txt` | yes | no | P/O/A | ADD_TO_FUTURE_BATCH | Recovered TXT improves a parked A4R112 CFIT candidate with likely perception, objective-continuation, and action-monitoring material. No A4R115 event depends on it. |
| A4R111-12 / UC-012 | Ornge S-76A Moosonee | OFFICIAL_PDF | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/12__2016__TSB-Canada__Sikorsky-S-76A__TSB-A13H0001-Ornge-S-76A-Moosonee.txt` | yes | no | P/O/A | ADD_TO_FUTURE_BATCH | Night HEMS CFIT material may help rotorcraft/offshore-adjacent calibration later. It does not challenge or support current A4R115 trace assumptions. |
| A4R111-27 / UC-027, NEW50-28 / UC-076 | AS350 B2 Griffith Island | OFFICIAL_PDF | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/27__2024__TSB-Canada__Airbus-AS350-B2__TSB-A21C0038-AS350-Griffith-Island.txt` | yes | no | P/O/A | ADD_TO_FUTURE_BATCH | A4R112 listed this duplicate group as parked because source text was unavailable. The recovered TXT may be useful for a later helicopter VFR/terrain event, not for A4R115. |
| A4R111-34 / UC-034, NEW50-19 / UC-067 | Cougar S-92A | OFFICIAL_PDF | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/34__2011__TSB-Canada__Sikorsky-S-92A__TSB-A09A0016-Cougar-S-92A.txt` | yes | no | BOUNDARY | ADD_TO_FUTURE_BATCH | Offshore helicopter emergency/system material may strengthen future boundary handling alongside TUROY, but it is not the same event and does not alter A4R115 TUROY status. |
| A4R111-42 / UC-042 | Bell 212 Bowen Island | OFFICIAL_PDF | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/42__2022__TSB-Canada__Bell-212__TSB-A21P0018-Collision-Terrain-Bowen-Island.txt` | yes | no | P/O/A | SOURCE_SLICE_REFINEMENT_CANDIDATE | A4R112 represented this row but with weak/mismatched metadata. The recovered TXT and corrected event identity should be handled in a later corpus-index refinement, not by changing A4R115. |
| NEW50-22 / UC-070 | Super Puma G-REDL North Sea | OFFICIAL_HTML | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/NEW50-22__2011__AAIB-UK__Eurocopter-AS332-L2-Super-Puma__G-REDL-AAIB-2-2011.txt` | yes | no direct; thematic rotorcraft boundary | BOUNDARY | REVIEW_ONLY | The GOV.UK HTML text is low-density and dominated by summary/causal-factor material. It can inform future rotorcraft boundary selection but should not be mined as a clean full-axis source without PDF-level extraction. |
| NEW50-24 / UC-072 | Bell 206B Fort McMurray | OFFICIAL_PDF | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/NEW50-24__2015__TSB-Canada__Bell-206B__TSB-A13W0070-Bell-206B-Fort-McMurray.txt` | yes | no | P/A | ADD_TO_FUTURE_BATCH | Potential action/perception event in a helicopter loss-of-control context. No effect on A4R115 trace-draft QA. |
| NEW50-35 / UC-083 | UPS Airlines Flight 6 Dubai cargo fire | OFFICIAL_PDF_MIRROR | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/NEW50-35__2013__GCAA-UAE__Boeing-747-44AF__UPS6-CAA-UK-mirror.txt` | yes | no; same operator name only | P/A/BOUNDARY | ADD_TO_FUTURE_BATCH | Same operator family as UPS-1354 but different aircraft, event, hazard, and sequence. It does not support or challenge UPS-1354 A4R115. |
| NEW50-7 / UC-055 | Gol 1907 mid-air collision | SECONDARY_SOURCE_ONLY | `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/NEW50-7__2008__CENIPA-Brazil__Boeing-737-8EH__Gol-1907-ASN-mirror.txt` | yes | no | P/O/A | REVIEW_ONLY | TXT is content-bearing but source is an ASN mirror of a CENIPA report. Keep source caveat and source recheck before any trace or expected-value use. |

## Deferred recovered items
| candidateId | title | deferred reason | likely future use |
|---|---|---|---|
| A4R111-38 / NEW50-13 | Eastern 401 | OCR_REQUIRED; no extracted text | future OCR then possible perception/action candidate or boundary review |
| A4R111-40 / NEW50-11 | Delta 191 | OCR_REQUIRED; no extracted text | future OCR then windshear perception/action candidate review |
| ATSB group | 8 unique cases | network blocked from current environment | retry from different network before corpus use |
| official URL found but download failed group | 4 unique cases | transient/manual download unresolved | source recheck before mining |
| secondary-source-only group | 7 unique cases | official source not available or not working | source-governance review before active trace use |
| not found group | 2 unique cases | source data or official URL not verified | source-data verification before corpus use |

## A4R115 impact conclusion
- No recovered TXT overlaps directly with the six A4R115 full-axis trace drafts.
- No recovered TXT contradicts A4R115 source slices.
- No A4R115 trace should be changed in this phase.
- The recovered corpus primarily increases future-batch breadth, especially Air Canada 624, First Air 6560, rotorcraft/offshore boundary cases, and UPS6 cargo-fire emergency material.

## Controls preserved
- No new trace draft created.
- No A4R115 selected code changed.
- No release/downstream opened.
- No final causation, HF taxonomy, risk layer, ERC, ARMS, or safety recommendation artifact created.
