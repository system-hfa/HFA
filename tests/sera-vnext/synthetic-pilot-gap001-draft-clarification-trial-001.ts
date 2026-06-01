import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/synthetic-pilots-a4r194');

const paths = {
  auditDocF: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_CASE_DRAFT_AUDIT_A4R194_F_v0.2.0.md'),
  auditMatrixF: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_CASE_DRAFT_AUDIT_MATRIX_A4R194_F.csv'),
  draftDocE: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_CASE_DRAFT_DESIGN_A4R194_E_v0.2.0.md'),
  draftJsonE: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_CASE_DRAFT_DESIGN_A4R194_E.json'),
  matrixE: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_CASE_DRAFT_VALIDATION_MATRIX_A4R194_E.csv'),
  clarificationDocG: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_DRAFT_CLARIFICATION_A4R194_G_v0.2.0.md'),
  clarificationMatrixG: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_DRAFT_CLARIFICATION_MATRIX_A4R194_G.csv'),
  logG: path.join(baseDir, 'SERA_A4R194_G_LOG_v0.2.0.md'),
  readinessH: path.join(baseDir, 'SERA_A4R194_H_READINESS_PLAN_v0.2.0.md'),
};

for (const p of Object.values(paths)) {
  assert.ok(existsSync(p), `required A4R194-F/G/H artifact must exist: ${p}`);
}

const auditDocF = readFileSync(paths.auditDocF, 'utf8');
const auditMatrixF = readFileSync(paths.auditMatrixF, 'utf8');
const draftDocE = readFileSync(paths.draftDocE, 'utf8');
const matrixE = readFileSync(paths.matrixE, 'utf8');
const clarificationDocG = readFileSync(paths.clarificationDocG, 'utf8');
const clarificationMatrixG = readFileSync(paths.clarificationMatrixG, 'utf8');
const logG = readFileSync(paths.logG, 'utf8');
const readinessH = readFileSync(paths.readinessH, 'utf8');
const draft = JSON.parse(readFileSync(paths.draftJsonE, 'utf8')) as {
  status: string;
  syntheticCaseInstanceCreated: boolean;
  completeNarrativeCreated: boolean;
  fixtureAllowed: boolean;
  baselineAllowed: boolean;
  productAllowed: boolean;
  classificationAllowed: boolean;
  selectedCodeAllowed: boolean;
  releasedCodeAllowed: boolean;
  finalConclusionAllowed: boolean;
  hfacsAllowed: boolean;
  riskErcAllowed: boolean;
  armsErcAllowed: boolean;
  recommendationsAllowed: boolean;
  pilotBoundaryDecision: string;
  pmPrimaryMonitoringFailureRequiresSeparateDraft: boolean;
  temporalClarification: {
    pfSequenceRole: string;
    pmSequenceRole: string;
    futureGranularOrderingRequiredBeforeMaterialization: boolean;
  };
  poaClassification: {
    status: string;
    selectedCode: null;
    releasedCode: null;
    finalConclusion: null;
  };
};

assert.match(auditDocF, /DRAFT_AUDIT_PASS_WITH_WARNINGS/);
assert.match(auditDocF, /BLOCKER: none/);
assert.match(auditDocF, /HIGH: none/);
assert.match(auditDocF, /MEDIUM: 1/);
assert.match(auditDocF, /TYPE-07_WARNING_TRAP/);
assert.match(auditDocF, /PF_PRIMARY_WITH_PM_CONSEQUENCE_BOUNDARY/);
assert.match(auditDocF, /PM_PRIMARY_MONITORING_FAILURE/);

for (const findingId of ['F-MED-001', 'F-LOW-001', 'F-LOW-002', 'F-INFO-001', 'F-PASS-001', 'F-PASS-002']) {
  assert.ok(auditMatrixF.includes(findingId), `audit matrix F must include ${findingId}`);
}

