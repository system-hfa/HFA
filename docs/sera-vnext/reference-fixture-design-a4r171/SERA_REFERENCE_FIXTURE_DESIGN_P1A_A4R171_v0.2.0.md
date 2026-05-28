# SERA Reference Fixture Design P1-A — A4R171

Status:
- DRAFT_ONLY
- FIXTURE_DESIGN_ONLY
- NO_EXECUTABLE_FIXTURE
- REFERENCE_CANDIDATE_ONLY
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Objetivo

Esta fase define o desenho documental de fixture/calibration para o primeiro par P1-A (positivo + negativo): DAUMAS-CASE-4 e US-AIRWAYS-1549. Nao ha implementacao de fixture executavel, nao ha alteracao de testes, nao ha alteracao de baseline e nao ha alteracao de runtime.

## 2. Fontes

### A4R170
- `docs/sera-vnext/reference-case-approval-packet-a4r170/SERA_REFERENCE_CASE_APPROVAL_PACKET_P1_A4R170_v0.2.0.md`
- `docs/sera-vnext/reference-case-approval-packet-a4r170/SERA_REFERENCE_CASE_APPROVAL_MATRIX_A4R170_v0.2.0.csv`
- `docs/sera-vnext/reference-case-approval-packet-a4r170/SERA_REFERENCE_CASE_APPROVAL_LOG_A4R170_v0.2.0.md`

### A4R169
- `docs/sera-vnext/reference-case-candidate-selection-a4r169/SERA_REFERENCE_CASE_CANDIDATE_SELECTION_A4R169_v0.2.0.md`
- `docs/sera-vnext/reference-case-candidate-selection-a4r169/SERA_REFERENCE_CASE_CANDIDATE_SELECTION_MATRIX_A4R169_v0.2.0.csv`
- `docs/sera-vnext/reference-case-candidate-selection-a4r169/SERA_REFERENCE_CASE_CANDIDATE_SELECTION_LOG_A4R169_v0.2.0.md`

### A4R166 (US-AIRWAYS-1549)
- `docs/sera-vnext/minimal-canonical-event-test/SERA_MINIMAL_CANONICAL_EVENT_TEST_A4R166_v0.2.0.md`
- `docs/sera-vnext/minimal-canonical-event-test/SERA_MINIMAL_CANONICAL_EVENT_TEST_MATRIX_A4R166_v0.2.0.csv`
- `docs/sera-vnext/minimal-canonical-event-test/SERA_A4R166_AUTHOR_APPROVAL_DOSSIER_v0.2.0.md`

### A4R167/A4R168 (DAUMAS-CASE-4)
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_REFERENCE_CASE_REPRODUCTION_A4R167_v0.2.0.md`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_REFERENCE_CASE_MATRIX_A4R167_v0.2.0.csv`
- `docs/sera-vnext/daumas-sera-reference-cases-a4r167/SERA_DAUMAS_CASE_SOURCE_TEXT_EXTRACT_A4R167_v0.2.0.md`
- `docs/sera-vnext/daumas-vnext-mapping-review-a4r168/SERA_DAUMAS_ORIGINAL_VS_VNEXT_MAPPING_REVIEW_A4R168_v0.2.0.md`
- `docs/sera-vnext/daumas-vnext-mapping-review-a4r168/SERA_DAUMAS_VNEXT_MAPPING_MATRIX_A4R168_v0.2.0.csv`

