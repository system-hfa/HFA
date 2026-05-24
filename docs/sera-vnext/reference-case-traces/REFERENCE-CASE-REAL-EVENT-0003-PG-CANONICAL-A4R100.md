# Canonical Reference Case Trace — REAL-EVENT-0003 — P-G

## 1. Header
- referenceCaseId: RC-REAL-EVENT-0003-PG-CANONICAL-A4R100
- supersedes: REFERENCE-CASE-REAL-EVENT-0003-PG-A4R95
- supersessionReason: A4R95 used noncanonical reconstructed questions
- caseId: REAL-EVENT-0003
- referenceType: POSITIVE_REFERENCE_CASE
- methodology: SERA
- canonicalAsset: SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md
- validationChecklist: SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md
- sourceAgency: TSB Canada
- sourceEvent: A15P0217
- aircraft: Sikorsky S-76C+
- operator: Helijet International Inc.
- currentEffectiveRelease: P-G only
- OAxisRelease: none
- AAxisRelease: none
- downstreamOpened: false
- notFor: final accident conclusion, HFACS, Risk/ERC, recommendations, blame

## 2. Canonical Asset Preflight
- assetFile: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
- coverageMatrixFile: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TREE_COVERAGE_MATRIX_A4R99_v0.2.0.md`
- checklistFile: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`
- axisReadiness:
  - Objective: READY_FOR_CANONICAL_TRACE
  - Perception: READY_FOR_CANONICAL_TRACE
  - Action: READY_FOR_CANONICAL_TRACE
- P-G path availability: available in asset via `P_ROOT -> P_ASSESSMENT -> P_CAPABILITY -> P_TIME_PRESSURE -> P_INFORMATION_AMBIGUOUS -> P_INFORMATION_AVAILABLE -> P-G`
- missingNodeStatus: none
- rebuildAllowed: true

## 3. Plain-language factual summary
### factual summary
During a night VFR medevac approach to Tofino/Long Beach, after autopilot disconnection, the helicopter entered a degraded energy state (low speed, high descent rate, rotor speed decay) and directional control margin degraded. The crew recovered at extremely low height and later completed landing.

### uncertainty
PF/PM micro-timeline and callout decomposition are incomplete in the current local source packet, so a fully separable action-mechanism closure is not supported in this reference trace.

### quarantined external conclusions
External probable-cause/findings/recommendations text is quarantined and not used as SERA answer key.

## 4. Source and quarantine
| sourceId | sourceFileOrUrl | factualUse | quarantinedContent | notes |
|---|---|---|---|---|
| SRC-01 | `docs/real-event-harvest/REAL_EVENT_FACTUAL_HARVEST_BATCH_1_v0.1.4.md` (section REAL-EVENT-0003) | neutral chronology and operational context | probable cause / recommendations | factual harvest only |
| SRC-02 | `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-001.md` | structured event sequence and cue set | any final causal claim | extraction is NOT_CLASSIFIED |
| SRC-03 | `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-001.md` | P-axis reasoning/evidence linkage | full-case classification claim | draft adjudication; no release created |
| SRC-04 | `docs/sera-vnext/release-pilot/P-AXIS-RELEASE-PILOT-REAL-EVENT-0003-PG-A4R85.md` | maintained P-axis pilot boundary and limitations | any extrapolation to O/A release | P-only documentary release |
| SRC-05 | `docs/sera-vnext/SERA_ENGINE_VNEXT_P_AXIS_RELEASE_RETROSPECTIVE_AUTHOR_REVIEW_A4R92_v0.2.0.md` | author decision `MAINTAIN_APPROVAL` for P-G | full accident cause conclusion | retrospective author review record |
| SRC-06 | `https://www.tsb.gc.ca/eng/rapports-reports/aviation/2015/a15p0217/a15p0217.html` (referenced locally) | official event identity/source anchor | causal labels imported as SERA answers | URL taken from local repo docs |

