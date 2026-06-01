import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/synthetic-pilots-a4r194');

const paths = {
  authorizationI: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_CONTROLLED_MATERIALIZATION_AUTHORIZATION_A4R194_I_v0.2.0.md'),
  riskRegisterI: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_PRE_MATERIALIZATION_RISK_REGISTER_A4R194_I_v0.2.0.md'),
  jScopeContract: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_A4R194_J_SCOPE_CONTRACT_v0.2.0.md'),
  authorizationMatrixI: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_AUTHORIZATION_MATRIX_A4R194_I.csv'),
  logI: path.join(baseDir, 'SERA_A4R194_I_LOG_v0.2.0.md'),
  readinessJ: path.join(baseDir, 'SERA_A4R194_J_READINESS_PLAN_v0.2.0.md'),
  draftJsonE: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_CASE_DRAFT_DESIGN_A4R194_E.json'),
};

for (const p of Object.values(paths)) {
  assert.ok(existsSync(p), `required A4R194-I artifact must exist: ${p}`);
}

const authorization = readFileSync(paths.authorizationI, 'utf8');
const riskRegister = readFileSync(paths.riskRegisterI, 'utf8');
const jScope = readFileSync(paths.jScopeContract, 'utf8');
const authorizationMatrix = readFileSync(paths.authorizationMatrixI, 'utf8');
const logI = readFileSync(paths.logI, 'utf8');
const readinessJ = readFileSync(paths.readinessJ, 'utf8');
const draft = JSON.parse(readFileSync(paths.draftJsonE, 'utf8')) as {
  fixtureAllowed: boolean;
  baselineAllowed: boolean;
  productAllowed: boolean;
  classificationAllowed: boolean;
  pilotBoundaryDecision: string;
  poaClassification: { status: string; selectedCode: null; releasedCode: null; finalConclusion: null };
};

// Authorization document core tokens
assert.match(authorization, /CONTROLLED_MATERIALIZATION_DRAFT_AUTHORIZATION_ONLY/, 'authorization must declare its status');
assert.match(
  authorization,
  /HUMAN_AUTHORIZATION_FOR_CONTROLLED_MATERIALIZATION_DRAFT_ONLY/,
  'authorization must record human authorization',
);
assert.match(authorization, /PF_PRIMARY_WITH_PM_CONSEQUENCE_BOUNDARY/, 'authorization must confirm PF-primary boundary');
assert.match(
  authorization,
  /PM_PRIMARY_MONITORING_FAILURE_REQUIRES_SEPARATE_DRAFT/,
  'authorization must require separate draft for PM-primary',
);
assert.match(authorization, /A4R194-J_CONTROLLED_MATERIALIZATION_DRAFT/, 'authorization must name the next allowed phase');
assert.match(authorization, /RR-001.*OPEN/, 'authorization must keep RR-001 open');
assert.match(authorization, /RR-003.*PARTIALLY_MITIGATED/, 'authorization must keep RR-003 partial');
for (const prohibition of ['no fixture', 'no baseline', 'no product', 'no selectedCode', 'no releasedCode', 'no finalConclusion']) {
  assert.ok(authorization.includes(prohibition), `authorization must list prohibition: ${prohibition}`);
}

// Risk register
assert.match(riskRegister, /RR-001.*OPEN/, 'risk register must keep RR-001 open');
assert.match(riskRegister, /RR-003.*PARTIALLY_MITIGATED/, 'risk register must keep RR-003 partial');
for (const risk of [
  'synthetic-as-real',
  'hidden crew collective fallback',
  'warning-as-anchor',
  'consequence-as-cause',
  'premature fixture conversion',
  'premature baseline conversion',
  'product leakage',
]) {
  assert.ok(riskRegister.includes(risk), `risk register must list risk: ${risk}`);
}

