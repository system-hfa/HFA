# Contrato de Detecção de Duplicatas — HFA

## Normalizadores

### Título
- lowercase, strip accents (NFD), remove punctuation, collapse whitespace
- Exemplo: `"Teste — Trem de pouso não acionado"` → `"teste trem de pouso nao acionado"`

### Narrativa
- lowercase, collapse whitespace, SHA-256 (16 hex chars)
- Usado para comparar raw_input entre eventos

### Data
- ISO 8601 date part (YYYY-MM-DD)

## Algoritmo de Agrupamento

1. Filtrar eventos não-PURGED
2. Agrupar por (tenant_id, normalized_title)
3. Dentro de cada grupo, comparar hash de narrativa para nível A
4. Grupos com >1 evento = grupo de duplicidade

## Algoritmo de Seleção Canônica

Score por critério:
- status=completed: +10
- status=failed: -5
- status=received: -3
- não deletado: +5
- raw_input > 500 chars: +3
- raw_input > 5000 chars: +5
- tem análise vNext: +10
- tem análise legacy: +5

Maior score = canônico. Empate → bloqueia automação.

## Execução

- Soft-delete via `events.deletion_status = 'SOFT_DELETED'`
- `recoverable_until = now() + 30 days`
- `deletion_reason = 'DUPLICATE_EVENT_RECONCILIATION'` ou `'FAILED_EVENT_CLEANUP'`
- Lifecycle events registrados em `event_deletion_events`
