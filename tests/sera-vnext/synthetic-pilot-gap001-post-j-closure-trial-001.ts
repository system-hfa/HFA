import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/synthetic-pilots-a4r194');

const paths = {
  closureDoc: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_POST_J_CLOSURE_A4R194_L_v0.2.0.md'),
  decisionIntake: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_POST_J_DECISION_INTAKE_A4R194_L.csv'),
  riskRegister: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_POST_J_RISK_REGISTER_A4R194_L.csv'),
  authForms: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_POST_J_AUTHORIZATION_FORMS_A4R194_L_v0.2.0.md'),
  logL: path.join(baseDir, 'SERA_A4R194_L_LOG_v0.2.0.md'),
  readinessM: path.join(baseDir, 'SERA_A4R194_M_READINESS_PLAN_v0.2.0.md'),
};

for (const p of Object.values(paths)) {
  assert.ok(existsSync(p), `required A4R194-L artifact must exist: ${p}`);
}

const closureDoc = readFileSync(paths.closureDoc, 'utf8');
const decisionIntake = readFileSync(paths.decisionIntake, 'utf8');
const riskRegister = readFileSync(paths.riskRegister, 'utf8');
const authForms = readFileSync(paths.authForms, 'utf8');
const logL = readFileSync(paths.logL, 'utf8');
const readinessM = readFileSync(paths.readinessM, 'utf8');

const combined = [closureDoc, decisionIntake, riskRegister, authForms, logL, readinessM].join('\n');

for (const token of [
  'J_AUDIT_PASS_RECORDED',
  'CONTROLLED_DRAFT_RETAINED',
  'NO_PROMOTION',
  'NO_FIXTURE',
  'NO_BASELINE',
  'NO_PRODUCT',
  'NO_CLASSIFICATION',
]) {
  assert.match(closureDoc, new RegExp(token), `closure doc must include ${token}`);
}

assert.match(closureDoc, /J_AUDIT_PASS/, 'closure doc must record J_AUDIT_PASS');
assert.match(closureDoc, /controlled draft auditado/i, 'closure doc must retain controlled draft');
assert.match(closureDoc, /selectedCode.*null/i);
assert.match(closureDoc, /releasedCode.*null/i);
assert.match(closureDoc, /finalConclusion.*null/i);
assert.match(closureDoc, /NOT_CLASSIFIED/);
assert.match(closureDoc, /real-event narrative excluida/i);
assert.match(closureDoc, /Daumas reentry excluido/i);
assert.match(closureDoc, /PM-primary monitoring failure excluido/i);
assert.match(closureDoc, /crew collective fallback excluido/i);

const intakeLines = decisionIntake.trim().split('\n');
const header = intakeLines[0];
assert.match(header, /^option_id,option_name,status,authorized_now,requires_human_authorization,allowed_actions,blocked_actions,recommended_model,notes$/);
const intakeRows = intakeLines.slice(1);

const requiredOptionIds = [
  'L-STOP-HOLD',
  'L-SOURCE-RECOVERY',
  'L-SEQUENCE-REF-REFINEMENT',
  'L-PM-PRIMARY-SEPARATE-DRAFT',
  'L-BASELINE-DESIGN-ONLY',
  'L-BENCHMARK-DESIGN-ONLY-REVIEW',
  'L-FIXTURE-PROMOTION',
  'L-BASELINE-PROMOTION',
  'L-PRODUCT-UI-API',
];
for (const id of requiredOptionIds) {
  assert.ok(intakeRows.some((r) => r.startsWith(`${id},`)), `decision intake must include ${id}`);
}

for (const row of intakeRows) {
  const cols = row.split(',');
  const authorizedNow = cols[3];
  assert.equal(authorizedNow, 'false', `authorized_now must be false for row: ${cols[0]}`);
}

for (const id of ['L-FIXTURE-PROMOTION', 'L-BASELINE-PROMOTION', 'L-PRODUCT-UI-API']) {
  const row = intakeRows.find((r) => r.startsWith(`${id},`)) as string;
  assert.match(row, /,BLOCKED,/, `${id} must be BLOCKED`);
}

for (const riskId of [
  'RISK-001',
  'RISK-002',
  'RISK-003',
  'RISK-004',
  'RISK-005',
  'RISK-006',
  'RISK-007',
  'RISK-008',
  'RISK-009',
  'RISK-010',
  'RISK-011',
  'RISK-012',
  'RISK-013',
  'RISK-014',
  'RISK-015',
  'RISK-016',
]) {
  assert.match(riskRegister, new RegExp(`\\b${riskId}\\b`), `risk register must include ${riskId}`);
}

