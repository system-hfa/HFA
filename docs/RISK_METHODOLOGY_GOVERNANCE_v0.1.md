# Governança de Metodologia de Risco — HFA/SERA
**Versão:** v0.1  
**Data:** 2026-05-17  
**Autor:** Revisão técnica Claude (solicitada por Filipe Daumas)  
**Status:** Proposta — aguardando aprovação do autor do método

---

## 1. Propósito

Este documento define o processo de governança para alterações na metodologia de avaliação de risco do HFA/SERA. Ele complementa a auditoria técnica (`RISK_METHODOLOGY_AUDIT_v0.1.md`) com um framework de decisão sobre quando e como mudanças metodológicas podem ser feitas, quem tem autoridade para aprová-las, e quais critérios devem ser satisfeitos antes de expor novas métricas de risco a usuários.

---

## 2. Princípio Fundamental

> **As métricas de risco do HFA/SERA têm consequências operacionais reais.** Um score ou ERC exibido incorretamente pode levar investigadores a subestimar ou superestimar riscos, com impacto direto em decisões de segurança. Portanto, qualquer mudança metodológica deve ser tratada com rigor equivalente ao de uma mudança em software médico de apoio à decisão — não como uma refatoração de produto.

---

## 3. Componentes Metodológicos Sob Governança

Os seguintes componentes são considerados **protegidos** — alterações requerem o processo formal descrito na seção 5:

| Componente | Arquivo(s) | O que governa |
|---|---|---|
| Definição de escala ERC | `rules/erc/levels.json` | Semântica dos níveis 1-5 |
| Fallback ERC do motor | `pipeline.ts` `inferErcLevel()` | Qual código SERA mapeia a qual ERC |
| Overrides determinísticos ERC | `all-steps.ts` `inferDeterministicErcLevel()` | Exceções às regras gerais de ERC |
| Mapeamento ARMS-ERC | `events/[id]/page.tsx` `EV_ARMS_ERC` | Relação sevRow×barrier→ERC |
| Mapeamento ARMS-ERC org | `risk-profile/page.tsx` `ARMS_ERC` | Idem, para perfil organizacional |
| Severidade ISO 31000 | `risk-profile/page.tsx` `SEVERITY_MAP` | SERA code → ISO severity level |
| Fórmula de score organizacional | `org/intelligence/route.ts` | Cálculo do score 0-100 |
| Limites de zona de risco | `risk-profile/page.tsx` funções `riskLevelName`, `tCellColor` | Thresholds Inaceitável/Elevado/Tolerável/Aceitável |

**Componentes operacionais** (não requerem aprovação metodológica, apenas revisão técnica normal):
- Layout e apresentação visual
- Filtros e ordenação de listas
- Campos editáveis (responsável, prazo)
- Alertas textuais

---

## 4. Fontes de Autoridade Metodológica

A hierarquia de fontes para decisões metodológicas é:

1. **Daumas (2018)** — referência primária da metodologia SERA. Qualquer desvio deve ser documentado e justificado explicitamente.
2. **Hendy (2003), Annex A** — base para o modelo de processamento de informação (P/O/A).
3. **ICAO Doc 9859 (SMM, 4ª ed.)** — referência para matriz de risco SMS/ISO.
4. **ISO 31000:2018** — framework geral de gestão de risco.
5. **Decisão do autor (Filipe Daumas)** — para casos não cobertos pelas referências acima, com documentação explícita da decisão.

---

## 5. Processo de Mudança Metodológica

### 5.1 Classificação da mudança

Antes de iniciar qualquer alteração, classificar:

| Tipo | Exemplos | Aprovação mínima |
|---|---|---|
| **Tipo 1 — Correção de bug** | Corrigir status 'open' → 'pending'; corrigir fórmula que produz resultado sempre zero | Revisão técnica + teste de regressão |
| **Tipo 2 — Alinhamento com referência** | Ajustar escala ERC para corresponder ao que Daumas (2018) define; corrigir inversão de escala | Autor do método + fixture de validação |
| **Tipo 3 — Extensão metodológica** | Incluir códigos de Objetivo na severidade ISO; adicionar nova categoria de risco | Autor do método + validação em casos reais + aprovação formal |
| **Tipo 4 — Mudança de framework** | Substituir ISO 31000 por outra referência; mudar a estrutura ARMS | Revisão externa + documentação completa + migração de dados históricos |

### 5.2 Passos obrigatórios para Tipo 2 e superior

