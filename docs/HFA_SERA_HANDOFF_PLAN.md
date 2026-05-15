# HFA/SERA — Handoff Plan

**Data:** 2026-05-15
**Status:** Índice de handoff — revisão humana obrigatória antes de qualquer uso como contexto de produção.

---

## 1. Documentos que entram no pacote de handoff

### Documentação metodológica
| Documento | Caminho | Propósito |
|---|---|---|
| Evidence Sufficiency | `docs/SERA_EVIDENCE_SUFFICIENCY.md` | Define quando classificar, quando pedir complemento, quando bloquear |
| Frozen Scope v0.1.1 | `docs/SERA_V0_1_1_FROZEN_SCOPE.md` | O que está congelado, o que invalida o RC, critérios do smoke definitivo |
| O-C Correction Audit | `docs/SERA_OBJECTIVE_OC_CORRECTION_AUDIT.md` | Histórico do erro de O-C introduzido em 8958d28 e como foi corrigido |
| Learn Copy Diagnosis | `docs/HFA_LEARN_COPY_DIAGNOSIS.md` | Diagnóstico das páginas Learn antes da Fase 3 |
| Site Copy Review | `docs/HFA_SITE_COPY_REVIEW.md` | Revisão estratégica do copy de produto/site |

### Documentos de contexto
| Documento | Caminho | Propósito |
|---|---|---|
| CLAUDE.md | `CLAUDE.md` | Regras de operação para Claude neste repositório |
| Este documento | `docs/HFA_SERA_HANDOFF_PLAN.md` | Mapa de contexto e estado atual |

---

## 2. Arquivos técnicos que entram no handoff

Estes arquivos são os mais relevantes para entender o estado do motor e das páginas:

| Arquivo | Relevância |
|---|---|
| `frontend/src/lib/sera/all-steps.ts` | Motor SERA completo — gates determinísticos, prompts, classificação |
| `frontend/src/lib/sera/rules/objective/O-C.json` | Definição de O-C pós-correção |
| `frontend/src/lib/sera/rules/objective/select.ts` | Gates de seleção de objetivo (hasExplicitProtectiveHumanIntent preservado) |
| `frontend/src/app/(dashboard)/learn/objective/page.tsx` | Página Learn de Objetivo — O-C correto |
| `frontend/src/app/(dashboard)/learn/action/page.tsx` | Página Learn de Ação — A-C com problema de fluxo pendente |
| `tests/sera/run.ts` | Runner de validação — não alterar |
| `tests/baselines/` | Baselines v0.1 — não alterar |

---

## 3. Arquivos que NÃO devem entrar no handoff

| Categoria | Motivo |
|---|---|
| `tests/reports/candidates/` | Artefatos de execução — voláteis, não são baseline |
| `tests/reports/run-*.json` | Relatórios de smoke individuais — não são baseline oficial |
| `project-site-copy-review/` | Cópias temporárias de tsx como md — uso pontual de revisão |
| `.next/` | Build artifacts |
| Arquivos com segredos (`.env*`) | Nunca commitar |
| `backend/` | Pasta legada — ignorar completamente (per CLAUDE.md) |

---

## 4. Ordem de Leitura Recomendada

Para uma sessão nova com contexto limpo, ler nesta ordem:

1. `CLAUDE.md` — regras de operação obrigatórias
2. `docs/SERA_V0_1_1_FROZEN_SCOPE.md` — estado do RC e o que está bloqueado
3. `docs/SERA_OBJECTIVE_OC_CORRECTION_AUDIT.md` — histórico do erro de O-C e a correção
4. `docs/SERA_EVIDENCE_SUFFICIENCY.md` — princípios de suficiência de evidência
5. `docs/HFA_LEARN_COPY_DIAGNOSIS.md` — diagnóstico das páginas Learn (Fase 3)
6. `frontend/src/lib/sera/all-steps.ts` — apenas se for tocar no motor

**Não ler antes de agir:**
- Não ler `tests/reports/` antes de confirmar que o smoke não foi rodado
- Não ler baseline antes de confirmar branch atual

---

## 5. Resumo do Estado Atual

