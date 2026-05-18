// tests/sera/test-risk-quality-trend.ts
//
// Unit tests for buildRiskQualityTrend (RISK v0.9-D).
// No Supabase, no React, no browser.
//
// Usage:
//   npx tsx tests/sera/test-risk-quality-trend.ts
//
// Exit codes:
//   0 — all tests passed
//   1 — at least one test failed

import assert from 'node:assert/strict'
import { buildRiskQualityTrend } from '@/lib/sera/risk-quality-trend'
import type { RiskQualityTrendInput } from '@/lib/sera/risk-quality-trend'

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

function a(created_at: string | null, erc_level: unknown): RiskQualityTrendInput {
  return { created_at, erc_level }
}

// ─── 1. Zero state ────────────────────────────────────────────────────────────

console.log('\n[1] zero state')

test('array vazio → []', () => {
  assert.deepEqual(buildRiskQualityTrend([]), [])
})

test('apenas inválidos → []', () => {
  const result = buildRiskQualityTrend([
    a(null, null),
    a(null, 1),
    a('2026-05-01', null),
    a('2026-05-01', '1'),
    a('2026-05-01', 0),
    a('2026-05-01', 6),
  ])
  assert.equal(result.length, 0)
})

// ─── 2. ERC inválido ignorado ─────────────────────────────────────────────────

console.log('\n[2] ERC inválido ignorado')

test('erc_level null → mês não criado se não houver ERC válido no mês', () => {
  const result = buildRiskQualityTrend([a('2026-05-01', null)])
  assert.equal(result.length, 0)
})

test("erc_level string '1' → ignorado", () => {
  const result = buildRiskQualityTrend([a('2026-05-01', '1')])
  assert.equal(result.length, 0)
})

test('erc_level 0 → ignorado (fora de {1..5})', () => {
  const result = buildRiskQualityTrend([a('2026-05-01', 0)])
  assert.equal(result.length, 0)
})

test('erc_level 6 → ignorado (fora de {1..5})', () => {
  const result = buildRiskQualityTrend([a('2026-05-01', 6)])
  assert.equal(result.length, 0)
})

test('erc_level NaN → ignorado', () => {
  const result = buildRiskQualityTrend([a('2026-05-01', Number.NaN)])
  assert.equal(result.length, 0)
})

// ─── 3. Conversão legacy → HFA ────────────────────────────────────────────────

console.log('\n[3] conversão legacy → HFA')

test('legacy 1 (crítico) → HFA 5 → c5 += 1', () => {
  const [pt] = buildRiskQualityTrend([a('2026-01-01', 1)])
  assert.equal(pt.hfa_erc.c5, 1)
  assert.equal(pt.hfa_erc.c1, 0)
})

test('legacy 5 (mínimo) → HFA 1 → c1 += 1', () => {
  const [pt] = buildRiskQualityTrend([a('2026-01-01', 5)])
  assert.equal(pt.hfa_erc.c1, 1)
  assert.equal(pt.hfa_erc.c5, 0)
})

test('legacy 2 → HFA 4 → c4 += 1', () => {
  const [pt] = buildRiskQualityTrend([a('2026-01-01', 2)])
  assert.equal(pt.hfa_erc.c4, 1)
})

test('legacy 3 → HFA 3 → c3 += 1 (simétrico)', () => {
  const [pt] = buildRiskQualityTrend([a('2026-01-01', 3)])
  assert.equal(pt.hfa_erc.c3, 1)
})

test('legacy 4 → HFA 2 → c2 += 1', () => {
  const [pt] = buildRiskQualityTrend([a('2026-01-01', 4)])
  assert.equal(pt.hfa_erc.c2, 1)
})

// ─── 4. Agrupamento mensal ────────────────────────────────────────────────────

console.log('\n[4] agrupamento mensal')

test('duas análises no mesmo mês somam', () => {
  const result = buildRiskQualityTrend([
    a('2026-01-01', 1),  // → HFA 5
    a('2026-01-15', 1),  // → HFA 5
  ])
  assert.equal(result.length, 1)
  assert.equal(result[0].hfa_erc.c5, 2)
  assert.equal(result[0].total, 2)
})

test('análises em meses diferentes geram pontos separados', () => {
  const result = buildRiskQualityTrend([
    a('2026-01-01', 1),
    a('2026-03-01', 1),
  ])
  assert.equal(result.length, 2)
})

test('mês extraído de ISO timestamp completo', () => {
  const result = buildRiskQualityTrend([
    a('2026-05-18T10:30:00.000Z', 1),
  ])
  assert.equal(result.length, 1)
  assert.equal(result[0].month, '2026-05')
})

// ─── 5. Ordenação ascendente ──────────────────────────────────────────────────

console.log('\n[5] ordenação ascendente')

test('março depois de janeiro → [janeiro, março] ordenados', () => {
  const result = buildRiskQualityTrend([
    a('2026-03-01', 1),
    a('2026-01-01', 1),
  ])
  assert.equal(result[0].month, '2026-01')
  assert.equal(result[1].month, '2026-03')
})

test('meses desordenados → ordenados corretamente', () => {
  const result = buildRiskQualityTrend([
    a('2026-06-01', 3),
    a('2026-02-01', 1),
    a('2026-04-01', 5),
  ])
  assert.equal(result[0].month, '2026-02')
  assert.equal(result[1].month, '2026-04')
  assert.equal(result[2].month, '2026-06')
})

// ─── 6. Dominante com desempate conservador ───────────────────────────────────

