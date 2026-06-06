import { loadSeraVNextBaselineFiles } from "./load-baseline";
import type { SeraVNextBaselineRuntimeSummary } from "./types";
import { validateSeraVNextBaselineReadOnly } from "./validate-baseline";

export function getSeraVNextRuntimeReadOnlySummary(): SeraVNextBaselineRuntimeSummary {
  const loaded = loadSeraVNextBaselineFiles();
  const warnings = validateSeraVNextBaselineReadOnly(loaded);

  return {
    mode: "READ_ONLY_RUNTIME_MODULE",
    baselineId: loaded.baseline.baseline_id,
    namespace: "sera-vnext",
    status: "VNEXT_BASELINE_V0_OFFICIAL",
    fixtureCount: loaded.baseline.fixtureCount,
    expectedOutputCount: loaded.baseline.expectedOutputCount,
    productIntegrated: false,
    apiIntegrated: false,
    uiIntegrated: false,
    runtimeIntegrated: false,
    downstreamAllowed: false,
    selectedCode: null,
    releasedCode: null,
    finalConclusion: null,
    classifiedOutput: false,
    readyPromotion: false,
    warnings,
  };
}
