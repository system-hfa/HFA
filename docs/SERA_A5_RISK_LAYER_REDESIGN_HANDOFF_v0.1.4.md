# SERA v0.1.4-A5 - Risk Layer Redesign Handoff

Status: handoff preparado ao fim da A4  
Origem: fechamento A4-FINAL (baseline causal consolidada)  
Escopo deste documento: governanca de transicao para A5, sem reabrir motor causal

## 1. Estado Final da A4

A4 foi encerrada com baseline causal oficial, contrato de scorer/report causal-only e governanca documental consolidada.

Baseline causal oficial:

- `tests/reports/baseline/sera-causal-baseline-v0.1.4.json`

Resultado consolidado:

- `baseline_type`: `causal_classification`
- `version`: `v0.1.4`
- `scope`: `P/O/A + preconditions`
- `9` candidates, `27` runs
- `causal_summary`: `27 PASS`, `0 PARTIAL`, `0 FAIL`, `0 ERROR`, `determinism_rate=1`
- provider-stable e guardrail causal aprovado

Tag de marco:

- `sera-causal-v0.1.4`

## 2. Limites da Baseline Causal

Esta baseline valida somente classificacao causal SERA:

- Perception
- Objective/Goal
- Action
- Preconditions

Esta baseline nao valida:

- traditional risk matrix
- ARMS/ERC como baseline de risco
- Hendy risk management como baseline de risco completa
- Risk Profile/product risk presentation claims

## 3. Por Que a Risk Layer Ficou Fora da A4

- `erc_level` atual e metadata legacy da HFA Risk Layer.
- A sigla/escala ERC nao foi confirmada como eixo original comprovado no material Hendy/SERA revisado.
- A4 congelou classificacao causal para evitar mistura de gate causal com gate de risco legado.
- A Risk Layer demanda contrato proprio, fixtures proprios e validacao propria (A5).

## 4. Inventario Inicial da Risk Layer (Entrada A5)

1. `erc_level` legacy (compatibilidade historica de scoring/report).
2. Matriz tradicional (probabilidade/severidade e apresentacoes correlatas).
3. ARMS/ERC na camada de apresentacao/interpretacao.
4. Hendy risk management framing (tatico/estrategico) como adaptacao governada.
5. Risk Profile/product presentation (UI/API/copy e caveats).

## 5. Principios Normativos para A5

1. Risco e downstream da classificacao causal.
2. Nao alterar P/O/A para “ajustar risco”.
3. Nao tratar ERC como eixo causal original comprovado de Hendy.
4. Desenhar `risk_layer.*` com contrato claro e sem quebrar legado sem plano de migracao.
5. Manter caveats de produto alinhados ao nivel real de evidencia metodologica.

## 6. Entregaveis Macro da A5

1. Risk Layer source audit (fontes, limites e claims permitidos).
2. Traditional matrix contract (semantica, thresholds, outputs).
3. ARMS/ERC contract (mapeamentos, limites, interpretacao).
4. Hendy risk management adaptation contract (tatico/estrategico).
5. Risk confidence model (confianca de dados/metodo separada de nivel de risco).
6. Product caveats package (copy, relatorio, API caveats).
7. Tests/fixtures proprios da Risk Layer (independentes do gate causal).
8. Integracao posterior com Risk Profile (somente apos contrato e validacao).

## 7. Guardrails da A5

- Motor causal nao reabre nesta trilha.
- Baseline causal roda como regressao quando houver risco de impacto cruzado.
- Risk baseline permanece separada da causal baseline.
- Reports contaminados por timeout/terminated continuam como `NOISY_PROVIDER_RUN`.
- `erc_question_trace` permanece bloqueado ate governanca propria da Risk Layer.

## 8. Sequencia Recomendada Pos-Handoff

1. Abrir fase A5 com source audit e contrato de escopo de risco.
2. Fechar contratos de matriz tradicional e ARMS/ERC.
3. Definir pacote de validacao da Risk Layer (fixtures + guardrails proprios).
4. So depois integrar claims no Risk Profile e preparar trilha A6/A7.
