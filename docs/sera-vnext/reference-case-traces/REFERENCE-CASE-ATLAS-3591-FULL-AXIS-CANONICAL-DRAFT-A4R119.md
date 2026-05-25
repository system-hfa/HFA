# REFERENCE CASE - ATLAS-3591 - FULL AXIS CANONICAL DRAFT A4R119

status: CANONICAL_TRACE_DRAFT
phase: A4R119
eventId: ATLAS-3591
unifiedCandidateId: UC-049
methodology: SERA
canonicalTreeSource: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
checklist: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`
reportSource: NTSB AAR-20/02 local TXT/PDF
validationStatus: REVIEW_REQUIRED
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM
frontendReadiness: NOT_READY_REVIEW_REQUIRED
reviewBundleStatus: NOT_EVALUATED_IN_A4R119

## 1. Event factual summary
Atlas 3591 experienced unintended go-around mode activation during descent/approach, followed by rapid nose-down control inputs and unrecovered steep descent. CVR/FDR data support a mode-awareness, perception, and multi-actor intervention sequence.

## 2. Escape point definition
Primary escape point: immediate recognition of unexpected mode activation with explicit callout, automation disconnect, and positive transfer/control stabilization before sustained dive inputs.

## 3. Canonical source preflight
- asset file: A4R99 canonical tree asset
- checklist file: A4R99 validation checklist
- node path availability: P, O, and A nodes used below exist in A4R99
- missing nodes: none identified

## 4. P-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | What did the operator or crewmember believe was the state of the world with respect to the goal(s)? | START | AT3591-E1, AT3591-E2 | P_ASSESSMENT | Crew belief diverged from actual mode/state after unexpected automation change. |
| P_ASSESSMENT | Avaliação correta ou adequada da situação? | Correct or adequate assessment of the situation? | NÃO | AT3591-E1, AT3591-E3 | P_CAPABILITY | Mode/state assessment appears degraded in the critical window. |
| P_CAPABILITY | Possuía a capacidade necessária para sentir e perceber a situação? | Had the pre-requisite capability to sense and perceive the situation? | SIM | AT3591-E2 | P_TIME_PRESSURE | Cues were available and crew capability was not absent by evidence. |
| P_TIME_PRESSURE | A pressão do tempo percebida era excessiva? | Time pressure excessive? | NÃO | AT3591-E1, AT3591-E2 | P_INFORMATION_AMBIGUOUS | Time compression existed but does not isolate excess-time-pressure branch as primary. |
| P_INFORMATION_AMBIGUOUS | A informação era ilusória ou ambígua? | Information illusory or ambiguous? | SIM | AT3591-E3 | P-F | Spatial-orientation and unexpected-mode interaction supports ambiguity branch. |

P-axis provisional outcome: P-F draft candidate.
Rejected alternative: P-D remains live boundary if reviewer judges perceived time pressure as the central mechanism.

## 5. O-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| O_ROOT | O que o operador estava tentando alcançar? Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro? | What was the operator or crew member trying to achieve...what was the intent or goal(s) that led to the unsafe act? | START | AT3591-E4, AT3591-E5 | O_RULES | Observable objective remained approach/go-around handling rather than explicit violation intent. |
| O_RULES | O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos? | Was the GOAL consistent with rules, regulations and SOPs, and was it also consistent with good risk management? | SIM | AT3591-E4 | O_MANAGED_RISK | Draft assumes nominal operational objective at intent level. |
| O_MANAGED_RISK | O ato inseguro resultou do exercício de uma meta que, embora consistente com as Regras e Regulamentos, não era consistente com os procedimentos operacionais estabelecidos ou não gerenciava ou limitava o risco? | GOAL conservative, managed risk, consistent with SOPs? | SIM | AT3591-E4, AT3591-E5 | O-A | Conservative objective branch remains provisional pending deeper objective-evidence refinement. |

O-axis provisional outcome: O-A draft candidate.
Rejected alternative: O-D remains boundary-live if reviewer interprets continuation under degraded state awareness as unmanaged-risk objective drift.

## 6. A-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| A_ROOT | Como o operador estava tentando atingir o objetivo? | How was the operator trying to achieve the goal(s)? | START | AT3591-E6, AT3591-E7, AT3591-E8 | A_IMPLEMENTED | Sequence includes manual control override, captain intervention attempt, and unresolved recovery. |
| A_IMPLEMENTED | A ação foi implementada como pretendida? | Implemented as intended? | NÃO_DESLIZE_LAPSO_ERRO | AT3591-E6, AT3591-E7 | A-C | Control-input pattern supports an implementation-error candidate. |

A-axis provisional outcome: A-C draft candidate.
Rejected alternative: A-F remains live because multi-actor command/transfer dynamics can also be interpreted as action-selection inadequacy under upset management.

## 7. Axis outcome summary
| axis | status | provisional outcome |
|---|---|---|
| P | REVIEW_REQUIRED | P-F (P-D boundary live) |
| O | REVIEW_REQUIRED | O-A (O-D boundary live) |
| A | REVIEW_REQUIRED | A-C (A-F boundary live) |

No final classification is created.

## 8. Evidence crosswalk
| evidenceId | supports |
|---|---|
| AT3591-E1 | P_ASSESSMENT |
| AT3591-E4 | O_RULES, O_MANAGED_RISK |
| AT3591-E6 | A_IMPLEMENTED |

## 9. Rejected alternatives
- P-D: kept boundary-live.
- O-D: kept boundary-live.
- A-F: kept boundary-live.

## 10. Quarantine of external investigation conclusions
Probable cause, contributing factors, findings, and safety recommendations are quarantined and not used as SERA answer keys.

## 11. Source gaps
- Objective-axis intent boundary needs stricter evidence segregation from post-event performance context.
- Multi-actor A-axis needs explicit check against double-counting of the same mode-change fact.

## 12. Front-end future display notes
Draft only; not final causation; not risk scoring; not a safety recommendation; not release-ready.

## 13. Review questions for author
- Should O-axis remain O-A or shift to O-D under stricter managed-risk interpretation?
- Is A-C sufficiently supported, or should A-F dominate for multi-actor upset-management framing?
