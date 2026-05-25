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

## A4+R-113 queue update
- Completed in A4R113:
  - repository methodology cleanup audit;
  - archive move for clearly invalid/pre-canonical artifacts;
  - corpus versioning policy and active-source index publication.
- Execution remained docs/governance/corpus-hygiene only.

## Immediate queue after A4R113
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Execute A4R112 full-corpus mining kickoff | A4R111 full pool + new50 TXT/manifests | Hygiene baseline is now explicit; corpus is ready for controlled mining. | Codex | 1 macro cycle | Mining starts from versioned TXT/CSV/manifests with quarantine discipline. |
| P1 | Controlled review of questionpath-backfill family | A4R79/A4R80 docs and annexes | Noncanonical backfill remains high-risk for reference-proof usage and needs dedicated disposition. | Codex + user | 1 governance cycle | Decision logged: retain with stronger labels or move to archive/invalid-methodology/questionpath-backfill. |
| P1 | Maintain archived-status discipline | archive subtree | Prevent accidental reuse of archived pre-canonical artifacts in active workflows. | Codex | continuous | Archive headers and active index remain aligned with current methodology lock. |

## A4+R-112 queue update
- Completed in A4R112:
  - combined-corpus audit across both A4R111 lots;
  - unified index and P/O/A signal mining over extracted TXT corpus;
  - full-axis candidate matrix and axis-balanced shortlist;
  - next full-axis 3-5 batch selection updated from full corpus evidence.
- Execution remained docs/source-archive/mining only.

## Immediate queue after A4R112
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Build full-axis trace draft batch from A4R112 selection | UPS-1354, AMERICAN-1420, ASIANA-214, COLGAN-3407, US AIRWAYS 1549 | Combined corpus mining improved balance across P/O/A and nominal-path calibration candidates. | Codex | 5 events | Each event gets explicit P/O/A axis documentation with canonical or unresolved outcome per axis. |
| P1 | Focused source-slice expansion during trace build | weak O/A branches in selected A4R112 events | Reduces overclassification risk and prevents axis omission in full-axis traces. | Codex | 1 focused round | Weak O/A nodes are either evidentially reinforced or marked SOURCE_SLICE_REQUIRED/UNRESOLVED. |
| P1 | Maintain P-only internal boundary status | COMAIR-5191 and KOREAN-801 | Prior P approvals remain valid but do not satisfy full-axis completeness. | Codex | 1 status cycle | Both remain explicitly scoped as P-only internal drafts. |
| P1 | Source recheck queue (conditional) | candidates tagged SOURCE_RECHECK_REQUIRED in A4R112 audit/index | Some corpus entries still depend on blocked/non-ideal links and need official-source recheck before reuse. | Codex | 1 recheck cycle | Recheck list is triaged without internet expansion unless official link recovery is required. |

## A4+R-114 queue update
- Completed in A4R114:
  - history reconciliation for A4R113 and A4R112 commit lineage;
  - active source index alignment with A4R112 corpus-mining outputs;
  - governance confirmation that next execution step is the A4R112 full-axis batch.
- Execution remained docs/governance/reconciliation only.

## Immediate queue after A4R114
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Build full-axis trace draft batch | UC-003 UPS-1354, UC-004 AMERICAN-1420, UC-002 ASIANA-214, UC-001 COLGAN-3407, UC-039 US AIRWAYS 1549 | Reconciled corpus-mining outputs now provide one aligned next batch across P/O/A. | Codex | 5 events | Every event includes explicit P/O/A sections with canonical closure or unresolved/source-slice markers per axis. |
| P1 | Keep P-only boundary governance explicit | COMAIR-5191 and KOREAN-801 | Prior P approvals remain valid but not full-axis complete. | Codex | 1 status cycle | Both remain tagged as P-only internal/boundary drafts in active planning docs. |
| P1 | Deferred corpus handling (separate phase) | `a4r111-recovered-pool-txt/` untracked set | Corpus policy allows deferred ingestion; this phase avoids scope mixing. | Codex | 1 deferred governance cycle | Deferred set disposition recorded without polluting full-axis trace batch scope. |

## A4+R-115 queue update
- Completed in A4R115:
  - expanded full-axis source-slice build for 10 events;
  - 6 full-axis canonical draft traces built;
  - held/boundary governance applied where evidence was insufficient or overclassification risk was high.
