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

assert.doesNotThrow(() => validateSeraVNextBaselineReadOnly(cloneLoaded()), "official baseline must validate before mutation tests");

assertFailClosed("namespace incorrect", (loaded) => { loaded.baseline.namespace = "wrong"; });
assertFailClosed("baseline ID incorrect", (loaded) => { loaded.baseline.baseline_id = "WRONG"; });
assertFailClosed("fixture set absent", (loaded) => { (loaded.fixtureSet as unknown as { fixtures?: unknown }).fixtures = undefined; });
assertFailClosed("expected outputs absent", (loaded) => { (loaded.expectedOutputs as unknown as { expectedOutputs?: unknown }).expectedOutputs = undefined; });
assertFailClosed("fixtureCount mismatch", (loaded) => { loaded.baseline.fixtureCount = 6; });
assertFailClosed("expectedOutputCount mismatch", (loaded) => { loaded.baseline.expectedOutputCount = 6; });
assertFailClosed("runtimeIntegrationAllowed true", (loaded) => { loaded.baseline.runtimeIntegrationAllowed = true; });
assertFailClosed("productEligibleNow true", (loaded) => { loaded.baseline.productEligibleNow = true; });
assertFailClosed("downstreamAllowed true", (loaded) => { loaded.baseline.downstreamAllowed = true; });
assertFailClosed("baseline legacy true", (loaded) => { loaded.baseline.legacyBaseline = true; });
assertFailClosed("fixture legacy true", (loaded) => { (loaded.fixtureSet.fixtures[0] as unknown as { legacyFixture: boolean }).legacyFixture = true; });
assertFailClosed("Asiana warning absent", (loaded) => {
  for (const output of loaded.expectedOutputs.expectedOutputs) output.boundaryWarnings = (output.boundaryWarnings ?? []).filter((warning) => warning !== "automation / 500 ft gate must remain explicit");
});
assertFailClosed("UPS warning absent", (loaded) => {
  for (const output of loaded.expectedOutputs.expectedOutputs) output.boundaryWarnings = (output.boundaryWarnings ?? []).filter((warning) => warning !== "setup/FMC/V-S/MDA separation required");
});
assertFailClosed("GAP-004 synthetic-only absent", (loaded) => {
  for (const output of loaded.expectedOutputs.expectedOutputs) output.boundaryWarnings = (output.boundaryWarnings ?? []).filter((warning) => warning !== "SYNTHETIC_ONLY");
});
assertFailClosed("control-only absent", (loaded) => {
  for (const output of loaded.expectedOutputs.expectedOutputs) output.controlWarnings = (output.controlWarnings ?? []).filter((warning) => warning !== "CONTROL_ONLY");
});
assertFailClosed("positive fixture used as control", (loaded) => { loaded.baseline.controlFixtures.push(loaded.baseline.positiveFixtures[0]); });
assertFailClosed("control used as positive", (loaded) => { loaded.baseline.positiveFixtures.push(loaded.baseline.controlFixtures[0]); });
assertFailClosed("selectedCode non-null", (loaded) => { (loaded.expectedOutputs.expectedOutputs[0] as unknown as { selectedCode: string }).selectedCode = "P-A"; });
assertFailClosed("releasedCode non-null", (loaded) => { (loaded.expectedOutputs.expectedOutputs[0] as unknown as { releasedCode: string }).releasedCode = "P-A"; });
assertFailClosed("finalConclusion non-null", (loaded) => { (loaded.expectedOutputs.expectedOutputs[0] as unknown as { finalConclusion: string }).finalConclusion = "final"; });
assertFailClosed("classifiedOutput true", (loaded) => { (loaded.expectedOutputs.expectedOutputs[0] as unknown as { classifiedOutput: boolean }).classifiedOutput = true; });
assertFailClosed("readyPromotion true", (loaded) => { (loaded.expectedOutputs.expectedOutputs[0] as unknown as { readyPromotion: boolean }).readyPromotion = true; });

const protectedAfter = {
  baseline: statSync(rel("tests/sera-vnext/baselines/sera-vnext-baseline-v0.json")).mtimeMs,
  fixtureSet: statSync(rel("tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json")).mtimeMs,
  expectedOutputs: statSync(rel("tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json")).mtimeMs,
};
assert.deepEqual(protectedAfter, protectedBefore, "integrity trial must not mutate official files");

console.log("A4R222 runtime integrity trial passed.");
