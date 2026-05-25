# SERA Engine vNext Real Event Reference Set Consolidation A4R123 v0.2.0

Status: REAL_EVENT_SET_CONSOLIDATED
Phase: A4+R-123
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM

## Objetivo
Consolidar o conjunto real estável `review-ready/warning-bound` após A4R122, preservando governança de draft, warnings obrigatórios e dependência de author review.

## Escopo consolidado (6 eventos)
1. UPS-1354
2. COLGAN-3407
3. US-AIRWAYS-1549
4. UNITED-173
5. UNITED-232
6. EASTERN-401

## Tabela consolidada obrigatória
| eventId | status | P draft | O draft | A draft | strongestUse | warning | bundleEligibility | sourceStatus |
|---|---|---|---|---|---|---|---|---|
| UPS-1354 | PASS_WITH_LIMITATIONS + OPUS_DOUBLE_COUNTING_WARNING_ACTIVE | P-F (P-G boundary live) | O-D | A-F (A-G boundary live) | Anchor O-D com controle rigoroso de double-counting P/A | UPS-E5 não pode ser usado como chave única para P/O/A; rationale por eixo é obrigatório | FUTURE_AUTHOR_REVIEW_WITH_WARNINGS | Official NTSB AAR-14/02 local TXT/PDF, usable |
| COLGAN-3407 | PASS_WITH_LIMITATIONS (A REVIEW_REQUIRED boundary) | P-G | O-A | A-F (A-E boundary live) | Anchor P-G com bom contraste entre percepção e resposta em estol | A-axis ainda boundary-live (A-F/A-E), não fechar por outcome | FUTURE_AUTHOR_REVIEW_WITH_WARNINGS | Official NTSB AAR-10/01 local TXT/PDF, usable |
| US-AIRWAYS-1549 | PASS_WITH_LIMITATIONS (nominal lane) | P-A | O-A | A-A | Anchor nominal robusto para P/O/A sob emergência real | Manter caveat non-dominant em pontos secundários (ex.: configuração/airspeed) sem forçar reclassificação | FUTURE_AUTHOR_REVIEW_WITH_WARNINGS | Official NTSB AAR-10/03 local TXT/PDF, usable |
| UNITED-173 | REVIEW_REQUIRED + KEEP_FOR_FUTURE_AUTHOR_REVIEW_WITH_OCR_WARNING | P-G (P-D boundary live) | O-D | A-F (A-G boundary live) | Anchor O-D forte em continuidade operacional com degradação de risco | OCR/source quality caveat obrigatório; leitura de sequência fuel/gear/callouts exige cautela | FUTURE_AUTHOR_REVIEW_WITH_WARNINGS | Official NTSB TXT com caveat OCR, usable-with-caution |
| UNITED-232 | PASS_WITH_LIMITATIONS + DISPLAY_WARNING_REQUIRED | P-A | O-A | A-A | Anchor nominal/adversarial sob falha técnica catastrófica | Não usar outcome catastrófico para forçar downgrade; não usar hero narrative como evidência | FUTURE_AUTHOR_REVIEW_WITH_WARNINGS | Official NTSB AAR-90/06 local TXT/PDF, strong |
| EASTERN-401 | REVIEW_AFTER_MINOR_PATCH_APPLIED + READY_WITH_WARNINGS | P-G (P-F boundary live) | O-D (O-A early-phase alternative) | A-C draft plausível (A-F/A-G boundary live) | Anchor P-G + O-D com controle explícito de temporal framing e double-counting P/A | LEGACY_SCAN_LIMITED_LEGIBILITY; A-axis permanece review-sensitive | FUTURE_AUTHOR_REVIEW_WITH_WARNINGS | Official FAA-hosted NTSB AAR-73-14 TXT recovered, usable-with-legibility-limits |

## Motivo de inclusão no conjunto consolidado
- Cada caso adiciona utilidade metodológica distinta para cobertura P/O/A.
- O conjunto combina lanes nominais (P-A/O-A/A-A) e não nominais (P-F/P-G, O-D, A-F/A-C boundary-live).
- Todos os eventos estão com governança de warning/caveat explícita, sem promoção indevida.

## Motivo de não ser release
- Todos os casos continuam `CANONICAL_TRACE_DRAFT`.
- Não há decisão autoral registrada nesta fase.
- Não há fechamento final P/O/A para release.
- Não há release/downstream.

## Dependência de author review
Este conjunto consolidado permanece dependente de author review em fase futura dedicada. A4R123 não registra aprovação autoral nem conversão para artefato de release.
