import type {
  DirectActorAnalysis,
  FactualSummary,
  OperationalUnsafeState,
  PoaAxis,
  PoaAxisClassification,
  PoaClassification,
  PoaClassificationEligibility,
  PoaEligibilityCheck,
  PoaStatements,
  SeraVNextInput,
  UnsafeActConditionAnalysis,
} from '../types'

function hasAny(text: string, patterns: string[]): boolean {
  const t = text.toLowerCase()
  return patterns.some((p) => t.includes(p.toLowerCase()))
}

function unique(items: string[]): string[] {
  return [...new Set(items)]
}

function confidenceFromEvidence(size: number): 'low' | 'medium' | 'high' {
  if (size >= 3) return 'high'
  if (size === 2) return 'medium'
  return 'low'
}

function axisMissingEvidenceUncertainty(axis: PoaAxis): string {
  if (axis === 'perception') {
    return 'No perception-specific evidence was extracted from the neutral narrative.'
  }
  if (axis === 'objective') {
    return 'No objective/intent-specific evidence was extracted from the neutral narrative.'
  }
  return 'No action-execution-specific evidence was extracted from the neutral narrative.'
}

function axisInsufficientMechanismUncertainty(axis: PoaAxis): string {
  if (axis === 'perception') {
    return 'Insufficient evidence to determine cue recognition, cue uptake, or perception mechanism.'
  }
  if (axis === 'objective') {
    return 'Insufficient evidence to determine objective intent, conscious deviation, or rule awareness.'
  }
  return 'Insufficient evidence to determine concrete action execution, actor-action linkage, or action mechanism.'
}

function axisStandardBlocking(axis: PoaAxis): string[] {
  if (axis === 'perception') {
    return ['perception_specific_evidence_missing', 'cue_recognition_not_established']
  }
  if (axis === 'objective') {
    return ['objective_specific_evidence_missing', 'intent_rule_awareness_not_established']
  }
  return ['action_execution_specific_evidence_missing', 'actor_action_link_not_established']
}

function axisDefaultReadyReason(axis: PoaAxis): string {
  if (axis === 'perception') {
    return 'Perception axis meets eligibility gates and is ready for human classification decision.'
  }
  if (axis === 'objective') {
    return 'Objective axis meets eligibility gates and is ready for human classification decision.'
  }
  return 'Action axis meets eligibility gates and is ready for human classification decision.'
}

