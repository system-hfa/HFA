import { isSeraVNextReadOnlyEnabled } from "./feature-flags";
import { loadSeraVNextBaselineFiles } from "./load-baseline";
import { toSeraVNextRuntimeError } from "./runtime-errors";
import type { SeraVNextRuntimeStatus } from "./types";
import { validateSeraVNextBaselineReadOnly } from "./validate-baseline";

export function getSeraVNextRuntimeStatus(): SeraVNextRuntimeStatus {
  if (!isSeraVNextReadOnlyEnabled()) {
    return {
      enabled: false,
      status: "DISABLED",
    };
  }

  try {
    const loaded = loadSeraVNextBaselineFiles();
    const warnings = validateSeraVNextBaselineReadOnly(loaded);

    return {
      enabled: true,
      status: "AVAILABLE",
      baselineId: "SERA_VNEXT_BASELINE_V0",
      namespace: "sera-vnext",
      fixtureCount: 7,
      expectedOutputCount: 7,
      positiveFixtureCount: 3,
      syntheticFixtureCount: 1,
      controlFixtureCount: 3,
      productIntegrated: false,
      classificationEnabled: false,
      downstreamAllowed: false,
      warnings,
    };
  } catch (error) {
    const safeError = toSeraVNextRuntimeError(error);
    console.warn("[sera-vnext-runtime] read-only status unavailable", {
      errorCode: safeError.errorCode,
    });

    return {
      enabled: true,
      status: "ERROR",
      errorCode: safeError.errorCode,
      safeMessage: safeError.safeMessage,
    };
  }
}
