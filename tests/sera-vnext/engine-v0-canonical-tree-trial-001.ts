import assert from 'node:assert/strict'
import { SERA_PT_V1_TREE, validateCanonicalTree } from '../../frontend/src/lib/sera-vnext/canonical-tree/index'

validateCanonicalTree(SERA_PT_V1_TREE)
assert.ok(SERA_PT_V1_TREE.nodes.length > 0)
assert.equal(JSON.stringify(SERA_PT_V1_TREE).includes('O-E'), false)
assert.ok(SERA_PT_V1_TREE.nodes.some((node) => Object.values(node.branchMap).some((value) => /^[POA]-[A-Z]$/.test(value))))
console.log('ENGINE_V0_CANONICAL_TREE_OK')
