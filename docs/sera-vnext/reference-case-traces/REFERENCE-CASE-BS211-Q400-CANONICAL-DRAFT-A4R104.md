# Canonical Reference Trace Draft — BS211-Q400 — A4R104

## 1. Header
- referenceCaseId: RC-BS211-Q400-CANONICAL-DRAFT-A4R104
- caseId: BS211-Q400
- sourceExtractionId: A4R76-B3-013
- sourceAdjudicationId: REAL-EVENT-BATCH3-ADJUDICATION-013
- referenceType: CANONICAL_TRACE_DRAFT
- methodology: SERA
- phase: A4+R-104
- canonicalAsset: SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md
- validationChecklist: SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md
- releaseStatus: NO_RELEASE
- downstreamOpened: false
- notFor: final accident conclusion, HFACS, Risk/ERC, recommendations

## 2. Factual summary
US-Bangla BS211 Q400 sequence with unstable approach continuation, runway-alignment conflict, repeated ATC exchanges/instructions, and reduced recovery margin before accident outcome.

## 3. Source / quarantine
| sourceId | sourceFileOrUrl | factualUse | quarantinedContent | notes |
|---|---|---|---|---|
| SRC-001 | `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-013.md` | timeline and communication/trajectory anchors | probable cause and recommendation language from upstream report family | extraction is `NOT_CLASSIFIED` |
| SRC-002 | `docs/sera-vnext/real-event-adjudications-batch-3/REAL-EVENT-BATCH3-ADJUDICATION-013.md` | draft evidence links for P/O/A diversity | adjudication draft is not release truth | used only as trace-draft support |
| SRC-003 | `docs/sera-vnext/SERA_ENGINE_VNEXT_SOLID_REFERENCE_CANDIDATE_SHORTLIST_A4R103_v0.2.0.md` | shortlist selection rationale | no answer-key import | prioritization context only |

## 4. Safe-operation escape point
- escapePointStatement: point where unstable approach and runway/path alignment conflict required discontinuation or stabilized re-entry, but the sequence remained unstable.
- factualBasis: repeated ATC coordination complexity plus path continuation under unstable profile.
- uncertainty: cockpit-internal CRM micro-sequence and explicit conscious-intent threshold remain partially unresolved.

## 5. Canonical asset preflight
- canonicalTreeSource: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
- coverageMatrix: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TREE_COVERAGE_MATRIX_A4R99_v0.2.0.md`
- checklist: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`
- requiredPath: `P_ROOT -> P_ASSESSMENT -> P_CAPABILITY -> P_TIME_PRESSURE -> P_INFORMATION_AMBIGUOUS -> P_INFORMATION_AVAILABLE -> P-H`
- missingNodeStatus: none

## 6. Canonical SERA path draft
| canonicalTreeSource | nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceRefs | nextNodeId_or_leaf |
|---|---|---|---|---|---|---|
| A4R99 asset | P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | What did the operator or crewmember believe was the state of the world with respect to the goal(s)? | START | EV-001 | P_ASSESSMENT |
| A4R99 asset | P_ASSESSMENT | Avaliação correta ou adequada da situação? | Correct or adequate assessment of the situation? | NÃO | EV-002, EV-003 | P_CAPABILITY |
| A4R99 asset | P_CAPABILITY | Possuía a capacidade necessária para sentir e perceber a situação? | Had the pre-requisite capability to sense and perceive the situation? | SIM | EV-003, EV-004 | P_TIME_PRESSURE |
| A4R99 asset | P_TIME_PRESSURE | A pressão do tempo percebida era excessiva? | Time pressure excessive? | NÃO | EV-004, EV-005 | P_INFORMATION_AMBIGUOUS |
| A4R99 asset | P_INFORMATION_AMBIGUOUS | A informação era ilusória ou ambígua? | Information illusory or ambiguous? | NÃO | EV-005, EV-006 | P_INFORMATION_AVAILABLE |
| A4R99 asset | P_INFORMATION_AVAILABLE | A informação estava disponível e correta? | Information available and correct? | NÃO | EV-006, EV-007 | P-H |

## 7. Boundaries / unresolved axes
- draftedStrongestAxis: P
- draftedLeaf: P-H (draft only)
- O-axis: not drafted in this canonical batch artifact (high-burden O-C threshold retained for later review)
- A-axis: not drafted in this canonical batch artifact (A-F threshold retained for later review)
- boundaryReason: this batch prioritizes one strongest axis with highest direct canonical closure confidence.

## 8. Evidence table
| evidenceId | factualElement | source | supportsNodeId | supportsAnswerOption | limitation |
|---|---|---|---|---|---|
| EV-001 | BS211 approach context with ATC exchanges and unstable approach sequence | `REAL-EVENT-BATCH3-EXTRACTION-013` | P_ROOT | START | context only |
| EV-002 | prolonged unstable approach and path conflict against assigned sequencing | `REAL-EVENT-BATCH3-EXTRACTION-013` | P_ASSESSMENT | NÃO | does not independently close O/A |
| EV-003 | repeated communication/coordination load in ATC interface | `REAL-EVENT-BATCH3-EXTRACTION-013` | P_ASSESSMENT, P_CAPABILITY | NÃO, SIM | CRM micro-sequence incomplete |
| EV-004 | no dominant sensory/knowledge incapacity asserted as primary in current packet | `REAL-EVENT-BATCH3-ADJUDICATION-013` | P_CAPABILITY | SIM | adjudication is draft only |
| EV-005 | time-pressure dominance not isolated as primary branch in the current extract set | `REAL-EVENT-BATCH3-ADJUDICATION-013` | P_TIME_PRESSURE | NÃO | dominance threshold remains medium confidence |
| EV-006 | information-chain degradation/communication inconsistency appears stronger than illusion path | `REAL-EVENT-BATCH3-ADJUDICATION-013` | P_INFORMATION_AMBIGUOUS, P_INFORMATION_AVAILABLE | NÃO, NÃO | relies on communication decomposition quality |
| EV-007 | textual anchor: path flown rather than assigned downwind/orbit sequencing | `REAL-EVENT-BATCH3-EXTRACTION-013` | P_INFORMATION_AVAILABLE | NÃO | final cockpit intent remains partially unresolved |

## 9. Rejected alternatives (supported only)
- P-G rejected as dominant in this draft because communication/information-chain degradation is more specific than generic monitoring non-integration.
- O-C and A-F not drafted in this artifact despite prior triage proposals, because this batch keeps one strongest-axis closure per case and avoids overreach.
- P-F rejected as dominant because the current support is stronger for communication/information-chain degradation than for illusion-dominant signal interpretation.

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
