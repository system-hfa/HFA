# SERA Engine vNext Dry Run Divergence Resolution Guide v0.2.0

Status: DRAFT_FOR_REVIEW
Phase: A4+R-55 — Dry Run Divergence Resolution Guide
NOT_FORMAL_INTER_RATER: true
NOT_FOR_VALIDATION_CLAIM: true

## 1. Status

Este documento é um guia de decisão derivado de divergências encontradas em dry run documental (A4+R-54). Ele não constitui inter-rater formal, não calcula kappa, não declara metodologia validada e não promove nenhum caso para CONSENSUS_VALIDATED.

## 2. Objetivo

Transformar as divergências identificadas no dry run A4+R-54 em orientações práticas para revisores humanos reais, reduzindo divergências artificiais antes da execução do protocolo inter-rater formal.

As regras aqui propostas são heurísticas de apoio à decisão, não algoritmos automáticos de classificação.

## 3. Divergência 1 — Insufficient Evidence vs A-A

**Caso**: CRC-NEGATIVE-CONTROL-DRAFT-001
**Eixo divergente**: A (Action)
**Reviewer-A**: INSUFFICIENT_EVIDENCE
**Reviewer-B**: A-A
**Tipo de divergência**: insufficient evidence / boundary

### Pergunta

Quando usar A-A e quando usar UNRESOLVED/INSUFFICIENT_EVIDENCE no eixo A?

### Regra proposta

1. **A-A** deve ser usado quando há evidência suficiente de que a ação foi coerente com percepção e objetivo e não há mecanismo de falha de ação específico identificável. A-A exige evidência negativa mínima — ou seja, deve ser possível afirmar que nenhum mecanismo de falha de ação se aplica com base no que se sabe, não com base no que se desconhece.

2. **UNRESOLVED / INSUFFICIENT_EVIDENCE** deve ser usado quando não há evidência suficiente para avaliar o eixo A. A ausência de evidência não é automaticamente ausência de falha.

3. **"No failure" não é fallback para desconhecido.** Se a evidência disponível não permite afirmar se houve ou não falha de ação, o eixo deve permanecer UNRESOLVED, não receber A-A por default.

4. Em contextos de controle negativo (casos construídos com baixa informação), a expectativa é que múltiplos eixos sejam marcados como INSUFFICIENT_EVIDENCE. Forçar A-A nesses casos constitui over-classification.

## 4. Divergência 2 — O-E Reservado vs O-A Fallback

**Caso**: CRC-ADVERSARIAL-DRAFT-001
**Eixo divergente**: O (Objective)
**Reviewer-A**: O-E (flagged reserved)
**Reviewer-B**: O-A
**Tipo de divergência**: taxonomic boundary

### Pergunta

Quando um código reservado aparece como proposta, o eixo deve virar O-A ou bloquear?

### Regra proposta

1. **O-E é RESERVED / NOT_ACTIVE** conforme a taxonomia canônica SERA-PT v1.0. Nenhum revisor deve propor O-E como código ativo. Tentativas de uso devem ser bloqueadas ou sinalizadas como inválidas.

2. **O-A só pode ser usado se houver evidência positiva suficiente** de que o objetivo operacional era correto (ausência de intenção desviante, ausência de violação, ausência de objetivo de eficiência).

3. **O-A não é fallback automático para O-E bloqueado.** Se O-E foi proposto (ainda que como teste adversarial) e não há evidência suficiente para O-A, O-B, O-C ou O-D, o eixo deve permanecer UNRESOLVED / REVIEW_REQUIRED.

4. O fato de O-E ser inválido não empurra o eixo para O-A — apenas remove O-E do conjunto de opções válidas. A decisão sobre o eixo O deve ser reavaliada com base na evidência disponível para os códigos ativos (O-A a O-D).

## 5. Divergência 3 — A-A vs A-C

**Caso**: CRC-ADVERSARIAL-DRAFT-002
**Eixo divergente**: A (Action)
**Reviewer-A**: A-C
**Reviewer-B**: A-A
**Tipo de divergência**: evidence interpretation / boundary

### Pergunta

Quando usar A-A e quando usar A-C?

### Regra proposta

1. **A-A** = ação coerente com percepção e objetivo já estabelecidos, sem mecanismo específico de falha de ação. A ação foi executada e não há evidência de que seu resultado deixou de ser verificado.

2. **A-C** = falha de feedback/verificação pós-ação própria. O agente executou a ação, mas não verificou o resultado da própria ação. A-C exige evidência de ausência de verificação pós-ação própria.

3. **Se a evidência mostra ausência de verificação pós-ação própria, preferir A-C.** A-C é mais específico que A-A e, quando suportado por evidência, deve prevalecer sobre o default A-A.

4. **Se a ação foi coerente e não há evidência de falha de verificação, manter A-A.** A-A é o código apropriado quando nenhum mecanismo de falha de ação específico é identificável.

5. **Se a evidência é insuficiente para determinar se houve verificação pós-ação, marcar UNRESOLVED / REVIEW_REQUIRED.** Não forçar A-A nem A-C quando a evidência não sustenta decisão em nenhuma direção.

