# PRODUCT Onboarding Trial Readiness v0.3-A

**Versão:** v0.3-A  
**Data:** 2026-05-18  
**Status:** Entregue — onboarding leve para trial/demonstração, sem billing enforcement.

## 1. Objetivo

Criar a primeira camada de onboarding do HFA/SERA para empresas novas, reduzindo confusão inicial e conectando o fluxo de valor:

Evento → Análise SERA → Ações corretivas → Risk Profile organizacional.

A fase prioriza ativação e clareza metodológica, sem alterar o baseline RISK v1.0-A.

## 2. O que foi criado

- Nova rota de onboarding no dashboard: `/onboarding`.
- Página “Comece pelo diagnóstico de fatores humanos” com:
  - proposta de valor do produto;
  - bloco de trial de 10 análises gratuitas;
  - fluxo recomendado em 4 passos com CTAs;
  - seção “o que o sistema faz”;
  - seção “o que o sistema não faz”.
- Card discreto no dashboard principal (`/dashboard`) com CTA “Comece aqui” para `/onboarding`.

## 3. Fluxo recomendado

1. Registrar um evento (`/events/new`).
2. Usar entrevista estruturada (`/sera/interview`).
3. Revisar recomendações e ações (`/actions`).
4. Acompanhar Risk Profile (`/risk-profile`).

## 4. Roteiro das 10 análises gratuitas

Mensagem implementada:

- “10 análises gratuitas para formar o primeiro perfil”.
- Uso recomendado para eventos reais ou casos de treinamento.
- Resultado esperado: primeiros sinais de padrões recorrentes, confiança dos dados e tendência qualitativa.
- Caveat explícito: diagnóstico em formação; não representa conclusão definitiva com poucos dados.

## 5. O que o sistema faz / não faz

### O que o sistema faz

- aplica classificação SERA P/O/A com base em evidência textual;
- separa análise causal de avaliação de risco;
- identifica candidatos a padrões recorrentes;
- apresenta tendência qualitativa observada;
- ajuda a gerar ações corretivas;
- comunica limitações e confiança dos dados.

### O que o sistema não faz

- não substitui investigação humana;
- não inventa evidência;
- não confirma Safety Issue formal sem revisão;
- não estima probabilidade operacional sem exposição;
- não é ARMS Risk Index canônico;
- não transforma poucos dados em conclusão definitiva.

## 6. Rotas/CTAs criados

### Rota criada

- `/onboarding` (`frontend/src/app/(dashboard)/onboarding/page.tsx`)

### CTA no dashboard

- Local: `frontend/src/app/(dashboard)/dashboard/page.tsx`
- Label: “Comece aqui”
- Destino: `/onboarding`

### CTAs internos da página de onboarding

- “Ir para novo evento” → `/events/new`
- “Iniciar entrevista” → `/sera/interview`
- “Ver ações” → `/actions`
- “Ver Risk Profile” → `/risk-profile`

## 7. O que não foi implementado nesta fase

- trial enforcement persistido em banco;
- billing;
- Stripe;
- planos pagos;
- demo data;
- PDF export.

## 8. Próximas fases

- **PRODUCT v0.3-B** — Demo mode / sample data
- **PRODUCT v0.3-C** — Trial counter/enforcement
- **PRODUCT v0.3-D** — Methodology page
- **PRODUCT v0.3-E** — PDF export
