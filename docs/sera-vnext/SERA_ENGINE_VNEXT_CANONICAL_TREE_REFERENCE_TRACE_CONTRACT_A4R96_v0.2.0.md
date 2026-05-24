# SERA Engine vNext Canonical Tree Reference Trace Contract A4R96 v0.2.0

Status: CANONICAL_TREE_REFERENCE_TRACE_CONTRACT  
Phase: A4+R-96  
DOCS_ONLY  
GOVERNANCE_CORRECTION

## Absolute Rules
1. Reference trace must use real/canonical SERA/CERA questions.
2. Reconstructed, generic, adapted, translated-freely, reordered, summarized, or "equivalent" questions are prohibited.
3. Each trace step must register:
   - `canonicalTreeSource`
   - `nodeId` (if available in source)
   - `hendyStepRef` (`STEP_2`, `STEP_3`, `STEP_4`, `STEP_5`)
   - `exactQuestionTextPT`
   - `exactQuestionTextENAnchor`
   - `answerOptionSelected`
   - `nextNodeId`
   - `evidenceRef`
   - `answerRationale`
   - `rejectedAnswerOptions`
   - `resultingLeafCode` (if leaf)
4. If any exact canonical question is missing:
   - mark `REAL_TREE_MISSING`
   - stop trace construction
   - `BLOCKED_BY_MISSING_CANONICAL_TREE`
   - `DO_NOT_BUILD_REFERENCE_TRACE`
4.1 If a canonical node is required but unresolved/missing:
   - mark `CANONICAL_NODE_MISSING`
   - stop trace construction
   - `BLOCKED_BY_MISSING_CANONICAL_TREE`
   - `DO_NOT_BUILD_REFERENCE_TRACE`
5. Front-end may display reference cases only when all are present:
   - `canonicalTreeSource`
   - exact question text
   - ordered answer path
   - evidence per answer
   - resulting leaf/result
   - author/reviewer decision
6. Every future Codex/ChatGPT prompt for reference-case work must repeat this canonical-tree rule.
7. Application order is mandatory:
   - execute the three Step-2 core questions first (`GOAL`, `PERCEPTION`, `ACTION`);
   - only then execute axis ladders (`STEP_4` objective, `STEP_3` perception, `STEP_5` action).
8. Step statements must remain fact-based and same-level, without pre-judging preconditions or failure labels.

## Canonical Question Set (Locked)
### Core Step-2 questions (before axis ladders)
- `Q-CORE-OBJ`: "O que o operador estava tentando alcançar... Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro?"
- `Q-CORE-OBJ-EN`: "What was the operator or crew member trying to achieve...what was the intent or goal(s) that led to the unsafe act?"
- `Q-CORE-PER`: "O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar?"
- `Q-CORE-PER-EN`: "What did the operator or crewmember believe was the state of the world with respect to the goal(s)?"
- `Q-CORE-ACT`: "Como o operador estava tentando atingir o objetivo?"
- `Q-CORE-ACT-EN`: "How was the operator or crewmember trying to achieve the goal(s)?"

### Objective axis canonical ladder
- `Q-O-01`: "O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos?"
  - EN anchor: "Was the GOAL consistent with rules, regulations and SOPs, and was it also consistent with good risk management?"
  - `SIM` -> `O-A`
  - `NÃO` -> `Q-O-02`
- `Q-O-02`: "Violação de rotina?"
  - `SIM` -> `O-B`
  - `NÃO` -> `O-C`
- `Q-O-03` (non-violation check): "O ato inseguro resultou do exercício de uma meta que, embora consistente com as regras e regulamentos, não era consistente com os procedimentos operacionais estabelecidos ou não gerenciava/limitava o risco?"
  - `SIM` -> `O-D`

### Perception axis canonical ladder
- `Q-P-01`: "Avaliação correta ou adequada da situação?"
  - `SIM` -> `P-A`
  - `NÃO` -> `Q-P-02`
- `Q-P-02`: "Possuía a capacidade necessária para sentir e perceber a situação?"
  - `NÃO` -> (`P-B` or `P-C`, with explicit disambiguation rationale)
  - `SIM` -> `Q-P-03`
- `Q-P-03`: "A pressão do tempo percebida era excessiva?"
  - `SIM` -> (`P-D` or `P-E`, with explicit disambiguation rationale)
  - `NÃO` -> `Q-P-04`
