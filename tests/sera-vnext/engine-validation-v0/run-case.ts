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

  return {
    caseId: input.validationCase.caseId,
    title: input.validationCase.title,
    group: input.validationCase.group,
    passed: findings.every((item) => item.severity === 'pass'),
    findings,
    outputSummary: {
      escapePointStatus: output.escapePoint.status,
      directActor: output.directActor.actor,
      pCode: output.axes.perception.proposedCode,
      oCode: output.axes.objective.proposedCode,
      aCode: output.axes.action.proposedCode,
      unansweredQuestions: output.canonicalTraversal.unansweredQuestions.length,
      uncertainties: output.uncertainties.length,
    },
  }
}
