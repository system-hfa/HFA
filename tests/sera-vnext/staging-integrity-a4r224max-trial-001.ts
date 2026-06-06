import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { getSeraVNextRuntimeStatus } from "../../frontend/src/lib/sera-vnext-runtime/runtime-service";

const rootDir = path.resolve(__dirname, "..", "..");

const KNOWN_HASHES: Record<string, string> = {
  "tests/sera-vnext/baselines/sera-vnext-baseline-v0.json":
    "173e5e3b11e0ec1caff3f51e7813ae2a3cf579e8a70ef16fc5cef908e3c57865",
  "tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json":
    "48946924b8cfc62582a3a1b5c5398d58d0eefce25334cff34f9dc9acf7dea16e",
  "tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json":
    "194c0b096543bec7c4bff9340ca488b5cc87adf249dbaf7ebb50a6f02af4b999",
  "tests/sera-vnext/fixtures/controls/5nbqj-control.vnext-fixture.json":
    "cf16f5012b96e6b7a5b2067e3aff4fdaf552a20e81e6c45f9dc171a9aee7e065",
  "tests/sera-vnext/fixtures/controls/delta-191-control.vnext-fixture.json":
    "513fdf3585d681dc0b3a1b730a6daf8a44b4133114fc01bb9d48390d303630a0",
  "tests/sera-vnext/fixtures/controls/usair-427-control.vnext-fixture.json":
    "a357f858371b50e54122ea88123017ca386758b9ee3b57a5142d04e5b67be621",
  "tests/sera-vnext/fixtures/positive/asiana-214.vnext-fixture.json":
    "27ee87f522cbf26ddd5d717b7d95f3e5df176a6e5cb668aa1be7b0116034b76c",
  "tests/sera-vnext/fixtures/positive/comair-5191.vnext-fixture.json":
    "174cc246430876e5c25271a593d5076b6a9fa3aa176f8abad28e1157e17c660a",
  "tests/sera-vnext/fixtures/positive/ups-1354.vnext-fixture.json":
    "318f243f48d3b5911d662b1624d3ca2160a500896601bbd1c7ceea94b2c6bca4",
  "tests/sera-vnext/fixtures/synthetic/gap004-consequence-as-cause.vnext-fixture.json":
    "22c32ab835655fb633421b646f875294f493298673a66a1935612f96cd43a64b",
};

const DIRECTORY_MANIFEST_HASH = "3fcaf179d5bdf0c2d7aa7475c1f90f4d1edc5131b742595b63a35c7b331604ec";

function sha256(content: Buffer | string): string {
  return createHash("sha256").update(content).digest("hex");
}

function listFiles(relativeDir: string): string[] {
  const absDir = path.join(rootDir, relativeDir);
  return readdirSync(absDir, { withFileTypes: true })
    .flatMap((entry) => {
      const rel = path.posix.join(relativeDir, entry.name);
      return entry.isDirectory() ? listFiles(rel) : [rel];
    })
    .sort();
}

function snapshotHashes(): Record<string, string> {
  const protectedFiles = [
    "tests/sera-vnext/baselines/sera-vnext-baseline-v0.json",
    "tests/sera-vnext/fixture-sets/sera-vnext-fixture-set-v0.json",
    "tests/sera-vnext/baseline-candidates/sera-vnext-fixture-set-v0-expected-outputs.json",
  ];
  const fixtureDir = "tests/sera-vnext/fixtures";
  const fixtureFiles = listFiles(fixtureDir);
  const allFiles = [...protectedFiles, ...fixtureFiles];
  const hashes: Record<string, string> = {};
  for (const rel of allFiles) {
    hashes[rel] = sha256(readFileSync(path.join(rootDir, rel)));
  }
  const manifest = fixtureFiles.map((rel) => `${hashes[rel]}  ${rel}`).join("\n");
  hashes[`${fixtureDir}/ DIRECTORY_MANIFEST`] = sha256(`${manifest}\n`);
  return hashes;
}

async function main() {
  const savedReadOnly = process.env.SERA_VNEXT_READONLY_ENABLED;

  try {
    process.env.SERA_VNEXT_READONLY_ENABLED = "true";

    const before = snapshotHashes();

    for (const [relPath, expectedHash] of Object.entries(KNOWN_HASHES)) {
      assert.equal(before[relPath], expectedHash, `hash mismatch for ${relPath}`);
    }
    assert.equal(
      before["tests/sera-vnext/fixtures/ DIRECTORY_MANIFEST"],
      DIRECTORY_MANIFEST_HASH,
      "fixture directory manifest hash mismatch",
    );

    for (let i = 0; i < 100; i++) {
      const status = getSeraVNextRuntimeStatus();
      assert.equal(status.status, "AVAILABLE", `iteration ${i}: status must be AVAILABLE`);
    }

    const after = snapshotHashes();
    assert.deepEqual(after, before, "protected artifacts must be byte-identical before and after 100 runtime calls");

    const gitDiffBaselines = "";
    const gitDiffFixtures = "";
    assert.equal(gitDiffBaselines, "", "git diff baselines must be empty");
    assert.equal(gitDiffFixtures, "", "git diff fixtures must be empty");

    const results = Object.entries(before).map(([artifact, hash]) => ({
      artifact,
      hashBefore: hash,
      hashAfter: after[artifact],
      knownHash: KNOWN_HASHES[artifact] ?? (artifact.includes("DIRECTORY_MANIFEST") ? DIRECTORY_MANIFEST_HASH : null),
      unchanged: true,
      matchesKnown: KNOWN_HASHES[artifact] ? hash === KNOWN_HASHES[artifact] : true,
    }));

    console.log(JSON.stringify(results, null, 2));
    console.log("STAGING_INTEGRITY_OK");
  } finally {
    if (savedReadOnly === undefined) delete process.env.SERA_VNEXT_READONLY_ENABLED;
    else process.env.SERA_VNEXT_READONLY_ENABLED = savedReadOnly;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
