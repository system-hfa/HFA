import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

interface TrackerRow {
  event_id: string
  event_name: string
  status: string
  agent_kind: string
  point_topology: string
  axis_p_metadata: string
  axis_o_metadata: string
  axis_a_metadata: string
  source_status: string
  agent_migration_risk: string
  post_event_risk: string
  consequence_basis_risk: string
  technical_dominant_risk: string
  ready_for_synthetic_gap_analysis: string
  selected_code_field_present: string
  released_code_field_present: string
  final_conclusion_field_present: string
  downstream_field_present: string
  synthetic_created: string
  product_ui_api_touched: string
  notes: string
}

function parseCsv(csvText: string): TrackerRow[] {
  const lines = csvText.trim().split('\n')
  const header = lines[0].split(',')
  return lines.slice(1).map((line) => {
    const values = line.split(',')
    const row: Record<string, string> = {}
    for (let i = 0; i < header.length; i += 1) {
      row[header[i]] = values[i] ?? ''
    }
    return row as unknown as TrackerRow
  })
}

function asBool(raw: string): boolean {
  return raw.trim().toLowerCase() === 'true'
}

const trackerPath = path.resolve(
  process.cwd(),
  'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_C_REAL_EVENT_REENTRY_TRACKER.csv',
)
const trackerRaw = fs.readFileSync(trackerPath, 'utf8')
const rows = parseCsv(trackerRaw)

// 1) The five consolidated events must be present.
assert.equal(rows.length, 5, 'Tracker must contain exactly five consolidated events.')
const ids = rows.map((row) => row.event_id)
for (const required of [
  'REAL-EVENT-COPTERLINE-S76-EST-2005-PILOT-001',
  'REAL-EVENT-ASIANA214-SFO2013-REENTRY-001',
  'REAL-EVENT-COMAIR-5191-LEX-2006-REENTRY-001',
  'REAL-EVENT-UNITED-173-PDX-1978-REENTRY-001',
  'REAL-EVENT-USAIR-427-PIT-1994-REENTRY-001',
]) {
  assert.ok(ids.includes(required), `Missing consolidated event in tracker: ${required}`)
}

// 2) READY and HOLD counts.
const readyCount = rows.filter((row) => row.status === 'READY_FOR_CANDIDATE_ONLY_TRIAL').length
const holdCount = rows.filter((row) => row.status === 'SOURCE_INSUFFICIENT_FOR_REENTRY').length
assert.equal(readyCount, 4, 'READY count must be 4 (Copterline + Asiana + Comair + United).')
assert.equal(holdCount, 1, 'HOLD/source-insufficient count must be 1 (USAir 427).')

// 3) Topology distribution: at least 1 discrete, 3 progressive, 1 diffuse/HOLD.
const discreteCount = rows.filter((row) => row.point_topology === 'discrete').length
const progressiveCount = rows.filter((row) => row.point_topology === 'progressive').length
const diffuseCount = rows.filter((row) => row.point_topology === 'diffuse').length
assert.ok(discreteCount >= 1, 'Must have at least one discrete event.')
assert.ok(progressiveCount >= 3, 'Must have at least three progressive events.')
assert.ok(diffuseCount >= 1, 'Must have at least one diffuse/HOLD event.')

// 4) USAir must be technical-dominant HOLD.
const usair = rows.find((row) => row.event_id === 'REAL-EVENT-USAIR-427-PIT-1994-REENTRY-001')
assert.ok(usair, 'USAir 427 row must exist.')
assert.equal(usair?.status, 'SOURCE_INSUFFICIENT_FOR_REENTRY')
assert.equal(asBool(usair?.technical_dominant_risk ?? 'false'), true)

// 5) No selected/released/final/downstream fields are present.
for (const row of rows) {
  assert.equal(asBool(row.selected_code_field_present), false, `${row.event_id}: selected_code_field_present must be false.`)
  assert.equal(asBool(row.released_code_field_present), false, `${row.event_id}: released_code_field_present must be false.`)
  assert.equal(
    asBool(row.final_conclusion_field_present),
    false,
    `${row.event_id}: final_conclusion_field_present must be false.`,
  )
  assert.equal(asBool(row.downstream_field_present), false, `${row.event_id}: downstream_field_present must be false.`)
}

// 6) Synthetic events still not created.
for (const row of rows) {
  assert.equal(asBool(row.synthetic_created), false, `${row.event_id}: synthetic_created must remain false.`)
}

// 7) Product/UI/API not touched in this consolidated package.
for (const row of rows) {
  assert.equal(asBool(row.product_ui_api_touched), false, `${row.event_id}: product_ui_api_touched must remain false.`)
}

// 8) O-E appears only as non-existent metadata if it appears.
const rowsWithOE = rows.filter((row) => row.axis_o_metadata.includes('O-E'))
assert.equal(rowsWithOE.length, 1, 'Only one event should carry O-E metadata marker.')
assert.equal(rowsWithOE[0].event_id, 'REAL-EVENT-COMAIR-5191-LEX-2006-REENTRY-001')

console.log('real-event-reentry-consolidated-metrics-trial-001: OK')
