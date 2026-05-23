# SERA Engine vNext P/O/A Classification Gateway v0.2.0
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-33 — Controlled P/O/A Classification Gateway  
Scope: deterministic evidence-gated P/O/A axis gateway with review-first behavior  
Non-scope: final narrative generation, UI integration, DB writes, HFACS integration, Risk/ERC integration, legacy engine integration

## 1. Purpose
This phase introduces the first controlled P/O/A classification gateway for vNext, consuming Step 5 statements and returning axis-level controlled outcomes.
The gateway is intentionally conservative and avoids forced classification when evidence is incomplete or semantically unsafe.

## 2. Files changed
- `frontend/src/lib/sera-vnext/types.ts`
- `frontend/src/lib/sera-vnext/constants.ts`
- `frontend/src/lib/sera-vnext/engine.ts`
- `frontend/src/lib/sera-vnext/steps/06-poa-classification.ts`
- `frontend/src/lib/sera-vnext/steps/10-causal-assurance.ts`
- `tests/sera-vnext/dry-run-trial-001.ts`

## 3. Step 6 gateway implemented
Step 6 now evaluates each axis through deterministic gates and returns structured status:
- `CLASSIFIED`
- `REVIEW_REQUIRED`
- `INSUFFICIENT_EVIDENCE`
- `NOT_IMPLEMENTED` (type support)

Per-axis output includes:
- selectedCode
- status
- confidence
- evidence
- alternativesConsidered
- rejectionReason
- reviewReason
- humanReviewRequired
- evidenceSufficiency
- semanticGuardrails
- codeMeaning
- disallowedInterpretations

## 4. Evidence and anti-overclassification rules
Implemented controls:
- no axis classification without statement;
- no axis classification when uncertainty is material;
- objective axis blocked from violation-style classification without explicit intent/rule-awareness evidence;
- action axis blocked from A-D/inability-style interpretation without explicit physical/motor/ergonomic evidence;
- perception axis blocked from failure-style inference based only on degraded environment or warning-barrier non-alert;
- review-required and insufficient-evidence outcomes are first-class expected outputs.

## 5. Trial 001 expected status
For `TRIAL-SET1-001`, gateway behavior is expected to remain non-final:
- perception: `REVIEW_REQUIRED` or `INSUFFICIENT_EVIDENCE`
- objective: `REVIEW_REQUIRED` or `INSUFFICIENT_EVIDENCE`
- action: `REVIEW_REQUIRED` or `INSUFFICIENT_EVIDENCE`

No forced final P/O/A code output is expected in this phase.

## 6. Causal assurance updates
Assurance now checks:
- no axis classified without sufficient evidence;
- no objective overclassification without explicit intent evidence;
- no action A-D-style collapse without physical evidence;
- no perception overclassification from environment/barrier-only degradation;
- semantic guardrails present for all axes;
- Trial 001 remains review-required/non-final;
- no HFACS/Risk/ERC/ARMS fields;
- no final free conclusion.

Assurance status remains non-pass:
- `PARTIAL_POA_REVIEW_REQUIRED`

## 7. Dry-run result
Command:
```bash
npx tsx tests/sera-vnext/dry-run-trial-001.ts
```

Result expected:
- PASS
- axis statuses review-first (not forced classified)
- no downstream contamination fields

## 8. Confirmations
- no final free conclusion generated;
- no HFACS output;
- no Risk/ERC output;
- no legacy import in vNext modules/tests;
- no UI changes;
- no DB writes;
- human review required remains active;
- causal assurance not passed.

## 9. Findings
- Gateway now enforces evidence sufficiency and semantic boundaries at axis level.
- Trial 001 stays in controlled review-required posture, avoiding legacy-style overclassification.

## 10. Adjustments before preconditions/recommendations hardening
- refine per-axis sufficiency thresholds for broader real-event variability;
- add explicit traceability links from each reviewReason to statement uncertainty items;
- define controlled transition policy from `REVIEW_REQUIRED` to `CLASSIFIED` for future phases.

## 11. Next steps
- A4+R-34: strengthen causal assurance and human-review workflow controls before enabling broader classification scenarios.
