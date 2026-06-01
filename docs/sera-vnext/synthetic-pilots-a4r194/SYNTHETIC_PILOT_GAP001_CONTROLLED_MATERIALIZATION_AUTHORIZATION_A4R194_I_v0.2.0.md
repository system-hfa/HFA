# Synthetic Pilot GAP-001 Controlled Materialization Authorization A4R194-I v0.2.0

Status:
- CONTROLLED_MATERIALIZATION_DRAFT_AUTHORIZATION_ONLY
- NO_MATERIALIZATION_IN_THIS_PHASE
- PRODUCT_BLOCKED

Fonte operacional de desenho: Daumas.

## 1. Autorizacao humana

`HUMAN_AUTHORIZATION_FOR_CONTROLLED_MATERIALIZATION_DRAFT_ONLY`

Esta fase A4R194-I existe somente porque ha autorizacao humana explicita para preparar
o pacote de autorizacao e guardrails de um futuro controlled materialization draft. A
autorizacao cobre exclusivamente a preparacao de autorizacao e guardrails; ela NAO
autoriza a materializacao em si, que permanece reservada a uma futura fase A4R194-J e a
uma nova confirmacao humana explicita.

Escopo autorizado nesta fase:
- preparar autorizacao e guardrails para controlled materialization draft;
- NAO criar fixture;
- NAO criar baseline;
- NAO abrir produto/UI/API;
- NAO criar selectedCode/releasedCode/finalConclusion;
- NAO criar classificacao final;
- NAO usar como referencia real.

## 2. Base de decisao (A4R194-H)

- Veredito final H: `FINAL_DRAFT_AUDIT_PASS_WITH_WARNINGS`.
- BLOCKER none / HIGH none / MEDIUM none / LOW 2 / INFO 1.
- Recomendacao primaria H: `CLOSE_SYNTHETIC_PILOT_BLOCK`.
- Alternativa condicional H: `ALLOW_CONTROLLED_MATERIALIZATION_DRAFT_WITH_HUMAN_AUTHORIZATION`.
- Esta fase I exerce a alternativa condicional, sob autorizacao humana, sem materializar.

## 3. Boundary confirmado

- `PF_PRIMARY_WITH_PM_CONSEQUENCE_BOUNDARY`: a instancia trata o PF como ator primario do
  escape-point sintetico; o PM permanece como obrigacao de monitoramento/callout na zona
  de consequencia/barreira.
- `PM_PRIMARY_MONITORING_FAILURE_REQUIRES_SEPARATE_DRAFT`: a variante PM-primary nao e
  coberta aqui e exige novo `syntheticPilotId`, novo `scopeId`, nova sequencia e auditoria
  separada.

## 4. Proibicoes explicitas (mantidas)

- no fixture
- no baseline
- no product
- no UI/API
- no selectedCode
- no releasedCode
- no finalConclusion
- no HFACS
- no Risk/ERC
- no ARMS/ERC
- no recommendations

## 5. Proxima fase permitida

- `A4R194-J_CONTROLLED_MATERIALIZATION_DRAFT`: pode, se e somente se autorizada por nova
  confirmacao humana explicita, criar um controlled materialization draft minimo do piloto
  sintetico GAP-001 PF/PM.

Proxima fase ainda bloqueada de:
- fixture
- baseline
- produto/UI/API
- classificacao final (selectedCode/releasedCode/finalConclusion permanecem null/ausentes;
  poaClassification permanece `NOT_CLASSIFIED`)

## 6. Risco residual

- RR-001 (lexical/agent ambiguity): `OPEN`.
- RR-003 (MDC/intake partial mitigation): `PARTIALLY_MITIGATED`.

## 7. Nao automatismo

- A materializacao nunca e automatica apos esta autorizacao.
- A passagem para A4R194-J exige nova confirmacao humana explicita registrada.
- A4R194-I nao inicia A4R194-J.
