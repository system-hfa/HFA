import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const base = path.resolve('docs/sera-vnext/real-event-reentry-a4r193')

const mainDocPath = path.join(base, 'SERA_A4R193_N_PEASMARSH_VIGO_SOURCE_RECOVERY_v0.2.0.md')
const matrixPath = path.join(base, 'SERA_A4R193_N_PEASMARSH_VIGO_SOURCE_RECOVERY_MATRIX.csv')
const peasmarshDecisionPath = path.join(base, 'SERA_A4R193_N_PEASMARSH_RETRY_DECISION_v0.2.0.md')
const vigoDecisionPath = path.join(base, 'SERA_A4R193_N_VIGO_RETRY_DECISION_v0.2.0.md')
const logPath = path.join(base, 'SERA_A4R193_N_LOG_v0.2.0.md')
const readinessPath = path.join(base, 'SERA_A4R193_O_READINESS_PLAN_v0.2.0.md')
const thebaudDecisionPath = path.join(base, 'SERA_A4R193_M_THEBAUD_RETRY_DECISION_v0.2.0.md')

for (const p of [mainDocPath, matrixPath, peasmarshDecisionPath, vigoDecisionPath, logPath, readinessPath, thebaudDecisionPath]) {
  assert.equal(fs.existsSync(p), true, `required artifact missing: ${p}`)
}

const forbiddenReentryArtifacts = [
  path.join(base, 'REAL_EVENT_REENTRY_PEASMARSH_A4R193_N_v0.2.0.md'),
  path.join(base, 'REAL_EVENT_REENTRY_VIGO_A4R193_N_v0.2.0.md'),
  path.join(base, 'REAL_EVENT_REENTRY_THEBAUD_A4R193_N_v0.2.0.md'),
]
for (const p of forbiddenReentryArtifacts) {
  assert.equal(fs.existsSync(p), false, `N phase must not create reentry artifact: ${p}`)
}

const mainDoc = fs.readFileSync(mainDocPath, 'utf8')
const matrixRaw = fs.readFileSync(matrixPath, 'utf8').trim()
const peasmarshDecision = fs.readFileSync(peasmarshDecisionPath, 'utf8')
const vigoDecision = fs.readFileSync(vigoDecisionPath, 'utf8')
const logDoc = fs.readFileSync(logPath, 'utf8')
const readinessDoc = fs.readFileSync(readinessPath, 'utf8')
const thebaudDecision = fs.readFileSync(thebaudDecisionPath, 'utf8')
const all = [mainDoc, matrixRaw, peasmarshDecision, vigoDecision, logDoc, readinessDoc, thebaudDecision].join('\n')

const allowedPeasmarsh = [
  'PEASMARSH_READY_FOR_FUTURE_REENTRY_REVIEW',
  'PEASMARSH_REMAINS_SOURCE_EXTRACTION_REQUIRED',
  'PEASMARSH_REMAINS_HOLD_SOURCE_INSUFFICIENT',
]
assert.equal(allowedPeasmarsh.some((s) => peasmarshDecision.includes(s)), true, 'Peasmarsh must contain an allowed status')

const allowedVigo = [
  'VIGO_READY_FOR_FUTURE_REENTRY_REVIEW',
  'VIGO_REMAINS_SOURCE_EXTRACTION_REQUIRED',
  'VIGO_REMAINS_HOLD_SOURCE_INSUFFICIENT',
]
assert.equal(allowedVigo.some((s) => vigoDecision.includes(s)), true, 'Vigo must contain an allowed status')

const lines = matrixRaw.split(/\r?\n/)
assert.ok(lines.length > 2, 'matrix must contain header and rows')
const header = lines[0].split(',')
const rows = lines.slice(1).map((line) => {
  const cols = line.split(',')
  const row: Record<string, string> = {}
  for (let i = 0; i < header.length; i += 1) row[header[i]] = cols[i] ?? ''
  return row
})
const byCase = (caseId: string) => rows.filter((row) => row.case_id === caseId)
assert.equal(byCase('REAL-EVENT-0002').length, 12, 'Peasmarsh must contain 12 field rows')
assert.equal(byCase('REAL-EVENT-0004').length, 12, 'Vigo must contain 12 field rows')

for (const token of ['selectedCode:', 'releasedCode:', 'finalConclusion:', 'downstream:']) {
  assert.equal(all.includes(token), false, `${token} field must not appear`)
}
assert.equal(/\bCLASSIFIED\b/.test(all), false, 'CLASSIFIED must not appear')

assert.equal(mainDoc.includes('Sem reentry de Peasmarsh.'), true, 'must explicitly block Peasmarsh reentry')
assert.equal(mainDoc.includes('Sem reentry de Vigo.'), true, 'must explicitly block Vigo reentry')
assert.equal(mainDoc.includes('Thebaud permanece `THEBAUD_REMAINS_HOLD_AGENT_ACT_MOMENT`.'), true, 'Thebaud hold must remain')
assert.equal(thebaudDecision.includes('THEBAUD_REMAINS_HOLD_AGENT_ACT_MOMENT'), true, 'Thebaud decision must remain hold')
assert.equal(mainDoc.includes('Sinteticos permanecem bloqueados.'), true, 'synthetics must remain blocked')
assert.equal(mainDoc.includes('Produto/UI/API permanecem bloqueados.'), true, 'product UI API must remain blocked')
assert.equal(mainDoc.includes('RR-001: `OPEN`.'), true, 'RR-001 must be OPEN')
assert.equal(mainDoc.includes('RR-003: `PARTIALLY_MITIGATED`.'), true, 'RR-003 must be PARTIALLY_MITIGATED')

if (/daumas/i.test(all)) {
  assert.equal(/\bDaumas\b/.test(all), true, 'Daumas must be spelled as Daumas')
}
const invalidDaumasTerms = ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais']
assert.equal(invalidDaumasTerms.some((t) => all.includes(t)), false, 'invalid Daumas terms must not appear')

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
assert.equal(inventedQuestionPattern.test(all), false, 'invented question pattern must not appear')

console.log('real-event-peasmarsh-vigo-source-recovery-trial-001: OK')
