import { isCanonicalSeraLeafCode } from './canonical-codes'
import {
  normalizeApprovedEscapePointScope,
  type SeraVNextEscapePointStatusMappingResult,
} from './escape-point-scope'
import type {
  ApprovedEscapePointScope,
  CanonicalSeraAxis,
  CanonicalSeraLeafCode,
  CanonicalSeraNonExistentLeafCode,
  SeraVNextCanonicalRuntimeContext,
  SeraVNextSourceType,
} from './types'

export type SeraVNextEscapePointIntakeAxisKey = 'perception' | 'objective' | 'action'

export type SeraVNextEscapePointIntakeIssueCode =
  | 'INTAKE_SCOPE_REQUIRED'
  | 'INTAKE_SCOPE_ANCHOR_MISSING'
  | 'INTAKE_AGENT_MISSING'
  | 'INTAKE_ACT_OR_OMISSION_MISSING'
  | 'INTAKE_OPERATIONAL_MOMENT_MISSING'
  | 'INTAKE_TOPOLOGY_MISSING'
  | 'INTAKE_PROGRESSIVE_ZONE_BOUNDARY_MISSING'
  | 'INTAKE_PROGRESSIVE_ZONE_BOUNDARY_INCOMPLETE'
  | 'INTAKE_DIFFUSE_SPLIT_REQUIRED'
  | 'INTAKE_AXIS_METADATA_MISSING'
  | 'INTAKE_AXIS_AGENT_REF_MISSING'
  | 'INTAKE_NON_EXISTENT_PROPOSED_CODE'
  | 'INTAKE_CANDIDATE_LOCK_VIOLATION'

export type SeraVNextEscapePointIntakeIssueSeverity = 'PASSIVE_INFO' | 'PASSIVE_DIAGNOSTIC'

export interface SeraVNextEscapePointIntakeIssue {
  code: SeraVNextEscapePointIntakeIssueCode
  severity: SeraVNextEscapePointIntakeIssueSeverity
  message: string
  axis?: CanonicalSeraAxis
  axisKey?: SeraVNextEscapePointIntakeAxisKey
  blocksRuntime: false
}

export type SeraVNextEscapePointIntakeReadinessStatus =
  | 'PASSIVE_INTAKE_SCOPE_MISSING'
  | 'PASSIVE_INTAKE_INCOMPLETE'
  | 'PASSIVE_INTAKE_DIFFUSE_SPLIT_REQUIRED'
  | 'PASSIVE_INTAKE_READY_WITH_WARNINGS'
  | 'PASSIVE_INTAKE_READY'

export type SeraVNextEscapePointIntakeProposedCode = CanonicalSeraLeafCode | CanonicalSeraNonExistentLeafCode

export interface SeraVNextEscapePointIntakeAxisMetadata {
  axisAgentRef?: string | null
  axisMomentRef?: string | null
  axisEvidenceRefs?: string[]
  proposedCode?: SeraVNextEscapePointIntakeProposedCode | null
  questionNodeRefs?: string[]
  limitations?: string[]
}

export interface SeraVNextEscapePointIntake {
  intakeId: string
  eventId: string
  version: string
  source: SeraVNextSourceType
  approvedEscapePointScope?: ApprovedEscapePointScope
  draftEscapePointScope?: ApprovedEscapePointScope
  axisMetadata: {
    perception: SeraVNextEscapePointIntakeAxisMetadata
    objective: SeraVNextEscapePointIntakeAxisMetadata
    action: SeraVNextEscapePointIntakeAxisMetadata
  }
  selectedCodeAllowed: false
  releasedCodeAllowed: false
  classificationAllowed: false
  poaClosureAllowed: false
  downstreamAllowed: false
  finalConclusionAllowed: false
  notFinalClassification: true
}

export interface SeraVNextEscapePointIntakeValidationResult {
  intakeId: string
  eventId: string
  readinessStatus: SeraVNextEscapePointIntakeReadinessStatus
  readyForFutureEnforcement: boolean
  issues: SeraVNextEscapePointIntakeIssue[]
  scopeAcceptedForPassiveRuntime: boolean
  normalizedScopeStatus: SeraVNextEscapePointStatusMappingResult | null
  selectedCodeAllowed: false
  releasedCodeAllowed: false
  classificationAllowed: false
  poaClosureAllowed: false
  downstreamAllowed: false
  finalConclusionAllowed: false
  notFinalClassification: true
}

