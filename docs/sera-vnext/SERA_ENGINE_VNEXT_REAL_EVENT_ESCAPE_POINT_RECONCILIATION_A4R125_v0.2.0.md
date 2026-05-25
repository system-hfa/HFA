# SERA Engine vNext Real Event Escape Point Reconciliation A4R125 v0.2.0

Status: ESCAPE_POINT_RECONCILIATION_RECORDED
Phase: A4+R-125
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM

## Principle
A classificação SERA deve ser ancorada na janela pré-ponto de fuga (ou na janela em que ainda havia recuperação operacional viável). Classificação retrospectiva por outcome é proibida.

## Mandatory rule
Quando o caso for sensível ao ponto de fuga, a evidência deve ser separada em:
- `preEscapeEvidence`
- `postEscapeEvidence`

Se um eixo depender apenas de evidência pós-fuga, o eixo deve ser rebaixado para `UNRESOLVED` ou mantido como boundary até patch.

## Reconciliation table
| eventId | escapePointRisk | decision | requiredPatch | bundleEffect |
|---|---|---|---|---|
| UPS-1354 | MEDIUM | KEEP_WITH_CORRECTION | Corrigir P para `P-G`; manter O-D/A-F; reforçar warning de escape-point e de double-counting | permanece no conjunto imediato com warning |
| COLGAN-3407 | LOW | KEEP | explicitar janela de escape já utilizada no trace | sem remoção |
| US-AIRWAYS-1549 | LOW | KEEP | sem patch estrutural obrigatório | sem remoção |
| UNITED-173 | LOW_MEDIUM | KEEP | manter janela de escape explícita e caveat OCR ativo | sem remoção |
| UNITED-232 | LOW | KEEP | manter display warning nominal/adversarial | sem remoção |
| EASTERN-401 | HIGH | DOWNGRADE_PENDING_PATCH | separar formalmente `preEscapeEvidence` e `postEscapeEvidence`; revalidar P-G/O-D/A-C sob ancoragem pré-fuga | removido temporariamente do bundle |

## Immediate governance outcome
- Lane autoral imediato passa de 6 para 5 eventos.
- EASTERN-401 não é descartado; fica em `REVIEW_AFTER_ESCAPE_POINT_PATCH` até reconciliação de evidência pré/pós-fuga.
- Nenhum release, nenhum downstream, nenhuma decisão final P/O/A.
