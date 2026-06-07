# SERA vNext Product Beta Rollback

Fast rollback:

- Set `SERA_VNEXT_PRODUCT_BETA_ENABLED=false`.
- Set `NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED=false`.
- Keep data intact for audit unless retention policy authorizes purge.

Database rollback for non-production environments:

- Stop beta traffic.
- Export internal audit metadata if required.
- Drop beta tables in dependency order only in test/local/staging environments.
- Do not roll back methodology, engine v0.1, fixtures, or baseline artifacts.

Production migration was not applied by this phase.
