import { SERA_VNEXT_HUMAN_REVIEW_PROHIBITED_OUTPUTS } from './constants'
import type {
  CodeReleaseGateResult,
  ReleasedCodeTraceabilityResult,
  SemanticConsistencyGateResult,
  SeraVNextCodeTraceability,
  SeraVNextHendyCategory,
  SeraVNextResult,
} from './types'

const TAXONOMY_VERSION = 'SERA_PT_CANONICAL_v1.0'
const AUTHOR_DECISION_VERSION = 'SERA_PT_AUTHOR_DECISION_AA_CANONICALIZATION_v1.0'
const TRACEABILITY_VERSION = 'v0.2.0'

const NO_FAILURE_CODES = new Set(['P-A', 'O-A', 'A-A'])

const TIME_PRESSURE_EXCESSIVE_MAP: Record<string, boolean | null> = {
  'P-D': true,
  'P-G': false,
  'A-F': false,
  'A-G': false,
  'A-H': true,
  'A-I': true,
  'A-J': true,
}

const HENDY_CATEGORY_MAP: Record<string, SeraVNextHendyCategory> = {
  'O-B': 1,
  'O-C': 1,
  'O-D': 1,
  'P-D': 2,
  'P-G': 2,
  'P-B': 3,
  'P-C': 4,
  'P-F': 5,
  'P-H': 6,
  'P-E': 7,
  'A-H': 7,
  'A-E': 8,
  'A-D': 9,
  'A-F': 10,
  'A-I': 10,
  'A-B': 11,
  'A-C': 12,
  'A-G': 12,
  'A-J': 12,
}

function uniq(items: string[]): string[] {
  return [...new Set(items)]
}

function includesAny(text: string, tokens: string[]): boolean {
  const normalized = text.toLowerCase()
  return tokens.some((token) => normalized.includes(token.toLowerCase()))
}

function mapTimePressureExcessive(code: string): boolean | null {
  if (Object.prototype.hasOwnProperty.call(TIME_PRESSURE_EXCESSIVE_MAP, code)) {
    return TIME_PRESSURE_EXCESSIVE_MAP[code]
  }
  return null
}

function mapHendyCategory(code: string): SeraVNextHendyCategory {
  if (NO_FAILURE_CODES.has(code)) {
    return null
  }
  if (Object.prototype.hasOwnProperty.call(HENDY_CATEGORY_MAP, code)) {
    return HENDY_CATEGORY_MAP[code]
  }
  return null
}

function buildBaseDerivationPath(input: {
  axis: SeraVNextCodeTraceability['axis']
  code: string
  isNoFailure: boolean
  hendyCategory: SeraVNextHendyCategory
  timePressureExcessive: boolean | null
}): SeraVNextCodeTraceability['derivationPath'] {
  const steps: SeraVNextCodeTraceability['derivationPath'] = [
    {
      step: 'AXIS_RELEASED_BY_HUMAN_REVIEW',
      answer: `Axis ${input.axis} released by HUMAN_REVIEW in code release gate.`,
    },
    {
      step: 'CANONICAL_CODE_CONFIRMED',
      answer: `Code ${input.code} interpreted under SERA_PT_CANONICAL_v1.0.`,
    },
    {
      step: 'NO_FAILURE_CLASSIFICATION',
      answer: input.isNoFailure ? 'YES' : 'NO',
      rationale: input.isNoFailure
        ? 'Code belongs to canonical no-failure set (P-A/O-A/A-A).'
        : 'Code represents a failure class in canonical taxonomy.',
    },
    {
      step: 'HENDY_CATEGORY_MAPPING',
      answer: input.hendyCategory === null ? 'null' : `Hendy #${input.hendyCategory}`,
      rationale:
        input.hendyCategory === null
          ? 'No-failure codes do not map to Hendy failure categories.'
          : 'Mapped via explicit vNext canonical table.',
    },
    {
      step: 'TIME_PRESSURE_EXCESSIVE',
      answer:
        input.timePressureExcessive === null
          ? 'null'
          : input.timePressureExcessive
            ? 'true'
            : 'false',
      rationale:
        input.timePressureExcessive === null
          ? 'Temporal pressure is not a canonical discriminator for this code in A4+R-47.'
          : 'Temporal pressure value derived from canonical pairwise distinction rules.',
    },
  ]

  if (input.code === 'O-E') {
    steps.push({
      step: 'OBJECTIVE_RESERVED_CODE_CHECK',
      answer: 'RESERVED_NOT_ACTIVE',
      rationale: 'O-E is explicitly reserved and cannot be treated as active objective code in v1.0.',
    })
  }

  return steps
}

