# SERA Engine vNext PDF24 Real Event Corpus Inventory A4R71 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-71 — Real Event Corpus Expansion from Uploaded pdf24 Set  
NO_CLASSIFICATION  
NO_RELEASED_CODE  
NO_DOWNSTREAM  
NO_FIXTURE  
NO_BASELINE

## Objetivo
Inventariar fontes de eventos reais disponíveis nos PDFs `pdf24_merged*.pdf` e no corpus local para ampliar a amostra real-event antes de nova rodada de extração estruturada.

## Decisão O-E
- `O-E = NON_EXISTENT_IN_SERA_PT_V1`.
- Eixo Objective ativo: `O-A`, `O-B`, `O-C`, `O-D`.
- Qualquer menção a `O-E` deve ser tratada apenas como guardrail negativo/adversarial para bloquear uso indevido e impedir fallback automático para `O-A`.

## Fontes verificadas
| sourceName | localPath | availableLocal | pagesApprox | contentType | eventRichness | helicopterRelevant | offshoreRelevant | extractionQuality | candidateUse |
|---|---|---|---|---|---|---|---|---|---|
| pdf24_merged.pdf | /Users/filipedaumas/Downloads/pdf24_merged.pdf | yes | 496 | accident reports/bulletins + artigos técnicos | HIGH | partial | partial | PARTIAL | fonte forte para eventos de automação/aproximação e casos offshore selecionados |
| pdf24_merged-2.pdf | /Users/filipedaumas/Downloads/pdf24_merged-2.pdf | yes | 185 | miscelânea de segurança/accident commentary + trechos investigativos | MEDIUM | yes | partial | PARTIAL | útil para triagem de eventos helicóptero e barreiras técnicas |
| pdf24_merged-3.pdf | /Users/filipedaumas/Downloads/pdf24_merged-3.pdf | yes | 2956 | AAIB bulletins + material investigativo extenso | HIGH | yes | partial | GOOD | principal fonte para expansão de casos reais com locator por boletim/seção |
| pdf24_merged-5.pdf | /Users/filipedaumas/Downloads/pdf24_merged-5.pdf | yes | 2364 | SMS/risk/metodologia + conteúdo misto de acidentes | MEDIUM | partial | partial | PARTIAL | usar com filtro forte para separar evento factual de conteúdo normativo |
| pdf24_merged-6.pdf | /Users/filipedaumas/Downloads/pdf24_merged-6.pdf | yes | 1669 | dissertações/artigos + conteúdo misto | LOW | partial | partial | PARTIAL | usar apenas quando houver locator factual claro de evento |
| pdf24_merged-7.pdf | /Users/filipedaumas/Downloads/pdf24_merged-7.pdf | yes | 3703 | HFACS/guia metodológico + conteúdo misto | MEDIUM | partial | partial | PARTIAL | útil para localizar casos, sem importar taxonomia HFACS como saída SERA |
| pdf24_merged-8.pdf | /Users/filipedaumas/Downloads/pdf24_merged-8.pdf | yes | 1483 | artigos técnicos (incluindo offshore não aeronáutico) + miscelânea | LOW | partial | yes | PARTIAL | baixa prioridade para extração real-event aeronáutica |
| real-event-harvest docs | /Users/filipedaumas/SAAS/HFA/docs/real-event-harvest | yes | n/a | índices e deep extraction textual já estruturados | HIGH | yes | yes | GOOD | fonte principal de candidate rows e locator inicial |
| ACCIDENTS directory | /Users/filipedaumas/SAAS/HFA/ACCIDENTS | no | n/a | n/a | NONE | n/a | n/a | UNKNOWN | `UPLOADED_IN_CHAT_ONLY_OR_NOT_LOCAL` para este diretório |
| metodologia docs | /Users/filipedaumas/SAAS/HFA/metodologia | yes | n/a | metodologia/human factors (não corpus de eventos primário) | LOW | partial | partial | GOOD | suporte metodológico, não base principal de novos candidatos |
| reference text corpus | /Users/filipedaumas/SAAS/HFA/docs/reference | yes | n/a | texto extraído (Hendy/Daumas) | LOW | partial | partial | GOOD | suporte metodológico e lexical, não fonte de novos eventos |

