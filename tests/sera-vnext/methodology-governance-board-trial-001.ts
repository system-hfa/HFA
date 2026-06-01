import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

type CsvRow = Record<string, string>

const root = path.resolve(__dirname, '..', '..')

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

const files = {
  board: 'docs/sera-vnext/methodology-consolidation-a4r195/SERA_VNEXT_METHODOLOGY_GOVERNANCE_BOARD_A4R195_B_v0.2.0.md',
  decision: 'docs/sera-vnext/methodology-consolidation-a4r195/SERA_VNEXT_METHOD_DECISION_REGISTER_A4R195_B.csv',
  gate: 'docs/sera-vnext/methodology-consolidation-a4r195/SERA_VNEXT_GATE_REGISTER_A4R195_B.csv',
  auth: 'docs/sera-vnext/methodology-consolidation-a4r195/SERA_VNEXT_HUMAN_AUTHORIZATION_MATRIX_A4R195_B.csv',
  model: 'docs/sera-vnext/methodology-consolidation-a4r195/SERA_VNEXT_MODEL_AND_COST_DECISION_MATRIX_A4R195_B.csv',
  next: 'docs/sera-vnext/methodology-consolidation-a4r195/SERA_VNEXT_A4R195_C_NEXT_PHASE_PLAN_v0.2.0.md',
  log: 'docs/sera-vnext/methodology-consolidation-a4r195/SERA_A4R195_B_LOG_v0.2.0.md',
  readiness: 'docs/sera-vnext/methodology-consolidation-a4r195/SERA_A4R195_C_READINESS_PLAN_v0.2.0.md',
}

for (const rel of Object.values(files)) {
  assert.ok(fs.existsSync(path.join(root, rel)), `Missing A4R195-B artifact: ${rel}`)
}

const board = read(files.board)
const decisionRows = parseCsv(read(files.decision))
const gateRows = parseCsv(read(files.gate))
const authRows = parseCsv(read(files.auth))
const modelRows = parseCsv(read(files.model))
const next = read(files.next)
const log = read(files.log)
const readiness = read(files.readiness)
const combined = [board, read(files.decision), read(files.gate), read(files.auth), read(files.model), next, log, readiness].join('\n')

const getDecision = (id: string) => decisionRows.find((row) => row.decision_id === id)
assert.equal(getDecision('DEC-001')?.status, 'ACTIVE')
assert.equal(getDecision('DEC-002')?.status, 'ACTIVE')
assert.equal(getDecision('DEC-003')?.decision, 'a4r194_j_is_not_automatic')
assert.equal(getDecision('DEC-004')?.requires_human_authorization, 'YES')
assert.equal(getDecision('DEC-005')?.decision, 'source_recovery_remains_allowed')
assert.equal(getDecision('DEC-006')?.decision, 'second_synthetic_blocked_until_gap001_decision')
assert.equal(getDecision('DEC-007')?.decision, 'daumas_remains_methodology_reference_only')
assert.equal(getDecision('DEC-012')?.decision, 'rr001_remains_open')
assert.equal(getDecision('DEC-013')?.decision, 'rr003_remains_partially_mitigated')

const gate = (id: string) => gateRows.find((row) => row.gate_id === id)
assert.equal(gate('GATE-PRODUCT-INTEGRATION')?.current_status, 'BLOCKED')
assert.equal(gate('GATE-FIXTURE-CREATION')?.current_status, 'BLOCKED')
assert.equal(gate('GATE-BASELINE-PROMOTION')?.current_status, 'BLOCKED')
assert.equal(gate('GATE-A4R194-J-CONTROLLED-MATERIALIZATION')?.current_status, 'BLOCKED')
assert.equal(gate('GATE-SECOND-SYNTHETIC')?.current_status, 'BLOCKED')
assert.equal(gate('GATE-SOURCE-RECOVERY')?.current_status, 'ALLOWED')

const auth = (action: string) => authRows.find((row) => row.action === action)
assert.equal(auth('Start_A4R194_J')?.authorization_required, 'YES')
assert.equal(auth('Start_A4R194_J')?.authorized_now, 'false')
assert.equal(auth('Create_controlled_materialization_draft')?.authorized_now, 'false')
assert.equal(auth('Create_second_synthetic')?.authorized_now, 'false')
assert.equal(auth('Create_fixture')?.authorized_now, 'false')
assert.equal(auth('Promote_baseline')?.authorized_now, 'false')
assert.equal(auth('Open_product_UI')?.authorized_now, 'false')
assert.equal(auth('Open_product_API')?.authorized_now, 'false')
assert.equal(auth('Emit_selectedCode')?.authorized_now, 'false')
assert.equal(auth('Emit_releasedCode')?.authorized_now, 'false')
assert.equal(auth('Emit_finalConclusion')?.authorized_now, 'false')
assert.equal(auth('Add_HFACS_Risk_ERC_recommendations')?.authorized_now, 'false')
assert.equal(auth('Use_Daumas_case_as_reentry')?.authorized_now, 'false')
assert.equal(auth('Promote_HOLD_event_to_READY')?.authorized_now, 'false')
assert.equal(auth('Perform_source_recovery')?.authorized_now, 'true')

assert.ok(modelRows.some((row) => row.task_type === 'docs_only_inventory' && row.recommended_model === 'codex_gpt_5_3_high'))
assert.ok(modelRows.some((row) => row.task_type === 'governance_board' && row.recommended_model === 'gpt_5_5_thinking'))

assert.match(board, /A4R194-J is allowed only with new explicit human authorization/)
assert.match(board, /Product\/UI\/API remains blocked/)
assert.match(board, /Fixture and baseline remain blocked/)
assert.match(board, /Source recovery remains allowed/)
assert.match(board, /Second synthetic remains blocked/)
assert.match(board, /RR-001: OPEN/)
assert.match(board, /RR-003: PARTIALLY_MITIGATED/)
assert.match(next, /A4R194-J was not started in A4R195-B/)
assert.match(log, /Did not start A4R194-J/)
assert.match(readiness, /no automatic materialization/)

const invalidDaumas = ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais']
for (const token of invalidDaumas) {
  assert.ok(!combined.includes(token), `invalid Daumas alias found: ${token}`)
}

const wrongTerm = 'C' + 'ERA'
assert.ok(!new RegExp(`\\b${wrongTerm}\\b`).test(combined), `${wrongTerm} must not appear`)

const invented = [
  'P' + '-1',
  'P' + '-2',
  'O' + '-1',
  'O' + '-2',
  'A' + '-1',
  'A' + '-2',
  'Pergunta por ' + 'eixo',
  'pergunta por ' + 'eixo',
  'case-specific ' + 'question',
  'auxiliary ' + 'question',
]
for (const token of invented) {
  assert.ok(!combined.includes(token), `invented question token found: ${token}`)
}

const openedLocks = [
  'selectedCodeAllowed' + '=true',
  'releasedCodeAllowed' + '=true',
  'classificationAllowed' + '=true',
  'poaClosureAllowed' + '=true',
  'downstreamAllowed' + '=true',
  'finalConclusionAllowed' + '=true',
]
for (const token of openedLocks) {
  assert.ok(!combined.includes(token), `opened lock found: ${token}`)
}

const forbiddenOutputs = [
  'selected' + 'Code:',
  'released' + 'Code:',
  'final' + 'Conclusion:',
]
for (const token of forbiddenOutputs) {
  assert.ok(!combined.includes(token), `forbidden output token found: ${token}`)
}

console.log('methodology-governance-board-trial-001: OK')
