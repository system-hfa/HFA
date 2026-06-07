export {};

/**
 * SERA vNext Product Beta — Real Database Validation Trial
 *
 * This trial verifies that the migration was applied to a real Supabase database
 * and that all tables, constraints, and indexes exist as expected.
 *
 * PREREQUISITE: Supabase local or staging available with migration applied.
 * Run: supabase db reset (local) or supabase db push (staging)
 *
 * When no real DB is available, this trial reports SKIPPED (not FAIL).
 */

const TRIAL_ID = 'product-beta-db-real-trial-001';

interface TrialResult {
  trial: string;
  status: 'PASS' | 'FAIL' | 'SKIPPED';
  checks: CheckResult[];
  summary: string;
  timestamp: string;
  environment: string;
}

interface CheckResult {
  name: string;
  status: 'PASS' | 'FAIL' | 'SKIPPED';
  detail?: string;
}

const checks: CheckResult[] = [];

function check(name: string, condition: boolean, detail?: string): CheckResult {
  const result: CheckResult = {
    name,
    status: condition ? 'PASS' : 'FAIL',
    detail,
  };
  checks.push(result);
  return result;
}

function skipCheck(name: string, reason: string): CheckResult {
  const result: CheckResult = {
    name,
    status: 'SKIPPED',
    detail: reason,
  };
  checks.push(result);
  return result;
}

async function runDbRealTrial(): Promise<TrialResult> {
  const timestamp = new Date().toISOString();

  const dbUrl = process.env.DATABASE_URL ?? process.env.SUPABASE_DB_URL ?? '';
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

  const dbAvailable = !!(dbUrl || (supabaseUrl && serviceRole));

  if (!dbAvailable) {
    skipCheck('database_connection', 'No DATABASE_URL or SUPABASE_SERVICE_ROLE_KEY configured — DB unavailable in this environment');
    skipCheck('tables_exist', 'Skipped: no DB connection');
    skipCheck('rls_enabled', 'Skipped: no DB connection');
    skipCheck('constraints_valid', 'Skipped: no DB connection');
    skipCheck('indexes_exist', 'Skipped: no DB connection');
    skipCheck('triggers_exist', 'Skipped: no DB connection');
    skipCheck('functions_exist', 'Skipped: no DB connection');

    const allSkipped = checks.every(c => c.status === 'SKIPPED');
    return {
      trial: TRIAL_ID,
      status: 'SKIPPED',
      checks,
      summary: `DB_UNAVAILABLE — ${allSkipped ? 'All checks skipped' : 'Some checks ran'}. Status: MIGRATION_LOCAL_NOT_APPLIED_LOCAL_DB_UNAVAILABLE`,
      timestamp,
      environment: 'NONE',
    };
  }

  // When DB IS available, the following checks would run:
  // (These are structural placeholders — implement with your DB client when available)

  const expectedTables = [
    'sera_vnext_analyses',
    'sera_vnext_analysis_revisions',
    'sera_vnext_analysis_reviews',
    'sera_vnext_analysis_events',
  ];

  const expectedFunctions = [
    'sera_vnext_beta_jwt_tenant_id',
    'sera_vnext_beta_jwt_role',
    'sera_vnext_beta_can_use',
    'prevent_sera_vnext_append_only_update',
    'prevent_sera_vnext_append_only_delete',
  ];

  const expectedIndexes = [
    'sera_vnext_analyses_tenant_client_request_uidx',
    'sera_vnext_analyses_tenant_created_idx',
    'sera_vnext_analyses_tenant_status_idx',
    'sera_vnext_revisions_analysis_revision_uidx',
    'sera_vnext_events_request_id_idx',
  ];

  // Placeholder: real implementation would query information_schema
  for (const table of expectedTables) {
    check(`table_exists_${table}`, false, 'DB available but real query not yet implemented — implement with psql or supabase-js admin client');
  }

  for (const fn of expectedFunctions) {
    check(`function_exists_${fn}`, false, 'DB available but real query not yet implemented');
  }

  for (const idx of expectedIndexes) {
    check(`index_exists_${idx}`, false, 'DB available but real query not yet implemented');
  }

  const failCount = checks.filter(c => c.status === 'FAIL').length;
  const passCount = checks.filter(c => c.status === 'PASS').length;
  const skipCount = checks.filter(c => c.status === 'SKIPPED').length;

  return {
    trial: TRIAL_ID,
    status: failCount > 0 ? 'FAIL' : passCount > 0 ? 'PASS' : 'SKIPPED',
    checks,
    summary: `PASS:${passCount} FAIL:${failCount} SKIP:${skipCount}`,
    timestamp,
    environment: dbUrl ? 'DATABASE_URL' : 'SUPABASE_REST',
  };
}

runDbRealTrial().then(result => {
  console.log(`\n[${TRIAL_ID}]`);
  console.log(`Status: ${result.status}`);
  console.log(`Environment: ${result.environment}`);
  console.log(`Timestamp: ${result.timestamp}`);
  console.log(`Summary: ${result.summary}`);
  console.log('\nChecks:');
  for (const c of result.checks) {
    const icon = c.status === 'PASS' ? '✓' : c.status === 'FAIL' ? '✗' : '~';
    console.log(`  ${icon} [${c.status}] ${c.name}${c.detail ? ` — ${c.detail}` : ''}`);
  }

  if (result.status === 'SKIPPED') {
    console.log('\nDB_UNAVAILABLE — trial SKIPPED (not FAIL)');
    console.log('To execute: provide DATABASE_URL and run supabase db reset or supabase db push');
    process.exit(0);
  }
  if (result.status === 'FAIL') {
    console.log('\nFAIL — see checks above');
    process.exit(1);
  }
  console.log('\nPASS');
  process.exit(0);
});
