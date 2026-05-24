# SERA Engine vNext Reference Case Frontend Display Notes A4R94 v0.2.0

Status: FRONTEND_DISPLAY_NOTES  
Phase: A4+R-94  
DOCS_ONLY  
DESIGN_ONLY  
NO_RUNTIME_IMPLEMENTATION  
NO_DOWNSTREAM

## Objective
Define conceptual front-end display guidance for future reference case calibration traces.

## Future Product Goal
Enable users to inspect how a SERA boundary was reached through factual trace, question flow, evidence links, rejected alternatives, and uncertainty/quarantine caveats.

## Conceptual Screens/Components
- reference case card
- factual summary panel
- safe-operation escape point panel
- P/O/A trace accordion
- evidence table
- rejected alternatives section
- caveats/quarantine section
- calibration lesson section

## Minimum Data Needed
- referenceCaseId/caseId/type/status
- factual summary
- source links and quarantine labels
- escape point statement with evidence
- P/O/A question-answer-evidence blocks
- rejected alternatives with rationale
- final boundary (classified/unresolved/not claimed)
- reviewer decision metadata
- misuse warnings/caveats

## Display Prohibitions
- Do not present as final external scientific proof.
- Do not hide withdrawn or boundary reference cases.
- Do not present ambiguous cases as simple errors.
- Do not open or imply HFACS/Risk/ERC/recommendations outputs from this view.

## UX Caution
The interface should make uncertainty explicit and preserve the distinction between:
- factual evidence;
- quarantined external conclusions;
- internal SERA boundary reasoning.
