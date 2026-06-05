import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/reference-corpus-a4r202/opus-consolidation-dr2');
const a4r202DDir = path.join(root, 'docs/sera-vnext/reference-corpus-a4r202/author-intake-d');

const files = {
  consolidation: path.join(baseDir, 'SERA_VNEXT_OPUS_CONSOLIDATION_A4R202_DR2_v0.2.0.md'),
  findings: path.join(baseDir, 'SERA_VNEXT_OPUS_AUDIT_CONSOLIDATED_FINDINGS_A4R202_DR2.csv'),
  reconciliation: path.join(baseDir, 'SERA_VNEXT_OPUS_RECOMMENDATION_RECONCILIATION_A4R202_DR2.csv'),
  model: path.join(baseDir, 'SERA_VNEXT_AUTHOR_DECISION_MODEL_V2_A4R202_DR2.md'),
  nextPhase: path.join(baseDir, 'SERA_VNEXT_NEXT_PHASE_DECISION_A4R202_DR2.md'),
  pending: path.join(baseDir, 'SERA_VNEXT_PENDING_WORK_REGISTER_A4R202_DR2.csv'),
  log: path.join(baseDir, 'SERA_A4R202_DR2_LOG_v0.2.0.md'),
  a4r202d: path.join(a4r202DDir, 'SERA_VNEXT_AUTHOR_DECISION_INTAKE_A4R202_D_v0.2.0.md'),
};

for (const file of Object.values(files)) {
  assert.ok(existsSync(file), `required DR2-related artifact must exist: ${file}`);
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

const findingRows = parseCsv(docs.findings);
const reconciliationRows = parseCsv(docs.reconciliation);
const pendingRows = parseCsv(docs.pending);

assert.ok(docs.consolidation.includes('A4R202-D already exists in commit `eaca4695d6063c07e018eb3e119e6f1f5d980801`'));
assert.ok(docs.consolidation.includes('This phase does not recreate or overwrite A4R202-D.'));
assert.ok(docs.consolidation.includes('OPUS_3_NOT_PRESENT_IN_REPO_INPUTS'));

for (const opusFile of [
  'SERA_VNEXT_OPUS_AUDIT_A4R202_OPUS1.md',
  'SERA_VNEXT_METHODOLOGICAL_COHERENCE_AUDIT_A4R202_OPUS2_v0.2.0.md',
  'SERA_VNEXT_OPUS_COMPREHENSIVE_AUDIT_A4R202_FULL_v0.2.0.md',
  'SERA_A4R202_OPUS_SUPPLEMENTAL_AUDIT_REPORT_v0.1.0.md',
]) {
  assert.ok(docs.consolidation.includes(opusFile), `available local Opus input must be recorded: ${opusFile}`);
}

for (const eventName of ['Comair 5191', 'Asiana 214', 'UPS 1354', 'Colgan 3407']) {
  assert.ok(combined.includes(eventName), `event must appear in DR2 artifacts: ${eventName}`);
}

assert.ok(combined.includes('APPROVED_CANDIDATE_ONLY_METHOD_REVIEW_CLEAN_ANCHOR'));
assert.ok(combined.includes('APPROVED_CANDIDATE_ONLY_METHOD_REVIEW_WITH_BOUNDARY_WARNING'));
assert.ok(combined.includes('EXCLUDED_REAUDIT_REQUIRED'));
assert.ok(docs.model.includes('libero para revisão candidate-only'));
assert.ok(docs.model.includes('seguir apenas para method review candidate-only'));
assert.ok(docs.model.includes('Confirmo que esta decisão NÃO aprova P/O/A final.'));
assert.ok(docs.model.includes('Confirmo que esta decisão NÃO aprova ponto de fuga final.'));
assert.ok(docs.model.includes('Confirmo que esta decisão NÃO promove READY.'));
assert.ok(docs.nextPhase.includes('A4R202-E — Candidate-only Method Review for Top-3 with Opus Warnings'));

assert.ok(!/P\/O\/A final classification created:\s*YES/i.test(combined), 'final P/O/A must remain off');
assert.ok(!/final escape point approved:\s*YES/i.test(combined), 'final escape point approval must remain off');
assert.ok(!/READY automatic promotion:\s*YES/i.test(combined), 'READY promotion must remain off');

for (const marker of [
  'selectedCode active output: BLOCKED',
  'releasedCode active output: BLOCKED',
  'finalConclusion active output: BLOCKED',
  'CLASSIFIED active output: BLOCKED',
  'fixture/baseline/product promotion: BLOCKED',
  'Daumas used as factual source: NO',
  'synthetic-real blending: NO',
]) {
  assert.ok(combined.includes(marker), `required lock marker missing: ${marker}`);
}

assert.ok(!/Daumas used as factual source:\s*YES/i.test(combined), 'Daumas cannot become a factual source');
assert.ok(!/synthetic-real blending:\s*YES/i.test(combined), 'synthetic-real blending must remain absent');

for (const forbidden of ['CERA', 'Dalmos', 'Dalmais']) {
  assert.ok(!combined.includes(forbidden), `forbidden token must be absent: ${forbidden}`);
}

assert.ok(!/invented-question/i.test(combined), 'invented-question pattern must be absent');
assert.ok(!/P-1|P-2|O-1|O-2|A-1|A-2/.test(combined), 'invented question fragments must be absent');

assert.ok(findingRows.length >= 10, 'findings matrix must contain consolidated findings');
assert.ok(reconciliationRows.length >= 10, 'reconciliation matrix must contain consolidated recommendations');
assert.ok(pendingRows.some((row) => row.work_item === 'A4R202-E top-3 candidate-only method review'));
assert.ok(pendingRows.some((row) => row.work_item === 'Colgan-only re-audit'));

const statusByFinding = new Map(findingRows.map((row) => [row.event_or_scope, row.status]));
assert.equal(statusByFinding.get('Comair 5191'), 'ACCEPTED_FOR_NEXT_PHASE');
assert.equal(statusByFinding.get('Asiana 214'), 'ACCEPTED_FOR_NEXT_PHASE');
assert.equal(statusByFinding.get('UPS 1354'), 'ACCEPTED_FOR_NEXT_PHASE');
assert.equal(statusByFinding.get('Colgan 3407'), 'ACCEPTED_FOR_PENDING_WORK');
assert.equal(statusByFinding.get('OPUS-3 availability'), 'NOT_AVAILABLE_IN_LOCAL_INPUTS');

console.log('opus-consolidation-a4r202dr2-trial-001: OK');
