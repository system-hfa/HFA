import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue };

type FixtureRecord = {
  id: string;
  path: string;
  data: unknown;
};

type CoverageRow = {
  code: string;
  covered: boolean;
  fixture_ids: string[];
  count: number;
};

type TaxonomyCoverageReport = {
  generated_at: string;
  totals: {
    codes: number;
    covered: number;
    uncovered: number;
    single_fixture: number;
    fixtures: number;
  };
  matrix: CoverageRow[];
  uncovered_codes: string[];
  single_fixture_codes: string[];
};

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const fixturesDir = resolve(repoRoot, "tests/sera");
const reportPath = resolve(repoRoot, "tests/reports/taxonomy-coverage.json");
const scriptPath = resolve(fileURLToPath(import.meta.url));

const perceptionCodes = range("P", "A", "H");
const objectiveCodes = range("O", "A", "D");
const actionCodes = range("A", "A", "J");
const ercCodes = ["ERC-1", "ERC-2", "ERC-3", "ERC-4", "ERC-5"];

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  const fixtures = await loadFixtures(fixturesDir);
  const observedPreconditions = collectObservedPreconditions(fixtures);
  const taxonomy = [
    ...perceptionCodes,
    ...objectiveCodes,
    ...actionCodes,
    ...ercCodes,
    ...observedPreconditions,
  ];

  const coverage = new Map<string, Set<string>>();

  for (const code of taxonomy) {
    coverage.set(code, new Set());
  }

  for (const fixture of fixtures) {
    const codes = extractCodes(fixture.data);

    for (const code of codes) {
      if (!coverage.has(code)) {
        coverage.set(code, new Set());
      }

      coverage.get(code)?.add(fixture.id);
    }
  }

  const matrix = [...coverage.entries()]
    .sort(([left], [right]) => sortCode(left, right))
    .map(([code, fixtureIds]) => ({
      code,
      covered: fixtureIds.size > 0,
      fixture_ids: [...fixtureIds].sort(),
      count: fixtureIds.size,
    }));

  const uncoveredCodes = matrix
    .filter((row) => !row.covered)
    .map((row) => row.code);
  const singleFixtureCodes = matrix
    .filter((row) => row.count === 1)
    .map((row) => row.code);

  const report: TaxonomyCoverageReport = {
    generated_at: new Date().toISOString(),
    totals: {
      codes: matrix.length,
      covered: matrix.length - uncoveredCodes.length,
      uncovered: uncoveredCodes.length,
      single_fixture: singleFixtureCodes.length,
      fixtures: fixtures.length,
    },
    matrix,
    uncovered_codes: uncoveredCodes,
    single_fixture_codes: singleFixtureCodes,
  };

  mkdirSync(dirname(reportPath), { recursive: true });
  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

  printTable(matrix);
  printHighlights("Sem cobertura", uncoveredCodes);
  printHighlights("Com apenas 1 fixture", singleFixtureCodes);
  console.log(`\nJSON salvo em ${relative(repoRoot, reportPath)}`);
}

function range(prefix: string, first: string, last: string) {
  const start = first.charCodeAt(0);
  const end = last.charCodeAt(0);
  const codes: string[] = [];

  for (let value = start; value <= end; value += 1) {
    codes.push(`${prefix}-${String.fromCharCode(value)}`);
  }

  return codes;
}

async function loadFixtures(dir: string) {
  const files = listFixtureFiles(dir);
  const fixtures: FixtureRecord[] = [];

  for (const file of files) {
    const loaded = await loadFixtureFile(file);
    const records = Array.isArray(loaded) ? loaded : [loaded];

    records.forEach((record, index) => {
      const fallbackId = records.length === 1
        ? relative(repoRoot, file)
        : `${relative(repoRoot, file)}#${index + 1}`;

      fixtures.push({
        id: getFixtureId(record, fallbackId),
        path: relative(repoRoot, file),
        data: record,
      });
    });
  }

  return fixtures;
}

