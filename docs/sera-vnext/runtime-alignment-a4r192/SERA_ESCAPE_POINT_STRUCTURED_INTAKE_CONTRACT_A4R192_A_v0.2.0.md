# SERA A4R192-A — Structured Escape-Point Intake Contract v0.2.0

## Scope
A4R192-A defines a passive structured intake contract for escape-point metadata. This phase does not integrate UI/API/product and does not change productive runtime behavior.

## Contract purpose
Prepare a deterministic input shape for future pre-integration work so that escape-point enforcement metadata can be supplied with explicit structure:

- escape-point agent;
- observable unsafe act/omission;
- operational moment;
- point topology (discrete/progressive/diffuse);
- boundary evidence references;
- axis metadata for P/O/A.

## Runtime artifact

- New passive module: `frontend/src/lib/sera-vnext/escape-point-intake.ts`
- Main types:
  - `SeraVNextEscapePointIntake`
  - `SeraVNextEscapePointIntakeAxisMetadata`
  - `SeraVNextEscapePointIntakeValidationResult`
  - `SeraVNextEscapePointIntakeIssue`
  - `SeraVNextEscapePointIntakeReadinessStatus`
- Main helpers:
  - `buildPassiveEscapePointIntake(...)`
  - `validatePassiveEscapePointIntake(...)`
  - `convertIntakeToCanonicalRuntimeContext(...)`

## Passive-only guarantees

All outputs enforce candidate-only locks:

- `selectedCodeAllowed=false`
- `releasedCodeAllowed=false`
- `classificationAllowed=false`
- `poaClosureAllowed=false`
- `downstreamAllowed=false`
- `finalConclusionAllowed=false`
- `notFinalClassification=true`

No `selectedCode`, `releasedCode`, `CLASSIFIED`, `finalConclusion`, HFACS, Risk/ERC, ARMS/ERC, or recommendations are emitted.

## Validation behavior

The intake validation is passive diagnostic logic:

- requires at least one scope source (`approvedEscapePointScope` or `draftEscapePointScope`);
- flags missing anchor fields (`agentId`, unsafe act/omission statement, operational moment);
- flags missing axis metadata/axis agent references as readiness gaps;
- preserves `O-E` as non-existent/blocked when present in proposedCode;
- flags diffuse topology as split-required readiness status.

No productive runtime blocking path is introduced by A4R192-A.

## RR-003 alignment

This contract directly addresses RR-003 from A4R191-H by introducing the structured intake shape required before any future real integration:

- explicit scope envelope;
- explicit axis-level metadata envelope;
- explicit readiness diagnostics before integration phases.

## Residual references

- RR-001 lexical residual (F-B) remains unchanged and tracked for future semantic strengthening.
- UI/API/product integration remains blocked.

