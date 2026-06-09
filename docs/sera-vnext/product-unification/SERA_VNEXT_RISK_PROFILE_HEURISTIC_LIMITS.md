# SERA vNext — Limites Heurísticos do Perfil de Risco

**Data**: 2026-06-08

---

## Score de Risco

O score atual é um **índice descritivo interno** — não validado como medida de risco operacional.

### Fórmula

```
baseScore = ((P_total × 1.0 + O_total × 0.8 + A_total × 0.6) / total_analyses / 3) × 100
score = min(baseScore + penalties, 100)
```

### Classificação do Score

| Faixa | Nível | Label |
|---|---|---|
| ≥ 70 | critical | Crítico |
| ≥ 40 | warning | Atenção |
| < 40 | ok | Normal |

### Penalidades

| Condição | Penalidade |
|---|---|
| Ações corretivas vencidas > 0 | +15 pontos |
| Eventos este mês > 1.5× média 90 dias | +5 pontos |

### Limitações Explícitas

1. **Pesos não calibrados**: P×1.0, O×0.8, A×0.6 são arbitrários. Não refletem gravidade real de falha.
2. **Não validado empiricamente**: sem comparação com dados de acidentes reais para calibração.
3. **Score não é probabilidade**: não representa probabilidade de acidente futuro.
4. **Mistura de versões**: legacy e vNext têm metodologias distintas; agregação direta é aproximação.
5. **Amostra mínima ignorada**: score é calculado mesmo com < 10 análises.

### UI Obrigatória

O frontend DEVE exibir junto ao score:
> "Índice descritivo interno — não validado como medida de risco operacional."

---

## ERC (Error Risk Category)

O ERC é calculado a partir de combinações de códigos P/O/A via `computeHfaErcCategoryFromCodes`.

### Classificação do Agregado

| Categoria | Tipo |
|---|---|
| `modal_erc_level` | DERIVED_HEURISTIC |
| `erc_distribution` | DIRECT_COUNT |
| `total_analyses` | DIRECT_COUNT |
| `included_events` | DIRECT_COUNT |
| `excluded_events` | DIRECT_COUNT |

---

## Precondições

Precondições são extraídas do `engine_output.preconditions` (vNext) ou de `analyses.preconditions` (legacy).

Limitação: formatos diferentes entre versões. O adapter normaliza por `category` (vNext) e `code` (legacy) mas os espaços de valores são distintos.

---

## Combinações P/O/A (Padrões Recorrentes)

Pares P+O, P+A, O+A são contados por ocorrência em análises incluídas. Threshold de 20 combinações top. Tipo: DERIVED_HEURISTIC.

---

## Data Confidence

Calculada via `buildDataConfidence`:
- `minimum_recommended = 10` análises.
- Abaixo do mínimo: `LOW` confidence, mensagem de amostra insuficiente.
- `INSUFFICIENT_SAMPLE` quando `totalAnalyses = 0`.
