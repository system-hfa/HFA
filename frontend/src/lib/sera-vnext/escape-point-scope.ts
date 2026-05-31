import type {
  ApprovedEscapePointScope,
  SeraVNextEscapePointAnchor,
  SeraVNextEscapePointEnforcementMode,
  SeraVNextEscapePointScopeStatus,
  SeraVNextEscapePointTopology,
} from './types'

export type SeraVNextEscapePointEnforcementStatus = 'PASSIVE_NOT_ENFORCED'

export type SeraVNextEscapePointAnchorReadiness =
  | 'SCOPE_ABSENT'
  | 'LEGACY_NO_ANCHOR'
  | 'ANCHORED_DISCRETE'
  | 'ANCHORED_PROGRESSIVE_COMPLETE'
  | 'ANCHORED_PROGRESSIVE_INCOMPLETE'
  | 'ANCHORED_DIFFUSE'
  | 'INVALID_ANCHOR'

export type SeraVNextEscapePointScopeIssueCode =
  | 'ESCAPE_POINT_SCOPE_ABSENT'
  | 'ESCAPE_POINT_ANCHOR_MISSING'
  | 'ESCAPE_POINT_AGENT_MISSING'
  | 'ESCAPE_POINT_ACT_OR_OMISSION_MISSING'
  | 'ESCAPE_POINT_OPERATIONAL_MOMENT_MISSING'
  | 'ESCAPE_POINT_TOPOLOGY_MISSING'
  | 'ESCAPE_POINT_PROGRESSIVE_ZONE_BOUNDARY_MISSING'
  | 'ESCAPE_POINT_PROGRESSIVE_ZONE_BOUNDARY_INCOMPLETE'
  | 'ESCAPE_POINT_DIFFUSE_SPLIT_REQUIRED'
  | 'ESCAPE_POINT_UNKNOWN_STATUS_VOCABULARY'

export type SeraVNextEscapePointScopeIssueSeverity = 'PASSIVE_INFO' | 'PASSIVE_DIAGNOSTIC'

export interface SeraVNextEscapePointScopeIssue {
  code: SeraVNextEscapePointScopeIssueCode
  severity: SeraVNextEscapePointScopeIssueSeverity
  message: string
  blocksTraversal: false
}

export interface SeraVNextEscapePointStatusMappingResult {
  inputStatus: SeraVNextEscapePointScopeStatus | null
  normalizedEnforcementStatus: SeraVNextEscapePointEnforcementStatus
  enforcementMode: SeraVNextEscapePointEnforcementMode
  anchorReadiness: SeraVNextEscapePointAnchorReadiness
  scopePresent: boolean
  anchorPresent: boolean
  topology: SeraVNextEscapePointTopology | null
  readyForFutureEnforcement: boolean
  issues: SeraVNextEscapePointScopeIssue[]
  enforcementActive: false
  blocksTraversal: false
  selectedCodeAllowed: false
  releasedCodeAllowed: false
  classificationAllowed: false
  finalConclusionAllowed: false
  downstreamAllowed: false
}

const KNOWN_STATUS_VOCABULARY: readonly SeraVNextEscapePointScopeStatus[] = [
  'DEFINED_NOT_ENFORCED',
  'APPROVED_NOT_ENFORCED',
  'PASSIVE_NOT_ENFORCED',
]

