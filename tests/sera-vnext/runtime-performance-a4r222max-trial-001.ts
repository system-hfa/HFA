import assert from "node:assert/strict";
import { statSync } from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { getSeraVNextRuntimeStatus } from "../../frontend/src/lib/sera-vnext-runtime/runtime-service";

const rootDir = path.resolve(__dirname, "..", "..");
const originalReadOnlyFlag = process.env.SERA_VNEXT_READONLY_ENABLED;

function rel(relativePath: string) {
  return path.join(rootDir, relativePath);
}

function restoreEnv() {
  if (originalReadOnlyFlag === undefined) delete process.env.SERA_VNEXT_READONLY_ENABLED;
  else process.env.SERA_VNEXT_READONLY_ENABLED = originalReadOnlyFlag;
}

function snapshot() {
  return {
    baseline: statSync(rel("tests/sera-vnext/baselines/sera-vnext-baseline-v0.json")).mtimeMs,
    fixtureSet: statSync(rel("tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json")).mtimeMs,
    expectedOutputs: statSync(rel("tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json")).mtimeMs,
  };
}

async function main() {
  try {
  process.env.SERA_VNEXT_READONLY_ENABLED = "true";
  const before = snapshot();
  const durations: number[] = [];
  const results: string[] = [];

  for (let i = 0; i < 10; i += 1) {
    const start = performance.now();
    const status = getSeraVNextRuntimeStatus();
    durations.push(performance.now() - start);
    results.push(JSON.stringify(status));
    assert.equal(status.status, "AVAILABLE");
  }

  const concurrent = await Promise.all(
    Array.from({ length: 20 }, async () => {
      const start = performance.now();
      const status = getSeraVNextRuntimeStatus();
      return { status, duration: performance.now() - start };
    }),
  );
  durations.push(...concurrent.map((item) => item.duration));
  results.push(...concurrent.map((item) => JSON.stringify(item.status)));

  const first = results[0];
  for (const result of results) assert.equal(result, first, "runtime status must be repeatable");
  for (const item of concurrent) assert.equal(item.status.status, "AVAILABLE");

  const min = Math.min(...durations);
  const max = Math.max(...durations);
  const avg = durations.reduce((sum, value) => sum + value, 0) / durations.length;
  assert.ok(Number.isFinite(avg));
  assert.deepEqual(snapshot(), before, "performance trial must not mutate official files");

  console.log(JSON.stringify({ sequentialReads: 10, concurrentReads: 20, minMs: min, maxMs: max, avgMs: avg, errors: 0 }, null, 2));
  console.log("A4R222 runtime performance trial passed.");
  } finally {
    restoreEnv();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
