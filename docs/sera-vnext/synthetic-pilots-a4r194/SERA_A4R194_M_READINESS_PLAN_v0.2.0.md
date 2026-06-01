# SERA A4R194-M Readiness Plan v0.2.0

Date: 2026-06-01
Phase: A4R194-M readiness
Status:
- READINESS_ONLY
- HUMAN_DECISION_REQUIRED
- A4R194_M_NOT_STARTED

Fonte operacional de desenho: Daumas (methodology/reference-only, sem reentry automatico).

## Purpose

A4R194-M, if authorized, executes exactly one human-selected route from the A4R194-L
post-J decision intake. A4R194-M depends on an explicit human authorization text and is
not started automatically by A4R194-L.

## Allowed A4R194-M shapes

A4R194-M may be exactly one of:

- STOP_AND_HOLD closure (retain A4R194-J as audited controlled draft);
- SOURCE_RECOVERY (real-first governance path, no promotion);
- SEQUENCE_REF_REFINEMENT design-only (close LOW-001, no promotion);
- PM_PRIMARY_SEPARATE_DRAFT (new syntheticPilotId/scopeId/sequence, separate audit).

## A4R194-M cannot

- create a fixture;
- promote anything to baseline;
- open product/UI/API;
- create selectedCode, releasedCode, or finalConclusion;
- create classification, HFACS, Risk/ERC, ARMS/ERC, or recommendations;
- reuse the PF-primary lineage for a PM-primary variant.

## Recommended model

Use Opus high effort for sensitive design/review work; GPT-5.5 Thinking is an acceptable
alternative. Codex GPT-5.3 may be used only for mechanical documentary execution after the
human decision. Sonnet is not used.

## Non-initiation statement

A4R194-L does not start A4R194-M. A4R194-M requires a separate future instruction with an
explicit human authorization text and must respect all current locks unless a later human
authorization explicitly changes scope.
