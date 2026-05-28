# SERA Synthetic Event Gap Policy — A4R177

Status:
- DRAFT_ONLY
- SYNTHETIC_GAP_POLICY
- NO_RUNNER_IMPLEMENTATION
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Regra central

Eventos sintéticos so podem entrar no plano apos triagem real estruturada.

## 2. Limite de uso

- eventos sintéticos nao sao evidencia historica;
- eventos sintéticos sao instrumentos de validacao de lacuna;
- eventos sintéticos nao entram em baseline metodologico sem marcacao explicita.

## 3. Finalidades permitidas

- lacuna de codigo;
- fronteira ambigua;
- negative control;
- outcome-bias trap;
- hindsight trap;
- single-escape-point trap;
- multiator controlado;
- insufficient-evidence trap.

## 4. Pacote minimo por sintético

Cada evento sintético deve conter:
- `syntheticId`
- `gapTarget`
- `expectedCode` ou `expectedNonClassification`
- `rationale`
- `prohibitedInference`
- `traceability`
- `authorApprovalRequired`

## 5. Requisitos de governanca

- cada sintético precisa apontar explicitamente qual lacuna real nao foi coberta;
- cada sintético precisa declarar inferencias proibidas;
- cada sintético precisa ter rastreabilidade para matriz de cobertura;
- cada sintético exige aprovacao autoral antes de qualquer uso em suites de referencia.

## 6. Regra de precedência

Sempre aplicar:
1. eventos reais primeiro;
2. sintéticos apenas se gap real persistir;
3. revisar periodicamente se o sintético ainda e necessario apos novas entradas reais.
