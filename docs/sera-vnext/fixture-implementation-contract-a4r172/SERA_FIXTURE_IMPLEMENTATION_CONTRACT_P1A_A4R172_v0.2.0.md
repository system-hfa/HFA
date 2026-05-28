# SERA Fixture Implementation Contract P1-A — A4R172

Status:
- DRAFT_ONLY
- IMPLEMENTATION_CONTRACT_ONLY
- NO_EXECUTABLE_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Objetivo

Este documento define o contrato tecnico detalhado para a futura implementacao de fixtures executaveis dos dois casos P1-A: DAUMAS-CASE-4 e US-AIRWAYS-1549. Esta fase (A4R172-plan) NAO implementa fixtures. A implementacao executavel sera feita em fase posterior (A4R172-impl), preferencialmente com Codex, seguindo exclusivamente o contrato aqui definido.

## 2. Fontes

- `docs/sera-vnext/reference-fixture-design-a4r171/SERA_REFERENCE_FIXTURE_DESIGN_P1A_A4R171_v0.2.0.md`
- `docs/sera-vnext/reference-fixture-design-a4r171/SERA_REFERENCE_FIXTURE_DESIGN_MATRIX_A4R171_v0.2.0.csv`
- `docs/sera-vnext/reference-fixture-design-a4r171/SERA_REFERENCE_FIXTURE_DESIGN_LOG_A4R171_v0.2.0.md`
- `docs/sera-vnext/reference-case-approval-packet-a4r170/SERA_REFERENCE_CASE_APPROVAL_PACKET_P1_A4R170_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_METHOD_QUESTION_LOCK_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`

## 3. Escopo futuro autorizado

A fase futura (A4R172-impl) podera criar somente fixtures draft para:

- DAUMAS-CASE-4 (positive reference)
- US-AIRWAYS-1549 (negative control)

Nenhum outro caso podera ser incluido no primeiro lote executavel sem autorizacao separada.

## 4. Fora de escopo

Os seguintes itens ficam explicitamente fora do primeiro lote executavel:

- EXECUFLIGHT-1526 (multi-actor, complexidade maior, requer contrato separado);
- COMAIR e demais casos Daumas P2/P3;
- baseline nao sera atualizado;
- release/downstream nao sera criado;
- runtime nao sera alterado sem autorizacao separada;
- tests/ nao sera alterado sem autorizacao separada.

## 5. Contrato DAUMAS-CASE-4

### 5.1 Identidade do fixture

- fixtureId: `REF-P1A-DAUMAS-CASE-4-POSITIVE-001`
- sourceCaseId: `DAUMAS-CASE-4`
- type: `positive_reference`
- escapePointId: `DAUMAS-CASE-4-ESCAPE-001`
- directActor: `pilot_interviewed`
- humanPoaApplicable: `true`
- negativeControl: `false`

### 5.2 Output esperado

- expectedP: `P-G`
- expectedO: `O-D`
- expectedA: `A-F`

### 5.3 Minimal factual input

O futuro fixture deve conter apenas o input factual minimo necessario:

- piloto decide realizar o pouso pelo proprio lado;
- havia alternativa de pouso pelo outro lado;
- outro lado tinha menor exposicao a obstaculos;
- piloto percebe depois que o outro lado seria mais favoravel;
- influencia de acidente anterior e vies de confirmacao como contexto;
- nao usar desfecho como chave de classificacao.

### 5.4 Expected canonical trace

Perception:
| Node | Expected answer | Consequence |
|---|---|---|
| P_ROOT | O piloto acreditou que o pouso pelo proprio lado era aceitavel/melhor. | Continue. |
| P_ASSESSMENT | NAO | Continue. |
| P_CAPABILITY | SIM | Continue. |
| P_TIME_PRESSURE | NAO | Continue. |
| P_INFORMATION_AMBIGUOUS | NAO | Continue. |
| P_INFORMATION_AVAILABLE | SIM | P-G. |

