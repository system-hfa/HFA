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

const metricsPath = 'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_F_POST_BATCH3_CONSOLIDATED_METRICS_v0.2.0.md'
const trackerPath = 'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_F_POST_BATCH3_TRACKER.csv'
const enrichmentPath = 'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_F_SOURCE_ENRICHMENT_NEXT_DECISION_v0.2.0.md'
const syntheticPreplanPath = 'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_F_SYNTHETIC_GAP_DESIGN_PREPLAN_v0.2.0.md'
const batch3Path = 'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_E_REAL_EVENT_REENTRY_BATCH3_v0.2.0.md'
const logPath = 'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_F_LOG_v0.2.0.md'

for (const p of [metricsPath, trackerPath, enrichmentPath, syntheticPreplanPath, batch3Path, logPath]) {
  assert.equal(fs.existsSync(path.resolve(process.cwd(), p)), true, `Required artifact missing: ${p}`)
}

const rows = parseCsv(trackerPath)
assert.equal(rows.length >= 16, true, 'Post-Batch3 tracker must include at least 16 rows.')

const requiredReentryCases = new Set([
  'REAL-EVENT-COPTERLINE-S76-EST-2005-PILOT-001',
  'REAL-EVENT-ASIANA214-SFO2013-REENTRY-001',
  'REAL-EVENT-COMAIR-5191-LEX-2006-REENTRY-001',
  'REAL-EVENT-UNITED-173-PDX-1978-REENTRY-001',
  'REAL-EVENT-AMERICAN-1420-LIT-1999-REENTRY-001',
  'REAL-EVENT-UPS-1354-BHM-2013-REENTRY-001',
])

for (const caseId of requiredReentryCases) {
  assert.equal(rows.some((r) => r.case_id === caseId), true, `Missing reentry case in tracker: ${caseId}`)
}

const american = rows.find((r) => r.case_id === 'REAL-EVENT-AMERICAN-1420-LIT-1999-REENTRY-001')
const ups = rows.find((r) => r.case_id === 'REAL-EVENT-UPS-1354-BHM-2013-REENTRY-001')
assert.equal(american?.batch, 'A4R193-E')
assert.equal(ups?.batch, 'A4R193-E')

const holdOrEnrichment = rows.filter((r) =>
  ['SOURCE_ENRICHMENT_REQUIRED', 'SOURCE_INSUFFICIENT_FOR_REENTRY', 'HOLD_TECHNICAL_DOMINANT', 'HOLD_AGENT_MIGRATION_RISK', 'HOLD_SUPERSEDED_OR_QUARANTINED'].includes(r.reentry_status),
)
assert.equal(holdOrEnrichment.length >= 4, true, 'Tracker must include at least four hold/enrichment entries.')

for (const row of rows) {
  assert.equal(row.selectedCode_absent, 'YES', `${row.case_id}: selectedCode_absent must be YES`)
  assert.equal(row.releasedCode_absent, 'YES', `${row.case_id}: releasedCode_absent must be YES`)
  assert.equal(row.downstream_absent, 'YES', `${row.case_id}: downstream_absent must be YES`)
  assert.equal(row.rr001_status, 'OPEN', `${row.case_id}: rr001_status must be OPEN`)
  assert.equal(row.rr003_status, 'PARTIALLY_MITIGATED', `${row.case_id}: rr003_status must be PARTIALLY_MITIGATED`)
}

const metrics = readFile(metricsPath)
const enrichment = readFile(enrichmentPath)
const syntheticPreplan = readFile(syntheticPreplanPath)
const batch3 = readFile(batch3Path)
const log = readFile(logPath)

assert.equal(metrics.includes('Daumas remains methodological/documental lane only.'), true)
assert.equal(metrics.includes('Prior real-event work remains enrichment/holds parallel lane.'), true)
assert.equal(metrics.includes('Product/UI/API remains blocked.'), true)
assert.equal(batch3.includes('Sinteticos continuam bloqueados'), true)
assert.equal(enrichment.includes('no synthetic event creation in this phase'), true)
assert.equal(syntheticPreplan.includes('NO_SYNTHETIC_CREATED'), true)
assert.equal(log.includes('No synthetic event creation.'), true)

const forbiddenSyntheticFiles = fs
  .readdirSync(path.resolve(process.cwd(), 'docs/sera-vnext/real-event-reentry-a4r193'))
  .filter((name) => /^REAL_EVENT_REENTRY_SYNTHETIC_/i.test(name))
assert.equal(forbiddenSyntheticFiles.length, 0, 'Synthetic reentry case files must not be created in this phase.')

const forbiddenOutputMarkers = [
  'selectedCode:',
  'releasedCode:',
  'finalConclusion:',
  `classificationAllowed${'=true'}`,
  `finalConclusionAllowed${'=true'}`,
]
for (const marker of forbiddenOutputMarkers) {
  assert.equal(metrics.includes(marker), false, `Forbidden output marker in metrics doc: ${marker}`)
  assert.equal(enrichment.includes(marker), false, `Forbidden output marker in enrichment doc: ${marker}`)
  assert.equal(syntheticPreplan.includes(marker), false, `Forbidden output marker in preplan doc: ${marker}`)
}

console.log('real-event-reentry-post-batch3-metrics-trial-001: OK')
