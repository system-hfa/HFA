# PRODUCT ROADMAP — HFA v0.2

**Data:** 2026-05-17 (revisado em v0.2-C)
**Baseado em:** `docs/PRODUCT_AUDIT_v0.2-A.md` · `docs/PRODUCT_VALUE_STRATEGY_v0.2.md`
**Status atual:** v0.1 — SERA pipeline funcional, UI completa, gaps de conversão críticos

> **Revisão v0.2-C:** estratégia reorientada para trial gratuito e diagnóstico organizacional acumulado. Stripe e planos pagos movidos para fase posterior. Prioridade imediata: onboarding → resultado de análise → matrizes → dashboard → trial → relatório → recomendações → empresa/usuários → monetização.

---

## 1. Estado de Partida (v0.1)

### O que funciona
- Pipeline SERA completo (7 etapas) com DeepSeek reasoner
- Relatório de evento com classificação editável (P/O/A) e recálculo
- Dashboard com score de risco, distribuição de falhas, padrões, AI Insight, precondições, tendência
- Dual risk matrix (ISO 31000 + ARMS-ERC)
- HFACS cross-mapping automático
- Interface de coleta de evidências (entrevista estruturada) — sem integração com pipeline
- Sistema de créditos + plano enterprise ilimitado
- AI provider configurável por tenant (5 provedores)
- i18n pt-BR / en

### Bloqueadores de conversão ativos
- Checkout Stripe não implementado — usuário free não pode comprar créditos
- Sem plano intermediário — cliff entre free e enterprise manual
- Sem onboarding — novo usuário não sabe por onde começar
- Interview desconectado do pipeline — promessa não entregue

---

## 2. Princípios do Roadmap

1. **Valor antes de receita** — demonstrar diagnóstico organizacional real antes de pedir pagamento.
2. **Trial gratuito como investimento** — 10 análises grátis por empresa cobrem custo de tokens e geram a percepção de valor necessária para conversão.
3. **Completar antes de expandir** — funcionalidades incompletas (resultado do evento, PDF, ações) têm prioridade sobre módulos novos.
4. **Stripe só após validação de valor** — não implementar checkout self-serve antes de ter pelo menos 3 empresas que pediram para continuar após o trial.
5. **Multi-indústria progressivo** — remover atrito de labels aviation-specific sem reescrever copy de forma ampla.
6. **Epistemologia consistente** — qualquer nova feature com IA deve manter disclaimers de assistência.

---

## 3. v0.2 — Foco: Valor e Diagnóstico Organizacional

**Objetivo:** fazer o usuário perceber valor antes de qualquer decisão de pagamento. Entregar onboarding, resultado de análise completo, matrizes de risco, dashboard com diagnóstico, e trial gratuito de 10 análises por empresa.

**Critério de aceite:** empresa nova consegue se cadastrar, realizar 10 análises gratuitas, ver seu perfil de risco se formando, e entender por que quer continuar usando o sistema.

> **Stripe e planos pagos não fazem parte do v0.2.** A conversão será feita manualmente (contato direto) até que o valor esteja comprovado.

---

### Fase A — Navegação e Layout (Bloqueador técnico)

**Por quê:** `/settings/ai` fora do layout dashboard quebra a experiência ao clicar em "Configurações IA".

| Tarefa | Arquivo | Ação |
|---|---|---|
| Mover `settings/ai/page.tsx` para `(dashboard)/settings/ai/page.tsx` | `app/settings/ai/page.tsx` | Mover arquivo; atualizar import se necessário |
| Verificar links e breadcrumb | `(dashboard)/layout.tsx` | ROUTE_LABELS já contém `/settings/ai` → 'Configurações › IA' |

**Estimativa:** 1h · Risco: baixo

---

### Fase B — Trial Gratuito (10 análises por empresa)

**Por quê:** o usuário precisa de análises suficientes para ver o padrão organizacional emergir. 10 análises grátis permitem demonstrar valor real sem barreira de pagamento e garantem que precondições e combinações comecem a emergir com base estatística mínima.

