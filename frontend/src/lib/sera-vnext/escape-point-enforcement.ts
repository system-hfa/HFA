import {
  normalizeApprovedEscapePointScope,
  type SeraVNextEscapePointAnchorReadiness,
} from './escape-point-scope'
import type {
  ApprovedEscapePointScope,
  CanonicalSeraAxis,
  CanonicalSeraLeafCode,
  SeraVNextEscapePointAnchor,
  SeraVNextEscapePointTopology,
} from './types'

export type EscapePointEnforcementMode = 'PASSIVE_COMPAT' | 'ENFORCE'

export type EscapePointEnforcementStatus =
  | 'ESCAPE_POINT_ENFORCED_OK'
  | 'ESCAPE_POINT_PASSIVE_NOT_ENFORCED'
  | 'ESCAPE_POINT_BLOCKED_SCOPE_ABSENT'
  | 'ESCAPE_POINT_BLOCKED_SCOPE_INVALID'
  | 'ESCAPE_POINT_BLOCKED_AGENT_MIGRATION'
  | 'ESCAPE_POINT_BLOCKED_POST_EVENT_ANALYSIS'
  | 'ESCAPE_POINT_BLOCKED_CONSEQUENCE_AS_BASIS'
  | 'ESCAPE_POINT_BLOCKED_FORBIDDEN_CODE_FOR_AGENT'
  | 'ESCAPE_POINT_BLOCKED_DIFFUSE_REQUIRES_SPLIT'
  | 'ESCAPE_POINT_BLOCKED_MULTIPLE_POINTS'

export type EscapePointEnforcementBlockingIssueCode =
  | 'EP-B01_AGENT_MIGRATION'
  | 'EP-B02_POST_EVENT_ANALYSIS'
  | 'EP-B03_CONSEQUENCE_AS_BASIS'
  | 'EP-B04_FORBIDDEN_CODE_FOR_AGENT'
  | 'EP-B05_DIFFUSE_REQUIRES_SPLIT'
  | 'EP-B06_MULTIPLE_POINTS'
  | 'EP-B07_SCOPE_INVALID'
  | 'EP-B08_SCOPE_ABSENT'

export type EscapePointEnforcementWarningCode =
  | 'EP-W01_PROGRESSIVE_ZONE_EARLIEST_CONTROLLABLE_REF_REQUIRED'
  | 'EP-W02_UNKNOWN_AGENT_CONSERVATIVE_REVIEW'
  | 'EP-W03_AXIS_EVIDENCE_BOUNDARY_WEAK'
  | 'EP-W04_SECONDARY_ANALYSIS_REQUIRED_FOR_OTHER_AGENT_RESPONSE'
  | 'EP-W05_PASSIVE_NOT_ENFORCED_COMPAT_MODE'

export interface EscapePointEnforcementInput {
  scope: ApprovedEscapePointScope | null | undefined
  axis: CanonicalSeraAxis
  enforcementMode?: EscapePointEnforcementMode
  axisAgentRef?: string | null
  axisEvidenceRefs?: string[]
  axisMomentRef?: string | null
  proposedCode?: CanonicalSeraLeafCode | null
  analysisContext?: string | null
  siblingEscapePointRefs?: string[]
}

export interface EscapePointEnforcementResult {
  status: EscapePointEnforcementStatus
  axis: CanonicalSeraAxis
  enforced: boolean
  enforcementMode: EscapePointEnforcementMode
  scopeId: string | null
  agentId: string | null
  topology: SeraVNextEscapePointTopology | null
  anchorReadiness: SeraVNextEscapePointAnchorReadiness
  blockingIssues: EscapePointEnforcementBlockingIssueCode[]
  warnings: EscapePointEnforcementWarningCode[]
  diagnostics: string[]
  nextRequiredAction: string
  selectedCodeAllowed: false
  releasedCodeAllowed: false
  poaClosureAllowed: false
  classificationAllowed: false
  downstreamAllowed: false
  finalConclusionAllowed: false
  notFinalClassification: true
}

export interface EscapePointEnforcementCodeTrace {
  code: EscapePointEnforcementBlockingIssueCode | EscapePointEnforcementWarningCode
  kind: 'BLOCKING' | 'WARNING'
  present: boolean
}

