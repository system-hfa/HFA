# HFA/SERA — Learn Copy Diagnosis

**Data:** 2026-05-15
**Status:** Diagnóstico pré-Fase-3 — leitura apenas, sem alteração de arquivos.

---

## 1. Objetivo

Diagnosticar as páginas Learn/metodologia do produto antes de qualquer edição. Registrar estado atual, problemas metodológicos, excesso de aviação, densidade de texto e riscos de alteração.

Arquivos lidos neste diagnóstico:
- `frontend/src/app/(dashboard)/learn/page.tsx`
- `frontend/src/app/(dashboard)/learn/foundations/page.tsx`
- `frontend/src/app/(dashboard)/learn/perception/page.tsx`
- `frontend/src/app/(dashboard)/learn/objective/page.tsx`
- `frontend/src/app/(dashboard)/learn/action/page.tsx`
- `frontend/src/app/(dashboard)/learn/codes/page.tsx`
- `frontend/src/app/(dashboard)/learn/pipeline/page.tsx`

Observação: `learn/preconditions/page.tsx` não existe. O tópico é coberto brevemente em `pipeline/page.tsx`.

---

## 2. Estado Geral

| Arquivo | Função | Estado metodológico | Problema principal | Prioridade | Risco de alteração |
|---|---|---|---|---|---|
| `learn/page.tsx` | Índice do centro de aprendizado | OK | Usa "classificação automática" — framing errado | Média | Baixo |
| `learn/foundations/page.tsx` | Bases científicas (IP + PCT + HFACS) | OK com ressalvas | Lint errors; typo "Automabilidade"; "automatizado" | Alta | Alto — página longa e densa |
| `learn/perception/page.tsx` | Percepção P-A a P-H | Correto | Exemplos 100% aviação | Baixa | Baixo |
| `learn/objective/page.tsx` | Objetivo O-A a O-D | Correto após fix | Lint errors (unescaped `"` no JSX) | Alta (lint) | Baixo (conteúdo estável) |
| `learn/action/page.tsx` | Ação A-A a A-J | Problema de fluxo em A-C | Critério do nó n1b impreciso; A-C mal posicionado | Crítica | Médio — tocar no fluxo tem risco |
| `learn/codes/page.tsx` | Glossário de todos os 22 códigos | OK | Nenhum problema crítico identificado | Baixa | Baixo |
| `learn/pipeline/page.tsx` | Pipeline de 7 etapas | OK | "a IA gera recomendações" sem disclaimer | Baixa | Baixo |

---

## 3. Pontos Metodológicos Obrigatórios

### O-A — Objetivo operacional nominal, sem falha de intenção
- **objective/page.tsx:** ✅ Correto. Inclui restrição externa (prazo, ferramenta indisponível) como O-A. Box vermelho "O que NÃO é O-C" inclui "erro por desconhecimento → O-A".
- **codes/page.tsx:** ✅ "Sem falha de objetivo — Intenção correta e conservativa".
- **foundations/page.tsx:** ✅ Não menciona diretamente, mas integração de teorias é coerente.

### O-B — Violação rotineira/habitual/normalizada/tolerada
- **objective/page.tsx:** ✅ "comportamento recorrente, normalizado e tolerado pela cultura organizacional". Critério do fluxo menciona "habitual e normalizada".
- **foundations/page.tsx:** ✅ "estado perceptual buscado é normalizado e reforçado pela organização — o desvio é habitual e tolerado".

### O-C — Violação excepcional/circunstancial, sem exigir proteção humana
- **objective/page.tsx:** ✅ Correto após fix (Fase 2 anterior). "Violação excepcional/circunstancial — desvio consciente, pontual e não rotineiro. A motivação pode ser conveniência, improviso, pressão situacional ou proteção humana — proteção humana é um exemplo possível, não um requisito."
- **foundations/page.tsx (linha 379-383):** ✅ "Na excepcional, o operador desviou conscientemente de regra ou procedimento de forma pontual e não rotineira — não é seu comportamento habitual nem prática da equipe."
- **codes/page.tsx:** ✅ "Violação excepcional/circunstancial — Desvio consciente, pontual e não rotineiro".
- **page.tsx (landing):** ✅ Corrigido na Fase 2.
- Status geral: O-C está correto em todas as páginas lidas.

