import { readFileSync } from "node:fs";
import path from "node:path";
import type { SeraVNextExpectedOutputsFile, SeraVNextFixtureSetFile, SeraVNextLoadedBaseline, SeraVNextBaselineFile } from "./types";

const BASELINE_PATH = "tests/sera-vnext/baselines/sera-vnext-baseline-v0.json";
const FIXTURE_SET_PATH = "tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json";
const EXPECTED_OUTPUTS_PATH = "tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json";

function readJson<T>(relativePath: string): T {
  return JSON.parse(readFileSync(path.join(process.cwd(), relativePath), "utf8")) as T;
}

export function loadSeraVNextBaselineFiles(): SeraVNextLoadedBaseline {
  return {
    baseline: readJson<SeraVNextBaselineFile>(BASELINE_PATH),
    fixtureSet: readJson<SeraVNextFixtureSetFile>(FIXTURE_SET_PATH),
    expectedOutputs: readJson<SeraVNextExpectedOutputsFile>(EXPECTED_OUTPUTS_PATH),
  };
}