| Tarefa | Descrição |
|---|---|
| B-1: Campo `trial_analyses_used` no tenant | Contador de análises usadas no trial (default: 0) |
| B-2: Lógica de trial em `/api/events` | Incrementar contador; bloquear se > 10 e plan = 'free' |
| B-3: Contador visível em todas as telas | "6 de 10 análises gratuitas usadas" — banner sutil |
| B-4: Banner de urgência | Na análise 8: "Você tem 2 análises gratuitas restantes" |
| B-5: Estado pós-trial | Dashboard parcialmente visível: score + top-1 desbloqueados, detalhes travados |
| B-6: CTA de conversão pós-trial | Modal: "Veja o que o HFA encontrou na sua empresa" + formulário de contato |

**Estimativa:** 2–3 dias · Risco: baixo · Sem Stripe

---

### Fase C — Checkout Stripe (ADIADO — pós-validação de valor)

**Por quê está adiado:** Stripe só deve ser implementado após confirmar que pelo menos 3 empresas usaram o trial completo e pediram para continuar. A conversão manual (admin altera plano) é suficiente no estágio atual.

> ⏸ Mover para v0.3 ou posterior. Ver `PRODUCT_VALUE_STRATEGY_v0.2.md` seção 9.

---

### Fase D — Onboarding de Novo Usuário (PRIORIDADE ELEVADA)

**Por quê:** usuário recém-cadastrado cai no dashboard sem guia; taxa de ativação comprometida.

| Tarefa | Descrição |
|---|---|
| D-1: Detectar "first_analysis" | Flag no perfil do tenant (`first_analysis_done: boolean`) |
| D-2: Empty state encorajador no dashboard | Quando `first_analysis_done = false`: "Você está a 10 análises de um diagnóstico completo. Comece agora." |
| D-3: Comunicar proposta de valor | Texto na primeira tela: "o HFA acumula análises para revelar padrões de falha humana da sua organização" |
| D-4: Tooltip progressivo em `/events/new` | Tooltip hover em cada campo explicando o que preencher |
| D-5: Exemplo de relato | Texto de exemplo pré-preenchido no campo `raw_input` (removível) |
| D-6: Marcar onboarding completo | Após primeira análise concluída, atualizar flag |

**Estimativa:** 3 dias · Risco: baixo

---

### Fase E-0 — Resultado do Evento e Matrizes (NOVA PRIORIDADE ANTES DE E)

**Por quê:** o relatório por evento é o primeiro contato real com o produto. Precisa mostrar o nível de risco do evento individual e ter CTA de ação corretiva.

| Tarefa | Descrição |
|---|---|
| E0-1: Mini-card de risco por evento | Após Etapas 3/4/5 em `/events/[id]`: ERC + Score ISO + label de ação |
| E0-2: Badge de risco na lista de eventos | Coluna "Risco" em `/events` com nível (crítico/warning/ok) |
| E0-3: CTA "Criar ação" | Botão vinculado a cada recomendação na Etapa 7 |
| E0-4: Badge "precondição recorrente" | Quando precondição aparece em >30% das análises do tenant |
| E0-5: Estado "perfil em formação" | `/risk-profile` com 1–4 análises: barra de progresso + dados parciais |
| E0-6: Persistir AI Insight | `org_insights` table — salvar último insight com timestamp |

**Estimativa:** 2 dias · Risco: baixo

---

### Fase E — Integração Interview → Pipeline

**Por quê:** botão "Enviar para análise SERA" está desabilitado — funcionalidade prometida na UI não entregue.