### Motor SERA
- **Versão:** v0.1.1 release candidate — não promovido a baseline oficial
- **Estado:** Congelado. Não alterar antes do smoke global definitivo.
- **Último smoke:** Near-pass (161/162 PASS, 1 PARTIAL — TEST-COMBO-003)
- **Fix pós-near-pass:** Gate determinístico para déficit de conhecimento → O-A (commit `ec93115`)
- **Fix O-C:** Nó 2 restaurado para binário rotineira/excepcional (esta sessão, Fase 1 do motor)
- **Validação seletiva pós-fix O-C:** 52/52 PASS, 100% determinístico
- **Smoke global definitivo:** Pendente — não rodado ainda com o fix de O-C

### Páginas do produto (frontend)
- **Fase 2 (copy site):** Commitada e pushed — `bfbf777`
  - 5 arquivos: page.tsx, events/new, events/[id], AiInsightPanel, DocumentUpload
  - Foco: "automatizada" → "assistida", exemplos multi-indústria, raw data welcome, disclaimer de revisão
- **learn/objective/page.tsx:** O-C correto (commitado junto com motor fix)
- **Fase 3 (Learn):** Não iniciada — diagnóstico criado nesta sessão

### Git
- Branch: `main`
- Working tree: clean (apenas untracked: project-site-copy-review/, tests/reports/candidates/)
- Último commit: `bfbf777 copy(site): clarify raw evidence workflow`

---

## 6. Próximos Passos

Em ordem de prioridade:

### Imediato (não bloqueia smoke)
1. **Fase 3A** — Corrigir lint errors em `objective/page.tsx` e `foundations/page.tsx` (unescaped `"`)
2. **Fase 3A** — Corrigir typo "Automabilidade" e "automatizados" → "assistidos" em `foundations/page.tsx`
3. **Fase 3A** — Corrigir fluxo e descriptions de A-C em `action/page.tsx`

### Após Fase 3A
4. **Fase 3B** — Exemplos multi-indústria em perception, action, objective, page.tsx
5. **Fase 3C** — Disclaimer pipeline, nota dados brutos

### Crítico — não postergar
6. **Smoke global definitivo** — rodar com 54 fixtures × 3 runs, exigir 162/162 PASS, 0 PARTIAL, 100% det, 0 regressions vs v0.1, TEST-O-D-001 como improvement
7. **Promover baseline v0.1.1** — somente após smoke definitivo

---

## 7. Riscos Metodológicos Já Corrigidos

| Risco | Commit problemático | Correção aplicada | Status |
|---|---|---|---|
| O-C exigia proteção humana explícita | `8958d28` | Nó 2 restaurado para binário rotineira/excepcional; descrições corrigidas em all-steps.ts e O-C.json | ✅ Corrigido |
| TEST-COMBO-003 classificado O-C em vez de O-A | Introduzido no motor | Gate determinístico hasKnowledgeDeficitObjectiveContext (`ec93115`) | ✅ Corrigido |
| Página Learn/objective com O-C incorreto | `8958d28` (textual) | Reescrito para "violação excepcional/circunstancial, motivação qualquer" | ✅ Corrigido |
| Copy site com "análise automatizada" | Histórico | Fase 2 — `bfbf777` | ✅ Corrigido |
| A-C com fluxo impreciso em action/page.tsx | Histórico | Pendente — Fase 3A | ⏳ Pendente |

---

## 8. Pendência do Smoke Global

O smoke global definitivo ainda não foi rodado com a correção de O-C (esta sessão).

**Critérios para promoção do baseline v0.1.1:**

| Critério | Valor exigido |
|---|---|
| Fixtures testadas | 54 |
| Total de runs | 162 |
| PASS | 162 |
| PARTIAL | 0 |
| FAIL | 0 |
| ERROR | 0 |
| determinism_rate | 100% |
| Regressions vs baseline v0.1 | 0 |
| TEST-O-D-001 | registrado como improvement |

**Script de smoke:** `scripts/run-sera-v0.1.1-smoke.sh` (requer working tree limpa)
**Script de promoção:** `scripts/promote-sera-v0.1.1-baseline.sh` (rodar APENAS após smoke definitivo)

**Atenção:** O smoke não foi rodado após a correção de O-C desta sessão. A validação seletiva (52/52) cobre os casos de O-C/O-A/O-B/O-D, mas o smoke global completo com todas as 54 fixtures × 3 runs ainda é necessário para promoção oficial.

---

*Este documento não deve ser commitado sem revisão humana. Contém estado operacional que pode tornar-se stale rapidamente.*
