// tests/sera/test-safety-issue-candidates.ts
//
// Unit tests for deriveSafetyIssueCandidates (RISK v0.9-C).
// No Supabase, no React, no browser.
//
// Usage:
//   npx tsx tests/sera/test-safety-issue-candidates.ts
//
// Exit codes:
//   0 — all tests passed
//   1 — at least one test failed

import assert from 'node:assert/strict'
import {
  deriveSafetyIssueCandidates,
} from '@/lib/sera/safety-issue-candidates'
import type { SafetyIssueCandidateInput } from '@/lib/sera/safety-issue-candidates'

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

// ─── 1. Zero state ────────────────────────────────────────────────────────────

console.log('\n[1] zero state')

test('totalAnalyses = 0 → []', () => {
  const result = deriveSafetyIssueCandidates({ totalAnalyses: 0 })
  assert.equal(result.length, 0)
})

test('totalAnalyses = 0 with combinations → []', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 0,
    combinations: [{ type: 'P+O', first: 'P-B', second: 'O-D', count: 5 }],
  })
  assert.equal(result.length, 0)
})

// ─── 2. count mínimo ─────────────────────────────────────────────────────────

console.log('\n[2] count mínimo')

test('count = 2 com totalAnalyses = 10 → não cria candidato', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 10,
    combinations: [{ type: 'P+O', first: 'P-B', second: 'O-D', count: 2 }],
  })
  assert.equal(result.length, 0)
})

test('count = 1 → não cria candidato', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 10,
    combinations: [{ type: 'P+A', first: 'P-C', second: 'A-G', count: 1 }],
  })
  assert.equal(result.length, 0)
})

test('count = 0 → não cria candidato', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 10,
    combinations: [{ type: 'P+O', first: 'P-B', second: 'O-D', count: 0 }],
  })
  assert.equal(result.length, 0)
})

// ─── 3. totalAnalyses >= 10 com count = 3 e share OK ─────────────────────────

console.log('\n[3] totalAnalyses >= 10, count = 3, share >= 0.2')

test('totalAnalyses=10, count=3 (share=0.3) → candidato moderate', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 10,
    combinations: [{ type: 'P+O', first: 'P-B', second: 'O-D', count: 3 }],
  })
  assert.equal(result.length, 1)
  assert.equal(result[0].confidence, 'moderate')
  assert.equal(result[0].count, 3)
  assert.ok(Math.abs(result[0].share - 0.3) < 0.001)
})

// ─── 4. totalAnalyses >= 10 com share insuficiente ───────────────────────────

console.log('\n[4] totalAnalyses >= 10, share < 0.2 → excluído')

test('totalAnalyses=20, count=3 (share=0.15) → não cria candidato', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 20,
    combinations: [{ type: 'P+O', first: 'P-B', second: 'O-D', count: 3 }],
  })
  assert.equal(result.length, 0)
})

test('totalAnalyses=15, count=2 (share=0.133) → não cria candidato (count < 3)', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 15,
    combinations: [{ type: 'P+A', first: 'P-C', second: 'A-G', count: 2 }],
  })
  assert.equal(result.length, 0)
})

// ─── 5. totalAnalyses < 10 — preliminary ─────────────────────────────────────

console.log('\n[5] totalAnalyses < 10 → preliminary sem exigência de share')

test('totalAnalyses=5, count=3 (share=0.6) → candidato preliminary', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 5,
    combinations: [{ type: 'P+O', first: 'P-B', second: 'O-D', count: 3 }],
  })
  assert.equal(result.length, 1)
  assert.equal(result[0].confidence, 'preliminary')
})

test('totalAnalyses=7, count=3 (share≈0.43) → candidato preliminary', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 7,
    combinations: [{ type: 'P+A', first: 'P-B', second: 'A-G', count: 3 }],
  })
  assert.equal(result.length, 1)
  assert.equal(result[0].confidence, 'preliminary')
})

test('totalAnalyses=9, count=2 → ainda não cria (count < 3)', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 9,
    combinations: [{ type: 'P+O', first: 'P-B', second: 'O-D', count: 2 }],
  })
  assert.equal(result.length, 0)
})

// ─── 6. Ordenação ────────────────────────────────────────────────────────────

console.log('\n[6] ordenação')

test('count maior vem primeiro', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 10,
    combinations: [
      { type: 'P+O', first: 'P-B', second: 'O-D', count: 3 },
      { type: 'P+A', first: 'P-B', second: 'A-G', count: 5 },
    ],
  })
  assert.equal(result.length, 2)
  assert.equal(result[0].count, 5)
  assert.equal(result[1].count, 3)
})

test('count igual — id alfabético como fallback', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 10,
    combinations: [
      { type: 'P+O', first: 'P-C', second: 'O-D', count: 3 },  // id = P+O:P-C:O-D
      { type: 'P+O', first: 'P-B', second: 'O-D', count: 3 },  // id = P+O:P-B:O-D
    ],
  })
  assert.equal(result.length, 2)
  assert.equal(result[0].primary_code, 'P-B') // P-B < P-C alphabetically
  assert.equal(result[1].primary_code, 'P-C')
})

// ─── 7. Limite top 5 ─────────────────────────────────────────────────────────

console.log('\n[7] limite top 5')

