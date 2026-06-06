import type { SeraVNextLoadedBaseline } from "./types";

function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(`SERA vNext runtime baseline validation failed: ${message}`);
}

export function collectSeraVNextBaselineWarnings(loaded: SeraVNextLoadedBaseline): string[] {
  const warnings = new Set<string>();

  for (const output of loaded.expectedOutputs.expectedOutputs) {
    for (const warning of output.boundaryWarnings ?? []) warnings.add(warning);
    for (const warning of output.controlWarnings ?? []) warnings.add(warning);
  }

  return [...warnings].sort();
}

export function validateSeraVNextBaselineReadOnly(loaded: SeraVNextLoadedBaseline): string[] {
  const { baseline, fixtureSet, expectedOutputs } = loaded;

  invariant(baseline.baseline_id === "SERA_VNEXT_BASELINE_V0", "unexpected baseline id");
  invariant(baseline.namespace === "sera-vnext", "unexpected namespace");
  invariant(baseline.status === "VNEXT_BASELINE_V0_OFFICIAL", "unexpected baseline status");
  invariant(baseline.sourceFixtureSet === fixtureSet.fixture_set_id, "fixture set id mismatch");
  invariant(baseline.sourceExpectedOutputs === expectedOutputs.expected_outputs_id, "expected outputs id mismatch");
  invariant(baseline.fixtureCount === 7, "unexpected fixture count");
  invariant(baseline.expectedOutputCount === 7, "unexpected expected output count");
  invariant(Array.isArray(fixtureSet.fixtures), "fixture set missing fixtures array");
  invariant(Array.isArray(expectedOutputs.expectedOutputs), "expected outputs array missing");
  invariant(fixtureSet.fixtures.length === baseline.fixtureCount, "fixture set count mismatch");
  invariant(expectedOutputs.expectedOutputs.length === baseline.expectedOutputCount, "expected output count mismatch");
  invariant(baseline.positiveFixtures.length === 3, "positive fixture count mismatch");
  invariant(baseline.syntheticFixtures.length === 1, "synthetic fixture count mismatch");
  invariant(baseline.controlFixtures.length === 3, "control fixture count mismatch");
  invariant(fixtureSet.fixtures.filter((fixture) => fixture.fixtureType === "positive_fixture").length === 3, "fixture positive count mismatch");
  invariant(fixtureSet.fixtures.filter((fixture) => fixture.fixtureType === "synthetic_fixture").length === 1, "fixture synthetic count mismatch");
  invariant(fixtureSet.fixtures.filter((fixture) => fixture.fixtureType === "control_fixture").length === 3, "fixture control count mismatch");

  for (const fixture of fixtureSet.fixtures) {
    const record = fixture as typeof fixture & { legacyFixture?: boolean };
    invariant(record.legacyFixture !== true, `${fixture.fixtureId} must not be marked legacy`);
    if (fixture.fixtureType === "positive_fixture") {
      invariant(baseline.positiveFixtures.includes(fixture.fixtureId), `${fixture.fixtureId} missing from positive fixtures`);
      invariant(!baseline.controlFixtures.includes(fixture.fixtureId), `${fixture.fixtureId} positive fixture cannot be control`);
    }
    if (fixture.fixtureType === "synthetic_fixture") {
      invariant(baseline.syntheticFixtures.includes(fixture.fixtureId), `${fixture.fixtureId} missing from synthetic fixtures`);
    }
    if (fixture.fixtureType === "control_fixture") {
      invariant(baseline.controlFixtures.includes(fixture.fixtureId), `${fixture.fixtureId} missing from control fixtures`);
      invariant(!baseline.positiveFixtures.includes(fixture.fixtureId), `${fixture.fixtureId} control fixture cannot be positive`);
    }
  }

  invariant(baseline.legacyBaseline === false, "legacy baseline flag must remain false");
  invariant(baseline.productEligibleNow === false, "product eligibility must remain false");
  invariant(baseline.runtimeIntegrationAllowed === false, "runtime integration flag must remain false");
  invariant(baseline.downstreamAllowed === false, "downstream flag must remain false");
  invariant(fixtureSet.productStatus === "NOT_PRODUCT", "fixture set must remain non-product");
  invariant(expectedOutputs.productStatus === "NOT_PRODUCT", "expected outputs must remain non-product");
  invariant(fixtureSet.runtimeIntegrationAllowed === false, "fixture set runtime integration must remain false");
  invariant(expectedOutputs.runtimeIntegrationAllowed === false, "expected outputs runtime integration must remain false");

  const fixtureIds = new Set(fixtureSet.fixtures.map((fixture) => fixture.fixtureId));
  for (const output of expectedOutputs.expectedOutputs) {
    const record = output as typeof output & {
      selectedCode?: unknown;
      releasedCode?: unknown;
      finalConclusion?: unknown;
      classifiedOutput?: unknown;
      readyPromotion?: unknown;
    };
    invariant(fixtureIds.has(output.fixtureId), `missing fixture for expected output ${output.fixtureId}`);
    invariant(record.selectedCode == null, `${output.fixtureId} selectedCode must remain null`);
    invariant(record.releasedCode == null, `${output.fixtureId} releasedCode must remain null`);
    invariant(record.finalConclusion == null, `${output.fixtureId} finalConclusion must remain null`);
    invariant(record.classifiedOutput !== true, `${output.fixtureId} classifiedOutput must not be true`);
    invariant(record.readyPromotion !== true, `${output.fixtureId} readyPromotion must not be true`);
    invariant(output.forbiddenBehavior?.includes("product/runtime use"), `${output.fixtureId} missing product/runtime lock`);
    invariant(output.nonFinalConfirmations?.includes("selectedCode remains null"), `${output.fixtureId} missing selected code lock`);
    invariant(output.nonFinalConfirmations?.includes("releasedCode remains null"), `${output.fixtureId} missing released code lock`);
    invariant(output.nonFinalConfirmations?.includes("finalConclusion remains null"), `${output.fixtureId} missing final conclusion lock`);
    invariant(output.nonFinalConfirmations?.includes("classifiedOutput remains false"), `${output.fixtureId} missing classification lock`);
  }

  const warnings = collectSeraVNextBaselineWarnings(loaded);
  invariant(warnings.includes("BOUNDARY_WARNING_REQUIRED"), "boundary warning missing");
  invariant(warnings.includes("automation / 500 ft gate must remain explicit"), "Asiana automation / 500 ft warning missing");
  invariant(warnings.includes("setup/FMC/V-S/MDA separation required"), "UPS setup/FMC/V-S/MDA warning missing");
  invariant(warnings.includes("SYNTHETIC_ONLY"), "synthetic-only warning missing");
  invariant(warnings.includes("NO_SYNTHETIC_REAL_BLENDING"), "synthetic blending lock missing");
  invariant(warnings.includes("CONTROL_ONLY"), "control-only warning missing");

  return warnings;
}