## PDFs referenciados e status físico
- PDFs referenciados em `docs/real-event-harvest/*` agora foram localizados localmente em `/Users/filipedaumas/Downloads/`.
- Ainda não existe cópia controlada desses PDFs dentro do repositório (`docs/sera-vnext/source-corpus/pdf24/` não populado nesta fase).
- Fontes já com texto extraído no repo: `docs/reference/hendy-sera-2003.txt`, `docs/reference/daumas-sera-offshore.txt` e arquivos de `docs/real-event-harvest/*.md`.

## Eventos candidatos identificados (20)
| candidateId | sourceFile | sourceLocator | aircraft/operation | eventType | factualAnchor | whyRelevantToSERA | extractionPriority | expectedDifficulty | sourceQuality | notes |
|---|---|---|---|---|---|---|---|---|---|---|
| PDF24-CAND-001 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | row `REAL-EVENT-0003` | S-76C+ / night approach | near-CFIT / LOC trend | perda de controle em aproximação noturna | fronteira P (percepção visual) vs A (controle) | P1 | MEDIUM | HIGH | novo candidato |
| PDF24-CAND-002 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | row `REAL-EVENT-0005` | S-76++ / offshore helideck | tumble near touchdown | evento multi-ator em toque | coordenação PF/PM e handover sob carga | P1 | HIGH | MEDIUM | novo candidato |
| PDF24-CAND-003 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | row `REAL-EVENT-0007` | S-76C+ / offshore transport | control pushrod separation | falha mecânica dominante | evita forçar erro humano ativo em unsafe-condition | P2 | MEDIUM | HIGH | novo candidato |
| PDF24-CAND-004 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | row `REAL-EVENT-0008` | S-76C+ / helicopter operation | servo pushrod/rod-end separation | degradação de sistema de controle | fronteira condição técnica vs resposta operacional | P2 | MEDIUM | HIGH | novo candidato |
| PDF24-CAND-005 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | row `REAL-EVENT-0009` | S-76C++ / offshore cruise | bird strike + windshield penetration | emergência após barreira degradada | comunicação/coordenação em emergência e barreiras | P2 | MEDIUM | HIGH | novo candidato |
| PDF24-CAND-006 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | row `REAL-EVENT-0010` | S-76C++ / helideck landing | helideck rollover | pouso/reposition com vento | P/A + coordenação em ambiente offshore | P1 | MEDIUM | HIGH | novo candidato |
| PDF24-CAND-007 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | row `REAL-EVENT-0011` | S-76C+ / ground taxi | landing gear collapse | choque com pothole e colapso trem | separação hazard de infraestrutura vs ação de voo | P2 | LOW | MEDIUM | novo candidato |
| PDF24-CAND-008 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | row `REAL-EVENT-0013` | S-76 / offshore en route | autorotation to water | perda de pressão óleo/transmissão | condição técnica + resposta de emergência | P1 | HIGH | MEDIUM | novo candidato |
| PDF24-CAND-009 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | row `REAL-EVENT-0014` | S-76 / offshore departure | post-takeoff ditching report | sequência factual insuficiente | caso útil para triage/source-quality controlado | P3 | HIGH | LOW | novo candidato, provável source-enrichment only |
| PDF24-CAND-010 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | row `REAL-EVENT-0015` | S-76B / offshore approach | platform approach accident | limitação de visibilidade em aproximação | fronteira P/O/A em ambiente offshore | P1 | MEDIUM | MEDIUM | novo candidato |
| PDF24-CAND-011 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | row `REAL-EVENT-0016` | Cessna 500 / private IFR | automation confusion + LOC | confusão Garmin/autopilot | caso adversarial fora de helicóptero para P/A | P1 | MEDIUM | HIGH | novo candidato |
| PDF24-CAND-012 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | row `REAL-EVENT-0017` | A320 / commercial | AAIB correspondence | ocorrência listada em boletim | diversidade de domínio e teste de triagem factual | P3 | HIGH | LOW | novo candidato |
| PDF24-CAND-013 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | row `REAL-EVENT-0018` | B737 / commercial | AAIB correspondence | ocorrência listada em boletim | diversidade de domínio e triage | P3 | HIGH | LOW | novo candidato |
| PDF24-CAND-014 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | row `REAL-EVENT-0019` | Pembroke / GA-historic | AAIB correspondence | ocorrência listada em boletim | teste de limiar mínimo de factual anchor | P3 | HIGH | LOW | novo candidato |
| PDF24-CAND-015 | REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | row `REAL-EVENT-0020` | Cessna P210N / GA | AAIB correspondence | ocorrência listada em boletim | triage conservador com baixa granularidade | P3 | HIGH | LOW | novo candidato |
| PDF24-CAND-016 | REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | row `REAL-EVENT-0036` | A320 family / commercial | unstable approach candidate | placeholder de fonte pendente | útil para expansão futura se source anchor for confirmado | P3 | HIGH | PARTIAL | source enrichment only |
| PDF24-CAND-017 | REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | row `REAL-EVENT-0037` | TBD | TAWS/EGPWS response candidate | placeholder de fonte pendente | potencial fronteira P (warning) vs A (response) | P3 | HIGH | PARTIAL | source enrichment only |
| PDF24-CAND-018 | REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | row `REAL-EVENT-0038` | TBD | checklist omission candidate | placeholder de fonte pendente | potencial fronteira A (execução/feedback) | P3 | HIGH | PARTIAL | source enrichment only |
| PDF24-CAND-019 | REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | row `REAL-EVENT-0039` | TBD | crew coordination/authority gradient | placeholder HFACS corpus | útil como busca factual multi-ator sem importar HFACS | P3 | HIGH | PARTIAL | source enrichment only |
| PDF24-CAND-020 | REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | row `REAL-EVENT-0040` | TBD | insufficient-evidence case | explicitamente low-evidence | necessário para testar comportamento conservador de recusa | P3 | MEDIUM | PARTIAL | triage/metodologia de incerteza |

