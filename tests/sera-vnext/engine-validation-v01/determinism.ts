import { runSeraVNextEngineV0 } from '../../../frontend/src/lib/sera-vnext/engine-v0/run-engine'
import { semanticNormalize } from './semantic-normalization'
import type { DeterminismCaseResult, EngineValidationCase } from './types'

function runCase(validationCase: EngineValidationCase) {
  return runSeraVNextEngineV0({
    inputId: validationCase.caseId,
    narrative: validationCase.narrative,
    locale: 'en',
    sourceType: validationCase.sourceType,
    requestId: validationCase.caseId,
    mode: 'VALIDATION',
    options: {
      allowLlm: false,
      requireHumanReview: true,
      includeDebugTrace: false,
    },
  })
}

export function runDeterminismSuite(cases: Array<{ validationCase: EngineValidationCase; runs: number }>): DeterminismCaseResult[] {
  return cases.map(({ validationCase, runs }) => {
    const results = Array.from({ length: runs }, () => runCase(validationCase))
    const serialized = results.map((item) => JSON.stringify(item))
    const normalized = results.map((item) => JSON.stringify(semanticNormalize(item)))
    const firstSerialized = serialized[0]
    const firstNormalized = normalized[0]
    const structuralMatches = serialized.filter((item) => item === firstSerialized).length
    const semanticMatches = normalized.filter((item) => item === firstNormalized).length
    return {
      caseId: validationCase.caseId,
      runs,
      structuralDeterminism: structuralMatches / runs,
      semanticEquivalence: semanticMatches / runs,
      identical: structuralMatches === runs,
    }
  })
}
