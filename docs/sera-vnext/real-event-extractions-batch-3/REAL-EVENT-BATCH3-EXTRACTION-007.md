# REAL-EVENT-BATCH3-EXTRACTION-007

Status:
- STRUCTURED_EXTRACTION_DRAFT
- BATCH_3
- NOT_CLASSIFIED
- NOT_FIXTURE
- NOT_BASELINE
- NOT_CONSENSUS_VALIDATED
- NOT_FOR_DOWNSTREAM
- NO_PROPOSED_CODE
- NO_RELEASED_CODE
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_RECOMMENDATIONS

- extractionId: A4R76-B3-007
- batchId: A4R76_BATCH_3
- sourceCandidateId: A4R75-B3-007
- originalRealEventId: N200BK
- sourceDocument: /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt
- sourceLocator: lines 652-778 (N200BK accident header and narrative excerpts)
- shortLabel: N200BK A109E rooftop impact in IMC
- aircraftOperation: Agusta A109E, urban/corporate helicopter operation
- eventType: IMC-related control/trajectory loss leading to rooftop impact
- sourceType: TXT_CONVERTED_FROM_PDF
- extractionConfidence: HIGH
- anchorQuality: HIGH

## factualSummary
Source text reports N200BK impacted a building roof in New York under weather/visibility constraints, with flight progression indicating abnormal control/trajectory behavior before impact.

## eventSequence
1. N200BK departed for urban helicopter operation.
2. Weather/visibility context degraded during mission segment.
3. Aircraft trajectory became erratic/non-stable in terminal segment.
4. Helicopter impacted building rooftop and was destroyed.
5. Event record includes operator/registration and accident metadata.

## unsafeStateCandidate
Candidate unsafe state is unstable controlled-flight profile in constrained urban IMC environment with diminishing maneuver margin.

## unsafeActConditionCandidate
Candidate unresolved boundary between environmental limitation, decision continuation, and control/monitoring execution.

## directActorCandidate
Pilot in command in single-crew control context (additional operational actors unresolved from extract).

## evidenceFragments
- "Registration: N200BK"
- "impacted the roof of a building in New York"
- accident metadata indicating destructive outcome

## uncertaintyNotes
- Full ATC/decision chronology is not fully extracted in this draft.
- Specific automation/instrument usage is only partially visible in selected lines.
- Trigger mechanism for loss of control remains adjudication-stage issue.

## excludedInformation
- No import of final probable-cause statements.
- No recommendations imported.
- No HFACS-to-SERA conversion.

## possibleEvidenceCategoryHints
- URBAN_IMC_CONSTRAINTS
- TRAJECTORY_STABILITY
- PILOT_DECISION_CHAIN
- MONITORING_FEEDBACK

## adjudicationQuestions
- What were the weather minima and decision points before terminal segment?
- Was continuation decision explicit or gradual under workload pressure?
- What evidence distinguishes perception limitation from action management gap?

- sourceEnrichmentNeeded: no
- nextStepRecommendation: Carry to A4+R-77 as A-axis and decision-under-pressure candidate.
