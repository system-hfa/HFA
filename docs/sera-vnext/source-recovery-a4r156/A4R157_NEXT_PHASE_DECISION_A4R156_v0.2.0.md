# A4R157 Next Phase Decision from A4R156 v0.2.0

Status: NEXT_PHASE_DECISION_RECORDED
Phase: A4R156

## Preferred Path

**A4R157 — Registry Integrity Machine Check**

## Factual Basis

A4R156 improved source readiness materially:
- Delta 191 moved from OCR_REQUIRED to OCR_IMPROVED_USABLE.
- Turoy moved from caution lane to ready-with-source-chain-note.
- BS211 remains partial/caution due to lack of direct official PDF.
- QF72 remains blocked by ATSB access failure in automated retrieval.

Before any gate-prep or P/O/A progression, the highest remaining systemic risk is registry integrity drift: path/header/event mismatch and duplicate-or-alias contamination.

## Required Machine Check Scope

Verify `eventId x localTxtPath x title x reportNumber x registration x operator x date` consistency for the active source-recovery set.

## Boundary

- no P/O/A in A4R157 unless explicitly authorized in a later phase
- gate-prep remains conditional on integrity check closure
