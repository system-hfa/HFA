# PRODUCT AUDIT — HFA v0.2-A

**Data:** 2026-05-16
**Escopo:** Auditoria completa de UI/UX, copy, dashboard, configuração empresarial e modelo de dados
**Método:** Leitura direta de código-fonte (Next.js App Router) — sem modificações

---

## 1. Mapa de Rotas

### 1.1 Rotas públicas / auth

| Rota | Arquivo | Descrição |
|---|---|---|
| `/login` | `app/(auth)/login/` | Autenticação (Supabase OAuth) |
| `/register` | `app/(auth)/register/` | Cadastro |

### 1.2 Dashboard (layout com sidebar)

| Rota | Arquivo | Descrição |
|---|---|---|
| `/dashboard` | `(dashboard)/dashboard/page.tsx` | Score de risco, distribuição de falhas, padrões, IA, precondições, tendência, eventos recentes |
| `/events` | `(dashboard)/events/page.tsx` | Lista de eventos com status |
| `/events/new` | `(dashboard)/events/new/page.tsx` | Formulário nova análise (texto ou upload) |
| `/events/[id]` | `(dashboard)/events/[id]/page.tsx` | Relatório completo SERA (7 etapas + HFACS) |
| `/actions` | `(dashboard)/actions/page.tsx` | Ações corretivas com filtro de status |
| `/risk-profile` | `(dashboard)/risk-profile/page.tsx` | Perfil de risco (ISO 31000 + ARMS-ERC) |
| `/learn` | `(dashboard)/learn/page.tsx` | Índice da metodologia SERA |
| `/learn/pipeline` | `(dashboard)/learn/pipeline/page.tsx` | Pipeline completo |
| `/learn/perception` | `(dashboard)/learn/perception/page.tsx` | Percepção P |
| `/learn/objective` | `(dashboard)/learn/objective/page.tsx` | Objetivo O |
| `/learn/action` | `(dashboard)/learn/action/page.tsx` | Ação A |
| `/learn/codes` | `(dashboard)/learn/codes/page.tsx` | Glossário de códigos |
| `/learn/foundations` | `(dashboard)/learn/foundations/page.tsx` | Fundamentos |
| `/sera/interview` | `(dashboard)/sera/interview/page.tsx` | Coleta de Evidências SERA |
| `/credits` | `(dashboard)/credits/page.tsx` | Saldo, pacotes, histórico |
| `/admin` | `(dashboard)/admin/page.tsx` | Painel admin (isAdmin only) |
| `/admin/tenants` | `(dashboard)/admin/tenants/page.tsx` | Gestão de tenants |
| `/admin/ai` | `(dashboard)/admin/ai/page.tsx` | Config. IA (admin) |
| `/admin/payments` | `(dashboard)/admin/payments/page.tsx` | Pagamentos |
| `/admin/plans` | `(dashboard)/admin/plans/page.tsx` | Planos |
| `/admin/settings` | `(dashboard)/admin/settings/page.tsx` | Configurações gerais (admin) |

### 1.3 Rota fora do layout dashboard (bug de navegação)

| Rota | Arquivo | Descrição |
|---|---|---|
| `/settings/ai` | `app/settings/ai/page.tsx` | Configuração de provedor IA e chaves de API |

> ⚠️ **BUG:** `/settings/ai` está em `app/settings/ai/page.tsx`, fora de `(dashboard)/`, portanto **não renderiza o sidebar**. O link no nav aponta para `/settings/ai` e funciona, mas o usuário perde a navegação lateral. Ver seção 4.1.

---

## 2. Inventário de Componentes Principais