export interface EscapePointEnforcementDiagnosticsSummary {
  status: EscapePointEnforcementStatus
  enforcementMode: EscapePointEnforcementMode
  enforced: boolean
  blockingIssues: EscapePointEnforcementBlockingIssueCode[]
  warnings: EscapePointEnforcementWarningCode[]
  allBlockingIssueTrace: EscapePointEnforcementCodeTrace[]
  allWarningTrace: EscapePointEnforcementCodeTrace[]
  auditTrace: string[]
  candidateOnlyLocksIntact: boolean
  downstreamOutputsAbsent: boolean
  readinessForIndependentReview: 'READY' | 'BLOCKED'
}

const CANDIDATE_ONLY_LOCKS = {
  selectedCodeAllowed: false as const,
  releasedCodeAllowed: false as const,
  poaClosureAllowed: false as const,
  classificationAllowed: false as const,
  downstreamAllowed: false as const,
  finalConclusionAllowed: false as const,
  notFinalClassification: true as const,
}

const BLOCKING_ISSUE_CATALOG: readonly EscapePointEnforcementBlockingIssueCode[] = [
  'EP-B01_AGENT_MIGRATION',
  'EP-B02_POST_EVENT_ANALYSIS',
  'EP-B03_CONSEQUENCE_AS_BASIS',
  'EP-B04_FORBIDDEN_CODE_FOR_AGENT',
  'EP-B05_DIFFUSE_REQUIRES_SPLIT',
  'EP-B06_MULTIPLE_POINTS',
  'EP-B07_SCOPE_INVALID',
  'EP-B08_SCOPE_ABSENT',
]

const WARNING_CATALOG: readonly EscapePointEnforcementWarningCode[] = [
  'EP-W01_PROGRESSIVE_ZONE_EARLIEST_CONTROLLABLE_REF_REQUIRED',
  'EP-W02_UNKNOWN_AGENT_CONSERVATIVE_REVIEW',
  'EP-W03_AXIS_EVIDENCE_BOUNDARY_WEAK',
  'EP-W04_SECONDARY_ANALYSIS_REQUIRED_FOR_OTHER_AGENT_RESPONSE',
  'EP-W05_PASSIVE_NOT_ENFORCED_COMPAT_MODE',
]

const CANONICAL_LEAF_CODES: ReadonlySet<string> = new Set([
  'P-A', 'P-B', 'P-C', 'P-D', 'P-E', 'P-F', 'P-G', 'P-H',
  'O-A', 'O-B', 'O-C', 'O-D',
  'A-A', 'A-B', 'A-C', 'A-D', 'A-E', 'A-F', 'A-G', 'A-H', 'A-I', 'A-J',
])

const NON_EXISTENT_CODE = 'O-E'

const CONSEQUENCE_MARKERS = [
  'consequence', 'consequência', 'consequencia',
  'outcome', 'desfecho',
  'impact', 'impacto',
  'aftermath',
  'recovery', 'recuperação', 'recuperacao',
  'post-impact', 'post-event', 'pos-evento', 'pós-evento',
  'after-barrier', 'apos-barreira', 'após-barreira',
]

const POST_EVENT_TIME_MARKERS = [
  'after', 'depois', 'após', 'apos',
  'post', 'pós', 'pos',
  'recovery', 'recuperação', 'recuperacao',
  'aftermath',
]

const OTHER_AGENT_RESPONSE_MARKERS = [
  'pilot response', 'resposta do piloto',
  'crew response', 'resposta da tripulação', 'resposta da tripulacao',
  'tried to recover', 'tentou recuperar',
  'recovery attempt', 'tentativa de recuperação', 'tentativa de recuperacao',
]

const PHYSICAL_LIMITATION_MARKERS = [
  'physical limitation', 'limitação física', 'limitacao fisica',
  'ergonom',
  'reach limitation', 'limitação de alcance', 'limitacao de alcance',
  'strength limitation', 'limitação de força', 'limitacao de forca',
  'motor impairment', 'impairment motor',
  'anthropom',
  'ppe', 'epi',
]

const MAINTENANCE_OR_ORG_AGENT_MARKERS = [
  'maintenance', 'manutenção', 'manutencao',
  'technician', 'técnico', 'tecnico',
  'mechanic', 'mecânico', 'mecanico',
  'organization', 'organização', 'organizacao',
  'supervisor', 'supervisão', 'supervisao',
  'management', 'gestão', 'gestao',
]

