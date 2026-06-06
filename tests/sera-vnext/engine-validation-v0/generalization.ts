import type { EngineValidationCaseResult } from './types'

export function summarizeGeneralization(results: EngineValidationCaseResult[]) {
  return {
    total: results.length,
    passed: results.filter((item) => item.passed).length,
    failed: results.filter((item) => !item.passed).length,
  }
}
