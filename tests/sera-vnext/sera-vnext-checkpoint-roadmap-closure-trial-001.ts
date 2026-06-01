import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/checkpoint-a4r196');

const paths = {
  checkpointDoc: path.join(baseDir, 'SERA_VNEXT_CHECKPOINT_AND_ROADMAP_CLOSURE_A4R196_A_v0.2.0.md'),
  roadmapMatrix: path.join(baseDir, 'SERA_VNEXT_ROADMAP_MATRIX_A4R196_A.csv'),
  stateMatrix: path.join(baseDir, 'SERA_VNEXT_CHECKPOINT_STATE_MATRIX_A4R196_A.csv'),
  openRisks: path.join(baseDir, 'SERA_VNEXT_OPEN_RISKS_REGISTER_A4R196_A.csv'),
  authorizationIndex: path.join(baseDir, 'SERA_VNEXT_FUTURE_AUTHORIZATION_INDEX_A4R196_A.md'),
  logA: path.join(baseDir, 'SERA_A4R196_A_LOG_v0.2.0.md'),
  readinessB: path.join(baseDir, 'SERA_A4R196_B_READINESS_PLAN_v0.2.0.md'),
};

for (const p of Object.values(paths)) {
  assert.ok(existsSync(p), `required A4R196-A artifact must exist: ${p}`);
}

const checkpointDoc = readFileSync(paths.checkpointDoc, 'utf8');
const roadmapMatrix = readFileSync(paths.roadmapMatrix, 'utf8');
const stateMatrix = readFileSync(paths.stateMatrix, 'utf8');
const openRisks = readFileSync(paths.openRisks, 'utf8');
const authorizationIndex = readFileSync(paths.authorizationIndex, 'utf8');
const logA = readFileSync(paths.logA, 'utf8');
const readinessB = readFileSync(paths.readinessB, 'utf8');

const combined = [
  checkpointDoc,
  roadmapMatrix,
  stateMatrix,
  openRisks,
  authorizationIndex,
  logA,
  readinessB,
].join('\n');

assert.match(checkpointDoc, /CONTROLLED_DRAFT_RETAINED/);
assert.match(checkpointDoc, /NO_PROMOTION/);
assert.match(checkpointDoc, /J_AUDIT_PASS/);
assert.match(checkpointDoc, /Produto\/UI\/API continuam bloqueados|Produto\/UI\/API: bloqueado/i);
assert.match(checkpointDoc, /Fixture\/baseline continuam bloqueados|Fixture\/baseline: bloqueado/i);
assert.match(checkpointDoc, /selected\/released\/final: bloqueado/i);
assert.match(checkpointDoc, /RR-001.*OPEN/i);
assert.match(checkpointDoc, /RR-003.*PARTIALLY_MITIGATED/i);
assert.match(checkpointDoc, /sequenceRef.*coarse/i);
assert.match(checkpointDoc, /PM-primary.*nao iniciado|PM-primary.*nao coberto/i);
assert.match(checkpointDoc, /source recovery pendente/i);
assert.match(checkpointDoc, /GAP-001: controlled draft auditado/i);
assert.match(checkpointDoc, /GAP-002\.\.GAP-010: design\/gap only, sem materializacao/i);
assert.match(checkpointDoc, /Todas as proximas rotas exigem decisao humana explicita/i);
assert.match(checkpointDoc, /A4R194-M nao foi iniciado/i);
assert.match(checkpointDoc, /A4R196-B nao foi iniciado/i);

assert.ok(
  roadmapMatrix.startsWith(
    'route_id,route_name,current_status,allowed_now,requires_human_authorization,recommended_model,risk_level,methodological_value,blocked_outputs,next_gate,notes',
  ),
  'roadmap matrix header must match required contract',
);
for (const route of [
  'STOP_AND_HOLD',
  'SOURCE_RECOVERY',
  'SEQUENCE_REF_REFINEMENT',
  'PM_PRIMARY_SEPARATE_DRAFT',
  'BASELINE_METHODOLOGY_PACKAGE_DESIGN_ONLY',
  'BENCHMARK_DESIGN_ONLY_REVIEW',
  'SECOND_SYNTHETIC',
  'PRODUCT_UI_API',
  'FIXTURE_PROMOTION',
  'BASELINE_PROMOTION',
]) {
  assert.ok(roadmapMatrix.includes(route), `roadmap matrix must include ${route}`);
}

assert.ok(
  stateMatrix.startsWith('domain,status,current_artifact,validated_by,open_risk,next_allowed_action,blocked_action,notes'),
  'state matrix header must match required contract',
);
for (const domain of [
  'Escape point enforcement',
  'Intake bridge',
  'Real-event reentry',
  'Daumas lane',
  'Synthetic gap design',
  'GAP-001 PF/PM controlled draft',
  'Event HOLD pool',
  'Product integration',
  'Fixture/baseline',
  'Downstream risk layer',
]) {
  assert.ok(stateMatrix.includes(domain), `state matrix must include domain ${domain}`);
}

assert.ok(
  openRisks.startsWith(
    'risk_id,risk_name,status,severity,current_controls,next_possible_action,blocking_for_product,blocking_for_baseline,notes',
  ),
  'open risks header must match required contract',
);
for (const risk of [
  'RR-001',
  'RR-003',
  'sequenceRef_coarse',
  'pm_primary_not_covered',
  'source_recovery_pending',
  'synthetic_as_real_confusion',
  'fixture_leakage',
  'baseline_leakage',
  'product_leakage',
  'downstream_leakage',
  'uncontrolled_phase_proliferation',
]) {
  assert.ok(openRisks.includes(risk), `open risks must include ${risk}`);
}

assert.match(authorizationIndex, /Nao ha autorizacao nesta fase/i);
assert.match(authorizationIndex, /Produto\/UI\/API nao possui autorizacao disponivel/i);
assert.match(authorizationIndex, /Fixture\/baseline promotion nao possui autorizacao disponivel/i);
assert.match(authorizationIndex, /Todas as futuras autorizacoes exigem texto explicito do usuario/i);

assert.match(logA, /CHECKPOINT_CLOSURE_ONLY/);
assert.match(logA, /A4R194_M_NOT_STARTED/);
assert.match(logA, /A4R196_B_NOT_STARTED/);
assert.match(readinessB, /HUMAN_DECISION_REQUIRED/);
assert.match(readinessB, /A4R196_B_NOT_STARTED/);
assert.match(readinessB, /A4R196-A nao inicia A4R196-B automaticamente/i);

const wrongTerminology = 'C' + 'ERA';
assert.ok(!new RegExp(`\\b${wrongTerminology}\\b`).test(combined), `${wrongTerminology} must not appear`);

for (const token of ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais']) {
  assert.ok(!combined.includes(token), `invalid Daumas token found: ${token}`);
}

for (const fragment of [
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
]) {
  assert.ok(!combined.includes(fragment), `invented-question fragment found: ${fragment}`);
}

for (const pattern of [
  'selectedCodeAllowed' + '=true',
  'releasedCodeAllowed' + '=true',
  'classificationAllowed' + '=true',
  'poaClosureAllowed' + '=true',
  'downstreamAllowed' + '=true',
  'finalConclusionAllowed' + '=true',
  'fixtureAllowed' + '=true',
  'baselineAllowed' + '=true',
  'productAllowed' + '=true',
]) {
  assert.ok(!combined.includes(pattern), `lock must not open: ${pattern}`);
}

console.log('sera-vnext-checkpoint-roadmap-closure-trial-001: OK');
