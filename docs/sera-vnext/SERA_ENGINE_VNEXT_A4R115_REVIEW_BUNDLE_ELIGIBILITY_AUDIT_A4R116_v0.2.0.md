# SERA Engine vNext A4R115 Review Bundle Eligibility Audit A4R116 v0.2.0

Status: REVIEW_BUNDLE_ELIGIBILITY_AUDIT
Phase: A4+R-116
DOCS_ONLY
AUTHOR_REVIEW_PREP_QA_ONLY
NO_AUTHOR_REVIEW_BUNDLE_CREATED
NO_RELEASE
NO_DOWNSTREAM

## Scope
This audit reviews the four A4R115 cases previously reported as eligible for a consolidated author-review bundle. It does not create the bundle and does not change trace classifications.

## Eligibility audit matrix
| eventId | P/O/A documented? | O-axis decision basis | A-axis observable basis | probable-cause or external conclusion misuse? | canonical node missing? | conservative alternative needed? | recovered corpus affects case? | result | rationale |
|---|---|---|---|---|---|---|---|---|---|
| UPS-1354 | yes | Based on continuation below stabilized/minimum-altitude gates after an initially normal approach objective; not merely bad outcome. | Based on vertical-speed mode, monitoring/callout omissions, descent continuation, and late warning response. | no | no | yes, keep P-G and A-G alternatives visible | no | KEEP_WITH_WARNING | Suitable for author review, but P-F/P-G and A-F/A-G must be explicit review questions. |
| AMERICAN-1420 | yes | Partly based on objective to complete landing before severe weather; risk is that O-C may overstate violation pattern from outcome/severe-weather continuation. | Based on landing rollout/spoiler/brake/reverse-thrust sequence, but branch between implementation and selection remains sensitive. | no | no | yes, O-D or UNRESOLVED must remain live | no | REQUIRE_MINOR_PATCH_BEFORE_REVIEW | The trace is canonical but P-D and especially O-C need tighter caution wording before an author-review bundle. Do not present O-C as clean closure. |
| COLGAN-3407 | yes | O-A is framed as nominal approach intent, not objective failure by outcome. | Based on stick-shaker response, aft column movement, power, pusher, and flap selection; A-F versus A-E remains open. | no | no | yes, A-E must remain live | no | KEEP_WITH_WARNING | Suitable for author review with the A-axis branch warning retained. O-axis should remain nominal unless author sees independent intent evidence. |
| US-AIRWAYS-1549 | yes | Based on evolving emergency objective from runway return assessment to managed ditching; not result-only. | Based on takeover, checklist delegation, feasibility calls, configuration, and ditching actions. | no | no | yes, retain nominal-candidate caveat | no | KEEP_IN_REVIEW_BUNDLE | Strongest review-bundle candidate as a nominal/no-failure calibration draft. It still requires author review before any reference promotion. |

## Answers to critical questions
| question | audit answer |
|---|---|
| Do the cases really have P/O/A documented? | Yes, all four include P, O, and A sections. |
| Was O-axis built from decision/objective rather than bad result? | Mostly yes. AMERICAN-1420 has the highest risk of objective branch overreach and needs caution before review. |
| Was A-axis built from observable action/omission? | Yes, but UPS-1354, AMERICAN-1420, and COLGAN-3407 all retain action-branch alternatives. |
| Is there improper use of probable cause/contributing factors? | No direct misuse found in the trace text; quarantine sections are present. |
| Is any canonical node missing? | No. |
| Is a conservative alternative needed? | Yes for UPS-1354, AMERICAN-1420, and COLGAN-3407; less so for US-AIRWAYS-1549. |
| Does recovered corpus affect the case? | No direct effect. |
| Should the case enter author review? | UPS-1354, COLGAN-3407, and US-AIRWAYS-1549 can enter with warnings. AMERICAN-1420 should enter only after minor caution/status wording is patched in the future bundle text. |

## Final review-bundle posture after QA
| status | cases |
|---|---|
| Keep in bundle now | `US-AIRWAYS-1549` |
| Keep with warning | `UPS-1354`, `COLGAN-3407` |
| Require minor patch before review | `AMERICAN-1420` |
| Remove from bundle | none in this audit |

No author-review bundle was created in A4R116.
