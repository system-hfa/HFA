import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

type CsvRow = Record<string, string>

const root = path.resolve(__dirname, '..', '..')
const baseDir = path.join(root, 'docs/sera-vnext/methodology-consolidation-a4r195')

function read(relativePath: string): string {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

function parseCsv(content: string): CsvRow[] {
  const lines = content.trim().split(/\r?\n/)
  const header = lines[0].split(',')
  return lines.slice(1).map((line) => {
    const cols = line.split(',')
    const row: CsvRow = {}
    for (let i = 0; i < header.length; i += 1) row[header[i]] = cols[i] ?? ''
    return row
  })
}

const docs = {
  consolidation: 'docs/sera-vnext/methodology-consolidation-a4r195/SERA_VNEXT_METHODOLOGICAL_STATE_CONSOLIDATION_A4R195_A_v0.2.0.md',
  methodTracker: 'docs/sera-vnext/methodology-consolidation-a4r195/SERA_VNEXT_METHOD_STATE_TRACKER_A4R195_A.csv',
  eventMatrix: 'docs/sera-vnext/methodology-consolidation-a4r195/SERA_VNEXT_EVENT_STATUS_MATRIX_A4R195_A.csv',
  gapMatrix: 'docs/sera-vnext/methodology-consolidation-a4r195/SERA_VNEXT_GAP_AND_SYNTHETIC_STATUS_MATRIX_A4R195_A.csv',
  blockedRegister: 'docs/sera-vnext/methodology-consolidation-a4r195/SERA_VNEXT_BLOCKED_ACTIONS_REGISTER_A4R195_A.csv',
  decisionPlan: 'docs/sera-vnext/methodology-consolidation-a4r195/SERA_VNEXT_NEXT_PHASE_DECISION_PLAN_A4R195_A_v0.2.0.md',
  log: 'docs/sera-vnext/methodology-consolidation-a4r195/SERA_A4R195_A_LOG_v0.2.0.md',
  bReadiness: 'docs/sera-vnext/methodology-consolidation-a4r195/SERA_A4R195_B_READINESS_PLAN_v0.2.0.md',
}

for (const relativePath of Object.values(docs)) {
  assert.ok(fs.existsSync(path.join(root, relativePath)), `Missing A4R195-A artifact: ${relativePath}`)
}
assert.ok(fs.existsSync(baseDir), 'A4R195-A directory must exist')

const consolidation = read(docs.consolidation)
const decisionPlan = read(docs.decisionPlan)
const log = read(docs.log)
const bReadiness = read(docs.bReadiness)
const methodTracker = parseCsv(read(docs.methodTracker))
const eventRows = parseCsv(read(docs.eventMatrix))
const gapRows = parseCsv(read(docs.gapMatrix))
const blockedRows = parseCsv(read(docs.blockedRegister))
const combinedDocs = [consolidation, decisionPlan, log, bReadiness].join('\n')
const combinedAll = [combinedDocs, read(docs.methodTracker), read(docs.eventMatrix), read(docs.gapMatrix), read(docs.blockedRegister)].join('\n')

const readyEvents = eventRows.filter((row) => row.status === 'READY_CANDIDATE_ONLY')
assert.equal(readyEvents.length, 7, 'A4R195-A must preserve exactly seven ready candidate-only real events')

const requiredReadyIds = new Set([
  'REAL-EVENT-COPTERLINE-S76-EST-2005-PILOT-001',
  'REAL-EVENT-ASIANA214-SFO2013-REENTRY-001',
  'REAL-EVENT-COMAIR-5191-LEX-2006-REENTRY-001',
  'REAL-EVENT-UNITED-173-PDX-1978-REENTRY-001',
  'REAL-EVENT-AMERICAN-1420-LIT-1999-REENTRY-001',
  'REAL-EVENT-UPS-1354-BHM-2013-REENTRY-001',
  'REAL-EVENT-AMERICAN-965-CALI-1995-REENTRY-001',
])
for (const row of readyEvents) assert.ok(requiredReadyIds.has(row.event_id), `Unexpected ready event: ${row.event_id}`)

const holdRows = eventRows.filter((row) => row.status.startsWith('HOLD_'))
assert.ok(holdRows.length >= 9, 'A4R195-A must keep at least nine hold/source/technical/superseded rows')

const daumasRows = eventRows.filter((row) => row.category === 'daumas_prior_work')
assert.equal(daumasRows.length, 4, 'A4R195-A must preserve four Daumas prior-work rows')
assert.equal(
  daumasRows.some((row) => row.current_use.includes('expected_value') || row.next_action.includes('fixture')),
  false,
  'Daumas rows must not become expected values or fixtures',
)

const gapIds = gapRows.map((row) => row.gap_id).sort()
assert.deepEqual(gapIds, ['GAP-001', 'GAP-002', 'GAP-003', 'GAP-004', 'GAP-005', 'GAP-006', 'GAP-007', 'GAP-008', 'GAP-009', 'GAP-010'])
const gap001 = gapRows.find((row) => row.gap_id === 'GAP-001')
assert.ok(gap001, 'GAP-001 row must exist')
assert.match(gap001.status, /A4R194_I_AUTHORIZATION_GUARDRAIL/)
assert.match(gap001.synthetic_status, /DRAFT_DESIGN_ONLY/)
assert.match(gap001.synthetic_status, /NO_FIXTURE_NO_BASELINE/)
for (const row of gapRows) {
  assert.ok(!row.next_allowed_action.includes('fixture'), `Gap row must not allow fixture: ${row.gap_id}`)
  assert.ok(!row.next_allowed_action.includes('baseline'), `Gap row must not allow baseline: ${row.gap_id}`)
}

const productTrack = methodTracker.find((row) => row.track_id === 'PRODUCT_INTEGRATION')
const fixtureTrack = methodTracker.find((row) => row.track_id === 'FIXTURE_BASELINE')
assert.equal(productTrack?.status, 'BLOCKED')
assert.equal(fixtureTrack?.status, 'BLOCKED')
assert.ok(blockedRows.some((row) => row.blocked_action === 'product_UI_API_integration' && row.status === 'BLOCKED'))
assert.ok(blockedRows.some((row) => row.blocked_action === 'fixture_creation' && row.status === 'BLOCKED'))
assert.ok(blockedRows.some((row) => row.blocked_action === 'baseline_promotion' && row.status === 'BLOCKED'))

assert.match(consolidation, /RR-001 \| OPEN/)
assert.match(consolidation, /RR-003 \| PARTIALLY_MITIGATED/)
assert.match(combinedDocs, /Did not start A4R194-J/)
assert.match(combinedDocs, /A4R194-J may be started only if a future prompt explicitly authorizes it/)
assert.match(combinedDocs, /A4R195-B/)
assert.match(combinedDocs, /Product\/UI\/API remains blocked|Product\/UI\/API integration is not authorized/)

const invalidDaumasTokens = ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais']
for (const token of invalidDaumasTokens) {
  assert.ok(!combinedAll.includes(token), `invalid Daumas alias must not appear: ${token}`)
}
const wrongTerminology = 'C' + 'ERA'
assert.ok(!new RegExp(`\\b${wrongTerminology}\\b`).test(combinedAll), `${wrongTerminology} must not appear`)

const inventedQuestionFragments = [
  'P' + '-1',
  'P' + '-2',
  'O' + '-1',
  'O' + '-2',
  'A' + '-1',
  'A' + '-2',
  'Pergunta por ' + 'eixo',
  'pergunta por ' + 'eixo',
  'case-' + 'specific question',
  'auxiliary ' + 'question',
]
for (const fragment of inventedQuestionFragments) {
  assert.ok(!combinedAll.includes(fragment), `invented-question fragment must not appear: ${fragment}`)
}

const activeOutputPatterns = [
  'selected' + 'Code:',
  'released' + 'Code:',
  'final' + 'Conclusion:',
  'selectedCodeAllowed' + '=true',
  'releasedCodeAllowed' + '=true',
  'classificationAllowed' + '=true',
  'finalConclusionAllowed' + '=true',
]
for (const pattern of activeOutputPatterns) {
  assert.ok(!combinedAll.includes(pattern), `active output or opened lock pattern found: ${pattern}`)
}
const prohibitedClassified = 'CLASS' + 'IFIED'
assert.equal(new RegExp(`\\b${prohibitedClassified}\\b`).test(combinedAll), false, `${prohibitedClassified} must not appear as an active state`)

console.log('methodological-state-consolidation-trial-001: OK')
