# Canonical Reference Trace Draft — REAL-EVENT-0016 — A4R104

## 1. Header
- referenceCaseId: RC-REAL-EVENT-0016-CANONICAL-DRAFT-A4R104
- caseId: REAL-EVENT-0016
- sourceExtractionId: A4R72-B2-006
- sourceAdjudicationId: REAL-EVENT-BATCH2-ADJUDICATION-006
- referenceType: CANONICAL_TRACE_DRAFT
- methodology: SERA
- phase: A4+R-104
- canonicalAsset: SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md
- validationChecklist: SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md
- releaseStatus: NO_RELEASE
- downstreamOpened: false
- notFor: final accident conclusion, HFACS, Risk/ERC, recommendations

## 2. Factual summary
Single-pilot IFR Cessna 500 sequence with reported Garmin/autopilot handling difficulty, altitude deviations, TAWS alerts before impact, and no preimpact autopilot hardware failure confirmed in the local factual packet.

## 3. Source / quarantine
| sourceId | sourceFileOrUrl | factualUse | quarantinedContent | notes |
|---|---|---|---|---|
| SRC-001 | `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-006.md` | timeline, actor, alert/context fragments | probable cause or recommendations if present in upstream source | extraction is `NOT_CLASSIFIED` |
| SRC-002 | `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-006.md` | draft evidence linkage and unresolved boundaries | adjudication draft is not release truth | used only as draft support |
| SRC-003 | `docs/sera-vnext/SERA_ENGINE_VNEXT_ALL_EVENTS_SCREENING_MATRIX_A4R103_v0.2.0.md` | shortlist and risk framing for batch selection | no direct answer-key import | screening context only |

## 4. Safe-operation escape point
- escapePointStatement: transition from controlled IFR trajectory to unstable descent/control management under unresolved automation/mode-state handling.
- factualBasis: pilot-reported steering/GPS difficulty, altitude warnings, TAWS sequence, and continued control instability before impact.
- uncertainty: exact autopilot mode-state timeline and exact control-input chain remain partially unresolved.

## 5. Canonical asset preflight
- canonicalTreeSource: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
- coverageMatrix: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TREE_COVERAGE_MATRIX_A4R99_v0.2.0.md`
- checklist: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`
- requiredPath: `P_ROOT -> P_ASSESSMENT -> P_CAPABILITY -> P-C`
- missingNodeStatus: none

## 6. Canonical SERA path draft
| canonicalTreeSource | nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceRefs | nextNodeId_or_leaf |
|---|---|---|---|---|---|---|
| A4R99 asset | P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | What did the operator or crewmember believe was the state of the world with respect to the goal(s)? | START | EV-001 | P_ASSESSMENT |
| A4R99 asset | P_ASSESSMENT | Avaliação correta ou adequada da situação? | Correct or adequate assessment of the situation? | NÃO | EV-002, EV-003 | P_CAPABILITY |
| A4R99 asset | P_CAPABILITY | Possuía a capacidade necessária para sentir e perceber a situação? | Had the pre-requisite capability to sense and perceive the situation? | NÃO_CONHECIMENTO | EV-003, EV-004, EV-005 | P-C |

## 7. Boundaries / unresolved axes
- draftedStrongestAxis: P
- draftedLeaf: P-C (draft only)
- O-axis: UNRESOLVED boundary retained (not drafted in this canonical trace)
- A-axis: UNRESOLVED boundary retained (not drafted in this canonical trace)
- boundaryReason: action mechanism separation is still insufficient for canonical A path closure.

## 8. Evidence table
| evidenceId | factualElement | source | supportsNodeId | supportsAnswerOption | limitation |
|---|---|---|---|---|---|
| EV-001 | IFR single-pilot operation with automation-management demand | `REAL-EVENT-BATCH2-EXTRACTION-006` | P_ROOT | START | contextual anchor only |
| EV-002 | trajectory instability and warning sequence before impact | `REAL-EVENT-BATCH2-EXTRACTION-006` | P_ASSESSMENT | NÃO | does not isolate all mechanism layers |
| EV-003 | reported Garmin/autopilot interpretation difficulty with no confirmed preimpact autopilot hardware failure | `REAL-EVENT-BATCH2-EXTRACTION-006` | P_ASSESSMENT, P_CAPABILITY | NÃO, NÃO_CONHECIMENTO | mode-state chronology still coarse |
| EV-004 | adjudication draft favors cognitive interpretation/mode-awareness boundary and rejects P-G as dominant in that round | `REAL-EVENT-BATCH2-ADJUDICATION-006` | P_CAPABILITY | NÃO_CONHECIMENTO | draft artifact, not release truth |
| EV-005 | A remains unresolved due non-isolated action mechanism | `REAL-EVENT-BATCH2-ADJUDICATION-006` | P_CAPABILITY | NÃO_CONHECIMENTO | unresolved A boundary preserved |

## 9. Rejected alternatives (supported only)
- P-G rejected as dominant draft path in this batch because extracted evidence emphasizes interpretation/mode-awareness mismatch beyond generic monitoring alone.
- A-axis leafs rejected in this draft because action-execution sequence is not mechanistically isolated.
- O-axis leafs not drafted because this batch targets strongest-axis canonical closure only.

## 10. Validation checklist result
- usesCanonicalAsset: yes
- exactQuestionTextPT: yes
- exactQuestionTextENAnchor: yes
- nodeIdPresent: yes
- answerOptionExistsInAsset: yes
- nextNodeOrLeafExistsInAsset: yes
- evidencePerAnswer: yes
- quarantineSectionPresent: yes
- noInventedQuestion: yes
- noGenericPlaceholder: yes
- noOEActiveCode: yes
- validationStatus: PASS_WITH_LIMITATIONS

## 11. Frontend status
NOT_READY_AUTHOR_REVIEW_REQUIRED
