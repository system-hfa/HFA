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
  source_files_found: string
  source_quality: string
  current_status: string
  enrichment_decision: string
  agent_boundary_status: string
  escape_point_candidate_status: string
  temporal_anchor_status: string
  rr001_status: string
  rr003_status: string
  next_reentry_status: string
  recommended_next_action: string
  notes: string
}

const base = 'docs/sera-vnext/real-event-reentry-a4r193'
const mainDocPath = `${base}/SERA_A4R193_G_SOURCE_ENRICHMENT_BATCH_v0.2.0.md`
const matrixPath = `${base}/SERA_A4R193_G_SOURCE_ENRICHMENT_MATRIX.csv`
const americanPath = `${base}/SERA_A4R193_G_AMERICAN_965_ENRICHMENT_DECISION_v0.2.0.md`
const deltaPath = `${base}/SERA_A4R193_G_DELTA_191_ENRICHMENT_DECISION_v0.2.0.md`
const colganPath = `${base}/SERA_A4R193_G_COLGAN_3407_ENRICHMENT_DECISION_v0.2.0.md`
const logPath = `${base}/SERA_A4R193_G_LOG_v0.2.0.md`
const readinessPath = `${base}/SERA_A4R193_H_READINESS_PLAN_v0.2.0.md`

for (const required of [mainDocPath, matrixPath, americanPath, deltaPath, colganPath, logPath, readinessPath]) {
  assert.equal(fs.existsSync(path.resolve(process.cwd(), required)), true, `Missing required artifact: ${required}`)
}

const mainDoc = readFile(mainDocPath)
const matrixRows = parseCsvRows<MatrixRow>(readFile(matrixPath))
const american = readFile(americanPath)
const delta = readFile(deltaPath)
const colgan = readFile(colganPath)
const readiness = readFile(readinessPath)

// mandatory events
for (const expected of ['American 965 Cali', 'Delta 191', 'Colgan 3407 BUF']) {
  assert.equal(matrixRows.some((row) => row.event_name === expected), true, `Missing event in matrix: ${expected}`)
}

// explicit decisions by event
assert.equal(american.includes('READY_FOR_A4R193_H_REENTRY'), true, 'American 965 must have explicit decision')
assert.equal(delta.includes('HOLD_ENVIRONMENT_DOMINANT') || delta.includes('SOURCE_ENRICHMENT_REQUIRED'), true, 'Delta 191 must have explicit decision')
assert.equal(colgan.includes('HOLD_AGENT_MIGRATION_RISK') || colgan.includes('READY_FOR_CONTROLLED_REENTRY') || colgan.includes('SOURCE_ENRICHMENT_REQUIRED'), true, 'Colgan 3407 must have explicit decision')

// at least one event prioritized for possible reentry
const readyCount = matrixRows.filter((row) => row.next_reentry_status.includes('READY')).length
assert.equal(readyCount >= 1, true, 'At least one event must remain prioritized for future reentry unless all sources are insufficient')

// delta cannot be forced as human-error if environment/technical dominant
const deltaRow = matrixRows.find((row) => row.event_name === 'Delta 191')
assert.ok(deltaRow, 'Delta row must exist')
if (deltaRow) {
  const deltaGuardOk =
    deltaRow.next_reentry_status === 'HOLD_ENVIRONMENT_DOMINANT' ||
    deltaRow.next_reentry_status === 'SOURCE_ENRICHMENT_REQUIRED' ||
    delta.includes('dominancia ambiental') ||
    delta.includes('dominancia ambiental/tecnica')
  assert.equal(deltaGuardOk, true, 'Delta 191 cannot be forced as human-error in this batch')
}

// colgan cannot leave HOLD without explicit boundary evidence
const colganRow = matrixRows.find((row) => row.event_name === 'Colgan 3407 BUF')
assert.ok(colganRow, 'Colgan row must exist')
if (colganRow && colganRow.next_reentry_status === 'READY_FOR_CONTROLLED_REENTRY') {
  assert.equal(
    colgan.includes('boundary PF/PM/crew-agent') || colgan.includes('PF/PM/crew-agent boundary'),
    true,
    'Colgan cannot leave HOLD without explicit PF/PM/crew-agent boundary evidence',
  )
} else {
  assert.equal(colganRow?.next_reentry_status === 'HOLD_AGENT_MIGRATION_RISK' || colganRow?.next_reentry_status === 'SOURCE_ENRICHMENT_REQUIRED', true)
}

// lock continuity
for (const doc of [mainDoc, readiness]) {
  assert.equal(doc.includes('sintetico') || doc.includes('Sinteticos'), true, 'Synthetic lock must be explicit')
}
assert.equal(mainDoc.includes('Produto/UI/API continuam bloqueados.') || mainDoc.includes('produto/UI/API continuam bloqueados'), true)
assert.equal(mainDoc.includes('Daumas permanece lane metodologica/documental.'), true)
assert.equal(mainDoc.includes('Prior real-event work permanece lane paralela de enrichment/hold.'), true)

for (const row of matrixRows) {
  assert.equal(row.rr001_status, 'OPEN', `${row.event_name}: RR-001 must stay OPEN`)
  assert.equal(row.rr003_status, 'PARTIALLY_MITIGATED', `${row.event_name}: RR-003 must stay PARTIALLY_MITIGATED`)
}

const forbiddenPatterns = ['selectedCode:', 'releasedCode:', 'finalConclusion:', 'CLASSIFIED', 'HFACS', 'Risk/ERC', 'ARMS/ERC']
for (const pattern of forbiddenPatterns) {
  for (const text of [mainDoc, american, delta, colgan, readiness]) {
    assert.equal(text.includes(pattern), false, `Forbidden output marker found: ${pattern}`)
  }
}

console.log('real-event-source-enrichment-batch-trial-001: OK')
