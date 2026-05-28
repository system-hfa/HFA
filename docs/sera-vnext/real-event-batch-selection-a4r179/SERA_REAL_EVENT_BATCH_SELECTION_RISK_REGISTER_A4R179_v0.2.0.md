# SERA Real Event Batch Selection Risk Register — A4R179

## Riscos principais
1. Duplicata
- Risco: selecionar duas fontes do mesmo evento sem consolidacao.
- Mitigacao: status `DUPLICATE_REVIEW_REQUIRED` e travar extracao ate revisao.

2. Fonte fraca
- Risco: fonte incompleta ou de baixa qualidade gerar extracao instavel.
- Mitigacao: status `SOURCE_ENRICHMENT_REQUIRED` antes de extracao.

3. Source slice parcial
- Risco: recorte parcial induzir leitura incompleta do evento.
- Mitigacao: cruzar slice com fonte oficial completa quando disponivel.

4. Confusao entre outcome e escape point
- Risco: confundir resultado final com ponto de fuga.
- Mitigacao: registrar possible escape point com incerteza explicita.

5. Confusao entre varios atores e varios pontos de fuga
- Risco: criar mais de um escape point quando o problema e multi-actor no mesmo ponto.
- Mitigacao: manter regra de um escape point por escopo e usar actorContributionId quando aplicavel.

6. Tendencia a classificar cedo
- Risco: fechamento prematuro de P/O/A.
- Mitigacao: travas textuais `NOT_FOR_FIXTURE_NOT_FOR_BASELINE_NOT_FINAL_P_O_A` e revisao por fase.

7. Overfitting ao P1
- Risco: escolher casos parecidos apenas com P1.
- Mitigacao: lote com diversidade de lanes e eventos reais adicionais.

8. Lacunas que exigirao sinteticos depois
- Risco: tentar introduzir sinteticos antes de esgotar real-event.
- Mitigacao: manter politica `NO_REAL_EVENT_FIRST`; sintetico apenas se gap real persistir.

9. Uso indevido como baseline
- Risco: promover selecao A4R179 para baseline.
- Mitigacao: proibicao explicita: sem baseline nesta fase.

10. Uso direto de tracker/backfill como se fosse fonte primaria de evento
- Risco: iniciar A4R180 a partir de artefato secundario sem fonte primária rastreável.
- Mitigacao: status `NOT_DIRECT_EVENT_SOURCE_FOR_A4R180` e gate obrigatorio de localizacao de fonte/evento primario.
