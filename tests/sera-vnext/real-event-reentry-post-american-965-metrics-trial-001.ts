import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

function readFile(relativePath: string): string {
  return fs.readFileSync(path.resolve(process.cwd(), relativePath), 'utf8')
}

function parseCsv(relativePath: string): Array<Record<string, string>> {
  const text = readFile(relativePath).trim()
  const lines = text.split('\n')
  const headers = lines[0].split(',')
  return lines.slice(1).map((line) => {
    const cols = line.split(',')
    const out: Record<string, string> = {}
    headers.forEach((h, i) => {
      out[h] = cols[i] ?? ''
    })
    return out
  })
}

const metricsPath = 'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_I_POST_AMERICAN_965_CONSOLIDATED_METRICS_v0.2.0.md'
const trackerPath = 'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_I_POST_AMERICAN_965_TRACKER.csv'
const decisionPath = 'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_I_NEXT_ENRICHMENT_DECISION_v0.2.0.md'
const syntheticPath = 'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_I_SYNTHETIC_GAP_PREPLAN_UPDATE_v0.2.0.md'
const logPath = 'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_I_LOG_v0.2.0.md'
const readinessPath = 'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_J_READINESS_PLAN_v0.2.0.md'

for (const p of [metricsPath, trackerPath, decisionPath, syntheticPath, logPath, readinessPath]) {
  assert.equal(fs.existsSync(path.resolve(process.cwd(), p)), true, `Required artifact missing: ${p}`)
}

const rows = parseCsv(trackerPath)
assert.equal(rows.length >= 17, true, 'Post-American 965 tracker must include at least 17 rows.')

const readyRows = rows.filter((r) => r.reentry_status === 'READY_FOR_CANDIDATE_ONLY_TRIAL')
assert.equal(readyRows.length, 7, 'Ready candidate-only total must be 7.')

const american = rows.find((r) => r.case_id === 'REAL-EVENT-AMERICAN-965-CALI-1995-REENTRY-001')
assert.ok(american, 'American 965 operational row must exist.')
assert.equal(american?.reentry_status, 'READY_FOR_CANDIDATE_ONLY_TRIAL')
assert.equal(american?.ready_candidate_only, 'YES')

const delta = rows.find((r) => r.event_name === 'Delta 191')
assert.ok(delta, 'Delta 191 row must exist.')
assert.equal(delta?.reentry_status, 'HOLD_ENVIRONMENT_DOMINANT')

const colgan = rows.find((r) => r.event_name === 'Colgan 3407 BUF')
assert.ok(colgan, 'Colgan 3407 row must exist.')
assert.equal(colgan?.reentry_status, 'HOLD_AGENT_MIGRATION_RISK')

const usair = rows.find((r) => r.event_name === 'USAir 427 PIT 1994')
const fiveNbqj = rows.find((r) => r.case_id === 'REAL-EVENT-0006')
assert.ok(usair, 'USAir 427 row must exist.')
assert.ok(fiveNbqj, '5N-BQJ row must exist.')
assert.equal(usair?.next_lane, 'HOLD_TECHNICAL_DOMINANT')
assert.equal(fiveNbqj?.next_lane, 'HOLD_TECHNICAL_DOMINANT')

for (const row of rows) {
  assert.equal(row.rr001_relevant, 'OPEN', `${row.case_id}: RR-001 must remain OPEN`)
  assert.equal(row.rr003_relevant, 'PARTIALLY_MITIGATED', `${row.case_id}: RR-003 must remain PARTIALLY_MITIGATED`)
}

const metrics = readFile(metricsPath)
const decision = readFile(decisionPath)
const synthetic = readFile(syntheticPath)
const log = readFile(logPath)
const readiness = readFile(readinessPath)

assert.equal(metrics.includes('total consolidated records post-American 965: `17`'), true)
assert.equal(metrics.includes('ready for candidate-only trial: `7`'), true)
assert.equal(metrics.includes('hold or source-enrichment population: `10`'), true)

assert.equal(decision.includes('Delta 191: HOLD_ENVIRONMENT_DOMINANT.'), true)
assert.equal(decision.includes('Colgan 3407: HOLD_AGENT_MIGRATION_RISK.'), true)
assert.equal(decision.includes('No synthetic event creation in A4R193-I.'), true)
assert.equal(decision.includes('No product UI API opening.'), true)

assert.equal(synthetic.includes('NO_SYNTHETIC_CREATION_IN_A4R193_I'), true)
assert.equal(readiness.includes('No product UI API opening.'), true)
assert.equal(readiness.includes('No synthetic event creation in A4R193-J'), true)
assert.equal(log.includes('Preserved synthetic lock and product UI API lock.'), true)

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

for (const text of [metrics, decision, synthetic, log, readiness]) {
  for (const marker of forbiddenOutputMarkers) {
    assert.equal(text.includes(marker), false, `Forbidden output marker in A4R193-I docs: ${marker}`)
  }
}

const invalidDaumasTerms = ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais']
for (const text of [metrics, decision, synthetic, log, readiness]) {
  for (const token of invalidDaumasTerms) {
    assert.equal(text.includes(token), false, `Invalid Daumas terminology in A4R193-I docs: ${token}`)
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
for (const text of [metrics, decision, synthetic, log, readiness]) {
  for (const pattern of inventedQuestionPatterns) {
    assert.equal(text.includes(pattern), false, `Invented-question pattern in A4R193-I docs: ${pattern}`)
  }
}

console.log('real-event-reentry-post-american-965-metrics-trial-001: OK')
