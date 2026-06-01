# SERA vNext Human Decision Package - A4R195-C v0.2.0

Date: 2026-06-01
Phase: A4R195-C
Status: decision intake only

Fonte operacional de desenho: Daumas (methodology/reference-only, sem reentry automatico).

## 1. Purpose

- Apresentar ao usuario as opcoes de proxima fase metodologica.
- NAO executar nenhuma opcao.
- Registrar que A4R195-C e intake decisorio apenas; a decisao final e humana.

A4R195-C nao implementa produto, nao cria sintetico novo, nao inicia A4R194-J, nao
materializa sintetico, nao altera engine, nao cria fixture/baseline e nao abre UI/API.

## 2. Current state

- A4R195-A (consolidacao) e A4R195-B (governance board/registers) concluidas e validadas.
- A4R194: GAP-001 PF/PM permanece draft design-only, com auditoria final (H) e guardrail de
  autorizacao (I).
- A4R194-J: NAO iniciado; exige nova autorizacao humana explicita.
- Produto/UI/API: BLOQUEADO.
- Fixture/baseline: BLOQUEADO.
- Source recovery: PERMITIDO (caminho real-first de governanca).
- Segundo sintetico: BLOQUEADO ate decisao explicita de encerramento sobre GAP-001.
- Daumas: methodology/reference-only, sem reentry automatico.
- RR-001: OPEN.
- RR-003: PARTIALLY_MITIGATED.

## 3. Decision options (rotas)

- ROTA 0 - STOP_AND_HOLD: parar agora e manter o estado consolidado.
- ROTA 1 - A4R194-J: controlled materialization draft minimo do GAP-001 PF/PM
  (sem fixture, sem baseline, sem produto, sem classificacao final).
- ROTA 2 - SOURCE_RECOVERY_ADDITIONAL: recuperar fontes adicionais de eventos HOLD.
- ROTA 3 - BASELINE_METHODOLOGY_PACKAGE_DESIGN_ONLY: preparar pacote de metodologia de
  baseline em design-only, SEM promocao.
- ROTA 4 - SECOND_SYNTHETIC: preparar um segundo sintetico, apenas DEPOIS de decisao sobre
  GAP-001. Permanece bloqueado nesta fase.
- ROTA 5 - PRODUCT_UI_API: permanece BLOQUEADO. Sem formulario de autorizacao nesta fase.
- ROTA 6 - INDEPENDENT_OPUS_AUDIT: auditoria independente externa/Opus antes de qualquer
  avanco sensivel.

## 4. Recommended decision

Recomendacao tecnica objetiva (a decisao final permanece humana):

- Se a prioridade for seguranca/baixo custo: ROTA 0 (parar) ou ROTA 2 (source recovery).
- Se a prioridade for avancar no sintetico: ROTA 1 (A4R194-J) com modelo forte
  (GPT-5.5 Thinking, ou Opus para countercheck independente) e todas as travas mantidas.
- Produto/UI/API (ROTA 5) NAO deve avancar agora: e cedo demais.
- ROTA 6 (auditoria independente/Opus) e recomendada antes de qualquer avanco sensivel,
  especialmente antes de fixture/baseline futuros.

A decisao final e humana e exige autorizacao textual explicita (secao 5).

## 5. Explicit authorization format

Para autorizar uma rota, o usuario deve escrever exatamente um dos textos abaixo. Nenhuma
rota e executada sem o texto correspondente.

- ROTA 0 (parar):
  "Autorizo STOP_AND_HOLD - encerrar e manter o estado metodologico consolidado, sem
  iniciar nenhuma proxima fase de execucao."

- ROTA 1 (A4R194-J):
  "Autorizo A4R194-J - controlled materialization draft minimo do synthetic pilot GAP-001
  PF/PM, mantendo sem fixture, sem baseline, sem produto, sem selectedCode, sem
  releasedCode, sem finalConclusion e sem classificacao final."

- ROTA 2 (source recovery):
  "Autorizo SOURCE_RECOVERY - recuperacao adicional de fontes de eventos HOLD, sem promover
  nenhum evento de HOLD para READY sem fechamento de fonte e contorno."

- ROTA 3 (baseline design-only):
  "Autorizo BASELINE_METHODOLOGY_PACKAGE_DESIGN_ONLY - preparar pacote de metodologia de
  baseline em design-only, sem promover nada para baseline."

- ROTA 4 (segundo sintetico):
  "Autorizo SECOND_SYNTHETIC apenas apos decisao explicita sobre GAP-001 - preparar um
  segundo sintetico de gap, sem fixture, sem baseline e sem produto."

- ROTA 6 (auditoria independente):
  "Autorizo INDEPENDENT_AUDIT - auditoria metodologica independente (Opus ou externa) antes
  de qualquer avanco sensivel."

Produto/UI/API (ROTA 5) e promocao de fixture/baseline NAO possuem formulario de
autorizacao nesta fase, porque permanecem bloqueados.

## 6. Non-execution statement

A4R195-C nao executa nenhuma rota. Todas as opcoes permanecem `authorized_now=false`,
exceto source recovery, que ja e um caminho de governanca permitido mas que ainda assim
nao e iniciado automaticamente por esta fase. A proxima fase (A4R195-D) depende de decisao
humana.
