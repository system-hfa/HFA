# Revisão Científica: Metodologia ARMS/ERC — HFA/SERA
**Versão:** v0.2  
**Data:** 2026-05-17  
**Autor:** Revisão técnica Claude (solicitada por Filipe Daumas)  
**Status:** Rascunho — não aprovado, não executar mudanças de código  
**Relacionado a:** `RISK_MATRIX_DUAL_MODEL_DECISION_v0.2.md`, `RISK_VALIDATION_PLAN_v0.2.md`

---

## 1. Sumário Executivo

Esta revisão analisa a conformidade metodológica do HFA/SERA com o padrão ARMS (Airline Risk Management Solutions, Working Group 2007–2010), com base em leitura integral do relatório técnico primário.

**Achados principais:**

1. **ERC não é uma escala ordinal 1–5.** O índice ERC padrão ARMS tem 13 valores únicos não-lineares (1, 2, 4, 10, 20, 21, 50, 100, 101, 102, 500, 502, 2500) distribuídos em uma matriz 4×4. O HFA usa uma escala 1–5 — adaptação legítima, mas não documentada formalmente.

2. **ERC é para eventos individuais; SIRA é para padrões.** O uso do ERC no HFA para classificar relatos individuais está correto. O uso da matriz ISO/ICAO para o perfil organizacional corresponde conceitualmente ao SIRA — também correto.

3. **A escala da UI (ERC 5=perigo) está mais alinhada ao padrão ARMS** que a escala do motor (ERC 1=perigo). No índice ARMS, 1 é o menor risco e 2500 é o maior — "número maior = maior risco". A inconsistência motor × UI (F-001) representa um risco operacional sério.

4. **Customização é permitida**, mas com restrições: os valores do índice não devem ser alterados sem justificativa, e a calibração deve ser verificada (eventos de alto risco devem receber classificação alta).

**Conclusão**: A arquitetura dual do HFA/SERA está conceitualmente alinhada com o ARMS. Os problemas são de implementação, não de framework.

---

## 2. Fontes Consultadas

| Fonte | Versão / Data | Seções lidas |
|---|---|---|
| ARMS WG — "The ARMS Methodology for Operational Risk Assessment" | v4.1, março 2010 | Completo (pp. 1–67) |
| ARMS Quick Reference — "ARMS in a Nutshell" (sascon_10) | 2010 | Completo |
| ARMS Presentation — "ARMS — Operational Risk Assessment" | SASCON 2010 | pp. 1–20 |
| ICAO SMS Module N° 5 — Risks | Novembro 2008 | pp. 1–8 |

---

## 3. O ERC: Conceitos Fundamentais

### 3.1 Definição e propósito

O ERC (Event Risk Classification) é a ferramenta ARMS para **triagem inicial de eventos de segurança individuais**.

> *"Event-based risk refers to the risk that was present in the experienced event, without trying to consider all 'similar' events. Instead of trying to risk assess 'a similar event in the future', it risk assesses the risk that was present in that one event, that day."*  
> — ARMS WG Report, seção 6.7

O ERC responde a uma única pergunta: **"Quão preocupante foi este evento como experiência?"** — medida por duas dimensões:

1. **Quão perto chegou de um acidente?**
2. **Quão grave seria esse acidente?**

Que se traduzem em:
- **Q1**: "Se este evento tivesse escalado para um acidente, qual teria sido o desfecho mais crível?"
- **Q2**: "Qual foi a efetividade das barreiras remanescentes entre este evento e aquele cenário?"

**Regra crítica**: Barreiras que já falharam são **IGNORADAS**. O ERC avalia o que sobrou — não o que falhou.

### 3.2 A Matriz ERC 4×4 (padrão ARMS)

**Linhas — Q1 (desfecho do acidente mais crível):**

| Linha | Desfecho | Exemplos típicos |
|---|---|---|
| A | Acidente Catastrófico | Perda da aeronave, colisão em voo, 3+ fatalidades |
| B | Acidente Maior | 1–2 fatalidades, lesões graves múltiplas |
| C | Lesões ou Danos Menores | Lesões leves, danos menores à aeronave |
| D | Sem desfecho de acidente | Nenhum potencial de dano ou lesão |

**Colunas — Q2 (efetividade das barreiras remanescentes):**