Objective:
| Node | Expected answer | Consequence |
|---|---|---|
| O_ROOT | Pousar na plataforma pelo proprio lado. | Continue. |
| O_RULES | SIM | Continue. |
| O_MANAGED_RISK | NAO | O-D. |

Action:
| Node | Expected answer | Consequence |
|---|---|---|
| A_ROOT | Realizar ele proprio o pouso pelo lado escolhido. | Continue. |
| A_IMPLEMENTED | SIM | Continue. |
| A_CORRECT | NAO | Continue. |
| A_CAPABILITY | SIM | Continue. |
| A_TIME_PRESSURE | NAO | A-F. |

### 5.5 Pass criteria

O fixture deve passar se:

- identificar o ponto de fuga decisorio (DAUMAS-CASE-4-ESCAPE-001);
- nao deslocar para desfecho posterior;
- nao tratar como erro tecnico;
- nao tratar como negative control;
- retornar P-G / O-D / A-F;
- preservar low risk.

### 5.6 Fail criteria

O fixture deve falhar ou ficar em hold se:

- abrir outro ponto de fuga;
- classificar objetivo como O-A;
- classificar acao como A-G por feedback;
- ignorar alternativa disponivel;
- usar outcome/hindsight como chave de classificacao.

### 5.7 Fields que devem ser preservados

- `fixtureId`
- `sourceCaseId`
- `escapePointId`
- `directActor`
- `humanPoaApplicable`
- `negativeControl`
- `expectedP`, `expectedO`, `expectedA`
- `noReleasedCode`
- `noDownstream`

### 5.8 Fields que devem permanecer ausentes

- `selectedCode` (CLASSIFIED)
- `releasedCode`
- `finalConclusion`
- `hfacs`
- `riskErc`
- `armsErc`
- `recommendations`
- `downstream`

## 6. Contrato US-AIRWAYS-1549

### 6.1 Identidade do fixture

- fixtureId: `REF-P1A-US-AIRWAYS-1549-NEGATIVE-001`
- sourceCaseId: `US-AIRWAYS-1549`
- type: `negative_control`
- escapePointId: `US-AIRWAYS-1549-ESCAPE-001`
- unsafeConditionType: `technical_environmental_onset`
- directHumanActorAtEscapePoint: `none`
- humanPoaApplicable: `false`
- negativeControl: `true`

### 6.2 Output esperado

- expectedP: `NOT_APPLICABLE_AT_ESCAPE_POINT`
- expectedO: `NOT_APPLICABLE_AT_ESCAPE_POINT`
- expectedA: `NOT_APPLICABLE_AT_ESCAPE_POINT`

### 6.3 Minimal factual input

O futuro fixture deve conter apenas o input factual minimo necessario:

- aeronave em subida inicial;
- colisao com aves;
- perda substancial/quase total de empuxo bilateral;
- tripulacao responde apos o onset tecnico/ambiental;
- ponto de fuga e tecnico/ambiental, nao ato humano direto;
- nao avaliar decisao posterior de amaragem/retorno como ponto de fuga deste fixture.

### 6.4 Expected negative-control trace

| Step | Expected answer | Consequence |
|---|---|---|
| ESCAPE_POINT_IDENTIFIED | SIM | Continue. |
| UNSAFE_CONDITION_IDENTIFIED | SIM | Continue. |
| HUMAN_UNSAFE_ACT_AT_ESCAPE_POINT | NAO | Human P/O/A tree is not applied. |
| P_ROOT | NOT_APPLICABLE_AT_ESCAPE_POINT | No P code. |
| O_ROOT | NOT_APPLICABLE_AT_ESCAPE_POINT | No O code. |
| A_ROOT | NOT_APPLICABLE_AT_ESCAPE_POINT | No A code. |

### 6.5 Pass criteria

O fixture deve passar se:

- reconhecer ponto de fuga tecnico/ambiental (US-AIRWAYS-1549-ESCAPE-001);
- nao forcar P/O/A humano;
- nao classificar a tripulacao por acoes posteriores;
- retornar negative control / NOT_APPLICABLE_AT_ESCAPE_POINT.

