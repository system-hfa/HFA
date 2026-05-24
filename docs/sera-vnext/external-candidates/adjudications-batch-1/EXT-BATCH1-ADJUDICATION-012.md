# EXT-BATCH1-ADJUDICATION-012

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

- adjudicationId: EXT-BATCH1-ADJUDICATION-012
- sourceExtractionId: EXT-BATCH1-EXTRACTION-012
- originalCandidateId: A4R87-EXT-012
- sourceAgency: NTSB
- reportId: CEN17FA072
- shortLabel: Citation CJ4 mode/autopilot status event
- evidenceSourceRefs:
  - ../extractions-batch-1/EXT-BATCH1-EXTRACTION-012.md
  - ../../SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_EVIDENCE_NORMALIZATION_A4R89_v0.2.0.md
  - ../../SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_TRACE_ANCHORING_A4R89_v0.2.0.md
- quarantineApplied: true
- excludedConclusions:
  - NTSB probable cause statement excluded.
  - Contributing-factor labels excluded.
  - Recommendations excluded.
- adjudicationScope: Draft AI/Author axis adjudication for fixed-wing automation mode/status evidence.
- unsafeStateCandidate: Autopilot/mode-state sequence with flight path divergence and loss-of-control/impact outcome.
- unsafeActConditionCandidate: Mode/status interpretation and feedback-checking boundary candidate.
- directActorCandidate: Pilot/crew; control inputs documented but role-specific monitoring remains partially extracted.
- uncertaintyNotes: Medium-confidence extraction; finer mode/status chronology needed before any stronger action or objective proposal.

## P_axis_questionPath
| questionId | questionText | answer | evidenceRefs | uncertainty | impactOnPath |
|---|---|---|---|---|---|
| P_INFO_AVAILABLE | Was relevant information available? | YES | Autopilot/mode-state evidence and control-state cues | Exact chronology needs refinement | Supports perception trace |
| P_SENSORY_ACCESS_IMPAIRED | Sensory access impaired? | NO | Event centers on automation/mode awareness, not sensory access | Low uncertainty | Rejects sensory path |
| P_KNOWLEDGE_PERCEPTION_IMPAIRED | Misinterpretation due knowledge/perception model? | YES | Mode/status awareness and fixed-wing automation comparator evidence | Medium confidence; detailed chronology still needed | Supports proposedP |
| P_ATTENTION_MONITORING_DEGRADED | Monitoring/checking degraded? | YES | Feedback/checking and mode/status evidence | May be secondary to interpretation mechanism | Supports P trace but not generic monitoring as dominant |
| P_TIME_PRESSURE_DOMINANT | Time pressure dominant? | UNCLEAR | Flight path divergence context | Dominance not established | Does not shift path |
| P_COMMUNICATION_INFORMATION_PROBLEM | Communication/information issue dominant? | UNCLEAR | Crew-role detail partial | Communication chain not isolated | No communication-specific proposal |
| P_PATH_RESULT | Path result for this draft | P-C | Mode/status interpretation evidence is most specific supported path | Author review required | Draft perception proposal only |

## O_axis_questionPath
| questionId | questionText | answer | evidenceRefs | uncertainty | impactOnPath |
|---|---|---|---|---|---|
| O_GOAL_COMPATIBLE_WITH_SAFE_OPERATION | Compatible objective evidenced? | UNCLEAR | Flight under autopilot/mode-managed profile | Objective quality not isolated | Keeps O unresolved |
| O_CONSCIOUS_RULE_DEVIATION_EVIDENCE | Conscious rule deviation evidence? | UNCLEAR | No explicit rule-awareness proof in extraction | Conclusions excluded | Keeps O unresolved |
| O_ROUTINE_DEVIATION_EVIDENCE | Routine deviation evidence? | UNCLEAR | No habituality evidence | Not established | Keeps O unresolved |
| OBJECTIVE_EXCEPTIONAL_DEVIATION_EVIDENCE | Exceptional deviation evidence? | UNCLEAR | No conscious deviation proof | Not established | Keeps O unresolved |
| O_NON_VIOLATION_INADEQUATE_OBJECTIVE | Inadequate objective without violation proof? | UNCLEAR | Automation context does not isolate objective failure | Avoids objective inference from outcome | Keeps O unresolved |
| O_PATH_RESULT | Path result for this draft | UNRESOLVED | Objective trace insufficient | Author review/source slicing needed | No objective proposal |

## A_axis_questionPath
| questionId | questionText | answer | evidenceRefs | uncertainty | impactOnPath |
|---|---|---|---|---|---|
| A_SPECIFIC_ACTION_SELECTED_OR_EXECUTED | Specific action selected/executed? | YES | Control inputs and automation interaction documented | Actor/action sequence not fully parsed | Opens action review |
| A_ACTION_IMPLEMENTED_AS_INTENDED | Action implemented as intended? | UNCLEAR | Flight path divergence and control-state evidence | Cannot judge implementation without detailed sequence | Keeps A unresolved |
| A_ACTION_APPROPRIATE_TO_SITUATION | Action appropriate? | UNCLEAR | Automation/control context | Not enough for action appropriateness finding | Keeps A unresolved |
| A_OWN_ACTION_FEEDBACK_CHECK_FAILED | Own-action feedback/check failed? | UNCLEAR | Feedback/checking evidence present | Own-action verification not isolated | Keeps A unresolved |
| A_PHYSICAL_ERGONOMIC_ABILITY_IMPAIRED | Physical/ergonomic impairment? | NO | No evidence in extraction | Low uncertainty | Rejects physical path |
| A_KNOWLEDGE_DECISION_LIMITATION | Knowledge/decision limitation? | UNCLEAR | Automation interpretation evidence may overlap | Better treated as perception interpretation in this draft | Keeps A unresolved |
| A_ACTION_SELECTION_FAILURE | Wrong selection among alternatives? | UNCLEAR | Control inputs documented | Wrong selection not isolated from mode interpretation | Keeps A unresolved |
| A_TIME_PRESSURE_DOMINANT | Time pressure dominant? | UNCLEAR | Flight path divergence context | Dominance not established | Keeps A unresolved |
| A_PATH_RESULT | Path result for this draft | UNRESOLVED | Action mechanism not separated enough | Further chronology extraction needed | No action proposal |

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
  - Action-selection path rejected until control inputs are decomposed against mode awareness.
  - Objective path rejected because no objective evidence is isolated.
- downstreamLocks:
  - finalConclusionLocked: true
  - hfacsLocked: true
  - riskLocked: true
  - recommendationsLocked: true
  - fixturePromotionLocked: true
  - baselinePromotionLocked: true
- nextStepRecommendation: Author review of P draft after finer mode/status chronology extraction.

