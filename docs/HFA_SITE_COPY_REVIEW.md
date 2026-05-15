# HFA/SERA — Site Copy Review

**Data:** 2026-05-14
**Status:** Diagnóstico estratégico — nenhum arquivo de código foi alterado.

---

## 1. Diagnóstico geral

O site e o produto comunicam bem a base científica e a proposta metodológica do SERA. A landing page transmite credibilidade, menciona a separação percepção/objetivo/ação, posiciona a ferramenta como gratuita e referencia DRDC Canada. Os pontos críticos estão na precisão metodológica de algumas páginas do Learn, nos exemplos fortemente aeronáuticos do formulário de nova análise e na ausência de comunicação explícita sobre suficiência de evidência e entrada de dados brutos.

| Área | Estado | Prioridade de revisão |
|---|---|---|
| Landing page (`page.tsx`) | Boa comunicação geral; falta seção de "que dados posso enviar" e suficiência | Alta |
| Formulário de nova análise (`events/new`) | Fortemente aeronáutico nos campos e placeholders; falta instrução sobre dados incompletos | Alta |
| Learn — Objetivo (`learn/objective`) | **Erro metodológico crítico:** O-C definido como "episódio isolado/circunstancial", não como "objetivo protetivo humano explícito" | Crítico |
| Learn — Fundamentos (`learn/foundations`) | A revisar para consistência com definição atual de O-C e A-C | Alta |
| Learn — Códigos (`learn/codes`) | A revisar para consistência com O-C corrigido | Média |
| Dashboard (`dashboard`) | Linguagem de análise correta; exemplos internos ainda aeronáuticos | Média |
| Learn — Percepção/Ação/Pipeline | Comunicação razoável; oportunidade de exemplos multi-indústria | Baixa |
| Créditos/Billing | Comunicação funcional; sem problema metodológico | Baixa |

---

## 2. Pontos fortes atuais

A landing page já comunica corretamente:

- **Base científica:** referência explícita a K.C. Hendy (DRDC Canada), F.P. Daumas (mestrado UFF) e linha metodológica.
- **SERA como metodologia estruturada:** apresentada com separação clara das etapas.
- **Separação percepção/objetivo/ação:** cards P/O/A presentes no hero.
- **Análise auditável e logicamente consistente:** mencionado explicitamente na subheadline.
- **Uso gratuito:** badge "Ferramenta gratuita" e CTA "Acessar plataforma grátis".
- **Não substituição do investigador:** a narrativa posiciona o sistema como assistivo.
- **Aceitação de PDF e texto:** o formulário de nova análise já oferece upload PDF/DOCX e digitação de texto.
- **Aplicabilidade multi-setor:** landing menciona aviação, óleo e gás e indústria.
- **Referências acadêmicas:** seção de referências presente e extensa.

---

## 3. Problemas de comunicação atuais

### 3.1 Concentração excessiva em aviação/offshore

O formulário de nova análise tem campo "Aeronave" (em vez de "Equipamento" ou campo agnóstico), placeholder "Ex: Voo offshore", placeholder "Ex: Sikorsky S-76" e placeholder "Ex: Aproximação em IMC — Plataforma Albacora". Um investigador de saúde, indústria ou manutenção encontra um formulário que parece feito exclusivamente para pilotos de helicóptero. Isso contradiz a proposta multi-indústria.

### 3.2 O-C definido com a definição metodologicamente incorreta

**Este é o problema mais grave.** Em `learn/objective/page.tsx`:

- O nó 3 do fluxo de decisão usa o critério: `"O-C: episódio isolado, circunstancial."` — errado.
- O resultado O-C diz: "O operador violou normas em circunstâncias específicas e incomuns — não é seu comportamento habitual." — errado.
- O glossário de O-C diz: "Operador geralmente cumpre as normas mas neste caso específico fez uma exceção." — errado.
- A seção de distinção crítica diz: "O-C: episódio isolado, geralmente motivado por uma circunstância específica (pressão pontual, surpresa, distração)." — errado.

**A definição correta:** O-C exige que o operador tenha desviado conscientemente de um protocolo *conhecido*, motivado por proteger uma pessoa de risco imediato. Circunstância excepcional isolada sem intenção protetiva explícita permanece O-A.

