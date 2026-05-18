# PRODUCT v0.3-F — Relatorio Individual de Evento (Print-Friendly)

## 1. Objetivo

Implementar uma primeira versao segura de relatorio individual de evento no HFA/SERA, com foco em leitura executiva e exportacao via navegador por impressao/salvar como PDF.

## 2. O que foi implementado

- Nova rota de relatorio individual por evento.
- Estrutura print-friendly com secoes tecnicas e caveats metodologicos.
- Reuso do componente `PrintReportButton` com `window.print()`.
- CTA minimo na pagina de detalhe do evento para abrir o relatorio.

## 3. Rota criada

- `/reports/event/[id]`

## 4. Estrategia de exportacao

- Pagina print-friendly no frontend.
- Botao client-side com `window.print()`.
- Adaptacao de layout com `@media print`.
- Sem geracao server-side de PDF.
- Sem dependencias adicionais.

## 5. Fonte de dados

- Fonte principal: dados reais do evento via endpoint ja existente `/api/events/:id` (consumo por `apiCall` no frontend).
- Fallback seguro: modo demonstrativo com dados ficticios locais quando sessao/dados nao estiverem disponiveis.
- O modo demonstrativo e explicitamente identificado no relatorio.

## 6. Secoes do relatorio

1. Cabecalho (titulo, emissao, identificacao e caveat).
2. Resumo do evento.
3. Classificacao SERA (P/O/A).
4. Avaliacao de risco para triagem (ERC legado e HFA ERC quando disponivel).
5. Principais fatores humanos observados.
6. Recomendacoes e acoes sugeridas.
7. Limitacoes da analise.
8. Proximos passos sugeridos.

## 7. CTA adicionado

- Em `events/[id]`: botao `Relatorio do evento` apontando para `/reports/event/[id]`.

## 8. Caveats metodologicos aplicados

- Documento de apoio a analise tecnica.
- Nao substitui investigacao formal.
- Classificacao depende da evidencia disponivel.
- Categoria visual HFA ERC e apoio a triagem, nao conclusao formal isolada de risco.
- Revisao humana continua obrigatoria.

## 9. O que nao foi implementado

- PDF server-side.
- Endpoints novos de exportacao.
- Storage de arquivos PDF.
- Envio por e-mail.
- Assinatura digital.
- Mudanca de schema/migrations.
- Billing/Stripe.

## 10. Arquivos alterados

- `frontend/src/app/(dashboard)/reports/event/[id]/page.tsx`
- `frontend/src/app/(dashboard)/events/[id]/page.tsx`
- `docs/PRODUCT_EVENT_REPORT_PDF_v0.3-F.md`

## 11. Proxima fase recomendada

PRODUCT v0.3-G — Integracao do relatorio individual com dados ampliados de acoes/encaminhamentos e template institucional.
