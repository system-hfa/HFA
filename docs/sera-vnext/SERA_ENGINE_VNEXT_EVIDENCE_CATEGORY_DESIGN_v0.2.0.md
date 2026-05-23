# SERA Engine vNext Evidence Category Design v0.2.0

Status: DESIGN_ONLY  
Phase: A4+R-48 — Evidence Category Design

## Objetivo
Definir um contrato futuro de categorias de evidência para rastreabilidade metodológica, sem ativar categorização automática obrigatória no runtime atual.

## Entra nesta fase
- Taxonomia de categorias proposta.
- Relação categoria <-> guardrails canônicos P/O/A.
- Plano incremental de adoção futura.

## Fica fora desta fase
- Categorização automática ampla de `evidenceRefs`.
- Mudança de decisão de classificação.
- Requisito obrigatório de categoria para testes atuais.
- Integração com UI/API/DB.
- Integração com LLM.

## Categorias propostas
- `PHYSICAL_CAPABILITY`
- `INTENT_AWARENESS`
- `TIME_PRESSURE`
- `COMMUNICATION_INFORMATION`
- `PROCEDURAL_MONITORING`
- `KNOWLEDGE_TRAINING`
- `SUPERVISION_COORDINATION`
- `OPERATIONAL_EFFICIENCY_PRESSURE`
- `SENSORY_LIMITATION`
- `PERCEPTUAL_AMBIGUITY`
- `FEEDBACK_VERIFICATION`
- `RULE_NORM_CONTEXT`
- `UNKNOWN_OR_UNCATEGORIZED`

## Relação com guardrails
- `A-D` exige `PHYSICAL_CAPABILITY` em fases futuras.
- `O-B/O-C` exigem `INTENT_AWARENESS` + padrão temporal/normalização quando aplicável.
- `P-D/A-H/A-I/A-J` exigem `TIME_PRESSURE` quando for discriminador canônico.
- `P-G/A-C` exigem `PROCEDURAL_MONITORING` ou `FEEDBACK_VERIFICATION`.
- `P-H/A-J` exigem `COMMUNICATION_INFORMATION`.

## Política desta fase
- Não há obrigatoriedade de categoria no runtime v0.2.0.
- Não há bloqueio automático novo por ausência de categoria.
- Sem alteração de `selectedCode`, sem downstream, sem recommendation/finalConclusion/HFACS/Risk/ERC/ARMS.

## Plano de adoção futura
1. Adoção opcional em traceability/preconditions como metadado passivo.
2. Definição de mínimos por código crítico (ex.: A-D, O-C, P-G).
3. Introdução gradual de validação em modo warning antes de bloqueio.
4. Só tornar obrigatório após consenso de casos de referência e protocolo inter-rater.
