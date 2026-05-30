# SERA A4R184 Axis Question Quarantine

Phase: A4R184-Q  
Version: v0.2.0  
Date: 2026-05-30  
Status: QUARANTINE_ACTIVE  
DOCS_ONLY  
NO_EVENT_ANALYSIS  
NO_AXIS_DECISION  
NO_RELEASE

---

## 1. Status Flags

```
A4R184_STATUS=INVALID_FOR_AXIS_DECISION_UNTIL_REAL_SERA_TREE_APPLIED
AXIS_DECISION_ALLOWED=false
QUESTION_SUBSTITUTION_ALLOWED=false
REAL_TREE_GATE_REQUIRED=true
NOT_FINAL_CLASSIFICATION=true
POA_CLOSURE_ALLOWED=false
```

---

## 2. Fundamentação da Quarentena

O pacote A4R184 contém seções denominadas "Perguntas por eixo" (seção 5.6, 6.6, 7.6, 8.6, 9.6 do SERA_AUTHOR_REVIEW_PACK_A4R184_v0.2.0.md) e perguntas numeradas por eixo nos pacotes individuais de revisão (P-1, P-2, O-1, A-1...). Essas perguntas são case-specific e foram construídas para orientar a decisão autoral, mas NÃO são derivadas dos nodes canônicos da árvore SERA real.

A árvore SERA canônica está disponível no repositório em:

```
docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md
```

com status `CANONICAL_QUESTION_TREE_ASSET`, node IDs técnicos estáveis (ex.: `P_ROOT`, `P_ASSESSMENT`, `P_CAPABILITY`, `P_TIME_PRESSURE`, `P_INFORMATION_AMBIGUOUS`, `P_INFORMATION_AVAILABLE`, `O_ROOT`, `O_RULES`, `O_ROUTINE`, `O_MANAGED_RISK`, `A_ROOT`, `A_IMPLEMENTED`, `A_CORRECT`, `A_CAPABILITY`, `A_TIME_PRESSURE`), texto exato das perguntas em PT e EN, ordem, ramificação e eixo correspondente.

A4R184 NÃO aplica esta árvore. As "perguntas por eixo" do A4R184 são perguntas auxiliares que não mapeiam a travessia dos nodes canônicos da árvore SERA. Portanto, qualquer resposta às "perguntas por eixo" do A4R184 não constitui travessia legítima da árvore SERA para fins de decisão P/O/A.

Esta quarentena registra esse bloqueio metodológico de forma explícita e permanente, até que uma fase futura (A4R185 ou posterior) aplique corretamente a árvore canônica A4R99 ao fluxo de cada evento.

---

## 3. Usos Preservados do Material A4R184

Os seguintes elementos do pacote A4R184 são metodologicamente válidos como material organizacional e podem ser usados em fases futuras:

| Elemento preservado | Razão |
|---|---|
| Pontos de fuga aprovados em A4R182 (`approvedEscapePointScope`) | Aprovação anterior de escopo factual; não depende de árvore SERA |
| `actorModel=CREW_INTEGRATED_ACTOR_MODEL` | Decisão de modelo de ator; não depende de árvore SERA |
| `currentHypP=UNKNOWN`, `currentHypO=UNKNOWN`, `currentHypA=UNKNOWN` | Estado conservador correto; não constitui decisão de eixo |
| `notFinalClassification=true` | Marcador de contenção explícito |
| `poaClosureAllowed=false` | Bloqueio de fechamento explícito |
| Narrativa factual de A4R180 e A4R180B | Extração factual; não depende de árvore SERA |
| Organização dos 5 eventos para revisão futura | Estrutura documental; não constitui decisão de eixo |
| Fragmentos de evidência e racionais de separabilidade | Insumos para revisão futura; não são respostas a nodes canônicos |
| Registros de risco metodológico (RISK_REGISTER) | Orientação de risco; não constitui decisão |

---

## 4. Usos Bloqueados

Os seguintes usos são EXPLICITAMENTE BLOQUEADOS enquanto a quarentena estiver ativa:

| Uso bloqueado | Razão |
|---|---|
| Responder às "perguntas por eixo" de A4R184 como decisão de eixo | Perguntas não derivadas de nodes canônicos da árvore SERA |
| Converter `UNKNOWN` para `HYP_P-*`, `HYP_O-*` ou `HYP_A-*` | Requer travessia da árvore canônica com node IDs reais |
| Criar `selectedCode` para qualquer evento do BATCH_A | Bloqueado até aplicação da árvore real |
| Criar código liberado (campo de release canônico) | Bloqueado até aplicação da árvore real |
| Criar fixture de validação com base em A4R184 | Fixture requer código canônico derivado da árvore real |
| Criar baseline com base em A4R184 | Bloqueado até código canônico validado |
| Abrir downstream (HFACS, Risk/ERC, recommendations) | Bloqueado até código canônico e classificação validada |
| Usar pergunta genérica por eixo em substituição às perguntas da árvore canônica | Proibido pela metodologia SERA e pelo CANONICAL_METHOD_QUESTION_LOCK |
| Usar pergunta auxiliar sem vínculo a node real da árvore canônica | Proibido |

---

## 5. Próxima Ação Obrigatória (para A4R185 ou fase posterior)

1. **Localizar e confirmar a árvore canônica**: usar `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md` como fonte primária. Verificar node IDs, texto exato e ramificação.

2. **Verificar que o REAL_TREE_GATE seja PASS**: confirmar que todos os critérios estão satisfeitos (node id, texto real, ordem, ramificação, eixo, status canônico/ativo).

3. **Para cada evento do BATCH_A**: mapear o fluxo real da árvore canônica (travessia real de nodes) respondendo exclusivamente às perguntas dos nodes canônicos com base em evidência factual.

4. **Se REAL_TREE_GATE for FAIL**: registrar `REAL_TREE_MISSING` e não prosseguir com A4R185 até resolução.

5. **Manter `notFinalClassification=true`** até fase posterior de validação completa.

---

## 6. Referência ao Status Final de A4R184

A4R184 está **preservado como material organizacional**, mas **bloqueado para qualquer decisão de eixo** até que a árvore real SERA seja aplicada corretamente a cada evento do BATCH_A.

Nenhuma resposta às "perguntas por eixo" do A4R184 constitui decisão metodologicamente válida de eixo P/O/A.
