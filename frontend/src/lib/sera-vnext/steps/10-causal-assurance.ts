import { SERA_VNEXT_FORBIDDEN_DOWNSTREAM_OUTPUTS, SERA_VNEXT_STATUS } from '../constants'
import type {
  CausalAssurance,
  FactualSummary,
  Limitation,
  OperationalUnsafeState,
  PoaClassification,
  PreconditionsAnalysis,
  UnsafeActConditionAnalysis,
} from '../types'

export function runStep10CausalAssurance(input: {
  factualSummary: FactualSummary
  unsafeState: OperationalUnsafeState
  unsafeActCondition: UnsafeActConditionAnalysis
  limitations: Limitation[]
  poaClassification: PoaClassification
  preconditions: PreconditionsAnalysis
}): CausalAssurance {
  const checks: CausalAssurance['checks'] = []

  checks.push({
    checkId: 'CHK-VNEXT-1-3-NOT-FULLY-VALIDATED',
    passed: false,
    details: 'vNext remains in partial implementation mode (steps 1-3 only).',
  })

  const hasForbiddenDownstreamFields = [
    Object.prototype.hasOwnProperty.call(input as Record<string, unknown>, 'hfacs'),
    Object.prototype.hasOwnProperty.call(input as Record<string, unknown>, 'risk'),
    Object.prototype.hasOwnProperty.call(input as Record<string, unknown>, 'erc_level'),
  ].some(Boolean)

  checks.push({
    checkId: 'CHK-NO-HFACS-RISK-ERC-FIELDS',
    passed: !hasForbiddenDownstreamFields,
    details: hasForbiddenDownstreamFields
      ? 'Unexpected downstream field detected in causal scope.'
      : 'No HFACS/Risk/ERC field present in causal step payload.',
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

  const unsafeConditionNotCollapsedIntoAd = ![
    input.unsafeActCondition.unsafeAct.statement || '',
    input.unsafeActCondition.unsafeCondition.statement || '',
  ]
    .join(' ')
    .toUpperCase()
    .includes('A-D')

  checks.push({
    checkId: 'CHK-UNSAFE-CONDITION-NOT-COLLAPSED-INTO-AD',
    passed: unsafeConditionNotCollapsedIntoAd,
    details: unsafeConditionNotCollapsedIntoAd
      ? 'Unsafe condition analysis is not collapsed into A-D labeling.'
      : 'Unsafe condition text appears collapsed into A-D code framing.',
  })

  const blockingIssues = checks.filter((c) => !c.passed).map((c) => `${c.checkId}: ${c.details}`)

  return {
    status: SERA_VNEXT_STATUS.PARTIAL_STEPS_1_3_NOT_CLASSIFIED,
    blockingIssues,
    warnings: [
      `Downstream outputs remain forbidden in causal core: ${SERA_VNEXT_FORBIDDEN_DOWNSTREAM_OUTPUTS.join(', ')}`,
      'P/O/A classification remains not_classified in A4+R-30.',
    ],
    checks,
  }
}
