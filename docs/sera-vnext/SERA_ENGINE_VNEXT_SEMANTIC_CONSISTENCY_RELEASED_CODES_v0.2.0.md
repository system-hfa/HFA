# SERA Engine vNext Semantic Consistency Released Codes v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-45 — Semantic Consistency Guard for Released Codes

## Purpose
Add a post-release semantic guard that validates whether each `releasedCode` from `CodeReleaseGateResult` is semantically coherent with:
- axis;
- evidence references;
- reviewer rationale;
- acknowledgements;
- accepted uncertainties;
- waiver semantics;
- vNext semantic guardrails.

## Relation to A4+R-44
A4+R-44 introduced `releasedCode` as a release-gate-only artifact with `source=HUMAN_REVIEW` and preserved base unresolved status.

A4+R-45 verifies released candidates semantically before any future integration.

## Why This Guard Exists
A released code candidate can still be methodologically weak if:
- evidence is generic or misaligned to code semantics;
- required acknowledgements are missing;
- uncertainty and waiver handling are inconsistent;
- perceptual/objective/action boundaries are violated.

## Semantic Contract
`validateReleasedCodeSemanticConsistency(...)` returns `SemanticConsistencyGateResult` with per-axis `ReleasedCodeSemanticConsistencyResult` statuses:
- `SEMANTICALLY_CONSISTENT`
- `SEMANTIC_REVIEW_REQUIRED`
- `SEMANTICALLY_BLOCKED`

Global status:
- `SEMANTIC_GATE_READY`
- `SEMANTIC_GATE_PARTIAL`
- `SEMANTIC_GATE_BLOCKED`

## Axis Rules
Perception:
- Failure codes cannot rely only on weather/warning degradation.
- Requires cue-uptake / recognition / timing / interpretation semantics for strict failure codes.

Objective:
- `O-C/O-D/O-E` requires intent and rule-awareness semantic support.
- Continuation context alone is insufficient.

Action:
- `A-D` requires explicit physical/motor/ergonomic semantics.
- Aircraft state alone cannot justify human action inability code.

General:
- `releasedCode.source` must remain `HUMAN_REVIEW`.
- Base `selectedCode` remains `UNRESOLVED`.
- Downstream and final conclusion remain locked.

## Scenarios Tested
`tests/sera-vnext/semantic-consistency-released-codes-trial-001.ts`:
- Scenario A: Trial 001 conservative package with complete acknowledgements.
- Scenario B: `A-D` without physical/motor/ergonomic support (blocked).
- Scenario C: `O-D` without intent/rule-awareness (blocked).
- Scenario D: perception failure inferred only from weather/warning (blocked or review-required, never consistent).
- Scenario E: downstream/finalConclusion request propagated from release gate (global block).

## Trial 001 Result
- Valid conservative release package can pass semantic gate as ready/partial depending on residual review signals.
- Base `selectedCode` remains unresolved.

## Blocking Results
- `A-D` without physical/motor/ergonomic evidence semantics -> `SEMANTICALLY_BLOCKED`.
- `O-C/O-D/O-E` without intent/rule-awareness semantics -> `SEMANTICALLY_BLOCKED`.
- Perception failure from weather/warning-only context -> not semantically consistent.

## Output Locks
Semantic guard keeps:
- downstream locked;
- final conclusion locked;
- no HFACS;
- no Risk/ERC;
- no ARMS/ERC.

## Confirmations
- no selectedCode promotion;
- no final conclusion;
- no HFACS;
- no Risk/ERC;
- no ARMS/ERC;
- no UI/API/DB integration;
- no legacy import;
- no automatic classification.

## Next Steps
A4+R-46 — Preconditions from Released Codes:
- derive controlled preconditions from semantically guarded released codes while keeping downstream gates closed.
