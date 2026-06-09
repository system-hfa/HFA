# HFA/SERA — Storage & Attachment Deletion Audit

## What storage exists
- Single private bucket: **`analysis-documents`** (created in `20260508100000_sera_document_sources.sql`), `public=false`, 10 MB limit, MIME = PDF + DOCX.
- Object path convention: **`{auth.uid}/...`** — RLS on `storage.objects` keys access to the **uploader's `auth.uid`**, not to `tenant_id`:
  - `analysis_documents_select_own` / `insert_own` / `delete_own` all check `(storage.foldername(name))[1] = auth.uid()::text`.
- The stored path is saved on **`analyses.source_file_url`** (legacy only). vNext stores the narrative in the DB row — **no storage objects**.
- `sera_document_uploads` table is just an extraction rate-limit counter (cascades on `auth.users` delete); holds no documents.

## Deletion behaviour today
- `DELETE /api/events/:id` calls `deleteAnalysisStorageObject(admin, source_file_url)` → `admin.storage.from('analysis-documents').remove([path])` using the **service role** (bypasses the per-user RLS, so it works regardless of who deletes).
- Done **before** the row delete, with **no existence check and no error handling on the storage result** — a failed object removal does not stop the row deletion (silent orphan risk, F-015).

## Findings
| id | issue | impact |
|---|---|---|
| S-1 | Storage RLS keyed to `auth.uid`, not `tenant_id` | a document path embeds the uploader's user id; tenant-level access relies on the server using service role. Cross-tenant direct access is blocked, but path scheme is user-centric not tenant-centric. |
| S-2 | Storage removal not transactional with row delete (F-015) | object can survive the row (orphan PII) or row survive object |
| S-3 | No reconciliation job | no detection of row-without-object or object-without-row |
| S-4 | Only `source_file_url` is cleaned | any future artifact (exports, evidence) would be missed |
| S-5 | Signed URLs not explicitly revoked | a previously issued signed URL could outlive deletion until expiry |

## Recommended safe deletion order
```
1. mark deleting        (events.deleted_at; status hidden)
2. revoke access        (invalidate/expire any signed URLs; rely on private bucket)
3. delete storage       (remove([path]); verify result; record failures)
4. delete dependent rows(corrective_actions, analysis_edits)
5. delete analysis      (analyses)
6. delete event         (events)
7. write audit tombstone(event.hard_deleted + data_categories_deleted incl. "storage_object")
```
- Wrap DB row deletes in a single transaction; treat storage removal as a verified step with retry + audit on failure (don't fail-open).
- Add a periodic **reconciliation** that lists bucket objects whose owning `analyses.source_file_url` no longer exists and purges them, and flags rows whose object is missing.

## STORAGE_DELETE_READINESS: NOT_READY
Storage cleanup exists but is best-effort, non-transactional, single-artifact, and lacks reconciliation and signed-URL revocation. It must be hardened before permanent deletion is offered to users.