export interface SeraVNextPassiveIntakeRuntimeContext {
  intakeId: string
  eventId: string
  canonicalRuntimeContext: SeraVNextCanonicalRuntimeContext | null
  approvedEscapePointScope: ApprovedEscapePointScope | null
  enforcementMode: 'PASSIVE_COMPAT'
  axisAgentRefs: Partial<Record<CanonicalSeraAxis, string | null>>
  axisMomentRefs: Partial<Record<CanonicalSeraAxis, string | null>>
  axisEvidenceRefs: Partial<Record<CanonicalSeraAxis, string[]>>
  proposedCodes: Partial<Record<CanonicalSeraAxis, CanonicalSeraLeafCode | null>>
  nonExistentProposedCodeAxes: CanonicalSeraAxis[]
  questionNodeRefsByAxis: Partial<Record<CanonicalSeraAxis, string[]>>
  limitationsByAxis: Partial<Record<CanonicalSeraAxis, string[]>>
  selectedCodeAllowed: false
  releasedCodeAllowed: false
  classificationAllowed: false
  poaClosureAllowed: false
  downstreamAllowed: false
  finalConclusionAllowed: false
  notFinalClassification: true
}

export interface BuildPassiveEscapePointIntakeInput {
  intakeId: string
  eventId: string
  version?: string
  source: SeraVNextSourceType
  approvedEscapePointScope?: ApprovedEscapePointScope
  draftEscapePointScope?: ApprovedEscapePointScope
  axisMetadata?: Partial<Record<SeraVNextEscapePointIntakeAxisKey, SeraVNextEscapePointIntakeAxisMetadata | undefined>>
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

function toCanonicalAxis(axis: SeraVNextEscapePointIntakeAxisKey): CanonicalSeraAxis {
  if (axis === 'perception') return 'P'
  if (axis === 'objective') return 'O'
  return 'A'
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function normalizeTextList(values: string[] | undefined): string[] | undefined {
  if (!values) {
    return undefined
  }
  const normalized = [...new Set(values.map((item) => item.trim()).filter((item) => item.length > 0))]
  return normalized.length > 0 ? normalized : undefined
}

function normalizeAxisMetadata(input: SeraVNextEscapePointIntakeAxisMetadata | undefined): SeraVNextEscapePointIntakeAxisMetadata {
  return {
    axisAgentRef: input?.axisAgentRef?.trim() || undefined,
    axisMomentRef: input?.axisMomentRef?.trim() || undefined,
    axisEvidenceRefs: normalizeTextList(input?.axisEvidenceRefs),
    proposedCode: input?.proposedCode ?? undefined,
    questionNodeRefs: normalizeTextList(input?.questionNodeRefs),
    limitations: normalizeTextList(input?.limitations),
  }
}

function issue(
  code: SeraVNextEscapePointIntakeIssueCode,
  severity: SeraVNextEscapePointIntakeIssueSeverity,
  message: string,
  context?: Partial<Pick<SeraVNextEscapePointIntakeIssue, 'axis' | 'axisKey'>>,
): SeraVNextEscapePointIntakeIssue {
  return {
    code,
    severity,
    message,
    blocksRuntime: false,
    ...(context?.axis ? { axis: context.axis } : {}),
    ...(context?.axisKey ? { axisKey: context.axisKey } : {}),
  }
}

function hasLockViolation(intake: SeraVNextEscapePointIntake): boolean {
  return (
    intake.selectedCodeAllowed !== false ||
    intake.releasedCodeAllowed !== false ||
    intake.classificationAllowed !== false ||
    intake.poaClosureAllowed !== false ||
    intake.downstreamAllowed !== false ||
    intake.finalConclusionAllowed !== false ||
    intake.notFinalClassification !== true
  )
}

export function buildPassiveEscapePointIntake(input: BuildPassiveEscapePointIntakeInput): SeraVNextEscapePointIntake {
  return {
    intakeId: input.intakeId.trim(),
    eventId: input.eventId.trim(),
    version: input.version?.trim() || 'A4R192-A_v0.2.0',
    source: input.source,
    approvedEscapePointScope: input.approvedEscapePointScope,
    draftEscapePointScope: input.draftEscapePointScope,
    axisMetadata: {
      perception: normalizeAxisMetadata(input.axisMetadata?.perception),
      objective: normalizeAxisMetadata(input.axisMetadata?.objective),
      action: normalizeAxisMetadata(input.axisMetadata?.action),
    },
    ...CANDIDATE_ONLY_LOCKS,
  }
}

export function validatePassiveEscapePointIntake(
  intake: SeraVNextEscapePointIntake,
): SeraVNextEscapePointIntakeValidationResult {
  const issues: SeraVNextEscapePointIntakeIssue[] = []
  const activeScope = intake.approvedEscapePointScope ?? intake.draftEscapePointScope

  if (!activeScope) {
    issues.push(
      issue(
        'INTAKE_SCOPE_REQUIRED',
        'PASSIVE_DIAGNOSTIC',
        'Passive intake must include either approvedEscapePointScope or draftEscapePointScope.',
      ),
    )
  }

  let normalizedScopeStatus: SeraVNextEscapePointStatusMappingResult | null = null
  if (activeScope) {
    normalizedScopeStatus = normalizeApprovedEscapePointScope(activeScope)
    const anchor = activeScope.escapePointAnchor

    if (!anchor) {
      issues.push(
        issue(
          'INTAKE_SCOPE_ANCHOR_MISSING',
          'PASSIVE_DIAGNOSTIC',
          'Escape-point scope is present but missing escapePointAnchor in intake.',
        ),
      )
    } else {
      if (!isNonEmptyString(anchor.agentId)) {
        issues.push(issue('INTAKE_AGENT_MISSING', 'PASSIVE_DIAGNOSTIC', 'Escape-point intake is missing anchor agentId.'))
      }
      if (!isNonEmptyString(anchor.unsafeActOrOmission?.statement)) {
        issues.push(
          issue(
            'INTAKE_ACT_OR_OMISSION_MISSING',
            'PASSIVE_DIAGNOSTIC',
            'Escape-point intake is missing observable unsafe act/omission statement.',
          ),
        )
      }
      if (!isNonEmptyString(anchor.operationalMoment?.description)) {
        issues.push(
          issue(
            'INTAKE_OPERATIONAL_MOMENT_MISSING',
            'PASSIVE_DIAGNOSTIC',
            'Escape-point intake is missing operational moment description.',
          ),
        )
      }
      if (anchor.pointTopology === 'progressive') {
        if (!anchor.zoneBoundary) {
          issues.push(
            issue(
              'INTAKE_PROGRESSIVE_ZONE_BOUNDARY_MISSING',
              'PASSIVE_DIAGNOSTIC',
              'Progressive intake requires zoneBoundary with earliest/latest controllable references.',
            ),
          )
        } else if (
          !isNonEmptyString(anchor.zoneBoundary.earliestControllableRef) ||
          !isNonEmptyString(anchor.zoneBoundary.latestControllableRef)
        ) {
          issues.push(
            issue(
              'INTAKE_PROGRESSIVE_ZONE_BOUNDARY_INCOMPLETE',
              'PASSIVE_DIAGNOSTIC',
              'Progressive intake zoneBoundary must include earliestControllableRef and latestControllableRef.',
            ),
          )
        }
      } else if (anchor.pointTopology === 'diffuse') {
        issues.push(
          issue(
            'INTAKE_DIFFUSE_SPLIT_REQUIRED',
            'PASSIVE_DIAGNOSTIC',
            'Diffuse intake remains candidate-only and requires split into discrete/progressive before future enforcement.',
          ),
        )
      } else if (anchor.pointTopology !== 'discrete') {
        issues.push(issue('INTAKE_TOPOLOGY_MISSING', 'PASSIVE_DIAGNOSTIC', 'Escape-point intake has invalid or missing topology.'))
      }
    }
  }

  for (const axisKey of ['perception', 'objective', 'action'] as const) {
    const axis = toCanonicalAxis(axisKey)
    const metadata = intake.axisMetadata[axisKey]
    if (!metadata) {
      issues.push(
        issue(
          'INTAKE_AXIS_METADATA_MISSING',
          'PASSIVE_DIAGNOSTIC',
          `Escape-point intake is missing ${axisKey} axis metadata.`,
          { axis, axisKey },
        ),
      )
      continue
    }

    if (!isNonEmptyString(metadata.axisAgentRef)) {
      issues.push(
        issue(
          'INTAKE_AXIS_AGENT_REF_MISSING',
          'PASSIVE_DIAGNOSTIC',
          `${axisKey} axis metadata is missing axisAgentRef for future ENFORCE readiness.`,
          { axis, axisKey },
        ),
      )
    }

    if (metadata.proposedCode === 'O-E') {
      issues.push(
        issue(
          'INTAKE_NON_EXISTENT_PROPOSED_CODE',
          'PASSIVE_DIAGNOSTIC',
          `${axisKey} proposedCode "O-E" is NON_EXISTENT_IN_SERA_PT_V1 and remains blocked/non-active.`,
          { axis, axisKey },
        ),
      )
    }
  }

  if (hasLockViolation(intake)) {
    issues.push(
      issue(
        'INTAKE_CANDIDATE_LOCK_VIOLATION',
        'PASSIVE_DIAGNOSTIC',
        'Passive intake lock violation detected; candidate-only locks must stay closed.',
      ),
    )
  }

  const hasScopeMissing = issues.some((item) => item.code === 'INTAKE_SCOPE_REQUIRED')
  const hasDiffuseSplitRequirement = issues.some((item) => item.code === 'INTAKE_DIFFUSE_SPLIT_REQUIRED')
  const hasReadinessIssue = issues.some((item) =>
    [
      'INTAKE_SCOPE_ANCHOR_MISSING',
      'INTAKE_AGENT_MISSING',
      'INTAKE_ACT_OR_OMISSION_MISSING',
      'INTAKE_OPERATIONAL_MOMENT_MISSING',
      'INTAKE_TOPOLOGY_MISSING',
      'INTAKE_PROGRESSIVE_ZONE_BOUNDARY_MISSING',
      'INTAKE_PROGRESSIVE_ZONE_BOUNDARY_INCOMPLETE',
      'INTAKE_AXIS_METADATA_MISSING',
      'INTAKE_AXIS_AGENT_REF_MISSING',
      'INTAKE_NON_EXISTENT_PROPOSED_CODE',
      'INTAKE_CANDIDATE_LOCK_VIOLATION',
    ].includes(item.code),
  )

  const readinessStatus: SeraVNextEscapePointIntakeReadinessStatus = hasScopeMissing
    ? 'PASSIVE_INTAKE_SCOPE_MISSING'
    : hasDiffuseSplitRequirement
      ? 'PASSIVE_INTAKE_DIFFUSE_SPLIT_REQUIRED'
      : hasReadinessIssue
        ? 'PASSIVE_INTAKE_INCOMPLETE'
        : issues.length > 0
          ? 'PASSIVE_INTAKE_READY_WITH_WARNINGS'
          : 'PASSIVE_INTAKE_READY'

  return {
    intakeId: intake.intakeId,
    eventId: intake.eventId,
    readinessStatus,
    readyForFutureEnforcement:
      readinessStatus === 'PASSIVE_INTAKE_READY' &&
      normalizedScopeStatus?.readyForFutureEnforcement === true &&
      !hasReadinessIssue,
    issues,
    scopeAcceptedForPassiveRuntime: Boolean(activeScope),
    normalizedScopeStatus,
    ...CANDIDATE_ONLY_LOCKS,
  }
}

export function convertIntakeToCanonicalRuntimeContext(
  intake: SeraVNextEscapePointIntake,
): SeraVNextPassiveIntakeRuntimeContext {
  const approvedEscapePointScope = intake.approvedEscapePointScope ?? intake.draftEscapePointScope ?? null
  const canonicalRuntimeContext: SeraVNextCanonicalRuntimeContext | null = approvedEscapePointScope
    ? { approvedEscapePointScope }
    : null

  const axisAgentRefs: Partial<Record<CanonicalSeraAxis, string | null>> = {}
  const axisMomentRefs: Partial<Record<CanonicalSeraAxis, string | null>> = {}
  const axisEvidenceRefs: Partial<Record<CanonicalSeraAxis, string[]>> = {}
  const proposedCodes: Partial<Record<CanonicalSeraAxis, CanonicalSeraLeafCode | null>> = {}
  const nonExistentProposedCodeAxes: CanonicalSeraAxis[] = []
  const questionNodeRefsByAxis: Partial<Record<CanonicalSeraAxis, string[]>> = {}
  const limitationsByAxis: Partial<Record<CanonicalSeraAxis, string[]>> = {}

  for (const axisKey of ['perception', 'objective', 'action'] as const) {
    const axis = toCanonicalAxis(axisKey)
    const metadata = intake.axisMetadata[axisKey]

    if (metadata.axisAgentRef !== undefined) {
      axisAgentRefs[axis] = metadata.axisAgentRef ?? null
    }
    if (metadata.axisMomentRef !== undefined) {
      axisMomentRefs[axis] = metadata.axisMomentRef ?? null
    }
    if (metadata.axisEvidenceRefs && metadata.axisEvidenceRefs.length > 0) {
      axisEvidenceRefs[axis] = [...metadata.axisEvidenceRefs]
    }
    if (metadata.questionNodeRefs && metadata.questionNodeRefs.length > 0) {
      questionNodeRefsByAxis[axis] = [...metadata.questionNodeRefs]
    }
    if (metadata.limitations && metadata.limitations.length > 0) {
      limitationsByAxis[axis] = [...metadata.limitations]
    }

    if (metadata.proposedCode === 'O-E') {
      nonExistentProposedCodeAxes.push(axis)
      proposedCodes[axis] = null
      continue
    }

    if (metadata.proposedCode && isCanonicalSeraLeafCode(axis, metadata.proposedCode)) {
      proposedCodes[axis] = metadata.proposedCode
    } else if (metadata.proposedCode) {
      proposedCodes[axis] = null
    }
  }

  return {
    intakeId: intake.intakeId,
    eventId: intake.eventId,
    canonicalRuntimeContext,
    approvedEscapePointScope,
    enforcementMode: 'PASSIVE_COMPAT',
    axisAgentRefs,
    axisMomentRefs,
    axisEvidenceRefs,
    proposedCodes,
    nonExistentProposedCodeAxes,
    questionNodeRefsByAxis,
    limitationsByAxis,
    ...CANDIDATE_ONLY_LOCKS,
  }
}

