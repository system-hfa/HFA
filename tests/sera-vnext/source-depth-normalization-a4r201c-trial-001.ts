import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/reference-corpus-a4r201/source-depth-c');

const files = {
  report: path.join(baseDir, 'SERA_VNEXT_SOURCE_DEPTH_AND_LOCATOR_NORMALIZATION_A4R201_C_v0.2.0.md'),
  locator: path.join(baseDir, 'SERA_VNEXT_OFFICIAL_SOURCE_LOCATOR_MATRIX_A4R201_C.csv'),
  readiness: path.join(baseDir, 'SERA_VNEXT_DEEP_EXTRACTION_READINESS_MATRIX_A4R201_C.csv'),
  template: path.join(baseDir, 'SERA_VNEXT_DETAILED_EXTRACTION_TEMPLATE_A4R201_C.md'),
  daumas: path.join(baseDir, 'SERA_VNEXT_DAUMAS_DEPTH_REFERENCE_NOTE_A4R201_C.md'),
  nextPhase: path.join(baseDir, 'SERA_VNEXT_NEXT_PHASE_DECISION_A4R201_C.md'),
  log: path.join(baseDir, 'SERA_A4R201_C_LOG_v0.2.0.md'),
};

for (const file of Object.values(files)) {
  assert.ok(existsSync(file), `required A4R201-C artifact must exist: ${file}`);
}

const read = (file: string) => readFileSync(file, 'utf8');
const report = read(files.report);
const locator = read(files.locator);
const readiness = read(files.readiness);
const template = read(files.template);
const daumas = read(files.daumas);
const nextPhase = read(files.nextPhase);
const log = read(files.log);
const combined = [report, locator, readiness, template, daumas, nextPhase, log].join('\n');

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
      if (char === '\r' && nextChar === '\n') {
        index += 1;
      }
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

const locatorRows = parseCsv(locator);
const readinessRows = parseCsv(readiness);

assert.equal(locatorRows.length, 16, 'locator matrix must cover top10 plus controls/supplements');
assert.equal(readinessRows.length, 16, 'readiness matrix must cover top10 plus controls/supplements');

for (const header of [
  'candidate_id',
  'event_name',
  'official_page_url',
  'official_pdf_url',
  'mirror_url',
  'existing_local_source',
  'locator_status',
  'source_action_required',
  'weak_or_wrong_source_disposition',
]) {
  assert.ok(Object.prototype.hasOwnProperty.call(locatorRows[0], header), `locator header missing ${header}`);
}

for (const header of [
  'candidate_id',
  'event_name',
  'locator_status',
  'readiness_status',
  'deep_extraction_priority',
  'source_depth_basis',
  'required_before_extraction',
]) {
  assert.ok(Object.prototype.hasOwnProperty.call(readinessRows[0], header), `readiness header missing ${header}`);
}

for (const eventName of [
  'Asiana Airlines Flight 214',
  'UPS Airlines Flight 1354',
  'G-WNSB Sumburgh helicopter accident',
  'Comair Flight 5191',
  'Colgan Air Flight 3407',
  'Turkish Airlines Flight 1951',
  'Spanair Flight JK5022',
  'Pel-Air VH-NGA Norfolk Island ditching',
  'Execuflight Flight 1526',
  'Air Canada Flight 759',
]) {
  assert.ok(locator.includes(eventName), `locator matrix must include ${eventName}`);
  assert.ok(readiness.includes(eventName), `readiness matrix must include ${eventName}`);
}

const locatorByEvent = new Map(locatorRows.map((row) => [row.event_name, row]));
const readinessByEvent = new Map(readinessRows.map((row) => [row.event_name, row]));

for (const eventName of [
  'Asiana Airlines Flight 214',
  'UPS Airlines Flight 1354',
  'G-WNSB Sumburgh helicopter accident',
  'Comair Flight 5191',
  'Colgan Air Flight 3407',
  'Execuflight Flight 1526',
]) {
  assert.equal(readinessByEvent.get(eventName)?.readiness_status, 'READY_FOR_DEEP_EXTRACTION', `${eventName} must be ready for deep extraction`);
}

assert.equal(locatorByEvent.get('Air Canada Flight 759')?.locator_status, 'SOURCE_NOT_FOUND');
assert.equal(readinessByEvent.get('Air Canada Flight 759')?.readiness_status, 'HOLD');
assert.match(locatorByEvent.get('Air Canada Flight 759')?.notes ?? '', /not a valid substitute|rather than Air Canada 759/i);

