# EXT-BATCH1-ADJUDICATION-008

Status:
- AI_AUTHOR_ADJUDICATION_DRAFT
- EXTERNAL_BATCH_1
- NOT_RELEASED
- NOT_FIXTURE
- NOT_BASELINE
- NOT_FOR_DOWNSTREAM
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_RECOMMENDATIONS

- adjudicationId: EXT-BATCH1-ADJUDICATION-008
- sourceExtractionId: EXT-BATCH1-EXTRACTION-008
- originalCandidateId: A4R87-EXT-008
- sourceAgency: TSB Canada
- reportId: A11H0001
- shortLabel: S-92A go-around mode / AFCS and low-airspeed descent near water
- evidenceSourceRefs:
  - ../extractions-batch-1/EXT-BATCH1-EXTRACTION-008.md
  - ../../SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_EVIDENCE_NORMALIZATION_A4R89_v0.2.0.md
  - ../../SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_TRACE_ANCHORING_A4R89_v0.2.0.md
- quarantineApplied: true
- excludedConclusions:
  - TSB findings as to causes/contributing factors excluded.
  - Safety actions and recommendations excluded.
- adjudicationScope: Draft AI/Author axis adjudication for automation mode-state and low-energy feedback evidence.
- unsafeStateCandidate: AFCS/go-around mode interaction with low-airspeed descent near water.
- unsafeActConditionCandidate: Automation mode-state interpretation and monitoring/feedback chain candidate.
- directActorCandidate: Flight crew interacting with automation modes; exact PF/PM action split needs deeper extraction.
- uncertaintyNotes: AFCS technical behavior must remain separated from crew interpretation; no downstream inference is made.

## P_axis_questionPath
| questionId | questionText | answer | evidenceRefs | uncertainty | impactOnPath |
|---|---|---|---|---|---|
| P_INFO_AVAILABLE | Was relevant information available? | YES | Mode/awareness chronology and AFCS/airspeed state documented | Specific display/callout anchors need slicing | Supports perception trace |
| P_SENSORY_ACCESS_IMPAIRED | Sensory access impaired? | NO | Mode-state problem is automation/interpretation, not sensory access | Low uncertainty | Rejects sensory path |
| P_KNOWLEDGE_PERCEPTION_IMPAIRED | Misinterpretation due knowledge/perception model? | YES | Automation mode-state and crew interpretation evidence normalized as strong | Needs separation from pure AFCS behavior | Supports proposedP |
| P_ATTENTION_MONITORING_DEGRADED | Monitoring/checking degraded? | YES | Low-energy feedback/checking and mode awareness evidence | Could be secondary to interpretation | Supports P trace but not dominant over mode interpretation |
| P_TIME_PRESSURE_DOMINANT | Time pressure dominant? | UNCLEAR | Offshore approach/low-energy context | Dominance not proven | Does not shift path |
| P_COMMUNICATION_INFORMATION_PROBLEM | Communication/information issue dominant? | UNCLEAR | Crew coordination evidence present | Communication failure not isolated | No communication-specific proposal |
| P_PATH_RESULT | Path result for this draft | P-C | Mode-state interpretation evidence is strongest and more specific than generic monitoring | Author review required | Draft perception proposal only |

## O_axis_questionPath
| questionId | questionText | answer | evidenceRefs | uncertainty | impactOnPath |
|---|---|---|---|---|---|
| O_GOAL_COMPATIBLE_WITH_SAFE_OPERATION | Compatible objective evidenced? | UNCLEAR | Approach/go-around context | Objective quality not isolated | Keeps O unresolved |
| O_CONSCIOUS_RULE_DEVIATION_EVIDENCE | Conscious rule deviation evidence? | UNCLEAR | No explicit rule-awareness proof | Conclusions excluded | Keeps O unresolved |
| O_ROUTINE_DEVIATION_EVIDENCE | Routine deviation evidence? | UNCLEAR | No habituality evidence | Not established | Keeps O unresolved |
| OBJECTIVE_EXCEPTIONAL_DEVIATION_EVIDENCE | Exceptional deviation evidence? | UNCLEAR | No conscious deviation proof | Not established | Keeps O unresolved |
| O_NON_VIOLATION_INADEQUATE_OBJECTIVE | Inadequate objective without violation proof? | UNCLEAR | Low-energy mode context | Objective path not isolated from perception/action | Keeps O unresolved |
| O_PATH_RESULT | Path result for this draft | UNRESOLVED | Objective evidence insufficient | Author review/source slicing needed | No objective proposal |

## A_axis_questionPath
| questionId | questionText | answer | evidenceRefs | uncertainty | impactOnPath |
|---|---|---|---|---|---|
| A_SPECIFIC_ACTION_SELECTED_OR_EXECUTED | Specific action selected/executed? | YES | Crew interaction with automation modes | Exact action split not fully extracted | Opens action review |
| A_ACTION_IMPLEMENTED_AS_INTENDED | Action implemented as intended? | UNCLEAR | AFCS behavior and control-response evidence | Technical behavior vs action execution not separated | Keeps A unresolved |
| A_ACTION_APPROPRIATE_TO_SITUATION | Action appropriate? | UNCLEAR | Low-energy descent and automation context | Cannot judge without detailed action trace | Keeps A unresolved |
| A_OWN_ACTION_FEEDBACK_CHECK_FAILED | Own-action feedback/check failed? | UNCLEAR | Feedback/checking evidence present | Own-action feedback loop not isolated | Keeps A unresolved |
| A_PHYSICAL_ERGONOMIC_ABILITY_IMPAIRED | Physical/ergonomic impairment? | NO | No evidence in extraction | Low uncertainty | Rejects physical path |
| A_KNOWLEDGE_DECISION_LIMITATION | Knowledge/decision limitation? | UNCLEAR | Mode-awareness evidence could overlap | Better handled as perception interpretation in this draft | Keeps A unresolved |
| A_ACTION_SELECTION_FAILURE | Wrong selection among alternatives? | UNCLEAR | Automation interaction may involve action choices | Selection failure not isolated | Keeps A unresolved |
| A_TIME_PRESSURE_DOMINANT | Time pressure dominant? | UNCLEAR | Approach/low-energy context | Dominance not proven | Keeps A unresolved |
| A_PATH_RESULT | Path result for this draft | UNRESOLVED | Action mechanism remains under-separated from mode interpretation | Author review needed | No action proposal |

- proposedP: P-C
- proposedO: UNRESOLVED
- proposedA: UNRESOLVED
- proposedCodeStatus: DRAFT_AI_AUTHOR_ONLY
- maturityStatus: AUTHOR_REVIEW_READY
- confidenceByAxis:
  - P: MEDIUM
  - O: LOW
  - A: LOW
- rejectedAlternatives:
  - Generic monitoring path rejected as less specific than mode-state interpretation.
  - Action-selection path rejected until automation behavior and crew action are separated.
- downstreamLocks:
  - finalConclusionLocked: true
  - hfacsLocked: true
  - riskLocked: true
  - recommendationsLocked: true
  - fixturePromotionLocked: true
  - baselinePromotionLocked: true
- nextStepRecommendation: Author review of P draft with explicit AFCS/crew interpretation separation.

