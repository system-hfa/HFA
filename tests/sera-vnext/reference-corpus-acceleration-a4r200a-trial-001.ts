import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/reference-corpus-a4r200');

const paths = {
  plan: path.join(baseDir, 'SERA_VNEXT_REFERENCE_CORPUS_ACCELERATION_PLAN_A4R200_A_v0.2.0.md'),
  routing: path.join(baseDir, 'SERA_VNEXT_BATCH_1_ROUTING_DECISION_MATRIX_A4R200_A.csv'),
  criteria: path.join(baseDir, 'SERA_VNEXT_REFERENCE_EVENT_SELECTION_CRITERIA_A4R200_A.md'),
  daumas: path.join(baseDir, 'SERA_VNEXT_DAUMAS_CALIBRATION_REFERENCE_PLAN_A4R200_A.md'),
  perplexity: path.join(baseDir, 'SERA_VNEXT_PERPLEXITY_EVENT_SEARCH_CAMPAIGN_A4R200_A.md'),
  synthetic: path.join(baseDir, 'SERA_VNEXT_SYNTHETIC_FILL_POLICY_A4R200_A.md'),
  roadmap: path.join(baseDir, 'SERA_VNEXT_REFERENCE_CORPUS_ROADMAP_A4R200_A.csv'),
  logA: path.join(baseDir, 'SERA_A4R200_A_LOG_v0.2.0.md'),
};

for (const p of Object.values(paths)) {
  assert.ok(existsSync(p), `required A4R200-A artifact must exist: ${p}`);
}

const plan = readFileSync(paths.plan, 'utf8');
const routing = readFileSync(paths.routing, 'utf8');
const criteria = readFileSync(paths.criteria, 'utf8');
const daumas = readFileSync(paths.daumas, 'utf8');
const perplexity = readFileSync(paths.perplexity, 'utf8');
const synthetic = readFileSync(paths.synthetic, 'utf8');
const roadmap = readFileSync(paths.roadmap, 'utf8');
const logA = readFileSync(paths.logA, 'utf8');

const combined = [plan, routing, criteria, daumas, perplexity, synthetic, roadmap, logA].join('\n');

assert.match(plan, /Mudanca de estrategia|mudanca de estrategia/i);
assert.match(plan, /Daumas[\s\S]{0,100}(human methodology reference|humana\/metodologica|methodology reference)/i);
assert.match(daumas, /DAUMAS_HUMAN_METHOD_REFERENCE/);
assert.match(daumas, /sem reentry automatico|NO_DAUMAS_AUTO_REENTRY/i);

assert.match(perplexity, /NOT_EXECUTED|NAO/);
assert.match(perplexity, /campanha preparada: SIM/i);
assert.match(perplexity, /Perplexity executado nesta fase: NAO/i);

for (const e of ['Colgan 3407', 'Thebaud', 'Peasmarsh', 'Vigo', 'Delta 191', 'USAir 427', 'N109W', 'N11NM', '5N-BQJ']) {
  assert.ok(routing.includes(e), `routing matrix must include event: ${e}`);
}

assert.match(synthetic, /quando usar sintetico/i);
assert.match(synthetic, /quando NAO usar sintetico|quando nao usar sintetico/i);
assert.match(synthetic, /GAP-004/);
assert.match(synthetic, /GAP-002/);

assert.match(criteria, /DISCARD_OR_REPLACE/);
assert.match(criteria, /SOURCE_CLOSURE_GATE/);

for (const forbidden of [
  'READY automatico',
  'P/O/A final',
  'selectedCode',
  'releasedCode',
  'finalConclusion',
  'CLASSIFIED',
  'fixture',
  'baseline',
  'produto',
]) {
  assert.ok(combined.includes(forbidden), `forbidden marker missing: ${forbidden}`);
}

assert.match(combined, /web search .*NAO|web search NAO executada/i);
assert.match(combined, /download externo .*NAO|NO_DOWNLOAD_EXECUTED/i);
assert.match(combined, /source recovery .*NAO|NO_SOURCE_RECOVERY_EXECUTION/i);

const cera = 'C' + 'ERA';
assert.ok(!new RegExp(`\\b${cera}\\b`).test(combined), `${cera} must be absent`);

for (const token of ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais']) {
  assert.ok(!new RegExp(`\\b${token}\\b`).test(combined), `invalid term must be absent: ${token}`);
}

for (const fragment of [
  'selectedCode non-null',
  'releasedCode non-null',
  'finalConclusion non-null',
  'CLASSIFIED active',
  'invented question',
  'Pergunta por eixo',
  'pergunta por eixo',
  'questionPath',
  'canonicalTreeSource',
  'exactQuestionTextPT',
  'exactQuestionTextENAnchor',
]) {
  assert.ok(!combined.includes(fragment), `unexpected active fragment found: ${fragment}`);
}

assert.ok(
  roadmap.startsWith('roadmap_step,objective,tool_model,inputs,outputs,forbidden_outputs,success_criteria,next_gate'),
  'roadmap csv header must match contract',
);

for (const step of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']) {
  assert.match(roadmap, new RegExp(`^${step},`, 'm'), `roadmap must include step ${step}`);
}

assert.match(logA, /web search executada: NAO/);
assert.match(logA, /Perplexity executado: NAO/);
assert.match(logA, /source recovery nova iniciada: NAO/);
assert.match(logA, /evento promovido: NAO/);
assert.match(logA, /classificacao P\/O\/A final criada: NAO/);

console.log('reference-corpus-acceleration-a4r200a-trial-001: OK');
