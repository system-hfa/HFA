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

function buildAxisResult(input: {
  axis: PoaAxis
  statement: string | null
  evidence: string[]
  uncertainty: string[]
  fallbackReviewReason: string
  semanticGuardrails: string[]
  disallowedInterpretations: string[]
  contextRiskFlags?: string[]
}): PoaAxisClassification {
  const statement = input.statement || ''
  const hasStatement = statement.trim().length > 0
  const hasEvidence = input.evidence.length > 0
  const hasMaterialUncertainty = input.uncertainty.length > 0
  const hasContextRisk = (input.contextRiskFlags ?? []).length > 0

  const sufficientForClassification = hasStatement && hasEvidence && !hasMaterialUncertainty && !hasContextRisk
  if (sufficientForClassification) {
    return {
      axis: input.axis,
      selectedCode: 'UNRESOLVED_CLASSIFICATION_REQUIRED',
      status: 'CLASSIFIED',
      confidence: 'low',
      evidence: input.evidence,
      alternativesConsidered: ['REVIEW_REQUIRED', 'INSUFFICIENT_EVIDENCE'],
      rejectionReason: 'Classification codebook mapping intentionally deferred pending explicit axis taxonomy lock.',
      reviewReason: 'Manual confirmation required before any final code publication.',
      humanReviewRequired: true,
      evidenceSufficiency: 'sufficient',
      semanticGuardrails: input.semanticGuardrails,
      codeMeaning: 'Classification-eligible signal exists but code issuance remains controlled in this phase.',
      disallowedInterpretations: input.disallowedInterpretations,
    }
  }

  if (!hasStatement || !hasEvidence) {
    return {
      axis: input.axis,
      selectedCode: 'UNRESOLVED',
      status: 'INSUFFICIENT_EVIDENCE',
      confidence: 'low',
      evidence: input.evidence,
      alternativesConsidered: ['REVIEW_REQUIRED'],
      rejectionReason: input.fallbackReviewReason,
      reviewReason: 'No sufficient statement/evidence package to classify this axis.',
      humanReviewRequired: true,
      evidenceSufficiency: 'insufficient',
      semanticGuardrails: input.semanticGuardrails,
      codeMeaning: 'Insufficient evidence for controlled axis classification.',
      disallowedInterpretations: input.disallowedInterpretations,
    }
  }

  return {
    axis: input.axis,
    selectedCode: 'UNRESOLVED',
    status: 'REVIEW_REQUIRED',
    confidence: 'low',
    evidence: input.evidence,
    alternativesConsidered: ['INSUFFICIENT_EVIDENCE'],
    rejectionReason: input.fallbackReviewReason,
    reviewReason: hasMaterialUncertainty
      ? 'Material uncertainty remains in the statement package.'
      : 'Contextual risk flags prevent safe auto-classification.',
    humanReviewRequired: true,
    evidenceSufficiency: hasMaterialUncertainty ? 'partial' : 'sufficient',
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
  if (
    hasAny(raw, ['warning system did not generate an alert', 'failed to alert', 'degraded visual references']) &&
    hasAny(input.poaStatements.uncertaintyForEach.perception.join(' '), ['recognition timing', 'timing'])
  ) {
    perceptionContextRisks.push('perception_not_inferable_from_environment_or_warning_barrier_alone')
  }

  const objectiveContextRisks: string[] = []
  if (
    !hasAny(raw, ['intent', 'conscious', 'knowingly', 'rule awareness', 'deliberate']) ||
    hasAny(input.poaStatements.objectiveStatement || '', ['insufficient', 'not explicitly established'])
  ) {
    objectiveContextRisks.push('objective_intent_not_explicitly_supported')
  }

  const actionContextRisks: string[] = []
  if (
    hasAny(raw, ['low airspeed', 'high rate of descent']) &&
    hasAny(input.poaStatements.actionStatement || '', ['aircraft state'])
  ) {
    actionContextRisks.push('action_not_directly_inferable_from_aircraft_state_alone')
  }
  if (!hasAny(raw, ['physical inability', 'incapacidade fisica', 'ergonomic', 'ergonomica', 'motor limitation'])) {
    actionContextRisks.push('no_explicit_physical_ergonomic_inability_evidence')
  }

  const perception = buildAxisResult({
    axis: 'perception',
    statement: input.poaStatements.perceptionStatement,
    evidence: input.poaStatements.evidenceForEach.perception,
    uncertainty: input.poaStatements.uncertaintyForEach.perception,
    fallbackReviewReason: 'Perception axis requires review due to degraded-reference and recognition-timing uncertainty.',
    semanticGuardrails: [
      'Do not infer perception failure solely from degraded environment.',
      'Do not infer perception failure solely from warning barrier non-alert.',
    ],
    disallowedInterpretations: [
      'Automatic perception-failure coding from weather degradation only.',
      'Automatic perception-failure coding from warning-system non-alert only.',
    ],
    contextRiskFlags: perceptionContextRisks,
  })

  const objective = buildAxisResult({
    axis: 'objective',
    statement: input.poaStatements.objectiveStatement,
    evidence: input.poaStatements.evidenceForEach.objective,
    uncertainty: input.poaStatements.uncertaintyForEach.objective,
    fallbackReviewReason: 'Objective axis requires review because explicit intent/non-compliance evidence is absent.',
    semanticGuardrails: [
      'Do not classify objective deviation without explicit intent/rule-awareness evidence.',
      'Continuation context alone is not sufficient proof of conscious objective deviation.',
    ],
    disallowedInterpretations: [
      'Routine-violation objective classification without intent evidence.',
      'Conscious-deviation objective classification without explicit support.',
    ],
    contextRiskFlags: objectiveContextRisks,
  })

  const action = buildAxisResult({
    axis: 'action',
    statement: input.poaStatements.actionStatement,
    evidence: input.poaStatements.evidenceForEach.action,
    uncertainty: input.poaStatements.uncertaintyForEach.action,
    fallbackReviewReason: 'Action axis requires review due to missing control-input detail and aircraft-state/action separation uncertainty.',
    semanticGuardrails: [
      'Do not classify action inability without explicit physical/motor/ergonomic evidence.',
      'Do not collapse aircraft-state degradation into direct action-failure coding.',
    ],
    disallowedInterpretations: [
      'A-D/inability classification without explicit human physical limitation evidence.',
      'Action-failure classification from aircraft state alone.',
    ],
    contextRiskFlags: actionContextRisks,
  })

  return {
    perception,
    objective,
    action,
  }
}
