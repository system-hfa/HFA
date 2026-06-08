# SERA Risk Profile UI Behavior

## Risk Profile Page

The page now:

- reads `/api/risk-profile`;
- shows included/excluded counters;
- no longer depends on `analyses.erc_level`;
- lists `Eventos considerados no perfil`;
- lists `Eventos desconsiderados`;
- allows desconsiderar/restaurar via modal browser confirmation flow;
- keeps PDF export disabled only when no included data exists.

## Events Page

The page now:

- shows badge `Desconsiderado no perfil` for excluded legacy events;
- exposes quick actions:
  - `Desconsiderar do perfil`
  - `Restaurar no perfil`
- preserves event lifecycle status independently from profile exclusion state.

## Empty-State Behavior

If the canonical included set is empty:

- the current formation/first-analysis empty state remains;
- incomplete/error/archived/incompatible sources stay described through limitations instead of being silently counted as valid analyses.
