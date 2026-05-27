# SERA Reference Case Candidate Selection — A4R169

Status:
- DRAFT_ONLY
- CANDIDATE_SELECTION
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Objetivo

Esta fase seleciona candidatos controlados para reference cases SERA vNext com base no pacote A4R166 (eventos externos), A4R167 (reproducao Daumas) e A4R168 (revisao de mapeamento vNext). O foco e priorizacao metodologica; nao ha reclassificacao e nao ha mudanca de P/O/A.

## 2. Fontes

- `docs/sera-vnext/minimal-canonical-event-test/SERA_MINIMAL_CANONICAL_EVENT_TEST_A4R166_v0.2.0.md`
- `docs/sera-vnext/minimal-canonical-event-test/SERA_MINIMAL_CANONICAL_EVENT_TEST_MATRIX_A4R166_v0.2.0.csv`
- `docs/sera-vnext/minimal-canonical-event-test/SERA_A4R166_AUTHOR_APPROVAL_DOSSIER_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_SINGLE_ESCAPE_POINT_MULTI_ACTOR_RULE_A4R166_v0.2.0.md`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_REFERENCE_CASE_REPRODUCTION_A4R167_v0.2.0.md`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_REFERENCE_CASE_MATRIX_A4R167_v0.2.0.csv`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_CASE_SOURCE_TEXT_EXTRACT_A4R167_v0.2.0.md`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_EXTRACTION_LOG_A4R167_v0.2.0.md`
- `docs/sera-vnext/daumas-vnext-mapping-review-a4r168/SERA_DAUMAS_ORIGINAL_VS_VNEXT_MAPPING_REVIEW_A4R168_v0.2.0.md`
- `docs/sera-vnext/daumas-vnext-mapping-review-a4r168/SERA_DAUMAS_VNEXT_MAPPING_MATRIX_A4R168_v0.2.0.csv`
- `docs/sera-vnext/daumas-vnext-mapping-review-a4r168/SERA_DAUMAS_VNEXT_MAPPING_REVIEW_LOG_A4R168_v0.2.0.md`

## 3. Criterios de selecao

- ponto de fuga claro;
- ator direto claro;
- fluxo P/O/A demonstravel;
- codigo compativel com vNext;
- baixa ambiguidade metodologica;
- utilidade para cobrir lacuna da taxonomia;
- risco de contaminacao por evento posterior;
- necessidade ou nao de actor split;
- compatibilidade com single escape point + multi-actor contributions;
- status sem release/downstream.

## 4. Inventario de candidatos

| id | origem | ponto de fuga (resumo) | P/O/A | papel metodologico | forca | risco | recomendacao |
|---|---|---|---|---|---|---|---|
| COMAIR-5191 | A4R166 evento externo | decolagem iniciada na pista errada apos autorizacao para outra pista | P-G / O-A / A-G | caso externo positivo, fluxo classico | media-alta | medio | manter como candidato com cautela; possivel actor split futuro |
| EXECUFLIGHT-1526 | A4R166 evento externo | `EXECUFLIGHT-1526-ESCAPE-001` com duas contribuicoes de ator no mesmo ponto | FO/PF: P-D/O-D/A-H; Captain/PM: P-A/O-D/A-G | primeiro caso piloto multi-ator | alta | medio | priorizar como candidato multi-ator, sem fixture nesta fase |
| US-AIRWAYS-1549 | A4R166 evento externo | bird strike com perda substancial de potencia | POA humano no escape point: NOT_APPLICABLE | controle negativo | alta | baixo | manter como candidato forte a negative control |
| DAUMAS-CASE-1 | A4R167 + A4R168 | manobra com automatismo acoplado em baixa altitude | P-C / O-A / A-E | cobre conhecimento/percepcao e acao por conhecimento | media | medio | manter com cautela |
| DAUMAS-CASE-2 (2A only) | A4R167 + A4R168 | cancelamento de automatismo e reducao manual de velocidade | P-D / O-A / A-H | cobre pressao temporal atencional e gerenciamento do tempo | media | medio | manter com cautela; escopo permanece 2A only |
| DAUMAS-CASE-3 | A4R167 + A4R168 | retirada de mao do coletivo em contexto misto humano-tecnico | P-H / O-C / A-G | cobre P-H e O-C em contexto misto | media | medio-alto | manter como source reproduction only por ora |
| DAUMAS-CASE-4 | A4R167 + A4R168 | decisao de pouso em lado de maior risco | P-G / O-D / A-F | melhor caso Daumas para decisao intencional com acao inadequada | alta | baixo | priorizar como candidato forte |

## 5. Classificacao de uso

Categorias usadas nesta fase:
- REFERENCE_CANDIDATE_STRONG
- REFERENCE_CANDIDATE_WITH_CAUTION
- NEGATIVE_CONTROL_CANDIDATE
- MULTI_ACTOR_REFERENCE_CANDIDATE
- SOURCE_REPRODUCTION_ONLY
- HOLD_FOR_FUTURE_REVIEW
- NOT_CANDIDATE_NOW

## 6. Avaliacao individual

### COMAIR-5191