assert.match(riskRegister, /RR-001.*OPEN|OPEN/i);
assert.match(combined, /RR-001/);
assert.match(combined, /OPEN/);
assert.match(combined, /RR-003/);
assert.match(combined, /PARTIALLY_MITIGATED/);
assert.match(riskRegister, /sequenceRef coarse/i, 'risk register must note coarse sequenceRef');
assert.match(closureDoc, /coarse/i, 'closure doc must note coarse sequenceRef');

assert.match(authForms, /STOP_AND_HOLD/);
assert.match(authForms, /SOURCE_RECOVERY/);
assert.match(authForms, /SEQUENCE_REF_REFINEMENT/);
assert.match(authForms, /PM_PRIMARY_SEPARATE_DRAFT/);
assert.match(authForms, /BASELINE_METHODOLOGY_PACKAGE_DESIGN_ONLY/);
assert.match(authForms, /BENCHMARK_DESIGN_ONLY_REVIEW/);

assert.ok(!/## Form .*FIXTURE_PROMOTION/.test(authForms), 'no authorization form for fixture promotion');
assert.ok(!/## Form .*BASELINE_PROMOTION/.test(authForms), 'no authorization form for baseline promotion');
assert.ok(!/## Form .*PRODUCT_UI_API/.test(authForms), 'no authorization form for product UI/API');
assert.match(authForms, /Fixture promotion: NAO possui formulario/i);
assert.match(authForms, /Baseline promotion: NAO possui formulario/i);
assert.match(authForms, /Produto\/UI\/API: NAO possui formulario/i);

assert.match(logL, /A4R194_M_NOT_STARTED/);
assert.match(readinessM, /A4R194_M_NOT_STARTED/);
assert.match(readinessM, /HUMAN_DECISION_REQUIRED/);
assert.match(readinessM, /PM_PRIMARY_SEPARATE_DRAFT/);
assert.match(closureDoc, /PM-primary monitoring failure excluido|draft futuro separado/i);

const fixtureCandidate = path.join(root, 'tests/sera/fixtures/SYN-PILOT-GAP001-PFPM-DRAFT-001.json');
const baselineCandidate = path.join(root, 'tests/reports/baseline/SYN-PILOT-GAP001-PFPM-DRAFT-001.json');
assert.equal(existsSync(fixtureCandidate), false, 'synthetic pilot must not exist as fixture');
assert.equal(existsSync(baselineCandidate), false, 'synthetic pilot must not exist as baseline');

for (const forbiddenPath of [
  'tests/sera/fixtures',
  'tests/reports/baseline',
  'supabase',
  'docs/sera-vnext/source-corpus',
]) {
  const candidate = path.join(root, forbiddenPath, 'SYN-PILOT-GAP001-PFPM-DRAFT-001.json');
  assert.equal(existsSync(candidate), false, `A4R194-L must not create forbidden path artifact: ${candidate}`);
}

assert.match(combined, /\bDaumas\b/, 'Daumas spelling must be present');
const invalidEntityTokens = ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais'];
for (const token of invalidEntityTokens) {
  assert.ok(!combined.includes(token), `invalid entity token found: ${token}`);
}

const wrongTerminology = 'C' + 'ERA';
assert.ok(!new RegExp(`\\b${wrongTerminology}\\b`).test(combined), `wrong terminology ${wrongTerminology} must not appear`);

const inventedQuestionFragments = [
  'P' + '-1',
  'P' + '-2',
  'O' + '-1',
  'O' + '-2',
  'A' + '-1',
  'A' + '-2',
  'Pergunta por ' + 'eixo',
  'pergunta por ' + 'eixo',
  'case-' + 'specific question',
  'auxiliary ' + 'question',
];
for (const fragment of inventedQuestionFragments) {
  assert.ok(!combined.includes(fragment), `invented-question fragment found: ${fragment}`);
}

const openedLockPatterns = [
  'selectedCodeAllowed' + '=true',
  'releasedCodeAllowed' + '=true',
  'classificationAllowed' + '=true',
  'poaClosureAllowed' + '=true',
  'downstreamAllowed' + '=true',
  'finalConclusionAllowed' + '=true',
  'fixtureAllowed' + '=true',
  'baselineAllowed' + '=true',
  'productAllowed' + '=true',
];
for (const pattern of openedLockPatterns) {
  assert.ok(!combined.includes(pattern), `lock must not be opened: ${pattern}`);
}

console.log('synthetic-pilot-gap001-post-j-closure-trial-001: OK');
