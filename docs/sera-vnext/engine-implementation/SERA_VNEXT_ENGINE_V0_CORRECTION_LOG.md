# SERA vNext Engine V0 Correction Log

Status: `CORRECTIONS_APPLIED_WITH_VALIDATION_PARTIALS_REMAINING`

Corrections applied:

- Added unified engine contract in `frontend/src/lib/sera-vnext/engine-contract.ts`.
- Added engine version constants in `frontend/src/lib/sera-vnext/ENGINE_VERSION.ts`.
- Added executable canonical tree asset and validator.
- Added candidate-only engine pipeline under `frontend/src/lib/sera-vnext/engine-v0/`.
- Connected Product Alpha candidate-only runtime to `runSeraVNextEngineV0`.
- Updated Product Alpha route logging to use new factual extraction and timeline shape.
- Updated Product Alpha UI to render facts, timeline, escape point, direct actor, P/O/A candidates, preconditions, canonical paths, and human review package.
- Replaced prior engine blocking trials with v0 runner-backed validations.
- Added required engine v0 trial files and validation harness.
- Adjusted deterministic heuristics to avoid unsupported inference from "does not establish" phrasing.
- Kept final outputs locked to null/false.

Known unresolved partials:

- Post-escape exclusion remains partial for some compressed narratives.
- Thebaud boundary matching remains partial in the short human case.
- Some generalization cases need richer authored expected boundaries or stronger non-lexical evidence extraction.
- Some adversarial precondition categories are not detected from compressed text.

Product Beta correction status:

- Not executed.
- Gate remains blocked because validation is not fully green.
