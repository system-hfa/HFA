# HFA Analyze Error Sanitization

/api/analyze now returns a stable public envelope:

```json
{ "error": { "code": "ANALYZE_INTERNAL_ERROR", "message": "Nao foi possivel concluir a analise.", "requestId": "..." } }
```

Stable codes:
- ANALYZE_INVALID_INPUT
- ANALYZE_UNAUTHORIZED
- ANALYZE_FORBIDDEN
- ANALYZE_ENGINE_UNAVAILABLE
- ANALYZE_PERSISTENCE_ERROR
- ANALYZE_INTERNAL_ERROR

Raw String(e), String(err), error.message, stack, SQL/table/constraint details, and auth Response bodies are not returned by this route. Internal logs keep requestId plus sanitized event/context and error type only.

Verification: tests/sera-vnext/product-unification/error-sanitization-trial-001.ts reports 25 PASS, 0 FAIL after cleanup.
