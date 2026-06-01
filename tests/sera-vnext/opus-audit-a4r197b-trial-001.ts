import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const auditDir = path.join(root, 'docs/sera-vnext/opus-campaign-a4r197/audit-b');

const paths = {
  report: path.join(auditDir, 'SERA_VNEXT_OPUS_AUDIT_A4R197_B_REPORT_v0.2.0.md'),
  findings: path.join(auditDir, 'SERA_VNEXT_OPUS_AUDIT_A4R197_B_FINDINGS_MATRIX.csv'),
  decision: path.join(auditDir, 'SERA_VNEXT_OPUS_AUDIT_A4R197_B_NEXT_PHASE_DECISION.md'),
  log: path.join(auditDir, 'SERA_A4R197_B_LOG_v0.2.0.md'),
};

for (const p of Object.values(paths)) {
  assert.ok(existsSync(p), `required A4R197-B artifact must exist: ${p}`);
}

const report = readFileSync(paths.report, 'utf8');
const findings = readFileSync(paths.findings, 'utf8');
const decision = readFileSync(paths.decision, 'utf8');
const log = readFileSync(paths.log, 'utf8');
const combined = [report, findings, decision, log].join('\n');

// 1. Allowed verdict present in report.
const allowedVerdicts = [
  'REVIEW_PASS',
  'REVIEW_PASS_WITH_WARNINGS',
  'REVIEW_HOLD',
  'REVIEW_BLOCKED',
  'REQUIRES_HUMAN_DECISION',
];
assert.ok(
  allowedVerdicts.some((v) => report.includes(v)),
  'report must contain an allowed Opus verdict',
);

// 2. Findings matrix header contract.
assert.ok(
  findings.startsWith(
    'finding_id,severity,affected_area,affected_file,issue_summary,evidence,methodological_risk,recommended_action,blocks_next_phase,status',
  ),
  'findings matrix header must match contract',
);

// 3. Next-phase NOT_STARTED confirmations.
for (const token of [
  'A4R197_C_NOT_STARTED',
  'A4R197_D_NOT_STARTED',
  'A4R197_E_NOT_STARTED',
  'A4R196_B_NOT_STARTED',
  'A4R194_M_NOT_STARTED',
]) {
  assert.ok(combined.includes(token), `must confirm ${token}`);
}

// 4. Source recovery not started.
assert.match(combined, /NO_SOURCE_RECOVERY/);
assert.match(combined, /source recovery (nao iniciad|NOT_STARTED)/i);

// 5. No new synthetic.
assert.match(combined, /NO_NEW_SYNTHETIC|sintetico novo nao criad/i);

// 6. PM-primary not started / separate route.
assert.match(combined, /PM-primary/i);
assert.match(decision, /PM-primary: nao iniciado/i);

// 7. GAP-001 controlled draft retained.
assert.match(combined, /CONTROLLED_DRAFT_RETAINED|controlled draft retido/i);

// 8. Daumas reference-only, no automatic reentry.
assert.match(
  combined,
  /sem reentry automatico|Daumas reentry automatico.*bloquead|reference-only/i,
);

// 9. No active promotion of fixture/baseline/product (locks not opened).
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

// 10. No active selected/released/final assignment (only negated/null phrasing allowed).
const activeCode = /(selectedCode|releasedCode|finalConclusion)\s*[:=]\s*(?!null\b)["']?[A-Za-z0-9]/;
assert.ok(!activeCode.test(combined), 'no active selected/released/final code assignment allowed');

// 11. No active CLASSIFIED marking (negated mentions allowed).
const activeClassified = /(status\s*[:=]\s*CLASSIFIED\b|=\s*CLASSIFIED\b|marca[r]?\s+CLASSIFIED\b)/i;
assert.ok(!activeClassified.test(combined), 'no active CLASSIFIED marking allowed');

// 12. Wrong-SERA-alias token must be absent.
const wrongTerminology = 'C' + 'ERA';
assert.ok(
  !new RegExp(`\\b${wrongTerminology}\\b`).test(combined),
  `${wrongTerminology} must not appear`,
);

// 13. Invalid terms must not appear as active entities.
for (const token of ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais']) {
  const activePattern = new RegExp(`${token}.*(valid|entidade ativa|active entity)`, 'i');
  assert.ok(!activePattern.test(combined), `invalid term appears as active entity: ${token}`);
}

// 14. No invented-question fragments.
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

// 15. Explicit non-execution confirmation present.
assert.match(report, /NAO houve.*source recovery|source recovery executada/i);
assert.match(report, /sintetico novo criado/i);

console.log('opus-audit-a4r197b-trial-001: OK');
