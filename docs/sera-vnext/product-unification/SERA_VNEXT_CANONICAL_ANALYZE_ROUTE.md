# SERA vNext — Rota de Análise Canônica

**Data**: 2026-06-08

---

## Estado Atual

A rota `/api/analyze` usa exclusivamente o pipeline SERA legacy (`completeSeraAnalysisAfterEventCreated`).

A migração para o motor vNext canônico **não foi executada** nesta fase porque:
1. Requer ambiente controlado com staging autorizado.
2. A flag `SERA_VNEXT_CANONICAL_ANALYZE_ENABLED` existe mas está `false`.
3. O motor vNext produz output com contrato diferente (candidate-only, non-final).
4. A UI precisa ser atualizada para indicar "Análise SERA vNext — hipótese não final para revisão humana".

---

## Flags Definidas

```bash
# Server-side: controla qual motor /api/analyze usa
SERA_VNEXT_CANONICAL_ANALYZE_ENABLED=false  # default: legacy preservado

# Client-side: mostra indicador de vNext na UI do fluxo comum
NEXT_PUBLIC_SERA_VNEXT_CANONICAL_ANALYZE_UI_ENABLED=false  # default: sem indicador
```

Definidas em: `frontend/src/lib/sera-vnext-runtime/feature-flags.ts`

---

## Comportamento com Flag OFF (atual)

- `/api/analyze` mantém pipeline legacy completo.
- Créditos, eventos, análises legacy: sem alteração.
- Motor vNext: não chamado.
- Rollback: imediato (apenas desligar a flag).

---

## Comportamento Esperado com Flag ON (futuro)

Quando `SERA_VNEXT_CANONICAL_ANALYZE_ENABLED=true`:

1. `/api/analyze` cria `sera_vnext_analyses` em vez de `analyses` legacy.
2. Motor `runSeraVNextEngineV0` é chamado.
3. Proveniência completa persistida (`engine_runtime_version`, `source_flow=VNEXT_CANONICAL`, `canonical_tree_version`).
4. Output candidate-only com `humanReviewRequired: true`.
5. Revisão humana obrigatória antes de qualquer consumo downstream.
6. Evento registrado na fila de revisões Admin.
7. Risk Profile atualizado automaticamente ao completar revisão.

---

## Requisitos para Ativar

- [ ] Ambiente de staging com migration `20260608210000` aplicada.
- [ ] UI atualizada: copy "Análise SERA vNext — hipótese não final para revisão humana".
- [ ] Remoção de qualquer botão de análise final na UI.
- [ ] Fila de revisão Admin operacional.
- [ ] Testes de regressão `product-unification` passando.
- [ ] Validação de segurança (tenant isolation, auth, cross-tenant).
- [ ] Aprovação explícita do responsável metodológico.

---

## Separação de UI

Com `NEXT_PUBLIC_SERA_VNEXT_CANONICAL_ANALYZE_UI_ENABLED=false`:
- UI não mostra indicador vNext no fluxo comum.
- Dois botões indistinguíveis não devem existir.

Se a flag for ativada sem o servidor correspondente: a UI mostra indicador mas o servidor ainda usa legacy. Isso é aceitável como estado de transição para testes de UI.

Se o servidor tiver a flag ativada sem a UI: análises vNext são criadas mas sem indicação ao usuário. **Evitar este estado.**
