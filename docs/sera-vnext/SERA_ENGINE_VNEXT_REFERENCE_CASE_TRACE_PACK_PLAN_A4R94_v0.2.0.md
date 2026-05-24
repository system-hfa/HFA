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
  - noncanonical/generic P/O/A question flow (not canonical SERA/CERA tree questions).
- Impact guardrails:
  - no release impact;
  - no runtime impact;
  - no downstream impact;
  - only reference trace validity impacted.
- Reference-case work is now blocked until canonical SERA/CERA tree sources are used step-by-step.
- Next phase depends on `canonicalTreeStatus` from A4+R-96 inventory:
  - if complete: rebuild trace from exact canonical tree;
  - if incomplete/absent: recover missing canonical tree assets first.
