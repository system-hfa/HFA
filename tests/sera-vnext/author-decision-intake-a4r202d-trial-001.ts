import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/reference-corpus-a4r202/author-intake-d');

const files = {
  intake: path.join(baseDir, 'SERA_VNEXT_AUTHOR_DECISION_INTAKE_A4R202_D_v0.2.0.md'),
  matrix: path.join(baseDir, 'SERA_VNEXT_AUTHOR_DECISION_INTAKE_MATRIX_A4R202_D.csv'),
  conflicts: path.join(baseDir, 'SERA_VNEXT_AUTHOR_DECISION_CONFLICTS_A4R202_D.csv'),
  nextPhase: path.join(baseDir, 'SERA_VNEXT_NEXT_PHASE_DECISION_A4R202_D.md'),
  log: path.join(baseDir, 'SERA_A4R202_D_LOG_v0.2.0.md'),
};

for (const file of Object.values(files)) {
  assert.ok(existsSync(file), `required A4R202-D artifact must exist: ${file}`);
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

const matrixRows = parseCsv(docs.matrix);
const conflictRows = parseCsv(docs.conflicts);

assert.equal(matrixRows.length, 3, 'matrix must contain three events');
assert.equal(conflictRows.length, 1, 'conflicts file must contain one no-conflicts row');

for (const eventName of [
  'Comair Flight 5191',
  'Asiana Airlines Flight 214',
  'UPS Airlines Flight 1354',
]) {
  assert.ok(combined.includes(eventName), `event must appear in A4R202-D artifacts: ${eventName}`);
}

for (const response of ['aprovo', 'sim', 'nao', 'segue']) {
  assert.ok(combined.includes(response), `author response must be recorded: ${response}`);
}

for (const row of matrixRows) {
  assert.equal(
    row.derived_candidate_only_status,
    'AUTHOR_APPROVED_FOR_CANDIDATE_ONLY_METHOD_REVIEW',
    `${row.event_name} must be approved only for candidate-only method review`,
  );
  assert.equal(row.opus_needed_response, 'nao', `${row.event_name} must keep Opus not requested`);
  assert.equal(row.routing_response, 'segue', `${row.event_name} must keep routing response segue`);
}

assert.equal(conflictRows[0].status, 'NO_CONFLICTS', 'conflicts status must be NO_CONFLICTS');
assert.ok(docs.intake.includes('VALID_AUTHOR_RESPONSE'), 'intake must record valid author responses');
assert.ok(/MISSING_AUTHOR_RESPONSE`?:\s*none/i.test(docs.intake), 'intake must state no missing responses');
assert.ok(
  /NEEDS_AUTHOR_CLARIFICATION`?:\s*none/i.test(docs.intake),
  'intake must state no clarification is required',
);

const requiredLocks = [
  'P/O/A final classification created: NO',
  'final escape point approved: NO',
  'READY automatic promotion: NO',
  'selectedCode active output: BLOCKED',
  'releasedCode active output: BLOCKED',
  'finalConclusion active output: BLOCKED',
  'CLASSIFIED active output: BLOCKED',
  'fixture/baseline/product promotion: BLOCKED',
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
  /selectedCode\s*:\s*(?!BLOCKED|NO|null)/i,
  /releasedCode\s*:\s*(?!BLOCKED|NO|null)/i,
  /finalConclusion\s*:\s*(?!BLOCKED|NO|null)/i,
  /READY promotion:\s*YES/i,
  /final escape point approved:\s*YES/i,
  /P\/O\/A final classification created:\s*YES/i,
  /Daumas used as factual source:\s*YES/i,
  /synthetic-real blending:\s*YES/i,
];

for (const pattern of prohibitedActivePatterns) {
  assert.ok(!pattern.test(combined), `prohibited active pattern detected: ${pattern}`);
}

for (const forbiddenDomain of [
  'HFACS output',
  'Risk/ERC output',
  'ARMS/ERC output',
  'recommendations output',
]) {
  assert.ok(combined.includes(`no ${forbiddenDomain}`), `A4R202-D must retain lock: ${forbiddenDomain}`);
}

console.log('author-decision-intake-a4r202d-trial-001: OK');