- Execution remained docs-only, trace-candidate/source-slice only, no release, no downstream.

## Immediate queue after A4R115
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Build one full-axis author-review bundle | UPS-1354, AMERICAN-1420, COLGAN-3407, US AIRWAYS 1549 | Four traces are usable with manageable limitations and explicit axis separation. | Codex + user | 1 bundle | Author review decisions captured without release/downstream. |
| P1 | Focused source-slice expansion for review-required traces | ASIANA-214 and AMERICAN-965 | These traces remain review-required with unresolved P/O/A boundaries. | Codex | 1 focused round | Each weak boundary is either reinforced or kept unresolved with rationale. |
| P1 | Maintain held/boundary queue | HELIOS-522, USAIR-427, TUROY EC225, KOREAN-801 boundary | Prevent forced closure on weak or system-dominant events. | Codex | 1 governance cycle | Held/boundary statuses remain explicit with re-entry criteria. |
| P1 | Preserve P-only internal status | COMAIR-5191 and KOREAN-801 | Prior P approvals remain valid but are not full-axis reference closures. | Codex | 1 status cycle | Both remain tagged P-only/internal boundary in active docs. |

## A4+R-116 queue update
- Completed in A4R116:
  - controlled integration of DeepSeek recovered-link metadata and 10 content-bearing recovered TXT files;
  - independent methodological QA of A4R115 source slices and full-axis trace drafts;
  - review-bundle eligibility audit for `UPS-1354`, `AMERICAN-1420`, `COLGAN-3407`, and `US-AIRWAYS-1549`;
  - review-required audit for `ASIANA-214` and `AMERICAN-965`;
  - held/boundary audit for `HELIOS-522`, `USAIR-427`, `TUROY EC225`, and `KOREAN-801`.
- Execution remained docs/corpus-integration/QA only, no release, no downstream.

## Immediate queue after A4R116
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Prepare one author-review bundle after QA caution patch | superseded by A4R117 | A4R117 replaced this interim step by removing AMERICAN-1420 from the stable bundle set and requiring substantive rework. | Codex + user | 1 bundle | superseded |
| P1 | Focused source-slice refinement for review-required traces | `ASIANA-214`, `AMERICAN-965` | Both remain too method-sensitive for bundle promotion. | Codex | 1 focused round | P/O/A weak branches are either reinforced or kept unresolved/source-slice dependent. |
| P1 | Future recovered-corpus batch planning | 10 recovered content-bearing TXT files | Recovered corpus improves future candidate breadth but did not alter A4R115. | Codex | 1 corpus planning pass | Future batch candidates are selected without direct import of report conclusions. |
| P1 | Deferred source recovery cleanup | OCR, ATSB network, official-download-failed, secondary-source-only, not-found, and source-recheck groups | These items are not active trace evidence yet. | Codex or retrieval tool | 1 recovery cycle | OCR/network/source-governance state updated before any trace use. |

## A4+R-117 queue update
- Completed in A4R117:
  - Opus external audit intake recorded;
  - UPS-1354 double-counting caution patch applied;
  - AMERICAN-1420 substantive patch applied and case moved to rework-required;
  - A4R115/A4R116 status docs updated with partial supersession.
- Execution remained docs-only, Opus-intake-and-patch only, no author review, no release, no downstream.

## Immediate queue after A4R117
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Prepare minimal author-review bundle in next phase | `UPS-1354`, `COLGAN-3407`, `US-AIRWAYS-1549` | These are the stable full-axis traces after Opus intake and A4R117 patching. | Codex + user | 1 bundle | Bundle executed in next phase only, with no release/downstream. |
| P1 | AMERICAN-1420 retrace/rework | `AMERICAN-1420` | Substantive overclassification risk remains across P/O/A framing. | Codex | 1 focused retrace | Case exits `REWORK_REQUIRED` only after conservative branch support improves. |
| P1 | Keep review-required and held queues unchanged | `ASIANA-214`, `AMERICAN-965`, `HELIOS-522`, `USAIR-427`, `TUROY EC225`, `KOREAN-801` | Opus intake confirmed these should stay out of bundle scope now. | Codex | 1 governance cycle | Queue status remains explicit and unchanged until dedicated evidence work. |

