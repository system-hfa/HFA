import { SERA_VNEXT_HUMAN_REVIEW_PROHIBITED_OUTPUTS } from './constants'
import type {
  CodeReleaseGateResult,
  ReleasedCodeAcknowledgementCheck,
  ReleasedCodeSemanticConsistencyResult,
  ReleasedCodeSemanticCheck,
  ReleasedCodeWaiverConsistency,
  SemanticConsistencyGateResult,
  SeraVNextResult,
} from './types'

const SEMANTIC_RULE_VERSION = 'v0.2.0'
const PERCEPTION_FAILURE_CODES = new Set(['P-D', 'P-F', 'P-G'])
const OBJECTIVE_STRICT_CODES = new Set(['O-C', 'O-D'])

function normalize(value: string): string {
  return value.trim().toLowerCase()
}

function hasAny(text: string, keywords: string[]): boolean {
  const t = normalize(text)
  return keywords.some((keyword) => t.includes(normalize(keyword)))
}

function allPresent(text: string, keywords: string[]): { matched: string[]; missing: string[] } {
  const matched: string[] = []
  const missing: string[] = []
  for (const keyword of keywords) {
    if (hasAny(text, [keyword])) {
      matched.push(keyword)
    } else {
      missing.push(keyword)
    }
  }
  return { matched, missing }
}

function semanticRuleSet(axis: string, releasedCode: string | null): {
  requiredEvidence: string[]
  requiredAcknowledgements: string[]
  strictBlockWhenMissing: boolean
} {
  if (axis === 'perception') {
    if (releasedCode && PERCEPTION_FAILURE_CODES.has(releasedCode.toUpperCase())) {
      return {
        requiredEvidence: ['cue uptake', 'recognition timing', 'interpretation'],
        requiredAcknowledgements: ['cue uptake', 'recognition', 'timing'],
        strictBlockWhenMissing: true,
      }
    }
    return {
      requiredEvidence: ['cue'],
      requiredAcknowledgements: [],
      strictBlockWhenMissing: false,
    }
  }

  if (axis === 'objective') {
    if (releasedCode && OBJECTIVE_STRICT_CODES.has(releasedCode.toUpperCase())) {
      return {
        requiredEvidence: ['intent', 'rule awareness', 'conscious'],
        requiredAcknowledgements: ['intent', 'rule awareness'],
        strictBlockWhenMissing: true,
      }
    }
    return {
      requiredEvidence: ['decision context'],
      requiredAcknowledgements: [],
      strictBlockWhenMissing: false,
    }
  }

  if (releasedCode && releasedCode.toUpperCase() === 'A-D') {
    return {
      requiredEvidence: ['physical', 'motor', 'ergonomic'],
      requiredAcknowledgements: ['physical', 'motor', 'ergonomic'],
      strictBlockWhenMissing: true,
    }
  }

  return {
    requiredEvidence: ['action sequence', 'timing'],
    requiredAcknowledgements: [],
    strictBlockWhenMissing: false,
  }
}

