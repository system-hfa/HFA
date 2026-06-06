import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { getSeraVNextRuntimeStatus } from "../../frontend/src/lib/sera-vnext-runtime/runtime-service";
import { isSeraVNextDiagnosticsEnabled, isSeraVNextReadOnlyEnabled } from "../../frontend/src/lib/sera-vnext-runtime/feature-flags";

const rootDir = path.resolve(__dirname, "..", "..");

function rel(relativePath: string) {
  return path.join(rootDir, relativePath);
}

const originalReadOnlyFlag = process.env.SERA_VNEXT_READONLY_ENABLED;
const originalDiagnosticsFlag = process.env.NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED;

function restoreEnv() {
  if (originalReadOnlyFlag === undefined) delete process.env.SERA_VNEXT_READONLY_ENABLED;
  else process.env.SERA_VNEXT_READONLY_ENABLED = originalReadOnlyFlag;

  if (originalDiagnosticsFlag === undefined) delete process.env.NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED;
  else process.env.NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED = originalDiagnosticsFlag;
}

try {
  delete process.env.SERA_VNEXT_READONLY_ENABLED;
  delete process.env.NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED;

  assert.equal(isSeraVNextReadOnlyEnabled(), false, "read-only flag must default false");
  assert.equal(isSeraVNextDiagnosticsEnabled(), false, "diagnostics flag must default false");
  assert.deepEqual(getSeraVNextRuntimeStatus(), { enabled: false, status: "DISABLED" });

  process.env.SERA_VNEXT_READONLY_ENABLED = "true";
  process.env.NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED = "true";
  assert.equal(isSeraVNextReadOnlyEnabled(), true);
  assert.equal(isSeraVNextDiagnosticsEnabled(), true);

  const protectedBefore = {
    baseline: statSync(rel("tests/sera-vnext/baselines/sera-vnext-baseline-v0.json")).mtimeMs,
    fixtureSet: statSync(rel("tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json")).mtimeMs,
    expectedOutputs: statSync(rel("tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json")).mtimeMs,
  };

  const status = getSeraVNextRuntimeStatus();
  assert.equal(status.enabled, true);
  assert.equal(status.status, "AVAILABLE");
  assert.equal(status.baselineId, "SERA_VNEXT_BASELINE_V0");
  assert.equal(status.namespace, "sera-vnext");
  assert.equal(status.fixtureCount, 7);
  assert.equal(status.expectedOutputCount, 7);
  assert.equal(status.positiveFixtureCount, 3);
  assert.equal(status.syntheticFixtureCount, 1);
  assert.equal(status.controlFixtureCount, 3);
  assert.equal(status.productIntegrated, false);
  assert.equal(status.classificationEnabled, false);
  assert.equal(status.downstreamAllowed, false);
  assert.ok(status.warnings.includes("BOUNDARY_WARNING_REQUIRED"));
  assert.ok(status.warnings.includes("automation / 500 ft gate must remain explicit"));
  assert.ok(status.warnings.includes("setup/FMC/V-S/MDA separation required"));
  assert.ok(status.warnings.includes("SYNTHETIC_ONLY"));
  assert.ok(status.warnings.includes("NO_SYNTHETIC_REAL_BLENDING"));
  assert.ok(status.warnings.includes("CONTROL_ONLY"));

  for (const forbidden of ["selectedCode", "releasedCode", "finalConclusion", "classifiedOutput", "readyPromotion"]) {
    assert.equal(Object.prototype.hasOwnProperty.call(status, forbidden), false, `${forbidden} must not be returned by runtime status`);
  }

  const protectedAfter = {
    baseline: statSync(rel("tests/sera-vnext/baselines/sera-vnext-baseline-v0.json")).mtimeMs,
    fixtureSet: statSync(rel("tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json")).mtimeMs,
    expectedOutputs: statSync(rel("tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json")).mtimeMs,
  };
  assert.deepEqual(protectedAfter, protectedBefore, "runtime service must not write baseline artifacts");

  for (const file of [
    "frontend/src/lib/sera-vnext-runtime/runtime-service.ts",
    "frontend/src/lib/sera-vnext-runtime/feature-flags.ts",
    "frontend/src/lib/sera-vnext-runtime/runtime-errors.ts",
  ]) {
    const source = readFileSync(rel(file), "utf8");
    assert.equal(source.includes("@/lib/sera/"), false, `${file}: must not import legacy SERA runtime`);
    assert.equal(source.includes("writeFile"), false, `${file}: must not write files`);
    assert.equal(source.includes("appendFile"), false, `${file}: must not append files`);
  }

  console.log("A4R221 runtime service trial passed.");
} finally {
  restoreEnv();
}
