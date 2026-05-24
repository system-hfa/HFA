# SERA Engine vNext External Report Conclusion Quarantine Protocol A4R87 v0.2.0

Status: QUARANTINE_PROTOCOL  
Phase: A4+R-87 — Version External Candidate Discovery Pack  
DOCS_ONLY  
NO_CLASSIFICATION  
NO_PROPOSED_CODE  
NO_NEW_RELEASED_CODE  
NO_DOWNSTREAM

## Objective
Define how external investigation reports are used as evidence sources while keeping investigative conclusions quarantined from SERA coding decisions.

## Allowed Use (Factual Inputs)
- Event timeline and sequence.
- Aircraft state and system state snapshots.
- Flight parameters and trajectory data.
- Alert/warning chronology.
- CVR/FDR factual excerpts and crew callouts.
- PF/PM role evidence, when explicitly documented.
- Procedure references cited in the report body.

## Quarantined Content (Not SERA Answer Keys)
- Probable cause statements.
- Contributing factors used as direct labels.
- Safety recommendations as causal determination.
- Blame language.
- External classification frameworks as automatic mapping.
- HFACS/CRM references as direct SERA outcomes.

## Recording Pattern for Future Extraction
For each external candidate extraction package:
1. `factualEvidence`: only factual anchored elements.
2. `excludedConclusions`: explicit list of quarantined conclusions and labels.
3. `sourceNotes`: any ambiguity, data gaps, or preliminary-state caveats.

## Operating Rule
External report content informs evidence quality and traceability. It does not decide SERA code outcomes by itself.

## Compliance Notes
- This protocol does not run classification.
- This protocol does not create any new code assignment.
- This protocol preserves methodology locks on downstream outputs.