export function validateReleasedCodeSemanticConsistency(input: {
  codeReleaseGateResult: CodeReleaseGateResult
  baseResult?: SeraVNextResult
}): SemanticConsistencyGateResult {
  const globalBlockingIssues: string[] = []

  if (!input.codeReleaseGateResult.downstreamStillLocked) {
    globalBlockingIssues.push('Downstream lock was not preserved in release gate package.')
  }
  if (!input.codeReleaseGateResult.finalConclusionStillLocked) {
    globalBlockingIssues.push('Final conclusion lock was not preserved in release gate package.')
  }
  if (!input.codeReleaseGateResult.causalCoreOnly) {
    globalBlockingIssues.push('Release gate package is not restricted to causal-core-only scope.')
  }

  for (const forbidden of SERA_VNEXT_HUMAN_REVIEW_PROHIBITED_OUTPUTS) {
    if (!input.codeReleaseGateResult.outputLocks.includes(forbidden)) {
      globalBlockingIssues.push(`Missing output lock for forbidden downstream output: ${forbidden}`)
    }
  }

  for (const issue of input.codeReleaseGateResult.globalBlockingIssues) {
    if (hasAny(issue, ['downstream', 'final conclusion', 'hfacs', 'risk/erc', 'arms/erc', 'classified'])) {
      globalBlockingIssues.push(`Release gate global block propagated: ${issue}`)
    }
  }

  const axisResults: ReleasedCodeSemanticConsistencyResult[] = input.codeReleaseGateResult.axisReleases.map((axisRelease) => {
    const checks: ReleasedCodeSemanticCheck[] = []
    const warnings: string[] = []
    const blockingIssues: string[] = []
    const acknowledgementChecks: ReleasedCodeAcknowledgementCheck[] = []

    checks.push({
      checkId: 'CHK-SOURCE-HUMAN-REVIEW',
      passed: axisRelease.source === 'HUMAN_REVIEW',
      details:
        axisRelease.source === 'HUMAN_REVIEW'
          ? 'Released code source is HUMAN_REVIEW.'
          : 'Released code source is not HUMAN_REVIEW.',
    })
    if (axisRelease.source !== 'HUMAN_REVIEW') {
      blockingIssues.push('Released code source must be HUMAN_REVIEW.')
    }

    checks.push({
      checkId: 'CHK-AXIS-RELEASE-STATUS',
      passed: axisRelease.releaseStatus === 'RELEASED_BY_HUMAN_REVIEW',
      details:
        axisRelease.releaseStatus === 'RELEASED_BY_HUMAN_REVIEW'
          ? 'Axis release status is RELEASED_BY_HUMAN_REVIEW.'
          : 'Axis release status is blocked before semantic validation.',
    })

    if (axisRelease.releaseStatus !== 'RELEASED_BY_HUMAN_REVIEW') {
      blockingIssues.push('Axis is not released by human review in code release package.')
    }

    if (!axisRelease.releasedCode) {
      blockingIssues.push('releasedCode is missing for semantic validation.')
    }

    if (input.baseResult) {
      const baseAxis = input.baseResult.poaClassification[axisRelease.axis]
      const unresolved = baseAxis.selectedCode === 'UNRESOLVED' && baseAxis.status !== 'CLASSIFIED'
      checks.push({
        checkId: 'CHK-BASE-SELECTED-CODE-STILL-UNRESOLVED',
        passed: unresolved,
        details: unresolved
          ? 'Base selectedCode remains UNRESOLVED and no automatic CLASSIFIED exists.'
          : 'Base selectedCode/status indicates unexpected promotion outside release package.',
      })
      if (!unresolved) {
        blockingIssues.push('Base selectedCode/status must remain unresolved/non-classified during semantic validation.')
      }
    }

    const rules = semanticRuleSet(axisRelease.axis, axisRelease.releasedCode)
    const evidenceText = `${axisRelease.evidenceReferences.join(' ')} ${axisRelease.reviewerRationale}`
    const acknowledgementText = axisRelease.guardrailAcknowledgements.join(' ')

    const evidencePresence = allPresent(evidenceText, rules.requiredEvidence)
    const acknowledgementPresence = allPresent(acknowledgementText, rules.requiredAcknowledgements)

    for (const keyword of rules.requiredAcknowledgements) {
      acknowledgementChecks.push({
        checkId: `ACK-${keyword.toUpperCase().replace(/\s+/g, '-')}`,
        passed: acknowledgementPresence.matched.includes(keyword),
        details: acknowledgementPresence.matched.includes(keyword)
          ? `Acknowledgement present for ${keyword}.`
          : `Acknowledgement missing for ${keyword}.`,
      })
    }

    const weatherOnlyContext = hasAny(evidenceText, ['weather', 'visibility', 'low cloud', 'degraded visual', 'warning'])
    const mechanismContext = hasAny(evidenceText + ' ' + acknowledgementText, [
      'cue uptake',
      'recognition',
      'timing',
      'interpretation',
      'intent',
      'rule awareness',
      'physical',
      'motor',
      'ergonomic',
    ])

    if (axisRelease.axis === 'perception' && axisRelease.releasedCode && PERCEPTION_FAILURE_CODES.has(axisRelease.releasedCode.toUpperCase())) {
      if (weatherOnlyContext && !mechanismContext) {
        blockingIssues.push('Perception failure code cannot rely only on weather/warning degradation without mechanism evidence.')
      }
    }

    if (axisRelease.axis === 'objective' && axisRelease.releasedCode && OBJECTIVE_STRICT_CODES.has(axisRelease.releasedCode.toUpperCase())) {
      const hasIntent = hasAny(evidenceText + ' ' + acknowledgementText, ['intent'])
      const hasRuleAwareness = hasAny(evidenceText + ' ' + acknowledgementText, ['rule awareness', 'rule-awareness'])
      if (!hasIntent || !hasRuleAwareness) {
        blockingIssues.push('Objective strict code requires intent and rule-awareness semantic support.')
      }
    }

    if (axisRelease.axis === 'action' && axisRelease.releasedCode && axisRelease.releasedCode.toUpperCase() === 'A-D') {
      const hasPhysical = hasAny(evidenceText + ' ' + acknowledgementText, ['physical'])
      const hasMotor = hasAny(evidenceText + ' ' + acknowledgementText, ['motor'])
      const hasErgonomic = hasAny(evidenceText + ' ' + acknowledgementText, ['ergonomic'])
      if (!hasPhysical || !hasMotor || !hasErgonomic) {
        blockingIssues.push('A-D requires explicit physical/motor/ergonomic evidence semantics.')
      }
    }

    if (rules.strictBlockWhenMissing && (evidencePresence.missing.length > 0 || acknowledgementPresence.missing.length > 0)) {
      blockingIssues.push('Strict semantic rule missing required evidence/acknowledgement elements.')
    }

    if (!rules.strictBlockWhenMissing && evidencePresence.missing.length > 0) {
      warnings.push('Some semantic evidence elements are missing; human semantic review is recommended.')
    }

    const waiverRequired = axisRelease.axis === 'action' && axisRelease.acceptedUncertainties.length > 0
    const waiverConsistency: ReleasedCodeWaiverConsistency = {
      waiverRequired,
      waiverApplied: axisRelease.waiverApplied,
      consistent: !waiverRequired || axisRelease.waiverApplied,
      details:
        !waiverRequired || axisRelease.waiverApplied
          ? 'Waiver semantics are coherent for this released code candidate.'
          : 'Waiver appears required by residual uncertainty but was not applied.',
    }

    if (!waiverConsistency.consistent) {
      blockingIssues.push(waiverConsistency.details)
    }

    const status: ReleasedCodeSemanticConsistencyResult['status'] =
      blockingIssues.length > 0
        ? 'SEMANTICALLY_BLOCKED'
        : warnings.length > 0
          ? 'SEMANTIC_REVIEW_REQUIRED'
          : 'SEMANTICALLY_CONSISTENT'

    return {
      axis: axisRelease.axis,
      releasedCode: axisRelease.releasedCode,
      status,
      checks,
      blockingIssues,
      warnings,
      requiredEvidence: rules.requiredEvidence,
      matchedEvidence: evidencePresence.matched,
      missingEvidence: evidencePresence.missing,
      acknowledgementChecks,
      waiverConsistency,
      semanticRuleVersion: SEMANTIC_RULE_VERSION,
    }
  })

  const hasGlobalBlock = globalBlockingIssues.length > 0
  const consistentCount = axisResults.filter((item) => item.status === 'SEMANTICALLY_CONSISTENT').length
  const blockedCount = axisResults.filter((item) => item.status === 'SEMANTICALLY_BLOCKED').length

  const gateStatus: SemanticConsistencyGateResult['gateStatus'] = hasGlobalBlock
    ? 'SEMANTIC_GATE_BLOCKED'
    : blockedCount === 0 && consistentCount === axisResults.length
      ? 'SEMANTIC_GATE_READY'
      : blockedCount === axisResults.length
        ? 'SEMANTIC_GATE_BLOCKED'
        : 'SEMANTIC_GATE_PARTIAL'

  return {
    inputId: input.codeReleaseGateResult.inputId,
    gateStatus,
    axisResults,
    globalBlockingIssues,
    outputLocks: [...input.codeReleaseGateResult.outputLocks],
    downstreamStillLocked: true,
    finalConclusionStillLocked: true,
    causalCoreOnly: true,
  }
}