const DESIGN_MANAGEMENT_AGENT_MARKERS = [
  'design', 'projeto',
  'engineering', 'engenharia',
  'engineer', 'engenheiro',
  'management', 'gestão', 'gestao',
  'manufacturer', 'fabricante',
]

function normalizeRefText(values: readonly (string | null | undefined)[]): string {
  return values
    .filter((value): value is string => typeof value === 'string')
    .join('  ')
    .toLowerCase()
}

function matchesAnyMarker(haystack: string, markers: readonly string[]): boolean {
  return markers.some((marker) => haystack.includes(marker.toLowerCase()))
}

function hasOwnAgentPhysicalLimitationEvidence(input: {
  evidenceText: string
  anchor: SeraVNextEscapePointAnchor
  axisAgentRef: string
}): boolean {
  if (!matchesAnyMarker(input.evidenceText, PHYSICAL_LIMITATION_MARKERS)) {
    return false
  }

  const explicitAgentRefs = [input.anchor.agentId, input.axisAgentRef]
    .map((ref) => ref.trim().toLowerCase())
    .filter((ref) => ref.length > 0)
  if (explicitAgentRefs.some((ref) => input.evidenceText.includes(ref))) {
    return true
  }

  if (input.anchor.agentKind === 'maintenance_or_org') {
    return matchesAnyMarker(input.evidenceText, MAINTENANCE_OR_ORG_AGENT_MARKERS)
  }

  if (input.anchor.agentKind === 'design_mgmt') {
    return matchesAnyMarker(input.evidenceText, DESIGN_MANAGEMENT_AGENT_MARKERS)
  }

  return false
}

function parseSequenceIndex(ref: string | null | undefined): number | null {
  if (typeof ref !== 'string') {
    return null
  }
  const match = ref.match(/(?:seq|step|moment|t)[\s:_+-]*?(\d+)/i)
  if (match) {
    return Number.parseInt(match[1], 10)
  }
  const bare = ref.trim().match(/^\+?(\d+)$/)
  if (bare) {
    return Number.parseInt(bare[1], 10)
  }
  return null
}

function isPostEventMoment(axisMomentRef: string | null | undefined, anchorMomentRef: string | null): boolean {
  if (typeof axisMomentRef !== 'string' || axisMomentRef.trim().length === 0) {
    return false
  }
  const axisSeq = parseSequenceIndex(axisMomentRef)
  const anchorSeq = parseSequenceIndex(anchorMomentRef)
  if (axisSeq !== null && anchorSeq !== null && axisSeq > anchorSeq) {
    return true
  }
  return matchesAnyMarker(axisMomentRef.toLowerCase(), POST_EVENT_TIME_MARKERS)
}

function buildResult(
  partial: Pick<
    EscapePointEnforcementResult,
    | 'status'
    | 'axis'
    | 'enforced'
    | 'enforcementMode'
    | 'scopeId'
    | 'agentId'
    | 'topology'
    | 'anchorReadiness'
    | 'blockingIssues'
    | 'warnings'
    | 'diagnostics'
    | 'nextRequiredAction'
  >,
): EscapePointEnforcementResult {
  return { ...partial, ...CANDIDATE_ONLY_LOCKS }
}

