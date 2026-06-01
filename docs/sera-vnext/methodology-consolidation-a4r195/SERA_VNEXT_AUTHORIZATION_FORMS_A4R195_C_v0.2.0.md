# SERA vNext Authorization Forms - A4R195-C v0.2.0

Date: 2026-06-01
Phase: A4R195-C
Status: authorization intake only

Fonte operacional de desenho: Daumas (methodology/reference-only).

Cada formulario abaixo so tem efeito se o usuario escrever o texto exato de autorizacao.
Nenhuma rota e executada por esta fase.

## Form 1 - STOP_AND_HOLD

- Texto exato:
  "Autorizo STOP_AND_HOLD - encerrar e manter o estado metodologico consolidado, sem
  iniciar nenhuma proxima fase de execucao."
- O que autoriza: registrar encerramento e manter o estado consolidado atual.
- O que NAO autoriza: qualquer execucao, materializacao, produto, fixture ou baseline.
- Modelo recomendado: codex_gpt_5_3_high (encerramento documental deterministico).
- Riscos: minimos; pode adiar avanco metodologico desejado.

## Form 2 - A4R194-J

- Texto exato:
  "Autorizo A4R194-J - controlled materialization draft minimo do synthetic pilot GAP-001
  PF/PM, mantendo sem fixture, sem baseline, sem produto, sem selectedCode, sem
  releasedCode, sem finalConclusion e sem classificacao final."
- O que autoriza: criar um controlled materialization draft minimo do GAP-001 PF/PM, com
  trial proprio e auditoria posterior obrigatoria.
- O que NAO autoriza: fixture, baseline, produto/UI/API, selectedCode, releasedCode,
  finalConclusion, classificacao final, HFACS, Risk/ERC, ARMS/ERC ou recommendations.
- Modelo recomendado: gpt_5_5_thinking; Opus opcional para countercheck independente.
- Riscos: boundary-sensitive; risco de synthetic-as-real e de consequence-as-cause se as
  travas nao forem mantidas. RR-001 permanece OPEN.

## Form 3 - SOURCE_RECOVERY

- Texto exato:
  "Autorizo SOURCE_RECOVERY - recuperacao adicional de fontes de eventos HOLD, sem promover
  nenhum evento de HOLD para READY sem fechamento de fonte e contorno."
- O que autoriza: recuperar e documentar fontes adicionais de eventos HOLD (real-first).
- O que NAO autoriza: promover HOLD para READY sem fechamento de fonte/boundary; criar
  fixture/baseline; abrir produto.
- Modelo recomendado: codex_gpt_5_3_high.
- Riscos: baixos; custo incremental de documentacao.

## Form 4 - BASELINE_PACKAGE_DESIGN_ONLY

- Texto exato:
  "Autorizo BASELINE_METHODOLOGY_PACKAGE_DESIGN_ONLY - preparar pacote de metodologia de
  baseline em design-only, sem promover nada para baseline."
- O que autoriza: desenhar a metodologia de baseline em design-only.
- O que NAO autoriza: promocao para baseline; fixture; produto; outputs finais.
- Modelo recomendado: gpt_5_5_thinking.
- Riscos: medio; risco de promocao prematura se a fronteira design-only nao for mantida.

## Form 5 - SECOND_SYNTHETIC

- Texto exato:
  "Autorizo SECOND_SYNTHETIC apenas apos decisao explicita sobre GAP-001 - preparar um
  segundo sintetico de gap, sem fixture, sem baseline e sem produto."
- O que autoriza: somente apos decisao explicita sobre GAP-001, iniciar o desenho de um
  segundo sintetico.
- O que NAO autoriza: iniciar antes da decisao GAP-001; fixture; baseline; produto.
- Modelo recomendado: gpt_5_5_thinking.
- Riscos: alto se iniciado fora de ordem; pode diluir o foco do GAP-001.

## Form 6 - INDEPENDENT_AUDIT

- Texto exato:
  "Autorizo INDEPENDENT_AUDIT - auditoria metodologica independente (Opus ou externa) antes
  de qualquer avanco sensivel."
- O que autoriza: executar auditoria independente profunda do estado metodologico.
- O que NAO autoriza: qualquer execucao de rota auditada; produto; fixture; baseline.
- Modelo recomendado: opus (ou GPT-5.5 Thinking como alternativa).
- Riscos: baixos; custo de modelo mais alto.

## Blocked items without authorization form

- Produto/UI/API: NAO possui formulario de autorizacao nesta fase, porque permanece
  bloqueado.
- Promocao de fixture/baseline: NAO possui formulario de autorizacao nesta fase, porque
  permanece bloqueado.
