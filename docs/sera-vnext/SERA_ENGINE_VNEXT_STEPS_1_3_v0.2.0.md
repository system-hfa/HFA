# SERA Engine vNext Steps 1-3 v0.2.0
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-30 — Implement vNext Steps 1-3  
Scope: deterministic minimum implementation of factual extraction, operational unsafe state, and unsafe act/unsafe condition separation in isolated vNext core  
Non-scope: P/O/A classification, UI integration, API integration, database writes, legacy engine changes, HFACS integration, Risk/ERC integration

## 1. Purpose
This document records the A4+R-30 implementation for SERA Engine vNext steps 1-3.
The goal is to move from pure skeleton to a minimal methodology-first deterministic core while preserving strict isolation.

## 2. Files changed
- `frontend/src/lib/sera-vnext/types.ts`
- `frontend/src/lib/sera-vnext/constants.ts`
- `frontend/src/lib/sera-vnext/engine.ts`
- `frontend/src/lib/sera-vnext/steps/01-factual-extraction.ts`
- `frontend/src/lib/sera-vnext/steps/02-unsafe-state.ts`
- `frontend/src/lib/sera-vnext/steps/03-unsafe-act-condition.ts`
- `frontend/src/lib/sera-vnext/steps/10-causal-assurance.ts`

## 3. Step 1 implementation (factual extraction)
Implemented deterministic conservative extraction for:
- aircraft/system mentions;
- operation type and phase;
- location;
- environmental conditions;
- event sequence markers;
- available cues and available barriers;
- missing data markers;
- actor mentions.

Design constraints preserved:
- no probable-cause inference;
- no P/O/A inference in Step 1;
- no HFACS language;
- no Risk/ERC language;
- no blame wording generation.

## 4. Step 2 implementation (operational unsafe state)
Implemented explicit separation between:
- `decisionAntecedents`;
- `operationalUnsafeState`;
- `finalOutcome`.

The implementation avoids treating a single decision statement as the escape point itself and prioritizes operational state loss wording.

## 5. Step 3 implementation (unsafe act vs unsafe condition)
Implemented split output with structured assessments for both axes:
- statement;
- evidence;
- confidence;
- uncertainty;
- human review required.

Implemented `dominance` calculation:
- `unsafe_act_dominant`;
- `unsafe_condition_dominant`;
- `mixed`;
- `insufficient_evidence`.

The implementation allows unsafe-condition-dominant cases without forcing active-failure dominance.

## 6. Minimal assurance update
Step 10 now includes minimum checks for A4+R-30:
- vNext not fully validated yet;
- no HFACS/Risk/ERC fields in causal payload;
- operational unsafe state present;
- decision antecedents separated;
- missing data/uncertainty preserved when present;
- unsafe condition not collapsed into A-D narrative.

Assurance status remains non-pass:
- `PARTIAL_STEPS_1_3_NOT_CLASSIFIED`.

## 7. Exclusions preserved
Confirmed preserved exclusions:
- no legacy engine import;
- no `frontend/src/lib/sera/*` edits;
- no API route edits;
- no UI edits;
- no DB/Supabase writes;
- no fixtures/baseline changes;
- no migrations;
- no HFACS or Risk/ERC output in vNext result contract.

## 8. Validations executed
- `cd frontend && npx tsc --noEmit`
- `git status --short`
- `git diff --stat`
- `git diff --name-status`
- grep checks for forbidden imports/outputs in `frontend/src/lib/sera-vnext`

## 9. Trial status
Trial 001 is still not promoted and not baseline-ready in vNext.
A4+R-30 introduces implementation foundations only.

## 10. Next steps
- A4+R-31: controlled dry run for Trial 001 against vNext Steps 1-3 behavior.
- Keep P/O/A as not classified until dedicated phase.
- Expand deterministic contracts before introducing any LLM-assisted drafting.
