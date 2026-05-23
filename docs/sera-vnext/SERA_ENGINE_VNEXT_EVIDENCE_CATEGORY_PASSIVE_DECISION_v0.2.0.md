# SERA Engine vNext Evidence Category Passive Decision v0.2.0

Status: DRAFT_FOR_REVIEW
Phase: A4+R-52 — Evidence Category Passive Decision

## Objetivo
Formalizar a decisão de adoção imediata das evidence categories no core vNext sem alterar classificação, sem criar bloqueios novos e sem abrir downstream.

## Opções avaliadas
- A) manter `DESIGN_ONLY`.
- B) ativar `PASSIVE_OPTIONAL_METADATA`.
- C) ativar modo `WARNING`.
- D) ativar modo `BLOCKING`.

## Decisão recomendada
`PASSIVE_OPTIONAL_METADATA` (opção B).

## Interpretação operacional da decisão
- Evidence categories podem aparecer como hints/metadados opcionais.
- Evidence categories não são obrigatórias nesta fase.
- Ausência de categoria não bloqueia gate.
- Presença de categoria não altera classificação.
- Categoria não libera downstream.
- Categoria não autoriza `CLASSIFIED`, `finalConclusion`, HFACS, Risk/ERC ou recommendations.

## Uso metodológico esperado no modo passivo
- Apoiar leitura do semantic guard em revisões humanas futuras.
- Apoiar rastreabilidade de preconditions candidatas.
- Apoiar preparação de amostra para inter-rater.

## Categorias críticas para evolução futura
- `PHYSICAL_CAPABILITY` para fronteira `A-D`.
- `INTENT_AWARENESS` para fronteiras `O-B/O-C`.
- `TIME_PRESSURE` para fronteiras `P-D/A-H/A-I/A-J`.
- `PROCEDURAL_MONITORING` e `FEEDBACK_VERIFICATION` para fronteiras `P-G/A-C`.
- `COMMUNICATION_INFORMATION` para fronteiras `P-H/A-J`.

## Critérios para evoluir de passivo para warning
- Reference cases materializados em quantidade mínima útil.
- Adversarial set estável em execução controlada.
- Revisão humana com uso consistente de categorias em amostra piloto.
- Nenhum aumento relevante de falso bloqueio/falso alarme no fluxo causal.

## Guardrails mantidos
- Sem mudança de taxonomia canônica.
- Sem mudança de decisão autoral A-A/A-C.
- Sem ativação de `O-E`.
- Sem downstream.
- Sem claim de validação científica.
