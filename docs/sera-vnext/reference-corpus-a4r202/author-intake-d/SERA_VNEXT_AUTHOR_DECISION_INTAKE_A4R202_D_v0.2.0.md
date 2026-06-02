# SERA vNext Author Decision Intake A4R202-D v0.2.0

Date: 2026-06-02
Phase: A4R202-D
Status: AUTHOR_DECISION_INTAKE_REGISTERED
Methodology: SERA
DerivedStatus: AUTHOR_APPROVED_FOR_CANDIDATE_ONLY_METHOD_REVIEW
Locks: NO_FINAL_P_O_A, NO_FINAL_ESCAPE_POINT_APPROVAL, NO_READY_PROMOTION, NO_SELECTED_CODE, NO_RELEASED_CODE, NO_FINAL_CONCLUSION, NO_CLASSIFIED_OUTPUT, NO_FIXTURE, NO_BASELINE, NO_PRODUCT

## 1. Objective

Register the exact author responses for the three A4R202-C top-3 candidate events:

1. `Comair 5191`
2. `Asiana 214`
3. `UPS 1354`

This phase is intake only. It records author responses and derives the limited status `AUTHOR_APPROVED_FOR_CANDIDATE_ONLY_METHOD_REVIEW`. It does not create final P/O/A, final escape point approval, READY, selectedCode, releasedCode, finalConclusion, CLASSIFIED, fixture, baseline, or product output.

## 2. Interpretation Rules Applied

- Codex records the answers exactly as given by the author.
- No missing answer was inferred.
- No ambiguous answer required `NEEDS_AUTHOR_CLARIFICATION`.
- `aprovo` is not converted into READY.
- `sim` is not converted into final escape point approval.
- `segue` is not converted into final P/O/A classification.
- Daumas remains methodology/reference-only, not a factual source for the event records.
- Synthetic-real blending is absent.

## 3. Author Responses by Event

### 3.1 Comair 5191

| Question | Author response | Response status |
|---|---|---|
| Aprovo este evento para revisao autoral candidate-only? | `aprovo` | `VALID_AUTHOR_RESPONSE` |
| O candidate escape point esta suficientemente claro para revisao autoral? | `sim` | `VALID_AUTHOR_RESPONSE` |
| O ator direto candidato esta suficientemente claro para revisao autoral? | `sim` | `VALID_AUTHOR_RESPONSE` |
| A evidencia factual e suficiente para sustentar revisao candidate-only? | `sim` | `VALID_AUTHOR_RESPONSE` |
| Ha risco alto de outcome bias? | `nao` | `VALID_AUTHOR_RESPONSE` |
| Ha risco alto de agent migration? | `nao` | `VALID_AUTHOR_RESPONSE` |
| O evento deve seguir, ir para reauditoria ou ficar em hold? | `segue` | `VALID_AUTHOR_RESPONSE` |
| Preciso de Opus para revisar este caso? | `nao` | `VALID_AUTHOR_RESPONSE` |

Derived status: `AUTHOR_APPROVED_FOR_CANDIDATE_ONLY_METHOD_REVIEW`

Allowed consequence:
- candidate-only method review may proceed in a future authorized phase.

Forbidden consequence:
- no final P/O/A;
- no final escape point approval;
- no READY promotion;
- no selectedCode/releasedCode/finalConclusion/CLASSIFIED;
- no fixture/baseline/product.

Known limitation:
- residual agent migration pressure toward ATC and airport context remains, without blocking this intake.

### 3.2 Asiana 214

| Question | Author response | Response status |
|---|---|---|
| Aprovo este evento para revisao autoral candidate-only? | `aprovo` | `VALID_AUTHOR_RESPONSE` |
| O candidate escape point esta suficientemente claro para revisao autoral? | `sim` | `VALID_AUTHOR_RESPONSE` |
| O ator direto candidato esta suficientemente claro para revisao autoral? | `sim` | `VALID_AUTHOR_RESPONSE` |
| A evidencia factual e suficiente para sustentar revisao candidate-only? | `sim` | `VALID_AUTHOR_RESPONSE` |
| Ha risco alto de outcome bias? | `nao` | `VALID_AUTHOR_RESPONSE` |
| Ha risco alto de agent migration? | `nao` | `VALID_AUTHOR_RESPONSE` |
| O evento deve seguir, ir para reauditoria ou ficar em hold? | `segue` | `VALID_AUTHOR_RESPONSE` |
| Preciso de Opus para revisar este caso? | `nao` | `VALID_AUTHOR_RESPONSE` |

