# Diagnostic Surface Contract A4R221-MAX

Page:
- `/admin/sera-vnext`
- `frontend/src/app/(dashboard)/admin/sera-vnext/page.tsx`

Protection:
- Reuses the existing admin shell under `frontend/src/app/(dashboard)/admin/layout.tsx`.
- The admin shell redirects non-admin users to `/dashboard` through the existing `useMe()` pattern.
- Navigation entry is visible only when `NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED=true`.

Displayed data:
- Runtime status.
- Baseline ID.
- Namespace.
- Fixture count.
- Expected output count.
- Positive/synthetic/control counts.
- Runtime locks.
- Methodological warnings.

Non-capabilities:
- No mutation button.
- No upload.
- No classification execution.
- No baseline editing.
- No product analysis flow integration.
