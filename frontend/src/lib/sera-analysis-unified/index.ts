// Unified read adapter for SERA analyses.
// Provides a normalized contract that covers both legacy SERA events and
// SERA vNext Product Beta analyses without mixing methodology versions or
// double-counting sources.
//
// Design invariants:
// - Legacy rows are never falsified with vNext provenance.
// - vNext rows carry source_flow / engine_runtime_version when available.
// - Non-final lock is explicit on every vNext record.
// - Limitations are accumulated from the source record and propagated.

export type UnifiedSeraSourceFlow =
  | 'LEGACY_SERA'
  | 'VNEXT_ALPHA'
  | 'VNEXT_BETA'
  | 'VNEXT_PRODUCT_BETA'
  | 'VNEXT_CANONICAL'

export type UnifiedSeraAnalysisStatus =
  | 'received'
  | 'processing'
  | 'completed'
  | 'error'
  | 'draft'
  | 'archived'
  | 'excluded'

export type UnifiedSeraAnalysis = {
  id: string
  tenantId: string
  title: string
  createdAt: string
  occurredAt: string | null

  sourceFlow: UnifiedSeraSourceFlow
  engineContractVersion: string | null
  engineRuntimeVersion: string | null
  methodologyVersion: string | null
  canonicalTreeVersion: string | null

  status: UnifiedSeraAnalysisStatus
  nonFinal: boolean

  isExcludedFromRiskProfile: boolean
  exclusionId: string | null
  exclusionReason: string | null
  exclusionAt: string | null

  perceptionCode: string | null
  objectiveCode: string | null
  actionCode: string | null
  preconditions: string[]

  escapePoint?: unknown
  axes?: unknown
  reviewerOutput?: unknown

  limitations: string[]
  warnings: string[]
}

// Adapter from legacy risk-profile source event (legacy_event) to unified contract.
export function fromLegacyRiskProfileSource(source: {
  id: string
  tenantId: string
  title: string
  createdAt: string
  occurredAt?: string | null
  status: string
  perceptionCode?: string | null
  objectiveCode?: string | null
  actionCode?: string | null
  preconditions?: string[]
  warnings?: string[]
  isExcludedFromRiskProfile: boolean
  exclusionId?: string | null
  exclusionReason?: string | null
  exclusionAt?: string | null
  limitations?: string[]
}): UnifiedSeraAnalysis {
  return {
    id: source.id,
    tenantId: source.tenantId,
    title: source.title,
    createdAt: source.createdAt,
    occurredAt: source.occurredAt ?? null,
    sourceFlow: 'LEGACY_SERA',
    engineContractVersion: null,
    engineRuntimeVersion: null,
    methodologyVersion: null,
    canonicalTreeVersion: null,
    status: normalizeStatus(source.status),
    nonFinal: false,
    isExcludedFromRiskProfile: source.isExcludedFromRiskProfile,
    exclusionId: source.exclusionId ?? null,
    exclusionReason: source.exclusionReason ?? null,
    exclusionAt: source.exclusionAt ?? null,
    perceptionCode: source.perceptionCode ?? null,
    objectiveCode: source.objectiveCode ?? null,
    actionCode: source.actionCode ?? null,
    preconditions: source.preconditions ?? [],
    warnings: source.warnings ?? [],
    limitations: source.limitations ?? ['Análise produzida pelo pipeline SERA legado. Proveniência de motor não rastreada.'],
  }
}

// Adapter from vNext risk-profile source event (sera_vnext_analysis) to unified contract.
export function fromVNextRiskProfileSource(source: {
  id: string
  tenantId: string
  title: string
  createdAt: string
  status: string
  engineVersion?: string | null
  methodologyVersion?: string | null
  sourceFlow?: string | null
  canonicalTreeVersion?: string | null
  engineRuntimeVersion?: string | null
  perceptionCode?: string | null
  objectiveCode?: string | null
  actionCode?: string | null
  preconditions?: string[]
  warnings?: string[]
  isExcludedFromRiskProfile: boolean
  exclusionId?: string | null
  exclusionReason?: string | null
  exclusionAt?: string | null
  limitations?: string[]
}): UnifiedSeraAnalysis {
  const effectiveSourceFlow = resolveVNextSourceFlow(source.sourceFlow)
  const limitations: string[] = [...(source.limitations ?? [])]
  if (!source.engineRuntimeVersion) {
    limitations.push('Versão de runtime do motor não rastreada (registro anterior ao modelo de proveniência).')
  }
  return {
    id: source.id,
    tenantId: source.tenantId,
    title: source.title,
    createdAt: source.createdAt,
    occurredAt: null,
    sourceFlow: effectiveSourceFlow,
    engineContractVersion: source.engineVersion ?? null,
    engineRuntimeVersion: source.engineRuntimeVersion ?? null,
    methodologyVersion: source.methodologyVersion ?? null,
    canonicalTreeVersion: source.canonicalTreeVersion ?? null,
    status: normalizeVNextStatus(source.status),
    nonFinal: true,
    isExcludedFromRiskProfile: source.isExcludedFromRiskProfile,
    exclusionId: source.exclusionId ?? null,
    exclusionReason: source.exclusionReason ?? null,
    exclusionAt: source.exclusionAt ?? null,
    perceptionCode: source.perceptionCode ?? null,
    objectiveCode: source.objectiveCode ?? null,
    actionCode: source.actionCode ?? null,
    preconditions: source.preconditions ?? [],
    warnings: source.warnings ?? [],
    limitations,
  }
}

function normalizeStatus(status: string): UnifiedSeraAnalysisStatus {
  switch (status) {
    case 'completed': return 'completed'
    case 'failed': return 'error'
    case 'processing': return 'processing'
    case 'archived': return 'archived'
    case 'excluded': return 'excluded'
    case 'received':
    default: return 'received'
  }
}

function normalizeVNextStatus(status: string): UnifiedSeraAnalysisStatus {
  if (status === 'ARCHIVED') return 'archived'
  if (status === 'HUMAN_REVIEW_COMPLETED_NON_FINAL') return 'completed'
  if (status === 'REQUIRES_MORE_EVIDENCE') return 'error'
  if (status === 'UNDER_HUMAN_REVIEW') return 'processing'
  if (status === 'CANDIDATE_ANALYSIS_CREATED') return 'draft'
  return 'draft'
}

function resolveVNextSourceFlow(raw: string | null | undefined): UnifiedSeraSourceFlow {
  switch (raw) {
    case 'VNEXT_ALPHA': return 'VNEXT_ALPHA'
    case 'VNEXT_BETA': return 'VNEXT_BETA'
    case 'VNEXT_PRODUCT_BETA': return 'VNEXT_PRODUCT_BETA'
    case 'VNEXT_CANONICAL': return 'VNEXT_CANONICAL'
    default: return 'VNEXT_BETA'
  }
}

// Deduplication guard: prevents a vNext analysis and a legacy event from appearing
// twice if they refer to the same underlying occurrence.
// The current schema does not link legacy events to vNext analyses, so
// deduplication is by unique (id, sourceFlow) pair only.
export function deduplicateUnifiedAnalyses(
  items: UnifiedSeraAnalysis[],
): UnifiedSeraAnalysis[] {
  const seen = new Set<string>()
  const result: UnifiedSeraAnalysis[] = []
  for (const item of items) {
    const key = `${item.sourceFlow}:${item.id}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push(item)
    }
  }
  return result
}
