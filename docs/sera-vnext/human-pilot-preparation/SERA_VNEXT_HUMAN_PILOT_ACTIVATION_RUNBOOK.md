# SERA vNext Human Pilot Activation Runbook

## 1. Verify commit

Confirm the repository is on `main`, HEAD equals `origin/main`, and the human pilot preparation commit is present.

## 2. Verify flags

Enable Product Beta flags only in the controlled internal environment:

```text
SERA_VNEXT_PRODUCT_BETA_ENABLED=true
NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED=true
```

Keep flags disabled outside controlled internal pilot use.

## 3. Verify DB and RLS

Confirm the staging or controlled tenant has Product Beta tables, RLS, and tenant isolation previously validated. Do not run migrations in this phase.

## 4. Verify users

Confirm at least 3 real authorized internal reviewers:

```text
REVIEWER-01
REVIEWER-02
REVIEWER-03
```

Optional reviewers:

```text
REVIEWER-04
REVIEWER-05
```

## 5. Verify cases

Use the case bank and assignment plan in this directory. Do not add sensitive data.

## 6. Seed or create manually

Run the seed script in dry-run first:

```bash
npx tsx scripts/sera-vnext/seed-human-reviewer-pilot.ts --dry-run --limit 3
```

For real creation, use only a future authorized staging adapter. The current script blocks write mode by default.

## 7. Start pilot

Reviewers create assigned analyses, submit reviews, export when requested, and fill the result template.

## 8. Monitor

Track created analyses, review submissions, exports, issues, and any tenant access problems.

## 9. Collect feedback

Collect reviewer comments, UX issues, method issues, and security issues in the result template.

## 10. Export results

Export candidate-only analysis records and keep the sanitized human result CSV for metric runners.

## 11. Disable flags

After the pilot, disable Product Beta flags unless another controlled session is explicitly authorized.

## 12. Rollback

Follow `SERA_VNEXT_HUMAN_PILOT_ROLLBACK_RUNBOOK.md` if access, review, export, security, or final-lock behavior fails.

