import assert from "node:assert/strict";
import { statSync } from "node:fs";
import path from "node:path";
import type { SeraVNextLoadedBaseline } from "../../frontend/src/lib/sera-vnext-runtime/types";
import { loadSeraVNextBaselineFiles, validateSeraVNextBaselineReadOnly } from "../../frontend/src/lib/sera-vnext-runtime";

const rootDir = path.resolve(__dirname, "..", "..");

function rel(relativePath: string) {
  return path.join(rootDir, relativePath);
}

function cloneLoaded(): SeraVNextLoadedBaseline {
  return JSON.parse(JSON.stringify(loadSeraVNextBaselineFiles())) as SeraVNextLoadedBaseline;
}

function assertFailClosed(label: string, mutate: (loaded: SeraVNextLoadedBaseline) => void) {
  const loaded = cloneLoaded();
  mutate(loaded);
  assert.throws(
    () => validateSeraVNextBaselineReadOnly(loaded),
    /SERA vNext runtime baseline validation failed:/,
    `${label} must fail closed`,
  );
}

const protectedBefore = {
  baseline: statSync(rel("tests/sera-vnext/baselines/sera-vnext-baseline-v0.json")).mtimeMs,
  fixtureSet: statSync(rel("tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json")).mtimeMs,
  expectedOutputs: statSync(rel("tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json")).mtimeMs,
};

assertFailClosed("wrong namespace", (loaded) => {
  loaded.baseline.namespace = "wrong-namespace";
});

assertFailClosed("wrong fixture count", (loaded) => {
  loaded.baseline.fixtureCount = 8;
});

assertFailClosed("runtime integration allowed", (loaded) => {
  loaded.baseline.runtimeIntegrationAllowed = true;
});

assertFailClosed("product eligible now", (loaded) => {
  loaded.baseline.productEligibleNow = true;
});

assertFailClosed("downstream allowed", (loaded) => {
  loaded.baseline.downstreamAllowed = true;
});

assertFailClosed("mandatory warning absent", (loaded) => {
  for (const output of loaded.expectedOutputs.expectedOutputs) {
    output.boundaryWarnings = (output.boundaryWarnings ?? []).filter((warning) => warning !== "BOUNDARY_WARNING_REQUIRED");
  }
});

assertFailClosed("Asiana boundary detail absent", (loaded) => {
  for (const output of loaded.expectedOutputs.expectedOutputs) {
    output.boundaryWarnings = (output.boundaryWarnings ?? []).filter((warning) => warning !== "automation / 500 ft gate must remain explicit");
  }
});

assertFailClosed("UPS boundary detail absent", (loaded) => {
  for (const output of loaded.expectedOutputs.expectedOutputs) {
    output.boundaryWarnings = (output.boundaryWarnings ?? []).filter((warning) => warning !== "setup/FMC/V-S/MDA separation required");
  }
});

const protectedAfter = {
  baseline: statSync(rel("tests/sera-vnext/baselines/sera-vnext-baseline-v0.json")).mtimeMs,
  fixtureSet: statSync(rel("tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json")).mtimeMs,
  expectedOutputs: statSync(rel("tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json")).mtimeMs,
};
assert.deepEqual(protectedAfter, protectedBefore, "fail-closed trial must not alter baseline artifacts");

console.log("A4R221 runtime fail-closed trial passed.");
