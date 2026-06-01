# SERA vNext Batch 1 Source Recovery Review A4R197-E v0.2.0

Date: 2026-06-01
Phase: A4R197-E
Route: ROUTE-1 / SOURCE_RECOVERY
Gate: SOURCE_CLOSURE_GATE (herdado de A4R199-A)
Status:
- SOURCE_RECOVERY_REVIEW_EXECUTED
- NO_POA_CLASSIFICATION
- NO_READY_PROMOTION
- FIXTURE_BASELINE_PRODUCT_BLOCKED
- SELECTED_RELEASED_FINAL_CLASSIFIED_BLOCKED
- DOWNSTREAM_BLOCKED
- NO_WEB_SEARCH
- NO_EXTERNAL_DOWNLOAD
- SOURCE_CORPUS_UNCHANGED

## 1. Objetivo

Executar revisao documental de suficiencia de fonte (source recovery review) para os 9
eventos do Batch 1 preparado em A4R199-A, sob o `SOURCE_CLOSURE_GATE`.

Esta fase avalia apenas:
- suficiencia de fonte;
- identificacao de lacunas;
- emissao de verdicts controlados;
- priorizacao de proximos passos.

Esta fase NAO executa:
- classificacao P/O/A;
- promocao READY;
- abertura de selected/released/final/CLASSIFIED;
- promocao de fixture/baseline/produto;
- qualquer output downstream.

## 2. Autorizacao humana limitada

A mensagem humana de A4R197-E autoriza iniciar source recovery review sob o
`SOURCE_CLOSURE_GATE`, conforme a ponte A4R199-A.

Escopo autorizado:
- avaliacao de suficiencia de fonte;
- identificacao de lacunas;
- verdicts controlados;
- priorizacao de proximos passos.

Escopo NAO autorizado (mantido bloqueado):
- classificacao P/O/A;
- promocao READY;
- fixture / baseline / produto;
- selectedCode / releasedCode / finalConclusion / CLASSIFIED;
- downstream.

## 3. Relacao com A4R199-A

A4R199-A definiu:
- F-002 = RESOLVED_FOR_AUTHORIZATION_BRIDGE;
- F-003 = RESOLVED_FOR_SOURCE_CLOSURE_GATE_INHERITANCE;
- `SOURCE_CLOSURE_GATE` obrigatorio;
- Batch 1 readiness matrix (9 eventos).

A4R197-E herda integralmente esses contratos e nao abre rota independente.
Sem fechamento do gate por item, o item permanece em `HOLD_FOR_HUMAN_DECISION`.

## 4. Aplicacao do SOURCE_CLOSURE_GATE

Para cada evento foram avaliados os criterios obrigatorios do gate:
1. fonte primaria ou secundaria oficial rastreavel;
2. locator / document reference verificavel;
3. factual evidence separado de conclusao externa;
4. cronologia suficiente para o ponto de fuga;
5. actor attribution suficiente;
6. PF/PM attribution suficiente quando aplicavel;
7. sequenceRef suficiente quando aplicavel;
8. outcome / consequence em quarentena;
9. sem classificacao P/O/A nesta fase;
10. sem READY promotion;
11. sem fixture / baseline / produto.

Regra metodologica central: P/O/A so seria analisado no instante do ponto de fuga da
operacao segura. Consequencias posteriores permanecem como contexto/desenvolvimento e nunca
sao usadas para cacar falha posterior de percepcao, objetivo ou acao.

Hendy permanece como fonte metodologica primaria para goal/perception/action e active
failure. Daumas permanece como referencia metodologica e de operacionalizacao, sem reentry
automatico e sem promover evento automaticamente para READY.

## 5. Revisao por evento

### 5.1 Colgan 3407 (B1-001) — GAP-001, GAP-010
Fonte: SOURCE-SLICE-COLGAN-3407-A4R115 (NTSB, SOURCE_DIRECT_OR_PRIMARY_LIKE), extracao
A4R180-EXTRACTION-0004 (STRUCTURED_EXTRACTION_COMPLETE, multiActorHandled=true).
- Fonte e cronologia: suficientes e rastreaveis.
- PF/PM boundary: a separacao depende da decisao humana parente GAP-010
  (Colgan-style boundary decision), nao fechada nesta fase.
