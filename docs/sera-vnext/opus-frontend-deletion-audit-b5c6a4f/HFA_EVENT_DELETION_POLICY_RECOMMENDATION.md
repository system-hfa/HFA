# HFA/SERA — Event Deletion Policy Recommendation

## 1. Formal definition of the five actions (must remain distinct)

| Action | Keeps event? | Keeps analysis? | In main list? | In Risk Profile aggregates? | Reversible | Confirmation |
|---|---|---|---|---|---|---|
| **Arquivar** | yes | yes | no (moved to "Arquivados") | no | yes (restore) | single confirm |
| **Desconsiderar do Perfil** | yes | yes | yes | no | yes (restore) | single confirm + optional reason |
| **Soft delete** | hidden | hidden | no | no | yes, within window | confirm + reason |
| **Hard delete** | purged | purged | no | no | **no** | reinforced (type title + reason) |
| **Restaurar** | — | — | — | — | reverses archive/soft-delete | single confirm |

These map to **different state**, not different copy:
- Arquivar/Restaurar → `archived_at` (new column for legacy; already exists conceptually in vNext via `deleted_at`+status, which should be split).
- Desconsiderar → `risk_profile_exclusions` (already correct).
- Soft delete → `deleted_at` + `deletion_reason` + `deletion_actor` + `recoverable_until`.
- Hard delete → physical purge after the window, leaving an immutable tombstone.

## 2. Recommended contract for "Excluir definitivamente"

Adopt the staged model from the brief (do **not** ship immediate hard delete):

1. User (authorized role) requests deletion.
2. System computes and shows **impact** (see API contract `GET .../deletion-impact`).
3. **Reinforced confirmation**: user types the event title.
4. **Reason required** (free text, categorized).
5. **Soft delete immediately** (`deleted_at=now()`, hidden everywhere, dropped from aggregates).
6. **Recovery window: 30 days** (see §4).
7. **Hard delete asynchronously** after the window (scheduled job / service-role function).
8. **Immutable audit trail** of every transition.
9. Personal/narrative data removed at hard-delete; **minimal technical tombstone preserved**.

## 3. Per-data decisions

| Data | Decision | Why |
|---|---|---|
| `events.raw_input`, `analyses` narrative columns | **DELETE** at hard delete | operational/PII narrative |
| storage object (`source_file_url`) | **DELETE + revoke signed URLs** | uploaded source doc (PII) |
| `audit_log` rows | **PRESERVE** (already narrative-free per migration comment) | regulatory traceability; never stored PII |
| `credit_transactions` | **PRESERVE** (`event_id`→NULL) | financial integrity; never delete billing |
| `risk_profile_exclusions` (matching) | **DELETE/tombstone** | avoid orphan rows (F-004) |
| `corrective_actions` | **DETACH or ARCHIVE, do not silently delete** | safety actions may have independent value (see corrective-action report) |
| Risk profile aggregates | **RECOMPUTE on read** (no cache) | derived; automatic |
| Exports/PDFs | regenerated on demand; no stored export table today | nothing to purge beyond storage object |

## 4. Recovery period

- **Recommendation: 30 days.** Aviation safety records and LGPD practice favor a generous, auditable window over irreversible immediacy. 7 days is the minimum acceptable; 30 is recommended for a safety-of-flight dataset.
- During the window: event is invisible to all normal queries, excluded from every metric, but restorable by an admin from a "Lixeira / Recuperação" view.

## 5. vNext-specific constraint (must be resolved before any vNext hard delete)

`sera_vnext_analysis_revisions` and `sera_vnext_analysis_events` have **BEFORE DELETE triggers that raise**. A cascade purge of a `sera_vnext_analyses` row will abort. Options:
- (a) Keep vNext **soft-delete only** (archive); never hard-delete — acceptable if no legal erasure obligation applies to internal Beta candidate data.
- (b) Add a dedicated **service-role purge function** that temporarily disables / bypasses the append-only triggers within a controlled transaction, writes a tombstone, then purges. This is the only way to honour an LGPD erasure request for vNext data.

Decision required from product/legal. Until then, vNext hard delete = **BLOCKED_BY_DATA_MODEL**.

## 6. Is permanent deletion compatible with legal/operational/audit requirements?
- **Operational:** yes, with a soft-delete window so accidental deletions are recoverable.
- **Audit:** yes, **only if** an immutable, narrative-free deletion tombstone is written and `audit_log`/`credit_transactions` are preserved.
- **Legal (LGPD erasure):** yes for the legacy world; for vNext it requires the trigger-bypass purge (§5b). Preserve the minimal tombstone (no PII) to evidence that erasure occurred.

## 7. Recommended default exposed to the user
Expose **"Excluir evento e dados relacionados"** that performs **soft delete + 30-day recovery**, with hard delete happening automatically afterwards. Do **not** expose an immediate, irreversible hard-delete button.
