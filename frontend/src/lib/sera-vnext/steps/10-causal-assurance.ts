import {
  SERA_VNEXT_FORBIDDEN_DOWNSTREAM_OUTPUTS,
  SERA_VNEXT_HUMAN_REVIEW_PROHIBITED_OUTPUTS,
  SERA_VNEXT_STATUS,
} from '../constants'
import {
  SERA_CANONICAL_ACTION_LEAF_CODES,
  SERA_CANONICAL_OBJECTIVE_LEAF_CODES,
  SERA_CANONICAL_PERCEPTION_LEAF_CODES,
} from '../canonical-codes'
import type {
  CausalAssurance,
  DirectActorAnalysis,
  FactualSummary,
  HumanDecisionInputSet,
  HumanDecisionInputValidation,
  HumanReviewDecisionGate,
  Limitation,
  OperationalUnsafeState,
  PoaAxis,
  PoaAxisClassification,
  PoaClassification,
  PoaStatements,
  PreconditionsAnalysis,
  UnsafeActConditionAnalysis,
} from '../types'

const SERA_ACTIVE_LEAF_CODE_TOKENS = [
  ...SERA_CANONICAL_PERCEPTION_LEAF_CODES,
  ...SERA_CANONICAL_OBJECTIVE_LEAF_CODES,
  ...SERA_CANONICAL_ACTION_LEAF_CODES,
]

function hasAny(text: string, patterns: string[]): boolean {
  const t = text.toLowerCase()
  return patterns.some((p) => t.includes(p.toLowerCase()))
}

function unresolved(axis: PoaAxisClassification): boolean {
  return axis.status === 'REVIEW_REQUIRED' || axis.status === 'INSUFFICIENT_EVIDENCE'
}

function unresolvedTraceFieldIssues(axis: PoaAxisClassification): string[] {
  if (!unresolved(axis)) return []

  const issues: string[] = []
  const trace = axis.reviewTrace

  if (!trace) {
    issues.push(`${axis.axis}.reviewTrace missing`)
    return issues
  }

  if (!axis.reviewReasonCode || axis.reviewReasonCode.trim().length === 0) {
    issues.push(`${axis.axis}.reviewReasonCode missing`)
  }

  const axisHasLinks = axis.linkedUncertainties.length > 0 || axis.linkedEvidence.length > 0
  if (!axisHasLinks) {
    issues.push(`${axis.axis}.linkedUncertainties|linkedEvidence missing`)
  }

  if (axis.blockingForClassification.length === 0) {
    issues.push(`${axis.axis}.blockingForClassification missing`)
  }

  if (!axis.requiredHumanDecision || axis.requiredHumanDecision.trim().length === 0) {
    issues.push(`${axis.axis}.requiredHumanDecision missing`)
  }

  if (axis.transitionCriteria.length === 0) {
    issues.push(`${axis.axis}.transitionCriteria missing`)
  }

  if (!trace.reviewReasonCode || trace.reviewReasonCode.trim().length === 0) {
    issues.push(`${axis.axis}.reviewTrace.reviewReasonCode missing`)
  }

  const traceHasLinks = trace.linkedUncertainties.length > 0 || trace.linkedEvidence.length > 0
  if (!traceHasLinks) {
    issues.push(`${axis.axis}.reviewTrace.linkedUncertainties|linkedEvidence missing`)
  }

  if (trace.blockingForClassification.length === 0) {
    issues.push(`${axis.axis}.reviewTrace.blockingForClassification missing`)
  }

  if (!trace.requiredHumanDecision || trace.requiredHumanDecision.trim().length === 0) {
    issues.push(`${axis.axis}.reviewTrace.requiredHumanDecision missing`)
  }

  if (trace.transitionCriteria.length === 0) {
    issues.push(`${axis.axis}.reviewTrace.transitionCriteria missing`)
  }

  return issues
}

function contractForAxis(gate: HumanReviewDecisionGate | null, axis: PoaAxis) {
  if (!gate) return null
  return gate.axisContracts.find((contract) => contract.axis === axis) || null
}

