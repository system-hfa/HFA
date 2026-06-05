import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const repoRoot = process.cwd();
const baseDir = path.join(
  repoRoot,
  "docs/sera-vnext/benchmark-a4r210/expected-output-fixture-dry-run-big",
);

const files = {
  report: path.join(
    baseDir,
    "SERA_VNEXT_EXPECTED_OUTPUT_FIXTURE_DRY_RUN_A4R210_BIG_v0.2.0.md",
  ),
  expected: path.join(
    baseDir,
    "SERA_VNEXT_EXPECTED_BEHAVIOR_RECORDS_A4R210_BIG.csv",
  ),
  outcomes: path.join(
    baseDir,
    "SERA_VNEXT_FIXTURE_DESIGN_DRY_RUN_OUTCOMES_A4R210_BIG.csv",
  ),
  controls: path.join(
    baseDir,
    "SERA_VNEXT_CONTROL_EXPECTED_BEHAVIOR_A4R210_BIG.csv",
  ),
  excluded: path.join(
    baseDir,
    "SERA_VNEXT_EXCLUDED_FROM_EXPECTED_OUTPUTS_A4R210_BIG.csv",
  ),
  closure: path.join(baseDir, "SERA_VNEXT_AUTHORIZATION_CLOSURE_A4R210_BIG.md"),
  prerequisites: path.join(
    baseDir,
    "SERA_VNEXT_FUTURE_REAL_FIXTURE_PREREQUISITES_A4R210_BIG.md",
  ),
  next: path.join(baseDir, "SERA_VNEXT_NEXT_MACROPHASE_DECISION_A4R210_BIG.md"),
  log: path.join(baseDir, "SERA_A4R210_BIG_LOG_v0.2.0.md"),
};

function read(filePath: string): string {
  return readFileSync(filePath, "utf8");
}

function parseCsv(filePath: string): Record<string, string>[] {
  const text = read(filePath).trim();
  const lines = text.split(/\r?\n/);
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      row[header] = values[index] ?? "";
    });
    return row;
  });
}

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  values.push(current);
  return values;
}

function getRow(rows: Record<string, string>[], key: string, value: string) {
  const row = rows.find((candidate) => candidate[key] === value);
  assert.ok(row, `Missing row where ${key} === ${value}`);
  return row;
}

for (const filePath of Object.values(files)) {
  assert.ok(existsSync(filePath), `Expected file missing: ${filePath}`);
}

const report = read(files.report);
const closure = read(files.closure);
const prerequisites = read(files.prerequisites);
const next = read(files.next);
const log = read(files.log);

const expectedRows = parseCsv(files.expected);
const outcomeRows = parseCsv(files.outcomes);
const controlRows = parseCsv(files.controls);
const excludedRows = parseCsv(files.excluded);

assert.ok(
  report.includes(
    "EXPECTED_AND_FIXTURE_DRY_RUN_COMPLETE_READY_FOR_FUTURE_REAL_FIXTURE_AUTHORIZATION_REQUEST",
  ),
  "General status missing from report",
);
assert.ok(report.includes("NON_FINAL_EXPECTED_BEHAVIOR"), "Non-final marker missing");
assert.ok(report.includes("FIXTURE_DESIGN_DRY_RUN_ONLY"), "Dry-run lock missing");
assert.ok(next.includes("A4R211-BIG - Real Fixture Authorization Request Package"));

assert.equal(expectedRows.length, 7, "Expected behavior row count mismatch");
assert.equal(outcomeRows.length, 7, "Fixture outcome row count mismatch");
assert.equal(controlRows.length, 3, "Control expected behavior row count mismatch");
assert.ok(excludedRows.length >= 9, "Excluded row count unexpectedly low");

const comairExpected = getRow(expectedRows, "component", "Comair 5191");
assert.equal(comairExpected.status, "EXPECTED_OUTPUT_DRY_RUN_ONLY");
assert.match(
  comairExpected.expected_methodological_behavior,
  /wrong-runway lineup/i,
);

const asianaExpected = getRow(expectedRows, "component", "Asiana 214");
assert.equal(
  asianaExpected.status,
  "EXPECTED_OUTPUT_DRY_RUN_ONLY_WITH_BOUNDARY_WARNING",
);
assert.match(asianaExpected.boundary_or_control_warning, /500 ft/i);

const upsExpected = getRow(expectedRows, "component", "UPS 1354");
assert.equal(
  upsExpected.status,
  "EXPECTED_OUTPUT_DRY_RUN_ONLY_WITH_BOUNDARY_WARNING",
);
assert.match(upsExpected.boundary_or_control_warning, /MDA/i);

