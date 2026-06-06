# Feature Flag Contract A4R221-MAX

Server-side flag:
- `SERA_VNEXT_READONLY_ENABLED`
- Default: false when unset.
- Enables the read-only runtime status service and admin endpoint path.
- Must not use `NEXT_PUBLIC_` because it gates server-side behavior.

Optional diagnostics UI flag:
- `NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED`
- Default: false when unset.
- Controls the internal admin navigation entry and page rendering path.
- Does not grant authorization by itself.

Local activation example:

```bash
SERA_VNEXT_READONLY_ENABLED=true
NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED=true
```

Versioned environment example updated:
- `frontend/.env.example`

No real `.env` secrets were edited.
