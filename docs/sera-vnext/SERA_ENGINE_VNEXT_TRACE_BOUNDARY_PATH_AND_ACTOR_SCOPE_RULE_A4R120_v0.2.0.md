# SERA Engine vNext Trace Boundary Path and Actor Scope Rule A4R120 v0.2.0

Status: METHOD_RULE
Phase: A4+R-120
methodology: SERA

## Rule 1 - Boundary path consistency
If a boundary alternative points to a SERA leaf, that leaf must be canonically reachable from the previously selected answers in the same path.

Operational requirement:
- do not list unreachable leaves as live boundary alternatives.

Example:
- if `P_TIME_PRESSURE = NÃO`, do not list `P-D` as boundary-live in that same branch.

## Rule 2 - Traced actor declaration
Each trace with relevant multi-actor dynamics must declare:
- `tracedActor: PF | PM | FE | Combined | Per-Actor-Traces`

## Rule 3 - Combined scope justification
If `tracedActor = Combined`, trace must justify why combined scope does not mix incompatible P/O/A reasoning across actors.

Minimum expectation:
- separate PF/PM (or equivalent) evidence contribution notes;
- explain why per-actor split traces are deferred or unnecessary at current phase.

## Rule applicability
This rule applies to:
- all new traces after A4R120;
- any revised traces where boundary alternatives or actor scope are edited.

## Governance controls
- Rule does not authorize release closure.
- Rule does not authorize author approval.
- Rule does not authorize downstream actions.