### O-D — Intenção não conservativa/eficiência/economia
- **objective/page.tsx:** ✅ "objetivo era formalmente consistente com as normas, mas o operador escolheu intencionalmente uma opção mais arriscada por eficiência, economia ou ganho operacional proativo".
- **codes/page.tsx:** ✅ "Intenção não conservativa — Escolha de opção mais arriscada".

### A-B — Omissão/deslize/lapso de passo físico/procedural
- **action/page.tsx:** ⚠️ **Parcialmente correto.** O glossário define corretamente: "Sabia o que fazer mas executou diferente involuntariamente." Mas o critério do nó n1b diz "A-B: deslize/lapso involuntário (percebeu o desvio)" — a condição "percebeu o desvio" é enganosa. A-B é classificado pelo tipo de erro (involuntário), não por consciência posterior do operador.
- **codes/page.tsx:** ✅ "Deslize/lapso/omissão — Erro involuntário de execução".

### A-C — Falha de verificação/confirmação do resultado da própria ação
- **action/page.tsx:** ⚠️ **Problema de fluxo.** O nó n1b posiciona A-C apenas quando "a ação não foi implementada como pretendida E o operador não percebeu". Mas a definição metodológica de A-C (confirmada no SERA_V0_1_1_FROZEN_SCOPE: "não verificação de parâmetro ou resultado da própria intervenção") indica que A-C pode ocorrer mesmo quando a ação FOI executada como planejada — o operador não verificou se o resultado/efeito foi o esperado.
- **codes/page.tsx:** "Feedback na execução — Sem confirmação durante execução" — ambíguo, não distingue claramente de A-G.
- **glossary action/page.tsx:** "Ação começou corretamente mas operador não percebeu que estava desviando" — descrição imprecisa para o conceito de A-C como verificação pós-intervenção.

### P-G — Falha de monitoramento/verificação quando informação estava disponível
- **perception/page.tsx:** ✅ "Info acessível e correta, mas operador não a buscou ou ignorou." Armadilha incluída: "P-G só se aplica quando a informação ESTAVA acessível e o operador não a buscou. Se não estava disponível — P-H."

### P-A — Sem falha perceptiva independente
- **perception/page.tsx:** ✅ "Percepção correta. A falha está em O ou A."

### Dados brutos são entrada válida
- **Nenhuma página Learn menciona isso.** O pipeline page fala em "relato bruto" na descrição do Passo 1, mas não como proposição de valor ao investigador. Esta lacuna é relevante para o investigador que chega ao Learn.

### Entrevista estruturada é complemento, não requisito
- **Não mencionado em nenhuma página Learn.** Esta é a posição metodológica correta definida no SERA_EVIDENCE_SUFFICIENCY.md mas está ausente do centro de aprendizado.

### Sistema apoia investigador, não substitui
- **pipeline/page.tsx:** Etapa 7 diz "a IA gera recomendações específicas e vinculadas a cada falha" — sem disclaimer de que são sugestões a revisar. Risco de framing substitutivo.
- **foundations/page.tsx:** Final da seção 5 diz "sistemas automatizados de análise de risco" — framing incorreto; deveria ser "assistido".

---

## 4. Problemas Encontrados

### Problema 1 — Lint errors: unescaped `"` em JSX
- **Páginas:** `learn/objective/page.tsx` (linhas 150, 158, 166, 174), `learn/foundations/page.tsx` (linhas 378-379)
- **Descrição:** Strings com `"` direto em JSX text nodes — devem ser `&quot;` ou `{'"'}`.
- **Por que é problema:** 12 erros de lint que falham a checagem. Bloqueia CI se lint for gate.
- **Severidade:** Alta (lint)
- **Correção:** Substituir `"texto"` por `&quot;texto&quot;` nas linhas afetadas.