### 3.3 "Automatizada" pode soar como substituição do investigador

A subheadline do formulário diz: "Insira o relato do evento para análise automatizada." A palavra "automatizada" sem qualificação pode criar a expectativa de que a análise dispensa julgamento humano — contrário à filosofia assistiva do SERA.

### 3.4 "Quanto mais detalhado, mais precisa" — verdadeiro mas incompleto

O helper text do campo de relato diz: "Quanto mais detalhado o relato, mais precisa será a análise." Está correto, mas cria a impressão de que relatos incompletos não podem ser analisados. A instrução deveria acrescentar que relatos incompletos são aceitos e o sistema sinaliza lacunas.

### 3.5 Ausência de seção "Que dados posso enviar"

Nem a landing nem o formulário de nova análise explicam explicitamente os tipos de entrada aceitos: relatórios antigos, PDFs, DOCX, textos colados, transcrições, narrativas, documentos heterogêneos. Isso cria atrito para investigadores que não sabem se podem usar o que já têm.

### 3.6 Ausência de seção sobre suficiência de evidência

O produto não comunica o que acontece quando a evidência é insuficiente. O investigador não sabe que o sistema pode sinalizar lacunas, gerar perguntas complementares ou classificar parcialmente. Isso cria expectativa errada: ou funciona perfeitamente ou não funciona.

### 3.7 Entrevista estruturada não posicionada como complemento

O produto não deixa claro que a entrevista estruturada é condição ideal, mas não requisito. Investigadores com documentação bruta podem acreditar que precisam de entrevista para usar a ferramenta.

---

## 4. Correções conceituais obrigatórias

As seguintes correções devem ser refletidas nos textos do site e do produto:

| Código/Conceito | Texto atual (errado) | Texto correto |
|---|---|---|
| **O-C** | "episódio isolado, circunstancial" / "exceção à regra habitual" | Desvio consciente de protocolo *conhecido*, motivado por proteger uma pessoa de risco imediato. Exige proteção humana explícita. |
| **O-A** | Apenas "tentando fazer a coisa certa" | Inclui tarefa nominal sob restrição externa (prazo, ferramenta indisponível) se não houver objetivo desviante explícito. |
| **O-D** | Implicitamente ligado a pressão de prazo | Eficiência/economia/ganho operacional proativo. Não é simples pressão de prazo sem escolha consciente de risco. |
| **A-C** | Referência genérica a feedback | Falha de verificação/feedback da própria ação, incluindo não confirmar parâmetros pós-intervenção. |
| **Discriminators** | Não mencionados na UI | São documentação metodológica interna; não são campos preenchidos pelo investigador. |
| **Dados brutos** | "relato completo" implica completude | Entrada bruta, desorganizada, fragmentada é válida e processada. |
| **Entrevista estruturada** | Ausente no produto | Camada complementar ideal, não requisito para análise inicial. |

---

## 5. Mensagem-mãe recomendada

> "O HFA/SERA transforma relatos operacionais brutos em análises estruturadas de fatores humanos, separando percepção, objetivo e ação, com rastreabilidade metodológica e revisão humana."

Esta mensagem deve orientar o tom de todos os textos do produto: ela comunica entrada bruta, saída estruturada, metodologia científica e papel assistivo — sem prometer automação total ou exigir preparação prévia do investigador.

---

## 6. Propostas de nova headline para a landing

1. **"Análise de fatores humanos a partir do relato que você já tem."**
2. **"Transforme qualquer relato operacional em análise estruturada de fatores humanos."**
3. **"Investigação de fatores humanos com metodologia científica. Sem formulário perfeito."**
4. **"A metodologia SERA para qualquer relato — bruto, incompleto ou desorganizado."**
5. **"Classifique percepção, objetivo e ação a partir do que o investigador já coletou."**

---

## 7. Propostas de nova subheadline para a landing