## 6. Divergência 4 — Interpretação de P em cenário adversarial A-A/A-C

**Caso**: CRC-ADVERSARIAL-DRAFT-002
**Eixo divergente**: P (Perception)
**Reviewer-A**: P-G (falha de monitoramento/verificação)
**Reviewer-B**: P-A (sem falha perceptiva específica)
**Tipo de divergência**: evidence interpretation

### Análise

A divergência em P no CRC-ADVERSARIAL-DRAFT-002 está acoplada à divergência em A (A-A vs A-C), mas deve ser tratada com independência metodológica:

1. **Separar percepção de ação.** O fato de haver falha de verificação pós-ação (A-C) não implica automaticamente falha de monitoramento perceptivo (P-G). São eixos distintos com evidências distintas.

2. **Não inferir falha perceptiva apenas porque houve falha de verificação.** P-G exige evidência própria de que informação estava disponível e não foi monitorada/verificada no plano perceptivo, sem pressão temporal dominante.

3. **Exigir evidência própria para o código P.** Cada eixo deve ser suportado por evidência específica. A presença de falha em A não autoriza inferência de falha em P sem evidência independente.

4. **Se a evidência para P é ambígua, marcar UNRESOLVED ou P-A com confidence LOW**, registrando explicitamente a incerteza no rationale.

## 7. Regras Gerais para Revisores Reais

Estas regras aplicam-se a qualquer revisão humana com a taxonomia SERA-PT v1.0:

1. **Não usar código "sem falha" como fallback para ausência de evidência.** P-A, O-A e A-A exigem evidência negativa mínima; não são defaults automáticos quando falta informação.

2. **Não usar código reservado como ativo.** O-E é RESERVED / NOT_ACTIVE. Propostas com O-E devem ser rejeitadas e o eixo reavaliado.

3. **Não inferir intenção sem evidência.** O-B, O-C, O-D exigem evidência positiva de desvio, consciência ou objetivo de eficiência. Não assumir intenção a partir de resultado adverso.

4. **Não inferir falha de percepção por resultado ruim.** Um outcome negativo não prova que houve falha perceptiva. P-codes exigem evidência específica do mecanismo perceptivo.

5. **Não misturar falha de ação com falha de percepção.** Cada eixo é independente. Evidência de falha em um eixo não substitui evidência no outro.

6. **Registrar confidence e rationale por eixo.** Toda proposta P/O/A deve ser acompanhada de rationale explícito e confidence (LOW / MEDIUM / HIGH).

7. **Marcar UNRESOLVED quando a evidência não sustenta decisão.** A abstenção fundamentada é preferível à classificação forçada. INSUFFICIENT_EVIDENCE e REVIEW_REQUIRED são estados legítimos.

8. **Registrar evidenceRefs usadas e acceptedUncertainty.** Transparência sobre o que se sabe e o que se assume é obrigatória.

## 8. Impacto no Review Package

Recomenda-se que o Review Package (`SERA_ENGINE_VNEXT_REFERENCE_CASE_REVIEW_PACKAGE_v0.2.0.md`) seja atualizado para incluir estas regras como seção "Dry Run Divergence Rules before Formal Review" antes da execução de revisão real.

As três regras-síntese para o package:
- **no-failure não é fallback para unknown**: P-A/O-A/A-A exigem evidência negativa mínima;ausência de evidência → UNRESOLVED.
- **O-E reservado não vira O-A automático**: O-E bloqueado não empurra o eixo para O-A; reavaliar com base em evidência para códigos ativos.
- **A-C exige falha de verificação pós-ação própria**: distinção A-A/A-C depende de evidência específica de ausência de verificação; não forçar na ausência de evidência.

## 9. Impacto no Inter-Rater Protocol

Estas regras devem reduzir divergências artificiais antes da execução do protocolo inter-rater formal:

1. **Divergências de regra vs divergências de julgamento**: as regras aqui propostas eliminam divergências causadas por diferenças de entendimento das regras taxonômicas (ex.: tratar O-E como ativo, usar A-A como fallback), deixando para o inter-rater apenas as divergências genuínas de interpretação de evidência.

2. **Calibração pré-inter-rater**: revisores reais devem receber este guia como parte do treinamento antes da classificação independente (Fase 1 do protocolo).

3. **Redução de ruído**: ao padronizar o tratamento de casos-limite (códigos reservados, evidência insuficiente, fronteira A-A/A-C), o guia reduz ruído metodológico e aumenta a proporção de divergências substantivas no inter-rater.

4. **Não substitui o protocolo**: este guia é preparatório. A execução do protocolo inter-rater com métricas e thresholds continua sendo condição necessária para qualquer claim de confiabilidade.

## 10. Limitações

- Este guia é derivado de dry run documental com revisores pseudônimos (Reviewer-A, Reviewer-B).
- Baseia-se em 4 casos e 12 eixos — amostra pequena.
- Não foi validado com revisores reais independentes.
- As regras são heurísticas, não substituem julgamento humano informado.
- Não constitui evidência de validade ou confiabilidade metodológica.
