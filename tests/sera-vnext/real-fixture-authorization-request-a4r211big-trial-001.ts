import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(__dirname, "..", "..");
const baseDir = path.join(
  root,
  "docs/sera-vnext/benchmark-a4r211/real-fixture-authorization-request-big",
);

const files = {
  report: path.join(
    baseDir,
    "SERA_VNEXT_REAL_FIXTURE_AUTHORIZATION_REQUEST_A4R211_BIG_v0.2.0.md",
  ),
  matrix: path.join(
    baseDir,
    "SERA_VNEXT_REAL_FIXTURE_AUTHORIZATION_CANDIDATE_MATRIX_A4R211_BIG.csv",
  ),
  blocked: path.join(
    baseDir,
    "SERA_VNEXT_BLOCKED_EXCLUDED_COMPONENTS_A4R211_BIG.csv",
  ),
  checklist: path.join(
    baseDir,
    "SERA_VNEXT_AUTHOR_DECISION_CHECKLIST_A4R211_BIG.md",
  ),
  risks: path.join(
    baseDir,
    "SERA_VNEXT_RISK_ACCEPTANCE_REGISTER_A4R211_BIG.csv",
  ),
  scope: path.join(
    baseDir,
    "SERA_VNEXT_FUTURE_REAL_FIXTURE_CREATION_SCOPE_A4R211_BIG.md",
  ),
  guardrails: path.join(
    baseDir,
    "SERA_VNEXT_POST_AUTHORIZATION_GUARDRAIL_PLAN_A4R211_BIG.md",
  ),
  next: path.join(baseDir, "SERA_VNEXT_NEXT_MACROPHASE_DECISION_A4R211_BIG.md"),
  log: path.join(baseDir, "SERA_A4R211_BIG_LOG_v0.2.0.md"),
};

for (const file of Object.values(files)) {
  assert.ok(existsSync(file), `required A4R211-BIG artifact must exist: ${file}`);
}

const read = (file: string) => readFileSync(file, "utf8");
const docs = Object.fromEntries(
  Object.entries(files).map(([key, value]) => [key, read(value)]),
) as Record<string, string>;
const combinedDocs = Object.values(docs).join("\n");

function parseCsv(input: string): Record<string, string>[] {
  const rows: string[][] = [];
  let field = "";
  let row: string[] = [];
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const nextChar = input[index + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      field += '"';
      index += 1;
      continue;
    }
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }
    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") index += 1;
      row.push(field);
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      field = "";
      continue;
    }
    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const [header, ...body] = rows;
  return body.map((values) =>
    Object.fromEntries(header.map((name, index) => [name, values[index] ?? ""])),
  );
}

const matrixRows = parseCsv(docs.matrix);
const blockedRows = parseCsv(docs.blocked);
const riskRows = parseCsv(docs.risks);

const matrixByComponent = new Map(matrixRows.map((row) => [row.component, row]));
const blockedByComponent = new Map(blockedRows.map((row) => [row.component, row]));
const riskById = new Map(riskRows.map((row) => [row.risk_id, row]));

assert.ok(
  docs.report.includes("REAL_FIXTURE_AUTHORIZATION_REQUEST_ONLY"),
  "authorization request status must exist",
);
assert.ok(docs.report.includes("NO_FIXTURE_CREATED"), "no-fixture lock must exist");
assert.ok(docs.report.includes("NO_BASELINE_CREATED"), "no-baseline lock must exist");
assert.ok(
  docs.next.includes("A4R211-STOP - Stop and Hold Before Fixture Creation"),
  "next macrophase must be stop and hold",
);

assert.equal(matrixRows.length, 7, "authorization candidate matrix must include seven requested components");
assert.ok(blockedRows.length >= 9, "blocked and excluded register must include all blocked rows");
assert.ok(riskRows.length >= 9, "risk acceptance register must include all required risks");

assert.equal(
  matrixByComponent.get("Comair 5191")?.authorization_request_status,
  "REQUEST_AUTHOR_AUTHORIZATION_FOR_REAL_FIXTURE_CREATION_FUTURE_ONLY",
);
assert.match(
  matrixByComponent.get("Comair 5191")?.proposed_future_fixture_role ?? "",
  /clean anchor/i,
);

assert.equal(
  matrixByComponent.get("Asiana 214")?.authorization_request_status,
  "REQUEST_AUTHOR_AUTHORIZATION_WITH_BOUNDARY_LIMITATION_FUTURE_ONLY",
);
assert.match(
  matrixByComponent.get("Asiana 214")?.mandatory_limitation ?? "",
  /500 ft/i,
);

assert.equal(
  matrixByComponent.get("UPS 1354")?.authorization_request_status,
  "REQUEST_AUTHOR_AUTHORIZATION_WITH_BOUNDARY_LIMITATION_FUTURE_ONLY",
);
assert.match(
  matrixByComponent.get("UPS 1354")?.mandatory_limitation ?? "",
  /MDA/i,
);

assert.equal(
  matrixByComponent.get("GAP-004 consequence-as-cause")?.authorization_request_status,
  "REQUEST_AUTHOR_AUTHORIZATION_SYNTHETIC_FIXTURE_CREATION_FUTURE_ONLY",
);
assert.match(
  matrixByComponent.get("GAP-004 consequence-as-cause")?.mandatory_limitation ?? "",
  /synthetic only/i,
);

for (const component of ["Delta 191", "USAir 427", "5N-BQJ"]) {
  assert.equal(
    matrixByComponent.get(component)?.authorization_request_status,
    "REQUEST_AUTHOR_AUTHORIZATION_CONTROL_FIXTURE_FUTURE_ONLY",
    `${component} must be control-only future request`,
  );
}