## 5. Safe-operation escape point
- escapePointStatement: The operation crossed the safe-approach boundary after autopilot disconnection when speed/descent/rotor margins degraded into a low-energy state at low height.
- factualBasis: low speed + high descent rate + rotor speed decay + near-CFIT exposure + recovery at extremely low height.
- why this is the relevant transition: it marks the transition from monitorable approach to critical margin collapse before recovery.
- uncertainty: PF/PM cue-integration timing remains incomplete.
- not used as causal conclusion: this is a trace boundary marker, not final accident causation.

## 6. Canonical SERA Perception trace
| axis | nodeId | nodeIdType | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | answerRationale | evidenceRefs | rejectedAnswerOptions | nextNodeId | resultingLeafCode |
|---|---|---|---|---|---|---|---|---|---|---|
| P | P_ROOT | TECHNICAL_STABLE_ID | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | What did the operator or crewmember believe was the state of the world with respect to the goal(s)? | START | Entry node for canonical perception path; event contains a clear perception-demanding approach context. | EV-001, EV-002 | n/a (root entry) | P_ASSESSMENT |  |
| P | P_ASSESSMENT | TECHNICAL_STABLE_ID | Avaliação correta ou adequada da situação? | Correct or adequate assessment of the situation? | NÃO | Degraded low-energy state progressed to near-CFIT exposure before recovery, indicating inadequate assessment/integration in the critical segment. | EV-002, EV-003, EV-004 | SIM | P_CAPABILITY |  |
| P | P_CAPABILITY | TECHNICAL_STABLE_ID | Possuía a capacidade necessária para sentir e perceber a situação? | Had the pre-requisite capability to sense and perceive the situation? | SIM | Available sources indicate relevant cues/instruments existed; dominant support is not sensory incapacity nor knowledge incapacity as primary mechanism. | EV-001, EV-003, EV-005 | NÃO_SENSORIAL, NÃO_CONHECIMENTO | P_TIME_PRESSURE |  |
| P | P_TIME_PRESSURE | TECHNICAL_STABLE_ID | A pressão do tempo percebida era excessiva? | Time pressure excessive? | NÃO | A4R85/A4R92 packet does not establish dominant excessive time pressure for selecting P-D/P-E as the main branch. | EV-004, EV-006 | SIM_ATENCAO, SIM_GERENCIAMENTO | P_INFORMATION_AMBIGUOUS |  |
| P | P_INFORMATION_AMBIGUOUS | TECHNICAL_STABLE_ID | A informação era ilusória ou ambígua? | Information illusory or ambiguous? | NÃO | Current maintained rationale does not identify information illusion/ambiguity as dominant primary branch for this reference path. | EV-003, EV-006 | SIM | P_INFORMATION_AVAILABLE |  |
| P | P_INFORMATION_AVAILABLE | TECHNICAL_STABLE_ID | A informação estava disponível e correta? | Information available and correct? | SIM | Available monitoring-relevant state cues were present, but not monitored/integrated in time, matching the maintained P-G branch. | EV-001, EV-002, EV-004, EV-006, EV-007 | NÃO |  | P-G |

If any canonical node were missing, this section would be blocked with `CANONICAL_NODE_MISSING`. No missing node was found.

## 7. Objective boundary
- OAxisTraceStatus: NOT_BUILT_FOR_REFERENCE
- OAxisRelease: none
- reason: reference case objective in this phase is to validate the maintained P-G path only.
- no O-A/O-B/O-C/O-D release created: true

## 8. Action boundary
- AAxisTraceStatus: NOT_BUILT_FOR_REFERENCE
- AAxisRelease: none
- reason: insufficient separable action path evidence in this reference packet for a canonical A release.
- no A-A/A-B/A-C/A-D/A-E/A-F/A-G/A-H/A-I/A-J release created: true

