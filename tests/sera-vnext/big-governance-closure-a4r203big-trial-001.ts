import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/governance-a4r203/big-governance-closure');

const files = {
  closure: path.join(baseDir, 'SERA_VNEXT_BIG_GOVERNANCE_CLOSURE_A4R203_BIG_v0.2.0.md'),
  livingState: path.join(baseDir, 'SERA_VNEXT_LIVING_STATE_A4R203_BIG.md'),
  lanes: path.join(baseDir, 'SERA_VNEXT_ACTIVE_LANES_MATRIX_A4R203_BIG.csv'),
  locks: path.join(baseDir, 'SERA_VNEXT_LOCK_GATE_REGISTER_A4R203_BIG.csv'),
  superseded: path.join(baseDir, 'SERA_VNEXT_SUPERSEDED_ARCHIVE_REGISTER_A4R203_BIG.csv'),
  synthetic: path.join(baseDir, 'SERA_VNEXT_SYNTHETIC_READINESS_A4R203_BIG.csv'),
  roadmap: path.join(baseDir, 'SERA_VNEXT_MACRO_ROADMAP_A4R203_BIG.csv'),
  nextPhase: path.join(baseDir, 'SERA_VNEXT_NEXT_MACROPHASE_DECISION_A4R203_BIG.md'),
  log: path.join(baseDir, 'SERA_A4R203_BIG_LOG_v0.2.0.md'),
};

