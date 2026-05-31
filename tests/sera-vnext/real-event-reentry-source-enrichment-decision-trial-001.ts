import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

interface MatrixRow {
  candidate_id: string
  event_name: string
  source_status: string
  source_files_found: string
  escape_point_candidate_status: string
  agent_act_moment_sufficiency: string
  technical_dominant_risk: string
  post_event_risk: string
  agent_migration_risk: string
  recommended_action: string
  notes: string
}

interface TrackerRow {
  event_id: string
  event_name: string
  status: string
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

function readFile(relativePath: string): string {
  return fs.readFileSync(path.resolve(process.cwd(), relativePath), 'utf8')
}

const matrixPath = 'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_D_SOURCE_ENRICHMENT_MATRIX.csv'
const sourceDecisionPath = 'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_D_SOURCE_ENRICHMENT_DECISION_v0.2.0.md'
const expansionDecisionPath = 'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_D_REAL_EVENT_EXPANSION_DECISION_v0.2.0.md'
const readinessPlanPath = 'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_E_READINESS_PLAN_v0.2.0.md'
const trackerPath = 'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_C_REAL_EVENT_REENTRY_TRACKER.csv'

const matrixRows = parseCsvRows<MatrixRow>(readFile(matrixPath))
const sourceDecision = readFile(sourceDecisionPath)
const expansionDecision = readFile(expansionDecisionPath)
const readinessPlan = readFile(readinessPlanPath)
const trackerRows = parseCsvRows<TrackerRow>(readFile(trackerPath))

// 1) Mandatory candidates are present in the matrix.
const matrixEvents = matrixRows.map((row) => row.event_name)
for (const expected of ['USAir 427', 'American 965 Cali', 'Delta 191']) {
  assert.ok(matrixEvents.includes(expected), `Missing mandatory candidate in enrichment matrix: ${expected}`)
}

// 2) USAir 427 stays HOLD or explicit READY rationale exists.
const usair = matrixRows.find((row) => row.event_name === 'USAir 427')
assert.ok(usair, 'USAir 427 row must exist in enrichment matrix.')
if (usair?.recommended_action === 'READY_FOR_A4R193_E_REENTRY') {
  assert.ok(
    sourceDecision.includes('USAir 427') && sourceDecision.includes('exit HOLD'),
    'If USAir exits HOLD, source decision must contain explicit rationale.',
  )
} else {
  assert.equal(usair?.recommended_action, 'HOLD_TECHNICAL_DOMINANT')
}

// 3) No synthetic creation and product path remains blocked.
assert.ok(
  sourceDecision.includes('no synthetic event is created') || readinessPlan.includes('no synthetic event generation'),
  'Synthetic creation must remain blocked in A4R193-D.',
)
assert.ok(
  sourceDecision.includes('NOT_READY_FOR_PRODUCT') && readinessPlan.includes('NOT_READY_FOR_PRODUCT'),
  'Product/UI/API must remain blocked.',
)

// 4) A4R193-C consolidated tracker remains coherent.
assert.equal(trackerRows.length, 5, 'A4R193-C consolidated tracker must remain with five events.')
const readyCount = trackerRows.filter((row) => row.status === 'READY_FOR_CANDIDATE_ONLY_TRIAL').length
const holdCount = trackerRows.filter((row) => row.status === 'SOURCE_INSUFFICIENT_FOR_REENTRY').length
assert.equal(readyCount, 4, 'A4R193-C consolidated tracker READY count must remain 4.')
assert.equal(holdCount, 1, 'A4R193-C consolidated tracker HOLD count must remain 1.')

// 5) Forbidden final/output fields are absent from A4R193-D artifacts.
const forbiddenPatterns = ['selectedCode', 'releasedCode', 'finalConclusion', 'downstream', 'CLASSIFIED']
const docsToCheck = [sourceDecision, expansionDecision, readinessPlan]
for (const pattern of forbiddenPatterns) {
  for (const text of docsToCheck) {
    assert.equal(text.includes(pattern), false, `Forbidden field marker found in A4R193-D artifacts: ${pattern}`)
  }
}

// 6) READY candidates for A4R193-E are not already re-entered in A4R193-C tracker.
const readyCandidates = matrixRows.filter((row) => row.recommended_action === 'READY_FOR_A4R193_E_REENTRY')
const trackerEventNames = trackerRows.map((row) => row.event_name)
for (const candidate of readyCandidates) {
  assert.equal(
    trackerEventNames.includes(candidate.event_name),
    false,
    `${candidate.event_name} is marked READY_FOR_A4R193_E_REENTRY but already exists in A4R193-C consolidated tracker.`,
  )
}

console.log('real-event-reentry-source-enrichment-decision-trial-001: OK')
