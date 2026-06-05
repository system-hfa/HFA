import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(__dirname, "..", "..");
const baseDir = path.join(root, "docs/sera-vnext/benchmark-a4r208/fixture-candidate-package-big");

const files = {
  report: path.join(baseDir, "SERA_VNEXT_FIXTURE_CANDIDATE_PACKAGE_A4R208_BIG_v0.2.0.md"),
  matrix: path.join(baseDir, "SERA_VNEXT_FIXTURE_CANDIDATE_PACKAGE_MATRIX_A4R208_BIG.csv"),
  controls: path.join(baseDir, "SERA_VNEXT_BOUNDARY_NEGATIVE_CONTROL_PACKAGE_A4R208_BIG.csv"),
  exclusions: path.join(baseDir, "SERA_VNEXT_METHODOLOGY_ONLY_EXCLUSION_REGISTER_A4R208_BIG.csv"),
  limitations: path.join(baseDir, "SERA_VNEXT_FIXTURE_CANDIDATE_LIMITATION_REGISTER_A4R208_BIG.csv"),
  template: path.join(baseDir, "SERA_VNEXT_FUTURE_AUTHORIZATION_PACKET_TEMPLATE_A4R208_BIG.md"),
  nextPhase: path.join(baseDir, "SERA_VNEXT_NEXT_MACROPHASE_DECISION_A4R208_BIG.md"),
  log: path.join(baseDir, "SERA_A4R208_BIG_LOG_v0.2.0.md"),
};

for (const file of Object.values(files)) {
  assert.ok(existsSync(file), `required A4R208-BIG artifact must exist: ${file}`);
}

const read = (file: string) => readFileSync(file, "utf8");
const docs = Object.fromEntries(Object.entries(files).map(([key, value]) => [key, read(value)])) as Record<string, string>;
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
  return body.map((values) => Object.fromEntries(header.map((name, index) => [name, values[index] ?? ""])));
}

const candidateRows = parseCsv(docs.matrix);
const controlRows = parseCsv(docs.controls);
const exclusionRows = parseCsv(docs.exclusions);
const limitationRows = parseCsv(docs.limitations);

const candidateByComponent = new Map(candidateRows.map((row) => [row.component, row]));
const controlByComponent = new Map(controlRows.map((row) => [row.component, row]));
const exclusionByComponent = new Map(exclusionRows.map((row) => [row.component_or_source, row]));
const limitationByComponent = new Map(limitationRows.map((row) => [row.component, row]));

assert.ok(docs.report.includes("FIXTURE_CANDIDATE_PACKAGE_DESIGN_COMPLETE"), "package completion status must exist");
assert.ok(docs.report.includes("Mode: NON_FINAL_DOCUMENTAL_ONLY"), "non-final mode must exist");
assert.ok(docs.nextPhase.includes("A4R209-BIG - Fixture Candidate Authorization Packet"), "next macrophase must be A4R209-BIG");

assert.ok(candidateRows.length >= 6, "candidate package matrix must include positive, second-wave, and synthetic rows");
assert.ok(controlRows.length >= 4, "control package must include four controls");
assert.ok(exclusionRows.length >= 6, "exclusion register must include methodology and synthetic exclusions");
assert.ok(limitationRows.length >= 13, "limitation register must include required limitations");

assert.equal(candidateByComponent.get("Comair 5191")?.package_tier, "Tier 1");
assert.equal(
  candidateByComponent.get("Comair 5191")?.candidate_status,
  "FUTURE_POSITIVE_CANDIDATE_STRONGEST_NOT_FIXTURE_NOW",
);
assert.match(candidateByComponent.get("Comair 5191")?.prohibited_use ?? "", /fixture now/i);
assert.match(candidateByComponent.get("Comair 5191")?.limitation ?? "", /no final expected output/i);

for (const component of ["Asiana 214", "UPS 1354"]) {
  assert.equal(candidateByComponent.get(component)?.package_tier, "Tier 2", `${component} must be Tier 2`);
  assert.equal(
    candidateByComponent.get(component)?.candidate_status,
    "FUTURE_POSITIVE_CANDIDATE_WITH_BOUNDARY_LIMITATION_NOT_FIXTURE_NOW",
    `${component} must be future-only with boundary limitation`,
  );
  assert.match(candidateByComponent.get(component)?.limitation ?? "", /warning/i);
}

for (const component of ["G-WNSB", "Execuflight 1526"]) {
  assert.equal(candidateByComponent.get(component)?.package_tier, "Tier 3 second wave", `${component} must be second wave`);
  assert.equal(
    candidateByComponent.get(component)?.candidate_status,
    "SECOND_WAVE_FUTURE_ONLY_NOT_FIXTURE_NOW",
    `${component} must be second-wave future-only`,
  );
}

for (const component of ["Delta 191", "USAir 427", "5N-BQJ"]) {
  assert.ok(controlByComponent.has(component), `${component} must appear as boundary/negative control`);
  assert.match(controlByComponent.get(component)?.prohibited_positive_use ?? "", /positive|frontline|pure human/i);
}

assert.ok(controlByComponent.has("Colgan 3407"), "Colgan must appear as control");
assert.match(controlByComponent.get("Colgan 3407")?.notes ?? "", /positive-reference ambiguity unresolved/i);
assert.match(controlByComponent.get("Colgan 3407")?.prohibited_positive_use ?? "", /positive reference/i);

assert.equal(
  candidateByComponent.get("GAP-004 consequence-as-cause")?.candidate_status,
  "SYNTHETIC_DESIGN_FUTURE_ONLY_NOT_FIXTURE_NOW",
);
assert.match(candidateByComponent.get("GAP-004 consequence-as-cause")?.limitation ?? "", /synthetic/i);

