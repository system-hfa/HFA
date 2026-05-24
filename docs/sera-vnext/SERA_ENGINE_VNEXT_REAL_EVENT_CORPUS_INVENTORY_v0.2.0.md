# SERA Engine vNext Real Event Corpus Inventory v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-61 — Real Event Corpus Inventory + Sample Selection

## Objetivo
Inventariar documentos/corpora com potencial de eventos reais analisáveis no repositório HFA/SERA e selecionar uma amostra inicial de casos candidatos para extração estruturada futura, sem executar classificação SERA nesta fase.

## Escopo
- Mapear documentos potencialmente úteis para eventos reais/compilados.
- Classificar utilidade documental para corpus de eventos.
- Selecionar 10–15 casos candidatos para próxima fase de extração estruturada.

## Fora de escopo
- Classificação SERA P/O/A completa.
- Criação de fixture oficial.
- Alteração de baseline.
- Promoção para consensus reference.
- Qualquer abertura downstream.

## Lista de documentos localizados
- `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_1_v0.1.4.md`
- `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_v0.1.4.md`
- `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_SOURCE_QUALITY_REVIEW_v0.1.4.md`
- `docs/real-event-harvest/REAL_EVENT_FACTUAL_HARVEST_BATCH_1_v0.1.4.md`
- `docs/real-event-harvest/REAL_EVENT_DEEP_EXTRACTION_0001_0002_v0.1.4.md`
- `docs/real-event-harvest/REAL_EVENT_DEEP_EXTRACTION_0003_0004_0006_v0.1.4.md`
- `docs/real-event-harvest/REAL_EVENT_DEEP_EXTRACTION_BATCH_2_SOURCE_READY_v0.1.4.md`
- `docs/real-event-harvest/REAL_EVENT_CANDIDATE_DRAFTS_0001_0002_v0.1.4.md`
- `docs/reference/daumas-sera-offshore.txt`
- `docs/reference/hendy-sera-2003.txt`
- `metodologia/Dissertação - Filipe Daumas - ANÁLISE DE FATORES HUMANOS EM INCIDENTES NA AVIAÇÃO OFFSHORE.pdf`
- `metodologia/A-tool-for-human-factors-accident-invest-classification-risk-management-K-C-Hendy.pdf`
- `backend/app/sera/documents/Example.pdf`
- `backend/app/sera/documents/SERA.pdf`
- referências textuais para `pdf24_merged*.pdf` dentro dos índices de eventos (arquivos físicos não localizados nesta fase)

## Tabela de classificação dos documentos
| path | type | candidate corpus? | estimated cases/events | extraction status | recommended use | notes |
|---|---|---|---:|---|---|---|
| `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_1_v0.1.4.md` | md | yes | 20 | TEXT_READY | source corpus | índice explícito `REAL-EVENT-0001..0020` |
| `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_v0.1.4.md` | md | yes | 20 | TEXT_READY | source corpus | índice explícito `REAL-EVENT-0021..0040` |
| `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_SOURCE_QUALITY_REVIEW_v0.1.4.md` | md | partial | 20 (metadados de qualidade) | TEXT_READY | source corpus (quality filter) | útil para filtrar placeholders/baixa confiança |
| `docs/real-event-harvest/REAL_EVENT_FACTUAL_HARVEST_BATCH_1_v0.1.4.md` | md | yes | 5 (0001/0002/0003/0004/0006) | TEXT_READY | source corpus | factual harvest inicial já estruturado |
| `docs/real-event-harvest/REAL_EVENT_DEEP_EXTRACTION_0001_0002_v0.1.4.md` | md | yes | 2 | TEXT_READY | source corpus | extração profunda para amostra inicial |
| `docs/real-event-harvest/REAL_EVENT_DEEP_EXTRACTION_0003_0004_0006_v0.1.4.md` | md | yes | 3 | TEXT_READY | source corpus | extração profunda para eventos batch 1 |
| `docs/real-event-harvest/REAL_EVENT_DEEP_EXTRACTION_BATCH_2_SOURCE_READY_v0.1.4.md` | md | yes | 4 (0021/0022/0024/0026) | TEXT_READY | source corpus | batch 2 source-ready |
| `docs/real-event-harvest/REAL_EVENT_CANDIDATE_DRAFTS_0001_0002_v0.1.4.md` | md | partial | 2 | TEXT_READY | methodology/reference | contém drafts de candidato; não usar como fixture/baseline |
| `docs/reference/daumas-sera-offshore.txt` | txt | unknown | unknown | TEXT_READY | methodology reference | referência extensa; não indexada por evento |
| `docs/reference/hendy-sera-2003.txt` | txt | unknown | unknown | TEXT_READY | methodology reference | referência canônica/metodológica |
| `metodologia/Dissertação - Filipe Daumas - ANÁLISE DE FATORES HUMANOS EM INCIDENTES NA AVIAÇÃO OFFSHORE.pdf` | pdf | partial | unknown | TEXT_EXTRACTION_POSSIBLE | methodology reference / possible source corpus | texto extraível; exige triagem específica por evento |
| `metodologia/A-tool-for-human-factors-accident-invest-classification-risk-management-K-C-Hendy.pdf` | pdf | no | unknown | TEXT_EXTRACTION_POSSIBLE | methodology reference | documento teórico/metodológico |
| `backend/app/sera/documents/Example.pdf` | pdf | no | unknown | TEXT_EXTRACTION_POSSIBLE | not event corpus | documento de exemplo/sintético |
| `backend/app/sera/documents/SERA.pdf` | pdf | no | unknown | TEXT_EXTRACTION_POSSIBLE | methodology reference | réplica de conteúdo metodológico |
| `pdf24_merged*.pdf` (referenciados em índices) | pdf | unknown | unknown | TEXT_EXTRACTION_NEEDED | source corpus (future check) | arquivos físicos não localizados no repositório nesta fase |