function buildClassificationEligibility(input: {
  axis: PoaAxis
  status: PoaAxisClassification['status']
  statement: string
  evidence: string[]
  linkedUncertainties: string[]
  linkedEvidence: string[]
  reviewReasonCode: string
  transitionCriteria: string[]
  semanticGuardrails: string[]
  requiredHumanDecision: string
  blockingForClassification: string[]
  hasReviewTrace: boolean
  noFinalConclusionRequested: boolean
  noDownstreamOutputsRequested: boolean
  noAutoClassificationRequested: boolean
  unmetCriteriaFromAxis: string[]
  absoluteBlockersFromAxis: string[]
  readyReason: string | null
}): PoaClassificationEligibility {
  const checks: PoaEligibilityCheck[] = [
    {
      checkId: 'ELIG-STATEMENT-PRESENT',
      passed: input.statement.trim().length > 0,
      details: 'Axis statement is present.',
      isAbsoluteBlocker: false,
    },
    {
      checkId: 'ELIG-EVIDENCE-NON-EMPTY',
      passed: input.evidence.length > 0,
      details: 'Axis evidence list is non-empty.',
      isAbsoluteBlocker: false,
    },
    {
      checkId: 'ELIG-REVIEW-TRACE-PRESENT',
      passed: input.hasReviewTrace,
      details: 'Axis reviewTrace is present.',
      isAbsoluteBlocker: false,
    },
    {
      checkId: 'ELIG-REVIEW-REASON-CODE-PRESENT',
      passed: input.reviewReasonCode.trim().length > 0,
      details: 'Axis reviewReasonCode is present.',
      isAbsoluteBlocker: false,
    },
    {
      checkId: 'ELIG-TRANSITION-CRITERIA-PRESENT',
      passed: input.transitionCriteria.length > 0,
      details: 'Axis transitionCriteria are present.',
      isAbsoluteBlocker: false,
    },
    {
      checkId: 'ELIG-SEMANTIC-GUARDRAILS-PRESENT',
      passed: input.semanticGuardrails.length > 0,
      details: 'Axis semanticGuardrails are present.',
      isAbsoluteBlocker: false,
    },
    {
      checkId: 'ELIG-REQUIRED-HUMAN-DECISION-PRESENT',
      passed: input.requiredHumanDecision.trim().length > 0,
      details: 'Axis requiredHumanDecision is present.',
      isAbsoluteBlocker: false,
    },
    {
      checkId: 'ELIG-AXIS-LINKED-TRACE-PRESENT',
      passed: input.linkedUncertainties.length > 0 || input.linkedEvidence.length > 0,
      details: 'Axis links uncertainty/evidence for auditability.',
      isAbsoluteBlocker: false,
    },
    {
      checkId: 'ELIG-BLOCKING-LIST-EMPTY',
      passed: input.blockingForClassification.length === 0,
      details: 'Axis blockingForClassification is empty for readiness.',
      isAbsoluteBlocker: false,
    },
    {
      checkId: 'ELIG-NO-FINAL-CONCLUSION-REQUEST',
      passed: input.noFinalConclusionRequested,
      details: 'No final conclusion request/field was detected in causal-core eligibility path.',
      isAbsoluteBlocker: true,
    },
    {
      checkId: 'ELIG-NO-DOWNSTREAM-HFACS-RISK-REQUEST',
      passed: input.noDownstreamOutputsRequested,
      details: 'No downstream HFACS/Risk/ERC/ARMS request/field was detected in causal-core eligibility path.',
      isAbsoluteBlocker: true,
    },
    {
      checkId: 'ELIG-NO-AUTO-CLASSIFICATION-REQUEST',
      passed: input.noAutoClassificationRequested,
      details: 'No automatic final classification request/field was detected in causal-core eligibility path.',
      isAbsoluteBlocker: true,
    },
  ]

  const unmetCriteria = unique([
    ...checks.filter((c) => !c.passed && !c.isAbsoluteBlocker).map((c) => c.checkId),
    ...input.unmetCriteriaFromAxis,
  ])

  const absoluteBlockers = unique([
    ...input.absoluteBlockersFromAxis,
    ...checks.filter((c) => !c.passed && c.isAbsoluteBlocker).map((c) => c.checkId),
  ])

  const blockedByGuardrail = absoluteBlockers.length > 0
  const eligibleForHumanClassification =
    !blockedByGuardrail && unmetCriteria.length === 0 && input.status === 'READY_FOR_HUMAN_CLASSIFICATION'

  const eligibilityStatus = blockedByGuardrail
    ? 'BLOCKED_BY_GUARDRAIL'
    : eligibleForHumanClassification
      ? 'ELIGIBLE_FOR_HUMAN_REVIEW'
      : 'NOT_ELIGIBLE'

  return {
    eligibilityStatus,
    eligibleForHumanClassification,
    eligibilityChecks: checks,
    unmetCriteria,
    waiverRequired: !blockedByGuardrail && !eligibleForHumanClassification && unmetCriteria.length > 0,
    waiverAllowed: !blockedByGuardrail,
    waiverProhibitedReason: blockedByGuardrail ? 'Absolute methodological blockers present.' : null,
    absoluteBlockers,
    whyBlocked: blockedByGuardrail ? absoluteBlockers.join('; ') : null,
    whyNotEligible: !blockedByGuardrail && !eligibleForHumanClassification ? unmetCriteria.join('; ') : null,
    readyForHumanClassificationReason: eligibleForHumanClassification ? input.readyReason : null,
  }
}

