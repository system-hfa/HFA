import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/reference-corpus-a4r201/reconciliation-b');

const files = {
  report: path.join(baseDir, 'SERA_VNEXT_PERPLEXITY_RECONCILIATION_A4R201_B_REPORT_v0.2.0.md'),
  matrix: path.join(baseDir, 'SERA_VNEXT_PERPLEXITY_RECONCILED_CANDIDATE_MATRIX_A4R201_B.csv'),
  queue: path.join(baseDir, 'SERA_VNEXT_DEEP_EXTRACTION_QUEUE_A4R201_B.csv'),
  top10: path.join(baseDir, 'SERA_VNEXT_REFERENCE_TOP10_REVISED_SHORTLIST_A4R201_B.csv'),
  sourceAudit: path.join(baseDir, 'SERA_VNEXT_SOURCE_LINK_QUALITY_AUDIT_A4R201_B.csv'),
  daumas: path.join(baseDir, 'SERA_VNEXT_DAUMAS_REFERENCE_INTEGRATION_A4R201_B.md'),
  nextPhase: path.join(baseDir, 'SERA_VNEXT_NEXT_PHASE_DECISION_A4R201_B.md'),
  log: path.join(baseDir, 'SERA_A4R201_B_LOG_v0.2.0.md'),
};

for (const file of Object.values(files)) {
  assert.ok(existsSync(file), `required A4R201-B artifact must exist: ${file}`);
}

const read = (file: string) => readFileSync(file, 'utf8');
const report = read(files.report);
const matrix = read(files.matrix);
const queue = read(files.queue);
const top10 = read(files.top10);
const sourceAudit = read(files.sourceAudit);
const daumas = read(files.daumas);
const nextPhase = read(files.nextPhase);
const log = read(files.log);
const combined = [report, matrix, queue, top10, sourceAudit, daumas, nextPhase, log].join('\n');

function parseCsv(input: string): string[][] {
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

  return rows;
}

const rows = parseCsv(matrix);
const [header, ...candidateRows] = rows;
assert.equal(candidateRows.length, 30, 'reconciled matrix must contain 30 candidates');

for (const requiredHeader of [
  'candidate_id',
  'event_name',
  'repo_presence_status',
  'source_link_status',
  'factual_depth_status',
  'recommended_next_action',
]) {
  assert.ok(header.includes(requiredHeader), `matrix header missing ${requiredHeader}`);
}

const matrixText = candidateRows.map((row) => row.join('|')).join('\n');
assert.match(matrixText, /NON_OFFICIAL_WEAK|WRONG_OR_MISMATCHED_LINK|SOURCE_NOT_VERIFIED/, 'at least one source or link issue must be recorded');
assert.match(matrixText, /DEEP_EXTRACTION_CANDIDATE/, 'at least one deep extraction candidate must be recorded');
assert.match(matrixText, /REJECT_OR_REPLACE|DISCARD_OR_REPLACE/, 'at least one reject or replace candidate must be recorded');
assert.match(matrixText, /C-030/, 'matrix must preserve C-030 as an explicitly insufficient candidate');

assert.match(queue, /QUEUED_NOT_EXTRACTED|SOURCE_LOCATOR_REQUIRED/, 'deep extraction queue must contain queued work');
assert.match(top10, /^"10","C-008"/m, 'revised top10 must contain ten ranked candidates');
assert.match(sourceAudit, /Motley Rice|YouTube|Wikipedia|Simple Flying|Skybrary/, 'source audit must record known weak source markers');

assert.match(daumas, /not a factual source/i, 'Daumas must not be a factual source');
assert.match(daumas, /does not create selectedCode, releasedCode, or finalConclusion/i);
assert.match(nextPhase, /Opus is not necessary now/i);
assert.match(log, /web search executed: NO/i);
assert.match(log, /download executed: NO/i);
assert.match(log, /source-corpus altered: NO/i);

for (const expected of [
  'POA final classification created: NO',
  'READY automatic promotion: NO',
  'fixture/baseline/product promotion: BLOCKED',
  'selectedCode/releasedCode/finalConclusion/CLASSIFIED active output: BLOCKED',
]) {
  assert.ok(combined.includes(expected), `guardrail marker missing: ${expected}`);
}

const activeForbidden = [
  /selectedCode\s*:\s*(?!BLOCKED|NO|null)/i,
  /releasedCode\s*:\s*(?!BLOCKED|NO|null)/i,
  /finalConclusion\s*:\s*(?!BLOCKED|NO|null)/i,
  /CLASSIFIED\s+active\s*:\s*(?!BLOCKED|NO)/i,
  /READY\s+promotion\s*:\s*(?!NO|BLOCKED)/i,
];

for (const pattern of activeForbidden) {
  assert.ok(!pattern.test(combined), `active forbidden output detected: ${pattern}`);
}

assert.ok(!/synthetic-real blending:[ \t]+(?!NO)/i.test(combined), 'synthetic-real blending must be absent or blocked');
assert.ok(!/Daumas used as factual source:[ \t]+(?!NO)/i.test(combined), 'Daumas must not be factual source');

const cera = 'C' + 'ERA';
assert.ok(!new RegExp(`\\b${cera}\\b`).test(combined), `${cera} must be absent`);

for (const token of ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais']) {
  assert.ok(!new RegExp(`\\b${token}\\b`).test(combined), `invalid term must be absent: ${token}`);
}

for (const fragment of [
  'invented question',
  'Pergunta por eixo',
  'pergunta por eixo',
  'questionPath',
  'canonicalTreeSource',
  'exactQuestionTextPT',
  'exactQuestionTextENAnchor',
]) {
  assert.ok(!combined.includes(fragment), `invented-question or tree-proof pattern must be absent: ${fragment}`);
}

console.log('perplexity-reconciliation-a4r201b-trial-001: OK');
