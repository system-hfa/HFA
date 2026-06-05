import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(__dirname, "..", "..");
const baseDir = path.join(root, "docs/sera-vnext/calibration-a4r205/calibration-corpus-closure-big");

const files = {
  closure: path.join(baseDir, "SERA_VNEXT_CALIBRATION_CORPUS_CLOSURE_A4R205_BIG_v0.2.0.md"),
  components: path.join(baseDir, "SERA_VNEXT_CALIBRATION_CORPUS_COMPONENT_MATRIX_A4R205_BIG.csv"),
  coverage: path.join(baseDir, "SERA_VNEXT_EVIDENCE_COVERAGE_MATRIX_A4R205_BIG.csv"),
  risks: path.join(baseDir, "SERA_VNEXT_UNRESOLVED_RISKS_REGISTER_A4R205_BIG.csv"),
  prerequisites: path.join(baseDir, "SERA_VNEXT_FUTURE_BENCHMARK_FIXTURE_PREREQUISITES_A4R205_BIG.md"),
  nextPhase: path.join(baseDir, "SERA_VNEXT_NEXT_MACROPHASE_DECISION_A4R205_BIG.md"),
  log: path.join(baseDir, "SERA_A4R205_BIG_LOG_v0.2.0.md"),
};

for (const file of Object.values(files)) {
  assert.ok(existsSync(file), `required A4R205-BIG artifact must exist: ${file}`);
}

const read = (file: string) => readFileSync(file, "utf8");
const docs = Object.fromEntries(Object.entries(files).map(([key, value]) => [key, read(value)])) as Record<string, string>;
const combined = Object.values(docs).join("\n");

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
const coverageRows = parseCsv(docs.coverage);
const riskRows = parseCsv(docs.risks);

assert.ok(docs.closure.includes("CALIBRATION_CORPUS_CANDIDATE_ONLY_READY"), "readiness verdict must exist");
assert.ok(docs.closure.includes("Comair 5191"), "Comair must appear in closure");
assert.ok(docs.closure.includes("clean anchor"), "Comair clean anchor must be explicit");
assert.ok(docs.closure.includes("Asiana 214"), "Asiana must appear in closure");
assert.ok(docs.closure.includes("automation / 500 ft gate boundary warning"), "Asiana warning must be explicit");
assert.ok(docs.closure.includes("UPS 1354"), "UPS must appear in closure");
assert.ok(docs.closure.includes("setup / FMC / V-S / MDA boundary warning"), "UPS warning must be explicit");
assert.ok(docs.closure.includes("Colgan 3407"), "Colgan must appear in closure");
assert.ok(docs.closure.includes("still required"), "Colgan must still be required");
assert.ok(docs.closure.includes("not a fourth positive reference"), "Colgan must not become a fourth reference");
assert.ok(docs.closure.includes("HUMAN_APPLIED_SERA_REFERENCE"), "human-applied case must appear");
assert.ok(docs.closure.includes("Momento em que o piloto decide acionar o crank."), "human escape point must be preserved");
assert.ok(docs.closure.includes("O-A"), "human O-A must appear");
assert.ok(docs.closure.includes("P-A"), "human P-A must appear");
assert.ok(docs.closure.includes("A-A"), "human A-A must appear");
assert.ok(docs.closure.includes("human input only"), "human classification must be input only");
assert.ok(docs.closure.includes("Daumas"), "Daumas must appear");
assert.ok(docs.closure.includes("methodological and depth reference"), "Daumas depth role must be explicit");
assert.ok(docs.closure.includes("not a factual source"), "Daumas non-factual lock must be explicit");
assert.ok(docs.closure.includes("GAP-004 consequence-as-cause"), "GAP-004 must appear");
assert.ok(docs.closure.includes("controlled synthetic draft only"), "GAP-004 controlled draft status must appear");
assert.ok(docs.closure.includes("GAP-002 agent_migration"), "GAP-002 must appear");
assert.ok(docs.closure.includes("not materialized"), "GAP-002 non-materialized state must appear");
assert.ok(docs.closure.includes("GAP-001 PF_PM separation"), "GAP-001 must appear");
assert.ok(docs.closure.includes("retained, audited, reference only"), "GAP-001 retained status must be explicit");
assert.ok(docs.closure.includes("fixture"), "fixture lock must appear");
assert.ok(docs.closure.includes("baseline"), "baseline lock must appear");
assert.ok(docs.closure.includes("product"), "product lock must appear");

