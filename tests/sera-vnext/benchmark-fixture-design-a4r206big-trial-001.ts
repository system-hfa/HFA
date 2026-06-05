import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(__dirname, "..", "..");
const baseDir = path.join(root, "docs/sera-vnext/benchmark-a4r206/benchmark-fixture-design-big");

const files = {
  design: path.join(baseDir, "SERA_VNEXT_BENCHMARK_FIXTURE_DESIGN_A4R206_BIG_v0.2.0.md"),
  routing: path.join(baseDir, "SERA_VNEXT_BENCHMARK_COMPONENT_ROUTING_A4R206_BIG.csv"),
  eligibility: path.join(baseDir, "SERA_VNEXT_FIXTURE_ELIGIBILITY_MATRIX_A4R206_BIG.csv"),
  gates: path.join(baseDir, "SERA_VNEXT_FIXTURE_GATE_DESIGN_A4R206_BIG.csv"),
  baseline: path.join(baseDir, "SERA_VNEXT_BASELINE_GATE_DESIGN_A4R206_BIG.md"),
  nonUse: path.join(baseDir, "SERA_VNEXT_BENCHMARK_NON_USE_REGISTER_A4R206_BIG.csv"),
  protocol: path.join(baseDir, "SERA_VNEXT_FUTURE_VALIDATION_PROTOCOL_A4R206_BIG.md"),
  nextPhase: path.join(baseDir, "SERA_VNEXT_NEXT_MACROPHASE_DECISION_A4R206_BIG.md"),
  log: path.join(baseDir, "SERA_A4R206_BIG_LOG_v0.2.0.md"),
};