1. **"Envie relatórios, PDFs, transcrições ou texto bruto. O sistema organiza a evidência, classifica os fatores humanos e aponta as lacunas — você mantém o julgamento."**
2. **"A metodologia SERA transforma narrativas operacionais em análise auditável, separando percepção, objetivo e ação, mesmo quando o relato é incompleto."**
3. **"Não é necessária entrevista estruturada. Não é necessário reformatar seus dados. Envie o que você tem — o sistema extrai estrutura onde há evidência e sinaliza onde falta."**
4. **"Uma análise de fatores humanos rigorosa e rastreável a partir de qualquer entrada: relatórios antigos, PDFs, relatos livres, transcrições ou documentos de investigação."**
5. **"O HFA/SERA separa percepção, objetivo e ação com gates metodológicos determinísticos. O investigador revisa e decide. O sistema nunca inventa base onde não há evidência."**

---

## 8. Seção sugerida: "Que dados posso enviar"

> **Texto pronto para o site:**
>
> ### Que dados posso enviar?
>
> O HFA/SERA foi desenvolvido para funcionar com o material que o investigador já tem — não com dados preparados especialmente para a ferramenta.
>
> Você pode enviar:
>
> - **Relatório antigo** — documentos de investigação já existentes, mesmo que não sigam a estrutura SERA
> - **Relato livre** — narrativa escrita pelo investigador, sem formato específico
> - **PDF** — relatório digitalizado, laudo, documento técnico ou ficha de ocorrência
> - **DOCX** — documento Word de investigação, transcrição ou relatório operacional
> - **Transcrição** — gravação convertida em texto, entrevista não estruturada, depoimento
> - **Narrativa operacional** — descrição escrita por quem participou do evento
> - **Dados incompletos ou fragmentados** — evidências parciais são aceitas; o sistema sinaliza as lacunas e sugere perguntas complementares
> - **Múltiplos documentos** — combine fontes heterogêneas em uma única análise
> - **Entrevista estruturada** — quando disponível, melhora a completude e a rastreabilidade da análise
>
> O sistema extrai estrutura de onde há evidência. Onde a evidência é insuficiente, sinaliza a lacuna e sugere o que perguntar.

---

## 9. Seção sugerida: "O que o sistema entrega"

> **Texto pronto para o site:**
>
> ### O que o sistema entrega
>
> A partir do relato enviado, o HFA/SERA produz uma análise estruturada com:
>
> - **Resumo do evento** — extração dos fatos essenciais do relato
> - **Ponto de fuga** — identificação do momento crítico onde a sequência de erro se instalou
> - **Classificação SERA** — código de percepção (P), objetivo (O) e ação (A) com justificativa textual
> - **Hipóteses descartadas** — alternativas de classificação consideradas e por que foram rejeitadas
> - **Pré-condições** — fatores organizacionais, humanos e ambientais que contribuíram para o evento
> - **ERC (Nível de Recuperabilidade)** — avaliação da gravidade e da capacidade de recuperação
> - **Recomendações** — ações preventivas ou corretivas derivadas da análise
> - **Relatório auditável** — rastreabilidade entre evidência textual e classificação; o investigador vê o que sustenta cada código
> - **Dashboard de padrões** — visão agregada de eventos anteriores para identificar tendências organizacionais
>
> A classificação é assistiva. O investigador mantém o julgamento final e pode revisar qualquer parte da análise.

---

## 10. Seção sugerida: "Quando a evidência é insuficiente"

> **Texto pronto para o site:**
>
> ### Quando a evidência é insuficiente
>
> Nem todo relato contém evidência suficiente para classificar todos os eixos com segurança. O HFA/SERA não inventa base onde ela não existe.
>
> Quando a evidência é insuficiente ou ambígua, o sistema:
>
> - **Sinaliza as lacunas** — indica quais eixos não puderam ser classificados com confiança
> - **Classifica parcialmente** — os eixos com evidência suficiente são classificados; os demais ficam em aberto
> - **Gera perguntas complementares** — sugere ao investigador o que perguntar para fechar a lacuna
> - **Marca baixa confiança** — quando duas interpretações são igualmente plausíveis, o sistema indica a ambiguidade em vez de escolher arbitrariamente
>
> A revisão humana permanece necessária em todos os casos. A análise do sistema é um ponto de partida metodológico — não uma conclusão final.

---

## 11. Seção sugerida: "Entrevista estruturada"