| Tarefa | Descrição |
|---|---|
| E-1: Persistência de sessão de entrevista | Salvar transcript + questionStates + evidenceMap em localStorage ou Supabase (rascunho de evento) |
| E-2: Endpoint de criação de evento a partir de transcrição | POST `/api/events/from-transcript` com `transcript` + `evidence_map` + metadados |
| E-3: Habilitar botão "Enviar para análise SERA" | Condição: `transcriptionReviewed && consentConfirmed && sufficiencyResult?.sufficient === true` |
| E-4: Feedback após envio | Redirecionar para `/events/[id]` com estado de carregamento |
| E-5: Revisão de suficiency gates | Validar que `sufficiency-gates.json` cobre os pré-requisitos reais do pipeline |

**Estimativa:** 5–7 dias · Risco: médio

---

### Fase F — PDF Export

**Por quê:** PDF está esperado por usuários em contextos regulatórios (ANAC, ICAO, ISO 45001).

| Tarefa | Descrição |
|---|---|
| F-1: Relatório de evento PDF | `/analyses/[id]/pdf` — verificar implementação atual; adicionar capa, sumário, disclaimer |
| F-2: Perfil de risco PDF | Substituir `alert()` por download real; incluir ambas matrizes + precondições + tendência |
| F-3: Template de PDF | Logo HFA, numeração de páginas, data de emissão, disclaimer epistêmico |

**Estimativa:** 4–6 dias · Risco: médio (renderização server-side vs client-side PDF)

---

### Fase G — Ações Corretivas — UI Completa

**Por quê:** campo `responsible` é texto livre; sem `due_date` ou `priority`, o módulo tem utilidade limitada para gestão real.

| Tarefa | Descrição |
|---|---|
| G-1: Adicionar campos ao schema | `due_date: date`, `priority: 'low'|'medium'|'high'|'critical'`, `owner_user_id: uuid` |
| G-2: Atualizar UI em `/actions` | Due date picker, seletor de prioridade (badge colorido), dropdown de owner (usuários do tenant) |
| G-3: Sorting e filtros | Ordenar por due_date, priority; filtrar por owner |
| G-4: Indicador de prazo | Ação vencida → badge vermelho; vencendo em 3 dias → badge amarelo |
| G-5: Atualizar OrgScoreCard | `open_overdue` já existe — confirmar que cálculo usa `due_date` |

**Estimativa:** 4 dias · Risco: baixo

---

## 4. v0.3 — Foco: Multi-indústria e Colaboração

### Fase H — Perfil de Organização

| Tarefa | Descrição |
|---|---|
| H-1: Página `/settings/organization` | Nome da organização, setor (dropdown: aviação, saúde, petróleo, indústria, outro), logo |
| H-2: Setor → copy contextualizado | Substituir "Aeronave" por campo genérico "Equipamento / sistema" quando setor ≠ aviation |
| H-3: Adaptar HFACS labels | "Tripulação" → "Equipe" para setores não-aviation |

### Fase I — Gestão de Usuários do Tenant

| Tarefa | Descrição |
|---|---|
| I-1: Roles por membro | `viewer` (somente leitura), `analyst` (cria/edita análises), `admin` (configurações + ações) |
| I-2: Convite por email | Endpoint `/api/org/invite`; email com link de aceite |
| I-3: Página `/settings/team` | Listar membros, exibir role, desativar membro |

### Fase J — Notificações

| Tarefa | Descrição |
|---|---|
| J-1: Email pós-análise | Notificar analista quando pipeline concluir |
| J-2: Email de ação vencida | Notificar owner quando `due_date` passar sem status `completed` |
| J-3: Configuração de notificações | `/settings/notifications` — toggle por tipo de evento |

---

## 5. v0.4 — Foco: Inteligência e Escala

### Fase K — Dashboard com Filtros Temporais

| Tarefa | Descrição |
|---|---|
| K-1: Filtro de período | Seletor: 30 dias / 90 dias / 6 meses / 12 meses / custom |
| K-2: Persistência do AI Insight | Salvar diagnósticos gerados com timestamp; exibir histórico |
| K-3: Comparação de períodos | Delta de score entre período atual e anterior |

