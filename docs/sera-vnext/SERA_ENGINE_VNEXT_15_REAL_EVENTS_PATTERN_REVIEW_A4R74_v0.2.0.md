# SERA Engine vNext 15 Real Events Pattern Review A4R74 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-74

## Objetivo
Consolidar padrões metodológicos recorrentes observados nos 15 eventos reais e explicitar riscos de overclassification, guardrails e próximos focos de evolução.

## Padrões principais
### 1. Condition-dominant sem ator humano claro
- Exemplos: `REAL-EVENT-0006`, `0007`, `0008`, `0009`, `0013`.
- Risco metodológico: forçar A-code humano por severidade do desfecho.
- Guardrail reforçado: não converter condição técnica/barreira em falha humana sem mecanismo factual robusto.

### 2. Perception/action boundary
- Exemplos: `REAL-EVENT-0001`, `0003`, `0015`, `0016`.
- Risco metodológico: fechar A antes de separar monitoramento/percepção.
- Guardrail reforçado: admitir `P` draft com `A=UNRESOLVED` quando decomposição de ação é insuficiente.

### 3. PF/PM ambiguity
- Exemplos: `REAL-EVENT-0001`, `0002`, `0003`, `0005`, `0015`.
- Risco metodológico: atribuição de ator/mecanismo no eixo A sem timeline de papéis.
- Guardrail reforçado: exigir decomposição PF/PM e callouts para reduzir unresolved em A.

### 4. Automation/mode awareness
- Exemplos: `REAL-EVENT-0016`.
- Risco metodológico: mapear automaticamente alerta não respondido para P/A sem separar interface/carga cognitiva.
- Guardrail reforçado: tratar automação como fronteira percepção-interpretação-ação, sem shortcut por outcome.

### 5. Source mismatch/source partial
- Exemplos: `REAL-EVENT-0013` (identity mismatch), `REAL-EVENT-0028` (source partial).
- Risco metodológico: adjudicar caso com âncora documental instável.
- Guardrail reforçado: usar `TRIAGE_ONLY`/`EVIDENCE_ENRICHMENT_REQUIRED` e manter P/O/A unresolved quando necessário.

### 6. External barrier/bird strike
- Exemplos: `REAL-EVENT-0009`.
- Risco metodológico: inferir falha humana a partir de severidade e fatalidade.
- Guardrail reforçado: manter leitura barrier-dominant até haver janela de resposta humana comprovada.

### 7. Infrastructure/taxi hazard
- Exemplos: `REAL-EVENT-0011`.
- Risco metodológico: culpar ação de taxi sem evidência de hazard awareness e alternativas de rota.
- Guardrail reforçado: separar condição de infraestrutura e decisão local antes de propor A-code.

### 8. Objective O-A stability
- Exemplos: 13/15 casos com `O-A` draft.
- Risco metodológico: normalizar `O-A` por default sem teste suficiente de diversidade.
- Guardrail reforçado: ampliar corpus para aumentar probabilidade de casos com evidência de O-B/O-C/O-D.

## Casos candidatos a enrichment
- `REAL-EVENT-0005` (PF/PM e dinâmica final).
- `REAL-EVENT-0013` (reconciliação de identidade de fonte/caso).
- `REAL-EVENT-0007` (cadeia manutenção/inspeção).
- `REAL-EVENT-0009` (janela de resposta pós-bird strike + barreira/certificação).
- `REAL-EVENT-0011` (hazard awareness/rota em solo).
- `REAL-EVENT-0028` (source anchor primário mínimo).

## Casos candidatos a guarded narrative
- Já candidatos/produzidos: `REAL-EVENT-0001` e `REAL-EVENT-0006`.
- Candidatos futuros condicionais: `REAL-EVENT-0015` e `REAL-EVENT-0016` (após validação autoral de maturidade sem release).

## Casos candidatos a adversarial/reference future
- Adversarial naturais: `REAL-EVENT-0006`, `0007`, `0008`, `0009`, `0011`, `0013`.
- Reference candidates de fronteira: `REAL-EVENT-0001`, `0015`, `0016`.

## Próxima recomendação
**A4+R-75 — Select Batch 3 to reach 30 events**.

Justificativa:
- 15 casos ainda é amostra limitada para inferir estabilidade metodológica robusta de distribuição P/O/A.
- ampliar corpus para 30 melhora poder de comparação entre padrões reais, reduz viés de coleção e fortalece validação de guardrails antes de qualquer discussão de release.