## 9. Evidence table
| evidenceId | factualElement | source | supportsNodeId | supportsAnswerOption | limitation | quarantineNote |
|---|---|---|---|---|---|---|
| EV-001 | Night VFR medevac visual approach to temporarily lit landing area | `REAL-EVENT-BATCH2-EXTRACTION-001` | P_ROOT | START | contextual, not alone classificatory | no external conclusion import |
| EV-002 | Autopilot disconnected during approach segment | `REAL-EVENT-BATCH2-EXTRACTION-001` | P_ASSESSMENT | NÃO | reason/timing not fully decomposed | not used as blame marker |
| EV-003 | Low speed + high descent rate + rotor decay before recovery | `REAL-EVENT-BATCH2-EXTRACTION-001` + `REAL_EVENT_FACTUAL_HARVEST_BATCH_1` | P_ASSESSMENT, P_CAPABILITY | NÃO, SIM | parameter granularity partial | no probable-cause conversion |
| EV-004 | Recovery at extremely low height (near-CFIT exposure) | `REAL-EVENT-BATCH2-EXTRACTION-001` + `REAL_EVENT_FACTUAL_HARVEST_BATCH_1` | P_ASSESSMENT, P_TIME_PRESSURE, P_INFORMATION_AVAILABLE | NÃO, NÃO, SIM | does not isolate PF/PM action mechanism | not used as final accident cause |
| EV-005 | Adjudication keeps A unresolved and does not isolate action mechanism | `REAL-EVENT-BATCH2-ADJUDICATION-001` | P_CAPABILITY | SIM | adjudication confidence MEDIUM | draft artifact, no release by itself |
| EV-006 | P-axis pilot rationale excludes dominant P-D selection | `P-AXIS-RELEASE-PILOT-REAL-EVENT-0003-PG-A4R85` | P_TIME_PRESSURE, P_INFORMATION_AMBIGUOUS, P_INFORMATION_AVAILABLE | NÃO, NÃO, SIM | pilot-scope artifact | no O/A release authority |
| EV-007 | Retrospective author decision maintains P-G | `SERA_ENGINE_VNEXT_P_AXIS_RELEASE_RETROSPECTIVE_AUTHOR_REVIEW_A4R92_v0.2.0.md` | P_INFORMATION_AVAILABLE | SIM | retrospective review scope | not full-case classification |

## 10. Rejected alternatives
- Why not `UNRESOLVED` for P: A4R92 maintained P-G with sufficient evidence at pilot-document level, and canonical path answers are available and internally consistent.
- Why not `P-C`: available packet does not establish knowledge/mode misunderstanding as dominant perceptual mechanism.
- Why not `P-F`: information-illusion/ambiguity branch was not dominant in the maintained evidence package.
- Why not `P-H`: communication-failure branch was not dominant in the maintained evidence package.
- Why O was not released: this rebuild phase is reference-path validation for maintained P-G only; no O release gate executed.
- Why A was not released: PF/PM/action-feedback separation remains insufficient in current packet.
- no O-E active: `O-E = NON_EXISTENT_IN_SERA_PT_V1` guardrail respected.

## 11. Calibration lesson
This case demonstrates a canonical `P-G` path using exact SERA tree questions and node traversal. It also demonstrates a hard boundary: this reference validates only the maintained perception path. O/A remain closed in this trace. This artifact is not a final accident cause statement and not an HFACS/Risk/ERC/recommendation output.

## 12. Front-end display guidance
- displayCardTitle: REAL-EVENT-0003 — Canonical Perception Path (P-G)
- learningObjective: Show how a maintained P-G reference is justified via exact canonical SERA questions while O/A remain bounded.
- sections:
  - factual summary
  - escape point
  - canonical perception path
  - evidence table
  - boundaries O/A
  - quarantine/caveats
- warning: do not display as final accident cause.

## 13. Validation checklist result
- usesCanonicalAsset: yes
- exactQuestionTextPT: yes
- exactQuestionTextENAnchor: yes
- allAnswerOptionsInAsset: yes
- allNextNodesInAsset: yes
- evidencePerAnswer: yes
- quarantine: yes
- noInventedQuestion: yes
- noGenericQuestions: yes
- noSeraCeraTerminology: yes
- noCeraTerminology: yes
- noActiveOE: yes
- noDownstream: yes
- validationStatus: PASS_WITH_LIMITATIONS

## 14. Limitations
- O and A paths were intentionally not built for release in this reference.
- PF/PM micro-sequence and callout timing remain partially unresolved in local source packet.
- This artifact supersedes A4R95 for canonical reference use but does not alter operational release state.