### Fase L — Relatórios Exportáveis

| Tarefa | Descrição |
|---|---|
| L-1: Export CSV/Excel de eventos | Filtros aplicados → download |
| L-2: Export de ações corretivas | Com status, owner, due_date |
| L-3: Relatório agregado anual | PDF com resumo executivo do ano |

### Fase M — Benchmarking (futuro)

| Tarefa | Descrição |
|---|---|
| M-1: Score médio por setor | Comparar score da org com anonimizados do mesmo setor |
| M-2: Padrões de falha por setor | Top códigos P/O/A por indústria (dados anonimizados) |

---

## 6. Copy e UX — Backlog Independente

Pode ser executado em paralelo com qualquer fase acima.

| ID | Prioridade | Ação |
|---|---|---|
| CP-001 | Média | Renomear chave i18n `aircraft` para `asset_system`; atualizar valor pt-BR para "Equipamento / sistema" |
| CP-004 | Média | Sincronizar tempo máximo do progress overlay (60s) com SLA real do pipeline; adicionar estado de "aguardando" se >60s |
| CP-005 | Baixa | Remover emoji de subtítulos de status de risco no dashboard |
| CP-006 | Baixa | Remover badge "BÔNUS" do HFACS; integrar como seção normal do relatório |
| CP-007 | Baixa | Definir nome único do produto: "HFA" ou "SERA"? Corrigir logo/tagline |
| CP-011 | Baixa | Adicionar tooltip em P-D, A-C na UI de entrevista para usuários sem treinamento SERA |
| NAV-002 | Baixa | Breadcrumb de evento: mostrar título do evento, não UUID |

---

## 7. Sequência Recomendada (Revisada v0.2-C)

**Ordem de prioridade: valor demonstrável > completude > monetização**

```
v0.2:
  Fase A  (1h)  → Fase D  (3d)   → Fase E0 (2d)  → Fase B  (3d)
  [layout]        [onboarding]      [resultado+     [trial
                                     matrizes]       gratuito]

                → Fase E  (7d)   → Fase F  (6d)  → Fase G  (4d)
                  [interview→      [PDF]            [ações
                   pipeline]                         completas]

  [CP backlog independente — paralelo com qualquer fase]

v0.3:
  Fase H (org profile) → Fase I (usuários/convite) → Fase J (notificações)

v0.4 (pós-validação de valor):
  Fase C revisitada (Stripe/checkout self-serve)
  Fase K (filtros temporais) → Fase L (relatórios) → Fase M (benchmarking)
```

> **Stripe não aparece em v0.2.** Só entra no roadmap ativo após confirmação de demanda real.

---

## 8. Critérios de Aceite v0.2 (Revisados)

| Critério | Obrigatório | Mudança |
|---|---|---|
| Empresa nova consegue fazer 10 análises gratuitas sem atrito | Sim | NOVO |
| Trial counter visível em todas as telas | Sim | NOVO |
| Resultado do evento mostra nível de risco (ERC/ISO) | Sim | NOVO |
| Estado "perfil em formação" no risk-profile com <10 análises | Sim | NOVO |
| Onboarding para novo usuário (empty state encorajador) | Sim | Atualizado |
| `/settings/ai` com sidebar presente | Sim | Mantido |
| PDF de relatório de evento funcional | Sim | Mantido |
| SERA v0.1.2 (metodologia) não regredir | Sim | Mantido |
| Pipeline SERA: baseline v0.1.1 intacto | Sim | Mantido |
| Checkout Stripe self-serve | **Não** | REMOVIDO de v0.2 |
| PDF de perfil de risco | Desejável | Rebaixado |
| Ações corretivas com due_date e prioridade | Desejável | Rebaixado |

---

*Roadmap criado em 2026-05-16 · Revisado em 2026-05-17 (v0.2-C) · Baseado em PRODUCT_AUDIT_v0.2-A.md + PRODUCT_VALUE_STRATEGY_v0.2.md*
