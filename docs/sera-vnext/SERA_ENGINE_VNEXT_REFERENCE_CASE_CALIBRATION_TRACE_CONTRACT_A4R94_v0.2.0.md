# SERA Engine vNext Reference Case Calibration Trace Contract A4R94 v0.2.0

Status: REFERENCE_CASE_TRACE_CONTRACT  
Phase: A4+R-94  
DOCS_ONLY  
DESIGN_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## 1. Objective
Define the mandatory methodological contract for future "reference case calibration traces" that explain, in an auditable way, how SERA reasoning reached a classification boundary.

## 2. Definition of Reference Case
A reference case is an internally calibrated, traceable, didactic analysis artifact that contains:
- clear factual summary;
- explicit source trace;
- safe-operation escape point;
- full P/O/A question flow;
- evidence trace by answer;
- rejected alternatives;
- preserved quarantine of external conclusions;
- decision boundary and uncertainty.

## 3. What a Reference Case Does Not Mean
- It is not external scientific validation by itself.
- It is not automatic proof of global methodology correctness.
- It is not a replacement for author review gates.
- It is not permission to bypass uncertainty or unresolved states.

## 4. Reference Types
1. `POSITIVE_REFERENCE_CASE`
2. `BOUNDARY_REFERENCE_CASE`
3. `ADVERSARIAL_REFERENCE_CASE`
4. `WITHDRAWN_REFERENCE_CASE`

## 5. Minimum Criteria
### For POSITIVE_REFERENCE_CASE
- official or strong primary source;
- clear factual summary;
- explicit safe-operation escape point;
- complete P/O/A question path;
- evidence mapped per answer;
- rejected alternatives registered;
- explicit quarantine block;
- low overclassification risk;
- author decision or documented readiness;
- no dependence on probable cause as SERA truth.

### For BOUNDARY/WITHDRAWN/ADVERSARIAL
- why it initially appeared classifiable;
- what methodological risk emerged;
- which question changed the decision boundary;
- why unresolved/withdrawn/adversarial control is safer;
- what calibration lesson it teaches.

## 6. Required Document Structure
Each reference trace document must include:
- header identity and intended use;
- plain-language factual summary;
- source and quarantine section;
- safe-operation escape point section;
- P/O/A trace sections with evidence and rejected alternatives;
- boundary section (classified/unresolved/not claimed);
- reference justification;
- reviewer/author decision block;
- front-end display notes.

## 7. Safe-Operation Escape Point
The trace must state:
- the last plausible point where operation could remain/recover to safe state;
- why this point is the operational boundary;
- evidence supporting this boundary;
- residual uncertainty.

## 8. P/O/A QuestionPath
- P/O/A flow must be explicit and ordered.
- Application order is mandatory:
  - Step 2 three-question block first (`GOAL`, `PERCEPTION`, `ACTION`);
  - then canonical ladders (Objective Step 4, Perception Step 3, Action Step 5).
- No axis result should appear without a corresponding question-answer-evidence chain.
- `UNRESOLVED` is valid when evidence threshold is not met.
- Every step must preserve exact canonical question text from approved SERA/CERA sources.
- Every step must register Hendy step reference (`STEP_2/3/4/5`) for auditability.
- Every step must register at least:
  - `canonicalTreeSource`
  - `nodeId` (or deterministic derived ID when source has no explicit ID)
  - `exactQuestionTextPT`
  - `exactQuestionTextENAnchor`
  - `answerOptionSelected`
  - `nextNodeId` or leaf
  - `evidenceRef`
  - `answerRationale`
  - `rejectedAnswerOptions`
- Generic placeholders (`P1`, `P2`, `O1`, `A1`) cannot be used as methodological question substitutes.
- If exact canonical question/node is missing, trace must stop with `REAL_TREE_MISSING` or `CANONICAL_NODE_MISSING`.
- Language calibration must preserve:
  - Hendy English canonical anchor wording;
  - Daumas Portuguese operational wording;
  - Daumas maintained O/P/A code mapping.

## 9. Evidence Trace Contract
- Every answer requires linked factual evidence.
- Evidence entries must be observable/factual, not causal verdict labels.
- Missing evidence must be explicit, never hidden.

## 10. Rejected Alternatives Contract
For each key branch, record:
- candidate alternative;
- why it was rejected;
- what evidence would be required to reopen it.

## 11. Quarantine Contract
Reference traces must explicitly quarantine:
- probable cause;
- contributing factors as causal labels;
- safety recommendations;
- external blame/legal language;
- external frameworks as direct SERA outcomes.

## 12. Future UI/Product Use
Reference traces are designed as future front-end teaching/audit content with expandable trace sections and warning/caveat display, not as production runtime outputs.

## 13. Prohibitions
- Do not use reference cases as external scientific claim by default.
- Do not use probable cause as coding answer key.
- Do not skip P/O/A question path.
- Do not hide uncertainty.
- Do not treat withdrawn/boundary cases as implementation errors.
- Do not reconstruct or paraphrase canonical tree questions when exact wording is available.
- Do not use "minimum questions", "didactic equivalent", or "didático e fiel" as substitutes for canonical tree traversal.

## Taxonomy Guardrail
- `O-E = NON_EXISTENT_IN_SERA_PT_V1`.
- `O-E` cannot be active objective code in reference traces.
