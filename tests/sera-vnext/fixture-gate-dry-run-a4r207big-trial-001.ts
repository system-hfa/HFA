import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(__dirname, "..", "..");
const baseDir = path.join(root, "docs/sera-vnext/benchmark-a4r207/fixture-gate-dry-run-big");

const files = {
  dryRun: path.join(baseDir, "SERA_VNEXT_FIXTURE_GATE_DRY_RUN_A4R207_BIG_v0.2.0.md"),
  components: path.join(baseDir, "SERA_VNEXT_DRY_RUN_COMPONENT_MATRIX_A4R207_BIG.csv"),
  outcomes: path.join(baseDir, "SERA_VNEXT_GATE_OUTCOME_MATRIX_A4R207_BIG.csv"),
  failures: path.join(baseDir, "SERA_VNEXT_GATE_FAILURE_REGISTER_A4R207_BIG.csv"),
  weaknesses: path.join(baseDir, "SERA_VNEXT_GATE_WEAKNESS_REGISTER_A4R207_BIG.csv"),
  checklist: path.join(baseDir, "SERA_VNEXT_FUTURE_FIXTURE_AUTHORIZATION_CHECKLIST_A4R207_BIG.md"),
  nextPhase: path.join(baseDir, "SERA_VNEXT_NEXT_MACROPHASE_DECISION_A4R207_BIG.md"),
  log: path.join(baseDir, "SERA_A4R207_BIG_LOG_v0.2.0.md"),
};

