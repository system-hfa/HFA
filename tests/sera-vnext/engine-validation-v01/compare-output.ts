import type { SeraVNextEngineOutput } from '../../../frontend/src/lib/sera-vnext/engine-contract'
import { semanticNormalize } from './semantic-normalization'
import type { EngineValidationExpectedCase, EngineValidationFinding, ExpectedActor, ExpectedAxisBoundary } from './types'

function compact(input: string | null): string {
  return (input ?? '')
    .toLowerCase()
    .replace(/\b(the|a|an|with|to|of|and|or|did|does)\b/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function includesFuzzy(haystack: string | null, needle: string): boolean {
  const normalizedHaystack = compact(haystack)
  const normalizedNeedle = compact(needle)
  if (!normalizedNeedle) return true
  if (normalizedHaystack.includes(normalizedNeedle)) return true
  const tokens = normalizedNeedle.split(' ').filter((token) => token.length > 2)
  return tokens.length > 0 && tokens.every((token) => normalizedHaystack.includes(token))
}

function isQuarantinedMention(statement: string, fragment: string): boolean {
  const text = statement.toLowerCase()
  const normalizedFragment = fragment.toLowerCase()
  if (['o-e', 'hfacs', 'risk/erc', 'arms/erc'].includes(normalizedFragment)) return true
  return /\b(does not establish|not establish|not established|must never|must not|forbidden|sem evidência|não estabelece)\b/i.test(text)
}

function actorAllowed(expected: ExpectedActor, actual: string | null): boolean {
  if (expected === 'UNRESOLVED_BY_AUTHOR') return true
  return expected.includes(actual)
}

function allowedCodes(expected: ExpectedAxisBoundary): Array<string | null> | null {
  return expected.allowedCodes === 'UNRESOLVED_BY_AUTHOR' ? null : expected.allowedCodes
}

function severityForExpected(expected: EngineValidationExpectedCase): EngineValidationFinding['severity'] {
  return expected.criticality === 'CRITICAL_BOUNDARY' ? 'critical' : 'noncritical'
}

function compareAxis(args: {
  expectedCase: EngineValidationExpectedCase
  axisName: 'perception' | 'objective' | 'action'
  actualCode: string | null
  actualStatus: string
  actualEvidence: string[]
}): EngineValidationFinding[] {
  const findings: EngineValidationFinding[] = []
  const expected = args.expectedCase.axes[args.axisName]
  const fieldPrefix = `axis.${args.axisName}`

  if (!expected.allowedStatuses.includes(args.actualStatus as never)) {
    findings.push({ severity: 'critical', field: `${fieldPrefix}.status`, detail: `unexpected status=${args.actualStatus}` })
  }

  if (args.actualCode == null) {
    if (expected.codeRequired || !expected.nullCodeAllowed) {
      findings.push({ severity: severityForExpected(args.expectedCase), field: `${fieldPrefix}.code`, detail: 'code is null but expected boundary requires code' })
    }
  } else {
    const allowed = allowedCodes(expected)
    if (allowed && !allowed.includes(args.actualCode)) {
      findings.push({ severity: severityForExpected(args.expectedCase), field: `${fieldPrefix}.code`, detail: `code outside allowed set=${args.actualCode}` })
    }
    if (expected.forbiddenCodes.includes(args.actualCode)) {
      findings.push({ severity: 'critical', field: `${fieldPrefix}.code`, detail: `forbidden code emitted=${args.actualCode}` })
    }
  }

  for (const fragment of expected.requiredEvidenceFragments) {
    if (!args.actualEvidence.some((item) => includesFuzzy(item, fragment))) {
      findings.push({ severity: 'noncritical', field: `${fieldPrefix}.evidence`, detail: `required evidence fragment not found=${fragment}` })
    }
  }

  for (const fragment of expected.forbiddenInferenceFragments) {
    if (args.actualEvidence.some((item) => includesFuzzy(item, fragment) && !isQuarantinedMention(item, fragment))) {
      findings.push({ severity: 'critical', field: `${fieldPrefix}.evidence`, detail: `forbidden inference fragment present=${fragment}` })
    }
  }

  return findings
}

export function compareOutput(expected: EngineValidationExpectedCase, output: SeraVNextEngineOutput): EngineValidationFinding[] {
  const findings: EngineValidationFinding[] = []
  const normalized = semanticNormalize(output)

  if (!expected.expectedEscapePointStatus.includes(output.escapePoint.status)) {
    findings.push({ severity: 'critical', field: 'escapePoint.status', detail: `unexpected escapePoint.status=${output.escapePoint.status}` })
  }

  if (expected.expectedEscapePointBoundary && expected.expectedEscapePointBoundary !== 'UNRESOLVED_BY_AUTHOR') {
    const boundaryCandidates = [
      output.escapePoint.statement,
      output.escapePoint.earliestCandidate,
      output.escapePoint.latestCandidate,
      ...output.escapePoint.supportingEvidence,
    ]
    if (!boundaryCandidates.some((candidate) => includesFuzzy(candidate, expected.expectedEscapePointBoundary as string))) {
      findings.push({ severity: 'noncritical', field: 'escapePoint.boundary', detail: `escape point boundary not matched=${expected.expectedEscapePointBoundary}` })
    }
  }

  if (!actorAllowed(expected.expectedDirectActor, output.directActor.actor)) {
    findings.push({ severity: 'noncritical', field: 'directActor.actor', detail: `unexpected direct actor=${output.directActor.actor}` })
  }

  findings.push(...compareAxis({
    expectedCase: expected,
    axisName: 'perception',
    actualCode: output.axes.perception.proposedCode,
    actualStatus: output.axes.perception.status,
    actualEvidence: [...output.axes.perception.supportingEvidence, ...output.axes.perception.counterEvidence],
  }))
  findings.push(...compareAxis({
    expectedCase: expected,
    axisName: 'objective',
    actualCode: output.axes.objective.proposedCode,
    actualStatus: output.axes.objective.status,
    actualEvidence: [...output.axes.objective.supportingEvidence, ...output.axes.objective.counterEvidence],
  }))
  findings.push(...compareAxis({
    expectedCase: expected,
    axisName: 'action',
    actualCode: output.axes.action.proposedCode,
    actualStatus: output.axes.action.status,
    actualEvidence: [...output.axes.action.supportingEvidence, ...output.axes.action.counterEvidence],
  }))

  for (const category of expected.criticalPreconditionCategories) {
    if (!normalized.preconditionCategories.includes(category as never)) {
      findings.push({ severity: 'critical', field: 'preconditions.category', detail: `missing critical precondition category=${category}` })
    }
  }

  for (const fragment of expected.postEscapeEvidenceToExclude) {
    const matched = output.escapePoint.excludedPostEscapeEvidence.some((item) => includesFuzzy(item, fragment))
    if (!matched) {
      findings.push({ severity: 'critical', field: 'escapePoint.excludedPostEscapeEvidence', detail: `post-escape evidence not excluded=${fragment}` })
    }
  }

  for (const guardrail of expected.requiredGuardrails) {
    if (output.guardrails[guardrail] !== false) {
      findings.push({ severity: 'critical', field: `guardrails.${guardrail}`, detail: `guardrail violated=${guardrail}` })
    }
  }

  if (output.uncertainties.length < expected.minimumUncertainties) {
    findings.push({ severity: 'noncritical', field: 'uncertainties', detail: `uncertainties below floor=${output.uncertainties.length}<${expected.minimumUncertainties}` })
  }

  if (output.factualExtraction.evidence.some((item) => item.evidenceType === 'UNSUPPORTED_REPORT_ANALYSIS' && item.supports.length > 0)) {
    findings.push({ severity: 'critical', field: 'factualExtraction.evidence', detail: 'unsupported report analysis used as evidence' })
  }

  if (!findings.length) {
    findings.push({ severity: 'pass', field: 'case', detail: 'output matches v0.1 methodological boundaries' })
  }

  return findings
}
