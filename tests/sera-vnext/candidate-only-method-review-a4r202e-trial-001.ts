import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/reference-corpus-a4r202/method-review-e');

const files = {
  review: path.join(baseDir, 'SERA_VNEXT_CANDIDATE_ONLY_METHOD_REVIEW_TOP3_A4R202_E_v0.2.0.md'),
  reasoning: path.join(baseDir, 'SERA_VNEXT_CANDIDATE_POA_REASONING_PATHS_A4R202_E.csv'),
  windows: path.join(baseDir, 'SERA_VNEXT_ESCAPE_POINT_WINDOW_ANALYSIS_A4R202_E.csv'),
  crossCase: path.join(baseDir, 'SERA_VNEXT_CROSS_CASE_CONSISTENCY_A4R202_E.csv'),
  opus: path.join(baseDir, 'SERA_VNEXT_OPUS_WARNING_COMPLIANCE_A4R202_E.csv'),
  nextPhase: path.join(baseDir, 'SERA_VNEXT_NEXT_PHASE_DECISION_A4R202_E.md'),
  log: path.join(baseDir, 'SERA_A4R202_E_LOG_v0.2.0.md'),
};

for (const file of Object.values(files)) {
  assert.ok(existsSync(file), `required A4R202-E artifact must exist: ${file}`);
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

const reasoningRows = parseCsv(docs.reasoning);
const windowRows = parseCsv(docs.windows);
const crossCaseRows = parseCsv(docs.crossCase);
const opusRows = parseCsv(docs.opus);

assert.equal(reasoningRows.length, 3, 'reasoning matrix must contain three reviewed events');
assert.equal(windowRows.length, 3, 'window analysis must contain three reviewed events');
assert.ok(crossCaseRows.length >= 6, 'cross-case matrix must contain multiple dimensions');
assert.ok(opusRows.length >= 6, 'Opus warning compliance must contain multiple warnings');

for (const eventName of [
  'Comair Flight 5191',
  'Asiana Airlines Flight 214',
  'UPS Airlines Flight 1354',
]) {
  assert.ok(combined.includes(eventName), `review artifacts must include ${eventName}`);
}

assert.ok(!combined.includes('Colgan 3407') || docs.nextPhase.includes('Colgan'), 'Colgan must not appear as a reviewed event body');
assert.ok(!docs.review.includes('### 3.4 Colgan 3407'), 'Colgan must not be reviewed as an event in A4R202-E');

for (const row of reasoningRows) {
  assert.ok(
    row.perception_lane_candidate_non_final.includes('NON_FINAL_CANDIDATE_ONLY'),
    `${row.event_name} must keep non-final perception reasoning`,
  );
  assert.ok(
    row.objective_goal_lane_candidate_non_final.includes('NON_FINAL_CANDIDATE_ONLY'),
    `${row.event_name} must keep non-final objective reasoning`,
  );
  assert.ok(
    row.action_lane_candidate_non_final.includes('NON_FINAL_CANDIDATE_ONLY'),
    `${row.event_name} must keep non-final action reasoning`,
  );
  assert.equal(row.no_final_poa_confirmed, 'true');
  assert.equal(row.no_selected_released_final_confirmed, 'true');
}

for (const row of windowRows) {
  assert.ok(row.earliest_candidate.length > 0, `${row.event_name} must have earliest candidate`);
  assert.ok(row.latest_candidate.length > 0, `${row.event_name} must have latest candidate`);
  assert.ok(
    row.first_departure_vs_critical_act_relation.length > 0,
    `${row.event_name} must record first departure vs critical act relation`,
  );
}

const byEvent = new Map(reasoningRows.map((row) => [row.event_name, row]));
assert.equal(byEvent.get('Comair Flight 5191')?.boundary_warning, 'clean anchor only');
assert.equal(byEvent.get('Asiana Airlines Flight 214')?.boundary_warning, 'automation boundary warning');
assert.equal(byEvent.get('UPS Airlines Flight 1354')?.boundary_warning, 'procedure FMC MDA boundary warning');

assert.ok(docs.review.includes('`Comair 5191` remains the clean anchor'));
assert.ok(docs.review.includes('`Asiana 214` is usable only with explicit automation and 500 ft gate coevaluation.'));
assert.ok(docs.review.includes('`UPS 1354` is usable only with explicit setup-versus-execution and MDA coevaluation.'));

for (const warning of [
  'F-01 first departure versus critical unsafe act',
  'F-02 counterfactual operational boundary versus temporal boundary',
  'F-03 documental validation versus method validation',
  'F-04 author decision ambiguity',
]) {
  assert.ok(docs.opus.includes(warning), `Opus compliance row missing: ${warning}`);
}

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

for (const forbiddenDomain of [
  'no HFACS-to-SERA substitution',
  'no Risk/ERC/ARMS layer work',
  'no final recommendation output',
]) {
  assert.ok(combined.includes(forbiddenDomain), `A4R202-E must retain lock: ${forbiddenDomain}`);
}

console.log('candidate-only-method-review-a4r202e-trial-001: OK');