### Canonicos
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_METHOD_QUESTION_LOCK_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_DOCUMENT_AUTHORITY_INDEX_v0.2.0.md`

## 3. Regras de design desta fase

- design preparatorio apenas;
- sem fixture executavel;
- sem baseline;
- sem release;
- sem downstream;
- sem runtime;
- sem reclassificacao P/O/A;
- sem alteracao de ponto de fuga;
- sem criacao de novo ponto de fuga.

## 4. Fixture design draft — P1-A

### 4.1 DAUMAS-CASE-4 (positive)

Input minimo factual:
- contexto: pouso offshore com escolha de lado de pouso;
- cue principal: informacoes disponiveis indicavam lado mais favoravel alternativo;
- decisao observada: piloto decide pousar pelo proprio lado.

Escape point:
- momento da decisao de pouso pelo proprio lado.

Ator direto:
- piloto entrevistado (single actor source reproduction).

Expected behavior metodologico:
- identificar escape point decisorio;
- mapear ato inseguro como escolha de lado com risco maior do que o necessario;
- percorrer trilha canonica sem inventar perguntas;
- produzir saida esperada `P-G / O-D / A-F`.

Expected output:
- `P-G / O-D / A-F`.
- `READY_FOR_FIXTURE_DRAFT` (design status nesta fase).

Campos que devem ser bloqueados:
- recommendations;
- finalConclusion;
- qualquer campo de release/downstream;
- qualquer promotedFixtureId/baselineId;
- qualquer inferencia de novo ponto de fuga.

Riscos de erro do agente/modelo:
- confundir contexto psicologico com novo ponto de fuga;
- colapsar P e A em uma unica justificativa narrativa;
- reclassificar para codigo diferente de `P-G / O-D / A-F`.

Criterios de aprovacao pre-fixture:
- evidencia factual minima presente;
- ponto de fuga unico e estavel;
- ator direto claro;
- saida exatamente `P-G / O-D / A-F`;
- bloqueios de governanca preservados.

Design status:
- `READY_FOR_FIXTURE_DRAFT`

### Expected canonical trace — DAUMAS-CASE-4

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

### Fixture assertions — DAUMAS-CASE-4

O futuro fixture deve exigir:
- `escapePointId = DAUMAS-CASE-4-ESCAPE-001`
- `directActor = pilot_interviewed`
- `expectedP = P-G`
- `expectedO = O-D`
- `expectedA = A-F`
- `negativeControl = false`
- `humanPoaApplicable = true`
- `noReleasedCode = true`
- `noDownstream = true`

### 4.2 US-AIRWAYS-1549 (negative control)

Input minimo factual:
- contexto: subida inicial normal;
- onset: bird strike com perda substancial bilateral de empuxo;
- natureza: tecnico/ambiental no ponto de fuga.

Escape point:
- onset tecnico/ambiental da perda de potencia bilateral.

Ator direto:
- inexistente para origem humana no ponto de fuga.

Expected behavior metodologico:
- reconhecer escape point tecnico/ambiental;
- marcar unsafe condition sem unsafe act humano no ponto de fuga;
- bloquear aplicacao de arvore humana P/O/A nesse ponto;
- produzir saida `NOT_APPLICABLE_AT_ESCAPE_POINT`.

Expected output:
- `NOT_APPLICABLE_AT_ESCAPE_POINT` para P/O/A humano no escape point.
- `READY_FOR_NEGATIVE_CONTROL_FIXTURE_DRAFT` (design status nesta fase).

Campos que devem ser bloqueados:
- qualquer fechamento humano P/O/A no ponto de fuga;
- recommendations;
- finalConclusion;
- qualquer promotedFixtureId/baselineId;
- qualquer inferencia de culpa humana no onset tecnico/ambiental.

Riscos de erro do agente/modelo:
- forcar P/O/A humano por padrao;
- misturar fase de resposta da tripulacao com origem do ponto de fuga;
- tratar controle negativo como caso positivo incompleto.

Criterios de aprovacao pre-fixture:
- escape point tecnico/ambiental explicitado;
- ausencia de ator humano causal no ponto de fuga explicitada;
- resultado humano `NOT_APPLICABLE_AT_ESCAPE_POINT` preservado;
- bloqueios de governanca preservados.

Design status:
- `READY_FOR_NEGATIVE_CONTROL_FIXTURE_DRAFT`

### Expected negative-control trace — US-AIRWAYS-1549

| Step | Expected answer | Evidence / fixture assertion | Consequence |
|---|---|---|---|
| ESCAPE_POINT_IDENTIFIED | SIM | Bird strike with substantial bilateral thrust loss during initial climb. | Continue. |
| UNSAFE_CONDITION_IDENTIFIED | SIM | Technical/environmental onset affecting thrust availability. | Continue. |
| HUMAN_UNSAFE_ACT_AT_ESCAPE_POINT | NAO | No direct human unsafe act caused the bird strike/thrust loss. | Human P/O/A tree is not applied. |
| P_ROOT | NOT_APPLICABLE_AT_ESCAPE_POINT | Human perception did not cause the escape point. | No P code. |
| O_ROOT | NOT_APPLICABLE_AT_ESCAPE_POINT | Human objective did not cause the escape point. | No O code. |
| A_ROOT | NOT_APPLICABLE_AT_ESCAPE_POINT | Human action did not cause the escape point. | No A code. |

### Fixture assertions — US-AIRWAYS-1549

O futuro fixture deve exigir:
- `escapePointId = US-AIRWAYS-1549-ESCAPE-001`
- `unsafeConditionType = technical_environmental_onset`
- `directHumanActorAtEscapePoint = none`
- `humanPoaApplicable = false`
- `expectedP = NOT_APPLICABLE_AT_ESCAPE_POINT`
- `expectedO = NOT_APPLICABLE_AT_ESCAPE_POINT`
- `expectedA = NOT_APPLICABLE_AT_ESCAPE_POINT`
- `negativeControl = true`
- `noReleasedCode = true`
- `noDownstream = true`

## 5. Criterios de passagem/falha (antes de fixture executavel)

Criterios de passagem:
- caso referencia possui input minimo factual claro;
- escape point unico e auditavel;
- ator/ausencia de ator direto esta explicito;
- expected output bate exatamente com A4R170/A4R169;
- locks de NO_BASELINE/NO_RELEASED_CODE/NO_DOWNSTREAM preservados.

Criterios de falha:
- reclassificacao de P/O/A;
- introducao de novo ponto de fuga;
- aplicacao humana P/O/A indevida em US-AIRWAYS-1549;
- promocao implicita para fixture/baseline/release;
- abertura de runtime/teste executavel nesta fase.

## 6. Limites

- sem fixture executavel;
- sem baseline;
- sem release;
- sem downstream;
- sem runtime;
- sem alteracao de codigo;
- sem alteracao de .ts;
- sem reclassificacao.

## 7. Proxima fase recomendada

A4R172 (ou equivalente autorizado): implementacao controlada de fixture executavel para o par P1-A, iniciando por validacao negativa (US-AIRWAYS-1549) e depois positiva (DAUMAS-CASE-4), com gates canonicos ativos.
