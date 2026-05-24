# SERA Engine vNext QuestionPath Review A4R78 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-78

## Objetivo
Avaliar a introdução documental de `questionPath` por eixo nos 15 casos do Batch 3 e definir a próxima evolução metodológica.

## O que é questionPath
`questionPath` é o registro explícito de perguntas, respostas sintéticas, evidência e impacto por eixo P/O/A. Ele torna visível o caminho usado para propor um draft ou manter `UNRESOLVED`.

## Por que foi introduzido
- reduzir conclusões livres em adjudicações AI/Author;
- separar pergunta metodológica de resposta factual;
- tornar evidente quando a evidência não fecha um eixo;
- facilitar correção autoral pontual;
- preparar futura transformação em template canônico ou schema.

## Cobertura
| corpus | cobertura |
|---|---|
| Batch inicial | não padronizado |
| Batch 2 | não padronizado |
| Batch 3 | 15/15 com `P_axis_questionPath`, `O_axis_questionPath` e `A_axis_questionPath` |

## Benefícios
- reduz aparência de conclusão livre;
- mostra perguntas/respostas por eixo;
- melhora auditabilidade;
- facilita correção autoral;
- facilita futura transformação em schema/runtime;
- torna `UNRESOLVED` mais defensável porque registra a pergunta que não pôde ser respondida.

## Limitações
- ainda é documental;
- ainda não é release gate;
- ainda não é questionPath executável;
- ainda depende de qualidade de evidência;
- ainda não há backfill padronizado para os 15 primeiros eventos;
- ainda não define thresholds para converter draft em `releasedCode`.

## Próxima evolução recomendada
1. Criar template canônico de questionPath para todos os eventos futuros.
2. Criar plano de backfill opcional para os 15 primeiros eventos.
3. Usar o backfill para comparar consistência de decisões antes/depois do questionPath.
4. Só depois considerar schema/runtime ou release gate.

## Confirmações
- questionPath não é `releasedCode`.
- questionPath não transforma `selectedCode` em `CLASSIFIED`.
- questionPath não gera finalConclusion, HFACS, Risk/ERC ou recommendations.
- questionPath não abre downstream.
