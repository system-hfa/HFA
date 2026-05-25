# Synthetic Event Template A4R147

Status: TEMPLATE_ONLY
Phase: A4R147
methodology: SERA
sourceStatus: SYNTHETIC
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM
P/O/A status: NOT_CLASSIFIED

## syntheticId
`SYN-XXXX`

## title
`Short synthetic case title`

## syntheticType
`TYPE-01_DISCRETE_HF_POSITIVE | TYPE-02_PROGRESSIVE_HF_POSITIVE | TYPE-03_TECHNICAL_NEGATIVE_CONTROL | TYPE-04_ENVIRONMENTAL_NEGATIVE_CONTROL | TYPE-05_MIXED_TECH_HUMAN_BOUNDARY | TYPE-06_SOURCE_INSUFFICIENT | TYPE-07_WARNING_TRAP | TYPE-08_OUTCOME_TRAP | TYPE-09_VIOLATION_LANGUAGE_TRAP | TYPE-10_ORGANIZATIONAL_BOUNDARY`

## designPurpose
What exact mechanism this case is designed to test.

## intendedBoundary
Boundary or trap expected to be challenged by this case.

## narrative
Short synthetic narrative with enough facts for gate testing.

## preEscapeContext
Operational context before first departure from safe operation.

## escapePointCandidate
First departure candidate or earliest documentable progressive-zone start.

## postEscapeConsequences
Consequences after escape (warning, trajectory, impact, outcome), explicitly separated from escape anchor.

## operationSafeState
Expected safe operation state before departure.

## controlledVariable
Operational variable that must remain in safe range.

## safeLimitOrExpectedBoundary
Safe limit/expected boundary for that variable.

## unsafeActOrConditionCandidate
Observable first act/condition candidate indicating departure.

## candidateWhenStatement
Must start with "Quando..." and keep observable nucleus only.

## evidencePack
- `factsSupportingEscapeAnchor`
- `factsSupportingAlternativeAnchor`
- `sourceLimitationsDesigned`
- `knownAmbiguities`

## expectedBlockers
Which blockers should trigger (if any), based on designed evidence limits.

## prohibitedInferences
List of inferences that must be rejected by method behavior.

## expectedUse
Internal use allowed (test/calibration/adversarial/training).

## prohibitedUse
External/scientific/real-event replacement use explicitly forbidden.

## validationNotes
What a reviewer should confirm before approving this synthetic as valid test material.

## explicitLocks
- NO_POA_CLASSIFIED
- NO_RELEASED_CODE
- NO_DOWNSTREAM
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_ARMS_ERC
- NO_RECOMMENDATIONS