const gap004Expected = getRow(
  expectedRows,
  "component",
  "GAP-004 consequence-as-cause",
);
assert.equal(gap004Expected.status, "EXPECTED_OUTPUT_DRY_RUN_ONLY_SYNTHETIC");
assert.match(gap004Expected.boundary_or_control_warning, /synthetic-only/i);

for (const controlName of ["Delta 191", "USAir 427", "5N-BQJ"]) {
  const row = getRow(expectedRows, "component", controlName);
  assert.equal(row.status, "EXPECTED_OUTPUT_DRY_RUN_ONLY_CONTROL");
}

assert.equal(
  getRow(outcomeRows, "component", "Comair 5191").design_dry_run_outcome,
  "FIXTURE_DESIGN_DRY_RUN_PASS_FUTURE_ONLY",
);
assert.equal(
  getRow(outcomeRows, "component", "Asiana 214").design_dry_run_outcome,
  "FIXTURE_DESIGN_DRY_RUN_PASS_WITH_LIMITATION_FUTURE_ONLY",
);
assert.equal(
  getRow(outcomeRows, "component", "UPS 1354").design_dry_run_outcome,
  "FIXTURE_DESIGN_DRY_RUN_PASS_WITH_LIMITATION_FUTURE_ONLY",
);
assert.equal(
  getRow(outcomeRows, "component", "GAP-004 consequence-as-cause")
    .design_dry_run_outcome,
  "SYNTHETIC_DESIGN_DRY_RUN_PASS_FUTURE_ONLY",
);
for (const controlName of ["Delta 191", "USAir 427", "5N-BQJ"]) {
  assert.equal(
    getRow(outcomeRows, "component", controlName).design_dry_run_outcome,
    "CONTROL_DESIGN_DRY_RUN_PASS_FUTURE_ONLY",
  );
}

for (const controlName of ["Delta 191", "USAir 427", "5N-BQJ"]) {
  const row = getRow(controlRows, "control_component", controlName);
  assert.match(row.expected_control_behavior, /NON_FINAL_EXPECTED_BEHAVIOR/);
  assert.match(row.prohibited_positive_use, /positive/i);
}

for (const excludedName of [
  "Daumas",
  "2026-0001 crank event",
  "GAP-002 agent_migration",
  "Colgan 3407",
]) {
  getRow(excludedRows, "component", excludedName);
}

assert.ok(closure.includes("Group A"));
assert.ok(closure.includes("Group B"));
assert.ok(closure.includes("Group C"));
assert.ok(closure.includes("Group A is still `NOT_FIXTURE`"));

for (const phrase of [
  "Explicit human authorization",
  "Expected-output review",
  "Adversarial review",
  "Source traceability check",
  "Final non-downstream lock",
  "No product/runtime connection",
]) {
  assert.ok(prerequisites.includes(phrase), `Missing prerequisite phrase: ${phrase}`);
}

for (const lockText of [
  "fixture created: NO",
  "baseline created: NO",
  "P/O/A final classification created: NO",
  "final escape point approved: NO",
  "READY automatic promotion: NO",
  "selectedCode active output: BLOCKED",
  "releasedCode active output: BLOCKED",
  "finalConclusion active output: BLOCKED",
  "CLASSIFIED active output: BLOCKED",
  "Daumas used as factual source: NO",
  "Daumas automatic reentry: NO",
  "synthetic-real blending: NO",
]) {
  assert.ok(report.includes(lockText) || closure.includes(lockText) || prerequisites.includes(lockText) || log.includes(lockText), `Missing lock confirmation: ${lockText}`);
}

const forbiddenTokens = ["C" + "ERA", "D" + "AL", "Dal" + "mos", "Dal" + "mais"];
for (const token of forbiddenTokens) {
  assert.ok(!report.includes(token), `Forbidden token present in report: ${token}`);
}

const inventedFragments = [
  "question" + "Path",
  "exactQuestionText" + "PT",
  "exactQuestionText" + "ENAnchor",
  "canonicalTree" + "Source",
];
for (const fragment of inventedFragments) {
  assert.ok(!report.includes(fragment), `Invented-question fragment present: ${fragment}`);
}

const outOfScopePositivePatterns = [
  /\bHFACS\b/i,
  /\berc_level\b/i,
  /\bARMS\b/i,
  /\brecommendations\b/i,
];
for (const pattern of outOfScopePositivePatterns) {
  const foundInUnsafeContext = [report, closure, prerequisites, next].some((text) =>
    text
      .split(/\r?\n/)
      .some((line) => pattern.test(line) && !/\bno\b/i.test(line)),
  );
  assert.ok(!foundInUnsafeContext, `Out-of-scope token leaked: ${pattern}`);
}

console.log("expected-output-fixture-dry-run-a4r210big-trial-001: OK");
