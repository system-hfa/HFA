import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const base = path.resolve('docs/sera-vnext/real-event-reentry-a4r193')

const holdClosurePath = path.join(base, 'SERA_A4R193_O_CONSOLIDATED_HOLD_CLOSURE_v0.2.0.md')
const holdMatrixPath = path.join(base, 'SERA_A4R193_O_HOLD_AND_GAP_MATRIX.csv')
const syntheticDecisionPath = path.join(base, 'SERA_A4R193_O_SYNTHETIC_GAP_DESIGN_DECISION_v0.2.0.md')
const nextDecisionPath = path.join(base, 'SERA_A4R193_O_NEXT_PHASE_DECISION_v0.2.0.md')
const logPath = path.join(base, 'SERA_A4R193_O_LOG_v0.2.0.md')
const readinessPath = path.join(base, 'SERA_A4R193_P_READINESS_PLAN_v0.2.0.md')

const thebaudDecisionPath = path.join(base, 'SERA_A4R193_M_THEBAUD_RETRY_DECISION_v0.2.0.md')
const peasmarshDecisionPath = path.join(base, 'SERA_A4R193_N_PEASMARSH_RETRY_DECISION_v0.2.0.md')
const vigoDecisionPath = path.join(base, 'SERA_A4R193_N_VIGO_RETRY_DECISION_v0.2.0.md')

for (const p of [
  holdClosurePath,
  holdMatrixPath,
  syntheticDecisionPath,
  nextDecisionPath,
  logPath,
  readinessPath,
  thebaudDecisionPath,
  peasmarshDecisionPath,
  vigoDecisionPath,
]) {
  assert.equal(fs.existsSync(p), true, `required artifact missing: ${p}`)
}

const holdClosure = fs.readFileSync(holdClosurePath, 'utf8')
const holdMatrixRaw = fs.readFileSync(holdMatrixPath, 'utf8').trim()
const syntheticDecision = fs.readFileSync(syntheticDecisionPath, 'utf8')
const nextDecision = fs.readFileSync(nextDecisionPath, 'utf8')
const log = fs.readFileSync(logPath, 'utf8')
const readiness = fs.readFileSync(readinessPath, 'utf8')
const thebaudDecision = fs.readFileSync(thebaudDecisionPath, 'utf8')
const peasmarshDecision = fs.readFileSync(peasmarshDecisionPath, 'utf8')
const vigoDecision = fs.readFileSync(vigoDecisionPath, 'utf8')
const all = [
  holdClosure,
  holdMatrixRaw,
  syntheticDecision,
  nextDecision,
  log,
  readiness,
  thebaudDecision,
  peasmarshDecision,
  vigoDecision,
].join('\n')

assert.equal(thebaudDecision.includes('THEBAUD_REMAINS_HOLD_AGENT_ACT_MOMENT'), true)
assert.equal(peasmarshDecision.includes('PEASMARSH_REMAINS_SOURCE_EXTRACTION_REQUIRED'), true)
assert.equal(vigoDecision.includes('VIGO_REMAINS_HOLD_SOURCE_INSUFFICIENT'), true)

const lines = holdMatrixRaw.split(/\r?\n/)
assert.ok(lines.length >= 10, 'hold matrix must include header plus 9 rows')
const header = lines[0].split(',')
const rows = lines.slice(1).map((line) => {
  const cols = line.split(',')
  const row: Record<string, string> = {}
  for (let i = 0; i < header.length; i += 1) row[header[i]] = cols[i] ?? ''
  return row
})
const byCase = (caseId: string) => rows.find((row) => row.case_id === caseId)

assert.equal(byCase('REAL-EVENT-0001')?.current_status, 'HOLD_AGENT_ACT_MOMENT')
assert.equal(byCase('REAL-EVENT-0002')?.current_status, 'SOURCE_EXTRACTION_REQUIRED')
assert.equal(byCase('REAL-EVENT-0004')?.current_status, 'HOLD_SOURCE_INSUFFICIENT')
assert.equal(byCase('A4R193D-CAND-003')?.current_status, 'HOLD_TECHNICAL_OR_CONDITION_DOMINANT')
assert.equal(byCase('A4R193D-CAND-006')?.current_status, 'HOLD_AGENT_MIGRATION_RISK')
assert.equal(byCase('REAL-EVENT-USAIR-427-PIT-1994-REENTRY-001')?.current_status, 'HOLD_TECHNICAL_OR_CONDITION_DOMINANT')
assert.equal(byCase('REAL-EVENT-0006')?.current_status, 'HOLD_TECHNICAL_OR_CONDITION_DOMINANT')
assert.equal(byCase('N109W')?.current_status, 'HOLD_SOURCE_INSUFFICIENT')
assert.equal(byCase('N11NM')?.current_status, 'HOLD_SOURCE_INSUFFICIENT')
assert.equal(byCase('N109W')?.hold_reason.includes('superseded_historical'), true)
assert.equal(byCase('N11NM')?.hold_reason.includes('superseded_historical'), true)

assert.equal(/REAL_EVENT_REENTRY_.*A4R193_O/i.test(all), false, 'O phase must not create new reentry records')
assert.equal(syntheticDecision.includes('NAO_CRIAR_SINTETICOS_EM_O'), true)
assert.equal(syntheticDecision.includes('apenas planejamento'), true)
assert.equal(holdClosure.includes('Produto/UI/API: bloqueado.'), true)
assert.equal(holdClosure.includes('RR-001: `OPEN`.'), true)
assert.equal(holdClosure.includes('RR-003: `PARTIALLY_MITIGATED`.'), true)

for (const token of ['selectedCode:', 'releasedCode:', 'finalConclusion:', 'downstream:']) {
  assert.equal(all.includes(token), false, `${token} field must not appear`)
}
assert.equal(/\bCLASSIFIED\b/.test(all), false, 'CLASSIFIED must not appear')

if (/daumas/i.test(all)) {
  assert.equal(/\bDaumas\b/.test(all), true, 'Daumas must be spelled as Daumas')
}
const invalidDaumasTokens = ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais']
assert.equal(invalidDaumasTokens.some((t) => all.includes(t)), false, 'invalid Daumas aliases must not appear')

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

console.log('real-event-consolidated-hold-closure-trial-001: OK')