test('6 candidatos válidos → retorna apenas 5', () => {
  const combinations = [
    { type: 'P+O' as const, first: 'P-A', second: 'O-A', count: 9 },
    { type: 'P+O' as const, first: 'P-A', second: 'O-B', count: 8 },
    { type: 'P+O' as const, first: 'P-A', second: 'O-C', count: 7 },
    { type: 'P+A' as const, first: 'P-B', second: 'A-G', count: 6 },
    { type: 'P+A' as const, first: 'P-C', second: 'A-G', count: 5 },
    { type: 'O+A' as const, first: 'O-D', second: 'A-G', count: 4 },
  ]
  const result = deriveSafetyIssueCandidates({ totalAnalyses: 20, combinations })
  // Only combinations with share >= 0.2 (count/20 >= 0.2 → count >= 4): all 6 qualify
  // But we cap at 5
  assert.equal(result.length, 5)
})

test('7 candidatos válidos → ainda retorna apenas 5', () => {
  const combinations = Array.from({ length: 7 }, (_, i) => ({
    type: 'P+O' as const,
    first: `P-${String.fromCharCode(65 + i)}`,
    second: 'O-A',
    count: 10,
  }))
  const result = deriveSafetyIssueCandidates({ totalAnalyses: 20, combinations })
  assert.equal(result.length, 5)
})

// ─── 8. caveat e conteúdo obrigatório ────────────────────────────────────────

console.log('\n[8] caveat e conteúdo obrigatório')

test('caveat contém "não constitui Safety Issue formal"', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 10,
    combinations: [{ type: 'P+O', first: 'P-B', second: 'O-D', count: 3 }],
  })
  assert.equal(result.length, 1)
  assert.ok(
    result[0].caveat.toLowerCase().includes('não constitui safety issue formal'),
    `caveat was: "${result[0].caveat}"`,
  )
})

// ─── 9. id determinístico ─────────────────────────────────────────────────────

console.log('\n[9] id determinístico')

test('mesma entrada gera mesmo id', () => {
  const input: SafetyIssueCandidateInput = {
    totalAnalyses: 10,
    combinations: [{ type: 'P+O', first: 'P-B', second: 'O-D', count: 3 }],
  }
  const r1 = deriveSafetyIssueCandidates(input)
  const r2 = deriveSafetyIssueCandidates(input)
  assert.equal(r1[0].id, r2[0].id)
})

test('id tem formato determinístico: type:first:second', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 10,
    combinations: [{ type: 'P+O', first: 'P-B', second: 'O-D', count: 3 }],
  })
  assert.equal(result[0].id, 'P+O:P-B:O-D')
})

// ─── 10. candidato P+O — campos corretos ─────────────────────────────────────

console.log('\n[10] candidato P+O — campos')

test('pattern_type = P+O', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 10,
    combinations: [{ type: 'P+O', first: 'P-B', second: 'O-D', count: 3 }],
  })
  assert.equal(result[0].pattern_type, 'P+O')
})

test('primary_code e secondary_code corretos', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 10,
    combinations: [{ type: 'P+O', first: 'P-B', second: 'O-D', count: 3 }],
  })
  assert.equal(result[0].primary_code, 'P-B')
  assert.equal(result[0].secondary_code, 'O-D')
})

test('label legível: "P-B + O-D"', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 10,
    combinations: [{ type: 'P+O', first: 'P-B', second: 'O-D', count: 3 }],
  })
  assert.equal(result[0].label, 'P-B + O-D')
})

test('rationale menciona count e total', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 10,
    combinations: [{ type: 'P+O', first: 'P-B', second: 'O-D', count: 3 }],
  })
  assert.ok(result[0].rationale.includes('3'))
  assert.ok(result[0].rationale.includes('10'))
})

// ─── 11. candidato precondition ──────────────────────────────────────────────

console.log('\n[11] candidato precondition')

test('precondição com count=3 e total=5 → preliminary', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 5,
    preconditions: [{ code: 'S1', label: 'Liderança e Supervisão', count: 3 }],
  })
  assert.equal(result.length, 1)
  assert.equal(result[0].pattern_type, 'precondition')
  assert.equal(result[0].confidence, 'preliminary')
  assert.equal(result[0].primary_code, 'S1')
  assert.equal(result[0].id, 'precondition:S1')
})

test('precondição com count=3 e total=10 → moderate', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 10,
    preconditions: [{ code: 'S1', count: 3 }],
  })
  assert.equal(result.length, 1)
  assert.equal(result[0].confidence, 'moderate')
})

test('precondição com count=3 e total=20 (share=0.15) → excluída', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 20,
    preconditions: [{ code: 'S1', count: 3 }],
  })
  assert.equal(result.length, 0)
})

test('label de precondição inclui código e nome quando nome disponível', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 5,
    preconditions: [{ code: 'S1', label: 'Liderança e Supervisão', count: 3 }],
  })
  assert.ok(result[0].label.includes('S1'))
  assert.ok(result[0].label.includes('Liderança e Supervisão'))
})

// ─── 12. combinações + precondições juntas ────────────────────────────────────

console.log('\n[12] combinações e precondições juntas')

test('mistura — combinação e precondição — top 5 respeitado', () => {
  const result = deriveSafetyIssueCandidates({
    totalAnalyses: 10,
    combinations: [
      { type: 'P+O', first: 'P-B', second: 'O-D', count: 5 },
      { type: 'P+A', first: 'P-B', second: 'A-G', count: 4 },
      { type: 'O+A', first: 'O-D', second: 'A-G', count: 3 },
    ],
    preconditions: [
      { code: 'S1', count: 4 },
      { code: 'S2', count: 3 },
    ],
  })
  assert.equal(result.length, 5)
  // highest count first
  assert.equal(result[0].count, 5)
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
console.log('Safety Issue Candidates tests passed')
process.exit(0)
