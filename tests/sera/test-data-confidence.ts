// tests/sera/test-data-confidence.ts
//
// Unit tests for buildDataConfidence (RISK v0.9-E).
// No Supabase, no React, no browser.
//
// Usage:
//   npx tsx tests/sera/test-data-confidence.ts
//
// Exit codes:
//   0 — all tests passed
//   1 — at least one test failed

import assert from 'node:assert/strict'
import { buildDataConfidence } from '@/lib/sera/data-confidence'

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

// ─── 1. total = 0 — insufficient ─────────────────────────────────────────────

console.log('\n[1] total = 0 → insufficient')

test('level = insufficient quando total = 0', () => {
  const r = buildDataConfidence({ totalAnalyses: 0, validErcCount: 0 })
  assert.equal(r.level, 'insufficient')
})

test('valid_erc_share = 0 quando total = 0', () => {
  const r = buildDataConfidence({ totalAnalyses: 0, validErcCount: 0 })
  assert.equal(r.valid_erc_share, 0)
})

test('mensagem de "sem análises" quando total = 0', () => {
  const r = buildDataConfidence({ totalAnalyses: 0, validErcCount: 0 })
  assert.ok(
    r.messages.some((m) => m.toLowerCase().includes('não há análises') || m.toLowerCase().includes('perfil')),
    `messages were: ${JSON.stringify(r.messages)}`,
  )
})

test('has_safety_issue_candidates = false quando total = 0', () => {
  const r = buildDataConfidence({ totalAnalyses: 0, validErcCount: 0 })
  assert.equal(r.has_safety_issue_candidates, false)
})

// ─── 2. total = 5, valid = 5 → limited ───────────────────────────────────────

console.log('\n[2] total = 5, valid = 5 → limited')

test('level = limited quando total = 5 < 10', () => {
  const r = buildDataConfidence({ totalAnalyses: 5, validErcCount: 5 })
  assert.equal(r.level, 'limited')
})

test('valid_erc_share = 1 quando valid = total', () => {
  const r = buildDataConfidence({ totalAnalyses: 5, validErcCount: 5 })
  assert.equal(r.valid_erc_share, 1)
})

test('mensagem de "perfil em formação" quando limited', () => {
  const r = buildDataConfidence({ totalAnalyses: 5, validErcCount: 5 })
  assert.ok(
    r.messages.some((m) => m.toLowerCase().includes('perfil em formação') || m.toLowerCase().includes('formação')),
    `messages were: ${JSON.stringify(r.messages)}`,
  )
})

// ─── 3. total = 10, valid = 7 → moderate ─────────────────────────────────────

console.log('\n[3] total = 10, valid = 7 → moderate')

test('level = moderate quando total >= 10 e share < 0.8', () => {
  const r = buildDataConfidence({ totalAnalyses: 10, validErcCount: 7 })
  assert.equal(r.level, 'moderate')
})

test('valid_erc_share = 0.7', () => {
  const r = buildDataConfidence({ totalAnalyses: 10, validErcCount: 7 })
  assert.ok(Math.abs(r.valid_erc_share - 0.7) < 0.001)
})

test('mensagem de ERC parcial/cautela quando share < 0.8', () => {
  const r = buildDataConfidence({ totalAnalyses: 10, validErcCount: 7 })
  assert.ok(
    r.messages.some((m) => m.toLowerCase().includes('erc') || m.toLowerCase().includes('cautela') || m.toLowerCase().includes('cautelosas')),
    `messages were: ${JSON.stringify(r.messages)}`,
  )
})

// ─── 4. total = 10, valid = 8 → strong ───────────────────────────────────────

console.log('\n[4] total = 10, valid = 8 → strong')

test('level = strong quando total >= 10 e share >= 0.8', () => {
  const r = buildDataConfidence({ totalAnalyses: 10, validErcCount: 8 })
  assert.equal(r.level, 'strong')
})

test('valid_erc_share = 0.8', () => {
  const r = buildDataConfidence({ totalAnalyses: 10, validErcCount: 8 })
  assert.ok(Math.abs(r.valid_erc_share - 0.8) < 0.001)
})

test('total = 20, valid = 20 → strong', () => {
  const r = buildDataConfidence({ totalAnalyses: 20, validErcCount: 20 })
  assert.equal(r.level, 'strong')
})

// ─── 5. validErcCount > totalAnalyses → capar ────────────────────────────────

console.log('\n[5] validErcCount > totalAnalyses → capar em total')

test('valid_erc_count capado em totalAnalyses', () => {
  const r = buildDataConfidence({ totalAnalyses: 5, validErcCount: 10 })
  assert.equal(r.valid_erc_count, 5)
})

test('valid_erc_share max = 1 quando valid > total', () => {
  const r = buildDataConfidence({ totalAnalyses: 5, validErcCount: 10 })
  assert.equal(r.valid_erc_share, 1)
})

// ─── 6. inputs negativos → normalizar para 0 ─────────────────────────────────

console.log('\n[6] inputs negativos → normalizar para 0')

