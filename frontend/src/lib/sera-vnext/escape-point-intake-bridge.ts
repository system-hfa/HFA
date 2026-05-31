import type { CanonicalTraversalAdapterBuildInput } from './canonical-traversal-adapter'
import type { BuildCandidateTraversalFromAuthorNodeIntakeInput } from './author-node-intake-adapter'
import {
  convertIntakeToCanonicalRuntimeContext,
  validatePassiveEscapePointIntake,
  type SeraVNextEscapePointIntake,
  type SeraVNextEscapePointIntakeIssue,
  type SeraVNextEscapePointIntakeIssueClass,
  type SeraVNextEscapePointIntakeIssueSeverity,
} from './escape-point-intake'
import type { CanonicalSeraAxis } from './types'

export type SeraVNextEscapePointIntakeBridgeStatus =
  | 'BRIDGE_READY_PASSIVE'
  | 'BRIDGE_READY_WITH_WARNINGS_PASSIVE'
  | 'BRIDGE_BLOCKED_BY_PASSIVE_INTAKE_ISSUES'
  | 'BRIDGE_BLOCKED_BY_LOCK_VIOLATION'

export interface SeraVNextEscapePointIntakeBridgeIssue {
  code: string
  severity: SeraVNextEscapePointIntakeIssueSeverity
  issueClass: SeraVNextEscapePointIntakeIssueClass | 'BRIDGE_BLOCKER'
  message: string
  axis?: CanonicalSeraAxis
  axisKey?: 'perception' | 'objective' | 'action'
  source: 'INTAKE_VALIDATION' | 'BRIDGE'
  blocksRuntime: false
}

export interface SeraVNextEscapePointIntakeBridgeInput {
  intake: SeraVNextEscapePointIntake
  traversalNodeDecisions?: CanonicalTraversalAdapterBuildInput['nodeDecisions']
  authorNodeRecords?: BuildCandidateTraversalFromAuthorNodeIntakeInput['records']
}

export interface SeraVNextEscapePointIntakeBridgeOutput {
  status: SeraVNextEscapePointIntakeBridgeStatus
  intakeId: string
  eventId: string
  issues: SeraVNextEscapePointIntakeBridgeIssue[]
  blocked: boolean
  enforcementMode: 'PASSIVE_COMPAT'
  traversalAdapterInput: CanonicalTraversalAdapterBuildInput
  authorNodeIntakeAdapterInput: BuildCandidateTraversalFromAuthorNodeIntakeInput
  selectedCodeAllowed: false
  releasedCodeAllowed: false
  classificationAllowed: false
  poaClosureAllowed: false
  downstreamAllowed: false
  finalConclusionAllowed: false
  notFinalClassification: true
}

const CANDIDATE_ONLY_LOCKS = {
  selectedCodeAllowed: false as const,
  releasedCodeAllowed: false as const,
  classificationAllowed: false as const,
  poaClosureAllowed: false as const,
  downstreamAllowed: false as const,
  finalConclusionAllowed: false as const,
  notFinalClassification: true as const,
}

function normalizeIssue(input: SeraVNextEscapePointIntakeIssue): SeraVNextEscapePointIntakeBridgeIssue {
  return {
    code: input.code,
    severity: input.severity,
    issueClass: input.issueClass,
    message: input.message,
    source: 'INTAKE_VALIDATION',
    blocksRuntime: false,
    ...(input.axis ? { axis: input.axis } : {}),
    ...(input.axisKey ? { axisKey: input.axisKey } : {}),
  }
}

function hasBridgeLockViolation(output: {
  selectedCodeAllowed: boolean
  releasedCodeAllowed: boolean
  classificationAllowed: boolean
  poaClosureAllowed: boolean
  downstreamAllowed: boolean
  finalConclusionAllowed: boolean
  notFinalClassification: boolean
}): boolean {
  return (
    output.selectedCodeAllowed !== false ||
    output.releasedCodeAllowed !== false ||
    output.classificationAllowed !== false ||
    output.poaClosureAllowed !== false ||
    output.downstreamAllowed !== false ||
    output.finalConclusionAllowed !== false ||
    output.notFinalClassification !== true
  )
}

function bridgeStatusFor(input: {
  passiveBlockerCount: number
  issueCount: number
  warningCount: number
}): SeraVNextEscapePointIntakeBridgeStatus {
  if (input.passiveBlockerCount > 0) {
    return 'BRIDGE_BLOCKED_BY_PASSIVE_INTAKE_ISSUES'
  }
  if (input.issueCount > 0 || input.warningCount > 0) {
    return 'BRIDGE_READY_WITH_WARNINGS_PASSIVE'
  }
  return 'BRIDGE_READY_PASSIVE'
}