assert.match(draftDocE, /## A4R194-G Clarification Overlay/);
assert.match(draftDocE, /PF_PRIMARY_WITH_PM_CONSEQUENCE_BOUNDARY/);
assert.match(draftDocE, /PM_PRIMARY_MONITORING_FAILURE/);
assert.match(draftDocE, /exige novo `syntheticPilotId`/);
assert.match(draftDocE, /not earlier than\s+PF anchor/);

assert.equal(draft.pilotBoundaryDecision, 'PF_PRIMARY_WITH_PM_CONSEQUENCE_BOUNDARY');
assert.equal(draft.pmPrimaryMonitoringFailureRequiresSeparateDraft, true);
assert.equal(
  draft.temporalClarification.pfSequenceRole,
  'FIRST_CONTROLLABLE_SYNTHETIC_ESCAPE_POINT_CANDIDATE',
);
assert.equal(
  draft.temporalClarification.pmSequenceRole,
  'SAME_MACRO_GATE_MONITORING_OBLIGATION_NOT_EARLIER_THAN_PF_ANCHOR',
);
assert.equal(draft.temporalClarification.futureGranularOrderingRequiredBeforeMaterialization, true);

assert.equal(draft.status, 'SYNTHETIC_DRAFT_DESIGN_ONLY');
assert.equal(draft.syntheticCaseInstanceCreated, false);
assert.equal(draft.completeNarrativeCreated, false);
assert.equal(draft.fixtureAllowed, false);
assert.equal(draft.baselineAllowed, false);
assert.equal(draft.productAllowed, false);
assert.equal(draft.classificationAllowed, false);
assert.equal(draft.selectedCodeAllowed, false);
assert.equal(draft.releasedCodeAllowed, false);
assert.equal(draft.finalConclusionAllowed, false);
assert.equal(draft.hfacsAllowed, false);
assert.equal(draft.riskErcAllowed, false);
assert.equal(draft.armsErcAllowed, false);
assert.equal(draft.recommendationsAllowed, false);
assert.equal(draft.poaClassification.status, 'NOT_CLASSIFIED');
assert.equal(draft.poaClassification.selectedCode, null);
assert.equal(draft.poaClassification.releasedCode, null);
assert.equal(draft.poaClassification.finalConclusion, null);

for (const checkId of ['CHK-017', 'CHK-018', 'CHK-019']) {
  assert.ok(matrixE.includes(checkId), `matrix E must include ${checkId}`);
}

assert.match(clarificationDocG, /DRAFT_CLARIFICATION_COMPLETE/);
assert.match(clarificationDocG, /PF_PRIMARY_WITH_PM_CONSEQUENCE_BOUNDARY/);
assert.match(clarificationDocG, /PM_PRIMARY_MONITORING_FAILURE/);
assert.match(clarificationDocG, /No product\/UI\/API/);

for (const clarificationId of ['G-001', 'G-002', 'G-003', 'G-004', 'G-005']) {
  assert.ok(clarificationMatrixG.includes(clarificationId), `clarification matrix G must include ${clarificationId}`);
}

assert.match(logG, /DRAFT_CLARIFICATION_COMPLETE/);
assert.match(readinessH, /FINAL_DRAFT_AUDIT_GATE/);
assert.match(readinessH, /must not materialize the pilot/);

const fixtureCandidate = path.join(root, 'tests/sera/fixtures/SYN-PILOT-GAP001-PFPM-DRAFT-001.json');
const baselineCandidate = path.join(root, 'tests/reports/baseline/SYN-PILOT-GAP001-PFPM-DRAFT-001.json');
assert.equal(existsSync(fixtureCandidate), false, 'synthetic pilot must not exist as fixture');
assert.equal(existsSync(baselineCandidate), false, 'synthetic pilot must not exist as baseline');

const combined = [
  auditDocF,
  auditMatrixF,
  draftDocE,
  matrixE,
  clarificationDocG,
  clarificationMatrixG,
  logG,
  readinessH,
].join('\n');

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

console.log('synthetic-pilot-gap001-draft-clarification-trial-001: OK');
