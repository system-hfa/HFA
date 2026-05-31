# SERA Author Node Intake Adapter A4R190-K0 v0.2.0

## Objective
Apply A4R190-J MEDIUM-01 fix in the A4R187 intake adapter by removing silent fallback of unknown `authorDecision` values.

## A4R190-J MEDIUM-01
Finding: `normalizeDecision()` converted unknown textual values into `PENDING_AUTHOR_DECISION` silently.

## Fix Applied
- Unknown textual values are no longer converted to pending.
- Adapter emits explicit blocking issue:
  - `UNKNOWN_AUTHOR_DECISION_VALUE:<VALUE>`
- Axis remains candidate-only blocked (`AXIS_INPUT_INVALID`), no traversal advance, no leaf emission.

## Decision Handling After K0
1. Missing / null / empty `authorDecision`:
- treated as pending (`AUTHOR_DECISION_PENDING`)
- no unknown-decision blocking issue

2. Unknown textual `authorDecision` (e.g. `ACCEPTED`, `APPROVE`, `YES`, `SIM`, `CLASSIFIED`):
- blocked with `UNKNOWN_AUTHOR_DECISION_VALUE:<VALUE>`
- no node acceptance
- no leaf candidate

3. Valid decisions preserved:
- `ACCEPT_NODE_ANSWER`
- `REJECT_NODE_ANSWER`
- `NEEDS_MORE_EVIDENCE`
- `BRANCH_BLOCKED`
- `AXIS_TRAVERSAL_BLOCKED`
- `PENDING_AUTHOR_DECISION`

## Candidate-Only Locks
- `selectedCodeAllowed=false`
- `releasedCodeAllowed=false`
- `poaClosureAllowed=false`
- `classificationAllowed=false`
- `notFinalClassification=true`
- no active `selectedCode` / `releasedCode` / `CLASSIFIED` / downstream outputs

## Scope Limitation
Still no productive integration in UI/API/legacy pipeline, and no P/O/A closure in this phase.