const PASSIVE_GUARDS = {
  normalizedEnforcementStatus: 'PASSIVE_NOT_ENFORCED' as const,
  enforcementMode: 'PASSIVE_CANDIDATE_ONLY' as const,
  enforcementActive: false as const,
  blocksTraversal: false as const,
  selectedCodeAllowed: false as const,
  releasedCodeAllowed: false as const,
  classificationAllowed: false as const,
  finalConclusionAllowed: false as const,
  downstreamAllowed: false as const,
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function issue(
  code: SeraVNextEscapePointScopeIssueCode,
  severity: SeraVNextEscapePointScopeIssueSeverity,
  message: string,
): SeraVNextEscapePointScopeIssue {
  return { code, severity, message, blocksTraversal: false }
}

function normalizeStatusVocabulary(
  status: SeraVNextEscapePointScopeStatus,
  issues: SeraVNextEscapePointScopeIssue[],
): SeraVNextEscapePointScopeStatus | null {
  if (KNOWN_STATUS_VOCABULARY.includes(status)) {
    return status
  }
  issues.push(
    issue(
      'ESCAPE_POINT_UNKNOWN_STATUS_VOCABULARY',
      'PASSIVE_DIAGNOSTIC',
      `Unknown escape-point scope status vocabulary "${String(status)}"; treated as passive and not ready for enforcement.`,
    ),
  )
  return null
}

function analyzeAnchor(
  anchor: SeraVNextEscapePointAnchor,
  issues: SeraVNextEscapePointScopeIssue[],
): {
  anchorReadiness: SeraVNextEscapePointAnchorReadiness
  topology: SeraVNextEscapePointTopology | null
  readyForFutureEnforcement: boolean
} {
  let invalid = false

  if (!isNonEmptyString(anchor.agentId)) {
    issues.push(
      issue('ESCAPE_POINT_AGENT_MISSING', 'PASSIVE_DIAGNOSTIC', 'Escape-point anchor is missing a non-empty agentId.'),
    )
    invalid = true
  }

  if (!anchor.unsafeActOrOmission || !isNonEmptyString(anchor.unsafeActOrOmission.statement)) {
    issues.push(
      issue(
        'ESCAPE_POINT_ACT_OR_OMISSION_MISSING',
        'PASSIVE_DIAGNOSTIC',
        'Escape-point anchor is missing an unsafeActOrOmission statement.',
      ),
    )
    invalid = true
  }

  if (!anchor.operationalMoment || !isNonEmptyString(anchor.operationalMoment.description)) {
    issues.push(
      issue(
        'ESCAPE_POINT_OPERATIONAL_MOMENT_MISSING',
        'PASSIVE_DIAGNOSTIC',
        'Escape-point anchor is missing an operationalMoment description.',
      ),
    )
    invalid = true
  }

  const topology = anchor.pointTopology
  if (topology !== 'discrete' && topology !== 'progressive' && topology !== 'diffuse') {
    issues.push(
      issue('ESCAPE_POINT_TOPOLOGY_MISSING', 'PASSIVE_DIAGNOSTIC', 'Escape-point anchor is missing a valid pointTopology.'),
    )
    invalid = true
  }

  if (invalid) {
    return { anchorReadiness: 'INVALID_ANCHOR', topology: null, readyForFutureEnforcement: false }
  }

  if (topology === 'discrete') {
    return { anchorReadiness: 'ANCHORED_DISCRETE', topology, readyForFutureEnforcement: true }
  }

  if (topology === 'progressive') {
    const zone = anchor.zoneBoundary
    if (!zone) {
      issues.push(
        issue(
          'ESCAPE_POINT_PROGRESSIVE_ZONE_BOUNDARY_MISSING',
          'PASSIVE_DIAGNOSTIC',
          'Progressive escape-point requires zoneBoundary with earliestControllableRef and latestControllableRef.',
        ),
      )
      return { anchorReadiness: 'ANCHORED_PROGRESSIVE_INCOMPLETE', topology, readyForFutureEnforcement: false }
    }
    if (!isNonEmptyString(zone.earliestControllableRef) || !isNonEmptyString(zone.latestControllableRef)) {
      issues.push(
        issue(
          'ESCAPE_POINT_PROGRESSIVE_ZONE_BOUNDARY_INCOMPLETE',
          'PASSIVE_DIAGNOSTIC',
          'Progressive escape-point zoneBoundary must define both earliestControllableRef and latestControllableRef.',
        ),
      )
      return { anchorReadiness: 'ANCHORED_PROGRESSIVE_INCOMPLETE', topology, readyForFutureEnforcement: false }
    }
    return { anchorReadiness: 'ANCHORED_PROGRESSIVE_COMPLETE', topology, readyForFutureEnforcement: true }
  }

  issues.push(
    issue(
      'ESCAPE_POINT_DIFFUSE_SPLIT_REQUIRED',
      'PASSIVE_DIAGNOSTIC',
      'Diffuse escape-point must be split into discrete or progressive anchors before future enforcement.',
    ),
  )
  return { anchorReadiness: 'ANCHORED_DIFFUSE', topology: 'diffuse', readyForFutureEnforcement: false }
}

export function normalizeApprovedEscapePointScope(
  scope: ApprovedEscapePointScope | undefined | null,
): SeraVNextEscapePointStatusMappingResult {
  const issues: SeraVNextEscapePointScopeIssue[] = []

  if (scope === undefined || scope === null) {
    issues.push(
      issue(
        'ESCAPE_POINT_SCOPE_ABSENT',
        'PASSIVE_INFO',
        'No approvedEscapePointScope provided; runtime stays candidate-only and not ready for enforcement.',
      ),
    )
    return {
      inputStatus: null,
      anchorReadiness: 'SCOPE_ABSENT',
      scopePresent: false,
      anchorPresent: false,
      topology: null,
      readyForFutureEnforcement: false,
      issues,
      ...PASSIVE_GUARDS,
    }
  }

  const inputStatus = normalizeStatusVocabulary(scope.status, issues)

  if (!scope.escapePointAnchor) {
    issues.push(
      issue(
        'ESCAPE_POINT_ANCHOR_MISSING',
        'PASSIVE_INFO',
        'Legacy escape-point scope without escapePointAnchor; accepted as passive but not ready for enforcement.',
      ),
    )
    return {
      inputStatus,
      anchorReadiness: 'LEGACY_NO_ANCHOR',
      scopePresent: true,
      anchorPresent: false,
      topology: null,
      readyForFutureEnforcement: false,
      issues,
      ...PASSIVE_GUARDS,
    }
  }

  const anchorAnalysis = analyzeAnchor(scope.escapePointAnchor, issues)

  return {
    inputStatus,
    anchorReadiness: anchorAnalysis.anchorReadiness,
    scopePresent: true,
    anchorPresent: true,
    topology: anchorAnalysis.topology,
    readyForFutureEnforcement: inputStatus !== null && anchorAnalysis.readyForFutureEnforcement,
    issues,
    ...PASSIVE_GUARDS,
  }
}

export function isEscapePointScopeReadyForFutureEnforcement(
  result: SeraVNextEscapePointStatusMappingResult,
): boolean {
  return result.readyForFutureEnforcement
}
