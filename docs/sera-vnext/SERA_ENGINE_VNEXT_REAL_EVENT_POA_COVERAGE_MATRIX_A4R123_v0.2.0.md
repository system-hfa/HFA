# SERA Engine vNext Real Event POA Coverage Matrix A4R123 v0.2.0

Status: REAL_EVENT_POA_COVERAGE_CONSOLIDATED
Phase: A4+R-123
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM

## Escopo
Cobertura P/O/A consolidada apenas com os 6 eventos reais `review-ready/warning-bound` após A4R122.

Eventos considerados:
- UPS-1354
- COLGAN-3407
- US-AIRWAYS-1549
- UNITED-173
- UNITED-232
- EASTERN-401

## Leaves P observados no conjunto
| P leaf | eventos | força atual |
|---|---|---|
| P-A | US-AIRWAYS-1549, UNITED-232 | forte (nominal lane estabilizada) |
| P-F | UPS-1354 (primário), EASTERN-401 (boundary live) | médio (depende de boundary adjudication em parte do conjunto) |
| P-G | COLGAN-3407, UNITED-173, EASTERN-401 | forte (com caveats de source quality em UNITED-173/EASTERN-401) |

## Leaves O observados no conjunto
| O leaf | eventos | força atual |
|---|---|---|
| O-A | COLGAN-3407, US-AIRWAYS-1549, UNITED-232 | forte (nominal/managed-risk lane) |
| O-D | UPS-1354, UNITED-173, EASTERN-401 | forte (non-violation intent-failure lane com warnings explícitos) |

## Leaves A observados no conjunto
| A leaf | eventos | força atual |
|---|---|---|
| A-A | US-AIRWAYS-1549, UNITED-232 | forte (nominal/adversarial lane) |
| A-F | UPS-1354, UNITED-173, COLGAN-3407 (com A-E live) | médio/forte (com boundary sensitivity em COLGAN-3407) |
| A-C | EASTERN-401 (plausível, boundary-live) | fraco/médio (não dominante limpo) |

## Leaves ausentes ou fracos no conjunto real consolidado
### Percepção
- Ausentes no set consolidado: P-B, P-C, P-D, P-E, P-H.
- Fracos/boundary: P-F fora de UPS-1354 e P-G dependente de warnings em casos com OCR/legibilidade.

### Objetivo
- Ausentes no set consolidado: O-B, O-C.
- Observação: ausência é coerente com postura conservadora atual para evitar overclassification por cultura/violação sem evidência direta.

### Ação
- Ausentes no set consolidado: A-B, A-D, A-E (apenas boundary live em COLGAN-3407), A-G (boundary live), A-H, A-I, A-J.
- Fracos/boundary: A-C (EASTERN-401) e A-F em parte dos casos com alternativas ativas.

## Lacunas a cobrir por eventos reais futuros
- Cobertura robusta de P-D/P-E com evidência clara de pressão temporal e distinção entre atenção vs gerenciamento do tempo.
- Cobertura real de A-E/A-G com evidência observável separando seleção inadequada de falha de feedback.
- Casos reais adicionais para A-B/A-D quando houver base factual suficientemente limpa.

## Lacunas candidatas para eventos modelo sintéticos
- P-B, P-C, P-H (baixa disponibilidade real com evidência suficientemente nítida no set atual).
- O-B e O-C em cenários metodologicamente controlados sem forçar violação por outcome.
- A-H/A-I/A-J para fronteiras de pressão temporal explícita e diferenciação fina de feedback/seleção.

## Nota de governança
Esta matriz não reabre traces, não altera códigos de draft e não cria fechamento release. É consolidação de cobertura já documentada.
