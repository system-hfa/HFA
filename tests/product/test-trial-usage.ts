import assert from 'node:assert/strict'
import { buildTrialUsage } from '@/lib/product/trial'

let passed = 0
let failed = 0

function test(name: string, fn: () => void) {
  try {
    fn()
    console.log(`  ✓ ${name}`)
    passed++
  } catch (error) {
    const message = error instanceof assert.AssertionError ? error.message : String(error)
    console.error(`  ✗ ${name}\n    ${message}`)
    failed++
  }
}

console.log('\n[1] used = 0, limit = 10')

test('remaining = 10 e status = available', () => {
  const usage = buildTrialUsage(0, 10)
  assert.equal(usage.remaining, 10)
  assert.equal(usage.status, 'available')
})

console.log('\n[2] used = 7, limit = 10')

test('used = 7 permanece available', () => {
  const usage = buildTrialUsage(7, 10)
  assert.equal(usage.remaining, 3)
  assert.equal(usage.status, 'available')
})

console.log('\n[3] used = 8, limit = 10')

test('used = 8 vira near_limit', () => {
  const usage = buildTrialUsage(8, 10)
  assert.equal(usage.remaining, 2)
  assert.equal(usage.status, 'near_limit')
})

console.log('\n[4] used = 10, limit = 10')

test('used = 10 vira limit_reached', () => {
  const usage = buildTrialUsage(10, 10)
  assert.equal(usage.remaining, 0)
  assert.equal(usage.status, 'limit_reached')
})

console.log('\n[5] used = 12, limit = 10')

test('remaining nunca fica negativo', () => {
  const usage = buildTrialUsage(12, 10)
  assert.equal(usage.remaining, 0)
  assert.equal(usage.status, 'limit_reached')
})

console.log('\n[6] used negativo')

test('used negativo normaliza para 0', () => {
  const usage = buildTrialUsage(-4, 10)
  assert.equal(usage.used, 0)
  assert.equal(usage.remaining, 10)
  assert.equal(usage.status, 'available')
})

console.log('\n[7] custom limit')

test('custom limit funciona', () => {
  const usage = buildTrialUsage(3, 5)
  assert.equal(usage.limit, 5)
  assert.equal(usage.remaining, 2)
  assert.equal(usage.status, 'near_limit')
})

if (failed > 0) {
  console.error(`\n${failed} teste(s) falharam; ${passed} passaram.`)
  process.exit(1)
}

console.log(`\n${passed} testes passaram.`)
