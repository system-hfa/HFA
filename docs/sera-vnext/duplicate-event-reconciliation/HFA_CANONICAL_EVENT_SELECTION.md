# Seleção de Registro Canônico — HFA

## Regra de Sobrevivência

Para cada grupo de duplicidade, exatamente um evento sobrevive como registro canônico.

## Critérios de Pontuação (ordem de prioridade)

1. Análise vNext concluída (HUMAN_REVIEW_COMPLETED_NON_FINAL)
2. Análise legacy presente
3. Status = completed
4. Mais revisões/reviews
5. Narrativa mais rica (raw_input maior)
6. Evento ativo (não soft-deleted)
7. Evento original mais antigo (created_at menor)

## Preferência Geral

1. Registro com análise vNext revisada
2. Registro com maior completude de dados
3. Registro com vínculos relevantes (corrective actions, attachments)
4. Registro original mais antigo
5. Em empate: bloquear automação, requer revisão humana

## O Que NUNCA Usar como Critério

- Menor ID numérico
- Ordem alfabética de título
- Escolha arbitrária sem pontuação