> **Texto pronto para o site:**
>
> ### Entrevista estruturada
>
> A entrevista estruturada é o cenário ideal de coleta de evidência. Quando o investigador tem acesso direto aos envolvidos no evento, ela:
>
> - Melhora a completude e a rastreabilidade das evidências
> - Reduz ambiguidades na classificação
> - Permite fechar lacunas que o relato bruto não cobre
> - Aumenta a reprodutibilidade e a auditabilidade da análise
>
> Mas a entrevista **não é requisito** para usar o HFA/SERA. O sistema analisa qualquer dado disponível. Quando a entrevista não foi realizada e o relato tem lacunas, o sistema sugere quais perguntas deveriam ser feitas — servindo como roteiro para uma entrevista futura, se o investigador quiser aprofundar a coleta.

---

## 12. Seção sugerida: "Setores de aplicação"

> **Texto pronto para o site:**
>
> ### Onde o HFA/SERA pode ser aplicado
>
> O núcleo metodológico do SERA é transversal a operações críticas. Desenvolvido originalmente para aviação offshore, ele se aplica a qualquer setor onde fatores humanos contribuem para incidentes e acidentes operacionais.
>
> | Setor | Aplicação |
> |---|---|
> | **Aviação** | Domínio primário de desenvolvimento — incidentes, acidentes, relatos operacionais |
> | **Óleo e gás / offshore** | Operações em ambiente crítico de alto risco, helicópteros, plataformas |
> | **Manutenção industrial** | Falhas em processos, erros de procedimento, omissões em checklist |
> | **Energia** | Operações de risco elevado em plantas elétricas, nucleares e de processo |
> | **Saúde** | Eventos adversos hospitalares, erros de medicação, falhas cirúrgicas |
> | **Transporte** | Operações de bordo, terrestres, portuárias e logísticas |
> | **Mineração** | Acidentes em campo, subterrâneo e transporte de material |
> | **Processos industriais** | Segurança de processo, falhas de equipamento, desvios de protocolo |
>
> A calibração de vocabulário e exemplos por setor pode ser ajustada sem alterar o núcleo metodológico.

---

## 13. Arquivos que devem ser alterados na próxima etapa

| Arquivo | Prioridade | Tipo de alteração | Risco | Teste visual | Teste SERA |
|---|---|---|---|---|---|
| `frontend/src/app/(dashboard)/learn/objective/page.tsx` | **Crítico** | Corrigir definição de O-C de "episódio isolado/circunstancial" para "objetivo protetivo humano explícito"; corrigir fluxo de decisão, glossário e seção de distinção crítica | Médio — texto; não altera comportamento do pipeline | Sim (verificar renderização do fluxo de decisão) | Não |
| `frontend/src/app/page.tsx` | **Alta** | Adicionar seção "Que dados posso enviar", seção de suficiência, ampliar exemplos multi-indústria; revisar headline/subheadline | Baixo — página estática | Sim (landing completa) | Não |
| `frontend/src/app/(dashboard)/events/new/page.tsx` | **Alta** | Tornar campos agnósticos de setor (renomear "Aeronave" → "Equipamento/aeronave", corrigir placeholders de título e operação); atualizar helper text do campo de relato; substituir "análise automatizada" por "análise assistida" | Baixo — apenas texto e placeholder | Sim (formulário de criação) | Não |
| `frontend/src/app/(dashboard)/learn/foundations/page.tsx` | **Alta** | Verificar e corrigir qualquer menção a O-C que use a definição antiga; verificar A-C pós-intervenção | Baixo — texto | Sim (página learn) | Não |
| `frontend/src/app/(dashboard)/learn/codes/page.tsx` | **Média** | Atualizar descrição de O-C; verificar A-C; verificar O-D | Baixo — texto | Sim (tabela de códigos) | Não |
| `frontend/src/app/(dashboard)/dashboard/page.tsx` | **Média** | Verificar labels de O-C no painel de resultado; garantir exemplos não exclusivamente aeronáuticos | Baixo — labels | Sim (dashboard) | Não |
| `frontend/src/app/(dashboard)/learn/perception/page.tsx` | **Baixa** | Oportunidade de exemplos multi-indústria; sem erro metodológico crítico identificado | Baixo | Sim | Não |
| `frontend/src/app/(dashboard)/learn/action/page.tsx` | **Baixa** | Oportunidade de ampliar descrição de A-C pós-intervenção | Baixo | Sim | Não |
| `frontend/src/app/(dashboard)/learn/pipeline/page.tsx` | **Baixa** | Verificar se pipeline está descrito como assistivo; sem erro crítico esperado | Baixo | Sim | Não |