- Dados-base: P-G / O-A / A-G; AUTHOR_APPROVED_DRAFT; crew-level actor.
- Avaliacao: bom para trilha P-G/O-A/A-G, com ponto de fuga claro e cadeia canonica rastreavel.
- Cautela: modelo atual e crew-level; uma fase futura pode abrir actor split, mas nao e requisito desta selecao.
- Classificacao: REFERENCE_CANDIDATE_WITH_CAUTION.

### EXECUFLIGHT-1526

- Dados-base: single escape point `EXECUFLIGHT-1526-ESCAPE-001`.
- FO/PF: P-D / O-D / A-H.
- Captain/PM: P-A / O-D / A-G.
- Avaliacao: candidato primario para testar single escape point + multi-actor contributions sem misturar contribuicoes.
- Cautela: complexidade maior que casos single-actor; manter em docs-only nesta fase.
- Classificacao: MULTI_ACTOR_REFERENCE_CANDIDATE.

### US-AIRWAYS-1549

- Dados-base: NEGATIVE_CONTROL_ACCEPTED; POA humano no escape point = NOT_APPLICABLE.
- Avaliacao: candidato forte para validar bloqueio de classificacao humana quando origem do ponto de fuga e tecnico/ambiental.
- Classificacao: NEGATIVE_CONTROL_CANDIDATE.

### DAUMAS-CASE-1

- Dados-base: P-C / O-A / A-E.
- Avaliacao: util para cobrir eixo de conhecimento no P e no A.
- Cautela: depende de reproducao da dissertacao e nao de reanalise vNext completa do caso.
- Classificacao: REFERENCE_CANDIDATE_WITH_CAUTION.

### DAUMAS-CASE-2 (2A only)

- Dados-base: P-D / O-A / A-H; escopo travado em 2A only.
- Avaliacao: util para P-D/A-H com narrativa operacional clara.
- Cautela: barreira 500 ft permanece contexto/MDC; fase atual nao abre novo escopo de ponto de fuga.
- Classificacao: REFERENCE_CANDIDATE_WITH_CAUTION.

### DAUMAS-CASE-3

- Dados-base: P-H / O-C / A-G; COMPATIBLE_WITH_CAUTION em A4R168.
- Avaliacao: util para cobertura P-H e contexto humano-tecnico.
- Cautela: risco metodologico moderado no caminho do eixo P em relacao ao no de pressao temporal.
- Classificacao: SOURCE_REPRODUCTION_ONLY.

### DAUMAS-CASE-4

- Dados-base: P-G / O-D / A-F; risco baixo em A4R168.
- Avaliacao: caso Daumas mais limpo para fluxo canonico rastreavel e objetivo nao conservador.
- Classificacao: REFERENCE_CANDIDATE_STRONG.

## 7. Selecao preliminar recomendada

| caseId | eventType | poa | selectionCategory | priority | riskLevel | why | nextAction |
|---|---|---|---|---|---|---|---|
| DAUMAS-CASE-4 | daumas | P-G/O-D/A-F | REFERENCE_CANDIDATE_STRONG | P1 | LOW | melhor alinhamento com trilha canonica e baixo risco de ambiguidade | preparar pacote de aprovacao para referencia vNext |
| US-AIRWAYS-1549 | external | NOT_APPLICABLE (human POA at escape point) | NEGATIVE_CONTROL_CANDIDATE | P1 | LOW | controle negativo claro e ja aceito | usar como guardrail de elegibilidade POA |
| EXECUFLIGHT-1526 | external | FO/PF: P-D/O-D/A-H; Captain/PM: P-A/O-D/A-G | MULTI_ACTOR_REFERENCE_CANDIDATE | P1 | MEDIUM | melhor caso para regra single escape point + multi-actor contributions | preparar validacao canonica separada por contribuicao de ator |
| COMAIR-5191 | external | P-G/O-A/A-G | REFERENCE_CANDIDATE_WITH_CAUTION | P2 | MEDIUM | caso positivo util, porem em nivel de crew | manter como referencia secundaria |
| DAUMAS-CASE-1 | daumas | P-C/O-A/A-E | REFERENCE_CANDIDATE_WITH_CAUTION | P2 | MEDIUM | boa cobertura de conhecimento, ainda em modo source reproduction | manter para lote de calibracao |
| DAUMAS-CASE-2 | daumas | P-D/O-A/A-H | REFERENCE_CANDIDATE_WITH_CAUTION | P2 | MEDIUM | cobre P-D/A-H, com lock 2A only preservado | manter sem abrir novo escopo |
| DAUMAS-CASE-3 | daumas | P-H/O-C/A-G | SOURCE_REPRODUCTION_ONLY | P3 | MEDIUM | util para cobertura, mas com ressalva de caminho no eixo P | manter em revisao futura controlada |

## 8. Limites

- sem fixture;
- sem baseline;
- sem release;
- sem downstream;
- sem reclassificacao;
- sem alteracao dos codigos Daumas;
- sem alteracao dos codigos A4R166;
- sem runtime;
- sem finalConclusion;
- sem HFACS;
- sem Risk/ERC;
- sem ARMS/ERC;
- sem recommendations.