- `Q-P-04`: "A informação era ilusória ou ambígua?"
  - `SIM` -> `P-F`
  - `NÃO` -> `Q-P-05`
- `Q-P-05`: "A informação estava disponível e correta?"
  - `NÃO` -> `P-H`
  - `SIM` -> `P-G`

### Action axis canonical ladder
- `Q-A-01`: "A ação foi implementada como pretendida?"
  - `NÃO` -> (`A-B` or `A-C`, with explicit disambiguation rationale)
  - `SIM` -> `Q-A-02`
- `Q-A-02`: "A ação foi correta ou adequada?"
  - `SIM` -> `A-A`
  - `NÃO` -> `Q-A-03`
- `Q-A-03`: "Tinha os pré-requisitos de capacidade necessários para dar uma resposta?"
  - `NÃO` -> (`A-D` or `A-E`, with explicit disambiguation rationale)
  - `SIM` -> `Q-A-04`
- `Q-A-04`: "A pressão do tempo era realmente excessiva?"
  - `SIM` -> (`A-H` or `A-I` or `A-J`, with explicit disambiguation rationale)
  - `NÃO` -> (`A-F` or `A-G`, with explicit disambiguation rationale)

## Trace Construction Rules
- When one question can branch to more than one leaf family (e.g., `P-B/P-C`, `A-B/A-C`), trace must include the explicit disambiguation criterion and rejected alternatives.
- `nodeId` is mandatory when the canonical source provides one.
- When source has no explicit node ID, use deterministic derived IDs (`Q-O-01`, `Q-P-03`, etc.) and keep `canonicalTreeSource` explicit.
- When a branch ends in a Hendy numbered active-failure point, include that identifier in `resultingLeafCode` notes (e.g., `4.2.1`, `3.4.2`, `5.4.1`) to preserve paragraph-to-point traceability.
- Language calibration is mandatory:
  - `exactQuestionTextPT` must follow Daumas operational wording.
  - `exactQuestionTextENAnchor` must cite the corresponding Hendy wording.
  - Branch meaning must remain identical across EN/PT.

## Hendy-to-Daumas Code Mapping (Locked)
| Axis | Hendy branch labels (EN) | Daumas maintained code set (PT) |
|---|---|---|
| Objective | `4.1 No failure in intent` | `O-A` (Nenhuma falha de intenção) |
| Objective | `4.2.1 Intent failure` (Routine violation) | `O-B` (Falha de intenção - violação rotineira) |
| Objective | `4.2.2 Intent failure` (Exceptional violation) | `O-C` (Falha de intenção - violação excepcional) |
| Objective | `4.3.1 Intent failure` (Non-violation) | `O-D` (Falha de intenção - não violação) |
| Perception | `3.1 No failure in perception` | `P-A` |
| Perception | `3.2.1 Sensory failure` | `P-B` |
| Perception | `3.2.2 Knowledge failure` | `P-C` |
| Perception | `3.4.1 Attentional failure` | `P-D` |
| Perception | `3.4.2 Time management failure` | `P-E` |
| Perception | `3.3.1 Perceptual failure` | `P-F` |
| Perception | `3.3.2 Attentional failure` | `P-G` |
| Perception | `3.3.3 Communication failure` | `P-H` |
| Action | `5.1 No failure in action selection` | `A-A` |
| Action | `5.5.2 Feedback failure` (failure in action execution) | `A-B` |
| Action | `5.5.1 Slips, lapses and mode errors` | `A-C` |
| Action | `5.2.1 Inability to respond` | `A-D` |
| Action | `5.2.2 Knowledge failure - decision` | `A-E` |
| Action | `5.3.1 Action selection failure` | `A-F` |
| Action | `5.3.2 Feedback failure` | `A-G` |
| Action | `5.4.3 Time management failure` | `A-H` |
| Action | `5.4.1 Action selection failure` | `A-I` |
| Action | `5.4.2 Feedback failure` | `A-J` |

## Taxonomy Guardrail
- `O-E = NON_EXISTENT_IN_SERA_PT_V1`.
- Active objective codes remain `O-A`, `O-B`, `O-C`, `O-D`.
- `O-E` may appear only as negative/adversarial guardrail text.
