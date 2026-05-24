# Real Event Batch 3 Adjudication 006

Status:
- AI_AUTHOR_ADJUDICATION_DRAFT
- BATCH_3
- NOT_FIXTURE
- NOT_BASELINE
- NOT_CONSENSUS_VALIDATED
- NOT_FOR_DOWNSTREAM
- NO_RELEASED_CODE
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_RECOMMENDATIONS

- adjudicationId: REAL-EVENT-BATCH3-ADJUDICATION-006
- sourceExtractionId: A4R76-B3-006
- originalRealEventId: PR-CHI
- shortLabel: PR-CHI S-76C++ helideck motion mismatch event
- adjudicationMode: AI_AUTHOR
- adjudicationConfidence: MEDIUM
- sourceQuality: MEDIUM
- sourceEnrichmentNeeded: yes

## factualBasis
- Offshore helideck landing occurred in dynamic heave/pitch/roll context.
- Extraction indicates information/motion-reporting mismatch relevance.
- Exact motion values and vessel-crew information flow need enrichment.

## safeOperationEscapePointCandidate
Candidate escape point is the landing-commit gate when helideck motion data and acceptance limits should have been verified.

## unsafeState
Landing attempt in dynamic helideck envelope with possibly insufficiently bounded motion/feedback conditions.

## unsafeActOrCondition
Communication/information condition across vessel-crew interface, not automatically a crew action failure.

## directActor
Flight crew plus vessel/platform information interface; singular direct actor unresolved.

## P_axis_questionPath
- Was relevant information available? unclear/partial; evidence: helideck motion context existed but report quality is uncertain; impact: P-H candidate.
- Was sensory access impaired? no/unclear; evidence: dynamic deck not sensory impairment alone; impact: P-B/P-F not selected.
- Was information transmission incomplete/ambiguous? yes candidate; evidence: motion mismatch/information-chain concern; impact: supports P-H draft.
- Was time pressure dominant? unclear; evidence: landing phase pressure not quantified; impact: P-D not selected.
- Path result: P-H.

## O_axis_questionPath
- Was the operational goal compatible with safe operation? yes; evidence: offshore helideck landing operation; impact: supports O-A draft.
- Is there evidence of conscious rule deviation? unclear/no; evidence: motion-limit breach not proven as conscious; impact: O-B/O-C rejected.
- Is this non-violation inadequate objective? unclear; evidence: no explicit efficiency motive; impact: O-D not selected.
- Path result: O-A.

## A_axis_questionPath
- Was a specific action selected or executed? yes, landing continued; evidence: landing damage event; impact: action exists.
- Was action inappropriate to situation? unclear; evidence: missing verified motion data and cockpit decision threshold; impact: A unresolved.
- Was there feedback/checking failure after own action? unclear; evidence: information chain spans vessel/crew; impact: no A-C.
- Was third-party coordination failure dominant? unclear; evidence: vessel-crew interface possible but not enough for A-G; impact: unresolved.
- Path result: UNRESOLVED.

## P_axis_reasoning
The strongest draft is information/communication limitation rather than pure attention or sensory failure.

## O_axis_reasoning
No evidence supports conscious deviation or efficiency objective.

## A_axis_reasoning
Landing continuation cannot be judged without verified deck-motion data and decision thresholds.

## proposedPCode or UNRESOLVED
P-H

## proposedOCode or UNRESOLVED
O-A

## proposedACode or UNRESOLVED
UNRESOLVED

## rationaleByAxis
- P: motion/reporting mismatch supports information-chain draft.
- O: nominal landing objective.
- A: specific action failure not separated from dynamic condition.

## evidenceRefsByAxis
- P: helideck heave/pitch/roll mismatch note.
- O: offshore helideck landing context.
- A: missing motion data and vessel-crew communication record.

## uncertaintyByAxis
- P: MEDIUM
- O: LOW
- A: HIGH

## rejectedAlternatives
- `A-F` rejected without proved inappropriate selection.
- `O-C` rejected without conscious limit breach.
- `P-G` rejected because available issue is more information-chain than monitoring-only.

## evidenceCategoryHints
- HELIDECK_MOTION_ENVELOPE
- INFORMATION_QUALITY
- LANDING_DECISION_GATES
- CREW_FEEDBACK_VERIFICATION

## maturityStatus
EVIDENCE_ENRICHMENT_REQUIRED

## adjudicationQuestionsForAuthor
- What verified helideck motion values and limits are available?
- Was the motion information transmitted, received, and understood before landing commit?

## downstreamLocks
- proposedCode is draft only and not `releasedCode`.
- no `selectedCode=CLASSIFIED`.
- no finalConclusion/HFACS/Risk/ERC/recommendations.
- no fixture/baseline/downstream.

## nextStepRecommendation
Enrich deck-motion and vessel-crew communication evidence before stronger A adjudication.
