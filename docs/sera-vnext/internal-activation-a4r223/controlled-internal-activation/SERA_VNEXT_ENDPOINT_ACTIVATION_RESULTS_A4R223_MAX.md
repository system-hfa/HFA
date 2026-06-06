# Endpoint Activation Results A4R223-MAX

Endpoint: `GET /api/admin/sera-vnext/status`

Authorized equivalent result: HTTP 200 with:
- `baselineId`: `SERA_VNEXT_BASELINE_V0`
- `namespace`: `sera-vnext`
- fixture counts: 7 total, 7 expected outputs, 3 positive, 1 synthetic, 3 control
- `classificationEnabled=false`
- `productIntegrated=false`
- `downstreamAllowed=false`
- Asiana, UPS, synthetic-only, and control-only warnings preserved

Real local results:
- no token: 401 `Não autorizado`;
- invalid token: 401 `Não autorizado`.

The payload exposed no event narratives, evidence bodies, P/O/A, final codes, tokens, cookies, authorization headers, personal data, or stack traces.