Derived status: `AUTHOR_APPROVED_FOR_CANDIDATE_ONLY_METHOD_REVIEW`

Allowed consequence:
- candidate-only method review may proceed in a future authorized phase.

Forbidden consequence:
- no final P/O/A;
- no final escape point approval;
- no READY promotion;
- no selectedCode/releasedCode/finalConclusion/CLASSIFIED;
- no fixture/baseline/product.

Known limitation:
- technical and automation boundary pressure remains controllable but still requires explicit care in a future review.

### 3.3 UPS 1354

| Question | Author response | Response status |
|---|---|---|
| Aprovo este evento para revisao autoral candidate-only? | `aprovo` | `VALID_AUTHOR_RESPONSE` |
| O candidate escape point esta suficientemente claro para revisao autoral? | `sim` | `VALID_AUTHOR_RESPONSE` |
| O ator direto candidato esta suficientemente claro para revisao autoral? | `sim` | `VALID_AUTHOR_RESPONSE` |
| A evidencia factual e suficiente para sustentar revisao candidate-only? | `sim` | `VALID_AUTHOR_RESPONSE` |
| Ha risco alto de outcome bias? | `nao` | `VALID_AUTHOR_RESPONSE` |
| Ha risco alto de agent migration? | `nao` | `VALID_AUTHOR_RESPONSE` |
| O evento deve seguir, ir para reauditoria ou ficar em hold? | `segue` | `VALID_AUTHOR_RESPONSE` |
| Preciso de Opus para revisar este caso? | `nao` | `VALID_AUTHOR_RESPONSE` |

Derived status: `AUTHOR_APPROVED_FOR_CANDIDATE_ONLY_METHOD_REVIEW`

Allowed consequence:
- candidate-only method review may proceed in a future authorized phase.

Forbidden consequence:
- no final P/O/A;
- no final escape point approval;
- no READY promotion;
- no selectedCode/releasedCode/finalConclusion/CLASSIFIED;
- no fixture/baseline/product.

Known limitation:
- procedural and FMC/MDA boundary pressure remains controllable but still requires explicit care in a future review.

## 4. Validation of Responses

- All 24 responses are present.
- All 24 responses are `VALID_AUTHOR_RESPONSE`.
- `MISSING_AUTHOR_RESPONSE`: none.
- `NEEDS_AUTHOR_CLARIFICATION`: none.
- Direct conflict across answers: none.
- Opus requested by author: `NO`.

## 5. Derived Candidate-Only Status

Each of the three events receives the same derived status:

`AUTHOR_APPROVED_FOR_CANDIDATE_ONLY_METHOD_REVIEW`

Why this derivation is allowed:

- author approval response is `aprovo`;
- escape point clarity response is `sim`;
- direct actor clarity response is `sim`;
- factual evidence response is `sim`;
- outcome bias high response is `nao`;
- agent migration high response is `nao`;
- routing response is `segue`;
- Opus needed response is `nao`.

This derivation does not authorize:

- final P/O/A classification;
- final escape point approved;
- READY promotion;
- selectedCode;
- releasedCode;
- finalConclusion;
- CLASSIFIED;
- fixture;
- baseline;
- product/UI/API;
- HFACS;
- Risk/ERC;
- ARMS/ERC;
- recommendations.

## 6. Locks Preserved

- P/O/A final classification created: NO
- final escape point approved: NO
- READY automatic promotion: NO
- selectedCode active output: BLOCKED
- releasedCode active output: BLOCKED
- finalConclusion active output: BLOCKED
- CLASSIFIED active output: BLOCKED
- fixture/baseline/product promotion: BLOCKED
- downstream release behavior: BLOCKED
- Daumas used as factual source: NO
- synthetic-real blending: NO
