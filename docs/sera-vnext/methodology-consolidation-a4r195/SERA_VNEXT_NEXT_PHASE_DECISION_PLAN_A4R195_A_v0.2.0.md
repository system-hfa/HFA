# SERA vNext Next Phase Decision Plan - A4R195-A v0.2.0

Date: 2026-06-01
Status: decision plan only
Recommendation: run A4R195-B before any A4R194-J materialization draft

## Decision principle

A4R195-A consolidates state. It does not choose or execute the next operational path. The next phase should be a governance board that records explicit human decisions before any materialization, baseline, fixture, product, or runtime work.

## Option 1 - A4R195-B governance board

Status: recommended.

Permitted work:

- create a decision register
- classify allowed next routes
- record explicit human approvals or blocks
- preserve product/UI/API and fixture/baseline locks

Blocked work:

- product integration
- synthetic materialization
- fixture or baseline promotion
- reconstructed decision-tree traces

Methodological risk: low.

Token/model cost: medium.

Recommended model: strongest available reasoning model because the task is governance-heavy and depends on consistency across multiple phase histories.

Prerequisites: A4R195-A consolidation package and successful trials.

## Option 2 - A4R194-J controlled GAP-001 materialization draft

Status: not started by A4R195-A.

Permitted only if a later prompt gives explicit human authorization.

If authorized later, the scope must remain:

- one minimal controlled materialization draft
- no real-event claim
- no fixture
- no baseline
- no product use
- no downstream report use
- no released output
- no PM-primary variant unless separately scoped

Methodological risk: medium.

Token/model cost: medium to high.

Recommended model: strongest available reasoning model due to boundary leakage risk.

Prerequisites: explicit human authorization and A4R194-J scope contract compliance.

## Option 3 - real-event source recovery

Status: allowed as a future document-only or source-extraction phase.

Best targets:

- Delta 191
- Colgan 3407
- USAir 427
- 5N-BQJ
- Thebaud
- Peasmarsh
- Vigo

Methodological risk: medium because report conclusions and external taxonomies must stay quarantined.

Token/model cost: high if source material is long.

Recommended model: strongest available reasoning model for extraction plus a narrow validation trial.

Prerequisites: explicit source-recovery scope and quarantine protocol.

## Option 4 - Daumas prior-work reentry phase

Status: allowed only if explicitly scoped.

Permitted work:

- review Daumas reference cases under the escape-point contract
- keep methodology context separate from empirical expected values
- decide whether any case can enter source recovery

Blocked work:

- automatic reentry
- automatic expected values
- fixture or baseline promotion

Methodological risk: medium.

Token/model cost: medium.

Recommended model: strong reasoning model with bilingual terminology discipline.

Prerequisites: dedicated Daumas reentry protocol.

## Option 5 - baseline methodology package planning

Status: premature unless A4R195-B authorizes it.

Permitted work if later approved:

- define human-review criteria
- define baseline promotion checklist
- define source quality and canonical-tree evidence requirements

Blocked work:

- changing existing baselines
- promoting candidates
- writing expected P/O/A values from reports or synthetic material

Methodological risk: high if done before governance.

Token/model cost: medium.

Recommended model: strongest available reasoning model.

Prerequisites: A4R195-B decision register.

## Option 6 - continue hold

Status: safe fallback.

Permitted work:

- no-op governance closure
- archive current state
- wait for explicit human prioritization

Methodological risk: low.

Token/model cost: low.

Recommended model: any competent code/documentation model.

Prerequisites: none.

## Recommendation

Proceed with A4R195-B as the next phase. Do not start A4R194-J, product integration, fixture creation, baseline promotion, or source-corpus mutation from A4R195-A.
