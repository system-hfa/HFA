# SERA A4R193-P Synthetic Authorization Gate v0.2.0

Status:
- AUTHORIZATION_GATE_DEFINED
- DESIGN_ONLY

## 1. O que exige autorizacao humana

Qualquer passo alem de design documental exige autorizacao humana explicita:
- criar synthetic case instance;
- transformar design em fixture;
- executar trial de instancia sintetica;
- usar sintetico em decisao de reentry real.

Marcador obrigatorio de gate:
- `AUTORIZACAO_HUMANA_EXPLICITA_OBRIGATORIA`

## 2. Quem deve aprovar

Aprovacao minima conjunta:
- owner metodologico SERA;
- revisor independente de governanca de evidencias;
- aprovador de escopo operacional da fase.

## 3. Outputs que continuam proibidos

- selectedCode
- releasedCode
- finalConclusion
- CLASSIFIED
- HFACS
- Risk/ERC
- ARMS/ERC
- recommendations
- qualquer downstream de produto

## 4. Criterios minimos por synthetic candidate

- objetivo de teste objetivo e verificavel;
- narrativa com pre-escape, escape anchor e consequencia separados;
- limite de inferencia explicito;
- evidencia sintetica declarada com `sourceStatus: SYNTHETIC`;
- criterio de bloqueio esperado documentado;
- vinculacao explicita a lacuna real do matrix P.

## 5. Criterios de rejeicao

Rejeitar quando houver:
- tentativa de usar sintetico como prova de evento real;
- tentativa de liberar output final;
- falta de anti-contaminacao;
- ausencia de rastreabilidade da lacuna;
- ausencia de aprovacao humana completa.

## 6. Regras inviolaveis

- Sintetico nao valida metodo por si so.
- Sintetico nao vira evento real.
- Sintetico nao entra em fixture ou baseline sem fase propria e nova auditoria.
