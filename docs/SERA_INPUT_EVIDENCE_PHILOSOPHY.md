# SERA Input & Evidence Philosophy

**Data:** 2026-05-14
**Status:** Decisão filosófica central — válida para todas as sessões de desenvolvimento e produto.

---

## 1. Propósito

Este documento define que tipo de entrada o SERA deve aceitar, como interpretar dados brutos, qual o papel da entrevista estruturada e como lidar com evidência insuficiente.

É uma decisão arquitetural e metodológica que orienta desenvolvimento, testes, baseline e produto. Deve ser consultado antes de qualquer decisão sobre enriquecimento de input, fixtures de teste ou integração de módulo.

---

## 2. Princípio central

> **O HFA/SERA deve funcionar com dados brutos e desorganizados.**
> A entrevista estruturada é desejável, mas não obrigatória.

A maioria dos dados reais virá de:
- relatórios antigos escritos sem estrutura SERA;
- narrativas livres produzidas pelo investigador;
- documentos heterogêneos (PDFs, e-mails, transcrições, fichas);
- evidências fragmentadas e incompletas;
- textos colados de sistemas externos;
- materiais produzidos na forma que o investigador tiver disponível.

O sistema deve extrair, organizar e classificar a partir dessas entradas sem exigir que o usuário adapte seu fluxo de trabalho ao SERA.

---

## 3. Tipos de entrada suportados

| Tipo | Descrição |
|---|---|
| Relatório narrativo bruto | Texto livre descrevendo o evento, sem estrutura formal |
| Relatório oficial antigo | Documentos já existentes em qualquer formato |
| Texto colado de investigação | Excertos, fragmentos, cópias de sistemas legados |
| Múltiplos documentos | Combinação de fontes heterogêneas |
| Transcrição de entrevista livre | Entrevista não estruturada, sem roteiro SERA |
| Entrevista estruturada | Condição ideal — roteiro SERA aplicado |
| Resumo de ocorrência | Sinopse ou versão resumida do evento |
| Registros operacionais | Logs, listas de checagem, fichas de manutenção |
| Evidências fragmentadas | Dados incompletos, parciais ou ambíguos |
| Anexos e documentos de apoio | Fotos, manuais, laudos, dados de voo |

---

## 4. O que o sistema NÃO deve presumir

- Que todos os dados virão completos e organizados.
- Que a narrativa seguirá uma ordem cronológica ideal.
- Que o usuário conhece a taxonomia SERA (percepção, objetivo, ação, ERC).
- Que o relato conterá discriminadores explícitos e claros.
- Que o investigador já separou fato, interpretação e conclusão.
- Que a entrada será necessariamente de domínio aeronáutico.
- Que haverá entrevista estruturada como base.

---

## 5. Papel da entrevista estruturada

A entrevista estruturada é a melhor condição possível de coleta de evidência. Ela:

- Melhora suficiência e rastreabilidade da evidência.
- Reduz ambiguidade na classificação.
- Permite geração de perguntas complementares direcionadas.
- Aumenta determinismo e reprodutibilidade da análise.
- Facilita auditoria e revisão humana.

**Mas não é pré-requisito para análise.** O sistema deve produzir classificação útil a partir de qualquer entrada que contenha evidência suficiente, e indicar lacunas quando a evidência for insuficiente.

---

## 6. Papel dos discriminators nas fixtures

Os `discriminators` nos arquivos de fixture têm função exclusivamente documental:

- Documentação metodológica do raciocínio golden.
- Auditoria humana do expected/golden durante revisão de fixture.
- Explicação de por que uma classificação foi escolhida e por que alternativas foram descartadas.
- Documentação de fronteiras metodológicas (ex.: por que NÃO é O-C, por que NÃO é A-F).

**Os discriminators NÃO devem:**
- Ser injetados no pipeline de classificação em runtime.
- Substituir a capacidade do classificador de analisar o relato bruto.
- Compensar fraqueza do classificador com metadados artificiais.
- Fazer parte do `rawText` enviado ao pipeline.

Melhorias de acurácia devem vir de regra geral, gate metodológico, prompt, extração ou pedido de evidência complementar — nunca de enriquecimento artificial da entrada com metadados de fixture.

---

## 7. Regra geral de suficiência