function buildAxisResult(input: {
  axis: PoaAxis
  statement: string | null
  evidence: string[]
  uncertainty: string[]
  fallbackReviewReason: string
  reviewReasonCode: string
  semanticGuardrails: string[]
  disallowedInterpretations: string[]
  requiredHumanDecision: string
  transitionCriteria: string[]
  blockingForClassification: string[]
  contextRiskFlags?: string[]
  unmetCriteriaFromAxis: string[]
  absoluteBlockersFromAxis: string[]
  noFinalConclusionRequested: boolean
  noDownstreamOutputsRequested: boolean
  noAutoClassificationRequested: boolean
}): PoaAxisClassification {
  const statement = input.statement || ''
  const hasStatement = statement.trim().length > 0
  const hasEvidence = input.evidence.length > 0
  const hasMaterialUncertainty = input.uncertainty.length > 0
  const hasContextRisk = (input.contextRiskFlags ?? []).length > 0

  const linkedUncertainties = [...input.uncertainty]
  const linkedEvidence = [...input.evidence]
  if (linkedUncertainties.length === 0 && linkedEvidence.length === 0) {
    linkedUncertainties.push(axisMissingEvidenceUncertainty(input.axis))
    linkedUncertainties.push(axisInsufficientMechanismUncertainty(input.axis))
  }

  let status: PoaAxisClassification['status']
  let reviewReason: string
  let rejectionReason: string | null
  let alternativesConsidered: string[]
  let evidenceSufficiency: PoaAxisClassification['evidenceSufficiency']
  let codeMeaning: string
  let blockingForClassification: string[]

  if (!hasStatement || !hasEvidence) {
    status = 'INSUFFICIENT_EVIDENCE'
    reviewReason = 'No sufficient statement/evidence package to classify this axis.'
    rejectionReason = input.fallbackReviewReason
    alternativesConsidered = ['REVIEW_REQUIRED', 'READY_FOR_HUMAN_CLASSIFICATION']
    evidenceSufficiency = 'insufficient'
    codeMeaning = 'Insufficient evidence for controlled axis classification.'
    blockingForClassification = unique([
      ...input.blockingForClassification,
      ...axisStandardBlocking(input.axis),
      'missing_statement_or_evidence',
      ...input.unmetCriteriaFromAxis.map((id) => `eligibility_gate:${id}`),
    ])
  } else if (hasMaterialUncertainty || hasContextRisk || input.unmetCriteriaFromAxis.length > 0 || input.absoluteBlockersFromAxis.length > 0) {
    status = 'REVIEW_REQUIRED'
    reviewReason = hasMaterialUncertainty
      ? 'Material uncertainty remains in the statement package.'
      : hasContextRisk
        ? 'Contextual risk flags prevent safe readiness transition.'
        : 'Eligibility criteria are not yet satisfied for human classification readiness.'
    rejectionReason = input.fallbackReviewReason
    alternativesConsidered = ['READY_FOR_HUMAN_CLASSIFICATION', 'INSUFFICIENT_EVIDENCE']
    evidenceSufficiency = hasMaterialUncertainty || hasContextRisk ? 'partial' : 'sufficient'
    codeMeaning = 'Axis remains under controlled review pending eligibility closure.'
    blockingForClassification = unique([
      ...input.blockingForClassification,
      ...axisStandardBlocking(input.axis),
      ...(hasMaterialUncertainty ? ['material_uncertainty_present'] : []),
      ...((input.contextRiskFlags ?? []).map((f) => `context_risk:${f}`)),
      ...input.unmetCriteriaFromAxis.map((id) => `eligibility_gate:${id}`),
      ...input.absoluteBlockersFromAxis.map((id) => `guardrail_blocker:${id}`),
    ])
  } else {
    status = 'READY_FOR_HUMAN_CLASSIFICATION'
    reviewReason = 'Eligibility checks satisfied; pending explicit human review decision.'
    rejectionReason = null
    alternativesConsidered = ['REVIEW_REQUIRED']
    evidenceSufficiency = 'sufficient'
    codeMeaning = 'Axis is eligible for human classification decision; automatic classification remains disabled.'
    blockingForClassification = []
  }

  const reviewTrace = {
    reviewReason,
    reviewReasonCode: input.reviewReasonCode,
    linkedUncertainties,
    linkedEvidence,
    blockingForClassification,
    requiredHumanDecision: input.requiredHumanDecision,
    transitionCriteria: input.transitionCriteria,
  }

  const classificationEligibility = buildClassificationEligibility({
    axis: input.axis,
    status,
    statement,
    evidence: input.evidence,
    linkedUncertainties,
    linkedEvidence,
    reviewReasonCode: input.reviewReasonCode,
    transitionCriteria: input.transitionCriteria,
    semanticGuardrails: input.semanticGuardrails,
    requiredHumanDecision: input.requiredHumanDecision,
    blockingForClassification,
    hasReviewTrace: Boolean(reviewTrace),
    noFinalConclusionRequested: input.noFinalConclusionRequested,
    noDownstreamOutputsRequested: input.noDownstreamOutputsRequested,
    noAutoClassificationRequested: input.noAutoClassificationRequested,
    unmetCriteriaFromAxis: input.unmetCriteriaFromAxis,
    absoluteBlockersFromAxis: input.absoluteBlockersFromAxis,
    readyReason: axisDefaultReadyReason(input.axis),
  })

  return {
    axis: input.axis,
    selectedCode: 'UNRESOLVED',
    status,
    confidence: status === 'INSUFFICIENT_EVIDENCE' ? 'low' : confidenceFromEvidence(linkedEvidence.length),
    evidence: linkedEvidence,
    alternativesConsidered,
    rejectionReason,
    reviewReason,
    reviewReasonCode: input.reviewReasonCode,
    linkedUncertainties,
    linkedEvidence,
    blockingForClassification,
    requiredHumanDecision: input.requiredHumanDecision,
    transitionCriteria: input.transitionCriteria,
    reviewTrace,
    humanReviewRequired: true,
    evidenceSufficiency,
    semanticGuardrails: input.semanticGuardrails,
    codeMeaning,
    disallowedInterpretations: input.disallowedInterpretations,
    classificationEligibility,
  }
}

