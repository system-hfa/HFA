# SERA Bilingual Terminology and Translation Lock A4R188 v0.2.0

status: ACTIVE_TERMINOLOGY_LOCK
phase: A4R188-LANGLOCK
sourceAudit: A4R188-PREFLIGHT-FIX
DOCS_ONLY
NO_EVENT_ANALYSIS
NO_AXIS_DECISION
NO_RUNTIME_CHANGE
locks: NOT_FINAL_CLASSIFICATION | NOT_POA_CLOSURE | NOT_SELECTED_CODE | NOT_FIXTURE | NOT_BASELINE | NOT_DOWNSTREAM

---

## 1. Declaração de uso controlado de linguagem

### 1.1 Línguas permitidas

O projeto SERA vNext pode usar Português (PT) e Inglês (EN) nos mesmos documentos. Ambas as línguas são permitidas, mas sujeitas ao vocabulário controlado definido neste documento e no glossário `SERA_BILINGUAL_TERMINOLOGY_GLOSSARY_A4R188_v0.2.0.csv`.

### 1.2 Hierarquia terminológica

1. **Tokens/campos técnicos formais** (ex.: `nodeId`, `authorDecision`, `selectedCodeAllowed`, `poaClosureAllowed`) — permanecem em inglês técnico, pois são identificadores estáveis de campos em CSVs, documentos e sistemas.
2. **Conceitos metodológicos** — têm um termo PT canônico e, quando aplicável, um anchor EN de referência (ver glossário). Texto explicativo usa o termo PT canônico.
3. **Texto explicativo** — deve evitar literais técnicos sensíveis quando esses não forem campos formais. Exemplo: usar "código selecionado" em prosa, não "selectedCode".
4. **Perguntas canônicas da árvore** — os campos `exactQuestionTextPt` e `exactQuestionTextEn` da A4R99 são intocáveis. Não podem ser reescritos, parafraseados, resumidos ou substituídos livremente.

### 1.3 Regra sobre literais sensíveis em prosa

Em texto explicativo (não em blocos de código, não em tabelas de campos formais), os seguintes literais técnicos sensíveis devem ser substituídos por sua forma PT canônica:

| Literal sensível em prosa | Forma PT canônica permitida |
|---|---|
| selectedCode (em prosa) | código selecionado |
| releasedCode (em prosa) | código liberado |
| authorDecision (em prosa) | decisão autoral |
| leafCode (em prosa) | código folha |
| branchCondition (em prosa) | condição de ramificação |

Os campos formais (`selectedCodeAllowed=false`, `authorDecision=PENDING_AUTHOR_DECISION`, etc.) devem ser preservados exatamente como aparecem nas linhas de dados.

---

## 2. Seção especial — Hendy GOAL → SERA Objetivo (eixo O)

### 2.1 Origem terminológica

Em Hendy (2003), o eixo chamado **GOAL** corresponde ao constructo de intenção/objetivo do operador no modelo IP (Information Processing) / PCT (Perceptual Control Theory). A pergunta raiz do eixo é: "What was the operator or crewmember trying to achieve — what was the intent or goal(s) that led to the unsafe act?"

### 2.2 Operacionalização no SERA

No SERA conforme implementado neste projeto, o eixo **GOAL** de Hendy é operacionalizado como eixo **O — Objetivo**:
- `O_ROOT` → `O_RULES` → (`O_MANAGED_RISK` | `O_ROUTINE`)
- Leaf codes: O-A, O-B, O-C, O-D

O termo PT canônico é **Objetivo**. O anchor EN é **Goal (Hendy)**.

### 2.3 Restrições de uso

O termo **Objetivo** (SERA / eixo O) **não significa**:
- Meta estratégica de organização ou empresa
- Objetivo de desempenho ou produtividade
- Intenção pós-evento ("o que o tripulante queria ter feito")
- Desfecho desejado retrospectivamente

O Objetivo no SERA é sempre:
- **Do operador ou da tripulação**
- **No momento do ponto de fuga** (departure from safe operation)
- **A intenção que levou ao ato inseguro**

### 2.4 Proibição de expansão semântica

É proibido usar "Objetivo" em sentido organizacional ou estratégico ao redigir rationale de eixo O. Se o texto de rationale descreve "o objetivo da empresa" ou "o objetivo do voo como meta de eficiência", esse rationale está usando o termo fora do escopo metodológico e deve ser reescrito.

