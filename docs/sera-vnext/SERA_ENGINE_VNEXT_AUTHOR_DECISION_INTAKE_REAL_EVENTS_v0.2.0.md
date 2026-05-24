# SERA Engine vNext Author Decision Intake Real Events v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-65 — Author Decision Intake  
NO_RELEASED_CODE: true  
NO_DOWNSTREAM: true  
NO_FIXTURE: true  
NO_BASELINE: true

## Objetivo
Consolidar decisões autorais pendentes das adjudicações reais (001–005), separando o que pode ser resolvido por regra metodológica já documentada do que ainda exige resposta explícita do usuário/adjudicador.

## Tabela de perguntas abertas
| caseId | question | current draft position | proposed handling | decision status | rationale |
|---|---|---|---|---|---|
| 001 | Fronteira `P-G` vs `P-H` | `P-G`, `O-A`, `A=UNRESOLVED` | Manter `P-G` enquanto não houver evidência de falha de comunicação/informação; manter `A=UNRESOLVED` por falta de PF/PM/callouts | RULE_APPLIED | Taxonomia canônica exige evidência de comunicação para `P-H`; monitoramento/atenção sem cadeia comunicacional favorece `P-G` |
| 002 | Manter `P=UNRESOLVED` e robustez de `O-A` sem rota briefada | `P=UNRESOLVED`, `O-A`, `A=UNRESOLVED` | `P=UNRESOLVED` mantido por regra; `O-A` mantido em draft sob revisão autoral | AUTHOR_DECISION_REQUIRED | Sem mecanismo perceptivo claro, P não fecha; no eixo O, ausência de rota briefada pode ser lida como condição/planning e requer decisão final do adjudicador |
| 003 | Manter `A=UNRESOLVED` e tratar alerta sonoro ausente como condição dominante | `P=UNRESOLVED`, `O-A`, `A=UNRESOLVED` | Manter `A=UNRESOLVED`; tratar ausência de alerta como degradação de barreira/condição | RULE_APPLIED | Ausência de alerta não produz A-code automático; falta separação PF/PM/mission crew |
| 004 | Limiar mínimo para sair de `unsafe-condition-dominant` | `P=UNRESOLVED`, `O-A`, `A=UNRESOLVED` | Exigir evidência humana robusta por eixo antes de fechar P/A | ENRICHMENT_REQUIRED | Caso técnico dominante; sem cadeia humana discriminada há alto risco de over-classification |
| 005 | Critério mínimo de source anchor para sair de triage-only | `P/O/A=UNRESOLVED`, `TRIAGE_ONLY` | Manter triage até anchor mínimo completo | ENRICHMENT_REQUIRED | `SOURCE_PARTIAL` não sustenta adjudicação causal profunda |

## Decisões/regra sugeridas
### 001 — `P-G` vs `P-H`
- `P-H` exige evidência de falha de comunicação/informação.
- Se evidência dominante é monitoramento/atenção sem pressão temporal dominante e sem cadeia comunicacional explícita, manter `P-G`.
- Status: `RULE_APPLIED`.

### 001 — eixo A
- Manter `A=UNRESOLVED` enquanto PF/PM/input/callouts não estiverem decompostos com rastreio factual suficiente.
- Status: `RULE_APPLIED`.

### 002 — eixo P
- Warning não percebido não vira P-code automático.
- Sem mecanismo perceptivo/comunicacional claro, manter `P=UNRESOLVED`.
- Status: `RULE_APPLIED`.

### 002 — eixo O (`O-A` draft)
- `O-A` pode permanecer em draft quando objetivo imediato foi descontinuação/recuperação.
- Ausência de rota briefada deve ficar como condição/planejamento, não O-C/O-D automático sem evidência de intent.
- Status: `AUTHOR_DECISION_REQUIRED` para fechamento autoral.

### 003 — eixo A
- Manter `A=UNRESOLVED` até separar PF/PM/mission crew com evidência mínima.
- Status: `RULE_APPLIED`.

### 003 — alerta sonoro
- Ausência de alerta sonoro é condição/barreira degradada, não falha perceptiva/ação automática.
- Status: `RULE_APPLIED`.

### 004
- Manter `EVIDENCE_ENRICHMENT_REQUIRED`.
- Sair de `unsafe-condition-dominant` apenas com:
  1. sequência temporal rastreável de ações humanas,
  2. evidência por eixo (P e/ou A) com mecanismo explícito,
  3. alternativa técnica isolada formalmente rejeitada.
- Status: `ENRICHMENT_REQUIRED`.

### 005
- Manter `TRIAGE_ONLY`.
- Exigir source anchor mínimo antes de adjudicação profunda.
- Status: `ENRICHMENT_REQUIRED`.

## Regra geral
- No-failure não é fallback para desconhecido.
- Warning/barreira ausente não gera P/A automático.
- Anomalia técnica não gera erro humano automático.
- Source partial não gera P/O/A ativo.

## Itens com decisão autoral pendente
- Caso 002: confirmação final da robustez de `O-A` draft no contexto sem rota briefada (`AUTHOR_DECISION_REQUIRED`).
