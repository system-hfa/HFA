import { SERA_VNEXT_FORBIDDEN_DOWNSTREAM_OUTPUTS, SERA_VNEXT_STATUS } from '../constants'
import type {
  CausalAssurance,
  DirectActorAnalysis,
  FactualSummary,
  Limitation,
  OperationalUnsafeState,
  PoaAxisClassification,
  PoaClassification,
  PoaStatements,
  PreconditionsAnalysis,
  UnsafeActConditionAnalysis,
} from '../types'

function hasAny(text: string, patterns: string[]): boolean {
  const t = text.toLowerCase()
  return patterns.some((p) => t.includes(p.toLowerCase()))
}

function unresolved(axis: PoaAxisClassification): boolean {
  return axis.status === 'REVIEW_REQUIRED' || axis.status === 'INSUFFICIENT_EVIDENCE'
}

export function runStep10CausalAssurance(input: {
  factualSummary: FactualSummary
  unsafeState: OperationalUnsafeState
  unsafeActCondition: UnsafeActConditionAnalysis
  directActor: DirectActorAnalysis
  poaStatements: PoaStatements
  limitations: Limitation[]
  poaClassification: PoaClassification
  preconditions: PreconditionsAnalysis
}): CausalAssurance {
  const checks: CausalAssurance['checks'] = []

  checks.push({
    checkId: 'CHK-VNEXT-POA-GATEWAY-NOT-FINAL',
    passed: false,
    details: 'P/O/A gateway is controlled and not final-release validated yet.',
  })

  const hasForbiddenDownstreamFields = [
    Object.prototype.hasOwnProperty.call(input as Record<string, unknown>, 'hfacs'),
    Object.prototype.hasOwnProperty.call(input as Record<string, unknown>, 'risk'),
    Object.prototype.hasOwnProperty.call(input as Record<string, unknown>, 'erc_level'),
    Object.prototype.hasOwnProperty.call(input as Record<string, unknown>, 'arms'),
  ].some(Boolean)

  checks.push({
    checkId: 'CHK-NO-HFACS-RISK-ERC-FIELDS',
    passed: !hasForbiddenDownstreamFields,
    details: hasForbiddenDownstreamFields
      ? 'Unexpected downstream field detected in causal scope.'
      : 'No HFACS/Risk/ERC/ARMS field present in causal scope.',
  })

  const hasOperationalUnsafeState = Boolean(input.unsafeState.operationalUnsafeState)
  checks.push({
    checkId: 'CHK-OPERATIONAL-UNSAFE-STATE-PRESENT',
    passed: hasOperationalUnsafeState,
    details: hasOperationalUnsafeState
      ? 'Operational unsafe state is explicitly present.'
      : 'Operational unsafe state is missing.',
  })

  const hasSeparatedDecisionAntecedents =
    Array.isArray(input.unsafeState.decisionAntecedents) &&
    input.unsafeState.decisionAntecedents.length > 0
  checks.push({
    checkId: 'CHK-DECISION-ANTECEDENTS-SEPARATED',
    passed: hasSeparatedDecisionAntecedents,
    details: hasSeparatedDecisionAntecedents
      ? 'Decision antecedents are represented separately.'
      : 'Decision antecedents are missing.',
  })

  const missingDataPreserved =
    input.factualSummary.missingData.length === 0 ||
    input.limitations.length > 0 ||
    input.unsafeActCondition.unsafeAct.uncertainty.length > 0 ||
    input.unsafeActCondition.unsafeCondition.uncertainty.length > 0
  checks.push({
    checkId: 'CHK-MISSING-DATA-PRESERVED',
    passed: missingDataPreserved,
    details: missingDataPreserved
      ? 'Missing-data uncertainty is preserved.'
      : 'Missing-data uncertainty is not preserved.',
  })

  const directActorNoOvercommit = !(
    input.directActor.actorKind === 'specific_actor' &&
    hasAny(input.directActor.uncertainty.join(' '), ['pf/pm', 'not established'])
  )
  checks.push({
    checkId: 'CHK-DIRECT-ACTOR-NO-OVERCOMMIT',
    passed: directActorNoOvercommit,
    details: directActorNoOvercommit
      ? 'Direct actor does not overcommit without PF/PM precision.'
      : 'Direct actor overcommits despite PF/PM uncertainty.',
  })

  const statementsPresent = Boolean(
    input.poaStatements.perceptionStatement &&
      input.poaStatements.objectiveStatement &&
      input.poaStatements.actionStatement
  )
  checks.push({
    checkId: 'CHK-POA-STATEMENTS-PRESENT',
    passed: statementsPresent,
    details: statementsPresent ? 'All P/O/A statements are present.' : 'One or more P/O/A statements are missing.',
  })

  const statementsText = [
    input.poaStatements.perceptionStatement || '',
    input.poaStatements.objectiveStatement || '',
    input.poaStatements.actionStatement || '',
  ].join(' ')

  const statementsContainCodes = hasAny(statementsText, [
    'P-A', 'P-B', 'P-C', 'P-D', 'P-E', 'P-F', 'P-G', 'P-H',
    'O-A', 'O-B', 'O-C', 'O-D', 'O-E',
    'A-A', 'A-B', 'A-C', 'A-D', 'A-E', 'A-F', 'A-G', 'A-H', 'A-I', 'A-J',
  ])
  checks.push({
    checkId: 'CHK-STATEMENTS-NO-SERA-CODES',
    passed: !statementsContainCodes,
    details: statementsContainCodes
      ? 'Statements contain SERA code tokens, which is not allowed.'
      : 'Statements do not contain SERA code tokens.',
  })

  const noActiveFailureWording = !hasAny(statementsText, [
    'falha de',
    'failure code',
    'routine violation',
    'perception failure',
    'objective failure',
    'action failure',
  ])
  checks.push({
    checkId: 'CHK-STATEMENTS-NEUTRAL-WORDING',
    passed: noActiveFailureWording,
    details: noActiveFailureWording
      ? 'Statements use neutral wording.'
      : 'Statements include forbidden active-failure wording.',
  })

  const axes = [
    input.poaClassification.perception,
    input.poaClassification.objective,
    input.poaClassification.action,
  ]

  const noAxisClassifiedWithoutSufficientEvidence = axes.every(
    (axis) => !(axis.status === 'CLASSIFIED' && axis.evidenceSufficiency !== 'sufficient')
  )
  checks.push({
    checkId: 'CHK-NO-CLASSIFICATION-WITHOUT-SUFFICIENT-EVIDENCE',
    passed: noAxisClassifiedWithoutSufficientEvidence,
    details: noAxisClassifiedWithoutSufficientEvidence
      ? 'No axis is classified without sufficient evidence.'
      : 'An axis was classified without sufficient evidence.',
  })

  const noAxisClassifiedWithBlocking = axes.every(
    (axis) => !(axis.status === 'CLASSIFIED' && axis.blockingForClassification.length > 0)
  )
  checks.push({
    checkId: 'CHK-NO-CLASSIFIED-WITH-BLOCKING-ITEMS',
    passed: noAxisClassifiedWithBlocking,
    details: noAxisClassifiedWithBlocking
      ? 'No axis is classified while blocking items remain.'
      : 'At least one axis is classified despite non-empty blocking list.',
  })

  const objectiveNoViolationWithoutIntent =
    input.poaClassification.objective.status !== 'CLASSIFIED' ||
    !hasAny(input.poaClassification.objective.reviewReason || '', ['intent'])
  checks.push({
    checkId: 'CHK-OBJECTIVE-NO-VIOLATION-WITHOUT-INTENT',
    passed: objectiveNoViolationWithoutIntent,
    details: objectiveNoViolationWithoutIntent
      ? 'Objective axis does not overclassify unsupported intent.'
      : 'Objective axis appears classified despite missing explicit intent evidence.',
  })

  const actionNoAdWithoutPhysicalEvidence =
    input.poaClassification.action.selectedCode !== 'A-D' &&
    !hasAny(input.poaClassification.action.disallowedInterpretations.join(' '), ['forbidden'])
  checks.push({
    checkId: 'CHK-ACTION-NO-AD-WITHOUT-PHYSICAL-EVIDENCE',
    passed: actionNoAdWithoutPhysicalEvidence,
    details: actionNoAdWithoutPhysicalEvidence
      ? 'Action axis does not issue A-D without explicit physical evidence.'
      : 'Action axis violates A-D evidence gate.',
  })

  const perceptionNoFailureFromEnvironmentOnly =
    input.poaClassification.perception.status !== 'CLASSIFIED' ||
    !hasAny(input.poaClassification.perception.reviewReason || '', ['environment'])
  checks.push({
    checkId: 'CHK-PERCEPTION-NO-FAILURE-FROM-ENVIRONMENT-ONLY',
    passed: perceptionNoFailureFromEnvironmentOnly,
    details: perceptionNoFailureFromEnvironmentOnly
      ? 'Perception axis does not infer failure solely from environment/barrier degradation.'
      : 'Perception axis appears overclassified from environment/barrier only.',
  })

  const guardrailsPresent = axes.every((axis) => axis.semanticGuardrails.length > 0)
  checks.push({
    checkId: 'CHK-SEMANTIC-GUARDRAILS-PRESENT',
    passed: guardrailsPresent,
    details: guardrailsPresent
      ? 'Semantic guardrails are present in all axes.'
      : 'Semantic guardrails are missing in at least one axis.',
  })

  const reviewTracePresentForUnresolved = axes.every(
    (axis) => !unresolved(axis) || Boolean(axis.reviewTrace)
  )
  checks.push({
    checkId: 'CHK-REVIEW-TRACE-PRESENT-FOR-UNRESOLVED',
    passed: reviewTracePresentForUnresolved,
    details: reviewTracePresentForUnresolved
      ? 'Every unresolved axis has review trace.'
      : 'At least one unresolved axis is missing review trace.',
  })

  const reviewTraceLinked = axes.every((axis) => {
    if (!unresolved(axis)) return true
    const hasLinks = axis.linkedUncertainties.length > 0 || axis.linkedEvidence.length > 0
    const hasTraceLinks = axis.reviewTrace.linkedUncertainties.length > 0 || axis.reviewTrace.linkedEvidence.length > 0
    return hasLinks && hasTraceLinks
  })
  checks.push({
    checkId: 'CHK-REVIEW-TRACE-LINKS-PRESENT',
    passed: reviewTraceLinked,
    details: reviewTraceLinked
      ? 'Every unresolved axis review trace links to uncertainty/evidence.'
      : 'At least one unresolved axis lacks trace links to uncertainty/evidence.',
  })

  const transitionCriteriaPresentForUnresolved = axes.every(
    (axis) => !unresolved(axis) || axis.transitionCriteria.length > 0
  )
  checks.push({
    checkId: 'CHK-TRANSITION-CRITERIA-PRESENT-FOR-UNRESOLVED',
    passed: transitionCriteriaPresentForUnresolved,
    details: transitionCriteriaPresentForUnresolved
      ? 'Transition criteria exist for all unresolved axes.'
      : 'At least one unresolved axis is missing transition criteria.',
  })

  const trial001ReviewRequiredTraceable = axes.every((axis) =>
    unresolved(axis) && axis.blockingForClassification.length > 0 && Boolean(axis.reviewReasonCode)
  )
  checks.push({
    checkId: 'CHK-TRIAL001-REVIEW-REQUIRED-TRACEABLE',
    passed: trial001ReviewRequiredTraceable,
    details: trial001ReviewRequiredTraceable
      ? 'Trial 001 review-required posture is explicit and traceable for all axes.'
      : 'Trial 001 has unresolved axes without explicit traceability scaffolding.',
  })

  const noFinalFreeConclusion = !Object.prototype.hasOwnProperty.call(input as Record<string, unknown>, 'finalConclusion')
  checks.push({
    checkId: 'CHK-NO-FINAL-FREE-CONCLUSION',
    passed: noFinalFreeConclusion,
    details: noFinalFreeConclusion
      ? 'No final free conclusion is emitted in causal core.'
      : 'Unexpected final free conclusion field detected.',
  })

  const blockingIssues = checks.filter((c) => !c.passed).map((c) => `${c.checkId}: ${c.details}`)

  return {
    status: SERA_VNEXT_STATUS.PARTIAL_POA_REVIEW_TRACEABLE,
    blockingIssues,
    warnings: [
      `Downstream outputs remain forbidden in causal core: ${SERA_VNEXT_FORBIDDEN_DOWNSTREAM_OUTPUTS.join(', ')}`,
      'P/O/A gateway remains review-traceable and non-final until transition criteria are satisfied by human review.',
    ],
    checks,
  }
}
