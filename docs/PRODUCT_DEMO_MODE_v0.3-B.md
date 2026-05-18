# PRODUCT Demo Mode v0.3-B

**Versão:** v0.3-B  
**Data:** 2026-05-18  
**Status:** Entregue - demonstracao com dados estaticos versionados, sem seed de banco.

## 1. Objetivo

Criar uma primeira versao segura de demo mode para o HFA/SERA, permitindo demonstrar o valor do produto antes de a empresa possuir analises reais suficientes.

## 2. O que foi criado

- Rota `/demo` no dashboard.
- Arquivo tipado com dados de exemplo versionados em `frontend/src/lib/demo/hfa-demo-data.ts`.
- Pagina demonstrativa com:
  - 10 analises ficticias;
  - padroes recorrentes;
  - candidatos a Safety Issue;
  - tendencia qualitativa ficticia;
  - acoes corretivas de exemplo;
  - caveats explicitos de uso.
- CTA no onboarding para visualizar a demonstracao.
- CTA discreto no dashboard principal para abrir a demo.

## 3. Por que dados estaticos, nao seed de banco

Dados estaticos foram escolhidos porque:

- evitam contaminar tenants reais;
- nao exigem schema ou migration;
- nao dependem de Supabase;
- sao faceis de revisar e versionar;
- servem para demonstracao, screenshots e treinamento sem mock global.

## 4. Lista de arquivos

- `frontend/src/lib/demo/hfa-demo-data.ts`
- `frontend/src/app/(dashboard)/demo/page.tsx`
- `frontend/src/app/(dashboard)/onboarding/page.tsx`
- `frontend/src/app/(dashboard)/dashboard/page.tsx`
- `docs/PRODUCT_DEMO_MODE_v0.3-B.md`

## 5. Rotas criadas

- `/demo`

## 6. CTAs adicionados

- Onboarding: “Ver demonstracao com dados ficticios” → `/demo`
- Dashboard: “Ver demo” → `/demo`

## 7. Natureza dos dados

- ficticios;
- sem empresa real;
- sem evento real;
- sem acidente real;
- nao usar para decisao operacional.

## 8. O que nao foi implementado

- seed Supabase;
- demo tenant;
- API mock global;
- trial enforcement;
- billing;
- Stripe.

## 9. Proxima fase

- **PRODUCT v0.3-C** - Trial counter/enforcement leve
- ou
- **PRODUCT v0.3-D** - Methodology page
