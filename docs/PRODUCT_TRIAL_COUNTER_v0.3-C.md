# PRODUCT Trial Counter v0.3-C

**Versao:** v0.3-C  
**Data:** 2026-05-18  
**Status:** Entregue - contador leve de trial com soft gate visual, sem billing e sem migration.

## 1. Objetivo

Implementar uma primeira versao leve de contador para as 10 analises gratuitas por empresa, comunicando uso e proximidade do limite sem introduzir cobranca, Stripe ou bloqueio tecnico novo.

## 2. Filosofia

- 10 analises gratuitas para demonstrar valor.
- foco em clareza de uso e formacao do primeiro perfil organizacional.
- trial comunicado como onboarding progressivo, nao como paywall agressivo.

## 3. O que foi implementado

- helper puro `buildTrialUsage()` em `frontend/src/lib/product/trial.ts`
- teste unitario de regra de trial em `tests/product/test-trial-usage.ts`
- endpoint leve `GET /api/trial/status`
- componente visual `TrialUsageCard`
- integracao do card nas paginas:
  - `/dashboard`
  - `/onboarding`
  - `/events/new`

## 4. Estrategia tecnica

Foi criada uma API leve dedicada de status do trial em vez de reaproveitar `GET /api/org/intelligence`.

Motivos:

- onboarding e criacao de evento tambem precisam da contagem;
- `org/intelligence` possui escopo maior que o necessario;
- o contador de trial nao deve acoplar produto ao baseline do Risk Profile;
- a contagem usa apenas `analyses` do tenant atual, sem migration.

## 5. Regras

- `limit = 10`
- `used = total de analyses do tenant`
- `remaining = max(limit - used, 0)`
- `status = available` quando `used < 8`
- `status = near_limit` quando `8 <= used < 10`
- `status = limit_reached` quando `used >= 10`

Mensagens:

- `available`: "Voce ainda tem X analises gratuitas para formar o primeiro perfil."
- `near_limit`: "Voce esta perto do limite inicial de 10 analises gratuitas."
- `limit_reached`: "Voce concluiu as 10 analises iniciais. Fale conosco para continuar."

## 6. Soft gate

O comportamento desta fase e intencionalmente leve:

- mostra uso, restante e progresso;
- alerta quando o tenant se aproxima do limite;
- orienta contato ao atingir o limite;
- nao cria enforcement novo em banco;
- nao adiciona migration;
- nao adiciona Stripe ou billing.

## 7. O que nao foi implementado

- Stripe
- billing
- plano pago
- enforcement rigido
- migration

## 8. Proximas fases

- `PRODUCT v0.3-D` - Methodology page
- `PRODUCT v0.3-E` - PDF export
- billing futuro, separado da fase de ativacao do produto
