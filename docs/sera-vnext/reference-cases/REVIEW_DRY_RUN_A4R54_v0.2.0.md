# Reference Cases Review Dry Run A4+R-54 v0.2.0

Status: DRY_RUN_REVIEW
Phase: A4+R-54 — Independent Review Dry Run
NOT_FORMAL_INTER_RATER: true
NOT_FOR_VALIDATION_CLAIM: true

## Objetivo
Executar uma rodada simulada/documental de revisão independente para validar o pacote de revisão, registrar divergências por eixo e preparar uma fase posterior de revisão formal.

## Escopo
- Revisão independente simulada por dois revisores pseudônimos.
- Registro de propostas P/O/A por revisor.
- Registro de rationale, confidence e insuficiência de evidência por eixo.
- Registro de divergências e prontidão preliminar para próxima fase.

## Fora de escopo
- Inter-rater formal com cálculo de kappa.
- Promoção de qualquer caso para `CONSENSUS_VALIDATED`.
- Abertura downstream, finalConclusion, HFACS, Risk/ERC, recommendations.
- Claim de validação metodológica.

## Revisores pseudônimos
- Reviewer-A
- Reviewer-B

## Casos revisados
- CRC-NOMINAL-DRAFT-001
- CRC-NEGATIVE-CONTROL-DRAFT-001
- CRC-ADVERSARIAL-DRAFT-001
- CRC-ADVERSARIAL-DRAFT-002

## Método
- Revisão independente simulada (dry run documental).
- Registro de P/O/A por revisor.
- Registro de rationale e confidence por eixo.
- Registro de divergências por eixo.
- Sem promoção para consenso nesta fase.

## Case: CRC-NOMINAL-DRAFT-001

### Reviewer-A
- P: P-A
- O: O-A
- A: A-A
- rationale P: evidência sintética compatível com ausência de falha perceptiva dominante.
- rationale O: ausência de indício de objetivo desviante ou tradeoff consciente.
- rationale A: ausência de mecanismo de falha de ação dominante; aderente à decisão autoral A-A.
- confidence P/O/A: MEDIUM / MEDIUM / MEDIUM
- insufficient evidence por eixo: P=não, O=não, A=não
- notes: caso nominal coerente para baseline de no-failure.

### Reviewer-B
- P: P-A
- O: O-A
- A: A-A
- rationale P: sem evidência de falha sensorial/interpretação/monitoramento dominante.
- rationale O: contexto operacional nominal sem desvio intencional documentado.
- rationale A: ação consistente com perfil nominal; sem indício de falha pós-ação.
- confidence P/O/A: MEDIUM / MEDIUM / MEDIUM
- insufficient evidence por eixo: P=não, O=não, A=não
- notes: resultado alinhado ao objetivo do draft nominal.

### Divergence analysis
- P agreement: yes
- O agreement: yes
- A agreement: yes
- divergence type: none
- consensus readiness: REVIEW_READY
- notes: alinhamento completo em dry run; manter como não-consenso até revisão formal real.

## Case: CRC-NEGATIVE-CONTROL-DRAFT-001

### Reviewer-A
- P: INSUFFICIENT_EVIDENCE
- O: INSUFFICIENT_EVIDENCE
- A: INSUFFICIENT_EVIDENCE
- rationale P: dados insuficientes sobre cues/monitoramento.
- rationale O: ausência de evidência de intenção/awareness.
- rationale A: ausência de sequência de ação verificável.
- confidence P/O/A: HIGH / HIGH / HIGH
- insufficient evidence por eixo: P=sim, O=sim, A=sim
- notes: controle negativo deve conter over-classification.

### Reviewer-B
- P: INSUFFICIENT_EVIDENCE
- O: INSUFFICIENT_EVIDENCE
- A: A-A
- rationale P: evidência insuficiente para hipótese perceptiva.
- rationale O: evidência insuficiente para framing de objetivo.
- rationale A: leitura conservadora de não-falha de ação pela ausência de mecanismo explícito.
- confidence P/O/A: HIGH / HIGH / LOW
- insufficient evidence por eixo: P=sim, O=sim, A=não
- notes: sinaliza ambiguidade metodológica entre abstenção total e fallback no-failure em Ação.

### Divergence analysis
- P agreement: yes
- O agreement: yes
- A agreement: no
- divergence type: insufficient evidence
- consensus readiness: NOT_READY
- notes: fronteira negativa útil para calibrar regra de abstenção em baixa informação.

## Case: CRC-ADVERSARIAL-DRAFT-001

### Reviewer-A
- P: P-A
- O: O-E (flagged NON_EXISTENT_IN_SERA_PT_V1)
- A: A-A
- rationale P: sem evidência perceptiva dominante além do cenário de teste.
- rationale O: marcação adversarial proposital para confirmar bloqueio de código reservado.
- rationale A: sem mecanismo de falha de ação dominante.
- confidence P/O/A: MEDIUM / LOW / MEDIUM
- insufficient evidence por eixo: P=não, O=não, A=não
- notes: O-E deve ser tratado como NON_EXISTENT_IN_SERA_PT_V1 e não como candidato ativo.

### Reviewer-B
- P: P-A
- O: O-A
- A: A-A
- rationale P: ausência de falha perceptiva específica dominante.
- rationale O: rejeita O-E ativo e prefere no-failure objetivo por falta de suporte para O-B/O-C/O-D.
- rationale A: sem evidência de falha de ação específica.
- confidence P/O/A: MEDIUM / MEDIUM / MEDIUM
- insufficient evidence por eixo: P=não, O=sim, A=não
- notes: reforça regra canônica de O-E NON_EXISTENT_IN_SERA_PT_V1.

### Divergence analysis
- P agreement: yes
- O agreement: no
- A agreement: yes
- divergence type: taxonomic boundary
- consensus readiness: REVIEW_READY
- notes: divergência de forma (flag adversarial vs fallback O-A), convergência na proibição de O-E ativo.

## Case: CRC-ADVERSARIAL-DRAFT-002

### Reviewer-A
- P: P-G
- O: O-A
- A: A-C
- rationale P: hipótese de monitoramento insuficiente no cenário sintético.
- rationale O: sem evidência de objetivo desviante.
- rationale A: evidência sintética de ação executada com possível falha de verificação pós-ação.
- confidence P/O/A: MEDIUM / MEDIUM / MEDIUM
- insufficient evidence por eixo: P=não, O=não, A=não
- notes: segue proposta preliminar do draft.

### Reviewer-B
- P: P-A
- O: O-A
- A: A-A
- rationale P: ambiguidade não sustenta falha perceptiva específica dominante.
- rationale O: alinhado em objetivo nominal.
- rationale A: indício de falha pós-ação não é robusto o suficiente; mantém no-failure.
- confidence P/O/A: LOW / MEDIUM / LOW
- insufficient evidence por eixo: P=sim, O=não, A=sim
- notes: prioriza cautela metodológica na fronteira A-A/A-C.

### Divergence analysis
- P agreement: no
- O agreement: yes
- A agreement: no
- divergence type: evidence interpretation
- consensus readiness: NOT_READY
- notes: caso cumpre papel adversarial de forçar distinção A-A vs A-C.
