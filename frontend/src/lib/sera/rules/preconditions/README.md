# SERA Preconditions Matrix (Deterministic Layer)

Esta pasta contem uma operacionalizacao HFA/SERA derivada de Hendy/Daumas e
dos fixtures ouro. O objetivo e selecionar preconditions de forma deterministica
depois que os codigos finais ja foram definidos.

## Escopo

- Entrada: `perception_code`, `objective_code`, `action_code`, `erc_level` e
  `eventText`.
- Saida: lista ordenada, estavel e sem duplicatas de preconditions.
- Esta camada nao influencia P/O/A/ERC.

## Papel da LLM

A LLM pode justificar texto, mas nao deve ser a fonte principal de escolha das
preconditions. A selecao principal e feita pelo selector deterministico.

## Evolucao

Versoes futuras devem incluir citacao metodologica por regra na matriz
(`matrix.json`) para rastreabilidade de origem.
