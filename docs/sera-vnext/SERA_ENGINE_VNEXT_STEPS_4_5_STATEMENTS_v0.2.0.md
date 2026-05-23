# SERA Engine vNext Steps 4-5 Statements v0.2.0
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-32 — Implement vNext Direct Actor + P/O/A Statements  
Scope: deterministic minimum implementation for direct actor analysis and pre-classification P/O/A statements  
Non-scope: P/O/A code classification, UI integration, API integration, DB writes, HFACS integration, Risk/ERC integration, legacy engine integration

## 1. Purpose
This document records implementation of vNext Step 4 (direct actor) and Step 5 (P/O/A statements), plus dry-run validation for Trial 001 under a no-classification policy.

## 2. Files changed
- `frontend/src/lib/sera-vnext/types.ts`
- `frontend/src/lib/sera-vnext/constants.ts`
- `frontend/src/lib/sera-vnext/engine.ts`
- `frontend/src/lib/sera-vnext/steps/04-direct-actor.ts`
- `frontend/src/lib/sera-vnext/steps/05-poa-statements.ts`
- `frontend/src/lib/sera-vnext/steps/10-causal-assurance.ts`
- `tests/sera-vnext/dry-run-trial-001.ts`

## 3. Step 4 — direct actor implementation
Implemented conservative actor attribution with explicit uncertainty handling:
- supports `specific_actor`, `crew_collective`, `multi_actor`, `unknown`, `system_or_condition_dominant`;
- blocks PF/PM assumptions when neutral input reports PF/PM gaps;
- allows `crew_collective` with low confidence and mandatory human review when only collective crew evidence exists;
- allows `unknown` or `system_or_condition_dominant` when direct human-action attribution is weak.

## 4. Step 5 — P/O/A statements implementation
Implemented neutral evidence-first statements before any code classification:
- `perceptionStatement` emphasizes available cues, degraded references, warning-barrier context and recognition-timing uncertainty;
- `objectiveStatement` captures continuation context without asserting conscious intent framing;
- `actionStatement` captures observable continuation/recovery while separating aircraft state from direct action-quality inference;
- per-axis evidence and uncertainty arrays are filled;
- per-axis statement metadata includes confidence and human-review requirement.

## 5. Anti-contamination rules enforced
- no SERA code tokens in statements;
- no active-failure phrasing in statements;
- no unsupported inability collapse in action statement;
- no unsupported intent/non-compliance assertion in objective statement;
- no HFACS/Risk/ERC emission.

## 6. Causal assurance update
Added checks for:
- direct actor no-overcommit under PF/PM uncertainty;
- presence of all P/O/A statements;
- no codes in statements;
- neutral statement wording;
- action statement avoiding inability collapse;
- objective statement avoiding unsupported intent assertion;
- perception statement preserving warning-barrier + recognition-timing uncertainty;
- P/O/A still `NOT_CLASSIFIED`;
- no HFACS/Risk/ERC/ARMS fields.

Assurance status remains non-pass:
- `PARTIAL_STEPS_1_5_NOT_CLASSIFIED`.

## 7. Trial 001 dry-run result
Dry-run command:
```bash
npx tsx tests/sera-vnext/dry-run-trial-001.ts
```

Observed outcome:
- PASS expected.
- direct actor present without PF/PM overcommit.
- statements present and neutral.
- P/O/A remains `NOT_CLASSIFIED`.
- no downstream HFACS/Risk/ERC fields.

## 8. Confirmations
- no P/O/A code classification introduced;
- no HFACS output;
- no Risk/ERC output;
- no legacy import in vNext modules or dry-run test;
- no UI changes;
- no DB writes;
- human review remains required;
- causal assurance remains not passed.

## 9. Findings
- vNext now produces structured actor attribution and pre-classification statements compatible with uncertainty-first methodology.
- Trial 001 narrative remains represented without semantic collapse into legacy active-failure conclusions.

## 10. Adjustments before P/O/A classification
- refine actor-selection thresholds for condition-dominant events with mixed cues;
- add tighter language guards for potential semantic drift in future statement generation;
- connect uncertainty coverage checks to explicit missing-data items from Step 1.

## 11. Next steps
- A4+R-33: implement controlled P/O/A classification gateway from statements, with deterministic code-semantic assurance and continued downstream suppression policy.
