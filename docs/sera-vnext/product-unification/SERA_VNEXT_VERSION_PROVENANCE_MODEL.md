# SERA vNext — Modelo de Proveniência de Versão

**Data**: 2026-06-08

---

## Problema Resolvido

Antes desta macrofase, havia uma divergência entre:
- `engine_version` (coluna DB): `'0.1.0'` — bloqueado por constraint na migration inicial
- `engine_output.engineVersion` (JSON aninhado): `'0.2.0'` — runtime real do ENGINE_VERSION.ts

Isso tornava impossível saber, apenas lendo o row, qual versão do motor **efetivamente** gerou o output.

---

## Modelo de Proveniência (após migration)

### Campos no DB (`sera_vnext_analyses`, `sera_vnext_analysis_revisions`)

| Campo | Tipo | Exemplo | Descrição |
|---|---|---|---|
| `engine_version` | text NOT NULL | `'0.1.0'` | Versão do contrato DB (locked por constraint original) |
| `engine_runtime_version` | text NULL | `'0.2.0'` | Versão executável real usada (ENGINE_VERSION.ts) |
| `methodology_version` | text NOT NULL | `'SERA_PT_V1_FROZEN'` | Metodologia aplicada |
| `canonical_tree_version` | text NULL | `'SERA_PT_V1'` | Versão da árvore canônica SERA PT |
| `source_flow` | text NULL | `'VNEXT_PRODUCT_BETA'` | Fluxo de origem do registro |
| `baseline_id` | text NOT NULL | `'SERA_VNEXT_BASELINE_V0'` | ID do baseline de fixture |
| `fixture_set_id` | text NOT NULL | `'SERA_VNEXT_FIXTURE_SET_V0'` | Set de fixtures de validação |
| `code_commit` | text NOT NULL | SHA do commit | Referência de código |

### Campos no engine_output (JSON aninhado)

| Campo | Exemplo | Descrição |
|---|---|---|
| `engineVersion` | `'0.2.0'` | Versão runtime (igual a engine_runtime_version) |
| `methodologyVersion` | `'SERA_PT_V1_FROZEN'` | Metodologia |
| `baselineId` | `'SERA_VNEXT_BASELINE_V0'` | Baseline |
| `mode` | `'CANDIDATE_ONLY'` | Modo de operação |

---

## Semântica dos Valores

### engine_version vs engine_runtime_version

```
engine_version        = contrato DB = 0.1.0
engine_runtime_version = runtime real = 0.2.0
```

Os dois diferem porque o contrato DB foi fechado na migration `20260607135727` com a constraint `engine_version = '0.1.0'`. O runtime avançou para 0.2.0 mas a constraint não foi alterada. A solução foi adicionar a coluna `engine_runtime_version` sem quebrar o contrato.

### source_flow

| Valor | Significado |
|---|---|
| `LEGACY_SERA` | Análise do pipeline SERA legacy (tabela `analyses`) |
| `VNEXT_ALPHA` | Análise do Product Alpha (fase anterior) |
| `VNEXT_BETA` | Análise genérica vNext beta |
| `VNEXT_PRODUCT_BETA` | Análise do Product Beta atual (tabela `sera_vnext_analyses`) |
| `VNEXT_CANONICAL` | Futura análise canônica pelo /api/analyze com flag ativada |

### Registros históricos (antes da migration)

Registros criados antes da migration `20260608210000` terão `NULL` em `engine_runtime_version`, `source_flow` e `canonical_tree_version`. Isso é **correto** — não backfillar com valores fabricados.

O unified adapter expõe `limitations` indicando falta de rastreamento para esses registros.

---

## Coerência de Versão

Após a migration, novos registros Product Beta terão:
```
engine_version           = '0.1.0'        (contrato DB, não muda)
engine_runtime_version   = '0.2.0'        (runtime real)
methodology_version      = 'SERA_PT_V1_FROZEN'
canonical_tree_version   = 'SERA_PT_V1'
source_flow              = 'VNEXT_PRODUCT_BETA'
```

E o `engine_output.engineVersion` = `'0.2.0'` — coerente com `engine_runtime_version`.

---

## Migration

Arquivo: `supabase/migrations/20260608210000_sera_vnext_provenance_columns.sql`  
Status: **MIGRATION_CREATED_NOT_APPLIED**

Colunas adicionadas (ADD COLUMN IF NOT EXISTS — aditiva, sem DROP, sem alteração destrutiva):
- `engine_runtime_version text null` em `sera_vnext_analyses`
- `source_flow text null` em `sera_vnext_analyses`
- `canonical_tree_version text null` em `sera_vnext_analyses`
- `engine_runtime_version text null` em `sera_vnext_analysis_revisions`
- `source_flow text null` em `sera_vnext_analysis_revisions`

Rollback: `ALTER TABLE DROP COLUMN` para cada coluna adicionada.