| Coluna | Efetividade | Descrição |
|---|---|---|
| 1 | Efetiva | Barreiras robustas e confiáveis ainda presentes |
| 2 | Limitada | Barreiras com efetividade parcial |
| 3 | Mínima | Barreiras fracas ou incertas |
| 4 | Não efetiva | Sem barreiras funcionais |

**A linha D é um bloco único** — quando não há potencial de dano, avaliar barreiras remanescentes não faz sentido.

### 3.3 Os Dois Outputs do ERC

O ERC produz **dois outputs simultâneos e complementares**:

**Output 1 — Cor (recomendação operacional):**
- 🔴 **Vermelho**: ação imediata; investigação e reavaliação de risco obrigatórias; parar operação se necessário
- 🟡 **Amarelo**: investigar e/ou avaliar com mais refinamento; pode gerar Safety Issue
- 🟢 **Verde**: sem ação imediata; incorporar à base para análise estatística

**Output 2 — Índice de risco numérico (uso estatístico):**

| | Efetiva | Limitada | Mínima | Não efetiva |
|---|---|---|---|---|
| **Catastrófico (A)** | 50 🟡 | 102 🔴 | 502 🔴 | 2500 🔴 |
| **Maior (B)** | 10 🟡 | 21 🟡 | 101 🔴 | 500 🔴 |
| **Lesões/Danos (C)** | 2 🟢 | 4 🟡 | 20 🟡 | 100 🟡 |
| **Sem acidente (D)** | 1 🟢 | — | — | — |

Os valores não são arbitrários: são baseados em dados reais de acidentes, com proporção 1:5:25 entre classes de perda (seção 6.8 do relatório ARMS WG). Os valores 20, 100 e 500 apareciam em múltiplas células na primeira versão e foram incrementados (+2 na linha A, +1 na linha B) para tornar cada célula única — impacto negligível no valor de risco.

### 3.4 O Conceito de "Event-based Risk" e Por Que Ele Existe

A inovação central do ERC é avaliar o risco **do evento específico que ocorreu**, eliminando a pergunta "qual a probabilidade de recorrência?". Isso resolve quatro falhas dos métodos tradicionais de probabilidade × severidade (ARMS WG Report, seção 6.5):

**Falha 1 — "Severidade de quê?"**
A matriz clássica não define: do resultado real? Do pior caso? Do cenário mais provável? O ERC define explicitamente: "desfecho mais crível se o evento tivesse escalado".

**Falha 2 — "Probabilidade de quê?"**
A matriz clássica não define: o mesmo evento exato? Eventos similares? No mesmo local? O ERC elimina esta pergunta — não avalia probabilidade de recorrência.

**Falha 3 — Invalidação retroativa**
Se a frequência de eventos muda, avaliações passadas ficam matematicamente erradas (pois a probabilidade é parte do score). O ERC não depende de frequência — avaliações históricas permanecem válidas indefinidamente.

**Falha 4 — Dupla contagem ao somar**
Somar `probabilidade × severidade` de eventos individuais para obter o risco total distorce a estatística (probabilidade é contada duas vezes). Com o ERC, somar índices de eventos individuais é matematicamente correto, pois cada índice representa apenas severidade × proximidade de uma única ocorrência.

### 3.5 Uso Estatístico do Índice ERC

O índice ERC é explicitamente projetado para ser somado:

> *"ERC risk index values are for relative risk, i.e. they are used for comparing different risks, not as absolute values."*  
> — ARMS WG Report, seção 4.6

Usos práticos do índice:
- **Total de risco acumulado**: soma dos índices de todos os eventos em um período/aeroporto/rota
- **Comparação entre grupos**: risco total de eventos em aeroporto A vs B, mesmo com contagens diferentes
- **Safety Performance Indicators**: indicadores baseados em risco, não apenas em contagem
- **Detecção de clusters**: padrões que justificam elevação a Safety Issue

---

## 4. SIRA vs ERC: Quando Usar Cada Um

| Critério | ERC | SIRA |
|---|---|---|
| **Objeto de análise** | Evento individual histórico | Safety Issue (padrão) ou Mudança operacional |
| **Pergunta central** | "Quão preocupante foi este evento?" | "Qual o risco desta situação recorrente?" |
| **Probabilidade/frequência** | Ignorada (event-based) | Avaliada explicitamente (frequência do triggering event) |
| **Barreiras** | Efetividade das remanescentes (1 dimensão) | Avoidance barriers + Recovery barriers (2 dimensões separadas) |
| **Output** | Cor (red/yellow/green) + índice numérico | Nível: Stop / Improve / Secure / Monitor / Accept |
| **Framework de tolerabilidade** | Cores definidas pelo ARMS WG | JAR/FAR-1309 (tolerabilidade quantitativa) |
| **Quando acionar** | Todo relato que entra no sistema | Quando análise de dados identifica padrão preocupante |