function listFixtureFiles(dir: string) {
  const files: string[] = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);

    if (fullPath === scriptPath) {
      continue;
    }

    if (entry.isDirectory()) {
      files.push(...listFixtureFiles(fullPath));
      continue;
    }

    if (entry.isFile() && isFixtureExtension(fullPath)) {
      files.push(fullPath);
    }
  }

  return files.sort();
}

function isFixtureExtension(path: string) {
  return [".json", ".jsonc", ".ts", ".tsx", ".js", ".mjs", ".cjs"].includes(
    extname(path),
  );
}

async function loadFixtureFile(path: string) {
  const extension = extname(path);
  const source = readFileSync(path, "utf8");

  if (extension === ".json") {
    return JSON.parse(source) as JsonValue;
  }

  if (extension === ".jsonc") {
    return JSON.parse(stripJsonComments(source)) as JsonValue;
  }

  return extractFixtureRecordsFromSource(source);
}

function stripJsonComments(input: string) {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|\s)\/\/.*$/gm, "$1");
}

function getFixtureId(value: unknown, fallback: string) {
  if (!isRecord(value)) {
    return fallback;
  }

  const id = value.id ?? value.fixture_id ?? value.fixtureId ?? value.name;
  return typeof id === "string" && id.length > 0 ? id : fallback;
}

function extractFixtureRecordsFromSource(source: string) {
  const fixtures: unknown[] = [];
  const blocks = extractObjectBlocks(source);

  for (const block of blocks) {
    if (!hasFixtureSignal(block)) {
      continue;
    }

    const id = extractStringField(block, "id")
      ?? extractStringField(block, "fixture_id")
      ?? extractStringField(block, "fixtureId")
      ?? extractStringField(block, "name");

    if (!id) {
      continue;
    }

    fixtures.push({
      id,
      expected_codes: {
        perception_code: extractStringField(block, "perception_code"),
        objective_code: extractStringField(block, "objective_code"),
        action_code: extractStringField(block, "action_code"),
        erc_level: extractErcLevel(block),
      },
      top_preconditions: extractArrayStringField(block, "top_preconditions"),
    });
  }

  return fixtures;
}

function hasFixtureSignal(block: string) {
  return (
    block.includes("expected_codes")
    || block.includes("perception_code")
    || block.includes("objective_code")
    || block.includes("action_code")
    || block.includes("erc_level")
    || block.includes("top_preconditions")
  );
}

function extractObjectBlocks(source: string) {
  const blocks: string[] = [];
  let depth = 0;
  let start = -1;
  let quote: "'" | "\"" | "`" | null = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (lineComment) {
      if (char === "\n") {
        lineComment = false;
      }

      continue;
    }

    if (blockComment) {
      if (char === "*" && next === "/") {
        blockComment = false;
        index += 1;
      }

      continue;
    }

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === quote) {
        quote = null;
      }

      continue;
    }

    if (char === "/" && next === "/") {
      lineComment = true;
      index += 1;
      continue;
    }

    if (char === "/" && next === "*") {
      blockComment = true;
      index += 1;
      continue;
    }

    if (char === "'" || char === "\"" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "{") {
      if (depth === 0) {
        start = index;
      }

      depth += 1;
      continue;
    }

    if (char !== "}") {
      continue;
    }

    depth -= 1;

    if (depth === 0 && start >= 0) {
      blocks.push(source.slice(start, index + 1));
      start = -1;
    }
  }

  return blocks;
}

function extractStringField(source: string, field: string) {
  const match = source.match(new RegExp(`\\b${field}\\s*:\\s*(['"\`])([^'"\`]+)\\1`));
  return match?.[2];
}

function extractErcLevel(source: string) {
  const stringValue = extractStringField(source, "erc_level");
  if (stringValue) {
    return stringValue;
  }

  const match = source.match(/\berc_level\s*:\s*(\d+)/);
  return match?.[1];
}

