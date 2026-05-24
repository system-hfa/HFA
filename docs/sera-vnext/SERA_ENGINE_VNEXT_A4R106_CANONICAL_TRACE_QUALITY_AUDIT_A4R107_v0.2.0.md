# SERA Engine vNext A4R106 Canonical Trace Quality Audit A4R107 v0.2.0

Status: CANONICAL_TRACE_QUALITY_AUDIT  
Phase: A4+R-107  
DOCS_ONLY  
QUALITY_AUDIT_ONLY  
REVIEW_BUNDLE_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Case audit matrix
| caseId | allNodeIdsExistInA4R99 | allQuestionTextsExactFromAsset | allAnswerOptionsExistInAsset | sourceSliceSupportsEachAnswer | probableCauseUsedAsAnswerKey | O/A forced | overclassificationRisk | validationRecommendation | rationale |
|---|---|---|---|---|---|---|---|---|---|
| ASIANA-214 | yes | yes | yes | partial | no | no | MEDIUM | DOWNGRADE_TO_REVIEW_REQUIRED | Canonical mapping is exact, but support for `P_CAPABILITY(SIM)` and `P_INFORMATION_AMBIGUOUS(NÃO)` remains boundary-sensitive; source slice itself flags mode-awareness granularity limitations. |
| COMAIR-5191 | yes | yes | yes | yes | no | no | LOW/MEDIUM | KEEP_PASS_WITH_LIMITATIONS | Canonical path is exact and strongly tied to repeated runway-awareness cues; residual uncertainty is concentrated in escape-point fixation and time-pressure branch confidence. |
| KOREAN-801 | yes | yes | yes | partial | no | no | MEDIUM | KEEP_PASS_WITH_LIMITATIONS | Canonical path is exact; `P-F` remains plausible with factual support, but ambiguity-versus-monitoring boundary (`P-F` vs `P-G`) stays open and needs explicit author scrutiny. |

## Cross-case conclusion
- canonical-formal integrity against A4R99: PASS for all three cases.
- evidence sufficiency for direct promotion: not established in this phase.
- audit gate result: 2 cases remain `KEEP_PASS_WITH_LIMITATIONS`; 1 case is downgraded to `REVIEW_REQUIRED` for author-facing bundle discussion.

## Audit notes
- This phase does not request or execute author approval.
- This phase does not create release/front-end/downstream outcomes.
- This phase does not modify official P/O/A.
