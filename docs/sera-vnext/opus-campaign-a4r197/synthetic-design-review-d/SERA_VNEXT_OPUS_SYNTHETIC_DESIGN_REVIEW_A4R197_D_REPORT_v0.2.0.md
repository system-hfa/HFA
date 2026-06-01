# SERA vNext Opus Synthetic Design Review A4R197-D Report v0.2.0

Date: 2026-06-01
Phase: A4R197-D
Status:
- SYNTHETIC_DESIGN_REVIEW_ONLY
- DESIGN_ONLY_GATE
- REVIEW_PASS_WITH_WARNINGS
- NO_SOURCE_RECOVERY
- NO_NEW_SYNTHETIC
- NO_MATERIALIZATION
- NO_SYNTHETIC_CASE_CREATED
- NO_PROMOTION
- PRODUCT_BLOCKED
- FIXTURE_BASELINE_BLOCKED
- A4R197_E_NOT_STARTED
- A4R197_F_NOT_STARTED
- A4R196_B_NOT_STARTED
- A4R194_M_NOT_STARTED

Fonte operacional de desenho: Daumas (methodology/reference-only, sem reentry automatico).
Papel do Opus nesta fase: revisor/priorizador de design, nao autor soberano de eventos sinteticos.

## 1. Veredito

`REVIEW_PASS_WITH_WARNINGS`.

Esta fase revisa apenas o desenho (design-only) dos dois gaps sinteticos P1 priorizados em
A4R197-C: GAP-004 (Consequence_as_cause / TYPE-08 outcome trap) e GAP-002 (Agent_migration /
TYPE-09 violation-language trap). Nenhum caso sintetico foi criado, nem materializado, nem
promovido a fixture/baseline/produto. A separacao evento real vs sintetico permanece
preservada: real-first como corpus de calibracao/recuperacao de fonte; sintetico apenas para
cobrir lacuna documentada, nunca confundido com evento real.

## 2. Sintese executiva

- Os dois gaps tem alto valor metodologico e alto risco de ambiguidade se materializados sem
  guardrails. A revisao produz criterios e guardrails de desenho (ver guardrails CSV), nao
  instancias.
- GAP-004 e GAP-002 compartilham um mesmo nucleo de risco: contaminacao do ancoramento P/O/A
  por informacao posterior ao ponto de fuga (outcome) ou por troca implicita de ator/agente
  apos o escape anchor. Ambos atacam a regra do ponto de fuga.
- Recomenda-se priorizar GAP-004 antes de GAP-002 no futuro blueprint design-only, por proteger
  diretamente a regra do ponto de fuga (anti-outcome) que e pre-condicao para qualquer
  resolucao de migracao de agente em GAP-002.
- Os achados (findings CSV) registram 0 BLOCKER, 0 HIGH, 1 MEDIUM e 2 LOW/NOTE. O MEDIUM herda
  F-002 (rastreabilidade de autorizacao de rota), que nao bloqueia design-only mas continua
  bloqueando A4R197-E (source recovery).

## 3. Review por gap

### 3.1 GAP-004 — Consequence_as_cause

- gap_id: GAP-004
- gap_name: Consequence_as_cause
- methodological_risk: outcome_driven_anchor_selection (usar impacto/alerta/resultado como causa).
- design_goal: protect_pre_outcome_anchor (TYPE-08 outcome trap).
- minimum_future_synthetic_requirements: timeline com ponto de fuga marcado antes de qualquer
  outcome; pelo menos um distrator de outcome posterior ao escape anchor; rotulo P/O/A definido
  somente no instante de abandono da operacao segura.
- negative_controls_required: variante onde o outcome severo NAO altera o ancoramento; variante
  tecnica/ambiental dominante (GAP-005) confirmando nao-forcamento de rotulo humano.
- forbidden_design_patterns: ancorar P/O/A em consequencia; usar gravidade do resultado para
  selecionar a causa; introduzir o outcome antes do escape anchor na narrativa.
- evidence_boundary: evidencia admissivel termina no escape anchor; tudo posterior e contexto
  de consequencia, nao causa.
- escape_point_boundary: ponto de fuga e o unico instante de classificacao; consequencias
  pos-fuga sao proibidas como base de causa.
- actor_boundary: ator do escape anchor e fixo; outcome nao pode reatribuir ator.
- what_future_case_must_not_do: nao gerar instancia agora; nao produzir narrativa completa
  classificavel; nao emitir saida final; nao usar para fixture/baseline.
