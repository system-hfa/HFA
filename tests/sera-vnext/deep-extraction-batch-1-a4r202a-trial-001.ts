import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/reference-corpus-a4r202/deep-extraction-batch-1');

const files = {
  asiana: path.join(baseDir, 'SERA_VNEXT_DEEP_EXTRACTION_ASIANA_214_A4R202_A_v0.2.0.md'),
  ups: path.join(baseDir, 'SERA_VNEXT_DEEP_EXTRACTION_UPS_1354_A4R202_A_v0.2.0.md'),
  sumburgh: path.join(baseDir, 'SERA_VNEXT_DEEP_EXTRACTION_G_WNSB_SUMBURGH_A4R202_A_v0.2.0.md'),
  comair: path.join(baseDir, 'SERA_VNEXT_DEEP_EXTRACTION_COMAIR_5191_A4R202_A_v0.2.0.md'),
  colgan: path.join(baseDir, 'SERA_VNEXT_DEEP_EXTRACTION_COLGAN_3407_A4R202_A_v0.2.0.md'),
  execuflight: path.join(baseDir, 'SERA_VNEXT_DEEP_EXTRACTION_EXECUFLIGHT_1526_A4R202_A_v0.2.0.md'),
  summary: path.join(baseDir, 'SERA_VNEXT_DEEP_EXTRACTION_SUMMARY_A4R202_A_v0.2.0.md'),
  consolidated: path.join(baseDir, 'SERA_VNEXT_DEEP_EXTRACTION_MATRIX_A4R202_A.csv'),
  sufficiency: path.join(baseDir, 'SERA_VNEXT_HUMAN_ANALYSIS_SUFFICIENCY_MATRIX_A4R202_A.csv'),
  gaps: path.join(baseDir, 'SERA_VNEXT_EVENT_GAP_MATRIX_A4R202_A.csv'),
  nextPhase: path.join(baseDir, 'SERA_VNEXT_NEXT_PHASE_DECISION_A4R202_A.md'),
  log: path.join(baseDir, 'SERA_A4R202_A_LOG_v0.2.0.md'),
};

for (const file of Object.values(files)) {
  assert.ok(existsSync(file), `required A4R202-A artifact must exist: ${file}`);
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

const consolidatedRows = parseCsv(documents.consolidated);
const sufficiencyRows = parseCsv(documents.sufficiency);
const gapRows = parseCsv(documents.gaps);

assert.ok(documents.summary.includes('## Events covered'), 'summary must contain event coverage section');
assert.ok(documents.summary.includes('## Extraction depth result'), 'summary must contain extraction depth section');

assert.equal(consolidatedRows.length, 6, 'consolidated matrix must contain six batch-1 events');
assert.equal(sufficiencyRows.length, 6, 'sufficiency matrix must contain six batch-1 events');
assert.equal(gapRows.length, 6, 'gap matrix must contain six batch-1 events');

for (const eventName of [
  'Asiana Airlines Flight 214',
  'UPS Airlines Flight 1354',
  'G-WNSB Sumburgh helicopter accident',
  'Comair Flight 5191',
  'Colgan Air Flight 3407',
  'Execuflight Flight 1526',
]) {
  assert.ok(combined.includes(eventName), `event packet must include ${eventName}`);
}

for (const required of [
  'POA final classification created: NO',
  'P/O/A final classification created: NO',
  'final escape point approved: NO',
  'READY automatic promotion: NO',
  'selectedCode/releasedCode/finalConclusion/CLASSIFIED active output: BLOCKED',
  'fixture/baseline/product promotion: BLOCKED',
  'synthetic-real blending: NO',
  'Daumas used as factual source: NO',
]) {
  assert.ok(combined.includes(required), `guardrail marker missing: ${required}`);
}

for (const fileKey of ['asiana', 'ups', 'sumburgh', 'comair', 'colgan', 'execuflight'] as const) {
  const doc = documents[fileKey];
  for (const heading of [
    '## 1. Identification',
    '## 2. Source locator',
    '## 3. Factual sequence timeline',
    '## 4. Candidate escape point, not final',
    '## 5. Actor mapping',
    '## 6. Human-analysis evidence collection',
    '## 7. Quarantine of original report analysis',
    '## 8. Bias and sufficiency filters',
    '## 9. Blocked outputs',
  ]) {
    assert.ok(doc.includes(heading), `${fileKey} must include heading ${heading}`);
  }
}

assert.equal(
  consolidatedRows.find((row) => row.event_id === 'C-001')?.next_phase_gate,
  'CANDIDATE_ONLY_HUMAN_ANALYSIS_ALLOWED_WITH_ESC_POINT_REAUDIT',
  'Colgan must retain explicit escape-point re-audit marker',
);

for (const row of sufficiencyRows) {
  assert.match(row.status_for_future_human_analysis, /^SUFFICIENT/, `${row.event_name} must remain candidate-only sufficient`);
}

assert.ok(documents.log.includes('YES_DIRECT_OFFICIAL_PDF_ONLY_FOR_G_WNSB'), 'log must record direct official PDF fetch for G-WNSB');
assert.ok(documents.log.includes('download executed: YES_TEMP_STAGING_ONLY_FOR_G_WNSB'));

const activeForbidden = [
  /selectedCode[ \t]*:[ \t]*(?!BLOCKED|NO|null)/i,
  /releasedCode[ \t]*:[ \t]*(?!BLOCKED|NO|null)/i,
  /finalConclusion[ \t]*:[ \t]*(?!BLOCKED|NO|null)/i,
  /CLASSIFIED[ \t]+active[ \t]*:[ \t]*(?!BLOCKED|NO)/i,
];

for (const pattern of activeForbidden) {
  assert.ok(!pattern.test(combined), `active forbidden output detected: ${pattern}`);
}

assert.ok(!/READY automatic promotion:\s*YES/i.test(combined), 'READY automatic promotion must not be enabled');

for (const requiredLock of [
  'no HFACS-to-SERA substitution',
  'no Risk/ERC/ARMS layer work',
  'no selectedCode/releasedCode/finalConclusion/CLASSIFIED output',
]) {
  assert.ok(documents.nextPhase.includes(requiredLock), `next phase decision must retain lock: ${requiredLock}`);
}

console.log('deep-extraction-batch-1-a4r202a-trial-001: OK');
