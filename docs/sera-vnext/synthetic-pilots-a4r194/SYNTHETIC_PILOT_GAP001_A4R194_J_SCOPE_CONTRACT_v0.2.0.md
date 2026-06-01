# Synthetic Pilot GAP-001 A4R194-J Scope Contract v0.2.0

Status:
- SCOPE_CONTRACT_ONLY
- DEFINES_FUTURE_PHASE_LIMITS
- PRODUCT_BLOCKED

Fonte operacional de desenho: Daumas.

Este contrato define os limites da futura fase A4R194-J, se autorizada por nova
confirmacao humana explicita. A4R194-I nao inicia A4R194-J.

## Permissoes de A4R194-J

- J PODE criar um controlled materialization draft minimo do piloto sintetico
  GAP-001 PF/PM (`A4R194-J_CONTROLLED_MATERIALIZATION_DRAFT`).
- J DEVE incluir trial proprio.
- J DEVE passar por auditoria posterior independente (Opus high effort ou GPT-5.5).

## Proibicoes de A4R194-J

- J NAO pode criar fixture.
- J NAO pode promover nada a baseline.
- J NAO pode abrir produto/UI/API.
- J DEVE manter selectedCode null ou ausente.
- J DEVE manter releasedCode null ou ausente.
- J DEVE manter finalConclusion null ou ausente.
- J DEVE manter `poaClassification` em `NOT_CLASSIFIED`.
- J NAO pode criar HFACS, Risk/ERC, ARMS/ERC nem recommendations.

## Invariantes de boundary

- J DEVE preservar o boundary `PF_PRIMARY_WITH_PM_CONSEQUENCE_BOUNDARY`.
- J DEVE manter `PM_PRIMARY_MONITORING_FAILURE` bloqueado nesta linhagem; qualquer
  variante PM-primary exige novo `syntheticPilotId`, novo `scopeId`, nova sequencia e
  auditoria separada.
- J DEVE manter a temporalidade clarificada: PM nao anterior ao anchor PF.

## Pre-condicoes para iniciar A4R194-J

- nova confirmacao humana explicita registrada;
- A4R194-I commitada e auditavel;
- RR-001 e RR-003 reconhecidos no estado atual (`OPEN` / `PARTIALLY_MITIGATED`).

## Pos-condicoes obrigatorias de A4R194-J

- draft materializado minimo permanece design-only quanto a produto;
- trial proprio verde;
- auditoria posterior registrada antes de qualquer decisao de fixture/baseline/produto.
