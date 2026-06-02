import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/reference-corpus-a4r202/top3-author-dossiers-c');

const files = {
  dossiers: path.join(baseDir, 'SERA_VNEXT_TOP3_AUTHOR_DOSSIERS_A4R202_C_v0.2.0.md'),
  matrix: path.join(baseDir, 'SERA_VNEXT_TOP3_AUTHOR_DECISION_MATRIX_A4R202_C.csv'),
  risks: path.join(baseDir, 'SERA_VNEXT_TOP3_RISK_MATRIX_A4R202_C.csv'),
  questionnaire: path.join(baseDir, 'SERA_VNEXT_TOP3_AUTHOR_QUESTIONNAIRE_A4R202_C.md'),
  nextPhase: path.join(baseDir, 'SERA_VNEXT_NEXT_PHASE_DECISION_A4R202_C.md'),
  log: path.join(baseDir, 'SERA_A4R202_C_LOG_v0.2.0.md'),
};

for (const file of Object.values(files)) {
  assert.ok(existsSync(file), `required A4R202-C artifact must exist: ${file}`);
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

const matrixRows = parseCsv(documents.matrix);
const riskRows = parseCsv(documents.risks);

assert.equal(matrixRows.length, 3, 'top-3 decision matrix must contain three events');
assert.equal(riskRows.length, 9, 'top-3 risk matrix must contain nine risk rows');

for (const eventName of [
  'Comair Flight 5191',
  'Asiana Airlines Flight 214',
  'UPS Airlines Flight 1354',
]) {
  assert.ok(combined.includes(eventName), `top-3 dossier pack must include ${eventName}`);
}

assert.ok(documents.dossiers.includes('## 3. Event Dossiers'));
assert.ok(documents.dossiers.includes('## 4. Top-3 Synthesis Matrix'));
assert.ok(documents.questionnaire.includes('aprovo / não aprovo / preciso revisar'));
assert.ok(documents.questionnaire.includes('sim / não / não sei'));
assert.ok(documents.questionnaire.includes('segue / reauditoria / hold'));
assert.ok(documents.questionnaire.includes('Preciso de Opus para revisar este caso?'));

for (const row of matrixRows) {
  assert.equal(row.recommended_author_action, 'segue', `${row.event_name} should route to author intake`);
  assert.equal(row.opus_needed, 'não', `${row.event_name} must not require Opus now`);
}

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

assert.ok(documents.nextPhase.includes('A4R202-D - Author Decision Intake for Top-3'));
assert.ok(documents.nextPhase.includes('Opus required now: `NO`'));
assert.ok(documents.nextPhase.includes('Colgan'));
assert.ok(documents.nextPhase.includes('Batch 2'));

for (const forbidden of ['CERA', 'DAL', 'Dalmos', 'Dalmais']) {
  assert.ok(!combined.includes(forbidden), `forbidden token must be absent: ${forbidden}`);
}

assert.ok(!/invented-question/i.test(combined), 'invented-question pattern must be absent');
assert.ok(!/Daumas used as factual source:\s*YES/i.test(combined), 'Daumas cannot be used as factual source');
assert.ok(!/synthetic-real blending:\s*YES/i.test(combined), 'synthetic-real blending must remain off');
assert.ok(!/final escape point approved:\s*YES/i.test(combined), 'final escape point approval must remain off');
assert.ok(!/P\/O\/A final classification created:\s*YES/i.test(combined), 'P/O/A final classification must remain off');
assert.ok(!/READY automatic promotion:\s*YES/i.test(combined), 'READY automatic promotion must remain off');

const activeForbidden = [
  /selectedCode[ \t]*:[ \t]*(?!BLOCKED|NO|null)/i,
  /releasedCode[ \t]*:[ \t]*(?!BLOCKED|NO|null)/i,
  /finalConclusion[ \t]*:[ \t]*(?!BLOCKED|NO|null)/i,
  /CLASSIFIED[ \t]+active[ \t]*:[ \t]*(?!BLOCKED|NO)/i,
];

for (const pattern of activeForbidden) {
  assert.ok(!pattern.test(combined), `active forbidden output detected: ${pattern}`);
}

for (const requiredLock of [
  'no HFACS-to-SERA substitution',
  'no Risk/ERC/ARMS layer work',
]) {
  assert.ok(
    documents.nextPhase.includes(requiredLock) || documents.log.includes(requiredLock) || documents.dossiers.includes(requiredLock),
    `A4R202-C must retain lock: ${requiredLock}`,
  );
}

console.log('top3-author-dossiers-a4r202c-trial-001: OK');
