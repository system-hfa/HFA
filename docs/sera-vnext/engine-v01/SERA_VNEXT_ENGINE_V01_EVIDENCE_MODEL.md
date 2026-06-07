# SERA vNext Engine v0.1 Evidence Model

Date: 2026-06-07

## Files

- `frontend/src/lib/sera-vnext/evidence/types.ts`
- `frontend/src/lib/sera-vnext/evidence/extract-evidence.ts`
- `frontend/src/lib/sera-vnext/evidence/temporal-scope.ts`
- `frontend/src/lib/sera-vnext/evidence/actor-scope.ts`
- `frontend/src/lib/sera-vnext/evidence/evidence-sufficiency.ts`
- `frontend/src/lib/sera-vnext/evidence/index.ts`

## Evidence Item Fields

Each evidence item records:

- `evidenceId`
- `statement`
- `category`
- `sourceSentenceIndex`
- `temporalRelation`: `PRE_ESCAPE`, `AT_ESCAPE`, `POST_ESCAPE`, or `UNKNOWN`
- `actorRelation`: `DIRECT_ACTOR`, `CONTEXT_ACTOR`, `SYSTEM_ENVIRONMENT`, or `UNKNOWN`
- `actor`
- `evidenceType`: observed fact, reported cue, action/decision, context, outcome, or unsupported report analysis
- `supports`
- `contradicts`
- `prohibitedFor`
- `relationshipToFailure`
- `confidence`
- `rationale`

## Methodological Use

Evidence is not a final conclusion. It is an admissibility and routing layer used to decide whether a canonical node can be answered. Post-escape evidence is retained in output for transparency but is prohibited for escape-point, P, O, and A decisions.

## Non-Use Rules

The evidence model does not:

- promote report conclusions to expected P/O/A values;
- convert HFACS labels into SERA codes;
- use Risk/ERC/ARMS material for causal classification;
- release `selectedCode`, `releasedCode`, or `finalConclusion`.
