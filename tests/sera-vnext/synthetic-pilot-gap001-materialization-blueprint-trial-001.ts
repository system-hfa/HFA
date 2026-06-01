import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve(__dirname, '..', '..');

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

assert.ok(existsSync(blueprintPath), 'blueprint doc must exist');
assert.ok(existsSync(schemaPath), 'schema json must exist');
assert.ok(existsSync(precheckPath), 'precheck doc must exist');

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

for (const status of [
  'BLUEPRINT_ONLY',
  'NO_SYNTHETIC_CASE_INSTANCE',
  'NO_SYNTHETIC_EVENT_NARRATIVE',
  'NO_FIXTURE',
  'NO_BASELINE',
  'PRODUCT_BLOCKED',
]) {
  assert.match(blueprint, new RegExp(`\\b${status}\\b`), `missing status: ${status}`);
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
  assert.ok(
    schema.fieldsRequiredForFutureMaterialization.includes(field),
    `missing required future field: ${field}`,
  );
}

for (const forbiddenPattern of [
  /selectedCodeAllowed\s*=\s*true/,
  /releasedCodeAllowed\s*=\s*true/,
  /classificationAllowed\s*=\s*true/,
  /poaClosureAllowed\s*=\s*true/,
  /downstreamAllowed\s*=\s*true/,
  /finalConclusionAllowed\s*=\s*true/,
  /selectedCode\s*:/,
  /releasedCode\s*:/,
  /finalConclusion\s*:/,
  /\bCLASSIFIED\b/,
]) {
  assert.ok(!forbiddenPattern.test(blueprint), `forbidden active token in blueprint: ${forbiddenPattern}`);
  assert.ok(!forbiddenPattern.test(precheck), `forbidden active token in precheck: ${forbiddenPattern}`);
}

assert.match(blueprint, /\bDaumas\b/, 'Daumas naming should be present and correctly spelled');
for (const badTerm of [/\bDAL\b/, /Dalmos/, /Dalmais/]) {
  assert.ok(!badTerm.test(blueprint), `invalid term found: ${badTerm}`);
  assert.ok(!badTerm.test(precheck), `invalid term found: ${badTerm}`);
}

for (const inventedQuestionPattern of [
  /P-1|P-2|O-1|O-2|A-1|A-2/,
  /Pergunta por eixo/i,
  /case-specific question/i,
  /auxiliary question/i,
]) {
  assert.ok(!inventedQuestionPattern.test(blueprint), `invented-question marker found: ${inventedQuestionPattern}`);
  assert.ok(!inventedQuestionPattern.test(precheck), `invented-question marker found: ${inventedQuestionPattern}`);
}

console.log('synthetic-pilot-gap001-materialization-blueprint-trial-001: OK');
