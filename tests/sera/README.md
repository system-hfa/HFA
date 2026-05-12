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