| Componente | Localização | Função |
|---|---|---|
| `OrgScoreCard` | `components/sera/OrgScoreCard.tsx` | Score numérico (0–100) + barra + 3 métricas de ação |
| `AiInsightPanel` | `components/sera/AiInsightPanel.tsx` | Diagnóstico organizacional por LLM (on-demand) |
| `EvidenceIntakePage` | `components/sera/interview/EvidenceIntakePage.tsx` | Roteiro de entrevista em 4 seções |
| `TranscriptPanel` | `components/sera/interview/TranscriptPanel.tsx` | Transcrição + consentimento |
| `InterviewQuestionBank` | `components/sera/interview/InterviewQuestionBank.tsx` | Banco de perguntas estruturadas |
| `SufficiencyChecklist` | `components/sera/interview/SufficiencyChecklist.tsx` | Checklist de evidências |
| `SufficiencyResultPanel` | `components/sera/interview/SufficiencyResultPanel.tsx` | Resultado da verificação de suficiência |
| `EditableClassification` | (referenciado em events/[id]) | Override de P/O/A com recálculo |
| `EditHistoryPanel` | (referenciado em events/[id]) | Histórico de edições |
| `FlowDiagram` | (referenciado em events/[id]) | Diagrama mermaid do fluxo do evento |
| `PreconditionsChart` | (referenciado em dashboard) | Gráfico de precondições |
| `TrendChart` | (referenciado em dashboard) | Tendência 6 meses (SVG inline) |
| `Sidebar` / `Topbar` | `(dashboard)/layout.tsx` | Navegação lateral + topbar com breadcrumb |
| `LanguageSwitcher` | `components/LanguageSwitcher.tsx` | Seletor pt-BR / en |

---

## 3. Modelo de Dados e API Endpoints

### 3.1 Endpoints observados (frontend → API)

| Endpoint | Método | Uso |
|---|---|---|
| `/api/org/intelligence` | GET | Dados do dashboard (score, distribution, top_preconditions, top_combinations, actions, trend, alerts, recent_events) |
| `/api/org/ai-insight` | POST | Diagnóstico organizacional por IA |
| `/api/credits` | GET | Balance, plan, packages, transactions |
| `/api/settings/ai` | GET/POST | Provedor ativo, chaves de API |
| `/api/settings/ai/test` | POST | Ping do provedor ativo |
| `/api/admin/stats` | GET | Métricas globais (super-admin) |
| `/api/admin/tenants` | GET | Lista de tenants com busca |
| `/api/admin/tenants/[id]` | PATCH | Atualizar plano, créditos, status |
| `/analyses/[id]/pdf` | GET | Geração de PDF do relatório |

### 3.2 Schema de tenant observado (admin/tenants)

```typescript
interface Tenant {
  id: string
  name: string
  plan: 'free' | 'enterprise'
  credits_balance: number   // -1 = ilimitado
  created_at: string
  is_active: boolean
  users: { email: string; role: string }[]
  email?: string
  analysis_count: number
  status?: 'active' | 'suspended'
}
```

### 3.3 Schema de intelligence (dashboard)

```typescript
// Inferido do uso em dashboard/page.tsx e OrgScoreCard
{
  score: number                          // 0–100
  level: 'critical' | 'warning' | 'ok'
  label: string
  distribution: { P: CodeCount[]; O: CodeCount[]; A: CodeCount[] }
  top_preconditions: PreconditionCount[]
  top_combinations: CombinationCount[]
  actions: { open_overdue: number; open_no_owner: number; resolution_rate: number }
  trend: MonthlyDataPoint[]             // 6 meses
  alerts: Alert[]
  recent_events: Event[]
}
```

### 3.4 Schema de AI Insight (AiInsightPanel)

```typescript
interface InsightData {
  diagnostico_principal: string
  causa_raiz_provavel: string
  nivel_risco: string
  recomendacoes_prioritarias: {
    prioridade: number; acao: string; justificativa: string
    prazo_sugerido: string; responsavel_sugerido: string
  }[]
  padrao_combinacao: string
  pontos_positivos: string
  proximo_passo_imediato: string
}
```

---

## 4. Auditoria de UI/UX

### 4.1 Problemas de navegação

| ID | Severidade | Descrição |
|---|---|---|
| NAV-001 | Alta | `/settings/ai` fora do layout dashboard — sidebar desaparece ao clicar em "Configurações IA" |
| NAV-002 | Baixa | Breadcrumb de `/events/[id]` mostra UUID truncado ("Evento abc12345…") — pouco descritivo; deveria mostrar o título do evento |
| NAV-003 | Baixa | "Admin" no sidebar aparece apenas como link único sem submenu — ao navegar para /admin/tenants, /admin/ai etc. não há subnavegação |