**Nenhuma alteração exige teste SERA.** Todas as mudanças são textuais — não tocam no motor, nos gates, nas fixtures nem no baseline.

---

## 14. Plano de implementação em fases

### Fase 1 — Landing e formulário de nova análise

**Arquivos:** `page.tsx`, `events/new/page.tsx`
**Objetivo:** Corrigir a experiência do primeiro contato e do ponto de entrada da análise.
**Mudanças:**
- Nova headline e subheadline na landing.
- Adicionar seção "Que dados posso enviar".
- Adicionar seção "Quando a evidência é insuficiente" (versão resumida).
- Adicionar seção "Entrevista estruturada" (versão curta).
- Ampliar seção de setores de aplicação.
- Tornar campos do formulário agnósticos de setor.
- Corrigir helper text do campo de relato.
- Substituir "análise automatizada" por "análise assistida".

### Fase 2 — Páginas Learn com desalinhamento metodológico

**Arquivos:** `learn/objective/page.tsx`, `learn/foundations/page.tsx`, `learn/codes/page.tsx`
**Objetivo:** Eliminar definição errada de O-C e alinhar todo o conteúdo metodológico com o estado atual do pipeline.
**Mudanças:**
- Corrigir definição de O-C em todos os locais onde aparece.
- Atualizar fluxo de decisão da Etapa 4.
- Corrigir critério de distinção O-B vs O-C.
- Verificar e atualizar A-C nos fundamentos.
- Verificar e atualizar O-D nos códigos.

### Fase 3 — Dashboard e exemplos multi-indústria

**Arquivos:** `dashboard/page.tsx`, `learn/perception/page.tsx`, `learn/action/page.tsx`
**Objetivo:** Reduzir concentração aeronáutica nos exemplos internos e garantir consistência visual com a proposta multi-indústria.
**Mudanças:**
- Verificar labels de O-C no painel de resultado.
- Substituir exemplos exclusivamente aeronáuticos por exemplos multi-setor.
- Adicionar exemplos de saúde, indústria ou manutenção onde couber.

### Fase 4 — Entrevista, suficiência e fluxo complementar

**Arquivos:** `learn/pipeline/page.tsx`, componentes de entrevista e suficiência
**Objetivo:** Posicionar a entrevista estruturada como camada complementar e comunicar o comportamento do sistema quando a evidência é insuficiente.
**Mudanças:**
- Criar ou atualizar seção de entrevista estruturada no produto.
- Comunicar suficiência parcial e perguntas complementares no fluxo do investigador.
- Atualizar pipeline page para refletir comportamento de suficiência.

---

## 15. Recomendações de tom

O tom do HFA/SERA deve ser:

| Dimensão | Diretriz |
|---|---|
| **Clareza** | Frases diretas, sem jargão excessivo; investigadores de diferentes setores devem entender |
| **Técnico mas acessível** | Usar terminologia SERA onde necessário, mas sempre explicar o que significa na prática |
| **Honesto sobre incerteza** | Quando o sistema não sabe, diz que não sabe; nunca forçar classificação sem base |
| **Assistivo, não substitutivo** | O investigador decide; o sistema organiza, classifica e apresenta opções |
| **Multi-indústria** | Exemplos e linguagem não devem presumir que o leitor é piloto de helicóptero |
| **Auditável** | Comunicar que toda classificação tem rastreabilidade textual; o investigador pode ver a base |
| **Sem promessa de automação total** | Evitar "automático", "imediato", "perfeito"; preferir "assistido", "estruturado", "rastreável" |
| **Científico sem ser acadêmico** | Base em DRDC Canada e pesquisa validada, sem trecho de paper no corpo do produto |
| **Gratuito e acessível** | A gratuidade é um diferencial; deve estar presente, mas não ser o único argumento |
