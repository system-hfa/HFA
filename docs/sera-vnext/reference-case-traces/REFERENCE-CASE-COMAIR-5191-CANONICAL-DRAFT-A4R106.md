# Canonical Reference Trace Draft — COMAIR-5191 — A4R106

## 1. Header
- referenceCaseId: RC-COMAIR-5191-CANONICAL-DRAFT-A4R106
- eventId: COMAIR-5191
- methodology: SERA
- canonicalAsset: SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md
- status: CANONICAL_TRACE_DRAFT
- releaseStatus: NOT_RELEASED
- frontendStatus: NOT_READY_AUTHOR_REVIEW_REQUIRED

## 2. Factual summary
Official-report factual sequence shows runway-22 assignment repeatedly present in briefing/checklist/cue chain, heading references aligned to runway 22, entry onto runway 26, runway-number omission in takeoff exchange, and continued takeoff roll from wrong runway.

## 3. Source/quarantine
| sourceId | sourceFileOrUrl | factualUse | quarantine |
|---|---|---|---|
| COMAIR-SRC-001 | `docs/sera-vnext/source-corpus/official-reports/a4r106/COMAIR-5191-NTSB-AAR0705.pdf` | taxi/lineup/takeoff factual chronology and CVR/FDR anchors | probable-cause and recommendation sections are quarantined |
| COMAIR-SRC-002 | `docs/sera-vnext/official-report-source-slices/a4r106/SOURCE-SLICE-COMAIR-5191-A4R106.md` | source-slice evidence map | no imported final classification |

## 4. Safe-operation escape point
- escapePointStatement: runway-entry verification point where runway identity mismatch could still be trapped before takeoff commitment.
- factualEvidence: source slice evidence COMAIR-SRC-EV-002 and COMAIR-SRC-EV-003.

## 5. Canonical asset preflight
- canonicalTreeSource: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
- requiredNodesAvailable: yes (`P_ROOT`, `P_ASSESSMENT`, `P_CAPABILITY`, `P_TIME_PRESSURE`, `P_INFORMATION_AMBIGUOUS`, `P_INFORMATION_AVAILABLE`)
- missingNodes: none
- rebuildAllowed: no

## 6. Canonical SERA path draft
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceRefs | nextNodeId_or_leaf | uncertaintyNote |
|---|---|---|---|---|---|---|
| P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | What did the operator or crewmember believe was the state of the world with respect to the goal(s)? | START | COMAIR-EV-001 | P_ASSESSMENT | none |
| P_ASSESSMENT | Avaliação correta ou adequada da situação? | Correct or adequate assessment of the situation? | NÃO | COMAIR-EV-002, COMAIR-EV-003 | P_CAPABILITY | mismatch between assigned and used runway is explicit in factual timeline |
| P_CAPABILITY | Possuía a capacidade necessária para sentir e perceber a situação? | Had the pre-requisite capability to sense and perceive the situation? | SIM | COMAIR-EV-001, COMAIR-EV-004 | P_TIME_PRESSURE | capability deficit is not strongest factual anchor |
| P_TIME_PRESSURE | A pressão do tempo percebida era excessiva? | Time pressure excessive? | NÃO | COMAIR-EV-003, COMAIR-EV-004 | P_INFORMATION_AMBIGUOUS | operational pace existed but excessive-pressure branch is not dominant |
| P_INFORMATION_AMBIGUOUS | A informação era ilusória ou ambígua? | Information illusory or ambiguous? | NÃO | COMAIR-EV-001, COMAIR-EV-002 | P_INFORMATION_AVAILABLE | cues were largely explicit and repeated |
| P_INFORMATION_AVAILABLE | A informação estava disponível e correta? | Information available and correct? | SIM | COMAIR-EV-001, COMAIR-EV-002, COMAIR-EV-003 | P-G | draft closure emphasizes missed integration of available cues |

## 7. Axis boundary
- P-axis draft status: DRAFTED_TO_LEAF_P-G
- O-axis draft status: UNRESOLVED
- A-axis draft status: UNRESOLVED
- boundaryNote: this phase does not perform O/A release closure.

## 8. Evidence table
| evidenceId | reportSection | factualElement | supportsNode | limitation | quarantineNote |
|---|---|---|---|---|---|
| COMAIR-EV-001 | Factual Information (briefing/checklist) | repeated runway-22 references and heading alignment | P_ROOT, P_CAPABILITY, P_INFORMATION_AMBIGUOUS, P_INFORMATION_AVAILABLE | checklist quality alone does not prove continuous verification | no direct causal import |
| COMAIR-EV-002 | Taxi/clearance timeline | taxi clearance to runway 22 and hold-short/runway geometry sequence | P_ASSESSMENT, P_INFORMATION_AMBIGUOUS, P_INFORMATION_AVAILABLE | airport-construction context may add complexity | conclusions quarantined |
| COMAIR-EV-003 | Takeoff exchange and runway entry | runway-number omission and runway-26 lineup/takeoff continuation | P_ASSESSMENT, P_TIME_PRESSURE, P_INFORMATION_AVAILABLE | radio phrasing and cockpit cross-check granularity can be expanded | no outcome-to-code shortcut |
| COMAIR-EV-004 | CVR/FDR timing detail | nonpertinent conversation and callout timing context | P_CAPABILITY, P_TIME_PRESSURE | contextual, not deterministic by itself | recommendation text excluded |

## 9. Rejected alternatives
- P-H rejected as primary draft path because this slice currently supports available-and-correct cue chain more strongly than unavailable/incorrect information chain.
- A-axis closure rejected in this phase because action-subtype separation needs tighter cockpit-sequence decomposition.
- O-axis closure rejected in this phase because objective boundary remains secondary to perception path certainty.

## 10. Validation checklist result
- usesCanonicalAsset: yes
- noGenericQuestions: yes
- noSeraCeraTerminology: yes
- noActiveOE: yes
- noDownstream: yes
- validationStatus: PASS_WITH_LIMITATIONS

## 11. Future author review questions
- Should runway-verification escape point be fixed at hold-short crossing or lineup checklist completion for canonical trace consistency?
- Is the present evidence sufficient to test an A-axis draft without overclassification risk?

## 12. A4R109 author decision intake status
- authorDecisionStatus: APPROVED_WITH_LIMITATIONS_IN_A4R109
- internalReferenceCandidateStatus: APPROVED_INTERNAL_DRAFT_NOT_RELEASED
- internalDraftLeaf: P-G
- releaseStatus: NOT_RELEASED
- downstreamStatus: NOT_OPENED
- frontendPromotionStatus: NOT_READY_FOR_PROMOTION
- O_axis_status: UNRESOLVED
- A_axis_status: UNRESOLVED

## 13. A4R110 objective/action feasibility status
- phaseReference: `A4+R-110`
- scope: `O_A_FEASIBILITY_ONLY`
- objectiveCanonicalPathPossible: partial
- actionCanonicalPathPossible: partial
- objectiveEvidenceStrength: MEDIUM
- actionEvidenceStrength: MEDIUM
- objectiveRecommendation: O_SOURCE_SLICE_REQUIRED
- actionRecommendation: A_SOURCE_SLICE_REQUIRED
- O_axis_status_after_A4R110: UNRESOLVED
- A_axis_status_after_A4R110: UNRESOLVED
- closurePerformed: no
