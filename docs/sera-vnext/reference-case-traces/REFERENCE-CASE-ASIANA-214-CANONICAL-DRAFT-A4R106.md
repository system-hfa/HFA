# Canonical Reference Trace Draft — ASIANA-214 — A4R106

## 1. Header
- referenceCaseId: RC-ASIANA-214-CANONICAL-DRAFT-A4R106
- eventId: ASIANA-214
- methodology: SERA
- canonicalAsset: SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md
- status: CANONICAL_TRACE_DRAFT
- releaseStatus: NOT_RELEASED
- frontendStatus: NOT_READY_AUTHOR_REVIEW_REQUIRED

## 2. Factual summary
Official-report factual sequence indicates a visual approach with known glidepath-service constraints, a mode-state transition where autothrottle was not controlling airspeed, progressive energy/path degradation, delayed recognition of low-speed/low-path state, and late go-around initiation with reduced recoverability.

## 3. Source/quarantine
| sourceId | sourceFileOrUrl | factualUse | quarantine |
|---|---|---|---|
| ASIANA-SRC-001 | `docs/sera-vnext/source-corpus/official-reports/a4r106/ASIANA-214-NTSB-AAR1401.pdf` | CVR/FDR/QAR chronology, approach cues, mode/callout sequence | probable-cause and recommendation sections are quarantined |
| ASIANA-SRC-002 | `docs/sera-vnext/official-report-source-slices/a4r106/SOURCE-SLICE-ASIANA-214-A4R106.md` | factual extraction map and evidence indexing | no imported conclusion beyond factual slice |

## 4. Safe-operation escape point
- escapePointStatement: stabilized-approach gate where PAPI, airspeed trend, and descent-rate cues already supported immediate go-around.
- factualEvidence: source slice evidence ASIANA-SRC-EV-001 and ASIANA-SRC-EV-003.

## 5. Canonical asset preflight
- canonicalTreeSource: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
- requiredNodesAvailable: yes (`P_ROOT`, `P_ASSESSMENT`, `P_CAPABILITY`, `P_TIME_PRESSURE`, `P_INFORMATION_AMBIGUOUS`, `P_INFORMATION_AVAILABLE`)
- missingNodes: none
- rebuildAllowed: no

## 6. Canonical SERA path draft
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceRefs | nextNodeId_or_leaf | uncertaintyNote |
|---|---|---|---|---|---|---|
| P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | What did the operator or crewmember believe was the state of the world with respect to the goal(s)? | START | ASIANA-EV-001 | P_ASSESSMENT | none |
| P_ASSESSMENT | Avaliação correta ou adequada da situação? | Correct or adequate assessment of the situation? | NÃO | ASIANA-EV-002, ASIANA-EV-003 | P_CAPABILITY | assessment failure is strong, but cognitive mechanism detail remains partial |
| P_CAPABILITY | Possuía a capacidade necessária para sentir e perceber a situação? | Had the pre-requisite capability to sense and perceive the situation? | SIM | ASIANA-EV-002, ASIANA-EV-004 | P_TIME_PRESSURE | capability-vs-expectancy boundary remains review item |
| P_TIME_PRESSURE | A pressão do tempo percebida era excessiva? | Time pressure excessive? | NÃO | ASIANA-EV-003, ASIANA-EV-005 | P_INFORMATION_AMBIGUOUS | late-phase urgency exists, but dominant path is not time-pressure branch |
| P_INFORMATION_AMBIGUOUS | A informação era ilusória ou ambígua? | Information illusory or ambiguous? | NÃO | ASIANA-EV-003, ASIANA-EV-005 | P_INFORMATION_AVAILABLE | automation complexity exists; this draft treats cue set as mostly non-ambiguous |
| P_INFORMATION_AVAILABLE | A informação estava disponível e correta? | Information available and correct? | SIM | ASIANA-EV-001, ASIANA-EV-003, ASIANA-EV-005 | P-G | draft closure prioritizes cue-availability + monitoring integration gap |

## 7. Axis boundary
- P-axis draft status: DRAFTED_TO_LEAF_P-G
- O-axis draft status: UNRESOLVED
- A-axis draft status: UNRESOLVED
- boundaryNote: no O/A promotion is performed in this phase.

## 8. Evidence table
| evidenceId | reportSection | factualElement | supportsNode | limitation | quarantineNote |
|---|---|---|---|---|---|
| ASIANA-EV-001 | Executive Summary / Factual sequence | A/T mode context and unstable profile progression | P_ROOT, P_INFORMATION_AVAILABLE | summary text still requires timeline cross-check | causal-language portions quarantined |
| ASIANA-EV-002 | Factual timeline (approach state) | visual approach with A/T HOLD and AFDS mode state | P_ASSESSMENT, P_CAPABILITY | does not alone isolate full cockpit cognition | no direct cause import |
| ASIANA-EV-003 | Factual timeline near 500-1000 ft gates | PAPI/airspeed/descent cues and unstable continuation | P_ASSESSMENT, P_TIME_PRESSURE, P_INFORMATION_AMBIGUOUS | fine-grain callout timing can be expanded | no recommendation import |
| ASIANA-EV-004 | Factual mode-change statements | crew non-detection of mode indications in sequence | P_CAPABILITY | some statements include interview recall uncertainty | analyst interpretation separated |
| ASIANA-EV-005 | Factual low-altitude sequence | late go-around after low-speed/low-path awareness | P_TIME_PRESSURE, P_INFORMATION_AMBIGUOUS, P_INFORMATION_AVAILABLE | late-stage urgency can bias interpretation | outcome-to-code mapping avoided |

## 9. Rejected alternatives
- P-C rejected as primary draft path because this slice is stronger on available-cue non-integration than on proven capability deficit.
- A-axis closure rejected in this phase because the action-mechanism split is still high-burden.
- O-axis closure rejected in this phase because objective-intent evidence is not isolated enough for leaf closure.

## 10. Validation checklist result
- usesCanonicalAsset: yes
- noGenericQuestions: yes
- noSeraCeraTerminology: yes
- noActiveOE: yes
- noDownstream: yes
- validationStatus: PASS_WITH_LIMITATIONS

## 11. Future author review questions
- Which exact factual point should be treated as the canonical stabilized-approach escape gate for this case?
- Is there enough factual support to test an A-axis draft without importing probable-cause language?
