import { SERA_VNEXT_FORBIDDEN_DOWNSTREAM_OUTPUTS, SERA_VNEXT_STATUS } from '../constants'
import type {
  CausalAssurance,
  DirectActorAnalysis,
  FactualSummary,
  Limitation,
  OperationalUnsafeState,
  PoaClassification,
  PoaStatements,
  PreconditionsAnalysis,
  UnsafeActConditionAnalysis,
} from '../types'

function hasAny(text: string, patterns: string[]): boolean {
  const t = text.toLowerCase()
  return patterns.some((p) => t.includes(p.toLowerCase()))
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
    checkId: 'CHK-VNEXT-1-5-NOT-FULLY-VALIDATED',
    passed: false,
    details: 'vNext remains in partial implementation mode (steps 1-5 only).',
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
      : 'No HFACS/Risk/ERC/ARMS field present in causal step payload.',
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
    input.unsafeState.decisionAntecedents.length > 0 &&
    input.unsafeState.decisionAntecedents.join(' ') !== input.unsafeState.operationalUnsafeState

  checks.push({
    checkId: 'CHK-DECISION-ANTECEDENTS-SEPARATED',
    passed: hasSeparatedDecisionAntecedents,
    details: hasSeparatedDecisionAntecedents
      ? 'Decision antecedents are separated from operational unsafe state.'
      : 'Decision antecedents are missing or not clearly separated.',
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
      ? 'Missing data/uncertainty markers are preserved.'
      : 'Missing data was detected without uncertainty/limitation preservation.',
  })

  const directActorNotOverCommitted =
    !(input.directActor.actorKind === 'specific_actor' &&
      hasAny(input.directActor.uncertainty.join(' '), ['PF/PM', 'not established']))

  checks.push({
    checkId: 'CHK-DIRECT-ACTOR-NO-OVERCOMMIT',
    passed: directActorNotOverCommitted,
    details: directActorNotOverCommitted
      ? 'Direct actor does not overcommit where PF/PM precision is missing.'
      : 'Direct actor overcommitted despite PF/PM uncertainty.',
  })

  const statementsPresent = Boolean(
    input.poaStatements.perceptionStatement &&
      input.poaStatements.objectiveStatement &&
      input.poaStatements.actionStatement
  )

  checks.push({
    checkId: 'CHK-POA-STATEMENTS-PRESENT',
    passed: statementsPresent,
    details: statementsPresent
      ? 'Perception/objective/action statements are present.'
      : 'One or more P/O/A statements are missing.',
  })

  const statementsText = [
    input.poaStatements.perceptionStatement || '',
    input.poaStatements.objectiveStatement || '',
    input.poaStatements.actionStatement || '',
  ].join(' ')

  const statementsContainCodes = hasAny(statementsText, [
    'P-A', 'P-B', 'P-C', 'P-D', 'P-E', 'P-F', 'P-G', 'P-H',
    'O-A', 'O-B', 'O-C', 'O-D',
    'A-A', 'A-B', 'A-C', 'A-D', 'A-E', 'A-F', 'A-G', 'A-H', 'A-I', 'A-J',
  ])
  checks.push({
    checkId: 'CHK-STATEMENTS-NO-SERA-CODES',
    passed: !statementsContainCodes,
    details: statementsContainCodes
      ? 'Statements contain SERA code tokens, which is forbidden in this phase.'
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
      ? 'Statements use neutral wording without active-failure labeling.'
      : 'Statements include active-failure wording not allowed in this phase.',
  })

  const actionStatementNoAdInabilityCollapse = !hasAny(
    input.poaStatements.actionStatement || '',
    ['a-d', 'incapacidade fisica', 'physical inability']
  )
  checks.push({
    checkId: 'CHK-ACTION-STATEMENT-NO-AD-COLLAPSE',
    passed: actionStatementNoAdInabilityCollapse,
    details: actionStatementNoAdInabilityCollapse
      ? 'Action statement does not collapse aircraft state into inability framing.'
      : 'Action statement suggests forbidden inability collapse.',
  })

  const objectiveNoUnsupportedIntent = !hasAny(
    input.poaStatements.objectiveStatement || '',
    ['conscious violation', 'routine violation']
  )
  checks.push({
    checkId: 'CHK-OBJECTIVE-NO-UNSUPPORTED-INTENT',
    passed: objectiveNoUnsupportedIntent,
    details: objectiveNoUnsupportedIntent
      ? 'Objective statement avoids unsupported intent/non-compliance assertion.'
      : 'Objective statement over-asserts unsupported intent.',
  })

  const perceptionPreservesBarrierUncertainty =
    hasAny(input.poaStatements.perceptionStatement || '', ['warning']) &&
    hasAny(input.poaStatements.uncertaintyForEach.perception.join(' '), ['timing', 'recognition'])

  checks.push({
    checkId: 'CHK-PERCEPTION-BARRIER-UNCERTAINTY-PRESERVED',
    passed: perceptionPreservesBarrierUncertainty,
    details: perceptionPreservesBarrierUncertainty
      ? 'Perception statement preserves warning-barrier and recognition-timing uncertainty.'
      : 'Perception statement is missing barrier/recognition-timing uncertainty context.',
  })

  const poaStillNotClassified =
    input.poaClassification.perception.selectedCode === 'NOT_CLASSIFIED' &&
    input.poaClassification.objective.selectedCode === 'NOT_CLASSIFIED' &&
    input.poaClassification.action.selectedCode === 'NOT_CLASSIFIED'

  checks.push({
    checkId: 'CHK-POA-STILL-NOT-CLASSIFIED',
    passed: poaStillNotClassified,
    details: poaStillNotClassified
      ? 'P/O/A remains not classified in this phase.'
      : 'Unexpected P/O/A classification detected before A4+R-33/A4+R-34 gates.',
  })

  const blockingIssues = checks.filter((c) => !c.passed).map((c) => `${c.checkId}: ${c.details}`)

  return {
    status: SERA_VNEXT_STATUS.PARTIAL_STEPS_1_5_NOT_CLASSIFIED,
    blockingIssues,
    warnings: [
      `Downstream outputs remain forbidden in causal core: ${SERA_VNEXT_FORBIDDEN_DOWNSTREAM_OUTPUTS.join(', ')}`,
      'P/O/A classification remains not_classified in A4+R-32.',
    ],
    checks,
  }
}