## Critérios de seleção
- sequência factual mínima identificável no índice ou fonte associada;
- ator operacional ou condição operacional identificável;
- possibilidade de definir unsafe state candidate em extração futura;
- utilidade metodológica para fronteiras P/O/A sem classificar nesta fase;
- variedade de fronteiras: percepção/atenção, objetivo, ação/feedback, comunicação/coordenação, automação/sistema, meteorologia/visibilidade, offshore/helicóptero e triage source-partial.

## Critérios de exclusão
- artigo puramente teórico sem evento específico;
- documento SMS/risk sem narrativa factual de evento;
- duplicata sem ganho metodológico sobre caso já catalogado;
- evento sem sequência factual mínima;
- evento sem ator/condição operacional mínima;
- fonte com qualidade baixa demais para extração confiável.

## Relação com os 5 casos já usados
| legacyCase | originalCandidateId | statusNoA4R71 |
|---|---|---|
| 001 Thebaud | REAL-EVENT-0001 | alreadyInSample |
| 002 Peasmarsh | REAL-EVENT-0002 | alreadyInSample |
| 003 Vigo | REAL-EVENT-0004 | alreadyInSample |
| 004 5N-BQJ | REAL-EVENT-0006 | alreadyInSample |
| 005 HL9661 | REAL-EVENT-0028 | alreadyInSample |

Regras aplicadas:
- esses cinco casos não foram adicionados como novos candidatos nesta expansão;
- quando reaparecem em índices PDF24, permanecem apenas como referência de rastreabilidade.
