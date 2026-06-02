import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/reference-corpus-a4r202/candidate-review-b');

const files = {
  review: path.join(baseDir, 'SERA_VNEXT_CANDIDATE_REVIEW_BATCH_1_A4R202_B_v0.2.0.md'),
  matrix: path.join(baseDir, 'SERA_VNEXT_CANDIDATE_REVIEW_MATRIX_A4R202_B.csv'),
  lanes: path.join(baseDir, 'SERA_VNEXT_EVIDENCE_LANE_SUFFICIENCY_A4R202_B.csv'),
  colgan: path.join(baseDir, 'SERA_VNEXT_COLGAN_ESCAPE_POINT_REAUDIT_A4R202_B.md'),
  authorPack: path.join(baseDir, 'SERA_VNEXT_AUTHOR_DECISION_PACK_A4R202_B.md'),
  nextPhase: path.join(baseDir, 'SERA_VNEXT_NEXT_PHASE_DECISION_A4R202_B.md'),
  log: path.join(baseDir, 'SERA_A4R202_B_LOG_v0.2.0.md'),
};

for (const file of Object.values(files)) {
  assert.ok(existsSync(file), `required A4R202-B artifact must exist: ${file}`);
}

const read = (file: string) => readFileSync(file, 'utf8');
const documents = Object.fromEntries(Object.entries(files).map(([k, v]) => [k, read(v)])) as Record<string, string>;
const combined = Object.values(documents).join('\n');

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

const reviewRows = parseCsv(documents.matrix);
const laneRows = parseCsv(documents.lanes);

assert.equal(reviewRows.length, 6, 'candidate review matrix must contain six events');
assert.equal(laneRows.length, 6, 'lane sufficiency matrix must contain six events');

for (const eventName of [
  'Asiana Airlines Flight 214',
  'UPS Airlines Flight 1354',
  'G-WNSB Sumburgh helicopter accident',
  'Comair Flight 5191',
  'Colgan Air Flight 3407',
  'Execuflight Flight 1526',
]) {
  assert.ok(combined.includes(eventName), `candidate review packet must include ${eventName}`);
}

assert.ok(documents.review.includes('## 3. Event-by-event candidate-only review'));
assert.ok(documents.review.includes('## 4. Special Colgan 3407 section'));
assert.ok(documents.colgan.includes('## 3. Candidate 1'));
assert.ok(documents.colgan.includes('## 4. Candidate 2'));
assert.ok(documents.authorPack.includes('aprovo / não aprovo / preciso revisar'));
assert.ok(documents.authorPack.includes('sim / não / não sei'));
assert.ok(documents.authorPack.includes('segue / reauditoria / hold'));

const requiredMarkers = [
  'P/O/A final classification created: NO',
  'final escape point approved: NO',
  'READY automatic promotion: NO',
  'fixture/baseline/product promotion: BLOCKED',
  'selectedCode/releasedCode/finalConclusion/CLASSIFIED active output: BLOCKED',
  'synthetic-real blending: NO',
  'Daumas used as factual source: NO',
];

for (const marker of requiredMarkers) {
  assert.ok(combined.includes(marker), `guardrail marker missing: ${marker}`);
}

assert.equal(
  reviewRows.find((row) => row.event_id === 'C-001')?.recommended_status,
  'ESCAPE_POINT_REAUDIT_REQUIRED',
  'Colgan 3407 must remain in re-audit status',
);
assert.equal(
  reviewRows.find((row) => row.event_id === 'C-020')?.recommended_status,
  'AUTHOR_REVIEW_READY_CANDIDATE_ONLY',
  'Comair 5191 must be the clean author-review-ready candidate',
);

for (const row of laneRows) {
  assert.equal(row.no_poa_classification_confirmed, 'YES', `${row.event_name} must confirm no P/O/A classification`);
}

for (const forbidden of ['CERA', 'DAL', 'Dalmos', 'Dalmais']) {
  assert.ok(!combined.includes(forbidden), `forbidden token must be absent: ${forbidden}`);
}

assert.ok(!/invented-question/i.test(combined), 'invented-question pattern must be absent');
assert.ok(!/READY automatic promotion:\s*YES/i.test(combined), 'READY automatic promotion must not be enabled');

const activeForbidden = [
  /selectedCode[ \t]*:[ \t]*(?!BLOCKED|NO|null)/i,
  /releasedCode[ \t]*:[ \t]*(?!BLOCKED|NO|null)/i,
  /finalConclusion[ \t]*:[ \t]*(?!BLOCKED|NO|null)/i,
  /CLASSIFIED[ \t]+active[ \t]*:[ \t]*(?!BLOCKED|NO)/i,
  /final escape point approved:\s*YES/i,
  /P\/O\/A final classification created:\s*YES/i,
];

for (const pattern of activeForbidden) {
  assert.ok(!pattern.test(combined), `active forbidden output detected: ${pattern}`);
}

for (const requiredLock of [
  'no HFACS-to-SERA substitution',
  'no Risk/ERC/ARMS layer work',
  'no selectedCode/releasedCode/finalConclusion/CLASSIFIED output',
]) {
  assert.ok(documents.nextPhase.includes(requiredLock) || documents.log.includes(requiredLock), `A4R202-B must retain lock: ${requiredLock}`);
}

console.log('candidate-review-batch1-a4r202b-trial-001: OK');
