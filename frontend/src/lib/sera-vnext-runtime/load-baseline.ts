import { readFileSync } from "node:fs";
import path from "node:path";
import type { SeraVNextExpectedOutputsFile, SeraVNextFixtureSetFile, SeraVNextLoadedBaseline, SeraVNextBaselineFile } from "./types";

const repoRoot = path.basename(process.cwd()) === "frontend" ? path.dirname(process.cwd()) : process.cwd();
const BASELINE_PATH = path.join(repoRoot, "tests", "sera-vnext", "baselines", "sera-vnext-baseline-v0.json");
const FIXTURE_SET_PATH = path.join(repoRoot, "tests", "sera-vnext", "fixture-sets", "sera-vnext-fixture-set-v0.json");
const EXPECTED_OUTPUTS_PATH = path.join(
  repoRoot,
  "tests",
  "sera-vnext",
  "baseline-candidates",
  "sera-vnext-fixture-set-v0-expected-outputs.json",
);

function readJson<T>(absolutePath: string): T {
  return JSON.parse(readFileSync(absolutePath, "utf8")) as T;
}

export function loadSeraVNextBaselineFiles(): SeraVNextLoadedBaseline {
  return {
    baseline: readJson<SeraVNextBaselineFile>(BASELINE_PATH),
    fixtureSet: readJson<SeraVNextFixtureSetFile>(FIXTURE_SET_PATH),
    expectedOutputs: readJson<SeraVNextExpectedOutputsFile>(EXPECTED_OUTPUTS_PATH),
  };
}
