# SERA Engine vNext Non-Selected Real Events Use Register A4R124 v0.2.0

Status: NON_SELECTED_EVENTS_USE_REGISTER
Phase: A4+R-124
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM

## Objetivo
Responder explicitamente como os eventos não consolidados serão utilizados nas próximas fases, sem descarte indevido.

## Categorias de governança (ativas)
- REWORK_REQUIRED
- HOLD_OVERCLASSIFICATION_RISK
- HELD_SOURCE_INSUFFICIENT
- HELD_TECHNICAL_DOMINANT
- BOUNDARY_ONLY
- SOURCE_RECHECK_REQUIRED
- REDUNDANT_OR_DEFERRED
- METHOD_SCOPE_BOUNDARY
- FUTURE_CANDIDATE

| eventId | currentCategory | whyNotReferencePositiveNow | futureUse | reopenCondition | caution |
|---|---|---|---|---|---|
| ATLAS-3591 | REWORK_REQUIRED | A-axis ainda frágil e sensível a escopo multi-actor, apesar de patch | Boundary training P-F/P-G + possível retorno como trace forte | Refinar actor scope e reduzir incerteza A-axis | Não forçar fechamento por outcome |
| AMERICAN-1420 | REWORK_REQUIRED | Overclassification risk substantivo em P/O/A | Caso de retrace conservador | Retrace com suporte robusto por eixo | Evitar O-C/A-C por inferência ampla |
| ASIANA-214 | HOLD_OVERCLASSIFICATION_RISK | Fechamento full-axis não estável | Boundary case de prudência classificatória | Evidência adicional ou downgrade explícito para unresolved/source-slice | Não converter CFIT em fechamento automático |
| AMERICAN-965 | HOLD_OVERCLASSIFICATION_RISK | Dominância e causal lane ainda ambíguas | Reentrada em lote focado de refinement | Reforço factual por eixo e menor ambiguidade | Evitar reuso de conclusão externa como gabarito |
| HELIOS-522 | HELD_SOURCE_INSUFFICIENT | Lacuna de source/scope e tensão de actor capability | Caso valioso para capability boundary | Fonte robusta + escopo de actor claramente delimitado | O-axis pode requerer UNRESOLVED |
| USAIR-427 | HELD_TECHNICAL_DOMINANT | Dominância técnica (PCU/rudder) com janela humana limitada | Anchor técnico de limite metodológico | Nova evidência material de janela efetiva humana | Não forçar falha humana dominante |
| TUROY EC225 | BOUNDARY_ONLY | Predominância técnica com suporte humano insuficiente para closure | Boundary technical-dominant | Evidência nova com lane humana sustentável | Evitar confundir nominal crew with human failure |
| KOREAN-801 | BOUNDARY_ONLY | P-only/boundary no estado atual sem O/A estável | Boundary O-B/O-C + expansão O/A futura | Source-slice expansion dedicada para O/A | Alto risco de over-O |
| EASTERN-401 old HOLD_OCR_REQUIRED | REDUNDANT_OR_DEFERRED | Hold antigo foi superseded em A4R121/A4R122 | Histórico de governança (referência de recuperação) | N/A (já reaberto) | Manter caveat de legibilidade ativa |
| EXECUFLIGHT-1526 | REDUNDANT_OR_DEFERRED | Opus Batch 2; não executado no ciclo A4R119 | Forte candidato O-axis para próximo lote real | Ativação do batch 2 em fase dedicada | Não colidir com lanes já estabilizadas sem QA |
| EC225-NORTH-SEA | HELD_TECHNICAL_DOMINANT | Fronteira nominal vs technical-dominant ainda sensível | Boundary comparativo com Turøy/Cougar | Definição explícita de critério técnico-dominante | Não promover nominal sem teste adversarial |
| CROSSAIR-3597 | FUTURE_CANDIDATE | Deferido por priorização de lote, não por descarte | Candidato forte O/A para lote futuro | Ativação formal do batch 2 + QA | O-B/O-C precisa disciplina de evidência |
| COUGAR-S92A | METHOD_SCOPE_BOUNDARY | Rotorcraft technical-dominant com risco de sobre-estruturação causal | Boundary de escopo e dominância técnica | Critério metodológico de aplicabilidade por escopo | Evitar equivalência automática com fixed-wing lanes |
| PINNACLE-3701 | FUTURE_CANDIDATE | Deferido em batch 3/boundary por sequenciamento | Candidato O-axis de violação/intenção | Ativação de boundary lane com QA forte | Alto risco O-B vs O-C |
| FIRST-AIR-6560 | FUTURE_CANDIDATE | Deferido em batch 3 apesar de potencial recuperado | Candidato P/A de GPWS/feedback timing | Ativação de recovered lane dedicada | Sensível a P-F/P-G e A feedback timing |
| AIR-CANADA-624 | REDUNDANT_OR_DEFERRED | Opus marcou como redundante no momento | Pode voltar como comparador com UPS/EXECUFLIGHT | Necessidade explícita de comparação incremental | Evitar duplicação sem ganho metodológico |
| SWISSAIR-111 | FUTURE_CANDIDATE | Não priorizado no lote A4R119 apesar de sinal alto | Candidato multi-axis de alta densidade | Janela de execução para full-axis adicional | P-axis pode exigir cautela por smoke/incapacitation |
| AS350-GRIFFITH | METHOD_SCOPE_BOUNDARY | Escopo single-pilot light helicopter desafia aplicabilidade direta | Caso de limite de método | Critério de aplicabilidade + actor scope formal | Evitar overfitting de árvore em contexto limite |
| ORNGE-S76A | SOURCE_RECHECK_REQUIRED | Recovered lane ainda sem ativação de trace no ciclo | Futuro candidato rotorcraft (night/HEMS) | Recheck de suficiência factual para full-axis | P-F/P-G noturno com alto risco de ambiguidade |
| SHK-EMS-2020 | SOURCE_RECHECK_REQUIRED | Fonte heterogênea e ainda não estabilizada em trace lane | Futuro candidato A-axis em contexto EMS | Recheck de source strength + QA de aplicabilidade | Não tratar diversidade geográfica como evidência suficiente |
| SHK-UTILITY-2023 | METHOD_SCOPE_BOUNDARY | Contexto utility/light-helicopter com risco de extrapolação | Candidato para lane nominal/adversarial de escopo | Definir limites de aplicabilidade e qualidade de fonte | Evitar fechamento nominal por documentação limitada |

## Nota
Não selecionado para consolidação positiva agora não significa descarte. Significa lane de uso diferente com critério de reabertura explícito.
