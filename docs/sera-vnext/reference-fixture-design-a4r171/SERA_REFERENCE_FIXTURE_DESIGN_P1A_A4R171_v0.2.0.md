# SERA Reference Fixture Design P1-A — A4R171

Status:
- DRAFT_ONLY
- FIXTURE_DESIGN_ONLY
- NO_EXECUTABLE_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Objetivo

Esta fase prepara o desenho documental de fixture/calibration para os dois primeiros P1, sem criar teste executavel.

## 2. Fontes

### A4R170
- `docs/sera-vnext/reference-case-approval-packet-a4r170/SERA_REFERENCE_CASE_APPROVAL_PACKET_P1_A4R170_v0.2.0.md`
- `docs/sera-vnext/reference-case-approval-packet-a4r170/SERA_REFERENCE_CASE_APPROVAL_MATRIX_A4R170_v0.2.0.csv`
- `docs/sera-vnext/reference-case-approval-packet-a4r170/SERA_REFERENCE_CASE_APPROVAL_LOG_A4R170_v0.2.0.md`

### A4R169
- `docs/sera-vnext/reference-case-candidate-selection-a4r169/SERA_REFERENCE_CASE_CANDIDATE_SELECTION_A4R169_v0.2.0.md`
- `docs/sera-vnext/reference-case-candidate-selection-a4r169/SERA_REFERENCE_CASE_CANDIDATE_SELECTION_MATRIX_A4R169_v0.2.0.csv`

### DAUMAS-CASE-4
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_REFERENCE_CASE_REPRODUCTION_A4R167_v0.2.0.md`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_REFERENCE_CASE_MATRIX_A4R167_v0.2.0.csv`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_CASE_SOURCE_TEXT_EXTRACT_A4R167_v0.2.0.md`
- `docs/sera-vnext/daumas-vnext-mapping-review-a4r168/SERA_DAUMAS_ORIGINAL_VS_VNEXT_MAPPING_REVIEW_A4R168_v0.2.0.md`
- `docs/sera-vnext/daumas-vnext-mapping-review-a4r168/SERA_DAUMAS_VNEXT_MAPPING_MATRIX_A4R168_v0.2.0.csv`

### US-AIRWAYS-1549
- `docs/sera-vnext/minimal-canonical-event-test/SERA_MINIMAL_CANONICAL_EVENT_TEST_A4R166_v0.2.0.md`
- `docs/sera-vnext/minimal-canonical-event-test/SERA_MINIMAL_CANONICAL_EVENT_TEST_MATRIX_A4R166_v0.2.0.csv`
- `docs/sera-vnext/minimal-canonical-event-test/SERA_A4R166_AUTHOR_APPROVAL_DOSSIER_v0.2.0.md`

### Canonicos
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_METHOD_QUESTION_LOCK_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_SINGLE_ESCAPE_POINT_MULTI_ACTOR_RULE_A4R166_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_DOCUMENT_AUTHORITY_INDEX_v0.2.0.md`

## 3. Regra de design

- esta fase nao cria fixture;
- esta fase nao cria baseline;
- esta fase nao altera runtime;
- esta fase nao reclassifica;
- qualquer implementacao futura exige fase separada, preferencialmente com Codex.

## 4. Pair design rationale

Comecar com este par reduz ambiguidade metodologica e cobre dois extremos do motor SERA vNext:

1. DAUMAS-CASE-4 — caso positivo humano limpo;
2. US-AIRWAYS-1549 — controle negativo tecnico/ambiental.

O par cobre:
- caso com P/O/A humano aplicavel;
- caso em que P/O/A humano nao deve ser aplicado no ponto de fuga.

## 5. DAUMAS-CASE-4 — Positive fixture design

### 5.1 Identity
- caseId: DAUMAS-CASE-4
- source: Daumas A4R167/A4R168/A4R170
- role: positive reference design
- expected P/O/A: P-G / O-D / A-F

