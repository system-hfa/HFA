# REFERENCE CASE - ASIANA-214 - FULL AXIS CANONICAL DRAFT A4R115

status: CANONICAL_TRACE_DRAFT  
phase: A4R115  
eventId: ASIANA-214  
unifiedCandidateId: UC-002  
methodology: SERA  
canonicalTreeSource: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`  
checklist: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`  
reportSource: NTSB AAR-14/01 local TXT/PDF  
validationStatus: REVIEW_REQUIRED  
releaseStatus: NO_RELEASE  
downstreamStatus: NO_DOWNSTREAM  
frontendReadiness: NOT_READY_REVIEW_REQUIRED

## 1. Event factual summary
Asiana 214 was on a visual approach to SFO runway 28L. The crew accepted speed constraints, mismanaged descent, selected FLCH SPD, disconnected the autopilot, moved thrust levers to idle, and autothrottle entered HOLD mode unnoticed. At 500 ft, PAPI, speed, thrust, and descent-rate cues showed an unstabilized approach; low path/low speed became apparent around 200 ft, and go-around was delayed until below 100 ft.

## 2. Escape point definition
Primary escape point: 500 ft stabilization gate. Secondary escape point: approximately 200 ft, when low path/low speed awareness existed and go-around still had to be evaluated.

## 3. Canonical source preflight
- asset file: A4R99 canonical tree asset
- checklist file: A4R99 validation checklist
- node path availability: P, O, and A nodes used below exist in A4R99
- missing nodes: none identified
- carry-over guardrail: prior A4R107/A4R108 governance treated this case as review-required.

## 4. P-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | What did the operator or crewmember believe was the state of the world with respect to the goal(s)? | START | AS214-E1, AS214-E3, AS214-E4 | P_ASSESSMENT | Crew belief concerned automation state, airspeed/path, and landing feasibility. |
| P_ASSESSMENT | Avaliação correta ou adequada da situação? | Correct or adequate assessment of the situation? | NÃO | AS214-E3, AS214-E4, AS214-E5 | P_CAPABILITY | HOLD mode and unstable cues were not recognized/acted on in time. |
| P_CAPABILITY | Possuía a capacidade necessária para sentir e perceber a situação? | Had the pre-requisite capability to sense and perceive the situation? | SIM | AS214-E4, AS214-E5 | P_TIME_PRESSURE | PAPI/airspeed/mode cues were available. |
| P_TIME_PRESSURE | A pressão do tempo percebida era excessiva? | Time pressure excessive? | NÃO | AS214-E1, AS214-E4 | P_INFORMATION_AMBIGUOUS | Workload existed, but excessive time pressure is not the clearest branch. |
| P_INFORMATION_AMBIGUOUS | A informação era ilusória ou ambígua? | Information illusory or ambiguous? | SIM | AS214-E2, AS214-E3 | P-F | Automation/HOLD mode interaction supports ambiguity candidate. |

P-axis provisional outcome: P-F review-required candidate.  
Rejected alternative: P-G remains strong because path/speed/PAPI cues were available and correct.

## 5. O-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| O_ROOT | O que o operador estava tentando alcançar? Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro? | What was the operator or crew member trying to achieve...what was the intent or goal(s) that led to the unsafe act? | START | AS214-E1, AS214-E4, AS214-E6 | O_RULES | Objective was to complete visual approach/landing under ATC speed and path constraints. |
| O_RULES | O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos? | Was the GOAL consistent with rules, regulations and SOPs, and was it also consistent with good risk management? | SIM | AS214-E1 | O_MANAGED_RISK | Initial objective was operationally normal. |
| O_MANAGED_RISK | O ato inseguro resultou do exercício de uma meta que, embora consistente com as Regras e Regulamentos, não era consistente com os procedimentos operacionais estabelecidos ou não gerenciava ou limitava o risco? | GOAL conservative, managed risk, consistent with SOPs? | NÃO | AS214-E4, AS214-E6 | O-D | Continuing after the 500 ft unstable gate supports unmanaged-risk draft. |

O-axis provisional outcome: O-D review-required candidate.  
Rejected alternative: O-A rejected only after the 500 ft continuation evidence; the branch remains review-required.

## 6. A-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| A_ROOT | Como o operador estava tentando atingir o objetivo? | How was the operator trying to achieve the goal(s)? | START | AS214-E2, AS214-E3, AS214-E6 | A_IMPLEMENTED | Actions include FLCH selection, autopilot disconnect, idle thrust, and go-around timing. |
| A_IMPLEMENTED | A ação foi implementada como pretendida? | Implemented as intended? | SIM | AS214-E2, AS214-E3 | A_CORRECT | The mode/thrust changes appear intentional, though effect was not understood. |
| A_CORRECT | A ação foi a correta ou adequada? | Correct or adequate? | NÃO | AS214-E2, AS214-E3, AS214-E6 | A_CAPABILITY | Mode/thrust/go-around sequence was not adequate for path/speed state. |
| A_CAPABILITY | O operador ou a tripulação possuía o pré-requisito de capacidade, conhecimento ou habilidades necessárias para formar e implementar uma ação apropriada para a situação? | Had the pre-requisite capability to make a response? | SIM | AS214-E4, AS214-E6 | A_TIME_PRESSURE | Source supports trained crew and available cues, but automation knowledge boundary remains. |
| A_TIME_PRESSURE | A pressão do tempo era realmente excessiva? | Time pressure excessive? | NÃO_SELECAO | AS214-E2, AS214-E6 | A-F | Draft treats mode/go-around choices as action selection failure. |

A-axis provisional outcome: A-F review-required candidate.  
Rejected alternative: A-E possible if author treats automation mental model as knowledge failure decision.

## 7. Axis outcome summary
| axis | status | provisional outcome |
|---|---|---|
| P | REVIEW_REQUIRED | P-F or P-G boundary |
| O | REVIEW_REQUIRED | O-D |
| A | REVIEW_REQUIRED | A-F or A-E boundary |

No final classification is created.

## 8. Evidence crosswalk
| evidenceId | supports |
|---|---|
| AS214-E3 | P_ASSESSMENT, P_INFORMATION_AMBIGUOUS, A_IMPLEMENTED |
| AS214-E4 | P_CAPABILITY, O_MANAGED_RISK |
| AS214-E6 | O_MANAGED_RISK, A_TIME_PRESSURE |

## 9. Rejected alternatives
- P-G not rejected permanently; held as live alternative.
- A-E not rejected permanently; held for method review.

## 10. Quarantine of external investigation conclusions
Probable cause, contributing factors, findings, and safety recommendations are quarantined and not used as SERA answer keys.

## 11. Source gaps
- Need author review on P-F versus P-G.
- Need action branch review on A-F versus A-E.

## 12. Front-end future display notes
Draft only; not final causation; not risk scoring; not a safety recommendation; not release-ready.

## 13. Review questions for author
- ASIANA-214: is automation/HOLD mode ambiguity sufficient for P-F, or should this remain P-G/REVIEW_REQUIRED?
- ASIANA-214: is the action branch A-F, A-E, or unresolved pending deeper automation source slice?
