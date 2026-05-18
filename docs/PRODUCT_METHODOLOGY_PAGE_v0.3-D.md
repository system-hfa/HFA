# PRODUCT Methodology Page v0.3-D

**Versao:** v0.3-D  
**Data:** 2026-05-18  
**Status:** Entregue - pagina interna de metodologia para onboarding, trial e demonstracao comercial.

## 1. Objetivo

Criar uma pagina de metodologia no produto para explicar, com linguagem profissional e rastreavel, como o HFA/SERA funciona, o que ele faz, o que nao faz e como separar analise causal de avaliacao de risco.

## 2. Rota criada

- `/methodology`

Arquivo:

- `frontend/src/app/(dashboard)/methodology/page.tsx`

## 3. Blocos da pagina

1. Header com tese metodologica, badge de rastreabilidade e caveat.
2. O que o HFA/SERA faz.
3. O que o sistema nao faz.
4. Como a classificacao SERA funciona (Percepcao, Objetivo, Acao).
5. Evidencia suficiente e insuficiente, com CTA para entrevista estruturada.
6. Analise causal vs avaliacao de risco.
7. Risk Profile organizacional (perfil preliminar + limites).
8. Seguranca metodologica (testes, baseline, contratos, validacao).
9. Fluxo recomendado com CTAs operacionais.

## 4. Links adicionados

- Onboarding: `Entender a metodologia` -> `/methodology`
- Demo: `Como interpretar esta demonstracao` -> `/methodology`
- Dashboard: CTA discreto `Metodologia` -> `/methodology`

## 5. Mensagens metodologicas principais

- O sistema organiza evidencia e aplica criterios explicitos; nao "opina sobre acidente".
- Classificacao P/O/A e causal, nao julgamento de culpa.
- Classificar exige evidencia suficiente; incerteza deve ser registrada quando a base e limitada.
- Analise causal, matriz tradicional, HFA ERC Category, Safety Issue Candidate e Data Confidence sao camadas distintas.
- Risk Profile e perfil preliminar; sem exposicao operacional nao representa probabilidade futura.
- Safety Issue Candidates nao sao Safety Issues formais.
- HFA ERC Category nao e ARMS Risk Index canonico (1-2500).
- Data Confidence mede robustez da base, nao nivel de risco.

## 6. O que nao foi implementado

- artigo academico/metodologia publica final
- validacao externa
- nova logica SERA
- nova matriz
- SIRA formal

## 7. Arquivos alterados

- `frontend/src/app/(dashboard)/methodology/page.tsx`
- `frontend/src/app/(dashboard)/onboarding/page.tsx`
- `frontend/src/app/(dashboard)/demo/page.tsx`
- `frontend/src/app/(dashboard)/dashboard/page.tsx`
- `docs/PRODUCT_METHODOLOGY_PAGE_v0.3-D.md`

## 8. Validacoes

- typecheck frontend
- teste product trial
- suites RISK
- risk checker default e strict

## 9. Proxima fase

- `PRODUCT v0.3-E` - Exportacao PDF / relatorio executivo basico
