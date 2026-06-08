# SERA vNext Human Reviewer Pilot — Admin Runbook

## Purpose

Step-by-step operational guide for the HFA admin managing the human reviewer pilot.

## Pre-Pilot Checklist

- [ ] Dev server running at `http://127.0.0.1:3100` (or staging URL)
- [ ] `SERA_VNEXT_PRODUCT_BETA_ENABLED=true` in `.env.local`
- [ ] `NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED=true` in `.env.local`
- [ ] `allowedDevOrigins: ['127.0.0.1']` in `next.config.ts`
- [ ] Database migrations applied (`supabase db push` or staging is current)
- [ ] At least one enterprise tenant exists with `sera_vnext_beta` authorization

## Reviewer Onboarding (per new reviewer)

1. **Create a Supabase auth user** for the reviewer (via Supabase dashboard or admin CLI)
2. **Create an enterprise tenant** (if not already shared) with `plan = 'enterprise'`
3. **Insert a `users` row** with `role = 'admin'` and the correct `tenant_id`
4. **Send a magic link** via the Supabase auth admin panel for the reviewer's email
5. **Confirm access**: reviewer visits the analysis list page and sees the "SERA vNext análises persistidas" heading
6. **Assign cases**: send the reviewer their case matrix CSV with pre-filled titles and narratives

## During Pilot Execution

- Monitor the analysis list page for new analyses being created
- Check for API errors: `GET /api/admin/sera-vnext/analyses` should return 200
- If a reviewer reports a blank page, verify `allowedDevOrigins` includes their access origin
- If a reviewer is redirected to login unexpectedly, generate a new magic link

## Post-Pilot Data Collection

1. Log in as admin and export all pilot analyses:
   - Navigate to each analysis in the list
   - Click "Export JSON" for analyses that have completed reviews
   - Or use the API: `GET /api/admin/sera-vnext/analyses?page=1&pageSize=100`

2. Collect CSV result files from all reviewers

3. Run validation trials:
   ```bash
   npx tsx tests/sera-vnext/expanded-cohort-runner-trial-001.ts
   npx tsx tests/sera-vnext/expanded-cohort-metrics-trial-001.ts
   npx tsx tests/sera-vnext/expanded-cohort-security-trial-001.ts
   npx tsx tests/sera-vnext/expanded-cohort-integrity-trial-001.ts
   ```

4. Review results and determine if advancement criteria are met (see PILOT_PLAN.md)

## Stopping the Pilot

If the pilot must be stopped before completion, see ROLLBACK.md.

## Troubleshooting

| Symptom | Likely Cause | Fix |
| --- | --- | --- |
| `/admin/sera-vnext/analyses` shows blank content | React hydration blocked or `betaUiEnabled = false` | Check `allowedDevOrigins` in `next.config.ts` and both env vars in `.env.local`, restart server |
| API returns `{"detail":"Not found"}` with 404 | `SERA_VNEXT_PRODUCT_BETA_ENABLED` not set | Add to `.env.local`, restart server |
| Auth redirects to `/login?error=auth` | Session not established before callback | Wait 2-3 seconds after magic link opens, then retry navigation |
| Analysis creation returns 401 | Missing or expired auth token | Generate a new magic link or use a fresh browser session |
| Engine output takes > 30s | LLM provider slow or rate-limited | Wait and retry; if persistent, check AI provider credentials in `.env.local` |
