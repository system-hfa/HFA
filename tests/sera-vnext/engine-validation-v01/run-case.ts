import { runSeraVNextEngineV0 } from '../../../frontend/src/lib/sera-vnext/engine-v0/run-engine'
import { assertBlockedFinalOutputs } from './guardrails'
import { compareOutput } from './compare-output'
import type { EngineValidationCase, EngineValidationCaseResult, EngineValidationExpectedCase } from './types'

export function runValidationCase(input: {
  validationCase: EngineValidationCase
  expected: EngineValidationExpectedCase
}): EngineValidationCaseResult {
  const output = runSeraVNextEngineV0({
    inputId: input.validationCase.caseId,
    narrative: input.validationCase.narrative,
    locale: 'en',
    sourceType: input.validationCase.sourceType,
    requestId: input.validationCase.caseId,
    mode: 'VALIDATION',
    options: {
      allowLlm: false,
      requireHumanReview: true,
      includeDebugTrace: false,
    },
  })

  assertBlockedFinalOutputs(output)
  const findings = compareOutput(input.expected, output)
  const criticalFindings = findings.filter((item) => item.severity === 'critical' || item.severity === 'fail' || item.severity === 'error').length
  const noncriticalFindings = findings.filter((item) => item.severity === 'noncritical').length

  return {
    caseId: input.validationCase.caseId,
    title: input.validationCase.title,
    group: input.validationCase.group,
    passed: criticalFindings === 0 && noncriticalFindings === 0,
    criticalFindings,
    noncriticalFindings,
    findings,
    outputSummary: {
      escapePointStatus: output.escapePoint.status,
      directActor: output.directActor.actor,
      pStatus: output.axes.perception.status,
      pCode: output.axes.perception.proposedCode,
      oStatus: output.axes.objective.status,
      oCode: output.axes.objective.proposedCode,
      aStatus: output.axes.action.status,
      aCode: output.axes.action.proposedCode,
      unansweredQuestions: output.canonicalTraversal.unansweredQuestions.length,
      uncertainties: output.uncertainties.length,
      sourceEvidenceItems: output.factualExtraction.evidence.length,
      postEscapeExcluded: output.escapePoint.excludedPostEscapeEvidence.length,
    },
  }
}