---

## 3. Seção especial — departure from safe operation → ponto de fuga da operação segura

### 3.1 Definição canônica

**Ponto de fuga da operação segura** (PT) / **departure from safe operation** (EN — Hendy) é o momento ou instante em que a trajetória da operação cruzou pela primeira vez da zona segura para a zona insegura, a partir da perspectiva de ação ou inação do operador.

### 3.2 Função metodológica

O ponto de fuga é:
- A **âncora temporal** da análise P/O/A: tudo que é analisado como causa pertence ao momento do ponto de fuga ou a um período imediatamente anterior
- A **âncora causal** da análise: somente o que contribuiu para a travessia da fronteira segura→insegura pode ser classificado como falha P/O/A

### 3.3 Proibições relativas ao ponto de fuga

**É proibido** usar como âncora causal para P, O ou A:
- Consequências posteriores ao ponto de fuga (ex.: impacto, flameout, incêndio, evacuação)
- Estado do sistema depois que a trajetória insegura já estava estabelecida
- Falhas de recuperação (o operador não recuperou → isso não é a causa, é consequência da causa)

**É proibido** criar mais de um ponto de fuga para o mesmo evento sem uma fase específica de revisão autoral que o justifique. O ponto de fuga é único por evento no escopo atual (A4R182).

### 3.4 Escopos aprovados em A4R182

Os 5 pontos de fuga aprovados para BATCH_A estão em `SERA_REAL_EVENT_AUTHOR_DECISION_MATRIX_A4R182_v0.2.0.csv`. Não alterar esses escopos sem fase explícita de revisão.

---

## 4. Regra sobre perguntas canônicas (exactQuestionTextPt / exactQuestionTextEn)

O campo `exactQuestionTextPt` e o campo `exactQuestionTextEn` em A4R99 são os textos canônicos intocáveis das perguntas da árvore SERA. Para usar qualquer node em decisão de eixo:

1. Copiar o texto LITERALMENTE do A4R99 — sem paráfrase, resumo ou adaptação
2. Não criar "versões simplificadas" para facilitar a análise
3. Não usar o texto de uma pergunta para outro node
4. Não inventar pergunta análoga sem node correspondente em A4R99

Se o exactQuestionText parecer inadequado para o caso analisado, isso deve ser registrado como AXIS_TRAVERSAL_BLOCKED ou escalado para revisão — nunca resolvido com paráfrase.

---

## 5. Regra sobre A4R184-Q (quarentena preservada)

O pacote A4R184 contém "perguntas por eixo" case-specific (P-1, P-2, O-1, A-1 etc.) que foram criadas como auxiliares de orientação e não como traversal canônica da árvore SERA. Esse pacote está em **quarentena permanente** (QUARANTINE_ACTIVE) com `AXIS_DECISION_ALLOWED=false`.

As perguntas de A4R184-Q **não podem ser usadas**:
- Como texto de pergunta em qualquer node de decisão
- Como substituto de exactQuestionTextPt/exactQuestionTextEn
- Como âncora de rationale
- Como referência terminológica para Objetivo, Percepção ou Ação

---

## 6. Relação com documentos da fase

Este lock deve ser lido antes da fase A4R188 decisória. O autor deve:
1. Usar o glossário `SERA_BILINGUAL_TERMINOLOGY_GLOSSARY_A4R188_v0.2.0.csv` para qualquer dúvida terminológica
2. Verificar a matriz de termos proibidos `SERA_TERMINOLOGY_FORBIDDEN_SYNONYMS_A4R188_v0.2.0.csv` antes de redigir rationale
3. Se aparecer termo ambíguo no rationale: registrar `TERMINOLOGY_REVIEW_REQUIRED` e não decidir o node

---

## 7. Locks preservados

```
notFinalClassification=true
poaClosureAllowed=false
selectedCodeAllowed=false
fixturePromotionAllowed=false
baselinePromotionAllowed=false
downstreamAllowed=false
axisClosureAllowed=false
A4R184_QUARANTINE_PRESERVED=true
REAL_TREE_GATE=PASS_WITH_LIMITATIONS (A4R185)
canonicalTreeSource=SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md
```
