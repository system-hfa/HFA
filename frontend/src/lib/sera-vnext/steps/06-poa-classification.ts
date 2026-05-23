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

function axisDefaultReadyReason(axis: PoaAxis): string {
  if (axis === 'perception') {
    return 'Perception axis has minimum evidence and guardrail-safe posture for human review, with residual uncertainty tracked for waiver decision.'
  }
  if (axis === 'objective') {
    return 'Objective axis has minimum evidence and guardrail-safe posture for human review, with residual uncertainty tracked for waiver decision.'
  }
  return 'Action axis has minimum evidence and guardrail-safe posture for human review, with residual uncertainty tracked for waiver decision.'
}

function buildClassificationEligibility(input: {
  status: PoaAxisClassification['status']
  statement: string
  evidence: string[]
  linkedUncertainties: string[]
  linkedEvidence: string[]
  reviewReasonCode: string
  transitionCriteria: string[]
  semanticGuardrails: string[]
  requiredHumanDecision: string
  hasReviewTrace: boolean
  noFinalConclusionRequested: boolean
  noDownstreamOutputsRequested: boolean
  noAutoClassificationRequested: boolean
  essentialUnmetCriteria: string[]
  waivableCriteria: string[]
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

  const essentialFromChecks = checks.filter((c) => !c.passed && !c.isAbsoluteBlocker).map((c) => c.checkId)
  const absoluteFromChecks = checks.filter((c) => !c.passed && c.isAbsoluteBlocker).map((c) => c.checkId)

  const unmetCriteria = unique([...essentialFromChecks, ...input.essentialUnmetCriteria])
  const absoluteBlockers = unique([...absoluteFromChecks, ...input.absoluteBlockersFromAxis])
  const residualWaivable = unique(input.waivableCriteria)

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
    waiverRequired:
      !blockedByGuardrail &&
      ((eligibleForHumanClassification && residualWaivable.length > 0) ||
        (!eligibleForHumanClassification && (unmetCriteria.length > 0 || residualWaivable.length > 0))),
    waiverAllowed: !blockedByGuardrail,
    waiverProhibitedReason: blockedByGuardrail ? 'Absolute methodological blockers present.' : null,
    absoluteBlockers,
    whyBlocked: blockedByGuardrail ? absoluteBlockers.join('; ') : null,
    whyNotEligible:
      !blockedByGuardrail && !eligibleForHumanClassification
        ? unique([...unmetCriteria, ...residualWaivable]).join('; ')
        : null,
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
  baseBlockingForClassification: string[]
  contextRiskFlags?: string[]
  essentialUnmetCriteria: string[]
  waivableCriteria: string[]
  absoluteBlockersFromAxis: string[]
  noFinalConclusionRequested: boolean
  noDownstreamOutputsRequested: boolean
  noAutoClassificationRequested: boolean
}): PoaAxisClassification {
  const statement = input.statement || ''
  const hasStatement = statement.trim().length > 0
  const hasEvidence = input.evidence.length > 0

  const linkedUncertainties = [...input.uncertainty]
  const linkedEvidence = [...input.evidence]
  if (linkedUncertainties.length === 0 && linkedEvidence.length === 0) {
    linkedUncertainties.push(axisMissingEvidenceUncertainty(input.axis))
    linkedUncertainties.push(axisInsufficientMechanismUncertainty(input.axis))
  }

  const hasAbsoluteBlockers = input.absoluteBlockersFromAxis.length > 0
  const hasEssentialGaps = input.essentialUnmetCriteria.length > 0

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
      ...input.baseBlockingForClassification,
      'missing_statement_or_evidence',
      ...input.essentialUnmetCriteria.map((id) => `essential:${id}`),
      ...input.waivableCriteria.map((id) => `waivable:${id}`),
      ...input.absoluteBlockersFromAxis.map((id) => `absolute:${id}`),
    ])
  } else if (hasAbsoluteBlockers || hasEssentialGaps) {
    status = 'REVIEW_REQUIRED'
    reviewReason = hasAbsoluteBlockers
      ? 'Absolute methodological guardrail blockers prevent readiness transition.'
      : 'Essential readiness criteria are still unmet.'
    rejectionReason = input.fallbackReviewReason
    alternativesConsidered = ['READY_FOR_HUMAN_CLASSIFICATION', 'INSUFFICIENT_EVIDENCE']
    evidenceSufficiency = input.evidence.length > 0 ? 'partial' : 'insufficient'
    codeMeaning = 'Axis remains under controlled review pending essential/guardrail closure.'
    blockingForClassification = unique([
      ...input.baseBlockingForClassification,
      ...input.essentialUnmetCriteria.map((id) => `essential:${id}`),
      ...input.waivableCriteria.map((id) => `waivable:${id}`),
      ...input.absoluteBlockersFromAxis.map((id) => `absolute:${id}`),
      ...((input.contextRiskFlags ?? []).map((f) => `context_risk:${f}`)),
    ])
  } else {
    status = 'READY_FOR_HUMAN_CLASSIFICATION'
    reviewReason = 'Eligibility thresholds are met for human review; residual uncertainty is tracked as waivable.'
    rejectionReason = null
    alternativesConsidered = ['REVIEW_REQUIRED']
    evidenceSufficiency = 'sufficient'
    codeMeaning = 'Axis is eligible for human classification decision; automatic classification remains disabled.'
    blockingForClassification = unique([
      ...input.baseBlockingForClassification,
      ...input.waivableCriteria.map((id) => `waivable:${id}`),
    ])
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
    status,
    statement,
    evidence: input.evidence,
    linkedUncertainties,
    linkedEvidence,
    reviewReasonCode: input.reviewReasonCode,
    transitionCriteria: input.transitionCriteria,
    semanticGuardrails: input.semanticGuardrails,
    requiredHumanDecision: input.requiredHumanDecision,
    hasReviewTrace: Boolean(reviewTrace),
    noFinalConclusionRequested: input.noFinalConclusionRequested,
    noDownstreamOutputsRequested: input.noDownstreamOutputsRequested,
    noAutoClassificationRequested: input.noAutoClassificationRequested,
    essentialUnmetCriteria: input.essentialUnmetCriteria,
    waivableCriteria: input.waivableCriteria,
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

  const perceptionContextRisks: string[] = []
  if (hasAny(raw, ['warning system did not generate an alert', 'failed to alert'])) {
    perceptionContextRisks.push('warning_barrier_non_alert_present')
  }
  if (hasAny(raw, ['degraded visual references', 'poor visibility', 'low cloud'])) {
    perceptionContextRisks.push('degraded_visual_cue_quality')
  }

  const hasPerceptionCueAvailability = hasAny(perceptionEvidenceText, [
    'instrument',
    'visual',
    'cue',
    'flight path',
    'airspeed',
    'descent',
    'warning',
    'reference',
  ])
  const hasPerceptionRecognitionSignal = hasAny(
    perceptionEvidenceText + ' ' + input.poaStatements.uncertaintyForEach.perception.join(' '),
    ['recognition', 'recognized', 'timing', 'awareness', 'cue uptake']
  )

  const perceptionEssentialUnmet: string[] = []
  const perceptionWaivableCriteria: string[] = []
  const perceptionAbsoluteBlockers: string[] = []

  if (!hasPerceptionCueAvailability) {
    perceptionEssentialUnmet.push('cue_availability_evidence_missing')
  }
  if (!hasPerceptionRecognitionSignal) {
    perceptionWaivableCriteria.push('recognition_timeline_unresolved_but_waivable')
  }

  const perceptionFailureClaimed = hasAny(perceptionEvidenceText, [
    'perception failure',
    'failed to perceive',
    'did not perceive',
    'misperceived',
  ])
  const weatherOrWarningOnly =
    hasAny(perceptionEvidenceText, ['degraded visual', 'poor visibility', 'low cloud', 'warning']) &&
    !hasPerceptionCueAvailability
  if (perceptionFailureClaimed && weatherOrWarningOnly) {
    perceptionAbsoluteBlockers.push('perception_failure_inferred_from_weather_warning_without_cue_evidence')
  }

  const objectiveContextRisks: string[] = []
  if (!hasAny(raw, ['intent', 'conscious', 'knowingly', 'rule awareness', 'deliberate'])) {
    objectiveContextRisks.push('no_explicit_intent_or_rule_awareness_evidence')
  }
  if (hasAny(input.poaStatements.objectiveStatement || '', ['insufficient', 'not explicitly established'])) {
    objectiveContextRisks.push('objective_statement_marks_intent_uncertain')
  }

  const objectiveEssentialUnmet: string[] = []
  const objectiveWaivableCriteria: string[] = []
  const objectiveAbsoluteBlockers: string[] = []

  const hasObjectiveContextEvidence = hasAny(objectiveEvidenceText, [
    'approach continuation',
    'continuation',
    'goal context',
    'operational goal',
    'decision context',
  ])
  if (!hasObjectiveContextEvidence) {
    objectiveEssentialUnmet.push('objective_context_evidence_missing')
  }

  const hasObjectiveIntentEvidence = hasAny(objectiveEvidenceText, ['intent', 'conscious intent', 'deliberate intent'])
  if (!hasObjectiveIntentEvidence) {
    objectiveWaivableCriteria.push('explicit_intent_evidence_missing_but_waivable_for_human_review')
  }

  const hasRuleAwarenessEvidence = hasAny(objectiveEvidenceText, ['rule awareness', 'procedure awareness', 'knowingly'])
  const objectiveViolationClaimed = hasAny(objectiveEvidenceText, ['violation', 'deliberate deviation', 'conscious deviation'])
  if (objectiveViolationClaimed && !hasRuleAwarenessEvidence) {
    objectiveAbsoluteBlockers.push('objective_violation_claim_without_rule_awareness_evidence')
  }

  const actionContextRisks: string[] = []
  if (hasAny(raw, ['low airspeed', 'high rate of descent'])) {
    actionContextRisks.push('aircraft_state_signal_present')
  }
  if (hasAny(input.poaStatements.actionStatement || '', ['aircraft state'])) {
    actionContextRisks.push('action_statement_separates_aircraft_state_from_action_quality')
  }

  const actionEssentialUnmet: string[] = []
  const actionWaivableCriteria: string[] = []
  const actionAbsoluteBlockers: string[] = []

  const hasActionEvidence = hasAny(actionEvidenceText, [
    'continued',
    'continuation',
    'recovery',
    'control',
    'action',
  ])
  if (!hasActionEvidence) {
    actionEssentialUnmet.push('action_evidence_missing')
  }

  const hasSequenceSignal = !hasAny(input.poaStatements.uncertaintyForEach.action.join(' '), ['exact control-input sequence is not established'])
  if (!hasSequenceSignal) {
    actionWaivableCriteria.push('exact_control_input_sequence_unresolved_but_waivable')
  }

  const actorSpecificDemand = hasAny(raw, ['single pilot'])
  const hasActorActionLink = input.directActor.actorKind !== 'unknown' && input.directActor.actorKind !== 'system_or_condition_dominant'
  if (actorSpecificDemand && !hasActorActionLink) {
    actionEssentialUnmet.push('actor_action_link_missing_for_specific_actor_demand')
  } else if (!hasActorActionLink) {
    actionWaivableCriteria.push('actor_action_precision_unresolved_but_waivable')
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
    baseBlockingForClassification: [
      'recognition_timing_not_established',
      'degraded_visual_and_warning_context_not_disambiguated',
    ],
    contextRiskFlags: perceptionContextRisks,
    essentialUnmetCriteria: perceptionEssentialUnmet,
    waivableCriteria: perceptionWaivableCriteria,
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
    baseBlockingForClassification: [
      'objective_intent_not_explicitly_supported',
      'rule_awareness_not_demonstrated',
    ],
    contextRiskFlags: objectiveContextRisks,
    essentialUnmetCriteria: objectiveEssentialUnmet,
    waivableCriteria: objectiveWaivableCriteria,
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
    baseBlockingForClassification: [
      'exact_control_inputs_not_established',
      'actor_action_link_not_precise',
      'aircraft_state_not_equivalent_to_action_error',
      'a_d_blocked_without_physical_evidence',
    ],
    contextRiskFlags: actionContextRisks,
    essentialUnmetCriteria: actionEssentialUnmet,
    waivableCriteria: actionWaivableCriteria,
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
