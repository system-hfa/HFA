# RISK Profile Communication Review — v0.9-F

**Versão:** v0.9-F  
**Data:** 2026-05-18  
**Fase:** RISK v0.9-F  
**Status:** Entregue — revisão de copy, sem alteração de lógica.

---

## 1. Objetivo

Harmonizar a comunicação metodológica do Risk Profile Organizacional para eliminar expressões que superestimam a conclusividade do sistema antes de exposição, SIRA e análise contextual formal.

---

## 2. Relação com as fases anteriores

| Fase | Entrega |
|---|---|
| v0.9-A | Auditoria — 10 achados, incluindo F-001 "Rótulo enganoso de risk score" e F-008 "Sem comunicação de incerteza" |
| v0.9-B | Score renomeado para Índice de Cobertura Analítica |
| v0.9-C | Safety Issue Candidates — sinalização conservadora de recorrência |
| v0.9-D | Qualitative Risk Trend — separação de volume e qualidade |
| v0.9-E | Data Confidence — diferenciação de "dados insuficientes" vs. "risco baixo" |
| **v0.9-F** | **Copy end-to-end — títulos, subtítulos, disclaimers e explicações** |

---

## 3. Princípio de comunicação

> "O sistema comunica padrões observados em análises registradas — não risco operacional calculado."

Expressões como "risco real", "perfil real da empresa" e "reflete o risco que existia" implicam conclusividade que o sistema ainda não tem (sem exposição, sem SIRA, sem ajuste por taxa de reporte). A revisão substitui essas expressões por linguagem observacional.

---

## 4. Mudanças aplicadas

### 4.1 Header da página

| Antes | Depois |
|---|---|
| `"Perfil de Risco Organizacional"` | `"Perfil Organizacional"` |
| `"Baseado em N análises SERA"` | `"Diagnóstico preliminar baseado em N análises SERA registradas"` |

**Justificativa:** O título antigo implicava conclusão de risco. O novo comunica natureza organizacional e caráter preliminar.

### 4.2 Zero-state — título

| Antes | Depois |
|---|---|
| `"Seu perfil de risco está em formação"` | `"Seu perfil organizacional está em formação"` |

### 4.3 Zero-state — descrição inicial

| Antes | Depois |
|---|---|
| `"...precondições recorrentes e exposição por matriz de risco da sua organização."` | `"...precondições recorrentes e distribuição por matriz da sua organização."` |

**Justificativa:** "Exposição por matriz de risco" implica cálculo de exposição que não existe.

### 4.4 Zero-state — passo 3

| Antes | Depois |
|---|---|
| `"...revelam o perfil real da sua empresa"` | `"...revelam os primeiros padrões organizacionais observados"` |

**Justificativa:** "Perfil real" é assertivo demais para uma base de 10 análises sem ajuste de exposição.

### 4.5 Banner "em formação"

| Antes | Depois |
|---|---|
| `"Perfil de risco em formação"` | `"Perfil organizacional em formação"` |

### 4.6 Explicação ARMS — parágrafo 2

| Antes | Depois |
|---|---|
| `"...porque reflete o risco real que existia no momento..."` | `"...porque captura a condição das barreiras no momento do evento..."` |

**Justificativa:** A metodologia ARMS avalia efetividade de barreiras — não calcula "risco real" sem exposição operacional.

---

## 5. O que não foi alterado

- Motor SERA (`pipeline.ts`, `all-steps.ts`, `levels.json`)
- Database schema / migrations
- Fixtures e baseline (`sera-v0.1.1`)
- Score formula (Índice de Cobertura Analítica)
- Helpers: Safety Issue Candidates, Risk Quality Trend, Data Confidence, ERC
- Matrizes (tradicional e ARMS) — lógica e células
- Painéis já bem redigidos: caixa de limitação metodológica da matriz tradicional (lines 505–530), nota de probabilidade inferida no SeraReasoningPanel (⚠️ Nota), nota metodológica ARMS-ERC (Bloco 4)
- OrgScoreCard — disclaimer já corrigido em v0.9-B

---

## 6. Cobertura de comunicação por painel

| Painel | Comunicação após v0.9-F |
|---|---|
| Header da página | Diagnóstico preliminar, N análises registradas |
| Índice de Cobertura Analítica (OrgScoreCard) | "Não é medida direta de risco" (v0.9-B) |
| Data Confidence | "Confiança dos dados, não nível de risco" (v0.9-E) |
| Matriz tradicional | Disclaimer de exposição + caixa de limitação (pré-existente) |
| Matriz ARMS | Captura condição das barreiras — não estima risco (v0.9-F) |
| Safety Issue Candidates | Candidato preliminar, sem SIRA formal (v0.9-C) |
| Qualitative Risk Trend | Volume ≠ qualidade, ERC por mês (v0.9-D) |
| Precondições | Frequência observada (pré-existente) |
| Painel de IA (SeraReasoningPanel) | Aproximação + nota de frequência operacional (pré-existente) |

---

## 7. Arquivos alterados

| Arquivo | Tipo | Mudança |
|---|---|---|
| `frontend/src/app/(dashboard)/risk-profile/page.tsx` | **Alterado** | 5 blocos de copy |
| `docs/RISK_PROFILE_COMMUNICATION_REVIEW_v0.9-F.md` | **Criado** | Este documento |

---

## 8. Validação

```bash
# Verificar que as expressões problemáticas foram removidas
grep -n "risco real\|perfil real\|Perfil de Risco\|Seu perfil de risco\|de risco em" \
  frontend/src/app/(dashboard)/risk-profile/page.tsx
# Saída esperada: nenhuma linha

# Typecheck — não conclusivo por TS6053 pré-existente de infraestrutura
npx tsc --noEmit 2>&1 | grep -v node_modules | grep -v '.next/'
```

---

## 9. Próxima fase sugerida

**RISK v1.0 — Trial de 10 análises / demonstração comercial**

Objetivos:
- Fluxo guiado para primeiro usuário (onboarding)
- Destaque do valor após 10 análises
- Versão exportável/compartilhável do perfil para decisores

---

## 10. Referências

| Documento | Relevância |
|---|---|
| `docs/RISK_PROFILE_METHODOLOGY_AUDIT_v0.9-A.md` | F-001, F-008: base da revisão |
| `docs/RISK_PROFILE_SCORE_RELABEL_v0.9-B.md` | Score → Índice de Cobertura Analítica |
| `docs/RISK_DATA_CONFIDENCE_v0.9-E.md` | Data Confidence — confiança ≠ risco |