test('totalAnalyses < 0 → tratado como 0', () => {
  const r = buildDataConfidence({ totalAnalyses: -5, validErcCount: 0 })
  assert.equal(r.total_analyses, 0)
  assert.equal(r.level, 'insufficient')
})

test('validErcCount < 0 → tratado como 0', () => {
  const r = buildDataConfidence({ totalAnalyses: 10, validErcCount: -3 })
  assert.equal(r.valid_erc_count, 0)
  assert.equal(r.valid_erc_share, 0)
})

// ─── 7. safetyIssueCandidateCount > 0 ────────────────────────────────────────

console.log('\n[7] safetyIssueCandidateCount > 0')

test('has_safety_issue_candidates = true quando count > 0', () => {
  const r = buildDataConfidence({
    totalAnalyses: 10, validErcCount: 8, safetyIssueCandidateCount: 2,
  })
  assert.equal(r.has_safety_issue_candidates, true)
})

test('mensagem sobre candidatos requererem revisão quando há candidatos', () => {
  const r = buildDataConfidence({
    totalAnalyses: 10, validErcCount: 8, safetyIssueCandidateCount: 2,
  })
  assert.ok(
    r.messages.some((m) => m.toLowerCase().includes('candidatos') && (m.toLowerCase().includes('revisão') || m.toLowerCase().includes('revisao') || m.toLowerCase().includes('requerem'))),
    `messages were: ${JSON.stringify(r.messages)}`,
  )
})

// ─── 8. safetyIssueCandidateCount = 0 ────────────────────────────────────────

console.log('\n[8] safetyIssueCandidateCount = 0')

test('mensagem de ausência não significa ausência de padrões quando sem candidatos', () => {
  const r = buildDataConfidence({
    totalAnalyses: 10, validErcCount: 8, safetyIssueCandidateCount: 0,
  })
  assert.ok(
    r.messages.some((m) => m.toLowerCase().includes('ausência') || m.toLowerCase().includes('ausencia') || m.toLowerCase().includes('não significa')),
    `messages were: ${JSON.stringify(r.messages)}`,
  )
})

// ─── 9. caveat sobre confiança ≠ risco ───────────────────────────────────────

console.log('\n[9] caveat')

test('caveat contém referência a "não nível de risco" ou equivalente', () => {
  const r = buildDataConfidence({ totalAnalyses: 10, validErcCount: 8 })
  const c = r.caveat.toLowerCase()
  assert.ok(
    c.includes('não nível de risco') || c.includes('não é') || c.includes('confiança dos dados') || c.includes('não significa risco'),
    `caveat was: "${r.caveat}"`,
  )
})

test('caveat menciona que baixa confiança não é risco baixo ou alto', () => {
  const r = buildDataConfidence({ totalAnalyses: 0, validErcCount: 0 })
  const c = r.caveat.toLowerCase()
  assert.ok(
    c.includes('baixa confiança') || c.includes('não significa risco'),
    `caveat was: "${r.caveat}"`,
  )
})

// ─── 10. minimumRecommended custom ───────────────────────────────────────────

console.log('\n[10] minimumRecommended custom')

test('total = 9, min = 5 → strong (se valid_erc_share >= 0.8)', () => {
  const r = buildDataConfidence({
    totalAnalyses: 9, validErcCount: 9, minimumRecommended: 5,
  })
  // total(9) >= min(5) → not limited; share(1.0) >= 0.8 → strong
  assert.equal(r.level, 'strong')
})

test('total = 9, min = 10 → limited', () => {
  const r = buildDataConfidence({
    totalAnalyses: 9, validErcCount: 9, minimumRecommended: 10,
  })
  assert.equal(r.level, 'limited')
})

test('minimumRecommended aparece no campo do resultado', () => {
  const r = buildDataConfidence({
    totalAnalyses: 10, validErcCount: 10, minimumRecommended: 15,
  })
  assert.equal(r.minimum_recommended, 15)
})

// ─── 11. separação semântica: sem dados ≠ risco baixo ────────────────────────

console.log('\n[11] ausência de dados ≠ risco baixo')

test('insufficient nunca tem mensagem de risco baixo', () => {
  const r = buildDataConfidence({ totalAnalyses: 0, validErcCount: 0 })
  assert.ok(
    !r.messages.some((m) => m.toLowerCase().includes('risco baixo')),
    'mensagem indevida de risco baixo encontrada',
  )
})

test('limited nunca tem mensagem de risco baixo', () => {
  const r = buildDataConfidence({ totalAnalyses: 3, validErcCount: 3 })
  assert.ok(
    !r.messages.some((m) => m.toLowerCase().includes('risco baixo')),
    'mensagem indevida de risco baixo encontrada',
  )
})

test('total_analyses e valid_erc_count preservados no resultado', () => {
  const r = buildDataConfidence({ totalAnalyses: 12, validErcCount: 9 })
  assert.equal(r.total_analyses, 12)
  assert.equal(r.valid_erc_count, 9)
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
console.log('Data confidence tests passed')
process.exit(0)
