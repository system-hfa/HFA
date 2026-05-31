# SERA A4R186 Real Tree Event Review Plan v0.2.0

Status: NEXT_PHASE_PLAN
Phase: A4R186 (planned)
Methodology: SERA

## 1. Objetivo da próxima fase

A4R186 deve reconstruir os 5 casos BATCH_A usando somente nodes reais da árvore canônica A4R99.

- A4R186 não é fase de decisão final.
- A4R186 não fecha P/O/A.
- A4R186 não cria fixture/baseline/release.

## 2. Regras operacionais obrigatórias

- `notFinalClassification=true`
- `poaClosureAllowed=false`
- `currentHypP=UNKNOWN`, `currentHypO=UNKNOWN`, `currentHypA=UNKNOWN` até travessia real dos nodes
- `actorModel=CREW_INTEGRATED_ACTOR_MODEL`
- Proibido usar perguntas inventadas
- Obrigatório percorrer `nodeId` reais do A4R99
- Se travessia não for possível: `AXIS_TREE_TRAVERSAL_BLOCKED`

## 3. Plano por evento (BATCH_A)

### Asiana 214
- eventKey: Asiana 214
- approvedEscapePointScope (A4R182): Entrada em modo HOLD do A/T com início de saída de perfil não percebida
- actorModel: CREW_INTEGRATED_ACTOR_MODEL
- source extraction: A4R180-EXTRACTION-0001 + A4R180B enrichment
- obrigação: percorrer nodes reais P/O/A com evidência factual
- proibição: perguntas case-specific como substituto

### Comair 5191
- eventKey: Comair 5191
- approvedEscapePointScope (A4R182): Virada/alinhamento em pista 26 como primeira ação errada
- actorModel: CREW_INTEGRATED_ACTOR_MODEL
- source extraction: A4R180-EXTRACTION-0002 + A4R180B enrichment
- obrigação: percorrer nodes reais P/O/A com evidência factual
- proibição: perguntas case-specific como substituto

### American 1420
- eventKey: American 1420
- approvedEscapePointScope (A4R182): Continuação de aproximação final instável com perda de referência visual
- actorModel: CREW_INTEGRATED_ACTOR_MODEL
- source extraction: A4R180-EXTRACTION-0003 + A4R180B enrichment
- obrigação: percorrer nodes reais P/O/A com evidência factual
- proibição: perguntas case-specific como substituto

### UPS 1354
- eventKey: UPS 1354
- approvedEscapePointScope (A4R182): Não percepção de setup FMC inválido/mode engagement esperado
- actorModel: CREW_INTEGRATED_ACTOR_MODEL
- source extraction: A4R180-EXTRACTION-0006 + A4R180B enrichment
- obrigação: percorrer nodes reais P/O/A com evidência factual
- proibição: perguntas case-specific como substituto

### United 173
- eventKey: United 173
- approvedEscapePointScope (A4R182): Manutenção de troubleshooting quando necessidade era pouso imediato
- actorModel: CREW_INTEGRATED_ACTOR_MODEL
- source extraction: A4R180-EXTRACTION-0017 + A4R180B enrichment
- obrigação: percorrer nodes reais P/O/A com evidência factual
- proibição: perguntas case-specific como substituto

## 4. Resultado esperado de A4R186

- `questionPath` por eixo usando exclusivamente node IDs reais A4R99
- Respostas ancoradas em evidência factual
- Registro de bloqueio quando não houver travessia válida (`AXIS_TREE_TRAVERSAL_BLOCKED`)
- Sem fechamento final de P/O/A
