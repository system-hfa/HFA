import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/methodology-consolidation-a4r195');

const paths = {
  decisionPackage: path.join(baseDir, 'SERA_VNEXT_HUMAN_DECISION_PACKAGE_A4R195_C_v0.2.0.md'),
  comparisonMatrix: path.join(baseDir, 'SERA_VNEXT_NEXT_ROUTE_COMPARISON_MATRIX_A4R195_C.csv'),
  authorizationForms: path.join(baseDir, 'SERA_VNEXT_AUTHORIZATION_FORMS_A4R195_C_v0.2.0.md'),
  intakeRegister: path.join(baseDir, 'SERA_VNEXT_DECISION_INTAKE_REGISTER_A4R195_C.csv'),
  recommendationMemo: path.join(baseDir, 'SERA_VNEXT_RECOMMENDATION_MEMO_A4R195_C_v0.2.0.md'),
  logC: path.join(baseDir, 'SERA_A4R195_C_LOG_v0.2.0.md'),
  readinessD: path.join(baseDir, 'SERA_A4R195_D_READINESS_PLAN_v0.2.0.md'),
};

for (const p of Object.values(paths)) {
  assert.ok(existsSync(p), `required A4R195-C artifact must exist: ${p}`);
}

const decisionPackage = readFileSync(paths.decisionPackage, 'utf8');
const comparisonMatrix = readFileSync(paths.comparisonMatrix, 'utf8');
const authorizationForms = readFileSync(paths.authorizationForms, 'utf8');
const intakeRegister = readFileSync(paths.intakeRegister, 'utf8');
const recommendationMemo = readFileSync(paths.recommendationMemo, 'utf8');
const logC = readFileSync(paths.logC, 'utf8');
const readinessD = readFileSync(paths.readinessD, 'utf8');

// All seven routes must be listed in the decision package
for (const route of [
  'STOP_AND_HOLD',
  'A4R194-J',
  'SOURCE_RECOVERY',
  'BASELINE',
  'SECOND_SYNTHETIC',
  'PRODUCT_UI_API',
  'INDEPENDENT_OPUS_AUDIT',
]) {
  assert.ok(decisionPackage.includes(route), `decision package must list route: ${route}`);
}

// Comparison matrix header + all route rows
assert.ok(
  comparisonMatrix.startsWith(
    'route_id,route_name,status,allowed_now,requires_human_authorization,risk_level,methodological_value,cost_level,recommended_model,blocked_outputs,next_phase_if_selected,notes',
  ),
  'comparison matrix header must match contract',
);
for (const rid of ['ROUTE-0', 'ROUTE-1', 'ROUTE-2', 'ROUTE-3', 'ROUTE-4', 'ROUTE-5', 'ROUTE-6']) {
  assert.ok(comparisonMatrix.includes(rid), `comparison matrix must include row: ${rid}`);
}

// Intake register header + all intake rows, all authorized_now=false
assert.ok(
  intakeRegister.startsWith(
    'intake_id,decision_option,current_status,authorization_text_required,authorized_now,next_action_if_authorized,blocked_even_if_authorized,notes',
  ),
  'intake register header must match contract',
);
const intakeLines = intakeRegister.trim().split('\n').slice(1);
assert.equal(intakeLines.length, 8, 'intake register must have 8 option rows');
for (const line of intakeLines) {
  const cols = line.split(',');
  assert.equal(cols[4], 'false', `intake option must be authorized_now=false: ${cols[0]}`);
}
for (const opt of [
  'STOP_AND_HOLD',
  'A4R194-J',
  'SOURCE_RECOVERY',
  'BASELINE_DESIGN_ONLY',
  'SECOND_SYNTHETIC',
  'INDEPENDENT_AUDIT',
  'PRODUCT_UI_API_BLOCKED',
  'FIXTURE_BASELINE_BLOCKED',
]) {
  assert.ok(intakeRegister.includes(opt), `intake register must include option: ${opt}`);
}

// A4R194-J not authorized automatically
assert.match(decisionPackage, /A4R194-J:\s*NAO iniciado/i, 'decision package must state A4R194-J not started');
assert.ok(
  /Start_A4R194_J|A4R194-J/.test(decisionPackage) && decisionPackage.includes('authorized_now=false'),
  'decision package must keep all options authorized_now=false',
);

// Product/UI/API blocked; no authorization form
assert.match(decisionPackage, /Produto\/UI\/API:\s*BLOQUEADO/i, 'decision package must keep product blocked');
assert.match(
  authorizationForms,
  /Produto\/UI\/API: NAO possui formulario de autorizacao nesta fase/i,
  'authorization forms must deny a product authorization form',
);
assert.match(
  authorizationForms,
  /Promocao de fixture\/baseline: NAO possui formulario de autorizacao nesta fase/i,
  'authorization forms must deny a fixture/baseline authorization form',
);

// Fixture/baseline blocked
assert.match(decisionPackage, /Fixture\/baseline:\s*BLOQUEADO/i, 'decision package must keep fixture/baseline blocked');

// Source recovery allowed only as option
assert.match(decisionPackage, /Source recovery:\s*PERMITIDO/i, 'decision package must mark source recovery permitted');
assert.ok(comparisonMatrix.includes('SOURCE_RECOVERY_ADDITIONAL'), 'comparison matrix must include source recovery route');

// Second synthetic blocked until GAP-001 decision
assert.match(
  decisionPackage,
  /Segundo sintetico:\s*BLOQUEADO ate decisao/i,
  'decision package must keep second synthetic blocked until GAP-001 decision',
);
assert.ok(
  intakeRegister.includes('blocked_until_gap001_decision'),
  'intake register must keep second synthetic blocked until GAP-001 decision',
);

// Daumas reference-only
assert.match(decisionPackage, /\bDaumas\b/, 'Daumas spelling must be present');
assert.match(decisionPackage, /Daumas.*reference-only|methodology\/reference-only/i, 'Daumas must be reference-only');

// RR-001 OPEN, RR-003 PARTIALLY_MITIGATED
assert.match(decisionPackage, /RR-001:\s*OPEN/, 'decision package must keep RR-001 open');
assert.match(decisionPackage, /RR-003:\s*PARTIALLY_MITIGATED/, 'decision package must keep RR-003 partial');

// Exact A4R194-J authorization text present in package and forms
const j_auth_text =
  'Autorizo A4R194-J - controlled materialization draft minimo do synthetic pilot GAP-001';
assert.ok(decisionPackage.includes(j_auth_text), 'decision package must include exact A4R194-J authorization text');
assert.ok(authorizationForms.includes(j_auth_text), 'authorization forms must include exact A4R194-J authorization text');

// Log + readiness D
assert.match(logC, /decision intake/i, 'log C must mark decision intake');
assert.match(readinessD, /DEPOIS de uma resposta humana explicita/i, 'readiness D must require human response first');
assert.match(readinessD, /A4R195-C nao inicia\s*\n?\s*A4R195-D/i, 'readiness D must state C does not start D');

const combined = [
  decisionPackage,
  comparisonMatrix,
  authorizationForms,
  intakeRegister,
  recommendationMemo,
  logC,
  readinessD,
].join('\n');

// Entity / terminology / invented-question / lock guards
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
  'finalConclusionAllowed' + '=true',
  'poaClosureAllowed' + '=true',
  'downstreamAllowed' + '=true',
];
for (const pattern of openedLockPatterns) {
  assert.ok(!combined.includes(pattern), `lock must not be opened: ${pattern}`);
}

console.log('methodology-human-decision-intake-trial-001: OK');
