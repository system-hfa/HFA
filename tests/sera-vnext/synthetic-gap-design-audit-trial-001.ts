import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const reviewBase = path.resolve('docs/sera-vnext/real-event-reentry-a4r193-review')
const pBase = path.resolve('docs/sera-vnext/real-event-reentry-a4r193')

const reportPath = path.join(reviewBase, 'SERA_A4R193_P_SYNTHETIC_GAP_DESIGN_AUDIT_v0.2.0.md')
const matrixPath = path.join(reviewBase, 'SERA_A4R193_P_SYNTHETIC_GAP_AUDIT_MATRIX.csv')
const gatePath = path.join(pBase, 'SERA_A4R193_P_SYNTHETIC_AUTHORIZATION_GATE_v0.2.0.md')
const productBlockPath = path.join(pBase, 'SERA_A4R193_P_PRODUCT_BLOCK_CONTINUATION_v0.2.0.md')
const pPackPath = path.join(pBase, 'SERA_A4R193_P_SYNTHETIC_GAP_DESIGN_PACK_v0.2.0.md')

for (const p of [reportPath, matrixPath, gatePath, productBlockPath, pPackPath]) {
  assert.equal(fs.existsSync(p), true, `required artifact missing: ${p}`)
}

const report = fs.readFileSync(reportPath, 'utf8')
const matrixRaw = fs.readFileSync(matrixPath, 'utf8').trim()
const gate = fs.readFileSync(gatePath, 'utf8')
const productBlock = fs.readFileSync(productBlockPath, 'utf8')
const pPack = fs.readFileSync(pPackPath, 'utf8')
const all = [report, matrixRaw, gate, productBlock, pPack].join('\n')

const lines = matrixRaw.split(/\r?\n/)
assert.ok(lines.length >= 11, 'matrix must include header plus 10 rows')
const header = lines[0].split(',')
const rows = lines.slice(1).map((line) => {
  const cols = line.split(',')
  const row: Record<string, string> = {}
  for (let i = 0; i < header.length; i += 1) row[header[i]] = cols[i] ?? ''
  return row
})

const gapIds = ['GAP-001', 'GAP-002', 'GAP-003', 'GAP-004', 'GAP-005', 'GAP-006', 'GAP-007', 'GAP-008', 'GAP-009', 'GAP-010']
for (const gapId of gapIds) {
  assert.equal(rows.some((r) => r.gap_id === gapId), true, `missing gap row: ${gapId}`)
}

const allowedStatuses = new Set([
  'JUSTIFIED',
  'JUSTIFIED_WITH_WARNING',
  'NOT_JUSTIFIED',
  'DUPLICATE',
  'SHOULD_MERGE',
  'SHOULD_SPLIT',
  'SHOULD_MERGE_REVIEW_WITH_GAP001_GAP010',
  'SHOULD_MERGE_REVIEW_WITH_GAP001_GAP002',
  'SHOULD_SPLIT_IF_DUAL_ACTOR_CONFLICT_PERSISTS',
])

for (const row of rows) {
  assert.equal(allowedStatuses.has(row.audit_status), true, `invalid audit_status for ${row.gap_id}`)
  if (row.audit_status === 'NOT_JUSTIFIED') {
    assert.equal(/corrective|merge|split|revise/i.test(row.notes), true, `${row.gap_id}: NOT_JUSTIFIED requires corrective recommendation`)
  }
}

assert.equal(fs.existsSync(path.join(pBase, 'SERA_A4R193_P_SYNTHETIC_CASE_INSTANCE_001.md')), false)
assert.equal(fs.existsSync(path.resolve('tests/sera/fixtures/SERA_A4R193_P_SYNTHETIC_CASE_INSTANCE_001.json')), false)
assert.equal(fs.existsSync(path.resolve('tests/reports/baseline/SERA_A4R193_P_SYNTHETIC_CASE_INSTANCE_001.json')), false)

assert.equal(gate.includes('AUTORIZACAO_HUMANA_EXPLICITA_OBRIGATORIA'), true)
assert.equal(productBlock.includes('PRODUCT_BLOCKED'), true)
assert.equal(all.includes('RR-001: `OPEN`') || all.includes('RR-001: OPEN'), true)
assert.equal(all.includes('RR-003: `PARTIALLY_MITIGATED`') || all.includes('RR-003: PARTIALLY_MITIGATED'), true)

for (const token of ['selectedCode:', 'releasedCode:', 'finalConclusion:', 'downstream:']) {
  assert.equal(all.includes(token), false, `${token} field must not appear`)
}

if (/daumas/i.test(all)) {
  assert.equal(/\bDaumas\b/.test(all), true, 'Daumas must be spelled as Daumas')
}
for (const token of ['DAL', 'Dalmos', 'Dalmais']) {
  assert.equal(all.includes(token), false, `${token} must not appear as valid entity`)
}

const inventedQuestionPattern = new RegExp(
  [
    `P-${'1'}`,
    `P-${'2'}`,
    `O-${'1'}`,
    `O-${'2'}`,
    `A-${'1'}`,
    `A-${'2'}`,
    `Pergunta por ${'eixo'}`,
    `pergunta por ${'eixo'}`,
    `case-specific ${'question'}`,
    `auxiliary ${'question'}`,
  ].join('|'),
)
assert.equal(inventedQuestionPattern.test(all), false, 'invented-question pattern must not appear')

console.log('synthetic-gap-design-audit-trial-001: OK')
