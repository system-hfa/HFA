# PRODUCT VALUE STRATEGY — HFA v0.2

**Data:** 2026-05-17
**Escopo:** Filosofia de monetização, trial gratuito e proposta de valor por diagnóstico organizacional
**Baseado em:** PRODUCT_AUDIT_v0.2-A.md · leitura direta de frontend/src/

---

## 1. Filosofia de Produto

O HFA/SERA não é uma ferramenta de análise de incidentes — é um **diagnóstico de fator humano organizacional**.

A diferença é crítica:
- Uma ferramenta de análise de incidentes entrega um relatório por evento.
- Um diagnóstico organizacional entrega inteligência acumulada sobre os padrões de falha humana da empresa.

O valor unitário de cada análise é real mas limitado. O valor **acumulado** de 10, 20, 50 análises é qualitativamente diferente: revela padrões sistêmicos, perfil de risco, precondições recorrentes, combinações de falha institucionais. Esse é o produto que o HFA vende — não laudos individuais.

---

## 2. Por que Oferecer 5–10 Análises Gratuitas

### O problema do cold start

Toda empresa nova chega ao sistema com zero dados. Um dashboard vazio não demonstra nenhum valor. A primeira análise isolada também demonstra pouco — é um relatório individual, não um diagnóstico.

A proposta de valor do HFA só se materializa **quando há padrão a mostrar**. Com 5–10 análises:

- A matriz de risco começa a se preencher com dados reais da empresa.
- As precondições mais frequentes emergem.
- O score de risco organizacional tem base estatística mínima.
- Combinações de falha recorrentes tornam-se visíveis.
- O AI Insight tem histórico suficiente para diagnóstico com alguma substância.

Com menos de 5 análises, o sistema não consegue demonstrar valor diferencial. Com mais de 10, o usuário já está dentro do ciclo de valor e a conversão é consequência natural — não coerção.

### O custo de aquisição pelo trial

O custo de tokens para 5–10 análises completas (pipeline SERA + 7 etapas + recomendações) é baixo comparado ao custo de aquisição de um cliente via outros canais. O trial gratuito é investimento em demonstração de produto, não gasto operacional.

### A barreira correta é a percepção de valor, não o crédito

Usuários que deixam o produto não o fazem porque faltou dinheiro para pagar. Deixam porque não viram valor antes que os créditos acabassem. A solução não é Stripe — é garantir que o valor seja perceptível com as análises gratuitas.

---

## 3. Qual Valor o Sistema Precisa Demonstrar

Antes de pedir pagamento, o sistema deve ter mostrado ao usuário que:

1. **O relatório por evento é rigoroso e confiável** — metodologia SERA completa, rastreável, com justificativas científicas. O usuário vê um laudo que parece profissional e que ele poderia usar em audiência regulatória ou reunião de segurança.

2. **A classificação é rastreável** — o usuário entende por que o evento foi classificado como P-F e não P-G. Ele pode editar, contestar e recalcular. Isso cria confiança no motor.

3. **As matrizes de risco fazem sentido** — o usuário vê a posição do evento na ISO 31000 e no ARMS-ERC. O modal explica o raciocínio. Ele entende a diferença entre as duas abordagens.

4. **O acúmulo de análises gera inteligência** — com 5+ análises, o dashboard começa a mostrar padrões. O usuário vê que não estava operando com ruído aleatório — há estrutura nos seus dados de falha humana.

5. **A empresa tem um perfil de risco identificável** — não é score de risco genérico. É: "a falha mais frequente na sua organização é P-D (Atenção com Pressão de Tempo Externa), aparecendo em 60% dos eventos. Isso indica..." Isso é o insight que nenhum outro produto entrega.

---

## 4. Diferença Entre Valor por Evento e Valor Acumulado

### Valor por evento

| Entrega | Quem beneficia |
|---|---|
| Classificação P/O/A com justificativa | Investigador |
| Ponto de fuga da operação segura | Investigador + Gestor |
| Recomendações vinculadas ao código | Gestor de segurança |
| Posição nas matrizes de risco | Gestor + Comitê |
| PDF para arquivo regulatório | Compliance / ANAC |

O valor por evento é **individual e imediato**. É o que convence o investigador a usar o sistema.

### Valor acumulado

| Entrega | Quem beneficia |
|---|---|
| Score de risco organizacional 0–100 | Diretor de segurança |
| Top precondições da empresa | Gestor + RH + Treinamento |
| Padrões de falha recorrentes | Comitê de segurança |
| Comparativo temporal (tendência) | Diretor + Auditoria |
| Recomendações abertas e vencidas | Gestor de ações |
| AI Insight organizacional | Diretor + Consultores |

O valor acumulado é **organizacional e estratégico**. É o que convence o Diretor a pagar.

A estratégia de trial deve conduzir o usuário da percepção individual (eu usei, gostei) para a percepção organizacional (minha empresa tem padrão X de falha humana). Essa transição é o momento de conversão.

---

## 5. Como a Empresa Percebe Valor

### Jornada de percepção de valor

