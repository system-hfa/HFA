export type SeraVNextRuntimeMode = "READ_ONLY_RUNTIME_MODULE";

export type SeraVNextBaselineRuntimeSummary = {
  mode: SeraVNextRuntimeMode;
  baselineId: string;
  namespace: "sera-vnext";
  status: "VNEXT_BASELINE_V0_OFFICIAL";
  fixtureCount: number;
  expectedOutputCount: number;
  productIntegrated: false;
  apiIntegrated: false;
  uiIntegrated: false;
  runtimeIntegrated: false;
  downstreamAllowed: false;
  selectedCode: null;
  releasedCode: null;
  finalConclusion: null;
  classifiedOutput: false;
  readyPromotion: false;
  warnings: string[];
};

export type SeraVNextFixtureType = "positive_fixture" | "synthetic_fixture" | "control_fixture";

export type SeraVNextBaselineFile = {
  baseline_id: string;
  namespace: string;
  status: string;
  fixtureCount: number;
  expectedOutputCount: number;
  positiveFixtures: string[];
  syntheticFixtures: string[];
  controlFixtures: string[];
  legacyBaseline: boolean;
  productEligibleNow: boolean;
  runtimeIntegrationAllowed: boolean;
  downstreamAllowed: boolean;
  sourceFixtureSet: string;
  sourceExpectedOutputs: string;
};

export type SeraVNextFixtureSetFile = {
  fixture_set_id: string;
  fixtures: Array<{
    fixtureId: string;
    fixtureType: SeraVNextFixtureType;
    path: string;
  }>;
  productStatus: string;
  runtimeIntegrationAllowed: boolean;
};

export type SeraVNextExpectedOutputsFile = {
  expected_outputs_id: string;
  expectedOutputs: Array<{
    fixtureId: string;
    boundaryWarnings?: string[];
    controlWarnings?: string[];
    forbiddenBehavior?: string[];
    nonFinalConfirmations?: string[];
  }>;
  productStatus: string;
  runtimeIntegrationAllowed: boolean;
};

export type SeraVNextLoadedBaseline = {
  baseline: SeraVNextBaselineFile;
  fixtureSet: SeraVNextFixtureSetFile;
  expectedOutputs: SeraVNextExpectedOutputsFile;
};
