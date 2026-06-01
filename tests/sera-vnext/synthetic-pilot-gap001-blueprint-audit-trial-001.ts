import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');

const reportPath = path.join(
  root,
  'docs/sera-vnext/synthetic-pilots-a4r194/SYNTHETIC_PILOT_GAP001_MATERIALIZATION_BLUEPRINT_AUDIT_A4R194_D_v0.2.0.md',
);
const matrixPath = path.join(
  root,
  'docs/sera-vnext/synthetic-pilots-a4r194/SYNTHETIC_PILOT_GAP001_BLUEPRINT_AUDIT_MATRIX_A4R194_D.csv',
);
const blueprintPath = path.join(
  root,
  'docs/sera-vnext/synthetic-pilots-a4r194/SYNTHETIC_PILOT_GAP001_MATERIALIZATION_BLUEPRINT_A4R194_C_v0.2.0.md',
);
const schemaPath = path.join(
  root,
  'docs/sera-vnext/synthetic-pilots-a4r194/SYNTHETIC_PILOT_GAP001_BLUEPRINT_SCHEMA_A4R194_C.json',
);
const precheckPath = path.join(
  root,
  'docs/sera-vnext/synthetic-pilots-a4r194/SYNTHETIC_PILOT_GAP001_MATERIALIZATION_PRECHECK_A4R194_C_v0.2.0.md',
);

for (const p of [reportPath, matrixPath, blueprintPath, schemaPath, precheckPath]) {
  assert.ok(existsSync(p), `required artifact must exist: ${p}`);
}

const report = readFileSync(reportPath, 'utf8');
const matrix = readFileSync(matrixPath, 'utf8');
const blueprint = readFileSync(blueprintPath, 'utf8');
const precheck = readFileSync(precheckPath, 'utf8');
const schema = JSON.parse(readFileSync(schemaPath, 'utf8')) as {
  schemaPurpose: string;
  caseInstanceCreated: boolean;
  fixtureAllowed: boolean;
  baselineAllowed: boolean;
  productAllowed: boolean;
  fieldsRequiredForFutureMaterialization: string[];
};

assert.match(
  report,
  /BLUEPRINT_PASS|BLUEPRINT_PASS_WITH_WARNINGS|BLUEPRINT_NEEDS_CORRECTION|BLUEPRINT_BLOCKED/,
  'audit verdict must be from allowed set',
);
const blockerLine = report.match(/^\s*-\s*BLOCKER:\s*(.+)$/im);
const highLine = report.match(/^\s*-\s*HIGH:\s*(.+)$/im);
assert.ok(blockerLine && blockerLine[1].trim().toLowerCase() === 'none', 'BLOCKER must be none');
assert.ok(highLine && highLine[1].trim().toLowerCase() === 'none', 'HIGH must be none');

const mediumLine = report.match(/^\s*-\s*MEDIUM:\s*(.+)$/im);
const hasMedium = Boolean(mediumLine && mediumLine[1].trim().toLowerCase() !== 'none');
if (hasMedium) {
  assert.ok(
    /CLOSE_AND_WAIT_FOR_HUMAN_AUTHORIZATION|REQUIRE_CORRECTION_BEFORE_NEXT_PHASE|BLOCK_MATERIALIZATION/.test(report),
    'if MEDIUM exists, recommendation cannot allow materialization',
  );
}

for (const status of [
  'BLUEPRINT_ONLY',
  'NO_SYNTHETIC_CASE_INSTANCE',
  'NO_SYNTHETIC_EVENT_NARRATIVE',
  'NO_FIXTURE',
  'NO_BASELINE',
  'PRODUCT_BLOCKED',
]) {
  assert.match(blueprint, new RegExp(`\\b${status}\\b`), `missing blueprint status: ${status}`);
}

assert.equal(schema.schemaPurpose, 'DOCUMENTATION_ONLY');
assert.equal(schema.caseInstanceCreated, false);
assert.equal(schema.fixtureAllowed, false);
assert.equal(schema.baselineAllowed, false);
assert.equal(schema.productAllowed, false);

for (const field of [
  'syntheticCaseId',
  'syntheticType',
  'learningGap',
  'pfAgentId',
  'pmAgentId',
  'pfUnsafeActOrOmission',
  'pmMonitoringOrCalloutObligation',
  'pfOperationalMomentSequenceRef',
  'pmOperationalMomentSequenceRef',
  'pointTopology',
  'boundaryEvidenceRefs',
  'consequenceBoundary',
  'locks',
  'auditTrail',
]) {
  assert.ok(schema.fieldsRequiredForFutureMaterialization.includes(field), `missing field: ${field}`);
}

assert.match(precheck, /Opus\s+ou\s+GPT-5\.5/i, 'precheck must require Opus or GPT-5.5 audit');
assert.match(precheck, /Autorizacao humana explicita/i, 'precheck must require explicit human authorization');

for (const mustContain of ['RR-001: `OPEN`', 'RR-003: `PARTIALLY_MITIGATED`']) {
  assert.match(report, new RegExp(mustContain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
}

for (const blockedToken of ['selectedCode', 'releasedCode', 'finalConclusion', 'downstream']) {
  const presence = blueprint.includes(blockedToken) || precheck.includes(blockedToken) || report.includes(blockedToken);
  assert.ok(presence, `audit package should explicitly mention blocked token: ${blockedToken}`);
}

assert.match(blueprint, /\bDaumas\b/, 'Daumas spelling should be present');
const invalidEntityTokens = ['D' + 'AL', 'Dal' + 'mos', 'Dal' + 'mais'];
for (const token of invalidEntityTokens) {
  assert.ok(!blueprint.includes(token), `invalid entity token found: ${token}`);
  assert.ok(!report.includes(token), `invalid entity token found in report: ${token}`);
}

const inventedFlowFragments = ['Pergunta por ' + 'eixo', 'case-' + 'specific question', 'auxiliary ' + 'question'];
for (const fragment of inventedFlowFragments) {
  assert.ok(!blueprint.toLowerCase().includes(fragment.toLowerCase()), `invented flow fragment found: ${fragment}`);
  assert.ok(!report.toLowerCase().includes(fragment.toLowerCase()), `invented flow fragment found: ${fragment}`);
}

assert.ok(!/synthetic case instance criada/i.test(report), 'report should not claim created case instance');
assert.ok(!/narrativa completa criada/i.test(report), 'report should not claim created full narrative');
assert.ok(/NO_SYNTHETIC_CASE_INSTANCE/.test(report), 'report must preserve no-case status');
assert.ok(/NO_SYNTHETIC_EVENT_NARRATIVE/.test(report), 'report must preserve no-narrative status');
assert.ok(/NO_FIXTURE/.test(report), 'report must preserve no-fixture status');
assert.ok(/NO_BASELINE/.test(report), 'report must preserve no-baseline status');
assert.ok(/PRODUCT_BLOCKED/.test(report), 'report must preserve product-blocked status');

assert.ok(matrix.includes('audit_item,status,severity,blueprint_ok,schema_ok,precheck_ok,risk_if_missing,next_action,notes'));

console.log('synthetic-pilot-gap001-blueprint-audit-trial-001: OK');