## Critérios para documento entrar no corpus
- Contém relato/evento/caso analisável.
- Permite extrair `factualSummary` sem inferência causal automática.
- Contém indícios mínimos de contexto operacional.
- Não é apenas texto teórico/metodológico puro.
- Não é apenas referência Risk/SMS sem evento.
- Não exige OCR pesado imediato, ou fica marcado explicitamente para fase futura.

## Critérios de exclusão
- Documento puramente teórico.
- Manual/risk/SMS sem casos de evento.
- Duplicado relevante sem ganho factual.
- Texto insuficiente para localizar evento.
- Origem incerta demais para extração factual.
- PDF sem extração textual útil nesta fase.

## Initial candidate sample

| sampleId | source document | source locator/page/section | short label | why selected | expected extraction difficulty | expected methodological value | not yet classified |
|---|---|---|---|---|---|---|---|
| SAMPLE-001 | `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_1_v0.1.4.md` | Section `4. Batch 1 event index`, row `REAL-EVENT-0001` | S-92A Thebaud approach descent | evento offshore com sequência operacional clara e warning response | MEDIUM | cobertura de contexto offshore + barreiras operacionais | true |
| SAMPLE-002 | `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_1_v0.1.4.md` | Section `4`, row `REAL-EVENT-0002` | S-76 Peasmarsh night go-around | caso forte para ambiente degradado/continuação de plano | MEDIUM | fronteiras percepção/objetivo sob baixa referência visual | true |
| SAMPLE-003 | `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_1_v0.1.4.md` | Section `4`, row `REAL-EVENT-0003` | S-76 Tofino night approach | complementar ao SAMPLE-002 com perfil comparável | MEDIUM | comparação entre eventos similares sem colapsar hipóteses | true |
| SAMPLE-004 | `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_1_v0.1.4.md` | Section `4`, row `REAL-EVENT-0004` | S-76 Vigo SAR low-height | evento com baixa altura e coordenação de tripulação | MEDIUM | comunicação/monitoramento em operação noturna | true |
| SAMPLE-005 | `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_1_v0.1.4.md` | Section `4`, row `REAL-EVENT-0006` | S-76 Bristow Nigeria ditching | caso de automação/interface e checklist reportado | HIGH | fronteiras ação/procedimento/automação com incerteza factual | true |
| SAMPLE-006 | `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_1_v0.1.4.md` | Section `4`, row `REAL-EVENT-0010` | PHI helideck rollover | caso helideck com vento/reposition | MEDIUM | contexto offshore + coordenação em superfície | true |
| SAMPLE-007 | `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_1_v0.1.4.md` | Section `4`, row `REAL-EVENT-0012` | Heli Korea tail rotor strike | cenário multi-actor com ground coordination | HIGH | fronteira comunicação/coordenação e possíveis lacunas de evidência | true |
| SAMPLE-008 | `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_1_v0.1.4.md` | Section `4`, row `REAL-EVENT-0016` | Cessna N8DX automation confusion | caso não-helicóptero para diversidade de domínio | MEDIUM | cobertura de automação/cognição fora do perfil offshore | true |
| SAMPLE-009 | `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_v0.1.4.md` | Section `4. Batch 2 event index`, row `REAL-EVENT-0021` | Cessna N8DX (batch 2) | evento source-ready repetido em batch 2 para checagem de consistência | LOW | verificação de rastreio e consistência documental entre lotes | true |
| SAMPLE-010 | `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_v0.1.4.md` | Section `4`, row `REAL-EVENT-0022` | PHI helideck rollover (batch 2) | evento offshore com boa densidade factual inicial | LOW | cobertura helideck/offshore para futura extração estruturada | true |
| SAMPLE-011 | `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_v0.1.4.md` | Section `4`, row `REAL-EVENT-0024` | Lagos pushrod separation | caso provável de unsafe-condition dominante | HIGH | stress test para evitar inferência indevida de falha humana ativa | true |
| SAMPLE-012 | `docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_v0.1.4.md` | Section `4`, row `REAL-EVENT-0028` | HL9661 tail rotor strike | multi-actor + layout em solo | HIGH | cobertura de coordenação/supervisão e incerteza factual | true |

Resumo da amostra inicial:
- Total selecionado: 12 casos candidatos.
- Status metodológico: todos `not yet classified = true`.
- Uso permitido nesta fase: apenas inventário e preparação de extração factual estruturada.

## Limitações identificadas
- Alguns eventos apontam para `pdf24_merged*.pdf` sem arquivo físico local nesta fase.
- Parte dos casos permanece com `TBD` em paginação/origem fina.
- Há casos com confiança média/baixa no índice que exigirão triagem antes de extração completa.

## Decisões de governança aplicadas
- Nenhum caso foi classificado em P/O/A nesta fase.
- Nenhum caso foi promovido para `CONSENSUS_VALIDATED`.
- Nenhum caso foi convertido em fixture oficial ou baseline.
