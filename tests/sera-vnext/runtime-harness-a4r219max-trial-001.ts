import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { runSeraVNextRuntimeReadOnlyHarness } from "./runtime-harness/sera-vnext-runtime-readonly-harness";

const rootDir = path.resolve(__dirname, "..", "..");

function rel(relativePath: string) {
  return path.join(rootDir, relativePath);
}

const protectedBefore = {
  baseline: statSync(rel("tests/sera-vnext/baselines/sera-vnext-baseline-v0.json")).mtimeMs,
  fixtureSet: statSync(rel("tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json")).mtimeMs,
  expectedOutputs: statSync(rel("tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json")).mtimeMs,
};

const result = runSeraVNextRuntimeReadOnlyHarness();

assert.equal(result.mode, "READ_ONLY_HARNESS");
assert.equal(result.baselineId, "SERA_VNEXT_BASELINE_V0");
assert.equal(result.fixtureCount, 7);
assert.equal(result.expectedOutputCount, 7);
assert.equal(result.productIntegrated, false);
assert.equal(result.runtimeIntegrated, false);
assert.equal(result.downstreamAllowed, false);
assert.equal(result.selectedCode, null);
assert.equal(result.releasedCode, null);
assert.equal(result.finalConclusion, null);
assert.equal(result.classifiedOutput, false);
assert.equal(result.readyPromotion, false);
assert.ok(result.warnings.includes("BOUNDARY_WARNING_REQUIRED"));
assert.ok(result.warnings.includes("SYNTHETIC_ONLY"));
assert.ok(result.warnings.includes("NO_SYNTHETIC_REAL_BLENDING"));
assert.ok(result.warnings.includes("CONTROL_ONLY"));

const protectedAfter = {
  baseline: statSync(rel("tests/sera-vnext/baselines/sera-vnext-baseline-v0.json")).mtimeMs,
  fixtureSet: statSync(rel("tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json")).mtimeMs,
  expectedOutputs: statSync(rel("tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json")).mtimeMs,
};
assert.deepEqual(protectedAfter, protectedBefore, "harness must not alter baseline artifacts");

const harnessSource = readFileSync(rel("tests/sera-vnext/runtime-harness/sera-vnext-runtime-readonly-harness.ts"), "utf8");
assert.equal(harnessSource.includes("frontend/src/lib/sera/"), false, "harness must not import product SERA runtime");
assert.equal(harnessSource.includes("frontend/src/app/api/"), false, "harness must not import API/UI");
assert.equal(harnessSource.includes("writeFile"), false, "harness must not write files");
assert.equal(harnessSource.includes("appendFile"), false, "harness must not append files");

console.log("A4R219 runtime read-only harness trial passed.");
