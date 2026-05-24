# SERA Engine vNext Official Reserve O/A Screening A4R111 v0.2.0

Status: OFFICIAL_RESERVE_O_A_SCREENING  
Phase: A4+R-111  
DOCS_ONLY  
FULL_AXIS_REBALANCING_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Reserve-focused screening
| candidateId | strongestAxisSignalNow | factualEvidenceToExtractNext | includeInNextBatch | betterThanComairKoreanForOA | needsAdditionalOfficialPdfRead |
|---|---|---|---|---|---|
| UPS-1354 | O + A (with P support) | nonprecision continuation decisions, stabilized criteria gates, descent/execution response chain, missed-approach opportunity points | YES | YES | no (local PDF and TXT available) |
| FIRST-AIR-6560 | O + A (CRM and continuation) | approach continuation decision points, PF/PM divergence checkpoints, action/cross-check chronology | CONDITIONAL | POSSIBLY | yes (current local extraction is shallow; deeper sectioning needed) |
| AMERICAN-1420 | O + A (with P support) | weather and continuation decision gates, runway-landing execution chain, timing/checklist/callout interaction | YES | YES | no (local PDF and TXT available) |
| AMERICAN-965 | P + O/A navigation boundary | intent/decision moments in FMS navigation sequence, action sequence after route-selection error, monitoring challenge points | CONDITIONAL | POSSIBLY | yes (local TXT is thin; deeper PDF slicing needed) |
| AIR-CANADA-624 | A + O with nominal-path potential | visual cue interpretation vs continuation objective, descent execution and callout responses, nominal-branch evidence anchors | YES | YES | no (local HTML/PDF/TXT available) |
| KEGWORTH-GOBME | A boundary (wrong-engine response) | action selection chronology, diagnosis-to-action transition, cross-check and reversal opportunities | CONDITIONAL | YES for A only | yes (use local attached PDFs; current extracted text is insufficient) |
| G-BLUN-OFFSHORE | A-domain relevance (offshore) | approach/execution sequence under offshore context, warning/response chain, procedural action checkpoints | NO (for immediate batch) | UNCERTAIN | yes (current extraction sparse despite available PDFs) |
| ASIANA-214 | P + A with O potential | final-approach mode/callout timeline, objective-risk management split at stabilized gates, go-around action timing | YES | YES | no (local PDF and TXT available) |

## Screening conclusion for O/A rebalance
- Best immediate O/A upgrades versus COMAIR/KOREAN: `UPS-1354`, `AMERICAN-1420`, `AIR-CANADA-624`, and `ASIANA-214`.
- Candidates requiring extra source slicing before inclusion: `FIRST-AIR-6560`, `AMERICAN-965`, `KEGWORTH-GOBME`, `G-BLUN-OFFSHORE`.
- COMAIR/KOREAN remain valuable but should not anchor a full-axis batch alone.