- recommended_next_step: outcome_trap_design (blueprint design-only) sob autorizacao humana.
- base real (referencia, sem reentry): American 965, Delta 191, USAir 427, 5N-BQJ.

### 3.2 GAP-002 — Agent_migration

- gap_id: GAP-002
- gap_name: Agent_migration
- methodological_risk: axis_agent_switch_after_anchor (troca implicita de agente entre escape
  anchor e o eixo P/O/A).
- design_goal: block_implicit_agent_switch (TYPE-09 violation-language trap).
- minimum_future_synthetic_requirements: ator do escape anchor declarado e estavel; ponto de
  troca de agente, se houver, explicito e posterior, nunca silencioso; linguagem de violacao
  isolada para nao migrar o eixo de ator.
- negative_controls_required: variante sem migracao (ator unico do inicio ao fim); variante de
  fronteira coletivo vs individual (GAP-007) confirmando resolucao dual de ator.
- forbidden_design_patterns: migrar ator apos o anchor sem marcacao; usar linguagem de violacao
  para reatribuir agente; colapsar PF/PM em ator unico (acoplado a GAP-001/GAP-010).
- evidence_boundary: a base de ator e fixada no escape anchor; trocas posteriores exigem marca
  explicita e nao redefinem o ancoramento.
- escape_point_boundary: classificacao no ponto de fuga; migracao de agente nao recua o anchor.
- actor_boundary: PF/PM permanecem distintos; nenhum fallback para ator coletivo.
- what_future_case_must_not_do: nao gerar instancia; nao reclassificar evento real; nao
  materializar; nao criar fixture; nao desacoplar de GAP-010 a decisao de fronteira PF/PM.
- recommended_next_step: author_boundary_gate (blueprint design-only) sob autorizacao humana,
  apos GAP-004.
- base real (referencia, sem reentry): Asiana 214, Comair 5191, United 173, Colgan 3407.

## 4. Relacao com A4R197-C

A4R197-C priorizou GAP-004 e GAP-002 como P1 SYNTHETIC_DESIGN_ONLY_CANDIDATE. A4R197-D nao
amplia esse escopo: apenas converte a priorizacao em guardrails de desenho verificaveis, sem
materializar. NOTE C-001 (divergencia de nomes) permanece valida; os nomes autoritativos do
repo (Consequence_as_cause, Agent_migration) sao mantidos, com a divergencia registrada e sem
inventar gaps.

## 5. Relacao com F-002 / F-003

- F-002 (MEDIUM): a rota da campanha Opus -> ROUTE-1 (SOURCE_RECOVERY) ainda nao esta enumerada
  no authorization index/roadmap A4R196-A. Nao bloqueia A4R197-D (design-only), mas continua
  bloqueando A4R197-E (source recovery).
- F-003 (LOW): A4R197-E deve herdar `SOURCE_CLOSURE_GATE` quando autorizada. Sem efeito sobre
  design-only.

## 6. Recomendacao de proxima fase

- Manter `STOP_AND_HOLD` como default de execucao.
- Se autorizado por humano, seguir blueprint design-only comecando por GAP-004, depois GAP-002.
- Nao iniciar A4R197-E (source recovery) ate reparo de F-002/F-003 e autorizacao humana.
- Nenhuma materializacao ocorre sem aprovacao humana explicita.

## 7. Confirmacoes explicitas

Esta fase confirma que NAO houve:
- criacao de caso sintetico (NO_SYNTHETIC_CASE_CREATED);
- materializacao (NO_MATERIALIZATION);
- novo sintetico (NO_NEW_SYNTHETIC; sintetico novo nao criado nem materializado);
- recuperacao de fonte (NO_SOURCE_RECOVERY; source recovery NOT_STARTED);
- inicio de A4R197-E (A4R197_E_NOT_STARTED);
- promocao a fixture/baseline/produto.

## 8. Locks preservados

- fixture/baseline/produto: bloqueados.
- selectedCode, releasedCode e finalConclusion permanecem null.
- CLASSIFIED: nao marcado e bloqueado.
- HFACS/Risk/ERC/ARMS/ERC/recommendations: bloqueados.
- Daumas reentry automatico: bloqueado (reference-only).
- GAP-001 controlled draft retido, sem promocao.
