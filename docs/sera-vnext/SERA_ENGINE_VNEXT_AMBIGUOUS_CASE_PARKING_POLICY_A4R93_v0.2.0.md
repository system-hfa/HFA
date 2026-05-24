# SERA Engine vNext Ambiguous Case Parking Policy A4R93 v0.2.0

Status: BACKLOG_POLICY  
Phase: A4+R-93  
DOCS_ONLY  
GOVERNANCE_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Objective
Define when and how to park ambiguous cases so they remain useful for boundary/adversarial control without blocking solid-case progression.

## When to Park a Case
Park when one or more apply:
- likely output is `UNRESOLVED`;
- source is partial or weak;
- event is condition-dominant;
- P/O/A hypothesis depends on inference rather than direct evidence;
- source-slicing cost is high with low expected methodological gain;
- case is more valuable as adversarial control than release candidate.

## Parking Labels
- `PARKED_BOUNDARY_CASE`
- `PARKED_ADVERSARIAL_CONTROL`
- `PARKED_SOURCE_RECHECK_OPTIONAL`
- `PARKED_NOT_RELEASE_PRIORITY`

## Reopen Conditions
Reopen only if one or more occur:
- new official source becomes available;
- strong new factual evidence is identified;
- specific adversarial test requirement appears;
- a concrete methodological gap requires this case.

## A4+R-92 Examples
### REAL-EVENT-0015
- parking suggestion: `PARKED_BOUNDARY_CASE`, `PARKED_NOT_RELEASE_PRIORITY`
- reason: action-dominant boundary weakened prior perception release support.

### N109W
- parking suggestion: `PARKED_BOUNDARY_CASE`, `PARKED_SOURCE_RECHECK_OPTIONAL`
- reason: degraded meteorology/perception-source boundary requires deeper slices before any re-proposal.

### N11NM
- parking suggestion: `PARKED_BOUNDARY_CASE`, `PARKED_ADVERSARIAL_CONTROL`
- reason: IFR/disorientation vs perception-capability boundary without direct P-C mechanism evidence.

## Governance Notes
- Parking is not case abandonment; it is sequencing discipline.
- Parking does not alter runtime, releases, proposed codes, or unresolved status by itself.
