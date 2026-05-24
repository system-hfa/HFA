# EXT-BATCH1-ADJUDICATION-007

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

- adjudicationId: EXT-BATCH1-ADJUDICATION-007
- sourceExtractionId: EXT-BATCH1-EXTRACTION-007
- originalCandidateId: A4R87-EXT-007
- sourceAgency: NTSB
- reportId: CEN10FA079
- shortLabel: S-76C++ helideck/platform rollover sequence
- evidenceSourceRefs:
  - ../extractions-batch-1/EXT-BATCH1-EXTRACTION-007.md
  - ../../SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_EVIDENCE_NORMALIZATION_A4R89_v0.2.0.md
  - ../../SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_TRACE_ANCHORING_A4R89_v0.2.0.md
- quarantineApplied: true
- excludedConclusions:
  - NTSB causal determinations excluded.
  - External recommendations excluded.
- adjudicationScope: Draft AI/Author axis adjudication for terminal action/feedback evidence.
- unsafeStateCandidate: Low-altitude helideck/platform terminal segment with rapid rollover/control upset sequence.
- unsafeActConditionCandidate: Action/feedback mechanism candidate, but detailed action chain remains under-extracted.
- directActorCandidate: Flight crew; direct control-response narrative exists but is not fully decomposed.
- uncertaintyNotes: Medium-confidence extraction; avoid inferring action fault from rollover outcome alone.

## P_axis_questionPath
| questionId | questionText | answer | evidenceRefs | uncertainty | impactOnPath |
|---|---|---|---|---|---|
| P_INFO_AVAILABLE | Was relevant information available? | UNCLEAR | Terminal sequence and helideck context | Cue availability not fully extracted | Keeps P unresolved |
| P_SENSORY_ACCESS_IMPAIRED | Sensory access impaired? | UNCLEAR | Offshore/helideck context | No explicit sensory barrier in extraction | Keeps P unresolved |
| P_KNOWLEDGE_PERCEPTION_IMPAIRED | Misinterpretation due knowledge/perception model? | UNCLEAR | No explicit interpretation anchor | Not established | Keeps P unresolved |
| P_ATTENTION_MONITORING_DEGRADED | Monitoring/checking degraded? | UNCLEAR | Feedback/checking evidence at category level | Monitoring path not isolated | Keeps P unresolved |
| P_TIME_PRESSURE_DOMINANT | Time pressure dominant? | UNCLEAR | Terminal low-altitude context | Dominance not proven | Keeps P unresolved |
| P_COMMUNICATION_INFORMATION_PROBLEM | Communication/information issue dominant? | UNCLEAR | Limited callout detail | Not established | Keeps P unresolved |
| P_PATH_RESULT | Path result for this draft | UNRESOLVED | Perception evidence is not specific enough | Source enrichment required | No perception proposal |

## O_axis_questionPath
| questionId | questionText | answer | evidenceRefs | uncertainty | impactOnPath |
|---|---|---|---|---|---|
| O_GOAL_COMPATIBLE_WITH_SAFE_OPERATION | Compatible objective evidenced? | UNCLEAR | Helideck terminal operation | Objective quality not isolated | Keeps O unresolved |
| O_CONSCIOUS_RULE_DEVIATION_EVIDENCE | Conscious rule deviation evidence? | UNCLEAR | No rule-awareness anchor | Not established | Keeps O unresolved |
| O_ROUTINE_DEVIATION_EVIDENCE | Routine deviation evidence? | UNCLEAR | No habituality evidence | Not established | Keeps O unresolved |
| OBJECTIVE_EXCEPTIONAL_DEVIATION_EVIDENCE | Exceptional deviation evidence? | UNCLEAR | No conscious deviation proof | Not established | Keeps O unresolved |
| O_NON_VIOLATION_INADEQUATE_OBJECTIVE | Inadequate objective without violation proof? | UNCLEAR | Terminal event outcome alone insufficient | Avoids outcome-based objective inference | Keeps O unresolved |
| O_PATH_RESULT | Path result for this draft | UNRESOLVED | Objective path not anchored | Source enrichment required | No objective proposal |

## A_axis_questionPath
| questionId | questionText | answer | evidenceRefs | uncertainty | impactOnPath |
|---|---|---|---|---|---|
| A_SPECIFIC_ACTION_SELECTED_OR_EXECUTED | Specific action selected/executed? | YES | Terminal handling and control-response narrative present | Specific sequence not fully parsed | Opens action review |
| A_ACTION_IMPLEMENTED_AS_INTENDED | Action implemented as intended? | UNCLEAR | Rapid rollover/control upset sequence | Cannot infer implementation state from outcome alone | Keeps A unresolved |
| A_ACTION_APPROPRIATE_TO_SITUATION | Action appropriate? | UNCLEAR | Helideck terminal context | Appropriateness requires deeper decomposition | Keeps A unresolved |
| A_OWN_ACTION_FEEDBACK_CHECK_FAILED | Own-action feedback/check failed? | UNCLEAR | Feedback/checking evidence template present | Own-action feedback loop not isolated | Keeps A unresolved |
| A_PHYSICAL_ERGONOMIC_ABILITY_IMPAIRED | Physical/ergonomic impairment? | UNCLEAR | Rotorcraft low-altitude dynamics | No explicit crew physical limitation; aircraft dynamics need decomposition | Keeps A unresolved |
| A_KNOWLEDGE_DECISION_LIMITATION | Knowledge/decision limitation? | UNCLEAR | No explicit knowledge limitation | Not established | Keeps A unresolved |
| A_ACTION_SELECTION_FAILURE | Wrong selection among alternatives? | UNCLEAR | Action mechanism evidence present but not decomposed | Not enough for action-selection proposal | Keeps A unresolved |
| A_TIME_PRESSURE_DOMINANT | Time pressure dominant? | UNCLEAR | Low-altitude terminal segment | Dominance not proven | Keeps A unresolved |
| A_PATH_RESULT | Path result for this draft | UNRESOLVED | Action evidence is relevant but not specific enough for a draft code | Evidence enrichment required | No action proposal |

- proposedP: UNRESOLVED
- proposedO: UNRESOLVED
- proposedA: UNRESOLVED
- proposedCodeStatus: UNRESOLVED_ONLY
- maturityStatus: EVIDENCE_ENRICHMENT_REQUIRED
- confidenceByAxis:
  - P: LOW
  - O: LOW
  - A: LOW
- rejectedAlternatives:
  - Action proposal rejected because terminal outcome is not enough to identify action mechanism.
  - Perception/objective paths rejected because evidence is not specific enough.
- downstreamLocks:
  - finalConclusionLocked: true
  - hfacsLocked: true
  - riskLocked: true
  - recommendationsLocked: true
  - fixturePromotionLocked: true
  - baselinePromotionLocked: true
- nextStepRecommendation: Enrich detailed terminal handling sequence before any axis proposal.

