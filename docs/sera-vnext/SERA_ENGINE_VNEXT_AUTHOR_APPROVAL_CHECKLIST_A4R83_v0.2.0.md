# SERA Engine vNext Author Approval Checklist A4R83 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-83 — Author Approval Packet for P-Axis Micro-Pilot  
DOCS_ONLY  
NO_RELEASED_CODE_CREATED  
NO_DOWNSTREAM

## Objective
Define the checklist an author should use in a future decision intake before any P-axis micro-pilot release is executed.

## General Checklist
- source identity confirmed;
- source quality sufficient;
- questionPath complete;
- evidenceRefs specific;
- proposedCode consistent with SERA-PT taxonomy;
- no `O-E` in active candidate scope;
- no no-failure fallback issue;
- no unresolved critical contradiction;
- uncertainty accepted explicitly;
- release limitation written;
- downstream locks confirmed.

## P-G Checklist
- Relevant cue, state, terrain/weather, energy, or approach information was available.
- Monitoring, checking, or integration failure is better supported than action execution failure.
- Dominant excessive time pressure is not evidenced; otherwise P-D must be considered.
- Weather, darkness, or terrain is not used alone as the P-G mechanism.
- A-axis unresolved state remains preserved if action mechanism is not isolated.

## P-C Checklist
- Mode/state/automation or knowledge-mediated perception cue is identifiable.
- The issue is interpretation/understanding, not merely missed monitoring.
- P-G is considered and rejected or held as less specific.
- Action/input mechanism remains separate unless supported by direct evidence.
- A-axis unresolved state remains preserved when input/feedback chain is incomplete.

## Hold Criteria
Hold the candidate if:
- source identity is uncertain;
- evidenceRefs do not anchor the critical questionPath answers;
- the author cannot accept residual uncertainty;
- P-G/P-C boundary remains unresolved;
- action mechanism is being used to justify P-axis release;
- downstream implications are unclear.

## Rejection Criteria
Reject the candidate for pilot if:
- the proposed P code contradicts the questionPath;
- the axis depends only on outcome severity;
- no factual cue or information state is identified;
- no-failure is used as fallback for unknown evidence;
- the packet would require whole-case classification or downstream output.

## Rollback / Withdrawal Criteria
Withdraw a future pilot axis if:
- new source evidence contradicts the P-axis rationale;
- author decision is revised;
- release limitations were incomplete or misstated;
- a downstream consumer treats the axis as finalConclusion;
- an unresolved O/A issue is incorrectly treated as resolved by the P-axis pilot.
