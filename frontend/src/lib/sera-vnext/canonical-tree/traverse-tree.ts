import type { CanonicalSeraAxis } from '../types'
import type { SeraCanonicalTreeDefinition } from './types'

const ROOT_BY_AXIS: Record<CanonicalSeraAxis, string> = {
  P: 'P_ROOT',
  O: 'O_ROOT',
  A: 'A_ROOT',
}

export function collectAxisUnansweredQuestions(input: {
  tree: SeraCanonicalTreeDefinition
  axis: CanonicalSeraAxis
}): string[] {
  const rootId = ROOT_BY_AXIS[input.axis]
  const root = input.tree.nodes.find((node) => node.nodeId === rootId)
  return root ? [root.question] : []
}
