import { assertProductBetaBlocked, runSeraVNextEngineValidation } from "./engine-validation/run-engine-validation";

async function main() {
  const result = await runSeraVNextEngineValidation("product_alpha_e2e");
  assertProductBetaBlocked(result);
  console.log("SERA_VNEXT_ENGINE_PRODUCT_ALPHA_E2E_BLOCKED_PRODUCT_BETA");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