- Risco de agent migration: ALTO — nao migrar falha automaticamente entre PF/PM.
- Outcome em quarentena; resultado final nao usado como causa.
- Verdict: **SOURCE_RECOVERY_PARTIAL** (fonte forte; fechamento PF/PM pendente de GAP-010).

### 5.2 Thebaud (B1-002) — GAP-001, GAP-003, GAP-008
Fonte: REAL-EVENT-EXTRACTION-001, sourceType OFFICIAL_REPORT (TSB A19A0055),
extractionConfidence HIGH, sourceLocator presente.
- Cronologia: suficiente ate o estado de baixa energia / recuperacao a ~13 ft.
- Ponto de fuga: candidato ambiguo (transicao para visual vs instante de degradacao
  energetica detectavel) — registrado como aberto, nao forcado.
- PF/PM: NAO separados nesta fase.
- sequenceRef: temporalidade exata dos callouts nao decomposta.
- Outcome em quarentena (conclusoes/causas TSB excluidas).
- Verdict: **SOURCE_RECOVERY_PARTIAL** (fonte primaria ok; PF/PM e sequenceRef insuficientes).

### 5.3 Peasmarsh (B1-003) — GAP-001, GAP-003, GAP-008
Fonte: REAL-EVENT-EXTRACTION-002, sourceType OFFICIAL_REPORT / AAIB,
extractionConfidence HIGH, sourceLocator presente.
- Cronologia: aproximacao noturna descontinuada, descida em direcao as arvores, alerta
  EGPWS nao percebido.
- Risco: warning-as-anchor — o alerta EGPWS nao deve ser usado como ancora do ponto de fuga.
- PF/PM: pendente de separacao factual.
- sequenceRef: nao decomposto.
- Outcome em quarentena (recomendacoes/julgamentos AAIB excluidos).
- Verdict: **SOURCE_RECOVERY_PARTIAL** (fonte ok; precisao de sequencia/ancora insuficiente).

### 5.4 Vigo (B1-004) — GAP-001, GAP-003, GAP-008
Fonte: REAL-EVENT-EXTRACTION-003, sourceType notification-level summary,
extractionConfidence MEDIUM, sem paginacao primaria detalhada.
- Cronologia: descida inadvertida ate ~50 ft em tarefa de posicionamento SAR/treino.
- actor attribution: tripulacao de voo com possivel interacao de tripulacao de missao;
  papeis nao segregados — risco de usar crew collective como fallback.
- sequenceRef: mecanismo exato (comando/automacao/percepcao) nao fechado.
- Outcome em quarentena.
- Verdict: **SOURCE_STILL_INSUFFICIENT** (fonte notification-level; actor e sequenceRef
  nao fecham o gate; necessaria fonte primaria CIAIAC antes de qualquer review mais profundo).

### 5.5 Delta 191 (B1-005) — GAP-005
Fonte: corpus recuperado a4r111-recovered-pool-txt
`40__1986__NTSB-USA__Lockheed-L-1011-385-1__NTSB-AAR-86-05-Delta-191.txt`.
- Dominancia tecnica/ambiental (microburst / windshear) evidenciada.
- Caution: microburst/windshear/ambiente NAO devem ser convertidos automaticamente em falha
  humana; resultado grave nao prova P/O/A.
- Risco de forced human reentry: registrado e bloqueado.
- Verdict: **NEGATIVE_CONTROL_CANDIDATE** (controle negativo tecnico/ambiental).

### 5.6 USAir 427 (B1-006) — GAP-005, GAP-008
Fonte: SOURCE-SLICE-USAIR-427-A4R115 (ACCESSED, SOURCE_DIRECT_OR_PRIMARY_LIKE),
extracao A4R180-EXTRACTION-0015 em EXTRACTION_HOLD por
`overclassification_risk_technical_rudder_dominance`.
- Fronteira technical-human: dominancia tecnica de leme (rudder) cria risco de
  overclassification humana.
- Conclusao externa deve permanecer separada de factual evidence.
- Verdict: **BOUNDARY_CASE_ONLY** (fronteira tecnico-humano; nao promover sem cronologia e
  locator suficientes que sustentem ator humano sem forcamento).

