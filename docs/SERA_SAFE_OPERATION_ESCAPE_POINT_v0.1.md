# SERA — Ponto de Fuga da Operação Segura (Safe Operation Escape Point) v0.1

## 1. Definição

**Ponto de fuga da operação segura** é o primeiro ato, omissão ou decisão humana/organizacional identificável em que o sistema deixou de manter uma barreira operacional necessária, permitindo que uma condição perigosa ultrapassasse o controle previsto e entrasse no fluxo operacional com potencial de dano.

O ponto de fuga é:
- **Único por análise**: apenas um ponto de fuga é identificado por evento.
- **Factual e observável**: descrito em verbo de ação observável (executou, não realizou, omitiu, não verificou), nunca em causas inferenciais.
- **Temporalmente localizado**: deve ser o momento mais cedo em que ainda havia controle — não o momento da consequência.

---

## 2. Critérios de seleção do ponto de fuga

O ponto de fuga é o momento em que:

1. Uma barreira operacional obrigatória deixou de ser mantida; e
2. Essa ruptura foi **causalmente necessária** para que o evento danoso ocorresse; e
3. Um agente humano ou organizacional identificável tinha **responsabilidade** e **possibilidade** de manter a barreira.

Critérios de exclusão (não são pontos de fuga):
- Consequências do evento (o que aconteceu depois da barreira cair).
- Respostas de outros agentes à condição perigosa já instalada (piloto tentando recuperar após falha técnica).
- Fatores latentes sem manifestação observável em ato ou omissão específica.

---

## 3. Regra de consistência causal agente-ato-momento

Depois de definido o ponto de fuga (Etapa 2), as Etapas 3 (Percepção), 4 (Objetivo) e 5 (Ação) devem **sempre** responder sobre o mesmo agente, ato/omissão e momento operacional.

### 3.1 O que cada etapa deve responder

| Etapa | Pergunta correta |
|-------|-----------------|
| Percepção (P) | O **agente do ponto de fuga** percebeu, detectou ou interpretou corretamente a condição, requisito, sinal ou informação necessária para manter a barreira? |
| Objetivo (O) | O **agente do ponto de fuga** tinha objetivo compatível com a operação segura, ou houve intenção/decisão desviada? |
| Ação (A) | Como o **agente do ponto de fuga** executou, omitiu, verificou ou documentou a barreira esperada? |

### 3.2 Regra anti-migração causal

**É proibido trocar de agente nas Etapas 3–5 sem abrir uma análise secundária separada.**

A troca de agente ocorre quando o classificador:
- Identifica manutenção/organização como agente na Etapa 2; e
- Classifica P/O/A sobre o piloto, despachante, controlador ou outro ator com base na **resposta desse ator à consequência** do ponto de fuga.

A resposta de outro agente após a barreira ter caído é **consequência operacional**, não ponto de fuga.

---

## 4. Regra de aplicação por contexto de agente

### 4.1 Agente de manutenção/organização

Quando o ponto de fuga ocorreu em manutenção, planejamento, despacho, supervisão, projeto ou gestão:

- **Percepção** responde sobre o que o agente de manutenção percebeu (ou não percebeu) do requisito, prazo, condição do componente ou sinalização do sistema de controle.
- **Objetivo** responde sobre se havia desvio intencional nas decisões de manutenção.
- **Ação** responde sobre como manutenção executou, omitiu ou deixou de verificar a barreira.

**Código A-D é proibido** quando o agente do ponto de fuga é manutenção/organização e a evidência descreve:
- omissão de tarefa ou teste obrigatório,
- ausência de registro de execução,
- falha do sistema de controle de manutenção (ex: HELOTRAC),
- inspeção programada não realizada,
- contaminação não detectada por falta de teste,
- controle de aeronavegabilidade não verificado.

A-D só se aplica quando há **limitação física explícita do próprio agente de manutenção** (força, alcance, EPI, ergonomia) — não da aeronave, não do piloto, não do componente.

### 4.2 Resposta de piloto como consequência