function extractArrayStringField(source: string, field: string) {
  const match = source.match(new RegExp(`\\b${field}\\s*:\\s*\\[([\\s\\S]*?)\\]`));
  if (!match) {
    return [];
  }

  return [...match[1].matchAll(/['"`]([^'"`]+)['"`]/g)].map((entry) => entry[1]);
}

function collectObservedPreconditions(fixtures: FixtureRecord[]) {
  const preconditions = new Set<string>();

  for (const fixture of fixtures) {
    for (const precondition of extractTopPreconditions(fixture.data)) {
      preconditions.add(precondition);
    }
  }

  return [...preconditions].sort();
}

function extractCodes(value: unknown) {
  const codes = new Set<string>();

  visit(value, (key, node) => {
    if (key === "perception_code") {
      addStringCode(codes, node);
    }

    if (key === "objective_code") {
      addStringCode(codes, node);
    }

    if (key === "action_code") {
      addStringCode(codes, node);
    }

    if (key === "erc_level") {
      addErcCode(codes, node);
    }

    if (key === "top_preconditions") {
      addPreconditions(codes, node);
    }
  });

  return codes;
}

function extractTopPreconditions(value: unknown) {
  const preconditions = new Set<string>();

  visit(value, (key, node) => {
    if (key === "top_preconditions") {
      addPreconditions(preconditions, node);
    }
  });

  return preconditions;
}

function addStringCode(target: Set<string>, value: unknown) {
  if (typeof value === "string" && value.length > 0) {
    target.add(value);
  }
}

function addErcCode(target: Set<string>, value: unknown) {
  if (typeof value === "number" && Number.isInteger(value)) {
    target.add(`ERC-${value}`);
    return;
  }

  if (typeof value !== "string" || value.length === 0) {
    return;
  }

  const numeric = value.match(/^\d+$/);
  if (numeric) {
    target.add(`ERC-${value}`);
    return;
  }

  target.add(value.startsWith("ERC") ? value.replace(/^ERC\s*/, "ERC-") : value);
}

function addPreconditions(target: Set<string>, value: unknown) {
  if (Array.isArray(value)) {
    for (const item of value) {
      addPrecondition(target, item);
    }

    return;
  }

  addPrecondition(target, value);
}

function addPrecondition(target: Set<string>, value: unknown) {
  if (typeof value === "string" && value.length > 0) {
    target.add(value);
    return;
  }

  if (!isRecord(value)) {
    return;
  }

  const code = value.code ?? value.id ?? value.name;
  if (typeof code === "string" && code.length > 0) {
    target.add(code);
  }
}

function visit(
  value: unknown,
  callback: (key: string | null, value: unknown) => void,
  key: string | null = null,
) {
  callback(key, value);

  if (Array.isArray(value)) {
    for (const item of value) {
      visit(item, callback);
    }

    return;
  }

  if (!isRecord(value)) {
    return;
  }

  for (const [entryKey, entryValue] of Object.entries(value)) {
    visit(entryValue, callback, entryKey);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function printTable(rows: CoverageRow[]) {
  const headers = ["code", "covered", "fixture_ids", "count"];
  const values = rows.map((row) => [
    row.code,
    String(row.covered),
    row.fixture_ids.join(", "),
    String(row.count),
  ]);
  const widths = headers.map((header, index) =>
    Math.max(header.length, ...values.map((row) => row[index].length)),
  );

  console.log(formatRow(headers, widths));
  console.log(formatRow(widths.map((width) => "-".repeat(width)), widths));

  for (const row of values) {
    console.log(formatRow(row, widths));
  }
}

function formatRow(values: string[], widths: number[]) {
  return values
    .map((value, index) => value.padEnd(widths[index]))
    .join(" | ");
}

function printHighlights(title: string, codes: string[]) {
  console.log(`\n${title}:`);

  if (codes.length === 0) {
    console.log("- nenhum");
    return;
  }

  for (const code of codes) {
    console.log(`- ${code}`);
  }
}

function sortCode(left: string, right: string) {
  return codeRank(left).localeCompare(codeRank(right));
}

function codeRank(code: string) {
  if (/^P-[A-Z]$/.test(code)) {
    return `1-${code}`;
  }

  if (/^O-[A-Z]$/.test(code)) {
    return `2-${code}`;
  }

  if (/^A-[A-Z]$/.test(code)) {
    return `3-${code}`;
  }

  if (/^ERC-\d+$/.test(code)) {
    return `4-${code.padStart(6, "0")}`;
  }

  return `5-${code}`;
}