### 5.2 Minimal factual input
- piloto decide realizar o pouso pelo proprio lado;
- havia alternativa de pouso pelo outro lado;
- outro lado tinha menor exposicao a obstaculos;
- piloto percebe depois que o outro lado seria mais favoravel;
- influencia de acidente anterior e vies de confirmacao como contexto;
- nao usar desfecho como chave de classificacao.

### 5.3 Escape point
- piloto decide realizar o pouso pelo proprio lado.

### 5.4 Unsafe act/condition
- pouso pelo lado que oferecia risco maior do que o necessario.

### 5.5 Direct actor
- piloto entrevistado.

### 5.6 Expected canonical trace — DAUMAS-CASE-4

Perception:
| Node | Expected answer | Evidence / fixture assertion | Consequence |
|---|---|---|---|
| P_ROOT | O piloto acreditou que o pouso pelo proprio lado era aceitavel/melhor. | O caso informa que ele decidiu pousar pelo proprio lado e percebeu depois que o outro lado era mais favoravel. | Continue. |
| P_ASSESSMENT | NAO | A avaliacao de que o proprio lado era melhor/aceitavel nao era adequada, pois havia alternativa com menor exposicao a obstaculos. | Continue. |
| P_CAPABILITY | SIM | Nao ha incapacidade sensorial ou falta primaria de conhecimento; piloto era experiente e a informacao estava disponivel. | Continue. |
| P_TIME_PRESSURE | NAO | O fator dominante nao e compressao temporal, mas assimilacao inadequada/vies de confirmacao. | Continue. |
| P_INFORMATION_AMBIGUOUS | NAO | A informacao nao era ilusoria/ambigua como ramo dominante. | Continue. |
| P_INFORMATION_AVAILABLE | SIM | A informacao sobre o lado mais favoravel estava disponivel no reconhecimento/avaliacao operacional. | P-G. |

Objective:
| Node | Expected answer | Evidence / fixture assertion | Consequence |
|---|---|---|---|
| O_ROOT | Pousar na plataforma pelo proprio lado. | Decisao de realizar o pouso pelo proprio lado. | Continue. |
| O_RULES | SIM | Pousar na plataforma e objetivo operacional legitimo; nao ha violacao deliberada como ramo principal. | Continue. |
| O_MANAGED_RISK | NAO | Escolher o lado com menor margem/maior exposicao a obstaculos nao gerenciou o risco de forma conservadora. | O-D. |

Action:
| Node | Expected answer | Evidence / fixture assertion | Consequence |
|---|---|---|---|
| A_ROOT | Realizar ele proprio o pouso pelo lado escolhido. | A acao implementada foi o pouso pelo proprio lado. | Continue. |
| A_IMPLEMENTED | SIM | A acao pretendida foi executada como pretendida. | Continue. |
| A_CORRECT | NAO | Havia acao alternativa mais adequada: deixar o pouso pelo lado mais favoravel. | Continue. |
| A_CAPABILITY | SIM | Piloto tinha capacidade/conhecimento/habilidade para selecionar a acao adequada. | Continue. |
| A_TIME_PRESSURE | NAO | Pressao temporal nao e o fator dominante. | A-F. |

### 5.7 Fixture assertions — DAUMAS-CASE-4

O futuro fixture deve exigir:
- escapePointId = DAUMAS-CASE-4-ESCAPE-001
- directActor = pilot_interviewed
- expectedP = P-G
- expectedO = O-D
- expectedA = A-F
- negativeControl = false
- humanPoaApplicable = true
- noReleasedCode = true
- noDownstream = true

### 5.8 Expected fixture behavior

O futuro fixture deve passar se:
- identificar o ponto de fuga decisorio;
- nao deslocar para desfecho posterior;
- nao tratar como erro tecnico;
- nao tratar como negative control;
- retornar P-G/O-D/A-F;
- preservar low risk.

Deve falhar ou ficar hold se:
- abrir outro ponto de fuga;
- classificar objetivo como O-A;
- classificar acao como A-G por feedback;
- ignorar alternativa disponivel;
- usar outcome/hindsight como chave.

### 5.9 Design status
- READY_FOR_FIXTURE_DRAFT
- NO_EXECUTABLE_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 6. US-AIRWAYS-1549 — Negative control fixture design