export function assertEscapePointIntakeBridgeLocks(output: SeraVNextEscapePointIntakeBridgeOutput): void {
  const rawOutput = output as unknown as Record<string, unknown>
  const hasSelectedCode = Object.prototype.hasOwnProperty.call(rawOutput, 'selectedCode')
  const hasReleasedCode = Object.prototype.hasOwnProperty.call(rawOutput, 'releasedCode')
  const hasFinalConclusion = Object.prototype.hasOwnProperty.call(rawOutput, 'finalConclusion')
  const hasHfacs = Object.prototype.hasOwnProperty.call(rawOutput, 'hfacs')
  const hasRisk = Object.prototype.hasOwnProperty.call(rawOutput, 'risk')
  const hasArmsErc = Object.prototype.hasOwnProperty.call(rawOutput, 'armsErc')
  const hasRecommendations = Object.prototype.hasOwnProperty.call(rawOutput, 'recommendations')

  if (
    output.selectedCodeAllowed ||
    output.releasedCodeAllowed ||
    output.classificationAllowed ||
    output.poaClosureAllowed ||
    output.downstreamAllowed ||
    output.finalConclusionAllowed ||
    !output.notFinalClassification ||
    hasSelectedCode ||
    hasReleasedCode ||
    hasFinalConclusion ||
    hasHfacs ||
    hasRisk ||
    hasArmsErc ||
    hasRecommendations
  ) {
    throw new Error('Bridge lock violation: passive intake bridge cannot expose final/downstream output surfaces.')
  }
}

export function buildTraversalAdapterInputFromEscapePointIntake(
  input: SeraVNextEscapePointIntakeBridgeInput,
): SeraVNextEscapePointIntakeBridgeOutput {
  const validation = validatePassiveEscapePointIntake(input.intake)
  const context = convertIntakeToCanonicalRuntimeContext(input.intake)

  const traversalAdapterInput: CanonicalTraversalAdapterBuildInput = {
    nodeDecisions: input.traversalNodeDecisions ?? [],
    approvedEscapePointScope: context.approvedEscapePointScope ?? undefined,
    enforcementMode: context.enforcementMode,
    axisAgentRefs: context.axisAgentRefs,
    axisMomentRefs: context.axisMomentRefs,
    axisEvidenceRefs: context.axisEvidenceRefs,
    proposedCodes: context.proposedCodes,
  }

  const authorNodeIntakeAdapterInput: BuildCandidateTraversalFromAuthorNodeIntakeInput = {
    records: input.authorNodeRecords ?? [],
    approvedEscapePointScope: context.approvedEscapePointScope ?? undefined,
    enforcementMode: context.enforcementMode,
    axisAgentRefs: context.axisAgentRefs,
    axisMomentRefs: context.axisMomentRefs,
    axisEvidenceRefs: context.axisEvidenceRefs,
    proposedCodes: context.proposedCodes,
  }

  const issues: SeraVNextEscapePointIntakeBridgeIssue[] = validation.issues.map(normalizeIssue)
  const status = bridgeStatusFor({
    passiveBlockerCount: validation.passiveBlockerCount,
    issueCount: validation.issueCount,
    warningCount: validation.warningCount,
  })

  const output: SeraVNextEscapePointIntakeBridgeOutput = {
    status,
    intakeId: input.intake.intakeId,
    eventId: input.intake.eventId,
    issues,
    blocked: status === 'BRIDGE_BLOCKED_BY_PASSIVE_INTAKE_ISSUES',
    enforcementMode: context.enforcementMode,
    traversalAdapterInput,
    authorNodeIntakeAdapterInput,
    ...CANDIDATE_ONLY_LOCKS,
  }

  if (hasBridgeLockViolation(output)) {
    output.status = 'BRIDGE_BLOCKED_BY_LOCK_VIOLATION'
    output.blocked = true
    output.issues.push({
      code: 'BRIDGE_CANDIDATE_LOCK_VIOLATION',
      severity: 'PASSIVE_DIAGNOSTIC',
      issueClass: 'BRIDGE_BLOCKER',
      message: 'Bridge lock violation detected; candidate-only lock fields must remain closed.',
      source: 'BRIDGE',
      blocksRuntime: false,
    })
    output.selectedCodeAllowed = false
    output.releasedCodeAllowed = false
    output.classificationAllowed = false
    output.poaClosureAllowed = false
    output.downstreamAllowed = false
    output.finalConclusionAllowed = false
    output.notFinalClassification = true
  }

  assertEscapePointIntakeBridgeLocks(output)
  return output
}

export function buildAuthorNodeIntakeAdapterInputFromEscapePointIntake(
  input: SeraVNextEscapePointIntakeBridgeInput,
): SeraVNextEscapePointIntakeBridgeOutput {
  return buildTraversalAdapterInputFromEscapePointIntake(input)
}

