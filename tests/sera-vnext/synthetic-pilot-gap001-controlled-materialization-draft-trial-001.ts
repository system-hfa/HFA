import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/synthetic-pilots-a4r194');

const paths = {
  provenanceDoc: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_PROVENANCE_RECONCILIATION_A4R194_J_v0.2.0.md'),
  provenanceMatrix: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_PROVENANCE_MATRIX_A4R194_J.csv'),
  draftDoc: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_CONTROLLED_MATERIALIZATION_DRAFT_A4R194_J_v0.2.0.md'),
  draftJson: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_CONTROLLED_MATERIALIZATION_DRAFT_A4R194_J.json'),
  validationMatrix: path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_CONTROLLED_MATERIALIZATION_VALIDATION_MATRIX_A4R194_J.csv'),
  logJ: path.join(baseDir, 'SERA_A4R194_J_LOG_v0.2.0.md'),
  readinessK: path.join(baseDir, 'SERA_A4R194_K_READINESS_PLAN_v0.2.0.md'),
};

for (const p of Object.values(paths)) {
  assert.ok(existsSync(p), `required A4R194-J artifact must exist: ${p}`);
}

const provenanceDoc = readFileSync(paths.provenanceDoc, 'utf8');
const provenanceMatrix = readFileSync(paths.provenanceMatrix, 'utf8');
const draftDoc = readFileSync(paths.draftDoc, 'utf8');
const validationMatrix = readFileSync(paths.validationMatrix, 'utf8');
const logJ = readFileSync(paths.logJ, 'utf8');
const readinessK = readFileSync(paths.readinessK, 'utf8');
const draft = JSON.parse(readFileSync(paths.draftJson, 'utf8')) as {
  status: string[];
  syntheticPilotId: string;
  controlledMaterializationId: string;
  syntheticType: string;
  learningGap: string;
  boundaryDecision: string;
  notARealEvent: boolean;
  explicitExclusions: Record<string, string>;
  agents: {
    crewCollective: { status: string; fallbackAllowed: boolean; mayReplacePfPm: boolean };
  };
  minimalSyntheticScenarioSkeleton: { completeOperationalNarrativeCreated: boolean };
  poaClassification: { status: string; selectedCode: null; releasedCode: null; finalConclusion: null };
  locks: Record<string, boolean>;
  downstream: Record<string, string>;
  nextStatus: {
    requiresA4R194KIndependentAudit: boolean;
    promotionBeforeAuditAllowed: boolean;
    a4r194KInitiated: boolean;
  };
};

const combined = [provenanceDoc, provenanceMatrix, draftDoc, validationMatrix, logJ, readinessK].join('\n');

for (const token of [
  'CONTROLLED_MATERIALIZATION_DRAFT',
  'NOT_A_FIXTURE',
  'NOT_BASELINE',
  'NOT_PRODUCT',
  'NOT_CLASSIFIED',
  'NOT_REAL_EVENT',
]) {
  assert.ok(draft.status.includes(token), `draft status must include ${token}`);
  assert.match(draftDoc, new RegExp(token), `draft doc must include ${token}`);
}

assert.equal(draft.syntheticPilotId, 'SYN-PILOT-GAP001-PFPM-DRAFT-001');
assert.equal(draft.controlledMaterializationId, 'SYN-PILOT-GAP001-PFPM-CONTROLLED-DRAFT-001');
assert.equal(draft.syntheticType, 'TYPE-07_WARNING_TRAP');
assert.equal(draft.learningGap, 'GAP-001_PF_PM_SEPARATION');
assert.equal(draft.boundaryDecision, 'PF_PRIMARY_WITH_PM_CONSEQUENCE_BOUNDARY');
assert.equal(draft.notARealEvent, true);

assert.match(provenanceDoc, /RISK-008/, 'provenance doc must identify RISK-008');
for (const basis of [
  'primary_gap_basis',
  'boundary_case_basis',
  'contextual_calibration_basis',
  'not_narrative_source',
]) {
  assert.match(provenanceDoc, new RegExp(basis), `provenance doc must define ${basis}`);
  assert.match(provenanceMatrix, new RegExp(basis), `provenance matrix must include ${basis}`);
}

assert.match(provenanceDoc, /Thebaud, Peasmarsh, Vigo, Colgan 3407/);
assert.match(provenanceDoc, /Asiana 214, Comair 5191, American 965/);
assert.match(provenanceDoc, /A4R193-P\/Q synthetic gap audit, A4R194-A\/I, A4R195-A\/C/);
assert.match(provenanceDoc, /Real events are not narrative sources/i);
assert.match(provenanceDoc, /Daumas is methodology\/reference-only/i);

