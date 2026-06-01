# Synthetic Pilot GAP-001 PF/PM Separation Design A4R194-A v0.2.0

Status:
- DESIGN_ONLY
- NO_SYNTHETIC_CASE_INSTANCE
- CANDIDATE_ONLY
- PRODUCT_BLOCKED
- PILOT_DESIGN_READY_FOR_AUDIT

## 1. Gap alvo

- Gap: `GAP-001 PF/PM separation`

## 2. Real-event basis

Este piloto e derivado somente de lacunas reais observadas em:
- Thebaud
- Peasmarsh
- Vigo
- Colgan 3407

## 3. Problema metodologico

- `crew collective` isolado e insuficiente para certos gates de causalidade.
- PF e PM nao segregados aumentam risco de `agent migration`.
- Cadeia warning/callout/go-around sem ator definido enfraquece contrato `agent-act-moment`.
- `sequenceRef` macro nao substitui `sequenceRef` por ator.

## 4. Objetivo do piloto

Desenhar um futuro piloto sintetico que possa:
- testar separacao PF/PM;
- distinguir PF, PM, `crew collective` e consequencia pos-evento;
- manter ponto de fuga antes da consequencia;
- reduzir risco de overclassification em fronteiras multi-ator.

## 5. Fora de escopo

- Nao e evento real.
- Nao e fixture.
- Nao e baseline.
- Nao gera codigo SERA final.
- Nao gera conclusoes finais nem outputs downstream.

## 6. Requisitos minimos para materializacao futura

- `agentId` separado para PF e PM.
- `agentKind` definido para cada ator.
- `unsafeActOrOmission` observavel por ator.
- `operationalMoment.sequenceRef` por ator.
- `pointTopology` explicito no ponto de fuga.
- `boundaryEvidenceRefs` internas sinteticas marcadas explicitamente como sinteticas.
- Distincao explicita entre evento primario e consequencia.
- Regra de nao migracao entre eixos P/O/A para o mesmo anchor causal.

## 7. Criterios de rejeicao

Rejeitar tentativa de materializacao futura se:
- depender de `crew collective` generico;
- nao distinguir PF/PM;
- usar consequencia como causa;
- inventar pergunta SERA;
- tentar promover para fixture ou baseline.

## 8. Gate de governanca

Antes de qualquer materializacao futura:
- autorizacao humana explicita obrigatoria;
- auditoria metodologica obrigatoria;
- verificacao de bloqueio de produto/UI/API obrigatoria;
- proibicao de uso como referencia real permanece ativa.

## 9. Estado final desta fase

`PILOT_DESIGN_READY_FOR_AUDIT`.

Nenhum caso sintetico foi materializado nesta fase.
