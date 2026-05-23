import type {
  DirectActorAnalysis,
  FactualSummary,
  OperationalUnsafeState,
  PoaAxis,
  PoaAxisClassification,
  PoaClassification,
  PoaStatements,
  SeraVNextInput,
  UnsafeActConditionAnalysis,
} from '../types'

function hasAny(text: string, patterns: string[]): boolean {
  const t = text.toLowerCase()
  return patterns.some((p) => t.includes(p.toLowerCase()))
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
}): PoaAxisClassification {
  const statement = input.statement || ''
  const hasStatement = statement.trim().length > 0
  const hasEvidence = input.evidence.length > 0
  const hasMaterialUncertainty = input.uncertainty.length > 0
  const hasContextRisk = (input.contextRiskFlags ?? []).length > 0

  const baseBlocking = [...input.blockingForClassification, ...axisStandardBlocking(input.axis)]

  const linkedUncertainties = [...input.uncertainty]
  const linkedEvidence = [...input.evidence]
  if (linkedUncertainties.length === 0 && linkedEvidence.length === 0) {
    linkedUncertainties.push(axisMissingEvidenceUncertainty(input.axis))
    linkedUncertainties.push(axisInsufficientMechanismUncertainty(input.axis))
  }

  if (!hasStatement || !hasEvidence) {
    const reviewReason = 'No sufficient statement/evidence package to classify this axis.'
    const blocking = [...new Set([...baseBlocking, 'missing_statement_or_evidence'])]
    return {
      axis: input.axis,
      selectedCode: 'UNRESOLVED',
      status: 'INSUFFICIENT_EVIDENCE',
      confidence: 'low',
      evidence: linkedEvidence,
      alternativesConsidered: ['REVIEW_REQUIRED'],
      rejectionReason: input.fallbackReviewReason,
      reviewReason,
      reviewReasonCode: input.reviewReasonCode,
      linkedUncertainties,
      linkedEvidence,
      blockingForClassification: blocking,
      requiredHumanDecision: input.requiredHumanDecision,
      transitionCriteria: input.transitionCriteria,
      reviewTrace: {
        reviewReason,
        reviewReasonCode: input.reviewReasonCode,
        linkedUncertainties,
        linkedEvidence,
        blockingForClassification: blocking,
        requiredHumanDecision: input.requiredHumanDecision,
        transitionCriteria: input.transitionCriteria,
      },
      humanReviewRequired: true,
      evidenceSufficiency: 'insufficient',
      semanticGuardrails: input.semanticGuardrails,
      codeMeaning: 'Insufficient evidence for controlled axis classification.',
      disallowedInterpretations: input.disallowedInterpretations,
    }
  }

  const reviewReason = hasMaterialUncertainty
    ? 'Material uncertainty remains in the statement package.'
    : hasContextRisk
      ? 'Contextual risk flags prevent safe auto-classification.'
      : input.fallbackReviewReason

  const blocking = [...new Set([
    ...baseBlocking,
    ...(hasMaterialUncertainty ? ['material_uncertainty_present'] : []),
    ...((input.contextRiskFlags ?? []).map((f) => `context_risk:${f}`)),
  ])]

  return {
    axis: input.axis,
    selectedCode: 'UNRESOLVED',
    status: 'REVIEW_REQUIRED',
    confidence: confidenceFromEvidence(linkedEvidence.length),
    evidence: linkedEvidence,
    alternativesConsidered: ['INSUFFICIENT_EVIDENCE'],
    rejectionReason: input.fallbackReviewReason,
    reviewReason,
    reviewReasonCode: input.reviewReasonCode,
    linkedUncertainties,
    linkedEvidence,
    blockingForClassification: blocking,
    requiredHumanDecision: input.requiredHumanDecision,
    transitionCriteria: input.transitionCriteria,
    reviewTrace: {
      reviewReason,
      reviewReasonCode: input.reviewReasonCode,
      linkedUncertainties,
      linkedEvidence,
      blockingForClassification: blocking,
      requiredHumanDecision: input.requiredHumanDecision,
      transitionCriteria: input.transitionCriteria,
    },
    humanReviewRequired: true,
    evidenceSufficiency: hasMaterialUncertainty || hasContextRisk ? 'partial' : 'sufficient',
    semanticGuardrails: input.semanticGuardrails,
    codeMeaning: 'Axis requires controlled human review before classification release.',
    disallowedInterpretations: input.disallowedInterpretations,
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

  const objectiveContextRisks: string[] = []
  if (!hasAny(raw, ['intent', 'conscious', 'knowingly', 'rule awareness', 'deliberate'])) {
    objectiveContextRisks.push('no_explicit_intent_or_rule_awareness_evidence')
  }
  if (hasAny(input.poaStatements.objectiveStatement || '', ['insufficient', 'not explicitly established'])) {
    objectiveContextRisks.push('objective_statement_marks_intent_uncertain')
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
  })

  return {
    perception,
    objective,
    action,
  }
}
