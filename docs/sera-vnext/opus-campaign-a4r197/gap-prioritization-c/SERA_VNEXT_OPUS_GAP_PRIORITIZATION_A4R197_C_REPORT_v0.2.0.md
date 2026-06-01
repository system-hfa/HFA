# SERA vNext Opus Gap Prioritization A4R197-C Report v0.2.0

Date: 2026-06-01
Phase: A4R197-C
Status:
- REVIEW_PRIORITIZATION_ONLY
- NO_SOURCE_RECOVERY
- NO_NEW_SYNTHETIC
- NO_MATERIALIZATION
- NO_PROMOTION
- PRODUCT_BLOCKED
- FIXTURE_BASELINE_BLOCKED
- A4R197_D_NOT_STARTED
- A4R197_E_NOT_STARTED
- A4R197_F_NOT_STARTED
- A4R194_M_NOT_STARTED
- A4R196_B_NOT_STARTED

Recommended model for this phase: Claude Opus (deep methodological review).
Fonte operacional de desenho: Daumas (methodology/reference-only, sem reentry automatico).

Esta fase A4R197-C e review/prioritization-only sobre os gaps metodologicos documentados.
Ela NAO materializa casos, NAO inicia source recovery, NAO abre A4R197-D/E/F, NAO promove
fixture, baseline ou produto, e NAO cria classificacao P/O/A.

## 1. Veredito geral

`REVIEW_PASS_WITH_WARNINGS`

O conjunto de gaps GAP-001..GAP-010 e bem definido na fonte autoritativa do repo
(`SERA_A4R193_P_SYNTHETIC_GAP_DESIGN_MATRIX.csv` e o pack A4R193-P), rastreado a eventos
reais de calibracao e a taxonomia A4R147 (TYPE-01..TYPE-10). A priorizacao e possivel sem
violar locks. Nenhum BLOCKER e nenhum achado HIGH. Avisos: (a) divergencia entre os nomes de
gap esperados no prompt e os nomes documentados no repo (NOTE, resolvida usando os nomes do
repo); (b) a rota de source recovery permanece bloqueada por F-002/F-003 da A4R197-B.

## 2. Sintese executiva

- Maior valor metodologico (P1): GAP-001 (PF/PM separation), GAP-002 (agent migration),
  GAP-003 (actor-specific sequenceRef), GAP-004 (consequence-as-cause), GAP-010
  (Colgan-style boundary decision).
- Source recovery primeiro (real-first), apos autorizacao e reparo de F-002: GAP-001,
  GAP-003, GAP-008.
- Synthetic design-only (guardrails/traps): GAP-002, GAP-004, GAP-006, GAP-007.
- Negative control: GAP-005.
- HOLD/defer por fonte fina: GAP-009.
- Decisao humana de fronteira: GAP-010 (parente da decisao PF/PM de GAP-001).

## 3. Divergencia de nomenclatura (NOTE C-001)

O prompt da fase esperava uma lista de nomes (ex.: GAP-002 = perception vs action; GAP-005 =
violation-language trap; GAP-008 = source-insufficient handling). A fonte autoritativa do
repo documenta nomes diferentes. Conforme regra da fase, foram usados os nomes do repo e a
divergencia foi registrada como NOTE, sem inventar gap novo. Os temas do prompt (perception/
action, violation-language, outcome trap, automation, source-insufficient, organizational
boundary) existem no repo, mas como taxonomia sintetica A4R147 (TYPE-01..TYPE-10) e como
coluna `methodological_risk`, nao como ids de gap.

Mapa autoritativo (repo):

- GAP-001 — PF_PM_separation
- GAP-002 — Agent_migration
- GAP-003 — Actor_specific_sequenceRef
- GAP-004 — Consequence_as_cause
- GAP-005 — Technical_environment_negative_control
- GAP-006 — Warning_callout_go_around_mechanism
- GAP-007 — Crew_collective_vs_individual_actor
- GAP-008 — Progressive_zone_anchor_precision
- GAP-009 — Automation_FMS_ambiguity
- GAP-010 — Colgan_style_boundary_decision

## 4. Revisao por gap

