# REFERENCE CASE - UPS-1354 - FULL AXIS CANONICAL DRAFT A4R115

status: CANONICAL_TRACE_DRAFT
phase: A4R115
eventId: UPS-1354
unifiedCandidateId: UC-003
methodology: SERA
canonicalTreeSource: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
checklist: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`
reportSource: NTSB AAR-14/02 local TXT/PDF
validationStatus: PASS_WITH_LIMITATIONS
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM
frontendReadiness: NOT_READY_REVIEW_REQUIRED
traceCautionStatus: OPUS_DOUBLE_COUNTING_WARNING_ACTIVE

## 1. Event factual summary
UPS-1354 flew a nighttime localizer nonprecision approach to Birmingham runway 18. The crew briefed a profile approach, but an FMC discontinuity made the generated glidepath unusable. The captain changed to vertical speed mode, descent continued through stabilized and minimum-altitude gates, required altitude callouts did not occur, and an EGPWS sink-rate caution occurred shortly before impact.

## 2. Escape point definition
Primary escape point: below 1,000 ft AFE at a descent rate greater than 1,000 fpm, where the approach violated stabilized criteria and required go-around. Secondary escape point: minimum descent altitude, where required callouts and level-off did not occur.

## 3. Canonical source preflight
- asset file: A4R99 canonical tree asset
- checklist file: A4R99 validation checklist
- node path availability: P, O, and A nodes used below exist in A4R99
- missing nodes: none identified

## 4. P-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | What did the operator or crewmember believe was the state of the world with respect to the goal(s)? | START | UPS-E2, UPS-E3 | P_ASSESSMENT | Draft starts from crew belief about valid approach/path state. |
| P_ASSESSMENT | Avaliação correta ou adequada da situação? | Correct or adequate assessment of the situation? | NÃO | UPS-E3, UPS-E5 | P_CAPABILITY | Crew did not recognize invalid/meaningless vertical path and descent gate failures. |
| P_CAPABILITY | Possuía a capacidade necessária para sentir e perceber a situação? | Had the pre-requisite capability to sense and perceive the situation? | SIM | UPS-E3, UPS-E5, UPS-E6 | P_TIME_PRESSURE | Instruments/callouts/warnings were available; no primary sensory incapacity shown. |
| P_TIME_PRESSURE | A pressão do tempo percebida era excessiva? | Time pressure excessive? | NÃO | UPS-E1, UPS-E5 | P_INFORMATION_AMBIGUOUS | Night/approach pressure existed, but the slice does not support excessive time pressure as dominant. |
| P_INFORMATION_AMBIGUOUS | A informação era ilusória ou ambígua? | Information illusory or ambiguous? | SIM | UPS-E3 | P-F | Meaningless FMC/VDI path information creates an ambiguity/illusion candidate. |

P-axis provisional outcome: P-F draft candidate.
Rejected alternative: P-G remains plausible for the later altitude/callout cues, but the FMC/VDI ambiguity is the stronger P branch in this draft.

## 5. O-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| O_ROOT | O que o operador estava tentando alcançar? Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro? | What was the operator or crew member trying to achieve...what was the intent or goal(s) that led to the unsafe act? | START | UPS-E1, UPS-E2 | O_RULES | Objective was to complete the runway 18 approach and landing. |
| O_RULES | O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos? | Was the GOAL consistent with rules, regulations and SOPs, and was it also consistent with good risk management? | SIM | UPS-E2, UPS-E5 | O_MANAGED_RISK | Initial approach objective was procedural; risk management degraded as descent continued. |
| O_MANAGED_RISK | O ato inseguro resultou do exercício de uma meta que, embora consistente com as Regras e Regulamentos, não era consistente com os procedimentos operacionais estabelecidos ou não gerenciava ou limitava o risco? | GOAL conservative, managed risk, consistent with SOPs? | NÃO | UPS-E5 | O-D | Continued descent past stabilized/minimum-altitude gates indicates unmanaged risk within an otherwise operational landing goal. |

O-axis provisional outcome: O-D draft candidate.
Rejected alternative: O-A rejected because the approach continuation after gate failures was not risk-conservative.

## 6. A-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| A_ROOT | Como o operador estava tentando atingir o objetivo? | How was the operator trying to achieve the goal(s)? | START | UPS-E2, UPS-E4, UPS-E5 | A_IMPLEMENTED | Actions include vertical-speed mode use, monitoring, callouts, and descent management. |
| A_IMPLEMENTED | A ação foi implementada como pretendida? | Implemented as intended? | SIM | UPS-E4, UPS-E5 | A_CORRECT | Mode selection/descent continuation appear intentional, not merely slip/lapse at this branch. |
| A_CORRECT | A ação foi a correta ou adequada? | Correct or adequate? | NÃO | UPS-E4, UPS-E5 | A_CAPABILITY | Descent continuation and missed callouts were not adequate for the approach state. |
| A_CAPABILITY | O operador ou a tripulação possuía o pré-requisito de capacidade, conhecimento ou habilidades necessárias para formar e implementar uma ação apropriada para a situação? | Had the pre-requisite capability to make a response? | SIM | UPS-E5, UPS-E6 | A_TIME_PRESSURE | Source slice supports available procedural capability and cues. |
| A_TIME_PRESSURE | A pressão do tempo era realmente excessiva? | Time pressure excessive? | NÃO_SELECAO | UPS-E5, UPS-E6 | A-F | Action selection/continuation is the draft branch; feedback alternative remains possible but weaker. |

A-axis provisional outcome: A-F draft candidate.
Rejected alternative: A-G held because EGPWS feedback occurred late, but the stronger action issue began before that feedback.

## 7. Axis outcome summary
| axis | status | provisional outcome |
|---|---|---|
| P | DRAFT_WITH_LIMITATIONS | P-F |
| O | DRAFT_WITH_LIMITATIONS | O-D |
| A | DRAFT_WITH_LIMITATIONS | A-F |

No final classification is created.

## 8. Evidence crosswalk
| evidenceId | supports |
|---|---|
| UPS-E3 | P_ASSESSMENT, P_INFORMATION_AMBIGUOUS |
| UPS-E5 | P_ASSESSMENT, O_MANAGED_RISK, A_CORRECT, A_TIME_PRESSURE |
| UPS-E6 | P_CAPABILITY, A_CAPABILITY |

## 8A. A4R117 double-counting caution
- `UPS-E5` is reused across P/O/A and must not be treated as a single undifferentiated answer key.
- Axis rationale must remain distinct:
  - P-axis: assessment and cue-recognition logic.
  - O-axis: continuation objective and risk-management logic.
  - A-axis: action-selection versus feedback-response logic.
- `P-F` versus `P-G` remains a live boundary.
- `A-F` versus `A-G` remains a live boundary.
- `O-D` remains reviewable only when justified by observable continuation/decision behavior, not by outcome proximity.

## 9. Rejected alternatives
- P-G: possible for late altitude/callout cues, but FMC/VDI ambiguity is central enough to require P-F review.
- O-A: not supported by continuation below stabilized/minimum-altitude controls.
- A-C: not selected because the draft treats vertical-speed descent continuation as intentional action selection rather than implementation slip.

## 10. Quarantine of external investigation conclusions
Probable cause, contributing factors, findings, and safety recommendations are quarantined and not used as SERA answer keys.

## 11. Source gaps
- Need author review on P-F versus P-G boundary.
- Need focused review on A-F versus A-G if EGPWS feedback is treated as dominant.
- Need per-axis rationale verification where `UPS-E5` is reused to prevent double-counting.

## 12. Front-end future display notes
Draft only; not final causation; not risk scoring; not a safety recommendation; not release-ready.

## 13. Review questions for author
- UPS-1354: keep P-F as draft, or switch P to P-G because altitude/callout information was available and correct?
- UPS-1354: keep A-F, or treat late warning/feedback as A-G review-required?
