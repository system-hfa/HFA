# SERA Engine vNext Escape-Point Gate Drafts A4R146 v0.2.0

Status: ESCAPE_POINT_GATE_DRAFTS_RECORDED
Phase: A4R146
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## objective

Transform A4R144/A4R145 source-slice and pre-gate material into structured escape-point gate drafts for:
1. COMAIR-5191
2. UPS-1354
3. UNITED-173

This phase is PRE-GATE ONLY and does not execute P/O/A reaudit.

## relationship to A4R137 / A4R138 / A4R140 / A4R145

- A4R137: P/O/A must be analyzed at escape point only.
- A4R138: defines mandatory gate fields and temporal separation.
- A4R140: blocks critical-point/outcome misuse and formalizes progressive handling.
- A4R145: identifies these three events as strongest positive candidates for gate drafting.

## method

1. Use only local documentation and source slices already prepared in A4R144/A4R145.
2. Define safe operation, controlled variable, first observable unsafe marker, and candidate "Quando..." without embedding cause/violation/codes/outcome.
3. Assign temporal type and contamination risks.
4. Decide gate draft readiness for future phase entry without classifying P/O/A.

## summary table

| event | sourceQuality | escapePointTemporalType | whenStatementQuality | gateDraftStatus | futureReauditEligibility |
|---|---|---|---|---|---|
| COMAIR-5191 | HIGH | DISCRETE_ESCAPE_POINT | NEEDS_AUTHOR_REVIEW | ESCAPE_POINT_GATE_DRAFT_READY | ELIGIBLE_AFTER_AUTHOR_REVIEW |
| UPS-1354 | HIGH | DISCRETE_ESCAPE_POINT | CLEAN | ESCAPE_POINT_GATE_DRAFT_READY_WITH_CAUTION | CONDITIONAL |
| UNITED-173 | MEDIUM | DISCRETE_ESCAPE_POINT | NEEDS_AUTHOR_REVIEW | ESCAPE_POINT_GATE_DRAFT_READY_WITH_CAUTION | CONDITIONAL |

## key methodological cautions

1. COMAIR-5191: avoid violation/objective language in the "Quando..." nucleus; keep it strictly operational/observable.
2. UPS-1354: do not use warning/impact sequence as escape point; anchor before consequence phase.
3. UNITED-173: do not use final fuel exhaustion/crash as first departure anchor; isolate pre-flameout departure.
4. No post-escape action can be used as primary escape-point anchor.

## no P/O/A statement

This document and its event drafts do not classify P/O/A and do not generate any reference authority for P/O/A.

## event gate drafts

- [COMAIR-5191 Gate Draft](/Users/filipedaumas/SAAS/HFA/docs/sera-vnext/escape-point-gates-a4r146/COMAIR-5191_ESCAPE_POINT_GATE_DRAFT_A4R146.md)
- [UPS-1354 Gate Draft](/Users/filipedaumas/SAAS/HFA/docs/sera-vnext/escape-point-gates-a4r146/UPS-1354_ESCAPE_POINT_GATE_DRAFT_A4R146.md)
- [UNITED-173 Gate Draft](/Users/filipedaumas/SAAS/HFA/docs/sera-vnext/escape-point-gates-a4r146/UNITED-173_ESCAPE_POINT_GATE_DRAFT_A4R146.md)
- [A4R146 Tracker](/Users/filipedaumas/SAAS/HFA/docs/sera-vnext/escape-point-gates-a4r146/ESCAPE_POINT_GATE_DRAFT_TRACKER_A4R146_v0.2.0.md)

## next recommended phase

A4R147 should run author-focused gate review and micro-anchor confirmation for these three drafts before any P/O/A-phase entry.

## locks preserved

- no P/O/A classified
- no releasedCode
- no selectedCode CLASSIFIED
- no downstream
- no finalConclusion
- no HFACS
- no Risk/ERC
- no ARMS/ERC
- no recommendations
- no code/fixtures/baseline/corpus modifications