Quando a narrativa descreve pilotos tentando recuperar a aeronave após falha técnica causada por falha de manutenção:
- A resposta dos pilotos é classificada como **consequência operacional**.
- Não abre nova classificação de P/O/A no ponto de fuga.
- Pode ser objeto de **análise secundária separada** se a resposta da tripulação for relevante para recomendações.

---

## 5. Exemplo correto — Copterline Sikorsky S-76C+ (Tallinn Bay, 2005)

### Evento
Helicóptero S-76C+ OH-HCI colidiu com o Mar de Tallinn em 10/08/2005 após extensão não comandada do atuador dianteiro do rotor principal, matando 14 pessoas.

### Etapa 2 — Ponto de fuga (correto)
| Campo | Valor |
|-------|-------|
| Agente | Manutenção/gestão de manutenção da Copterline |
| Ato inseguro | Não verificou que o teste obrigatório de vazamento interno do atuador dianteiro foi executado aos 2250h |
| Momento | Manutenção programada — passagem do limite de 2250 horas voadas sem o teste |
| Justificativa | O HELOTRAC não gerou corretamente a tarefa por cadastro inadequado; não houve registro de execução nem deferimento documentado; contaminação hidráulica e vazamento interno excessivo não foram detectados |

### Etapas 3–5 — Classificação consistente (correto)
| Etapa | Código | Justificativa |
|-------|--------|---------------|
| Percepção | P-G | O sistema de controle (HELOTRAC) falhou em gerar a tarefa; não houve verificação independente — falha de monitoramento de informação disponível |
| Objetivo | O-A | Manutenção não tinha objetivo desviante; ausência de intenção de negligenciar |
| Ação | A-G | Gestão de manutenção não confirmou que o teste obrigatório foi executado antes de liberar o atuador — falha de supervisão/verificação de tarefa de terceiro |
| ERC | 1 | Falha latente não detectável em operações normais; o atuador operava aparentemente normalmente antes da extensão não comandada |

### Classificação errada (proibida)
| Etapa | Código errado | Por quê é erro |
|-------|--------------|----------------|
| Ação | A-D | Atribui incapacidade física ao piloto de recuperar a aeronave — o piloto não é o agente do ponto de fuga |
| Ação | A-D | A incapacidade dos pilotos de recuperar após a extensão não comandada é **consequência** da falha de manutenção |

---

## 6. Exemplos de erro de migração causal

### Erro tipo 1: Manutenção na Etapa 2, piloto na Etapa 5

> "Agente: manutenção. Ato inseguro: não realizou teste obrigatório. Ação: A-D — os pilotos não conseguiram recuperar a aeronave após a extensão não comandada."

**Por quê é erro**: A-D classifica o piloto como agente. O ponto de fuga foi em manutenção. A recuperação dos pilotos é consequência, não ponto de fuga.

### Erro tipo 2: Supervisão na Etapa 2, tripulação na Etapa 5

> "Agente: despacho. Ato inseguro: autorizou decolagem com combustível insuficiente para rota alternada. Ação: A-D — a tripulação não conseguiu chegar ao aeroporto alternado."

**Por quê é erro**: A incapacidade de chegar ao alternado é consequência da autorização errada do despacho. A-D no piloto troca o agente sem justificativa.

### Erro tipo 3: ERC subestimado para falha latente catastrófica

> "Agente: manutenção. A-G. ERC 3 — recuperável."

**Por quê é problemático**: Falhas de manutenção latentes (sem detecção possível em operações normais) têm ERC 1 quando nenhuma barreira operacional rotineira detectaria o problema antes da consequência. ERC 3 genérico pode subestimar a dificuldade real de recuperação.

---

## 7. Referências internas

- `frontend/src/lib/sera/all-steps.ts`: `isMaintainenceOrOrganizationalAgent`, `evidenceOfMaintenanceOmissionContext`, `evidenceOfPilotResponseToTechnicalFailure`
- `frontend/src/lib/sera/rules/BASELINE.md`: definições de P/O/A e precedências
- `tests/sera/fixtures/TEST-COPTERLINE-S76C-001.json`: fixture adversarial Copterline
