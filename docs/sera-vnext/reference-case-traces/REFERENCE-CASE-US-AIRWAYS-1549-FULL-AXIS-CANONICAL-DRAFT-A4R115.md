# REFERENCE CASE - US AIRWAYS 1549 - FULL AXIS CANONICAL DRAFT A4R115

status: CANONICAL_TRACE_DRAFT  
phase: A4R115  
eventId: US-AIRWAYS-1549  
unifiedCandidateId: UC-039  
methodology: SERA  
canonicalTreeSource: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`  
checklist: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`  
reportSource: NTSB AAR-10/03 local TXT/PDF  
validationStatus: PASS_WITH_LIMITATIONS  
releaseStatus: NO_RELEASE  
downstreamStatus: NO_DOWNSTREAM  
frontendReadiness: NOT_READY_REVIEW_REQUIRED

## 1. Event factual summary
US Airways 1549 encountered birds shortly after takeoff, and FDR/CVR data showed both engines losing thrust. The captain took control, directed the dual-engine failure checklist, assessed LaGuardia and Teterboro options, selected ditching in the Hudson, configured the aircraft, and completed evacuation after ditching.

## 2. Escape point definition
This trace is a nominal/no-failure calibration candidate. The relevant point is the decision window after dual thrust loss when runway return became infeasible and ditching became the managed objective.

## 3. Canonical source preflight
- asset file: A4R99 canonical tree asset
- checklist file: A4R99 validation checklist
- node path availability: P, O, and A nodes used below exist in A4R99
- missing nodes: none identified

## 4. P-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | What did the operator or crewmember believe was the state of the world with respect to the goal(s)? | START | US1549-E1, US1549-E2, US1549-E5 | P_ASSESSMENT | Crew belief concerned dual thrust loss and runway feasibility. |
| P_ASSESSMENT | Avaliação correta ou adequada da situação? | Correct or adequate assessment of the situation? | SIM | US1549-E1, US1549-E2, US1549-E5 | P-A | Crew recognized thrust loss and infeasible runway options quickly. |

P-axis provisional outcome: P-A nominal draft candidate.

## 5. O-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| O_ROOT | O que o operador estava tentando alcançar? Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro? | What was the operator or crew member trying to achieve...what was the intent or goal(s) that led to the unsafe act? | START | US1549-E3, US1549-E4, US1549-E5 | O_RULES | Objective evolved from return attempt to survivable ditching. |
| O_RULES | O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos? | Was the GOAL consistent with rules, regulations and SOPs, and was it also consistent with good risk management? | SIM | US1549-E3, US1549-E5 | O_MANAGED_RISK | Objective was consistent with emergency management under infeasible runway return. |
| O_MANAGED_RISK | O ato inseguro resultou do exercício de uma meta que, embora consistente com as Regras e Regulamentos, não era consistente com os procedimentos operacionais estabelecidos ou não gerenciava ou limitava o risco? | GOAL conservative, managed risk, consistent with SOPs? | SIM | US1549-E5, US1549-E6 | O-A | The source slice supports managed emergency objective. |

O-axis provisional outcome: O-A nominal draft candidate.

## 6. A-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| A_ROOT | Como o operador estava tentando atingir o objetivo? | How was the operator trying to achieve the goal(s)? | START | US1549-E3, US1549-E6 | A_IMPLEMENTED | Actions include taking control, checklist work, runway feasibility calls, flaps, and ditching. |
| A_IMPLEMENTED | A ação foi implementada como pretendida? | Implemented as intended? | SIM | US1549-E3, US1549-E6 | A_CORRECT | Actions were implemented in the emergency sequence. |
| A_CORRECT | A ação foi a correta ou adequada? | Correct or adequate? | SIM | US1549-E5, US1549-E6 | A-A | Current slice supports adequate action selection under constraints. |

A-axis provisional outcome: A-A nominal draft candidate.

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
| US1549-E1 | P_ASSESSMENT |
| US1549-E5 | P_ASSESSMENT, O_MANAGED_RISK, A_CORRECT |
| US1549-E6 | A_IMPLEMENTED, A_CORRECT |

## 9. Rejected alternatives
- P failure branches rejected for this draft because dual thrust loss and runway feasibility were recognized.
- O failure branches rejected for this draft because ditching objective was a conservative emergency goal given constraints.
- A failure branches rejected for this draft because checklist/configuration/ditching actions were coherent with the emergency goal.

## 10. Quarantine of external investigation conclusions
Probable cause, contributing factors, findings, and safety recommendations are quarantined and not used as SERA answer keys.

## 11. Source gaps
- Need author review before using as a nominal/no-failure reference.
- Need confirm whether any late airspeed/ditching-parameter limitations should remain as non-dominant action caveat.

## 12. Front-end future display notes
Draft only; not final causation; not risk scoring; not a safety recommendation; not release-ready.

## 13. Review questions for author
- US AIRWAYS 1549: keep P-A/O-A/A-A as internal nominal draft, or retain only as nominal calibration candidate pending review?
