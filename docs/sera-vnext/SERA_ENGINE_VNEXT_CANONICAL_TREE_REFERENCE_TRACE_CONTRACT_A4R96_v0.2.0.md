# SERA Engine vNext Canonical Tree Reference Trace Contract A4R96 v0.2.0

Status: CANONICAL_TREE_REFERENCE_TRACE_CONTRACT  
Phase: A4+R-96  
DOCS_ONLY  
GOVERNANCE_CORRECTION

## Absolute Rules
1. Reference trace must use real/canonical SERA/CERA questions.
2. Reconstructed, generic, adapted, or "equivalent" questions are prohibited.
3. Each trace step must register:
   - `canonicalTreeSource`
   - `nodeId` (if available in source)
   - `exactQuestionText`
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
5. If canonical tree is incomplete:
   - mark `CANONICAL_TREE_INCOMPLETE`
   - block reference rebuild.
6. Front-end may display reference cases only when all are present:
   - `canonicalTreeSource`
   - exact question text
   - ordered answer path
   - evidence per answer
   - resulting leaf/result
   - author/reviewer decision
7. Every future Codex/ChatGPT prompt for reference-case work must repeat this canonical-tree rule.

## Taxonomy Guardrail
- `O-E = NON_EXISTENT_IN_SERA_PT_V1`.
- Active objective codes remain `O-A`, `O-B`, `O-C`, `O-D`.
- `O-E` may appear only as negative/adversarial guardrail text.
