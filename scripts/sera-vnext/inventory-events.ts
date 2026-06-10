const { createClient } = require('@supabase/supabase-js');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const envPath = path.join(__dirname, '../../frontend/.env.local');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^([^#=][^=]*)=(.*)$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

console.error('Connecting to Supabase...');
const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });

function sha256(s) {
  return crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);
}

async function main() {
  console.error('=== EVENT INVENTORY ===\n');

  const { data: events, error } = await admin
    .from('events')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch events:', error);
    process.exit(1);
  }

  console.error(`Total events: ${events.length}`);
  const activeEvents = events.filter((e) => !e.deleted_at);
  const softDeletedEvents = events.filter((e) => !!e.deleted_at);
  console.error(`Active: ${activeEvents.length}, Soft-deleted: ${softDeletedEvents.length}`);

  const eventIds = events.map((e) => e.id);

  const { data: legacyAnalyses } = await admin
    .from('analyses')
    .select('id, event_id, status')
    .in('event_id', eventIds);

  const { data: vnextAnalyses } = await admin
    .from('sera_vnext_analyses')
    .select('id, source_reference, status')
    .in('source_reference', eventIds);

  const legacyIds = (legacyAnalyses || []).map((a) => a.id);
  const vnextIds = (vnextAnalyses || []).map((a) => a.id);

  const { data: correctiveActions } = await admin
    .from('corrective_actions')
    .select('id, source_analysis_id, status')
    .in('source_analysis_id', legacyIds);

  const { data: attachments } = await admin
    .from('analysis_attachments')
    .select('id, analysis_id')
    .in('analysis_id', legacyIds);

  let revisions = [], reviews = [];
  if (vnextIds.length > 0) {
    const [revRes, rvwRes] = await Promise.all([
      admin.from('sera_vnext_analysis_revisions').select('id, analysis_id').in('analysis_id', vnextIds),
      admin.from('sera_vnext_analysis_reviews').select('id, analysis_id').in('analysis_id', vnextIds),
    ]);
    revisions = revRes.data || [];
    reviews = rvwRes.data || [];
  }

  const { data: exclusions } = await admin
    .from('risk_profile_exclusions')
    .select('event_id, reason, restored_at')
    .is('restored_at', null);

  const exclusionMap = new Map();
  for (const exc of (exclusions || [])) {
    exclusionMap.set(exc.event_id, exc.reason);
  }

  const inventory = [];
  for (const event of events) {
    const e = event;
    const rawInput = e.raw_input || '';
    const narrativeHash = rawInput ? sha256(rawInput.trim().toLowerCase().replace(/\s+/g, ' ')) : null;

    const legAnalysis = (legacyAnalyses || []).find((a) => a.event_id === e.id);
    const vnextForEvent = (vnextAnalyses || []).filter((a) => a.source_reference === e.id);
    const vnextIdsForEvent = vnextForEvent.map((a) => a.id);

    const legAnalysisId = legAnalysis?.id || null;
    const caForAnalysis = (correctiveActions || []).filter((ca) => ca.source_analysis_id === legAnalysisId);
    const attForAnalysis = (attachments || []).filter((att) => att.analysis_id === legAnalysisId);

    const revCount = revisions.filter((r) => vnextIdsForEvent.includes(r.analysis_id)).length;
    const rvwCount = reviews.filter((r) => vnextIdsForEvent.includes(r.analysis_id)).length;

    inventory.push({
      event_id: e.id,
      tenant_id: e.tenant_id,
      title: e.title,
      title_hash: sha256(e.title.trim().toLowerCase().replace(/\s+/g, ' ')),
      narrative_hash: narrativeHash,
      narrative_size: rawInput ? rawInput.length : null,
      event_date: e.occurred_at || null,
      created_at: e.created_at,
      updated_at: e.updated_at,
      created_by: e.submitted_by || null,
      status: e.status,
      deleted_at: e.deleted_at || null,
      deletion_status: e.deletion_status || 'ACTIVE',
      operation_type: e.operation_type || null,
      aircraft_type: e.aircraft_type || null,
      legacy_analysis_id: legAnalysisId,
      legacy_analysis_status: legAnalysis?.status || null,
      vnext_analysis_ids: vnextIdsForEvent,
      revision_count: revCount,
      review_count: rvwCount,
      attachment_count: attForAnalysis.length,
      corrective_action_count: caForAnalysis.length,
      corrective_action_open_count: caForAnalysis.filter((ca) => ca.status === 'open').length,
      risk_profile_included: !exclusionMap.has(e.id),
      risk_profile_exclusion_reason: exclusionMap.get(e.id) || null,
    });
  }

  const outPath = path.join(__dirname, '../../tmp/hfa-duplicate-event-reconciliation/event-inventory.json');
  fs.writeFileSync(outPath, JSON.stringify(inventory, null, 2));
  console.error(`\nInventory written: ${outPath}`);
  console.error(`Total: ${inventory.length} events across ${new Set(inventory.map(i => i.tenant_id)).size} tenants`);
  console.error(`With legacy analysis: ${inventory.filter(i => i.legacy_analysis_id).length}`);
  console.error(`With vNext analysis: ${inventory.filter(i => i.vnext_analysis_ids.length > 0).length}`);
  console.error(`With corrective actions: ${inventory.filter(i => i.corrective_action_count > 0).length}`);
  console.error(`With open corrective actions: ${inventory.filter(i => i.corrective_action_open_count > 0).length}`);
  console.error(`Excluded from risk profile: ${inventory.filter(i => !i.risk_profile_included).length}`);

  // Output JSON to stdout for capture
  console.log(JSON.stringify({ total: inventory.length, tenants: [...new Set(inventory.map(i => i.tenant_id))], active: activeEvents.length, softDeleted: softDeletedEvents.length }));
}

main().catch(e => { console.error(e); process.exit(1); });
