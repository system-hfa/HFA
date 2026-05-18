// tests/sera/test-erc-api-ui-contract.ts
//
// Contract tests for the ERC visual scale — API→UI boundary (RISK v0.8-D).
//
// Protects the full flow:
//   analyses.erc_level (legacy motor)
//   → coerceMotorErcToHfaCategory / motorErcToHfaCategory
//   → calculateModalHfaErcCategory (modal_erc_level in API)
//   → hfaErcToArmsBarrier
//   → ARMS barrier column for visual display
//
// No LLM, no Supabase, no React, no browser APIs.
//
// Usage:
//   npx tsx tests/sera/test-erc-api-ui-contract.ts
//
// Exit codes:
//   0 — all contracts satisfied
//   1 — at least one contract violated

import assert from 'node:assert/strict'
import {
  motorErcToHfaCategory,
  coerceMotorErcToHfaCategory,
  hfaCategoryToMotorErc,
} from '@/lib/sera/erc-conversion'
import { calculateModalHfaErcCategory } from '@/lib/sera/erc-modal'
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

// ─── 1. Contrato de conversão crítica ────────────────────────────────────────

console.log('\n[1] conversão crítica — legacy motor 1 → HFA 5')

test('motorErcToHfaCategory(1) === 5', () => {
  assert.equal(motorErcToHfaCategory(1), 5)
})
test('coerceMotorErcToHfaCategory(1) === 5', () => {
  assert.equal(coerceMotorErcToHfaCategory(1), 5)
})
test('motorErcToHfaCategory(1) !== 1 (nunca vira visual baixo)', () => {
  assert.notEqual(motorErcToHfaCategory(1), 1)
})

// ─── 2. Contrato de conversão baixa ──────────────────────────────────────────

console.log('\n[2] conversão baixa — legacy motor 5 → HFA 1')

test('motorErcToHfaCategory(5) === 1', () => {
  assert.equal(motorErcToHfaCategory(5), 1)
})
test('coerceMotorErcToHfaCategory(5) === 1', () => {
  assert.equal(coerceMotorErcToHfaCategory(5), 1)
})
test('motorErcToHfaCategory(5) !== 5 (nunca vira visual crítico)', () => {
  assert.notEqual(motorErcToHfaCategory(5), 5)
})

// ─── 3. Round-trip auto-inverso ───────────────────────────────────────────────

console.log('\n[3] round-trip auto-inverso')

for (const n of [1, 2, 3, 4, 5] as const) {
  test(`motor→HFA→motor round-trip para ${n}`, () => {
    assert.equal(hfaCategoryToMotorErc(motorErcToHfaCategory(n)), n)
  })
  test(`HFA→motor→HFA round-trip para ${n}`, () => {
    assert.equal(motorErcToHfaCategory(hfaCategoryToMotorErc(n)), n)
  })
}

// ─── 4. Contrato modal da API organizacional ──────────────────────────────────

console.log('\n[4] modal da API — usa HFA, não legacy')

test('calculateModalHfaErcCategory([1]) === 5 (legacy crítico → HFA crítico)', () => {
  assert.equal(calculateModalHfaErcCategory([1]), 5)
})
test('calculateModalHfaErcCategory([5]) === 1 (legacy baixo → HFA baixo)', () => {
  assert.equal(calculateModalHfaErcCategory([5]), 1)
})
test('calculateModalHfaErcCategory([1, 1, 5]) === 5 (maioria legacy 1 → HFA 5)', () => {
  assert.equal(calculateModalHfaErcCategory([1, 1, 5]), 5)
})
test('calculateModalHfaErcCategory([5, 5, 1]) === 1 (maioria legacy 5 → HFA 1)', () => {
  assert.equal(calculateModalHfaErcCategory([5, 5, 1]), 1)
})
test('calculateModalHfaErcCategory([1, 5]) === 5 (empate: HFA mais crítico vence)', () => {
  assert.equal(calculateModalHfaErcCategory([1, 5]), 5)
})

// ─── 5. Contrato de inválidos ─────────────────────────────────────────────────

console.log('\n[5] inválidos — ignorados, nunca viram HFA')

