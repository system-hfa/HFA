# SERA Engine vNext Batch 3 Selection A4R75 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-75 — Select Batch 3 to Reach 30 Real Events  
NO_CLASSIFICATION  
NO_PROPOSED_CODE  
NO_RELEASED_CODE  
NO_DOWNSTREAM  
NO_FIXTURE  
NO_BASELINE

## Objetivo
Selecionar 15 novos eventos reais para ampliar a amostra total de 15 para 30 eventos antes da próxima rodada de extração estruturada.

## Decisão O-E
- `O-E = NON_EXISTENT_IN_SERA_PT_V1`.
- Eixo Objective ativo: `O-A`, `O-B`, `O-C`, `O-D`.
- Qualquer menção de `O-E` nesta trilha permanece apenas como guardrail negativo/adversarial.

## Racional de seleção
- 15 eventos ainda são insuficientes para inferir estabilidade metodológica robusta (principalmente em diversidade de eixo A e objetivo não-nominal).
- A expansão para 30 aumenta diversidade factual e reduz risco de viés por coleção dominada por poucos padrões.
- A seleção prioriza casos com maior chance de revelar sinais de ação/feedback, decisão operacional, CRM, pressão organizacional e desvios procedimentais.
- A seleção também mantém uma fração de casos `SOURCE_PARTIAL` para teste de comportamento conservador sem forçar overclassification.

## Critérios de inclusão
- sequência factual mínima com anchor textual local;
- ator operacional e/ou condição operacional identificável;
- potencial de unsafe state para extração futura;
- utilidade metodológica para fronteiras P/O/A (sem classificar nesta fase);
- diversidade em:
  - percepção/atenção;
  - objetivo/decisão operacional;
  - ação/feedback/checklist;
  - comunicação/coordenação/CRM;
  - automação/mode awareness;
  - procedural deviation / go-no-go;
  - casos condition-dominant controlados.

## Critérios de exclusão
- duplicata dos 15 casos já usados;
- fonte sem sequência factual mínima;
- artigo puramente teórico/metodológico sem ocorrência operacional delimitada;
- evento puramente técnico sem ganho metodológico adicional;
- placeholder sem anchor local quando houver alternativa melhor no corpus.

## Casos já usados e excluídos por duplicidade
`REAL-EVENT-0001`, `0002`, `0003`, `0004`, `0005`, `0006`, `0007`, `0008`, `0009`, `0010`, `0011`, `0013`, `0015`, `0016`, `0028`.

