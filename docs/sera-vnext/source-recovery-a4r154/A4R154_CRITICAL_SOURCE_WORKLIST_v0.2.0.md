# A4R154 Critical Source Worklist v0.2.0

Status: CRITICAL_SOURCE_WORKLIST_RECORDED
Phase: A4R154

## Group A — CROSS_EVENT_MISATTRIBUTION

| item | currentProblem | currentAllowedUse | prohibitedUse | sourceRecoveryNeed | priority | canProceedToGatePrep | canProceedToPOA |
|---|---|---|---|---|---|---|---|
| BS211-Q400 mapped to Colgan 3407 path | TXT-029 points to Colgan local file; event/source collision | integrity-overlay tracking only | any deep review or event-level inference as BS211 source | recover valid official BS211 source and remap authority | HIGH | NO | NO |

## Group B — FALSE_FULL_TEXT / CONTAMINATED

| item | currentProblem | currentAllowedUse | prohibitedUse | sourceRecoveryNeed | priority | canProceedToGatePrep | canProceedToPOA |
|---|---|---|---|---|---|---|---|
| pdf24_merged.txt | journalism (N8DX article), not official report | context hints only | event evidence lane | recover official NTSB source for N8DX | HIGH | NO | NO |
| pdf24_merged-2.txt | journalism (Kobe/Calabasas), not official report | context hints only | event evidence lane | replace with official authority if event remains in scope | MEDIUM | NO | NO |
| pdf24_merged-3.txt | AAIB bulletin multi-event index | indexing/source queue support | single-event evidence use | keep indexed only; do not promote as full text | MEDIUM | CAUTION | NO |
| pdf24_merged-5.txt | ICAO Doc 9859/SMM reference, non-event | methodology context only | event evidence lane | quarantine overlay only | LOW | NO | NO |
| pdf24_merged-6.txt | dissertation content, non-event | background context only | event evidence lane | quarantine overlay only | LOW | NO | NO |
| pdf24_merged-7.txt | DoD HFACS guide, non-event | taxonomy context only | event evidence lane | quarantine overlay only | LOW | NO | NO |
| pdf24_merged-8.txt | offshore engineering paper, non-event | background context only | event evidence lane | quarantine overlay only | LOW | NO | NO |
| G-WNSB-SUMBURGH GOV.UK scrape | treated as full text but is status/page scrape | source critique and planning only | deep review/full-text claims | recover full AAIB AAR text from official report PDF | HIGH | NO | NO |

## Group C — RECOVERY_REQUIRED_NEGATIVE_CONTROLS

| item | currentProblem | currentAllowedUse | prohibitedUse | sourceRecoveryNeed | priority | canProceedToGatePrep | canProceedToPOA |
|---|---|---|---|---|---|---|---|
| Delta 191 | OCR/extraction failure and layer divergence | source recovery planning | negative control deep review | high-quality OCR/re-extraction from official NTSB report | HIGH | NO | NO |
| QF32 | official source known but no local extracted text | source recovery planning | negative control deep review | extract TXT from official ATSB final report | HIGH | NO | NO |
| QF72 | final-report confirmation + extraction pending | source recovery planning | negative control deep review | confirm final ATSB report version and extract TXT | HIGH | NO | NO |
| AF66 | official source known but no extracted text | source recovery planning | negative control deep review | extract TXT from official BEA technical report | HIGH | NO | NO |
| Turoy EC225 | OCR/recovery still weak for robust use | future control planning | active negative-control deep review | recover OCR-quality text from official investigation report | MEDIUM | CAUTION | NO |

## Group D — HIGH-VALUE SOURCE RECOVERY BEFORE FUTURE REAUDIT

| item | currentProblem | currentAllowedUse | prohibitedUse | sourceRecoveryNeed | priority | canProceedToGatePrep | canProceedToPOA |
|---|---|---|---|---|---|---|---|
| N8DX / REAL-EVENT-0016 official NTSB source | local lane contaminated by journalism artifact | source tracking only | deep-review evidence as full text | recover canonical NTSB investigation page + docket artifacts | HIGH | NO | NO |
| BS211-Q400 valid official source | no valid local authoritative source currently mapped | integrity tracking only | any BS211 substantive use | recover official final investigation source and remap | HIGH | NO | NO |
| G-WNSB AAIB full AAR | scrape/full-text mismatch | planning only | deep-review full-text use | recover and verify full report extraction | HIGH | NO | NO |
| Eastern 401 OCR | source exists but OCR quality weak | source recovery lane | deep-review full-text confidence claims | OCR and extraction hardening | MEDIUM | CAUTION | NO |
| AF-F-GRHT BEA extraction | official PDF known, no extracted text lane | source recovery lane | deep-review usage before extraction | extract and validate text | MEDIUM | CAUTION | NO |
| Cougar A11H0001 TSB HTML extraction | official HTML confirmed; extraction lane incomplete | source recovery lane | deep-review use without extraction method note | structured HTML extraction and anchor mapping | MEDIUM | CAUTION | NO |
| CHO A19A0055 TSB HTML extraction | official HTML confirmed; extraction lane incomplete | source recovery lane | deep-review use without extraction method note | structured HTML extraction and anchor mapping | MEDIUM | CAUTION | NO |

## Rule

A4R154 updates integrity and source-readiness overlays only. No physical corpus move/deletion is allowed in this phase.
