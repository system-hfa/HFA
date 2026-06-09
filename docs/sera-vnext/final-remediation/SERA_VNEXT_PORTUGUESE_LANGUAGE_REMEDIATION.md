# SERA vNext — Portuguese Language Remediation

## Problem
The engine had bilingual concept patterns but relied on literal phrase matching. Natural Portuguese narratives that did not use the exact words from the concept lexicon would not activate evidence, causing the engine to abstain even when the semantic content was present.

## Changes Applied

### 1. Morphological Normalization
All PT patterns expanded with character class variants: `[cç]`, `[aã]`, `[eê]`, `[oóô]`, `[ií]`, `[aá]`, etc.

### 2. Synonym Families
Each concept now matches multiple natural expressions instead of single phrases:
- `inadequateAssessment`: added "interpretou errado", "entendeu mal", "não percebeu"
- `sensoryLimitation`: added "céu/teto fechando", "horizonte indistinto", "condições meteorológicas adversas"
- `knowledgeLimitation`: added "não tinha recebido treinamento", "desconhecia", "lacuna de conhecimento"

### 3. Negation Analysis
Added `hasConceptWithoutNegation()` and `matchingConceptStatementsWithoutNegation()` functions that filter out statements containing negation markers:
- PT: `não`, `nem`, `nunca`, `jamais`, `sem`, `ausência de`, `falta de`, `deixou de`
- EN: `not`, `never`, `without`, `absence of`, `lack of`, `failed to`, `did not`

### 4. Concept Families
Added `CONCEPT_FAMILIES` grouping related concepts for composed evidence matching:
- `violationAwareness`: knownRule + explicitAwareness + consciousDeviation
- `sensoryLimitation`: sensoryLimitation + knowledgeLimitation
- `informationQuality`: informationAmbiguous + informationAvailableCorrect + informationUnavailable

### 5. Contextual Window
Added `conceptsWithinWindow()` for checking concept co-occurrence within N sentences.

## Remaining Limitation
Real-world Portuguese recall remains below target on naturalistic narratives. The engine abstains when concepts are expressed in ways not covered by expanded patterns. Continued pattern expansion during pilot phase is expected.
