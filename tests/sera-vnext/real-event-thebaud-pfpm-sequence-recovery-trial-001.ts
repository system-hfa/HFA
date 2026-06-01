import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const base = path.resolve('docs/sera-vnext/real-event-reentry-a4r193')

const mainDoc = path.join(base, 'SERA_A4R193_M_THEBAUD_PFPM_SEQUENCE_SOURCE_RECOVERY_v0.2.0.md')
const matrixDoc = path.join(base, 'SERA_A4R193_M_THEBAUD_SOURCE_RECOVERY_MATRIX.csv')
const decisionDoc = path.join(base, 'SERA_A4R193_M_THEBAUD_RETRY_DECISION_v0.2.0.md')
const secondaryDoc = path.join(base, 'SERA_A4R193_M_PEASMARSH_VIGO_SECONDARY_STATUS_v0.2.0.md')
const logDoc = path.join(base, 'SERA_A4R193_M_LOG_v0.2.0.md')
const readinessDoc = path.join(base, 'SERA_A4R193_N_READINESS_PLAN_v0.2.0.md')

for (const p of [mainDoc, matrixDoc, decisionDoc, secondaryDoc, logDoc, readinessDoc]) {
  assert.equal(fs.existsSync(p), true, `required artifact missing: ${p}`)
}

const forbiddenReentryInM = path.join(base, 'REAL_EVENT_REENTRY_THEBAUD_A4R193_M_v0.2.0.md')
assert.equal(fs.existsSync(forbiddenReentryInM), false, 'M phase must not create Thebaud reentry file')

const main = fs.readFileSync(mainDoc, 'utf8')
const matrix = fs.readFileSync(matrixDoc, 'utf8')
const decision = fs.readFileSync(decisionDoc, 'utf8')
const secondary = fs.readFileSync(secondaryDoc, 'utf8')
const log = fs.readFileSync(logDoc, 'utf8')
const readiness = fs.readFileSync(readinessDoc, 'utf8')
const all = [main, matrix, decision, secondary, log, readiness].join('\n')

const allowed = [
  'THEBAUD_READY_FOR_REENTRY_RETRY',
  'THEBAUD_REMAINS_HOLD_AGENT_ACT_MOMENT',
  'THEBAUD_SOURCE_EXTRACTION_REQUIRED',
]
assert.equal(allowed.some((s) => decision.includes(s)), true, 'decision must contain an allowed status')

for (const token of ['selectedCode:', 'releasedCode:', 'finalConclusion:', 'downstream:']) {
  assert.equal(all.includes(token), false, `${token} field must not appear`)
}
assert.equal(/\bCLASSIFIED\b/.test(all), false, 'CLASSIFIED must not appear')

assert.equal(all.includes('Sinteticos bloqueados'), true, 'synthetics blocked statement must exist')
assert.equal(all.includes('Produto/UI/API bloqueados'), true, 'product/UI/API blocked statement must exist')
assert.equal(all.includes('RR-001: `OPEN`'), true, 'RR-001 must be OPEN')
assert.equal(all.includes('RR-003: `PARTIALLY_MITIGATED`'), true, 'RR-003 must be PARTIALLY_MITIGATED')

assert.equal(secondary.includes('Peasmarsh continua: `SOURCE_EXTRACTION_REQUIRED`'), true)
assert.equal(secondary.includes('Vigo continua: `HOLD_SOURCE_INSUFFICIENT`'), true)
assert.equal(secondary.includes('Sem reentry de Peasmarsh.'), true)
assert.equal(secondary.includes('Sem reentry de Vigo.'), true)

if (/daumas/i.test(all)) {
  assert.equal(/\bDaumas\b/.test(all), true, 'If present, Daumas must be spelled as Daumas')
}
const dalTokens = ['DA' + 'L', 'Dal' + 'mos', 'Dal' + 'mais']
assert.equal(dalTokens.some((t) => all.includes(t)), false, 'Invalid DAL terms must not appear as entities')

const inventedQuestionTokens = [
  'P-' + '1',
  'P-' + '2',
  'O-' + '1',
  'O-' + '2',
  'A-' + '1',
  'A-' + '2',
  'Pergunta por ' + 'eixo',
  'pergunta por ' + 'eixo',
  'case-specific ' + 'question',
  'auxiliary ' + 'question',
]
assert.equal(inventedQuestionTokens.some((t) => all.includes(t)), false, 'Invented question pattern must not appear')

console.log('real-event-thebaud-pfpm-sequence-recovery-trial-001: OK')
