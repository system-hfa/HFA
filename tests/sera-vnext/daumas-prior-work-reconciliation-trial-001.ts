import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

type CsvRow = Record<string, string>

function readFile(relativePath: string): string {
  return fs.readFileSync(path.resolve(process.cwd(), relativePath), 'utf8')
}

function parseCsvRows(csv: string): CsvRow[] {
  const lines = csv.trim().split('\n')
  const header = lines[0].split(',')
  return lines.slice(1).map((line) => {
    const values = line.split(',')
    const row: CsvRow = {}
    for (let index = 0; index < header.length; index += 1) {
      row[header[index]] = values[index] ?? ''
    }
    return row
  })
}

const dissertationPath =
  'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_D2_DAUMAS_DISSERTATION_RECONCILIATION_v0.2.0.md'
const priorWorkDaumasPath =
  'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_D2_PRIOR_WORK_RECOVERY_DAUMAS_v0.2.0.md'
const priorRealEventWorkPath =
  'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_D2_PRIOR_REAL_EVENT_WORK_RECOVERY_v0.2.0.md'
const matrixPath = 'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_D2_REFERENCE_EVENT_MATRIX.csv'
const reconciliationPath =
  'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_D2_RECONCILIATION_WITH_REAL_EVENT_TRACKER_v0.2.0.md'
const revisedReadinessPath =
  'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_E_REVISED_READINESS_PLAN_v0.2.0.md'
const logPath = 'docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_D2_LOG_v0.2.0.md'
const oldTrialPath = 'tests/sera-vnext/daumas-dal-prior-work-reconciliation-trial-001.ts'

for (const filePath of [
  dissertationPath,
  priorWorkDaumasPath,
  priorRealEventWorkPath,
  matrixPath,
  reconciliationPath,
  revisedReadinessPath,
  logPath,
]) {
  assert.ok(fs.existsSync(path.resolve(process.cwd(), filePath)), `Missing required D2 artifact: ${filePath}`)
}

assert.equal(fs.existsSync(path.resolve(process.cwd(), oldTrialPath)), false, 'Old DAL trial file must not exist.')

const docsToCheck = [
  readFile(dissertationPath),
  readFile(priorWorkDaumasPath),
  readFile(priorRealEventWorkPath),
  readFile(reconciliationPath),
  readFile(revisedReadinessPath),
  readFile(logPath),
]
const matrixCsv = readFile(matrixPath)
const matrixRows = parseCsvRows(matrixCsv)

const requiredHeader = [
  'case_id',
  'case_name_or_label',
  'source_family',
  'prior_work_doc',
  'current_status',
  'superseded_by',
  'source_location',
  'source_quality',
  'methodology_role',
  'escape_point_explicitness',
  'agent_act_moment_sufficiency',
  'poa_reference_available',
  'mdc_reference_available',
  'usable_as_reference',
  'requires_reentry_under_escape_point_contract',
  'reentry_status',
  'recommended_action',
  'notes',
]

assert.equal(
  matrixCsv.split('\n')[0],
  requiredHeader.join(','),
  'Reference event matrix header does not match required columns.',
)

assert.ok(matrixRows.length > 0, 'Reference event matrix must contain at least one row.')
for (const row of matrixRows) {
  assert.notEqual((row.reentry_status ?? '').trim(), '', `Row ${row.case_id} has empty reentry_status.`)
}

const allowedSourceFamily = new Set([
  'DAUMAS_DISSERTATION',
  'PRIOR_REAL_EVENT_WORK',
  'A4R17X_A4R18X_PRIOR_WORK',
  'A4R193_CURRENT',
  'MIXED',
])

const allowedMethodologyRole = new Set([
  'FOUNDATIONAL_REFERENCE_CASE',
  'METHODOLOGY_EXAMPLE',
  'TAXONOMY_REFERENCE',
  'MDC_REFERENCE',
  'SOURCE_CONTEXT_ONLY',
  'HISTORICAL_PRIOR_WORK',
  'CURRENT_REENTRY_CANDIDATE',
  'PRIOR_REAL_EVENT_CANDIDATE',
])

