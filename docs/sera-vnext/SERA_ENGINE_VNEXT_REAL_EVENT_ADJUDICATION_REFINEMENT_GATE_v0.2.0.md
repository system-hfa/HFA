# SERA Engine vNext Real Event Adjudication Refinement Gate v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-64 — AI/Author Adjudication Refinement + Evidence Enrichment Gate  
NO_RELEASED_CODE: true  
NO_DOWNSTREAM: true  
NO_FIXTURE: true  
NO_BASELINE: true

## Objetivo
Refinar a adjudicação AI/Author da A4+R-63 com critérios operacionais explícitos de maturidade por caso/eixo, incluindo gate de enriquecimento para fontes parciais, sem promover `proposedCode` para `releasedCode`.

## Estados de maturidade sugeridos
- `TRIAGE_ONLY`
- `STRUCTURED_EXTRACTION_READY`
- `AI_AUTHOR_ADJUDICATION_DRAFT`
- `AUTHOR_REVIEW_READY`
- `EVIDENCE_ENRICHMENT_REQUIRED`
- `HOLD_UNRESOLVED`
- `REJECT_OR_DEFER`

## Critérios para AUTHOR_REVIEW_READY
Um caso/eixo só deve avançar para `AUTHOR_REVIEW_READY` quando houver:
- `factualBasis` suficiente e rastreável;
- `unsafeState` claro;
- `unsafeActOrCondition` candidato claro (ou ambiguidade explicitada com limites);
- `directActor` candidato claro ou incerteza explicitada;
- `evidenceRefsByAxis` por eixo;
- `rejectedAlternatives` documentado;
- `uncertaintyByAxis` explícito;
- `proposedCode` explicitamente não tratado como `releasedCode`;
- `downstreamLocks` explícitos.

## Critérios para HOLD_UNRESOLVED
Manter eixo em `UNRESOLVED` quando:
- alerta não percebido sem mecanismo suficiente (percepção/atenção/comunicação não discriminados);
- anomalia técnica domina e não há evidência robusta de falha humana;
- contexto multi-actor sem separação factual mínima;
- PF/PM/mission crew não segregados com evidência;
- `source partial` limita inferência causal;
- evidência disponível é só desfecho ruim;
- há risco de converter ausência de evidência em no-failure automático.

## Critérios para EVIDENCE_ENRICHMENT_REQUIRED
Aplicar quando:
- `sourceType` é parcial (`SOURCE_PARTIAL` ou equivalente);
- não há fonte primária ou curated extraction suficiente;
- `sourceLocator` não permite rastreio factual detalhado;
- `directActor` permanece indefinido demais;
- cronologia não sustenta distinção mínima entre unsafe act e unsafe condition;
- `proposedCode` dependeria de inferência forte não ancorada.

## Regras específicas das dúvidas A4+R-63
1. Caso 001 (`P-G` vs `P-H`):
- `P-H` exige evidência de falha de comunicação/informação.
- Se o problema dominante é monitoramento/atenção sem pressão temporal dominante e sem cadeia comunicacional explícita, manter `P-G`.

2. Caso 002 (warning não percebido):
- warning não percebido não fecha P automaticamente.
- sem mecanismo perceptivo/comunicacional claro, manter `P=UNRESOLVED`.

3. Caso 003 (ausência de alerta sonoro):
- ausência de alerta sonoro é primariamente condição/barreira degradada.
- não fechar A-code sem evidência de mecanismo de ação/verificação.

4. Caso 004 (unsafe-condition-dominant):
- quando anomalia técnica domina e cadeia humana é incompleta, manter eixos em `UNRESOLVED`.
- só sair desse estado com evidência humana robusta por eixo.

5. Caso 005 (`SOURCE_PARTIAL`):
- manter `TRIAGE_ONLY` e/ou `EVIDENCE_ENRICHMENT_REQUIRED`.
- não adjudicar causalmente em profundidade sem source anchor mínimo.

## Relação com usuário/adjudicador
- Se houver proposta de alteração de `proposedCode`, consultar o usuário/adjudicador antes da mudança.
- Se a dúvida for apenas aplicação de regra já documentada, registrar decisão operacional no documento de fase.

## Decisões operacionais desta fase
- Nenhum `proposedCode` da A4+R-63 foi promovido para `releasedCode`.
- Nenhum eixo foi forçado quando faltou evidência.
- Casos com baixa ancoragem de fonte foram mantidos em trilha de enriquecimento.
