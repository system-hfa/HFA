import { loadSeraVNextBaselineReadOnlySummary } from "../runtime-adapter/sera-vnext-baseline-readonly-adapter";

export type SeraVNextRuntimeHarnessResult = {
  mode: "READ_ONLY_HARNESS";
  baselineId: string;
  fixtureCount: number;
  expectedOutputCount: number;
  productIntegrated: false;
  runtimeIntegrated: false;
  downstreamAllowed: false;
  selectedCode: null;
  releasedCode: null;
  finalConclusion: null;
  classifiedOutput: false;
  readyPromotion: false;
  warnings: string[];
};

export function runSeraVNextRuntimeReadOnlyHarness(): SeraVNextRuntimeHarnessResult {
  const summary = loadSeraVNextBaselineReadOnlySummary();

  return {
    mode: "READ_ONLY_HARNESS",
    baselineId: summary.baselineId,
    fixtureCount: summary.fixtureCount,
    expectedOutputCount: summary.expectedOutputCount,
    productIntegrated: false,
    runtimeIntegrated: false,
    downstreamAllowed: false,
    selectedCode: null,
    releasedCode: null,
    finalConclusion: null,
    classifiedOutput: false,
    readyPromotion: false,
    warnings: [...summary.warnings],
  };
}
