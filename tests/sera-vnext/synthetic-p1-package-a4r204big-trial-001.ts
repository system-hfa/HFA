import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

const docRoot = "docs/sera-vnext";
const packageDir = `${docRoot}/synthetic-a4r204/synthetic-p1-package-big`;
const inputDir = `${docRoot}/reference-corpus-a4r204/human-applied-sera-inputs`;

const requiredFiles = [
  `${inputDir}/HUMAN_APPLIED_SERA_2026_0001_TAX_FOR_GSO_018_REV00.docx`,
  `${inputDir}/HUMAN_APPLIED_SERA_2026_0001_EXTRACT_A4R204_BIG.md`,
  `${packageDir}/SERA_VNEXT_HUMAN_APPLIED_SERA_INTAKE_A4R204_BIG.md`,
  `${packageDir}/SERA_VNEXT_HUMAN_APPLIED_SERA_VNEXT_AUDIT_A4R204_BIG.md`,
  `${packageDir}/SERA_VNEXT_HUMAN_APPLIED_SERA_VALUE_MATRIX_A4R204_BIG.csv`,
  `${packageDir}/SERA_VNEXT_SYNTHETIC_P1_PACKAGE_A4R204_BIG_v0.2.0.md`,
  `${packageDir}/SERA_VNEXT_GAP004_DESIGN_REVIEW_A4R204_BIG.md`,
  `${packageDir}/SERA_VNEXT_GAP004_CONTROLLED_SYNTHETIC_DRAFT_A4R204_BIG.md`,
  `${packageDir}/SERA_VNEXT_GAP004_RED_TEAM_A4R204_BIG.md`,
  `${packageDir}/SERA_VNEXT_GAP004_VALIDATION_MATRIX_A4R204_BIG.csv`,
  `${packageDir}/SERA_VNEXT_GAP002_DESIGN_READINESS_A4R204_BIG.md`,
  `${packageDir}/SERA_VNEXT_GAP002_GUARDRAIL_MATRIX_A4R204_BIG.csv`,
  `${packageDir}/SERA_VNEXT_GAP001_RETAINED_REFERENCE_A4R204_BIG.md`,
  `${packageDir}/SERA_VNEXT_SYNTHETIC_P1_DECISION_A4R204_BIG.md`,
  `${packageDir}/SERA_A4R204_BIG_LOG_v0.2.0.md`,
];

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function read(relPath: string): string {
  return readFileSync(path.join(root, relPath), "utf8");
}

for (const relPath of requiredFiles) {
  assert(existsSync(path.join(root, relPath)), `missing required A4R204-BIG file: ${relPath}`);
}

const humanExtract = read(`${inputDir}/HUMAN_APPLIED_SERA_2026_0001_EXTRACT_A4R204_BIG.md`);
const intake = read(`${packageDir}/SERA_VNEXT_HUMAN_APPLIED_SERA_INTAKE_A4R204_BIG.md`);
const audit = read(`${packageDir}/SERA_VNEXT_HUMAN_APPLIED_SERA_VNEXT_AUDIT_A4R204_BIG.md`);
const packageSummary = read(`${packageDir}/SERA_VNEXT_SYNTHETIC_P1_PACKAGE_A4R204_BIG_v0.2.0.md`);
const gap4Review = read(`${packageDir}/SERA_VNEXT_GAP004_DESIGN_REVIEW_A4R204_BIG.md`);
const syntheticDraft = read(`${packageDir}/SERA_VNEXT_GAP004_CONTROLLED_SYNTHETIC_DRAFT_A4R204_BIG.md`);
const gap4RedTeam = read(`${packageDir}/SERA_VNEXT_GAP004_RED_TEAM_A4R204_BIG.md`);
const gap4Matrix = read(`${packageDir}/SERA_VNEXT_GAP004_VALIDATION_MATRIX_A4R204_BIG.csv`);
const gap2Readiness = read(`${packageDir}/SERA_VNEXT_GAP002_DESIGN_READINESS_A4R204_BIG.md`);
const gap2Matrix = read(`${packageDir}/SERA_VNEXT_GAP002_GUARDRAIL_MATRIX_A4R204_BIG.csv`);
const gap1Retained = read(`${packageDir}/SERA_VNEXT_GAP001_RETAINED_REFERENCE_A4R204_BIG.md`);
const decision = read(`${packageDir}/SERA_VNEXT_SYNTHETIC_P1_DECISION_A4R204_BIG.md`);
const log = read(`${packageDir}/SERA_A4R204_BIG_LOG_v0.2.0.md`);

const allDocs = [
  humanExtract,
  intake,
  audit,
  packageSummary,
  gap4Review,
  syntheticDraft,
  gap4RedTeam,
  gap4Matrix,
  gap2Readiness,
  gap2Matrix,
  gap1Retained,
  decision,
  log,
].join("\n");

const requiredHumanTerms = [
  "HUMAN_APPLIED_SERA_REFERENCE",
  "NOT_BASELINE",
  "NOT_FIXTURE",
  "NOT_PRODUCT",
  "NOT_READY",
  "NO_SELECTED_CODE",
  "NO_RELEASED_CODE",
  "NO_FINAL_CONCLUSION",
  "NO_CLASSIFIED_OUTPUT",
  "NO_DOWNSTREAM",
  "HUMAN_CLASSIFICATION_RECORDED_AS_INPUT_ONLY",
];

for (const term of requiredHumanTerms) {
  assert(allDocs.includes(term), `missing required human-applied lock term: ${term}`);
}

