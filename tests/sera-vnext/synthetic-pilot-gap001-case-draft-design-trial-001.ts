import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/synthetic-pilots-a4r194');

const docPath = path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_CASE_DRAFT_DESIGN_A4R194_E_v0.2.0.md');
const jsonPath = path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_CASE_DRAFT_DESIGN_A4R194_E.json');
const matrixPath = path.join(baseDir, 'SYNTHETIC_PILOT_GAP001_CASE_DRAFT_VALIDATION_MATRIX_A4R194_E.csv');
const declarationPath = path.join(
  baseDir,
  'SYNTHETIC_PILOT_GAP001_NON_MATERIALIZATION_DECLARATION_A4R194_E_v0.2.0.md',
);

for (const p of [docPath, jsonPath, matrixPath, declarationPath]) {
  assert.ok(existsSync(p), `required artifact must exist: ${p}`);
}

const doc = readFileSync(docPath, 'utf8');
const matrix = readFileSync(matrixPath, 'utf8');
const declaration = readFileSync(declarationPath, 'utf8');
const draft = JSON.parse(readFileSync(jsonPath, 'utf8')) as {
  status: string;
  syntheticPilotId: string;
  notARealEvent: boolean;
  syntheticCaseInstanceCreated: boolean;
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
  gapId: string;
  agentSet: {
    pf: { agentId: string; agentKind: string };
    pm: { agentId: string; agentKind: string };
    crewCollectiveContextOnly: boolean;
  };
  escapePointDraft: {
    scopeId: string;
    status: string;
    pointTopology: string;
    pfSequenceRef: string;
    pmSequenceRef: string;
    boundaryEvidenceRefsAreSyntheticPlaceholders: boolean;
  };
  poaClassification: { status: string; selectedCode: null; releasedCode: null };
};

assert.equal(draft.status, 'SYNTHETIC_DRAFT_DESIGN_ONLY');
assert.equal(draft.syntheticPilotId, 'SYN-PILOT-GAP001-PFPM-DRAFT-001');
assert.equal(draft.notARealEvent, true);
assert.equal(draft.syntheticCaseInstanceCreated, false);
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
assert.equal(draft.gapId, 'GAP-001');

assert.equal(draft.agentSet.pf.agentId, 'synthetic-pf-001');
assert.equal(draft.agentSet.pm.agentId, 'synthetic-pm-001');
assert.ok(draft.agentSet.pf.agentId !== draft.agentSet.pm.agentId, 'PF and PM must be distinct agents');
assert.equal(draft.agentSet.crewCollectiveContextOnly, true);

assert.ok(draft.escapePointDraft.pfSequenceRef.length > 0, 'PF sequenceRef must be present');
assert.ok(draft.escapePointDraft.pmSequenceRef.length > 0, 'PM sequenceRef must be present');
assert.equal(draft.escapePointDraft.pfSequenceRef, 'seq:synthetic:pf:03');
assert.equal(draft.escapePointDraft.pmSequenceRef, 'seq:synthetic:pm:03');
assert.equal(draft.escapePointDraft.boundaryEvidenceRefsAreSyntheticPlaceholders, true);
assert.equal(draft.escapePointDraft.status, 'DRAFT_NOT_APPROVED_NOT_ENFORCED');

assert.equal(draft.poaClassification.status, 'NOT_CLASSIFIED');
assert.equal(draft.poaClassification.selectedCode, null);
assert.equal(draft.poaClassification.releasedCode, null);

for (let i = 1; i <= 16; i += 1) {
  const id = `CHK-${String(i).padStart(3, '0')}`;
  assert.ok(matrix.includes(id), `validation matrix must include ${id}`);
}
assert.ok(
  matrix.startsWith('check_id,check_name,status,required_value,current_value,risk_if_failed,next_action,notes'),
  'matrix header must match contract',
);

assert.match(doc, /Produto\/UI\/API/i, 'doc must address product/UI/API status');
assert.match(doc, /bloqueado/i, 'doc must mark product/UI/API as blocked');
assert.match(doc, /RR-001/);
assert.match(doc, /`OPEN`/);
assert.match(doc, /RR-003/);
assert.match(doc, /`PARTIALLY_MITIGATED`/);

assert.match(declaration, /NAO e caso sintetico executavel/i, 'declaration must deny executable case');
assert.match(declaration, /NAO contem narrativa final/i, 'declaration must deny final narrative');
assert.match(declaration, /Opus\/GPT-5\.5/i, 'declaration must require Opus/GPT-5.5 audit');

assert.match(doc, /\bDaumas\b/, 'Daumas spelling must be present');
const invalidEntityTokens = ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais'];
for (const token of invalidEntityTokens) {
  assert.ok(!doc.includes(token), `invalid entity token in doc: ${token}`);
  assert.ok(!declaration.includes(token), `invalid entity token in declaration: ${token}`);
}

const inventedQuestionFragments = [
  'P' + '-1',
  'O' + '-1',
  'A' + '-1',
  'Pergunta por ' + 'eixo',
  'case-' + 'specific question',
  'auxiliary ' + 'question',
];
for (const fragment of inventedQuestionFragments) {
  assert.ok(!doc.includes(fragment), `invented-question fragment in doc: ${fragment}`);
  assert.ok(!declaration.includes(fragment), `invented-question fragment in declaration: ${fragment}`);
}

console.log('synthetic-pilot-gap001-case-draft-design-trial-001: OK');
