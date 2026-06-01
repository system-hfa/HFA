import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const DOC_DIR = path.resolve(process.cwd(), 'docs/sera-vnext/synthetic-pilots-a4r194')

const mainDocPath = path.join(DOC_DIR, 'SYNTHETIC_PILOT_GAP001_PFPM_SEPARATION_DESIGN_A4R194_A_v0.2.0.md')
const matrixPath = path.join(DOC_DIR, 'SYNTHETIC_PILOT_GAP001_PFPM_REQUIREMENTS_MATRIX_A4R194_A.csv')
const checklistPath = path.join(DOC_DIR, 'SYNTHETIC_PILOT_GAP001_AUTHORIZATION_CHECKLIST_A4R194_A_v0.2.0.md')
const productBlockPath = path.join(DOC_DIR, 'SYNTHETIC_PILOT_GAP001_PRODUCT_BLOCK_A4R194_A_v0.2.0.md')

for (const p of [mainDocPath, matrixPath, checklistPath, productBlockPath]) {
  assert.equal(fs.existsSync(p), true, `Missing required file: ${p}`)
}

const mainDoc = fs.readFileSync(mainDocPath, 'utf8')
const matrix = fs.readFileSync(matrixPath, 'utf8')
const checklist = fs.readFileSync(checklistPath, 'utf8')
const productBlock = fs.readFileSync(productBlockPath, 'utf8')
const merged = [mainDoc, matrix, checklist, productBlock].join('\n')

assert.equal(mainDoc.includes('DESIGN_ONLY'), true)
assert.equal(mainDoc.includes('NO_SYNTHETIC_CASE_INSTANCE'), true)
assert.equal(mainDoc.includes('PILOT_DESIGN_READY_FOR_AUDIT'), true)
assert.equal(mainDoc.includes('GAP-001'), true)
assert.equal(mainDoc.includes('PF') && mainDoc.includes('PM'), true)

for (let i = 1; i <= 12; i += 1) {
  assert.equal(matrix.includes(`REQ-${String(i).padStart(3, '0')}`), true, `Missing requirement REQ-${String(i).padStart(3, '0')}`)
}

assert.equal(merged.toLowerCase().includes('autorizacao humana explicita'), true)
assert.equal(merged.toLowerCase().includes('audit') || merged.toLowerCase().includes('auditoria'), true)
assert.equal(merged.toLowerCase().includes('materializacao'), true)

assert.equal(fs.existsSync(path.resolve(process.cwd(), 'tests/sera/fixtures/SYNTHETIC_PILOT_GAP001_CASE_INSTANCE_001.json')), false)
assert.equal(fs.existsSync(path.resolve(process.cwd(), 'tests/reports/baseline/SYNTHETIC_PILOT_GAP001_CASE_INSTANCE_001.json')), false)

assert.equal(productBlock.includes('PRODUCT_BLOCKED'), true)
assert.equal(productBlock.includes('RR-001') && productBlock.includes('OPEN'), true)
assert.equal(productBlock.includes('RR-003') && productBlock.includes('PARTIALLY_MITIGATED'), true)

for (const token of ['selectedCode:', 'releasedCode:', 'finalConclusion:', 'downstream:']) {
  assert.equal(merged.includes(token), false, `Forbidden downstream token found: ${token}`)
}

for (const token of ['DAL', 'Dalmos', 'Dalmais']) {
  assert.equal(merged.includes(token), false, `Invalid terminology leaked: ${token}`)
}

const axisTags = ['P', 'O', 'A'].flatMap((axis) => [`${axis}-${1}`, `${axis}-${2}`])
const phraseTags = ['Pergunta' + ' por eixo', 'pergunta' + ' por eixo', 'case-specific' + ' question', 'auxiliary' + ' question']
const inventedPattern = new RegExp([...axisTags, ...phraseTags].map((s) => s.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')).join('|'))
assert.equal(inventedPattern.test(merged), false, 'Invented-question pattern detected')

console.log('synthetic-pilot-gap001-pfpm-design-trial-001: OK')
