# REFERENCE CASE - COLGAN-3407 - FULL AXIS CANONICAL DRAFT A4R115

status: CANONICAL_TRACE_DRAFT  
phase: A4R115  
eventId: COLGAN-3407  
unifiedCandidateId: UC-001  
methodology: SERA  
canonicalTreeSource: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`  
checklist: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`  
reportSource: NTSB AAR-10/01 local TXT/PDF  
validationStatus: PASS_WITH_LIMITATIONS  
releaseStatus: NO_RELEASE  
downstreamStatus: NO_DOWNSTREAM  
frontendReadiness: NOT_READY_REVIEW_REQUIRED

## 1. Event factual summary
Colgan 3407 was on approach to Buffalo. The crew briefed flaps 15 speeds, configured the aircraft, and airspeed decayed. Stick shaker and autopilot disconnect occurred; FDR showed aft control-column movement, power increase, roll excursions, stick pusher activations, and flap retraction.

## 2. Escape point definition
Primary escape point: stick shaker/autopilot disconnect onset. Secondary escape point: earlier airspeed decay below approach/low-speed cues.

## 3. Canonical source preflight
- asset file: A4R99 canonical tree asset
- checklist file: A4R99 validation checklist
- node path availability: P, O, and A nodes used below exist in A4R99
- missing nodes: none identified

## 4. P-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | What did the operator or crewmember believe was the state of the world with respect to the goal(s)? | START | COL3407-E1, COL3407-E2, COL3407-E3 | P_ASSESSMENT | Crew belief concerned approach configuration, airspeed margin, and stall warning state. |
| P_ASSESSMENT | Avaliação correta ou adequada da situação? | Correct or adequate assessment of the situation? | NÃO | COL3407-E2, COL3407-E3, COL3407-E6 | P_CAPABILITY | Low-speed/stall cues were not adequately assessed before and at shaker onset. |
| P_CAPABILITY | Possuía a capacidade necessária para sentir e perceber a situação? | Had the pre-requisite capability to sense and perceive the situation? | SIM | COL3407-E3, COL3407-E6 | P_TIME_PRESSURE | Airspeed cues and shaker were available; no primary sensory incapacity shown. |
| P_TIME_PRESSURE | A pressão do tempo percebida era excessiva? | Time pressure excessive? | NÃO | COL3407-E1, COL3407-E2 | P_INFORMATION_AMBIGUOUS | Time compression existed but is not the clearest branch. |
| P_INFORMATION_AMBIGUOUS | A informação era ilusória ou ambígua? | Information illusory or ambiguous? | NÃO | COL3407-E3, COL3407-E6 | P_INFORMATION_AVAILABLE | Low-speed and stick-shaker cues were direct rather than ambiguous. |
| P_INFORMATION_AVAILABLE | A informação estava disponível e correta? | Information available and correct? | SIM | COL3407-E3, COL3407-E6 | P-G | Strong available-cue branch. |

P-axis provisional outcome: P-G draft candidate.

## 5. O-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| O_ROOT | O que o operador estava tentando alcançar? Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro? | What was the operator or crew member trying to achieve...what was the intent or goal(s) that led to the unsafe act? | START | COL3407-E1, COL3407-E2 | O_RULES | Objective was to complete an ILS approach and landing. |
| O_RULES | O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos? | Was the GOAL consistent with rules, regulations and SOPs, and was it also consistent with good risk management? | SIM | COL3407-E1 | O_MANAGED_RISK | Approach objective itself was operationally normal. |
| O_MANAGED_RISK | O ato inseguro resultou do exercício de uma meta que, embora consistente com as Regras e Regulamentos, não era consistente com os procedimentos operacionais estabelecidos ou não gerenciava ou limitava o risco? | GOAL conservative, managed risk, consistent with SOPs? | SIM | COL3407-E1 | O-A | Current slice does not support an objective/intent failure independent of P/A. |

O-axis provisional outcome: O-A draft candidate.

## 6. A-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| A_ROOT | Como o operador estava tentando atingir o objetivo? | How was the operator trying to achieve the goal(s)? | START | COL3407-E3, COL3407-E4, COL3407-E5 | A_IMPLEMENTED | Actions include response to shaker, control-column movement, power, pusher, and flap handling. |
| A_IMPLEMENTED | A ação foi implementada como pretendida? | Implemented as intended? | SIM | COL3407-E4, COL3407-E5 | A_CORRECT | Aft column and flap selections appear performed, not merely failed execution. |
| A_CORRECT | A ação foi a correta ou adequada? | Correct or adequate? | NÃO | COL3407-E4, COL3407-E5 | A_CAPABILITY | Response was not adequate to shaker/stall state. |
| A_CAPABILITY | O operador ou a tripulação possuía o pré-requisito de capacidade, conhecimento ou habilidades necessárias para formar e implementar uma ação apropriada para a situação? | Had the pre-requisite capability to make a response? | SIM | COL3407-E3, COL3407-E6 | A_TIME_PRESSURE | Training/capability details require review; initial draft keeps capability as present. |
| A_TIME_PRESSURE | A pressão do tempo era realmente excessiva? | Time pressure excessive? | NÃO_SELECAO | COL3407-E4, COL3407-E5 | A-F | Draft branch is action selection failure. |

A-axis provisional outcome: A-F draft candidate.  
Rejected alternative: A-E held if author treats response as knowledge/training-dominant.

## 7. Axis outcome summary
| axis | status | provisional outcome |
|---|---|---|
| P | DRAFT_WITH_LIMITATIONS | P-G |
| O | DRAFT_WITH_LIMITATIONS | O-A |
| A | REVIEW_REQUIRED | A-F or A-E boundary |

No final classification is created.

## 8. Evidence crosswalk
| evidenceId | supports |
|---|---|
| COL3407-E3 | P_INFORMATION_AVAILABLE, A_ROOT |
| COL3407-E4 | A_CORRECT, A_TIME_PRESSURE |
| COL3407-E6 | P_CAPABILITY, P_INFORMATION_AVAILABLE |

## 9. Rejected alternatives
- O-D rejected for now because the objective to conduct the approach is not independently shown as unmanaged objective.
- A-E remains live for author review.

## 10. Quarantine of external investigation conclusions
Probable cause, contributing factors, findings, and safety recommendations are quarantined and not used as SERA answer keys.

## 11. Source gaps
- Need author review for A-F versus A-E.
- Need source-slice refinement if O-axis is challenged beyond nominal/intent path.

## 12. Front-end future display notes
Draft only; not final causation; not risk scoring; not a safety recommendation; not release-ready.

## 13. Review questions for author
- COLGAN-3407: keep O-A nominal intent branch, or mark O unresolved pending deeper objective evidence?
- COLGAN-3407: keep A-F action selection, or treat the response as A-E/REVIEW_REQUIRED?
