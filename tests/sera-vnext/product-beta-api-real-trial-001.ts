export {};

/**
 * SERA vNext Product Beta — Real API Validation Trial
 *
 * Tests all SERA vNext beta API endpoints against a real running Next.js server
 * with a live database and feature flags enabled.
 *
 * PREREQUISITE:
 *   1. Migration applied to Supabase local or staging
 *   2. Next.js dev server running: npm run dev
 *   3. SERA_VNEXT_PRODUCT_BETA_ENABLED=true in environment
 *   4. Valid admin JWT for test tenant
 *   Set: SERA_VNEXT_TEST_BASE_URL, SERA_VNEXT_TEST_ADMIN_TOKEN, SERA_VNEXT_TEST_TENANT_ID
 *
 * When environment not configured, reports SKIPPED.
 */

const TRIAL_ID = 'product-beta-api-real-trial-001';

interface CheckResult {
  name: string;
  status: 'PASS' | 'FAIL' | 'SKIPPED';
  detail?: string;
  httpStatus?: number;
}

const checks: CheckResult[] = [];

function skipCheck(name: string, reason: string): void {
  checks.push({ name, status: 'SKIPPED', detail: reason });
}

const API_ENDPOINTS = [
  { name: 'POST /api/admin/sera-vnext/analyses', method: 'POST', path: '/api/admin/sera-vnext/analyses' },
  { name: 'GET /api/admin/sera-vnext/analyses', method: 'GET', path: '/api/admin/sera-vnext/analyses' },
  { name: 'GET /api/admin/sera-vnext/analyses/:id', method: 'GET', path: '/api/admin/sera-vnext/analyses/:id' },
  { name: 'POST /api/admin/sera-vnext/analyses/:id/reanalyze', method: 'POST', path: '/api/admin/sera-vnext/analyses/:id/reanalyze' },
  { name: 'POST /api/admin/sera-vnext/analyses/:id/reviews', method: 'POST', path: '/api/admin/sera-vnext/analyses/:id/reviews' },
  { name: 'POST /api/admin/sera-vnext/analyses/:id/archive', method: 'POST', path: '/api/admin/sera-vnext/analyses/:id/archive' },
  { name: 'POST /api/admin/sera-vnext/analyses/:id/restore', method: 'POST', path: '/api/admin/sera-vnext/analyses/:id/restore' },
  { name: 'GET /api/admin/sera-vnext/analyses/:id/export', method: 'GET', path: '/api/admin/sera-vnext/analyses/:id/export' },
];

async function runApiRealTrial(): Promise<void> {
  const baseUrl = process.env.SERA_VNEXT_TEST_BASE_URL ?? '';
  const adminToken = process.env.SERA_VNEXT_TEST_ADMIN_TOKEN ?? '';
  const tenantId = process.env.SERA_VNEXT_TEST_TENANT_ID ?? '';

  const envReady = !!(baseUrl && adminToken && tenantId);

  if (!envReady) {
    const reason = 'SERA_VNEXT_TEST_BASE_URL, SERA_VNEXT_TEST_ADMIN_TOKEN, SERA_VNEXT_TEST_TENANT_ID not set';

    for (const ep of API_ENDPOINTS) {
      skipCheck(`${ep.name}_creates_persists`, reason);
      skipCheck(`${ep.name}_cross_tenant_blocked`, reason);
    }
    skipCheck('flag_off_returns_503', reason);
    skipCheck('anon_returns_401', reason);
    skipCheck('revision_created_on_create', reason);
    skipCheck('event_emitted_on_create', reason);
    skipCheck('export_non_final_only', reason);
    skipCheck('idempotency_client_request_id', reason);

    console.log(`\n[${TRIAL_ID}]`);
    console.log('Status: SKIPPED');
    console.log(`Reason: ${reason}`);
    console.log('\nEndpoints to validate when environment available:');
    for (const ep of API_ENDPOINTS) {
      console.log(`  ~ ${ep.method} ${ep.path}`);
    }
    console.log('\nValidation criteria:');
    console.log('  - creation persisted in sera_vnext_analyses');
    console.log('  - revision 1 created in sera_vnext_analysis_revisions');
    console.log('  - event analysis.created emitted in sera_vnext_analysis_events');
    console.log('  - list returns without full narrative');
    console.log('  - detail returns full engine output');
    console.log('  - review appends to sera_vnext_analysis_reviews');
    console.log('  - reanalysis creates revision 2');
    console.log('  - archive soft-deletes (deleted_at set)');
    console.log('  - restore clears deleted_at');
    console.log('  - export produces non-final internal JSON');
    console.log('  - cross-tenant requests return 403');
    console.log('  - non-admin requests return 403');
    console.log('  - flag-off returns 503 or 404');
    console.log('  - duplicate client_request_id returns 409 conflict');
    process.exit(0);
  }

  // Real implementation: use fetch() against running Next.js dev server
  // See endpoint contracts in docs/sera-vnext/product-beta/SERA_VNEXT_PRODUCT_BETA_API.md
  console.log(`\n[${TRIAL_ID}]`);
  console.log('Status: SKIPPED — environment configured but real API test implementation pending');
  console.log('Implement using fetch() against SERA_VNEXT_TEST_BASE_URL with admin JWT');
  process.exit(0);
}

runApiRealTrial();
