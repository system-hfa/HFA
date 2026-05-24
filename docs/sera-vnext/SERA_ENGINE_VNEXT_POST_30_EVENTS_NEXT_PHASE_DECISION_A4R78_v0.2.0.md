# SERA Engine vNext Post-30 Events Next Phase Decision A4R78 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-78

## Objetivo
Decidir a próxima trilha principal após a consolidação de 30 eventos reais em draft, sem criar release, fixture, baseline ou downstream.

## Opções avaliadas
| opção | nome | avaliação |
|---|---|---|
| A | Enrichment sprint para casos críticos | Necessário, mas melhor depois de padronizar questionPath para comparar lacunas de forma homogênea. |
| B | Release Criteria Design para proposedCode -> releasedCode | Autorizável como docs-only em fase futura, mas prematuro antes de questionPath uniforme. |
| C | External Investigation Report Harvest | Útil para reduzir source partial, mas não resolve a coexistência de dois formatos de adjudicação. |
| D | QuestionPath Template/Backfill | Melhor próxima fase metodológica: padroniza o raciocínio antes de discutir release. |
| E | Product display contract for unresolved/guarded narrative | Útil para produto, mas deve vir após estabilizar o formato de decisão. |

## Leitura honesta
- 30 eventos dão base operacional interna melhor que 15.
- 30 eventos ainda não autorizam claim científico externo.
- 30 eventos ainda não autorizam `releasedCode` automático.
- O único `A-F` draft não sustenta release de eixo A.
- A presença de `O-C`/`O-D` em Batch 3 autoriza desenho futuro de critérios, não promoção imediata.
- A coexistência de 15 casos sem questionPath padronizado e 15 com questionPath torna prematuro comparar todos os casos como se tivessem o mesmo nível de rastreabilidade.

## Recomendação escolhida
**A4+R-79 — QuestionPath Template and Backfill Plan.**

Justificativa:
- cria template canônico para novos casos;
- define plano de backfill dos 15 primeiros sem alterar decisões;
- melhora comparabilidade antes de release criteria;
- reduz risco de critérios de release baseados em formatos heterogêneos;
- mantém a fase em docs-only e sem downstream.

## Sequência recomendada
1. **A4+R-79 — QuestionPath Template and Backfill Plan**.
2. **A4+R-80 — Release Criteria Design** (docs-only, sem runtime/release automático).
3. **A4+R-81 — External Investigation Report Harvest**, se lacunas de fonte ainda bloquearem casos críticos.

## Confirmações
- esta decisão não cria `releasedCode`;
- não abre downstream;
- não cria consensus validated;
- não gera finalConclusion/HFACS/Risk/ERC/recommendations.
