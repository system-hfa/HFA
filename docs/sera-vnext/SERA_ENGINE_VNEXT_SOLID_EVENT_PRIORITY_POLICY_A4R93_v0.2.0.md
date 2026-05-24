# SERA Engine vNext Solid Event Priority Policy A4R93 v0.2.0

Status: METHOD_POLICY  
Phase: A4+R-93  
DOCS_ONLY  
GOVERNANCE_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Objective
Prioritize solid events for adjudication/release evolution and park ambiguous events as boundary/adversarial/unresolved controls to avoid low-yield phase consumption.

## Solid Event Candidate Rule
An event is `SOLID_EVENT_CANDIDATE` when it satisfies at least 4 of 6:
1. clear factual timeline;
2. clear actor/PF/PM or operational role;
3. CVR/FDR/alerts/callouts/parameters available;
4. observable action or specific operational decision;
5. official final source or full report body;
6. low dependence on probable-cause language as coding truth.

## Ambiguous Case Classification Labels
Use one or more of:
- `BOUNDARY_CASE`
- `ADVERSARIAL_CONTROL`
- `HOLD_UNRESOLVED`
- `SOURCE_SLICING_OPTIONAL`
- `NOT_RELEASE_PRIORITY`

## Operational Policy
- Ambiguous cases are methodologically useful as overclassification controls.
- Ambiguous cases should not consume long phase sequences when solid events are abundant.
- Do not force adjudication only to reduce unresolved counts.
- Do not convert condition-dominant context into human-failure code without mechanism evidence.

## Decision Priority
1. Solid events with self-contained author dossier readiness.
2. Solid events requiring small targeted source slices.
3. Ambiguous/boundary/adversarial backlog controls.

## Governance Locks
- This policy does not create release.
- This policy does not create proposedCode.
- This policy does not open downstream.

## Taxonomy Guardrail
- `O-E = NON_EXISTENT_IN_SERA_PT_V1`.
- `O-E` may appear only as negative/adversarial guardrail, not as active code.
