import { assertCanonicalSeraLeafCode } from '../canonical-codes'
import type { CanonicalSeraAxis } from '../types'
import type { SeraCanonicalTreeDefinition } from './types'

function isLeafTarget(value: string): boolean {
  return /^[POA]-[A-Z]$/.test(value)
}

export function validateCanonicalTree(tree: SeraCanonicalTreeDefinition): void {
  const nodeMap = new Map(tree.nodes.map((node) => [node.nodeId, node]))

  for (const node of tree.nodes) {
    if (!node.questionSource.trim()) {
      throw new Error(`AUTHOR_METHOD_DECISION_REQUIRED: question source missing for node ${node.nodeId}.`)
    }

    const branchEntries = Object.entries(node.branchMap)
    if (branchEntries.length === 0) {
      throw new Error(`AUTHOR_METHOD_DECISION_REQUIRED: branch map missing for node ${node.nodeId}.`)
    }

    for (const [, target] of branchEntries) {
      if (target === 'O-E') {
        throw new Error(`AUTHOR_METHOD_DECISION_REQUIRED: forbidden canonical code O-E found in node ${node.nodeId}.`)
      }

      if (isLeafTarget(target)) {
        assertCanonicalSeraLeafCode(node.axis, target)
        continue
      }

      if (target !== 'UNRESOLVED' && !nodeMap.has(target)) {
        throw new Error(`AUTHOR_METHOD_DECISION_REQUIRED: orphan target ${target} from node ${node.nodeId}.`)
      }
    }
  }

  const incoming = new Map<string, number>()
  for (const node of tree.nodes) incoming.set(node.nodeId, 0)
  for (const node of tree.nodes) {
    for (const target of Object.values(node.branchMap)) {
      if (nodeMap.has(target)) {
        incoming.set(target, (incoming.get(target) || 0) + 1)
      }
    }
  }

  const rootIds: Record<CanonicalSeraAxis, string> = { P: 'P_ROOT', O: 'O_ROOT', A: 'A_ROOT' }
  for (const [axis, rootId] of Object.entries(rootIds) as Array<[CanonicalSeraAxis, string]>) {
    if (!nodeMap.has(rootId)) {
      throw new Error(`AUTHOR_METHOD_DECISION_REQUIRED: root node missing for axis ${axis}.`)
    }
  }

  const visiting = new Set<string>()
  const visited = new Set<string>()
  const visit = (nodeId: string) => {
    if (visiting.has(nodeId)) {
      throw new Error(`AUTHOR_METHOD_DECISION_REQUIRED: cycle detected at node ${nodeId}.`)
    }
    if (visited.has(nodeId)) return
    visiting.add(nodeId)
    const node = nodeMap.get(nodeId)
    if (!node) return
    for (const target of Object.values(node.branchMap)) {
      if (nodeMap.has(target)) visit(target)
    }
    visiting.delete(nodeId)
    visited.add(nodeId)
  }

  for (const rootId of Object.values(rootIds)) visit(rootId)
}
