import assert from 'node:assert/strict'
import {
  SERA_CANONICAL_ACTION_LEAF_CODES,
  SERA_CANONICAL_FORBIDDEN_CODES,
  SERA_CANONICAL_LEAF_CODE_ALLOWLIST,
  SERA_CANONICAL_NON_EXISTENT_CODES,
  SERA_CANONICAL_OBJECTIVE_LEAF_CODES,
  SERA_CANONICAL_PERCEPTION_LEAF_CODES,
  assertCanonicalSeraLeafCode,
  isCanonicalSeraLeafCode,
} from '../../frontend/src/lib/sera-vnext/canonical-codes'

function assertThrowsWithMessage(run: () => void, expectedText: string) {
  let threw = false
  try {
    run()
  } catch (error) {
    threw = true
    const message = error instanceof Error ? error.message : String(error)
    assert.ok(message.includes(expectedText), `Expected error message to include "${expectedText}", got "${message}"`)
  }
  assert.equal(threw, true, 'Expected function to throw.')
}

function main() {
  assert.deepEqual(
    SERA_CANONICAL_PERCEPTION_LEAF_CODES,
    ['P-A', 'P-B', 'P-C', 'P-D', 'P-E', 'P-F', 'P-G', 'P-H'],
    'Perception allowlist mismatch.'
  )
  assert.deepEqual(SERA_CANONICAL_OBJECTIVE_LEAF_CODES, ['O-A', 'O-B', 'O-C', 'O-D'], 'Objective allowlist mismatch.')
  assert.deepEqual(
    SERA_CANONICAL_ACTION_LEAF_CODES,
    ['A-A', 'A-B', 'A-C', 'A-D', 'A-E', 'A-F', 'A-G', 'A-H', 'A-I', 'A-J'],
    'Action allowlist mismatch.'
  )

  assert.deepEqual(SERA_CANONICAL_NON_EXISTENT_CODES, ['O-E'], 'NON_EXISTENT list must explicitly include O-E only.')
  assert.ok(SERA_CANONICAL_FORBIDDEN_CODES.includes('O-E'), 'Forbidden list must include O-E.')

  assert.equal(SERA_CANONICAL_LEAF_CODE_ALLOWLIST.P.length, 8, 'P allowlist size mismatch.')
  assert.equal(SERA_CANONICAL_LEAF_CODE_ALLOWLIST.O.length, 4, 'O allowlist size mismatch.')
  assert.equal(SERA_CANONICAL_LEAF_CODE_ALLOWLIST.A.length, 10, 'A allowlist size mismatch.')

  assert.equal(isCanonicalSeraLeafCode('P', 'P-A'), true, 'P-A should be valid for P axis.')
  assert.equal(isCanonicalSeraLeafCode('O', 'O-D'), true, 'O-D should be valid for O axis.')
  assert.equal(isCanonicalSeraLeafCode('A', 'A-J'), true, 'A-J should be valid for A axis.')
  assert.equal(isCanonicalSeraLeafCode('objective', 'O-D'), true, 'PoaAxis mapping should support objective -> O.')

  assert.equal(isCanonicalSeraLeafCode('O', 'O-E'), false, 'O-E must be rejected as NON_EXISTENT.')
  assert.equal(isCanonicalSeraLeafCode('O', 'O-Z'), false, 'Unknown code must be rejected.')
  assert.equal(isCanonicalSeraLeafCode('P', 'A-A'), false, 'Cross-axis code must be rejected.')

  assert.equal(assertCanonicalSeraLeafCode('P', 'p-a'), 'P-A', 'assert helper should normalize case and accept valid code.')
  assert.equal(assertCanonicalSeraLeafCode('objective', 'o-b'), 'O-B', 'assert helper should map PoaAxis and normalize case.')

  assertThrowsWithMessage(
    () => assertCanonicalSeraLeafCode('O', 'O-E'),
    'NON_EXISTENT_IN_SERA_PT_V1'
  )
  assertThrowsWithMessage(
    () => assertCanonicalSeraLeafCode('A', 'A-Z'),
    'allowlist violation'
  )
  assertThrowsWithMessage(
    () => assertCanonicalSeraLeafCode('P', 'O-A'),
    'allowlist violation'
  )

  console.log('PASS canonical-codes-trial-001')
}

main()
