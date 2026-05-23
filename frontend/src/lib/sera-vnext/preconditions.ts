import { SERA_VNEXT_HUMAN_REVIEW_PROHIBITED_OUTPUTS } from './constants'
import type {
  CodeReleaseGateResult,
  PreconditionsFromReleasedCodesResult,
  SemanticConsistencyGateResult,
  SeraVNextResult,
  VNextPreconditionCandidate,
} from './types'

const DERIVATION_RULE = 'SERA_VNEXT_PRECONDITION_RULE'
const TAXONOMY_VERSION = 'SERA_PT_CANONICAL_v1.0'
const AUTHOR_DECISION_VERSION = 'SERA_PT_AUTHOR_DECISION_AA_CANONICALIZATION_v1.0'

interface PreconditionMappingRule {
  category: string
  label: string
  confidence: 'LOW' | 'MEDIUM' | 'HIGH'
}

const PRECONDITION_MAPPING: Record<string, PreconditionMappingRule> = {
  'P-C': {
    category: 'knowledge_training_context',
    label: 'Knowledge interpretation context candidate from perception code.',
    confidence: 'MEDIUM',
  },
  'P-D': {
    category: 'attention_management_context',
    label: 'Attention-management context candidate from perception overload signal.',
    confidence: 'MEDIUM',
  },
  'P-G': {
    category: 'procedural_monitoring_context',
    label: 'Monitoring and verification context candidate from perception monitoring gap.',
    confidence: 'MEDIUM',
  },
  'P-H': {
    category: 'communication_information_context',
    label: 'Communication/information context candidate from perception communication gap.',
    confidence: 'MEDIUM',
  },
  'O-B': {
    category: 'rule_norm_context',
    label: 'Rule and normalization context candidate from objective deviation.',
    confidence: 'MEDIUM',
  },
  'O-C': {
    category: 'rule_norm_context',
    label: 'Rule-awareness context candidate from conscious objective deviation.',
    confidence: 'MEDIUM',
  },
  'O-D': {
    category: 'operational_efficiency_pressure_context',
    label: 'Operational-efficiency pressure context candidate from objective tradeoff.',
    confidence: 'LOW',
  },
  'A-C': {
    category: 'procedural_monitoring_context',
    label: 'Post-action verification context candidate from action feedback failure.',
    confidence: 'MEDIUM',
  },
  'A-E': {
    category: 'knowledge_training_context',
    label: 'Operational knowledge/training context candidate from action skill gap.',
    confidence: 'MEDIUM',
  },
  'A-G': {
    category: 'supervision_coordination_context',
    label: 'Supervision/coordination context candidate from delegated-action verification failure.',
    confidence: 'MEDIUM',
  },
  'A-H': {
    category: 'time_pressure_context',
    label: 'Execution time-management context candidate from action sequencing pressure.',
    confidence: 'LOW',
  },
  'A-I': {
    category: 'time_pressure_context',
    label: 'Selection-under-pressure context candidate from action decision under time pressure.',
    confidence: 'LOW',
  },
  'A-J': {
    category: 'communication_information_context',
    label: 'Readback/communication under pressure context candidate from action communication failure.',
    confidence: 'LOW',
  },
}

function includesAny(text: string, tokens: string[]): boolean {
  const normalized = text.toLowerCase()
  return tokens.some((token) => normalized.includes(token.toLowerCase()))
}

function pickGateStatus(candidates: VNextPreconditionCandidate[], globalBlockingIssues: string[]): PreconditionsFromReleasedCodesResult['gateStatus'] {
  if (globalBlockingIssues.length > 0) {
    return 'PRECONDITION_CANDIDATES_BLOCKED'
  }

  const candidateCount = candidates.filter((item) => item.status === 'CANDIDATE_PRECONDITION').length
  const blockedCount = candidates.filter((item) => item.status === 'BLOCKED').length

  if (candidateCount === 0) {
    return 'PRECONDITION_CANDIDATES_BLOCKED'
  }

  if (blockedCount > 0 || candidates.some((item) => item.status === 'REVIEW_REQUIRED')) {
    return 'PRECONDITION_CANDIDATES_PARTIAL'
  }

  return 'PRECONDITION_CANDIDATES_READY'
}