for (const eventName of ['Spanair Flight JK5022', 'TransAsia Airways Flight GE235']) {
  assert.equal(locatorByEvent.get(eventName)?.locator_status, 'NEEDS_PERPLEXITY_RECHECK', `${eventName} must need locator recheck`);
}

assert.equal(readinessByEvent.get('Delta Air Lines Flight 191')?.readiness_status, 'READY_FOR_NEGATIVE_CONTROL_EXTRACTION');
assert.equal(readinessByEvent.get('USAir Flight 427')?.readiness_status, 'READY_FOR_BOUNDARY_EXTRACTION');

const readyCount = readinessRows.filter((row) => row.readiness_status === 'READY_FOR_DEEP_EXTRACTION').length;
assert.ok(readyCount >= 5, 'at least five events must be ready for deep extraction');

for (const marker of [
  'Motley Rice',
  'YouTube',
  'Wikipedia',
  'media',
  'Air Canada Flight 624',
]) {
  assert.match(report + nextPhase + locator, new RegExp(marker, 'i'), `weak or wrong source disposition must mention ${marker}`);
}

const weakSourceNames = [/Motley Rice/i, /YouTube/i, /Wikipedia/i, /Simple Flying/i, /Skybrary/i];
for (const row of locatorRows) {
  for (const fieldName of ['official_page_url', 'official_pdf_url']) {
    const sourceField = row[fieldName] ?? '';
    for (const pattern of weakSourceNames) {
      assert.ok(!pattern.test(sourceField), `weak source accepted in ${fieldName} for ${row.event_name}`);
    }
  }
}

for (const required of [
  'POA final classification created: NO',
  'P/O/A final classification created: NO',
  'READY automatic promotion: NO',
  'fixture/baseline/product promotion: BLOCKED',
  'selectedCode/releasedCode/finalConclusion/CLASSIFIED active output: BLOCKED',
  'synthetic-real blending: NO',
  'Daumas used as factual source: NO',
]) {
  assert.ok(combined.includes(required), `guardrail marker missing: ${required}`);
}

assert.match(template, /Candidate escape-point statement using "quando\.\.\."/);
assert.match(template, /Do not classify P\/O\/A in this section/);
assert.match(template, /Quarantine of original report analysis/);
assert.match(daumas, /not a factual accident source/i);
assert.match(log, /Perplexity executed: NO/);
assert.match(log, /download executed: NO/);
assert.match(log, /source-corpus altered: NO/);

const activeForbidden = [
  /selectedCode[ \t]*:[ \t]*(?!BLOCKED|NO|null)/i,
  /releasedCode[ \t]*:[ \t]*(?!BLOCKED|NO|null)/i,
  /finalConclusion[ \t]*:[ \t]*(?!BLOCKED|NO|null)/i,
  /CLASSIFIED[ \t]+active[ \t]*:[ \t]*(?!BLOCKED|NO)/i,
  /READY[ \t]+promotion[ \t]*:[ \t]*(?!NO|BLOCKED)/i,
];

for (const pattern of activeForbidden) {
  assert.ok(!pattern.test(combined), `active forbidden output detected: ${pattern}`);
}

assert.ok(!new RegExp('synthetic-real blending' + ':[ \\t]+(?!NO)', 'i').test(combined), 'synthetic-real blending must be absent or blocked');
assert.ok(!new RegExp('Daumas used as factual source' + ':[ \\t]+(?!NO)', 'i').test(combined), 'Daumas must not be factual source');
assert.ok(!new RegExp('weak source accepted as primary' + ':[ \\t]+(?!NO)', 'i').test(combined), 'weak source must not be accepted as primary');

const cera = 'C' + 'ERA';
assert.ok(!new RegExp(`\\b${cera}\\b`).test(combined), `${cera} must be absent`);

for (const token of ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais']) {
  assert.ok(!new RegExp(`\\b${token}\\b`).test(combined), `invalid term must be absent: ${token}`);
}

for (const fragment of [
  'invented ' + 'question',
  'Pergunta por ' + 'eixo',
  'pergunta por ' + 'eixo',
  'question' + 'Path',
  'canonical' + 'TreeSource',
  'exact' + 'QuestionTextPT',
  'exact' + 'QuestionTextENAnchor',
]) {
  assert.ok(!combined.includes(fragment), `tree-proof pattern must be absent: ${fragment}`);
}

console.log('source-depth-normalization-a4r201c-trial-001: OK');