### GAP-001 — PF_PM_separation
- Base real: Thebaud, Vigo, Colgan 3407.
- Valor metodologico: ALTO. Ja possui controlled draft retido (A4R194-J) e eventos HOLD.
- Risco de ambiguidade: ALTO (agent boundary blur; PM-primary leakage).
- Escape point: define o ator do ponto de fuga; PM permanece zona de consequencia/callout.
- Lane recomendada: SOURCE_RECOVERY_CANDIDATE (real-first), pois o sintetico ja existe.
- Prioridade: P1. Gate minimo: SOURCE_CLOSURE_GATE + autorizacao humana.
- Risco se avancado agora: classificar PF/PM sem fechamento de fonte; promover HOLD→READY.

### GAP-002 — Agent_migration
- Base real: Asiana 214, Comair 5191, United 173, Colgan 3407.
- Valor metodologico: ALTO (guardrail de integridade do ator entre anchor e eixo P/O/A).
- Risco de ambiguidade: ALTO (troca implicita de agente apos o anchor).
- Lane recomendada: SYNTHETIC_DESIGN_ONLY_CANDIDATE (TYPE-09 violation-language trap).
- Prioridade: P1. Gate minimo: DESIGN_ONLY_GATE.
- Risco se avancado agora: design servir de base para reclassificacao de evento real.

### GAP-003 — Actor_specific_sequenceRef
- Base real: Thebaud, Peasmarsh, Vigo.
- Valor metodologico: ALTO. Liga-se a RISK-SEQREF-001 (coarse pf:03/pm:03 OPEN).
- Risco de ambiguidade: ALTO (ponto inicial de degradacao sem rastreio por ator).
- Lane recomendada: SOURCE_RECOVERY_CANDIDATE (evidencia de sequencia por ator).
- Prioridade: P1. Gate minimo: SOURCE_CLOSURE_GATE; refino design-only via ROUTE-2.
- Risco se avancado agora: inventar sequenceRef sem fonte.

### GAP-004 — Consequence_as_cause
- Base real: American 965, Delta 191, USAir 427, 5N-BQJ.
- Valor metodologico: ALTO (protege a regra central do ponto de fuga: outcome nao e causa).
- Risco de ambiguidade: ALTO (ancoragem dirigida por resultado).
- Lane recomendada: SYNTHETIC_DESIGN_ONLY_CANDIDATE (TYPE-08 outcome trap).
- Prioridade: P1. Gate minimo: DESIGN_ONLY_GATE.
- Risco se avancado agora: usar consequencia pos ponto de fuga para classificar P/O/A.

### GAP-005 — Technical_environment_negative_control
- Base real: Delta 191, USAir 427, 5N-BQJ.
- Valor metodologico: MEDIO-ALTO (evita falso positivo humano sob onset tecnico/ambiental).
- Risco de ambiguidade: MEDIO (forcar rotulo humano onde onset e tecnico).
- Lane recomendada: NEGATIVE_CONTROL_CANDIDATE.
- Prioridade: P2. Gate minimo: boundary/negative-control gate.
- Risco se avancado agora: forcar reentry humano e contaminar baseline futuro.

### GAP-006 — Warning_callout_go_around_mechanism
- Base real: Peasmarsh, Vigo.
- Valor metodologico: MEDIO (separa warning/callout do escape anchor; TYPE-07 ja no draft).
- Risco de ambiguidade: MEDIO (warning-as-anchor).
- Lane recomendada: SYNTHETIC_DESIGN_ONLY_CANDIDATE (com fonte real futura para Peasmarsh/Vigo).
- Prioridade: P2. Gate minimo: DESIGN_ONLY_GATE.
- Risco se avancado agora: ancorar tardiamente no warning.

### GAP-007 — Crew_collective_vs_individual_actor
- Base real: Colgan 3407, Asiana 214, UPS 1354, American 1420.
- Valor metodologico: MEDIO (impede que coletivo apague atos distintos; crew = context-only).
- Risco de ambiguidade: MEDIO.
- Lane recomendada: SYNTHETIC_DESIGN_ONLY_CANDIDATE (TYPE-10 organizational boundary).
- Prioridade: P2. Gate minimo: DESIGN_ONLY_GATE.
- Risco se avancado agora: colapsar dois atos em um ator coletivo.

