# SERA vNext — Migrations e Rollback

**Data**: 2026-06-08

---

## Migration Criada

**Arquivo**: `supabase/migrations/20260608210000_sera_vnext_provenance_columns.sql`  
**Status**: `MIGRATION_CREATED_NOT_APPLIED`

### Conteúdo

Adiciona colunas de proveniência a `sera_vnext_analyses` e `sera_vnext_analysis_revisions`:

```sql
-- sera_vnext_analyses
ADD COLUMN engine_runtime_version text null
ADD COLUMN source_flow text null
ADD COLUMN canonical_tree_version text null

-- sera_vnext_analysis_revisions
ADD COLUMN engine_runtime_version text null
ADD COLUMN source_flow text null
```

### Invariantes

- Estritamente aditiva: `ADD COLUMN IF NOT EXISTS`.
- Sem DROP, sem ALTER de colunas existentes.
- Sem alteração de constraints existentes.
- Sem backfill automático (registros históricos ficam com NULL — correto).
- Defaults: NULL (compatível com registros existentes).
- RLS: inalterada.
- Grants: inalterados.
- Índices: dois novos índices de consulta (`engine_runtime_version`, `source_flow`).

---

## Histórico de Migrations

| Arquivo | Data | Conteúdo |
|---|---|---|
| `20260607135727_sera_vnext_product_beta.sql` | 2026-06-07 | Schema inicial Product Beta, RLS, constraints, triggers |
| `20260607164500_sera_vnext_product_beta_non_final_status_fix.sql` | 2026-06-07 | Fix de status non-final |
| `20260608190000_risk_profile_exclusions.sql` | 2026-06-08 | Exclusões lógicas do Risk Profile |
| `20260608210000_sera_vnext_provenance_columns.sql` | 2026-06-08 | **Esta migration** — proveniência |

---

## Como Aplicar (quando autorizado)

```bash
# Verificar migration history
supabase db diff

# Revisar a migration
cat supabase/migrations/20260608210000_sera_vnext_provenance_columns.sql

# Aplicar apenas no ambiente autorizado
supabase db push --db-url <STAGING_URL>

# Verificar resultado
supabase db inspect
```

**Nunca aplicar automaticamente em produção.**

---

## Rollback da Migration

```sql
ALTER TABLE public.sera_vnext_analyses
  DROP COLUMN IF EXISTS engine_runtime_version,
  DROP COLUMN IF EXISTS source_flow,
  DROP COLUMN IF EXISTS canonical_tree_version;

ALTER TABLE public.sera_vnext_analysis_revisions
  DROP COLUMN IF EXISTS engine_runtime_version,
  DROP COLUMN IF EXISTS source_flow;

DROP INDEX IF EXISTS sera_vnext_analyses_runtime_version_idx;
DROP INDEX IF EXISTS sera_vnext_analyses_source_flow_idx;
```

**Efeito do rollback**: registros criados após a migration perdem os campos de proveniência. O código em `versioning.ts` tenta persistir esses campos — fallback: são ignorados pelo Postgres sem erro (colunas não existem → INSERT ignora).

---

## Rollback de Feature Flags

| Flag | Ação de Rollback |
|---|---|
| `SERA_VNEXT_PRODUCT_BETA_ENABLED` | Setar `false` → rotas admin retornam 404 |
| `SERA_VNEXT_CANONICAL_ANALYZE_ENABLED` | Já `false` por padrão; setar `false` → legacy |
| `NEXT_PUBLIC_SERA_VNEXT_CANONICAL_ANALYZE_UI_ENABLED` | Já `false` por padrão |

Rollback de flag é imediato sem necessidade de redeploy (variáveis de ambiente em runtime se suportado pela plataforma).