### Problema 2 — A-C flow: critério do nó n1b impreciso
- **Página:** `learn/action/page.tsx` — nó `n1b`
- **Trecho:** `criterion: 'A-B: deslize/lapso involuntário (percebeu o desvio). A-C: falta de feedback na execução (não percebeu).'`
- **Por que é problema:** A-C metodologicamente é "falha de verificação do resultado/efeito da ação", não simplesmente "não percebeu o desvio durante a execução". Um operador pode executar exatamente como planejou, mas não verificar se o efeito produzido foi o correto — isso é A-C. A pergunta do nó n1b limita A-C ao caso de ação-não-como-pretendida, excluindo o caso mais comum de A-C: ação correta + resultado não verificado.
- **Severidade:** Crítica metodológica
- **Correção:** Reformular n1b para distinguir: se a ação desviou do planejado → A-B. Se a ação foi como planejada mas o resultado não foi verificado → A-C deve ser acessível também pela branch YES de n2.

### Problema 3 — A-C description no glossary
- **Página:** `learn/action/page.tsx` — glossary A-C
- **Trecho:** `when: 'Ação começou corretamente mas operador não percebeu que estava desviando.'`
- **Por que é problema:** "operador não percebeu que estava desviando" descreve A-B (slip detectado tarde), não A-C. A-C é falha de verificação do resultado da intervenção — o operador não checou se o efeito produzido foi o esperado.
- **Severidade:** Alta
- **Correção:** Reescrever: "Operador realizou a ação mas não verificou se o resultado/efeito produzido foi o esperado."

### Problema 4 — A-C description em results
- **Página:** `learn/action/page.tsx` — results `A-C`
- **Trecho:** `'A ação foi executada como planejada mas o operador não recebeu feedback confirmatório e não percebeu o desvio.'`
- **Por que é problema:** Contraditório com o fluxo — A-C é alcançado quando a ação NÃO foi como pretendida (n1 → NO → n1b → NO → A-C). A description diz "executada como planejada", o que é a situação oposta.
- **Severidade:** Alta
- **Correção:** Unificar a descrição com o fluxo. Ou: corrigir o fluxo para que A-C seja acessível em ambas as branches de n1 (como deveria ser metodologicamente).

### Problema 5 — "classificação automática" no índice
- **Página:** `learn/page.tsx` — linha 53
- **Trecho:** `"da teoria à classificação automática dos eventos"`
- **Por que é problema:** Framing substitutivo. O sistema é assistivo, não automático.
- **Severidade:** Média
- **Correção:** "da teoria à classificação assistida dos eventos" ou "da teoria ao diagnóstico assistido".

### Problema 6 — "aviação offshore" como único exemplo no guia de uso
- **Página:** `learn/page.tsx` — passo 2
- **Trecho:** `"Cada página explica os nós de decisão com exemplos reais da aviação offshore."`
- **Por que é problema:** Posiciona o produto como exclusivamente de aviação.
- **Severidade:** Média
- **Correção:** "com exemplos de operações de alto risco".

### Problema 7 — Typo "Automabilidade"
- **Página:** `learn/foundations/page.tsx` — linha 520
- **Trecho:** `'2. Automabilidade'`
- **Por que é problema:** Palavra inexistente em português. Provavelmente "Automação" ou "Automatizabilidade".
- **Severidade:** Média (qualidade)
- **Correção:** Substituir por "Automatização" ou "Aplicação em sistemas automatizados".

### Problema 8 — "sistemas automatizados" em foundations
- **Página:** `learn/foundations/page.tsx` — linha 525
- **Trecho:** `"fundamental para sistemas automatizados de análise de risco"`
- **Por que é problema:** Framing substitutivo — o sistema usa IA como suporte, não substituto.
- **Severidade:** Média
- **Correção:** "sistemas assistidos de análise de risco com IA".

### Problema 9 — Ausência de disclaimer em pipeline/recomendações
- **Página:** `learn/pipeline/page.tsx` — etapa 7
- **Trecho:** `"a IA gera recomendações específicas e vinculadas a cada falha identificada"`
- **Por que é problema:** Sem indicação de que são sugestões a revisar, não decisões finais.
- **Severidade:** Baixa
- **Correção:** Adicionar: "com apoio de IA — devem ser revisadas pelo investigador".

