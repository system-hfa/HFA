# Resultados em Staging — Reconciliação de Duplicatas HFA

## Data: 2026-06-09 (execução) / 2026-06-10 (UTC)

## Base de Dados

- **Total de eventos**: 40
- **Eventos ativos pré-reconciliação**: 33
- **Eventos soft-deleted pré-reconciliação**: 1
- **Eventos PURGED (synthetic)**: 6
- **Tenants**: 3

## Grupos de Duplicidade Detectados

| # | Grupo | Nível | Título Canônico | Total | Duplicados |
|---|-------|-------|-----------------|-------|------------|
| 1 | GRP-477ec7c2eeb3 | A | Teste — Trem de pouso não acionado | 4 | 3 |
| 2 | GRP-c083ad8104f9 | B | Teste 2 | 2 | 1 |
| 3 | GRP-bf8516b968bc | B | teste | 6 | 5 |
| 4 | GRP-c8e291bd8faf | A | teste cenipa | 2 | 1 |
| 5 | GRP-345df8c743b1 | A | [CANONICAL_ROUTING_ON_TEST] Debug | 2 | 1 |
| 6 | GRP-b111200ffba0 | B | [CANONICAL_ROUTING_OFF_TEST] Debug | 4 | 3 |

## Eventos com Erro (Standalone Failed)

- `[CANONICAL_ROUTING_TEST_FLAGS_OFF]` — status=failed
- `[CANONICAL_ROUTING_ON_TEST] Synthetic` — status=failed

## Execução

- **Soft-deletes realizados**: 16 (14 duplicados + 2 failed)
- **Falhas**: 0
- **Recuperáveis até**: 2026-07-10 (30 dias)

## Pós-Reconciliação

- **Eventos ativos**: 17
- **Eventos soft-deleted**: 17
- **Títulos duplicados em ativos**: 0
- **Eventos com status failed em ativos**: 0
