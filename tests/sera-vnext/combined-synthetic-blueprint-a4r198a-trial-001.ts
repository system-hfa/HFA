import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/opus-campaign-a4r198/combined-blueprint-a');

const paths = {
  blueprint: path.join(baseDir, 'SERA_VNEXT_COMBINED_SYNTHETIC_BLUEPRINT_A4R198_A_v0.2.0.md'),
  requirements: path.join(baseDir, 'SERA_VNEXT_COMBINED_BLUEPRINT_REQUIREMENTS_A4R198_A.csv'),
  negativeChecks: path.join(baseDir, 'SERA_VNEXT_COMBINED_BLUEPRINT_NEGATIVE_CHECKS_A4R198_A.csv'),
  rejection: path.join(baseDir, 'SERA_VNEXT_COMBINED_BLUEPRINT_REJECTION_MATRIX_A4R198_A.csv'),
  nextDecision: path.join(baseDir, 'SERA_VNEXT_COMBINED_BLUEPRINT_NEXT_PHASE_DECISION_A4R198_A.md'),
  logA: path.join(baseDir, 'SERA_A4R198_A_LOG_v0.2.0.md'),
};

for (const p of Object.values(paths)) {
  assert.ok(existsSync(p), `required A4R198-A artifact must exist: ${p}`);
}

const blueprint = readFileSync(paths.blueprint, 'utf8');
const requirements = readFileSync(paths.requirements, 'utf8');
const negativeChecks = readFileSync(paths.negativeChecks, 'utf8');
const rejection = readFileSync(paths.rejection, 'utf8');
const nextDecision = readFileSync(paths.nextDecision, 'utf8');
const logA = readFileSync(paths.logA, 'utf8');

const combined = [blueprint, requirements, negativeChecks, rejection, nextDecision, logA].join('\n');

assert.match(blueprint, /GAP-004/);
assert.match(blueprint, /GAP-002/);
assert.match(blueprint, /BLUEPRINT_ONLY/);
assert.match(blueprint, /FUTURE_MATERIALIZATION_REQUIRES_AUTHORIZATION/);
assert.match(blueprint, /NO_SYNTHETIC_CASE_CREATED/);
assert.match(blueprint, /NO_JSON_CASE_CREATED/);
assert.match(blueprint, /A4R197_E_NOT_STARTED/);
assert.match(blueprint, /NO_SOURCE_RECOVERY/);
assert.match(blueprint, /F-002\/F-003/);
assert.match(blueprint, /Source recovery nao foi iniciada|source recovery nao foi iniciada/i);

for (const token of [
  'ACTOR_A',
  'OPERATIONAL_CONTEXT_X',
  'SAFE_OPERATION_BOUNDARY_Y',
  'ESCAPE_POINT_T',
  'POST_ESCAPE_CONSEQUENCE_Z',
  'OUTCOME_SIGNAL_Q',
  'DIRECT_ACTOR_A',
  'MONITORING_ACTOR_B',
  'SUPPORTING_ACTOR_C',
  'CONTEXT_ACTOR_D',
  'DOWNSTREAM_ACTOR_E',
]) {
  assert.ok(blueprint.includes(token), `blueprint must include abstract placeholder ${token}`);
}

assert.ok(
  requirements.startsWith('requirement_id,gap_id,requirement_type,requirement_text,rationale,future_materialization_required,blocks_fixture_promotion,status'),
  'requirements matrix header must match contract',
);
assert.ok(
  negativeChecks.startsWith('check_id,gap_id,check_name,prohibited_pattern,rejection_condition,rationale,status'),
  'negative checks matrix header must match contract',
);
assert.ok(
  rejection.startsWith('rejection_id,gap_id,rejection_trigger,why_rejected,methodological_risk,future_fix_needed,status'),
  'rejection matrix header must match contract',
);

assert.match(nextDecision, /GAP-004 precede GAP-002|GAP-004 -> GAP-002/);
assert.match(nextDecision, /A4R197-E.*bloquead|A4R197-E_NOT_STARTED/i);
assert.match(nextDecision, /F-002/);
assert.match(nextDecision, /F-003/);

assert.match(logA, /NO_SOURCE_RECOVERY/);
assert.match(logA, /NO_NEW_SYNTHETIC/);
assert.match(logA, /NO_MATERIALIZATION/);
assert.match(logA, /A4R197-E nao iniciada/i);
assert.match(logA, /JSON de caso nao criado/i);
assert.match(logA, /narrativa sintetica completa nao criada/i);

const wrongTerminology = 'C' + 'ERA';
assert.ok(!new RegExp(`\\b${wrongTerminology}\\b`).test(combined), `${wrongTerminology} must not appear`);

for (const token of ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais']) {
  const activePattern = new RegExp(`${token}.*(entidade ativa|active entity|valid)`, 'i');
  assert.ok(!activePattern.test(combined), `invalid token appears as active entity: ${token}`);
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

for (const opened of [
  'selectedCodeAllowed' + '=true',
  'releasedCodeAllowed' + '=true',
  'classificationAllowed' + '=true',
  'finalConclusionAllowed' + '=true',
  'fixtureAllowed' + '=true',
  'baselineAllowed' + '=true',
  'productAllowed' + '=true',
  'downstreamAllowed' + '=true',
]) {
  assert.ok(!combined.includes(opened), `lock opened unexpectedly: ${opened}`);
}

// Blueprints must stay abstract and avoid realistic full-case naming cues.
for (const realisticToken of [
  'American',
  'Delta',
  'USAir',
  'Colgan',
  'Asiana',
  'Comair',
  'United',
  'Vigo',
  'Thebaud',
  'Peasmarsh',
  '5N-BQJ',
  'N109W',
  'N11NM',
]) {
  assert.ok(!blueprint.includes(realisticToken), `blueprint must remain abstract: found ${realisticToken}`);
}

console.log('combined-synthetic-blueprint-a4r198a-trial-001: OK');
