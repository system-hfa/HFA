# Canonical Reference Trace Draft — KOREAN-801 — A4R106

## 1. Header
- referenceCaseId: RC-KOREAN-801-CANONICAL-DRAFT-A4R106
- eventId: KOREAN-801
- methodology: SERA
- canonicalAsset: SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md
- status: CANONICAL_TRACE_DRAFT
- releaseStatus: NOT_RELEASED
- frontendStatus: NOT_READY_AUTHOR_REVIEW_REQUIRED

## 2. Factual summary
Official-report factual sequence shows nonprecision-approach constraints with glideslope unusable context, cockpit inconsistency about glideslope state, continued descent/checklist flow, warning/callout chain, and terrain impact before effective escape.

## 3. Source/quarantine
| sourceId | sourceFileOrUrl | factualUse | quarantine |
|---|---|---|---|
| KOREAN-SRC-001 | `docs/sera-vnext/source-corpus/official-reports/a4r106/KOREAN-801-NTSB-AAR0001.pdf` | approach briefing/execution chronology and CVR/FDR/ATC warning chain | probable-cause and recommendation sections are quarantined |
| KOREAN-SRC-002 | `docs/sera-vnext/official-report-source-slices/a4r106/SOURCE-SLICE-KOREAN-801-A4R106.md` | factual extraction map and evidence indexing | no imported final classification |

## 4. Safe-operation escape point
- escapePointStatement: early approach-management point where glideslope-usability inconsistency required strict nonprecision profile protection.
- factualEvidence: source slice evidence KOREAN-SRC-EV-001 and KOREAN-SRC-EV-002.

## 5. Canonical asset preflight
- canonicalTreeSource: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
- requiredNodesAvailable: yes (`P_ROOT`, `P_ASSESSMENT`, `P_CAPABILITY`, `P_TIME_PRESSURE`, `P_INFORMATION_AMBIGUOUS`)
- missingNodes: none
- rebuildAllowed: no

## 6. Canonical SERA path draft
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceRefs | nextNodeId_or_leaf | uncertaintyNote |
|---|---|---|---|---|---|---|
| P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | What did the operator or crewmember believe was the state of the world with respect to the goal(s)? | START | KOREAN-EV-001 | P_ASSESSMENT | none |
| P_ASSESSMENT | Avaliação correta ou adequada da situação? | Correct or adequate assessment of the situation? | NÃO | KOREAN-EV-002, KOREAN-EV-003 | P_CAPABILITY | approach-state assessment coherence was degraded in factual chain |
| P_CAPABILITY | Possuía a capacidade necessária para sentir e perceber a situação? | Had the pre-requisite capability to sense and perceive the situation? | SIM | KOREAN-EV-001, KOREAN-EV-002 | P_TIME_PRESSURE | capability deficit is not strongest factual anchor in this slice |
| P_TIME_PRESSURE | A pressão do tempo percebida era excessiva? | Time pressure excessive? | NÃO | KOREAN-EV-003, KOREAN-EV-004 | P_INFORMATION_AMBIGUOUS | late urgency exists but branch is not primarily time-pressure |
| P_INFORMATION_AMBIGUOUS | A informação era ilusória ou ambígua? | Information illusory or ambiguous? | SIM | KOREAN-EV-002, KOREAN-EV-003, KOREAN-EV-004 | P-F | monitoring-availability alternative remains plausible and flagged for review |

## 7. Axis boundary
- P-axis draft status: DRAFTED_TO_LEAF_P-F
- O-axis draft status: UNRESOLVED
- A-axis draft status: UNRESOLVED
- boundaryNote: no O/A promotion is performed in this phase.

## 8. Evidence table
| evidenceId | reportSection | factualElement | supportsNode | limitation | quarantineNote |
|---|---|---|---|---|---|
| KOREAN-EV-001 | Approach briefing | explicit mention of glideslope-out and MDA constraints | P_ROOT, P_CAPABILITY | briefing intent may differ from later execution | no final-cause import |
| KOREAN-EV-002 | ATC/CVR sequence | ATC stated glideslope unusable while cockpit dialogue remained inconsistent | P_ASSESSMENT, P_CAPABILITY, P_INFORMATION_AMBIGUOUS | transcript has unintelligible fragments | conclusions quarantined |
| KOREAN-EV-003 | Descent/checklist/warning timeline | continued descent with altitude/minimums and sink-rate chain | P_ASSESSMENT, P_TIME_PRESSURE, P_INFORMATION_AMBIGUOUS | checklist workload interaction needs deeper decomposition | recommendation text excluded |
| KOREAN-EV-004 | Late-stage sequence | late missed-approach call inside degraded margin | P_TIME_PRESSURE, P_INFORMATION_AMBIGUOUS | terminal-phase compression can bias branch interpretation | outcome-to-code shortcut avoided |

## 9. Rejected alternatives
- P-G rejected as primary draft path because current factual chain is stronger on ambiguity/inconsistency around approach-state interpretation.
- A-axis closure rejected in this phase because execution-mechanism decomposition remains high-burden.
- O-axis closure rejected in this phase because objective-path evidence is not isolated enough for canonical leaf closure.

## 10. Validation checklist result
- usesCanonicalAsset: yes
- noGenericQuestions: yes
- noSeraCeraTerminology: yes
- noActiveOE: yes
- noDownstream: yes
- validationStatus: PASS_WITH_LIMITATIONS

## 11. Future author review questions
- Should ambiguity handling in this case remain at P-F, or does additional source slicing support migration to P-G?
- Which single escape-point marker is preferred for cross-case consistency: first glideslope inconsistency or first hard altitude-warning gate?

## 12. A4R109 author decision intake status
- authorDecisionStatus: APPROVED_WITH_LIMITATIONS_IN_A4R109
- internalReferenceCandidateStatus: APPROVED_INTERNAL_BOUNDARY_DRAFT_NOT_RELEASED
- internalDraftLeaf: P-F
- boundaryNoteA4R109: P-F vs P-G remains explicit limitation
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
- objectiveEvidenceStrength: WEAK
- actionEvidenceStrength: WEAK
- objectiveRecommendation: O_UNRESOLVED
- actionRecommendation: A_UNRESOLVED
- O_axis_status_after_A4R110: UNRESOLVED
- A_axis_status_after_A4R110: UNRESOLVED
- closurePerformed: no
