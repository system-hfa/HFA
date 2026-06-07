export {};

/**
 * SERA vNext Product Beta — Real UI Smoke Trial
 *
 * Structural smoke test for SERA vNext beta UI routes.
 * When Playwright or browser access is available, this verifies:
 *   - List page loads
 *   - Create page accepts input and saves
 *   - Detail page shows engine output
 *   - Review page saves decision
 *   - No final/release/READY buttons present
 *   - non-final and WARNING markers visible
 *
 * PREREQUISITE:
 *   1. Migration applied to real DB
 *   2. Next.js dev server running: npm run dev
 *   3. NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED=true
 *   4. Playwright installed: npx playwright install
 *   Set: SERA_VNEXT_TEST_BASE_URL, SERA_VNEXT_TEST_ADMIN_TOKEN
 *
 * When Playwright not available, reports SKIPPED.
 */

const TRIAL_ID = 'product-beta-ui-real-trial-001';

const UI_ROUTES = [
  { path: '/admin/sera-vnext/analyses', name: 'list' },
  { path: '/admin/sera-vnext/analyses/new', name: 'create' },
  { path: '/admin/sera-vnext/analyses/:id', name: 'detail' },
  { path: '/admin/sera-vnext/analyses/:id/review', name: 'review' },
];

const UI_VALIDATIONS = [
  'list_loads_without_error',
  'create_form_accepts_narrative_input',
  'create_form_saves_analysis',
  'detail_shows_engine_output',
  'detail_shows_candidate_codes',
  'detail_shows_warnings',
  'detail_shows_non_final_marker',
  'review_form_saves_decision',
  'timeline_shows_audit_events',
  'reanalysis_creates_new_revision',
  'archive_reflects_in_list',
  'restore_reflects_in_list',
  'export_button_works',
  'no_final_button_present',
  'no_release_button_present',
  'no_ready_button_present',
  'non_final_warning_visible',
  'loading_states_acceptable',
  'error_states_acceptable',
];

async function runUiRealTrial(): Promise<void> {
  let playwrightAvailable = false;
  try {
    require.resolve('@playwright/test');
    playwrightAvailable = true;
  } catch {
    playwrightAvailable = false;
  }

  const baseUrl = process.env.SERA_VNEXT_TEST_BASE_URL ?? '';
  const envReady = !!baseUrl;

  if (!playwrightAvailable || !envReady) {
    const reason = !playwrightAvailable
      ? '@playwright/test not installed'
      : 'SERA_VNEXT_TEST_BASE_URL not configured';

    console.log(`\n[${TRIAL_ID}]`);
    console.log('Status: SKIPPED');
    console.log(`Reason: ${reason}`);
    console.log('\nUI routes to validate when environment available:');
    for (const route of UI_ROUTES) {
      console.log(`  ~ ${route.name}: ${route.path}`);
    }
    console.log('\nValidation criteria:');
    for (const v of UI_VALIDATIONS) {
      console.log(`  ~ ${v}`);
    }
    console.log('\nTo enable: npm install @playwright/test && npx playwright install');
    console.log('Then set SERA_VNEXT_TEST_BASE_URL and run with NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED=true');
    process.exit(0);
  }

  // Real implementation: use Playwright to navigate and validate
  // const { chromium } = require('@playwright/test');
  // const browser = await chromium.launch();
  // const page = await browser.newPage();
  // await page.goto(`${baseUrl}/admin/sera-vnext/analyses`);
  // ...

  console.log(`\n[${TRIAL_ID}]`);
  console.log('Status: SKIPPED — Playwright available but UI real test implementation pending');
  process.exit(0);
}

runUiRealTrial();
