# SERA Engine vNext 30 Real Events Pattern Review A4R78 v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-78

## Objetivo
Consolidar padrões metodológicos recorrentes nos 30 eventos reais e registrar riscos de overclassification, guardrails e usos futuros como referência/adversarial/enrichment.

## 1. Condition-dominant sem ator humano claro
- Exemplos: `REAL-EVENT-0006`, `0007`, `0008`, `0013`, `N120HH`, `N525TA`, Roncador.
- Risco metodológico: converter falha técnica severa em falha humana sem mecanismo factual.
- Guardrail reforçado: condition-dominant não fecha A-code por desfecho.
- Necessidade de enrichment: cadeia técnica, detectabilidade, manutenção, warnings e janela de resposta.
- Utilidade futura: adversarial natural para bloquear culpa humana automática.

## 2. Perception/action boundary
- Exemplos: `REAL-EVENT-0001`, `0003`, `0015`, `0016`, `D-HHNH`, `G-BHYB`, `HL9294`, `N200BK`, `N109W`, `N11NM`.
- Risco metodológico: fechar A antes de separar percepção, monitoramento, modo, input e correção.
- Guardrail reforçado: P draft pode coexistir com `A=UNRESOLVED`.
- Necessidade de enrichment: PF/PM, callouts, inputs e tempo de correção.
- Utilidade futura: reference candidates para fronteiras P/A.

## 3. PF/PM ambiguity
- Exemplos: `REAL-EVENT-0001`, `0002`, `0003`, `0005`, `0015`, `D-HHNH`, `G-BHYB`, `HL9294`, `PR-CHI`, `N11NM`.
- Risco metodológico: atribuir ação, comunicação ou monitoramento ao ator errado.
- Guardrail reforçado: não fechar A ou A-C sem ator e timeline.
- Necessidade de enrichment: cockpit voice/callout, função PF/PM por fase e duty split.
- Utilidade futura: enrichment priority.

## 4. Automation/mode awareness
- Exemplos: `REAL-EVENT-0016`, `N11NM`, `N525TA`.
- Risco metodológico: transformar automação ou modo confuso em P/A sem cadeia.
- Guardrail reforçado: separar modo disponível, modo entendido, input executado e feedback verificado.
- Necessidade de enrichment: FDR, mode annunciation, cockpit trace e control law context.
- Utilidade futura: adversarial/reference para interfaces homem-sistema.

## 5. Objective-diversity emerging
- Exemplos: `HL9294` (`O-D` draft), `N109W` (`O-D` draft), `BS211` (`O-C` draft).
- Risco metodológico: usar O-A como default ou, no extremo oposto, forçar O-C/O-D por desfecho.
- Guardrail reforçado: O-B/O-C/O-D exigem evidência de objetivo, regra, rotina, exceção ou eficiência.
- Necessidade de enrichment: evidência de intenção, consciência de regra, pressão operacional e alternativas disponíveis.
- Utilidade futura: base para desenhar critérios de release do eixo O.

## 6. Source partial/triage
- Exemplos: `REAL-EVENT-0028`, `REAL-EVENT-0013`, Roncador, `G-EZWM`, `EI-EFB`.
- Risco metodológico: adjudicar fonte instável como se fosse relatório primário.
- Guardrail reforçado: usar `TRIAGE_ONLY`/`EVIDENCE_ENRICHMENT_REQUIRED`.
- Necessidade de enrichment: fonte primária, locator, cronologia e atores.
- Utilidade futura: adversarial para recusa conservadora.

## 7. Technical failure vs crew response
- Exemplos: `5N-BQJ`, `5N-BGD`, `PK-FUP`, `N120HH`, Roncador, `N56RD`.
- Risco metodológico: confundir resposta de emergência com causa humana.
- Guardrail reforçado: resposta humana só pode ser avaliada depois de delimitar o evento técnico e a janela de resposta.
- Necessidade de enrichment: parâmetros técnicos, warnings, tempo disponível e manobras reais.
- Utilidade futura: release criteria negative controls.

## 8. Approach continuation / go-no-go
- Exemplos: `PH-KHB`, `HL9294`, `N109W`, `BS211`, `N200BK`.
- Risco metodológico: inferir violação sem evidência de consciência de regra ou objetivo.
- Guardrail reforçado: separar O-D (objetivo menos conservador sem violação formal) de O-C (desvio consciente excepcional).
- Necessidade de enrichment: minima, SOP, briefing, ATC, weather gates e go-around opportunities.
- Utilidade futura: objective-diversity reference set.

## 9. External barrier/bird strike
- Exemplos: `REAL-EVENT-0009`.
- Risco metodológico: atribuir falha humana a evento externo por severidade.
- Guardrail reforçado: manter barrier-dominant até haver janela de resposta humana comprovada.
- Necessidade de enrichment: certificação, resistência, pós-impacto, controles disponíveis.
- Utilidade futura: adversarial natural.

## 10. Infrastructure/taxi hazard
- Exemplos: `REAL-EVENT-0011`.
- Risco metodológico: culpar ação de taxi sem hazard awareness.
- Guardrail reforçado: separar infraestrutura, conhecimento do hazard, rota e alternativa operacional.
- Necessidade de enrichment: histórico do hazard, NOTAM/local procedures, taxi constraints.
- Utilidade futura: reference/adversarial para condições de solo.

## Próxima recomendação
Padronizar `questionPath` antes de qualquer desenho de release. Os padrões estão claros o suficiente para desenhar critérios, mas ainda há dois formatos de adjudicação coexistindo.