> *"It is important to remember that SIRA is performed on Safety Issues, while ERC is used for events."*  
> — ARMS WG Report, seção 6.9

**Para o HFA/SERA:**
- A tela de evento individual usando ERC → uso correto per ARMS ✅
- A tela de perfil organizacional usando ISO/ICAO → análogo ao SIRA, uso correto conceitualmente ✅

---

## 5. Customização: Permitido vs Proibido (ARMS WG Report, seção 5.4)

### Permitido (ERC do's):
- Adaptar o texto das linhas e colunas para o contexto da organização
- Criar ERCs adicionais para dimensões de risco diferentes (ex: imagem corporativa, conformidade)
- Deixar a decisão final ao analista de segurança — ele é o único que pode avaliar o evento holisticamente
- Adaptar o ERC para organizações sem operações de voo, ajustando a linguagem

### Não recomendado / Proibido (ERC don'ts):
- **Não criar guias prescritivos demais** para cada linha/coluna — funcionam apenas para parte dos dados
- **Não remover o julgamento do analista** — o ERC é uma classificação inicial, não uma regra automática definitiva
- **Não alterar os valores do índice de risco** sem conseguir justificar os novos números publicamente
- **Não confundir "o que parou a sequência" com "o que sobrou"** — o ERC avalia o que restou, não o que falhou
- **Não usar a linha vertical para desfechos intermediários** como "aeronave inapta para voo" em vez de acidente de voo

---

## 6. Análise do HFA/SERA vs Padrão ARMS

### 6.1 ✅ Alinhado: ERC para eventos individuais

O HFA usa `computeEventRisk()` com a lookup table `EV_ARMS_ERC` para classificar cada evento no momento da avaliação. Isso é exatamente o uso correto do ERC per ARMS: classificar eventos históricos individuais com base em desfecho potencial × efetividade de barreira.

### 6.2 ✅ Alinhado conceitualmente: ISO/ICAO para perfil organizacional

O HFA usa a matriz ISO/ICAO na tela de `risk-profile` para avaliar o risco organizacional agregado. Conceitualmente, isso se aproxima do SIRA (análise de padrões). A distinção — um instrumento por evento, outro por organização — está correta.

### 6.3 ⚠️ Adaptação não documentada: escala 1–5 vs índice ARMS (1–2500)

O HFA usa uma escala ordinal 1–5 como proxy para o ERC, em vez do índice não-linear ARMS com 13 valores únicos. Esta é uma adaptação **legítima** para sistemas menores (o ARMS WG Report, seção 5.3, reconhece que pequenas organizações têm menos dados e precisam de ferramentas mais simples), mas precisa ser:

- Documentada formalmente como desvio intencional do padrão
- Calibrada (eventos que deveriam ser vermelhos realmente recebem ERC 5)
- Explicada na UI com linguagem precisa

O que a escala 1–5 perde vs o índice ARMS:

| Capacidade | Índice ARMS (1–2500) | Escala HFA 1–5 |
|---|---|---|
| Distinguir células dentro da mesma cor | ✅ ex: 21 vs 101, ambos amarelo, valores diferentes | ❌ ambos = ERC 3 |
| Somar para estatística agregada | ✅ matematicamente correto | ⚠️ soma ordinal — comparativa, não proporcional |
| Identificar cor/urgência | ✅ | ✅ se mapeado corretamente |
| Triagem rápida | ✅ | ✅ |

### 6.4 ❌ Crítico — F-001: Motor usa ERC 1=perigo; UI usa ERC 5=perigo

Esta é a inconsistência mais grave. O motor (`pipeline.ts`, `all-steps.ts`, `levels.json`) usa ERC 1 para o evento mais perigoso; a UI (`EV_ARMS_ERC`, `ERC_STYLE`, `ercLabels`) usa ERC 5 para o evento mais perigoso.

**Análise em relação ao padrão ARMS**: No índice ARMS, 1 é o MENOR risco (célula D, "sem potencial de acidente") e 2500 é o MAIOR risco (célula A×4, "catástrofe sem barreiras"). A direção "número maior = maior risco" é intrínseca ao design ARMS.

