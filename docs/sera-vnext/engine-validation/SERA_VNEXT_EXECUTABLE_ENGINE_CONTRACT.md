# SERA vNext Executable Engine Contract

Decision status: SERA_VNEXT_ENGINE_NOT_IMPLEMENTED

## Required Product Beta contract

A Product Beta engine must accept a report/event narrative and produce a traceable, non-contaminated causal output through the protected chain:

1. factual evidence extraction;
2. quarantine of original report analysis, probable causes, recommendations, and third-party labels;
3. SERA candidate hypothesis;
4. safe operation escape point;
5. unsafe act or unsafe condition;
6. direct actor;
7. perception, objective, and action statements;
8. canonical P/O/A decision path using exact canonical tree questions;
9. selected/released code handling only under the authorized human-review gate;
10. preconditions;
11. decision trace, limitations, recommendations, and human review package.

## Current executable contract

Current executable code supports only a partial non-final contract:

| Output area | Current behavior |
| --- | --- |
| Base vNext dry-run | Produces deterministic non-final eligibility/review artifacts. |
| Product Alpha endpoint | Produces candidate-only facts, timeline, escape-window candidate, and reasoning lanes. |
| Canonical tree | Supports supplied-answer traversal, but only as candidate leaf output. |
| P/O/A selected code | Blocked or unresolved in automatic/base outputs. |
| Released code | Only available after external human decision package through a separate gate. |
| Preconditions in base engine | Stubbed and empty. |
| Final conclusion | Not emitted. |
| HFACS/Risk/ERC/ARMS | Not emitted. |
| Persistence | Not emitted and not allowed for Product Beta under this gate. |

## Product Beta authorization rule

Product Beta foundation work may proceed only after this contract can be changed from `SERA_VNEXT_ENGINE_NOT_IMPLEMENTED` to `SERA_VNEXT_ENGINE_VALIDATED_FOR_PRODUCT_BETA` or to an explicitly human-approved limited Beta contract.