console.log('\n[6] dominante — desempate conservador (HFA maior vence)')

test('HFA 5 e HFA 1 com mesma freq → dominant = 5', () => {
  const result = buildRiskQualityTrend([
    a('2026-01-01', 1),  // → HFA 5
    a('2026-01-02', 5),  // → HFA 1
  ])
  assert.equal(result[0].dominant_hfa_erc_category, 5)
})

test('HFA 3 com maioria → dominant = 3', () => {
  const result = buildRiskQualityTrend([
    a('2026-01-01', 3),
    a('2026-01-02', 3),
    a('2026-01-03', 1),
  ])
  assert.equal(result[0].dominant_hfa_erc_category, 3)
})

test('HFA 4 e HFA 3 empatados → dominant = 4 (conservador)', () => {
  const result = buildRiskQualityTrend([
    a('2026-01-01', 2),  // → HFA 4
    a('2026-01-02', 3),  // → HFA 3
  ])
  assert.equal(result[0].dominant_hfa_erc_category, 4)
})

test('mês com total 0 ERC válido → não aparece no resultado', () => {
  const result = buildRiskQualityTrend([
    a('2026-01-01', null),
    a('2026-01-02', 'invalid'),
  ])
  assert.equal(result.length, 0)
})

// ─── 7. critical_or_high_count = c4 + c5 ─────────────────────────────────────

console.log('\n[7] critical_or_high_count')

test('c4+c5 calculado corretamente', () => {
  const result = buildRiskQualityTrend([
    a('2026-01-01', 1),  // → HFA 5 (c5)
    a('2026-01-02', 2),  // → HFA 4 (c4)
    a('2026-01-03', 3),  // → HFA 3 (c3)
    a('2026-01-04', 5),  // → HFA 1 (c1)
  ])
  assert.equal(result[0].critical_or_high_count, 2)  // c4=1 + c5=1
})

test('nenhum c4/c5 → critical_or_high_count = 0', () => {
  const result = buildRiskQualityTrend([
    a('2026-01-01', 3),  // → HFA 3
    a('2026-01-02', 5),  // → HFA 1
  ])
  assert.equal(result[0].critical_or_high_count, 0)
})

// ─── 8. critical_or_high_share ───────────────────────────────────────────────

console.log('\n[8] critical_or_high_share')

test('4 análises, c4+c5=2 → share = 0.5', () => {
  const result = buildRiskQualityTrend([
    a('2026-01-01', 1),  // → HFA 5
    a('2026-01-02', 2),  // → HFA 4
    a('2026-01-03', 3),  // → HFA 3
    a('2026-01-04', 4),  // → HFA 2
  ])
  assert.ok(Math.abs(result[0].critical_or_high_share - 0.5) < 0.001)
})

test('share = 0 quando não há c4/c5', () => {
  const result = buildRiskQualityTrend([
    a('2026-01-01', 3),  // → HFA 3
    a('2026-01-02', 5),  // → HFA 1
  ])
  assert.equal(result[0].critical_or_high_share, 0)
})

test('share = 1 quando todos c5', () => {
  const result = buildRiskQualityTrend([
    a('2026-01-01', 1),  // → HFA 5
    a('2026-01-02', 1),  // → HFA 5
  ])
  assert.equal(result[0].critical_or_high_share, 1)
})

// ─── 9. created_at inválido ignorado ─────────────────────────────────────────

console.log('\n[9] created_at inválido ignorado')

test('created_at null → análise ignorada', () => {
  const result = buildRiskQualityTrend([a(null, 1)])
  assert.equal(result.length, 0)
})

test('created_at string vazia → análise ignorada', () => {
  const result = buildRiskQualityTrend([a('', 1)])
  assert.equal(result.length, 0)
})

test('created_at sem prefixo YYYY-MM → análise ignorada', () => {
  const result = buildRiskQualityTrend([a('not-a-date', 1)])
  assert.equal(result.length, 0)
})

// ─── 10. Separação volume vs qualidade ───────────────────────────────────────

console.log('\n[10] volume ≠ qualidade')

test('mês com 10 análises HFA 1 tem critical_or_high_share = 0', () => {
  const analyses = Array.from({ length: 10 }, () => a('2026-01-01', 5))  // → HFA 1
  const result = buildRiskQualityTrend(analyses)
  assert.equal(result[0].total, 10)
  assert.equal(result[0].critical_or_high_share, 0)
})

test('mês com 2 análises HFA 5 tem critical_or_high_share = 1', () => {
  const analyses = [a('2026-02-01', 1), a('2026-02-02', 1)]  // → HFA 5
  const result = buildRiskQualityTrend(analyses)
  assert.equal(result[0].total, 2)
  assert.equal(result[0].critical_or_high_share, 1)
})

test('volume maior não implica pior qualidade', () => {
  const jan = Array.from({ length: 10 }, () => a('2026-01-01', 5))  // HFA 1 (aceitável)
  const feb = [a('2026-02-01', 1)]  // HFA 5 (crítico)
  const result = buildRiskQualityTrend([...jan, ...feb])
  assert.equal(result[0].month, '2026-01')
  assert.equal(result[0].total, 10)
  assert.equal(result[0].critical_or_high_share, 0)
  assert.equal(result[1].month, '2026-02')
  assert.equal(result[1].total, 1)
  assert.equal(result[1].critical_or_high_share, 1)
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
console.log('Risk quality trend tests passed')
process.exit(0)