export function summarizeEscapePointEnforcementDiagnostics(
  result: EscapePointEnforcementResult,
): EscapePointEnforcementDiagnosticsSummary {
  const raw = result as unknown as Record<string, unknown>
  const candidateOnlyLocksIntact =
    result.selectedCodeAllowed === false &&
    result.releasedCodeAllowed === false &&
    result.poaClosureAllowed === false &&
    result.classificationAllowed === false &&
    result.downstreamAllowed === false &&
    result.finalConclusionAllowed === false &&
    result.notFinalClassification === true

  const downstreamOutputsAbsent =
    !Object.prototype.hasOwnProperty.call(raw, 'selectedCode') &&
    !Object.prototype.hasOwnProperty.call(raw, 'releasedCode') &&
    !Object.prototype.hasOwnProperty.call(raw, 'finalConclusion') &&
    !Object.prototype.hasOwnProperty.call(raw, 'hfacs') &&
    !Object.prototype.hasOwnProperty.call(raw, 'risk') &&
    !Object.prototype.hasOwnProperty.call(raw, 'erc') &&
    !Object.prototype.hasOwnProperty.call(raw, 'armsErc') &&
    !Object.prototype.hasOwnProperty.call(raw, 'recommendations')

  const allBlockingIssueTrace: EscapePointEnforcementCodeTrace[] = BLOCKING_ISSUE_CATALOG.map((code) => ({
    code,
    kind: 'BLOCKING',
    present: result.blockingIssues.includes(code),
  }))
  const allWarningTrace: EscapePointEnforcementCodeTrace[] = WARNING_CATALOG.map((code) => ({
    code,
    kind: 'WARNING',
    present: result.warnings.includes(code),
  }))

  const auditTrace: string[] = [
    `status:${result.status}`,
    `enforcementMode:${result.enforcementMode}`,
    `enforced:${String(result.enforced)}`,
    `scopeId:${result.scopeId ?? 'null'}`,
    `agentId:${result.agentId ?? 'null'}`,
    `topology:${result.topology ?? 'null'}`,
    `anchorReadiness:${result.anchorReadiness}`,
    ...result.blockingIssues.map((code) => `blocking:${code}`),
    ...result.warnings.map((code) => `warning:${code}`),
    ...result.diagnostics.map((item, index) => `diagnostic#${index + 1}:${item}`),
    `candidateOnlyLocksIntact:${String(candidateOnlyLocksIntact)}`,
    `downstreamOutputsAbsent:${String(downstreamOutputsAbsent)}`,
  ]

  return {
    status: result.status,
    enforcementMode: result.enforcementMode,
    enforced: result.enforced,
    blockingIssues: [...result.blockingIssues],
    warnings: [...result.warnings],
    allBlockingIssueTrace,
    allWarningTrace,
    auditTrace,
    candidateOnlyLocksIntact,
    downstreamOutputsAbsent,
    readinessForIndependentReview: candidateOnlyLocksIntact && downstreamOutputsAbsent ? 'READY' : 'BLOCKED',
  }
}

