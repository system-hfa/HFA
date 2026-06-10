import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { performance } from "node:perf_hooks";

type ManifestEntry = {
  path: string;
  type: "UNIT" | "CONTRACT" | "STATIC" | "INTEGRATION" | "REAL_DB" | "REAL_API" | "REAL_UI" | "GATE";
  requiredForRegression: boolean;
  requiredEnvironment: string[];
  expectedExit: number;
  expectedStatus: "PASS" | "NOT_READY";
};

type Result = {
  path: string;
  type: ManifestEntry["type"];
  status: "PASS" | "FAIL" | "SKIP" | "NOT_READY" | "ENVIRONMENT_MISSING";
  exitCode: number | null;
  durationMs: number;
  requiredForRegression: boolean;
  failureSignature: string | null;
};

const rootDir = path.resolve(__dirname, "..");
const manifestPath = path.join(rootDir, "tests/sera-vnext/test-manifest.json");
const baseUrl = process.env.SERA_VNEXT_TEST_BASE_URL?.trim() || "http://127.0.0.1:3100";

if (!existsSync(manifestPath)) {
  throw new Error(`Missing SERA vNext manifest: ${manifestPath}`);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as ManifestEntry[];
const npxBin = process.platform === "win32" ? "npx.cmd" : "npx";

function loadFrontendEnv() {
  const envPath = path.join(rootDir, "frontend/.env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([^#=][^=]*)=(.*)$/);
    if (!match) continue;
    const key = match[1].trim();
    if (!process.env[key]) process.env[key] = match[2].trim();
  }
}

loadFrontendEnv();

async function canReachLocalFrontend(): Promise<boolean> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1500);
  try {
    const response = await fetch(baseUrl, { method: "GET", signal: controller.signal });
    return response.status >= 200 && response.status < 500;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

function requiredEnvironmentAvailable(name: string, localFrontendReachable: boolean): boolean {
  if (name === "LOCAL_FRONTEND_SERVER") return localFrontendReachable;
  return Boolean(process.env[name]?.trim());
}

function firstFailureLine(output: string): string | null {
  const lines = output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  return (
    lines.find((line) => /AssertionError|Error:|Fatal:|FAIL|✗|not ready|NOT_READY/i.test(line)) ??
    null
  );
}

function isExpectedNotReady(entry: ManifestEntry, exitCode: number, output: string): boolean {
  return (
    entry.type === "GATE" &&
    entry.expectedStatus === "NOT_READY" &&
    exitCode === entry.expectedExit &&
    output.includes("ENGINE_NATURALISTIC_VALIDATION_NOT_READY")
  );
}

function timeoutFor(entry: ManifestEntry): number {
  if (entry.type === "REAL_UI" || entry.type === "REAL_API") return 480_000;
  if (entry.type === "REAL_DB") return 240_000;
  return 180_000;
}

function runEntry(entry: ManifestEntry): Result {
  const started = performance.now();
  const result = spawnSync(npxBin, ["tsx", entry.path], {
    cwd: rootDir,
    encoding: "utf8",
    env: process.env,
    timeout: timeoutFor(entry),
  });
  const durationMs = Math.round(performance.now() - started);
  const exitCode = typeof result.status === "number" ? result.status : 124;
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;

  if (isExpectedNotReady(entry, exitCode, output)) {
    return {
      path: entry.path,
      type: entry.type,
      status: "NOT_READY",
      exitCode,
      durationMs,
      requiredForRegression: entry.requiredForRegression,
      failureSignature: firstFailureLine(output),
    };
  }

  const pass = exitCode === entry.expectedExit && entry.expectedStatus === "PASS";
  return {
    path: entry.path,
    type: entry.type,
    status: pass ? "PASS" : "FAIL",
    exitCode,
    durationMs,
    requiredForRegression: entry.requiredForRegression,
    failureSignature: pass ? null : firstFailureLine(output),
  };
}

async function main() {
  const localFrontendReachable = await canReachLocalFrontend();
  const results: Result[] = [];

  for (const entry of manifest) {
    const missingEnv = entry.requiredEnvironment.filter(
      (name) => !requiredEnvironmentAvailable(name, localFrontendReachable),
    );

    if (missingEnv.length > 0) {
      const status = entry.requiredForRegression ? "ENVIRONMENT_MISSING" : "SKIP";
      results.push({
        path: entry.path,
        type: entry.type,
        status,
        exitCode: null,
        durationMs: 0,
        requiredForRegression: entry.requiredForRegression,
        failureSignature: `missing environment: ${missingEnv.join(",")}`,
      });
      console.log(`${status} ${entry.path} (${missingEnv.join(",")})`);
      continue;
    }

    const result = runEntry(entry);
    results.push(result);
    console.log(`${result.status} ${entry.path} exit=${result.exitCode} durationMs=${result.durationMs}`);
    if (result.status === "FAIL" && result.failureSignature) {
      console.log(`  ${result.failureSignature}`);
    }
  }

  const testsDiscovered = manifest.length;
  const testsExecuted = results.filter((item) => !["SKIP", "ENVIRONMENT_MISSING"].includes(item.status)).length;
  const requiredResults = results.filter((item) => item.requiredForRegression && item.type !== "GATE");
  const regressionFailures = results.filter((item) => item.requiredForRegression && item.status === "FAIL");
  const unexpectedSkips = results.filter((item) => item.requiredForRegression && item.status === "SKIP");
  const environmentMissing = results.filter((item) => item.requiredForRegression && item.status === "ENVIRONMENT_MISSING");
  const timeoutFailures = results.filter(
    (item) =>
      item.exitCode === 124 ||
      item.exitCode === 143 ||
      (item.failureSignature ? /timeout|timed out|TIMEOUT/i.test(item.failureSignature) : false),
  );
  const gatesPassed = results.filter((item) => item.type === "GATE" && item.status === "PASS").length;
  const gatesNotReady = results.filter((item) => item.type === "GATE" && item.status === "NOT_READY").length;

  const summary = {
    tests_discovered: testsDiscovered,
    tests_executed: testsExecuted,
    tests_passed: requiredResults.filter((item) => item.status === "PASS").length,
    tests_failed: regressionFailures.length,
    tests_skipped: results.filter((item) => item.status === "SKIP").length,
    gates_passed: gatesPassed,
    gates_not_ready: gatesNotReady,
    environment_missing: environmentMissing.length,
    race_timeouts: timeoutFailures.length,
    unexpected_skips: unexpectedSkips.length,
  };

  console.log(JSON.stringify(summary, null, 2));

  if (
    regressionFailures.length > 0 ||
    unexpectedSkips.length > 0 ||
    environmentMissing.length > 0 ||
    timeoutFailures.length > 0
  ) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
