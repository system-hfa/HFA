# SERA Engine vNext Real Event Reference Set Consolidation A4R123 v0.2.0

Status: REAL_EVENT_SET_CONSOLIDATED
Phase: A4+R-123
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM

## Objetivo
Consolidar o conjunto real estável para lane autoral, preservando governança de draft, warnings obrigatórios e dependência de author review.

## Escopo consolidado imediato após reconciliação A4R125 (5 eventos)
1. UPS-1354
2. COLGAN-3407
3. US-AIRWAYS-1549
4. UNITED-173
5. UNITED-232

Evento temporariamente fora do lane imediato:
- EASTERN-401 (`REVIEW_AFTER_ESCAPE_POINT_PATCH`)

## Tabela consolidada obrigatória
| eventId | status | P draft | O draft | A draft | strongestUse | warning | bundleEligibility | sourceStatus |
|---|---|---|---|---|---|---|---|---|
| UPS-1354 | PASS_WITH_LIMITATIONS + OPUS_DOUBLE_COUNTING_WARNING_ACTIVE | P-G (P-F boundary live) | O-D | A-F (A-G boundary live) | Anchor O-D com P-G baseado em informação disponível/correta não integrada | UPS-E5 não pode ser usado como chave única para P/O/A; rationale por eixo e warning de escape-point são obrigatórios | FUTURE_AUTHOR_REVIEW_WITH_WARNINGS | Official NTSB AAR-14/02 local TXT/PDF, usable |
| COLGAN-3407 | PASS_WITH_LIMITATIONS (A REVIEW_REQUIRED boundary) | P-G | O-A | A-F (A-E boundary live) | Anchor P-G com bom contraste entre percepção e resposta em estol | A-axis ainda boundary-live (A-F/A-E), não fechar por outcome | FUTURE_AUTHOR_REVIEW_WITH_WARNINGS | Official NTSB AAR-10/01 local TXT/PDF, usable |
| US-AIRWAYS-1549 | PASS_WITH_LIMITATIONS (nominal lane) | P-A | O-A | A-A | Anchor nominal robusto para P/O/A sob emergência real | Manter caveat non-dominant em pontos secundários (ex.: configuração/airspeed) sem forçar reclassificação | FUTURE_AUTHOR_REVIEW_WITH_WARNINGS | Official NTSB AAR-10/03 local TXT/PDF, usable |
| UNITED-173 | REVIEW_REQUIRED + KEEP_FOR_FUTURE_AUTHOR_REVIEW_WITH_OCR_WARNING | P-G (P-D boundary live) | O-D | A-F (A-G boundary live) | Anchor O-D forte em continuidade operacional com degradação de risco | OCR/source quality caveat obrigatório; leitura de sequência fuel/gear/callouts exige cautela | FUTURE_AUTHOR_REVIEW_WITH_WARNINGS | Official NTSB TXT com caveat OCR, usable-with-caution |
| UNITED-232 | PASS_WITH_LIMITATIONS + DISPLAY_WARNING_REQUIRED | P-A | O-A | A-A | Anchor nominal/adversarial sob falha técnica catastrófica | Não usar outcome catastrófico para forçar downgrade; não usar hero narrative como evidência | FUTURE_AUTHOR_REVIEW_WITH_WARNINGS | Official NTSB AAR-90/06 local TXT/PDF, strong |
| EASTERN-401 | REVIEW_AFTER_ESCAPE_POINT_PATCH + NOT_READY_PENDING_ESCAPE_POINT_PATCH | P-G draft hypothesis (P-F boundary live) | O-D draft hypothesis (O-A early-phase alternative) | A-C draft plausível (A-F/A-G boundary live) | Caso útil para P-G/O-D, mas sensível à separação pré/pós ponto de fuga | LEGACY_SCAN_LIMITED_LEGIBILITY + pre/post escape evidence split pendente | REMOVED_PENDING_ESCAPE_POINT_PATCH | Official FAA-hosted NTSB AAR-73-14 TXT recovered, usable-with-legibility-limits |

## Motivo de inclusão no conjunto consolidado
- Cada caso adiciona utilidade metodológica distinta para cobertura P/O/A.
- O conjunto imediato combina lanes nominais (P-A/O-A/A-A) e não nominais (P-G, O-D, A-F) com warnings explícitos.
- Todos os eventos estão com governança de warning/caveat explícita, sem promoção indevida.

## Supersession note (A4R125)
- UPS-1354 percepção corrigida de `P-F` para `P-G` por revisão autoral/metodológica.
- EASTERN-401 removido temporariamente do lane imediato até patch de separação de evidência `preEscapeEvidence`/`postEscapeEvidence`.
- Total imediato de eventos `review-ready/warning-bound` para lane autoral: 5.

## Motivo de não ser release
- Todos os casos continuam `CANONICAL_TRACE_DRAFT`.
- Não há decisão autoral registrada nesta fase.
- Não há fechamento final P/O/A para release.
- Não há release/downstream.

## Dependência de author review
Este conjunto consolidado permanece dependente de author review em fase futura dedicada. A4R123 não registra aprovação autoral nem conversão para artefato de release.
