import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { loadSeraVNextBaselineReadOnlySummary } from "./runtime-adapter/sera-vnext-baseline-readonly-adapter";

const rootDir = path.resolve(__dirname, "..", "..");

function rel(relativePath: string) {
  return path.join(rootDir, relativePath);
}

function collectFiles(dir: string): string[] {
  const files: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) files.push(...collectFiles(full));
    else files.push(full);
  }
  return files;
}

const protectedBefore = {
  baseline: statSync(rel("tests/sera-vnext/baselines/sera-vnext-baseline-v0.json")).mtimeMs,
  fixtureSet: statSync(rel("tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json")).mtimeMs,
  expectedOutputs: statSync(rel("tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json")).mtimeMs,
};

const summary = loadSeraVNextBaselineReadOnlySummary();

assert.equal(summary.baselineId, "SERA_VNEXT_BASELINE_V0");
assert.equal(summary.namespace, "sera-vnext");
assert.equal(summary.fixtureCount, 7);
assert.equal(summary.expectedOutputCount, 7);
assert.equal(summary.runtimeIntegrationAllowed, false);
assert.equal(summary.productEligibleNow, false);
assert.equal(summary.downstreamAllowed, false);
assert.equal(summary.positiveFixtures.length, 3);
assert.equal(summary.syntheticFixtures.length, 1);
assert.equal(summary.controlFixtures.length, 3);
assert.ok(summary.warnings.includes("BOUNDARY_WARNING_REQUIRED"), "Asiana/UPS boundary warning must be preserved");
assert.ok(summary.warnings.includes("SYNTHETIC_ONLY"), "GAP-004 synthetic-only warning must be preserved");
assert.ok(summary.warnings.includes("NO_SYNTHETIC_REAL_BLENDING"), "GAP-004 blending lock must be preserved");
assert.ok(summary.warnings.includes("CONTROL_ONLY"), "control-only warning must be preserved");

const protectedAfter = {
  baseline: statSync(rel("tests/sera-vnext/baselines/sera-vnext-baseline-v0.json")).mtimeMs,
  fixtureSet: statSync(rel("tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json")).mtimeMs,
  expectedOutputs: statSync(rel("tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json")).mtimeMs,
};
assert.deepEqual(protectedAfter, protectedBefore, "adapter must not write baseline artifacts");

const adapterSource = readFileSync(rel("tests/sera-vnext/runtime-adapter/sera-vnext-baseline-readonly-adapter.ts"), "utf8");
assert.equal(adapterSource.includes("frontend/src/lib/sera/"), false, "adapter must not import product SERA runtime");
assert.equal(adapterSource.includes("frontend/src/app/api/"), false, "adapter must not import API/UI");
assert.equal(adapterSource.includes("writeFile"), false, "adapter must not write files");
assert.equal(adapterSource.includes("appendFile"), false, "adapter must not append files");

for (const file of collectFiles(rel("tests/sera-vnext/runtime-adapter"))) {
  const source = readFileSync(file, "utf8");
  assert.equal(/selectedCode\s*[:=]\s*['"][^'"]+['"]/.test(source), false, `${file}: selectedCode must not be active`);
  assert.equal(/releasedCode\s*[:=]\s*['"][^'"]+['"]/.test(source), false, `${file}: releasedCode must not be active`);
  assert.equal(/finalConclusion\s*[:=]\s*['"][^'"]+['"]/.test(source), false, `${file}: finalConclusion must not be active`);
  assert.equal(/CLASSIFIED/.test(source), false, `${file}: CLASSIFIED must not be emitted`);
  assert.equal(/READY_FOR_HUMAN_DECISION|READY_FOR_PRODUCT|READY_FOR_RUNTIME/.test(source), false, `${file}: READY status must not be emitted`);
}

if (existsSync(rel("frontend/src/lib/sera-vnext-runtime"))) {
  assert.equal(
    existsSync(rel("tests/sera-vnext/runtime-module-a4r220max-trial-001.ts")),
    true,
    "runtime module must be authorized by the A4R220 trial",
  );
}

console.log("A4R218 read-only baseline adapter trial passed.");