### 5.7 N109W (B1-007) — GAP-008
Fonte: subset superseded; A4R81 registra rascunho UNRESOLVED/BLOCKED (sem release).
- Mantido como HOLD por supersession; rascunho historico nao e evidencia ativa.
- Nao reativar; nao converter candidato antigo em review ativo sem decisao humana.
- Verdict: **REQUIRES_HUMAN_DECISION** (permanece HOLD_FOR_HUMAN_DECISION; DO_NOT_USE_FOR_REENTRY).

### 5.8 N11NM (B1-008) — GAP-008
Fonte: subset superseded; A4R81 registra rascunho UNRESOLVED/BLOCKED (sem release).
- Mantido como HOLD por supersession; rascunho historico nao e evidencia ativa.
- Nao reativar; nao converter candidato antigo em review ativo sem decisao humana.
- Verdict: **REQUIRES_HUMAN_DECISION** (permanece HOLD_FOR_HUMAN_DECISION; DO_NOT_USE_FOR_REENTRY).

### 5.9 5N-BQJ (B1-009) — GAP-005
Fonte: REAL-EVENT-EXTRACTION-004, sourceType OFFICIAL_REPORT / PRELIMINARY / INTERIM,
extractionConfidence MEDIUM. PF/PM identificados na fonte (FO=PF, comandante=PM).
- Dominancia tecnica/sistemica (DAFCS/TRIM FAIL recorrente) sobre conduta ativa.
- Caution: nao forcar ator humano direto se a falha tecnica e dominante;
  cadeia causal tecnica permanece aberta.
- Verdict: **NEGATIVE_CONTROL_CANDIDATE** (dominancia tecnica offshore; sem over-attribution
  de ator direto humano).

## 6. Achados transversais

- T-01: A trinca Thebaud/Peasmarsh/Vigo compartilha insuficiencia de PF/PM e sequenceRef
  (GAP-001/GAP-003); Vigo e o mais fraco (notification-level, sem paginacao primaria).
- T-02: Delta 191, USAir 427 e 5N-BQJ concentram risco de technical/environmental dominance
  (GAP-005); nenhum deve sofrer forced human reentry.
- T-03: Colgan 3407 tem fonte forte, mas o fechamento PF/PM esta acoplado a decisao humana
  GAP-010 e exposto a agent migration.
- T-04: N109W e N11NM permanecem superseded/HOLD; rascunhos historicos P/O/A nao sao
  evidencia ativa e nao habilitam reentry.
- T-05: Separacao real/synthetic preservada; nenhum sintetico foi criado, materializado ou
  confundido com evento real.

## 7. Gaps impactados

- GAP-001 (PF_PM_separation): suportado por Colgan/Thebaud/Peasmarsh/Vigo, mas sem fechamento.
- GAP-003 (Actor_specific_sequenceRef): permanece dependente de fonte; nenhum sequenceRef inventado.
- GAP-005 (Technical_environment_negative_control): Delta 191, USAir 427, 5N-BQJ como controles.
- GAP-008 (Progressive_zone_anchor_precision): N109W/N11NM superseded permanecem P3/HOLD.
- GAP-010 (Colgan_style_boundary_decision): permanece REQUIRES_HUMAN_DECISION.

## 8. Proximos passos (resumo; detalhe no NEXT_PHASE_DECISION)

- Candidatos a eventual deeper source recovery: Colgan 3407, Thebaud, Peasmarsh.
- Insuficiente: Vigo (precisa de fonte primaria CIAIAC).
- Controles negativos/boundary: Delta 191, 5N-BQJ (negative), USAir 427 (boundary).
- HOLD mantido: N109W, N11NM.

## 9. Confirmacoes obrigatorias

- Nenhuma classificacao P/O/A foi produzida nesta fase.
- Nenhum evento foi promovido para READY.
- fixture / baseline / produto continuam bloqueados.
- selectedCode / releasedCode / finalConclusion / CLASSIFIED / downstream continuam bloqueados.
- Nenhuma web search e nenhum download externo foram executados.
- source-corpus nao foi alterado.
- Separacao real/synthetic preservada; Daumas permanece reference-only sem reentry automatico.
- Termos invalidos (forbidden terminology) nao foram usados como entidade ativa.
