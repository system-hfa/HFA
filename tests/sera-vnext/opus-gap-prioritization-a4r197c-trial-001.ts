import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const dir = path.join(root, 'docs/sera-vnext/opus-campaign-a4r197/gap-prioritization-c');

const paths = {
  report: path.join(dir, 'SERA_VNEXT_OPUS_GAP_PRIORITIZATION_A4R197_C_REPORT_v0.2.0.md'),
  matrix: path.join(dir, 'SERA_VNEXT_OPUS_GAP_PRIORITIZATION_MATRIX_A4R197_C.csv'),
  findings: path.join(dir, 'SERA_VNEXT_OPUS_GAP_PRIORITIZATION_FINDINGS_A4R197_C.csv'),
  decision: path.join(dir, 'SERA_VNEXT_OPUS_GAP_PRIORITIZATION_NEXT_PHASE_DECISION_A4R197_C.md'),
  log: path.join(dir, 'SERA_A4R197_C_LOG_v0.2.0.md'),
};

for (const p of Object.values(paths)) {
  assert.ok(existsSync(p), `required A4R197-C artifact must exist: ${p}`);
}

const report = readFileSync(paths.report, 'utf8');
const matrix = readFileSync(paths.matrix, 'utf8');
const findings = readFileSync(paths.findings, 'utf8');
const decision = readFileSync(paths.decision, 'utf8');
const log = readFileSync(paths.log, 'utf8');
const combined = [report, matrix, findings, decision, log].join('\n');

// 1. Allowed verdict present in report.
const allowedVerdicts = [
  'REVIEW_PASS',
  'REVIEW_PASS_WITH_WARNINGS',
  'REVIEW_HOLD',
  'REVIEW_BLOCKED',
  'REQUIRES_HUMAN_DECISION',
];
assert.ok(allowedVerdicts.some((v) => report.includes(v)), 'report must contain an allowed verdict');

// 2. Matrix header contract.
assert.ok(
  matrix.startsWith(
    'gap_id,gap_name,current_status,methodological_value,ambiguity_risk,recommended_lane,recommended_priority,minimum_next_gate,source_recovery_needed,synthetic_design_needed,human_decision_needed,risks_if_advanced_now,forbidden_next_actions,notes',
  ),
  'matrix header must match contract',
);

// 3. Matrix contains GAP-001..GAP-010.
for (let i = 1; i <= 10; i++) {
  const id = `GAP-0${String(i).padStart(2, '0')}`;
  assert.ok(matrix.includes(id), `matrix must include ${id}`);
}

// 4. Findings matrix header contract.
assert.ok(
  findings.startsWith(
    'finding_id,severity,gap_id,affected_area,issue_summary,evidence,methodological_risk,recommended_action,blocks_next_phase,status',
  ),
  'findings header must match contract',
);

// 5. Naming divergence registered (documented, not invented).
assert.match(combined, /divergenc/i);

// 6. Recommended lanes vocabulary present.
for (const lane of [
  'SOURCE_RECOVERY_CANDIDATE',
  'SYNTHETIC_DESIGN_ONLY_CANDIDATE',
  'HOLD',
  'NEGATIVE_CONTROL_CANDIDATE',
  'REQUIRES_HUMAN_DECISION',
]) {
  assert.ok(matrix.includes(lane), `matrix must use lane ${lane}`);
}

// 7. NOT_STARTED confirmations.
for (const token of [
  'A4R197_D_NOT_STARTED',
  'A4R197_E_NOT_STARTED',
  'A4R197_F_NOT_STARTED',
  'A4R196_B_NOT_STARTED',
  'A4R194_M_NOT_STARTED',
]) {
  assert.ok(combined.includes(token), `must confirm ${token}`);
}

// 8. Source recovery not started; synthetic not created/materialized.
assert.match(combined, /NO_SOURCE_RECOVERY/);
assert.match(combined, /source recovery (nao iniciad|NOT_STARTED|bloqueada|BLOQUEADA)/i);
assert.match(combined, /NO_NEW_SYNTHETIC|sintetico novo nao criad/i);
assert.match(combined, /NO_MATERIALIZATION|nem materializad|sem materializacao/i);

// 9. F-002 / F-003 preserved as blocker for A4R197-E.
assert.match(decision, /F-002/);
assert.match(decision, /F-003/);
assert.match(decision, /A4R197-E[\s\S]*(BLOQUEADA|bloqueada|continua bloqueada)/i);

// 10. Opus is reviewer, not sovereign author.
assert.match(combined, /nao.*autor soberano|revisor\/priorizador/i);

// 11. Daumas reference-only, no automatic reentry.
assert.match(combined, /sem reentry automatico|reference-only|reentry automatico.*bloquead/i);

// 12. Real/synthetic separation preserved.
assert.match(combined, /real-first|evento real.*sintetico|sintetico.*evento real/i);

// 13. Locks not opened.
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

// 14. No active selected/released/final assignment (only negated/null phrasing allowed).
const activeCode = /(selectedCode|releasedCode|finalConclusion)\s*[:=]\s*(?!null\b)["']?[A-Za-z0-9]/;
assert.ok(!activeCode.test(combined), 'no active selected/released/final code assignment allowed');

// 15. No active CLASSIFIED marking.
const activeClassified = /(status\s*[:=]\s*CLASSIFIED\b|=\s*CLASSIFIED\b|marca[r]?\s+CLASSIFIED\b)/i;
assert.ok(!activeClassified.test(combined), 'no active CLASSIFIED marking allowed');

// 16. Wrong-SERA-alias token absent.
const wrongTerminology = 'C' + 'ERA';
assert.ok(!new RegExp(`\\b${wrongTerminology}\\b`).test(combined), `${wrongTerminology} must not appear`);

// 17. Invalid terms not as active entities.
for (const token of ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais']) {
  const activePattern = new RegExp(`${token}.*(valid|entidade ativa|active entity)`, 'i');
  assert.ok(!activePattern.test(combined), `invalid term appears as active entity: ${token}`);
}

// 18. No invented-question fragments.
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

console.log('opus-gap-prioritization-a4r197c-trial-001: OK');