| Situação | Ação do sistema |
|---|---|
| Texto bruto sustenta a classificação | Classificar com confiança |
| Evidência presente mas ambígua | Marcar baixa confiança, indicar ambiguidade |
| Evidência crítica ausente | Gerar perguntas complementares específicas |
| Evidência contraditória | Reportar contradição, não resolver arbitrariamente |

**Nunca forçar certeza metodológica a partir de evidência fraca.** A incerteza é informação — escondê-la prejudica o investigador.

---

## 8. Implicações para testes

- Testes devem usar `description` bruto como entrada principal — sem enriquecimento artificial.
- `rationale` e `discriminators` de fixture devem permanecer fora do input runtime.
- O baseline deve medir a capacidade real do sistema sobre entrada bruta, não sobre entrada assistida.

**Tipos de fixture a criar no futuro:**

| Tipo | Objetivo |
|---|---|
| Relato bruto curto | Capacidade mínima com evidência direta |
| Relatório longo | Capacidade de extração com ruído e redundância |
| Documentos mistos | Integração de múltiplas fontes |
| Dados incompletos | Comportamento de suficiência e lacunas |
| Narrativa ruidosa | Robustez a texto desorganizado |
| Entrevista estruturada | Condição ideal como limite superior de acurácia |

---

## 9. Implicações para produto/site

O site e a interface do produto devem comunicar claramente:

- O usuário pode enviar dados já existentes, sem preencher formulário perfeito.
- O sistema organiza e classifica evidências a partir do que for enviado.
- A entrevista estruturada melhora o resultado, mas é opcional.
- Quando faltar evidência, o sistema indicará as lacunas e sugerirá perguntas complementares.
- A análise apoia o investigador — não substitui julgamento humano.
- O SERA não exige que o investigador conheça a taxonomia.

---

## 10. Implicações para arquitetura futura

O pipeline deve evoluir em camadas distintas:

```
Entrada bruta (qualquer tipo)
        ↓
Camada de extração de evidência
        ↓
Camada de classificação SERA (P / O / A / ERC)
        ↓
Camada de suficiência e ambiguidade
        ↓
Perguntas complementares (quando necessário)
        ↓
Revisão humana e validação
        ↓
Auditoria e rastreabilidade
```

Cada camada deve ser testável e auditável independentemente.

---

## 11. Relação com multi-indústria

O núcleo SERA deve ser transversal a operações críticas — não exclusivo à aviação.

A aplicação inicial tem força em aviação e offshore, mas o design deve suportar:

| Setor | Aplicação |
|---|---|
| Aviação | Domínio primário de desenvolvimento e validação |
| Offshore / óleo e gás | Operações em ambiente crítico de alto risco |
| Manutenção industrial | Falhas em processos e equipamentos |
| Energia (elétrica, nuclear) | Operações de risco elevado e consequência severa |
| Saúde | Eventos adversos hospitalares e cirúrgicos |
| Mineração | Acidentes em campo e subterrâneo |
| Marítimo | Operações de bordo e portuárias |
| Processos industriais | Segurança de processo (process safety) |

A calibração de domínio (vocabulário, gates específicos, regras contextuais) deve ser configurável por setor sem alterar o núcleo metodológico.

---

## 12. Decisões explícitas

| Decisão | Motivação |
|---|---|
| Não injetar `fixture.discriminators` no runtime | Classificador deve funcionar com relato bruto real |
| Não tratar entrevista estruturada como pré-condição | Dados reais são heterogêneos e incompletos |
| Não esconder incerteza | Incerteza é informação — reportar, não suprimir |
| Não promover baseline com input artificialmente enriquecido | Baseline deve medir capacidade real |
| Não transformar SERA em simples formulário | O sistema deve extrair estrutura, não exigir que o usuário forneça |

---

## 13. Próximos passos recomendados

- [ ] Criar fixtures de entrada bruta longa (relatório completo como input).
- [ ] Criar fixtures multi-domínio (saúde, industrial, marítimo).
- [ ] Revisar textos do site para refletir a proposta de valor de entrada bruta.
- [ ] Documentar critérios formais de suficiência de evidência por componente SERA.
- [ ] Evoluir módulo de entrevista estruturada como complemento, não requisito.
- [ ] Implementar camada explícita de suficiência com output de perguntas complementares.
- [ ] Criar baseline separado para entrada bruta vs. entrada estruturada (benchmark comparativo).