assert.ok(exclusionByComponent.has("GAP-002 agent_migration"), "GAP-002 must appear in exclusions");
assert.match(exclusionByComponent.get("GAP-002 agent_migration")?.reason ?? "", /not materialized/i);
assert.match(exclusionByComponent.get("GAP-002 agent_migration")?.prohibited_use ?? "", /candidate package fixture item now/i);

assert.ok(exclusionByComponent.has("GAP-001 PF_PM separation"), "GAP-001 must appear in exclusions");
assert.match(exclusionByComponent.get("GAP-001 PF_PM separation")?.allowed_use ?? "", /retained and audited/i);

assert.ok(exclusionByComponent.has("Daumas"), "Daumas must appear as methodology-only");
assert.match(exclusionByComponent.get("Daumas")?.allowed_use ?? "", /methodology and depth reference only/i);
assert.match(exclusionByComponent.get("Daumas")?.prohibited_use ?? "", /factual source/i);

assert.ok(exclusionByComponent.has("2026-0001 crank event"), "human-applied crank event must appear in exclusions");
assert.match(exclusionByComponent.get("2026-0001 crank event")?.allowed_use ?? "", /human-applied SERA reference/i);
assert.match(exclusionByComponent.get("2026-0001 crank event")?.prohibited_use ?? "", /automatic fixture/i);

for (const component of [
  "Comair 5191",
  "Asiana 214",
  "UPS 1354",
  "G-WNSB",
  "Execuflight 1526",
  "Delta 191",
  "USAir 427",
  "5N-BQJ",
  "Colgan 3407",
  "GAP-004 consequence-as-cause",
  "GAP-002 agent_migration",
  "Daumas",
  "2026-0001 crank event",
]) {
  assert.ok(limitationByComponent.has(component), `limitation missing: ${component}`);
}

for (const templateMarker of [
  "candidate/component:",
  "proposed role:",
  "source traceability status:",
  "escape window stability:",
  "actor attribution status:",
  "evidence sufficiency:",
  "evidence against:",
  "boundary warning:",
  "negative/control role:",
  "synthetic-real separation:",
  "Daumas compliance:",
  "human-applied case compliance:",
  "approve for fixture-design dry run only",
  "hold",
  "reject",
  "request adversarial review",
  "not fixture yet",
  "not baseline",
  "no final P/O/A",
  "no product",
  "no downstream",
]) {
  assert.ok(docs.template.includes(templateMarker), `template marker missing: ${templateMarker}`);
}

const requiredLocks = [
  "P/O/A final classification created: NO",
  "final escape point approved: NO",
  "READY automatic promotion: NO",
  "selectedCode active output: BLOCKED",
  "releasedCode active output: BLOCKED",
  "finalConclusion active output: BLOCKED",
  "CLASSIFIED active output: BLOCKED",
  "fixture created: NO",
  "baseline created: NO",
  "fixture/baseline/product promotion: BLOCKED",
  "downstream release behavior: BLOCKED",
  "Daumas used as factual source: NO",
  "Daumas automatic reentry: NO",
  "synthetic-real blending: NO",
  "no HFACS-to-SERA substitution",
  "no Risk/ERC/ARMS layer work",
  "no final recommendation output",
];

for (const marker of requiredLocks) {
  assert.ok(combinedDocs.includes(marker), `guardrail marker missing: ${marker}`);
}

const selectedOutput = "selected" + "Code active output:";
const releasedOutput = "released" + "Code active output:";
const finalOutput = "final" + "Conclusion active output:";
const classifiedOutput = "CLASS" + "IFIED active output:";
const promotionOutput = "fixture/baseline/" + "product promotion:";
const prohibitedActivePatterns = [
  new RegExp("P/O/A final classification created:\\s*YES", "i"),
  new RegExp("final escape point approved:\\s*YES", "i"),
  new RegExp("READY automatic promotion:\\s*YES", "i"),
  new RegExp(`${selectedOutput}(?!\\s*BLOCKED\\b).+`, "i"),
  new RegExp(`${releasedOutput}(?!\\s*BLOCKED\\b).+`, "i"),
  new RegExp(`${finalOutput}(?!\\s*BLOCKED\\b).+`, "i"),
  new RegExp(`${classifiedOutput}(?!\\s*BLOCKED\\b).+`, "i"),
  new RegExp("fixture created:\\s*YES", "i"),
  new RegExp("baseline created:\\s*YES", "i"),
  new RegExp(`${promotionOutput}(?!\\s*BLOCKED\\b).+`, "i"),
  new RegExp("Daumas used as factual source:\\s*YES", "i"),
  new RegExp("Daumas automatic reentry:\\s*YES", "i"),
  new RegExp("synthetic-real blending:\\s*YES", "i"),
];

for (const pattern of prohibitedActivePatterns) {
  assert.ok(!pattern.test(combinedDocs), `prohibited active pattern detected: ${pattern}`);
}

for (const forbidden of ["C" + "ERA", "D" + "AL", "Dal" + "mos", "Dal" + "mais"]) {
  assert.ok(!combinedDocs.includes(forbidden), `forbidden token must be absent from A4R208 artifacts: ${forbidden}`);
}

const inventedQuestionFragments = [
  "P" + "-1",
  "P" + "-2",
  "O" + "-1",
  "O" + "-2",
  "A" + "-1",
  "A" + "-2",
  "Pergunta por " + "eixo",
  "pergunta por " + "eixo",
  "case-specific " + "question",
  "auxiliary " + "question",
  "question" + "Path",
  "exact" + "QuestionText",
];

for (const fragment of inventedQuestionFragments) {
  assert.ok(!combinedDocs.includes(fragment), `invented-tree fragment must be absent: ${fragment}`);
}

console.log("fixture-candidate-package-a4r208big-trial-001: OK");