A escala da UI do HFA (ERC 5=perigo) está **alinhada** com esta direção.  
A escala do motor (ERC 1=perigo) está **invertida** em relação ao padrão ARMS.

**Consequência imediata**: `analyses.erc_level` armazenado pelo motor nunca é exibido na UI (que recalcula via `computeEventRisk()`). As escalas coexistem sem colisão visual hoje, mas qualquer tentativa de conectá-las produziria inversão total de significado — um evento catastrófico seria exibido como "aceitável".

### 6.5 ⚠️ Desvio menor: linha "D" dividida em colunas de barreira

No ARMS padrão, a linha D ("sem desfecho de acidente") é um bloco único com índice 1. O ARMS WG explica explicitamente: "não faz sentido estimar efetividade de barreiras quando não há potencial de dano".

No HFA, a linha D é dividida em quatro colunas: D1=2, D2=2, D3=1, D4=1. Isso causa um problema menor: eventos genuinamente sem potencial de acidente que caem em D1 ou D2 recebem ERC 2, não ERC 1.

**Impacto prático**: baixo, pois se um evento realmente não tem potencial de acidente, o analista deveria selecionar a coluna mais alta de barreira (D3/D4 → ERC 1). O problema é mais de UX do que de lógica de risco.

### 6.6 ⚠️ Limitação conhecida: barreira no perfil organizacional derivada de score heurístico

No perfil organizacional (`risk-profile/page.tsx`), a efetividade de barreira é derivada do score organizacional (0–100) por uma função `barrierLevel(score)`. Isso não corresponde à avaliação de barreiras específicas de eventos ARMS — é uma aproximação heurística.

É aceitável como indicador de saúde organizacional estimada, mas deve ser apresentada como tal — não como "efetividade de barreira ARMS" no sentido estrito do método.

### 6.7 ⚠️ SEVERITY_MAP usa apenas códigos de percepção (P codes)

A `SEVERITY_MAP` em `risk-profile/page.tsx` mapeia apenas códigos de percepção SERA (P-A a P-H) para níveis de severidade ISO. Códigos de objetivo (O codes) e ação (A codes) são ignorados para efeito de severidade.

O ARMS ERC não usa o sistema P/O/A do SERA para suas linhas — as linhas são definidas pelo desfecho de acidente potencial. A conexão P codes → severidade ISO é uma adaptação específica do HFA/SERA que precisa de validação metodológica com a referência Daumas (2018).

---

## 7. Limitações desta Revisão

1. Esta revisão é baseada no relatório ARMS WG 2010 — o padrão pode ter evoluído após essa data.
2. A referência primária **Daumas (2018)** não foi consultada — pode conter adaptações específicas ao contexto SERA que justifiquem desvios documentados aqui como problemas.
3. **Hendy (2003)** não foi consultado — pode influenciar a interpretação das precondições como inputs para a avaliação de risco.
4. Os exemplos ERC do relatório ARMS são todos de aviação comercial — o contexto HFA pode incluir outros segmentos com características diferentes.
5. Esta revisão não avaliou a calibração empírica da escala 1–5 do HFA — seria necessário comparar relatos reais com os ERC atribuídos para confirmar que eventos críticos recebem ERC 5.

---

## 8. Recomendações

| Prioridade | Ação | Tipo de mudança |
|---|---|---|
| **CRÍTICO** | Resolver F-001: adotar escala canônica ERC — ver `RISK_MATRIX_DUAL_MODEL_DECISION_v0.2.md` | Tipo 2 — Alinhamento com referência |
| **ALTO** | Documentar formalmente a adaptação 1–5 vs índice ARMS 1–2500 em `RISK_METHODOLOGY_GOVERNANCE_v0.1.md` | Documentação |
| **ALTO** | Resolver F-002: conectar `modal_erc_level` a dados reais (somente após F-001 resolvido) | Tipo 1 — Correção de bug |
| **MÉDIO** | Revisar linha D da lookup table: D1 e D2 deveriam retornar ERC 1 | Tipo 1 — Correção de bug |
| **MÉDIO** | Atualizar linguagem da UI no perfil org: "indicador de saúde estimado", não "barreira ARMS" | Operacional |
| **BAIXO** | Validar com Daumas (2018) o mapeamento P codes → severidade ISO | Tipo 2 — Alinhamento com referência |
| **BAIXO** | Avaliar se análise agregada organizacional deveria usar estrutura SIRA formal | Tipo 3 — Extensão metodológica |
