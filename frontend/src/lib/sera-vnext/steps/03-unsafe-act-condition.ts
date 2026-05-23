import type {
  OperationalUnsafeState,
  UnsafeActConditionAnalysis,
  SeraVNextInput,
} from '../types'

export function runStep03UnsafeActCondition(
  _input: SeraVNextInput,
  _unsafeState: OperationalUnsafeState
): UnsafeActConditionAnalysis {
  // TODO(A4+R-30): implement unsafe act vs unsafe condition separation.
  return {
    unsafeAct: null,
    unsafeCondition: null,
    dominance: 'insufficient_evidence',
    evidence: [],
    uncertainty: ['Skeleton step: unsafe act/condition analysis not implemented yet'],
  }
}
