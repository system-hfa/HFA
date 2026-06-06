import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const dir = path.join(root, 'docs/sera-vnext/opus-campaign-a4r197/synthetic-design-review-d');

const paths = {
  report: path.join(dir, 'SERA_VNEXT_OPUS_SYNTHETIC_DESIGN_REVIEW_A4R197_D_REPORT_v0.2.0.md'),
  guardrails: path.join(dir, 'SERA_VNEXT_OPUS_SYNTHETIC_DESIGN_GUARDRAILS_A4R197_D.csv'),
  findings: path.join(dir, 'SERA_VNEXT_OPUS_SYNTHETIC_DESIGN_FINDINGS_A4R197_D.csv'),
  decision: path.join(dir, 'SERA_VNEXT_OPUS_SYNTHETIC_DESIGN_NEXT_PHASE_DECISION_A4R197_D.md'),
  log: path.join(dir, 'SERA_A4R197_D_LOG_v0.2.0.md'),
};

for (const p of Object.values(paths)) {
  assert.ok(existsSync(p), `required A4R197-D artifact must exist: ${p}`);
}

const report = readFileSync(paths.report, 'utf8');
const guardrails = readFileSync(paths.guardrails, 'utf8');
const findings = readFileSync(paths.findings, 'utf8');
const decision = readFileSync(paths.decision, 'utf8');
const log = readFileSync(paths.log, 'utf8');
const combined = [report, guardrails, findings, decision, log].join('\n');

// 1. Allowed verdict present in report.
const allowedVerdicts = [
  'REVIEW_PASS',
  'REVIEW_PASS_WITH_WARNINGS',
  'REVIEW_HOLD',
  'REVIEW_BLOCKED',
  'REQUIRES_HUMAN_DECISION',
];
assert.ok(allowedVerdicts.some((v) => report.includes(v)), 'report must contain an allowed verdict');

// 2. Guardrails header contract.
assert.ok(
  guardrails.startsWith(
    'guardrail_id,gap_id,guardrail_name,required_rule,rationale,failure_mode_prevented,applies_to_future_materialization,blocks_fixture_promotion,status',
  ),
  'guardrails header must match contract',
);

// 3. Findings header contract.
assert.ok(
  findings.startsWith(
    'finding_id,severity,gap_id,affected_area,issue_summary,evidence,methodological_risk,recommended_action,blocks_next_phase,status',
  ),
  'findings header must match contract',
);

// 4. The two reviewed gaps are present.
assert.ok(combined.includes('GAP-004'), 'GAP-004 must be reviewed');
assert.ok(combined.includes('GAP-002'), 'GAP-002 must be reviewed');

// 5. Relevant synthetic TYPE taxonomy present (outcome trap / violation-language trap).
assert.ok(combined.includes('TYPE-08'), 'TYPE-08 outcome trap must be referenced');
assert.ok(combined.includes('TYPE-09'), 'TYPE-09 violation-language trap must be referenced');

// 6. Design-only review, no materialization / no synthetic case.
assert.match(combined, /NO_SOURCE_RECOVERY/);
assert.match(combined, /NO_SYNTHETIC_CASE_CREATED/);
assert.match(combined, /source recovery (nao iniciad|NOT_STARTED|bloqueada|BLOQUEADA)/i);
assert.match(combined, /NO_NEW_SYNTHETIC|sintetico novo nao criad/i);
assert.match(combined, /NO_MATERIALIZATION|nem materializad|sem materializacao/i);

// 7. Guardrails apply to future materialization only and block fixture promotion.
assert.ok(guardrails.includes('FUTURE_ONLY'), 'guardrails must mark future materialization only');
for (let i = 1; i <= 10; i++) {
  const id = `GR-0${String(i).padStart(2, '0')}`;
  assert.ok(guardrails.includes(id), `guardrails must include ${id}`);
}

// 8. NOT_STARTED confirmations (D is current, so not listed).
for (const token of [
  'A4R197_E_NOT_STARTED',
  'A4R197_F_NOT_STARTED',
  'A4R196_B_NOT_STARTED',
  'A4R194_M_NOT_STARTED',
]) {
  assert.ok(combined.includes(token), `must confirm ${token}`);
}

// 9. F-002 / F-003 preserved as blocker for A4R197-E in decision.
assert.match(decision, /F-002/);
assert.match(decision, /F-003/);
assert.match(decision, /A4R197-E[\s\S]*(BLOQUEADA|bloqueada|continua bloqueada)/i);

// 10. Sequencing: GAP-004 precedes GAP-002 in future design-only blueprint.
assert.match(decision, /GAP-004[\s\S]*(precede|antes)[\s\S]*GAP-002/i);

// 11. Opus is reviewer, not sovereign author.
assert.match(combined, /nao.*autor soberano|revisor\/priorizador/i);

// 12. Daumas reference-only, no automatic reentry.
assert.match(combined, /sem reentry automatico|reference-only|reentry automatico.*bloquead/i);

// 13. Real/synthetic separation preserved.
assert.match(combined, /real-first|evento real.*sintetico|sintetico.*evento real/i);

// 14. Naming divergence registered (documented, not invented).
assert.match(combined, /divergenc/i);

// 15. Locks not opened.
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

// 16. No active selected/released/final assignment (only negated/null phrasing allowed).
const activeCode = /(selectedCode|releasedCode|finalConclusion)\s*[:=]\s*(?!null\b)["']?[A-Za-z0-9]/;
assert.ok(!activeCode.test(combined), 'no active selected/released/final code assignment allowed');

// 17. No active CLASSIFIED marking.
const activeClassified = /(status\s*[:=]\s*CLASSIFIED\b|=\s*CLASSIFIED\b|marca[r]?\s+CLASSIFIED\b)/i;
assert.ok(!activeClassified.test(combined), 'no active CLASSIFIED marking allowed');

// 18. Wrong-SERA-alias token absent.
const wrongTerminology = 'C' + 'ERA';
assert.ok(!new RegExp(`\\b${wrongTerminology}\\b`).test(combined), `${wrongTerminology} must not appear`);

// 19. Invalid terms not as active entities.
for (const token of ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais']) {
  const activePattern = new RegExp(`${token}.*(valid|entidade ativa|active entity)`, 'i');
  assert.ok(!activePattern.test(combined), `invalid term appears as active entity: ${token}`);
}

// 20. No invented-question fragments.
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

console.log('opus-synthetic-design-review-a4r197d-trial-001: OK');
