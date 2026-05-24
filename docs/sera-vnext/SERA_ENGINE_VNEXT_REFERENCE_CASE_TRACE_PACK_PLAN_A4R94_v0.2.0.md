# SERA Engine vNext Reference Case Trace Pack Plan A4R94 v0.2.0

Status: REFERENCE_CASE_TRACE_PACK_PLAN  
Phase: A4+R-94  
DOCS_ONLY  
DESIGN_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Objective
Plan the first construction batches of self-contained reference case trace packs for future calibration use.

## Batch RC-1 (Internal Core First)
1. REAL-EVENT-0003 as first `POSITIVE_REFERENCE_CASE`.
2. REAL-EVENT-0015 as first `WITHDRAWN_REFERENCE_CASE` / `BOUNDARY_REFERENCE_CASE`.
3. N109W as second `WITHDRAWN_REFERENCE_CASE` / `BOUNDARY_REFERENCE_CASE`.
4. N11NM as third `WITHDRAWN_REFERENCE_CASE` / `BOUNDARY_REFERENCE_CASE`.

### RC-1 Design Goal
Establish a paired calibration set:
- one maintained positive exemplar;
- three withdrawn/boundary exemplars showing why stronger gates prevented overclassification.

## Batch RC-2 (External Ready Cases)
- EXT-001 and EXT-002 only after simple author review dossiers are completed and reviewed.

### RC-2 Design Goal
Add externally sourced positive candidates with explicit quarantine discipline and strong evidence trace quality.

## Mandatory Trace Pack Requirements
Each trace pack must be:
- self-contained;
- question-and-answer trace complete for P/O/A;
- evidence-linked per answer;
- explicit on safe-operation escape point;
- explicit on rejected alternatives;
- explicit on quarantine boundaries;
- suitable for future front-end learning/audit display.

## Non-Goals
- No release/proposed changes.
- No downstream opening.
- No runtime/UI implementation in this phase.

## A4+R-95 Execution Update
- RC-1 positive reference trace created for REAL-EVENT-0003:
  - `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-A4R95.md`
- Next RC-1 priority:
  - build withdrawn/boundary reference pack for REAL-EVENT-0015; or
  - build combined withdrawn trio pack (REAL-EVENT-0015, N109W, N11NM).

## A4+R-96 Execution Update
- A4+R-95 trace pack for REAL-EVENT-0003 was superseded:
  - `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-A4R95.md`
- Supersede reason:
  - noncanonical/generic P/O/A question flow (not canonical SERA tree questions).
- Impact guardrails:
  - no release impact;
  - no runtime impact;
  - no downstream impact;
  - only reference trace validity impacted.
- Canonical O/P/A tree sources were confirmed in A4+R-96 inventory (`FOUND_COMPLETE`).
- Next phase is enabled:
  - rebuild REAL-EVENT-0003 trace from exact canonical tree questions and branches.

## A4+R-97 Canonical Reaudit Sweep Update
- Full-scope review executed for 37 events (30 real + 7 external):
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_REAUDIT_SWEEP_ALL_EVENTS_A4R97_v0.2.0.md`
- Confirmed sequencing after sweep:
  1. REAL-EVENT-0003 canonical rebuild (priority 1).
  2. withdrawn trio (REAL-EVENT-0015, N109W, N11NM) canonical negative/boundary pack finalization (priority 2).
  3. new high-potential candidate traces after canonical rebuild:
     - BS211-Q400
     - EXT-001
     - EXT-002
     - EXT-006 / EXT-008 / EXT-012 (boundary-first strategy).
- Guardrails unchanged:
  - no release impact;
  - no runtime impact;
  - no downstream impact.

## A4+R-98 Canonical Contamination Cleanup Update
- Canonical contamination cleanup and governance lock executed:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_CONTAMINATION_AUDIT_A4R98_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_INVALID_REFERENCE_ARTIFACT_REGISTER_A4R98_v0.2.0.md`
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_POST_CONTAMINATION_CLEANUP_REBUILD_PLAN_A4R98_v0.2.0.md`
- A4R95 remains invalid for reference/front-end use.
- A4R97 sweep remains triage/candidate-review input only (not a canonical reference trace).
- No reference case is valid for front-end calibration display until canonical rebuild format is completed from exact tree questions.
- New sequencing lock:
  1. A4+R-99 — build canonical question tree asset pack.
  2. A4+R-100 — rebuild REAL-EVENT-0003 from canonical tree only.

## A4+R-100 Canonical Rebuild Update
- Canonical replacement trace for REAL-EVENT-0003 created:
  - `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-CANONICAL-A4R100.md`
- A4R95 remains invalid historical artifact:
  - `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-A4R95.md`
- Rebuild result:
  - validationStatus: `PASS_WITH_LIMITATIONS`
  - maintained reference result: `P-G`
  - O-axis: not released
  - A-axis: not released
- Guardrails preserved:
  - no new release;
  - no downstream;
  - no runtime impact.
- Next sequencing recommendation:
  - A4+R-101 withdrawn/boundary canonical pack rebuild.

## A4+R-102 Block 1 Stabilization Update
- Canonical withdrawn/boundary replacement pack created in one batch:
  - `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-WITHDRAWN-P-AXIS-BOUNDARY-CANONICAL-A4R102.md`
- Included cases:
  - REAL-EVENT-0015
  - N109W
  - N11NM
- Validation status of new boundary pack:
  - `REVIEW_REQUIRED`
- A4R95 and pre-canonical A4R96 boundary artifacts remain invalid for reference/front-end proof usage.
- Guardrails preserved:
  - no new release;
  - no release restoration for withdrawn trio;
  - no downstream;
  - no runtime impact.
- Updated next sequencing recommendation:
  1. combined author review of A4R100 + A4R102;
  2. after author decision record, proceed to Block 2 canonical reclassification sweep.
