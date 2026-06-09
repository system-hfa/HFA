# SERA vNext Executable Method Contract V02

This contract is normative for the executable vNext causal engine.

## Escape Point

Escape point means the first moment at which the operation stopped remaining safe.

Rules:
- P/O/A are evaluated at that moment.
- Later facts do not support P/O/A.
- Consequence is not cause.
- A precondition is not the escape point.
- A later warning does not automatically move an earlier escape point.
- The escape point statement must be factual, temporal, and free of embedded causal conclusion.

## Direct Actor

The direct actor is the person or crew role who acts or fails to act at the escape point. The engine must not migrate the actor automatically to organization, maintenance, or supervision. PF/PM attribution is used only when evidence supports it. Otherwise the actor remains ambiguous or unresolved.

## P/O/A Traversal

The engine walks the canonical tree. It must not build a code-first path.

Violation leaves O-B/O-C require:
- known rule or procedure;
- explicit awareness of the relevant situation/rule;
- conscious deviation;
- positive evidence.

Absence of awareness blocks O-B/O-C.

A-A is action coherent/adequate at the action axis. A-C requires evidence of a failed action implementation, verification, feedback, slip, or lapse after the actor's own action. A poor outcome alone does not prove A-C.

## Preconditions

Preconditions are evidence-derived context candidates. They are not active failures, not escape points, and not generated from candidate codes.

## Finality

Engine output remains candidate-only:
- no `selectedCode`;
- no `releasedCode`;
- no `finalConclusion`;
- no `classifiedOutput`;
- no downstream allowance.

Human review remains required.
