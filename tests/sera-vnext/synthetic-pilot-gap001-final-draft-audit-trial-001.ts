import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/synthetic-pilots-a4r194');

const paths = {
  finalAuditH: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_FINAL_DRAFT_AUDIT_A4R194_H_v0.2.0.md'),
  finalAuditMatrixH: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_FINAL_DRAFT_AUDIT_MATRIX_A4R194_H.csv'),
  logH: path.join(baseDir, 'SERA_A4R194_H_LOG_v0.2.0.md'),
  readinessI: path.join(baseDir, 'SERA_A4R194_I_READINESS_PLAN_v0.2.0.md'),
  draftJsonE: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_CASE_DRAFT_DESIGN_A4R194_E.json'),
};

for (const p of Object.values(paths)) {
  assert.ok(existsSync(p), `required A4R194-H artifact must exist: ${p}`);
}

const finalAudit = readFileSync(paths.finalAuditH, 'utf8');
const finalAuditMatrix = readFileSync(paths.finalAuditMatrixH, 'utf8');
const logH = readFileSync(paths.logH, 'utf8');
const readinessI = readFileSync(paths.readinessI, 'utf8');
const draft = JSON.parse(readFileSync(paths.draftJsonE, 'utf8')) as {
  syntheticCaseInstanceCreated: boolean;
  fixtureAllowed: boolean;
  baselineAllowed: boolean;
  productAllowed: boolean;
  classificationAllowed: boolean;
  pilotBoundaryDecision: string;
  pmPrimaryMonitoringFailureRequiresSeparateDraft: boolean;
  temporalClarification: {
    pfSequenceRole: string;
    pmSequenceRole: string;
    futureGranularOrderingRequiredBeforeMaterialization: boolean;
  };
  poaClassification: { status: string; selectedCode: null; releasedCode: null };
};

assert.match(
  finalAudit,
  /FINAL_DRAFT_AUDIT_PASS|FINAL_DRAFT_AUDIT_PASS_WITH_WARNINGS|FINAL_DRAFT_AUDIT_NEEDS_CORRECTION|FINAL_DRAFT_AUDIT_BLOCKED/,
  'final audit verdict must be from allowed set',
);

const blockerLine = finalAudit.match(/^\s*-\s*BLOCKER:\s*(.+)$/im);
const highLine = finalAudit.match(/^\s*-\s*HIGH:\s*(.+)$/im);
assert.ok(blockerLine && blockerLine[1].trim().toLowerCase() === 'none', 'BLOCKER must be none');
assert.ok(highLine && highLine[1].trim().toLowerCase() === 'none', 'HIGH must be none');

const mediumLine = finalAudit.match(/^\s*-\s*MEDIUM:\s*(.+)$/im);
const hasMedium = Boolean(mediumLine && mediumLine[1].trim().toLowerCase() !== 'none');
if (hasMedium) {
  assert.ok(
    /CLOSE_SYNTHETIC_PILOT_BLOCK|REQUIRE_CORRECTION_BEFORE_NEXT_PHASE|BLOCK_SYNTHETIC_MATERIALIZATION/.test(finalAudit),
    'if MEDIUM exists, recommendation cannot allow materialization',
  );
}

for (const token of [
  'NOT_A_REAL_EVENT',
  'NO_SYNTHETIC_FIXTURE',
  'NO_BASELINE',
  'PRODUCT_BLOCKED',
  'PF_PRIMARY_WITH_PM_CONSEQUENCE_BOUNDARY',
  'PM_PRIMARY_MONITORING_FAILURE',
]) {
  assert.match(finalAudit, new RegExp(token), `final audit must confirm: ${token}`);
}

assert.match(finalAudit, /[Tt]emporal/, 'final audit must confirm temporal clarification');
assert.match(finalAudit, /crew collective fallback/i, 'final audit must confirm no crew-collective fallback');
assert.match(finalAudit, /consequence-as-cause/i, 'final audit must confirm no consequence-as-cause');
assert.match(finalAudit, /warning-as-anchor/i, 'final audit must confirm no warning-as-anchor');
assert.match(finalAudit, /RR-001: `OPEN`/);
assert.match(finalAudit, /RR-003: `PARTIALLY_MITIGATED`/);

assert.ok(
  finalAuditMatrix.startsWith('audit_item,status,severity,evidence_file,risk_if_failed,next_action,notes'),
  'final audit matrix header must match contract',
);
for (const item of [
  'pf_primary_boundary_decision',
  'pm_primary_separate_draft',
  'temporal_clarification',
  'no_crew_collective_fallback',
  'no_consequence_as_cause',
  'no_warning_as_anchor',
  'human_authorization_required',
]) {
  assert.ok(finalAuditMatrix.includes(item), `final audit matrix must include item: ${item}`);
}

assert.match(logH, /FINAL_AUDIT_RECORDED/);
assert.match(readinessI, /encerrar o bloco/i, 'readiness I must offer the close-block option');
assert.match(
  readinessI,
  /autorizacao humana explicita/i,
  'readiness I must require explicit human authorization for materialization',
);
assert.match(readinessI, /Fixture continua bloqueado/i, 'readiness I must keep fixture blocked');

assert.equal(draft.pilotBoundaryDecision, 'PF_PRIMARY_WITH_PM_CONSEQUENCE_BOUNDARY');
assert.equal(draft.pmPrimaryMonitoringFailureRequiresSeparateDraft, true);
assert.ok(draft.temporalClarification, 'draft must carry temporalClarification');
assert.equal(
  draft.temporalClarification.pmSequenceRole,
  'SAME_MACRO_GATE_MONITORING_OBLIGATION_NOT_EARLIER_THAN_PF_ANCHOR',
);
assert.equal(draft.syntheticCaseInstanceCreated, false);
assert.equal(draft.fixtureAllowed, false);
assert.equal(draft.baselineAllowed, false);
assert.equal(draft.productAllowed, false);
assert.equal(draft.classificationAllowed, false);
assert.equal(draft.poaClassification.status, 'NOT_CLASSIFIED');
assert.equal(draft.poaClassification.selectedCode, null);
assert.equal(draft.poaClassification.releasedCode, null);

const fixtureCandidate = path.join(root, 'tests/sera/fixtures/SYN-PILOT-GAP001-PFPM-DRAFT-001.json');
const baselineCandidate = path.join(root, 'tests/reports/baseline/SYN-PILOT-GAP001-PFPM-DRAFT-001.json');
assert.equal(existsSync(fixtureCandidate), false, 'synthetic pilot must not exist as fixture');
assert.equal(existsSync(baselineCandidate), false, 'synthetic pilot must not exist as baseline');

const combined = [finalAudit, finalAuditMatrix, logH, readinessI].join('\n');

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
];
for (const pattern of openedLockPatterns) {
  assert.ok(!combined.includes(pattern), `lock must not be opened: ${pattern}`);
}

console.log('synthetic-pilot-gap001-final-draft-audit-trial-001: OK');
