# SERA vNext Engine v0.1 Preconditions

Date: 2026-06-07

## Contract

Preconditions are non-final candidate context. They are distinct from the escape point and from P/O/A leaf decisions.

Each precondition records:

- `description`
- `category`
- factual `evidence`
- `relationship`
- `sourceEvidence`
- `explicitlyNotEscapePoint: true`
- `basedOnCandidateCode: false`
- `nonFinal: true`

## Categories Corrected

The v0.1 extractor identifies factual context for:

- sensory limitation;
- technical context;
- organizational context;
- intent awareness;
- environmental context;
- other existing precondition categories.

## Boundary

Preconditions are generated from factual evidence, not from generated axis uncertainty text and not from candidate leaf codes. This prevents code feedback loops and avoids treating a precondition as the active escape point.
