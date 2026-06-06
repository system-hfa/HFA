import { readFileSync } from "node:fs";
import path from "node:path";

type FixtureType = "positive_fixture" | "synthetic_fixture" | "control_fixture";

type BaselineRecord = {
  baseline_id: string;
  namespace: string;
  status: string;
  fixtureCount: number;
  expectedOutputCount: number;
  positiveFixtures: string[];
  syntheticFixtures: string[];
  controlFixtures: string[];
  legacyBaseline: boolean;
  productEligibleNow: boolean;
  runtimeIntegrationAllowed: boolean;
  downstreamAllowed: boolean;
  sourceFixtureSet: string;
  sourceExpectedOutputs: string;
};

type FixtureSetRecord = {
  fixture_set_id: string;
  fixtures: Array<{
    fixtureId: string;
    fixtureType: FixtureType;
    path: string;
  }>;
  runtimeIntegrationAllowed: boolean;
  productStatus: string;
};

type ExpectedOutputsRecord = {
  expected_outputs_id: string;
  expectedOutputs: Array<{
    fixtureId: string;
    boundaryWarnings?: string[];
    controlWarnings?: string[];
    forbiddenBehavior?: string[];
    nonFinalConfirmations?: string[];
  }>;
  runtimeIntegrationAllowed: boolean;
  productStatus: string;
};

export type SeraVNextReadOnlyBaselineSummary = {
  baselineId: string;
  namespace: "sera-vnext";
  status: string;
  fixtureCount: number;
  expectedOutputCount: number;
  runtimeIntegrationAllowed: false;
  productEligibleNow: false;
  downstreamAllowed: false;
  positiveFixtures: string[];
  syntheticFixtures: string[];
  controlFixtures: string[];
  warnings: string[];
};

const BASELINE_PATH = "tests/sera-vnext/baselines/sera-vnext-baseline-v0.json";
const FIXTURE_SET_PATH = "tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json";
const EXPECTED_OUTPUTS_PATH = "tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json";

function readJson<T>(relativePath: string): T {
  return JSON.parse(readFileSync(path.join(process.cwd(), relativePath), "utf8")) as T;
}

function assertCondition(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`SERA vNext read-only adapter validation failed: ${message}`);
}

function collectWarnings(expectedOutputs: ExpectedOutputsRecord): string[] {
  const warnings = new Set<string>();

  for (const output of expectedOutputs.expectedOutputs) {
    for (const warning of output.boundaryWarnings ?? []) warnings.add(warning);
    for (const warning of output.controlWarnings ?? []) warnings.add(warning);
  }

  return [...warnings].sort();
}

export function loadSeraVNextBaselineReadOnlySummary(): SeraVNextReadOnlyBaselineSummary {
  const baseline = readJson<BaselineRecord>(BASELINE_PATH);
  const fixtureSet = readJson<FixtureSetRecord>(FIXTURE_SET_PATH);
  const expectedOutputs = readJson<ExpectedOutputsRecord>(EXPECTED_OUTPUTS_PATH);

  assertCondition(baseline.baseline_id === "SERA_VNEXT_BASELINE_V0", "unexpected baseline id");
  assertCondition(baseline.namespace === "sera-vnext", "unexpected namespace");
  assertCondition(baseline.status === "VNEXT_BASELINE_V0_OFFICIAL", "unexpected baseline status");
  assertCondition(baseline.sourceFixtureSet === fixtureSet.fixture_set_id, "fixture set id mismatch");
  assertCondition(baseline.sourceExpectedOutputs === expectedOutputs.expected_outputs_id, "expected outputs id mismatch");
  assertCondition(baseline.fixtureCount === fixtureSet.fixtures.length, "fixture count mismatch");
  assertCondition(baseline.expectedOutputCount === expectedOutputs.expectedOutputs.length, "expected output count mismatch");
  assertCondition(baseline.positiveFixtures.length === 3, "positive fixture count mismatch");
  assertCondition(baseline.syntheticFixtures.length === 1, "synthetic fixture count mismatch");
  assertCondition(baseline.controlFixtures.length === 3, "control fixture count mismatch");
  assertCondition(fixtureSet.fixtures.filter((fixture) => fixture.fixtureType === "positive_fixture").length === 3, "fixture set positive count mismatch");
  assertCondition(fixtureSet.fixtures.filter((fixture) => fixture.fixtureType === "synthetic_fixture").length === 1, "fixture set synthetic count mismatch");
  assertCondition(fixtureSet.fixtures.filter((fixture) => fixture.fixtureType === "control_fixture").length === 3, "fixture set control count mismatch");

  const fixtureIds = new Set(fixtureSet.fixtures.map((fixture) => fixture.fixtureId));
  for (const output of expectedOutputs.expectedOutputs) {
    assertCondition(fixtureIds.has(output.fixtureId), `expected output missing fixture: ${output.fixtureId}`);
    assertCondition(output.nonFinalConfirmations?.includes("selectedCode remains null"), `${output.fixtureId} missing selectedCode lock`);
    assertCondition(output.nonFinalConfirmations?.includes("releasedCode remains null"), `${output.fixtureId} missing releasedCode lock`);
    assertCondition(output.nonFinalConfirmations?.includes("finalConclusion remains null"), `${output.fixtureId} missing finalConclusion lock`);
    assertCondition(output.nonFinalConfirmations?.includes("classifiedOutput remains false"), `${output.fixtureId} missing classifiedOutput lock`);
    assertCondition(output.forbiddenBehavior?.includes("product/runtime use"), `${output.fixtureId} missing product/runtime lock`);
  }

  assertCondition(baseline.legacyBaseline === false, "legacy baseline flag must remain false");
  assertCondition(baseline.productEligibleNow === false, "product eligibility must remain false");
  assertCondition(baseline.runtimeIntegrationAllowed === false, "runtime integration must remain false");
  assertCondition(baseline.downstreamAllowed === false, "downstream must remain false");
  assertCondition(fixtureSet.runtimeIntegrationAllowed === false, "fixture set runtime integration must remain false");
  assertCondition(expectedOutputs.runtimeIntegrationAllowed === false, "expected outputs runtime integration must remain false");
  assertCondition(fixtureSet.productStatus === "NOT_PRODUCT", "fixture set must remain non-product");
  assertCondition(expectedOutputs.productStatus === "NOT_PRODUCT", "expected outputs must remain non-product");

  const warnings = collectWarnings(expectedOutputs);
  assertCondition(warnings.includes("BOUNDARY_WARNING_REQUIRED"), "Asiana/UPS boundary warning missing");
  assertCondition(warnings.includes("SYNTHETIC_ONLY"), "GAP-004 synthetic warning missing");
  assertCondition(warnings.includes("NO_SYNTHETIC_REAL_BLENDING"), "synthetic-real blending lock missing");
  assertCondition(warnings.includes("CONTROL_ONLY"), "control-only warning missing");

  return {
    baselineId: baseline.baseline_id,
    namespace: "sera-vnext",
    status: baseline.status,
    fixtureCount: baseline.fixtureCount,
    expectedOutputCount: baseline.expectedOutputCount,
    runtimeIntegrationAllowed: false,
    productEligibleNow: false,
    downstreamAllowed: false,
    positiveFixtures: [...baseline.positiveFixtures],
    syntheticFixtures: [...baseline.syntheticFixtures],
    controlFixtures: [...baseline.controlFixtures],
    warnings,
  };
}