1. **Documentar o estado atual** — descrever o comportamento existente com evidências de código e exemplos numéricos.
2. **Identificar a referência** — citar a fonte (página, tabela, seção) que justifica a mudança.
3. **Descrever o impacto** — quais saídas mudam, para quais inputs, em qual magnitude.
4. **Criar ou atualizar fixtures** — pelo menos 3 casos de teste cobrindo o range afetado.
5. **Aprovação explícita** — confirmação escrita (comentário em PR, documento, mensagem registrada) do autor do método.
6. **Migração de dados** — se dados históricos armazenados ficam inconsistentes com a nova definição, definir política de tratamento (recalcular, marcar como legacy, ou manter como estão).
7. **Atualizar documentação** — incluindo este documento e o arquivo de auditoria.

---

## 6. Critérios de Pausa de Feature

As seguintes condições devem pausar a exposição de funcionalidades de risco a novos usuários (trial, novos clientes) até resolução:

### Pausar imediatamente se:
- [ ] Existe inversão de escala entre motor e UI (F-001 não resolvido)
- [ ] O dashboard exibe métricas derivadas de dados hardcoded/nulos (F-002 não resolvido)
- [ ] Uma métrica principal do dashboard é conhecidamente incorreta (como F-005 — open_total sempre zerado)

### Pausar antes de expansão se:
- [ ] A fórmula de score não tem referência metodológica documentada (F-004)
- [ ] O cálculo de barreira ARMS diverge entre telas (F-003)
- [ ] Não há fixtures de regressão para casos de alto risco ERC 1-3 (F-008)

### Não pausar (monitorar):
- Achados de Tipo Médio/Baixo que afetam apenas casos de borda
- Limitações metodológicas aceitas e documentadas (ex: "optamos por usar apenas percepção para ISO 31000 porque...")

---

## 7. DECISION REQUIRED — Canonical ERC Scale

> **Status: PENDENTE — nenhuma mudança de código autorizada até esta decisão ser tomada formalmente.**

### 7.1 Situação atual

Existem hoje **duas interpretações paralelas e incompatíveis** da escala ERC no sistema (ver achado F-001 em `RISK_METHODOLOGY_AUDIT_v0.1.md`):

**Escala do motor** (`pipeline.ts` `inferErcLevel`, `all-steps.ts` `inferDeterministicErcLevel`, `rules/erc/levels.json`):
- ERC 1 = "Risco imediato, crítico" (MAIS PERIGOSO)
- ERC 5 = "Risco mínimo, administrativo" (MAIS SEGURO)
- Esta é a escala persistida no banco de dados (`analyses.erc_level`)

**Escala da UI** (`events/[id]/page.tsx` `EV_ARMS_ERC` + `ERC_STYLE`, `risk-profile/page.tsx` `ARMS_ERC`):
- ERC 5 = "Ação imediata obrigatória" / vermelho (MAIS PERIGOSO)
- ERC 1 = "Aceitável" / verde (MAIS SEGURO)
- Esta é a escala exibida ao usuário via `computeEventRisk()` (cálculo client-side, não usa o valor persistido)

**Consequência imediata:** O campo `analyses.erc_level` armazenado pelo motor NUNCA é exibido na UI. O `computeEventRisk()` recalcula o ERC independentemente. As duas escalas coexistem sem colisão visual hoje — mas qualquer tentativa de conectá-las produziria inversão total de significado.

### 7.2 O que NÃO fazer até a decisão

- Não exibir `analyses.erc_level` diretamente na UI
- Não conectar `modal_erc_level` (F-002) a dados reais sem antes resolver F-001
- Não criar fixtures ERC sem escala definida
- Não misturar a resolução deste item com lançamento de trial ou dashboard

### 7.3 O que a decisão formal deve definir

A decisão deve responder explicitamente a todas as perguntas abaixo:

1. **Qual escala representa maior urgência:** ERC 1 = perigo OU ERC 5 = perigo?
2. **Qual escala é persistida** no banco de dados (`analyses.erc_level`)?
3. **Qual escala é exibida** na UI (pode ser diferente da persistida, com conversão)?
4. **Haverá conversão visual?** Se o motor armazena escala A e a UI exibe escala B, onde ocorre a conversão e quem a garante?
5. **Como ficam os dados históricos?** `analyses.erc_level` já existente usa qual escala? Serão recalculados, marcados como legacy, ou mantidos como estão?
6. **Quais fixtures são exigidos?** A decisão deve exigir cobertura ERC 1–5 (mínimo 1 fixture por nível) antes de qualquer deploy.

### 7.4 Opções

**Opção A — Adotar escala da UI como canônica (5=perigo)**
- Prós: consistente com a lookup table ARMS (A1=5 é a interseção de maior severidade × menor barreira); intuitivo (número maior = risco maior)
- Contras: requer inversão completa do motor — `levels.json`, `inferErcLevel()`, `inferDeterministicErcLevel()`; dados históricos em `analyses.erc_level` ficam com semântica invertida

