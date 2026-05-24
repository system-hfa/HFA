# SERA Engine vNext A4R95 Noncanonical Trace Error Audit A4R96 v0.2.0

Status: METHOD_ERROR_RECORDED  
Phase: A4+R-96

- errorType: NONCANONICAL_QUESTION_FLOW
- affectedFile: `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-A4R95.md`
- authorFeedback: “Essas não são as perguntas do SERA.”

## Error Description
- A4+R-95 used reconstructed/generic P/O/A questions.
- It did not prove traversal of the canonical SERA decision tree.
- It is invalid for calibration/front-end reference use.

## Impact
- release REAL-EVENT-0003 P-G remains unchanged;
- A4+R-92 author decision remains unchanged;
- runtime unaffected;
- downstream unaffected;
- only the reference trace pack is invalidated.

## Correction
- supersede A4+R-95;
- recover canonical tree source inventory;
- rebuild only after exact canonical tree/questions are available.

## Prevention
- no future reference trace without exact canonical tree source;
- no reconstructed/generic/equivalent wording allowed for canonical trace steps;
- if canonical exact question is unavailable at any step, mark `REAL_TREE_MISSING` and stop.
