# SERA Engine vNext Prioritized Work Queue A4R101 v0.2.0

Status: PRIORITIZED_WORK_QUEUE  
Phase: A4+R-101  
DOCS_ONLY  
PRIORITIZATION_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Queue Table
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Select first canonical trace build batch | 3-5 events from A4R103 shortlist | Screening is complete; next work is trace construction for strongest candidates. | Codex | 3-5 events | Batch chosen without treating selection as author approval. |
| P0 | Build canonical trace candidates | Selected strong candidates | Trace candidates are needed before author review is meaningful. | Codex | 3-5 traces | Each trace uses A4R99 asset and checklist, with no release or front-end promotion. |
| P1 | Candidate shortlist hardening | Remaining strong/good candidates | Moves from broad corpus to manageable high-quality reference pipeline. | Codex | 5-8 events | Each shortlisted event has canonical eligibility rationale and next-action dossier target. |
| P1 | Boundary/adversarial package planning | A4R103 parked/boundary list | Boundary cases are useful after positive trace candidates are stable. | Codex | 1 batch | Boundary candidates are separated from positive reference candidates. |
| P2 | External solid-event expansion | New external sources/events | Increases diversity only after canonical recovery stabilizes internally. | ChatGPT (search/curation) + Codex (versioning) | 1 batch | New candidate batch documented with quarantine and source-quality fields completed. |
| P2 | Front-end data contract preparation | Canonical reference data model | Front-end should only consume approved canonical reference artifacts. | Codex | 1 contract package | Contract draft explicitly bound to canonical fields and excludes invalid artifacts. |

## Priority Guardrails
- No work item in this queue authorizes new release creation.
- No work item in this queue authorizes downstream opening.
- Any missing canonical node/question path must stop trace work (`CANONICAL_NODE_MISSING`).
- A4R103 screening is complete and did not require author approval.

## A4+R-104 queue update
- Completed in A4R104:
  - P0 batch selection and canonical trace drafts for `REAL-EVENT-0016`, `BS211-Q400`, and `EXT-002`.
  - Execution remained docs-only, no release, no downstream, no author approval.

## Immediate queue after A4R104
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Batch author-review bundle preparation (conditional) | A4R104 three-trace batch | Move from draft build to comparable review package without promotion. | Codex | 1 bundle | At least two A4R104 drafts are `PASS_WITH_LIMITATIONS` or better; bundle excludes any release action. |
| P0 | Source-slice expansion fallback (conditional) | Any A4R104 draft below threshold | Prevent overclassification when canonical confidence is insufficient. | Codex | 1 focused slice batch | Missing/weak evidence for weak nodes is explicitly reduced before review bundle. |
| P1 | Candidate shortlist hardening | Remaining strong/good candidates | Keeps reference pipeline scalable after first draft batch. | Codex | 5-8 events | Updated shortlist with explicit draft-readiness flags and blocking reasons. |

## A4+R-105 queue update
- Completed in A4R105:
  - curated official-report shortlist (top-10 with top-3 selected for next batch);
  - A4R104 marked as held exploratory for immediate prioritization;
  - source inventory and comparative package completed.
- Execution remained docs-only, curation-only, no release, no downstream, no author approval.

## Immediate queue after A4R105
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Build canonical trace drafts from curated official top-3 | ASIANA-214, COMAIR-5191, KOREAN-801 | Cleaner official-source package is expected to improve trace efficiency and reduce overclassification pressure. | Codex | 3 traces | At least two traces `PASS_WITH_LIMITATIONS` or better with release/downstream closed. |
| P1 | Curated reserve activation | UPS-1354, FIRST-AIR-6560, AMERICAN-1420, AMERICAN-965, AIR-CANADA-624, KEGWORTH-GOBME, G-BLUN-OFFSHORE | Provides immediate fallback if top-3 produce weak canonical closure. | Codex | 1 reserve batch | Reserve batch selected without changing release/front-end status. |
| P1 | Held A4R104 source-slice round (deferred) | REAL-EVENT-0016, BS211-Q400, EXT-002 | Preserve prior work while avoiding forced hardening before cleaner official batch. | Codex | 1 deferred round | Re-open only after A4R106 outcome review. |

