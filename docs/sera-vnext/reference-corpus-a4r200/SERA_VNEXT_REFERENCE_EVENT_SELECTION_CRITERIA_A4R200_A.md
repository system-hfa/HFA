# SERA vNext Reference Event Selection Criteria A4R200-A

Date: 2026-06-01
Phase: A4R200-A
Status: criteria contract only

## 1. Criterios minimos (obrigatorios)

1. Fonte oficial rastreavel (primary preferred, secondary official acceptable with caveat).
2. Locator/document reference verificavel.
3. Sequencia temporal suficiente para localizar escape point.
4. Ator direto minimamente atribuivel no instante de escape.
5. Evidencia observavel no pre-escape e no escape point.
6. Separacao explicita entre fatos e conclusoes externas.
7. Risco baixo/controlado de outcome bias.
8. Risco baixo/controlado de agent migration.
9. Utilidade explicita para ao menos um gap metodologico ativo.

## 2. Criterios desejaveis

- CVR/FDR summary ou cronologia tecnica detalhada.
- PF/PM attribution clara quando aplicavel.
- sequenceRef por ator para primeiro instante controlavel.
- warning/callout/go-around mechanism evidenciado.
- contexto suficiente para separar fator tecnico de fator humano.

## 3. Criterios de rejeicao imediata

- fonte apenas jornalistica;
- sem relatorio oficial rastreavel;
- sem cronologia minimamente utilizavel;
- sem ator direto sustentavel;
- ambiguidade excessiva sem chance razoavel de fechamento;
- dependencia de conclusao externa sem base factual;
- utilidade apenas por severidade/outcome;
- relatorio inacessivel ou sem locator.

## 4. Estados permitidos

- `STRONG_REFERENCE_CANDIDATE`
- `SOURCE_RECOVERY_CANDIDATE`
- `BOUNDARY_CASE_ONLY`
- `NEGATIVE_CONTROL`
- `HOLD`
- `DISCARD_OR_REPLACE`
- `SYNTHETIC_FILL_RECOMMENDED`
- `DAUMAS_CALIBRATION_REFERENCE`

## 5. Forbidden outputs

- READY automatico.
- baseline automatico.
- fixture automatico.
- selectedCode/releasedCode/finalConclusion/CLASSIFIED.
- classificacao P/O/A final nesta fase.
- produto/UI/API promotion.
- HFACS/Risk/ERC/ARMS/ERC/recommendations.

## 6. Relacao com SOURCE_CLOSURE_GATE

Todos os candidatos devem respeitar `SOURCE_CLOSURE_GATE` (A4R199-A):
- sem classificacao ativa;
- sem promocao;
- sem uso de consequencia pos-escape como causa;
- sem fechar casos com fonte insuficiente.

## 7. Relacao com escape point

Regra central:
- P/O/A deve ser analisado no momento do escape point da operacao segura.
- tudo apos escape point e consequencia/contexto, nao ancora causal primaria.

Aplicacao pratica:
- evento sem escape point minimamente localizavel nao deve ser candidato forte.