**Opção B — Adotar escala do motor como canônica (1=perigo)**
- Prós: consistente com `levels.json` e com referência Daumas (2018); ERC 1 como código de emergência (análogo a nível de alerta)
- Contras: lookup table ARMS precisa ser invertida (A1 passaria a retornar 1); todos os labels e estilos da UI precisam de inversão; `ERC_STYLE[1]` passaria a ser vermelho

### 7.5 Pré-requisitos para implementar a decisão

Qualquer que seja a opção escolhida, antes de qualquer mudança de código:
- [ ] Decisão formal registrada neste documento (seção 7.6)
- [ ] Fixtures ERC 1, 2, 3, 4, 5 criados (mínimo 1 relato por nível)
- [ ] Validação smoke passando nos 5 níveis
- [ ] Atualização de `levels.json` com escala definitiva
- [ ] Atualização de `EV_ARMS_ERC` e `ARMS_ERC` se necessário
- [ ] Atualização de `ERC_STYLE`, `ercLabels` e labels na UI
- [ ] Política de migração para `analyses.erc_level` histórico
- [ ] Revisão de `inferErcLevel()` e `inferDeterministicErcLevel()`
- [ ] Não combinar com outras fases de produto (trial, dashboard, novas features)

### 7.6 Registro da Decisão

**Decisão:** `[ ] Opção A` `[ ] Opção B` `[ ] Outra: ___________`  
**Decidido por:** ___________  
**Data:** ___________  
**Referência metodológica:** ___________  
**Política de dados históricos:** ___________

---

## 8. Registro de Decisões Metodológicas

Este registro deve ser atualizado sempre que uma decisão metodológica for tomada, independentemente do processo que a gerou.

| Data | Decisão | Justificativa | Autorizado por | Arquivo afetado |
|---|---|---|---|---|
| 2026-05-17 | *Auditoria inicial realizada — nenhuma mudança executada* | Auditoria técnica solicitada antes de expansão | Filipe Daumas | `RISK_METHODOLOGY_AUDIT_v0.1.md` |
| 2026-05-17 | Corrigido F-005: `openStatuses` de `['open','in_progress']` para `['pending','in_progress']`; `'closed'` → `'completed'` | Bug: status 'open' e 'closed' inexistentes no schema de `corrective_actions` | Filipe Daumas | `api/org/intelligence/route.ts` |
| 2026-05-17 | Escala ERC canônica: **PENDENTE** — seção 7 formalizada com pré-requisitos e opções | F-001 identificado na auditoria; decisão bloqueada até análise metodológica formal | Filipe Daumas | `RISK_METHODOLOGY_GOVERNANCE_v0.1.md` |

---

## 9. Validação de Metodologia

### 9.1 O que deve ser validado

Para cada componente metodológico protegido, deve existir:
1. **Definição da escala** — o que cada valor numérico significa
2. **Fonte de referência** — de onde vem a definição
3. **Casos de teste** — pelo menos 3 exemplos com inputs e outputs esperados documentados
4. **Resultado de validação** — evidência de que o código produz os outputs esperados

### 9.2 Estado atual de validação

| Componente | Definição | Referência | Casos de teste | Status |
|---|---|---|---|---|
| Escala ERC (motor) | ✅ levels.json | Implícita (Daumas 2018) | ⚠️ Apenas ERC 4-5 | Incompleto |
| Escala ERC (UI) | ⚠️ Implícita no ERC_STYLE | Não documentada | ❌ Nenhum | Ausente |
| ARMS lookup table | ⚠️ Código não documentado | ARMS metodologia | ❌ Nenhum fixture | Ausente |
| ISO 31000 severidade | ✅ SEVERITY_MAP com justificativas | Daumas 2018 / Hendy 2003 | ❌ Nenhum | Ausente |
| Score organizacional | ❌ Fórmula sem referência | Não identificada | ❌ Nenhum | Ausente |

---

## 10. Comunicação com Usuários

Quando uma métrica de risco é conhecidamente limitada ou em processo de correção, o produto deve:

1. **Não exibir a métrica** se o dado for provadamente incorreto (ex: open_total=0 quando há ações pendentes)
2. **Exibir aviso contextual** se a métrica for válida mas limitada (ex: "Perfil em formação — baseado em N análises")
3. **Nunca** exibir uma métrica apresentando-a como definitiva quando há inversão de escala não resolvida

---

## Apêndice A: Checklist de Lançamento de Novas Métricas de Risco

Antes de lançar qualquer nova métrica de risco para usuários:

- [ ] A escala está definida e documentada (o que significa 1? o que significa 5?)
- [ ] A referência metodológica está identificada e citada no código ou documento
- [ ] Pelo menos 3 casos de teste cobrem o range da métrica
- [ ] A métrica foi revisada pelo autor do método
- [ ] O impacto em dados históricos foi avaliado
- [ ] A métrica não contradiz outras métricas existentes
- [ ] O texto na UI descreve corretamente o que a métrica representa
