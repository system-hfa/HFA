# Runtime Performance Summary A4R222-MAX

Trial:
- `tests/sera-vnext/runtime-performance-a4r222max-trial-001.ts`

Workload:
- 10 sequential reads.
- 20 concurrent reads.

Latest observed result from required regression run:
- minMs: approximately 0.07 ms.
- maxMs: approximately 0.57 ms.
- avgMs: approximately 0.11 ms.
- errors: 0.

Interpretation:
- This is a lightweight local consistency check, not a production benchmark.
- Results were identical across reads.
- Official baseline artifacts were not mutated.
