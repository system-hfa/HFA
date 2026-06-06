import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { getSeraVNextRuntimeReadOnlySummary } from "../../frontend/src/lib/sera-vnext-runtime";

const rootDir = path.resolve(__dirname, "..", "..");

function rel(relativePath: string) {
  return path.join(rootDir, relativePath);
}

function collectFiles(dir: string): string[] {
  const files: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) files.push(...collectFiles(full));
    else files.push(full);
  }
  return files;
}

const protectedBefore = {
  baseline: statSync(rel("tests/sera-vnext/baselines/sera-vnext-baseline-v0.json")).mtimeMs,
  fixtureSet: statSync(rel("tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json")).mtimeMs,
  expectedOutputs: statSync(rel("tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json")).mtimeMs,
};

const summary = getSeraVNextRuntimeReadOnlySummary();

assert.equal(summary.mode, "READ_ONLY_RUNTIME_MODULE");
assert.equal(summary.baselineId, "SERA_VNEXT_BASELINE_V0");
assert.equal(summary.namespace, "sera-vnext");
assert.equal(summary.status, "VNEXT_BASELINE_V0_OFFICIAL");
assert.equal(summary.fixtureCount, 7);
assert.equal(summary.expectedOutputCount, 7);
assert.equal(summary.productIntegrated, false);
assert.equal(summary.apiIntegrated, false);
assert.equal(summary.uiIntegrated, false);
assert.equal(summary.runtimeIntegrated, false);
assert.equal(summary.downstreamAllowed, false);
assert.equal(summary.selectedCode, null);
assert.equal(summary.releasedCode, null);
assert.equal(summary.finalConclusion, null);
assert.equal(summary.classifiedOutput, false);
assert.equal(summary.readyPromotion, false);
assert.ok(summary.warnings.includes("BOUNDARY_WARNING_REQUIRED"));
assert.ok(summary.warnings.includes("SYNTHETIC_ONLY"));
assert.ok(summary.warnings.includes("NO_SYNTHETIC_REAL_BLENDING"));
assert.ok(summary.warnings.includes("CONTROL_ONLY"));

const protectedAfter = {
  baseline: statSync(rel("tests/sera-vnext/baselines/sera-vnext-baseline-v0.json")).mtimeMs,
  fixtureSet: statSync(rel("tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json")).mtimeMs,
  expectedOutputs: statSync(rel("tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json")).mtimeMs,
};
assert.deepEqual(protectedAfter, protectedBefore, "runtime module must not alter baseline artifacts");

for (const file of collectFiles(rel("frontend/src/lib/sera-vnext-runtime"))) {
  const source = readFileSync(file, "utf8");
  assert.equal(source.includes("frontend/src/lib/sera/"), false, `${file}: must not import legacy product engine`);
  assert.equal(source.includes("frontend/src/app/api/"), false, `${file}: must not import API/UI`);
  assert.equal(source.includes("writeFile"), false, `${file}: must not write files`);
  assert.equal(source.includes("appendFile"), false, `${file}: must not append files`);
}

const importHits = execSync(
  "rg -n \"(^import .*sera-vnext-runtime(/|[\\\"'])| from [\\\"'].*sera-vnext-runtime(/|[\\\"']))\" frontend/src tests/sera-vnext -g '*.ts' -g '*.tsx'",
  { cwd: rootDir, encoding: "utf8" },
)
  .split("\n")
  .filter(Boolean);

for (const hit of importHits) {
  const a4r221IntegrationAuthorized = rel("tests/sera-vnext/runtime-service-a4r221max-trial-001.ts");
  const a4r221FailClosedAuthorized = rel("tests/sera-vnext/runtime-fail-closed-a4r221max-trial-001.ts");
  const a4r221EndpointPageAuthorized = rel("tests/sera-vnext/runtime-endpoint-page-a4r221max-trial-001.ts");

  assert.ok(
    hit.startsWith("tests/sera-vnext/runtime-module-a4r220max-trial-001.ts:") ||
      hit.startsWith("tests/sera-vnext/runtime-service-a4r221max-trial-001.ts:") ||
      hit.startsWith("tests/sera-vnext/runtime-fail-closed-a4r221max-trial-001.ts:") ||
      hit.startsWith("tests/sera-vnext/runtime-endpoint-page-a4r221max-trial-001.ts:") ||
      (hit.startsWith("frontend/src/app/api/admin/sera-vnext/status/route.ts:") && existsSync(a4r221IntegrationAuthorized)) ||
      (hit.startsWith("frontend/src/app/(dashboard)/admin/sera-vnext/page.tsx:") && existsSync(a4r221IntegrationAuthorized)) ||
      hit.startsWith("frontend/src/lib/sera-vnext-runtime/"),
    `runtime module imported outside allowed scope: ${hit}`,
  );

  assert.ok(existsSync(a4r221FailClosedAuthorized), "A4R221 fail-closed authorization trial must exist");
  assert.ok(existsSync(a4r221EndpointPageAuthorized), "A4R221 endpoint/page authorization trial must exist");
}

const changed = execSync("git diff --name-only && git diff --cached --name-only", {
  cwd: rootDir,
  encoding: "utf8",
})
  .split("\n")
  .filter(Boolean);
for (const file of changed) {
  if (file.startsWith("frontend/src/app/api/")) {
    assert.equal(
      file,
      "frontend/src/app/api/admin/sera-vnext/status/route.ts",
      `unexpected API protected path changed: ${file}`,
    );
    assert.ok(existsSync(rel("tests/sera-vnext/runtime-service-a4r221max-trial-001.ts")), "A4R221 runtime service trial must authorize API change");
    continue;
  }

  for (const prefix of ["frontend/src/lib/sera/", "supabase/migrations/", "tests/sera/fixtures/"]) {
    assert.equal(file.startsWith(prefix), false, `protected path changed: ${file}`);
  }
}

console.log("A4R220 isolated runtime module trial passed.");
