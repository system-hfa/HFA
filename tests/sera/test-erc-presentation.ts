// tests/sera/test-erc-presentation.ts
//
// Unit tests for hfaErcToArmsBarrier (RISK v0.8-C).
//
// Usage:
//   npx tsx tests/sera/test-erc-presentation.ts
//
// Exit codes:
//   0 — all tests passed
//   1 — at least one test failed

import assert from 'node:assert/strict'
import { hfaErcToArmsBarrier } from '@/lib/sera/erc-presentation'

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

// ─── Direct mapping ──────────────────────────────────────────────────────────

console.log('\nhfaErcToArmsBarrier — direct mapping')

test('HFA 5 (crítico) → barrier 1 (sem barreiras)', () => {
  assert.equal(hfaErcToArmsBarrier(5), 1)
})
test('HFA 4 (alto) → barrier 2', () => {
  assert.equal(hfaErcToArmsBarrier(4), 2)
})
test('HFA 3 (moderado) → barrier 3', () => {
  assert.equal(hfaErcToArmsBarrier(3), 3)
})
test('HFA 2 (baixo) → barrier 4', () => {
  assert.equal(hfaErcToArmsBarrier(2), 4)
})
test('HFA 1 (aceitável) → barrier 4 (capped — matrix goes only to 4)', () => {
  assert.equal(hfaErcToArmsBarrier(1), 4)
})

// ─── Semantic safety ─────────────────────────────────────────────────────────

console.log('\nsemantic safety')

test('HFA 5 (more critical) → barrier 1 (not barrier 5 or 4)', () => {
  assert.equal(hfaErcToArmsBarrier(5), 1)
  assert.notEqual(hfaErcToArmsBarrier(5), 5)
  assert.notEqual(hfaErcToArmsBarrier(5), 4)
})

test('HFA 1 (least critical) → barrier 4 (not barrier 1)', () => {
  assert.equal(hfaErcToArmsBarrier(1), 4)
  assert.notEqual(hfaErcToArmsBarrier(1), 1)
})

test('monotonic: more critical HFA → lower (more dangerous) barrier column', () => {
  assert.ok(hfaErcToArmsBarrier(5) <= hfaErcToArmsBarrier(4))
  assert.ok(hfaErcToArmsBarrier(4) <= hfaErcToArmsBarrier(3))
  assert.ok(hfaErcToArmsBarrier(3) <= hfaErcToArmsBarrier(2))
  assert.ok(hfaErcToArmsBarrier(2) <= hfaErcToArmsBarrier(1))
})

test('output always in ARMS barrier range [1, 4]', () => {
  for (const cat of [1, 2, 3, 4, 5] as const) {
    const b = hfaErcToArmsBarrier(cat)
    assert.ok(b >= 1 && b <= 4, `barrier ${b} out of range for HFA ${cat}`)
  }
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
