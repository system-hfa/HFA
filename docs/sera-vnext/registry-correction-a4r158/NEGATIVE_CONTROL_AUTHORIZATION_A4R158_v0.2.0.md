# Negative Control Authorization A4R158 v0.2.0

Status: NEGATIVE_CONTROL_AUTHORIZATION_RECORDED
Phase: A4R158

| eventId | source status | path integrity status | authorization | caution | reason |
|---|---|---|---|---|---|
| US-AIRWAYS-1549 | READY | PATH_CONFIRMED_WITH_CAUTION | AUTHORIZED_WITH_CAUTION | duplicate-copy caution | stable anchor with caution controls |
| DELTA-191 | OCR_IMPROVED_USABLE | VALID_WITH_CAUTION | AUTHORIZED_WITH_CAUTION | OCR artifacts | usable after OCR, keep caution |
| TUROY-EC225 | READY_WITH_SOURCE_CHAIN_NOTE | VALID_WITH_CAUTION | AUTHORIZED_WITH_CAUTION | source-chain note | full report available with chain note |
| EC225-G-REDW/G-CHCN | READY | DUPLICATE_PATH_SHARED->VALID_WITH_CAUTION | AUTHORIZED_WITH_CAUTION | duplicate ownership caution | usable with canonical ownership |
| COUGAR-A09A0016 | READY_WITH_CAUTION | DUPLICATE_PATH_SHARED->VALID_WITH_CAUTION | AUTHORIZED_WITH_CAUTION | duplicate ownership caution | usable with caution |
| QF32 | READY_IN_A4R156_SOURCE_LANE | EXTERNAL_ONLY_PENDING | SOURCE_RECOVERY_REQUIRED | missing normalized registry path | complete normalized mapping first |
| QF72 | RECOVERY_REQUIRED | BLOCKED_SOURCE_RECOVERY_REQUIRED | SOURCE_RECOVERY_REQUIRED | official final report unavailable | manual official recovery required |
| AF66 | READY_IN_A4R156_SOURCE_LANE | EXTERNAL_ONLY_PENDING | NOT_AUTHORIZED | missing normalized registry path | complete normalized mapping first |
| LEARJET-35A/N47BA | FUTURE_CONSIDERATION | MANUAL_REVIEW_REQUIRED | NOT_AUTHORIZED | future candidate/manual review | outside active negative-control lane for now |

BS211 is not treated as a negative control.
