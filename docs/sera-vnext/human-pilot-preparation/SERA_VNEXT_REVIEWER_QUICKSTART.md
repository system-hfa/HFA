# SERA vNext Reviewer Quickstart

## Product Beta

Product Beta is an internal candidate-only workflow for controlled SERA vNext analysis review. It creates a working hypothesis for human review. It is not a final SERA classification and is not approved for operational decision making.

## Candidate-only

Candidate-only means the system may show an escape point, P/O/A candidates, preconditions, uncertainties, warnings, and review prompts. The human reviewer decides whether the working hypothesis is useful, rejected, needs more evidence, or should be regenerated after new evidence.

## Create an analysis

1. Open `/admin/sera-vnext/analyses`.
2. Confirm the Product Beta UI flag is enabled in the controlled environment.
3. Use the assigned case title and narrative exactly from the pilot case bank.
4. Keep source type as internal pilot or training as instructed by the runbook.
5. Submit the analysis and record the sanitized analysis id in the result template.

## Review an analysis

1. Open the analysis detail page.
2. Read the non-final banner.
3. Review the escape point before reviewing P/O/A.
4. Confirm the direct actor and whether the evidence supports the actor.
5. Review perception, objective, and action statements separately.
6. Review preconditions as context or contribution candidates, not as the escape point.
7. Record uncertainties and warnings.
8. Open the review form and submit one reviewer decision.

## Ask for more evidence

Use `REQUIRES_MORE_EVIDENCE` when the narrative does not support the direct actor, awareness, objective, action, sequence, or first useful escape point.

## Reject the working hypothesis

Use `REJECT_WORKING_HYPOTHESIS` when the escape point, actor, P/O/A basis, or evidence use is not defensible.

## Return for reanalysis

Use `RETURN_FOR_REANALYSIS` only after the case narrative was corrected or new evidence was added.

## Export

Use the export action after review submission when requested by the admin. Export output remains internal, candidate-only, non-final, and sanitized.

## Do not do

- Do not treat the candidate as final.
- Do not enter real client data, names, email addresses, credentials, or protected operational information.
- Do not add operational recommendations.
- Do not translate another taxonomy into SERA P/O/A.
- Do not use consequence as the cause.
- Do not modify code or methodology during the pilot.

