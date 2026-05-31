import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

function readFile(relativePath: string): string {
  return fs.readFileSync(path.resolve(process.cwd(), relativePath), 'utf8')
}

function parseCsvRows<T extends Record<string, string>>(csv: string): T[] {
  const lines = csv.trim().split('\n')
  const header = lines[0].split(',')
  return lines.slice(1).map((line) => {
    const values = line.split(',')
    const row: Record<string, string> = {}
    for (let index = 0; index < header.length; index += 1) {
      row[header[index]] = values[index] ?? ''
    }
    return row as T
  })
}

interface MatrixRow {
  case_id: string
  event_name: string
  source_quality: string
  current_status: string
  enrichment_decision: string
  agent_act_moment_readiness: string
  main_gap: string
  rr001_relevant: string
  rr003_relevant: string
  next_lane: string
  notes: string
}

const base = 'docs/sera-vnext/real-event-reentry-a4r193'
const batchDocPath = `${base}/SERA_A4R193_J_SOURCE_ENRICHMENT_BATCH2_v0.2.0.md`
const matrixPath = `${base}/SERA_A4R193_J_SOURCE_ENRICHMENT_BATCH2_MATRIX.csv`
const thebaudPath = `${base}/SERA_A4R193_J_THEBAUD_ENRICHMENT_DECISION_v0.2.0.md`
const peasmarshPath = `${base}/SERA_A4R193_J_PEASMARSH_ENRICHMENT_DECISION_v0.2.0.md`
const logPath = `${base}/SERA_A4R193_J_LOG_v0.2.0.md`
const readinessPath = `${base}/SERA_A4R193_K_READINESS_PLAN_v0.2.0.md`
const vigoPath = `${base}/SERA_A4R193_J_VIGO_ENRICHMENT_DECISION_v0.2.0.md`

for (const required of [batchDocPath, matrixPath, thebaudPath, peasmarshPath, logPath, readinessPath]) {
  assert.equal(fs.existsSync(path.resolve(process.cwd(), required)), true, `Missing required artifact: ${required}`)
}

const batchDoc = readFile(batchDocPath)
const matrixRows = parseCsvRows<MatrixRow>(readFile(matrixPath))
const thebaud = readFile(thebaudPath)
const peasmarsh = readFile(peasmarshPath)
const logDoc = readFile(logPath)
const readiness = readFile(readinessPath)

const byEvent = (eventName: string): MatrixRow | undefined => matrixRows.find((row) => row.event_name === eventName)

for (const expected of ['Thebaud legacy', 'Peasmarsh legacy', 'Vigo legacy']) {
  assert.equal(matrixRows.some((row) => row.event_name === expected), true, `Missing event in matrix: ${expected}`)
}

assert.equal(thebaud.includes('SOURCE_EXTRACTION_REQUIRED'), true, 'Thebaud must have explicit decision')
assert.equal(peasmarsh.includes('HOLD_SOURCE_INSUFFICIENT'), true, 'Peasmarsh must have explicit decision')

const hasVigoDoc = fs.existsSync(path.resolve(process.cwd(), vigoPath))
if (hasVigoDoc) {
  const vigo = readFile(vigoPath)
  assert.equal(
    vigo.includes('READY_FOR_FUTURE_REENTRY_REVIEW') ||
      vigo.includes('SOURCE_EXTRACTION_REQUIRED') ||
      vigo.includes('HOLD_SOURCE_INSUFFICIENT') ||
      vigo.includes('HOLD_AGENT_MIGRATION_RISK') ||
      vigo.includes('HOLD_TECHNICAL_OR_CONDITION_DOMINANT'),
    true,
    'Vigo decision must be explicit when individual doc exists',
  )
} else {
  const vigoRow = byEvent('Vigo legacy')
  assert.ok(vigoRow, 'Vigo row must exist in matrix when no individual doc is created')
  assert.equal(vigoRow?.next_lane, 'SOURCE_ENRICHMENT_BACKLOG', 'Vigo must remain immediate backlog when no decision doc exists')
}

const deltaRow = byEvent('Delta 191')
assert.ok(deltaRow, 'Delta 191 row must exist')
assert.equal(deltaRow?.enrichment_decision, 'HOLD_TECHNICAL_OR_CONDITION_DOMINANT')

const colganRow = byEvent('Colgan 3407 BUF')
assert.ok(colganRow, 'Colgan 3407 row must exist')
assert.equal(colganRow?.enrichment_decision, 'HOLD_AGENT_MIGRATION_RISK')

const usairRow = byEvent('USAir 427 PIT 1994')
const fiveNbqjRow = byEvent('5N-BQJ legacy')
assert.ok(usairRow, 'USAir 427 row must exist')
assert.ok(fiveNbqjRow, '5N-BQJ row must exist')
assert.equal(usairRow?.enrichment_decision, 'HOLD_TECHNICAL_OR_CONDITION_DOMINANT')
assert.equal(fiveNbqjRow?.enrichment_decision, 'HOLD_TECHNICAL_OR_CONDITION_DOMINANT')

for (const historicEvent of ['N109W release pilot legacy', 'N11NM release pilot legacy']) {
  const row = byEvent(historicEvent)
  assert.ok(row, `Missing historical row: ${historicEvent}`)
  assert.equal(row?.current_status, 'HOLD_SUPERSEDED', `${historicEvent} must remain superseded/quarantined historical`)
}

for (const row of matrixRows) {
  assert.equal(row.rr001_relevant, 'OPEN', `${row.event_name}: RR-001 must stay OPEN`)
  assert.equal(row.rr003_relevant, 'PARTIALLY_MITIGATED', `${row.event_name}: RR-003 must stay PARTIALLY_MITIGATED`)
}

assert.equal(batchDoc.includes('Proibido reentry automatico nesta fase.'), true)
assert.equal(batchDoc.includes('Sinteticos continuam bloqueados.'), true)
assert.equal(batchDoc.includes('Produto/UI/API continuam bloqueados.'), true)
assert.equal(batchDoc.includes('Daumas lane preservada'), true)
assert.equal(batchDoc.includes('Prior real-event lane preservada'), true)

const forbiddenOutputMarkers = [
  'selectedCode:',
  'releasedCode:',
  'finalConclusion:',
  'CLASSIFIED',
  'HFACS',
  'Risk/ERC',
  'ARMS/ERC',
  'recommendations',
]
for (const marker of forbiddenOutputMarkers) {
  for (const text of [batchDoc, thebaud, peasmarsh, logDoc, readiness]) {
    assert.equal(text.includes(marker), false, `Forbidden output marker found: ${marker}`)
  }
}

const invalidDaumasTerms = ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais']
for (const token of invalidDaumasTerms) {
  for (const text of [batchDoc, thebaud, peasmarsh, logDoc, readiness]) {
    assert.equal(text.includes(token), false, `Invalid Daumas terminology found: ${token}`)
  }
}

const inventedQuestionPatterns = [
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
for (const pattern of inventedQuestionPatterns) {
  for (const text of [batchDoc, thebaud, peasmarsh, logDoc, readiness]) {
    assert.equal(text.includes(pattern), false, `Invented-question pattern found: ${pattern}`)
  }
}

console.log('real-event-source-enrichment-batch2-trial-001: OK')
