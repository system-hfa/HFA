# SERA vNext — Próximos Passos

**Data**: 2026-06-08

---

## Prioridade Alta

### 1. Aplicar Migration em Staging

```bash
supabase db push --db-url <STAGING_DB_URL>
```

Arquivo: `supabase/migrations/20260608210000_sera_vnext_provenance_columns.sql`

Pré-requisitos:
- Ambiente de staging com dados de teste.
- Verificação de `supabase db diff` antes de aplicar.
- Execução de testes `product-beta-db-real-trial-001.ts` após aplicação.

### 2. Migrar Dashboard para /api/risk-profile

Arquivo: `frontend/src/app/(dashboard)/dashboard/page.tsx`

Alteração: trocar chamada de `/api/org/intelligence` por `/api/risk-profile`.

Impacto: zero (mesma função, mesmos dados, mesmos campos). Ganho: audit log completo + requestId.

### 3. Executar Suite Completa product-unification contra DB Real

```bash
npx tsx tests/sera-vnext/product-unification/provenance-model-trial-001.ts
npx tsx tests/sera-vnext/product-unification/unified-adapter-trial-001.ts
npx tsx tests/sera-vnext/product-unification/risk-profile-provenance-trial-001.ts
npx tsx tests/sera-vnext/product-unification/error-sanitization-trial-001.ts
npx tsx tests/sera-vnext/product-unification/feature-flags-trial-001.ts
npx tsx tests/sera-vnext/product-unification/final-output-lock-trial-001.ts
```

---

## Prioridade Média

### 4. Ativar SERA_VNEXT_CANONICAL_ANALYZE_ENABLED em Staging

Pré-requisitos:
- Migration aplicada e verificada.
- UI atualizada com copy correto: "Análise SERA vNext — hipótese não final para revisão humana".
- Fila de revisão Admin funcionando.
- Testes de segurança executados contra staging.

### 5. Integrar Guardrails v02

Arquivo: `frontend/src/lib/sera-vnext-product/persistence/create-analysis.ts`

Ação: chamar `computeSeraVNextGuardrails` (de `engine-v02/guardrails/compute-guardrails.ts`) no output do motor e incluir resultado no payload de auditoria/warnings.

Pré-requisito: verificar compatibilidade de tipo com `SeraVNextEngineOutput`.

### 6. Deprecar /api/org/intelligence Formalmente

Após confirmar zero consumidores ativos e migração do dashboard, marcar para remoção.

---

## Prioridade Baixa

### 7. Remoção do Endpoint /api/org/intelligence

Só após confirmação de migração completa de todos os consumidores.

### 8. Testes E2E com Playwright contra Staging

Executar `tests/sera-vnext/product-beta-ui-real-trial-001.ts` e similares após migration aplicada.

### 9. Avaliação do Motor analyzeSeraVNext (engine.ts)

O motor `analyzeSeraVNext` em `engine.ts` (retorna `SeraVNextResult`) tem arquitetura e contrato de output distintos de `runSeraVNextEngineV0` (retorna `SeraVNextEngineOutput`). Avaliar se é substituto ou alternativa complementar — decisão metodológica separada.

### 10. Calibração dos Pesos do Score

Os pesos P×1.0, O×0.8, A×0.6 são heurísticos não calibrados. Quando houver amostra suficiente (≥10 análises), iniciar processo de calibração empírica com responsável metodológico.
