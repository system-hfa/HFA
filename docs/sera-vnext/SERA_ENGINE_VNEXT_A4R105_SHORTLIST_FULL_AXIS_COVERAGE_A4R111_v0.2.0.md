# SERA Engine vNext A4R105 Shortlist Full-Axis Coverage A4R111 v0.2.0

Status: A4R105_SHORTLIST_FULL_AXIS_COVERAGE  
Phase: A4+R-111  
DOCS_ONLY  
FULL_AXIS_REBALANCING_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Coverage matrix
| candidateId | sourceStrength | P_evidencePotential | O_evidencePotential | A_evidencePotential | P_likelyPathClarity | O_likelyPathClarity | A_likelyPathClarity | noFailurePathLikelyForO | noFailurePathLikelyForA | multiAxisPotential | riskOfOverclassificationP | riskOfOverclassificationO | riskOfOverclassificationA | recommendedUse | rationale |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ASIANA-214 | HIGH | HIGH | MEDIUM/HIGH | HIGH | MEDIUM/HIGH | MEDIUM | MEDIUM/HIGH | possible | possible | HIGH | MEDIUM | MEDIUM | MEDIUM/HIGH | FULL_P_O_A_TRACE_CANDIDATE | strong automation/callout timeline supports P and A; O still needs clearer intent-vs-risk handling but is documentable |
| COMAIR-5191 | HIGH | HIGH | MEDIUM | MEDIUM | HIGH | MEDIUM | MEDIUM | possible | possible | MEDIUM | LOW/MEDIUM | MEDIUM | MEDIUM | P_REFERENCE_ONLY | internally approved on P with limitations; O/A remained source-slice dependent in A4R110 |
| KOREAN-801 | HIGH | HIGH | MEDIUM | MEDIUM | MEDIUM/HIGH | LOW/MEDIUM | LOW/MEDIUM | possible | possible | MEDIUM | MEDIUM | HIGH | HIGH | BOUNDARY_CANDIDATE | robust P boundary value but O/A decomposition remains high-risk and unresolved |
| UPS-1354 | HIGH | HIGH | HIGH | HIGH | HIGH | MEDIUM/HIGH | MEDIUM/HIGH | possible | possible | HIGH | MEDIUM | MEDIUM | MEDIUM | FULL_P_O_A_TRACE_CANDIDATE | nonprecision approach with strong timeline, callouts, and response sequence suitable for full-axis documentation |
| FIRST-AIR-6560 | MEDIUM/HIGH | MEDIUM | MEDIUM/HIGH | MEDIUM/HIGH | LOW/MEDIUM | MEDIUM | MEDIUM | possible | possible | MEDIUM | MEDIUM | MEDIUM | MEDIUM | SOURCE_SLICE_REQUIRED | official source exists but current local extraction is shallow and needs deeper factual slicing |
| AMERICAN-1420 | HIGH | HIGH | HIGH | HIGH | MEDIUM/HIGH | HIGH | HIGH | possible | possible | HIGH | MEDIUM | MEDIUM | MEDIUM | FULL_P_O_A_TRACE_CANDIDATE | strong decision/continuation and execution evidence makes it a balanced O/A-heavy candidate with P support |
| AMERICAN-965 | HIGH | HIGH | MEDIUM/HIGH | MEDIUM/HIGH | MEDIUM | MEDIUM | MEDIUM | possible | possible | MEDIUM/HIGH | MEDIUM | MEDIUM | MEDIUM | SOURCE_SLICE_REQUIRED | event is promising for P/O/A, but local text package is thin and needs denser source slices |
| AIR-CANADA-624 | HIGH | HIGH | MEDIUM/HIGH | HIGH | MEDIUM/HIGH | MEDIUM | MEDIUM/HIGH | likely | likely | HIGH | MEDIUM | MEDIUM | MEDIUM | FULL_P_O_A_TRACE_CANDIDATE | approach profile, cues, and execution chain appear suited for full-axis trace including nominal branches |
| KEGWORTH-GOBME | HIGH | HIGH | MEDIUM | HIGH | MEDIUM | LOW/MEDIUM | MEDIUM/HIGH | possible | possible | MEDIUM/HIGH | MEDIUM/HIGH | MEDIUM/HIGH | MEDIUM/HIGH | SOURCE_SLICE_REQUIRED | official PDFs are available but current extracted text is insufficient for controlled full-axis closure |
| G-BLUN-OFFSHORE | HIGH | MEDIUM | MEDIUM | HIGH | LOW/MEDIUM | LOW/MEDIUM | MEDIUM | possible | possible | MEDIUM | MEDIUM/HIGH | MEDIUM/HIGH | MEDIUM | SOURCE_SLICE_REQUIRED | offshore relevance is strong, but current local extraction is sparse for confident P/O separation |

## A4R111 interpretation
- A4R105 shortlist remains valid as source portfolio.
- A4R111 reframes it as full-axis coverage planning, not P-first promotion.
- COMAIR-5191 and KOREAN-801 remain valuable as P-focused internal drafts, not complete references.
