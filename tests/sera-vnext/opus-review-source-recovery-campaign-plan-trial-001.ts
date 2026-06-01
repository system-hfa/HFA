import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/opus-campaign-a4r197');

const paths = {
  plan: path.join(baseDir, 'SERA_VNEXT_OPUS_REVIEW_AND_SOURCE_RECOVERY_CAMPAIGN_PLAN_A4R197_A_v0.2.0.md'),
  workPackages: path.join(baseDir, 'SERA_VNEXT_OPUS_WORK_PACKAGE_MATRIX_A4R197_A.csv'),
  sourcePriority: path.join(baseDir, 'SERA_VNEXT_SOURCE_RECOVERY_EVENT_PRIORITY_MATRIX_A4R197_A.csv'),
  promptContract: path.join(baseDir, 'SERA_VNEXT_OPUS_REVIEW_PROMPT_CONTRACT_A4R197_A.md'),
  forbidden: path.join(baseDir, 'SERA_VNEXT_OPUS_FORBIDDEN_OUTPUTS_REGISTER_A4R197_A.md'),
  logA: path.join(baseDir, 'SERA_A4R197_A_LOG_v0.2.0.md'),
  readinessB: path.join(baseDir, 'SERA_A4R197_B_READINESS_PLAN_v0.2.0.md'),
};

for (const p of Object.values(paths)) {
  assert.ok(existsSync(p), `required A4R197-A artifact must exist: ${p}`);
}

const plan = readFileSync(paths.plan, 'utf8');
const workPackages = readFileSync(paths.workPackages, 'utf8');
const sourcePriority = readFileSync(paths.sourcePriority, 'utf8');
const promptContract = readFileSync(paths.promptContract, 'utf8');
const forbidden = readFileSync(paths.forbidden, 'utf8');
const logA = readFileSync(paths.logA, 'utf8');
const readinessB = readFileSync(paths.readinessB, 'utf8');

const combined = [plan, workPackages, sourcePriority, promptContract, forbidden, logA, readinessB].join('\n');

assert.match(plan, /PLAN_ONLY/);
assert.match(plan, /Opus nao e autor soberano de classificacao/i);
assert.match(plan, /Source recovery nao equivale a classificacao P\/O\/A/i);
assert.match(plan, /A4R197-B nao e iniciada|A4R197-B_NOT_STARTED/i);
assert.match(plan, /nenhum evento pode passar de HOLD para READY sem fase posterior propria/i);
assert.match(plan, /real-event vs synthetic|evento real em sintetico|sintetico em evento real/i);
assert.match(plan, /Daumas.*sem reentry automatico|Daumas reentry automatico bloqueado/i);

assert.ok(
  workPackages.startsWith(
    'package_id,package_name,lane,purpose,primary_inputs,allowed_outputs,forbidden_outputs,promotion_allowed,requires_human_authorization,recommended_model,status',
  ),
  'work package matrix header must match contract',
);
for (const id of ['A4R197-B', 'A4R197-C', 'A4R197-D', 'A4R197-E', 'A4R197-F', 'A4R197-G']) {
  assert.ok(workPackages.includes(id), `work package matrix must include ${id}`);
}
for (const line of workPackages.trim().split('\n').slice(1)) {
  const cols = line.split(',');
  assert.equal(cols[7], 'false', `promotion_allowed must be false: ${cols[0]}`);
  assert.equal(cols[8], 'true', `requires_human_authorization must be true: ${cols[0]}`);
  assert.equal(cols[10], 'NOT_STARTED', `status must be NOT_STARTED: ${cols[0]}`);
}

for (const eventName of ['Colgan 3407', 'Thebaud', 'Peasmarsh', 'Vigo', 'Delta 191', 'USAir 427', '5N-BQJ', 'N109W', 'N11NM']) {
  assert.ok(sourcePriority.includes(eventName), `source recovery priority matrix must include ${eventName}`);
}
assert.match(sourcePriority, /automatic reentry|automatic READY/i);

assert.match(promptContract, /Opus deve auditar, nao promover/i);
assert.match(promptContract, /quando \.\.\./i);
assert.match(promptContract, /se e somente se houver fase autorizada/i);
assert.match(promptContract, /SOURCE_RECOVERY_SUCCESS/);
assert.match(promptContract, /REVIEW_PASS_WITH_WARNINGS/);
assert.match(promptContract, /nao deve criar releasedCode, selectedCode, finalConclusion ou downstream/i);

for (const token of [
  'selectedCode non-null',
  'releasedCode non-null',
  'finalConclusion',
  'CLASSIFIED',
  'fixture creation',
  'baseline promotion',
  'product UI API',
  'HFACS',
  'Risk/ERC',
  'ARMS/ERC',
  'recommendations',
]) {
  assert.ok(forbidden.includes(token), `forbidden output register must include ${token}`);
}

assert.match(logA, /PLAN_ONLY/);
assert.match(logA, /A4R197_B_NOT_STARTED/);
assert.match(logA, /SOURCE_RECOVERY_NOT_STARTED/);
assert.match(logA, /SYNTHETIC_NOT_STARTED/);
assert.match(readinessB, /A4R197_B_NOT_STARTED/);
assert.match(readinessB, /READINESS_ONLY/);

const wrongTerminology = 'C' + 'ERA';
assert.ok(!new RegExp(`\\b${wrongTerminology}\\b`).test(combined), `${wrongTerminology} must not appear`);

for (const token of ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais']) {
  const activePattern = new RegExp(`${token}.*(valid|entidade ativa|active entity)`, 'i');
  assert.ok(!activePattern.test(combined), `invalid term appears as active entity: ${token}`);
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

console.log('opus-review-source-recovery-campaign-plan-trial-001: OK');
