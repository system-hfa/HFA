# SERA Engine vNext Canonical Method Question Lock v0.2.0

Status: CANONICAL_METHOD_QUESTION_LOCK_ACTIVE
methodology: SERA
primarySource: HENDY_SERA

## Purpose

Create an immutable lock that prevents non-canonical question substitution during SERA P/O/A work.

## Primary Method Source

- Hendy/SERA is the primary source for canonical methodological questions.
- Daumas operationalization cannot override or replace canonical SERA/Hendy question structure.

## Canonical Question Integrity Rule

- Only canonical SERA/Hendy questions are allowed as methodological drivers.
- Canonical sequence cannot be reordered, replaced, or expanded by invented prompts.

## Taxonomy of Question Artifacts

### Canonical Question

A question explicitly defined in SERA/Hendy method source and used as binding methodological logic.

### Operational Translation

Language adaptation that preserves the exact canonical intent and decision meaning; cannot change logic.

### Adaptation/Heuristic

A non-canonical helper artifact (prompt helper, checklist, memory aid, quality note).

Rules:

- must be tagged ADAPTATION/HEURISTIC;
- cannot replace canonical question;
- cannot be used as classification basis;
- cannot close an axis without canonical support.

### Auxiliary Checklist

Operational control list used for hygiene/consistency only.

Rule:

- checklist cannot substitute canonical methodological question flow.

## Mandatory Rule for Future P/O/A Prompts

Any prompt that executes P/O/A must explicitly cite canonical question use before execution.

Minimum declaration:

- canonical method source in use;
- no non-canonical substitution;
- UNRESOLVED/HOLD allowed when canonical evidence is insufficient.

## Insufficient Evidence Rule

If canonical evidence is insufficient for an axis:

- mark UNRESOLVED or HOLD;
- do not force closure;
- do not infer from probable cause/outcome language.

## Forbidden Substitutions

Forbidden as classification basis:

- invented subquestions;
- probable cause as answer key;
- retrospective consequence-driven inference;
- HFACS/recommendations as direct P/O/A mapping.

## Violation Handling

If a non-canonical question is used as methodological basis:

- METHODOLOGY_VIOLATION
- REWORK_REQUIRED
- block promotion/release/downstream until canonical rework is completed.

## Lock Preservation

- NO_RELEASED_CODE
- NO_DOWNSTREAM
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_ARMS_ERC
- NO_RECOMMENDATIONS
