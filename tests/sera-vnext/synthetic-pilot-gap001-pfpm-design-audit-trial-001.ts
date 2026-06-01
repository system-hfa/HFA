import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const DIR = path.resolve(ROOT, 'docs/sera-vnext/synthetic-pilots-a4r194')

const auditPath = path.join(DIR, 'SYNTHETIC_PILOT_GAP001_PFPM_DESIGN_AUDIT_A4R194_B_v0.2.0.md')
const matrixPath = path.join(DIR, 'SYNTHETIC_PILOT_GAP001_PFPM_DESIGN_AUDIT_MATRIX_A4R194_B.csv')
const designPath = path.join(DIR, 'SYNTHETIC_PILOT_GAP001_PFPM_SEPARATION_DESIGN_A4R194_A_v0.2.0.md')
const productBlockPath = path.join(DIR, 'SYNTHETIC_PILOT_GAP001_PRODUCT_BLOCK_A4R194_A_v0.2.0.md')

for (const p of [auditPath, matrixPath, designPath, productBlockPath]) {
  assert.equal(fs.existsSync(p), true, `Missing required file: ${p}`)
}

const audit = fs.readFileSync(auditPath, 'utf8')
const matrix = fs.readFileSync(matrixPath, 'utf8')
const design = fs.readFileSync(designPath, 'utf8')
const product = fs.readFileSync(productBlockPath, 'utf8')
const merged = [audit, matrix, design, product].join('\n')

const allowedVerdicts = [
  'PILOT_DESIGN_PASS',
  'PILOT_DESIGN_PASS_WITH_WARNINGS',
  'PILOT_DESIGN_NEEDS_CORRECTION',
  'PILOT_DESIGN_BLOCKED',
]
assert.equal(allowedVerdicts.some((v) => audit.includes(v)), true, 'Audit verdict missing or invalid')

for (let i = 1; i <= 12; i += 1) {
  const id = `REQ-${String(i).padStart(3, '0')}`
  assert.equal(matrix.includes(id), true, `Missing ${id} in audit matrix`)
}

const lines = matrix.trim().split('\n').slice(1)
let hasNeedsCorrection = false
for (const line of lines) {
  const cols = line.split(',')
  const status = cols[2] ?? ''
  assert.notEqual(status, 'BLOCKED', `Blocked requirement not allowed: ${line}`)
  if (status === 'NEEDS_CORRECTION') hasNeedsCorrection = true
}

if (hasNeedsCorrection) {
  assert.equal(audit.includes('ALLOW_NEXT_PHASE_MATERIALIZATION_DESIGN_ONLY'), false, 'Next phase cannot be allowed with NEEDS_CORRECTION')
}

assert.equal(merged.toLowerCase().includes('no_synthetic_case_instance') || merged.toLowerCase().includes('no synthetic case instance'), true)
assert.equal(/complete synthetic event narrative/i.test(merged), true, 'Must explicitly assert no complete narrative materialization')
assert.equal(fs.existsSync(path.resolve(ROOT, 'tests/sera/fixtures/SYNTHETIC_PILOT_GAP001_CASE_INSTANCE_001.json')), false)
assert.equal(fs.existsSync(path.resolve(ROOT, 'tests/reports/baseline/SYNTHETIC_PILOT_GAP001_CASE_INSTANCE_001.json')), false)

assert.equal(product.includes('PRODUCT_BLOCKED'), true)
assert.equal(product.includes('RR-001') && product.includes('OPEN'), true)
assert.equal(product.includes('RR-003') && product.includes('PARTIALLY_MITIGATED'), true)

for (const token of ['selectedCode:', 'releasedCode:', 'finalConclusion:', 'downstream:']) {
  assert.equal(merged.includes(token), false, `Forbidden downstream token found: ${token}`)
}

for (const token of ['DAL', 'Dalmos', 'Dalmais']) {
  assert.equal(merged.includes(token), false, `Invalid terminology leaked: ${token}`)
}

const axisTags = ['P', 'O', 'A'].flatMap((axis) => [`${axis}-${1}`, `${axis}-${2}`])
const phraseTags = ['Pergunta' + ' por eixo', 'pergunta' + ' por eixo', 'case-specific' + ' question', 'auxiliary' + ' question']
const inventedPattern = new RegExp([...axisTags, ...phraseTags].map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'))
assert.equal(inventedPattern.test(merged), false, 'Invented-question pattern detected')

console.log('synthetic-pilot-gap001-pfpm-design-audit-trial-001: OK')
