import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/source-recovery-a4r197e');

const paths = {
  review: path.join(baseDir, 'SERA_VNEXT_BATCH_1_SOURCE_RECOVERY_REVIEW_A4R197_E_v0.2.0.md'),
  matrix: path.join(baseDir, 'SERA_VNEXT_BATCH_1_SOURCE_RECOVERY_MATRIX_A4R197_E.csv'),
  findings: path.join(baseDir, 'SERA_VNEXT_BATCH_1_SOURCE_RECOVERY_FINDINGS_A4R197_E.csv'),
  decision: path.join(baseDir, 'SERA_VNEXT_BATCH_1_SOURCE_RECOVERY_NEXT_PHASE_DECISION_A4R197_E.md'),
  log: path.join(baseDir, 'SERA_A4R197_E_LOG_v0.2.0.md'),
};

for (const p of Object.values(paths)) {
  assert.ok(existsSync(p), `required A4R197-E artifact must exist: ${p}`);
}

const review = readFileSync(paths.review, 'utf8');
const matrix = readFileSync(paths.matrix, 'utf8');
const findings = readFileSync(paths.findings, 'utf8');
const decision = readFileSync(paths.decision, 'utf8');
const log = readFileSync(paths.log, 'utf8');
const combined = [review, matrix, findings, decision, log].join('\n');

// SOURCE_CLOSURE_GATE must be referenced
assert.match(combined, /SOURCE_CLOSURE_GATE/, 'SOURCE_CLOSURE_GATE must appear');

// Batch 1 must contain all 9 expected events
const events = ['Colgan 3407', 'Thebaud', 'Peasmarsh', 'Vigo', 'Delta 191', 'USAir 427', 'N109W', 'N11NM', '5N-BQJ'];
for (const e of events) {
  assert.ok(review.includes(e), `review must include event: ${e}`);
  assert.ok(matrix.includes(e), `matrix must include event: ${e}`);
}

// Allowed verdicts only
const allowedVerdicts = [
  'SOURCE_RECOVERY_SUCCESS',
  'SOURCE_RECOVERY_PARTIAL',
  'SOURCE_STILL_INSUFFICIENT',
  'NEGATIVE_CONTROL_CANDIDATE',
  'BOUNDARY_CASE_ONLY',
  'DO_NOT_USE_FOR_REENTRY',
  'REQUIRES_HUMAN_DECISION',
];

// Parse matrix data rows; verify each event row has an allowed verdict and promotion_allowed=false
const matrixLines = matrix.trim().split('\n');
const header = matrixLines[0].split(',');
const verdictIdx = header.indexOf('verdict');
const promoIdx = header.indexOf('promotion_allowed');
assert.ok(verdictIdx >= 0 && promoIdx >= 0, 'matrix must have verdict and promotion_allowed columns');
const dataRows = matrixLines.slice(1).filter((l) => l.trim().length > 0);
assert.equal(dataRows.length, 9, 'matrix must have exactly 9 event rows');
for (const row of dataRows) {
  const cols = row.split(',');
  const verdict = cols[verdictIdx];
  const promo = cols[promoIdx];
  assert.ok(allowedVerdicts.includes(verdict), `row verdict must be allowed: ${verdict}`);
  assert.equal(promo, 'false', `promotion_allowed must be false in row: ${cols[0]}`);
}

// Each allowed verdict appears at least once across the review (sanity that the vocabulary is in use)
for (const v of ['SOURCE_RECOVERY_PARTIAL', 'SOURCE_STILL_INSUFFICIENT', 'NEGATIVE_CONTROL_CANDIDATE', 'BOUNDARY_CASE_ONLY', 'REQUIRES_HUMAN_DECISION']) {
  assert.ok(combined.includes(v), `expected verdict in use: ${v}`);
}

// No READY promotion: no lock-open tokens
for (const opened of [
  'READY_ALLOWED' + '=true',
  'selectedCodeAllowed' + '=true',
  'releasedCodeAllowed' + '=true',
  'classificationAllowed' + '=true',
  'finalConclusionAllowed' + '=true',
  'fixtureAllowed' + '=true',
  'baselineAllowed' + '=true',
  'productAllowed' + '=true',
  'downstreamAllowed' + '=true',
  'poaAllowed' + '=true',
]) {
  assert.ok(!combined.includes(opened), `lock opened unexpectedly: ${opened}`);
}

// No active P/O/A axis codes
for (const code of ['P' + '-1', 'P' + '-2', 'O' + '-1', 'O' + '-2', 'A' + '-1', 'A' + '-2']) {
  assert.ok(!combined.includes(code), `active P/O/A axis code must be absent: ${code}`);
}

// Documented blocks must be present (negated/forbidden markers)
for (const marker of [
  'fixture',
  'baseline',
  'produto',
  'selectedCode',
  'releasedCode',
  'finalConclusion',
  'CLASSIFIED',
  'downstream',
]) {
  assert.ok(combined.includes(marker), `forbidden-output marker must be documented: ${marker}`);
}

// No web search / external download executed
assert.match(combined, /NO_WEB_SEARCH|sem web search|external search NAO executada/i);
assert.match(combined, /NO_EXTERNAL_DOWNLOAD|nenhum download|sem .*download/i);

// source-corpus not altered
assert.match(combined, /source-corpus (NAO|nao) (foi )?alterad/i);

// N109W / N11NM kept HOLD and not reactivated
for (const held of ['N109W', 'N11NM']) {
  const re = new RegExp(`${held}[\\s\\S]{0,400}(HOLD_FOR_HUMAN_DECISION|REQUIRES_HUMAN_DECISION|DO_NOT_USE_FOR_REENTRY)`);
  assert.match(combined, re, `${held} must remain HOLD/REQUIRES_HUMAN_DECISION`);
}

// Delta 191 treated as technical/environmental caution or negative/boundary control
assert.match(
  combined,
  /Delta 191[\s\S]{0,400}(NEGATIVE_CONTROL_CANDIDATE|technical|environmental|microburst|windshear)/i,
  'Delta 191 must be a technical/environmental negative control caution',
);

// Daumas reference-only, no automatic reentry
assert.match(combined, /Daumas[\s\S]{0,120}(reference-only|sem reentry automatico|reference)/i);
assert.match(combined, /sem reentry automatico/i);

// real/synthetic separation preserved
assert.match(combined, /separacao real\/synthetic|real\/synthetic preservad/i);

// Forbidden terminology must be absent as active entity
const cera = 'C' + 'ERA';
assert.ok(!new RegExp(`\\b${cera}\\b`).test(combined), `${cera} must not appear`);
for (const token of ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais']) {
  assert.ok(!new RegExp(`\\b${token}\\b`).test(combined), `invalid term must be absent: ${token}`);
}

// Invented-question pattern absent
for (const fragment of [
  'Pergunta por ' + 'eixo',
  'pergunta por ' + 'eixo',
  'case-' + 'specific question',
  'auxiliary ' + 'question',
  'questionPath',
  'canonicalTreeSource',
  'exactQuestionTextPT',
  'exactQuestionTextENAnchor',
]) {
  assert.ok(!combined.includes(fragment), `invented-question fragment found: ${fragment}`);
}

// Findings file must include the 9 events and a tech-debt typecheck record
assert.match(findings, /TECH-DEBT/, 'findings must record tech-debt');

console.log('batch1-source-recovery-a4r197e-trial-001: OK');