## A4+R-119 queue update
- Completed in A4R119:
  - Opus audit intake registered for A4R118 corpus-discovery package;
  - source validation executed for priority candidates (`UNITED-173`, `ATLAS-3591`, `EASTERN-401`, `UNITED-232`);
  - source slices built for allowed candidates (`UNITED-173`, `ATLAS-3591`, `UNITED-232`);
  - full-axis draft traces built only where source sufficiency supported (`UNITED-173`, `ATLAS-3591`, `UNITED-232`);
  - `EASTERN-401` held as `HOLD_OCR_REQUIRED`.
- Execution remained docs-only, source-slice/trace-draft only, no author decision, no release, no downstream.

## Immediate queue after A4R119
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Independent QA pass for A4R119 new traces | `UNITED-173`, `ATLAS-3591`, `UNITED-232` | New drafts need method QA before any bundle discussion. | Codex | 1 QA cycle | Each draft receives explicit readiness or hold status without release/downstream action. |
| P0 | Execute minimal author-review bundle from stable A4R117 set | `UPS-1354`, `COLGAN-3407`, `US-AIRWAYS-1549` | A4R117 stable set remains unaffected by A4R119 intake batch. | Codex + user | 1 bundle | Author decisions captured in future phase only; no release/downstream. |
| P1 | Recover usable official text for EASTERN-401 | `EASTERN-401` | Priority candidate is blocked by OCR/source quality. | Codex + retrieval workflow | 1 recovery cycle | Event exits hold only when official TXT is usable for controlled slicing. |
| P1 | Batch-2 activation planning | `EXECUFLIGHT-1526`, `EC225-NORTH-SEA`, `CROSSAIR-3597` | Opus ranked these as next discovery lane after priority batch. | Codex | 1 planning cycle | Next source-validation set defined with explicit hold criteria. |

## A4+R-120 queue update
- Completed in A4R120:
  - independent external QA intake recorded for A4R119 traces;
  - UNITED-173 caution patch applied (OCR/source-quality warning);
  - UNITED-232 display patch applied (nominal/adversarial interpretation guardrail);
  - ATLAS-3591 substantive patch applied (boundary-path consistency + actor scope + A-axis reframe);
  - boundary-path and tracedActor rule formalized for future traces/revisions.
- Execution remained docs-only, QA-intake-and-trace-stabilization only, no author decision, no release, no downstream.

## Immediate queue after A4R120
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Prepare future author-review lane from stabilized set | `UPS-1354`, `COLGAN-3407`, `US-AIRWAYS-1549`, `UNITED-173`, `UNITED-232` | These are currently the stable future-review candidates after A4R120 stabilization. | Codex + user | 1 future bundle cycle | Future bundle is assembled in dedicated phase only, with no release/downstream. |
| P1 | ATLAS-3591 targeted refinement | `ATLAS-3591` | Substantive patch reduced errors but case remains review-required. | Codex | 1 focused refinement cycle | Case exits review-required only after actor-scope and A-axis uncertainty are further reduced. |
| P1 | Keep hold lane unchanged | `EASTERN-401` | OCR/source insufficiency remains unresolved. | Codex + retrieval workflow | 1 recovery cycle | Hold removed only when usable official text is available. |

## A4+R-121 queue update
- Completed in A4R121:
  - official FAA-hosted source recovered for EASTERN-401;
  - content-bearing recovered TXT generated and versioned;
  - source slice and full-axis canonical draft created with legibility caveat.
- Execution remained docs/source-slice/trace-draft only, no author decision, no release, no downstream.

## Immediate queue after A4R121
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | QA pass for EASTERN-401 A4R121 draft | `EASTERN-401` | Reopened case needs independent QA before any future review-lane decision. | Codex | 1 QA cycle | Case receives explicit keep/downgrade status with no release/downstream action. |
| P0 | Prepare future author-review lane from stabilized set | `UPS-1354`, `COLGAN-3407`, `US-AIRWAYS-1549`, `UNITED-173`, `UNITED-232` | Stable set remains unchanged by Eastern reentry. | Codex + user | 1 future bundle cycle | Bundle planning remains in dedicated future phase only. |
| P1 | ATLAS-3591 targeted refinement | `ATLAS-3591` | Remains review-required after substantive patch. | Codex | 1 focused refinement cycle | Actor-scope and A-axis uncertainty reduced before re-eligibility discussion. |