### 6.1 Identity
- caseId: US-AIRWAYS-1549
- source: A4R166/A4R170
- role: negative control design
- expected output: NOT_APPLICABLE_AT_ESCAPE_POINT for human P/O/A

### 6.2 Minimal factual input
- aeronave em subida inicial;
- colisao com aves;
- perda substancial/quase total de empuxo bilateral;
- tripulacao responde apos o onset tecnico/ambiental;
- ponto de fuga e tecnico/ambiental, nao ato humano direto;
- nao avaliar decisao posterior de amaragem/retorno como ponto de fuga deste fixture.

### 6.3 Escape point
- bird strike with substantial bilateral thrust loss.

### 6.4 Unsafe act/condition
- unsafe condition: technical/environmental onset.

### 6.5 Direct human actor at escape point
- none.

### 6.6 Expected negative-control trace — US-AIRWAYS-1549

| Step | Expected answer | Evidence / fixture assertion | Consequence |
|---|---|---|---|
| ESCAPE_POINT_IDENTIFIED | SIM | Bird strike with substantial bilateral thrust loss during initial climb. | Continue. |
| UNSAFE_CONDITION_IDENTIFIED | SIM | Technical/environmental onset affecting thrust availability. | Continue. |
| HUMAN_UNSAFE_ACT_AT_ESCAPE_POINT | NAO | No direct human unsafe act caused the bird strike/thrust loss. | Human P/O/A tree is not applied. |
| P_ROOT | NOT_APPLICABLE_AT_ESCAPE_POINT | Human perception did not cause the escape point. | No P code. |
| O_ROOT | NOT_APPLICABLE_AT_ESCAPE_POINT | Human objective did not cause the escape point. | No O code. |
| A_ROOT | NOT_APPLICABLE_AT_ESCAPE_POINT | Human action did not cause the escape point. | No A code. |

### 6.7 Fixture assertions — US-AIRWAYS-1549

O futuro fixture deve exigir:
- escapePointId = US-AIRWAYS-1549-ESCAPE-001
- unsafeConditionType = technical_environmental_onset
- directHumanActorAtEscapePoint = none
- humanPoaApplicable = false
- expectedP = NOT_APPLICABLE_AT_ESCAPE_POINT
- expectedO = NOT_APPLICABLE_AT_ESCAPE_POINT
- expectedA = NOT_APPLICABLE_AT_ESCAPE_POINT
- negativeControl = true
- noReleasedCode = true
- noDownstream = true

### 6.8 Expected fixture behavior

O futuro fixture deve passar se:
- reconhecer ponto de fuga tecnico/ambiental;
- nao forcar P/O/A humano;
- nao classificar a tripulacao por acoes posteriores;
- retornar negative control / NOT_APPLICABLE_AT_ESCAPE_POINT.

Deve falhar se:
- classificar piloto com P/O/A no ponto de fuga;
- usar decisao posterior de amaragem como ponto de fuga deste fixture;
- transformar resposta bem-sucedida da tripulacao em unsafe act;
- abrir downstream.

### 6.9 Design status
- READY_FOR_NEGATIVE_CONTROL_FIXTURE_DRAFT
- NO_EXECUTABLE_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 7. Pair-level acceptance criteria

- o par deve testar aplicacao e nao aplicacao de P/O/A humano;
- caso positivo deve retornar P/O/A especifico;
- controle negativo deve bloquear P/O/A humano;
- ambos devem preservar ponto de fuga;
- ambos devem evitar hindsight/outcome;
- nenhum deve gerar downstream.

## 8. Risks and open questions

- DAUMAS-CASE-4 ainda e source reproduction, nao relatorio oficial externo;
- US-AIRWAYS-1549 pode tentar puxar analise para decisoes posteriores da tripulacao;
- fixture futuro precisa separar onset tecnico/ambiental de resposta humana;
- implementacao executavel deve ser fase separada.

## 9. Next phase recommendation

A4R172 — Implement P1-A Fixture Drafts, usando Codex, se autorizado.
