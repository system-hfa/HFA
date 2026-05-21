# SERA Methodology Governance Rules

**Versão:** v0.1.4-A3-governance
**Data:** 2026-05-21
**Fase:** SERA v0.1.4-A3-governance
**Tipo:** Regras permanentes de governança metodológica — sem alteração de código, fixtures, candidates, baseline ou reports

---

## 1. Propósito

Este documento estabelece as regras permanentes de governança metodológica do HFA/SERA. Seu objetivo é impedir que futuras conversas, agentes ou patches tratem o SERA como classificador direto de relatos para códigos P/O/A, e garantir que toda evolução do motor preserve a rastreabilidade metodológica Hendy-first.

Este documento é normativo para qualquer pessoa ou agente que trabalhe no pipeline SERA.

---

## 2. Regra Central

**HFA/SERA não é classificador direto de relato para P/O/A.**

O SERA é uma ferramenta de investigação de fatores humanos baseada em perguntas. O motor HFA/SERA implementa computacionalmente esse processo. Ele não deve receber um relato e produzir P/O/A como um classificador de texto.

---

## 3. Fluxo Obrigatório

Toda análise HFA/SERA deve percorrer, explicita ou implicitamente, o seguinte fluxo:

```
relato
→ ponto de fuga da operação segura (departure from safe operation)
→ unsafe act / unsafe condition (distinção explícita)
→ ator direto (operador/crew que controlava a variável)
→ goal / perception / action statements (antes das ladders)
→ ladders SERA (percursos interrogativos por eixo)
→ active failure (classificação)
→ preconditions (derivadas da active failure)
→ ERC / risco
→ recomendações
→ decision_trace (rastro auditável do caminho percorrido)
```

Saltos ou colapsamentos neste fluxo devem ser documentados como `HFA_ADAPTATION_REQUIRES_NOTE`.

---

## 4. Hierarquia Metodológica

| Nível | Fonte | Papel |
|---|---|---|
| 1 | Hendy (2003) | Fonte primária da lógica original do SERA |
| 2 | Daumas | Operacionalização aplicada no contexto offshore/MDC |
| 3 | HFA/SERA | Implementação computacional auditável |
| 4 | Fixtures / candidates | Instrumentos de teste e calibração |

**Regra de precedência:** Em qualquer divergência conceitual direta entre Hendy e Daumas, Hendy prevalece.

**Códigos P/O/A:** Os códigos alfabéticos (P-A…P-H, O-A…O-D, A-A…A-H) são operacionalização Daumas/HFA, não nomenclatura original de Hendy. Devem ser mantidos com mapeamento explícito para as categorias lógicas de Hendy.

---

## 5. Regra sobre Daumas

Daumas é operacionalização aplicada do SERA, não uma fonte secundária fraca. O HFA/SERA deve aproveitar Daumas quando este:

- Melhora aplicabilidade prática sem romper a lógica causal de Hendy.
- Aumenta rastreabilidade, ensino, banco de dados, dashboard, relatórios ou testes.
- Traduz, organiza ou codifica conceitos de Hendy para uso operacional.

MDC (Método de Diagnóstico de Causas) é técnica de elicitação narrativa complementar — não substitui o SERA nem suas ladders.

---

## 6. Regra sobre Fixtures

1. Nenhuma fixture define metodologia.
2. A relação correta é: `Hendy/Daumas → Metodologia → Motor → Fixtures (verificam o motor)`.
3. Se uma fixture divergir da metodologia documentada, revisar a fixture — não adaptar a metodologia à fixture.
4. Não ajustar o motor apenas para acertar fixture.
5. Não criar expected apenas para validar comportamento atual do motor.

---

## 7. Regra sobre Gates

1. Nenhum gate novo pode ser criado apenas para acertar fixture.
2. Todo gate deve declarar qual pergunta do fluxo SERA ele representa.
3. Todo gate deve declarar seu status metodológico (ver seção 10).
4. Gates que introduzem restrições além do que Hendy exige (ex: O-C awareness estrito exigindo 4 blocos lexicais) devem receber `HFA_ADAPTATION_REQUIRES_NOTE`.
5. Anti-gates (ex: bloqueio de supervisão/manutenção como ator de falha ativa) devem declarar sua dependência de correta identificação do ator direto.

