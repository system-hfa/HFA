# SERA v0.1.4-A4-j - Documentation Consistency Update

Status: documentation alignment completed  
Scope: alinhar documentação metodológica com a baseline causal v0.1.4 e separação formal causal vs HFA Risk Layer  
Non-scope: alterações de motor, expected, candidates, baseline artifact ou código de risk layer

## 1. Objetivo da fase

Atualizar claims metodológicos para refletir o estado consolidado após A4-i:

- baseline causal v0.1.4 existe e está congelada para classificação causal;
- risk layer permanece separada e não congelada como baseline completa;
- `erc_level` é metadata legacy de risk layer, não eixo causal original Hendy/SERA.

## 2. Arquivos revisados

- `docs/SERA_METHOD_CONTRACT_v0.1.4.md`
- `docs/SERA_A4_METHODOLOGY_CONSOLIDATION_AND_BASELINE_READINESS_v0.1.4.md`
- `frontend/src/lib/sera/rules/BASELINE.md`
- `docs/SERA_A3_STABILIZATION_AND_TRACE_GOVERNANCE_v0.1.4.md`
- `docs/SERA_A3_METHODOLOGY_AUDIT_CONSOLIDATION_v0.1.4.md`
- `docs/RISK_PROFILE_BASELINE_v1.0-A.md`
- `docs/SERA_A4_C_RISK_LAYER_SEPARATION_AND_GOVERNANCE_v0.1.4.md`
- `docs/SERA_A4_I_CAUSAL_BASELINE_ARTIFACT_AND_FREEZE_GOVERNANCE_v0.1.4.md`
- `tests/reports/baseline/sera-causal-baseline-v0.1.4.json`

## 3. Arquivos alterados

- `docs/SERA_METHOD_CONTRACT_v0.1.4.md`
- `docs/SERA_A4_METHODOLOGY_CONSOLIDATION_AND_BASELINE_READINESS_v0.1.4.md`
- `frontend/src/lib/sera/rules/BASELINE.md`
- `docs/SERA_A3_METHODOLOGY_AUDIT_CONSOLIDATION_v0.1.4.md`

## 4. Claims corrigidos

Principais correções aplicadas:

1. Removida/ajustada linguagem que tratava ERC como eixo causal original diretamente derivado de Hendy.
2. Reforçado que Hendy fornece framing de risk management (tático/estratégico), sem assumir sigla/escala ERC 1-5 original no material revisado.
3. Formalizado que a baseline causal v0.1.4 cobre P/O/A + preconditions.
4. Formalizado que `erc_level` permanece metadata legacy da HFA Risk Layer.
5. Atualizado status em A4 de consolidação para refletir que o artefato causal já existe (A4-i) e que risk layer permanece pendente para A5.
6. Adicionada nota de governança em `BASELINE.md` com referência explícita ao artefato `tests/reports/baseline/sera-causal-baseline-v0.1.4.json`.

## 5. Política atual consolidada

- Causal baseline v0.1.4 existe.
- Risk Layer não está congelada como baseline completa.
- `erc_level` é legacy metadata.
- Hendy risk management != ERC original como eixo causal congelado.

## 6. Pendências

1. **A5 Risk Layer Redesign** (governança e validação dedicadas).
2. Revisão contínua de caveats de produto para evitar claims além da evidência metodológica atual.
3. Decisão eventual de tag/pre-release (fase de release governance).

## 7. Declaração de limite

Esta fase foi exclusivamente documental:

- sem patch de motor;
- sem alteração de expected/candidates;
- sem alteração do baseline artifact causal;
- sem promoção de baseline de risk layer.
