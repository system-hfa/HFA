// tests/sera/test-erc-conversion.ts
//
// Unit tests for the ERC legacy↔HFA conversion utility (RISK v0.8-A).
//
// Tests the following from frontend/src/lib/sera/erc-conversion.ts:
//   motorErcToHfaCategory   — legacy motor scale → HFA category
//   hfaCategoryToMotorErc   — HFA category → legacy motor scale
//   isLegacyMotorErcLevel   — type guard
//   isHfaErcCategory        — type guard
//   coerceMotorErcToHfaCategory — safe coercion from untrusted input
//
// No LLM, no pipeline, no Supabase, no browser APIs.
//
// Usage:
//   npx tsx tests/sera/test-erc-conversion.ts
//
// Exit codes:
//   0 — all tests passed
//   1 — at least one test failed

import assert from 'node:assert/strict'
import {
  motorErcToHfaCategory,
  hfaCategoryToMotorErc,
  isLegacyMotorErcLevel,
  isHfaErcCategory,
  coerceMotorErcToHfaCategory,
  type LegacyMotorErcLevel,
  type HfaErcCategory,
} from '@/lib/sera/erc-conversion'

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

// ─── motorErcToHfaCategory ───────────────────────────────────────────────────

console.log('\nmotorErcToHfaCategory — direct mapping')

test('1 (motor critical) → 5 (UI critical)', () => {
  assert.equal(motorErcToHfaCategory(1), 5)
})
test('2 → 4', () => {
  assert.equal(motorErcToHfaCategory(2), 4)
})
test('3 → 3 (symmetric)', () => {
  assert.equal(motorErcToHfaCategory(3), 3)
})
test('4 → 2', () => {
  assert.equal(motorErcToHfaCategory(4), 2)
})
test('5 (motor minimal) → 1 (UI acceptable)', () => {
  assert.equal(motorErcToHfaCategory(5), 1)
})

// ─── hfaCategoryToMotorErc ───────────────────────────────────────────────────

console.log('\nhfaCategoryToMotorErc — reverse mapping')

test('5 (UI critical) → 1 (motor critical)', () => {
  assert.equal(hfaCategoryToMotorErc(5), 1)
})
test('4 → 2', () => {
  assert.equal(hfaCategoryToMotorErc(4), 2)
})
test('3 → 3 (symmetric)', () => {
  assert.equal(hfaCategoryToMotorErc(3), 3)
})
test('2 → 4', () => {
  assert.equal(hfaCategoryToMotorErc(2), 4)
})
test('1 (UI acceptable) → 5 (motor minimal)', () => {
  assert.equal(hfaCategoryToMotorErc(1), 5)
})

// ─── Auto-inverse property ───────────────────────────────────────────────────

console.log('\nauto-inverse property')

const levels: LegacyMotorErcLevel[] = [1, 2, 3, 4, 5]

for (const n of levels) {
  test(`round-trip motor→HFA→motor for ${n}`, () => {
    assert.equal(hfaCategoryToMotorErc(motorErcToHfaCategory(n)), n)
  })
  test(`round-trip HFA→motor→HFA for ${n}`, () => {
    assert.equal(motorErcToHfaCategory(hfaCategoryToMotorErc(n as HfaErcCategory)), n)
  })
}

// ─── Semantic safety ─────────────────────────────────────────────────────────

console.log('\nsemantic safety — critical/safe endpoints never collapse')

test('motor ERC 1 never maps to HFA category 1', () => {
  assert.notEqual(motorErcToHfaCategory(1), 1)
})
test('motor ERC 5 never maps to HFA category 5', () => {
  assert.notEqual(motorErcToHfaCategory(5), 5)
})
test('motor ERC 1 maps to the highest HFA category (5)', () => {
  assert.equal(motorErcToHfaCategory(1), 5)
})
test('motor ERC 5 maps to the lowest HFA category (1)', () => {
  assert.equal(motorErcToHfaCategory(5), 1)
})

// ─── isLegacyMotorErcLevel ───────────────────────────────────────────────────

console.log('\nisLegacyMotorErcLevel — type guard')

for (const v of [1, 2, 3, 4, 5]) {
  test(`${v} is a valid LegacyMotorErcLevel`, () => {
    assert.equal(isLegacyMotorErcLevel(v), true)
  })
}

for (const v of [0, 6, -1, 1.5, NaN, null, undefined, '1', '5', '', true, false, [], {}]) {
  test(`${JSON.stringify(v)} is NOT a valid LegacyMotorErcLevel`, () => {
    assert.equal(isLegacyMotorErcLevel(v), false)
  })
}

// ─── isHfaErcCategory ────────────────────────────────────────────────────────

console.log('\nisHfaErcCategory — type guard')

for (const v of [1, 2, 3, 4, 5]) {
  test(`${v} is a valid HfaErcCategory`, () => {
    assert.equal(isHfaErcCategory(v), true)
  })
}

for (const v of [0, 6, -1, 1.5, NaN, null, undefined, '1', '5', '', true, false, [], {}]) {
  test(`${JSON.stringify(v)} is NOT a valid HfaErcCategory`, () => {
    assert.equal(isHfaErcCategory(v), false)
  })
}

// ─── coerceMotorErcToHfaCategory ─────────────────────────────────────────────

console.log('\ncoerceMotorErcToHfaCategory — safe coercion')

test('coerce(1) === 5', () => assert.equal(coerceMotorErcToHfaCategory(1), 5))
test('coerce(2) === 4', () => assert.equal(coerceMotorErcToHfaCategory(2), 4))
test('coerce(3) === 3', () => assert.equal(coerceMotorErcToHfaCategory(3), 3))
test('coerce(4) === 2', () => assert.equal(coerceMotorErcToHfaCategory(4), 2))
test('coerce(5) === 1', () => assert.equal(coerceMotorErcToHfaCategory(5), 1))
test('coerce(null) === null', () => assert.equal(coerceMotorErcToHfaCategory(null), null))
test('coerce(undefined) === null', () => assert.equal(coerceMotorErcToHfaCategory(undefined), null))
test('coerce("1") === null (string rejected)', () => assert.equal(coerceMotorErcToHfaCategory('1'), null))
test('coerce("5") === null (string rejected)', () => assert.equal(coerceMotorErcToHfaCategory('5'), null))
test('coerce(0) === null (out of range)', () => assert.equal(coerceMotorErcToHfaCategory(0), null))
test('coerce(6) === null (out of range)', () => assert.equal(coerceMotorErcToHfaCategory(6), null))
test('coerce(1.5) === null (float rejected)', () => assert.equal(coerceMotorErcToHfaCategory(1.5), null))
test('coerce(NaN) === null', () => assert.equal(coerceMotorErcToHfaCategory(NaN), null))

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
