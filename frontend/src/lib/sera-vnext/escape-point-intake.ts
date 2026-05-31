import { isCanonicalSeraLeafCode } from './canonical-codes'
import {
  normalizeApprovedEscapePointScope,
  type SeraVNextEscapePointStatusMappingResult,
} from './escape-point-scope'
import type {
  ApprovedEscapePointScope,
  CanonicalSeraCandidateLeafCode,
  CanonicalSeraAxis,
  CanonicalSeraLeafCode,
  CanonicalSeraNonExistentLeafCode,
  SeraVNextEscapePointAnchor,
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
  | 'INTAKE_FUTURE_ENFORCE_TEMPORAL_ANCHOR_MISSING'
  | 'INTAKE_TOPOLOGY_MISSING'
  | 'INTAKE_PROGRESSIVE_ZONE_BOUNDARY_MISSING'
  | 'INTAKE_PROGRESSIVE_ZONE_BOUNDARY_INCOMPLETE'
  | 'INTAKE_DIFFUSE_SPLIT_REQUIRED'
  | 'INTAKE_AXIS_METADATA_MISSING'
  | 'INTAKE_AXIS_AGENT_REF_MISSING'
  | 'INTAKE_AXIS_AGENT_REF_MISMATCH'
  | 'INTAKE_AXIS_MOMENT_REF_MISSING'
  | 'INTAKE_AXIS_EVIDENCE_REFS_MISSING'
  | 'INTAKE_NON_EXISTENT_PROPOSED_CODE'
  | 'INTAKE_INVALID_PROPOSED_CODE'
  | 'INTAKE_CANDIDATE_LOCK_VIOLATION'

export type SeraVNextEscapePointIntakeIssueSeverity = 'PASSIVE_INFO' | 'PASSIVE_DIAGNOSTIC'
export type SeraVNextEscapePointIntakeIssueClass = 'ISSUE' | 'WARNING' | 'BLOCKER_PASSIVE'

export interface SeraVNextEscapePointIntakeIssue {
  code: SeraVNextEscapePointIntakeIssueCode
  severity: SeraVNextEscapePointIntakeIssueSeverity
  issueClass: SeraVNextEscapePointIntakeIssueClass
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
  issueCount: number
  warningCount: number
  passiveBlockerCount: number
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
  issueClass: SeraVNextEscapePointIntakeIssueClass,
  message: string,
  context?: Partial<Pick<SeraVNextEscapePointIntakeIssue, 'axis' | 'axisKey'>>,
): SeraVNextEscapePointIntakeIssue {
  return {
    code,
    severity,
    issueClass,
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

function hasFutureTemporalAnchor(anchor: SeraVNextEscapePointAnchor): boolean {
  if (isNonEmptyString(anchor.operationalMoment.sequenceRef) || isNonEmptyString(anchor.operationalMoment.phaseRef)) {
    return true
  }
  return isNonEmptyString(anchor.zoneBoundary?.earliestControllableRef)
}

function getAxisMetadata(
  intake: SeraVNextEscapePointIntake,
  axisKey: SeraVNextEscapePointIntakeAxisKey,
): SeraVNextEscapePointIntakeAxisMetadata | null {
  const raw = (intake as unknown as { axisMetadata?: Record<string, unknown> }).axisMetadata
  if (!raw || typeof raw !== 'object') {
    return null
  }
  const candidate = raw[axisKey]
  if (!candidate || typeof candidate !== 'object') {
    return null
  }
  return candidate as SeraVNextEscapePointIntakeAxisMetadata
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
        'BLOCKER_PASSIVE',
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
          'BLOCKER_PASSIVE',
          'Escape-point scope is present but missing escapePointAnchor in intake.',
        ),
      )
    } else {
      if (!isNonEmptyString(anchor.agentId)) {
        issues.push(
          issue(
            'INTAKE_AGENT_MISSING',
            'PASSIVE_DIAGNOSTIC',
            'BLOCKER_PASSIVE',
            'Escape-point intake is missing anchor agentId.',
          ),
        )
      }
      if (!isNonEmptyString(anchor.unsafeActOrOmission?.statement)) {
        issues.push(
          issue(
            'INTAKE_ACT_OR_OMISSION_MISSING',
            'PASSIVE_DIAGNOSTIC',
            'BLOCKER_PASSIVE',
            'Escape-point intake is missing observable unsafe act/omission statement.',
          ),
        )
      }
      if (!isNonEmptyString(anchor.operationalMoment?.description)) {
        issues.push(
          issue(
            'INTAKE_OPERATIONAL_MOMENT_MISSING',
            'PASSIVE_DIAGNOSTIC',
            'BLOCKER_PASSIVE',
            'Escape-point intake is missing operational moment description.',
          ),
        )
      }
      if (!hasFutureTemporalAnchor(anchor)) {
        issues.push(
          issue(
            'INTAKE_FUTURE_ENFORCE_TEMPORAL_ANCHOR_MISSING',
            'PASSIVE_DIAGNOSTIC',
            'BLOCKER_PASSIVE',
            'Future ENFORCE readiness requires sequenceRef/phaseRef/earliestControllableRef in escape-point scope.',
          ),
        )
      }
      if (anchor.pointTopology === 'progressive') {
        if (!anchor.zoneBoundary) {
          issues.push(
            issue(
              'INTAKE_PROGRESSIVE_ZONE_BOUNDARY_MISSING',
              'PASSIVE_DIAGNOSTIC',
              'BLOCKER_PASSIVE',
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
              'BLOCKER_PASSIVE',
              'Progressive intake zoneBoundary must include earliestControllableRef and latestControllableRef.',
            ),
          )
        }
      } else if (anchor.pointTopology === 'diffuse') {
        issues.push(
          issue(
            'INTAKE_DIFFUSE_SPLIT_REQUIRED',
            'PASSIVE_DIAGNOSTIC',
            'BLOCKER_PASSIVE',
            'Diffuse intake remains candidate-only and requires split into discrete/progressive before future enforcement.',
          ),
        )
      } else if (anchor.pointTopology !== 'discrete') {
        issues.push(
          issue(
            'INTAKE_TOPOLOGY_MISSING',
            'PASSIVE_DIAGNOSTIC',
            'BLOCKER_PASSIVE',
            'Escape-point intake has invalid or missing topology.',
          ),
        )
      }
    }
  }

  for (const axisKey of ['perception', 'objective', 'action'] as const) {
    const axis = toCanonicalAxis(axisKey)
    const metadata = getAxisMetadata(intake, axisKey)
    if (!metadata) {
      issues.push(
        issue(
          'INTAKE_AXIS_METADATA_MISSING',
          'PASSIVE_DIAGNOSTIC',
          'BLOCKER_PASSIVE',
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
          'BLOCKER_PASSIVE',
          `${axisKey} axis metadata is missing axisAgentRef for future ENFORCE readiness.`,
          { axis, axisKey },
        ),
      )
    }
    const scopeAgentId = activeScope?.escapePointAnchor?.agentId?.trim()
    const axisAgentRef = metadata.axisAgentRef?.trim()
    if (isNonEmptyString(scopeAgentId) && isNonEmptyString(axisAgentRef) && axisAgentRef !== scopeAgentId) {
      issues.push(
        issue(
          'INTAKE_AXIS_AGENT_REF_MISMATCH',
          'PASSIVE_DIAGNOSTIC',
          'BLOCKER_PASSIVE',
          `${axisKey} axisAgentRef diverges from escape-point anchor agentId.`,
          { axis, axisKey },
        ),
      )
    }
    if (!isNonEmptyString(metadata.axisMomentRef)) {
      issues.push(
        issue(
          'INTAKE_AXIS_MOMENT_REF_MISSING',
          'PASSIVE_INFO',
          'WARNING',
          `${axisKey} axis metadata is missing axisMomentRef for future temporal consistency checks.`,
          { axis, axisKey },
        ),
      )
    }
    if (!metadata.axisEvidenceRefs || metadata.axisEvidenceRefs.length === 0) {
      issues.push(
        issue(
          'INTAKE_AXIS_EVIDENCE_REFS_MISSING',
          'PASSIVE_INFO',
          'WARNING',
          `${axisKey} axis metadata is missing axisEvidenceRefs for evidence-bound enforcement readiness.`,
          { axis, axisKey },
        ),
      )
    }

    if (metadata.proposedCode === 'O-E') {
      issues.push(
        issue(
          'INTAKE_NON_EXISTENT_PROPOSED_CODE',
          'PASSIVE_DIAGNOSTIC',
          'ISSUE',
          `${axisKey} proposedCode "O-E" is NON_EXISTENT_IN_SERA_PT_V1 and remains blocked/non-active.`,
          { axis, axisKey },
        ),
      )
      continue
    }
    if (metadata.proposedCode) {
      const proposed = metadata.proposedCode as string
      if (!isCanonicalSeraLeafCode(axis, proposed)) {
        issues.push(
          issue(
            'INTAKE_INVALID_PROPOSED_CODE',
            'PASSIVE_DIAGNOSTIC',
            'ISSUE',
            `${axisKey} proposedCode "${proposed}" is outside canonical allowlist for axis ${axis}.`,
            { axis, axisKey },
          ),
        )
      }
    }
  }

  if (hasLockViolation(intake)) {
    issues.push(
      issue(
        'INTAKE_CANDIDATE_LOCK_VIOLATION',
        'PASSIVE_DIAGNOSTIC',
        'BLOCKER_PASSIVE',
        'Passive intake lock violation detected; candidate-only locks must stay closed.',
      ),
    )
  }

  const passiveBlockerCount = issues.filter((item) => item.issueClass === 'BLOCKER_PASSIVE').length
  const warningCount = issues.filter((item) => item.issueClass === 'WARNING').length
  const issueCount = issues.filter((item) => item.issueClass === 'ISSUE').length
  const hasScopeMissing = issues.some((item) => item.code === 'INTAKE_SCOPE_REQUIRED')
  const hasDiffuseSplitRequirement = issues.some((item) => item.code === 'INTAKE_DIFFUSE_SPLIT_REQUIRED')
  const hasPassiveBlocker = passiveBlockerCount > 0

  const readinessStatus: SeraVNextEscapePointIntakeReadinessStatus = hasScopeMissing
    ? 'PASSIVE_INTAKE_SCOPE_MISSING'
    : hasDiffuseSplitRequirement
      ? 'PASSIVE_INTAKE_DIFFUSE_SPLIT_REQUIRED'
      : hasPassiveBlocker
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
      !hasPassiveBlocker,
    issues,
    issueCount,
    warningCount,
    passiveBlockerCount,
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
    const metadata = getAxisMetadata(intake, axisKey)
    if (!metadata) {
      continue
    }

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

    const proposedCode = metadata.proposedCode as CanonicalSeraCandidateLeafCode | undefined
    if (proposedCode && isCanonicalSeraLeafCode(axis, proposedCode)) {
      proposedCodes[axis] = proposedCode
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
