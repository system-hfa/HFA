import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { getSeraVNextRuntimeStatus } from "../../frontend/src/lib/sera-vnext-runtime/runtime-service";

const rootDir = path.resolve(__dirname, "..", "..");
const protectedFiles = [
  "tests/sera-vnext/baselines/sera-vnext-baseline-v0.json",
  "tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json",
  "tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json",
];
const fixtureDirectory = "tests/sera-vnext/fixtures";
const originalReadOnlyFlag = process.env.SERA_VNEXT_READONLY_ENABLED;

function sha256(content: Buffer | string): string {
  return createHash("sha256").update(content).digest("hex");
}

function listFiles(relativeDirectory: string): string[] {
  const absoluteDirectory = path.join(rootDir, relativeDirectory);
  return readdirSync(absoluteDirectory, { withFileTypes: true })
    .flatMap((entry) => {
      const relativePath = path.posix.join(relativeDirectory, entry.name);
      return entry.isDirectory() ? listFiles(relativePath) : [relativePath];
    })
    .sort();
}

function snapshot(): Record<string, string> {
  const files = [...protectedFiles, ...listFiles(fixtureDirectory)];
  const hashes = Object.fromEntries(
    files.map((relativePath) => [relativePath, sha256(readFileSync(path.join(rootDir, relativePath)))]),
  );
  const fixtureManifest = listFiles(fixtureDirectory)
    .map((relativePath) => `${hashes[relativePath]}  ${relativePath}`)
    .join("\n");
  hashes[`${fixtureDirectory}/ DIRECTORY_MANIFEST`] = sha256(`${fixtureManifest}\n`);
  return hashes;
}

async function main() {
  try {
    process.env.SERA_VNEXT_READONLY_ENABLED = "true";
    const before = snapshot();

    for (let index = 0; index < 100; index += 1) {
      const status = getSeraVNextRuntimeStatus();
      assert.equal(status.status, "AVAILABLE");
    }

    const after = snapshot();
    assert.deepEqual(after, before, "protected artifacts must remain byte-identical");
    assert.equal(before[protectedFiles[0]], "173e5e3b11e0ec1caff3f51e7813ae2a3cf579e8a70ef16fc5cef908e3c57865");
    assert.equal(before[protectedFiles[1]], "48946924b8cfc62582a3a1b5c5398d58d0eefce25334cff34f9dc9acf7dea16e");
    assert.equal(before[protectedFiles[2]], "194c0b096543bec7c4bff9340ca488b5cc87adf249dbaf7ebb50a6f02af4b999");
    assert.equal(before[`${fixtureDirectory}/ DIRECTORY_MANIFEST`], "3fcaf179d5bdf0c2d7aa7475c1f90f4d1edc5131b742595b63a35c7b331604ec");

    console.log(JSON.stringify(Object.entries(before).map(([artifact, hash]) => ({
      artifact,
      hashBefore: hash,
      hashAfter: after[artifact],
      unchanged: true,
    })), null, 2));
    console.log("INTEGRITY_OK");
  } finally {
    if (originalReadOnlyFlag === undefined) delete process.env.SERA_VNEXT_READONLY_ENABLED;
    else process.env.SERA_VNEXT_READONLY_ENABLED = originalReadOnlyFlag;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
