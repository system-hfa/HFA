# SERA Engine vNext Author Approval Dossier Template A4R93 v0.2.0

Status: AUTHOR_APPROVAL_DOSSIER_TEMPLATE  
Phase: A4+R-93  
DOCS_ONLY  
GOVERNANCE_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

Use this template as a copyable, self-contained author decision dossier.

---

## Executive Decision Summary
- candidateId:
- caseId:
- axis:
- reviewedCode:
- currentStatus:
- sourceQuality:
- technicalRecommendation: `MAINTAIN | APPROVE | HOLD | WITHDRAW | SOURCE_RECHECK`
- canonicalTraceDependency: `REQUIRED | NOT_REQUIRED_TEXTUAL_REVIEW_ONLY`
- canonicalTraceRef: `<trace-doc-path-or-id | n/a>`
- canonicalTraceStatus: `CANONICAL_VERIFIED | REAL_TREE_MISSING | CANONICAL_NODE_MISSING | NOT_APPLICABLE_TEXTUAL_REVIEW`

## Event in Plain Language
5-10 lines:
- 
- 
- 

## Facts That Matter
- 
- 
- 

## Evidence Supporting the Code
- 
- 
- 

## Evidence Against / Limitations
- 
- 
- 

## Alternative Decision
- mainAlternative: `UNRESOLVED | <other>`
- alternativeRationale:

## Overclassification Risk
- riskLevel: `LOW | MEDIUM | HIGH`
- why:

## Consequence if Approved/Maintained
- what changes:
- what does not change:
- downstream/runtime impact: `none`

## Consequence if Held/Withdrawn
- effective status:
- rework needed:
- rollback needed:

## Recommended Decision
- recommendation:
- rationale:

## Author Questions
1. Does the evidence support this code? `YES | NO | DONT_KNOW`
2. Is `UNRESOLVED` safer at this stage? `YES | NO | DONT_KNOW`
3. Is there overclassification risk? `LOW | MEDIUM | HIGH`
4. Do you maintain/approve this status? `MAINTAIN | APPROVE | NO`
5. Do you request targeted review before decision? `YES | NO`
6. Do you withdraw this status? `YES | NO`

## Author Response Block
- authorDecision:
- authorRationale:
- effectiveStatus:
- rollbackNeeded:
- decisionDate:
- decisionRecorder:

---

## Notes
- This dossier is decision-facing and must be understandable without opening long technical files.
- External report conclusions remain quarantined and cannot be used as automatic SERA truth.
- If `canonicalTraceDependency=REQUIRED`, this dossier is invalid as approval proof unless the canonical trace is present and exact-question compliant.