// J scope contract: permissions and prohibitions
assert.match(jScope, /J PODE criar um controlled materialization draft/i, 'J scope must allow minimal materialization draft');
assert.match(jScope, /J NAO pode criar fixture/i, 'J scope must forbid fixture');
assert.match(jScope, /J NAO pode promover nada a baseline/i, 'J scope must forbid baseline');
assert.match(jScope, /J NAO pode abrir produto/i, 'J scope must forbid product');
assert.match(jScope, /J DEVE manter selectedCode null ou ausente/i, 'J scope must keep selectedCode null/absent');
assert.match(jScope, /J DEVE manter releasedCode null ou ausente/i, 'J scope must keep releasedCode null/absent');
assert.match(jScope, /J DEVE manter finalConclusion null ou ausente/i, 'J scope must keep finalConclusion null/absent');
assert.match(jScope, /J DEVE manter `poaClassification` em `NOT_CLASSIFIED`/i, 'J scope must keep NOT_CLASSIFIED');
assert.match(jScope, /J DEVE preservar o boundary `PF_PRIMARY_WITH_PM_CONSEQUENCE_BOUNDARY`/i, 'J scope must preserve boundary');
assert.match(jScope, /PM_PRIMARY_MONITORING_FAILURE` bloqueado/i, 'J scope must keep PM-primary blocked');
assert.match(jScope, /J DEVE incluir trial proprio/i, 'J scope must require own trial');
assert.match(jScope, /auditoria posterior/i, 'J scope must require later audit');

// Authorization matrix
assert.ok(
  authorizationMatrix.startsWith(
    'authorization_item,status,required_value,current_value,blocking_if_failed,next_action,notes',
  ),
  'authorization matrix header must match contract',
);
for (const item of [
  'human_authorization_present',
  'final_audit_h_pass',
  'no_blocker_high_medium',
  'pf_primary_boundary',
  'pm_primary_separate_draft',
  'no_fixture',
  'no_baseline',
  'product_blocked',
  'selectedCode_null_or_absent',
  'releasedCode_null_or_absent',
  'finalConclusion_null_or_absent',
  'rr001_open_acknowledged',
  'rr003_partial_acknowledged',
  'a4r194_j_limited_scope',
]) {
  assert.ok(authorizationMatrix.includes(item), `authorization matrix must include item: ${item}`);
}

// Log + readiness J
assert.match(logI, /CONTROLLED_MATERIALIZATION_DRAFT_AUTHORIZATION_ONLY/, 'log I must declare authorization-only status');
assert.match(logI, /NO_MATERIALIZATION/, 'log I must declare no materialization');
assert.match(readinessJ, /nova confirmacao humana explicita/i, 'readiness J must require new explicit human confirmation');
assert.match(readinessJ, /Fixture continua bloqueado/i, 'readiness J must keep fixture blocked');
assert.match(readinessJ, /Baseline continua bloqueado/i, 'readiness J must keep baseline blocked');
assert.match(readinessJ, /Produto\/UI\/API continua bloqueado/i, 'readiness J must keep product blocked');

// J must NOT be authorized automatically
assert.match(authorization, /materializacao nunca e automatica/i, 'authorization must deny automatic materialization');
assert.match(authorization, /A4R194-I nao inicia A4R194-J/i, 'authorization must state I does not start J');

// Draft E invariants preserved
assert.equal(draft.fixtureAllowed, false);
assert.equal(draft.baselineAllowed, false);
assert.equal(draft.productAllowed, false);
assert.equal(draft.classificationAllowed, false);
assert.equal(draft.pilotBoundaryDecision, 'PF_PRIMARY_WITH_PM_CONSEQUENCE_BOUNDARY');
assert.equal(draft.poaClassification.status, 'NOT_CLASSIFIED');
assert.equal(draft.poaClassification.selectedCode, null);
assert.equal(draft.poaClassification.releasedCode, null);
assert.equal(draft.poaClassification.finalConclusion, null);

// Synthetic pilot must not exist as fixture or baseline
const fixtureCandidate = path.join(root, 'tests/sera/fixtures/SYN-PILOT-GAP001-PFPM-DRAFT-001.json');
const baselineCandidate = path.join(root, 'tests/reports/baseline/SYN-PILOT-GAP001-PFPM-DRAFT-001.json');
assert.equal(existsSync(fixtureCandidate), false, 'synthetic pilot must not exist as fixture');
assert.equal(existsSync(baselineCandidate), false, 'synthetic pilot must not exist as baseline');

const combined = [authorization, riskRegister, jScope, authorizationMatrix, logI, readinessJ].join('\n');

// Entity / terminology / invented-question guards
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
  'finalConclusionAllowed' + '=true',
  'poaClosureAllowed' + '=true',
  'downstreamAllowed' + '=true',
];
for (const pattern of openedLockPatterns) {
  assert.ok(!combined.includes(pattern), `lock must not be opened: ${pattern}`);
}

console.log('synthetic-pilot-gap001-controlled-materialization-authorization-trial-001: OK');
