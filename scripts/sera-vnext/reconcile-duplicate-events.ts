const { createClient } = require('@supabase/supabase-js');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

// ── Env ──────────────────────────────────────────────────────────
const envPath = path.join(__dirname, '../../frontend/.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^([^#=][^=]*)=(.*)$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
  }
}
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.error('Missing env vars'); process.exit(1); }
const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

function sha256(s) { return crypto.createHash('sha256').update(s).digest('hex').slice(0, 12); }
function normalizeTitle(t) { return (t||'').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim(); }
function hashNarrative(n) { const norm = (n||'').trim().toLowerCase().replace(/\s+/g,' '); return norm ? sha256(norm) : null; }
function fmtId(id) { return (id||'').slice(0,8); }

const outDir = path.join(__dirname, '../../tmp/hfa-duplicate-event-reconciliation');
fs.mkdirSync(outDir, { recursive: true });
const RECOVERY_DAYS = 30;

async function main() {
  const mode = process.argv.includes('--execute') ? 'execute' : 'dry-run';
  console.error(`=== DUPLICATE RECONCILIATION + ERROR CLEANUP [${mode.toUpperCase()}] ===\n`);

  // 1. Fetch all non-purged events
  const { data: events, error } = await admin.from('events').select('*').not('deletion_status','eq','PURGED').order('created_at');
  if (error) { console.error('Fetch error:', error); process.exit(1); }
  console.error(`Non-purged events: ${events.length}`);
  console.error(`Active: ${events.filter(e=>!e.deleted_at).length}, Soft-deleted: ${events.filter(e=>!!e.deleted_at).length}`);

  // 2. Fetch related data
  const eventIds = events.map(e=>e.id);
  const { data: analyses } = await admin.from('analyses').select('id,event_id,status').in('event_id',eventIds);
  const { data: vnextAnalyses } = await admin.from('sera_vnext_analyses').select('id,source_reference,status').in('source_reference',eventIds);

  // 3. Score function for canonical selection
  function scoreEvent(e) {
    let s = 0;
    if (e.status === 'completed') s += 10;
    if (e.status === 'failed') s -= 5;
    if (e.status === 'received') s -= 3;
    if (!e.deleted_at) s += 5;
    const rawLen = (e.raw_input||'').length;
    if (rawLen > 500) s += 3;
    if (rawLen > 5000) s += 5;
    if (e.vnext_ids?.length > 0) s += 10;
    if (e.legacy_id) s += 5;
    return s;
  }

  // 4. Enrich events
  const enriched = events.map(e => {
    const leg = (analyses||[]).find(a=>a.event_id===e.id);
    const vn = (vnextAnalyses||[]).filter(a=>a.source_reference===e.id);
    return {
      ...e,
      normalized_title: normalizeTitle(e.title),
      narrative_hash: hashNarrative(e.raw_input||''),
      narrative_size: (e.raw_input||'').length,
      legacy_id: leg?.id||null,
      legacy_status: leg?.status||null,
      vnext_ids: vn.map(a=>a.id),
    };
  });

  // 5. Group by normalized_title + tenant
  const groups = [];
  const seen = new Set();

  for (let i = 0; i < enriched.length; i++) {
    if (seen.has(enriched[i].id)) continue;
    const group = [enriched[i]];
    for (let j = i + 1; j < enriched.length; j++) {
      if (seen.has(enriched[j].id)) continue;
      const a = enriched[i], b = enriched[j];
      if (a.tenant_id !== b.tenant_id) continue;
      if (a.normalized_title === b.normalized_title && a.normalized_title.length > 0) {
        group.push(b);
      }
    }
    if (group.length > 1) {
      group.forEach(e => seen.add(e.id));
      groups.push(group);
    }
  }

  // Also collect standalone failed events
  const groupedIds = new Set(groups.flat().map(e=>e.id));
  const standaloneFailed = enriched.filter(e => !groupedIds.has(e.id) && e.status === 'failed' && !e.deleted_at);

  console.error(`\nDuplicate groups: ${groups.length}`);
  console.error(`Standalone failed events: ${standaloneFailed.length}`);

  // 6. Process each group
  const toDelete = [];
  const toKeep = [];
  const groupDetails = [];

  for (const group of groups) {
    const scored = group.map(e => ({...e, _score: scoreEvent(e)}));
    scored.sort((a,b) => b._score - a._score);
    const canonical = scored[0];
    const duplicates = scored.slice(1);

    const toSoftDelete = duplicates.filter(e => !e.deleted_at);

    const level = canonical.narrative_hash && duplicates.every(d => d.narrative_hash === canonical.narrative_hash) ? 'A' : 'B';

    groupDetails.push({
      group_id: 'GRP-'+sha256(group.map(e=>e.id).sort().join('')),
      tenant_id: canonical.tenant_id,
      duplicate_level: level,
      total: group.length,
      canonical_id: canonical.id,
      canonical_title: canonical.title,
      canonical_status: canonical.status,
      duplicate_ids: toSoftDelete.map(e=>e.id),
      duplicate_titles: toSoftDelete.map(e=>e.title),
      duplicate_statuses: toSoftDelete.map(e=>e.status),
    });

    toKeep.push(canonical.id);
    toSoftDelete.forEach(e => toDelete.push({...e, reason: 'DUPLICATE_EVENT_RECONCILIATION', group_canonical: canonical.id}));
  }

  for (const e of standaloneFailed) {
    toDelete.push({...e, reason: 'FAILED_EVENT_CLEANUP', group_canonical: null});
  }

  console.error(`\n=== PLAN ===`);
  console.error(`Events to keep (canonical): ${toKeep.length}`);
  console.error(`Events to soft-delete (duplicates): ${toDelete.filter(e=>e.reason==='DUPLICATE_EVENT_RECONCILIATION').length}`);
  console.error(`Events to soft-delete (failed): ${toDelete.filter(e=>e.reason==='FAILED_EVENT_CLEANUP').length}`);
  console.error(`Total to soft-delete: ${toDelete.length}`);

  for (const g of groupDetails) {
    console.error(`\n[${g.duplicate_level}] ${g.canonical_title} (keep ${fmtId(g.canonical_id)} status=${g.canonical_status})`);
    console.error(`  Delete ${g.duplicate_ids.length}: ${g.duplicate_titles.map((t,i)=>t+' ('+g.duplicate_statuses[i]+')').join(', ')}`);
  }
  if (standaloneFailed.length > 0) {
    console.error(`\n[FAILED] Standalone failed events to delete:`);
    standaloneFailed.forEach(e => console.error(`  ${fmtId(e.id)} ${e.title} status=${e.status}`));
  }

  // 7. Execute
  if (mode === 'execute') {
    console.error(`\n=== EXECUTING SOFT-DELETES (service_role direct) ===`);
    const results = [];
    let success = 0, fail = 0;
    const now = new Date().toISOString();
    const recoverableUntil = new Date(Date.now() + RECOVERY_DAYS * 86400000).toISOString();

    for (const e of toDelete) {
      const reason = e.reason;
      const requestId = `recon-${reason.replace(/_/g,'-')}-${e.id.slice(0,8)}-${Date.now()}`;
      try {
        // Direct soft-delete via service_role (same semantics as RPC but bypasses admin check)
        const { error: updErr } = await admin
          .from('events')
          .update({
            deleted_at: now,
            deletion_status: 'SOFT_DELETED',
            deletion_reason: reason,
            deleted_by: null, // system action, no specific user
            recoverable_until: recoverableUntil,
          })
          .eq('id', e.id)
          .eq('tenant_id', e.tenant_id)
          .is('deleted_at', null); // only if not already deleted

        if (updErr) {
          console.error(`  ✗ ${fmtId(e.id)} ${e.title}: ${updErr.message}`);
          results.push({event_id: e.id, title: e.title, success: false, error: updErr.message});
          fail++;
        } else {
          // Write lifecycle event
          await admin.from('event_deletion_events').insert({
            tenant_id: e.tenant_id,
            event_id: e.id,
            event_status: 'SOFT_DELETED',
            actor_id: null,
            request_id: requestId,
            metadata: { reason, source: 'duplicate_reconciliation_script', canonical_event_id: e.group_canonical },
          });

          console.error(`  ✓ ${fmtId(e.id)} ${e.title} [${reason}] recoverable_until=${recoverableUntil.slice(0,10)}`);
          results.push({event_id: e.id, title: e.title, success: true, recoverable_until: recoverableUntil});
          success++;
        }
      } catch(err) {
        console.error(`  ✗ ${fmtId(e.id)} ${e.title}: ${err.message}`);
        results.push({event_id: e.id, title: e.title, success: false, error: err.message});
        fail++;
      }
    }

    fs.writeFileSync(path.join(outDir, 'execution-results.json'), JSON.stringify({results, success, fail, timestamp: now}, null, 2));
    console.error(`\n=== DONE: ${success} deleted, ${fail} failed ===`);
    return { groups: groupDetails, standaloneFailed: standaloneFailed.length, toDelete: toDelete.length, success, fail };
  }

  // Save dry-run
  fs.writeFileSync(path.join(outDir, 'dry-run.json'), JSON.stringify({groups: groupDetails, standaloneFailed: standaloneFailed.map(e=>({id:e.id,title:e.title,status:e.status})), toDelete: toDelete.length, toKeep: toKeep.length}, null, 2));

  const csvRows = ['group_id,level,total,canonical_id,canonical_title,canonical_status,delete_count,delete_ids,delete_titles'];
  for (const g of groupDetails) {
    csvRows.push([g.group_id,g.duplicate_level,g.total,g.canonical_id,`"${g.canonical_title.replace(/"/g,'""')}"`,g.canonical_status,g.duplicate_ids.length,g.duplicate_ids.join('|'),`"${g.duplicate_titles.join('|').replace(/"/g,'""')}"`].join(','));
  }
  fs.writeFileSync(path.join(outDir, 'dry-run.csv'), csvRows.join('\n'));

  const docsDir = path.join(__dirname, '../../docs/sera-vnext/duplicate-event-reconciliation');
  fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(path.join(docsDir, 'HFA_DUPLICATE_EVENT_GROUPS.csv'), csvRows.join('\n'));

  console.log(JSON.stringify({groups: groupDetails.length, toDelete: toDelete.length, toKeep: toKeep.length, standaloneFailed: standaloneFailed.length}));
  return { groups: groupDetails, toDelete: toDelete.length };
}

main().catch(e => { console.error(e); process.exit(1); });
