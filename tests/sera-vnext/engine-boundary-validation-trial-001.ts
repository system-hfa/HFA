import { assertProductBetaBlocked, runSeraVNextEngineValidation } from "./engine-validation/run-engine-validation";

async function main() {
  const result = await runSeraVNextEngineValidation("boundary");
  assertProductBetaBlocked(result);
  console.log("SERA_VNEXT_ENGINE_BOUNDARY_VALIDATION_BLOCKED_PRODUCT_BETA");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
