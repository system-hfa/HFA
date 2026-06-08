import fs from 'node:fs'
import path from 'node:path'

type CsvRow = Record<string, string>

type CliOptions = {
  dryRun: boolean
  limit: number | null
  reviewerSlot: string | null
  sharedOnly: boolean
  prefix: string
  confirmStaging: boolean
}

const ROOT_DIR = process.cwd()
const CASE_BANK_PATH = path.join(
  ROOT_DIR,
  'docs',
  'sera-vnext',
  'human-pilot-preparation',
  'SERA_VNEXT_HUMAN_PILOT_CASE_BANK.csv',
)

function parseCsvLine(line: string): string[] {
  const values: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i]
    const next = line[i + 1]
    if (char === '"' && inQuotes && next === '"') {
      current += '"'
      i += 1
      continue
    }
    if (char === '"') {
      inQuotes = !inQuotes
      continue
    }
    if (char === ',' && !inQuotes) {
      values.push(current)
      current = ''
      continue
    }
    current += char
  }

  values.push(current)
  return values
}

function parseCsv(content: string): CsvRow[] {
  const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0)
  if (lines.length === 0) return []
  const headers = parseCsvLine(lines[0])
  return lines.slice(1).map((line) => {
    const cells = parseCsvLine(line)
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? '']))
  })
}

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    dryRun: true,
    limit: null,
    reviewerSlot: null,
    sharedOnly: false,
    prefix: '[SERA_VNEXT_HUMAN_PILOT]',
    confirmStaging: false,
  }

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--dry-run') options.dryRun = true
    else if (arg === '--no-dry-run') options.dryRun = false
    else if (arg === '--shared-only') options.sharedOnly = true
    else if (arg === '--confirm-staging') options.confirmStaging = true
    else if (arg === '--limit') {
      const value = Number.parseInt(argv[i + 1] ?? '', 10)
      if (!Number.isFinite(value) || value < 1) throw new Error('Invalid --limit value')
      options.limit = value
      i += 1
    } else if (arg === '--reviewer-slot') {
      options.reviewerSlot = argv[i + 1] ?? null
      if (!options.reviewerSlot) throw new Error('Missing --reviewer-slot value')
      i += 1
    } else if (arg === '--prefix') {
      options.prefix = argv[i + 1] ?? options.prefix
      if (!options.prefix.trim()) throw new Error('Missing --prefix value')
      i += 1
    } else {
      throw new Error(`Unknown argument: ${arg}`)
    }
  }

  return options
}

function assertWriteModeBlockedUnlessControlled(options: CliOptions): void {
  if (options.dryRun) return

  const envName = process.env.SERA_VNEXT_HUMAN_PILOT_ENV?.trim().toLowerCase()
  const writeEnabled = process.env.SERA_VNEXT_HUMAN_PILOT_WRITE_ENABLED?.trim().toLowerCase() === 'true'
  const controlledEnv = envName === 'staging' || envName === 'controlled'

  if (!options.confirmStaging || !controlledEnv || !writeEnabled) {
    throw new Error('SERA_VNEXT_HUMAN_PILOT_SEED_REQUIRES_EXPLICIT_CONTROLLED_STAGING_CONFIRMATION')
  }

  throw new Error('SERA_VNEXT_HUMAN_PILOT_SEED_WRITE_ADAPTER_NOT_CONFIGURED')
}

function sanitizeTitle(title: string, prefix: string): string {
  const clean = title.trim()
  return clean.startsWith(prefix) ? clean : `${prefix} ${clean}`
}

function buildPayload(row: CsvRow, prefix: string): Record<string, unknown> {
  return {
    caseId: row.case_id,
    reviewerSlot: row.suggested_reviewer_slot,
    sharedCase: row.shared_case === 'YES',
    request: {
      title: sanitizeTitle(row.case_title, prefix),
      narrative: row.narrative,
      sourceType: 'INTERNAL_PILOT',
      sourceReference: row.case_id,
      clientRequestId: `human-pilot-${row.case_id.toLowerCase()}`,
      metadata: {
        pilotCaseId: row.case_id,
        caseType: row.case_type,
        reviewerSlot: row.suggested_reviewer_slot,
        sensitivity: row.sensitivity,
        sharedCase: row.shared_case === 'YES',
        internalUseConfirmed: true,
      },
    },
  }
}

function main(): void {
  const options = parseArgs(process.argv.slice(2))
  assertWriteModeBlockedUnlessControlled(options)

  const rows = parseCsv(fs.readFileSync(CASE_BANK_PATH, 'utf8'))
    .filter((row) => !options.reviewerSlot || row.suggested_reviewer_slot === options.reviewerSlot)
    .filter((row) => !options.sharedOnly || row.shared_case === 'YES')
  const selectedRows = options.limit === null ? rows : rows.slice(0, options.limit)
  const payloads = selectedRows.map((row) => buildPayload(row, options.prefix))

  const result = {
    status: 'HUMAN_PILOT_SEED_DRY_RUN_OK',
    dryRun: options.dryRun,
    writeMode: false,
    caseBankPath: path.relative(ROOT_DIR, CASE_BANK_PATH),
    selectedCases: selectedRows.length,
    filters: {
      reviewerSlot: options.reviewerSlot,
      sharedOnly: options.sharedOnly,
      limit: options.limit,
    },
    payloads,
  }

  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
}

main()

