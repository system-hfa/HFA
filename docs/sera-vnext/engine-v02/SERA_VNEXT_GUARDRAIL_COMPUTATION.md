# SERA vNext Guardrail Computation

V01 guardrails were static false. V02 computes guardrails from runtime evidence and traversal traces.

Computed guardrails:
- `consequenceUsedAsCause`
- `postEscapeHuntingDetected`
- `postEscapeEvidenceUsed`
- `actorMigrationDetected`
- `oeUsed`
- `inventedQuestionDetected`
- `preconditionUsedAsEscapePoint`
- `codeFirstPathDetected`
- `awarenessMissingForViolation`

Each guardrail returns:
- `violated`: boolean;
- `evidence`: supporting strings in `guardrailEvidence`.

Important interpretation: a true guardrail is a detection, not a final classification. It must be surfaced to human review and validation reports.
