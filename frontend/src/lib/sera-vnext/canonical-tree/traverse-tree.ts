import type { CanonicalSeraAxis, CanonicalSeraLeafCode } from '../types'
import type { SeraCanonicalTreeDefinition, SeraCanonicalTraversalTrace } from './types'

const ROOT_BY_AXIS: Record<CanonicalSeraAxis, string> = {
  P: 'P_ROOT',
  O: 'O_ROOT',
  A: 'A_ROOT',
}

function isLeafTarget(value: string): boolean {
  return /^[POA]-[A-Z]$/.test(value)
}

function buildParentIndex(tree: SeraCanonicalTreeDefinition) {
  const parents = new Map<string, { parentId: string; answer: string }>()
  for (const node of tree.nodes) {
    for (const [answer, target] of Object.entries(node.branchMap)) {
      if (!isLeafTarget(target) && target !== 'UNRESOLVED') {
        parents.set(target, { parentId: node.nodeId, answer })
      }
    }
  }
  return parents
}

export function buildCanonicalPathForLeaf(input: {
  tree: SeraCanonicalTreeDefinition
  axis: CanonicalSeraAxis
  leafCode: CanonicalSeraLeafCode
}): SeraCanonicalTraversalTrace[] {
  const rootId = ROOT_BY_AXIS[input.axis]
  const nodeMap = new Map(input.tree.nodes.map((node) => [node.nodeId, node]))

  let terminalNodeId: string | null = null
  let terminalAnswer: string | null = null

  for (const node of input.tree.nodes) {
    if (node.axis !== input.axis) continue
    for (const [answer, target] of Object.entries(node.branchMap)) {
      if (target === input.leafCode) {
        terminalNodeId = node.nodeId
        terminalAnswer = answer
        break
      }
    }
    if (terminalNodeId) break
  }

  if (!terminalNodeId || !terminalAnswer) {
    throw new Error(`AUTHOR_METHOD_DECISION_REQUIRED: no canonical path found for ${input.axis}/${input.leafCode}.`)
  }

  const parents = buildParentIndex(input.tree)
  const chain: Array<{ nodeId: string; answer: string; terminalCode: string | null }> = [
    { nodeId: terminalNodeId, answer: terminalAnswer, terminalCode: input.leafCode },
  ]

  let cursor = terminalNodeId
  while (cursor !== rootId) {
    const parent = parents.get(cursor)
    if (!parent) {
      throw new Error(`AUTHOR_METHOD_DECISION_REQUIRED: incomplete canonical ancestry for ${cursor}.`)
    }
    chain.push({ nodeId: parent.parentId, answer: parent.answer, terminalCode: null })
    cursor = parent.parentId
  }

  return chain.reverse().map((item) => {
    const node = nodeMap.get(item.nodeId)
    if (!node) {
      throw new Error(`AUTHOR_METHOD_DECISION_REQUIRED: node not found in path: ${item.nodeId}.`)
    }
    const target = node.branchMap[item.answer]
    return {
      nodeId: node.nodeId,
      question: node.question,
      answer: item.answer,
      nextNodeId: isLeafTarget(target) ? null : target,
      terminalCode: isLeafTarget(target) ? target : item.terminalCode,
    }
  })
}

export function collectAxisUnansweredQuestions(input: {
  tree: SeraCanonicalTreeDefinition
  axis: CanonicalSeraAxis
}): string[] {
  const rootId = ROOT_BY_AXIS[input.axis]
  const root = input.tree.nodes.find((node) => node.nodeId === rootId)
  return root ? [root.question] : []
}
