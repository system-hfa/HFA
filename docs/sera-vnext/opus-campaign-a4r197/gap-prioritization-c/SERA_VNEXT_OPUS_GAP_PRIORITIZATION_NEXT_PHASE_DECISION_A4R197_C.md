# SERA vNext Opus Gap Prioritization Next Phase Decision A4R197-C v0.2.0

Date: 2026-06-01
Phase: A4R197-C
Status:
- DECISION_RECOMMENDATION_ONLY
- HUMAN_DECISION_REQUIRED
- A4R197_D_NOT_STARTED
- A4R197_E_NOT_STARTED
- A4R197_F_NOT_STARTED

Fonte operacional de desenho: Daumas (methodology/reference-only, sem reentry automatico).

## 1. Veredito de entrada

A4R197-C fechou com `REVIEW_PASS_WITH_WARNINGS`. BLOCKER 0, HIGH 0, MEDIUM 1, LOW 2, NOTE 2.

## 2. A4R197-D pode seguir?

- SIM, mediante autorizacao humana explicita.
- Natureza: synthetic_design_review, design-only, sem materializacao.
- Gaps prioritarios para design-only: GAP-002, GAP-004, GAP-006, GAP-007.
- Gate minimo: DESIGN_ONLY_GATE. Locks de promocao preservados.

## 3. A4R197-E continua bloqueada por F-002/F-003?

- SIM. A4R197-E (source recovery) permanece BLOQUEADA.
- F-002 (MEDIUM): a rota da campanha Opus nao esta enumerada no authorization index/roadmap
  A4R196-A; deve ser resolvida antes de ativar source recovery.
- F-003 (LOW): A4R197-E deve herdar `SOURCE_CLOSURE_GATE` (ROUTE-1) quando autorizada.
- Gaps que aguardam source recovery (apos reparo e autorizacao): GAP-001, GAP-003, GAP-008,
  e GAP-005 como negative control com fonte.

## 4. Reparo documental necessario antes de A4R197-E

- Registrar a vinculacao campanha Opus ↔ ROUTE-1 (SOURCE_RECOVERY) e a forma de autorizacao
  da campanha no authorization index A4R196-A (resolver F-002).
- Declarar heranca explicita de `SOURCE_CLOSURE_GATE` para A4R197-E (resolver F-003).
- Para A4R197-D nenhum reparo bloqueante e necessario.

## 5. Gap priorizado para synthetic design-only

- Prioridade imediata de design-only: GAP-004 (consequence-as-cause / outcome trap), por
  proteger diretamente a regra do ponto de fuga, seguido de GAP-002 (agent migration).
- GAP-006 e GAP-007 sao design-only complementares (warning trap; organizational boundary).

## 6. Eventos/gaps que devem aguardar source recovery

- GAP-001: Thebaud, Vigo, Colgan 3407 (P1).
- GAP-003: Thebaud, Peasmarsh, Vigo (P1).
- GAP-008: American 965, American 1420, UPS 1354, Comair 5191, United 173 (P2);
  N109W e N11NM (superseded) ficam P3.
- GAP-005 (negative control): Delta 191, USAir 427, 5N-BQJ (P2).
- Nenhum evento passa de HOLD para READY sem fechamento de fonte e contorno em fase propria.

## 7. HOLD / defer

- GAP-009 (automation/FMS ambiguity): HOLD/DEFER por base de fonte unica (American 965).

## 8. Decisao humana de fronteira

- GAP-010 (Colgan-style boundary decision): REQUIRES_HUMAN_DECISION; manter acoplado a
  GAP-001 para nao divergir a fronteira PF/PM.

## 9. Recomendacao formal

- Manter `STOP_AND_HOLD` como default de execucao.
- Se autorizado, seguir A4R197-D (design-only) antes de A4R197-E (source recovery).
- Source recovery (real-first) apenas apos reparo de F-002/F-003 e autorizacao humana.

## 10. Locks preservados

- fixture/baseline/produto: bloqueados.
- selectedCode, releasedCode e finalConclusion permanecem null.
- CLASSIFIED: nao marcado e bloqueado.
- HFACS/Risk/ERC/ARMS/ERC/recommendations: bloqueados.
- Daumas reentry automatico: bloqueado.
- GAP-001 controlled draft retido, sem promocao.
- PM-primary: nao iniciado, exige draft separado.
- A4R197-D / A4R197-E / A4R197-F / A4R196-B / A4R194-M: nao iniciados.

## 11. Non-initiation statement

A4R197-C nao inicia A4R197-D, A4R197-E nem A4R197-F. Toda proxima fase exige decisao humana
explicita com modelo recomendado declarado e gates de bloqueio preservados.