export function derivePreconditionsFromReleasedCodes(input: {
  codeReleaseGateResult: CodeReleaseGateResult
  semanticConsistencyGateResult: SemanticConsistencyGateResult
  baseResult?: SeraVNextResult
}): PreconditionsFromReleasedCodesResult {
  const globalBlockingIssues: string[] = []

  if (!input.codeReleaseGateResult.downstreamStillLocked || !input.semanticConsistencyGateResult.downstreamStillLocked) {
    globalBlockingIssues.push('Downstream lock violation detected; precondition derivation is blocked.')
  }

  if (!input.codeReleaseGateResult.finalConclusionStillLocked || !input.semanticConsistencyGateResult.finalConclusionStillLocked) {
    globalBlockingIssues.push('Final conclusion lock violation detected; precondition derivation is blocked.')
  }

  if (!input.codeReleaseGateResult.causalCoreOnly || !input.semanticConsistencyGateResult.causalCoreOnly) {
    globalBlockingIssues.push('Causal-core-only policy was violated before precondition derivation.')
  }

  const combinedLocks = Array.from(
    new Set([...input.codeReleaseGateResult.outputLocks, ...input.semanticConsistencyGateResult.outputLocks])
  )

  for (const forbidden of SERA_VNEXT_HUMAN_REVIEW_PROHIBITED_OUTPUTS) {
    if (!combinedLocks.includes(forbidden)) {
      globalBlockingIssues.push(`Missing lock for forbidden downstream output: ${forbidden}`)
    }
  }

  const releaseAndSemanticIssues = [
    ...input.codeReleaseGateResult.globalBlockingIssues,
    ...input.semanticConsistencyGateResult.globalBlockingIssues,
  ]

  for (const issue of releaseAndSemanticIssues) {
    if (includesAny(issue, ['downstream', 'final conclusion', 'hfacs', 'risk/erc', 'arms/erc', 'recommendation'])) {
      globalBlockingIssues.push(`Blocking issue propagated from previous gate: ${issue}`)
    }
  }

  const semanticByAxis = new Map(input.semanticConsistencyGateResult.axisResults.map((item) => [item.axis, item]))

  const candidates: VNextPreconditionCandidate[] = input.codeReleaseGateResult.axisReleases.map((axisRelease) => {
    const code = axisRelease.releasedCode || ''
    const codeUpper = code.toUpperCase()
    const semanticAxis = semanticByAxis.get(axisRelease.axis)
    const mapping = PRECONDITION_MAPPING[codeUpper]
    const blockingIssues: string[] = []
    const limitations: string[] = []

    if (axisRelease.source !== 'HUMAN_REVIEW') {
      blockingIssues.push('Released code source must be HUMAN_REVIEW for precondition derivation.')
    }

    if (axisRelease.releaseStatus !== 'RELEASED_BY_HUMAN_REVIEW') {
      blockingIssues.push('Axis was not released by human review in the code release gate.')
    }

    if (!axisRelease.releasedCode) {
      blockingIssues.push('releasedCode is missing for precondition derivation.')
    }

    if (axisRelease.evidenceReferences.length === 0) {
      blockingIssues.push('Evidence references are required to derive precondition candidates.')
    }

    if (!axisRelease.reviewerRationale || axisRelease.reviewerRationale.trim().length === 0) {
      blockingIssues.push('Reviewer rationale is required to derive precondition candidates.')
    }

    if (codeUpper === 'O-E') {
      blockingIssues.push('O-E is RESERVED/NOT_ACTIVE in canonical taxonomy v1.0 and cannot derive preconditions.')
    }

    if (codeUpper === 'A-A') {
      blockingIssues.push('A-A means no specific action failure; action-failure precondition derivation is prohibited.')
      limitations.push('No action-failure precondition derived from A-A by canonical author decision v1.0.')
    }

    if (!semanticAxis) {
      blockingIssues.push('Semantic consistency result is missing for axis release.')
    } else if (semanticAxis.status === 'SEMANTICALLY_BLOCKED') {
      blockingIssues.push('Semantic consistency gate blocked this released code for derivation.')
      limitations.push(...semanticAxis.blockingIssues)
    } else if (semanticAxis.status === 'SEMANTIC_REVIEW_REQUIRED') {
      limitations.push('Semantic consistency requires controlled review before automatic candidate acceptance.')
      limitations.push(...semanticAxis.warnings)
    }

    if (!mapping && codeUpper !== 'A-A') {
      blockingIssues.push('No explicit conservative precondition mapping exists for this released code.')
    }

    if (input.baseResult) {
      const baseAxis = input.baseResult.poaClassification[axisRelease.axis]
      if (!(baseAxis.selectedCode === 'UNRESOLVED' && baseAxis.status !== 'CLASSIFIED')) {
        blockingIssues.push('Base selectedCode/status indicates unexpected promotion outside precondition derivation scope.')
      }
    }

    const candidateId = `PC-${axisRelease.axis.toUpperCase()}-${codeUpper || 'UNDEFINED'}`
    const status: VNextPreconditionCandidate['status'] =
      blockingIssues.length > 0
        ? 'BLOCKED'
        : semanticAxis?.status === 'SEMANTIC_REVIEW_REQUIRED'
          ? 'REVIEW_REQUIRED'
          : 'CANDIDATE_PRECONDITION'

    return {
      id: candidateId,
      label: mapping?.label || 'Derivation blocked for released code under conservative policy.',
      category: mapping?.category || 'not_derivable_under_current_policy',
      sourceAxis: axisRelease.axis,
      sourceReleasedCode: axisRelease.releasedCode || 'UNDEFINED',
      sourceEvidenceRefs: [...axisRelease.evidenceReferences],
      sourceRationaleRefs: axisRelease.reviewerRationale ? [axisRelease.reviewerRationale] : [],
      confidence: mapping?.confidence || 'LOW',
      status,
      limitations,
      derivedBy: DERIVATION_RULE,
      taxonomyVersion: TAXONOMY_VERSION,
      authorDecisionVersion: AUTHOR_DECISION_VERSION,
      blockingIssues,
    }
  })

  const selectedCodesRemainUnresolved = input.baseResult
    ? (['perception', 'objective', 'action'] as const).every(
        (axis) => input.baseResult!.poaClassification[axis].selectedCode === 'UNRESOLVED'
      )
    : true

  const gateStatus = pickGateStatus(candidates, globalBlockingIssues)

  return {
    inputId: input.codeReleaseGateResult.inputId,
    gateStatus,
    candidates,
    globalBlockingIssues,
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
