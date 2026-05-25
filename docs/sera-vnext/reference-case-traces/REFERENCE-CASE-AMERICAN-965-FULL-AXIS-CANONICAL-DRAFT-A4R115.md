# REFERENCE CASE - AMERICAN-965 - FULL AXIS CANONICAL DRAFT A4R115

status: CANONICAL_TRACE_DRAFT  
phase: A4R115  
eventId: AMERICAN-965  
unifiedCandidateId: UC-024  
methodology: SERA  
canonicalTreeSource: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`  
checklist: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`  
reportSource: Cali accident report local TXT/PDF representation  
validationStatus: REVIEW_REQUIRED  
releaseStatus: NO_RELEASE  
downstreamStatus: NO_DOWNSTREAM  
frontendReadiness: NOT_READY_REVIEW_REQUIRED

## 1. Event factual summary
American 965 accepted runway 19/Rozo arrival routing during descent toward Cali. After passing ULQ, the aircraft deviated from the cleared course while descending. CVR captured crew difficulty with Tulua/Rozo/FMS entries, followed by GPWS terrain warnings. The crew added power and raised the nose, but speedbrakes extended during descent were not retracted during the escape maneuver.

## 2. Escape point definition
Primary escape point: navigation/FMS confusion around Tulua/Rozo/direct-to entries before GPWS. Secondary escape point: GPWS warning escape maneuver, where speedbrake retraction was required for best climb performance.

## 3. Canonical source preflight
- asset file: A4R99 canonical tree asset
- checklist file: A4R99 validation checklist
- node path availability: P, O, and A nodes used below exist in A4R99
- missing nodes: none identified

## 4. P-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | What did the operator or crewmember believe was the state of the world with respect to the goal(s)? | START | AA965-E1, AA965-E2, AA965-E3 | P_ASSESSMENT | Crew belief concerned routing/fix identity and position relative to approach path. |
| P_ASSESSMENT | Avaliação correta ou adequada da situação? | Correct or adequate assessment of the situation? | NÃO | AA965-E2, AA965-E3 | P_CAPABILITY | Course deviation and FMS/fix confusion support incorrect situational assessment. |
| P_CAPABILITY | Possuía a capacidade necessária para sentir e perceber a situação? | Had the pre-requisite capability to sense and perceive the situation? | SIM | AA965-E3, AA965-E4 | P_TIME_PRESSURE | Navigation/FMS data and GPWS alert were available. |
| P_TIME_PRESSURE | A pressão do tempo percebida era excessiva? | Time pressure excessive? | NÃO | AA965-E1, AA965-E3 | P_INFORMATION_AMBIGUOUS | High workload existed, but time pressure is not the cleanest branch from this slice. |
| P_INFORMATION_AMBIGUOUS | A informação era ilusória ou ambígua? | Information illusory or ambiguous? | SIM | AA965-E3 | P-F | FMS/fix naming and route interpretation support ambiguity candidate. |

P-axis provisional outcome: P-F review-required candidate.  
Rejected alternative: P-G possible if author treats correct navigation/cue availability as dominant.

## 5. O-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| O_ROOT | O que o operador estava tentando alcançar? Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro? | What was the operator or crew member trying to achieve...what was the intent or goal(s) that led to the unsafe act? | START | AA965-E1, AA965-E3 | O_RULES | Objective was to fly the runway 19/Rozo arrival and complete approach. |
| O_RULES | O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos? | Was the GOAL consistent with rules, regulations and SOPs, and was it also consistent with good risk management? | SIM | AA965-E1 | O_MANAGED_RISK | Initial objective/clearance acceptance appears operationally normal. |
| O_MANAGED_RISK | O ato inseguro resultou do exercício de uma meta que, embora consistente com as Regras e Regulamentos, não era consistente com os procedimentos operacionais estabelecidos ou não gerenciava ou limitava o risco? | GOAL conservative, managed risk, consistent with SOPs? | NÃO | AA965-E2, AA965-E3 | O-D | Continuing descent while unresolved routing/position confusion existed supports unmanaged-risk draft. |

O-axis provisional outcome: O-D review-required candidate.

## 6. A-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| A_ROOT | Como o operador estava tentando atingir o objetivo? | How was the operator trying to achieve the goal(s)? | START | AA965-E3, AA965-E4, AA965-E5 | A_IMPLEMENTED | Actions include direct-to/FMS entries and GPWS escape maneuver. |
| A_IMPLEMENTED | A ação foi implementada como pretendida? | Implemented as intended? | SIM | AA965-E3, AA965-E4 | A_CORRECT | Direct-to and escape actions were implemented, but adequacy is contested. |
| A_CORRECT | A ação foi a correta ou adequada? | Correct or adequate? | NÃO | AA965-E3, AA965-E5 | A_CAPABILITY | FMS routing action and speedbrake state were not adequate for terrain escape. |
| A_CAPABILITY | O operador ou a tripulação possuía o pré-requisito de capacidade, conhecimento ou habilidades necessárias para formar e implementar uma ação apropriada para a situação? | Had the pre-requisite capability to make a response? | SIM | AA965-E4, AA965-E5 | A_TIME_PRESSURE | Crew responded to GPWS with power/nose-up; capability branch needs review. |
| A_TIME_PRESSURE | A pressão do tempo era realmente excessiva? | Time pressure excessive? | SIM_SELECAO | AA965-E4, AA965-E5 | A-I | GPWS escape maneuver occurred under immediate terrain time pressure; action selection branch is review-required. |

A-axis provisional outcome: A-I review-required candidate.  
Rejected alternative: A-C possible if speedbrake non-retraction is treated as implementation lapse rather than time-pressure selection.

## 7. Axis outcome summary
| axis | status | provisional outcome |
|---|---|---|
| P | REVIEW_REQUIRED | P-F or P-G boundary |
| O | REVIEW_REQUIRED | O-D |
| A | REVIEW_REQUIRED | A-I or A-C boundary |

No final classification is created.

## 8. Evidence crosswalk
| evidenceId | supports |
|---|---|
| AA965-E3 | P_INFORMATION_AMBIGUOUS, A_IMPLEMENTED |
| AA965-E4 | A_TIME_PRESSURE |
| AA965-E5 | A_CORRECT, A_TIME_PRESSURE |

## 9. Rejected alternatives
- P-G remains live because correct warnings and navigation data existed.
- A-C remains live for speedbrake non-retraction.

## 10. Quarantine of external investigation conclusions
Probable cause, contributing factors, findings, and safety recommendations are quarantined and not used as SERA answer keys.

## 11. Source gaps
- Need review of FMS/fix ambiguity versus available correct information.
- Need review of A-I versus A-C for GPWS escape action.

## 12. Front-end future display notes
Draft only; not final causation; not risk scoring; not a safety recommendation; not release-ready.

## 13. Review questions for author
- AMERICAN-965: keep P-F due FMS/fix ambiguity, or move to P-G/REVIEW_REQUIRED?
- AMERICAN-965: classify action draft around time-pressure selection (A-I) or implementation lapse (A-C), or leave unresolved?