```
Análise 1:    "Isso funciona."
              → O relatório é bom. A classificação faz sentido.

Análises 2–4: "Isso é consistente."
              → Resultados similares confirmam que o motor é confiável.

Análise 5:    "Espera — esse padrão é meu."
              → O dashboard começa a mostrar que P-D aparece em 3 dos 5 eventos.
              → O score cai para 42. Isso é real.

Análise 7–10: "Eu tenho um problema sistêmico."
              → Top precondições revelam P2 (estado psicológico) como dominante.
              → AI Insight nomeia o padrão: "pressão temporal crônica na fase de briefing."
              → O usuário percebe que tem diagnóstico. Não quer perder isso.

Conversão:   "Preciso continuar usando."
              → Paywall não é ameaça — é oportunidade de manter o diagnóstico vivo.
```

---

## 6. Métricas que Devem Aparecer no Dashboard

### MVP (com 5–10 análises)

| Métrica | Por quê importa |
|---|---|
| Score de risco 0–100 | Número único para gestão |
| Nível de risco (critical/warning/ok) | Semáforo executivo |
| Total de análises realizadas | Contexto do denominador |
| Código de falha mais frequente | Top 1 insight imediato |
| Precondição mais frequente | Causa raiz sistêmica |
| Ações abertas / vencidas | Urgência gerencial |
| Tendência (crescente/decrescente) | Está melhorando? |
| Combinação de falha mais comum | Padrão institucional |

### Desejável (com 10+ análises)

| Métrica | Por quê importa |
|---|---|
| Distribuição P/O/A (%) | Onde está a maior concentração de falhas |
| ERC modal por empresa | Efetividade das barreiras no nível organizacional |
| Taxa de resolução de ações | Maturidade do sistema de gestão |
| Variação de score período a período | Evidência de melhoria ou deterioração |
| Ranking completo de precondições | Priorização de intervenções |

---

## 7. Telas que Precisam ser Fortalecidas Antes de Monetização

### Prioridade 1 — Resultado do Evento

O relatório por evento é o primeiro contato real com o produto. Hoje faltam:
- **Nível de risco do evento individual** — posição nas matrizes (a página mostra as matrizes no perfil de risco agregado, mas não por evento)
- **CTA "Criar ação corretiva"** vinculado diretamente a cada recomendação
- **Contagem de análises gratuitas restantes** — sem isso o usuário não tem senso de urgência para acumular

### Prioridade 2 — Dashboard com Empty State Encorajador

O dashboard vazio diz "Nenhuma análise disponível". Deveria dizer: "Você está a X análises de um diagnóstico organizacional completo. Comece agora."

### Prioridade 3 — Onboarding

Sem guia, o usuário não sabe que existe o conceito de diagnóstico acumulado. Ele pensa que está comprando um laudo. O onboarding precisa comunicar a proposta de valor desde o primeiro acesso.

### Prioridade 4 — Perfil de Risco — Versão Prévia com Poucas Análises

Com 1–4 análises, o perfil de risco está vazio. Deveria mostrar estado parcial: "Baseado em 3 análises — seu perfil de risco ainda está se formando. Com 5+ análises, os padrões começarão a emergir."

---

## 8. Proposta de Trial

### Estrutura

- **10 análises gratuitas por empresa (tenant)** — não por usuário.
- Análises que falham (erro técnico, timeout) **não consomem** o trial.
- O contador é visível em todas as telas: "6 de 10 análises gratuitas usadas."
- Ao atingir 10, o usuário vê o que teria se continuasse: o perfil de risco formado, o score atual, as precondições identificadas.
- Sem Stripe — conversão via contato (email, formulário) com o Filipe como primeiro ponto de contato.

### Gatilhos de conversão

1. **Análise 5:** Banner sutil — "Você está na metade do seu trial. O diagnóstico está se formando."
2. **Análise 8:** Banner de urgência — "Você tem 2 análises gratuitas restantes."
3. **Análise 10 (última):** Modal de transição — "Você completou seu trial. Veja o que o HFA encontrou na sua organização até agora."
4. **Após a 10ª:** Dashboard bloqueado parcialmente — score e top-1 visíveis, detalhes travados. CTA claro: "Continue o diagnóstico."

### Dados visíveis no paywall

O usuário em estado de trial esgotado **deve ver**:
- Seu score de risco atual
- O código de falha mais frequente
- A precondição mais recorrente
- Uma frase do AI Insight (primeira linha)
- O que ele está perdendo: lista de métricas que desbloquearia

---

## 9. Critérios para Implementar Planos Pagos

Só implementar planos pagos (Stripe, checkout self-serve) quando:

1. O sistema tiver demonstrado capacidade de gerar valor real para pelo menos 3 empresas distintas em trial.
2. O relatório PDF de evento estiver funcional e com qualidade de arquivo regulatório.
3. O dashboard com filtro de período estiver disponível (o usuário precisa ver tendência histórica para justificar assinatura contínua).
4. O perfil de risco com ARMS-ERC modal + precondições completo estiver estável.
5. Existir pelo menos um usuário que usou as 5 análises e pediu para continuar.

Antes desses critérios, a monetização manual (admin altera plano) é suficiente e mais controlada.

---

*Documento criado em 2026-05-17 · Fase v0.2-C · Não alterar motor SERA, fixtures ou baseline*
