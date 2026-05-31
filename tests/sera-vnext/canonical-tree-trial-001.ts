import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import {
  SERA_CANONICAL_TREE_AXIS_DISTRIBUTION,
  SERA_CANONICAL_TREE_NODE_COUNT,
  SERA_CANONICAL_TREE_NODES,
  assertCanonicalTreeInventoryInvariants,
  getCanonicalQuestionText,
  isCanonicalNodeUsableForAxisDecision,
  listCanonicalNodesByAxis,
} from '../../frontend/src/lib/sera-vnext/canonical-tree'
import type { SeraVNextInput } from '../../frontend/src/lib/sera-vnext/types'

function readInventoryIdsFromCsv(): Set<string> {
  const csvPath = path.resolve(
    'docs/sera-vnext/real-tree-lock-a4r185/SERA_REAL_TREE_NODE_INVENTORY_A4R185_v0.2.0.csv'
  )
  const lines = readFileSync(csvPath, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  const dataLines = lines.slice(1)
  const ids = new Set<string>()
  for (const line of dataLines) {
    const id = line.split(',', 1)[0]
    ids.add(id)
  }
  return ids
}

function main() {
  assertCanonicalTreeInventoryInvariants()

  assert.equal(SERA_CANONICAL_TREE_NODE_COUNT, 34, 'Canonical tree must contain exactly 34 rows from A4R185.')
  assert.deepEqual(
    SERA_CANONICAL_TREE_AXIS_DISTRIBUTION,
    { P: 13, O: 7, A: 14 },
    'Axis distribution must match A4R185 audit (P=13, O=7, A=14).'
  )

  const pNodes = listCanonicalNodesByAxis('P')
  const oNodes = listCanonicalNodesByAxis('O')
  const aNodes = listCanonicalNodesByAxis('A')
  assert.equal(pNodes.length, 13, 'Perception axis count mismatch.')
  assert.equal(oNodes.length, 7, 'Objective axis count mismatch.')
  assert.equal(aNodes.length, 14, 'Action axis count mismatch.')

  for (const node of SERA_CANONICAL_TREE_NODES) {
    assert.ok(node.nodeId.trim().length > 0, `Node without nodeId: ${node.nodeInventoryId}`)
    assert.ok(node.axis === 'P' || node.axis === 'O' || node.axis === 'A', `Invalid axis: ${node.nodeInventoryId}`)

    if (node.nextNodeHint.startsWith('LEAF:')) {
      assert.equal(node.transitionKind, 'LEAF', `Transition kind mismatch: ${node.nodeInventoryId}`)
      assert.ok(node.leafCode, `Leaf transition must provide leafCode: ${node.nodeInventoryId}`)
      assert.equal(node.nextNodeId, null, `Leaf transition must not provide nextNodeId: ${node.nodeInventoryId}`)
    } else {
      assert.equal(node.transitionKind, 'NEXT_NODE', `Transition kind mismatch: ${node.nodeInventoryId}`)
      assert.ok(node.nextNodeId, `Next-node transition must provide nextNodeId: ${node.nodeInventoryId}`)
      assert.equal(node.leafCode, null, `Next-node transition must not provide leafCode: ${node.nodeInventoryId}`)
    }
  }

  const runtimeInventoryIds = new Set(SERA_CANONICAL_TREE_NODES.map((node) => node.nodeInventoryId))
  const sourceInventoryIds = readInventoryIdsFromCsv()
  assert.equal(runtimeInventoryIds.size, 34, 'Runtime inventory id cardinality must be 34.')
  assert.equal(sourceInventoryIds.size, 34, 'Source inventory id cardinality must be 34.')
  assert.deepEqual(
    [...runtimeInventoryIds].sort(),
    [...sourceInventoryIds].sort(),
    'Runtime inventory differs from A4R185 source inventory (invented/missing rows).'
  )

  const sampleNode = SERA_CANONICAL_TREE_NODES[0]
  const ptText = getCanonicalQuestionText(sampleNode, 'pt-BR')
  const enText = getCanonicalQuestionText(sampleNode, 'en')
  assert.equal(ptText, sampleNode.exactQuestionTextPt, 'pt-BR text mapping mismatch.')
  assert.equal(enText, sampleNode.exactQuestionTextEn, 'en text mapping mismatch.')

  const mutatedTextNode = {
    ...sampleNode,
    exactQuestionTextPt: '__text_override_pt__',
    exactQuestionTextEn: '__text_override_en__',
  }
  assert.equal(
    isCanonicalNodeUsableForAxisDecision(mutatedTextNode),
    isCanonicalNodeUsableForAxisDecision(sampleNode),
    'Usability/logic must not depend on PT/EN display text.'
  )

  const inputWithScope: SeraVNextInput = {
    inputId: 'A4R190-A-SCOPE-CHECK',
    sourceType: 'neutral_trial',
    narrative: 'Passive type presence check for approvedEscapePointScope.',
    canonicalRuntimeContext: {
      approvedEscapePointScope: {
        scopeId: 'ESC-PT-001',
        scopeStatement: 'Passive scope declaration only.',
        boundaryEvidenceRefs: ['A4R190-A-TEST-REF-001'],
        rationale: 'Field exists for future traversal but is not enforced in A4R190-A.',
        status: 'DEFINED_NOT_ENFORCED',
      },
    },
  }
  assert.equal(
    inputWithScope.canonicalRuntimeContext?.approvedEscapePointScope.status,
    'DEFINED_NOT_ENFORCED',
    'approvedEscapePointScope should exist in passive runtime type model.'
  )

  console.log('PASS canonical-tree-trial-001')
}

main()
