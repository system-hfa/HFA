import type {
  DirectActorAnalysis,
  SeraVNextInput,
  UnsafeActConditionAnalysis,
} from '../types'

export function runStep04DirectActor(
  _input: SeraVNextInput,
  _unsafeActCondition: UnsafeActConditionAnalysis
): DirectActorAnalysis {
  // TODO(A4+R-30): infer direct actor only when evidence is explicit.
  return {
    actor: null,
    actorKind: 'unknown',
    evidence: [],
    uncertainty: ['Skeleton step: direct actor analysis not implemented yet'],
  }
}