for (const file of Object.values(files)) {
  assert.ok(existsSync(file), `required A4R207-BIG artifact must exist: ${file}`);
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

const componentRows = parseCsv(docs.components);
const outcomeRows = parseCsv(docs.outcomes);
const failureRows = parseCsv(docs.failures);
const weaknessRows = parseCsv(docs.weaknesses);

const components = [
  "Comair 5191",
  "Asiana 214",
  "UPS 1354",
  "Colgan 3407",
  "2026-0001 crank event",
  "Daumas",
  "GAP-004 consequence-as-cause",
  "GAP-002 agent_migration",
  "GAP-001 PF_PM separation",
  "G-WNSB",
  "Execuflight 1526",
  "Delta 191",
  "USAir 427",
  "5N-BQJ",
];

const gates = [
  "Source Traceability Gate",
  "Escape Window Stability Gate",
  "Actor Attribution Gate",
  "Evidence Sufficiency Gate",
  "Evidence Against Gate",
  "Boundary/Negative Role Gate",
  "Synthetic Separation Gate",
  "Daumas Non-Factual Use Gate",
  "Human-Applied Non-Automatic Gate",
  "Author Approval Gate",
  "Adversarial Review Gate",
  "No-Downstream Gate",
];

assert.ok(docs.dryRun.includes("FIXTURE_GATE_DRY_RUN_DESIGN_COMPLETE"), "dry-run completion status must exist");
assert.ok(docs.dryRun.includes("Mode: NON_FINAL_DOCUMENTAL_ONLY"), "non-final documentary mode must exist");
assert.ok(docs.nextPhase.includes("A4R208-BIG - Fixture Candidate Package Design Only"), "next macrophase must be A4R208-BIG");

assert.equal(componentRows.length, 14, "component matrix must contain fourteen components");
assert.equal(outcomeRows.length, components.length * gates.length, "gate outcome matrix must contain each component gate pair");
assert.ok(failureRows.length >= 11, "gate failure register must include required failures");
assert.ok(weaknessRows.length >= 9, "gate weakness register must include required weaknesses");

const componentByName = new Map(componentRows.map((row) => [row.component, row]));
const outcomesByKey = new Map(outcomeRows.map((row) => [`${row.component}::${row.gate_name}`, row]));

for (const component of components) {
  assert.ok(componentByName.has(component), `component matrix missing: ${component}`);
  for (const gate of gates) {
    assert.ok(outcomesByKey.has(`${component}::${gate}`), `outcome missing: ${component} ${gate}`);
  }
}

const allowedOutcomes = new Set([
  "DRY_RUN_PASS",
  "DRY_RUN_PASS_WITH_LIMITATION",
  "DRY_RUN_FAIL",
  "NOT_APPLICABLE",
  "REQUIRES_FUTURE_AUTHOR_DECISION",
  "REQUIRES_FUTURE_SOURCE_RECOVERY",
  "REQUIRES_FUTURE_ADVERSARIAL_REVIEW",
]);

for (const row of outcomeRows) {
  assert.ok(allowedOutcomes.has(row.dry_run_outcome), `invalid gate outcome: ${row.dry_run_outcome}`);
}

assert.equal(
  componentByName.get("Comair 5191")?.dry_run_status,
  "DRY_RUN_FIXTURE_DESIGN_ELIGIBLE_FUTURE_ONLY",
);
assert.equal(
  componentByName.get("Asiana 214")?.dry_run_status,
  "DRY_RUN_FIXTURE_DESIGN_ELIGIBLE_WITH_LIMITATION_FUTURE_ONLY",
);
assert.equal(
  componentByName.get("UPS 1354")?.dry_run_status,
  "DRY_RUN_FIXTURE_DESIGN_ELIGIBLE_WITH_LIMITATION_FUTURE_ONLY",
);
assert.equal(componentByName.get("Colgan 3407")?.dry_run_status, "DRY_RUN_NOT_FIXTURE_ELIGIBLE_NOW");
assert.equal(componentByName.get("2026-0001 crank event")?.dry_run_status, "DRY_RUN_METHODOLOGY_REFERENCE_ONLY");
assert.equal(componentByName.get("Daumas")?.dry_run_status, "DRY_RUN_METHODOLOGY_REFERENCE_ONLY");
assert.equal(
  componentByName.get("GAP-004 consequence-as-cause")?.dry_run_status,
  "DRY_RUN_SYNTHETIC_DESIGN_ELIGIBLE_FUTURE_ONLY",
);
assert.equal(componentByName.get("GAP-002 agent_migration")?.dry_run_status, "DRY_RUN_NOT_FIXTURE_ELIGIBLE_NOW");
assert.equal(componentByName.get("GAP-001 PF_PM separation")?.dry_run_status, "DRY_RUN_METHODOLOGY_REFERENCE_ONLY");

for (const component of ["G-WNSB", "Execuflight 1526"]) {
  assert.equal(
    componentByName.get(component)?.dry_run_status,
    "DRY_RUN_FIXTURE_DESIGN_ELIGIBLE_WITH_LIMITATION_FUTURE_ONLY",
    `${component} must be future-only with limitation`,
  );
}

for (const component of ["Delta 191", "USAir 427", "5N-BQJ"]) {
  assert.equal(
    componentByName.get(component)?.dry_run_status,
    "DRY_RUN_CONTROL_ONLY_ELIGIBLE_FUTURE_ONLY",
    `${component} must remain control-only`,
  );
}

assert.equal(
  outcomesByKey.get("Comair 5191::Author Approval Gate")?.dry_run_outcome,
  "REQUIRES_FUTURE_AUTHOR_DECISION",
);
assert.equal(
  outcomesByKey.get("Comair 5191::Adversarial Review Gate")?.dry_run_outcome,
  "REQUIRES_FUTURE_ADVERSARIAL_REVIEW",
);
assert.equal(outcomesByKey.get("Colgan 3407::Escape Window Stability Gate")?.dry_run_outcome, "DRY_RUN_FAIL");
assert.equal(outcomesByKey.get("GAP-002 agent_migration::Evidence Sufficiency Gate")?.dry_run_outcome, "DRY_RUN_FAIL");
assert.equal(
  outcomesByKey.get("2026-0001 crank event::Human-Applied Non-Automatic Gate")?.dry_run_outcome,
  "DRY_RUN_PASS",
);
assert.equal(outcomesByKey.get("Daumas::Daumas Non-Factual Use Gate")?.dry_run_outcome, "DRY_RUN_PASS");
assert.equal(
  outcomesByKey.get("GAP-004 consequence-as-cause::Synthetic Separation Gate")?.dry_run_outcome,
  "DRY_RUN_PASS",
);
assert.equal(outcomesByKey.get("5N-BQJ::Source Traceability Gate")?.dry_run_outcome, "REQUIRES_FUTURE_SOURCE_RECOVERY");

for (const failureId of [
  "GF-001",
  "GF-002",
  "GF-003",
  "GF-004",
  "GF-005",
  "GF-006",
  "GF-007",
  "GF-008",
  "GF-009",
  "GF-010",
  "GF-011",
]) {
  assert.ok(failureRows.some((row) => row.failure_id === failureId), `failure register missing: ${failureId}`);
}

for (const weaknessId of ["GW-001", "GW-002", "GW-003", "GW-004", "GW-005", "GW-006", "GW-007", "GW-008", "GW-009"]) {
  assert.ok(weaknessRows.some((row) => row.weakness_id === weaknessId), `weakness register missing: ${weaknessId}`);
}

for (const checklistMarker of [
  "Explicit human authorization",
  "Component status confirmed",
  "Source traceability verified",
  "Candidate escape window stability verified",
  "Actor attribution verified",
  "Evidence sufficiency verified",
  "Evidence against and limitations recorded",
  "Boundary warning status preserved",
  "Negative/control role status preserved",
  "Synthetic-real separation verified",
  "Daumas non-factual compliance verified",
  "No downstream dependency active",
  "Adversarial review completed",
  "Regression policy defined",
  "Rollback policy defined",
]) {
  assert.ok(docs.checklist.includes(checklistMarker), `checklist marker missing: ${checklistMarker}`);
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
  new RegExp("Daumas used as factual source:\\s*YES", "i"),
  new RegExp("Daumas automatic reentry:\\s*YES", "i"),
  new RegExp("synthetic-real blending:\\s*YES", "i"),
];

for (const pattern of prohibitedActivePatterns) {
  assert.ok(!pattern.test(combinedDocs), `prohibited active pattern detected: ${pattern}`);
}

const docsOnly = Object.values(docs).join("\n");
for (const forbidden of ["C" + "ERA", "D" + "AL", "Dal" + "mos", "Dal" + "mais"]) {
  assert.ok(!docsOnly.includes(forbidden), `forbidden token must be absent from docs: ${forbidden}`);
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
  assert.ok(!docsOnly.includes(fragment), `invented-tree fragment must be absent from docs: ${fragment}`);
}

assert.ok(!/positive fixture; fourth positive reference/i.test(componentByName.get("Colgan 3407")?.fixture_design_implication ?? ""));
assert.match(componentByName.get("GAP-002 agent_migration")?.failed_or_limited_gates ?? "", /not materialized/i);
assert.match(componentByName.get("Daumas")?.prohibited_use ?? "", /factual source/i);
assert.match(componentByName.get("2026-0001 crank event")?.prohibited_use ?? "", /automatic fixture/i);

console.log("fixture-gate-dry-run-a4r207big-trial-001: OK");
