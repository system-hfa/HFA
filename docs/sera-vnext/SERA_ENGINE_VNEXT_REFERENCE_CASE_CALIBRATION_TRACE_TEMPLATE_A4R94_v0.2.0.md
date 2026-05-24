# SERA Engine vNext Reference Case Calibration Trace Template A4R94 v0.2.0

Status: REFERENCE_CASE_TRACE_TEMPLATE  
Phase: A4+R-94  
DOCS_ONLY  
DESIGN_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

Copy and fill this template for each future reference case trace.

---

## 1) Header
- referenceCaseId:
- caseId:
- referenceType: `POSITIVE_REFERENCE_CASE | BOUNDARY_REFERENCE_CASE | ADVERSARIAL_REFERENCE_CASE | WITHDRAWN_REFERENCE_CASE`
- sourceAgency:
- officialSourceUrl:
- aircraft:
- operation:
- status:
- intendedUse:

## 2) Plain-Language Factual Summary
5-10 lines:
- 
- 
- 

## 3) Source and Quarantine
### factual sources used
- 
- 

### conclusions quarantined
- probable cause:
- contributing factors as causal labels:
- safety recommendations as code drivers:

### what was not used
- 
- 

## 4) Safe-Operation Escape Point
- escapePointStatement:
- why this is the escape point:
- evidence supporting escape point:
- uncertainty:

## 4.1) Language Calibration (Mandatory)
- Keep Daumas PT wording and Daumas code set for operational trace fields.
- For each canonical question, provide:
  - `hendyStepRef` (`STEP_2`, `STEP_3`, `STEP_4`, `STEP_5`).
  - `exactQuestionTextPT` (Daumas wording).
  - `exactQuestionTextENAnchor` (matching Hendy wording).
- EN anchor is calibration only and must not change PT branch semantics.
- Application order is mandatory:
  - complete all three Step-2 core questions first;
  - then execute axis ladders.
- Mandatory per-question record schema:
  - `canonicalTreeSource`
  - `nodeId`
  - `exactQuestionTextPT`
  - `exactQuestionTextENAnchor`
  - `answerOptionSelected`
  - `nextNodeId` or `resultingLeafCode`
  - `evidenceRef`
  - `answerRationale`
  - `rejectedAnswerOptions`
- If any canonical question or node is unavailable:
  - mark `REAL_TREE_MISSING` or `CANONICAL_NODE_MISSING`;
  - stop trace construction (no approximation).

## 5) Core Canonical Questions (Step 2)
### `Q-CORE-OBJ`
- hendyStepRef: `STEP_2`
- canonicalTreeSource:
- nodeId:
- exactQuestionTextPT: `O que o operador estava tentando alcançar... Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro?`
- exactQuestionTextENAnchor: `What was the operator or crew member trying to achieve...what was the intent or goal(s) that led to the unsafe act?`
- answerOptionSelected:
- nextNodeId or resultingLeafCode:
- evidenceRef:
- answerRationale:
- rejectedAnswerOptions:

### `Q-CORE-PER`
- hendyStepRef: `STEP_2`
- canonicalTreeSource:
- nodeId:
- exactQuestionTextPT: `O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar?`
- exactQuestionTextENAnchor: `What did the operator or crewmember believe was the state of the world with respect to the goal(s)?`
- answerOptionSelected:
- nextNodeId or resultingLeafCode:
- evidenceRef:
- answerRationale:
- rejectedAnswerOptions:

### `Q-CORE-ACT`
- hendyStepRef: `STEP_2`
- canonicalTreeSource:
- nodeId:
- exactQuestionTextPT: `Como o operador estava tentando atingir o objetivo?`
- exactQuestionTextENAnchor: `How was the operator or crewmember trying to achieve the goal(s)?`
- answerOptionSelected:
- nextNodeId or resultingLeafCode:
- evidenceRef:
- answerRationale:
- rejectedAnswerOptions:

## 6) SERA O-Axis Canonical Flow
### `Q-O-01`
- hendyStepRef: `STEP_4`
- canonicalTreeSource:
- nodeId:
- exactQuestionTextPT: `O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos?`
- exactQuestionTextENAnchor: `Was the GOAL consistent with rules, regulations and SOPs, and was it also consistent with good risk management?`
- answerOptionSelected:
- nextNodeId:
- evidenceRef:
- answerRationale:
- rejectedAnswerOptions:

### `Q-O-02` (if applicable)
- hendyStepRef: `STEP_4`
- canonicalTreeSource:
- nodeId:
- exactQuestionTextPT: `Violação de rotina?`
- exactQuestionTextENAnchor: `Routine violation?`
- answerOptionSelected:
- nextNodeId:
- evidenceRef:
- answerRationale:
- rejectedAnswerOptions:

### `Q-O-03` (if applicable)
- hendyStepRef: `STEP_4`
- canonicalTreeSource:
- nodeId:
- exactQuestionTextPT: `O ato inseguro resultou do exercício de uma meta que, embora consistente com as regras e regulamentos, não era consistente com os procedimentos operacionais estabelecidos ou não gerenciava/limitava o risco?`
- exactQuestionTextENAnchor: `Goal conservative, managed risk, consistent with SOPs?`
- answerOptionSelected:
- nextNodeId:
- evidenceRef:
- answerRationale:
- rejectedAnswerOptions:

