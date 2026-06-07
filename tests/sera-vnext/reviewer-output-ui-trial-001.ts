import assert from 'node:assert/strict'
import {
  apiJson,
  buildBaseUrl,
  createMagicLinkBrowserSession,
  createMagicLinkSession,
  pwConsoleWarnings,
  pwExec,
  pwWaitForText,
  sanitizeId,
  sleep,
  waitForServer,
  writeJsonReport,
} from './product-beta-real-helpers'

const TRIAL_ID = 'reviewer-output-ui-trial-001'
const ENTERPRISE_TENANT_PREFIX = process.env.SERA_VNEXT_TEST_TENANT_PREFIX?.trim() || '3a68c15d'
const SESSION_ID = 'roui1'

type UiCheck = { name: string; status: 'PASS' | 'FAIL' | 'SKIPPED'; detail: string }

async function main() {
  const baseUrl = buildBaseUrl()
  await waitForServer(baseUrl)

  const enterprise = await createMagicLinkSession({
    baseUrl,
    participantId: 'PILOT-ADMIN-01',
    tenantPrefix: ENTERPRISE_TENANT_PREFIX,
    requirePlan: 'enterprise',
  })

  // Create analysis via API
  const createRes = await apiJson(baseUrl, enterprise.accessToken, '/api/admin/sera-vnext/analyses', 'POST', {
    title: `[SERA_VNEXT_REVIEWER_UTILITY_RERUN] UI trial — ${TRIAL_ID}`,
    narrative: 'Durante a aproximação ILS o copiloto não monitorou a altitude após o FAF, resultando em desvio de perfil que só foi corrigido após o ativamento do GPWS. O comandante demorou 8 segundos para assumir os controles após o alarme.',
    sourceType: 'INTERNAL_PILOT',
    clientRequestId: `${TRIAL_ID}-create`,
  })

  const analysisId = (createRes.body as Record<string, Record<string, unknown>>)?.analysis?.id as string | null

  const checks: UiCheck[] = []

  if (!analysisId) {
    checks.push({ name: 'analysis_created', status: 'FAIL', detail: `HTTP ${createRes.status}` })
    writeJsonReport(TRIAL_ID, { checks, status: 'BLOCKED_BY_CREATE_FAILURE' })
    process.exit(1)
  }
  checks.push({ name: 'analysis_created', status: 'PASS', detail: sanitizeId(analysisId) })

  // Open browser session
  await createMagicLinkBrowserSession({
    baseUrl,
    participantId: 'PILOT-ADMIN-01',
    tenantPrefix: ENTERPRISE_TENANT_PREFIX,
    sessionId: SESSION_ID,
    requirePlan: 'enterprise',
  })

  // Navigate to detail page
  pwExec(SESSION_ID, ['goto', `${baseUrl}/admin/sera-vnext/analyses/${analysisId}`])
  try {
    await pwWaitForText(SESSION_ID, 'Ponto de fuga candidato', 20_000)
    checks.push({ name: 'detail_page_section2_escape_point', status: 'PASS', detail: 'Section 2 visible' })
  } catch {
    checks.push({ name: 'detail_page_section2_escape_point', status: 'FAIL', detail: 'Section 2 not visible' })
  }

  try {
    await pwWaitForText(SESSION_ID, 'Percepção (P)', 5_000)
    checks.push({ name: 'detail_page_section3_perception', status: 'PASS', detail: 'Section 3 visible' })
  } catch {
    checks.push({ name: 'detail_page_section3_perception', status: 'FAIL', detail: 'Section 3 not visible' })
  }

  try {
    await pwWaitForText(SESSION_ID, 'Objetivo (O)', 5_000)
    checks.push({ name: 'detail_page_section4_objective', status: 'PASS', detail: 'Section 4 visible' })
  } catch {
    checks.push({ name: 'detail_page_section4_objective', status: 'FAIL', detail: 'Section 4 not visible' })
  }

  try {
    await pwWaitForText(SESSION_ID, 'Ação (A)', 5_000)
    checks.push({ name: 'detail_page_section5_action', status: 'PASS', detail: 'Section 5 visible' })
  } catch {
    checks.push({ name: 'detail_page_section5_action', status: 'FAIL', detail: 'Section 5 not visible' })
  }

  try {
    await pwWaitForText(SESSION_ID, 'Precondições', 5_000)
    checks.push({ name: 'detail_page_section6_preconditions', status: 'PASS', detail: 'Section 6 visible' })
  } catch {
    checks.push({ name: 'detail_page_section6_preconditions', status: 'FAIL', detail: 'Section 6 not visible' })
  }

  try {
    await pwWaitForText(SESSION_ID, 'Incertezas', 5_000)
    checks.push({ name: 'detail_page_section7_uncertainties', status: 'PASS', detail: 'Section 7 visible' })
  } catch {
    checks.push({ name: 'detail_page_section7_uncertainties', status: 'FAIL', detail: 'Section 7 not visible' })
  }

  try {
    await pwWaitForText(SESSION_ID, 'Guia de decisão humana', 5_000)
    checks.push({ name: 'detail_page_section8_decision_guide', status: 'PASS', detail: 'Section 8 visible' })
  } catch {
    checks.push({ name: 'detail_page_section8_decision_guide', status: 'FAIL', detail: 'Section 8 not visible' })
  }

  try {
    await pwWaitForText(SESSION_ID, 'Pergunta para o revisor', 5_000)
    checks.push({ name: 'detail_page_reviewer_question_visible', status: 'PASS', detail: 'Reviewer question visible' })
  } catch {
    checks.push({ name: 'detail_page_reviewer_question_visible', status: 'FAIL', detail: 'Reviewer question not visible' })
  }

  try {
    await pwWaitForText(SESSION_ID, 'Por que este código foi sugerido', 5_000)
    checks.push({ name: 'detail_page_why_suggested_visible', status: 'PASS', detail: '"Why suggested" visible' })
  } catch {
    checks.push({ name: 'detail_page_why_suggested_visible', status: 'FAIL', detail: '"Why suggested" not visible' })
  }

  try {
    await pwWaitForText(SESSION_ID, 'O revisor precisa decidir', 5_000)
    checks.push({ name: 'detail_page_reviewer_must_decide_visible', status: 'PASS', detail: '"Reviewer must decide" visible' })
  } catch {
    checks.push({ name: 'detail_page_reviewer_must_decide_visible', status: 'FAIL', detail: '"Reviewer must decide" not visible' })
  }

  // Non-final locks must be visible and not show final outputs
  try {
    await pwWaitForText(SESSION_ID, 'candidate-only não final', 5_000)
    checks.push({ name: 'detail_page_non_final_notice_visible', status: 'PASS', detail: 'Non-final notice visible' })
  } catch {
    checks.push({ name: 'detail_page_non_final_notice_visible', status: 'FAIL', detail: 'Non-final notice not visible' })
  }

  // Navigate to review page — check it loads analysis
  pwExec(SESSION_ID, ['goto', `${baseUrl}/admin/sera-vnext/analyses/${analysisId}/review`])
  try {
    await pwWaitForText(SESSION_ID, 'Checklist de decisão', 20_000)
    checks.push({ name: 'review_page_checklist_visible', status: 'PASS', detail: 'Review checklist visible' })
  } catch {
    checks.push({ name: 'review_page_checklist_visible', status: 'FAIL', detail: 'Review checklist not visible' })
  }

  try {
    await pwWaitForText(SESSION_ID, 'Ponto de fuga candidato', 10_000)
    checks.push({ name: 'review_page_escape_point_visible', status: 'PASS', detail: 'Escape point visible on review page' })
  } catch {
    checks.push({ name: 'review_page_escape_point_visible', status: 'FAIL', detail: 'Escape point not visible on review page' })
  }

  try {
    await pwWaitForText(SESSION_ID, 'Sugestão do motor', 5_000)
    checks.push({ name: 'review_page_motor_suggestion_visible', status: 'PASS', detail: 'Motor suggestion visible' })
  } catch {
    checks.push({ name: 'review_page_motor_suggestion_visible', status: 'FAIL', detail: 'Motor suggestion not visible' })
  }

  // Axis cards on review page
  try {
    await pwWaitForText(SESSION_ID, 'Evidência de suporte', 5_000)
    checks.push({ name: 'review_page_evidence_visible', status: 'PASS', detail: 'Evidence visible on review page' })
  } catch {
    checks.push({ name: 'review_page_evidence_visible', status: 'FAIL', detail: 'Evidence not visible on review page' })
  }

  // Form elements must exist
  try {
    await pwWaitForText(SESSION_ID, 'Registrar decisão', 5_000)
    checks.push({ name: 'review_page_form_visible', status: 'PASS', detail: 'Review form visible' })
  } catch {
    checks.push({ name: 'review_page_form_visible', status: 'FAIL', detail: 'Review form not visible' })
  }

  // Font preload — check no console errors
  await sleep(1000)
  const consoleWarnings = pwConsoleWarnings(SESSION_ID)
  const hasFontPreloadError = /preload.*font|font.*preload/i.test(consoleWarnings)
  checks.push({
    name: 'no_font_preload_warning',
    status: hasFontPreloadError ? 'FAIL' : 'PASS',
    detail: hasFontPreloadError ? `Font preload warning detected: ${consoleWarnings.slice(0, 200)}` : 'No font preload warning',
  })

  const pass = checks.filter((c) => c.status === 'PASS').length
  const fail = checks.filter((c) => c.status === 'FAIL').length

  const result = {
    trial: TRIAL_ID,
    analysisIdSanitized: sanitizeId(analysisId),
    pass,
    fail,
    status: fail === 0 ? 'REVIEWER_OUTPUT_UI_PASS' : 'REVIEWER_OUTPUT_UI_FAIL',
    consoleWarnings: consoleWarnings.slice(0, 500),
    checks,
  }

  writeJsonReport(TRIAL_ID, result)
  console.log(JSON.stringify(result, null, 2))

  if (fail > 0) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