## A4+R-106 queue update
- Completed in A4R106:
  - official source slices built for `ASIANA-214`, `COMAIR-5191`, `KOREAN-801`;
  - canonical trace drafts built for same top-3 with A4R99-only decision path;
  - cross-case consistency review completed.
- Execution remained docs-only, trace-draft-batch-only, no release, no downstream, no author approval.

## Immediate queue after A4R106
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Prepare one author-review bundle for A4R106 | ASIANA-214, COMAIR-5191, KOREAN-801 | Three drafts are already `PASS_WITH_LIMITATIONS`; bundle review is now the next governance gate. | Codex | 1 bundle | Bundle finalized without release/front-end promotion. |
| P1 | Targeted source-slice expansion (conditional) | weak nodes from A4R106 gaps | Reduces overclassification risk before any O/A closure attempt. | Codex | 1 focused round | Weak-node evidence is strengthened for at least two cases. |
| P1 | Reserve activation (conditional) | UPS-1354, FIRST-AIR-6560, AMERICAN-1420, AMERICAN-965, AIR-CANADA-624, KEGWORTH-GOBME, G-BLUN-OFFSHORE | Fallback path if author review rejects majority of A4R106 path assumptions. | Codex | 1 reserve batch | Next batch selected without release/downstream changes. |

## A4+R-105b queue update
- Completed in A4R105b:
  - local archive consolidation for curated official reports;
  - checksum and file-type inventory;
  - PDF/HTML text extraction prep and search indexing.
- Execution remained docs/source-archive/extraction-prep only.

## Immediate queue impact after A4R105b
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Use local corpus first for A4R106 inputs | ASIANA-214, COMAIR-5191, KOREAN-801 | Reduces source drift and keeps trace build reproducible. | Codex | 3 reports | Source slices built from local PDFs/TXTs with quarantine discipline. |
| P1 | Reserve-source deep extraction (conditional) | remaining curated reserve | Enables next batch readiness if top-3 weakens. | Codex | 1 prep batch | Reserve reports receive extraction indices and search slices. |

## A4+R-107 queue update
- Completed in A4R107:
  - quality audit for A4R106 top-3 drafts;
  - node-evidence matrix and author-review bundle build;
  - post-A4R106 gate plan.
- Execution remained docs-only, quality-audit-only, review-bundle-only.

## Immediate queue after A4R107
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Run one author review in chat for A4R106 bundle | ASIANA-214, COMAIR-5191, KOREAN-801 | Audit left at least two cases still eligible for draft retention. | Codex + user | 1 bundle | Author records keep/downgrade decisions without release action. |
| P1 | Targeted source-slice expansion fallback | weak nodes flagged by author | Prevents overclassification if review rejects key branches. | Codex | 1 focused round | Updated slices reduce weak-node uncertainty in at least two cases. |
| P1 | Reserve activation (conditional) | A4R105 reserve list | Backup if eligibility falls below threshold after review. | Codex | 1 reserve batch | Next draft batch selected with release/downstream still closed. |

## A4+R-108 queue update
- Completed in A4R108:
  - chat author-review bundle prepared for eligible A4R106 cases;
  - decision intake placeholder created with no recorded decisions.
- Execution remained docs-only and review-bundle-prep-only.

## Immediate queue after A4R108
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Conduct one chat-based author review | COMAIR-5191 and KOREAN-801 | A4R108 package is self-contained and ready for decision intake. | Codex + user | 1 bundle session | Author decisions captured outside this prep phase. |
| P1 | Resolve excluded case pathway | ASIANA-214 | Case remains non-eligible for approval bundle after A4R107 audit outcome. | Codex | 1 targeted round | Clear downgrade/hold path confirmed before reuse. |
| P1 | Reserve activation (conditional) | A4R105 reserve candidates | Needed if chat review yields insufficient eligible outcomes. | Codex | 1 reserve batch | Next candidate set selected without release/downstream actions. |

