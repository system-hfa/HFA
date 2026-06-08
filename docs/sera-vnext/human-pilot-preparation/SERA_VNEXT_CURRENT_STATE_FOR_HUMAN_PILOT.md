# SERA vNext Current State for Human Pilot

Prepared date: 2026-06-08

## methodology_status

The SERA vNext causal methodology is frozen for the current Product Beta stage. This preparation package does not reopen the methodology, tree, engine logic, fixtures, baselines, expected outputs, or risk layer.

## engine_status

Engine v0.1 remains the current candidate-only engine baseline. The latest tracked validation report states:

```text
SERA_VNEXT_ENGINE_V01_VALIDATED
PRODUCT_BETA_FOUNDATION_ALLOWED
39/39 PASS
```

## product_beta_status

Product Beta is technically ready for controlled internal analyses. Outputs remain candidate-only, non-final, and locked against final classification or downstream operational use.

## db_rls_status

DB and RLS have prior real-environment validation for the controlled Product Beta path. This phase does not alter database schema, migrations, RLS, or tenant contracts.

## api_ui_status

API and UI have prior real validation for controlled internal admin use. This phase does not modify API routes or production UI behavior.

## reviewer_output_status

`reviewerOutput` is implemented as a derived reviewer utility layer and is included in analysis detail and export responses. It remains non-final and does not release any SERA code.

## expanded_cohort_status

The expanded cohort is blocked by reviewer availability, not by a technical Product Beta blocker.

```text
SERA_VNEXT_EXPANDED_COHORT_BLOCKED_SINGLE_REVIEWER
```

## current_blocker

The current blocker is the absence of 3+ real authorized human reviewers. The pilot has not been executed by the required reviewer cohort.

## what_is_ready

- Frontend ready for controlled analyses.
- Product Beta technically ready.
- DB, RLS, API, UI, audit, export, and reviewer utility have prior controlled validation.
- Case bank, assignment slots, shared-case plan, onboarding material, templates, metrics runners, and runbooks are prepared by this phase.

## what_is_not_ready

- Human reviewer pilot has not been executed.
- Expanded cohort PASS cannot be declared.
- No final classification, operational recommendation, public beta, common-user rollout, or downstream output is authorized.