### 4.2 Estados e feedback

| ID | Severidade | Descrição |
|---|---|---|
| UX-001 | Alta | Nenhum fluxo de onboarding — novo usuário cai diretamente no dashboard sem orientação |
| UX-002 | Alta | "Enviar para análise SERA" na interface de entrevista está desabilitado com texto placeholder — funcionalidade prometida não entregue |
| UX-003 | Média | Checkout de créditos não implementado — botão "Comprar" exibe toast "Checkout ainda não está implementado neste ambiente" |
| UX-004 | Média | PDF de perfil de risco exibe `alert()` nativo — "Exportação PDF em desenvolvimento" |
| UX-005 | Média | Barra de progresso de nova análise vai de 0 a 60s em 6 etapas — se o pipeline demorar >60s, a UI fica estagnada na última etapa sem feedback |
| UX-006 | Baixa | Dashboard com dados insuficientes exibe mensagem inline — não há estado "empty state" dedicado para organização recém-criada |

### 4.3 Ações corretivas

| ID | Severidade | Descrição |
|---|---|---|
| UX-007 | Alta | Página `/actions` não possui campo de data de vencimento (due_date), prioridade ou seletor de responsável — apenas texto livre de `responsible` já salvo |
| UX-008 | Média | Sem paginação ou infinite scroll na lista de ações — escalabilidade limitada |

### 4.4 Perfil de risco

| ID | Severidade | Descrição |
|---|---|---|
| UX-009 | Baixa | Duas matrizes de risco (ISO 31000 + ARMS-ERC) em tabs sem explicação de quando usar qual |

---

## 5. Auditoria de Copy

### 5.1 Labels com viés de indústria

| ID | Localização | Copy atual | Problema |
|---|---|---|---|
| CP-001 | `events/new/page.tsx` | "Aeronave / equipamento / sistema" | Label de campo comprido; a chave i18n é apenas "Aeronave" — inconsistência entre código e i18n |
| CP-002 | `messages/pt-BR.json` | `"aircraft": "Aeronave"` | Chave chamada `aircraft`, valor "Aeronave" — produto não-aviation recebe label errada |
| CP-003 | `messages/pt-BR.json` | `"hfacs.crm": "Gestão de Recursos da Tripulação (CRM)"` | "Tripulação" é exclusivamente aeronáutico — em segurança industrial seria "Equipe" |

### 5.2 Tom e consistência

| ID | Localização | Copy atual | Problema |
|---|---|---|---|
| CP-004 | `events/new/page.tsx` | "Este processo leva entre 60 e 120 segundos" | Discrepância: barra de progresso só cobre 60s; usuário pode esperar 120s sem feedback |
| CP-005 | `messages/pt-BR.json` | `"subtitle_critical": "⚠️ Atenção: sua operação requer intervenção imediata"` | Emoji em contexto de segurança profissional reduz credibilidade |
| CP-006 | `messages/pt-BR.json` | `"hfacs.bonus": "BÔNUS"` | Posicionar HFACS como "bônus" diminui a percepção de valor de um mapeamento metodológico importante |
| CP-007 | `(dashboard)/layout.tsx` | `"HFA" / "SERA Analysis"` | Nome do produto no sidebar é duplo e inconsistente — qual é o produto? |
| CP-008 | `credits/page.tsx` | "Cada análise SERA completa consome 1 crédito" | Correto, mas não menciona o que acontece se a análise falhar |

### 5.3 Microcopy de qualidade