### Problema 10 — Ausência de informação sobre dados brutos e entrevista estruturada
- **Páginas:** Todas as Learn
- **Descrição:** Nenhuma página menciona que dados brutos (relato incompleto, narrativa parcial) são entrada válida, nem que entrevista estruturada é complemento — não pré-requisito.
- **Por que é problema:** Investigadores podem entender erroneamente que o sistema exige relatório estruturado ou entrevista formal para funcionar.
- **Severidade:** Média
- **Correção sugerida:** Adicionar nota ao pipeline/page.tsx na introdução.

---

## 5. Excesso de Aviação

As páginas abaixo têm exemplos exclusiva ou majoritariamente de aviação e poderiam receber exemplos multi-indústria:

| Página | Exemplos atuais | Sugestão |
|---|---|---|
| `learn/page.tsx` | "aviação offshore" explícito no guia de uso | "operações de alto risco" |
| `learn/perception/page.tsx` | 8 exemplos, todos pilotos/aeronaves | Adicionar 2-3 exemplos de saúde/industrial |
| `learn/objective/page.tsx` | Glossary e exemplos: todos pilotos/voos | Manter aviação como primário, adicionar 1 por código |
| `learn/action/page.tsx` | 10 exemplos: 9 pilotos, 1 "operador" genérico | Adicionar exemplos de saúde (médico, enfermeiro) e industrial |
| `learn/foundations/page.tsx` | Exemplos IP: pilotos, controladores, médicos em PS | ✅ Já inclui médicos — bom exemplo de multi-setor |
| `learn/pipeline/page.tsx` | "Relato bruto" genérico | ✅ Neutro — OK |
| `learn/codes/page.tsx` | Glossário puro, sem exemplos | ✅ OK |

---

## 6. Risco de Texto Longo Demais

| Página | Densidade | Observação |
|---|---|---|
| `learn/foundations/page.tsx` | **Alta** | 5 seções, tabela comparativa, SVG, 10 rows de comparação. Qualquer adição deve compensar com remoção. |
| `learn/objective/page.tsx` | **Média-alta** | 4 cards de distinção + glossário + fluxo. Adição de exemplos multi-indústria deve ser pontual. |
| `learn/action/page.tsx` | **Alta** | 10 códigos + fluxo complexo de 9 nós + 10 glossary entries. Correção de A-C deve ser cirúrgica. |
| `learn/perception/page.tsx` | **Média** | 8 códigos + fluxo + armadilhas. Espaço para 1-2 exemplos adicionais por código. |
| `learn/pipeline/page.tsx` | **Baixa** | Texto conciso, acordeão interativo. Fácil de editar. |
| `learn/page.tsx` | **Baixa** | Apenas cards de navegação. Fácil. |
| `learn/codes/page.tsx` | **Baixa** | Tabela pura. Fácil. |

---

## 7. Plano de Implementação Fase 3

### Fase 3A — Correções críticas metodológicas (alta prioridade, bloqueia qualidade)

1. **Lint errors** — `objective/page.tsx` (8 errors) e `foundations/page.tsx` (4 errors): substituir `"texto"` por `&quot;texto&quot;` nas linhas afetadas. Não altera conteúdo visível.
2. **A-C flow e description** — `action/page.tsx`: corrigir critério do nó n1b, description nos results e glossary. Definir A-C como "falha de verificação do resultado da própria ação/intervenção".
3. **Typo "Automabilidade"** — `foundations/page.tsx`: palavra inexistente.
4. **"sistemas automatizados"** → "assistidos" — `foundations/page.tsx`.

### Fase 3B — Exemplos multi-indústria (média prioridade)

5. **`learn/page.tsx`**: "aviação offshore" → "operações de alto risco".
6. **`learn/perception/page.tsx`**: adicionar 1-2 exemplos de saúde ou industrial por código P.
7. **`learn/action/page.tsx`**: adicionar 1 exemplo de saúde por código A (cirúrgico, procedimento hospitalar).
8. **`learn/objective/page.tsx`**: adicionar 1 exemplo não-aviação por código O.

