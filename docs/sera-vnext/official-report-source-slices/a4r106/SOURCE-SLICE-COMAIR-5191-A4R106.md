# Source Slice — COMAIR-5191 — A4R106

- officialReportTitle: Attempted Takeoff From Wrong Runway, Comair Flight 5191, Bombardier CL-600-2B19, Lexington, 2006
- agency: NTSB
- officialUrl: https://www.ntsb.gov/investigations/AccidentReports/Reports/AAR0705.pdf
- localOfficialPdf: `docs/sera-vnext/source-corpus/official-reports/a4r106/COMAIR-5191-NTSB-AAR0705.pdf`
- accessStatus: ACCESSED

## reportSectionsUsed
- Executive Summary and Factual Information (taxi, runway assignment, lineup/takeoff sequence).
- CVR/FDR chronology (runway references in briefing, heading bug, clearance exchange, runway entry, takeoff roll callouts).

## factualTimeline
- Flight was cleared/taxed for runway 22 and briefing/checklists repeatedly referenced runway 22.
- Heading bugs were set for runway 22 heading.
- During taxi, crew crossed hold-short for runway 26 and lined up runway 26.
- Takeoff request/clearance exchange omitted runway number.
- Takeoff roll proceeded on runway 26 with subsequent early V1/VR callouts and overrun/collision sequence.

## safeOperationEscapePointCandidates
- EP1: pre-lineup cross-check point at hold-short/runway entry where runway identity mismatch could be trapped.
- EP2: runway-entry and lineup checklist point where heading/runway confirmation remained available.
- EP3: early takeoff roll before speed commitment where mismatch detection could still lead to reject decision.

## perceptionEvidence
- Multiple available cues pointed to runway 22 expectation while aircraft aligned with runway 26.
- Information availability appears high; cue integration/verification appears degraded at the decision point.

## objectiveEvidence
- Operational objective was a normal departure under assigned clearance.
- No strong factual anchor in this slice that objective itself changed to rule-inconsistent target.

## actionEvidence
- Crew taxied across runway 26 hold-short and continued lineup/takeoff sequence on wrong runway.
- Runway verification actions appear insufficient before takeoff roll continuation.

## warning/callout/mode/automation evidence
- Key evidence here is cue/callout/checklist/clearance chain, not autoflight mode complexity.
- CVR/FDR anchors include runway-call references, heading bug setup, and takeoff-roll call timing.

## excludedConclusions
- probable cause: excluded from SERA answer-key use
- contributing factors: excluded from SERA answer-key use
- safety-recommendations (excluded from SERA answer-key use)
- analyst conclusions: excluded from SERA answer-key use

## sourceLimitations
- Source is strong for runway-awareness/perception path, but deeper O/A closure still requires careful boundary handling.
- Nonpertinent conversation is factual context but not used alone as a deterministic SERA answer key.

## sourceEvidenceRefs
- COMAIR-SRC-EV-001: `/tmp/comair5191.txt` lines around 466-476 (briefing context with repeated runway references).
- COMAIR-SRC-EV-002: `/tmp/comair5191.txt` lines around 512-516 and 522-537 (checklist progression, runway-22 taxi clearance, heading-bug anchor).
- COMAIR-SRC-EV-003: `/tmp/comair5191.txt` lines around 566-573 and 588-593 (clearance/runway-number omission and runway-26 entry/takeoff sequence).

- sourceSliceStatus: ADEQUATE_FOR_TRACE_DRAFT