function decisionInputForAxis(inputSet: HumanDecisionInputSet | undefined, axis: PoaAxis) {
  if (!inputSet) return null
  return inputSet.axisDecisions.find((item) => item.axis === axis) || null
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
  humanReviewDecisionGate: HumanReviewDecisionGate | null
  humanDecisionInput: HumanDecisionInputSet | undefined
  humanDecisionValidation: HumanDecisionInputValidation | null
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

  const statementsContainCodes = hasAny(statementsText, SERA_ACTIVE_LEAF_CODE_TOKENS)
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

  const noAxisClassified = axes.every((axis) => axis.status !== 'CLASSIFIED')
  checks.push({
    checkId: 'CHK-NO-AUTO-CLASSIFIED-AXIS',
    passed: noAxisClassified,
    details: noAxisClassified
      ? 'No axis is auto-classified in vNext eligibility phase.'
      : 'At least one axis is marked CLASSIFIED, which is forbidden in this phase.',
  })

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

  const unresolvedTraceIssues = axes.flatMap((axis) => unresolvedTraceFieldIssues(axis))
  const reviewTracePresentForUnresolved = unresolvedTraceIssues.every((issue) => !issue.includes('.reviewTrace missing'))
  checks.push({
    checkId: 'CHK-REVIEW-TRACE-PRESENT-FOR-UNRESOLVED',
    passed: reviewTracePresentForUnresolved,
    details: reviewTracePresentForUnresolved
      ? 'Every unresolved axis has review trace.'
      : `Missing reviewTrace for unresolved axis: ${unresolvedTraceIssues.filter((issue) => issue.includes('.reviewTrace missing')).join('; ')}`,
  })

  const reviewTraceLinked = unresolvedTraceIssues.length === 0
  checks.push({
    checkId: 'CHK-REVIEW-TRACE-LINKS-PRESENT',
    passed: reviewTraceLinked,
    details: reviewTraceLinked
      ? 'Every unresolved axis review trace links to uncertainty/evidence.'
      : `Unresolved axis trace completeness failed: ${unresolvedTraceIssues.join('; ')}`,
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
    (unresolved(axis) || axis.status === 'READY_FOR_HUMAN_CLASSIFICATION') && Boolean(axis.reviewReasonCode)
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

  const eligibilityPresentForEveryAxis = axes.every((axis) => Boolean(axis.classificationEligibility))
  checks.push({
    checkId: 'CHK-ELIGIBILITY-PRESENT-FOR-EVERY-AXIS',
    passed: eligibilityPresentForEveryAxis,
    details: eligibilityPresentForEveryAxis
      ? 'Eligibility payload is present for every axis.'
      : 'At least one axis is missing eligibility payload.',
  })

  const noEligibleAxisWithAbsoluteBlockers = axes.every((axis) => {
    const el = axis.classificationEligibility
    if (!el || !el.eligibleForHumanClassification) return true
    return el.absoluteBlockers.length === 0
  })
  checks.push({
    checkId: 'CHK-ELIGIBLE-AXIS-HAS-NO-ABSOLUTE-BLOCKERS',
    passed: noEligibleAxisWithAbsoluteBlockers,
    details: noEligibleAxisWithAbsoluteBlockers
      ? 'No eligible axis contains absolute blockers.'
      : 'An eligible axis still contains absolute blockers.',
  })

  const noEligibleAxisWithoutTransitionCriteria = axes.every((axis) => {
    const el = axis.classificationEligibility
    if (!el || !el.eligibleForHumanClassification) return true
    return axis.transitionCriteria.length > 0
  })
  checks.push({
    checkId: 'CHK-ELIGIBLE-AXIS-HAS-TRANSITION-CRITERIA',
    passed: noEligibleAxisWithoutTransitionCriteria,
    details: noEligibleAxisWithoutTransitionCriteria
      ? 'Every eligible axis has transition criteria.'
      : 'At least one eligible axis is missing transition criteria.',
  })

  const noEligibleAxisWithoutRequiredHumanDecision = axes.every((axis) => {
    const el = axis.classificationEligibility
    if (!el || !el.eligibleForHumanClassification) return true
    return Boolean(axis.requiredHumanDecision.trim())
  })
  checks.push({
    checkId: 'CHK-ELIGIBLE-AXIS-HAS-REQUIRED-HUMAN-DECISION',
    passed: noEligibleAxisWithoutRequiredHumanDecision,
    details: noEligibleAxisWithoutRequiredHumanDecision
      ? 'Every eligible axis has required human decision guidance.'
      : 'At least one eligible axis is missing required human decision guidance.',
  })

  const eligibleAxesHaveEvidenceAndReviewTrace = axes.every((axis) => {
    const el = axis.classificationEligibility
    if (!el || !el.eligibleForHumanClassification) return true
    return axis.evidence.length > 0 && Boolean(axis.reviewTrace)
  })
  checks.push({
    checkId: 'CHK-ELIGIBLE-AXIS-HAS-EVIDENCE-AND-TRACE',
    passed: eligibleAxesHaveEvidenceAndReviewTrace,
    details: eligibleAxesHaveEvidenceAndReviewTrace
      ? 'Every eligible axis has evidence and review trace.'
      : 'At least one eligible axis is missing evidence or review trace.',
  })

  const noBlockedAxisFromOrdinaryMissingEvidenceOnly = axes.every((axis) => {
    const el = axis.classificationEligibility
    if (!el || el.eligibilityStatus !== 'BLOCKED_BY_GUARDRAIL') return true
    return el.absoluteBlockers.length > 0
  })
  checks.push({
    checkId: 'CHK-BLOCKED-AXIS-REQUIRES-ABSOLUTE-BLOCKER',
    passed: noBlockedAxisFromOrdinaryMissingEvidenceOnly,
    details: noBlockedAxisFromOrdinaryMissingEvidenceOnly
      ? 'Every BLOCKED_BY_GUARDRAIL axis has explicit absolute blockers.'
      : 'A blocked axis appears blocked only by ordinary missing evidence/criteria.',
  })

  const waiverProhibitedWhenAbsoluteBlockersExist = axes.every((axis) => {
    const el = axis.classificationEligibility
    if (!el) return true
    if (el.absoluteBlockers.length === 0) return true
    return el.waiverAllowed === false && el.waiverRequired === false && Boolean(el.waiverProhibitedReason)
  })
  checks.push({
    checkId: 'CHK-WAIVER-PROHIBITED-WHEN-ABSOLUTE-BLOCKER',
    passed: waiverProhibitedWhenAbsoluteBlockersExist,
    details: waiverProhibitedWhenAbsoluteBlockersExist
      ? 'Waiver is prohibited whenever absolute blockers exist.'
      : 'Waiver governance is inconsistent for axes with absolute blockers.',
  })

  const waiverRequiredOnlyForWaivableCriteria = axes.every((axis) => {
    const el = axis.classificationEligibility
    if (!el || !el.waiverRequired) return true
    return el.waiverAllowed && el.absoluteBlockers.length === 0
  })
  checks.push({
    checkId: 'CHK-WAIVER-REQUIRED-ONLY-FOR-WAIVABLE-CRITERIA',
    passed: waiverRequiredOnlyForWaivableCriteria,
    details: waiverRequiredOnlyForWaivableCriteria
      ? 'WaiverRequired is set only for waivable unresolved criteria.'
      : 'WaiverRequired is set in a non-waivable or inconsistent situation.',
  })

  const eligibleAxesWithResidualNeedWaiverPolicy = axes.every((axis) => {
    const el = axis.classificationEligibility
    if (!el || !el.eligibleForHumanClassification) return true
    const hasResidualSignals =
      axis.blockingForClassification.some((item) => item.includes('waivable:')) ||
      axis.linkedUncertainties.length > 0
    if (!hasResidualSignals) return true
    return el.waiverAllowed
  })
  checks.push({
    checkId: 'CHK-ELIGIBLE-AXIS-HAS-WAIVER-POLICY-WHEN-RESIDUAL',
    passed: eligibleAxesWithResidualNeedWaiverPolicy,
    details: eligibleAxesWithResidualNeedWaiverPolicy
      ? 'Eligible axes with residual uncertainty keep explicit waiver policy semantics.'
      : 'An eligible axis has residual uncertainty without coherent waiver policy semantics.',
  })

  const notEligibleWaiverAllowedOnlyWhenNotReady = axes.every((axis) => {
    const el = axis.classificationEligibility
    if (!el || el.eligibilityStatus !== 'NOT_ELIGIBLE') return true
    return el.eligibleForHumanClassification === false && el.waiverAllowed === true
  })
  checks.push({
    checkId: 'CHK-NOT-ELIGIBLE-WAIVER-COHERENCE',
    passed: notEligibleWaiverAllowedOnlyWhenNotReady,
    details: notEligibleWaiverAllowedOnlyWhenNotReady
      ? 'NOT_ELIGIBLE waiver semantics are coherent (not ready, waivable path only).'
      : 'NOT_ELIGIBLE waiver semantics are inconsistent.',
  })

  const gate = input.humanReviewDecisionGate

  const humanReviewGateExists = Boolean(gate)
  checks.push({
    checkId: 'CHK-HUMAN-REVIEW-DECISION-GATE-EXISTS',
    passed: humanReviewGateExists,
    details: humanReviewGateExists
      ? 'Human review decision gate payload is present.'
      : 'Human review decision gate payload is missing.',
  })

  const eligibleAxesHaveReadyDecisionContract = axes.every((axis) => {
    if (axis.classificationEligibility.eligibilityStatus !== 'ELIGIBLE_FOR_HUMAN_REVIEW') return true
    const contract = contractForAxis(gate, axis.axis)
    return Boolean(contract) && contract?.decisionStatus === 'READY_FOR_HUMAN_DECISION'
  })
  checks.push({
    checkId: 'CHK-ELIGIBLE-AXES-HAVE-READY-DECISION-CONTRACT',
    passed: eligibleAxesHaveReadyDecisionContract,
    details: eligibleAxesHaveReadyDecisionContract
      ? 'All eligible axes expose READY_FOR_HUMAN_DECISION contract.'
      : 'At least one eligible axis is missing READY_FOR_HUMAN_DECISION contract.',
  })

  const notEligibleAxesNotMarkedReadyForDecision = axes.every((axis) => {
    if (axis.classificationEligibility.eligibilityStatus !== 'NOT_ELIGIBLE') return true
    const contract = contractForAxis(gate, axis.axis)
    return Boolean(contract) && contract?.decisionStatus === 'NOT_READY_FOR_HUMAN_DECISION'
  })
  checks.push({
    checkId: 'CHK-NOT-ELIGIBLE-AXES-NOT-READY-FOR-DECISION',
    passed: notEligibleAxesNotMarkedReadyForDecision,
    details: notEligibleAxesNotMarkedReadyForDecision
      ? 'No NOT_ELIGIBLE axis is marked ready for human decision.'
      : 'A NOT_ELIGIBLE axis is incorrectly marked ready for human decision.',
  })

  const blockedAxesDoNotAllowWaiver = axes.every((axis) => {
    if (axis.classificationEligibility.eligibilityStatus !== 'BLOCKED_BY_GUARDRAIL') return true
    const contract = contractForAxis(gate, axis.axis)
    return Boolean(contract) && contract?.waiverDecisionAllowed === false
  })
  checks.push({
    checkId: 'CHK-BLOCKED-AXES-DO-NOT-ALLOW-WAIVER',
    passed: blockedAxesDoNotAllowWaiver,
    details: blockedAxesDoNotAllowWaiver
      ? 'Blocked axes correctly prohibit waiver decisions.'
      : 'At least one blocked axis incorrectly allows waiver decisions.',
  })

  const noAxisContractPermitsAutoClassified = (gate?.axisContracts || []).every(
    (contract) =>
      contract.outputLock.autoClassificationForbidden &&
      contract.outputLock.prohibitedStatuses.includes('CLASSIFIED')
  )
  checks.push({
    checkId: 'CHK-NO-AXIS-CONTRACT-PERMITS-AUTO-CLASSIFIED',
    passed: noAxisContractPermitsAutoClassified,
    details: noAxisContractPermitsAutoClassified
      ? 'Axis contracts explicitly forbid automatic CLASSIFIED emission.'
      : 'At least one axis contract does not forbid automatic CLASSIFIED emission.',
  })

  const noAxisContractPermitsDownstreamOutputs = (gate?.axisContracts || []).every((contract) =>
    SERA_VNEXT_HUMAN_REVIEW_PROHIBITED_OUTPUTS.every((output) => contract.outputLock.prohibitedOutputs.includes(output))
  )
  checks.push({
    checkId: 'CHK-NO-AXIS-CONTRACT-PERMITS-DOWNSTREAM-OUTPUTS',
    passed: noAxisContractPermitsDownstreamOutputs,
    details: noAxisContractPermitsDownstreamOutputs
      ? 'Axis contracts forbid finalConclusion/HFACS/Risk/ERC/ARMS outputs.'
      : 'At least one axis contract is missing downstream output locks.',
  })

  const globalOutputLocksPresent = SERA_VNEXT_HUMAN_REVIEW_PROHIBITED_OUTPUTS.every((output) =>
    (gate?.globalProhibitedOutputs || []).includes(output)
  )
  checks.push({
    checkId: 'CHK-GLOBAL-OUTPUT-LOCKS-PRESENT',
    passed: globalOutputLocksPresent,
    details: globalOutputLocksPresent
      ? 'Global decision gate output locks are present.'
      : 'Global decision gate output locks are missing or incomplete.',
  })

  const humanDecisionInputProvided = Boolean(input.humanDecisionInput)
  const humanDecisionInputValidated =
    !humanDecisionInputProvided ||
    !gate ||
    (Boolean(input.humanDecisionValidation) && input.humanDecisionValidation?.inputProvided === true)
  checks.push({
    checkId: 'CHK-HUMAN-DECISION-INPUT-VALIDATED-WHEN-PRESENT',
    passed: humanDecisionInputValidated,
    details: humanDecisionInputValidated
      ? 'Human decision input is validated when present.'
      : 'Human decision input is present but validation payload is missing.',
  })

  const invalidHumanInputDoesNotReleaseCode = (() => {
    if (!input.humanDecisionValidation || !input.humanDecisionValidation.inputProvided) return true
    if (input.humanDecisionValidation.results.every((item) => item.valid)) return true
    return axes.every((axis) => axis.status !== 'CLASSIFIED' && axis.selectedCode === 'UNRESOLVED')
  })()
  checks.push({
    checkId: 'CHK-INVALID-HUMAN-INPUT-DOES-NOT-RELEASE-CODE',
    passed: invalidHumanInputDoesNotReleaseCode,
    details: invalidHumanInputDoesNotReleaseCode
      ? 'Invalid human input does not release any final axis code.'
      : 'Invalid human input appears to have released a final axis code.',
  })

  const validHumanInputStillDoesNotReleaseCode = (() => {
    if (!input.humanDecisionValidation || !input.humanDecisionValidation.inputProvided) return true
    if (!input.humanDecisionValidation.results.every((item) => item.valid)) return true
    return axes.every((axis) => axis.status !== 'CLASSIFIED' && axis.selectedCode === 'UNRESOLVED')
  })()
  checks.push({
    checkId: 'CHK-VALID-HUMAN-INPUT-STILL-NOT-CLASSIFIED',
    passed: validHumanInputStillDoesNotReleaseCode,
    details: validHumanInputStillDoesNotReleaseCode
      ? 'Valid human input remains gated and does not emit CLASSIFIED in this phase.'
      : 'Valid human input incorrectly released CLASSIFIED in this phase.',
  })

  const proposedCodeNeverBecomesSelectedCode = axes.every((axis) => {
    const axisInput = decisionInputForAxis(input.humanDecisionInput, axis.axis)
    if (!axisInput || !axisInput.proposedCode) return true
    return axis.selectedCode !== axisInput.proposedCode
  })
  checks.push({
    checkId: 'CHK-PROPOSED-CODE-NOT-PROMOTED-TO-SELECTED',
    passed: proposedCodeNeverBecomesSelectedCode,
    details: proposedCodeNeverBecomesSelectedCode
      ? 'Proposed human codes are not promoted to selectedCode in this phase.'
      : 'A proposed human code was promoted to selectedCode, which is forbidden in this phase.',
  })

  const manualDryRunPackageRemainsPreRelease = (() => {
    if (!input.humanDecisionValidation || !input.humanDecisionValidation.inputProvided) return true
    return axes.every((axis) => axis.selectedCode === 'UNRESOLVED' && axis.status !== 'CLASSIFIED')
  })()
  checks.push({
    checkId: 'CHK-MANUAL-DRY-RUN-PACKAGE-NOT-RELEASED',
    passed: manualDryRunPackageRemainsPreRelease,
    details: manualDryRunPackageRemainsPreRelease
      ? 'Manual decision package remains pre-release and does not emit final axis classification.'
      : 'Manual decision package appears to have released final axis classification, which is forbidden.',
  })

  const blockingIssues = checks.filter((c) => !c.passed).map((c) => `${c.checkId}: ${c.details}`)

  return {
    status: SERA_VNEXT_STATUS.PARTIAL_MANUAL_CLASSIFICATION_DRY_RUN_NOT_RELEASED,
    blockingIssues,
    warnings: [
      `Downstream outputs remain forbidden in causal core: ${SERA_VNEXT_FORBIDDEN_DOWNSTREAM_OUTPUTS.join(', ')}`,
      'P/O/A human decision gate remains non-final; automatic CLASSIFIED/HFACS/Risk/ERC/finalConclusion outputs stay locked.',
    ],
    checks,
  }
}