assert.equal(
  blockedByComponent.get("Colgan 3407")?.exclusion_status,
  "REJECTED_AS_POSITIVE_FIXTURE_CANDIDATE",
);
assert.equal(
  blockedByComponent.get("Daumas")?.exclusion_status,
  "METHODOLOGY_REFERENCE_ONLY",
);
assert.equal(
  blockedByComponent.get("2026-0001 crank event")?.exclusion_status,
  "HUMAN_APPLIED_REFERENCE_ONLY",
);
assert.equal(
  blockedByComponent.get("GAP-002 agent_migration")?.exclusion_status,
  "NOT_AUTHORIZED_NOW",
);
assert.equal(
  blockedByComponent.get("G-WNSB")?.exclusion_status,
  "HOLD_FOR_SOURCE_AND_DOSSIER_EXPANSION",
);
assert.equal(
  blockedByComponent.get("Execuflight 1526")?.exclusion_status,
  "HOLD_FOR_SOURCE_AND_DOSSIER_EXPANSION",
);

for (const riskId of [
  "RAR-001",
  "RAR-002",
  "RAR-003",
  "RAR-004",
  "RAR-005",
  "RAR-006",
  "RAR-007",
  "RAR-008",
  "RAR-009",
]) {
  assert.ok(riskById.has(riskId), `missing risk row: ${riskId}`);
}

for (const marker of [
  "authorize `Comair 5191` for future candidate-only real-fixture work?",
  "authorize `Asiana 214` with mandatory boundary warning?",
  "authorize `UPS 1354` with mandatory boundary warning?",
  "authorize `GAP-004 consequence-as-cause` as synthetic future-only?",
  "authorize `Delta 191` as control-only future request?",
  "authorize `USAir 427` as control-only future request?",
  "authorize `5N-BQJ` as control-only future request?",
  "confirm `Colgan 3407` stays outside the positive fixture lane?",
  "confirm `Daumas` stays methodology-only?",
  "confirm `2026-0001 crank event` stays human-applied-only?",
  "confirm no fixture now?",
  "confirm no baseline now?",
  "confirm no final P/O/A now?",
  "confirm no final escape point now?",
  "confirm no READY promotion now?",
]) {
  assert.ok(docs.checklist.includes(marker), `checklist marker missing: ${marker}`);
}

for (const marker of [
  "tests/sera-vnext/fixture-candidates/",
  "do not alter official fixtures",
  "do not alter baseline",
  "do not connect engine or runtime",
  "do not connect product",
  "candidate naming",
  "require explicit author approval before starting",
]) {
  assert.ok(docs.scope.includes(marker), `scope marker missing: ${marker}`);
}

for (const marker of [
  "no `tests/sera/fixtures/`",
  "no baseline report updates",
  "no product/runtime imports",
  "no API/UI changes",
  "candidate-only naming for every new artifact",
  "delete the isolated candidate-only directory or files",
]) {
  assert.ok(docs.guardrails.includes(marker), `guardrail marker missing: ${marker}`);
}

const requiredLocks = [
  "fixture created: NO",
  "baseline created: NO",
  "P/O/A final classification created: NO",
  "final escape point approved: NO",
  "READY automatic promotion: NO",
  "selectedCode active output: BLOCKED",
  "releasedCode active output: BLOCKED",
  "finalConclusion active output: BLOCKED",
  "CLASSIFIED active output: BLOCKED",
  "fixture/baseline/product promotion: BLOCKED",
  "downstream release behavior: BLOCKED",
  "Daumas used as factual source: NO",
  "Daumas automatic reentry: NO",
  "synthetic-real blending: NO",
  "no HFACS-to-SERA substitution",
  "no Risk/ERC/ARMS layer work",
];

for (const marker of requiredLocks) {
  assert.ok(combinedDocs.includes(marker), `lock marker missing: ${marker}`);
}

for (const forbiddenWord of ["CERA", "Dalmos", "Dalmais"]) {
  assert.ok(!combinedDocs.includes(forbiddenWord), `forbidden token present: ${forbiddenWord}`);
}

assert.ok(!/\bDAL\b/.test(combinedDocs), "forbidden token present: DAL");

const disallowedPatterns = [
  /\bfixture created:\s*YES\b/i,
  /\bbaseline created:\s*YES\b/i,
  /\bP\/O\/A final classification created:\s*YES\b/i,
  /\bfinal escape point approved:\s*YES\b/i,
  /\bREADY automatic promotion:\s*YES\b/i,
  /\bsynthetic-real blending:\s*YES\b/i,
];

for (const pattern of disallowedPatterns) {
  assert.ok(!pattern.test(combinedDocs), `disallowed active output pattern matched: ${pattern}`);
}

for (const [label, expected] of [
  ["selectedCode active output:", "BLOCKED"],
  ["releasedCode active output:", "BLOCKED"],
  ["finalConclusion active output:", "BLOCKED"],
  ["CLASSIFIED active output:", "BLOCKED"],
] as const) {
  const lines = combinedDocs.split(/\r?\n/).filter((line) => line.includes(label));
  assert.ok(lines.length > 0, `missing lock line: ${label}`);
  for (const line of lines) {
    assert.match(line, new RegExp(`${label}\\s*${expected}\\b`), `invalid lock line: ${line}`);
  }
}

const requiredAbsenceChecks = [
  "no fixture is created now.",
  "no baseline is created now.",
  "no product/runtime path is opened now.",
  "no final P/O/A is created now.",
  "no final escape point is approved now.",
  "no selectedCode, releasedCode, finalConclusion, or CLASSIFIED active output is opened now.",
];

for (const phrase of requiredAbsenceChecks) {
  assert.ok(docs.report.includes(phrase), `required absence phrase missing: ${phrase}`);
}