export function buildReleasedCodeTraceability(input: {
  codeReleaseGateResult: CodeReleaseGateResult
  semanticConsistencyGateResult?: SemanticConsistencyGateResult
  baseResult?: SeraVNextResult
}): ReleasedCodeTraceabilityResult {
  const globalBlockingIssues: string[] = []

  const combinedLocks = uniq([
    ...input.codeReleaseGateResult.outputLocks,
    ...(input.semanticConsistencyGateResult?.outputLocks || []),
  ])

  if (!input.codeReleaseGateResult.downstreamStillLocked) {
    globalBlockingIssues.push('Code release gate downstream lock is false; traceability is blocked.')
  }
  if (!input.codeReleaseGateResult.finalConclusionStillLocked) {
    globalBlockingIssues.push('Code release gate final conclusion lock is false; traceability is blocked.')
  }
  if (!input.codeReleaseGateResult.causalCoreOnly) {
    globalBlockingIssues.push('Code release gate is not causal-core-only; traceability is blocked.')
  }

  if (input.semanticConsistencyGateResult) {
    if (!input.semanticConsistencyGateResult.downstreamStillLocked) {
      globalBlockingIssues.push('Semantic gate downstream lock is false; traceability is blocked.')
    }
    if (!input.semanticConsistencyGateResult.finalConclusionStillLocked) {
      globalBlockingIssues.push('Semantic gate final conclusion lock is false; traceability is blocked.')
    }
    if (!input.semanticConsistencyGateResult.causalCoreOnly) {
      globalBlockingIssues.push('Semantic gate is not causal-core-only; traceability is blocked.')
    }

    for (const issue of input.semanticConsistencyGateResult.globalBlockingIssues) {
      if (includesAny(issue, ['downstream', 'final conclusion', 'hfacs', 'risk/erc', 'arms/erc', 'recommendation'])) {
        globalBlockingIssues.push(`Blocking issue propagated from semantic gate: ${issue}`)
      }
    }
  }

  for (const forbiddenOutput of SERA_VNEXT_HUMAN_REVIEW_PROHIBITED_OUTPUTS) {
    if (!combinedLocks.includes(forbiddenOutput)) {
      globalBlockingIssues.push(`Missing output lock for forbidden output: ${forbiddenOutput}`)
    }
  }

  for (const issue of input.codeReleaseGateResult.globalBlockingIssues) {
    if (includesAny(issue, ['downstream', 'final conclusion', 'hfacs', 'risk/erc', 'arms/erc', 'recommendation'])) {
      globalBlockingIssues.push(`Blocking issue propagated from code release gate: ${issue}`)
    }
  }

  const semanticByAxis = new Map(input.semanticConsistencyGateResult?.axisResults.map((item) => [item.axis, item]) || [])

  const traces: SeraVNextCodeTraceability[] = input.codeReleaseGateResult.axisReleases
    .filter((axisRelease) => axisRelease.releaseStatus === 'RELEASED_BY_HUMAN_REVIEW' && Boolean(axisRelease.releasedCode))
    .map((axisRelease) => {
      const code = (axisRelease.releasedCode || '').toUpperCase()
      const semanticAxis = semanticByAxis.get(axisRelease.axis)
      const isNoFailure = NO_FAILURE_CODES.has(code)
      const hendyCategory = mapHendyCategory(code)
      const timePressureExcessive = mapTimePressureExcessive(code)
      const warnings: string[] = []
      const blockingIssues: string[] = []

      if (axisRelease.source !== 'HUMAN_REVIEW') {
        blockingIssues.push('Released code traceability requires source=HUMAN_REVIEW.')
      }

      if (code === 'O-E') {
        warnings.push('O-E is RESERVED/NOT_ACTIVE in SERA_PT_CANONICAL_v1.0 and must not be treated as active objective code.')
      }

      if (!isNoFailure && hendyCategory === null && code !== 'O-E') {
        warnings.push('No Hendy category mapping found for this released failure code in A4+R-47 table.')
      }

      if (semanticAxis && semanticAxis.status === 'SEMANTICALLY_BLOCKED') {
        blockingIssues.push('Semantic consistency gate blocked this axis release; trace remains blocked.')
      }

      const status: SeraVNextCodeTraceability['status'] =
        code === 'O-E'
          ? 'RESERVED_NOT_ACTIVE'
          : blockingIssues.length > 0
            ? 'BLOCKED'
            : 'TRACEABLE'

      return {
        axis: axisRelease.axis,
        code,
        hendyCategory,
        isNoFailure,
        timePressureExcessive,
        derivationPath: buildBaseDerivationPath({
          axis: axisRelease.axis,
          code,
          isNoFailure,
          hendyCategory,
          timePressureExcessive,
        }),
        evidenceRefs: [...axisRelease.evidenceReferences],
        rationaleRefs: axisRelease.reviewerRationale ? [axisRelease.reviewerRationale] : [],
        source: 'HUMAN_REVIEW',
        taxonomyVersion: TAXONOMY_VERSION,
        authorDecisionVersion: AUTHOR_DECISION_VERSION,
        traceabilityVersion: TRACEABILITY_VERSION,
        status,
        warnings,
        blockingIssues,
      }
    })

  const selectedCodesRemainUnresolved = input.baseResult
    ? (['perception', 'objective', 'action'] as const).every(
        (axis) => input.baseResult!.poaClassification[axis].selectedCode === 'UNRESOLVED'
      )
    : true

  return {
    inputId: input.codeReleaseGateResult.inputId,
    traces,
    globalBlockingIssues: uniq(globalBlockingIssues),
    outputLocks: combinedLocks,
    downstreamLocked: true,
    finalConclusionLocked: true,
    hfacsLocked: true,
    riskLocked: true,
    recommendationsLocked: true,
    selectedCodesRemainUnresolved,
    causalCoreOnly: true,
  }
}
