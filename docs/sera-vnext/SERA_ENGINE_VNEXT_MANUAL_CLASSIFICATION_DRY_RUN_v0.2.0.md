# SERA Engine vNext Manual Classification Dry-Run v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-43 — Manual Classification Dry-Run

## Purpose
Run a controlled manual-decision simulation using the A4+R-42 structured human input schema, validating acceptance/rejection logic without releasing final classification.

## Relation to A4+R-42
A4+R-42 introduced:
- `HumanDecisionInputSet` and axis-level decision input types;
- deterministic human-input validation;
- guardrail and downstream-output blocking;
- pre-release assurance posture.

A4+R-43 executes an isolated manual dry-run over that schema and confirms release remains blocked.

## Manual Scenarios Covered
`tests/sera-vnext/manual-classification-trial-001.ts` covers:
- Scenario A: valid manual input on Trial 001 ready axes (P/O/A).
- Scenario B: invalid proposal on not-ready axis (Trial 004).
- Scenario C: invalid downstream unlock request (`finalConclusion`, `HFACS`, `Risk/ERC`, `ARMS/ERC`, `CLASSIFIED`).
- Scenario D: invalid axis-specific acknowledgment cases:
  - `A-D` without physical/motor/ergonomic acknowledgment;
  - `O-C/O-D/O-E` without intent/rule-awareness acknowledgment;
  - perception failure code without cue uptake/recognition/timing acknowledgment.

## Proposed vs Selected Code Separation
Manual dry-run decision package stores reviewer candidates in `proposedCode` only.

`selectedCode` remains `UNRESOLVED` for all axes and axis status never becomes `CLASSIFIED`.

## Trial 001 Result
- P/O/A contracts are `READY_FOR_HUMAN_DECISION`.
- Valid manual proposals are accepted as `VALID_FOR_RELEASE_GATE` and `acceptedForNextGate=true`.
- Manual package release status remains `MANUAL_INPUT_VALIDATED_NOT_RELEASED`.
- Release remains blocked until A4+R-44.

## Trial Set 1 / Trial 004 Negative Result
- Trial 004 not-ready axes reject `PROPOSE_CODE` (`INVALID_NOT_READY`).
- No not-ready axis is accepted for next gate.

## Output Locks
Global and axis-level locks remain active:
- `CLASSIFIED`
- `finalConclusion`
- `HFACS`
- `Risk/ERC`
- `ARMS/ERC`

## Confirmations
- no `CLASSIFIED` output;
- no final conclusion output;
- no HFACS output;
- no Risk/ERC output;
- no legacy import;
- no UI/DB/API integration;
- no final release in this phase.

## Next Steps
A4+R-44 — Code Release Gate:
- consume accepted manual decision packages under explicit release authorization;
- keep final release blocked until release-gate criteria pass.