---

## 8. Regra sobre LLM

1. A LLM não é autoridade metodológica.
2. A LLM responde perguntas internas e extrai evidência.
3. A LLM não deve classificar livremente o evento inteiro em P/O/A.
4. A LLM não deve inventar objetivo, percepção ou ação quando não há evidência no relato.
5. O papel ideal da LLM é: `step_id + question_id + pergunta específica + answer + evidence + confidence + uncertainty`.
6. Quando a evidência for insuficiente, a LLM deve poder retornar `insufficient_evidence` como estado — não forçar classificação.

---

## 9. Regra sobre Preconditions

1. Preconditions são núcleo de risk management do SERA, não camada decorativa.
2. A derivação correta é: `active_failure → precondition → evidence`.
3. O vínculo deve ser rastreável no output.
4. Preconditions derivadas por lookup de código (matrix.json) são operacionalização HFA — funcionais, mas não substituem análise causal.
5. Toda precondition no output deve preservar `sourceRuleId` ou mecanismo de origem.

---

## 10. Status Metodológico de Heurísticas

Toda heurística, gate, regra ou adaptação no motor deve ser rotulada com exatamente um dos seguintes status:

| Status | Significado |
|---|---|
| `SOURCE_DIRECT_HENDY` | Deriva diretamente e fielmente de Hendy |
| `SOURCE_INFERRED_FROM_HENDY` | Inferência razoável a partir de Hendy, não declaração explícita |
| `DAUMAS_TRANSLATION` | Tradução de conceito Hendy para português/operacional |
| `DAUMAS_OPERATIONALIZATION` | Organização prática, codificação ou tabulação por Daumas/HFA |
| `DAUMAS_APPLIED_IMPROVEMENT` | Melhoria aplicada por Daumas que preserva a lógica Hendy |
| `HFA_ADAPTATION_REQUIRES_NOTE` | Adaptação computacional HFA que se afasta de Hendy ou Daumas |
| `TECHNICAL_HEURISTIC` | Heurística técnica sem pretensão de fidelidade metodológica estrita |
| `GAP` | Lacuna — elemento Hendy ausente na implementação atual |
| `UNCONFIRMED` | Status incerto — requer verificação adicional |

---

## 11. Regra sobre Promoção de Baseline

Nenhum baseline metodológico pode ser promovido sem:

1. `decision_trace` implementado e funcional.
2. `preconditions_trace` com vínculo `active_failure → precondition → evidence`.
3. `ADAPTATION_NOTES` formais para todos os desvios documentados.
4. Validação `N_RUNS` adequada ao nível de confiança exigido.
5. Confirmação explícita de que fixtures não foram usados como fonte metodológica.

---

## 12. Regra Operacional para Novas Fases

Toda nova fase (A3-c, A3-d, etc.) deve declarar, antes de iniciar, se altera:

- Metodologia
- Motor (lógica de classificação)
- Fixtures
- Documentação
- Produto (output/schema)
- Schema de banco
- Testes

Isso evita que mudanças não declaradas contaminem a rastreabilidade.

---

## 13. Prompt-Base para Novos Chats

O texto abaixo deve ser colado no início de qualquer nova conversa ou agente que vá trabalhar no pipeline HFA/SERA:

```
REGRA DE GOVERNANÇA HFA/SERA:
Antes de qualquer tarefa, considerar docs/SERA_METHODOLOGY_GOVERNANCE_RULES_v0.1.4.md.
O HFA/SERA não é classificador direto de relatos em P/O/A.
Toda mudança deve preservar ou explicitar sua relação com o fluxo:
relato → ponto de fuga → unsafe act/condition → ator direto → goal/perception/action → ladders → active failure → preconditions → ERC → recomendações → decision_trace.
Hendy é a fonte primária da lógica original.
Daumas é operacionalização/melhoria aplicada.
HFA/SERA é implementação computacional auditável.
Fixtures/candidates testam o motor; não definem metodologia.
Não criar gate, patch ou expected apenas para acertar fixture.
```

---

*Documento criado em 2026-05-21 como parte da fase SERA v0.1.4-A3-governance. Nenhum código, fixture, candidate, baseline ou report foi alterado.*