const allowedReentryStatus = new Set([
  'READY_FOR_REENTRY_UNDER_ESCAPE_POINT_CONTRACT',
  'SOURCE_EXTRACTION_REQUIRED',
  'METHODOLOGY_REFERENCE_ONLY',
  'NOT_READY_FOR_REENTRY',
  'DUPLICATE_OR_ALREADY_COVERED',
  'HOLD_UNCLEAR_SOURCE',
  'HOLD_SUPERSEDED_OR_QUARANTINED',
  'HOLD_TECHNICAL_DOMINANT',
  'READY_FOR_A4R193_E_REENTRY',
])

for (const row of matrixRows) {
  assert.ok(allowedSourceFamily.has(row.source_family), `Invalid source_family on ${row.case_id}`)
  assert.ok(allowedMethodologyRole.has(row.methodology_role), `Invalid methodology_role on ${row.case_id}`)
  assert.ok(allowedReentryStatus.has(row.reentry_status), `Invalid reentry_status on ${row.case_id}`)
}

const requiredOldEvents = [
  'Thebaud',
  'Peasmarsh',
  'Vigo',
  '5N-BQJ',
  'N109W',
  'N11NM',
  'American 965',
  'Delta 191',
  'American 1420',
  'UPS 1354',
  'Colgan 3407',
  'USAir 427',
  'Asiana 214',
  'Comair 5191',
  'United 173',
  'Copterline S-76',
]

const matrixBodyLower = matrixRows.map((row) => `${row.case_name_or_label} ${row.notes}`.toLowerCase()).join('\n')
for (const eventLabel of requiredOldEvents) {
  assert.ok(
    matrixBodyLower.includes(eventLabel.toLowerCase()),
    `Missing required old-event presence in matrix: ${eventLabel}`,
  )
}

// Forbidden operational outputs must stay blocked.
const forbiddenOperationalPatterns = [
  'selected' + 'Code:',
  'released' + 'Code:',
  'final' + 'Conclusion:',
  'classificationAllowed' + '=true',
  'releasedCodeAllowed' + '=true',
  'selectedCodeAllowed' + '=true',
  'finalConclusionAllowed' + '=true',
  'downstreamAllowed' + '=true',
  'CLASS' + 'IFIED',
]
for (const pattern of forbiddenOperationalPatterns) {
  for (const text of docsToCheck) {
    assert.equal(text.includes(pattern), false, `Forbidden operational marker detected in D2 docs: ${pattern}`)
  }
}

// No invalid entity usage of DAL terms. Allow only typo-correction sentences.
const allowedDalContext = 'erroneous search or typo terms and are not valid project entities'
for (const text of docsToCheck) {
  assert.equal(text.includes('Daumas/DAL'), false, 'Daumas/DAL composite term must not appear.')
  if (/\bDAL\b|Dalmos|Dalmais/.test(text)) {
    assert.ok(
      text.includes(allowedDalContext),
      'DAL terms may appear only inside explicit terminology correction context.',
    )
  }
}
assert.equal(/\bDAL\b/.test(matrixCsv), false, 'Matrix must not contain DAL as an entity.')

assert.ok(
  docsToCheck.some((text) => text.includes('American 1420') && text.includes('UPS 1354')),
  'Decision for American 1420 and UPS 1354 must be explicit.',
)

assert.ok(
  docsToCheck.some((text) => text.includes('nao criar sintetico agora') || text.includes('nao criar agora')),
  'Decision about synthetic events must remain blocked now.',
)

assert.ok(
  docsToCheck.some((text) => text.includes('produto UI API bloqueado') || text.includes('produto UI API continua bloqueado')),
  'Product UI API must remain blocked.',
)

const combinedDocs = docsToCheck.join('\n').toLowerCase()
assert.ok(
  combinedDocs.includes('pre a4r192 nao sao referencia automatica') ||
    combinedDocs.includes('pre a4r192 not automatic reference'),
  'Docs must state that pre-A4R192 material is not automatic reference.',
)
assert.ok(
  combinedDocs.includes('reentry sob contrato agent-act-moment'),
  'Docs must require reentry under agent-act-moment contract before reference use.',
)

// No fixture or baseline promotion language from matrix lines.
for (const row of matrixRows) {
  const lowered = `${row.recommended_action} ${row.notes}`.toLowerCase()
  assert.equal(lowered.includes('fixture'), false, `Matrix row must not promote fixture: ${row.case_id}`)
  assert.equal(lowered.includes('baseline'), false, `Matrix row must not promote baseline: ${row.case_id}`)
}

console.log('daumas-prior-work-reconciliation-trial-001: OK')
