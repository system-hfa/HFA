# SERA Baseline Comparator

Compara um relatório atual gerado pelo runner SERA contra um baseline salvo, identificando regressões, melhorias e mudanças por fixture.

## Uso

```bash
npx tsx tests/sera/compare-baseline.ts --baseline <path> --current <path> [flags]
```

## Flags

| Flag | Descrição |
|---|---|
| `--baseline <path>` | JSON do baseline (ex: `tests/reports/baseline/sera-baseline-v0.1-smoke.json`) |
| `--current <path>` | JSON do relatório atual |
| `--compact` | Saída resumida (1 linha + lista de diffs) |
| `--fail-on-regression` | Exit code 1 se houver qualquer regressão |
| `--help` | Mostra ajuda |

## Exemplos

### Comparação completa

```bash
# Gerar relatório atual
npx tsx tests/sera/run.ts --n-runs 1

# Comparar contra baseline
npx tsx tests/sera/compare-baseline.ts \
  --baseline tests/reports/baseline/sera-baseline-v0.1-smoke.json \
  --current tests/reports/run-XXXX.json
```

### Com relatório parcial (--group)

```bash
# Gerar relatório de apenas 1 grupo
npx tsx tests/sera/run.ts --group erc --n-runs 1 --compact

# Comparar — o comparador detecta que é parcial automaticamente
npx tsx tests/sera/compare-baseline.ts \
  --baseline tests/reports/baseline/sera-baseline-v0.1-smoke.json \
  --current tests/reports/run-XXXX.json --compact
```

Saída esperada:
```
[BASELINE] 98.1% → 100.0% (+1.9%) | regressions 0 | improvements 0 | changed 0 | PARTIAL
```

### CI / fail-on-regression

```bash
npx tsx tests/sera/compare-baseline.ts \
  --baseline tests/reports/baseline/sera-baseline-v0.1-smoke.json \
  --current tests/reports/run-XXXX.json \
  --fail-on-regression || echo "Regressão detectada!"
```

## Classificação de diferenças

| Categoria | Critério |
|---|---|
| **regression** | `overall_accuracy` diminuiu, ou `fully_deterministic` foi perdido |
| **improvement** | `overall_accuracy` aumentou, ou `fully_deterministic` foi ganho |
| **changed** | Códigos mudaram mas scores/accuracy permaneceram iguais |
| **unchanged** | Nenhuma diferença relevante |
| **missing_from_current** | Fixture no baseline ausente no current (se current completo) |
| **new_in_current** | Fixture no current ausente no baseline |

## Relatórios parciais

Quando o relatório atual tem menos fixtures que o baseline (ex: gerado com `--group`), o comparador:

- Detecta automaticamente e exibe `PARTIAL`
- NÃO classifica fixtures ausentes como `missing_from_current`
- Compara apenas as fixtures presentes em ambos

## Limitações

- O comparador não substitui o smoke global completo. Use para validações rápidas durante desenvolvimento.
- Variação natural do LLM pode causar falsos positivos em `--fail-on-regression`. Prefira usar com `--n-runs 3` para reduzir ruído.
- O baseline v0.1 foi gerado com `n_runs_per_fixture: 1`, portanto o `determinism_rate` do baseline é trivial (100%).