export function enforceEscapePointScope(input: EscapePointEnforcementInput): EscapePointEnforcementResult {
  const axis = input.axis
  const enforcementMode: EscapePointEnforcementMode = input.enforcementMode ?? 'PASSIVE_COMPAT'
  const requireEnforcement = enforcementMode === 'ENFORCE'
  const scope = input.scope
  const normalized = normalizeApprovedEscapePointScope(scope)

  // 1. Scope absent.
  if (!scope) {
    if (requireEnforcement) {
      return buildResult({
        status: 'ESCAPE_POINT_BLOCKED_SCOPE_ABSENT',
        axis,
        enforced: false,
        enforcementMode,
        scopeId: null,
        agentId: null,
        topology: null,
        anchorReadiness: normalized.anchorReadiness,
        blockingIssues: ['EP-B08_SCOPE_ABSENT'],
        warnings: [],
        diagnostics: ['No approvedEscapePointScope provided; enforcement cannot proceed.'],
        nextRequiredAction:
          'Provide an approved safe-operation escape-point scope (agent, unsafe act/omission, operational moment) before enforcement.',
      })
    }
    return buildResult({
      status: 'ESCAPE_POINT_PASSIVE_NOT_ENFORCED',
      axis,
      enforced: false,
      enforcementMode,
      scopeId: null,
      agentId: null,
      topology: null,
      anchorReadiness: normalized.anchorReadiness,
      blockingIssues: [],
      warnings: ['EP-W05_PASSIVE_NOT_ENFORCED_COMPAT_MODE'],
      diagnostics: ['Passive compatibility mode: no scope provided; runtime stays candidate-only and unblocked.'],
      nextRequiredAction: 'No enforcement applied (passive compat). Provide a scope and ENFORCE mode to enable enforcement.',
    })
  }

  const scopeId = scope.scopeId
  const anchor = scope.escapePointAnchor ?? null
  const agentId = anchor?.agentId ?? null
  const topology = normalized.topology
  const anchorReadiness = normalized.anchorReadiness
  const scopeDeclaresPassive =
    scope.status === 'PASSIVE_NOT_ENFORCED' || scope.enforcementMode === 'PASSIVE_CANDIDATE_ONLY'

  // 2. Passive compatibility (explicit passive scope, or non-enforcing caller). Never blocks, never OK.
  if (!requireEnforcement || scopeDeclaresPassive) {
    const diagnostics = [
      scopeDeclaresPassive
        ? 'Scope is explicitly passive (status/enforcementMode); enforcement deliberately not applied.'
        : 'Caller did not request enforcement; passive compatibility mode preserves candidate-only behavior.',
    ]
    if (!anchor) {
      diagnostics.push('Legacy scope without escapePointAnchor; accepted as passive but not enforcement-ready.')
    }
    return buildResult({
      status: 'ESCAPE_POINT_PASSIVE_NOT_ENFORCED',
      axis,
      enforced: false,
      enforcementMode,
      scopeId,
      agentId,
      topology,
      anchorReadiness,
      blockingIssues: [],
      warnings: ['EP-W05_PASSIVE_NOT_ENFORCED_COMPAT_MODE'],
      diagnostics,
      nextRequiredAction:
        'No enforcement applied (passive compat). Re-run in ENFORCE mode with an active, anchored scope to enforce.',
    })
  }

  // --- ENFORCE mode, active scope (status DEFINED_NOT_ENFORCED | APPROVED_NOT_ENFORCED) ---

  // 3. Multiple escape points declared.
  if (input.siblingEscapePointRefs && input.siblingEscapePointRefs.filter((ref) => ref.trim().length > 0).length > 0) {
    return buildResult({
      status: 'ESCAPE_POINT_BLOCKED_MULTIPLE_POINTS',
      axis,
      enforced: false,
      enforcementMode,
      scopeId,
      agentId,
      topology,
      anchorReadiness,
      blockingIssues: ['EP-B06_MULTIPLE_POINTS'],
      warnings: [],
      diagnostics: ['Multiple candidate escape points declared; methodology allows exactly one point per analysis.'],
      nextRequiredAction:
        'Select a single escape point for this analysis; open a separate secondary analysis for any other point.',
    })
  }

  // 4. Anchor must be present and structurally valid for enforcement.
  if (!anchor || anchorReadiness === 'LEGACY_NO_ANCHOR') {
    return buildResult({
      status: 'ESCAPE_POINT_BLOCKED_SCOPE_INVALID',
      axis,
      enforced: false,
      enforcementMode,
      scopeId,
      agentId,
      topology,
      anchorReadiness,
      blockingIssues: ['EP-B07_SCOPE_INVALID'],
      warnings: [],
      diagnostics: ['Enforcement requires an escapePointAnchor; legacy scope without anchor cannot be enforced.'],
      nextRequiredAction:
        'Add escapePointAnchor (agentId, unsafeActOrOmission, operationalMoment, pointTopology) before enforcement.',
    })
  }

  if (anchorReadiness === 'ANCHORED_DIFFUSE') {
    return buildResult({
      status: 'ESCAPE_POINT_BLOCKED_DIFFUSE_REQUIRES_SPLIT',
      axis,
      enforced: false,
      enforcementMode,
      scopeId,
      agentId,
      topology,
      anchorReadiness,
      blockingIssues: ['EP-B05_DIFFUSE_REQUIRES_SPLIT'],
      warnings: [],
      diagnostics: ['Diffuse escape point cannot be enforced; it must be decomposed into discrete points.'],
      nextRequiredAction:
        'Decompose the diffuse point into discrete escape points; open a secondary analysis for any other agent response.',
    })
  }

  if (anchorReadiness === 'ANCHORED_PROGRESSIVE_INCOMPLETE' || anchorReadiness === 'INVALID_ANCHOR') {
    return buildResult({
      status: 'ESCAPE_POINT_BLOCKED_SCOPE_INVALID',
      axis,
      enforced: false,
      enforcementMode,
      scopeId,
      agentId,
      topology,
      anchorReadiness,
      blockingIssues: ['EP-B07_SCOPE_INVALID'],
      warnings: [],
      diagnostics: [
        anchorReadiness === 'ANCHORED_PROGRESSIVE_INCOMPLETE'
          ? 'Progressive escape point lacks a complete controllability zone boundary.'
          : 'Escape-point anchor is missing required fields (agent, act/omission, operational moment, or topology).',
      ],
      nextRequiredAction:
        anchorReadiness === 'ANCHORED_PROGRESSIVE_INCOMPLETE'
          ? 'Provide zoneBoundary.earliestControllableRef and zoneBoundary.latestControllableRef.'
          : 'Complete the escape-point anchor required fields before enforcement.',
    })
  }

  // anchorReadiness is ANCHORED_DISCRETE or ANCHORED_PROGRESSIVE_COMPLETE.
  const warnings: EscapePointEnforcementWarningCode[] = []
  const diagnostics: string[] = []

  let anchorMomentRef: string | null = anchor.operationalMoment.sequenceRef ?? null
  if (anchorReadiness === 'ANCHORED_PROGRESSIVE_COMPLETE' && anchor.zoneBoundary) {
    anchorMomentRef = anchor.zoneBoundary.earliestControllableRef
    warnings.push('EP-W01_PROGRESSIVE_ZONE_EARLIEST_CONTROLLABLE_REF_REQUIRED')
    diagnostics.push('Progressive zone: earliestControllableRef used as the enforcement moment anchor.')
  }

  // Boundary evidence is required for enforcement.
  const hasBoundaryEvidence =
    (scope.boundaryEvidenceRefs?.length ?? 0) > 0 || (anchor.boundaryEvidenceRefs?.length ?? 0) > 0
  if (!hasBoundaryEvidence) {
    return buildResult({
      status: 'ESCAPE_POINT_BLOCKED_SCOPE_INVALID',
      axis,
      enforced: false,
      enforcementMode,
      scopeId,
      agentId,
      topology,
      anchorReadiness,
      blockingIssues: ['EP-B07_SCOPE_INVALID'],
      warnings,
      diagnostics: [...diagnostics, 'Escape-point enforcement requires boundary evidence references.'],
      nextRequiredAction: 'Provide boundaryEvidenceRefs anchoring the escape point before enforcement.',
    })
  }

  // O-E and any non-canonical proposed code cannot anchor enforcement.
  if (input.proposedCode != null && !CANONICAL_LEAF_CODES.has(input.proposedCode)) {
    const isNonExistent = (input.proposedCode as string) === NON_EXISTENT_CODE
    return buildResult({
      status: 'ESCAPE_POINT_BLOCKED_SCOPE_INVALID',
      axis,
      enforced: false,
      enforcementMode,
      scopeId,
      agentId,
      topology,
      anchorReadiness,
      blockingIssues: ['EP-B07_SCOPE_INVALID'],
      warnings,
      diagnostics: [
        ...diagnostics,
        isNonExistent
          ? `proposedCode "${NON_EXISTENT_CODE}" is NON_EXISTENT_IN_SERA_PT_V1 and cannot be an active proposed code.`
          : `proposedCode "${String(input.proposedCode)}" is not a canonical SERA leaf code.`,
      ],
      nextRequiredAction: 'Use a canonical SERA leaf code; O-E is non-existent and never an active proposed code.',
    })
  }

  // EP-B01: agent migration.
  const axisAgentRef = typeof input.axisAgentRef === 'string' ? input.axisAgentRef.trim() : ''
  if (axisAgentRef.length > 0 && axisAgentRef !== anchor.agentId) {
    return buildResult({
      status: 'ESCAPE_POINT_BLOCKED_AGENT_MIGRATION',
      axis,
      enforced: false,
      enforcementMode,
      scopeId,
      agentId,
      topology,
      anchorReadiness,
      blockingIssues: ['EP-B01_AGENT_MIGRATION'],
      warnings,
      diagnostics: [
        ...diagnostics,
        `Axis agent "${axisAgentRef}" differs from escape-point agent "${anchor.agentId}".`,
      ],
      nextRequiredAction: `Re-anchor P/O/A to escape-point agent "${anchor.agentId}", or open a separate secondary analysis for the other agent.`,
    })
  }

  // EP-B02: post-event analysis (axis moment after the escape-point moment).
  if (isPostEventMoment(input.axisMomentRef, anchorMomentRef)) {
    return buildResult({
      status: 'ESCAPE_POINT_BLOCKED_POST_EVENT_ANALYSIS',
      axis,
      enforced: false,
      enforcementMode,
      scopeId,
      agentId,
      topology,
      anchorReadiness,
      blockingIssues: ['EP-B02_POST_EVENT_ANALYSIS'],
      warnings,
      diagnostics: [
        ...diagnostics,
        `Axis moment "${String(input.axisMomentRef)}" is after the escape-point moment "${String(anchorMomentRef)}".`,
      ],
      nextRequiredAction: 'Analyze P/O/A at the escape-point moment, not after the safe-operation barrier broke.',
    })
  }

  // EP-B03: consequence used as the analysis basis.
  const evidenceText = normalizeRefText(input.axisEvidenceRefs ?? [])
  if (matchesAnyMarker(evidenceText, CONSEQUENCE_MARKERS)) {
    return buildResult({
      status: 'ESCAPE_POINT_BLOCKED_CONSEQUENCE_AS_BASIS',
      axis,
      enforced: false,
      enforcementMode,
      scopeId,
      agentId,
      topology,
      anchorReadiness,
      blockingIssues: ['EP-B03_CONSEQUENCE_AS_BASIS'],
      warnings,
      diagnostics: [...diagnostics, 'Axis evidence references a consequence/recovery/outcome as the analysis basis.'],
      nextRequiredAction: 'Base P/O/A on evidence at the escape point, not on post-barrier consequence or recovery.',
    })
  }

  // EP-B04: A-D forbidden for maintenance/organization or design/management agents.
  const agentKind = anchor.agentKind
  const isMaintenanceOrOrgAgent = agentKind === 'maintenance_or_org' || agentKind === 'design_mgmt'
  if (isMaintenanceOrOrgAgent && input.proposedCode === 'A-D') {
    const hasPhysicalLimitationEvidence = hasOwnAgentPhysicalLimitationEvidence({ evidenceText, anchor, axisAgentRef })
    if (!hasPhysicalLimitationEvidence) {
      return buildResult({
        status: 'ESCAPE_POINT_BLOCKED_FORBIDDEN_CODE_FOR_AGENT',
        axis,
        enforced: false,
        enforcementMode,
        scopeId,
        agentId,
        topology,
        anchorReadiness,
        blockingIssues: ['EP-B04_FORBIDDEN_CODE_FOR_AGENT'],
        warnings,
        diagnostics: [
          ...diagnostics,
          'A-D attributes a physical/motor limitation; forbidden for a maintenance/organization or design/management escape-point agent without explicit physical-limitation evidence of that agent.',
        ],
        nextRequiredAction:
          'Reclassify the action axis; A-D applies only with explicit physical/ergonomic limitation evidence of the escape-point agent itself.',
      })
    }
    diagnostics.push('A-D accepted for maintenance/org agent because explicit physical-limitation evidence was provided.')
  }

  // Non-blocking conservative warnings.
  if (agentKind === 'unknown' || axisAgentRef.length === 0) {
    warnings.push('EP-W02_UNKNOWN_AGENT_CONSERVATIVE_REVIEW')
  }
  if (evidenceText.trim().length === 0) {
    warnings.push('EP-W03_AXIS_EVIDENCE_BOUNDARY_WEAK')
  }
  if (typeof input.analysisContext === 'string' && matchesAnyMarker(input.analysisContext.toLowerCase(), OTHER_AGENT_RESPONSE_MARKERS)) {
    warnings.push('EP-W04_SECONDARY_ANALYSIS_REQUIRED_FOR_OTHER_AGENT_RESPONSE')
    diagnostics.push('Other-agent response detected in context; route it to a separate secondary analysis, not this point.')
  }

  return buildResult({
    status: 'ESCAPE_POINT_ENFORCED_OK',
    axis,
    enforced: true,
    enforcementMode,
    scopeId,
    agentId,
    topology,
    anchorReadiness,
    blockingIssues: [],
    warnings,
    diagnostics: [...diagnostics, 'Escape-point enforcement passed (candidate-only); P/O/A stays anchored to the escape-point agent/act/moment.'],
    nextRequiredAction:
      'Enforcement passed at the pure-module level; proceed only to candidate-only P/O/A traversal in a later, explicitly wired phase.',
  })
}
