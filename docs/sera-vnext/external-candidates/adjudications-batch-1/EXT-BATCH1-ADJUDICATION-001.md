# EXT-BATCH1-ADJUDICATION-001

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

- adjudicationId: EXT-BATCH1-ADJUDICATION-001
- sourceExtractionId: EXT-BATCH1-EXTRACTION-001
- originalCandidateId: A4R87-EXT-001
- sourceAgency: TSB Canada
- reportId: A19A0055
- shortLabel: S-92A inadvertent descent near Sable Island
- evidenceSourceRefs:
  - ../extractions-batch-1/EXT-BATCH1-EXTRACTION-001.md
  - ../../SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_EVIDENCE_NORMALIZATION_A4R89_v0.2.0.md
  - ../../SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_TRACE_ANCHORING_A4R89_v0.2.0.md
- quarantineApplied: true
- excludedConclusions:
  - TSB causal/contributing findings excluded.
  - Safety recommendations and deficiency labels excluded.
- adjudicationScope: Draft AI/Author axis adjudication for factual trace only.
- unsafeStateCandidate: Low-energy/high-rate descent during offshore visual approach after discontinued instrument approaches.
- unsafeActConditionCandidate: Approach monitoring/feedback chain degraded during IFR-to-visual transition in low visibility.
- directActorCandidate: Flight crew, with two-pilot role evidence documented but not yet field-sliced.
- uncertaintyNotes: Full report still needs field-level slicing for specific callouts and parameters; external conclusions remain quarantined.

## P_axis_questionPath
| questionId | questionText | answer | evidenceRefs | uncertainty | impactOnPath |
|---|---|---|---|---|---|
| P_INFO_AVAILABLE | Was relevant information available to the crew? | YES | Energy-state progression, approach attempts, visual transition context | Specific cockpit display/callout anchors still need slicing | Supports evaluating monitoring rather than sensory absence |
| P_SENSORY_ACCESS_IMPAIRED | Was sensory access physically or environmentally impaired? | UNCLEAR | Low visibility and offshore visual transition | Low visibility is context, not enough alone for a sensory-failure draft | Does not support a sensory-specific proposal |
| P_KNOWLEDGE_PERCEPTION_IMPAIRED | Is there evidence of misinterpretation due knowledge/perception model? | UNCLEAR | No explicit mode/misinterpretation anchor in extraction | Detailed report may clarify | Does not support interpretation-specific proposal |
| P_ATTENTION_MONITORING_DEGRADED | Is degraded monitoring/checking of available information evidenced? | YES | Low-energy profile developed during approach; feedback/checking evidence normalized as strong | Exact cockpit monitoring sequence not yet fully sliced | Supports proposedP |
| P_TIME_PRESSURE_DOMINANT | Was excessive time pressure dominant? | UNCLEAR | Offshore approach and transition pressure noted | Dominance not established | Does not shift path to time-pressure mechanism |
| P_COMMUNICATION_INFORMATION_PROBLEM | Is communication/information transfer the dominant issue? | UNCLEAR | Two-pilot operation; missing detailed callouts | Communication chain not specific enough | Does not support communication-specific proposal |
| P_PATH_RESULT | Path result for this draft | P-G | Monitoring/checking degradation is the strongest supported perception trace | Author review required | Draft perception proposal only |

## O_axis_questionPath
| questionId | questionText | answer | evidenceRefs | uncertainty | impactOnPath |
|---|---|---|---|---|---|
| O_GOAL_COMPATIBLE_WITH_SAFE_OPERATION | Is the active goal clearly compatible with safe operation? | UNCLEAR | Approach attempt sequence | Objective evidence is not specific enough for a no-failure objective draft | Keeps objective unresolved |
| O_CONSCIOUS_RULE_DEVIATION_EVIDENCE | Is there conscious rule deviation evidence? | UNCLEAR | No rule-awareness anchor in extraction | External conclusions excluded | Keeps objective unresolved |
| O_ROUTINE_DEVIATION_EVIDENCE | Is routine deviation evidenced? | UNCLEAR | No normalization/habit evidence | Not established | Keeps objective unresolved |
| OBJECTIVE_EXCEPTIONAL_DEVIATION_EVIDENCE | Is exceptional deviation evidenced? | UNCLEAR | No explicit deviation proof in extracted facts | Not established | Keeps objective unresolved |
| O_NON_VIOLATION_INADEQUATE_OBJECTIVE | Is there inadequate objective without violation proof? | UNCLEAR | Visual transition under low visibility may be relevant but not sufficient | Avoids treating outcome as objective failure | Keeps objective unresolved |
| O_PATH_RESULT | Path result for this draft | UNRESOLVED | Objective path not sufficiently anchored | Author review/source slicing needed | No objective proposal |

## A_axis_questionPath
| questionId | questionText | answer | evidenceRefs | uncertainty | impactOnPath |
|---|---|---|---|---|---|
| A_SPECIFIC_ACTION_SELECTED_OR_EXECUTED | Is a specific action selected/executed? | YES | Approach transition and handling actions described | Specific action sequence not yet field-sliced | Opens action review but not enough for code |
| A_ACTION_IMPLEMENTED_AS_INTENDED | Was action implemented as intended? | UNCLEAR | Recovery/overtorque sequence | Missing detailed control-action trace | Keeps action unresolved |
| A_ACTION_APPROPRIATE_TO_SITUATION | Was action appropriate to situation? | UNCLEAR | Low-energy approach context | Cannot infer from result alone | Keeps action unresolved |
| A_OWN_ACTION_FEEDBACK_CHECK_FAILED | Is failed feedback/checking after own action evidenced? | UNCLEAR | Feedback/checking evidence exists at category level | Specific own-action feedback loop not isolated | Keeps action unresolved |
| A_PHYSICAL_ERGONOMIC_ABILITY_IMPAIRED | Physical/ergonomic impairment? | NO | No such evidence in extraction | Low uncertainty | Rejects physical-capacity path |
| A_KNOWLEDGE_DECISION_LIMITATION | Knowledge/decision limitation? | UNCLEAR | No explicit knowledge anchor | Not established | Keeps action unresolved |
| A_ACTION_SELECTION_FAILURE | Wrong selection among alternatives? | UNCLEAR | Visual transition may be relevant | Avoids converting approach choice into action failure without details | Keeps action unresolved |
| A_TIME_PRESSURE_DOMINANT | Was time pressure dominant for action? | UNCLEAR | Offshore transition pressure noted | Dominance not proven | Keeps action unresolved |
| A_PATH_RESULT | Path result for this draft | UNRESOLVED | Specific action mechanism not sufficiently anchored | Author review/source slicing needed | No action proposal |

- proposedP: P-G
- proposedO: UNRESOLVED
- proposedA: UNRESOLVED
- proposedCodeStatus: DRAFT_AI_AUTHOR_ONLY
- maturityStatus: AUTHOR_REVIEW_READY
- confidenceByAxis:
  - P: MEDIUM
  - O: LOW
  - A: LOW
- rejectedAlternatives:
  - Sensory-specific perception path rejected because low visibility alone is insufficient.
  - Action-specific path rejected because specific own-action mechanism is not isolated.
- downstreamLocks:
  - finalConclusionLocked: true
  - hfacsLocked: true
  - riskLocked: true
  - recommendationsLocked: true
  - fixturePromotionLocked: true
  - baselinePromotionLocked: true
- nextStepRecommendation: Author review of P draft after field-level extraction of cockpit monitoring and callout anchors.

