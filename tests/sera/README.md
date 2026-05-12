# SERA Test Notes

## Cheap validation loop

Run from the repository root:

```sh
cd ~/Documents/HFA
```

Static, no DeepSeek:

```sh
npx tsx tests/sera/preconditions-static.ts
npx tsx tests/sera/objective-generalization-static.ts
npx tsx tests/sera/preconditions-generalization-static.ts
```

Real canaries, one run only:

```sh
SERA_N_RUNS=1 SERA_FIXTURE=TEST-COMBO-002 npx tsx tests/sera/run.ts
SERA_N_RUNS=1 SERA_FIXTURE=TEST-O-C-001 npx tsx tests/sera/run.ts
SERA_N_RUNS=1 SERA_FIXTURE=TEST-O-D-002 npx tsx tests/sera/run.ts
SERA_N_RUNS=1 SERA_FIXTURE=TEST-A-J-001 npx tsx tests/sera/run.ts
```

Expensive milestone only:

```sh
SERA_N_RUNS=3 npx tsx tests/sera/run.ts
```

Static tests should be used for every rule change. Real canaries validate integration only. The full run is reserved for milestones.

## Generalization and adversarial fixtures

`TEST-GEN-*` fixtures are not regression fixtures. They test methodological generalization: the same SERA discriminators applied to events described with different wording, domain, and context.

Their purpose is to detect overfitting to the phrasing of golden fixtures. A rule that passes `TEST-O-B-001` but fails `TEST-GEN-OB-002` is overfit to the original wording, not to the discriminator.

They should be run with `SERA_N_RUNS=1` for spot validation and are **not** included in the routine full run. Include them in the expensive 3× run only at deliberate milestones.

Adversarial clusters covered:

- `O-B/O-D` — routine/normalized violation vs isolated efficiency gain
- `O-C/O-D` — explicit human protection vs efficiency without human protection
- `A-J/A-I` — communication confirmation failure vs wrong selection under load
- `A-G/A-C/A-B` — third-party supervision vs self-action verification vs procedural omission
- `P-E/A-H vs P-D/A-I` — pure temporal management vs attention overload
- `P-G/P-A` — available-information monitoring failure vs no independent perceptual failure

Suggested run commands (from repo root):

```sh
SERA_N_RUNS=1 SERA_FIXTURE=TEST-GEN-OB npx tsx tests/sera/run.ts
SERA_N_RUNS=1 SERA_FIXTURE=TEST-GEN-OC npx tsx tests/sera/run.ts
SERA_N_RUNS=1 SERA_FIXTURE=TEST-GEN-OD npx tsx tests/sera/run.ts
SERA_N_RUNS=1 SERA_FIXTURE=TEST-GEN-AJ npx tsx tests/sera/run.ts
SERA_N_RUNS=1 SERA_FIXTURE=TEST-GEN-AG npx tsx tests/sera/run.ts
SERA_N_RUNS=1 SERA_FIXTURE=TEST-GEN-AH npx tsx tests/sera/run.ts
SERA_N_RUNS=1 SERA_FIXTURE=TEST-GEN-PG npx tsx tests/sera/run.ts
```
