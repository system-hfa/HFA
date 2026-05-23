import type { FactualSummary, OperationalUnsafeState, SeraVNextInput } from '../types'

export function runStep02UnsafeState(
  _input: SeraVNextInput,
  _factualSummary: FactualSummary
): OperationalUnsafeState {
  // TODO(A4+R-30): explicitly separate operational unsafe state from decision antecedents.
  return {
    operationalUnsafeState: null,
    decisionAntecedents: [],
    finalOutcome: null,
  }
}
