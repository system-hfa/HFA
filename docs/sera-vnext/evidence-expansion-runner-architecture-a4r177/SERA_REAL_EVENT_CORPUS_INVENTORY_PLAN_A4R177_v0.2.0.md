# SERA Real Event Corpus Inventory Plan — A4R177

Status:
- DRAFT_ONLY
- CORPUS_INVENTORY_PLAN
- NO_RUNNER_IMPLEMENTATION
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. O que foi encontrado no repositório

Resumo objetivo do inventario local em `docs/sera-vnext`:
- `official_report_files`: 173
- `txt_files`: 89
- `pdf_files`: 74
- `tracker_files` (nome com tracker/index): 26
- `tracker_like_docs` (tracker/index/inventory/matrix/manifest/registry): 83
- `real_event_files`: 141
- `external_candidate_files`: 83
- `real_event_dirs`: 10
- `external_candidate_dirs`: 10
- `source_corpus_dirs`: 14

Observacao:
- `distinct_event_prefixes` detectados em arquivos de relatorio (`.txt/.pdf/.html` com prefixo numerico) = 70.
- O corpus total supera esse numero porque ha multiplas familias de pools, manifestos e agregados.

## 2. Onde parecem estar os 100+ eventos

Principais concentradores:
- `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool*`
- `docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool*`
- `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool*`
- `docs/sera-vnext/source-corpus/official-reports/a4r105-curated*`
- `docs/sera-vnext/source-corpus/official-reports/a4r106`
- `docs/sera-vnext/source-corpus/report-url-manifest/*`

## 3. Diretórios que sao fontes

Fontes primarias:
- `docs/sera-vnext/source-corpus/official-reports/**`
- `docs/sera-vnext/official-report-source-slices/**`
- `docs/sera-vnext/real-event-extractions/**`
- `docs/sera-vnext/real-event-adjudications/**`
- `docs/sera-vnext/real-event-escape-point-reaudit/**`

Fontes auxiliares:
- `docs/sera-vnext/source-corpus/txt-events/**`
- `docs/sera-vnext/source-corpus/perplexity-candidates/**`
- `docs/sera-vnext/external-candidates/**`

## 4. Diretórios temporários/untracked

Foram observados muitos artefatos untracked em `tmp/**` e alguns itens untracked em corpus recuperado.
Regra de inventario:
- nao incorporar `tmp/**` como evidencia primaria do corpus oficial;
- tratar untracked apenas como material de apoio ate saneamento.

## 5. Como inventariar sem classificar

Passos:
1. listar arquivos por familia de origem e formato;
2. registrar metadados minimos por evento;
3. marcar clareza de evidencia sem atribuir codigo P/O/A final;
4. separar pendencias de fonte antes de qualquer adjudicacao metodologica.

## 6. Campos mínimos do futuro inventário

- `eventId`
- `sourcePath`
- `sourceType`
- `sourceQuality`
- `eventType`
- `escapePointClarity`
- `actorClarity`
- `multiActorPotential`
- `negativeControlPotential`
- `likelyCoverageP`
- `likelyCoverageO`
- `likelyCoverageA`
- `evidenceGaps`
- `status`

## 7. Regras de triagem

- `usar agora`:
  evidencia suficiente e rastreavel para entrar em lote de extracao.
- `enriquecer fonte`:
  evento promissor com lacuna de fonte ou recorte insuficiente.
- `hold`:
  evento com ambiguidade estrutural relevante para a fase.
- `descartar`:
  evento sem aderencia ao escopo metodologico ou com evidencia inviavel.
- `cobrir com sintético apenas se lacuna real persistir`:
  somente apos tentativa explicita de cobertura por eventos reais.

## 8. Decisão operacional para A4R178

Prosseguir para inventario estruturado de eventos reais (sem classificacao final), priorizando familias de `official-reports` e artefatos de `real-event-*`.