for (const file of Object.values(files)) {
  assert.ok(existsSync(file), `required A4R203-BIG artifact must exist: ${file}`);
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

const laneRows = parseCsv(docs.lanes);
const lockRows = parseCsv(docs.locks);
const supersededRows = parseCsv(docs.superseded);
const syntheticRows = parseCsv(docs.synthetic);
const roadmapRows = parseCsv(docs.roadmap);

assert.ok(combined.includes('CURRENT_NON_FINAL_TRUTH'), 'living state must exist as official non-final truth');
assert.ok(combined.includes('Comair 5191'), 'Comair must appear');
assert.ok(combined.includes('clean anchor'), 'Comair clean anchor must be explicit');
assert.ok(combined.includes('Asiana 214'), 'Asiana must appear');
assert.ok(combined.includes('automation / 500 ft gate boundary warning'), 'Asiana warning must be explicit');
assert.ok(combined.includes('UPS 1354'), 'UPS must appear');
assert.ok(combined.includes('setup / FMC / V-S / MDA boundary warning'), 'UPS warning must be explicit');
assert.ok(combined.includes('Colgan 3407'), 'Colgan must appear');
assert.ok(combined.includes('reaudited'), 'Colgan must be reaudited');
assert.ok(combined.includes('still required'), 'Colgan must still be required');
assert.ok(combined.includes('not fourth reference'), 'Colgan must not be fourth reference');
assert.ok(combined.includes('Daumas'), 'Daumas must appear');
assert.ok(combined.includes('calibration extraction complete'), 'Daumas calibration completion must be explicit');
assert.ok(combined.includes('not factual source'), 'Daumas must not be factual source');
assert.ok(combined.includes('GAP-004 consequence-as-cause'), 'GAP-004 must appear');
assert.ok(combined.includes('next P1 synthetic candidate'), 'GAP-004 must be the next P1 candidate');
assert.ok(combined.includes('not materialized'), 'synthetic materialization must remain blocked');
assert.ok(combined.includes('GAP-002 agent_migration'), 'GAP-002 must appear');
assert.ok(combined.includes('after GAP-004'), 'GAP-002 must be after GAP-004');
assert.ok(combined.includes('GAP-001 PF_PM separation'), 'GAP-001 must appear');
assert.ok(combined.includes('retained audited controlled draft'), 'GAP-001 retained status must be explicit');
assert.ok(combined.includes('A4R204-BIG - Synthetic P1 Package'), 'next macrophase must be A4R204-BIG');

const allowedLaneStatuses = new Set([
  'ACTIVE_COMPLETE_NON_FINAL',
  'ACTIVE_NEXT',
  'ACTIVE_LATER',
  'HOLD',
  'BLOCKED',
  'SUPERSEDED',
  'ARCHIVED',
  'PENDING_AUTHOR_DECISION',
  'PENDING_SOURCE_RECOVERY',
  'PENDING_GOVERNANCE',
  'NOT_AUTHORIZED',
]);

assert.ok(laneRows.length >= 14, 'active lanes matrix must contain all required lanes');
for (const row of laneRows) {
  assert.ok(allowedLaneStatuses.has(row.current_status), `lane status must be allowed: ${row.lane}`);
}

for (const laneName of [
  'Top 3 real-event candidate-only review',
  'Colgan',
  'Daumas calibration',
  'G-WNSB and Execuflight',
  'Synthetic GAP-004',
  'Synthetic GAP-002',
  'Synthetic GAP-001',
  'Batch 2 deep extraction',
  'Perplexity targeted search',
  'Governance simplification',
  'Fixture',
  'Baseline',
  'Product/UI/API',
  'Risk/ERC/HFACS/downstream',
]) {
  assert.ok(laneRows.some((row) => row.lane === laneName), `lane must exist: ${laneName}`);
}

for (const lockName of [
  'NO_FINAL_P_O_A',
  'NO_FINAL_ESCAPE_POINT',
  'NO_READY_PROMOTION',
  'NO_SELECTED_RELEASED_FINAL',
  'NO_CLASSIFIED',
  'NO_FIXTURE',
  'NO_BASELINE',
  'NO_PRODUCT',
  'NO_HFACS_RISK_ARMS_ERC',
  'NO_DAUMAS_FACTUAL_SOURCE',
  'NO_DAUMAS_AUTOMATIC_REENTRY',
  'NO_SYNTHETIC_REAL_BLENDING',
  'NO_SOURCE_CORPUS_MOD_WITHOUT_SOURCE_PHASE',
  'NO_BROAD_SCOUTING_WITHOUT_EXPLICIT_NEED',
]) {
  assert.ok(lockRows.some((row) => row.lock_or_gate === lockName && row.type === 'LOCK'), `lock must exist: ${lockName}`);
}

for (const gateName of [
  'CANDIDATE_ONLY_METHOD_REVIEW_GATE',
  'AUTHOR_REVIEW_GATE',
  'SOURCE_TRACEABILITY_GATE',
  'DAUMAS_CALIBRATION_GATE',
  'SYNTHETIC_DESIGN_GATE',
  'SYNTHETIC_MATERIALIZATION_GATE',
  'FIXTURE_GATE',
  'BASELINE_GATE',
  'PRODUCT_GATE',
]) {
  assert.ok(lockRows.some((row) => row.lock_or_gate === gateName && row.type === 'GATE'), `gate must exist: ${gateName}`);
}

const supersededChecks = new Map([
  ['Author Decision Model v1', 'SUPERSEDED'],
  ['Raw broad scouting outputs', 'ARCHIVED_INPUT_ONLY'],
  ['Raw Opus input files under A4R202-DR2', 'ARCHIVED_INPUT_ONLY'],
  ['Candidate-only outputs', 'RETAINED_NON_FINAL'],
  ['CERA', 'FORBIDDEN_HISTORICAL_NEGATIVE_ONLY'],
  ['DAL', 'FORBIDDEN_HISTORICAL_NEGATIVE_ONLY'],
  ['Dalmos', 'FORBIDDEN_HISTORICAL_NEGATIVE_ONLY'],
  ['Dalmais', 'FORBIDDEN_HISTORICAL_NEGATIVE_ONLY'],
  ['O-E', 'NON_EXISTENT_IN_SERA_PT_V1'],
  ['Invented question patterns from older drafts', 'INVALID_SUPERSEDED_PATTERN'],
  ['Colgan pre-A4R202-F candidate status', 'SUPERSEDED'],
]);

for (const [item, status] of supersededChecks) {
  assert.ok(
    supersededRows.some((row) => row.item_or_pattern === item && row.status === status),
    `superseded/archive register must include ${item} with status ${status}`,
  );
}

for (const gapId of ['GAP-004', 'GAP-002', 'GAP-001']) {
  assert.ok(syntheticRows.some((row) => row.gap_id === gapId), `synthetic readiness must include ${gapId}`);
}

assert.ok(
  syntheticRows.some((row) => row.gap_id === 'GAP-004' && row.readiness_status === 'READY_FOR_DESIGN_ONLY_NEXT'),
  'GAP-004 must be ready for design-only next',
);
assert.ok(
  syntheticRows.some((row) => row.gap_id === 'GAP-002' && row.readiness_status === 'READY_AFTER_GAP004'),
  'GAP-002 must remain after GAP-004',
);
assert.ok(
  syntheticRows.some((row) => row.gap_id === 'GAP-001' && row.readiness_status === 'RETAINED_AUDITED_NOT_ACTIVE'),
  'GAP-001 must remain retained and not active',
);

assert.equal(roadmapRows.length, 4, 'macro roadmap must contain four macrophases');
assert.equal(roadmapRows[0]?.macrophase, 'A4R204-BIG - Synthetic P1 Package');

const requiredLocks = [
  'Daumas used as factual source: NO',
  'Daumas automatic reentry: NO',
  'P/O/A final classification created: NO',
  'final escape point approved: NO',
  'READY automatic promotion: NO',
  'selectedCode active output: BLOCKED',
  'releasedCode active output: BLOCKED',
  'finalConclusion active output: BLOCKED',
  'CLASSIFIED active output: BLOCKED',
  'fixture/baseline/product promotion: BLOCKED',
  'downstream release behavior: BLOCKED',
  'synthetic-real blending: NO',
  'no HFACS-to-SERA substitution',
  'no Risk/ERC/ARMS layer work',
  'no final recommendation output',
];

for (const marker of requiredLocks) {
  assert.ok(combined.includes(marker), `guardrail marker missing: ${marker}`);
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
  /Daumas automatic reentry:\s*YES/i,
  /synthetic-real blending:\s*YES/i,
  /selectedCode\s*:\s*(?!BLOCKED|NO|null)/i,
  /releasedCode\s*:\s*(?!BLOCKED|NO|null)/i,
  /finalConclusion\s*:\s*(?!BLOCKED|NO|null)/i,
];

for (const pattern of prohibitedActivePatterns) {
  assert.ok(!pattern.test(combined), `prohibited active pattern detected: ${pattern}`);
}

assert.ok(!combined.includes('recommendations'), 'plural recommendations token must be absent');

console.log('big-governance-closure-a4r203big-trial-001: OK');