| ID | Localização | Copy atual | Avaliação |
|---|---|---|---|
| CP-009 | `events/[id]/page.tsx` | "Esta conclusão é gerada com apoio de IA… O investigador deve revisar, complementar e validar antes de qualquer encaminhamento formal." | ✅ Disclaimer correto e claro |
| CP-010 | `AiInsightPanel.tsx` | "Padrões identificados com apoio de modelo de linguagem — sujeito a revisão do investigador" | ✅ Consistente com política epistêmica do produto |
| CP-011 | `EvidenceIntakePage.tsx` | "Evite perguntas acusatórias ou termos como erro, culpa, violação, P-D ou A-C durante a entrevista." | ✅ Metodologicamente correto, mas termos técnicos (P-D, A-C) não são compreensíveis para investigadores novatos |

---

## 6. Auditoria de Dashboard

### 6.1 Completude de dados

| Seção | Status | Observação |
|---|---|---|
| Score de risco (0–100) | ✅ Implementado | Color-coded (critical/warning/ok) + progress bar |
| Ações vencidas / sem dono / taxa resolução | ✅ Implementado | OrgScoreCard |
| Distribuição de falhas P/O/A | ✅ Implementado | Barras horizontais com top 3 por categoria |
| Padrões (combinações) | ✅ Implementado | Tabela de top_combinations com frequência |
| Diagnóstico por IA | ✅ Implementado | On-demand, não cacheado |
| Top precondições | ✅ Implementado | PreconditionsChart |
| Tendência (6 meses) | ✅ Implementado | SVG inline, sem biblioteca de gráfico |
| Eventos recentes | ✅ Implementado | Tabela simples |
| Alertas | ✅ Implementado (inferido) | Usado no componente |

### 6.2 Problemas de dashboard

| ID | Severidade | Descrição |
|---|---|---|
| DB-001 | Média | Diagnóstico IA não é persistido — cada clique em "Gerar" faz nova chamada ao LLM; sem cache, histórico ou comparação entre períodos |
| DB-002 | Média | Sem filtro de período — dashboard mostra agregado de toda a história; não é possível ver apenas "último mês" ou "últimos 6 meses" |
| DB-003 | Baixa | DATA_INFO e PRECONDITION_DEFS são mapas inline de ~100 linhas em dashboard/page.tsx — deveriam estar em arquivo de configuração separado |
| DB-004 | Baixa | TrendChart usa SVG inline sem biblioteca — limitações de tooltip e interatividade |

---

## 7. Auditoria de Configuração Empresarial

### 7.1 Configurações disponíveis por tenant

| Configuração | Disponível | Localização | Observação |
|---|---|---|---|
| Provedor de IA | ✅ | `/settings/ai` | Por tenant; suporta DeepSeek, OpenAI, Anthropic, Google, Groq |
| Chaves de API por provedor | ✅ | `/settings/ai` | Armazenadas com segurança; exibe apenas sufixo |
| Teste de provedor (ping) | ✅ | `/settings/ai` | Latência retornada |
| Plano (free/enterprise) | ✅ | Admin only | Sem auto-upgrade |
| Créditos (saldo) | ✅ | `/credits` | Exibição somente leitura |
| Compra de créditos | ❌ | `/credits` | Stripe não conectado |
| Perfil da organização | ❌ | — | Nome, CNPJ, logo, setor — não existe |
| Gestão de usuários | ❌ | — | Sem convite, sem roles diferenciados por membro |
| Notificações | ❌ | — | Sem configuração de alertas por email/webhook |
| Marca branca | ❌ | — | Não existe |

### 7.2 Planos disponíveis

| Plano | Créditos | Checkout | Observação |
|---|---|---|---|
| free | Saldo finito (default) | N/A | Usuário inicial com créditos pré-alocados |
| enterprise | Ilimitado (credits_balance = -1) | Manual (admin) | Sem página de upgrade self-serve |

> ❌ **Gap crítico:** não há plano intermediário (Pro / Team). Usuário free que esgota créditos precisa aguardar ação manual do admin para upgrade.

---

## 8. Auditoria da Interface de Entrevista (SERA Interview)

