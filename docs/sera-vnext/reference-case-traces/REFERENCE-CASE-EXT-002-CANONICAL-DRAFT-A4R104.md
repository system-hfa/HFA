# Canonical Reference Trace Draft — EXT-002 — A4R104

## 1. Header
- referenceCaseId: RC-EXT-002-CANONICAL-DRAFT-A4R104
- caseId: EXT-002
- sourceExtractionId: EXT-BATCH1-EXTRACTION-002
- sourceAdjudicationId: EXT-BATCH1-ADJUDICATION-002
- referenceType: CANONICAL_TRACE_DRAFT
- methodology: SERA
- phase: A4+R-104
- canonicalAsset: SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md
- validationChecklist: SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md
- releaseStatus: NO_RELEASE
- downstreamOpened: false
- notFor: final accident conclusion, HFACS, Risk/ERC, recommendations

## 2. Factual summary
AW139 night over-water sequence with repeated EGPWS alerts, instrument-monitoring demand, and impact after degraded warning-response/monitoring chain. External probable-cause material remains quarantined.

## 3. Source / quarantine
| sourceId | sourceFileOrUrl | factualUse | quarantinedContent | notes |
|---|---|---|---|---|
| SRC-001 | `docs/sera-vnext/external-candidates/extractions-batch-1/EXT-BATCH1-EXTRACTION-002.md` | timeline, alert chronology, context | probable cause, contributing factors, recommendations | extraction status `NOT_CLASSIFIED` |
| SRC-002 | `docs/sera-vnext/external-candidates/adjudications-batch-1/EXT-BATCH1-ADJUDICATION-002.md` | draft axis-level boundary reasoning | adjudication draft is not release truth | used only as draft support |
| SRC-003 | `docs/sera-vnext/SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_SOURCE_SLICING_PLAN_A4R91_v0.2.0.md` | gap anchors for O/A unresolved boundaries | no code import from planning notes | used as limitation map |

## 4. Safe-operation escape point
- escapePointStatement: point where repeated warning chronology and instrument-monitoring cues failed to restore a stable safe profile before water impact.
- factualBasis: multiple EGPWS alerts and continued degraded response chain in the extracted timeline.
- uncertainty: detailed CVR/FDR timing decomposition still needed to separate perception vs action mechanism at finer granularity.

## 5. Canonical asset preflight
- canonicalTreeSource: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
- coverageMatrix: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TREE_COVERAGE_MATRIX_A4R99_v0.2.0.md`
- checklist: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`
- requiredPath: `P_ROOT -> P_ASSESSMENT -> P_CAPABILITY -> P_TIME_PRESSURE -> P_INFORMATION_AMBIGUOUS -> P_INFORMATION_AVAILABLE -> P-G`
- missingNodeStatus: none

## 6. Canonical SERA path draft
| canonicalTreeSource | nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceRefs | nextNodeId_or_leaf |
|---|---|---|---|---|---|---|
| A4R99 asset | P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | What did the operator or crewmember believe was the state of the world with respect to the goal(s)? | START | EV-001 | P_ASSESSMENT |
| A4R99 asset | P_ASSESSMENT | Avaliação correta ou adequada da situação? | Correct or adequate assessment of the situation? | NÃO | EV-002, EV-003 | P_CAPABILITY |
| A4R99 asset | P_CAPABILITY | Possuía a capacidade necessária para sentir e perceber a situação? | Had the pre-requisite capability to sense and perceive the situation? | SIM | EV-003, EV-004 | P_TIME_PRESSURE |
| A4R99 asset | P_TIME_PRESSURE | A pressão do tempo percebida era excessiva? | Time pressure excessive? | NÃO | EV-004, EV-005 | P_INFORMATION_AMBIGUOUS |
| A4R99 asset | P_INFORMATION_AMBIGUOUS | A informação era ilusória ou ambígua? | Information illusory or ambiguous? | NÃO | EV-005, EV-006 | P_INFORMATION_AVAILABLE |
| A4R99 asset | P_INFORMATION_AVAILABLE | A informação estava disponível e correta? | Information available and correct? | SIM | EV-001, EV-002, EV-006, EV-007 | P-G |

## 7. Boundaries / unresolved axes
- draftedStrongestAxis: P
- draftedLeaf: P-G (draft only)
- O-axis: UNRESOLVED retained (objective trace not isolated)
- A-axis: UNRESOLVED retained (action mechanism not isolated)
- boundaryReason: warning chronology alone is insufficient for action-axis closure.

## 8. Evidence table
| evidenceId | factualElement | source | supportsNodeId | supportsAnswerOption | limitation |
|---|---|---|---|---|---|
| EV-001 | repeated EGPWS warnings and instrument-monitoring demand in timeline | `EXT-BATCH1-EXTRACTION-002` | P_ROOT, P_INFORMATION_AVAILABLE | START, SIM | warning chronology granularity still improvable |
| EV-002 | degraded warning-response/monitoring chain before impact | `EXT-BATCH1-EXTRACTION-002` | P_ASSESSMENT, P_INFORMATION_AVAILABLE | NÃO, SIM | does not isolate exact control-input mechanism |
| EV-003 | no explicit sensory incapacity anchor as primary mechanism in current packet | `EXT-BATCH1-ADJUDICATION-002` | P_CAPABILITY | SIM | adjudication is draft only |
| EV-004 | time-pressure dominance not established as primary in draft | `EXT-BATCH1-ADJUDICATION-002` | P_TIME_PRESSURE | NÃO | warning load exists but dominance unresolved |
| EV-005 | interpretation-specific and communication-specific branches kept uncertain | `EXT-BATCH1-ADJUDICATION-002` | P_INFORMATION_AMBIGUOUS | NÃO | medium uncertainty remains |
| EV-006 | draft path result supports monitoring non-integration branch | `EXT-BATCH1-ADJUDICATION-002` | P_INFORMATION_AVAILABLE | SIM | must avoid automatic alert-to-code mapping |
| EV-007 | source-slicing plan explicitly flags unresolved A timing/mechanism | `SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_SOURCE_SLICING_PLAN_A4R91_v0.2.0.md` | P_INFORMATION_AVAILABLE | SIM | not direct event narrative evidence |

## 9. Rejected alternatives (supported only)
- A-axis proposals rejected because alert non-response alone is insufficient for canonical A leaf assignment.
- O-axis proposals rejected because objective evidence is not isolated from outcome context.
- P-C rejected in this draft because interpretation/knowledge threshold is not explicitly closed in the current extraction packet.

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
