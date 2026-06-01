# SERA A4R193-O Synthetic Gap Design Decision v0.2.0

## 1. Decisao da fase O

`NAO_CRIAR_SINTETICOS_EM_O`

Esta fase permite apenas decisao de design, sem criar casos sinteticos e sem fixture.

## 2. Lacunas reais observadas

- PF/PM separation ainda incompleta em lanes criticas.
- agent migration risk ativo em casos multi-ator.
- sequenceRef por ator ainda parcial no momento de primeira degradacao.
- risco de consequence-as-cause em eventos com desfecho severo e mecanismo incompleto.
- necessidade de negative controls tecnico/condicao dominante (Delta 191, USAir 427, 5N-BQJ).
- warning/callout/go-around mechanism sem fechamento por ator (Peasmarsh/Vigo).
- fronteira crew collective vs actor individual ainda instavel em varios holds.

## 3. Tipos sinteticos candidatos (apenas planejamento)

Conforme governanca A4R147, os tipos candidatos para design-only futuro incluem:
- synthetic_positive_control
- synthetic_negative_control
- synthetic_progressive_chain
- synthetic_adversarial_trap
- synthetic_boundary_challenge
- synthetic_source_degraded

## 4. Criterios para autorizacao humana futura

- autorizacao humana explicita para abrir fase de design pack sintetico;
- escopo candidate-only estrito;
- sem reclassificar eventos reais a partir de sinteticos;
- sem fixture, sem baseline e sem mudanca de corpus;
- rastreabilidade de lacuna alvo por caso e por regra metodologica.

## 5. Proibicoes metodologicas

- Proibido usar sinteticos como referencia real.
- Proibido promover sinteticos para fixture ou baseline.
- Proibido abrir final outputs.
- Proibido finalConclusion HFACS Risk/ERC ARMS/ERC recommendations.

## 6. Recomendacao para A4R193-P

- Preferencial: `SYNTHETIC_GAP_DESIGN_PACK_ONLY` com autorizacao humana explicita.
- Alternativa conservadora: auditoria independente do pacote A4R193 antes de qualquer avanço sintetico.
