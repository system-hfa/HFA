import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(__dirname, '..', '..');
const baseDir = path.join(root, 'docs/sera-vnext/reference-corpus-a4r203/daumas-calibration-a');

const files = {
  extraction: path.join(baseDir, 'SERA_VNEXT_DAUMAS_CALIBRATION_EXTRACTION_A4R203_A_v0.2.0.md'),
  mapping: path.join(baseDir, 'SERA_VNEXT_HENDY_DAUMAS_SERA_MAPPING_A4R203_A.csv'),
  checklist: path.join(baseDir, 'SERA_VNEXT_DAUMAS_EVIDENCE_DEPTH_CHECKLIST_A4R203_A.csv'),
  patterns: path.join(baseDir, 'SERA_VNEXT_DAUMAS_REASONING_PATTERN_REGISTER_A4R203_A.csv'),
  realEvents: path.join(baseDir, 'SERA_VNEXT_DAUMAS_REAL_EVENT_SUPPORT_A4R203_A.csv'),
  synthetic: path.join(baseDir, 'SERA_VNEXT_DAUMAS_SYNTHETIC_SUPPORT_A4R203_A.csv'),
  permitted: path.join(baseDir, 'SERA_VNEXT_DAUMAS_PERMITTED_PROHIBITED_USE_A4R203_A.md'),
  nextPhase: path.join(baseDir, 'SERA_VNEXT_NEXT_PHASE_DECISION_A4R203_A.md'),
  log: path.join(baseDir, 'SERA_A4R203_A_LOG_v0.2.0.md'),
};

for (const file of Object.values(files)) {
  assert.ok(existsSync(file), `required A4R203-A artifact must exist: ${file}`);
}

const read = (file: string) => readFileSync(file, 'utf8');
const docs = Object.fromEntries(Object.entries(files).map(([key, value]) => [key, read(value)])) as Record<string, string>;
const combined = Object.values(docs).join('\n');

function parseCsv(input: string): Record<string, string>[] {
  const rows: string[][] = [];
  let field = '';
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
    if (char === ',' && !inQuotes) {
      row.push(field);
      field = '';
      continue;
    }
    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') index += 1;
      row.push(field);
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      field = '';
      continue;
    }
    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const [header, ...body] = rows;
  return body.map((values) => Object.fromEntries(header.map((name, index) => [name, values[index] ?? ''])));
}

const mappingRows = parseCsv(docs.mapping);
const checklistRows = parseCsv(docs.checklist);
const patternRows = parseCsv(docs.patterns);
const realEventRows = parseCsv(docs.realEvents);
const syntheticRows = parseCsv(docs.synthetic);

assert.ok(mappingRows.length >= 12, 'mapping matrix must contain the minimum principle set');
assert.ok(checklistRows.length >= 18, 'evidence-depth checklist must contain the required dimensions');
assert.ok(patternRows.length >= 9, 'reasoning pattern register must contain multiple patterns');
assert.equal(realEventRows.length, 6, 'real-event support matrix must contain six events');
assert.ok(syntheticRows.length >= 8, 'synthetic support matrix must contain multiple families');

assert.ok(combined.includes('Daumas'), 'Daumas spelling with U must be present');
assert.ok(combined.includes('Hendy'), 'Hendy must be present');
assert.ok(combined.includes('SERA vNext'), 'SERA vNext must be present');
assert.ok(combined.includes('Daumas automatic reentry: NO'), 'Daumas automatic reentry lock must be explicit');
assert.ok(combined.includes('Daumas automatic READY promotion: NO'), 'Daumas READY lock must be explicit');

for (const principle of [
  'perception',
  'objective_goal',
  'action',
  'active_failure',
  'actor_directness',
  'timing_of_failure',
  'safe_operation_departure',
  'evidence_sufficiency',
  'cognitive_contextual_reconstruction',
  'preconditions_vs_active_failure',
  'consequence_quarantine',
  'method_usability_by_humans',
]) {
  assert.ok(mappingRows.some((row) => row.principle === principle), `mapping must include principle: ${principle}`);
}

