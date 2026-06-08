# SERA vNext Human Reviewer — Instructions

## Who This Is For

Internal enterprise reviewers authorized for `sera_vnext_beta`. Complete this guide before executing any pilot cases.

## Prerequisites

1. You have an enterprise-plan account in the HFA system
2. Your account has been authorized for `sera_vnext_beta` by the admin
3. You are not a common user or external participant

## Step 1: Access the System

1. Open the HFA admin panel at the URL provided by the admin
2. Log in with your credentials
3. Navigate to **Admin → Sera-vnext → Analyses** (sidebar)
4. Confirm you see the "SERA vNext análises persistidas" heading and a "Nova análise" button
5. If you see "Product Beta disabled" or are redirected to login, contact the admin before proceeding

## Step 2: Create a Case

1. Click **Nova análise** (or navigate to `/admin/sera-vnext/analyses/new`)
2. Fill in the form:
   - **Título**: Use the case title from your case matrix, e.g., `[SERA_VNEXT_PILOT] clear escape — ILS deviation PF late call`
   - **Referência da fonte (opcional)**: Your reviewer ID + case number, e.g., `REVIEWER-02-CASE-001`
   - **Narrativa**: Paste the factual narrative text. Must be factual, controlled, and without confidential data
   - **Check the confirmation box**: Required before submission
3. Click **Criar análise candidate-only**
4. The system will run the engine (v0.1) and save the output. Wait for the detail page to load (typically 2-5 seconds)

## Step 3: Review the Analysis Detail

The detail page shows:

- **Ponto de fuga candidato**: The engine's proposed escape point
- **Percepção (P) / Objetivo (O) / Ação (A)**: SERA P-O-A decomposition of the escape point
- **Precondições**: Contextual factors enabling the escape
- **Incertezas**: What is uncertain or requires more evidence
- **Avisos de qualidade**: Data quality warnings
- **Guia de decisão humana**: Your specific review question and the engine's suggestion
- **Confiança**: Engine confidence score for the escape point

Read all sections before submitting a review. Pay particular attention to:
- Whether the escape point is factually grounded in the narrative
- Whether preconditions are plausible
- Whether uncertainties are accurately identified

## Step 4: Submit Your Review

1. Click the **Revisar** button
2. The review form shows:
   - **Decisão** (dropdown): `WORKING_HYPOTHESIS_ACCEPTED` / `RETURN_FOR_REANALYSIS` / `REQUIRES_MORE_EVIDENCE`
   - **Qualidade da evidência**: `SUFFICIENT` / `PARTIAL` / `INSUFFICIENT`
   - **Notas de revisão**: Justify your decision (required)
   - **Confirmação**: Check the box before submitting
3. Click **Registrar revisão não final**
4. You will see the updated status (e.g., `RETURNED_FOR_REANALYSIS` or `HUMAN_REVIEW_COMPLETED_NON_FINAL`)

## Step 5: Record Results

For each case, fill in your **RESULT_TEMPLATE.csv** row:
- `analysis_id`: The UUID from the URL (`/admin/sera-vnext/analyses/<UUID>`)
- `review_decision`: One of `WORKING_HYPOTHESIS_ACCEPTED`, `RETURN_FOR_REANALYSIS`, `REQUIRES_MORE_EVIDENCE`
- `escape_point_useful`: `true` if the engine's escape point was useful to your review, `false` otherwise
- `poa_useful`: `true` if the P/O/A decomposition was useful, `false` otherwise
- `preconditions_useful`: `true` if preconditions were factually grounded, `false` otherwise
- `uncertainty_clear`: `true` if uncertainty flags were accurate and helpful, `false` otherwise
- `warnings_clear`: `true` if quality warnings were appropriate, `false` otherwise
- `review_notes`: Brief justification (1-2 sentences)
- `review_time_minutes`: Estimated minutes spent on this case

## Step 6: Export (Optional)

Click **Export JSON** on any analysis to download the full analysis record. Keep exports in your local folder for the admin to collect.

## What NOT to Do

- Do not submit cases with confidential, personal, or identifying information
- Do not attempt to reach final classification — all outputs are candidate-only and non-final
- Do not use common-user accounts
- Do not share analysis IDs or export files externally
- Do not skip the review form — use the UI, not the API directly

## Contact

If you encounter a system error, a page that does not load, or unexpected behavior, contact the admin immediately and do not proceed with that case.
