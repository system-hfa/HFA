import type {
  DirectActorAnalysis,
  PoaStatements,
  SeraVNextInput,
  UnsafeActConditionAnalysis,
} from '../types'

export function runStep05PoaStatements(
  _input: SeraVNextInput,
  _unsafeActCondition: UnsafeActConditionAnalysis,
  _directActor: DirectActorAnalysis
): PoaStatements {
  // TODO(A4+R-32): produce evidence-first P/O/A statements before classification.
  return {
    perceptionStatement: null,
    objectiveStatement: null,
    actionStatement: null,
    evidenceForEach: {
      perception: [],
      objective: [],
      action: [],
    },
    uncertaintyForEach: {
      perception: ['Skeleton step: perception statement not implemented yet'],
      objective: ['Skeleton step: objective statement not implemented yet'],
      action: ['Skeleton step: action statement not implemented yet'],
    },
  }
}