for (const dimension of [
  'source_locator',
  'timeline',
  'actor_directness',
  'observed_action_omission',
  'perception_cues',
  'objective_goal_evidence',
  'action_evidence',
  'communication_callout',
  'warning_alert',
  'procedure_SOP',
  'aircraft_system_state',
  'environmental_technical_context',
  'preconditions',
  'cognitive_context_detail',
  'consequence_quarantine',
  'uncertainty_notes',
  'evidence_against',
  'limitations',
]) {
  assert.ok(checklistRows.some((row) => row.evidence_dimension === dimension), `checklist must include dimension: ${dimension}`);
}

for (const eventName of [
  'Comair Flight 5191',
  'Asiana Airlines Flight 214',
  'UPS Airlines Flight 1354',
  'Colgan Air Flight 3407',
  'G-WNSB Sumburgh helicopter accident',
  'Execuflight Flight 1526',
]) {
  assert.ok(realEventRows.some((row) => row.event_name === eventName), `real-event support must include ${eventName}`);
}

for (const gapName of [
  'GAP-004 consequence-as-cause',
  'GAP-002 agent_migration',
  'GAP-001 PF_PM separation',
  'warning_callout_go_around',
  'automation_mode_awareness',
  'technical_human_boundary',
  'no_failure_A_A_boundary',
  'objective_goal_ambiguity',
  'perception_action_mismatch',
]) {
  assert.ok(syntheticRows.some((row) => row.gap_or_family === gapName), `synthetic support must include ${gapName}`);
}

const requiredLocks = [
  'Daumas used as factual source: NO',
  'Daumas automatic reentry: NO',
  'Daumas automatic READY promotion: NO',
  'P/O/A final classification created: NO',
  'final escape point approved: NO',
  'READY automatic promotion: NO',
  'selectedCode active output: BLOCKED',
  'releasedCode active output: BLOCKED',
  'finalConclusion active output: BLOCKED',
  'CLASSIFIED active output: BLOCKED',
  'fixture/baseline/product promotion: BLOCKED',
  'downstream release behavior: BLOCKED',
  'synthetic-real blending: NO',
];

for (const marker of requiredLocks) {
  assert.ok(combined.includes(marker), `guardrail marker missing: ${marker}`);
}

for (const forbidden of ['CERA', 'DAL', 'Dalmos', 'Dalmais']) {
  assert.ok(!combined.includes(forbidden), `forbidden token must be absent: ${forbidden}`);
}

const inventedQuestionFragments = [
  'P-1',
  'P-2',
  'O-1',
  'O-2',
  'A-1',
  'A-2',
  'Pergunta por eixo',
  'pergunta por eixo',
  'case-specific question',
  'auxiliary question',
];

for (const fragment of inventedQuestionFragments) {
  assert.ok(!combined.includes(fragment), `invented-question fragment must be absent: ${fragment}`);
}

const prohibitedActivePatterns = [
  /P\/O\/A final classification created:\s*YES/i,
  /final escape point approved:\s*YES/i,
  /READY automatic promotion:\s*YES/i,
  /Daumas used as factual source:\s*YES/i,
  /Daumas automatic reentry:\s*YES/i,
  /Daumas automatic READY promotion:\s*YES/i,
  /synthetic-real blending:\s*YES/i,
  /selectedCode\s*:\s*(?!BLOCKED|NO|null)/i,
  /releasedCode\s*:\s*(?!BLOCKED|NO|null)/i,
  /finalConclusion\s*:\s*(?!BLOCKED|NO|null)/i,
];

for (const pattern of prohibitedActivePatterns) {
  assert.ok(!pattern.test(combined), `prohibited active pattern detected: ${pattern}`);
}

for (const requiredLock of [
  'no HFACS-to-SERA substitution',
  'no Risk/ERC/ARMS layer work',
  'no final recommendation output',
]) {
  assert.ok(combined.includes(requiredLock), `A4R203-A must retain lock: ${requiredLock}`);
}

console.log('daumas-calibration-extraction-a4r203a-trial-001: OK');
