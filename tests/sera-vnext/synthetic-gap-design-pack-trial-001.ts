import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const base = path.resolve('docs/sera-vnext/real-event-reentry-a4r193')

const packPath = path.join(base, 'SERA_A4R193_P_SYNTHETIC_GAP_DESIGN_PACK_v0.2.0.md')
const matrixPath = path.join(base, 'SERA_A4R193_P_SYNTHETIC_GAP_DESIGN_MATRIX.csv')
const gatePath = path.join(base, 'SERA_A4R193_P_SYNTHETIC_AUTHORIZATION_GATE_v0.2.0.md')
const productBlockPath = path.join(base, 'SERA_A4R193_P_PRODUCT_BLOCK_CONTINUATION_v0.2.0.md')
const logPath = path.join(base, 'SERA_A4R193_P_LOG_v0.2.0.md')
const qPlanPath = path.join(base, 'SERA_A4R193_Q_READINESS_PLAN_v0.2.0.md')
const auditPath = path.resolve(
  'docs/sera-vnext/real-event-reentry-a4r193-review/SERA_A4R193_A_TO_O_INDEPENDENT_AUDIT_OPUS_v0.2.0.md',
)

for (const p of [packPath, matrixPath, gatePath, productBlockPath, logPath, qPlanPath, auditPath]) {
  assert.equal(fs.existsSync(p), true, `required artifact missing: ${p}`)
}

const pack = fs.readFileSync(packPath, 'utf8')
const matrix = fs.readFileSync(matrixPath, 'utf8').trim()
const gate = fs.readFileSync(gatePath, 'utf8')
const productBlock = fs.readFileSync(productBlockPath, 'utf8')
const log = fs.readFileSync(logPath, 'utf8')
const qPlan = fs.readFileSync(qPlanPath, 'utf8')
const all = [pack, matrix, gate, productBlock, log, qPlan].join('\n')

assert.equal(pack.includes('DESIGN_ONLY_COMPLETE'), true)
assert.equal(pack.includes('NO_SYNTHETIC_CASE_CREATED'), true)
assert.equal(pack.includes('RR-001: OPEN'), true)
assert.equal(pack.includes('RR-003: PARTIALLY_MITIGATED'), true)

const lines = matrix.split(/\r?\n/)
assert.ok(lines.length >= 11, 'matrix must include header plus 10 gaps')
for (const gapId of [
  'GAP-001',
  'GAP-002',
  'GAP-003',
  'GAP-004',
  'GAP-005',
  'GAP-006',
  'GAP-007',
  'GAP-008',
  'GAP-009',
  'GAP-010',
]) {
  assert.equal(matrix.includes(gapId), true, `missing mandatory gap row: ${gapId}`)
}

assert.equal(gate.includes('AUTORIZACAO_HUMANA_EXPLICITA_OBRIGATORIA'), true)
assert.equal(productBlock.includes('PRODUCT_BLOCKED'), true)
assert.equal(productBlock.includes('RR-001'), true)
assert.equal(productBlock.includes('RR-003'), true)

assert.equal(fs.existsSync(path.join(base, 'SERA_A4R193_P_SYNTHETIC_CASE_INSTANCE_001.md')), false)
assert.equal(fs.existsSync(path.resolve('tests/sera/fixtures/SERA_A4R193_P_SYNTHETIC_CASE_INSTANCE_001.json')), false)
assert.equal(fs.existsSync(path.resolve('tests/reports/baseline/SERA_A4R193_P_SYNTHETIC_CASE_INSTANCE_001.json')), false)

for (const token of ['selectedCode:', 'releasedCode:', 'finalConclusion:', 'downstream:', 'CLASSIFIED:']) {
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

assert.equal(/REAL_EVENT_REENTRY_.*A4R193_P/i.test(all), false, 'P must not define new reentry record')

console.log('synthetic-gap-design-pack-trial-001: OK')