## Batch 3 selecionado (15)
| batch3Id | candidateId/originalEventId | sourceDocument | sourceLocator | shortLabel | aircraft/operation | eventType | whySelected | methodologicalTarget | expectedContribution | sourceQuality | extractionPriority | duplicateCheck | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| A4R75-B3-001 | REAL-EVENT-0014 (alias REAL-EVENT-0030) | docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_1_v0.1.4.md | linha 73 | BHS S-76 Roncador post-takeoff ditching report | S-76 / offshore | low-height post-takeoff ditching | mantém trilha offshore com lacuna factual controlada | SOURCE_ENRICHMENT_CHALLENGE | caso de recusa conservadora com valor de enriquecimento | LOW/PARTIAL | P2 | NEW | não usado nos 15 consolidados |
| A4R75-B3-002 | NEW-TXT-EVT-N56RD | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-2.txt | linha 1431 | N56RD Gulf of Mexico forced ditching | S-76B / offshore approach | engine rollback + high-weight approach + limited go-around | caso com cadeia decisão-manutenção-operação bem descrita | ACTION_FEEDBACK; PROCEDURAL_DEVIATION | forte para decomposição de decisão e verificação | HIGH | P1 | NEW | inclui histórico de defeito conhecido pré-voo |
| A4R75-B3-003 | NEW-TXT-EVT-D-HHNH | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-2.txt | linha 1743 | D-HHNH low-viz return with low-altitude excursion | S-76B / offshore return | serious incident low altitude in poor visibility | útil para barreira de monitoramento/callouts e rule use | A_AXIS_CANDIDATE; ACTION_FEEDBACK | melhora cobertura de resposta de tripulação em degradação progressiva | MEDIUM | P1 | NEW | inclui AVAD/callout context |
| A4R75-B3-004 | NEW-TXT-EVT-G-BHYB | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-2.txt | linha 767 | G-BHYB Fulmar night approach sea contact | S-76A / offshore shuttle | night approach disorientation / near sea impact | caso clássico de percepção x ação em ambiente visual hostil | PF_PM_CRM; A_AXIS_CANDIDATE | melhora análise de timing PF/PM e cross-monitoring | HIGH | P1 | NEW | contém contexto de split duty e AVAD não percebido |
| A4R75-B3-005 | NEW-TXT-EVT-HL9294 | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-2.txt | linha 3366 | HL9294 Gangnam low-viz CFIT | S-76C++ / urban executive transport | adverse weather continuation + CFIT | caso forte de go/no-go, pressão operacional e CRM | OBJECTIVE_AXIS_DIVERSITY; COMMUNICATION_COORDINATION; PROCEDURAL_DEVIATION | alto valor para objetivo não-nominal testável | HIGH | P1 | NEW | inclui sequência de reversão de no-go |
| A4R75-B3-006 | NEW-TXT-EVT-PR-CHI | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-2.txt | linha 3799 | PR-CHI helideck motion mismatch | S-76C++ / offshore helideck | landing damage with P/R/H reporting mismatch | reforça fronteira entre condição dinâmica e decisão de continuidade | COMMUNICATION_COORDINATION; ACTION_FEEDBACK | útil para coordenação vessel-crew e feedback de limites | MEDIUM | P1 | NEW | forte componente de informação incompleta |
| A4R75-B3-007 | NEW-TXT-EVT-N200BK | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt | linha 652 | N200BK A109 rooftop impact in IMC | Agusta A109E / corporate urban | erratic flight and rooftop crash | caso com decisão sob janela meteorológica e navegação degradada | A_AXIS_CANDIDATE; DECISION_MAKING | contribui para análise de decisão e controle em IMC marginal | HIGH | P1 | NEW | anchor NTSB prelim com cronologia clara |
| A4R75-B3-008 | NEW-TXT-EVT-N109W | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt | linha 835 | N109W mountain CFIT after VFR continuation | Agusta A109A II / mountain transfer | VFR into deteriorating conditions / CFIT | forte para decisão de continuidade e avaliação de risco | OBJECTIVE_AXIS_DIVERSITY; PROCEDURAL_DEVIATION | adiciona caso de decisão tática sob visibilidade degradada | HIGH | P1 | NEW | inclui uso inadequado de GPS cartográfico |
| A4R75-B3-009 | NEW-TXT-EVT-N11NM | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt | linha 1017 | N11NM night IMC missed-approach LOC | Leonardo AW109S / HEMS | spatial disorientation during missed approach | caso rico em automação, modo, energia e go-around | AUTOMATION_MODE; ACTION_FEEDBACK; A_AXIS_CANDIDATE | eleva diversidade de fronteira automation/action | HIGH | P1 | NEW | inclui sequência instrumentada (autopilot/airspeed/torque) |
| A4R75-B3-010 | NEW-TXT-EVT-N127LN | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt | linha 2031 | N127LN night fatigue LOC-I | AS350B2 / HEMS | fatigue-associated LOC-I | caso de decisão/fit-for-duty e governança operacional | OBJECTIVE_AXIS_DIVERSITY; COMMUNICATION_COORDINATION | amplia cobertura de decisão humana sem foco exclusivo técnico | HIGH | P1 | NEW | inclui contexto PFRA e duty cycle |
| A4R75-B3-011 | NEW-TXT-EVT-N120HH | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt | linha 9330 | N120HH Bell 407 uncontained engine failure | Bell 407 / private flight | oil-loss progression + engine failure + autorotation | mantém trilha condition-dominant com cadeia técnica detalhada | CONDITION_DOMINANT_CONTROL; ACTION_FEEDBACK | útil para separar falha técnica primária de resposta de pilotagem | HIGH | P1 | NEW | inclui sinais prévios (torque sensing/oil trail) |
| A4R75-B3-012 | NEW-TXT-EVT-N525TA | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt | linha 10091 | N525TA flight-test vibration breakup | Bell 525 / experimental test | severe vibration + control-law interaction | caso adversarial de automação/feedback e limites de procedimento | AUTOMATION_MODE; ACTION_FEEDBACK | amplia fronteira de interface homem-sistema em regime extremo | HIGH | P2 | NEW | não é operação rotineira, mas útil para adversarial method set |
| A4R75-B3-013 | NEW-TXT-EVT-BS211-Q400 | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt | linha 1537 | US-Bangla BS211 unstable approach sequence | Bombardier Q400 / CAT transport | unstable approach continuation and runway misalignment | adiciona asa fixa com forte conteúdo de CRM/decisão | OBJECTIVE_AXIS_DIVERSITY; PF_PM_CRM; PROCEDURAL_DEVIATION | reduz viés helicóptero-only e melhora diversidade O/A | HIGH | P1 | NEW | caso rico para limites de estabilização/go-around |
| A4R75-B3-014 | REAL-EVENT-0032 | docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | linha 62 | A320 G-EZWM AAIB correspondence triage | A320 / CAT transport | correspondence-level event | garante presença de caso comercial para enriquecimento dirigido | SOURCE_ENRICHMENT_CHALLENGE; OBJECTIVE_AXIS_DIVERSITY | amplia diversidade de frota e operação | LOW/PARTIAL | P2 | NEW | manter como triage de enriquecimento focal |
| A4R75-B3-015 | REAL-EVENT-0033 | docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | linha 63 | B737 EI-EFB AAIB correspondence triage | B737 / CAT transport | correspondence-level event | complementa diversidade comercial com segundo tipo | SOURCE_ENRICHMENT_CHALLENGE; OBJECTIVE_AXIS_DIVERSITY | prepara trilha para reduzir concentração em O-A por domínio | LOW/PARTIAL | P2 | NEW | requer anchor factual adicional antes de extração profunda |

