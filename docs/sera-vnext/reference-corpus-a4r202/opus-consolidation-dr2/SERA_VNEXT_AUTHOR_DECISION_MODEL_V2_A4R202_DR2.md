# SERA vNext Author Decision Model v2 A4R202-DR2

Date: 2026-06-04
Phase: A4R202-D/R2
Status: AUTHOR_DECISION_MODEL_V2_DEFINED
Scope: candidate-only author routing only

## 1. Purpose

Replace ambiguous author-decision wording from the earlier intake flow without recreating A4R202-D.

The model v2 exists to make the author confirm only candidate-only movement, not final methodological closure.

## 2. Mandatory language replacements

- Replace `aprovo` with `libero para revisão candidate-only`.
- Replace `segue` with `seguir apenas para method review candidate-only`.
- Replace `escape point claro?` with:
  - `o candidate escape point é suficiente para revisão candidate-only?`
  - `há candidato alternativo que deve ser coavaliado?`
  - `deve permanecer indefinido até reauditoria?`

## 3. Mandatory acknowledgments

The v2 intake must ask the author to confirm all of the following:

1. Confirmo que esta decisão NÃO aprova P/O/A final.
2. Confirmo que esta decisão NÃO aprova ponto de fuga final.
3. Confirmo que esta decisão NÃO promove READY.
4. Confirmo que esta decisão NÃO autoriza fixture/baseline/produto.
5. Confirmo que aceito seguir apenas em candidate-only method review.
6. Para casos com boundary warning, confirmo que as alternativas serão coavaliadas.

## 4. Event-type question sets

### Clean event

- Libero para revisão candidate-only / não libero / preciso revisar
- O candidate escape point é suficiente para revisão candidate-only? / não / preciso revisar
- Seguir apenas para method review candidate-only / reauditoria / hold

### Event with boundary warning

- Libero para revisão candidate-only com warning / não libero / preciso revisar
- O candidate principal é suficiente / coavaliar alternativa / indefinir até reauditoria
- Aceito o warning documentado / não aceito / preciso revisar
- Seguir apenas para method review candidate-only / reauditoria / hold

### Event with mandatory re-audit

- Manter em reauditoria / hold / descartar
- Opus necessário / revisão humana necessária / não sei

## 5. Operational interpretation rules

- `libero para revisão candidate-only` means only routing into method review under locks.
- `seguir apenas para method review candidate-only` never means final P/O/A, final escape point, READY, fixture, baseline, or product.
- Boundary warnings must be carried into the next phase as unresolved alternatives, not hidden by a binary yes/no answer.
- Daumas remains method-only and not a factual source.

## 6. Current mapping for the existing top-3

| event_name | v2 routing label | boundary handling |
|---|---|---|
| Comair 5191 | `libero para revisão candidate-only` | clean anchor; earlier alternative may still be co-tested |
| Asiana 214 | `libero para revisão candidate-only com warning` | coevaluate automation-state and 500 ft gate candidates |
| UPS 1354 | `libero para revisão candidate-only com warning` | coevaluate setup-stage and MDA-continuation candidates |
| Colgan 3407 | `manter em reauditoria` | do not route into the top-3 review lane |

## 7. Lock confirmations

- P/O/A final classification created: NO
- final escape point approved: NO
- READY automatic promotion: NO
- selectedCode active output: BLOCKED
- releasedCode active output: BLOCKED
- finalConclusion active output: BLOCKED
- CLASSIFIED active output: BLOCKED
- fixture/baseline/product promotion: BLOCKED
- Daumas used as factual source: NO
- synthetic-real blending: NO