export function runStep06PoaClassification(input: {
  input: SeraVNextInput
  factualSummary: FactualSummary
  unsafeState: OperationalUnsafeState
  unsafeActCondition: UnsafeActConditionAnalysis
  directActor: DirectActorAnalysis
  poaStatements: PoaStatements
}): PoaClassification {
  const raw = input.input.narrative

  const noFinalConclusionRequested = !hasAny(raw, ['final conclusion', 'conclusão final'])
  const noDownstreamOutputsRequested = !hasAny(raw, ['hfacs', 'risk/erc', 'erc_level', 'arms/erc'])
  const noAutoClassificationRequested = !hasAny(raw, ['auto classify', 'automatic classification', 'emit classified'])

  const perceptionEvidenceText = [
    input.poaStatements.perceptionStatement || '',
    ...input.poaStatements.evidenceForEach.perception,
  ].join(' ')
  const objectiveEvidenceText = [
    input.poaStatements.objectiveStatement || '',
    ...input.poaStatements.evidenceForEach.objective,
  ].join(' ')
  const actionEvidenceText = [
    input.poaStatements.actionStatement || '',
    ...input.poaStatements.evidenceForEach.action,
  ].join(' ')

  const perceptionContextRisks: string[] = []
  if (hasAny(raw, ['warning system did not generate an alert', 'failed to alert'])) {
    perceptionContextRisks.push('warning_barrier_non_alert_present')
  }
  if (hasAny(raw, ['degraded visual references', 'poor visibility', 'low cloud'])) {
    perceptionContextRisks.push('degraded_visual_cue_quality')
  }
  if (hasAny(input.poaStatements.uncertaintyForEach.perception.join(' '), ['recognition timing', 'timing'])) {
    perceptionContextRisks.push('recognition_timing_not_established')
  }

  const perceptionUnmetCriteria: string[] = []
  const perceptionAbsoluteBlockers: string[] = []

  const hasPerceptionCueAvailability = hasAny(perceptionEvidenceText, [
    'instrument',
    'visual',
    'cue',
    'flight path',
    'airspeed',
    'descent',
    'warning',
  ])
  if (!hasPerceptionCueAvailability) {
    perceptionUnmetCriteria.push('cue_availability_evidence_missing')
  }

  const hasPerceptionRecognitionTimelineEvidence = hasAny(perceptionEvidenceText, [
    'recognized',
    'recognition timeline',
    'recognized late',
    'cue uptake',
  ])
  if (!hasPerceptionRecognitionTimelineEvidence) {
    perceptionUnmetCriteria.push('cue_uptake_or_recognition_timeline_not_established')
  }

  const perceptionFailureClaimed = hasAny(perceptionEvidenceText, [
    'perception failure',
    'failed to perceive',
    'did not perceive',
    'misperceived',
  ])
  const weatherOrWarningContextOnly =
    hasAny(perceptionEvidenceText, ['degraded visual', 'poor visibility', 'low cloud', 'warning']) &&
    !hasPerceptionRecognitionTimelineEvidence
  if (perceptionFailureClaimed && weatherOrWarningContextOnly) {
    perceptionAbsoluteBlockers.push('perception_failure_inferred_from_weather_or_warning_alone')
  }

  const objectiveContextRisks: string[] = []
  if (!hasAny(raw, ['intent', 'conscious', 'knowingly', 'rule awareness', 'deliberate'])) {
    objectiveContextRisks.push('no_explicit_intent_or_rule_awareness_evidence')
  }
  if (hasAny(input.poaStatements.objectiveStatement || '', ['insufficient', 'not explicitly established'])) {
    objectiveContextRisks.push('objective_statement_marks_intent_uncertain')
  }

  const objectiveUnmetCriteria: string[] = []
  const objectiveAbsoluteBlockers: string[] = []

  const hasObjectiveIntentEvidence = hasAny(objectiveEvidenceText, ['intent', 'objective intent', 'goal intent', 'conscious intent'])
  if (!hasObjectiveIntentEvidence) {
    objectiveUnmetCriteria.push('objective_intent_evidence_missing')
  }

  const hasRuleAwarenessEvidence = hasAny(objectiveEvidenceText, ['rule awareness', 'procedure awareness', 'knowingly'])
  const objectiveViolationClaimed = hasAny(objectiveEvidenceText, ['violation', 'deliberate deviation', 'conscious deviation'])
  if (objectiveViolationClaimed && !hasRuleAwarenessEvidence) {
    objectiveAbsoluteBlockers.push('objective_violation_without_intent_or_rule_awareness_evidence')
  }

  if (hasAny(objectiveEvidenceText, ['continuation']) && !hasObjectiveIntentEvidence) {
    objectiveUnmetCriteria.push('continuation_context_not_equivalent_to_intent_evidence')
  }

  const actionContextRisks: string[] = []
  if (hasAny(raw, ['low airspeed', 'high rate of descent'])) {
    actionContextRisks.push('aircraft_state_signal_present')
  }
  if (hasAny(input.poaStatements.actionStatement || '', ['aircraft state'])) {
    actionContextRisks.push('action_statement_separates_aircraft_state_from_action_quality')
  }
  if (hasAny(input.poaStatements.uncertaintyForEach.action.join(' '), ['Exact control-input sequence is not established'])) {
    actionContextRisks.push('exact_control_inputs_missing')
  }
  if (hasAny(input.directActor.uncertainty.join(' '), ['PF/PM'])) {
    actionContextRisks.push('direct_actor_pf_pm_precision_missing')
  }
  if (!hasAny(raw, ['physical inability', 'incapacidade fisica', 'ergonomic', 'ergonomica', 'motor limitation'])) {
    actionContextRisks.push('no_physical_motor_ergonomic_inability_evidence')
  }

  const actionUnmetCriteria: string[] = []
  const actionAbsoluteBlockers: string[] = []

  const hasConcreteActionEvidence = hasAny(actionEvidenceText, [
    'continued',
    'continuation',
    'recovery',
    'control input',
    'action sequence',
    'non-action',
  ])
  if (!hasConcreteActionEvidence) {
    actionUnmetCriteria.push('concrete_action_or_non_action_evidence_missing')
  }

  const hasActorActionLink = input.directActor.actorKind !== 'unknown' && input.directActor.actorKind !== 'system_or_condition_dominant'
  if (!hasActorActionLink) {
    actionUnmetCriteria.push('actor_action_link_not_established')
  }

  const hasSequenceOrTimingEvidence = !hasAny(input.poaStatements.uncertaintyForEach.action.join(' '), [
    'not established',
    'exact control-input',
    'timing',
  ])
  if (!hasSequenceOrTimingEvidence) {
    actionUnmetCriteria.push('sequence_or_timing_evidence_missing')
  }

  const actionFailureClaimed = hasAny(actionEvidenceText, ['action failure', 'execution failure', 'performance failure'])
  const aircraftStateOnly =
    hasAny(actionEvidenceText, ['aircraft state', 'low-airspeed', 'high-descent']) &&
    !hasAny(actionEvidenceText, ['control input', 'callout', 'timing sequence'])
  if (actionFailureClaimed && aircraftStateOnly) {
    actionAbsoluteBlockers.push('aircraft_state_or_unsafe_condition_collapsed_into_action_failure')
  }

  const inabilityClaimed = hasAny(actionEvidenceText, ['inability', 'unable', 'could not physically'])
  const hasPhysicalMotorErgonomicEvidence = hasAny(raw + ' ' + actionEvidenceText, [
    'physical inability',
    'motor limitation',
    'ergonomic',
    'restricted movement',
    'ppe',
    'epi',
    'force/reach',
  ])
  if (inabilityClaimed && !hasPhysicalMotorErgonomicEvidence) {
    actionAbsoluteBlockers.push('a_d_inability_attempt_without_physical_motor_ergonomic_evidence')
  }

  const commonAbsoluteBlockers: string[] = []
  if (!noFinalConclusionRequested) {
    commonAbsoluteBlockers.push('final_conclusion_request_detected')
  }
  if (!noDownstreamOutputsRequested) {
    commonAbsoluteBlockers.push('downstream_hfacs_or_risk_request_detected')
  }
  if (!noAutoClassificationRequested) {
    commonAbsoluteBlockers.push('automatic_final_classification_request_detected')
  }

  const perception = buildAxisResult({
    axis: 'perception',
    statement: input.poaStatements.perceptionStatement,
    evidence: input.poaStatements.evidenceForEach.perception,
    uncertainty: input.poaStatements.uncertaintyForEach.perception,
    fallbackReviewReason: 'Perception axis requires review due to degraded cues, warning-barrier limitations, and recognition-timing uncertainty.',
    reviewReasonCode: 'PERCEPTION_RECOGNITION_TRACE_REQUIRED',
    semanticGuardrails: [
      'Do not infer perception failure solely from degraded environment.',
      'Do not infer perception failure solely from warning barrier non-alert.',
    ],
    disallowedInterpretations: [
      'Automatic perception-failure coding from weather degradation only.',
      'Automatic perception-failure coding from warning-system non-alert only.',
    ],
    requiredHumanDecision:
      'Human reviewer must determine when/how available cues were recognized or not recognized before any perception-axis classification.',
    transitionCriteria: [
      'Evidence of recognition timeline and cue processing sequence by crew roles.',
      'Evidence separating cue availability from cue uptake/interpretation timing.',
      'Corroboration beyond degraded-visual and warning-barrier context alone.',
    ],
    blockingForClassification: [
      'recognition_timing_not_established',
      'degraded_visual_and_warning_context_not_disambiguated',
    ],
    contextRiskFlags: perceptionContextRisks,
    unmetCriteriaFromAxis: perceptionUnmetCriteria,
    absoluteBlockersFromAxis: [...perceptionAbsoluteBlockers, ...commonAbsoluteBlockers],
    noFinalConclusionRequested,
    noDownstreamOutputsRequested,
    noAutoClassificationRequested,
  })

  const objective = buildAxisResult({
    axis: 'objective',
    statement: input.poaStatements.objectiveStatement,
    evidence: input.poaStatements.evidenceForEach.objective,
    uncertainty: input.poaStatements.uncertaintyForEach.objective,
    fallbackReviewReason: 'Objective axis requires review because explicit intent/non-compliance evidence is absent.',
    reviewReasonCode: 'OBJECTIVE_INTENT_EVIDENCE_REQUIRED',
    semanticGuardrails: [
      'Do not classify objective deviation without explicit intent/rule-awareness evidence.',
      'Continuation context alone is not sufficient proof of conscious objective deviation.',
    ],
    disallowedInterpretations: [
      'Routine-violation objective classification without intent evidence.',
      'Conscious-deviation objective classification without explicit support.',
    ],
    requiredHumanDecision:
      'Human reviewer must confirm objective/intent/rule-awareness evidence before any violation-style objective classification.',
    transitionCriteria: [
      'Direct evidence of intent framing at decision moment.',
      'Explicit evidence of rule awareness/non-compliance awareness.',
      'Evidence distinguishing continuation context from conscious deviation.',
    ],
    blockingForClassification: [
      'objective_intent_not_explicitly_supported',
      'rule_awareness_not_demonstrated',
    ],
    contextRiskFlags: objectiveContextRisks,
    unmetCriteriaFromAxis: objectiveUnmetCriteria,
    absoluteBlockersFromAxis: [...objectiveAbsoluteBlockers, ...commonAbsoluteBlockers],
    noFinalConclusionRequested,
    noDownstreamOutputsRequested,
    noAutoClassificationRequested,
  })

  const action = buildAxisResult({
    axis: 'action',
    statement: input.poaStatements.actionStatement,
    evidence: input.poaStatements.evidenceForEach.action,
    uncertainty: input.poaStatements.uncertaintyForEach.action,
    fallbackReviewReason: 'Action axis requires review due to missing control-input detail and aircraft-state/action separation uncertainty.',
    reviewReasonCode: 'ACTION_EXECUTION_EVIDENCE_REQUIRED',
    semanticGuardrails: [
      'Do not classify action inability without explicit physical/motor/ergonomic evidence.',
      'Do not collapse aircraft-state degradation into direct action-failure coding.',
    ],
    disallowedInterpretations: [
      'A-D/inability classification without explicit human physical limitation evidence.',
      'Action-failure classification from aircraft state alone.',
    ],
    requiredHumanDecision:
      'Human reviewer must validate concrete action-execution evidence and confirm separation between aircraft state and action quality.',
    transitionCriteria: [
      'Direct evidence of concrete control action/non-action sequence.',
      'Evidence linking actor to specific control inputs and timing.',
      'Evidence proving or disproving physical/motor/ergonomic inability before any inability-style action classification.',
    ],
    blockingForClassification: [
      'exact_control_inputs_not_established',
      'actor_action_link_not_precise',
      'aircraft_state_not_equivalent_to_action_error',
      'a_d_blocked_without_physical_evidence',
    ],
    contextRiskFlags: actionContextRisks,
    unmetCriteriaFromAxis: actionUnmetCriteria,
    absoluteBlockersFromAxis: [...actionAbsoluteBlockers, ...commonAbsoluteBlockers],
    noFinalConclusionRequested,
    noDownstreamOutputsRequested,
    noAutoClassificationRequested,
  })

  return {
    perception,
    objective,
    action,
  }
}
