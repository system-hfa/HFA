import type { CanonicalSeraAxis } from '../types'

export type SeraCanonicalNode = {
  nodeId: string
  axis: CanonicalSeraAxis
  question: string
  exactQuestionTextENAnchor: string
  questionSource: string
  evidenceRequired: string[]
  prohibitedInferences: string[]
  yes?: string
  no?: string
  insufficientEvidence?: string
  terminalCode?: string
  branchMap: Record<string, string>
}

export type SeraCanonicalTreeDefinition = {
  treeId: string
  version: string
  nodes: readonly SeraCanonicalNode[]
}

export type SeraCanonicalTraversalTrace = {
  nodeId: string
  question: string
  exactQuestionTextENAnchor?: string
  answer: string
  nextNodeId: string | null
  terminalCode: string | null
  supportingEvidence?: string[]
  counterEvidence?: string[]
  prohibitedInferenceChecks?: string[]
  confidence?: 'LOW' | 'MEDIUM' | 'HIGH'
  rationale?: string
}
