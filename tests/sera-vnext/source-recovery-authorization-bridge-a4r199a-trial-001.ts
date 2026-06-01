import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/source-recovery-bridge-a4r199');

const paths = {
  bridge: path.join(baseDir, 'SERA_VNEXT_SOURCE_RECOVERY_AUTHORIZATION_BRIDGE_A4R199_A_v0.2.0.md'),
  gate: path.join(baseDir, 'SERA_VNEXT_SOURCE_CLOSURE_GATE_A4R199_A.md'),
  batch: path.join(baseDir, 'SERA_VNEXT_SOURCE_RECOVERY_BATCH_1_READINESS_MATRIX_A4R199_A.csv'),
  contract: path.join(baseDir, 'SERA_VNEXT_A4R197_E_FUTURE_EXECUTION_CONTRACT_A4R199_A.md'),
  decision: path.join(baseDir, 'SERA_VNEXT_SOURCE_RECOVERY_NEXT_PHASE_DECISION_A4R199_A.md'),
  logA: path.join(baseDir, 'SERA_A4R199_A_LOG_v0.2.0.md'),
};

for (const p of Object.values(paths)) {
  assert.ok(existsSync(p), `required A4R199-A artifact must exist: ${p}`);
}

const bridge = readFileSync(paths.bridge, 'utf8');
const gate = readFileSync(paths.gate, 'utf8');
const batch = readFileSync(paths.batch, 'utf8');
const contract = readFileSync(paths.contract, 'utf8');
const decision = readFileSync(paths.decision, 'utf8');
const logA = readFileSync(paths.logA, 'utf8');

const combined = [bridge, gate, batch, contract, decision, logA].join('\n');

assert.match(
  bridge,
  /F-002[\s\S]*RESOLVED_FOR_AUTHORIZATION_BRIDGE|RESOLVED_FOR_AUTHORIZATION_BRIDGE[\s\S]*F-002/,
);
assert.match(
  bridge,
  /F-003[\s\S]*RESOLVED_FOR_SOURCE_CLOSURE_GATE_INHERITANCE|RESOLVED_FOR_SOURCE_CLOSURE_GATE_INHERITANCE[\s\S]*F-003/,
);
assert.match(combined, /ROUTE-1/);
assert.match(combined, /SOURCE_CLOSURE_GATE/);
assert.match(combined, /A4R197-E_NOT_STARTED|A4R197_E_NOT_STARTED/);
assert.match(combined, /SOURCE_RECOVERY_NOT_STARTED|source recovery nao foi iniciada/i);

assert.ok(
  batch.startsWith('batch_item_id,event_name,related_gap_ids,inclusion_reason,recovery_question,source_need,minimum_success_criteria,risk_if_used_too_early,forbidden_next_actions,future_allowed_action,status'),
  'batch matrix header must match contract',
);

for (const eventName of ['Colgan 3407', 'Thebaud', 'Peasmarsh', 'Vigo', 'Delta 191', 'USAir 427', 'N109W', 'N11NM', '5N-BQJ']) {
  assert.ok(batch.includes(eventName), `batch 1 must include event: ${eventName}`);
}

for (const verdict of [
  'SOURCE_RECOVERY_SUCCESS',
  'SOURCE_RECOVERY_PARTIAL',
  'SOURCE_STILL_INSUFFICIENT',
  'NEGATIVE_CONTROL_CANDIDATE',
  'BOUNDARY_CASE_ONLY',
  'DO_NOT_USE_FOR_REENTRY',
  'REQUIRES_HUMAN_DECISION',
]) {
  assert.ok(combined.includes(verdict), `allowed verdict missing: ${verdict}`);
}

for (const forbidden of [
  'P/O/A final',
  'READY automatico',
  'selectedCode',
  'releasedCode',
  'finalConclusion',
  'CLASSIFIED',
  'fixture',
  'baseline',
  'produto',
]) {
  assert.ok(combined.includes(forbidden), `forbidden output marker missing: ${forbidden}`);
}

assert.match(combined, /Daumas.*sem reentry automatico/i);
assert.match(combined, /separacao real\/synthetic|sem blending real\/synthetic/i);

const wrongTerminology = 'C' + 'ERA';
assert.ok(!new RegExp(`\\b${wrongTerminology}\\b`).test(combined), `${wrongTerminology} must not appear`);

for (const token of ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais']) {
  assert.ok(!new RegExp(`\\b${token}\\b`).test(combined), `invalid term must be absent: ${token}`);
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
  'questionPath',
  'canonicalTreeSource',
  'exactQuestionTextPT',
  'exactQuestionTextENAnchor',
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
  'READY_ALLOWED' + '=true',
]) {
  assert.ok(!combined.includes(opened), `lock opened unexpectedly: ${opened}`);
}

console.log('source-recovery-authorization-bridge-a4r199a-trial-001: OK');
