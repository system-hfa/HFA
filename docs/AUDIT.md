# AUDIT — HFA

**Versão:** v0.3-H
**Data:** 2026-05-19
**Tipo:** DOCS-ONLY — nenhum código foi alterado

---

## 1. Objetivo

Definir o que é auditável no produto HFA, o estado atual de rastreabilidade observado no código, os eventos auditáveis necessários por entidade, os campos mínimos por registro de auditoria, e a política de retenção e recomendações por prioridade.

A regra de ouro da auditoria HFA: toda conclusão técnica SERA deve ser rastreável a evento, evidência, análise, versão metodológica e organização.

---

## 2. Estado Atual Observado

### 2.1 O que já é auditável hoje

| Mecanismo | Tabela/Código | O que registra |
|---|---|---|
| Histórico de edições de análise | `analysis_edits` | step_altered, field_changed, value_before, value_after, steps_recalculated, steps_preserved, reason, tenant_id, analysis_id |
| Débito de crédito | `credit_transactions` | tenant_id, user_id, type='consumption', amount=-1, event_id, description |
| Estorno de crédito | `credit_transactions` | tenant_id, user_id, type='refund', amount=+1, event_id, description |
| Status do evento | coluna `events.status` | 'received', 'processing', 'completed', 'failed' |
| Horário de conclusão de ação corretiva | `corrective_actions.completed_at` | Timestamp quando status='completed' |

### 2.2 O que NÃO existe hoje (lacunas críticas)

- Nenhuma tabela `audit_log` estruturada
- Nenhum registro de criação de tenant ou usuário (além do insert normal)
- Nenhum registro de quem criou uma ação corretiva (`corrective_actions` não tem `created_by`)
- Nenhum registro de exportação de PDF / relatório executivo
- Nenhum registro de mudança de configurações de IA (provider, chaves)
- Nenhum registro de login/logout ou sessões ativas
- Nenhum registro de quando e por quem uma análise foi visualizada
- Nenhum `actor_user_id` em events ou analyses (apenas `submitted_by`, que é o public user row, não o auth user_id)
- Nenhum campo `methodology_version` na tabela `analyses` para rastrear qual versão do motor SERA produziu o resultado

---

## 3. Entidades Auditáveis

| Entidade | Tabela | Estado de Auditabilidade |
|---|---|---|
| Evento de segurança | `events` | Parcial — status registrado, sem actor explícito além de submitted_by |
| Análise SERA | `analyses` | Parcial — resultado completo armazenado, sem metadata de versão do motor |
| Classificação SERA (P/O/A) | colunas em `analyses` | Parcial — editável via analysis_edits com before/after |
| Avaliação de risco (ERC) | coluna `erc_level` em `analyses` | Parcial — editável via analysis_edits, sem log de override |
| Recomendação | coluna `recommendations` em `analyses` | Armazenada, sem histórico de versão |
| Ação corretiva | `corrective_actions` | Parcial — mudança de status detectável via completed_at, sem log de who/when por status |
| Relatório gerado | não existe tabela | Lacuna total |
| Usuário / Organização | `users`, `tenants` | Parcial — insert registrado, sem log de mudanças |
| Configurações de IA | `ai_settings` | Parcial — updated_at armazenado, sem log de o que mudou |

---

## 4. Eventos Auditáveis

| Evento | Estado |
|---|---|
| `event.created` — novo evento de segurança criado | Lacuna — apenas INSERT na tabela |
| `event.updated` — evento atualizado (ex: raw_input em re-análise) | Lacuna |
| `event.deleted` | Lacuna |
| `analysis.started` — pipeline iniciado | Lacuna |
| `analysis.completed` — pipeline concluído com sucesso | Lacuna |
| `analysis.failed` — pipeline falhou | Lacuna — apenas events.status='failed' |
| `classification.overridden` — P/O/A alterado manualmente | Implementado em `analysis_edits` (value_before, value_after) |
| `recommendation.created` | Lacuna — recommendations é JSONB, sem evento de criação |
| `corrective_action.created` — nova ação criada | Lacuna |
| `corrective_action.status_changed` — status da ação alterado | Lacuna — apenas updated via PATCH, sem log |
| `report.pdf_exported` — PDF de análise exportado | Lacuna |
| `report.executive_viewed` — relatório executivo acessado | Lacuna |
| `trial.limit_reached` — limite de trial atingido | Lacuna |
| `tenant.created` — organização criada no bootstrap | Lacuna |
| `user.bootstrapped` — usuário público criado | Lacuna |
| `ai_settings.changed` — provider ou chave de API alterada | Lacuna |

---

## 5. Campos Mínimos por Registro de Auditoria

Schema recomendado para uma futura tabela `audit_log`:

```sql
CREATE TABLE audit_log (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id UUID NOT NULL,          -- quem realizou a ação (auth user_id)
  organization_id UUID NOT NULL,        -- tenant_id
  object_type   TEXT NOT NULL,          -- 'event', 'analysis', 'corrective_action', etc.
  object_id     UUID,                   -- ID do objeto afetado
  action        TEXT NOT NULL,          -- ex: 'created', 'analysis.completed', 'classification.overridden'
  before        JSONB,                  -- estado anterior (quando aplicável)
  after         JSONB,                  -- novo estado
  reason        TEXT,                   -- justificativa (obrigatória para overrides)
  source        TEXT,                   -- 'api', 'admin', 'system'
  request_id    TEXT,                   -- correlation ID do request (lacuna atual)
  timestamp     TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Campos já presentes em `analysis_edits`** (subconjunto do audit_log para edições SERA):
- `analysis_id`, `tenant_id`, `step_altered`, `field_changed`, `value_before`, `value_after`, `steps_recalculated`, `steps_preserved`, `reason`

**O que falta em `analysis_edits`**:
- `actor_user_id` — identificação do usuário que editou (tem apenas analysis_id + tenant_id)
- `request_id`
- `source`

---

## 6. Regra de Ouro

> Toda conclusão técnica SERA deve ser rastreável a:
> 1. **Evento** — qual ocorrência foi analisada (event_id)
> 2. **Evidência** — qual texto/documento foi usado como entrada (raw_input ou source_file_url)
> 3. **Análise** — qual análise produziu a conclusão (analysis_id)
> 4. **Versão metodológica** — qual versão do motor SERA gerou o resultado (atualmente ausente — lacuna P1)
> 5. **Organização** — qual tenant realizou a análise (tenant_id)
> 6. **Ator** — quem submeteu / quem editou (submitted_by, actor_user_id para edições)

A tabela `analysis_edits` implementa parcialmente os pontos 3, 5 e 6 (via analysis_id, tenant_id). Os pontos 1, 4 e 6 completo são lacunas.

---

## 7. Política de Retenção Sugerida

| Dado | Retenção Sugerida | Justificativa |
|---|---|---|
| `events` + `analyses` | 7 anos | Dados de segurança operacional — padrão regulatório aeronáutico |
| `analysis_edits` | 7 anos | Auditoria de alterações técnicas |
| `credit_transactions` | 5 anos | Requisito financeiro/fiscal |
| `corrective_actions` | 7 anos | Rastreabilidade de ações de segurança |
| `audit_log` (quando criado) | 7 anos | Compliance e forense |
| Logs de servidor (console.*) | 90 dias | Operacional |
| `ai_settings` | Enquanto usuário ativo + 1 ano | Dados operacionais |
| Documentos originais em Storage | 7 anos ou até exclusão pelo tenant | Evidência documental |

---

## 8. Limites Atuais Observados no Código

1. **`analysis_edits` não tem `actor_user_id`**: rastrear quem editou requer join com análise + users — não é direto.
2. **`corrective_actions` não tem `created_by`**: impossível auditoria de criação.
3. **`analyses` não tem `motor_version`**: impossível rastrear qual versão do pipeline SERA produziu o resultado quando o motor for evoluído.
4. **Estorno de crédito**: registrado em `credit_transactions`, mas sem link explícito ao `analysis_id` que falhou (apenas `event_id`).
5. **Bootstrap OAuth**: nenhum log de quando/quem criou um novo tenant — apenas o INSERT na tabela.
6. **re-análise via PATCH**: o `raw_input` do evento é sobrescrito sem auditoria do valor anterior.

---

## 9. Recomendações por Prioridade

### P0

- **Criar tabela `audit_log`** com o schema definido na seção 5. Inserir no mínimo: tenant.created, analysis.completed, analysis.failed, classification.overridden.
- **Adicionar `actor_user_id` em `analysis_edits`**: alterar schema e inserção em `/api/analyses/[analysisId]/recalculate`.
- **Adicionar `motor_version`** em `analyses`: gravar a versão do motor SERA (ex: constante de versão em `pipeline.ts`) que produziu cada análise.

### P1

- **Adicionar `created_by` em `corrective_actions`**: gravar `user_id` no insert em `/api/actions`.
- **Registrar criação de tenant e usuário** em `audit_log` no bootstrap OAuth.
- **Auditoria de re-análise**: registrar `raw_input` anterior antes de sobrescrever.

### P2

- **Registrar exportação de PDF** em `audit_log` (object_type='report', action='pdf_exported').
- **Registrar mudança de AI settings** em `audit_log` (action='ai_settings.changed', before/after com provider sem expor chaves).
- **Adicionar `request_id` em `analysis_edits`** para correlação com logs de servidor.

### P3

- **Auditoria de visualização de relatório executivo** (action='executive_viewed') — útil para métricas de uso.
- **Snapshot periódico do risk profile** para análise de evolução histórica.
