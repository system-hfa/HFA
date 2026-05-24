# SERA Engine vNext Solid Reference Candidate Shortlist A4R103 v0.2.0

Status: SOLID_REFERENCE_CANDIDATE_SHORTLIST  
Phase: A4+R-103  
DOCS_ONLY  
SCREENING_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Selection rule
This shortlist is not approval, release, front-end readiness, or final reference status. It is a screening output for deciding which canonical traces to build next.

| eventId | whyStrong | likelySeraAxis | whatCanonicalPathSeemsAvailable | evidenceStrength | risk | nextStep |
|---|---|---|---|---|---|---|
| REAL-EVENT-0003 | Already rebuilt canonically in A4R100; strong factual sequence and clear P path. | P | `P_ROOT -> P_ASSESSMENT -> P_CAPABILITY -> P_TIME_PRESSURE -> P_INFORMATION_AMBIGUOUS -> P_INFORMATION_AVAILABLE -> P-G` | HIGH | MEDIUM: already covered and still review-gated for front-end use | Keep as anchor; use as comparator for next trace builds. |
| REAL-EVENT-0016 | Strong automation/mode interpretation boundary with high timeline value. | P | P capability/knowledge branch appears testable from asset if evidence supports it. | HIGH | MEDIUM: must avoid overfitting automation narrative into P-C. | Build canonical trace candidate. |
| D-HHNH | Strong low-visibility low-altitude sequence and teachable monitoring boundary. | P | P assessment and information availability branches appear traceable. | HIGH | MEDIUM: low-visibility context can over-infer perception failure. | Build canonical trace candidate after source slice. |
| HL9294 | Clear continuation boundary and objective-diversity value. | P/O | Objective and perception branches appear useful if evidence separates intent from perception. | HIGH | MEDIUM: objective branch must not be inferred from outcome alone. | Build canonical trace candidate focused on P/O separation. |
| BS211-Q400 | Strongest current tri-axis diversity exemplar with nontrivial A signal. | P/O/A | P-H/O-C/A-F paths appear plausible candidates but require exact trace validation. | HIGH | MEDIUM: tri-axis scope increases proof burden. | Build canonical trace candidate as highest-diversity case. |
| EXT-001 | Strong external source, offshore comparator value, and good factual chronology. | P | P assessment/information path appears buildable with source quarantine. | HIGH | MEDIUM: external report conclusions must stay quarantined. | Build source-sliced canonical trace candidate. |
| EXT-002 | Strong warning-response and monitoring boundary with good source quality. | P/A boundary | P path and action-boundary rejection appear didactically useful. | HIGH | MEDIUM: warning response must not become automatic code. | Build source-sliced canonical trace candidate. |
| EXT-006 | Strong objective/procedure boundary with high-quality source. | O | Objective tree appears testable for procedure/risk-management boundary. | HIGH | MEDIUM: probable cause must not become O answer key. | Build canonical objective-boundary trace candidate. |

## Recommended first build batch
Build 3-5 traces from:
- BS211-Q400
- REAL-EVENT-0016
- HL9294
- EXT-001
- EXT-006

## Non-goals
- No final classification.
- No release.
- No author approval request at screening stage.
- No front-end promotion.
