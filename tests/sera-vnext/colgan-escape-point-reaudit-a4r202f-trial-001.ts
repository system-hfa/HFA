import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/reference-corpus-a4r202/colgan-reaudit-f');

const files = {
  review: path.join(baseDir, 'SERA_VNEXT_COLGAN_ESCAPE_POINT_REAUDIT_A4R202_F_v0.2.0.md'),
  matrix: path.join(baseDir, 'SERA_VNEXT_COLGAN_ESCAPE_POINT_CANDIDATE_MATRIX_A4R202_F.csv'),
  windows: path.join(baseDir, 'SERA_VNEXT_COLGAN_ESCAPE_WINDOW_ANALYSIS_A4R202_F.csv'),
  lanes: path.join(baseDir, 'SERA_VNEXT_COLGAN_CANDIDATE_POA_EVIDENCE_LANES_A4R202_F.csv'),
  top3: path.join(baseDir, 'SERA_VNEXT_COLGAN_VS_TOP3_COMPARISON_A4R202_F.csv'),
  nextPhase: path.join(baseDir, 'SERA_VNEXT_NEXT_PHASE_DECISION_A4R202_F.md'),
  log: path.join(baseDir, 'SERA_A4R202_F_LOG_v0.2.0.md'),
};

for (const file of Object.values(files)) {
  assert.ok(existsSync(file), `required A4R202-F artifact must exist: ${file}`);
}

const read = (file: string) => readFileSync(file, 'utf8');
const docs = Object.fromEntries(Object.entries(files).map(([key, value]) => [key, read(value)])) as Record<string, string>;
const combined = Object.values(docs).join('\n');

function parseCsv(input: string): Record<string, string>[] {
  const rows: string[][] = [];
  let field = '';
  let row: string[] = [];
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const nextChar = input[index + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      field += '"';
      index += 1;
      continue;
    }
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === ',' && !inQuotes) {
      row.push(field);
      field = '';
      continue;
    }
    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') index += 1;
      row.push(field);
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      field = '';
      continue;
    }
    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const [header, ...body] = rows;
  return body.map((values) => Object.fromEntries(header.map((name, index) => [name, values[index] ?? ''])));
}

const candidateRows = parseCsv(docs.matrix);
const windowRows = parseCsv(docs.windows);
const laneRows = parseCsv(docs.lanes);
const top3Rows = parseCsv(docs.top3);

assert.equal(candidateRows.length, 3, 'candidate matrix must contain three sustained candidates');
assert.equal(windowRows.length, 1, 'window analysis must contain one Colgan row');
assert.equal(laneRows.length, 3, 'candidate lanes must contain three sustained candidates');
assert.ok(top3Rows.length >= 5, 'top3 comparison must contain multiple dimensions');

assert.ok(combined.includes('Colgan 3407') || combined.includes('Colgan Air Flight 3407'));
assert.ok(combined.includes('LOW_SPEED_DETERIORATION_BEFORE_STICK_SHAKER'));
assert.ok(combined.includes('IMMEDIATE_POST_STICK_SHAKER_RESPONSE'));
assert.ok(combined.includes('REF_SPEED_ICE_MISMATCH_AWARENESS'));
assert.ok(combined.includes('earliest_controllable_ref'));
assert.ok(combined.includes('latest_controllable_ref'));
assert.ok(combined.includes('first_departure_from_safe_operation'));
assert.ok(combined.includes('critical_unsafe_act'));
assert.ok(combined.includes('Comair 5191'));
assert.ok(combined.includes('Asiana 214'));
assert.ok(combined.includes('UPS 1354'));

for (const row of laneRows) {
  assert.ok(
    row.perception_lane_candidate_evidence.includes('NON_FINAL_CANDIDATE_ONLY'),
    `${row.candidate_id} must keep non-final perception evidence`,
  );
  assert.ok(
    row.objective_goal_lane_candidate_evidence.includes('NON_FINAL_CANDIDATE_ONLY'),
    `${row.candidate_id} must keep non-final objective evidence`,
  );
  assert.ok(
    row.action_lane_candidate_evidence.includes('NON_FINAL_CANDIDATE_ONLY'),
    `${row.candidate_id} must keep non-final action evidence`,
  );
  assert.equal(row.no_final_poa_confirmed, 'true');
  assert.equal(row.no_selected_released_final_confirmed, 'true');
}

const allowedStatuses = new Set([
  'COLGAN_PROCEED_TO_CANDIDATE_ONLY_METHOD_REVIEW_WITH_WINDOW_WARNING',
  'COLGAN_REAUDIT_STILL_REQUIRED',
  'COLGAN_HOLD_FOR_METHOD_GAP',
  'COLGAN_BOUNDARY_CASE_ONLY',
  'COLGAN_DO_NOT_USE_AS_REFERENCE_YET',
]);

const matchedStatus = [...allowedStatuses].find((status) => combined.includes(status));
assert.ok(matchedStatus, 'Colgan status must be one of the allowed candidate-only statuses');
assert.ok(combined.includes('COLGAN_REAUDIT_STILL_REQUIRED'), 'Colgan must remain in re-audit status');

const requiredLocks = [
  'P/O/A final classification created: NO',
  'final escape point approved: NO',
  'READY automatic promotion: NO',
  'selectedCode active output: BLOCKED',
  'releasedCode active output: BLOCKED',
  'finalConclusion active output: BLOCKED',
  'CLASSIFIED active output: BLOCKED',
  'fixture/baseline/product promotion: BLOCKED',
  'downstream release behavior: BLOCKED',
  'Daumas used as factual source: NO',
  'synthetic-real blending: NO',
];

for (const marker of requiredLocks) {
  assert.ok(combined.includes(marker), `guardrail marker missing: ${marker}`);
}

for (const forbidden of ['CERA', 'DAL', 'Dalmos', 'Dalmais']) {
  assert.ok(!combined.includes(forbidden), `forbidden token must be absent: ${forbidden}`);
}

const inventedQuestionFragments = [
  'P-1',
  'P-2',
  'O-1',
  'O-2',
  'A-1',
  'A-2',
  'Pergunta por eixo',
  'pergunta por eixo',
  'case-specific question',
  'auxiliary question',
];

for (const fragment of inventedQuestionFragments) {
  assert.ok(!combined.includes(fragment), `invented-question fragment must be absent: ${fragment}`);
}

const prohibitedActivePatterns = [
  /P\/O\/A final classification created:\s*YES/i,
  /final escape point approved:\s*YES/i,
  /READY automatic promotion:\s*YES/i,
  /Daumas used as factual source:\s*YES/i,
  /synthetic-real blending:\s*YES/i,
  /selectedCode\s*:\s*(?!BLOCKED|NO|null)/i,
  /releasedCode\s*:\s*(?!BLOCKED|NO|null)/i,
  /finalConclusion\s*:\s*(?!BLOCKED|NO|null)/i,
];

for (const pattern of prohibitedActivePatterns) {
  assert.ok(!pattern.test(combined), `prohibited active pattern detected: ${pattern}`);
}

for (const requiredLock of [
  'no HFACS-to-SERA substitution',
  'no Risk/ERC/ARMS layer work',
  'no final recommendation output',
]) {
  assert.ok(combined.includes(requiredLock), `A4R202-F must retain lock: ${requiredLock}`);
}

console.log('colgan-escape-point-reaudit-a4r202f-trial-001: OK');