### O-axis result
- resultingLeafCode: `O-A | O-B | O-C | O-D | NOT_ASSESSED`

## 7) SERA P-Axis Canonical Flow
### `Q-P-01`
- hendyStepRef: `STEP_3`
- canonicalTreeSource:
- nodeId:
- exactQuestionTextPT: `Avaliação correta ou adequada da situação?`
- exactQuestionTextENAnchor: `Correct or adequate assessment of the situation?`
- answerOptionSelected:
- nextNodeId:
- evidenceRef:
- answerRationale:
- rejectedAnswerOptions:

### `Q-P-02`
- hendyStepRef: `STEP_3`
- canonicalTreeSource:
- nodeId:
- exactQuestionTextPT: `Possuía a capacidade necessária para sentir e perceber a situação?`
- exactQuestionTextENAnchor: `Had the pre-requisite capability to sense and perceive the situation?`
- answerOptionSelected:
- nextNodeId:
- evidenceRef:
- answerRationale:
- rejectedAnswerOptions:

### `Q-P-03` (if applicable)
- hendyStepRef: `STEP_3`
- canonicalTreeSource:
- nodeId:
- exactQuestionTextPT: `A pressão do tempo percebida era excessiva?`
- exactQuestionTextENAnchor: `Time pressure excessive?`
- answerOptionSelected:
- nextNodeId:
- evidenceRef:
- answerRationale:
- rejectedAnswerOptions:

### `Q-P-04` (if applicable)
- hendyStepRef: `STEP_3`
- canonicalTreeSource:
- nodeId:
- exactQuestionTextPT: `A informação era ilusória ou ambígua?`
- exactQuestionTextENAnchor: `Information illusory or ambiguous?`
- answerOptionSelected:
- nextNodeId:
- evidenceRef:
- answerRationale:
- rejectedAnswerOptions:

### `Q-P-05` (if applicable)
- hendyStepRef: `STEP_3`
- canonicalTreeSource:
- nodeId:
- exactQuestionTextPT: `A informação estava disponível e correta?`
- exactQuestionTextENAnchor: `Information available and correct?`
- answerOptionSelected:
- nextNodeId:
- evidenceRef:
- answerRationale:
- rejectedAnswerOptions:

### P-axis result
- resultingLeafCode: `P-A | P-B | P-C | P-D | P-E | P-F | P-G | P-H | NOT_ASSESSED`
- disambiguationNote (mandatory when needed):

## 8) SERA A-Axis Canonical Flow
### `Q-A-01`
- hendyStepRef: `STEP_5`
- canonicalTreeSource:
- nodeId:
- exactQuestionTextPT: `A ação foi implementada como pretendida?`
- exactQuestionTextENAnchor: `Implemented as intended?`
- answerOptionSelected:
- nextNodeId:
- evidenceRef:
- answerRationale:
- rejectedAnswerOptions:

### `Q-A-02` (if applicable)
- hendyStepRef: `STEP_5`
- canonicalTreeSource:
- nodeId:
- exactQuestionTextPT: `A ação foi correta ou adequada?`
- exactQuestionTextENAnchor: `Correct or adequate?`
- answerOptionSelected:
- nextNodeId:
- evidenceRef:
- answerRationale:
- rejectedAnswerOptions:

### `Q-A-03` (if applicable)
- hendyStepRef: `STEP_5`
- canonicalTreeSource:
- nodeId:
- exactQuestionTextPT: `Tinha os pré-requisitos de capacidade necessários para dar uma resposta?`
- exactQuestionTextENAnchor: `Had the pre-requisite capability to make a response?`
- answerOptionSelected:
- nextNodeId:
- evidenceRef:
- answerRationale:
- rejectedAnswerOptions:

### `Q-A-04` (if applicable)
- hendyStepRef: `STEP_5`
- canonicalTreeSource:
- nodeId:
- exactQuestionTextPT: `A pressão do tempo era realmente excessiva?`
- exactQuestionTextENAnchor: `Time pressure excessive?`
- answerOptionSelected:
- nextNodeId:
- evidenceRef:
- answerRationale:
- rejectedAnswerOptions:

### A-axis result
- resultingLeafCode: `A-A | A-B | A-C | A-D | A-E | A-F | A-G | A-H | A-I | A-J | NOT_ASSESSED`
- disambiguationNote (mandatory when needed):

## 9) Preconditions/Contextual Factors (If Applicable)
- supported factors:
- unresolved/not assessed factors:
- evidence boundary:

## 10) Final Classification Boundary
- what is classified:
- what is unresolved:
- what is not claimed:

## 11) Why This Is a Reference Case
- methodological boundary calibrated:
- UI teaching value:
- risk of misuse:

## 12) Author/Reviewer Decision
- decision:
- date:
- rationale:

## 13) Front-End Display Notes
- short title:
- learning objective:
- expandable trace sections:
- warnings/caveats:

---

## Template Usage Notes
- Keep the trace self-contained.
- Preserve quarantine explicitly.
- Do not hide uncertainty.
- Do not treat this trace as external scientific proof by default.
- Do not use generic placeholders (`P1/P2/O1/A1`).
- Do not use minimum-question shortcuts, didactic-equivalent flows, or reconstructed wording.
- Always include exact canonical question text from approved sources.