assert.equal(componentRows.length, 12, "component matrix must contain twelve corpus components");
for (const componentName of [
  "Comair 5191",
  "Asiana 214",
  "UPS 1354",
  "Colgan 3407",
  "2026-0001 crank event",
  "Daumas",
  "GAP-004 consequence-as-cause",
  "GAP-002 agent_migration",
  "GAP-001 PF_PM separation",
  "G-WNSB and Execuflight 1526",
  "Negative and boundary controls",
  "Batch 2 deep extraction",
]) {
  assert.ok(componentRows.some((row) => row.component === componentName), `component matrix must include ${componentName}`);
}

assert.equal(coverageRows.length, 14, "coverage matrix must contain fourteen gap families");
for (const gapName of [
  "clean escape point anchor",
  "automation and mode boundary",
  "procedural and FMC and MDA boundary",
  "warning-window and PF_PM boundary",
  "A-A and slip and action capture",
  "consequence-as-cause",
  "agent migration",
  "PF_PM separation",
  "Daumas methodological depth",
  "precondition versus active failure",
  "outcome quarantine",
  "insufficient evidence and hold handling",
  "no-failure and A-A boundary",
  "synthetic-real separation",
]) {
  assert.ok(coverageRows.some((row) => row.gap_or_family === gapName), `coverage matrix must include ${gapName}`);
}

assert.equal(riskRows.length, 10, "risk register must contain ten risks");
for (const riskId of ["R-001", "R-002", "R-003", "R-004", "R-005", "R-006", "R-007", "R-008", "R-009", "R-010"]) {
  assert.ok(riskRows.some((row) => row.risk_id === riskId), `risk register must include ${riskId}`);
}

assert.ok(docs.prerequisites.includes("Future Benchmark Design Prerequisites"), "benchmark prerequisites section must exist");
assert.ok(docs.prerequisites.includes("Future Fixture Design Prerequisites"), "fixture prerequisites section must exist");
assert.ok(docs.prerequisites.includes("Future Baseline Rules"), "future baseline rules section must exist");
assert.ok(docs.nextPhase.includes("A4R206-BIG - Candidate Benchmark / Fixture Design Only"), "next macrophase must be A4R206-BIG");
assert.ok(!combined.includes("selectedCode: "), "selectedCode must not become active output");
assert.ok(!combined.includes("releasedCode: "), "releasedCode must not become active output");
assert.ok(!combined.includes("finalConclusion: "), "finalConclusion must not become active output");

const requiredLocks = [
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
  "no final recommendation output",
];

for (const marker of requiredLocks) {
  assert.ok(combined.includes(marker), `guardrail marker missing: ${marker}`);
}

const prohibitedActivePatterns = [
  /P\/O\/A final classification created:\s*YES/i,
  /final escape point approved:\s*YES/i,
  /READY automatic promotion:\s*YES/i,
  /selectedCode active output:(?!\s*BLOCKED\b).+/i,
  /releasedCode active output:(?!\s*BLOCKED\b).+/i,
  /finalConclusion active output:(?!\s*BLOCKED\b).+/i,
  /CLASSIFIED active output:(?!\s*BLOCKED\b).+/i,
  /fixture\/baseline\/product promotion:(?!\s*BLOCKED\b).+/i,
  /Daumas used as factual source:\s*YES/i,
  /Daumas automatic reentry:\s*YES/i,
  /synthetic-real blending:\s*YES/i,
];

for (const pattern of prohibitedActivePatterns) {
  assert.ok(!pattern.test(combined), `prohibited active pattern detected: ${pattern}`);
}

for (const forbidden of ["CERA", "DAL", "Dalmos", "Dalmais"]) {
  assert.ok(!combined.includes(forbidden), `forbidden token must be absent: ${forbidden}`);
}

const inventedQuestionFragments = [
  "P-1",
  "P-2",
  "O-1",
  "O-2",
  "A-1",
  "A-2",
  "Pergunta por eixo",
  "pergunta por eixo",
  "case-specific question",
  "auxiliary question",
  "questionPath",
  "exactQuestionText",
];

for (const fragment of inventedQuestionFragments) {
  assert.ok(!combined.includes(fragment), `invented-question fragment must be absent: ${fragment}`);
}

console.log("calibration-corpus-closure-a4r205big-trial-001: OK");
