# REFERENCE CASE - UNITED-232 - FULL AXIS CANONICAL DRAFT A4R119

status: CANONICAL_TRACE_DRAFT
phase: A4R119
eventId: UNITED-232
unifiedCandidateId: UC-022
methodology: SERA
canonicalTreeSource: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
checklist: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`
reportSource: NTSB AAR-90/06 local TXT/PDF
validationStatus: PASS_WITH_LIMITATIONS
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM
frontendReadiness: NOT_READY_REVIEW_REQUIRED
reviewBundleStatus: NOT_EVALUATED_IN_A4R119

## 1. Event factual summary
United 232 suffered a catastrophic technical failure with near-total hydraulic control loss. The crew identified controllability collapse, declared emergency, redistributed cockpit roles, and executed an adaptive differential-thrust strategy during an attempted emergency landing.

## 2. Escape point definition
Primary escape point: immediate post-failure emergency strategy formation, including role assignment and thrust-based control method under extreme control-limit constraints.

## 3. Canonical source preflight
- asset file: A4R99 canonical tree asset
- checklist file: A4R99 validation checklist
- node path availability: P, O, and A nodes used below exist in A4R99
- missing nodes: none identified

## 4. P-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | What did the operator or crewmember believe was the state of the world with respect to the goal(s)? | START | U232-E1, U232-E2 | P_ASSESSMENT | Crew recognized profound control degradation soon after failure sequence. |
| P_ASSESSMENT | Avaliação correta ou adequada da situação? | Correct or adequate assessment of the situation? | SIM | U232-E1, U232-E2 | P-A | Available evidence supports adequate situational assessment under constraints. |

P-axis provisional outcome: P-A nominal draft candidate.
Rejected alternative: P-G is not leading in current slice because assessment appears coherent with observed state.

## 5. O-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| O_ROOT | O que o operador estava tentando alcançar? Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro? | What was the operator or crew member trying to achieve...what was the intent or goal(s) that led to the unsafe act? | START | U232-E3, U232-E4 | O_RULES | Objective remained survivable emergency handling and landing under severe failure constraints. |
| O_RULES | O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos? | Was the GOAL consistent with rules, regulations and SOPs, and was it also consistent with good risk management? | SIM | U232-E3 | O_MANAGED_RISK | Intent was conservative and risk-limiting relative to control-loss reality. |
| O_MANAGED_RISK | O ato inseguro resultou do exercício de uma meta que, embora consistente com as Regras e Regulamentos, não era consistente com os procedimentos operacionais estabelecidos ou não gerenciava ou limitava o risco? | GOAL conservative, managed risk, consistent with SOPs? | SIM | U232-E3, U232-E4 | O-A | Objective branch remains nominal in current evidence frame. |

O-axis provisional outcome: O-A nominal draft candidate.
Rejected alternative: O-D not selected because evidence does not indicate intent drift away from conservative emergency objective.

## 6. A-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| A_ROOT | Como o operador estava tentando atingir o objetivo? | How was the operator trying to achieve the goal(s)? | START | U232-E5, U232-E6, U232-E7 | A_IMPLEMENTED | Crew used adaptive thrust-based control strategy and coordinated role execution. |
| A_IMPLEMENTED | A ação foi implementada como pretendida? | Implemented as intended? | SIM | U232-E5, U232-E6 | A_CORRECT | Core emergency action strategy was implemented as designed under constraints. |
| A_CORRECT | A ação foi a correta ou adequada? | Correct or adequate? | SIM | U232-E6, U232-E7 | A-A | Current slice supports nominal action adequacy despite catastrophic outcome. |

A-axis provisional outcome: A-A nominal draft candidate.
Rejected alternative: A-F remains boundary-live only if later evidence shows a better feasible action strategy that was not selected.

## 7. Axis outcome summary
| axis | status | provisional outcome |
|---|---|---|
| P | DRAFT_WITH_LIMITATIONS | P-A |
| O | DRAFT_WITH_LIMITATIONS | O-A |
| A | DRAFT_WITH_LIMITATIONS | A-A |

No final classification is created.

## 8. Evidence crosswalk
| evidenceId | supports |
|---|---|
| U232-E1 | P_ASSESSMENT |
| U232-E3 | O_RULES, O_MANAGED_RISK |
| U232-E6 | A_IMPLEMENTED, A_CORRECT |

## 9. Rejected alternatives
- P-G: not leading in current source slice.
- O-D: not supported by objective evidence in current source frame.
- A-F: held as adversarial boundary only.

## 10. Quarantine of external investigation conclusions
Probable cause, contributing factors, findings, and safety recommendations are quarantined and not used as SERA answer keys.

## 11. Source gaps
- Technical-dominant nature requires explicit display caution so nominal crew-action reading is not misinterpreted as minimizing system failure.
- Additional fine-grain control-input timeline slicing could strengthen A-axis confidence.

## 12. Front-end future display notes
Draft only; not final causation; not risk scoring; not a safety recommendation; not release-ready.

## 13. Review questions for author
- Does UNITED-232 remain a valid adversarial nominal A candidate despite catastrophic outcome?
- Is current O-A support sufficient, or should O remain open for boundary recheck?