| Aspecto | Status | Observação |
|---|---|---|
| Roteiro de perguntas estruturado | ✅ | question-bank.json por seção |
| Checklist de evidências | ✅ | sufficiency-gates.json |
| Verificação de suficiência (algoritmo) | ✅ | assessInterviewSufficiency() |
| Transcrição manual | ✅ | Textarea + flag de consentimento + flag de revisão |
| Integração com pipeline SERA | ❌ | Botão "Enviar para análise SERA" desabilitado |
| Persistência de sessão de entrevista | ❌ | Estado somente em memória — refresh perde tudo |
| Exportar transcrição | ❌ | Não existe |

---

## 9. Pontos Positivos

1. **Metodologia SERA completamente implementada** — 7 etapas exibidas com granularidade total no relatório de evento.
2. **Dual risk matrix** — ISO 31000 (5×5) + ARMS-ERC (4×4) com explicações metodológicas detalhadas via modal.
3. **HFACS cross-mapping** — mapeamento automático SERA → HFACS com referências bibliográficas.
4. **Editable classification** — investigador pode corrigir P/O/A com recálculo em tempo real.
5. **AI Insight Panel** — diagnóstico organizacional on-demand com recomendações priorizadas.
6. **Evidence collection tool** — roteiro estruturado de entrevista exclusivo no mercado de safety analysis.
7. **Multi-language** — pt-BR e en implementados via Zustand + i18n.
8. **Disclaimers epistêmicos** — produto deixa claro em múltiplos pontos que IA é assistiva.
9. **Mobile responsive** — sidebar colapsável com drawer overlay.
10. **Créditos com plano enterprise ilimitado** — modelo de monetização misto implementado.
11. **AI provider flexibility** — tenant pode trazer sua própria chave de API.

---

## 10. Resumo de Gaps por Prioridade

### Alta — Bloqueadores de Conversão / Retenção

| ID | Gap |
|---|---|
| GAP-001 | Checkout Stripe não implementado — impossível comprar créditos |
| GAP-002 | Interview desconectado do pipeline — funcionalidade core prometida não entregue |
| GAP-003 | Nenhum fluxo de onboarding — taxa de ativação comprometida |
| GAP-004 | Sem plano intermediário — cliff entre free (sem créditos) e enterprise (contato manual) |

### Média — Qualidade do Produto

| ID | Gap |
|---|---|
| GAP-005 | PDF export não implementado (risk profile) |
| GAP-006 | `/settings/ai` fora do layout — sidebar desaparece |
| GAP-007 | Ações corretivas sem due_date, prioridade e owner assignment UI |
| GAP-008 | Dashboard sem filtro de período |
| GAP-009 | AI Insight não persistido — sem histórico comparativo |
| GAP-010 | Labels aviation-specific em produto multi-indústria |

### Baixa — Refinamento

| ID | Gap |
|---|---|
| GAP-011 | Breadcrumb de evento usa UUID, não título |
| GAP-012 | Interview sem persistência de sessão |
| GAP-013 | Sem gestão de usuários / convite por email dentro do tenant |
| GAP-014 | Sem perfil de organização (nome, logo, setor) |
| GAP-015 | "BÔNUS" para HFACS — posicionamento que reduz percepção de valor |
| GAP-016 | CP-011: termos técnicos SERA (P-D, A-C) na UI de entrevista sem tooltip |

---

## 11. APIs e Integrações Externas

| Integração | Status | Observação |
|---|---|---|
| Supabase (auth + DB) | ✅ Ativo | OAuth, sessões, dados de tenant |
| DeepSeek / deepseek-reasoner | ✅ Ativo | Motor padrão do pipeline SERA |
| OpenAI, Anthropic, Google, Groq | 🔄 Configurável | Chave por tenant, mas motor assume DeepSeek em produção |
| Stripe | ❌ Não implementado | stripe_price_id existe no schema mas checkout não integrado |
| PDF generation | 🔄 Parcial | `/analyses/[id]/pdf` existe; risk profile export é placeholder |
| Email / notificações | ❌ Não existe | Nenhuma integração de email observada |
| Webhooks | ❌ Não existe | Sem webhooks para sistemas externos |

---

*Auditado em 2026-05-16 · Baseado em leitura direta de frontend/src/ · Versão de produto: v0.2-A*
