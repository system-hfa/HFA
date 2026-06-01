import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const base = path.resolve('docs/sera-vnext/real-event-reentry-a4r193')
const matrixPath = path.join(base, 'SERA_A4R193_K_SOURCE_RECOVERY_MATRIX.csv')
const mainDocPath = path.join(base, 'SERA_A4R193_K_SOURCE_RECOVERY_CONTINUATION_v0.2.0.md')
const thebaudDocPath = path.join(base, 'SERA_A4R193_K_THEBAUD_SOURCE_RECOVERY_DECISION_v0.2.0.md')
const peasmarshDocPath = path.join(base, 'SERA_A4R193_K_PEASMARSH_SOURCE_RECOVERY_DECISION_v0.2.0.md')
const vigoDocPath = path.join(base, 'SERA_A4R193_K_VIGO_SOURCE_RECOVERY_DECISION_v0.2.0.md')
const logPath = path.join(base, 'SERA_A4R193_K_LOG_v0.2.0.md')

for (const p of [matrixPath, mainDocPath, thebaudDocPath, peasmarshDocPath, logPath]) {
  assert.equal(fs.existsSync(p), true, `required artifact missing: ${p}`)
}

const matrixRaw = fs.readFileSync(matrixPath, 'utf8').trim()
const lines = matrixRaw.split(/\r?\n/)
assert.ok(lines.length >= 2, 'matrix must contain header and rows')

const header = lines[0].split(',')
const rows = lines.slice(1).map((line) => {
  const cols = line.split(',')
  const row: Record<string, string> = {}
  for (let i = 0; i < header.length; i += 1) row[header[i]] = cols[i] ?? ''
  return row
})

const byEvent = (eventName: string) => rows.find((row) => row.event_name === eventName)
const byCase = (caseId: string) => rows.find((row) => row.case_id === caseId)

for (const eventName of ['Thebaud legacy', 'Peasmarsh legacy', 'Vigo legacy']) {
  assert.ok(byEvent(eventName), `missing matrix row for ${eventName}`)
  assert.ok(byEvent(eventName)?.new_status, `${eventName} must have explicit new_status`)
}

assert.equal(byEvent('Thebaud legacy')?.new_status, 'READY_FOR_FUTURE_REENTRY_REVIEW')
assert.equal(byEvent('Thebaud legacy')?.ready_for_future_reentry_review, 'YES')
assert.equal(byEvent('Thebaud legacy')?.next_lane, 'FUTURE_REENTRY_REVIEW_QUEUE')

assert.equal(byEvent('Peasmarsh legacy')?.new_status, 'SOURCE_EXTRACTION_REQUIRED')
assert.equal(byEvent('Peasmarsh legacy')?.ready_for_future_reentry_review, 'NO')

assert.equal(byEvent('Vigo legacy')?.new_status, 'HOLD_SOURCE_INSUFFICIENT')
assert.equal(byEvent('Vigo legacy')?.next_lane, 'SOURCE_ENRICHMENT_BACKLOG')
assert.equal(fs.existsSync(vigoDocPath), false, 'Vigo individual decision doc should not exist in K when still insufficient')

assert.equal(byEvent('Delta 191')?.new_status, 'HOLD_TECHNICAL_OR_CONDITION_DOMINANT')
assert.equal(byEvent('Colgan 3407 BUF')?.new_status, 'HOLD_AGENT_MIGRATION_RISK')
assert.equal(byEvent('USAir 427 PIT 1994')?.new_status, 'HOLD_TECHNICAL_OR_CONDITION_DOMINANT')
assert.equal(byEvent('5N-BQJ legacy')?.new_status, 'HOLD_TECHNICAL_OR_CONDITION_DOMINANT')
assert.equal(byEvent('N109W release pilot legacy')?.new_status, 'HOLD_SOURCE_INSUFFICIENT')
assert.equal(byEvent('N11NM release pilot legacy')?.new_status, 'HOLD_SOURCE_INSUFFICIENT')

const docsToCheck = [
  fs.readFileSync(mainDocPath, 'utf8'),
  fs.readFileSync(thebaudDocPath, 'utf8'),
  fs.readFileSync(peasmarshDocPath, 'utf8'),
  fs.readFileSync(logPath, 'utf8'),
]

for (const content of docsToCheck) {
  assert.equal(/selectedCode\s*:/.test(content), false, 'selectedCode must not appear')
  assert.equal(/releasedCode\s*:/.test(content), false, 'releasedCode must not appear')
  assert.equal(/finalConclusion\s*:/.test(content), false, 'finalConclusion must not appear')
  assert.equal(/downstream\s*:/.test(content), false, 'downstream field must not appear')
  assert.equal(/\bCLASSIFIED\b/.test(content), false, 'CLASSIFIED must not appear')
}

const mainDoc = docsToCheck[0]
assert.equal(/NO_REENTRY_EXECUTION/.test(mainDoc), true, 'main doc must assert no reentry execution')
assert.equal(/Nenhum evento foi reentered nesta fase\./.test(mainDoc), true, 'must explicitly state no reentry')
assert.equal(/Sinteticos permanecem bloqueados\./.test(mainDoc), true, 'synthetics must remain blocked')
assert.equal(/Produto\/UI\/API permanecem bloqueados\./.test(mainDoc), true, 'product UI API must remain blocked')
assert.equal(/RR-001:\s*`OPEN`\./.test(mainDoc), true, 'RR-001 must be OPEN')
assert.equal(/RR-003:\s*`PARTIALLY_MITIGATED`\./.test(mainDoc), true, 'RR-003 must be PARTIALLY_MITIGATED')

const allDocs = docsToCheck.join('\n')
const invalidDaumasPattern = new RegExp(`\\\\bD${'AL'}\\\\b|Dal${'mos'}|Dal${'mais'}`)
assert.equal(invalidDaumasPattern.test(allDocs), false, 'invalid Daumas aliases must not appear')
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
assert.equal(inventedQuestionPattern.test(allDocs), false, 'invented-question pattern must not appear')

assert.ok(byCase('REAL-EVENT-0001'), 'Thebaud case_id must exist')
assert.ok(byCase('REAL-EVENT-0002'), 'Peasmarsh case_id must exist')
assert.ok(byCase('REAL-EVENT-0004'), 'Vigo case_id must exist')

console.log('A4R193-K source recovery continuation trial passed')