## A4+R-122 queue update
- Completed in A4R122:
  - independent QA intake recorded for EASTERN-401 A4R121 trace draft;
  - minor stabilization patch applied to enforce P/A double-counting control and temporal O-axis framing;
  - EASTERN-401 status moved to `REVIEW_AFTER_MINOR_PATCH_APPLIED` with `READY_WITH_WARNINGS`.
- Execution remained docs-only, EASTERN-401-stabilization-only, no author decision, no release, no downstream.

## Immediate queue after A4R122
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Prepare future author-review lane from stabilized set | `UPS-1354`, `COLGAN-3407`, `US-AIRWAYS-1549`, `UNITED-173`, `UNITED-232`, `EASTERN-401` | EASTERN-401 now has QA-stabilized warning-bound readiness for future consideration. | Codex + user | 1 future bundle cycle | Dedicated future phase defines inclusion and ordering, with no release/downstream action. |
| P1 | ATLAS-3591 targeted refinement | `ATLAS-3591` | Remains review-required after substantive patch. | Codex | 1 focused refinement cycle | Actor-scope and A-axis uncertainty reduced before re-eligibility discussion. |
| P1 | Preserve warning-bound controls on EASTERN-401 | `EASTERN-401` | Legacy scan legibility still constrains confidence; boundary-live A-axis must remain explicit. | Codex | continuous | Warning controls retained in all future review artifacts until author adjudication. |

## A4+R-123 queue update
- Completed in A4R123:
  - consolidated real-event reference set governance into one controlled package;
  - fixed the stable `review-ready/warning-bound` set at six real events;
  - registered held/rework cases with explicit reopen conditions;
  - created P/O/A coverage matrix for real-event portfolio;
  - defined synthetic model event readiness and macro roadmap without creating synthetic events.
- Execution remained docs-only, real-event-consolidation-only, no author decision, no release, no downstream.

## Immediate queue after A4R123
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Run dedicated future author-review lane for consolidated real set | `UPS-1354`, `COLGAN-3407`, `US-AIRWAYS-1549`, `UNITED-173`, `UNITED-232`, `EASTERN-401` | Real-event set is now governance-consolidated with explicit warnings and caveats. | Codex + user | 1 future bundle cycle | Author decisions captured in dedicated phase only, without release/downstream. |
| P1 | Start synthetic model event framework phase (no real-event substitution) | 12 planned synthetic model events (4P/4O/4A emphasis) | Coverage matrix identifies controlled gaps better explored by synthetic didactic/adversarial cases. | Codex | 1 framework cycle | First synthetic draft framework produced with explicit `SYNTHETIC_MODEL_EVENT` source discipline. |
| P1 | Keep held/rework register active | `ATLAS-3591`, `AMERICAN-1420`, `ASIANA-214`, `AMERICAN-965`, `HELIOS-522`, `USAIR-427`, `TUROY-EC225`, `KOREAN-801` | Out-of-bundle cases need dedicated evidence/scope gates, not bundle backfill by pressure. | Codex | continuous | Reopen only when documented conditions are satisfied. |

## A4+R-124 queue update
- Completed in A4R124:
  - documented an auditable selection-funnel explanation for why consolidated real references are six warning-bound cases;
  - built non-selected real-event use register with reopen conditions;
  - built canonical question trace dossier for the six consolidated events;
  - built author-facing explainer for governance readability.
- Execution remained docs-only, real-event-rationale-and-dossier-only, no author decision, no release, no downstream.

## Immediate queue after A4R124
| priority | workItem | scope | why | suggestedTool | batchSize | exitCriteria |
|---|---|---|---|---|---:|---|
| P0 | Execute dedicated future author-review lane with dossier support | `UPS-1354`, `COLGAN-3407`, `US-AIRWAYS-1549`, `UNITED-173`, `UNITED-232`, `EASTERN-401` | Canonical rationale and per-axis evidence trail are now explicitly audit-ready for review session. | Codex + user | 1 future bundle cycle | Author decisions captured in dedicated phase only, without release/downstream action. |
| P1 | Keep non-selected lanes active | rework/hold/boundary/deferred registers | Non-selected events remain method assets with explicit reopen conditions. | Codex | continuous | Reopen only when documented conditions are satisfied. |
| P1 | Prepare synthetic framework phase (without creating cases in this queue step) | synthetic model event framework readiness | A4R123 readiness exists; queue timing should follow author lane gating priorities. | Codex | 1 framework planning cycle | Framework phase opened explicitly in future phase, still no release/downstream. |