### Fase 3C — Clareza e UX (baixa prioridade)

9. **`learn/page.tsx`**: "classificação automática" → "classificação assistida".
10. **`learn/pipeline/page.tsx`**: etapa 7 — adicionar disclaimer de revisão do investigador.
11. **`learn/pipeline/page.tsx`**: adicionar nota sobre dados brutos e entrevista estruturada como complemento.
12. **`learn/action/page.tsx`**: revisar exemplo de A-C para refletir corretamente o conceito pós-fix.

### Fase 3D — Revisão final (após 3A-3C)

13. Verificar coerência cruzada entre fluxo, glossário e results em action/page.tsx.
14. Verificar lint completo pós-edições.
15. Verificar build.

---

## 8. Arquivos Recomendados para Alteração

| Arquivo | Prioridade | Tipo de alteração | Risco | Alterar agora? |
|---|---|---|---|---|
| `learn/objective/page.tsx` | Alta | Lint fix (unescaped `"`) — texto não muda | Baixo | ✅ Sim — Fase 3A |
| `learn/foundations/page.tsx` | Alta | Lint fix + typo + 1 palavra | Médio — página densa | ✅ Sim — Fase 3A |
| `learn/action/page.tsx` | Crítica | Correção de fluxo A-C + descriptions | Médio — tocar no fluxo | ✅ Sim — Fase 3A, mas com cuidado |
| `learn/page.tsx` | Média | 2 frases | Baixo | ✅ Sim — Fase 3C |
| `learn/pipeline/page.tsx` | Baixa | 1 frase + nota | Baixo | Pode aguardar |
| `learn/perception/page.tsx` | Baixa | Exemplos multi-indústria | Baixo | Pode aguardar Fase 3B |
| `learn/codes/page.tsx` | Nenhuma | Nenhum problema crítico | — | Não alterar |

---

## 9. Recomendação Final

**A Fase 3 deve ser feita em dois subpacotes:**

**Subpacote 3A — Qualidade técnica e metodologia (executar primeiro):**
Corrigir os 12 erros de lint (foundations + objective), o typo em foundations, o framing "automatizado" em foundations, e o problema crítico de A-C em action/page.tsx. Esses itens são independentes entre si, têm baixo risco de regressão metodológica, e bloqueiam CI.

**Subpacote 3B — Multi-indústria e UX (executar depois):**
Exemplos multi-indústria em perception, action, objective e page.tsx. Nota sobre dados brutos em pipeline. Disclaimer em pipeline/recomendações. Esses itens têm mais texto e exigem que os exemplos sejam revistos pelo autor para consistência operacional.

**Razão para separar:** O subpacote 3A pode ser commitado imediatamente após validação técnica. O 3B pode ser preparado para revisão humana antes do commit — os exemplos de saúde e industrial precisam de validação do investigador para garantir precisão operacional.

**Não fazer em pacote único:** A tentação de corrigir tudo de uma vez é real, mas o action/page.tsx requer atenção particular ao fluxo. Misturar correção de fluxo com adição de exemplos de outros setores aumenta o risco de introduzir inconsistência.

---

**Arquivos lidos neste diagnóstico (7):**
- `frontend/src/app/(dashboard)/learn/page.tsx`
- `frontend/src/app/(dashboard)/learn/foundations/page.tsx`
- `frontend/src/app/(dashboard)/learn/perception/page.tsx`
- `frontend/src/app/(dashboard)/learn/objective/page.tsx`
- `frontend/src/app/(dashboard)/learn/action/page.tsx`
- `frontend/src/app/(dashboard)/learn/codes/page.tsx`
- `frontend/src/app/(dashboard)/learn/pipeline/page.tsx`

**Página não encontrada (1):**
- `frontend/src/app/(dashboard)/learn/preconditions/page.tsx` — não existe. Pré-condições são cobertas brevemente em pipeline/page.tsx.
