# SERA Engine vNext Real Event Source Enrichment Plan v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-65 — Source Enrichment Plan

## Objetivo
Definir plano de enriquecimento factual para os casos que ainda não sustentam avanço metodológico seguro por eixo, sem liberar `releasedCode`, sem fixture e sem downstream.

## Casos que exigem enriquecimento
- REAL-EVENT-ADJUDICATION-004 (REAL-EVENT-0006)
- REAL-EVENT-TRIAGE-005 (REAL-EVENT-0028)

## Plano para REAL-EVENT-ADJUDICATION-004
Buscar/registrar:
- fonte técnica primária ou relatório mais completo;
- sequência temporal detalhada de DAFCS/TRIM FAIL;
- ações/checklists/resets efetivamente executados;
- entendimento declarado da tripulação por etapa;
- decisão/condição que levou ao ditching;
- evidência para separar falha técnica dominante vs resposta humana por eixo.

Resultado esperado para saída de enrichment:
- trilha factual que permita avaliar P e A sem inferência forte;
- manutenção explícita de incertezas remanescentes.

## Plano para REAL-EVENT-TRIAGE-005
Buscar/registrar:
- fonte primária ou technical report identificável;
- cronologia mínima de aproximação/pouso;
- layout do local e posição do fuel bowser;
- comunicação/coordenação solo-ar relevante;
- separação de ator de voo vs ator de solo;
- evidência mínima para sair de `SOURCE_PARTIAL`.

Resultado esperado para saída de enrichment:
- sair de `TRIAGE_ONLY` para `STRUCTURED_EXTRACTION_READY` com evidência rastreável.

## Critérios mínimos de source anchor
Um caso só sai de enrichment quando possuir:
- fonte identificável (oficial/técnica robusta);
- locator de referência (página/seção/trecho);
- fragmentos factuais suficientes e citáveis;
- sequência mínima de evento;
- atores mínimos identificáveis;
- incertezas explícitas documentadas.

## O que NÃO fazer
- Não usar fonte secundária fraca como gabarito.
- Não classificar P/O/A apenas com índice.
- Não criar Risk/HFACS/recommendations.
- Não promover `proposedCode` para `releasedCode`.
