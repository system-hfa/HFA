import { SERA_CANONICAL_TREE_MODEL_VERSION, SERA_CANONICAL_TREE_NODES } from '../canonical-tree'
import type { SeraCanonicalNode, SeraCanonicalTreeDefinition } from './types'

type NodeAccumulator = {
  nodeId: string
  axis: SeraCanonicalNode['axis']
  question: string
  exactQuestionTextENAnchor: string
  questionSource: string
  evidenceRequired: string[]
  prohibitedInferences: string[]
  yes?: string
  no?: string
  branchMap: Record<string, string>
}

function normalizeBranch(value: string): string {
  return value.trim().toUpperCase()
}

function inferEvidenceRequired(nodeId: string): string[] {
  const normalized = nodeId.toUpperCase()
  if (normalized.startsWith('P_')) return ['cue evidence', 'state assessment evidence']
  if (normalized.startsWith('O_')) return ['goal evidence', 'rule-awareness evidence']
  return ['action evidence', 'actor-action linkage evidence']
}

function inferProhibitedInferences(nodeId: string): string[] {
  const normalized = nodeId.toUpperCase()
  if (normalized.startsWith('P_')) {
    return [
      'Do not infer perception failure from consequence alone.',
      'Do not infer perception failure from degraded environment alone.',
    ]
  }
  if (normalized.startsWith('O_')) {
    return [
      'Do not infer objective deviation without intent/rule-awareness evidence.',
      'Do not infer goal state from report conclusion text alone.',
    ]
  }
  return [
    'Do not collapse aircraft state into action failure.',
    'Do not infer inability without explicit physical or ergonomic evidence.',
  ]
}

function buildTreeDefinition(): SeraCanonicalTreeDefinition {
  const nodes = new Map<string, NodeAccumulator>()

  for (const row of SERA_CANONICAL_TREE_NODES) {
    const current =
      nodes.get(row.nodeId) ||
      {
        nodeId: row.nodeId,
        axis: row.axis,
        question: row.exactQuestionTextPt,
        exactQuestionTextENAnchor: row.exactQuestionTextEn,
        questionSource: row.sourcePath,
        evidenceRequired: inferEvidenceRequired(row.nodeId),
        prohibitedInferences: inferProhibitedInferences(row.nodeId),
        branchMap: {},
      }

    current.branchMap[normalizeBranch(row.branchCondition)] = row.nextNodeId || row.leafCode || 'UNRESOLVED'
    if (normalizeBranch(row.branchCondition) === 'SIM') current.yes = row.nextNodeId || row.leafCode || undefined
    if (normalizeBranch(row.branchCondition) === 'NÃO') current.no = row.nextNodeId || row.leafCode || undefined
    nodes.set(row.nodeId, current)
  }

  return {
    treeId: 'SERA_PT_V1_CANONICAL_TREE',
    version: SERA_CANONICAL_TREE_MODEL_VERSION,
    nodes: [...nodes.values()].sort((a, b) => a.nodeId.localeCompare(b.nodeId)),
  }
}

export const SERA_PT_V1_TREE = buildTreeDefinition()
