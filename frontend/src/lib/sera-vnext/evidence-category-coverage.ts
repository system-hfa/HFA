import type {
  EvidenceCategoryCoverageFinding,
  EvidenceCategoryCoverageSummary,
  PoaAxis,
  PreconditionsFromReleasedCodesResult,
  ReleasedCodeTraceabilityResult,
  SeraVNextEvidenceCategory,
  SeraVNextEvidenceCategoryHint,
  VNextPreconditionCandidate,
} from './types'

interface CoverageInputItem {
  axis?: PoaAxis | null
  code?: string | null
  evidenceCategoryHints?: SeraVNextEvidenceCategoryHint[] | null
}

interface CoverageRule {
  codes: string[]
  requiresAnyOf: SeraVNextEvidenceCategory[]
  note: string
}

const COVERAGE_RULES: CoverageRule[] = [
  {
    codes: ['A-D'],
    requiresAnyOf: ['PHYSICAL_CAPABILITY'],
    note: 'A-D should carry physical capability evidence context.',
  },
  {
    codes: ['O-B', 'O-C'],
    requiresAnyOf: ['INTENT_AWARENESS'],
    note: 'O-B/O-C should carry intent-awareness evidence context.',
  },
  {
    codes: ['P-D', 'A-H', 'A-I', 'A-J'],
    requiresAnyOf: ['TIME_PRESSURE'],
    note: 'P-D/A-H/A-I/A-J should carry time-pressure evidence context.',
  },
  {
    codes: ['P-G', 'A-C'],
    requiresAnyOf: ['PROCEDURAL_MONITORING', 'FEEDBACK_VERIFICATION'],
    note: 'P-G/A-C should carry monitoring or feedback-verification evidence context.',
  },
  {
    codes: ['P-H', 'A-J'],
    requiresAnyOf: ['COMMUNICATION_INFORMATION'],
    note: 'P-H/A-J should carry communication-information evidence context.',
  },
  {
    codes: ['P-B'],
    requiresAnyOf: ['SENSORY_LIMITATION'],
    note: 'P-B should carry sensory-limitation evidence context.',
  },
  {
    codes: ['P-C', 'A-E'],
    requiresAnyOf: ['KNOWLEDGE_TRAINING'],
    note: 'P-C/A-E should carry knowledge-training evidence context.',
  },
]

function normalizeCode(code?: string | null): string {
  return (code || '').trim().toUpperCase()
}

function normalizeAxis(axis?: PoaAxis | null): PoaAxis | 'unknown' {
  if (axis === 'perception' || axis === 'objective' || axis === 'action') {
    return axis
  }
  return 'unknown'
}

function normalizeHints(hints?: SeraVNextEvidenceCategoryHint[] | null): SeraVNextEvidenceCategory[] {
  if (!hints || hints.length === 0) {
    return []
  }

  const categories = hints
    .map((item) => item?.category)
    .filter((value): value is SeraVNextEvidenceCategory => typeof value === 'string' && value.length > 0)

  return [...new Set(categories)]
}

function collectItems(input: {
  traceability?: ReleasedCodeTraceabilityResult | ReleasedCodeTraceabilityResult['traces']
  preconditions?: PreconditionsFromReleasedCodesResult | PreconditionsFromReleasedCodesResult['candidates']
  items?: CoverageInputItem[]
}): CoverageInputItem[] {
  const collected: CoverageInputItem[] = []

  if (input.traceability) {
    const traces = Array.isArray(input.traceability) ? input.traceability : input.traceability.traces
    for (const trace of traces) {
      collected.push({
        axis: trace.axis,
        code: trace.code,
        evidenceCategoryHints: trace.evidenceCategoryHints,
      })
    }
  }

  if (input.preconditions) {
    const candidates = Array.isArray(input.preconditions) ? input.preconditions : input.preconditions.candidates
    for (const candidate of candidates) {
      collected.push({
        axis: candidate.sourceAxis,
        code: candidate.sourceReleasedCode,
        evidenceCategoryHints: candidate.evidenceCategoryHints,
      })
    }
  }

  for (const item of input.items || []) {
    collected.push(item)
  }

  return collected
}

function buildCoverageFindings(item: CoverageInputItem): EvidenceCategoryCoverageFinding[] {
  const code = normalizeCode(item.code)
  if (!code || code === 'O-E') {
    return []
  }

  const categories = normalizeHints(item.evidenceCategoryHints)
  const findings: EvidenceCategoryCoverageFinding[] = []

  for (const rule of COVERAGE_RULES) {
    if (!rule.codes.includes(code)) {
      continue
    }

    const matchedCategories = rule.requiresAnyOf.filter((category) => categories.includes(category))
    const missingCategories = rule.requiresAnyOf.filter((category) => !categories.includes(category))
    const hasCoverage = matchedCategories.length > 0

    findings.push({
      axis: normalizeAxis(item.axis),
      code,
      requiredCategories: [...rule.requiresAnyOf],
      matchedCategories,
      missingCategories: hasCoverage ? [] : missingCategories,
      severity: hasCoverage ? 'PASSIVE_OK' : 'PASSIVE_GAP',
      note: hasCoverage
        ? `${rule.note} Passive coverage recorded.`
        : `${rule.note} Passive coverage gap recorded (non-blocking).`,
    })
  }

  return findings
}

export function auditPassiveEvidenceCategoryCoverage(input: {
  traceability?: ReleasedCodeTraceabilityResult | ReleasedCodeTraceabilityResult['traces']
  preconditions?: PreconditionsFromReleasedCodesResult | PreconditionsFromReleasedCodesResult['candidates']
  items?: CoverageInputItem[]
}): EvidenceCategoryCoverageSummary {
  const items = collectItems(input)
  const categoriesObservedCount: Partial<Record<SeraVNextEvidenceCategory, number>> = {}
  const findings: EvidenceCategoryCoverageFinding[] = []

  let totalHintsObserved = 0

  for (const item of items) {
    const categories = normalizeHints(item.evidenceCategoryHints)
    totalHintsObserved += categories.length

    for (const category of categories) {
      categoriesObservedCount[category] = (categoriesObservedCount[category] || 0) + 1
    }

    findings.push(...buildCoverageFindings(item))
  }

  const hasPassiveGap = findings.some((item) => item.severity === 'PASSIVE_GAP')

  const passiveDiagnostics: string[] = []
  if (items.length === 0) {
    passiveDiagnostics.push('No audit items were provided; passive coverage cannot be assessed.')
  }
  if (hasPassiveGap) {
    passiveDiagnostics.push('Passive coverage gaps were recorded for one or more critical boundaries (non-blocking).')
  }

  return {
    status: hasPassiveGap || items.length === 0 ? 'PASSIVE_COVERAGE_INCOMPLETE' : 'PASSIVE_COVERAGE_RECORDED',
    mode: 'PASSIVE_OPTIONAL_METADATA',
    totalItemsAudited: items.length,
    totalHintsObserved,
    categoriesObservedCount,
    findings,
    passiveDiagnostics,
  }
}

export type { CoverageInputItem }