### GAP-008 — Progressive_zone_anchor_precision
- Base real: American 965, American 1420, UPS 1354, Comair 5191, United 173.
- Valor metodologico: MEDIO (primeiro instante controlavel em zona progressiva ampla).
- Risco de ambiguidade: MEDIO.
- Lane recomendada: SOURCE_RECOVERY_CANDIDATE (precisao de anchor exige fonte).
- Prioridade: P2. Gate minimo: SOURCE_CLOSURE_GATE. Eventos N109W/N11NM (superseded) ficam P3.
- Risco se avancado agora: anchor impreciso em zona ampla.

### GAP-009 — Automation_FMS_ambiguity
- Base real: American 965 (fonte unica).
- Valor metodologico: MEDIO, mas base documental fina (evento unico).
- Risco de ambiguidade: ALTO (misturar ambiguidade de automacao com inferencia de intencao).
- Lane recomendada: HOLD.
- Prioridade: DEFER (P3). Gate minimo: ampliar base antes de design.
- Risco se avancado agora: sobre-generalizacao a partir de um unico evento.

### GAP-010 — Colgan_style_boundary_decision
- Base real: Colgan 3407.
- Valor metodologico: ALTO. E a decisao de fronteira PF/PM que sustenta GAP-001.
- Risco de ambiguidade: ALTO (fronteira dual-act nao explicita bloqueia gate consistente).
- Lane recomendada: REQUIRES_HUMAN_DECISION (boundary decision gate).
- Prioridade: P1. Gate minimo: decisao humana de fronteira antes de evolucao.
- Risco se avancado agora: divergir a fronteira PF/PM de GAP-001.

## 5. Relacao com F-002/F-003 da A4R197-B

- F-002 (MEDIUM): a rota da campanha Opus nao esta enumerada no authorization index/roadmap
  A4R196-A. Para os gaps marcados SOURCE_RECOVERY_CANDIDATE (GAP-001, GAP-003, GAP-008) e para
  GAP-005 (negative control via source), a ativacao de A4R197-E exige primeiro resolver F-002.
- F-003 (LOW): A4R197-E deve herdar SOURCE_CLOSURE_GATE (ROUTE-1) quando autorizada. Isso se
  aplica diretamente aos gaps de source recovery acima.
- Consequencia: A4R197-C nao reabre F-002/F-003; apenas os carrega como pre-condicao de
  A4R197-E. A4R197-D (design-only) nao depende de F-002/F-003.

## 6. Recomendacao de proxima fase

- A4R197-D (synthetic design review, design-only): PODE seguir mediante autorizacao humana
  explicita. Gaps prioritarios para design-only: GAP-002, GAP-004, GAP-006, GAP-007.
- A4R197-E (source recovery): permanece BLOQUEADA ate reparo de F-002 e heranca de
  SOURCE_CLOSURE_GATE (F-003). Gaps que aguardam source recovery: GAP-001, GAP-003, GAP-008
  (e GAP-005 como negative control com fonte).
- HOLD: GAP-009 (defer por fonte unica).
- Decisao humana de fronteira: GAP-010.
- STOP_AND_HOLD permanece compativel como default de execucao.

Detalhamento em
`SERA_VNEXT_OPUS_GAP_PRIORITIZATION_MATRIX_A4R197_C.csv`,
`SERA_VNEXT_OPUS_GAP_PRIORITIZATION_FINDINGS_A4R197_C.csv` e
`SERA_VNEXT_OPUS_GAP_PRIORITIZATION_NEXT_PHASE_DECISION_A4R197_C.md`.

## 7. Confirmacao de nao execucao

Esta fase A4R197-C confirma explicitamente que NAO houve:

- source recovery iniciada;
- sintetico novo criado ou materializado;
- abertura de A4R197-D, A4R197-E ou A4R197-F;
- classificacao P/O/A criada;
- selectedCode permanece null; releasedCode permanece null; finalConclusion permanece null;
- CLASSIFIED permanece nao marcado e bloqueado;
- fixture, baseline ou produto promovido;
- HFACS/Risk/ERC/ARMS/ERC/recommendations criados;
- Daumas usado como reentry automatico;
- evento real transformado em sintetico ou vice-versa;
- engine/runtime, legacy runtime, source-corpus, supabase, fixtures, baseline, migrations,
  produto e UI/API alterados.

Opus atuou como revisor/priorizador, nao como autor soberano de classificacao.