assert.match(draftDoc, /no PM_PRIMARY_MONITORING_FAILURE/);
assert.match(draftDoc, /no crew collective fallback/);
assert.match(draftDoc, /no consequence-as-cause/);
assert.match(draftDoc, /no warning-as-anchor/);
assert.match(draftDoc, /no real-event narrative/);
assert.match(draftDoc, /no Daumas reentry/);
assert.equal(draft.explicitExclusions.pmPrimaryMonitoringFailure, 'EXCLUDED_REQUIRES_SEPARATE_FUTURE_DRAFT');
assert.equal(draft.explicitExclusions.crewCollectiveFallback, 'EXCLUDED');
assert.equal(draft.explicitExclusions.consequenceAsCause, 'BLOCKED');
assert.equal(draft.explicitExclusions.warningAsAnchor, 'BLOCKED');
assert.equal(draft.explicitExclusions.realEventNarrative, 'EXCLUDED');
assert.equal(draft.explicitExclusions.daumasReentry, 'EXCLUDED');

assert.equal(draft.agents.crewCollective.status, 'CONTEXT_ONLY');
assert.equal(draft.agents.crewCollective.fallbackAllowed, false);
assert.equal(draft.agents.crewCollective.mayReplacePfPm, false);
assert.equal(draft.minimalSyntheticScenarioSkeleton.completeOperationalNarrativeCreated, false);

assert.equal(draft.poaClassification.status, 'NOT_CLASSIFIED');
assert.equal(draft.poaClassification.selectedCode, null);
assert.equal(draft.poaClassification.releasedCode, null);
assert.equal(draft.poaClassification.finalConclusion, null);

for (const lock of [
  'fixtureAllowed',
  'baselineAllowed',
  'productAllowed',
  'classificationAllowed',
  'selectedCodeAllowed',
  'releasedCodeAllowed',
  'finalConclusionAllowed',
  'downstreamAllowed',
]) {
  assert.equal(draft.locks[lock], false, `${lock} must remain false`);
}

for (const layer of ['HFACS', 'Risk/ERC', 'ARMS/ERC', 'recommendations']) {
  assert.equal(draft.downstream[layer], 'blocked', `${layer} must remain blocked`);
}

for (let i = 1; i <= 20; i += 1) {
  const checkId = `J-${String(i).padStart(3, '0')}`;
  assert.match(validationMatrix, new RegExp(`\\b${checkId}\\b`), `validation matrix must include ${checkId}`);
}

assert.equal(draft.nextStatus.requiresA4R194KIndependentAudit, true);
assert.equal(draft.nextStatus.promotionBeforeAuditAllowed, false);
assert.equal(draft.nextStatus.a4r194KInitiated, false);
assert.match(draftDoc, /requires A4R194-K independent audit/);
assert.match(readinessK, /A4R194_K_NOT_STARTED/);
assert.match(readinessK, /read-only/i);

const fixtureCandidate = path.join(root, 'tests/sera/fixtures/SYN-PILOT-GAP001-PFPM-DRAFT-001.json');
const baselineCandidate = path.join(root, 'tests/reports/baseline/SYN-PILOT-GAP001-PFPM-DRAFT-001.json');
assert.equal(existsSync(fixtureCandidate), false, 'synthetic pilot must not exist as fixture');
assert.equal(existsSync(baselineCandidate), false, 'synthetic pilot must not exist as baseline');

for (const forbiddenPath of [
  'tests/sera/fixtures',
  'tests/reports/baseline',
  'supabase',
  'docs/sera-vnext/source-corpus',
]) {
  const candidate = path.join(root, forbiddenPath, 'SYN-PILOT-GAP001-PFPM-DRAFT-001.json');
  assert.equal(existsSync(candidate), false, `A4R194-J must not create forbidden path artifact: ${candidate}`);
}

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
  'poaClosureAllowed' + '=true',
  'downstreamAllowed' + '=true',
  'finalConclusionAllowed' + '=true',
  'fixtureAllowed' + '=true',
  'baselineAllowed' + '=true',
  'productAllowed' + '=true',
];
for (const pattern of openedLockPatterns) {
  assert.ok(!combined.includes(pattern), `lock must not be opened: ${pattern}`);
}

console.log('synthetic-pilot-gap001-controlled-materialization-draft-trial-001: OK');
