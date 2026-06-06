# Authenticated Smoke A4R223-MAX

Results:
- Real local HTTP, no token: 401.
- Real local HTTP, invalid token: 401.
- Real browser, no session: `/admin/sera-vnext` redirected to `/login`; no diagnostic data displayed.
- Safe equivalent non-admin and wrong-tenant contexts: 403.
- Safe equivalent enterprise admin context: 200.
- Query parameters and untrusted role/tenant headers did not change authorization results.
- Authorized payload was sanitized and deterministic.

Limitation:
- No reusable real administrator password, token, or Playwright storage state was present. The authorized 200 and populated panel data contract were therefore exercised through the existing dependency-injected handler rather than a live Supabase administrator session.
