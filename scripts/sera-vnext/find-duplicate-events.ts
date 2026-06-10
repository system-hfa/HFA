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

// ── Helpers ──────────────────────────────────────────────────────
function sha256(s) { return crypto.createHash('sha256').update(s).digest('hex').slice(0, 16); }

function normalizeTitle(t) {
  return (t || '')
    .trim().toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/[^a-z0-9\s]/g, ' ')                       // remove punctuation
    .replace(/\s+/g, ' ')                                // collapse whitespace
    .trim();
}

function normalizeNarrative(n) {
  if (!n) return null;
  return (n)
    .trim().toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function hashNarrative(n) {
  const norm = normalizeNarrative(n);
  return norm ? sha256(norm) : null;
}

function normalizeDate(d) {
  if (!d) return null;
  try {
    return new Date(d).toISOString().slice(0, 10);
  } catch { return null; }
}

function titleSimilarity(a, b) {
  const na = normalizeTitle(a);
  const nb = normalizeTitle(b);
  if (na === nb) return 1.0;
  if (na.length === 0 || nb.length === 0) return 0;
  // Simple Jaccard on word trigrams
  const trigrams = (s) => {
    const tokens = s.split(' ');
    const out = new Set();
    for (let i = 0; i <= tokens.length - 1; i++) out.add(tokens.slice(i, i+1).join(' '));
    return out;
  };
  const sa = trigrams(na), sb = trigrams(nb);
  const intersection = [...sa].filter(x => sb.has(x)).length;
  const union = new Set([...sa, ...sb]).size;
  return union === 0 ? 0 : intersection / union;
}

function narrativeSimilarity(ha, hb) {
  if (!ha || !hb) return null;
  return ha === hb ? 1.0 : 0;
}

// ── Canonical selection scoring ──────────────────────────────────
function scoreCanonical(e, allInGroup) {
  let score = 0;
  if (e.vnext_analysis_count > 0) score += 10;
  if (e.legacy_analysis_id) score += 5;
  if (e.revision_count > 0) score += 3;
  if (e.review_count > 0) score += 3;
  if (e.attachment_count > 0) score += 2;
  if (e.corrective_action_count > 0) score += 2;
  if (e.narrative_size && e.narrative_size > 100) score += 2;
  if (e.status === 'completed') score += 2;
  if (e.deletion_status === 'ACTIVE') score += 5;
  // Prefer older original
  const dates = allInGroup.map(x => x.created_at).sort();
  if (e.created_at === dates[0]) score += 1;
  return score;
}

// ── Main ─────────────────────────────────────────────────────────
async function main() {
  const mode = process.argv.includes('--execute') ? 'execute' : 'dry-run';
  const approvedFile = process.argv.includes('--approved-groups')
    ? process.argv[process.argv.indexOf('--approved-groups') + 1]
    : null;
  console.error(`=== DUPLICATE EVENT RECONCILIATION [${mode.toUpperCase()}] ===\n`);

  // 1. Fetch all events with full data
  const { data: events, error } = await admin.from('events').select('*').order('created_at');
  if (error) { console.error('Fetch error:', error); process.exit(1); }
  console.error(`Fetched ${events.length} events`);

  const activeEvents = events.filter(e => !e.deleted_at || e.deletion_status === 'RESTORED');
  const purgedEvents = events.filter(e => e.deletion_status === 'PURGED');
  const softDeletedEvents = events.filter(e => !!e.deleted_at && e.deletion_status === 'SOFT_DELETED' && e.deletion_status !== 'PURGED');
  console.error(`Active: ${activeEvents.length}, Purged: ${purgedEvents.length}, Soft-deleted: ${softDeletedEvents.length}`);

  // 2. Fetch related data
  const eventIds = events.map(e => e.id);
  const { data: analyses } = await admin.from('analyses').select('id, event_id, status').in('event_id', eventIds);
  const { data: vnextAnalyses } = await admin.from('sera_vnext_analyses').select('id, source_reference, status').in('source_reference', eventIds);
  const allAnalysesIds = [...(analyses||[]).map(a => a.id), ...(vnextAnalyses||[]).map(a => a.id)];

  const { data: correctiveActions } = await admin.from('corrective_actions').select('id, source_analysis_id, status');

  // 3. Enrich events
  const enriched = events.map(e => {
    const leg = (analyses||[]).filter(a => a.event_id === e.id);
    const vn = (vnextAnalyses||[]).filter(a => a.source_reference === e.id);
    const allAnalysisIds = [...leg.map(a => a.id), ...vn.map(a => a.id)];
    const cas = (correctiveActions||[]).filter(ca => allAnalysisIds.includes(ca.source_analysis_id));
    return {
      ...e,
      legacy_analysis_id: leg[0]?.id || null,
      legacy_analysis_status: leg[0]?.status || null,
      vnext_analysis_ids: vn.map(a => a.id),
      vnext_analysis_count: vn.length,
      revision_count: 0,
      review_count: 0,
      attachment_count: 0,
      corrective_action_count: cas.length,
      corrective_action_open_count: cas.filter(ca => ca.status === 'open').length,
      narrative_hash: hashNarrative(e.raw_input || ''),
      narrative_size: (e.raw_input || '').length,
      normalized_title: normalizeTitle(e.title),
      normalized_date: normalizeDate(e.occurred_at),
    };
  });

  // Only consider active+soft_deleted events for duplicate detection (skip purged — they're gone)
  const candidates = enriched.filter(e => e.deletion_status !== 'PURGED');
  console.error(`\nCandidates for duplicate detection: ${candidates.length} (excluding PURGED)`);

  // 4. Group by tenant -> normalized_title -> narrative_hash -> date
  const groups = [];
  const seen = new Set();

  for (let i = 0; i < candidates.length; i++) {
    if (seen.has(candidates[i].id)) continue;
    const group = [candidates[i]];

    for (let j = i + 1; j < candidates.length; j++) {
      if (seen.has(candidates[j].id)) continue;
      const a = candidates[i], b = candidates[j];

      // Must be same tenant
      if (a.tenant_id !== b.tenant_id) continue;

      const titleExact = a.normalized_title === b.normalized_title;
      const narrativeExact = a.narrative_hash && b.narrative_hash && a.narrative_hash === b.narrative_hash;
      const dateExact = a.normalized_date && b.normalized_date && a.normalized_date === b.normalized_date;
      const sourceExact = (a.operation_type || '') === (b.operation_type || '');

      let level = null;
      let reasons = [];

      // Level A: exact duplicate
      if (titleExact && narrativeExact && dateExact && sourceExact && a.tenant_id === b.tenant_id) {
        level = 'A';
        reasons = ['same_tenant', 'exact_normalized_title', 'exact_narrative_hash', 'exact_date', 'exact_source'];
      } else if (titleExact && narrativeExact && a.tenant_id === b.tenant_id) {
        level = 'A';
        reasons = ['same_tenant', 'exact_normalized_title', 'exact_narrative_hash'];
      // Level B: highly probable (same title + same date, or same title + narrative size match)
      } else if (titleExact && dateExact && a.tenant_id === b.tenant_id) {
        level = 'B';
        reasons = ['same_tenant', 'exact_normalized_title', 'exact_date'];
      } else if (titleExact && a.tenant_id === b.tenant_id) {
        level = 'B';
        reasons = ['same_tenant', 'exact_normalized_title'];
      } else if (titleSimilarity(a.title, b.title) > 0.8 && a.tenant_id === b.tenant_id) {
        level = 'C';
        reasons = ['same_tenant', 'high_title_similarity'];
      }

      if (level) {
        group.push(b);
      }
    }

    if (group.length > 1) {
      group.forEach(e => seen.add(e.id));
      groups.push(group);
    }
  }

  console.error(`\nDuplicate groups found: ${groups.length}`);
  const levelA = groups.filter(g => g.length >= 2);
  console.error(`Level A (exact): ${levelA.length} groups, ${levelA.flat().length} events`);
  console.error(`Level B (probable): ${groups.filter(g => g[0].normalized_title === g[1]?.normalized_title && g.length >= 2).length} groups`);

  // 5. Canonical selection + conflict detection
  const groupResults = [];
  for (const group of groups) {
    // Score each member
    const scored = group.map(e => ({ ...e, _score: scoreCanonical(e, group) }));
    scored.sort((a, b) => b._score - a._score);
    const canonical = scored[0];
    const duplicates = scored.filter(e => e.id !== canonical.id);

    // Detect conflicts
    const conflicts = [];
    const dates = new Set(scored.map(e => e.normalized_date).filter(Boolean));
    if (dates.size > 1) conflicts.push('different_event_dates');
    const aircrafts = new Set(scored.map(e => e.aircraft_type).filter(Boolean));
    if (aircrafts.size > 1) conflicts.push('different_aircraft');
    const narratives = new Set(scored.map(e => e.narrative_hash).filter(Boolean));
    if (narratives.size > 1) conflicts.push('different_narrative_facts');

    const hasOpenCA = duplicates.some(e => e.corrective_action_open_count > 0);
    if (hasOpenCA) conflicts.push('open_corrective_actions_on_duplicate');

    // Determine level
    const level = duplicates.length > 0 && duplicates[0].narrative_hash === canonical.narrative_hash ? 'A' : 'B';

    const blockedBy = [];
    if (conflicts.includes('different_event_dates')) blockedBy.push('CONFLICT_DATE');
    if (conflicts.includes('different_narrative_facts')) blockedBy.push('CONFLICT_NARRATIVE');
    if (conflicts.includes('open_corrective_actions_on_duplicate')) blockedBy.push('OPEN_CORRECTIVE_ACTIONS');

    groupResults.push({
      group_id: `GRP-${sha256(group.map(e => e.id).sort().join(''))}`,
      tenant_id: canonical.tenant_id,
      canonical_event_id: canonical.id,
      canonical_title: canonical.title,
      duplicate_event_ids: duplicates.map(e => e.id),
      duplicate_titles: duplicates.map(e => e.title),
      total_events: group.length,
      confidence: level === 'A' ? 'HIGH' : 'MEDIUM',
      duplicate_level: level,
      matching_reasons: level === 'A' ? ['exact_title', 'exact_narrative_hash', 'same_tenant', 'same_date'] : ['exact_title', 'same_tenant'],
      conflicting_fields: conflicts,
      canonical_selection_reasons: [
        canonical.vnext_analysis_count > 0 ? 'has_vnext_analysis' : null,
        canonical.legacy_analysis_id ? 'has_legacy_analysis' : null,
        canonical.revision_count > 0 ? 'has_revisions' : null,
        canonical.review_count > 0 ? 'has_reviews' : null,
        canonical.deletion_status === 'ACTIVE' ? 'active_not_deleted' : null,
        canonical.narrative_size > 100 ? 'rich_narrative' : null,
      ].filter(Boolean),
      blocked: blockedBy.length > 0,
      blocked_reasons: blockedBy,
      automatic_action_allowed: level === 'A' && blockedBy.length === 0,
      manual_review_required: level !== 'A' || blockedBy.length > 0,
    });
  }

  // 6. Generate output
  const outDir = path.join(__dirname, '../../tmp/hfa-duplicate-event-reconciliation');
  fs.mkdirSync(outDir, { recursive: true });

  // CSV
  const csvHeaders = 'group_id,tenant_id,duplicate_level,confidence,total_events,canonical_event_id,canonical_title,duplicate_event_ids,duplicate_titles,matching_reasons,conflicting_fields,blocked,blocked_reasons,automatic_action_allowed,manual_review_required\n';
  const csvRows = groupResults.map(g =>
    [
      g.group_id,
      g.tenant_id,
      g.duplicate_level,
      g.confidence,
      g.total_events,
      g.canonical_event_id,
      `"${(g.canonical_title||'').replace(/"/g,'""')}"`,
      `"${g.duplicate_event_ids.join('|')}"`,
      `"${g.duplicate_titles.join('|').replace(/"/g,'""')}"`,
      `"${g.matching_reasons.join('|')}"`,
      `"${g.conflicting_fields.join('|')}"`,
      g.blocked,
      `"${g.blocked_reasons.join('|')}"`,
      g.automatic_action_allowed,
      g.manual_review_required,
    ].join(',')
  ).join('\n');
  fs.writeFileSync(path.join(outDir, 'dry-run.csv'), csvHeaders + '\n' + csvRows);
  fs.writeFileSync(path.join(outDir, 'dry-run.json'), JSON.stringify(groupResults, null, 2));

  // Also write to docs
  const docsDir = path.join(__dirname, '../../docs/sera-vnext/duplicate-event-reconciliation');
  fs.mkdirSync(docsDir, { recursive: true });
  fs.writeFileSync(path.join(docsDir, 'HFA_DUPLICATE_EVENT_GROUPS.csv'), csvHeaders + '\n' + csvRows);

  // 7. Print summary
  const autoGroups = groupResults.filter(g => g.automatic_action_allowed);
  const blockedGroups = groupResults.filter(g => g.blocked);
  const manualGroups = groupResults.filter(g => g.manual_review_required && !g.blocked);

  console.error(`\n=== DRY-RUN SUMMARY ===`);
  console.error(`Total events: ${events.length}`);
  console.error(`Active events: ${activeEvents.length}`);
  console.error(`Exact duplicate groups (Level A): ${groupResults.filter(g => g.duplicate_level === 'A').length}`);
  console.error(`Probable duplicate groups (Level B): ${groupResults.filter(g => g.duplicate_level === 'B').length}`);
  console.error(`Possible duplicate groups (Level C): ${groupResults.filter(g => g.duplicate_level === 'C').length}`);
  console.error(`Events proposed for retention (canonical): ${groupResults.length}`);
  console.error(`Events proposed for soft-delete: ${groupResults.reduce((s,g) => s + g.duplicate_event_ids.length, 0)}`);
  console.error(`Groups eligible for automatic action: ${autoGroups.length}`);
  console.error(`Groups blocked by conflicts: ${blockedGroups.length}`);
  console.error(`Groups requiring manual review: ${manualGroups.length}`);
  console.error(`\nCSV written: ${path.join(outDir, 'dry-run.csv')}`);
  console.error(`JSON written: ${path.join(outDir, 'dry-run.json')}`);

  // 8. Execute soft-deletes if in execute mode
  if (mode === 'execute') {
    const groupsToReconcile = approvedFile
      ? groupResults.filter(g => {
          const approved = fs.readFileSync(approvedFile, 'utf8').split('\n').map(l => l.trim()).filter(Boolean);
          return approved.includes(g.group_id);
        })
      : autoGroups;

    if (groupsToReconcile.length === 0) {
      console.error('\nNo groups to reconcile. Run with --approved-groups <file> or ensure auto-action groups exist.');
      return { groups: groupResults, reconciled: 0 };
    }

    console.error(`\n=== EXECUTING SOFT-DELETE FOR ${groupsToReconcile.length} GROUPS ===`);

    let reconciled = 0;
    const results = [];

    for (const group of groupsToReconcile) {
      console.error(`\nProcessing ${group.group_id}: canonical=${group.canonical_event_id.slice(0,8)} duplicates=${group.duplicate_event_ids.length}`);

      for (const dupId of group.duplicate_event_ids) {
        try {
          // Use the existing RPC: request_event_soft_delete
          const { data, error: rpcErr } = await admin.rpc('request_event_soft_delete', {
            p_event_id: dupId,
            p_tenant_id: group.tenant_id,
            p_actor_id: '00000000-0000-0000-0000-000000000000', // system
            p_reason: 'DUPLICATE_EVENT_RECONCILIATION',
            p_request_id: `dup-${group.group_id}-${dupId.slice(0,8)}`,
            p_confirmation_title: group.duplicate_titles[group.duplicate_event_ids.indexOf(dupId)] || '',
            p_unknown_dependencies: '{}',
          });

          if (error) {
            console.error(`  FAILED to soft-delete ${dupId.slice(0,8)}: ${error.message}`);
            results.push({ event_id: dupId, success: false, error: error.message });
          } else {
            console.error(`  ✓ Soft-deleted ${dupId.slice(0,8)} (recoverable until ${data?.recoverable_until || '30d'})`);
            results.push({ event_id: dupId, success: true, recoverable_until: data?.recoverable_until });
            reconciled++;
          }
        } catch (err) {
          console.error(`  ERROR ${dupId.slice(0,8)}: ${err.message}`);
          results.push({ event_id: dupId, success: false, error: err.message });
        }
      }
    }

    fs.writeFileSync(path.join(outDir, 'execution-results.json'), JSON.stringify(results, null, 2));
    console.error(`\n=== EXECUTION COMPLETE: ${reconciled} events soft-deleted ===`);
    return { groups: groupResults, reconciled, results };
  }

  return { groups: groupResults, reconciled: 0 };
}

main().then(result => {
  console.log(JSON.stringify({
    total_groups: result.groups.length,
    level_a: result.groups.filter(g => g.duplicate_level === 'A').length,
    level_b: result.groups.filter(g => g.duplicate_level === 'B').length,
    level_c: result.groups.filter(g => g.duplicate_level === 'C').length,
    auto_action: result.groups.filter(g => g.automatic_action_allowed).length,
    blocked: result.groups.filter(g => g.blocked).length,
    manual_review: result.groups.filter(g => g.manual_review_required).length,
    events_to_delete: result.groups.reduce((s,g) => s + g.duplicate_event_ids.length, 0),
    reconciled: result.reconciled,
  }));
}).catch(e => { console.error(e); process.exit(1); });
