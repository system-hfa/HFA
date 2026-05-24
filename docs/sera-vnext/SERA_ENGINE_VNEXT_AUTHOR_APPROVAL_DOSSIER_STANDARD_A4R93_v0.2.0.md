# SERA Engine vNext Author Approval Dossier Standard A4R93 v0.2.0

Status: AUTHOR_APPROVAL_DOSSIER_STANDARD  
Phase: A4+R-93  
DOCS_ONLY  
GOVERNANCE_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Objective
Define a mandatory, simple, self-contained author approval dossier format for any future approval/maintenance/hold/withdraw decision, so the author can decide directly from one concise document without opening long technical documents.

## Mandatory Rule
Every future author decision must include a complete dossier in this standard before decision recording.

Approval recording is not valid if:
- there is no plain-language summary plus factual block;
- there are no explicit limitations/contra-evidence;
- there are no simple decision questions for the author;
- the dossier depends on opening long technical files to understand the core decision.

## Required Structure Per Candidate
### 1) Candidate identity
- `caseId`
- `proposed/reviewed code`
- `axis`
- `status`
- `source quality`

### 2) Plain-language event summary
- 5 to 10 lines.
- operationally clear and non-technical where possible.

### 3) Relevant facts
- observable facts only.
- no external causal conclusions as decision truth.

### 4) Why the code may be supported
- core evidence supporting the code candidate.

### 5) What weakens the code
- counter-evidence, uncertainty, and limitations.

### 6) Main alternative
- `UNRESOLVED` or another code path, with concise rationale.

### 7) Risk of overclassification
- `LOW` / `MEDIUM` / `HIGH`, with why.

### 8) Consequence of approval
- what changes and what does not change.
- must explicitly include downstream/runtime locks.

### 9) Technical recommendation
- one clear recommendation:
  - `MAINTAIN`
  - `APPROVE`
  - `HOLD`
  - `WITHDRAW`
  - `SOURCE_RECHECK`

### 10) Simple author questions
- yes/no/don't know.
- maintain/approve/request-review/withdraw.

### 11) Decision recording block
- `authorDecision`
- `authorRationale`
- `effectiveStatus`
- `rollbackNeeded`

## Governance Constraints
- Dossier standardization does not create release.
- Dossier standardization does not create proposedCode.
- Dossier standardization does not reduce unresolved.
- Dossier standardization does not open downstream.

## Canonical Trace Dependency Rule
If the dossier is used as evidence for reference-case validity, front-end calibration display, methodology proof, or any code/release recommendation:
- it must declare `canonicalTraceDependency=REQUIRED`;
- it must reference a canonical trace containing exact SERA question traversal (`canonicalTreeSource`, `nodeId`, `exactQuestionTextPT`, `exactQuestionTextENAnchor`, answers, evidence);
- if canonical trace is missing/incomplete, mark `BLOCKED_BY_MISSING_CANONICAL_TREE` and do not treat the dossier as approval proof.

If the dossier is only a human textual review artifact (no canonical proof claim):
- declare `canonicalTraceDependency=NOT_REQUIRED_TEXTUAL_REVIEW_ONLY`;
- do not use it for reference-case/front-end/methodology proof claims.

## Taxonomy Guardrail
- `O-E = NON_EXISTENT_IN_SERA_PT_V1`.
- `O-E` cannot be used as active objective code in dossiers.
