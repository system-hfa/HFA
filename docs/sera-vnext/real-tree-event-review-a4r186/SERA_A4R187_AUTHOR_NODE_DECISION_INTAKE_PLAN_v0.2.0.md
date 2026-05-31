# SERA A4R187 Author Node Decision Intake Plan v0.2.0

## Intake purpose
A4R187 receives author decisions per canonical node from A4R186 drafts.

## Allowed author decisions
- ACCEPT_NODE_ANSWER
- REJECT_NODE_ANSWER
- NEEDS_MORE_EVIDENCE
- BRANCH_BLOCKED
- AXIS_TRAVERSAL_BLOCKED

## Not allowed in A4R187
- approving closed P/O/A outputs;
- creating released-code outputs;
- promoting hypothesis to fixture;
- using A4R184 prompts as decision source;
- answering by intuition without evidence anchor.

## Mandatory checklist per node
- nodeId
- exactQuestionTextPt
- eventEvidenceAnchor
- proposedAnswerStatus
- authorDecision
- authorRationale
- nextAction