## Backlog extra (P2/P3)
| backlogId | sourceDocument | sourceLocator | shortLabel | priority | motivo |
|---|---|---|---|---|---|
| A4R75-BL-001 | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt | linha 3338 | N94TH Alaska low-viz CFIT | P2 | bom caso, mas overlap parcial com outros CFIT selecionados |
| A4R75-BL-002 | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt | linha 5601 | N194EH AS350 cargo restraint CFIT | P2 | alto valor para cargo restraint; ficou para onda seguinte |
| A4R75-BL-003 | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt | linha 2494 | N894NA high-density-altitude approach accident | P2 | relevante para performance/decision, mas já há múltiplos HEMS no P1 |
| A4R75-BL-004 | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged.txt | linha 1429 | N109EX rooftop helipad yaw event | P2 | bom caso de ação/controle em heliponto; adiado por balanceamento da amostra |
| A4R75-BL-005 | docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | linha 64 | REAL-EVENT-0034 G-BNPH | P3 | source partial/correspondence only |
| A4R75-BL-006 | docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | linha 65 | REAL-EVENT-0035 N210SH | P3 | source partial/correspondence only |
| A4R75-BL-007 | docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | linha 66 | REAL-EVENT-0036 A320 unstable approach placeholder | P3 | placeholder, precisa source anchor real |
| A4R75-BL-008 | docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | linha 67 | REAL-EVENT-0037 TAWS warning response placeholder | P3 | placeholder, precisa source anchor real |
| A4R75-BL-009 | docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | linha 68 | REAL-EVENT-0038 checklist omission placeholder | P3 | placeholder, precisa source anchor real |
| A4R75-BL-010 | docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | linha 69 | REAL-EVENT-0039 authority-gradient placeholder | P3 | placeholder, precisa source anchor real |
| A4R75-BL-011 | docs/real-event-harvest/REAL_EVENT_INDEX_BATCH_2_v0.1.4.md | linha 70 | REAL-EVENT-0040 insufficient-evidence placeholder | P3 | placeholder para testes de recusa conservadora |
| A4R75-BL-012 | /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-2.txt | linha 3364 | N620PA Bell 407 bird-strike LOC excerpt | P3 | anchor parcial; requer confirmação de fonte primária |

## Distribuição esperada do Batch 3
- helicopter/offshore count: 6 (`A4R75-B3-001` a `006`)
- helicopter non-offshore count: 6 (`A4R75-B3-007` a `012`)
- fixed-wing count: 3 (`A4R75-B3-013`, `014`, `015`)
- procedural/decision candidates: 11
- action/feedback candidates: 8
- PF/PM/CRM candidates: 5
- objective diversity candidates: 9
- condition-dominant candidates: 3
- source enrichment candidates: 4

## Próxima fase
**A4+R-76 — Structured Extraction Batch 3 from Selected 15 Events.**