### 6.6 Fail criteria

O fixture deve falhar se:

- classificar piloto com P/O/A no ponto de fuga;
- usar decisao posterior de amaragem como ponto de fuga deste fixture;
- transformar resposta bem-sucedida da tripulacao em unsafe act;
- abrir downstream.

### 6.7 Fields que devem ser preservados

- `fixtureId`
- `sourceCaseId`
- `escapePointId`
- `unsafeConditionType`
- `directHumanActorAtEscapePoint`
- `humanPoaApplicable`
- `negativeControl`
- `expectedP`, `expectedO`, `expectedA`
- `noReleasedCode`
- `noDownstream`

### 6.8 Fields que devem permanecer ausentes

- `selectedCode` (CLASSIFIED)
- `releasedCode`
- `finalConclusion`
- `hfacs`
- `riskErc`
- `armsErc`
- `recommendations`
- `downstream`

## 7. Proposta de arquivos para fase Codex futura

Os itens abaixo sao sugestoes para a fase A4R172-impl. NADA deve ser criado nesta fase.

- Diretorio de fixtures draft: `docs/sera-vnext/fixtures-draft-p1a/` (FUTURE_PHASE_ONLY)
- Arquivos JSON:
  - `REF-P1A-DAUMAS-CASE-4-POSITIVE-001.json` (FUTURE_PHASE_ONLY)
  - `REF-P1A-US-AIRWAYS-1549-NEGATIVE-001.json` (FUTURE_PHASE_ONLY)
- Script de validacao: `scripts/validate-fixtures-p1a.ts` (FUTURE_PHASE_ONLY)
- Documentacao de runner: `docs/sera-vnext/fixtures-draft-p1a/RUNNER.md` (FUTURE_PHASE_ONLY)

Tudo marcado como FUTURE_PHASE_ONLY. Nao criar agora.

## 8. Criterios de bloqueio para implementacao futura

A fase A4R172-impl deve parar imediatamente se:

- tentar atualizar baseline;
- tentar criar releasedCode;
- tentar abrir downstream;
- tentar classificar US-AIRWAYS-1549 com P/O/A humano;
- tentar alterar codigo fora do escopo autorizado;
- tentar adicionar EXECUFLIGHT-1526 no mesmo lote;
- tentar reclassificar P/O/A de qualquer caso;
- tentar criar novo ponto de fuga.

## 9. Validacoes esperadas para fase Codex futura

Comandos de validacao esperados na fase A4R172-impl (NAO executar agora):

- `npx tsc --noEmit` — typecheck se houver alteracao de codigo;
- parser dos fixtures (a definir);
- runner especifico se criado (a definir);
- `grep -r "selectedCode" docs/sera-vnext/fixtures-draft-p1a/` — deve retornar vazio;
- `grep -r "releasedCode" docs/sera-vnext/fixtures-draft-p1a/` — deve retornar vazio;
- `grep -r "downstream" docs/sera-vnext/fixtures-draft-p1a/` — deve retornar vazio;
- `grep -r "finalConclusion" docs/sera-vnext/fixtures-draft-p1a/` — deve retornar vazio;
- validar ausencia de terminologia incorreta do projeto nos fixtures draft;
- `git diff --name-only -- '*.ts'` — deve retornar vazio (sem alteracao de codigo);
- diff scope: apenas arquivos dentro de `docs/sera-vnext/fixtures-draft-p1a/`.

## 10. Recomendacao

A proxima fase, A4R172-impl, deve usar Codex e implementar exclusivamente o que este contrato permite:

- criar diretorio `docs/sera-vnext/fixtures-draft-p1a/`;
- criar dois arquivos JSON de fixture draft (DAUMAS-CASE-4 e US-AIRWAYS-1549);
- validar contra os criterios de passagem e falha definidos neste contrato;
- nao alterar baseline, runtime, tests/, codigo .ts, ou qualquer artefato fora do escopo.
