import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const rootDir = path.resolve(__dirname, "..", "..");

function rel(relativePath: string) {
  return path.join(rootDir, relativePath);
}

function read(relativePath: string): string {
  return readFileSync(rel(relativePath), "utf8");
}

const authoritativeDocs = [
  "docs/sera-vnext/final-methodology-closure/SERA_VNEXT_FINAL_AUTHORITATIVE_STATE.md",
  "docs/sera-vnext/final-methodology-closure/SERA_VNEXT_FINAL_METHODOLOGY_CLOSURE.md",
  "docs/sera-vnext/final-methodology-closure/SERA_VNEXT_PRODUCT_TRANSITION_CONTRACT.md",
  "docs/sera-vnext/final-methodology-closure/SERA_VNEXT_ARCHIVE_AND_SUPERSESSION_REGISTER.csv",
  "docs/sera-vnext/final-methodology-closure/SERA_VNEXT_OPEN_PRODUCT_BACKLOG.csv",
  "docs/sera-vnext/staging-activation-a4r224/managed-staging-pilot/SERA_VNEXT_A4R224_EVIDENCE_CORRECTION_NOTICE.md",
];

const correctedA4R224Artifacts = [
  "tests/sera-vnext/real-admin-session-a4r224max-trial-001.ts",
  "tests/sera-vnext/managed-staging-activation-a4r224max-trial-001.ts",
  "docs/sera-vnext/staging-activation-a4r224/managed-staging-pilot/SERA_VNEXT_REAL_ADMIN_SESSION_VALIDATION_A4R224_MAX.md",
  "docs/sera-vnext/staging-activation-a4r224/managed-staging-pilot/SERA_VNEXT_MANAGED_STAGING_ACTIVATION_A4R224_MAX_v0.2.0.md",
  "docs/sera-vnext/staging-activation-a4r224/managed-staging-pilot/SERA_VNEXT_NEXT_MACROPHASE_DECISION_A4R224_MAX.md",
  "docs/sera-vnext/staging-activation-a4r224/managed-staging-pilot/SERA_VNEXT_STAGING_DIAGNOSTIC_PAGE_RESULTS_A4R224_MAX.md",
];

for (const relativePath of authoritativeDocs) {
  assert.equal(existsSync(rel(relativePath)), true, `required document missing: ${relativePath}`);
}

assert.equal(existsSync(rel("tests/sera-vnext/baselines/sera-vnext-baseline-v0.json")), true);
assert.equal(existsSync(rel("tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json")), true);
assert.equal(existsSync(rel("tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json")), true);
assert.equal(existsSync(rel("tests/sera-vnext/fixtures")), true);

const authoritativeState = read("docs/sera-vnext/final-methodology-closure/SERA_VNEXT_FINAL_AUTHORITATIVE_STATE.md");
for (const expected of [
  "methodologyStatus: FROZEN_FOR_CURRENT_PRODUCT_STAGE",
  "fixtureStatus: VNEXT_OFFICIAL_FIXTURES_ACTIVE",
  "fixtureSetStatus: SERA_VNEXT_FIXTURE_SET_V0",
  "baselineStatus: VNEXT_BASELINE_V0_OFFICIAL",
  "productStatus: PRODUCT_ALPHA_INTEGRATION_AUTHORIZED",
  "scientificValidationStatus: OPTIONAL_FUTURE_BACKLOG",
]) {
  assert.ok(authoritativeState.includes(expected), `authoritative state missing: ${expected}`);
}

const closureDoc = read("docs/sera-vnext/final-methodology-closure/SERA_VNEXT_FINAL_METHODOLOGY_CLOSURE.md");
assert.ok(closureDoc.includes("SERA_VNEXT_METHODOLOGY_FROZEN_FOR_PRODUCT_ALPHA"));
assert.ok(closureDoc.includes("Do not create new methodology-preparation phases"));

const transitionContract = read("docs/sera-vnext/final-methodology-closure/SERA_VNEXT_PRODUCT_TRANSITION_CONTRACT.md");
assert.ok(transitionContract.includes("Methodology Frozen"));
assert.ok(transitionContract.includes("Product In Development"));

for (const relativePath of correctedA4R224Artifacts) {
  const source = read(relativePath);
  assert.equal(
    source.includes("REAL_SUPABASE_ENTERPRISE_ADMIN_VERIFIED"),
    false,
    `legacy overclaim must be absent from ${relativePath}`,
  );
  assert.ok(
    source.includes("REAL_DATABASE_ENTERPRISE_ADMIN_RECORD_VERIFIED"),
    `corrected DB evidence status missing from ${relativePath}`,
  );
}

const correctionNotice = read(
  "docs/sera-vnext/staging-activation-a4r224/managed-staging-pilot/SERA_VNEXT_A4R224_EVIDENCE_CORRECTION_NOTICE.md",
);
for (const expected of [
  "DEPENDENCY_INJECTED_ADMIN_CONTEXT_HANDLER_VERIFIED",
  "REAL_SUPABASE_SESSION_NOT_VERIFIED",
  "REAL_REQUIRE_ADMIN_HTTP_FLOW_NOT_VERIFIED",
  "REAL_AUTHENTICATED_BROWSER_NOT_VERIFIED",
]) {
  assert.ok(correctionNotice.includes(expected), `correction notice missing ${expected}`);
}

const backlog = read("docs/sera-vnext/final-methodology-closure/SERA_VNEXT_OPEN_PRODUCT_BACKLOG.csv");
assert.equal(backlog.includes("preparar metodologia"), false, "product backlog must not include new methodology prep");

console.log("FINAL_METHODOLOGY_CLOSURE_OK");
