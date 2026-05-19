# OPS Tenant Bootstrap Hardening — v0.3-I-d

**Versão:** v0.3-I-d  
**Data:** 2026-05-19  
**Branch base:** `main` @ `723d1889`  
**Tipo:** Hardening incremental de bootstrap OAuth/tenant

---

## 1. Objetivo

Endurecer o bootstrap OAuth/tenant com separação clara entre falhas toleráveis e intoleráveis, adicionando observabilidade mínima e integração best-effort com `audit_log` para o evento `tenant.bootstrap_failed`.

---

## 2. Arquivos alterados na fase

- `frontend/src/app/api/auth/oauth/bootstrap/route.ts`
- `frontend/src/lib/ensure-tenant.ts`
- `frontend/src/app/auth/callback/page.tsx`
- `frontend/src/app/(dashboard)/layout.tsx`
- `frontend/src/lib/observability/audit.ts`
- `docs/OPS_TENANT_BOOTSTRAP_HARDENING_v0.3-I-d.md`

---

## 3. Descoberta de fluxo real

O bootstrap OAuth/tenant está centralizado em:

- Cliente: `frontend/src/lib/ensure-tenant.ts`
- Servidor: `frontend/src/app/api/auth/oauth/bootstrap/route.ts`

`frontend/src/lib/auth/ensure-tenant.ts` não existe neste repositório nesta revisão.

---

## 4. Classificação de falhas

Categorias implementadas:

- `network_or_transient`
- `permission_or_rls`
- `missing_tenant`
- `inconsistent_tenant`
- `unexpected_response`
- `unknown`

Regra de recuperabilidade:

- Recuperável: `network_or_transient`
- Não recuperável: `permission_or_rls`, `missing_tenant`, `inconsistent_tenant`, `unexpected_response`, `unknown`

---

## 5. O que foi endurecido

### 5.1 Rota de bootstrap (`/api/auth/oauth/bootstrap`)

- Passou a gerar/propagar `request_id` via `getOrCreateRequestId` e header `x-request-id`.
- Respostas de erro agora retornam payload técnico mínimo e sanitizado:
  - `detail`
  - `request_id`
  - `category`
  - `stage`
  - `recoverable`
- Introduzida validação de consistência:
  - `tenant_id` do metadata deve existir na tabela `tenants`.
  - vínculo por email com `users.id` divergente do usuário autenticado é tratado como `inconsistent_tenant`.
  - linha de usuário sem `tenant_id` é tratada como `missing_tenant`.
- Mensagens técnicas em `console.error` são sanitizadas e não incluem PII/token/payload bruto.

### 5.2 Cliente (`ensureOAuthTenant`)

- Passou a enviar `x-request-id` no bootstrap.
- Falhas recuperáveis (`network_or_transient`) seguem toleradas (degradação sem bloquear UI).
- Falhas não recuperáveis passam a ser propagadas para o caller.
- Logs locais mantêm somente metadados técnicos mínimos (`requestId`, `category`, `recoverable`, `stage`, `reason`, `status`, `source`).

### 5.3 Call sites críticos

- `auth/callback`: em falha não recuperável de bootstrap, redireciona para `/login?error=tenant`.
- `dashboard/layout`: em falha não recuperável de bootstrap, faz `signOut` e redireciona para `/login?error=tenant`.

---

## 6. Auditoria: `tenant.bootstrap_failed`

Evento gravado via `writeAuditLog` quando a rota de bootstrap detecta falha relevante (incluindo erro de permissão, inconsistência de tenant, ausência de tenant, erro transitório e falha inesperada).

### 6.1 Campos usados

- `event_type`: `tenant.bootstrap_failed`
- `tenant_id`: `tenantId` quando disponível; `null` em falhas pré-tenant
- `user_id`: `userId` quando disponível
- `request_id`: valor de `x-request-id` sanitizado/gerado
- `route`: `/api/auth/oauth/bootstrap`
- `method`: `POST`
- `status`: `failed`
- `metadata`:
  - `source: "oauth_bootstrap"`
  - `stage`
  - `category`
  - `recoverable`
  - `reason` (sanitizado)
  - `http_status`

### 6.2 Best-effort preservado

`writeAuditLog` continua best-effort:

- se `audit_log` não existir;
- se migration não estiver aplicada;
- se insert falhar por qualquer motivo;

a falha de auditoria não interrompe o fluxo principal do bootstrap.

---

## 7. Regras de PII

Não é gravado em audit/log técnico desta fase:

- email
- nome
- access/refresh token
- JWT/cookies
- payload bruto do Supabase
- stack trace completa persistida

Apenas identificadores técnicos e metadados operacionais mínimos foram mantidos.

---

## 8. Compatibilidade

A assinatura pública `ensureOAuthTenant(): Promise<void>` foi preservada.

Mudança de comportamento:

- anteriormente toda falha era silenciosa;
- agora falha intolerável é explicitamente propagada para call sites críticos, que tratam o bloqueio com redirecionamento seguro.

