import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(__dirname, "..", "..");
const baseDir = path.join(root, "docs/sera-vnext/benchmark-a4r209/fixture-candidate-authorization-big");

const files = {
  packet: path.join(baseDir, "SERA_VNEXT_FIXTURE_CANDIDATE_AUTHORIZATION_PACKET_A4R209_BIG_v0.2.0.md"),
  matrix: path.join(baseDir, "SERA_VNEXT_CANDIDATE_AUTHORIZATION_MATRIX_A4R209_BIG.csv"),
  forms: path.join(baseDir, "SERA_VNEXT_AUTHOR_DECISION_FORMS_A4R209_BIG.md"),
  register: path.join(baseDir, "SERA_VNEXT_HOLD_REJECT_CONTROL_REGISTER_A4R209_BIG.csv"),
  actions: path.join(baseDir, "SERA_VNEXT_REQUIRED_FUTURE_ACTIONS_A4R209_BIG.csv"),
  checklist: path.join(baseDir, "SERA_VNEXT_AUTHORIZATION_CHECKLIST_A4R209_BIG.md"),
  nextPhase: path.join(baseDir, "SERA_VNEXT_NEXT_MACROPHASE_DECISION_A4R209_BIG.md"),
  log: path.join(baseDir, "SERA_A4R209_BIG_LOG_v0.2.0.md"),
};

for (const file of Object.values(files)) {
  assert.ok(existsSync(file), `required A4R209-BIG artifact must exist: ${file}`);
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

const authRows = parseCsv(docs.matrix);
const registerRows = parseCsv(docs.register);
const actionRows = parseCsv(docs.actions);

const authByComponent = new Map(authRows.map((row) => [row.component, row]));
const registerByComponent = new Map(registerRows.map((row) => [row.component, row]));
const actionByScope = new Map(actionRows.map((row) => [row.component_or_scope, row]));

assert.ok(docs.packet.includes("FIXTURE_CANDIDATE_AUTHORIZATION_PACKET_COMPLETE"), "authorization packet status must exist");
assert.ok(docs.nextPhase.includes("A4R210-BIG - Expected Output Design Dry Run"), "next macrophase must be A4R210-BIG");
assert.ok(authRows.length >= 16, "authorization matrix must include all required components");
assert.ok(registerRows.length >= 10, "hold/reject/control register must include required rows");
assert.ok(actionRows.length >= 9, "required future actions matrix must include required actions");

assert.equal(
  authByComponent.get("Comair 5191")?.authorization_status_candidate,
  "AUTHORIZE_FOR_FUTURE_FIXTURE_DESIGN_DRY_RUN_ONLY",
);
assert.equal(
  authByComponent.get("Asiana 214")?.authorization_status_candidate,
  "AUTHORIZE_FOR_FUTURE_FIXTURE_DESIGN_DRY_RUN_WITH_LIMITATION_ONLY",
);
assert.equal(
  authByComponent.get("UPS 1354")?.authorization_status_candidate,
  "AUTHORIZE_FOR_FUTURE_FIXTURE_DESIGN_DRY_RUN_WITH_LIMITATION_ONLY",
);
assert.equal(
  authByComponent.get("GAP-004 consequence-as-cause")?.authorization_status_candidate,
  "AUTHORIZE_FOR_FUTURE_FIXTURE_DESIGN_DRY_RUN_WITH_LIMITATION_ONLY",
);

for (const component of ["Delta 191", "USAir 427", "5N-BQJ"]) {
  assert.equal(
    authByComponent.get(component)?.authorization_status_candidate,
    "AUTHORIZE_AS_CONTROL_ONLY_FUTURE",
    `${component} must be control only`,
  );
}

assert.ok(registerByComponent.has("Colgan 3407"), "Colgan must appear in hold/reject/control register");
assert.match(registerByComponent.get("Colgan 3407")?.register_type ?? "", /REJECT_POSITIVE/i);
assert.ok(
  ["HOLD_FOR_METHOD_REFINEMENT", "REJECT_AS_POSITIVE_FIXTURE_CANDIDATE"].includes(
    authByComponent.get("Colgan 3407")?.authorization_status_candidate ?? "",
  ),
  "Colgan must be hold or reject as positive fixture candidate",
);

assert.ok(registerByComponent.has("GAP-002 agent_migration"), "GAP-002 must appear in register");
assert.match(registerByComponent.get("GAP-002 agent_migration")?.register_type ?? "", /HOLD/i);
assert.ok(
  ["HOLD_FOR_METHOD_REFINEMENT", "NOT_AUTHORIZED_NOW"].includes(
    authByComponent.get("GAP-002 agent_migration")?.authorization_status_candidate ?? "",
  ),
  "GAP-002 must be hold or not authorized now",
);

for (const component of ["Daumas", "2026-0001 crank event", "GAP-001 PF_PM separation"]) {
  assert.equal(
    authByComponent.get(component)?.authorization_status_candidate,
    "AUTHORIZE_AS_METHODOLOGY_REFERENCE_ONLY",
    `${component} must be methodology-only`,
  );
}

assert.equal(authByComponent.get("Raw Opus inputs")?.authorization_status_candidate, "NOT_APPLICABLE");
assert.equal(authByComponent.get("Broad scouting inputs")?.authorization_status_candidate, "NOT_APPLICABLE");

for (const marker of [
  "Form A - Positive Candidate Future Dry Run",
  "Form B - Boundary / Negative Control",
  "Form C - Methodology-Only Reference",
  "Form D - Synthetic Candidate",
  "authorize for future fixture-design dry run only",
  "authorize as control only",
  "authorize as methodology reference only",
  "authorize for future synthetic fixture-design dry run only",
]) {
  assert.ok(docs.forms.includes(marker), `author-decision form marker missing: ${marker}`);
}

for (const marker of [
  "authorize `Comair 5191` for future dry run?",
  "authorize `Asiana 214` with boundary warning?",
  "authorize `UPS 1354` with boundary warning?",
  "authorize `GAP-004 consequence-as-cause` synthetic candidate?",
  "authorize `Delta 191`, `USAir 427`, and `5N-BQJ` as controls?",
  "hold `Colgan 3407` outside the positive fixture lane?",
  "hold `GAP-002 agent_migration` as not authorized now?",
  "confirm `Daumas` methodology-only?",
  "confirm the human-applied crank case methodology-only?",
  "confirm no fixture now?",
  "confirm no baseline now?",
  "confirm no product/runtime now?",
  "confirm no final P/O/A?",
  "confirm no final escape point?",
  "confirm no READY?",
]) {
  assert.ok(docs.checklist.includes(marker), `checklist marker missing: ${marker}`);
}

for (const scope of [
  "Comair 5191",
  "Asiana 214",
  "UPS 1354",
  "GAP-004 consequence-as-cause",
  "Delta 191 / USAir 427 / 5N-BQJ",
  "G-WNSB / Execuflight 1526",
  "Colgan 3407",
  "GAP-002 agent_migration",
  "Typecheck environment",
  "Product/runtime scope",
]) {
  assert.ok(actionByScope.has(scope), `required future action missing: ${scope}`);
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
  assert.ok(!combinedDocs.includes(forbidden), `forbidden token must be absent from A4R209 artifacts: ${forbidden}`);
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

console.log("fixture-candidate-authorization-a4r209big-trial-001: OK");
