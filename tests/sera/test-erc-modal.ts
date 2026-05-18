// tests/sera/test-erc-modal.ts
//
// Unit tests for calculateModalHfaErcCategory (RISK v0.8-B).
//
// Usage:
//   npx tsx tests/sera/test-erc-modal.ts
//
// Exit codes:
//   0 — all tests passed
//   1 — at least one test failed

import assert from 'node:assert/strict'
import { calculateModalHfaErcCategory } from '@/lib/sera/erc-modal'

let passed = 0
let failed = 0

function test(name: string, fn: () => void) {
  try {
    fn()
    console.log(`  ✓ ${name}`)
    passed++
  } catch (e) {
    const msg = e instanceof assert.AssertionError ? `${e.message}` : String(e)
    console.error(`  ✗ ${name}\n    ${msg}`)
    failed++
  }
}

// ─── Single values ───────────────────────────────────────────────────────────

console.log('\nsingle value')

test('[motor 1] → HFA category 5 (crítico)', () => {
  assert.equal(calculateModalHfaErcCategory([1]), 5)
})

test('[motor 5] → HFA category 1 (aceitável)', () => {
  assert.equal(calculateModalHfaErcCategory([5]), 1)
})

// ─── Clear majority ──────────────────────────────────────────────────────────

console.log('\nclear majority')

test('[1,1,2,3] → HFA 5 (motor 1 is most frequent)', () => {
  assert.equal(calculateModalHfaErcCategory([1, 1, 2, 3]), 5)
})

// ─── Tie-breaker: highest (most critical) wins ────────────────────────────────

console.log('\ntie-breaker — highest HFA category wins on equal frequency')

test('[2,2,1,1] → HFA 5 (motor 1 and 2 tied; HFA 5 > HFA 4)', () => {
  assert.equal(calculateModalHfaErcCategory([2, 2, 1, 1]), 5)
})

// ─── Exact tie across all three values ───────────────────────────────────────

console.log('\ntie across multiple values')

test('[5,4,3] → HFA 3 (motor 5→HFA1, 4→HFA2, 3→HFA3, all tied; highest HFA=3)', () => {
  assert.equal(calculateModalHfaErcCategory([5, 4, 3]), 3)
})

// ─── All invalid values ──────────────────────────────────────────────────────

console.log('\nall invalid / empty')

test('all invalid values → null', () => {
  assert.equal(calculateModalHfaErcCategory([null, undefined, '1', 0, 6, 1.5, NaN]), null)
})

test('empty array → null', () => {
  assert.equal(calculateModalHfaErcCategory([]), null)
})

// ─── Mixed valid and invalid ─────────────────────────────────────────────────

console.log('\nmixed valid and invalid')

test('[null,1,"1",5] → HFA 5 (motor 1 and 5 tied; HFA 5 > HFA 1)', () => {
  assert.equal(calculateModalHfaErcCategory([null, 1, '1', 5]), 5)
})

// ─── Semantic safety ─────────────────────────────────────────────────────────

console.log('\nsemantic safety')

test('all motor-1 inputs → HFA 5 (critical never collapses to 1)', () => {
  assert.equal(calculateModalHfaErcCategory([1, 1, 1, 1, 1]), 5)
  assert.notEqual(calculateModalHfaErcCategory([1, 1, 1, 1, 1]), 1)
})

test('all motor-5 inputs → HFA 1 (acceptable never collapses to 5)', () => {
  assert.equal(calculateModalHfaErcCategory([5, 5, 5, 5, 5]), 1)
  assert.notEqual(calculateModalHfaErcCategory([5, 5, 5, 5, 5]), 5)
})

// ─── Summary ─────────────────────────────────────────────────────────────────

const total = passed + failed
console.log(`\n${'─'.repeat(60)}`)
console.log(`  Total: ${total}  ✓ ${passed}  ✗ ${failed}`)
console.log(`${'─'.repeat(60)}\n`)

if (failed > 0) {
  console.error(`  FAIL — ${failed} test(s) failed`)
  process.exit(1)
}
console.log('  PASS — all tests passed')
process.exit(0)
