# REFERENCE CASE - UNITED-173 - FULL AXIS CANONICAL DRAFT A4R119

status: CANONICAL_TRACE_DRAFT
phase: A4R119
eventId: UNITED-173
unifiedCandidateId: UC-021
methodology: SERA
canonicalTreeSource: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
checklist: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`
reportSource: NTSB AAR-79-07 local TXT/PDF
validationStatus: REVIEW_REQUIRED
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM
frontendReadiness: NOT_READY_REVIEW_REQUIRED
reviewBundleStatus: NOT_EVALUATED_IN_A4R119

## 1. Event factual summary
United 173 prolonged gear-malfunction troubleshooting and emergency-preparation work while fuel state degraded. CVR/FDR-supported sequence shows repeated fuel advisories and delayed transition to immediate landing execution, ending in multi-engine fuel exhaustion.

## 2. Escape point definition
Primary escape point: when repeated fuel-state advisories and remaining-time estimates indicated that continued troubleshooting was no longer compatible with safe fuel margin.

## 3. Canonical source preflight
- asset file: A4R99 canonical tree asset
- checklist file: A4R99 validation checklist
- node path availability: P, O, and A nodes used below exist in A4R99
- missing nodes: none identified

## 4. P-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | What did the operator or crewmember believe was the state of the world with respect to the goal(s)? | START | U173-E1, U173-E2 | P_ASSESSMENT | Crew belief mixed gear-malfunction focus with deteriorating fuel situation. |
| P_ASSESSMENT | Avaliação correta ou adequada da situação? | Correct or adequate assessment of the situation? | NÃO | U173-E1, U173-E3 | P_CAPABILITY | Fuel risk integration into threat picture appears incomplete. |
| P_CAPABILITY | Possuía a capacidade necessária para sentir e perceber a situação? | Had the pre-requisite capability to sense and perceive the situation? | SIM | U173-E1, U173-E2 | P_TIME_PRESSURE | Fuel and timeline cues were available through instruments and crew callouts. |
| P_TIME_PRESSURE | A pressão do tempo percebida era excessiva? | Time pressure excessive? | NÃO | U173-E2, U173-E3 | P_INFORMATION_AMBIGUOUS | Pressure rose over time but cue availability remained clear. |
| P_INFORMATION_AMBIGUOUS | A informação era ilusória ou ambígua? | Information illusory or ambiguous? | NÃO | U173-E1, U173-E2 | P_INFORMATION_AVAILABLE | Fuel-state information was not inherently ambiguous. |
| P_INFORMATION_AVAILABLE | A informação estava disponível e correta? | Information available and correct? | SIM | U173-E1, U173-E2 | P-G | Attentional integration failure remains the leading P candidate. |

P-axis provisional outcome: P-G draft candidate.
Rejected alternative: P-D remains boundary-live if reviewer interprets emergent time pressure as dominant attentional driver.

## 5. O-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| O_ROOT | O que o operador estava tentando alcançar? Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro? | What was the operator or crew member trying to achieve...what was the intent or goal(s) that led to the unsafe act? | START | U173-E4, U173-E5 | O_RULES | Objective centered on resolving gear issue and landing with perceived configuration assurance. |
| O_RULES | O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos? | Was the GOAL consistent with rules, regulations and SOPs, and was it also consistent with good risk management? | SIM | U173-E4 | O_MANAGED_RISK | Original objective appears operationally legitimate at onset. |
| O_MANAGED_RISK | O ato inseguro resultou do exercício de uma meta que, embora consistente com as Regras e Regulamentos, não era consistente com os procedimentos operacionais estabelecidos ou não gerenciava ou limitava o risco? | GOAL conservative, managed risk, consistent with SOPs? | NÃO | U173-E5 | O-D | Continuation became non-conservative as fuel risk escalated. |

O-axis provisional outcome: O-D draft candidate.
Rejected alternative: O-A rejected for late phase because continuation did not sufficiently limit fuel-risk exposure.

## 6. A-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| A_ROOT | Como o operador estava tentando atingir o objetivo? | How was the operator trying to achieve the goal(s)? | START | U173-E6, U173-E7 | A_IMPLEMENTED | Actions included troubleshooting, communications, emergency prep, and delayed transition to landing execution. |
| A_IMPLEMENTED | A ação foi implementada como pretendida? | Implemented as intended? | SIM | U173-E6 | A_CORRECT | Crew actions were intentional but potentially mis-prioritized. |
| A_CORRECT | A ação foi a correta ou adequada? | Correct or adequate? | NÃO | U173-E6, U173-E7 | A_CAPABILITY | Action strategy appears inadequate for evolving fuel-critical context. |
| A_CAPABILITY | O operador ou a tripulação possuía o pré-requisito de capacidade, conhecimento ou habilidades necessárias para formar e implementar uma ação apropriada para a situação? | Had the pre-requisite capability to make a response? | SIM | U173-E6 | A_TIME_PRESSURE | Evidence does not indicate inability to respond as primary driver. |
| A_TIME_PRESSURE | A pressão do tempo era realmente excessiva? | Time pressure excessive? | NÃO_SELECAO | U173-E7 | A-F | Draft favors action-selection failure branch. |

A-axis provisional outcome: A-F draft candidate.
Rejected alternative: A-G remains boundary-live if reviewer treats delayed response as feedback-integration failure rather than selection failure.

## 7. Axis outcome summary
| axis | status | provisional outcome |
|---|---|---|
| P | REVIEW_REQUIRED | P-G (P-D boundary live) |
| O | REVIEW_REQUIRED | O-D |
| A | REVIEW_REQUIRED | A-F (A-G boundary live) |

No final classification is created.

## 8. Evidence crosswalk
| evidenceId | supports |
|---|---|
| U173-E1 | P_ASSESSMENT, P_INFORMATION_AVAILABLE |
| U173-E5 | O_MANAGED_RISK |
| U173-E7 | A_TIME_PRESSURE |

## 9. Rejected alternatives
- P-D: not selected as primary branch in current draft, but remains live.
- O-A: rejected for late-phase continuation behavior.
- A-G: held as live boundary alternative.

## 10. Quarantine of external investigation conclusions
Probable cause, contributing factors, findings, and safety recommendations are quarantined and not used as SERA answer keys.

## 11. Source gaps
- OCR quality requires careful author review on line-level factual interpretation.
- Additional source slicing could strengthen timing granularity between fuel warnings and action transition.

## 12. Front-end future display notes
Draft only; not final causation; not risk scoring; not a safety recommendation; not release-ready.

## 13. Review questions for author
- Is O-D sufficiently supported as the dominant objective branch for UNITED-173?
- Should A-axis remain A-F or shift to A-G under stricter feedback logic?
