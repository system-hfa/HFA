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
reviewBundleStatus: NOT_READY_FOR_AUTHOR_REVIEW_BUNDLE
qaIntakeStatusA4R120: PATCHED_REVIEW_REQUIRED

## 1. Event factual summary
Atlas 3591 experienced unintended go-around mode activation during descent/approach, followed by rapid nose-down control inputs and unrecovered steep descent. CVR/FDR data support a mode-awareness, perception, and multi-actor intervention sequence.

## 2. Escape point definition
Primary escape point: immediate recognition of unexpected mode activation with explicit callout, automation disconnect, and positive transfer/control stabilization before sustained dive inputs.

## 3. Canonical source preflight
- asset file: A4R99 canonical tree asset
- checklist file: A4R99 validation checklist
- node path availability: P, O, and A nodes used below exist in A4R99
- missing nodes: none identified

## 3.1 Traced actor scope
- tracedActor: Combined
- actor-scope rationale: the critical sequence is a tightly coupled PF/PM interaction window (unexpected mode activation, PF control inputs, PM intervention timing) where splitting into two separate traces at this stage would duplicate shared decision-state context and increase double-counting risk.
- boundary note: combined scope is provisional and does not prevent future per-actor retrace if author review requests stricter decomposition.

## 4. P-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | What did the operator or crewmember believe was the state of the world with respect to the goal(s)? | START | AT3591-E1, AT3591-E2 | P_ASSESSMENT | Crew belief diverged from actual mode/state after unexpected automation change. |
| P_ASSESSMENT | Avaliação correta ou adequada da situação? | Correct or adequate assessment of the situation? | NÃO | AT3591-E1, AT3591-E3 | P_CAPABILITY | Mode/state assessment appears degraded in the critical window. |
| P_CAPABILITY | Possuía a capacidade necessária para sentir e perceber a situação? | Had the pre-requisite capability to sense and perceive the situation? | SIM | AT3591-E2 | P_TIME_PRESSURE | Cues were available and crew capability was not absent by evidence. |
| P_TIME_PRESSURE | A pressão do tempo percebida era excessiva? | Time pressure excessive? | NÃO | AT3591-E1, AT3591-E2 | P_INFORMATION_AMBIGUOUS | Time compression existed but does not isolate excess-time-pressure branch as primary. |
| P_INFORMATION_AMBIGUOUS | A informação era ilusória ou ambígua? | Information illusory or ambiguous? | SIM | AT3591-E3 | P-F | Spatial-orientation and unexpected-mode interaction supports ambiguity branch. |

P-axis provisional outcome: P-F draft candidate.
Rejected alternative: P-G remains live boundary because ADI/FMA/instrument cues were available and correct while vestibular/somatogravic conflict remained possible.

A4R120 boundary-path consistency note:
- P-D is not listed as a boundary in this draft because `P_TIME_PRESSURE = NÃO` makes P-D canonically unreachable in the selected path.

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
| A_ROOT | Como o operador estava tentando atingir o objetivo? | How was the operator trying to achieve the goal(s)? | START | AT3591-E6, AT3591-E7, AT3591-E8 | A_IMPLEMENTED | Sequence includes PF manual nose-down inputs and PM intervention attempts after unexpected mode activation. |
| A_IMPLEMENTED | A ação foi implementada como pretendida? | Implemented as intended? | SIM | AT3591-E6 | A_CORRECT | Inputs appear intentionally executed by PF under distorted perceived state. |
| A_CORRECT | A ação foi a correta ou adequada? | Correct or adequate? | NÃO | AT3591-E6, AT3591-E7, AT3591-E8 | A_CAPABILITY | Action choice was not adequate for actual aircraft state and recovery needs. |
| A_CAPABILITY | O operador ou a tripulação possuía o pré-requisito de capacidade, conhecimento ou habilidades necessárias para formar e implementar uma ação apropriada para a situação? | Had the pre-requisite capability to make a response? | SIM | AT3591-E7, AT3591-E8 | A_TIME_PRESSURE | Current evidence does not isolate inability as primary branch closure. |
| A_TIME_PRESSURE | A pressão do tempo era realmente excessiva? | Time pressure excessive? | NÃO_SELECAO | AT3591-E6, AT3591-E8 | A-F | Primary draft branch treats action selection under distorted perception as central. |

A-axis provisional outcome: A-F draft candidate.
Rejected alternatives:
- A-C remains live but fragile; current evidence does not support clean slip/lapse closure.
- A-E remains live if later review treats automation mental-model deficit as dominant knowledge-decision branch.

### 6.1 Actor-separated evidence framing (A-axis)
| actor | evidence focus | notes |
|---|---|---|
| PF | AT3591-E6 | Primary manual nose-down input sequence after unintended mode activation. |
| PM | AT3591-E7 | Delayed/insufficient intervention timing in rapidly evolving upset window. |
| Combined crew | AT3591-E8 | Coordination and control-transfer dynamics affecting recovery feasibility. |

## 7. Axis outcome summary
| axis | status | provisional outcome |
|---|---|---|
| P | REVIEW_REQUIRED | P-F (P-G boundary live) |
| O | REVIEW_REQUIRED | O-A (O-D boundary live) |
| A | PATCHED_REVIEW_REQUIRED | A-F (A-C/A-E boundary live) |

No final classification is created.

## 8. Evidence crosswalk
| evidenceId | supports |
|---|---|
| AT3591-E1 | P_ASSESSMENT |
| AT3591-E4 | O_RULES, O_MANAGED_RISK |
| AT3591-E6 | A_IMPLEMENTED |

## 9. Rejected alternatives
- P-D: removed as boundary due canonical path inaccessibility under `P_TIME_PRESSURE = NÃO`.
- P-G: kept boundary-live.
- O-D: kept boundary-live.
- A-C: kept boundary-live but fragile.
- A-E: kept boundary-live.

## 10. Quarantine of external investigation conclusions
Probable cause, contributing factors, findings, and safety recommendations are quarantined and not used as SERA answer keys.

## 11. Source gaps
- Objective-axis intent boundary needs stricter evidence segregation from post-event performance context.
- A-axis remains review-required after patch and cannot be treated as closure-ready.
- Combined actor scope still requires author-level check on whether per-actor split traces are needed.

## 12. Front-end future display notes
Draft only; not final causation; not risk scoring; not a safety recommendation; not release-ready.

## 13. Review questions for author
- Should O-axis remain O-A or shift to O-D under stricter managed-risk interpretation?
- Is A-F sufficiently supported as primary, or should A-axis remain UNRESOLVED after per-actor decomposition?