## A4+R-109 queue update
- Completed in A4R109:
  - author decisions recorded for eligible A4R106 cases;
  - decision intake artifact created;
  - placeholder superseded.
- Execution remained docs-only and author-decision-intake-only.

## Immediate queue after A4R109
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Prepare controlled internal-reference package | COMAIR-5191 and KOREAN-801 | Two cases are approved with limitations as internal drafts. | Codex | 1 package | Internal package drafted without release/downstream/front-end promotion. |
| P1 | Resolve non-eligible case | ASIANA-214 | Case remains `REVIEW_REQUIRED` and needs additional slice/method handling. | Codex | 1 targeted round | Clear next-state path documented before re-review. |
| P1 | Reserve activation (conditional) | A4R105 reserve list | Needed if a clean positive reference (lower boundary risk) is required. | Codex | 1 reserve batch | Reserve candidate selected with no release/downstream action. |

## A4+R-110 queue update
- Completed in A4R110:
  - objective/action feasibility package for approved P references;
  - source-gap map for O/A evidence expansion;
  - P/O/A boundary control note for non-automatic expansion.
- Execution remained docs-only and O_A_FEASIBILITY_ONLY.

## Immediate queue after A4R110
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | O/A author-review bundle preparation (conditional) | COMAIR-5191 objective/action only | Feasibility is partial and requires focused source-slice before any O/A review attempt. | Codex | 1 focused package | Objective/action path evidence reaches reviewable threshold without O/A closure. |
| P0 | Keep P-only internal reference status | COMAIR-5191 and KOREAN-801 | Current evidence does not justify automatic O/A expansion across both cases. | Codex | 1 status cycle | P-only status retained with explicit O/A unresolved markers. |
| P1 | Resolve ASIANA review-required path | ASIANA-214 | Remains excluded from O/A expansion and needs separate method/source handling. | Codex | 1 targeted round | Clear re-entry conditions documented before any new review bundle. |
| P1 | Reserve activation (conditional) | A4R105 reserve list | Needed if clean multi-axis references are required sooner than O/A expansion can support. | Codex | 1 reserve batch | Reserve candidate selected with release/downstream still closed. |

## A4+R-111 queue update
- Completed in A4R111:
  - full-axis scope correction for reference governance;
  - A4R105 top-10 re-evaluation with explicit P/O/A potential matrix;
  - balanced 3-5 candidate planning for a full-axis next batch.
- Execution remained docs-only and FULL_AXIS_REBALANCING_ONLY.

## Immediate queue after A4R111
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Build full-axis trace draft batch | UPS-1354, AMERICAN-1420, ASIANA-214, AIR-CANADA-624 | Rebalanced set gives stronger O/A coverage while preserving P documentation. | Codex | 4 events | Each event has explicit P/O/A sections with canonical or unresolved state per axis. |
| P1 | Targeted source-slice expansion before or during batch | selected A4R112 events | Prevents axis omission and reduces overclassification risk in O/A branches. | Codex | 1 focused round | Missing evidence for weak O/A nodes is documented and reduced. |
| P1 | Maintain P-only draft boundary state | COMAIR-5191 and KOREAN-801 | Keeps prior approvals valid without overstating full-reference completeness. | Codex | 1 status cycle | Both cases remain tagged as P-only internal drafts. |
| P1 | Conditional reserve activation | AMERICAN-965, FIRST-AIR-6560, KEGWORTH-GOBME, G-BLUN-OFFSHORE | Fallback if one primary batch candidate fails readiness. | Codex | 1 reserve swap round | Replacement candidate chosen with explicit P/O/A feasibility rationale. |
