# SERA Runner — Modos Econômicos

Modos opcionais de execução do runner de validação SERA para reduzir custo e acelerar iterações.

## Uso

```bash
npx tsx tests/sera/run.ts [flags]
```

## Flags

### `--n-runs <n>`
Número de execuções por fixture. Reduzir de 3 para 1 corta o custo em ~67%.

Default: `3` (ou `SERA_N_RUNS`).
```bash
npx tsx tests/sera/run.ts --n-runs 1
```

### `--filter <texto>`
Filtra fixtures cujo ID contém `<texto>`. Útil para testar uma fixture específica.

```bash
npx tsx tests/sera/run.ts --filter TEST-O-D-001
```

### `--group <nome>`
Filtra fixtures por grupo baseado no prefixo do ID.

| Grupo           | Prefixo       |
|-----------------|---------------|
| perception      | `TEST-P-`     |
| objective       | `TEST-O-`     |
| action          | `TEST-A-`     |
| erc             | `TEST-ERC-`   |
| combo           | `TEST-COMBO-` |
| generalization  | `TEST-GEN-`   |
| preconditions   | `TEST-T2-`    |

```bash
npx tsx tests/sera/run.ts --group perception --n-runs 1
```

### `--fail-fast`
Interrompe a execução no primeiro FAIL ou ERROR. Não interrompe em PARTIAL.

```bash
npx tsx tests/sera/run.ts --fail-fast
```

### `--compact`
Saída resumida no terminal (1-2 linhas). O relatório JSON completo continua sendo salvo normalmente.

```bash
npx tsx tests/sera/run.ts --compact --n-runs 1
```

Saída exemplo:
```
[SERA] 54f × 1r | PASS 53 | PARTIAL 1 | FAIL 0 | ERROR 0 | rate 98.1% | det 100.0%
[SERA] não-PASS: TEST-O-D-001 (0.0%)
  Relatório: tests/reports/run-1234567890.json
```

### `--deterministic-only`
Roda apenas fixtures marcadas como determinísticas em um baseline anterior.
Requer `--baseline <path>`.

```bash
npx tsx tests/sera/run.ts --deterministic-only --baseline tests/reports/baseline/sera-baseline-v0.1-smoke.json
```

**Atenção:** esta opção depende da existência de um baseline multi-run para ter significado real (o baseline v0.1 foi single-run, portanto todas as fixtures são trivially deterministic). Para obter uma lista significativa, gere primeiro um baseline com `--n-runs 3`.

### `--baseline <path>`
Caminho para um JSON de baseline usado por `--deterministic-only`.

```bash
npx tsx tests/sera/run.ts --deterministic-only --baseline tests/reports/baseline/sera-baseline-v0.1-smoke.json
```

### `--help`
Mostra a ajuda com todas as flags disponíveis.

## Compatibilidade

As env vars `SERA_N_RUNS` e `SERA_FIXTURE` continuam funcionando como antes:

```bash
SERA_N_RUNS=1 SERA_FIXTURE=TEST-P- npx tsx tests/sera/run.ts
```

Flags CLI têm precedência sobre env vars.

## TODO: Cache LLM (não implementado)

Cache de respostas LLM não está implementado nesta versão. O risco metodológico é alto: um cache ingênuo baseado apenas em hash do rawText reutilizaria respostas mesmo após mudanças de modelo, provider, prompts, pipeline ou regras — invalidando o baseline silenciosamente.

Para implementar de forma segura no futuro, incluir na chave de cache:

1. **Versão do pipeline SERA** (commit hash ou tag de release).
2. **Modelo + provider** (ex: `deepseek-reasoner`).
3. **Hash dos prompts metodológicos** (arquivos em `frontend/src/lib/sera/prompts.ts`).
4. **Hash do rawText** (já considerado).

Com essa chave composta, uma mudança em qualquer camada invalida o cache automaticamente. O armazenamento pode ser em `tests/reports/cache/` como arquivos JSON ou SQLite para maior escala.
