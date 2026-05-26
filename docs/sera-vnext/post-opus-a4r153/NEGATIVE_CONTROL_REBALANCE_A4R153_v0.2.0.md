# Negative Control Rebalance A4R153 v0.2.0

Status: NEGATIVE_CONTROL_REBALANCE_RECORDED
Phase: A4R153

| eventId | priorStatus | opusDecision | correctedStatusOverlay | rationale | requiredAction |
|---|---|---|---|---|---|
| US-AIRWAYS-1549 | OPUS_NEGATIVE_CONTROL_PACKET | KEEP | KEEP | Official report text present and usable as negative control | Keep with source-quality caution protocol |
| EC225-G-REDW/G-CHCN | OPUS_NEGATIVE_CONTROL_PACKET | KEEP | KEEP | Technical onset profile remains valid for negative control | Keep as negative control |
| COUGAR-A09A0016 | OPUS_NEGATIVE_CONTROL_PACKET | KEEP_WITH_ESCAPE_POINT_CAUTION | KEEP_WITH_ESCAPE_POINT_CAUTION | Usable with explicit caution on technical onset warning framing | Keep with caution annotation |
| DELTA-191 | OPUS_NEGATIVE_CONTROL_PACKET | DEMOTE | RECOVERY_REQUIRED_OCR | OCR/readability failures and layer divergence | OCR recovery before reuse |
| QF32 | OPUS_NEGATIVE_CONTROL_PACKET | DEMOTE | RECOVERY_REQUIRED_TXT_EXTRACTION | Official source located but no extracted TXT in packet | Extract TXT then reassess |
| QF72 | OPUS_NEGATIVE_CONTROL_PACKET | DEMOTE | RECOVERY_REQUIRED_MANUAL_CONFIRMATION_AND_TXT_EXTRACTION | final report confirmation pending + no extracted TXT | Confirm final report and extract TXT |
| AF66 | OPUS_NEGATIVE_CONTROL_PACKET | DEMOTE | RECOVERY_REQUIRED_TXT_EXTRACTION | Official source located but no extracted TXT in packet | Extract TXT then reassess |
| TUROY-EC225 | OPUS_SECONDARY_PACKET | FUTURE_ADD | ADD_AS_FUTURE_NEGATIVE_CONTROL_AFTER_OCR | Candidate valuable after OCR/recovery hardening | OCR recovery and later reassessment |
| LEARJET-35A/N47BA | OPUS_SECONDARY_PACKET | FUTURE_CONSIDERATION | CONSIDER_AS_FUTURE_CONTROL_OR_PAIRING_CASE | Potential pairing/control role after source-hardening | Evaluate in future control design pass |