test('array de inválidos → null', () => {
  assert.equal(
    calculateModalHfaErcCategory([null, undefined, '1', 0, 6, 1.5, Number.NaN]),
    null
  )
})
test("coerceMotorErcToHfaCategory('1') === null (string rejeitada)", () => {
  assert.equal(coerceMotorErcToHfaCategory('1'), null)
})
test('coerceMotorErcToHfaCategory(0) === null (fora de faixa)', () => {
  assert.equal(coerceMotorErcToHfaCategory(0), null)
})
test('coerceMotorErcToHfaCategory(6) === null (fora de faixa)', () => {
  assert.equal(coerceMotorErcToHfaCategory(6), null)
})
test('coerceMotorErcToHfaCategory(1.5) === null (decimal rejeitado)', () => {
  assert.equal(coerceMotorErcToHfaCategory(1.5), null)
})
test('coerceMotorErcToHfaCategory(NaN) === null', () => {
  assert.equal(coerceMotorErcToHfaCategory(Number.NaN), null)
})

// ─── 6. Contrato HFA → ARMS barrier visual ────────────────────────────────────

console.log('\n[6] HFA → ARMS barrier visual')

test('hfaErcToArmsBarrier(5) === 1 (HFA crítico → sem barreiras)', () => {
  assert.equal(hfaErcToArmsBarrier(5), 1)
})
test('hfaErcToArmsBarrier(4) === 2', () => {
  assert.equal(hfaErcToArmsBarrier(4), 2)
})
test('hfaErcToArmsBarrier(3) === 3', () => {
  assert.equal(hfaErcToArmsBarrier(3), 3)
})
test('hfaErcToArmsBarrier(2) === 4', () => {
  assert.equal(hfaErcToArmsBarrier(2), 4)
})
test('hfaErcToArmsBarrier(1) === 4 (HFA aceitável → barreiras fortes, capped)', () => {
  assert.equal(hfaErcToArmsBarrier(1), 4)
})
test('HFA 5 → barrier mais perigoso (1) e HFA 1 → barrier menos perigoso (4)', () => {
  assert.ok(hfaErcToArmsBarrier(5) < hfaErcToArmsBarrier(1))
})

// ─── 7. Contrato integrado API→UI — caso crítico ──────────────────────────────

console.log('\n[7] fluxo integrado API→UI — caso crítico')

test('legacy [1] → modal HFA 5 → barrier 1 (posição mais perigosa na matriz)', () => {
  const criticalHfa = calculateModalHfaErcCategory([1])
  assert.equal(criticalHfa, 5)
  assert.equal(hfaErcToArmsBarrier(criticalHfa!), 1)
})

test('legacy [5] → modal HFA 1 → barrier 4 (posição menos perigosa na matriz)', () => {
  const lowHfa = calculateModalHfaErcCategory([5])
  assert.equal(lowHfa, 1)
  assert.equal(hfaErcToArmsBarrier(lowHfa!), 4)
})

test('legacy [3] → modal HFA 3 → barrier 3 (simétrico)', () => {
  const midHfa = calculateModalHfaErcCategory([3])
  assert.equal(midHfa, 3)
  assert.equal(hfaErcToArmsBarrier(midHfa!), 3)
})

// ─── 8. Contrato integrado com empate — conservador ──────────────────────────

console.log('\n[8] fluxo integrado API→UI — empate conservador')

test('legacy [1,5] empate → modal HFA 5 → barrier 1 (empate favorece mais crítico)', () => {
  const tiedHfa = calculateModalHfaErcCategory([1, 5])
  assert.equal(tiedHfa, 5)
  assert.equal(hfaErcToArmsBarrier(tiedHfa!), 1)
})

test('legacy [1,2,4,5] empate 4-vias → modal HFA 5 (highest wins)', () => {
  const tiedHfa = calculateModalHfaErcCategory([1, 2, 4, 5])
  assert.equal(tiedHfa, 5)
  assert.equal(hfaErcToArmsBarrier(tiedHfa!), 1)
})

// ─── Summary ─────────────────────────────────────────────────────────────────

const total = passed + failed
console.log(`\n${'─'.repeat(60)}`)
console.log(`  Total: ${total}  ✓ ${passed}  ✗ ${failed}`)
console.log(`${'─'.repeat(60)}\n`)

if (failed > 0) {
  console.error(`  FAIL — ${failed} contract(s) violated`)
  process.exit(1)
}
console.log('  PASS — all ERC API→UI contracts satisfied')
console.log('ERC API→UI contract tests passed')
process.exit(0)