for (const file of Object.values(files)) {
  assert.ok(existsSync(file), `required A4R206-BIG artifact must exist: ${file}`);
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

const routingRows = parseCsv(docs.routing);
const eligibilityRows = parseCsv(docs.eligibility);
const gateRows = parseCsv(docs.gates);
const nonUseRows = parseCsv(docs.nonUse);

assert.ok(docs.design.includes("BENCHMARK_FIXTURE_DESIGN_ONLY_COMPLETE"), "benchmark design status must exist");
assert.ok(docs.eligibility.includes("fixture_eligibility_status"), "fixture eligibility matrix must exist");
assert.ok(docs.gates.includes("gate_name"), "fixture gate design must exist");
assert.ok(docs.baseline.includes("NOT_AUTHORIZED_NOW"), "baseline gate design must exist");
assert.ok(docs.nonUse.includes("prohibited_use"), "non-use register must exist");
assert.ok(docs.protocol.includes("FUTURE_VALIDATION_PROTOCOL_DESIGN_ONLY"), "future validation protocol must exist");

assert.equal(routingRows.length, 15, "routing matrix must include fifteen components");
assert.equal(eligibilityRows.length, 15, "eligibility matrix must include fifteen components");
assert.equal(gateRows.length, 12, "fixture gate design must include twelve gates");
assert.ok(nonUseRows.length >= 11, "non-use register must include required prohibited uses");

const routingByComponent = new Map(routingRows.map((row) => [row.component, row]));
const eligibilityByComponent = new Map(eligibilityRows.map((row) => [row.component, row]));

assert.equal(routingByComponent.get("Comair 5191")?.benchmark_role, "POSITIVE_REFERENCE_CANDIDATE");
assert.equal(eligibilityByComponent.get("Comair 5191")?.fixture_eligibility_status, "FIXTURE_DESIGN_ELIGIBLE_FUTURE_ONLY");
assert.match(routingByComponent.get("Comair 5191")?.blocked_uses ?? "", /fixture now/i);

assert.equal(routingByComponent.get("Asiana 214")?.benchmark_role, "POSITIVE_REFERENCE_WITH_BOUNDARY_WARNING");
assert.equal(routingByComponent.get("UPS 1354")?.benchmark_role, "POSITIVE_REFERENCE_WITH_BOUNDARY_WARNING");
assert.equal(
  eligibilityByComponent.get("Asiana 214")?.fixture_eligibility_status,
  "FIXTURE_DESIGN_ELIGIBLE_WITH_LIMITATION_FUTURE_ONLY",
);
assert.equal(
  eligibilityByComponent.get("UPS 1354")?.fixture_eligibility_status,
  "FIXTURE_DESIGN_ELIGIBLE_WITH_LIMITATION_FUTURE_ONLY",
);
assert.match(eligibilityByComponent.get("Asiana 214")?.eligibility_reason ?? "", /automation/i);
assert.match(eligibilityByComponent.get("UPS 1354")?.eligibility_reason ?? "", /setup/i);

assert.equal(routingByComponent.get("Colgan 3407")?.benchmark_role, "BOUNDARY_CONTROL");
assert.equal(eligibilityByComponent.get("Colgan 3407")?.fixture_eligibility_status, "NOT_FIXTURE_ELIGIBLE_NOW");

assert.equal(routingByComponent.get("2026-0001 crank event")?.benchmark_role, "HUMAN_APPLIED_REFERENCE");
assert.equal(eligibilityByComponent.get("2026-0001 crank event")?.fixture_eligibility_status, "NEVER_FIXTURE_AUTOMATIC");

assert.equal(routingByComponent.get("Daumas")?.benchmark_role, "METHODOLOGICAL_REFERENCE_ONLY");
assert.equal(eligibilityByComponent.get("Daumas")?.fixture_eligibility_status, "METHODOLOGY_REFERENCE_ONLY");

assert.equal(routingByComponent.get("GAP-004 consequence-as-cause")?.benchmark_role, "CONTROLLED_SYNTHETIC_CANDIDATE");
assert.equal(
  eligibilityByComponent.get("GAP-004 consequence-as-cause")?.fixture_eligibility_status,
  "SYNTHETIC_FIXTURE_DESIGN_ONLY_FUTURE",
);
assert.match(routingByComponent.get("GAP-004 consequence-as-cause")?.blocked_uses ?? "", /fixture now/i);

assert.equal(routingByComponent.get("GAP-002 agent_migration")?.benchmark_role, "SYNTHETIC_READINESS_ONLY");
assert.equal(eligibilityByComponent.get("GAP-002 agent_migration")?.fixture_eligibility_status, "NOT_FIXTURE_ELIGIBLE_NOW");
assert.match(routingByComponent.get("GAP-002 agent_migration")?.reason ?? "", /no materialized controlled draft/i);

assert.equal(routingByComponent.get("GAP-001 PF_PM separation")?.benchmark_role, "RETAINED_REFERENCE_ONLY");
assert.equal(routingByComponent.get("G-WNSB")?.benchmark_role, "SECOND_WAVE_CANDIDATE");
assert.equal(routingByComponent.get("Execuflight 1526")?.benchmark_role, "SECOND_WAVE_CANDIDATE");
assert.equal(routingByComponent.get("Delta 191")?.benchmark_role, "NEGATIVE_CONTROL");
assert.equal(routingByComponent.get("USAir 427")?.benchmark_role, "BOUNDARY_CONTROL");
assert.equal(routingByComponent.get("5N-BQJ")?.benchmark_role, "NEGATIVE_CONTROL");
assert.equal(routingByComponent.get("Batch 2 deferred cases")?.benchmark_role, "DEFERRED");

for (const component of ["Delta 191", "USAir 427", "5N-BQJ"]) {
  assert.equal(
    eligibilityByComponent.get(component)?.fixture_eligibility_status,
    "CONTROL_ONLY_NOT_POSITIVE_FIXTURE",
    `${component} must remain control-only`,
  );
}

for (const gateName of [
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
]) {
  assert.ok(gateRows.some((row) => row.gate_name === gateName), `gate missing: ${gateName}`);
}

for (const row of gateRows) {
  assert.equal(row.current_status, "DESIGN_ONLY_NOT_EXECUTED", `${row.gate_name} must not be executed`);
}

assert.ok(docs.baseline.includes("Baseline is not authorized in A4R206-BIG."));
assert.ok(docs.baseline.includes("fixture gate executed and passed"), "baseline must require fixture gate first");
assert.ok(docs.nextPhase.includes("A4R207-BIG - Fixture Gate Dry Run Design"), "next macrophase must be fixture gate dry-run design");

for (const prohibited of [
  "use candidate-only as final",
  "use benchmark design as real fixture",
  "use synthetic draft as real event",
  "use Daumas as factual source",
  "use human-applied case as automatic baseline",
  "use negative controls as positive examples",
  "use boundary cases without warning",
  "use Colgan as positive reference",
  "use Asiana or UPS without warnings",
  "use GAP-004 as proof of real-world causality",
  "use GAP-002 before materialization",
]) {
  assert.ok(nonUseRows.some((row) => row.prohibited_use === prohibited), `non-use row missing: ${prohibited}`);
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

const prohibitedActivePatterns = [
  /P\/O\/A final classification created:\s*YES/i,
  /final escape point approved:\s*YES/i,
  /READY automatic promotion:\s*YES/i,
  /selectedCode active output:(?!\s*BLOCKED\b).+/i,
  /releasedCode active output:(?!\s*BLOCKED\b).+/i,
  /finalConclusion active output:(?!\s*BLOCKED\b).+/i,
  /CLASSIFIED active output:(?!\s*BLOCKED\b).+/i,
  /fixture created:\s*YES/i,
  /baseline created:\s*YES/i,
  /Daumas used as factual source:\s*YES/i,
  /Daumas automatic reentry:\s*YES/i,
  /synthetic-real blending:\s*YES/i,
];

for (const pattern of prohibitedActivePatterns) {
  assert.ok(!pattern.test(combinedDocs), `prohibited active pattern detected: ${pattern}`);
}

const docsOnly = Object.values(docs).join("\n");
for (const forbidden of ["CERA", "DAL", "Dalmos", "Dalmais"]) {
  assert.ok(!docsOnly.includes(forbidden), `forbidden token must be absent from docs: ${forbidden}`);
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
  assert.ok(!docsOnly.includes(fragment), `invented-question fragment must be absent from docs: ${fragment}`);
}

console.log("benchmark-fixture-design-a4r206big-trial-001: OK");