const requiredSyntheticTerms = [
  "CONTROLLED_SYNTHETIC_DRAFT_ONLY",
  "NOT_REAL_EVENT",
  "NOT_FIXTURE",
  "NOT_BASELINE",
  "NOT_PRODUCT",
  "NOT_READY",
  "NO_SELECTED_CODE",
  "NO_RELEASED_CODE",
  "NO_FINAL_CONCLUSION",
  "NO_CLASSIFIED_OUTPUT",
  "NO_DOWNSTREAM",
];

for (const term of requiredSyntheticTerms) {
  assert(syntheticDraft.includes(term), `missing required synthetic lock term in draft: ${term}`);
}

assert(humanExtract.includes("HUMAN_APPLIED_SERA_REFERENCE"), "human applied extract missing reference status");
assert(humanExtract.includes("HUMAN_CLASSIFICATION_RECORDED_AS_INPUT_ONLY"), "human classification must be input only");
assert(/O-A/.test(humanExtract) && /P-A/.test(humanExtract) && /A-A/.test(humanExtract), "human O-A/P-A/A-A values not recorded");
assert(/human recorded classification, not vNext final/i.test(humanExtract), "human classifications must not be vNext final");
assert(humanExtract.includes("Momento em que o piloto decide acionar o crank."), "human escape point text not preserved exactly");
assert(/decide acionar o crank|start of crank|inicio do crank/i.test(humanExtract + intake + audit), "crank decision/start boundary missing");
assert(allDocs.includes("TEAM_REDUCTION_PRECONDITION_NOT_ESCAPE_POINT"), "team reduction must be explicitly precondition not escape point");
assert(/reduced maintenance team|degraded team composition|loss of cross-supervision/i.test(allDocs), "reduced/degraded team preconditions missing");

const humanCaseLocks = [humanExtract, intake, audit].join("\n");
assert(!/baseline promotion:\s*YES/i.test(humanCaseLocks), "human case cannot be baseline");
assert(!/fixture promotion:\s*YES/i.test(humanCaseLocks), "human case cannot be fixture");
assert(!/product behavior:\s*YES/i.test(humanCaseLocks), "human case cannot be product");

assert(gap4Review.includes("consequence-as-cause"), "GAP-004 design review must address consequence-as-cause");
assert(syntheticDraft.includes("consequence-as-cause"), "GAP-004 draft must include consequence-as-cause trap");
assert(gap4Matrix.includes("GAP-004"), "GAP-004 validation matrix missing");
assert(gap2Readiness.includes("GAP002_DESIGN_READINESS_COMPLETE_NOT_MATERIALIZED"), "GAP-002 must be design-ready but not materialized");
assert(gap2Matrix.includes("GAP-002"), "GAP-002 guardrail matrix missing");
assert(gap1Retained.includes("GAP001_RETAINED_REFERENCE_ONLY_NOT_REOPENED"), "GAP-001 retained reference missing");
assert(decision.includes("A4R205-BIG - Calibration Corpus Closure"), "next macrophase decision missing");

const syntheticForbidden = [
  "AeroMaster",
  "PS-ARP",
  "S-76",
  "Macaé",
  "Macae",
  "18/02/2026",
  "2026-0001",
  "TAX-FOR-GSO",
  "Rev00",
  "compressor wash",
  "crank",
];

for (const term of syntheticForbidden) {
  assert(!syntheticDraft.includes(term), `synthetic draft leaked real human-applied identifier: ${term}`);
}

assert(!/\b[A-Z]{2}-[A-Z]{3}\b/.test(syntheticDraft), "synthetic draft contains aircraft registration-like pattern");
assert(!/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/.test(syntheticDraft), "synthetic draft contains real-date-like slash date");
assert(!/\b20\d{2}-\d{2}-\d{2}\b/.test(syntheticDraft), "synthetic draft contains ISO date-like value");

const activeOutputPatterns = [
  new RegExp("\\bselected" + "Code\\b"),
  new RegExp("\\breleased" + "Code\\b"),
  new RegExp("\\bfinal" + "Conclusion\\b"),
  /CLASSIFIED active output:\s*YES/i,
  /READY promotion:\s*YES/i,
  /final P\/O\/A:\s*YES/i,
  /final escape point approved:\s*YES/i,
  /fixture\/baseline\/product promotion:\s*YES/i,
];

for (const pattern of activeOutputPatterns) {
  assert(!pattern.test(allDocs), `active output pattern leaked: ${pattern}`);
}

const negativeOnlyTerms = ["H" + "FACS", "Risk/" + "ERC", "ARMS/" + "ERC", "recom" + "mendations"];
for (const term of negativeOnlyTerms) {
  const occurrences = allDocs.match(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) ?? [];
  assert(occurrences.length === 0, `restricted non-scope term appears outside locks: ${term}`);
}

const inventedQuestionPattern = new RegExp(
  "canonical\\s+ques" + "tion|question" + "Path|exact" + "QuestionText|invented ques" + "tion",
  "i",
);
assert(!inventedQuestionPattern.test(allDocs), "tree-flow reconstruction pattern must be absent");
assert(!/Daumas used as factual source:\s*YES/i.test(allDocs), "Daumas cannot be factual source");
assert(!/Daumas automatic reentry:\s*YES/i.test(allDocs), "Daumas cannot trigger automatic reentry");
assert(!/synthetic-real blending:\s*YES/i.test(allDocs), "synthetic-real blending must be absent");

console.log("A4R204-BIG synthetic P1 human-applied SERA trial PASS");
